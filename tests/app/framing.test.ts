import type { FlashItem } from '@content/types';
import { describe, expect, it } from 'vitest';
import { framePrompt, hasTopLevelSum, kindLabel, variableTex } from '../../src/lib/framing';

const base: FlashItem = {
  id: 'dr-f-001',
  topic: 'diff-review',
  kind: 'derivative',
  prompt: { latex: 'x\\sin x' },
  options: [],
  correct: 0,
  explanation: '',
  check: { kind: 'none', reason: 'test' },
};

describe('framePrompt', () => {
  it('derivative: "Find f′(v) if f(v) = …" in the item variable', () => {
    expect(framePrompt(base)).toEqual({ context: undefined, lead: "Find $f'(x)$ if", latex: 'f(x) = x\\sin x' });
    expect(framePrompt({ ...base, variable: 'theta', prompt: { latex: '\\sin\\theta' } })).toMatchObject({
      lead: "Find $f'(\\theta)$ if",
      latex: 'f(\\theta) = \\sin\\theta',
    });
  });

  it('antiderivative: ∫ integrand d(variable), parenthesized when it is a sum', () => {
    const item = { ...base, kind: 'antiderivative' as const, prompt: { latex: 'x\\cos(x^2)' } };
    expect(framePrompt(item).latex).toBe('\\int x\\cos(x^2)\\,dx');
    expect(framePrompt({ ...item, prompt: { latex: 'x^2 + 1' } }).latex).toBe('\\int \\left(x^2 + 1\\right)\\,dx');
    expect(framePrompt({ ...item, variable: 'theta', prompt: { latex: '\\sec^2\\theta' } }).latex).toBe(
      '\\int \\sec^2\\theta\\,d\\theta',
    );
    expect(framePrompt({ ...item, variable: 't', prompt: { latex: 'e^{2t}' } }).latex).toBe('\\int e^{2t}\\,dt');
  });

  it('evaluate: the integral itself', () => {
    const item = { ...base, kind: 'evaluate' as const, prompt: { latex: '\\int_0^{\\pi} \\sin x\\,dx' } };
    expect(framePrompt(item)).toEqual({ lead: 'Evaluate', latex: '\\int_0^{\\pi} \\sin x\\,dx' });
  });

  it('formula / technique / concept: text then optional latex', () => {
    expect(framePrompt({ ...base, kind: 'technique', prompt: { text: 'Which method?', latex: '\\int x e^{x^2}\\,dx' } })).toEqual({
      text: 'Which method?',
      latex: '\\int x e^{x^2}\\,dx',
    });
    expect(framePrompt({ ...base, kind: 'concept', prompt: { text: 'Only text' } })).toEqual({ text: 'Only text', latex: undefined });
  });

  it('labels kinds and maps variables', () => {
    expect(kindLabel('evaluate')).toBe('Definite integral');
    expect(variableTex(undefined)).toBe('x');
    expect(variableTex('theta')).toBe('\\theta');
    expect(variableTex('u')).toBe('u');
  });
});

describe('hasTopLevelSum', () => {
  it.each([
    ['x^2 + 1', true],
    ['\\sin x - x\\cos x', true],
    ['\\frac{1}{x} - 1', true],
    ['\\ln|x| + 1', true],
    ['\\left(x+1\\right)^2 + 3', true],
    ['\\sec^2 x - 1', true],
    ['-\\sin x', false],
    ['e^{x+1}', false],
    ['x\\cos(x^2)', false],
    ['\\frac{x+1}{x-1}', false],
    ['\\ln|\\sec x + \\tan x|', false],
    ['x\\cdot(-1)', false],
    ['\\sqrt{1 - x^2}', false],
    ['x e^{-x}', false],
  ])('%s → %s', (latex, expected) => {
    expect(hasTopLevelSum(latex)).toBe(expected);
  });
});
