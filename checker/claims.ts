/**
 * Numeric checks for "claim" check kinds (test-time only): improper integrals, limits of sequences
 * and series. These validate the check itself (the claimed convergence / value), independently of
 * the option list. They are necessary conditions, not proofs: a `math-verifier` still re-derives
 * every verdict under the exact test statements. Never loosen a threshold here to make content
 * pass — fix the content.
 */
import type { Check } from '../content/types';
import type { Issue } from './validate';
import { evaluate, freeVariables, parseExpr } from './mathenv';
import { isFiniteNumber, tanhSinh } from './numeric';

export type ClaimCheck = Extract<Check, { kind: 'improper-integral' | 'limit' | 'series' }>;

export function isClaimCheck(check: Check | undefined): check is ClaimCheck {
  return !!check && (check.kind === 'improper-integral' || check.kind === 'limit' || check.kind === 'series');
}

export interface ClaimResult {
  issues: Issue[];
  /** The numeric target the correct option must equal (value / limit / sum), when there is one. */
  target?: number;
  /** True when the check carries a numeric target (even if it could not be evaluated). */
  hasTarget: boolean;
}

const cache = new WeakMap<ClaimCheck, ClaimResult>();

/** Evaluate a claim check once per check object (generators create a fresh object per seed). */
export function evalClaim(check: ClaimCheck, where: string): ClaimResult {
  const hit = cache.get(check);
  if (hit) return hit;
  let res: ClaimResult;
  try {
    res = check.kind === 'improper-integral' ? improper(check, where) : check.kind === 'limit' ? limit(check, where) : series(check, where);
  } catch (err) {
    res = { issues: [{ level: 'error', code: 'claim-error', where, message: `${check.kind}: ${(err as Error).message}` }], hasTarget: false };
  }
  cache.set(check, res);
  return res;
}

/** Expressions inside a claim check that must parse (used by the generic parse pass). */
export function claimExprs(check: ClaimCheck): string[] {
  switch (check.kind) {
    case 'improper-integral':
      return [check.integrand, ...[check.lower, check.upper].filter((b) => !isInf(b)), ...(check.value ? [check.value] : []), ...(check.split ?? [])];
    case 'limit':
      return [check.term, ...(isSpecialLimit(check.limit) ? [] : [check.limit])];
    case 'series':
      return [check.term, ...(check.from ? [check.from] : []), ...(check.sum ? [check.sum] : [])];
  }
}

function isInf(s: string): boolean {
  const t = s.trim().toLowerCase();
  return t === 'inf' || t === '-inf' || t === 'infinity' || t === '-infinity';
}
function isSpecialLimit(s: string): boolean {
  const t = s.trim().toLowerCase();
  return t === 'infinity' || t === '-infinity' || t === 'dne';
}

function constant(expr: string, label: string): number {
  const val = evaluate(expr, {});
  if (typeof val !== 'number' || !isFiniteNumber(val)) throw new Error(`${label} "${expr}" is not a finite constant`);
  return val;
}

function compiled(expr: string, v: string): (x: number) => number {
  const node = parseExpr(expr).compile();
  const scope = new Map<string, unknown>([[v, 0], ['C', 0]]);
  return (x: number) => {
    scope.set(v, x);
    try {
      const val = node.evaluate(scope);
      return typeof val === 'number' ? val : NaN;
    } catch {
      return NaN;
    }
  };
}

function singleVariable(expr: string, fallback: string, label: string): string {
  const vars = freeVariables(expr).filter((x) => x !== 'C');
  if (vars.length > 1) throw new Error(`${label} "${expr}" has more than one free variable (${vars.join(', ')})`);
  return vars[0] ?? fallback;
}

const fmt = (x: number): string => (Number.isFinite(x) ? x.toPrecision(6) : String(x));

// ───────────────────────── improper integrals ─────────────────────────

const K_INF = 8; // cutoffs a+10^0 … a+10^8
const K_SING = 9; // cutoffs b−10^0·s … b−10^−9·s

