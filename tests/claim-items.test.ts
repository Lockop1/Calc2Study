/**
 * Flash items and steps that use the claim check kinds (improper-integral / limit / series): the
 * validator must accept well-formed value items and verdict items, and reject wrong claims, exprs
 * on verdict items, and missing targets. Uses an existing topic id; the kind/topic pairing is not
 * what is under test here.
 */
import { describe, expect, it } from 'vitest';
import type { FlashItem, StepProblem } from '../content/types';
import { validateFlashItem, validateStepProblem } from '../checker/validate';

const errs = (item: FlashItem) => validateFlashItem(item).filter((i) => i.level === 'error').map((i) => i.code);

const valueItem: FlashItem = {
  id: 'ad-f-901',
  topic: 'antiderivatives',
  kind: 'formula',
  prompt: { latex: '\\int_1^{\\infty} \\frac{1}{x^2}\\,dx' },
  options: [
    { latex: '1', expr: '1' },
    { latex: '2', expr: '2', mistake: 'arithmetic-error', why: 'This is the mistake: slip (test fixture).' },
    { latex: '\\frac{1}{2}', expr: '1/2', mistake: 'arithmetic-error', why: 'This is the mistake: slip (test fixture).' },
    { latex: '-1', expr: '-1', mistake: 'sign-error', why: 'This is the mistake: sign (test fixture).' },
    { latex: '0', expr: '0', mistake: 'im-plug-infinity', why: 'This is the mistake: plugged ∞ (test fixture).' },
  ],
  correct: 0,
  explanation: 'lim (1 − 1/t) = 1.',
  check: { kind: 'improper-integral', integrand: '1/x^2', lower: '1', upper: 'inf', converges: true, value: '1' },
};

const verdictItem: FlashItem = {
  id: 'ad-f-902',
  topic: 'antiderivatives',
  kind: 'concept',
  prompt: { latex: '\\int_1^{\\infty} \\frac{1}{x}\\,dx' },
  options: [
    { text: 'Diverges: $\\ln t \\to \\infty$' },
    { text: 'Converges to $0$', mistake: 'im-plug-infinity', why: 'This is the mistake: plugged ∞ (test fixture).' },
    { text: 'Converges to $1$', mistake: 'im-p-rule-wrong', why: 'This is the mistake: p-rule (test fixture).' },
    { text: 'Converges to $\\infty$', mistake: 'im-divergent-called-convergent', why: 'This is the mistake: converges to ∞ is not a thing (test fixture).' },
    { text: 'Converges to $\\ln 2$', mistake: 'im-limit-evaluated-wrong', why: 'This is the mistake: limit (test fixture).' },
  ],
  correct: 0,
  explanation: 'The limit is infinite, so the integral diverges.',
  check: { kind: 'improper-integral', integrand: '1/x', lower: '1', upper: 'inf', converges: false },
};

describe('claim-kind flash items', () => {
  it('accepts a value item whose correct option equals the value', () => expect(errs(valueItem)).toEqual([]));
  it('rejects a value item whose correct option differs from the value', () => {
    const swapped: FlashItem = {
      ...valueItem,
      options: valueItem.options.map((o, i) => (i === 0 ? { latex: '2', expr: '2' } : i === 1 ? { ...o, latex: '1', expr: '1' } : o)),
    };
    expect(errs(swapped)).toContain('answer-incorrect');
  });
  it('rejects a wrong claim', () => {
    expect(errs({ ...valueItem, check: { kind: 'improper-integral', integrand: '1/x^2', lower: '1', upper: 'inf', converges: true, value: '2' } })).toContain('improper-value-wrong');
  });
  it('accepts a verdict item (no exprs) with a true claim', () => expect(errs(verdictItem)).toEqual([]));
  it('rejects a verdict item with a false claim', () => {
    expect(errs({ ...verdictItem, check: { kind: 'improper-integral', integrand: '1/x', lower: '1', upper: 'inf', converges: true } })).toContain('improper-claimed-convergent');
  });
  it('rejects a verdict item that carries exprs on some distractors only', () => {
    const bad = { ...verdictItem, options: verdictItem.options.map((o, i) => (i === 1 ? { ...o, expr: '0' } : o)) };
    expect(errs(bad).some((c) => c === 'expr-all-or-none' || c === 'verdict-options-with-expr')).toBe(true);
  });
  it('rejects exprs when the check has no numeric target', () => {
    const bad: FlashItem = {
      ...verdictItem,
      options: verdictItem.options.map((o, i) => ({ ...o, expr: String(i) })),
    };
    expect(errs(bad)).toContain('claim-target-missing');
  });
  it('accepts a limit item and rejects its distractor equal to the limit', () => {
    const item: FlashItem = {
      ...valueItem,
      id: 'ad-f-903',
      prompt: { latex: '\\lim_{n\\to\\infty} \\frac{3n^2+1}{n^2-5}' },
      options: [
        { latex: '3', expr: '3' },
        { latex: '0', expr: '0', mistake: 'sq-dominant-term', why: 'This is the mistake: degrees (test fixture).' },
        { latex: '-\\frac{1}{5}', expr: '-1/5', mistake: 'sq-term-vs-limit', why: 'This is the mistake: n=0 (test fixture).' },
        { latex: '1', expr: '1', mistake: 'sq-substitute-infinity', why: 'This is the mistake: ∞/∞ = 1 (test fixture).' },
        { latex: '\\frac{3}{1}', expr: '3', mistake: 'sq-dominant-term', why: 'This is the mistake: same value (test fixture).' },
      ],
      check: { kind: 'limit', term: '(3*n^2+1)/(n^2-5)', limit: '3' },
    };
    const codes = errs(item);
    expect(codes).toContain('distractor-not-distinct');
    expect(codes).not.toContain('answer-incorrect');
  });
  it('accepts a series sum item', () => {
    const item: FlashItem = {
      ...valueItem,
      id: 'ad-f-904',
      prompt: { latex: '\\sum_{n=1}^{\\infty} 3\\left(\\tfrac{1}{2}\\right)^{n-1}' },
      options: [
        { latex: '6', expr: '6' },
        { latex: '3', expr: '3', mistake: 'sb-wrong-first-term', why: 'This is the mistake: a (test fixture).' },
        { latex: '\\frac{3}{2}', expr: '3/2', mistake: 'sb-wrong-ratio', why: 'This is the mistake: r (test fixture).' },
        { latex: '2', expr: '2', mistake: 'sb-partial-sum-formula', why: 'This is the mistake: S (test fixture).' },
        { latex: '0', expr: '0', mistake: 'sb-sum-is-term-limit', why: 'This is the mistake: lim a_n (test fixture).' },
      ],
      check: { kind: 'series', term: '3*(1/2)^(n-1)', converges: true, sum: '6' },
    };
    expect(errs(item)).toEqual([]);
  });
});

