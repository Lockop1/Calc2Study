/**
 * Tests for checker/latex2math.ts. Conversions are checked NUMERICALLY against a hand-written
 * mathjs expression at several sample points (parenthesization is free), using the same mathjs
 * environment as the content checks. Only a few trivial cases compare exact strings.
 */
import { describe, expect, it } from 'vitest';
import { evaluate } from '../checker/mathenv';
import { LatexParseError, latexToMath, tryLatexToMath } from '../checker/latex2math';

type Range = [number, number];
type Ranges = Record<string, Range>;

/** Every symbol the tests use, so none is left unbound (mathjs would read a bare `m` as metres). */
const VARIABLES = [
  'x', 'y', 't', 'u', 'v', 'w', 'z', 'a', 'b', 'c', 'f', 'g', 'n', 'k', 'm', 'p', 's', 'R', 'r', 'h', 'H', 'A',
  'theta', 'alpha', 'beta', 'gamma', 'phi', 'omega', 'lambda',
  'dx', 'dy', 'dt', 'du', 'dv', 'dr', 'dtheta',
];
const DEFAULT_RANGE: Range = [0.2, 0.9];
const POINTS = 4;

/** Small deterministic PRNG (mulberry32) so failures reproduce. */
function prng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sample scopes: every variable uniform in its range (DEFAULT_RANGE unless overridden). */
function scopes(ranges: Ranges = {}): Record<string, number>[] {
  const rand = prng(20260924);
  return Array.from({ length: POINTS }, () => {
    const scope: Record<string, number> = {};
    for (const name of VARIABLES) {
      const [lo, hi] = ranges[name] ?? DEFAULT_RANGE;
      scope[name] = lo + (hi - lo) * rand();
    }
    return scope;
  });
}

function close(a: number, b: number, rel = 1e-9): boolean {
  return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= rel * Math.max(Math.abs(a), Math.abs(b)) + 1e-12;
}

/** Asserts that `latex` converts to an expression equal to `expected` at every sample point. */
function expectSame(latex: string, expected: string, ranges: Ranges = {}): void {
  const expr = latexToMath(latex);
  for (const scope of scopes(ranges)) {
    const want = evaluate(expected, scope);
    const got = evaluate(expr, scope);
    const where = `${latex}  →  ${expr}  vs  ${expected}  (x = ${scope.x})`;
    if (Array.isArray(want)) {
      expect(Array.isArray(got), `${where}: expected a vector, got ${got}`).toBe(true);
      const items = got as number[];
      expect(items.length, where).toBe(want.length);
      want.forEach((w, k) => {
        expect(Number.isFinite(w), `${where}: item ${k} of the expected value is not finite`).toBe(true);
        expect(close(items[k], w), `${where}: item ${k} is ${items[k]}, want ${w}`).toBe(true);
      });
    } else {
      expect(Number.isFinite(want), `${where}: expected value ${want} is not finite (bad test domain)`).toBe(true);
      expect(typeof got === 'number' && close(got, want), `${where}: got ${got}, want ${want}`).toBe(true);
    }
  }
}

/** Asserts that a constant expression (e.g. a definite integral) has the given closed-form value. */
function expectValue(latex: string, value: number): void {
  const expr = latexToMath(latex);
  const got = evaluate(expr, {});
  expect(typeof got === 'number' && close(got, value, 1e-9), `${latex} → ${expr} = ${got}, want ${value}`).toBe(true);
}

/** Asserts that `latex` is rejected with a LatexParseError whose message matches `pattern`. */
function expectError(latex: string, pattern?: RegExp): LatexParseError {
  const result = tryLatexToMath(latex);
  expect(result.ok, `${latex} should be rejected, got ${result.ok ? result.expr : ''}`).toBe(false);
  if (result.ok) throw new Error('unreachable');
  expect(result.error).toBeInstanceOf(LatexParseError);
  expect(result.error.latex).toBe(latex);
  expect(Number.isInteger(result.error.position)).toBe(true);
  if (pattern) expect(result.error.message).toMatch(pattern);
  expect(() => latexToMath(latex)).toThrow(LatexParseError);
  return result.error;
}