/**
 * Truncation sequence toward one bad endpoint. Returns the partial integrals S_k (k = 0..K) from the
 * good endpoint `from` up to the k-th cutoff, each piece integrated with tanh-sinh.
 */
function truncations(f: (x: number) => number, from: number, bad: number, sign: 1 | -1): number[] {
  // sign = +1: bad endpoint is to the right of `from`; -1: to the left.
  const cutoffs: number[] = [];
  if (!isFiniteNumber(bad)) {
    for (let k = 0; k <= K_INF; k++) cutoffs.push(from + sign * 10 ** k);
  } else {
    const s = Math.min(1, Math.abs(bad - from) / 2);
    for (let k = 0; k <= K_SING; k++) cutoffs.push(bad - sign * s * 10 ** -k);
  }
  const S: number[] = [];
  let acc = 0;
  let prev = from;
  for (const c of cutoffs) {
    acc += tanhSinh(f, prev, c, 1e-9, 10);
    S.push(acc);
    prev = c;
  }
  return S;
}

/** Full-interval estimate for a convergent piece with one bad endpoint (mapped for ∞). */
function fullEstimate(f: (x: number) => number, from: number, bad: number, sign: 1 | -1): number {
  if (isFiniteNumber(bad)) return tanhSinh(f, from, bad, 1e-10, 12); // same orientation as the truncations
  // x = from + sign·t/(1−t), dx = sign·dt/(1−t)²
  const g = (t: number): number => {
    const u = 1 - t;
    if (u <= 0) return 0;
    return f(from + (sign * t) / u) / (u * u);
  };
  return sign * tanhSinh(g, 0, 1, 1e-10, 12);
}

function looksSingular(f: (x: number) => number, at: number, inward: 1 | -1): boolean {
  for (const h of [1e-3, 1e-6, 1e-9]) {
    const v = f(at + inward * h);
    if (!isFiniteNumber(v) || Math.abs(v) > 1e3) return true;
  }
  return false;
}