describe('claim-kind step problems', () => {
  const problem: StepProblem = {
    id: 'ad-s-91',
    topic: 'antiderivatives',
    title: 'Improper integral',
    difficulty: 1,
    statement: { latex: '\\int_1^{\\infty} \\frac{1}{x^2}\\,dx' },
    steps: [
      {
        prompt: 'First move?',
        options: [
          { text: 'Write $\\lim_{t\\to\\infty}\\int_1^t x^{-2}\\,dx$' },
          { text: 'Plug in $\\infty$', mistake: 'im-plug-infinity', why: 'This is the mistake: no (test fixture).' },
          { text: 'Split at $0$', mistake: 'im-split-mishandled', why: 'This is the mistake: no (test fixture).' },
          { text: 'Use $\\lim_{t\\to 1^+}$', mistake: 'im-wrong-type', why: 'This is the mistake: no (test fixture).' },
          { text: 'Declare divergent', mistake: 'im-p-rule-wrong', why: 'This is the mistake: no (test fixture).' },
        ],
        correct: 0,
        explanation: 'Type I: replace ∞ by t.',
        check: { kind: 'none', reason: 'setup step' },
      },
      {
        prompt: 'Antiderivative?',
        options: [
          { latex: '-\\frac{1}{x} + C', expr: '-1/x + C' },
          { latex: '\\frac{1}{x} + C', expr: '1/x + C', mistake: 'sign-error', why: 'This is the mistake: sign (test fixture).' },
          { latex: '\\ln|x| + C', expr: 'log(abs(x)) + C', mistake: 'ln-misapplied', why: 'This is the mistake: ln (test fixture).' },
          { latex: '-\\frac{1}{3x^3} + C', expr: '-1/(3*x^3) + C', mistake: 'power-rule-int-exponent', why: 'This is the mistake: exp (test fixture).' },
          { latex: '-\\frac{2}{x^3} + C', expr: '-2/x^3 + C', mistake: 'differentiated-instead', why: 'This is the mistake: d (test fixture).' },
        ],
        correct: 0,
        explanation: 'Power rule.',
        check: { kind: 'antiderivative', integrand: '1/x^2' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: 'Converges to $1$' },
          { text: 'Diverges', mistake: 'im-limit-evaluated-wrong', why: 'This is the mistake: limit (test fixture).' },
          { text: 'Converges to $0$', mistake: 'im-plug-infinity', why: 'This is the mistake: no (test fixture).' },
          { text: 'Converges to $-1$', mistake: 'sign-error', why: 'This is the mistake: sign (test fixture).' },
          { text: 'Converges to $\\infty$', mistake: 'im-divergent-called-convergent', why: 'This is the mistake: no (test fixture).' },
        ],
        correct: 0,
        explanation: 'lim (1 − 1/t) = 1.',
        check: { kind: 'improper-integral', integrand: '1/x^2', lower: '1', upper: 'inf', converges: true, value: '1' },
      },
    ],
    final: {
      latex: '1',
      expr: '1',
      check: { kind: 'improper-integral', integrand: '1/x^2', lower: '1', upper: 'inf', converges: true, value: '1' },
      recap: 'Replace ∞ by t, integrate, take the limit.',
    },
  };
  it('accepts a problem whose final is a claim check', () => {
    expect(validateStepProblem(problem).filter((i) => i.level === 'error')).toEqual([]);
  });
  it('accepts a divergent final without expr', () => {
    const p: StepProblem = {
      ...problem,
      final: { latex: '\\text{diverges}', check: { kind: 'improper-integral', integrand: '1/x', lower: '1', upper: 'inf', converges: false }, recap: 'The antiderivative ln t grows without bound, so the integral diverges.' },
    };
    expect(validateStepProblem(p).filter((i) => i.level === 'error')).toEqual([]);
  });
  it('rejects a divergent final whose claim is false', () => {
    const p: StepProblem = {
      ...problem,
      final: { latex: '\\text{diverges}', check: { kind: 'improper-integral', integrand: '1/x^2', lower: '1', upper: 'inf', converges: false }, recap: 'This claim is wrong on purpose (test fixture).' },
    };
    expect(validateStepProblem(p).map((i) => i.code)).toContain('improper-claimed-divergent');
  });
});
