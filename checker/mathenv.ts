/**
 * The mathjs environment used by all numeric content checks (test-time only).
 *  - predictable mode: sqrt(-1), log(-1), asin(2) → NaN (used to detect out-of-domain samples)
 *  - aliases: ln, arcsin, arccos, arctan, arcsec, arccsc, arccot
 *  - `integral(f, x, a, b)` numeric definite integral (tanh-sinh), raw-args
 *  - `indefinite(f, x)` evaluates to the integrand at the current scope (so two indefinite
 *    integrals compare equal exactly when their integrands agree)
 *  - the symbol `C` (integration constant) evaluates to 0
 */
import { create, all, type MathNode, type MathJsInstance } from 'mathjs';
import { tanhSinh, isFiniteNumber } from './numeric';

export const math: MathJsInstance = create(all, { predictable: true, number: 'number' });

type ScopeLike = { get(k: string): unknown; set(k: string, v: unknown): unknown; keys(): Iterable<string> };

function childScope(scope: ScopeLike): Map<string, unknown> {
  const m = new Map<string, unknown>();
  for (const k of scope.keys()) m.set(k, scope.get(k));
  return m;
}

function symbolName(node: MathNode): string {
  if (node.type === 'SymbolNode') return (node as unknown as { name: string }).name;
  throw new Error(`integral/indefinite: variable must be a symbol, got ${node.toString()}`);
}

function integralRaw(args: MathNode[], _math: unknown, scope: ScopeLike): number {
  if (args.length !== 4) throw new Error('integral(f, x, a, b) takes 4 arguments');
  const f = args[0].compile();
  const v = symbolName(args[1]);
  const a = Number(args[2].compile().evaluate(scope));
  const b = Number(args[3].compile().evaluate(scope));
  if (!isFiniteNumber(a) || !isFiniteNumber(b)) return NaN;
  const sub = childScope(scope);
  return tanhSinh(
    (x) => {
      sub.set(v, x);
      const val = f.evaluate(sub);
      return typeof val === 'number' ? val : NaN;
    },
    a,
    b,
  );
}
(integralRaw as unknown as { rawArgs: boolean }).rawArgs = true;

function indefiniteRaw(args: MathNode[], _math: unknown, scope: ScopeLike): number {
  if (args.length !== 2) throw new Error('indefinite(f, x) takes 2 arguments');
  symbolName(args[1]);
  const val = args[0].compile().evaluate(scope);
  return typeof val === 'number' ? val : NaN;
}
(indefiniteRaw as unknown as { rawArgs: boolean }).rawArgs = true;

math.import(
  {
    ln: (x: number) => math.log(x) as number,
    arcsin: (x: number) => math.asin(x) as number,
    arccos: (x: number) => math.acos(x) as number,
    arctan: (x: number) => math.atan(x) as number,
    arcsec: (x: number) => math.asec(x) as number,
    arccsc: (x: number) => math.acsc(x) as number,
    arccot: (x: number) => math.acot(x) as number,
    integral: integralRaw,
    indefinite: indefiniteRaw,
  },
  { override: true },
);

const FUNCTION_NAMES = new Set([
  'sin', 'cos', 'tan', 'sec', 'csc', 'cot',
  'asin', 'acos', 'atan', 'asec', 'acsc', 'acot',
  'arcsin', 'arccos', 'arctan', 'arcsec', 'arccsc', 'arccot',
  'sinh', 'cosh', 'tanh', 'ln', 'log', 'log10', 'log2', 'exp', 'sqrt', 'cbrt', 'nthRoot', 'abs',
  'integral', 'indefinite', 'pow', 'max', 'min',
]);
const CONSTANT_NAMES = new Set(['pi', 'e', 'C']);

export class ExprError extends Error {}

const parseCache = new Map<string, MathNode>();
export function parseExpr(expr: string): MathNode {
  let node = parseCache.get(expr);
  if (!node) {
    try {
      node = math.parse(expr);
    } catch (err) {
      throw new ExprError(`Cannot parse expression "${expr}": ${(err as Error).message}`);
    }
    parseCache.set(expr, node);
  }
  return node;
}

/** Free variables of an expression (excluding function names and constants). Sorted. */
export function freeVariables(expr: string): string[] {
  const node = parseExpr(expr);
  const vars = new Set<string>();
  const bound = new Set<string>();
  node.traverse((n, path, parent) => {
    if (n.type === 'FunctionNode') {
      const fnName = (n as unknown as { fn: { name: string } }).fn.name;
      if (fnName === 'integral' || fnName === 'indefinite') {
        const args = (n as unknown as { args: MathNode[] }).args;
        if (args[1]?.type === 'SymbolNode') bound.add((args[1] as unknown as { name: string }).name);
      }
    }
    if (n.type === 'SymbolNode' && path !== 'fn') {
      const name = (n as unknown as { name: string }).name;
      if (parent?.type === 'FunctionNode' && path === 'fn') return;
      if (FUNCTION_NAMES.has(name) || CONSTANT_NAMES.has(name)) return;
      vars.add(name);
    }
  });
  for (const b of bound) vars.delete(b);
  return [...vars].sort();
}

const compileCache = new Map<string, { evaluate(scope: Map<string, unknown>): unknown }>();

/**
 * Evaluate an expression at a scope. Returns NaN for anything that is not a finite real number
 * (complex results, matrices, errors), unless the result is a numeric array, in which case an
 * array of numbers is returned (used for vector answers like `[4 - y^2, 0]`).
 */
export function evaluate(expr: string, scope: Record<string, number>): number | number[] {
  let compiled = compileCache.get(expr);
  if (!compiled) {
    compiled = parseExpr(expr).compile();
    compileCache.set(expr, compiled);
  }
  const m = new Map<string, unknown>(Object.entries(scope));
  m.set('C', 0);
  let val: unknown;
  try {
    val = compiled.evaluate(m);
  } catch {
    return NaN;
  }
  return normalize(val);
}

function normalize(val: unknown): number | number[] {
  if (typeof val === 'number') return Number.isFinite(val) ? val : NaN;
  if (val && typeof (val as { toArray?: unknown }).toArray === 'function') {
    val = (val as { toArray(): unknown }).toArray();
  }
  if (Array.isArray(val)) {
    return val.map((x) => {
      const n = normalize(x);
      return typeof n === 'number' ? n : NaN;
    });
  }
  return NaN;
}

/** Evaluate and require a scalar (arrays → NaN). */
export function evaluateScalar(expr: string, scope: Record<string, number>): number {
  const v = evaluate(expr, scope);
  return typeof v === 'number' ? v : NaN;
}
