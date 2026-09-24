/**
 * The answer buttons. Before an answer every option is tappable; afterwards all are disabled, the
 * correct one turns green, a wrong pick turns red, and the rest fade.
 */
import type { Option } from '@content/types';
import { useEffect, useRef } from 'react';
import { CheckIcon, CrossIcon } from './Icons';
import { OptionContent } from './OptionContent';

export type OptionState = 'idle' | 'correct' | 'wrong' | 'dim';

export interface OptionListProps {
  options: readonly Option[];
  /** Stable React keys (original option indices). */
  keys: readonly number[];
  correctIndex: number;
  /** Index of the chosen option, or null before answering. */
  chosen: number | null;
  onChoose: (index: number, event: { detail: number }) => void;
}

export function optionState(index: number, correctIndex: number, chosen: number | null): OptionState {
  if (chosen === null) return 'idle';
  if (index === correctIndex) return 'correct';
  return index === chosen ? 'wrong' : 'dim';
}

export function OptionList({ options, keys, correctIndex, chosen, onChoose }: OptionListProps) {
  const answered = chosen !== null;
  const correctRef = useRef<HTMLButtonElement>(null);

  // The list scrolls within itself; make sure the green answer is visible after the reveal.
  useEffect(() => {
    if (answered) correctRef.current?.scrollIntoView?.({ block: 'nearest' });
  }, [answered]);

  return (
    <div className="answers" role="group" aria-label="Answer choices">
      {options.map((option, i) => {
        const state = optionState(i, correctIndex, chosen);
        return (
          <button
            key={keys[i] ?? i}
            ref={i === correctIndex ? correctRef : undefined}
            type="button"
            className={`opt opt--${state}`}
            data-state={state}
            disabled={answered}
            onClick={(event) => onChoose(i, event)}
          >
            <span className="opt-body">
              <OptionContent option={option} />
            </span>
            {state === 'correct' || state === 'wrong' ? (
              <span className="opt-mark" aria-hidden="true">
                {state === 'correct' ? <CheckIcon size={16} /> : <CrossIcon size={16} />}
              </span>
            ) : null}
            {state === 'correct' ? (
              <span className="visually-hidden">{i === chosen ? ' (your answer, correct)' : ' (correct answer)'}</span>
            ) : null}
            {state === 'wrong' ? <span className="visually-hidden"> (your answer, incorrect)</span> : null}
          </button>
        );
      })}
    </div>
  );
}
