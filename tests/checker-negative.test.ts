/**
 * The checker must catch real content errors. Each test mutates a valid reference item and asserts
 * the validator reports the expected issue code. If one of these starts passing silently, a check
 * has been loosened — that is forbidden (see CLAUDE.md constraints).
 */
import { describe, it, expect } from 'vitest';
import { sampleFlash, sampleSteps } from '../content/examples/sample';
import { validateFlashItem, validateStepProblem } from '../checker/validate';
import type { FlashItem, StepProblem } from '../content/types';

const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
const byId = (id: string): FlashItem => clone(sampleFlash.find((i) => i.id === id)!);
const codes = (item: FlashItem) => validateFlashItem(item).filter((i) => i.level === 'error').map((i) => i.code);
const stepCodes = (p: StepProblem) => validateStepProblem(p).filter((i) => i.level === 'error').map((i) => i.code);

describe('checker catches wrong answers', () => {
  it('derivative: wrong correct expr', () => {
    const item = byId('dr-f-901');
    item.options[0].latex = 'x\\cos x + 1';
    item.options[0].expr = 'x*cos(x) + 1';
    expect(codes(item)).toContain('answer-incorrect');
  });
  it('antiderivative: missing 1/2 in the correct answer', () => {
    const item = byId('ad-f-901');
    item.options[0].latex = '\\frac{3}{2}\\sin(x^2) + C';
    item.options[0].expr = '3*sin(x^2)/2';
    expect(codes(item)).toContain('answer-incorrect');
  });
  it('evaluate: wrong value', () => {
    const item = byId('ad-f-902');
    item.options[0].latex = '\\pi';
    item.options[0].expr = 'pi';
    expect(codes(item)).toContain('answer-incorrect');
  });
  it('identity: wrong half-angle identity marked correct', () => {
    const item = byId('ti-f-901');
    item.correct = 1;
    delete item.options[1].mistake;
    delete item.options[1].why;
    item.options[0].mistake = 'half-angle-wrong';
    item.options[0].why = 'x'.repeat(12);
    expect(codes(item)).toContain('answer-incorrect');
  });
  it('concept with integrals: wrong bounds marked correct', () => {
    const item = byId('ad-f-903');
    item.options[0].latex = '\\int_1^3 u^3\\,du';
    item.options[0].expr = 'integral(u^3, u, 1, 3)';
    expect(codes(item)).toContain('answer-incorrect');
  });
});

describe('checker catches distractor problems', () => {
  it('antiderivative distractor that differs from the answer by a constant', () => {
    const item = byId('ad-f-901');
    item.options[1].latex = '\\frac{1}{2}\\sin(x^2) + 3 + C';
    item.options[1].expr = 'sin(x^2)/2 + 3';
    expect(codes(item)).toContain('distractor-not-distinct');
  });
  it('derivative distractor equal by an identity', () => {
    const item = byId('dr-f-901');
    item.options[1].latex = '\\sin x + x\\cos x + \\sin^2 x + \\cos^2 x - 1';
    item.options[1].expr = 'sin(x) + x*cos(x) + sin(x)^2 + cos(x)^2 - 1';
    expect(codes(item)).toContain('distractor-not-distinct');
  });
  it('missing mistake tag / why on a distractor', () => {
    const item = byId('dr-f-901');
    delete item.options[1].mistake;
    expect(codes(item)).toContain('distractor-missing-mistake');
    const item2 = byId('dr-f-901');
    delete item2.options[1].why;
    expect(codes(item2)).toContain('distractor-missing-why');
  });
  it('unknown mistake id', () => {
    const item = byId('dr-f-901');
    (item.options[1] as { mistake: string }).mistake = 'made-up-tag';
    expect(codes(item)).toContain('unknown-mistake');
  });
  it('correct option carrying a mistake tag', () => {
    const item = byId('dr-f-901');
    item.options[0].mistake = 'sign-error';
    expect(codes(item)).toContain('correct-has-mistake-tag');
  });
  it('fewer than 5 options', () => {
    const item = byId('dr-f-901');
    item.options = item.options.slice(0, 4);
    expect(codes(item)).toContain('too-few-options');
  });
  it('duplicate option text', () => {
    const item = byId('dr-f-901');
    item.options[2].latex = item.options[1].latex;
    expect(codes(item)).toContain('duplicate-option');
  });
  it('all/none of the above', () => {
    const item = byId('ip-f-901');
    item.options[1].text = 'None of the above';
    expect(codes(item)).toContain('forbidden-option');
  });
  it('inconsistent + C', () => {
    const item = byId('ad-f-901');
    item.options[1].latex = '\\sin(x^2)';
    const c = codes(item);
    expect(c.some((x) => x === 'plus-c-inconsistent' || x === 'missing-plus-c')).toBe(true);
  });
});

describe('checker catches latex/expr disagreement', () => {
  it('typo in the displayed LaTeX', () => {
    const item = byId('ad-f-901');
    item.options[0].latex = '\\frac{1}{2}\\sin(x^3) + C'; // expr still sin(x^2)/2
    expect(codes(item)).toContain('latex-expr-mismatch');
  });
  it('prompt LaTeX disagrees with the check', () => {
    const item = byId('dr-f-901');
    item.prompt.latex = 'x\\cos x';
    expect(codes(item)).toContain('prompt-check-mismatch');
  });
  it('unparseable LaTeX on an option with an expr', () => {
    const item = byId('dr-f-901');
    item.options[1].latex = '\\frac{d}{dx}[x\\cos x]';
    expect(codes(item)).toContain('latex-unparseable');
  });
  it('domain with no valid samples', () => {
    const item = byId('dr-f-901');
    item.options[0].latex = '\\sqrt{-1 - x^2}';
    item.options[0].expr = 'sqrt(-1 - x^2)';
    expect(codes(item)).toContain('no-valid-samples');
  });
});

describe('checker catches step-problem errors', () => {
  it('wrong final answer', () => {
    const p = clone(sampleSteps[0]);
    p.final.latex = '\\frac{17}{4}';
    p.final.expr = '17/4';
    expect(stepCodes(p)).toContain('answer-incorrect');
  });
  it('wrong step value (bounds not converted marked correct)', () => {
    const p = clone(sampleSteps[0]);
    const s = p.steps[1];
    s.options[0].latex = 'u(0) = 1,\\ u(1) = 3';
    s.options[0].expr = '[1, 3]';
    expect(stepCodes(p)).toContain('answer-incorrect');
  });
  it('too few / too many steps', () => {
    const p = clone(sampleSteps[0]);
    p.steps = p.steps.slice(0, 2);
    expect(stepCodes(p)).toContain('bad-step-count');
  });
  it('missing recap / final expr', () => {
    const p = clone(sampleSteps[0]);
    p.final.recap = '';
    expect(stepCodes(p)).toContain('missing-recap');
    const p2 = clone(sampleSteps[0]);
    delete p2.final.expr;
    expect(stepCodes(p2)).toContain('missing-final-expr');
  });
  it('generator id mismatch is caught by the flash validator', () => {
    const item = byId('dr-f-901');
    item.id = 'dr-f-9x1';
    expect(codes(item)).toContain('bad-id');
  });
});