describe('whitespace and spacing', () => {
  it('ignores spaces, \\, \\; \\: \\! \\  and ~', () => {
    expectSame('x\\,+\\;2\\:x\\!-\\ 1~+ 3 x', 'x + 2*x - 1 + 3*x');
  });
  it('treats \\quad and \\qquad inside an item as whitespace', () => {
    expectSame('(x \\quad + \\qquad 1)^2', '(x + 1)^2');
    expectSame('2x\\quad dx', '2*x*dx');
    expectSame('2x\\qquad dx', '2*x*dx');
    expectSame('\\int_0^1 x^2 \\quad dx', '1/3');
  });
  it('ignores \\displaystyle', () => {
    expectSame('\\displaystyle \\frac{1}{x} + \\displaystyle x', '1/x + x');
  });
  it('ignores \\left and \\right, including the invisible \\left. and \\right.', () => {
    expectSame('\\left( x + 1 \\right)^2', '(x + 1)^2');
    expectSame('2\\left. x^2 \\right.', '2*x^2');
  });
  it('uses {…} for grouping; a free-standing group is invisible, so it reads as rendered', () => {
    expectSame('{x}^2 + {2x} + \\sin{2x}', 'x^2 + 2*x + sin(2*x)');
    expectSame('e^{2x} + x^{3}', 'exp(2*x) + x^3');
    expectSame('2{x+1}', '2*x + 1'); // renders as 2x+1
    expectSame('{x+1}^2', 'x + 1'); // renders as x+1²
  });
  it('ignores \\bigl \\bigr \\Bigl \\Bigr \\big \\Big', () => {
    expectSame('\\bigl(x+1\\bigr)\\Bigl(x-1\\Bigr) + \\big(x\\big)^2 + \\Big[2x\\Big]', '(x+1)*(x-1) + x^2 + 2*x');
  });
});

describe('numbers and constants', () => {
  it('reads integers and decimals, including a leading dot', () => {
    expectSame('12x + 0.5x + .5', '12*x + 0.5*x + 0.5');
  });
  it('turns \\frac, \\dfrac and \\tfrac into parenthesized quotients', () => {
    expectSame('\\frac{x}{3} + \\dfrac{1}{x} + \\tfrac{x+1}{2}', 'x/3 + 1/x + (x+1)/2');
    expectSame('\\frac12 x + \\frac{1}{2x}', 'x/2 + 1/(2*x)'); // single-token arguments like TeX
  });
  it('reads \\pi as pi', () => {
    expect(latexToMath('\\pi')).toBe('pi');
    expectSame('3\\pi + \\pi x', '3*pi + pi*x');
  });
  it('always reads e as Euler’s number, never a variable', () => {
    expect(latexToMath('e')).toBe('e');
    expect(evaluate(latexToMath('2e'), { x: 1 })).toBeCloseTo(2 * Math.E, 12);
    expectSame('\\mathrm{e}^x + x e', 'exp(x) + x*e');
  });
  it('rejects \\infty', () => {
    expectError('\\int_0^\\infty e^{-x}\\,dx', /\\infty/);
  });
});

describe('variables', () => {
  it('reads every Latin letter except e and d as a variable', () => {
    expectSame(
      'x + y + t + u + v + w + z + a + b + c + n + k + m + R + r + h + H + A + C',
      'x + y + t + u + v + w + z + a + b + c + n + k + m + R + r + h + H + A',
    );
  });
  it('reads Greek letters by name', () => {
    expectSame(
      '\\theta + \\alpha + \\phi + \\varphi + \\beta + \\gamma + \\omega + \\lambda',
      'theta + alpha + 2*phi + beta + gamma + omega + lambda',
    );
  });
  it('reads d followed by a variable as a differential symbol', () => {
    expectSame('x\\,dx + dy + dt + du + dv + d\\theta + dr', 'x*dx + dy + dt + du + dv + dtheta + dr');
    expectSame('3\\cos\\theta\\, d \\, \\theta + \\mathrm{d}x', '3*cos(theta)*dtheta + dx');
  });
  it('never reads d as a variable', () => {
    expectError('d', /letter d/);
    expectError('x d', /letter d/);
    expectError('d + x', /letter d/);
  });
  it('rejects subscripts', () => {
    expectError('x_1', /subscript/);
    expectError('a_n + 1', /subscript/);
  });
});

