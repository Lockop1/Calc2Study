/**
 * Checker tests for the claim check kinds added for topics 10–14 (improper integrals, limits of
 * sequences, series). Each block has true claims that must pass and false claims that must fail.
 */
import { describe, expect, it } from 'vitest';
import type { Check } from '../content/types';
import { claimIssues } from '../checker/validate';

const codes = (check: Check) => claimIssues('test', check).filter((i) => i.level === 'error').map((i) => i.code);

describe('claims: improper integrals', () => {
  const ok: Check[] = [
    { kind: 'improper-integral', integrand: '1/x^2', lower: '1', upper: 'inf', converges: true, value: '1' },
    { kind: 'improper-integral', integrand: '1/x^(3/2)', lower: '1', upper: 'inf', converges: true, value: '2' },
    { kind: 'improper-integral', integrand: 'exp(-x)', lower: '0', upper: 'inf', converges: true, value: '1' },
    { kind: 'improper-integral', integrand: 'x*exp(-x^2)', lower: '0', upper: 'inf', converges: true, value: '1/2' },
    { kind: 'improper-integral', integrand: '1/(1+x^2)', lower: '-inf', upper: 'inf', converges: true, value: 'pi', split: ['0'] },
    { kind: 'improper-integral', integrand: '1/(1+x^2)', lower: '1', upper: 'inf', converges: true, value: 'pi/4' },
    { kind: 'improper-integral', integrand: 'exp(x)', lower: '-inf', upper: '0', converges: true, value: '1' },
    { kind: 'improper-integral', integrand: '1/sqrt(x)', lower: '0', upper: '1', converges: true, value: '2' },
    { kind: 'improper-integral', integrand: '1/sqrt(4-x)', lower: '0', upper: '4', converges: true, value: '4' },
    { kind: 'improper-integral', integrand: '1/(x-1)^(1/3)', lower: '1', upper: '9', converges: true, value: '6' },
    { kind: 'improper-integral', integrand: 'log(x)', lower: '0', upper: '1', converges: true, value: '-1' },
    { kind: 'improper-integral', integrand: '1/x', lower: '1', upper: 'inf', converges: false },
    { kind: 'improper-integral', integrand: '1/sqrt(x)', lower: '1', upper: 'inf', converges: false },
    { kind: 'improper-integral', integrand: '1/x', lower: '0', upper: '1', converges: false },
    { kind: 'improper-integral', integrand: '1/x^2', lower: '-1', upper: '1', converges: false, split: ['0'] },
    { kind: 'improper-integral', integrand: '1/(x*log(x))', lower: '2', upper: 'inf', converges: false },
    { kind: 'improper-integral', integrand: 'cos(x)', lower: '0', upper: 'inf', converges: false },
    { kind: 'improper-integral', integrand: 'x', lower: '-inf', upper: 'inf', converges: false, split: ['0'] },
    { kind: 'improper-integral', integrand: '1/(x-2)', lower: '0', upper: '3', converges: false, split: ['2'] },
    { kind: 'improper-integral', integrand: '1/(x-2)^2', lower: '0', upper: '3', converges: false, split: ['2'] },
  ];
  for (const c of ok) it(`accepts ${JSON.stringify(c)}`, () => expect(codes(c)).toEqual([]));

  const bad: [Check, string][] = [
    [{ kind: 'improper-integral', integrand: '1/x', lower: '1', upper: 'inf', converges: true, value: '1' }, 'improper-claimed-convergent'],
    [{ kind: 'improper-integral', integrand: '1/x^2', lower: '1', upper: 'inf', converges: false }, 'improper-claimed-divergent'],
    [{ kind: 'improper-integral', integrand: '1/x^2', lower: '1', upper: 'inf', converges: true, value: '2' }, 'improper-value-wrong'],
    [{ kind: 'improper-integral', integrand: 'exp(-x)', lower: '0', upper: 'inf', converges: true, value: '0' }, 'improper-value-wrong'],
    [{ kind: 'improper-integral', integrand: '1/sqrt(x)', lower: '0', upper: '1', converges: false }, 'improper-claimed-divergent'],
    [{ kind: 'improper-integral', integrand: '1/x', lower: '0', upper: '1', converges: true, value: '1' }, 'improper-claimed-convergent'],
    [{ kind: 'improper-integral', integrand: '1/x^2', lower: '-1', upper: '1', converges: false }, 'improper-interior-singularity'],
    [{ kind: 'improper-integral', integrand: '1/x^2', lower: '-1', upper: '1', converges: true, value: '-2' }, 'improper-interior-singularity'],
    [{ kind: 'improper-integral', integrand: '1/(1+x^2)', lower: '-inf', upper: 'inf', converges: true, value: 'pi' }, 'improper-needs-split'],
    [{ kind: 'improper-integral', integrand: 'x', lower: '-inf', upper: 'inf', converges: true, value: '0', split: ['0'] }, 'improper-claimed-convergent'],
    [{ kind: 'improper-integral', integrand: '1/x', lower: '1', upper: 'inf', converges: false, value: '1' }, 'improper-divergent-with-value'],
    [{ kind: 'improper-integral', integrand: '1/(1+x^2)', lower: '0', upper: '1', converges: false }, 'improper-not-improper'],
  ];
  for (const [c, code] of bad) it(`rejects ${JSON.stringify(c)} with ${code}`, () => expect(codes(c)).toContain(code));
});

