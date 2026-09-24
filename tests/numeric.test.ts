import { describe, it, expect } from 'vitest';
import { tanhSinh, numDeriv, approxEqual } from '../checker/numeric';
import { evaluate } from '../checker/mathenv';

const close = (a: number, b: number, rel = 1e-8) => expect(Math.abs(a - b) <= rel * Math.max(1, Math.abs(b)), `${a} vs ${b}`).toBe(true);

describe('quadrature', () => {
  it('smooth integrands', () => {
    close(tanhSinh((x) => x * x, 0, 3), 9);
    close(tanhSinh(Math.sin, 0, Math.PI), 2);
    close(tanhSinh((x) => Math.exp(-x), 0, 5), 1 - Math.exp(-5));
  });
  it('endpoint singularities', () => {
    close(tanhSinh((x) => 1 / Math.sqrt(x), 0, 1), 2);
    close(tanhSinh((x) => Math.sqrt(4 - x * x), -2, 2), 2 * Math.PI);
    close(tanhSinh((x) => Math.log(x), 0, 1), -1);
  });
  it('interior kinks and piecewise integrands', () => {
    close(tanhSinh((x) => Math.abs(x), -1, 1), 1);
    close(tanhSinh((x) => Math.abs(Math.cos(x)), 0, Math.PI), 2);
    close(tanhSinh((x) => x + 3 - 2 * Math.abs(x), -1, 3), 6);
    close(tanhSinh((x) => Math.max(0, x - 0.3), 0, 1), 0.49 / 2);
  });
  it('reversed bounds and zero length', () => {
    close(tanhSinh((x) => x, 2, 0), -2);
    expect(tanhSinh((x) => x, 1, 1)).toBe(0);
  });
  it('through mathjs integral()', () => {
    close(evaluate('integral(abs(x), x, -1, 1)', {}) as number, 1);
    close(evaluate('integral((x+3) - 2*abs(x), x, -1, 3)', {}) as number, 6);
    close(evaluate('integral(sec(x)^3, x, 0, pi/4)', {}) as number, (Math.SQRT2 + Math.log(1 + Math.SQRT2)) / 2);
    close(evaluate('integral(1/sqrt(1-x^2), x, -1, 1)', {}) as number, Math.PI, 1e-6);
  });
});

describe('finite differences', () => {
  it('smooth functions', () => {
    const d = numDeriv(Math.sin, 1);
    expect(d.ok).toBe(true);
    close(d.value, Math.cos(1), 1e-7);
    const e = numDeriv((x) => Math.exp(2 * x), 0.5);
    expect(e.ok).toBe(true);
    close(e.value, 2 * Math.exp(1), 1e-7);
  });
  it('flags kinks', () => {
    expect(numDeriv(Math.abs, 0.0002).ok).toBe(false);
  });
  it('approxEqual rejects NaN', () => {
    expect(approxEqual(NaN, NaN)).toBe(false);
    expect(approxEqual(1, 1 + 1e-9)).toBe(true);
  });
});