describe('operators', () => {
  it('handles binary and unary + and -', () => {
    expectSame('-x + y - -z + (+t)', '-x + y + z + t');
  });
  it('reads \\cdot, \\times and * as multiplication and / as division', () => {
    expectSame('2\\cdot x \\times y * z', '2*x*y*z');
    expectSame('x/y/2', '(x/y)/2');
  });
  it('reads ^ with a braced or single-token exponent', () => {
    expectSame('x^2 + x^{3/2} + x^{-1} + e^{2x} + 2^x', 'x^2 + x^(3/2) + 1/x + exp(2*x) + 2^x');
    expectSame('x^23', 'x^2*3'); // TeX takes one character: renders as x²3
    expectSame('x^\\frac{1}{2} + x^\\pi', 'sqrt(x) + x^pi');
  });
  it('multiplies juxtaposed factors', () => {
    expectSame('2x + x\\sin x + 3\\pi + 2\\sqrt{x} + \\frac{1}{2}x + x^2 y', '2*x + x*sin(x) + 3*pi + 2*sqrt(x) + x/2 + x^2*y');
    expectSame('(x+1)(x-1)', 'x^2 - 1');
  });
  it('binds ^ tighter than unary minus, and unary minus tighter than products', () => {
    expectSame('-x^2', '-(x^2)');
    expectSame('-\\frac{1}{2}\\cos 2x', '-(cos(2*x)/2)');
    expectSame('\\frac{1}{2x}', '1/(2*x)');
    expectSame('x^{\\frac{3}{2}}', 'x^(3/2)');
  });
  it('rejects \\pm and two numbers in a row', () => {
    expectError('1 \\pm x', /\\pm/);
    expectError('2 3', /two numbers/);
  });
});

describe('exponents on function names', () => {
  it('applies the power to the function value', () => {
    expectSame('\\sin^2 x + \\sin^2(x) + \\tan^{2}(x) + \\ln^2(x)', '2*sin(x)^2 + tan(x)^2 + log(x)^2');
    expectSame('\\sec^3\\theta', 'sec(theta)^3');
  });
  it('reads ^{-1} on a trig function as the inverse function', () => {
    expectSame('\\sin^{-1}(x) + \\cos^{-1}(x) + \\tan^{-1} x', 'asin(x) + acos(x) + atan(x)');
    expectSame('\\sec^{-1}(x) + \\csc^{-1}(x) + \\cot^{-1}(x)', 'asec(x) + acsc(x) + acot(x)', { x: [1.2, 3] });
    expectSame('\\sinh^{-1} x + \\tanh^{-1}(x)', 'asinh(x) + atanh(x)');
  });
  it('rejects ^{-1} where inverse and reciprocal are ambiguous', () => {
    expectError('\\ln^{-1} x', /ambiguous/);
  });
});

describe('functions', () => {
  it('reads trig, inverse trig, hyperbolic, ln and exp', () => {
    expectSame('\\sin x + \\cos x + \\tan x + \\sec x + \\csc x + \\cot x', 'sin(x) + cos(x) + tan(x) + 1/cos(x) + 1/sin(x) + 1/tan(x)');
    expectSame('\\arcsin x + \\arccos x + \\arctan x', 'asin(x) + acos(x) + atan(x)');
    expectSame('\\sinh x + \\cosh x + \\tanh x', 'sinh(x) + cosh(x) + tanh(x)');
    expectSame('\\ln x + \\exp(x) + \\exp x', 'log(x) + 2*exp(x)');
  });
  it('reads \\operatorname{…} and \\text{…} function names', () => {
    expectSame('\\operatorname{arcsec}(x) + \\operatorname{arccsc} x + \\operatorname{arccot}(x)', 'asec(x) + acsc(x) + acot(x)', { x: [1.2, 3] });
    expectSame('\\operatorname{arcsin}(x) + \\text{arcsec}(x + 1)', 'asin(x) + asec(x + 1)');
    expectError('\\arcsec x', /operatorname\{arcsec\}/); // KaTeX has no \arcsec
  });
  it('reads logarithms with and without a base', () => {
    expectSame('\\log_{10}(x) + \\log_{10} x', '2*log10(x)');
    expectSame('\\log_a x + \\log_{a}(x) + \\log_2 x', '2*log(x, a) + log(x, 2)', { a: [1.5, 4] });
    expectSame('\\log x', 'log(x)');
  });
  it('reads square roots and nth roots', () => {
    expectSame('\\sqrt{x} + \\sqrt[3]{x^2} + \\sqrt[n]{x}', 'sqrt(x) + x^(2/3) + x^(1/n)', { n: [2, 5] });
  });
  it('reads powers of e as exp', () => {
    expect(latexToMath('e^{x}')).toBe('exp(x)');
    expectSame('e^{x} + e^x + e^{-x^2}', '2*exp(x) + exp(-(x^2))');
  });
});

