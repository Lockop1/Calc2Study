// @vitest-environment jsdom
import { MISTAKES } from '@content/mistakes';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { RoundResult } from '../../src/lib/session';
import { StepThroughScreen } from '../../src/screens/StepThroughScreen';
import { clickButton, clickOption, counterText, feedback, optionButtons } from './dom-helpers';
import { makeContent, makeProblem, withTopic } from './fixtures';

// These tests inject fixture content. Never load the real content aggregate: it is authored
// concurrently and may be mid-edit, and app logic must not depend on it.
vi.mock('@content/index', () => ({ CONTENT: [] }));

function setup(content = makeContent({ antiderivatives: { problems: [3, 2] } })) {
  const onAnswer = vi.fn<(id: string, correct: boolean) => void>();
  const onFinish = vi.fn<(r: RoundResult) => void>();
  const onHome = vi.fn();
  render(
    <StepThroughScreen
      roundKey={1}
      problemIds={['ad-s-01', 'ad-s-02']}
      content={content}
      onAnswer={onAnswer}
      onFinish={onFinish}
      onHome={onHome}
    />,
  );
  return { onAnswer, onFinish, onHome };
}

const workText = () => document.querySelector('.work')?.textContent ?? '';

describe('Step-Through flow', () => {
  it('shows the statement, an empty work area, the step prompt, and ≥5 options', () => {
    setup();
    expect(screen.getByText('Statement ad-s-01')).toBeTruthy();
    expect(screen.getByText('Prompt ad-s-01#0')).toBeTruthy();
    expect(workText()).toContain('Nothing yet');
    expect(optionButtons()).toHaveLength(5);
    expect(counterText()).toBe('1/5');
  });

  it('after a WRONG answer: explains the mistake, reveals the correct step, and still advances', () => {
    const { onAnswer } = setup();
    clickOption('Wrong ad-s-01#0.2');

    const fb = feedback()!;
    expect(fb).not.toBeNull();
    expect(fb.textContent).toContain('Not quite');
    expect(fb.textContent).toContain(MISTAKES['algebra-error'].label);
    expect(fb.textContent).toContain('Why wrong ad-s-01#0.2');
    expect(fb.textContent).toContain('Correct step:');
    expect(fb.querySelector('.feedback-answer')!.textContent).toContain('Correct ad-s-01#0');
    expect(fb.textContent).toContain('Explanation ad-s-01#0');
    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toHaveBeenCalledWith('ad-s-01#0', false);

    // answered: every option is disabled; the pick is red, the answer green
    expect(optionButtons().every((b) => b.disabled)).toBe(true);
    expect(document.querySelector('.opt--wrong')!.textContent).toContain('Wrong ad-s-01#0.2');
    expect(document.querySelector('.opt--correct')!.textContent).toContain('Correct ad-s-01#0');
    clickOption('Correct ad-s-01#0'); // disabled: must not count as a second answer
    expect(onAnswer).toHaveBeenCalledTimes(1);

    clickButton(/^Next$/);
    expect(screen.getByText('Prompt ad-s-01#1')).toBeTruthy();
    expect(workText()).toContain('Result ad-s-01#0');
    expect(feedback()).toBeNull();
    expect(optionButtons().some((b) => b.disabled)).toBe(false);
    expect(counterText()).toBe('2/5');
  });

  it('after a RIGHT answer: confirms, still shows the correct step, and advances', () => {
    const { onAnswer } = setup();
    clickOption('Correct ad-s-01#0');
    const fb = feedback()!;
    expect(fb.textContent).toContain('Correct');
    expect(fb.textContent).not.toContain('Not quite');
    expect(fb.textContent).toContain('Correct step:');
    expect(onAnswer).toHaveBeenCalledWith('ad-s-01#0', true);
    clickButton(/^Next$/);
    expect(screen.getByText('Prompt ad-s-01#1')).toBeTruthy();
  });

  it('ends each problem with the final answer and recap, then finishes the round', () => {
    const { onAnswer, onFinish } = setup();
    clickOption('Wrong');
    clickButton(/^Next$/);
    clickOption('Correct');
    clickButton(/^Next$/);
    clickOption('Wrong');
    clickButton(/^Next$/);

    expect(document.querySelector('.final-card')).not.toBeNull();
    expect(screen.getByText('Recap ad-s-01')).toBeTruthy();
    expect(workText()).toContain('Result ad-s-01#2'); // all three results revealed
    expect(optionButtons()).toHaveLength(0);
    clickButton('Next problem');

    expect(screen.getByText('Statement ad-s-02')).toBeTruthy();
    expect(workText()).toContain('Nothing yet');
    expect(counterText()).toBe('4/5');
    clickOption('Correct');
    clickButton(/^Next$/);
    clickOption('Correct');
    clickButton(/^Next$/);
    expect(screen.getByText('Recap ad-s-02')).toBeTruthy();
    clickButton('Finish');

    expect(onAnswer).toHaveBeenCalledTimes(5);
    expect(onFinish).toHaveBeenCalledTimes(1);
    const result = onFinish.mock.calls[0][0];
    expect(result.mode).toBe('steps');
    expect(result.answers.map((a) => [a.id, a.correct])).toEqual([
      ['ad-s-01#0', false],
      ['ad-s-01#1', true],
      ['ad-s-01#2', false],
      ['ad-s-02#0', true],
      ['ad-s-02#1', true],
    ]);
  });

  it('uses the correct option as the work line when a step has no result', () => {
    const content = withTopic(makeContent({}), 'antiderivatives', {
      steps: [makeProblem('antiderivatives', 1, 3, { omitResults: true }), makeProblem('antiderivatives', 2, 2)],
    });
    setup(content);
    clickOption('Wrong');
    clickButton(/^Next$/);
    expect(workText()).toContain('Correct ad-s-01#0');
  });

  it('keeps the option order stable while answering (shuffled once per display)', () => {
    setup();
    const before = optionButtons().map((b) => b.querySelector('.opt-body')!.textContent);
    clickOption('Wrong');
    const after = optionButtons().map((b) => b.querySelector('.opt-body')!.textContent);
    expect(after).toEqual(before);
  });
});
