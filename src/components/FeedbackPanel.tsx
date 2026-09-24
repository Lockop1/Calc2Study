/**
 * Shown at the bottom right after an answer: verdict, the specific mistake (for a wrong pick), the
 * option's `why`, optionally the correct step, the explanation, and one big Next button.
 */
import type { Option } from '@content/types';
import { useEffect, useRef } from 'react';
import { mistakeLabel } from '../lib/mistake-label';
import { CheckIcon, CrossIcon } from './Icons';
import { OptionContent } from './OptionContent';
import { RichText } from './RichText';

export interface FeedbackPanelProps {
  correct: boolean;
  /** The option the student picked. */
  chosen: Option;
  /** Why the correct answer is right. */
  explanation: string;
  /** Step-Through: the correct option, shown as "Correct step:". */
  correctStep?: Option;
  nextLabel: string;
  onNext: () => void;
}

export function FeedbackPanel({ correct, chosen, explanation, correctStep, nextLabel, onNext }: FeedbackPanelProps) {
  const nextRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    nextRef.current?.focus({ preventScroll: true });
  }, []);

  const mistake = correct ? null : mistakeLabel(chosen.mistake);
  return (
    <section className={`feedback ${correct ? 'feedback--ok' : 'feedback--bad'}`} aria-label="Feedback">
      <div className="feedback-body">
        <p className="feedback-title">
          <span className="feedback-icon" aria-hidden="true">
            {correct ? <CheckIcon size={18} /> : <CrossIcon size={18} />}
          </span>
          {correct ? 'Correct' : 'Not quite'}
        </p>
        {mistake ? <p className="feedback-mistake">{mistake}</p> : null}
        {!correct && chosen.why ? <RichText className="feedback-why" text={chosen.why} /> : null}
        {correctStep ? (
          <div className="feedback-answer">
            <span className="feedback-answer-label">Correct step:</span>
            <div className="feedback-answer-body">
              <OptionContent option={correctStep} />
            </div>
          </div>
        ) : null}
        <RichText className="feedback-expl" text={explanation} />
      </div>
      <button ref={nextRef} type="button" className="btn btn-primary btn-lg btn-block btn-next" onClick={onNext}>
        {nextLabel}
      </button>
    </section>
  );
}