describe('function arguments', () => {
  it('accepts parenthesized, bracketed, braced and |…| arguments', () => {
    expectSame('\\sin(x+1) + \\sin\\left(x+1\\right) + \\sin[x+1] + \\sin\\{x+1\\}', '4*sin(x+1)');
    expectSame('\\ln|x - 1| + \\ln\\left|x - 1\\right|', '2*log(abs(x - 1))');
  });
  it('reads a bare argument the standard way', () => {
    expectSame('\\sin x', 'sin(x)');
    expectSame('\\sin 2x', 'sin(2*x)');
    expectSame('\\cos 2\\theta', 'cos(2*theta)');
    expectSame('\\sin x \\cos x', 'sin(x)*cos(x)');
    expectSame('\\ln x^2', 'log(x^2)');
    expectSame('\\sin x^2', 'sin(x^2)');
    expectSame('\\sin \\frac{x}{2}', 'sin(x/2)');
    expectSame('\\sin \\pi x', 'sin(pi*x)');
    expectSame('\\ln 2x', 'log(2*x)');
    expectSame('\\sin x\\,dx', 'sin(x)*dx');
    expectSame('\\sec^2 x \\tan x', 'sec(x)^2*tan(x)');
    expectSame('2\\sin x', '2*sin(x)');
    expectSame('\\sin(x)^2', 'sin(x)^2');
    expectSame('\\ln 5 \\cdot 2x + \\sin x / 2 - \\cos x', 'log(5)*2*x + sin(x)/2 - cos(x)');
    expectSame('\\ln \\ln x + \\sin \\sqrt{x}', 'log(log(x)) + sin(sqrt(x))', { x: [1.5, 3] });
  });
  it('rejects a function name without an argument', () => {
    expectError('\\sin + 1', /\\sin needs an argument/);
    expectError('\\sin', /\\sin needs an argument/);
  });
});

describe('absolute value', () => {
  it('reads |…|, \\left|…\\right| and \\lvert…\\rvert', () => {
    expectSame('|x - 1| + \\left|x - 1\\right| + \\lvert x - 1 \\rvert', '3*abs(x - 1)');
  });
  it('opens a bar where an operand is expected and closes it after a complete operand', () => {
    expectSame('\\ln|x|', 'log(abs(x))', { x: [-3, -0.5] });
    expectSame('\\ln|\\sec x + \\tan x|', 'log(abs(sec(x) + tan(x)))', { x: [2, 3] });
    expectSame('|x|\\sqrt{x^2-1}', 'abs(x)*sqrt(x^2 - 1)', { x: [-3, -1.2] });
    expectSame('\\frac{1}{|x|\\sqrt{x^2-1}}', '1/(abs(x)*sqrt(x^2 - 1))', { x: [-3, -1.2] });
    expectSame('||x| - 1| + |x||y|', 'abs(abs(x) - 1) + abs(x)*abs(y)', { x: [-3, 3], y: [-3, 3] });
  });
  it('rejects an unclosed bar', () => {
    expectError('|x + 1', /'\|'/);
  });
});