describe('claims: limits of sequences', () => {
  const ok: Check[] = [
    { kind: 'limit', term: 'log(n)/n', limit: '0' },
    { kind: 'limit', term: '(1+1/n)^n', limit: 'e' },
    { kind: 'limit', term: 'n/(2*n+1)', limit: '1/2' },
    { kind: 'limit', term: '(3*n^2+1)/(n^2-5)', limit: '3' },
    { kind: 'limit', term: 'n*sin(1/n)', limit: '1' },
    { kind: 'limit', term: 'arctan(n)', limit: 'pi/2' },
    { kind: 'limit', term: 'n^(1/n)', limit: '1' },
    { kind: 'limit', term: '(0.9)^n', limit: '0' },
    { kind: 'limit', term: '(-1/2)^n', limit: '0' },
    { kind: 'limit', term: '(-1)^n/n', limit: '0' },
    { kind: 'limit', term: 'cos(n)/n', limit: '0' },
    { kind: 'limit', term: '2*(4/3)^n', limit: 'infinity' },
    { kind: 'limit', term: 'sqrt(n)', limit: 'infinity' },
    { kind: 'limit', term: 'log(n)', limit: 'infinity' },
    { kind: 'limit', term: '2^n', limit: 'infinity' },
    { kind: 'limit', term: '-n^2', limit: '-infinity' },
    { kind: 'limit', term: '(-1)^n', limit: 'dne' },
    { kind: 'limit', term: 'sin(n)', limit: 'dne' },
    { kind: 'limit', term: 'cos(pi*n)', limit: 'dne' },
    { kind: 'limit', term: 'x/(x+1)', variable: 'x', limit: '1' },
  ];
  for (const c of ok) it(`accepts ${JSON.stringify(c)}`, () => expect(codes(c)).toEqual([]));
  const bad: Check[] = [
    { kind: 'limit', term: 'n/(2*n+1)', limit: '0' },
    { kind: 'limit', term: 'n/(2*n+1)', limit: 'infinity' },
    { kind: 'limit', term: 'n/(2*n+1)', limit: 'dne' },
    { kind: 'limit', term: '(-1)^n/n', limit: 'dne' },
    { kind: 'limit', term: '(-1)^n', limit: '0' },
    { kind: 'limit', term: '(-1)^n', limit: 'infinity' },
    { kind: 'limit', term: 'log(n)', limit: '0' },
    { kind: 'limit', term: '(1+1/n)^n', limit: '1' },
    { kind: 'limit', term: '(4/3)^n', limit: '0' },
    { kind: 'limit', term: 'n^2', limit: '-infinity' },
  ];
  for (const c of bad) it(`rejects ${JSON.stringify(c)}`, () => expect(codes(c)).toContain('limit-claim-wrong'));
});

describe('claims: series', () => {
  const ok: Check[] = [
    { kind: 'series', term: '1/n^2', converges: true, sum: 'pi^2/6' },
    { kind: 'series', term: '1/n^2', converges: true },
    { kind: 'series', term: '(1/2)^n', converges: true, sum: '1' },
    { kind: 'series', term: '3*(1/2)^(n-1)', converges: true, sum: '6' },
    { kind: 'series', term: '(-2/3)^n', converges: true, sum: '-2/5' },
    { kind: 'series', term: '(1/3)^n', from: '0', converges: true, sum: '3/2' },
    { kind: 'series', term: '1/(n*(n+1))', converges: true, sum: '1' },
    { kind: 'series', term: '1/(n^2-1)', from: '2', converges: true, sum: '3/4' },
    { kind: 'series', term: '1/n^(3/2)', converges: true },
    { kind: 'series', term: 'n*exp(-n^2)', converges: true },
    { kind: 'series', term: '1/n', converges: false },
    { kind: 'series', term: '1/sqrt(n)', converges: false },
    { kind: 'series', term: 'n/(n+1)', converges: false },
    { kind: 'series', term: '(-1)^n', converges: false },
    { kind: 'series', term: '2^n', converges: false },
    { kind: 'series', term: '(4/3)^n', converges: false },
    { kind: 'series', term: '1/(n*log(n))', from: '2', converges: false },
    { kind: 'series', term: 'cos(pi*n)', converges: false },
  ];
  for (const c of ok) it(`accepts ${JSON.stringify(c)}`, () => expect(codes(c)).toEqual([]));
  const bad: [Check, string][] = [
    [{ kind: 'series', term: 'n/(n+1)', converges: true }, 'series-claimed-convergent'],
    [{ kind: 'series', term: '2^n', converges: true }, 'series-claimed-convergent'],
    [{ kind: 'series', term: '(-1)^n', converges: true }, 'series-claimed-convergent'],
    [{ kind: 'series', term: '1/sqrt(n)', converges: true }, 'series-claimed-convergent'],
    [{ kind: 'series', term: '1/n^2', converges: false }, 'series-claimed-divergent'],
    [{ kind: 'series', term: '(1/2)^n', converges: false }, 'series-claimed-divergent'],
    [{ kind: 'series', term: '(1/2)^n', converges: true, sum: '2' }, 'series-sum-wrong'],
    [{ kind: 'series', term: '1/(n*(n+1))', converges: true, sum: '1/2' }, 'series-sum-wrong'],
    [{ kind: 'series', term: '1/n', converges: false, sum: '1' }, 'series-divergent-with-sum'],
    [{ kind: 'series', term: '1/(n-1)', converges: true, sum: '1' }, 'series-term-not-finite'],
  ];
  for (const [c, code] of bad) it(`rejects ${JSON.stringify(c)} with ${code}`, () => expect(codes(c)).toContain(code));
});
