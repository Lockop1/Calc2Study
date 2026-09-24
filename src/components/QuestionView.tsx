/**
 * One answerable question (a flash item or a single step): shuffles the options once per display,
 * takes exactly one answer, shows feedback, and hands control back through `onNext`.
 * Mount it with `key={displayKey}` so every display starts fresh.
 */
import type { Option } from '@content/types';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { mistakeLabel } from '../lib/mistake-label';
import { shuffleOptions } from '../lib/shuffle';
import { FeedbackPanel } from './FeedbackPanel';
import { OptionList } from './OptionList';
import { QuestionLayout } from './QuestionLayout';
import type { TopBarProps } from './TopBar';

export interface QuestionViewProps {
  /** Unit id + attempt; the options are shuffled once per distinct key. */
  displayKey: string;
  topbar: TopBarProps;
  stage: ReactNode;
  stageAnchor?: 'top' | 'end';
  options: readonly Option[];
  correct: number;
  explanation: string;
  /** Step questions always show the correct step in the feedback. */
  revealCorrectStep?: boolean;
  nextLabel: string;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

export function QuestionView({
  displayKey,
  topbar,
  stage,
  stageAnchor,
  options,
  correct,
  explanation,
  revealCorrectStep = false,
  nextLabel,
  onAnswer,
  onNext,
}: QuestionViewProps) {
  // Shuffle once per display (keyed by unit id + attempt), never on re-render.
  const shuffled = useMemo(() => shuffleOptions(options, correct), [displayKey]);
  const [chosen, setChosen] = useState<number | null>(null);
  const answeredRef = useRef(false);

  const choose = useCallback(
    (index: number) => {
      if (answeredRef.current) return; // no double answers, even on a fast double tap
      answeredRef.current = true;
      setChosen(index);
      onAnswer(index === shuffled.correctIndex);
    },
    [onAnswer, shuffled],
  );

  // Desktop nicety: number keys 1–9 pick an option.
  useEffect(() => {
    if (chosen !== null) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= shuffled.options.length) {
        e.preventDefault();
        choose(n - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [chosen, choose, shuffled]);

  const answered = chosen !== null;
  const isCorrect = answered && chosen === shuffled.correctIndex;
  const chosenOption = answered ? shuffled.options[chosen] : undefined;
  const announcement = !answered
    ? ''
    : isCorrect
      ? 'Correct.'
      : `Not quite. ${mistakeLabel(chosenOption?.mistake) ?? ''}`.trim();

  return (
    <QuestionLayout
      topbar={topbar}
      stage={stage}
      stageAnchor={stageAnchor}
      answered={answered}
      announcement={announcement}
      dock={
        <>
          <OptionList
            options={shuffled.options}
            keys={shuffled.order}
            correctIndex={shuffled.correctIndex}
            chosen={chosen}
            onChoose={choose}
          />
          {answered && chosenOption ? (
            <FeedbackPanel
              correct={isCorrect}
              chosen={chosenOption}
              explanation={explanation}
              correctStep={revealCorrectStep ? shuffled.options[shuffled.correctIndex] : undefined}
              nextLabel={nextLabel}
              onNext={onNext}
            />
          ) : null}
        </>
      }
    />
  );
}