describe('parentheses and brackets', () => {
  it('groups with ( ), [ ], \\{ \\} with or without \\left/\\right', () => {
    expectSame(
      '(x+1)^2 + \\left(x-1\\right)^2 + [x+2]^2 + \\left[x-2\\right]^2 + \\{x+3\\}^2 + \\left\\{x-3\\right\\}^2',
      '(x+1)^2 + (x-1)^2 + (x+2)^2 + (x-2)^2 + (x+3)^2 + (x-3)^2',
    );
  });
  it('rejects unbalanced or mismatched delimiters', () => {
    expectError('(x + 1', /unbalanced '\('/);
    expectError('x + 1)', /unbalanced '\)'/);
    expectError('\\frac{1}{x', /unbalanced '\{'/);
    expectError('\\left( x \\right]', /closed by '\]'/);
  });
});

describe('integrals', () => {
  it('converts definite integrals with braced, bare and swapped bounds', () => {
    expect(latexToMath('\\int_0^1 x\\,dx')).toBe('integral(x, x, 0, 1)');
    expectValue('\\int_{0}^{1} x^2 \\, dx', 1 / 3);
    expectValue('\\int_0^1 x^2\\,dx', 1 / 3);
    expectValue('\\int^1_0 x^2\\,dx', 1 / 3);
    expectValue('\\displaystyle\\int_0^1 x^2 + 1\\,dx', 4 / 3); // the integrand runs to the differential
  });
  it('accepts the differentials dx, dy, dt, du and d\\theta', () => {
    expectValue('\\int_0^1 y\\,dy + \\int_0^1 t\\,dt + \\int_0^1 u\\,du + \\int_0^{\\pi} \\sin\\theta\\,d\\theta', 3 / 2 + 2);
  });
  it('accepts every bound form', () => {
    expectValue('\\int_0^{\\pi/2} \\cos x\\,dx', 1);
    expectValue('\\int_{-1}^{1} x^2\\,dx', 2 / 3);
    expectValue('\\int_0^\\pi \\sin x\\,dx', 2);
    expectValue('\\int_0^{\\frac{\\pi}{4}} \\sec^2 x\\,dx', 1);
    expectValue('\\int_1^{\\sqrt{2}} 2x\\,dx', 1);
    expectValue('\\int_0^1 dx', 1);
  });
  it('keeps other variables free', () => {
    expectSame('\\int_0^1 (x + a)\\,dx', '1/2 + a');
  });
  it('converts indefinite integrals to their integrand', () => {
    expect(latexToMath('\\int u^3\\,du')).toBe('indefinite(u^3, u)');
    expectSame('\\int \\frac{1}{x}\\,dx', '1/x');
  });
  it('combines integrals with sums, products and coefficients', () => {
    expectValue('\\int_0^1 x\\,dx + \\int_1^2 x\\,dx', 2);
    expectValue('2\\int_0^1 x\\,dx', 1);
    expectValue('\\pi\\int_0^4 x\\,dx', 8 * Math.PI);
    expectValue('\\frac{1}{2}\\int_0^2 x\\,dx', 1);
    expectValue('\\int_0^1 x\\,dx \\cdot \\int_0^2 y\\,dy', 1);
    expectValue('\\int_0^2 x\\,dx - \\int_0^1 x\\,dx', 1.5);
  });
  it('rejects integrals without a differential or with one bound', () => {
    expectError('\\int_0^1 x', /differential/);
    expectError('\\int_0 x\\,dx', /both a lower and an upper bound/);
  });
});