function improper(check: Extract<Check, { kind: 'improper-integral' }>, where: string): ClaimResult {
  const issues: Issue[] = [];
  const err = (code: string, message: string) => issues.push({ level: 'error', code, where, message });
  const v = singleVariable(check.integrand, 'x', 'integrand');
  const f = compiled(check.integrand, v);
  const bound = (s: string): number => {
    const t = s.trim().toLowerCase();
    if (t === 'inf' || t === 'infinity') return Infinity;
    if (t === '-inf' || t === '-infinity') return -Infinity;
    return constant(s, 'bound');
  };
  const lo = bound(check.lower);
  const hi = bound(check.upper);
  if (!(lo < hi)) throw new Error(`bounds must satisfy lower < upper (got ${check.lower}, ${check.upper})`);
  const splits = (check.split ?? []).map((s) => constant(s, 'split point')).sort((a, b) => a - b);
  for (const s of splits) if (!(s > lo && s < hi)) throw new Error(`split point ${s} is not strictly inside (${check.lower}, ${check.upper})`);
  if (!isFiniteNumber(lo) && !isFiniteNumber(hi) && splits.length === 0) {
    err('improper-needs-split', `∫ from −∞ to ∞ must be split into two one-sided limits: give split: ['c'] (course rule: never a single symmetric limit)`);
    return { issues, hasTarget: !!check.value };
  }
  const points = [lo, ...splits, hi];
  const target = check.value !== undefined ? constant(check.value, 'value') : undefined;
  if (!check.converges && check.value !== undefined) err('improper-divergent-with-value', 'a divergent integral has no value; drop `value` or set converges: true');

  // Interior singularity scan on every finite piece.
  for (let i = 0; i + 1 < points.length; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (!isFiniteNumber(a) || !isFiniteNumber(b)) continue;
    const n = 400;
    for (let j = 1; j < n; j++) {
      const x = a + ((b - a) * j) / n;
      const val = f(x);
      if (!isFiniteNumber(val) || Math.abs(val) > 1e6) {
        err('improper-interior-singularity', `integrand is not finite near ${v} = ${fmt(x)} (inside (${fmt(a)}, ${fmt(b)})); add that point to \`split\` (hidden Type II discontinuity)`);
        return { issues, target, hasTarget: target !== undefined };
      }
    }
  }

  // Each piece: at most one bad endpoint after splitting (both endpoints bad ⇒ split in the middle).
  type Piece = { from: number; bad: number; sign: 1 | -1; S: number[]; full: number };
  const pieces: Piece[] = [];
  let plainTotal = 0; // pieces with no bad endpoint
  for (let i = 0; i + 1 < points.length; i++) {
    const a = points[i];
    const b = points[i + 1];
    const badA = !isFiniteNumber(a) || looksSingular(f, a, 1);
    const badB = !isFiniteNumber(b) || looksSingular(f, b, -1);
    if (!badA && !badB) {
      plainTotal += tanhSinh(f, a, b, 1e-10, 12);
      continue;
    }
    const mid = isFiniteNumber(a) && isFiniteNumber(b) ? (a + b) / 2 : isFiniteNumber(a) ? a + 1 : b - 1;
    const parts: { from: number; bad: number; sign: 1 | -1 }[] = [];
    if (badA && badB) {
      parts.push({ from: mid, bad: a, sign: -1 }, { from: mid, bad: b, sign: 1 });
    } else if (badB) parts.push({ from: a, bad: b, sign: 1 });
    else parts.push({ from: b, bad: a, sign: -1 });
    for (const p of parts) {
      const S = truncations(f, p.from, p.bad, p.sign);
      const full = fullEstimate(f, p.from, p.bad, p.sign);
      pieces.push({ ...p, S, full });
    }
  }
  // Orientation: truncations toward a left bad endpoint integrate from `from` leftward, which is
  // −∫_bad^from. Fix the sign so every S is the contribution to ∫_lo^hi.
  for (const p of pieces) {
    if (p.sign === -1) {
      p.S = p.S.map((x) => -x);
      p.full = -p.full;
    }
  }

  const describe = (p: Piece): string =>
    `${p.sign === 1 ? `from ${fmt(p.from)} toward ${isFiniteNumber(p.bad) ? fmt(p.bad) : '∞'}` : `from ${isFiniteNumber(p.bad) ? fmt(p.bad) : '−∞'} up to ${fmt(p.from)}`}`;

  let anyDivergent = false;
  let total = plainTotal;
  for (const p of pieces) {
    const S = p.S;
    const K = S.length - 1;
    const d = S.map((s, k) => (k === 0 ? s : s - S[k - 1]));
    const last = Math.abs(d[K]);
    const scale = Math.max(1, Math.abs(S[K]));
    const nonFinite = S.some((s) => !isFiniteNumber(s));
    const settled = !nonFinite && last <= 1e-4 * scale && Math.abs(d[K - 1]) <= 1e-2 * scale;
    if (check.converges) {
      if (nonFinite || Math.abs(S[K]) > 1e6) {
        err('improper-claimed-convergent', `the truncated integral ${describe(p)} blows up (S = ${S.map(fmt).join(', ')}); the integral diverges or the integrand is wrong`);
        continue;
      }
      // Increments must keep shrinking toward the bad endpoint (p-type integrands shrink by a
      // constant factor per decade; a constant increment, as for 1/x, is divergence).
      const shrinking = Math.abs(d[K]) <= 0.9 * Math.abs(d[K - 2]) + 1e-12 && Math.abs(d[K - 1]) <= 0.9 * Math.abs(d[K - 3]) + 1e-12;
      if (!shrinking || last > 0.1 * scale) {
        err('improper-claimed-convergent', `truncated integrals ${describe(p)} do not settle (increments ${d.slice(-4).map(fmt).join(', ')}); the integral looks divergent`);
        continue;
      }
      if (!isFiniteNumber(p.full)) {
        err('improper-estimate-failed', `could not estimate the convergent piece ${describe(p)} numerically; use check { kind: 'none' } with a reason if the integrand is unusual`);
        continue;
      }
      total += p.full;
    } else if (settled) {
      // looks convergent – but only a contradiction if every piece settles (handled below)
    } else anyDivergent = true;
  }
  if (!check.converges && pieces.length > 0 && !anyDivergent) {
    err('improper-claimed-divergent', `every truncated piece settles (${pieces.map((p) => `${describe(p)}: S = ${p.S.slice(-3).map(fmt).join(', ')}`).join('; ')}); the integral looks convergent`);
  }
  if (!check.converges && pieces.length === 0) err('improper-not-improper', 'no infinite bound or endpoint singularity was found; this is an ordinary definite integral and cannot diverge');
  if (check.converges && target !== undefined && !issues.some((i) => i.level === 'error')) {
    const tol = 1e-4 * Math.max(1, Math.abs(target));
    if (Math.abs(total - target) > tol) {
      err('improper-value-wrong', `the integral evaluates to ≈ ${fmt(total)} but value is "${check.value}" = ${fmt(target)}`);
    }
  }
  return { issues, target, hasTarget: target !== undefined };
}

