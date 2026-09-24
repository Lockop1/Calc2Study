// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TAP_GUARD_MS } from '../../src/lib/tap-guard';
import { StepThroughScreen } from '../../src/screens/StepThroughScreen';
import { SummaryScreen } from '../../src/screens/SummaryScreen';
import { feedback, optionButtons } from './dom-helpers';
import { makeContent } from './fixtures';

// These tests inject fixture content. Never load the real content aggregate: it is authored
// concurrently and may be mid-edit, and app logic must not depend on it.
vi.mock('@content/index', () => ({ CONTENT: [] }));

let now = 10_000;
afterEach(() => vi.restoreAllMocks());

function renderSteps() {
  vi.spyOn(performance, 'now').mockImplementation(() => now);
  const onAnswer = vi.fn();
  render(
    <StepThroughScreen
      roundKey={1}
      problemIds={['ad-s-01']}
      content={makeContent({ antiderivatives: { problems: [3] } })}
      onAnswer={onAnswer}
      onFinish={vi.fn()}
      onHome={vi.fn()}
    />,
  );
  return onAnswer;
}

const tap = (el: Element) => fireEvent.click(el, { detail: 1 }); // a real pointer tap has detail ≥ 1

describe('double-tap guard', () => {
  it('ignores a pointer tap on an option right after the question appears', () => {
    const onAnswer = renderSteps();
    tap(optionButtons()[0]);
    expect(feedback()).toBeNull();
    expect(onAnswer).not.toHaveBeenCalled();
    now += TAP_GUARD_MS + 1;
    tap(optionButtons()[0]);
    expect(feedback()).not.toBeNull();
    expect(onAnswer).toHaveBeenCalledTimes(1);
  });

  it('keeps the feedback up when the twin of the answering tap hits Next', () => {
    renderSteps();
    now += 1000;
    tap(optionButtons()[0]); // answer
    now += 120;
    tap(screen.getByRole('button', { name: /^Next$/ })); // same double tap, lands on Next
    expect(feedback()).not.toBeNull();
    expect(screen.getByText('Prompt ad-s-01#0')).toBeTruthy();
    now += TAP_GUARD_MS;
    tap(screen.getByRole('button', { name: /^Next$/ }));
    expect(screen.getByText('Prompt ad-s-01#1')).toBeTruthy();
  });

  it('never blocks keyboard activation (click.detail === 0)', () => {
    renderSteps();
    fireEvent.click(optionButtons()[0]);
    expect(feedback()).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /^Next$/ }));
    expect(screen.getByText('Prompt ad-s-01#1')).toBeTruthy();
  });

  it('protects the Summary actions from the Finish tap', () => {
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    const onHome = vi.fn();
    render(
      <SummaryScreen
        result={{ mode: 'flash', answers: [{ id: 'dr-f-001', topic: 'diff-review', correct: false }] }}
        onReviewMisses={vi.fn()}
        onAnotherRound={vi.fn()}
        onHome={onHome}
      />,
    );
    tap(screen.getByRole('button', { name: 'Home' }));
    expect(onHome).not.toHaveBeenCalled();
    now += TAP_GUARD_MS + 1;
    tap(screen.getByRole('button', { name: 'Home' }));
    expect(onHome).toHaveBeenCalledTimes(1);
  });
});