describe('equations and lists', () => {
  it('keeps only the right side of the last top-level =', () => {
    expectSame('y = x^2', 'x^2');
    expectSame('u(1) = 2', '2');
    expectSame('du = 2x\\,dx', '2*x*dx');
    expectSame("f'(x) = 2x", '2*x');
    expectSame('\\frac{dy}{dx} = \\theta(0) = \\frac{\\pi}{6}', 'pi/6');
    expectSame('\\theta = \\frac{\\pi}{6}', 'pi/6');
  });
  it('turns a top-level list into a vector', () => {
    expect(latexToMath('x, y')).toBe('[x, y]');
    expectSame('R = 2 - x^2,\\quad r = x^2', '[2 - x^2, x^2]');
    expectSame('u = x^2 + 1,\\ du = 2x\\,dx', '[x^2 + 1, 2*x*dx]');
    expectSame('x = 3\\sin\\theta,\\ dx = 3\\cos\\theta\\,d\\theta', '[3*sin(theta), 3*cos(theta)*dtheta]');
    expectSame('u=\\ln x,\\; dv = x\\,dx', '[log(x), x*dx]');
    expectSame('u = x; v = y', '[x, y]');
    expectSame('u = x \\text{ and } v = y,\\ \\text{and}\\ w = z', '[x, y, z]');
  });
  it('splits on \\quad only between two complete items', () => {
    expectSame('u = x^2 \\quad du = 2x\\,dx', '[x^2, 2*x*dx]');
    expectSame('R = 1 \\qquad r = x', '[1, x]');
    expectSame('2x\\quad dx', '2*x*dx');
  });
  it('does not split on commas inside delimiters', () => {
    expectError('f(x, y)', /','/);
    expectError('\\left[x, y\\right]', /','/);
  });
  it('keeps a single item scalar', () => {
    expect(typeof evaluate(latexToMath('y = x^2'), { x: 2 })).toBe('number');
  });
  it('rejects ranges and inequalities', () => {
    expectError('u: 1 \\to 2', /':'/);
    expectError('0 \\le x \\le 1', /\\le/);
    expectError('x = 1,', /empty list item/);
  });
});

describe('integration constant', () => {
  it('reads + C as the symbol C', () => {
    expect(latexToMath('\\frac{x^3}{3} + C')).toMatch(/\+ C$/);
    expectSame('\\frac{x^3}{3} + C', 'x^3/3 + C');
  });
});

describe('unsupported constructs', () => {
  it('rejects \\%, \\ldots, \\cdots, \\lim and \\sum', () => {
    expectError('50\\%', /\\%/);
    expectError('x + \\ldots', /\\ldots/);
    expectError('x + \\cdots', /\\cdots/);
    expectError('\\lim_{x \\to 0} x', /\\lim/);
    expectError('\\sum_{k=1}^n k', /\\sum/);
  });
  it('rejects \\text{…} that is not a function name or "and"', () => {
    expectError('\\text{use IBP}', /\\text\{use IBP\}/);
  });
  it('rejects primes outside a skipped left side', () => {
    expectError("f'(x)", /primes/);
  });
  it('rejects the derivative operator', () => {
    expectError('\\frac{d}{dx}x^2', /derivative operator not supported/);
    expectError('\\frac{dy}{dx}', /derivative operator not supported/);
  });
  it('names an unknown command and its position', () => {
    const error = expectError('x + \\foo y', /\\foo/);
    expect(error.position).toBe(4);
    expect(error.message).toMatch(/position 4/);
  });
});