// ───────────────────────── limits of sequences ─────────────────────────

const LIMIT_SAMPLES = [1e3, 1e4, 1e5, 1e6];

function limit(check: Extract<Check, { kind: 'limit' }>, where: string): ClaimResult {
  const issues: Issue[] = [];
  const err = (code: string, message: string) => issues.push({ level: 'error', code, where, message });
  const v = check.variable ?? singleVariable(check.term, 'n', 'term');
  const a = compiled(check.term, v);
  const vals = LIMIT_SAMPLES.map(a);
  const spec = check.limit.trim().toLowerCase();
  const show = `a(${LIMIT_SAMPLES.map((n) => n.toExponential(0)).join(', ')}) = ${vals.map(fmt).join(', ')}`;
  if (spec === 'infinity' || spec === '-infinity') {
    const sgn = spec === 'infinity' ? 1 : -1;
    const ok =
      vals.every((x) => isFiniteNumber(x) && Math.sign(x) === sgn || (x === sgn * Infinity)) &&
      vals.every((x, i) => i === 0 || Math.abs(x) > Math.abs(vals[i - 1]) || x === sgn * Infinity) &&
      Math.abs(vals[3]) >= 1.5 * Math.abs(vals[0]) &&
      Math.abs(vals[3]) > 5;
    if (!ok) err('limit-claim-wrong', `the term does not grow without bound toward ${sgn > 0 ? '+∞' : '−∞'}: ${show}`);
    return { issues, hasTarget: false };
  }
  if (spec === 'dne') {
    // Not settling: spread over a window of consecutive integers at two scales.
    const windows = [1e4, 1e6].map((n0) => Array.from({ length: 25 }, (_, i) => a(n0 + i)));
    const bad = windows.some((w) => w.some((x) => !isFiniteNumber(x)));
    const spread = (w: number[]) => Math.max(...w) - Math.min(...w);
    const mag = Math.max(1, ...windows.flat().map((x) => Math.abs(x)));
    if (bad) err('limit-claim-wrong', `the term is not finite at large ${v}: ${show}; use 'infinity' / '-infinity' for unbounded terms`);
    else if (windows.some((w) => spread(w) <= 1e-3 * mag)) err('limit-claim-wrong', `the term settles (window spread ${windows.map((w) => fmt(spread(w))).join(', ')}); it does not "not exist": ${show}`);
    return { issues, hasTarget: false };
  }
  const L = constant(check.limit, 'limit');
  const errs = vals.map((x) => Math.abs(x - L));
  const finite = vals.every(isFiniteNumber);
  const shrinking = errs.every((e, i) => i === 0 || e <= errs[i - 1] + 1e-12);
  const close = errs[3] <= 0.1 * Math.max(1, Math.abs(L)) && (errs[3] <= 1e-9 || errs[3] <= 0.6 * errs[0]);
  if (!finite || !shrinking || !close) err('limit-claim-wrong', `the term does not approach ${check.limit} = ${fmt(L)}: ${show}`);
  return { issues, target: L, hasTarget: true };
}

