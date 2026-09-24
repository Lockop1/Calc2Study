/**
 * Plays a deck of single questions: Flash Drill rounds and Review rounds. Flash units show the
 * flash question card; step units (Review only) show the problem, the work so far, and the step.
 */
import type { TopicContent } from '@content/types';
import { useMemo, useState } from 'react';
import { EmptyScreen } from '../components/EmptyScreen';
import { FlashPrompt } from '../components/FlashPrompt';
import { QuestionView } from '../components/QuestionView';
import { StepContext } from '../components/StepContext';
import type { TopBarProps } from '../components/TopBar';
import { MODE_TITLES, type AnswerRecord, type RoundResult } from '../lib/session';
import { resolveUnit, unitTopic, type ResolvedUnit } from '../lib/units';

export interface DrillScreenProps {
  mode: 'flash' | 'review';
  /** Distinguishes rounds, so a unit shown in a later round is reshuffled. */
  roundKey: number;
  unitIds: readonly string[];
  content: readonly TopicContent[];
  onAnswer: (unitId: string, correct: boolean) => void;
  onFinish: (result: RoundResult) => void;
  onHome: () => void;
}

export function DrillScreen({ mode, roundKey, unitIds, content, onAnswer, onFinish, onHome }: DrillScreenProps) {
  const units = useMemo(
    () =>
      unitIds.flatMap((id) => {
        const unit = resolveUnit(id, content);
        return unit ? [{ id, unit }] : [];
      }),
    [unitIds, content],
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const title = MODE_TITLES[mode];

  if (units.length === 0) {
    return <EmptyScreen title={title} message="There is nothing to practice here right now." onHome={onHome} />;
  }

  const position = Math.min(index, units.length - 1);
  const { id, unit } = units[position];
  const isLast = position === units.length - 1;
  const displayKey = `${roundKey}:${position}:${id}`;
  const topbar: TopBarProps = {
    title,
    onHome,
    right: `${position + 1}/${units.length}`,
    rightLabel: `Question ${position + 1} of ${units.length}`,
    progress: answers.length / units.length,
  };

  const handleAnswer = (correct: boolean) => {
    setAnswers((prev) => [...prev, { id, topic: unitTopic(unit), correct }]);
    onAnswer(id, correct);
  };
  const handleNext = () => {
    if (isLast) onFinish({ mode, answers });
    else setIndex(position + 1);
  };

  return (
    <QuestionView
      key={displayKey}
      displayKey={displayKey}
      topbar={topbar}
      {...questionParts(unit, mode)}
      nextLabel={isLast ? 'Finish' : 'Next'}
      onAnswer={handleAnswer}
      onNext={handleNext}
    />
  );
}

function questionParts(unit: ResolvedUnit, mode: 'flash' | 'review') {
  if (unit.kind === 'flash') {
    const { item } = unit;
    return {
      stage: <FlashPrompt item={item} label={mode === 'review' ? 'Review' : undefined} />,
      options: item.options,
      correct: item.correct,
      explanation: item.explanation,
    };
  }
  const step = unit.problem.steps[unit.stepIndex];
  return {
    stage: <StepContext problem={unit.problem} stepIndex={unit.stepIndex} label="Review" />,
    stageAnchor: 'end' as const,
    options: step.options,
    correct: step.correct,
    explanation: step.explanation,
    revealCorrectStep: true,
  };
}