describe('spec cases', () => {
  it('antiderivatives and derivatives', () => {
    expectSame('\\frac{1}{2}\\sin(x^2) + C', 'sin(x^2)/2 + C');
    expectSame('-\\frac{1}{2}\\ln|1 - x^2| + C', '-log(abs(1 - x^2))/2', { x: [1.2, 3] });
    expectSame('-\\frac{1}{2}\\ln|1 - x^2| + C', '-log(1 - x^2)/2');
    expectSame('\\frac{2}{3}x^{3/2}', '2/3*x^(3/2)');
    expectSame('\\sqrt[3]{x^2}', 'nthRoot(x^2, 3)', { x: [-3, 3] });
    expectSame('\\frac{1}{\\sqrt{1-16x^2}}', '1/sqrt(1 - 16*x^2)', { x: [0.01, 0.24] });
    expectSame('\\frac{1}{|x|\\sqrt{x^2-1}}', '1/(abs(x)*sqrt(x^2 - 1))', { x: [1.2, 3] });
    expectSame('e^{2x} - 1', 'exp(2*x) - 1');
    expectSame('x\\ln x', 'x*log(x)');
    expectSame('\\frac{\\sin x}{1+\\cos x}', 'sin(x)/(1 + cos(x))');
    expectSame('5^{x^2}\\ln 5 \\cdot 2x', '5^(x^2)*log(5)*2*x');
    expectSame('\\arccos(\\sqrt{x})', 'acos(sqrt(x))');
    expectSame('\\sec^{-1}(\\sqrt{x}-1)', 'asec(sqrt(x) - 1)', { x: [4.5, 9] });
    expectSame('(\\tan^{-1}x)^2', 'atan(x)^2');
    expectSame('\\sin^{-1}(5x)', 'asin(5*x)', { x: [0.02, 0.19] });
  });
  it('definite integrals', () => {
    expectValue('\\int_0^{\\pi} \\sin^2 x\\,dx', Math.PI / 2);
    expectValue('\\int_{1}^{2} u^3\\,du', 15 / 4);
    expectValue('\\int_0^4 \\pi(\\sqrt{x})^2\\,dx', 8 * Math.PI);
    expectValue('\\int_0^2 2\\pi x(4-x^2)\\,dx', 8 * Math.PI);
    expectValue('\\pi\\int_{-1}^{1}\\left[(2-x^2)^2-(x^2)^2\\right]dx', (16 * Math.PI) / 3);
    expectValue('2\\pi\\int_0^1 x\\left(e^x - x\\right)dx', (4 * Math.PI) / 3);
  });
  it('indefinite integrals', () => {
    expectSame('\\int u^3\\,du', 'u^3');
    expectSame('\\int \\sin^3 x \\cos^2 x\\,dx', 'sin(x)^3*cos(x)^2');
  });
  it('lists', () => {
    expectSame('R = 4 - y^2,\\quad r = 0', '[4 - y^2, 0]');
    expectSame('u = \\cos x,\\ du = -\\sin x\\,dx', '[cos(x), -sin(x)*dx]');
    expectSame('x = 3\\sin\\theta,\\quad dx = 3\\cos\\theta\\,d\\theta', '[3*sin(theta), 3*cos(theta)*dtheta]');
  });
  it('trig antiderivatives', () => {
    expectSame('\\ln|\\sec x + \\tan x| + C', 'log(abs(1/cos(x) + tan(x)))');
    expectSame('\\ln|\\sec x + \\tan x| + C', 'log(abs(1/cos(x) + tan(x)))', { x: [2, 3] });
    expectSame('-\\ln|\\cos x| + C', '-log(abs(cos(x)))', { x: [-3, 3] });
    expectSame('\\frac{1}{2}\\sec x\\tan x + \\frac{1}{2}\\ln|\\sec x + \\tan x| + C', 'tan(x)/(2*cos(x)) + log(abs(1/cos(x) + tan(x)))/2');
    expectSame('\\frac{x}{2} - \\frac{\\sin 2x}{4} + C', 'x/2 - sin(2*x)/4');
    expectSame('\\frac{1}{2}\\left(x - \\frac{\\sin(2x)}{2}\\right) + C', 'x/2 - sin(2*x)/4');
  });
  it('arc length integrands', () => {
    expectSame('\\sqrt{1 + (3x^2)^2}', 'sqrt(1 + 9*x^4)');
    expectSame('\\sqrt{1+\\frac{9}{4}x}', 'sqrt(1 + 9*x/4)');
  });
  it('rejects', () => {
    expectError('\\frac{d}{dx}x^2', /derivative operator not supported/);
    expectError('x_1', /subscript/);
    expectError('\\sin', /needs an argument/);
    expectError('\\int_0^1 x', /differential/);
    expectError('\\text{use IBP}', /use IBP/);
  });
});

describe('tryLatexToMath', () => {
  it('returns the expression for valid input', () => {
    expect(tryLatexToMath('\\sin x')).toEqual({ ok: true, expr: 'sin(x)' });
  });
  it('returns a LatexParseError with a position for invalid input', () => {
    const result = tryLatexToMath('x^2 + \\sqrt[3]{x} + \\beth');
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error).toBeInstanceOf(LatexParseError);
    expect(result.error.name).toBe('LatexParseError');
    expect(result.error.position).toBe(20);
    expect(result.error.latex).toBe('x^2 + \\sqrt[3]{x} + \\beth');
    expect(result.error.message).toContain('\\beth');
  });
});