// ───────────────────────── series ─────────────────────────

const SERIES_N = [100, 1000, 5000, 10000];

function series(check: Extract<Check, { kind: 'series' }>, where: string): ClaimResult {
  const issues: Issue[] = [];
  const err = (code: string, message: string) => issues.push({ level: 'error', code, where, message });
  const v = singleVariable(check.term, 'n', 'term');
  const a = compiled(check.term, v);
  const from = check.from !== undefined ? constant(check.from, 'from') : 1;
  if (!Number.isInteger(from)) throw new Error(`from "${check.from}" must be an integer`);
  const target = check.sum !== undefined ? constant(check.sum, 'sum') : undefined;
  if (!check.converges && check.sum !== undefined) err('series-divergent-with-sum', 'a divergent series has no sum; drop `sum` or set converges: true');
  const N = SERIES_N[SERIES_N.length - 1];
  const S: number[] = [];
  const terms: number[] = [];
  let acc = 0;
  let blown = false;
  for (let n = from; n <= from + N; n++) {
    const t = a(n);
    if (!isFiniteNumber(t) || Math.abs(acc) > 1e12) {
      // Overflow of a geometric-type divergent series is fine; a non-finite term before the sums
      // blow up means the term is undefined somewhere (e.g. division by zero at the first index).
      if (Math.abs(acc) > 1e12 || (isFiniteNumber(acc) && Math.abs(acc) > 1e6 && !isFiniteNumber(t) && n > from + 10)) blown = true;
      else err('series-term-not-finite', `the term is not finite at ${v} = ${n} (a = ${String(t)})`);
      break;
    }
    acc += t;
    const k = n - from + 1;
    if (SERIES_N.includes(k)) {
      S.push(acc);
      terms.push(t);
    }
  }
  if (blown) {
    if (check.converges) err('series-claimed-convergent', `partial sums blow up (|S| > 1e6 before ${v} = ${from + N})`);
    return { issues, target, hasTarget: target !== undefined };
  }
  if (issues.some((i) => i.level === 'error')) return { issues, target, hasTarget: target !== undefined };
  const show = `S(${SERIES_N.join(', ')}) = ${S.map(fmt).join(', ')}; last terms ${terms.map(fmt).join(', ')}`;
  const inc = S.map((s, i) => (i === 0 ? s : s - S[i - 1]));
  const scale = Math.max(1, Math.abs(S[3]));
  if (check.converges) {
    const termsToZero = Math.abs(terms[3]) < 1e-2 && Math.abs(terms[3]) <= Math.abs(terms[1]) + 1e-12;
    if (!termsToZero) err('series-claimed-convergent', `the terms do not tend to 0 (divergence test): ${show}`);
    else if (Math.abs(S[3]) > 1e6) err('series-claimed-convergent', `partial sums blow up: ${show}`);
    else if (Math.abs(inc[3]) > 0.5 * scale) err('series-claimed-convergent', `partial sums keep growing: ${show}`);
    if (target !== undefined && !issues.some((i) => i.level === 'error')) {
      const e = S.map((s) => Math.abs(s - target));
      const ok = e[3] <= Math.max(1e-6, 0.05 * Math.abs(target)) && (e[3] <= 1e-9 || e[3] < e[1]);
      if (!ok) err('series-sum-wrong', `partial sums do not approach sum "${check.sum}" = ${fmt(target)}: ${show}`);
    }
  } else {
    const settled = Math.abs(inc[3]) <= 1e-4 * scale && Math.abs(terms[3]) <= 1e-6 * scale;
    if (settled) err('series-claimed-divergent', `partial sums settle, the series looks convergent: ${show}`);
  }
  return { issues, target, hasTarget: target !== undefined };
}
