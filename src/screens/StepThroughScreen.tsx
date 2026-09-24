/**
 * Step-Through: problems worked one step at a time. After every answer (right or wrong) the
 * correct step is revealed and appended to "Work so far"; after the last step the final answer
 * and a recap are shown.
 */
import type { StepProblem, TopicContent } from '@content/types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { EmptyScreen } from '../components/EmptyScreen';
import { QuestionLayout } from '../components/QuestionLayout';
import { QuestionView } from '../components/QuestionView';
import { StepContext } from '../components/StepContext';
import type { TopBarProps } from '../components/TopBar';
import type { AnswerRecord, RoundResult } from '../lib/session';
import { isPlayableProblem, problemById, stepUnitId } from '../lib/units';

export interface StepThroughScreenProps {
  roundKey: number;
  problemIds: readonly string[];
  content: readonly TopicContent[];
  onAnswer: (unitId: string, correct: boolean) => void;
  onFinish: (result: RoundResult) => void;
  onHome: () => void;
}

interface Position {
  problem: number;
  step: number;
  /** Showing the final answer card of the current problem. */
  final: boolean;
}

export function StepThroughScreen({ roundKey, problemIds, content, onAnswer, onFinish, onHome }: StepThroughScreenProps) {
  const problems = useMemo(
    () =>
      problemIds.flatMap((id) => {
        const p = problemById(id, content);
        return p && isPlayableProblem(p) ? [p] : [];
      }),
    [problemIds, content],
  );
  const totalSteps = useMemo(() => problems.reduce((n, p) => n + p.steps.length, 0), [problems]);
  const [pos, setPos] = useState<Position>({ problem: 0, step: 0, final: false });
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  if (problems.length === 0) {
    return <EmptyScreen title="Step-Through" message="There is no problem to work right now." onHome={onHome} />;
  }

  const problem = problems[pos.problem];
  const stepsBefore = problems.slice(0, pos.problem).reduce((n, p) => n + p.steps.length, 0);
  const label = `Problem ${pos.problem + 1} of ${problems.length}`;
  const isLastProblem = pos.problem === problems.length - 1;
  const counter = (n: number): Pick<TopBarProps, 'right' | 'rightLabel'> => ({
    right: `${n}/${totalSteps}`,
    rightLabel: `Step ${n} of ${totalSteps}`,
  });
  const topbar: TopBarProps = {
    title: 'Step-Through',
    onHome,
    progress: answers.length / totalSteps,
    ...counter(Math.min(totalSteps, stepsBefore + (pos.final ? problem.steps.length : pos.step + 1))),
  };

  if (pos.final) {
    return (
      <FinalView
        key={`${roundKey}:${pos.problem}:final`}
        topbar={topbar}
        problem={problem}
        label={label}
        buttonLabel={isLastProblem ? 'Finish' : 'Next problem'}
        onContinue={() => {
          if (isLastProblem) onFinish({ mode: 'steps', answers });
          else setPos({ problem: pos.problem + 1, step: 0, final: false });
        }}
      />
    );
  }

  const step = problem.steps[pos.step];
  const unitId = stepUnitId(problem.id, pos.step);
  const displayKey = `${roundKey}:${pos.problem}:${unitId}`;
  const lastStep = pos.step === problem.steps.length - 1;

  return (
    <QuestionView
      key={displayKey}
      displayKey={displayKey}
      topbar={topbar}
      stage={<StepContext problem={problem} stepIndex={pos.step} label={label} />}
      stageAnchor="end"
      options={step.options}
      correct={step.correct}
      explanation={step.explanation}
      revealCorrectStep
      nextLabel="Next"
      onAnswer={(correct) => {
        setAnswers((prev) => [...prev, { id: unitId, topic: problem.topic, correct }]);
        onAnswer(unitId, correct);
      }}
      onNext={() => setPos(lastStep ? { ...pos, final: true } : { ...pos, step: pos.step + 1 })}
    />
  );
}

interface FinalViewProps {
  topbar: TopBarProps;
  problem: StepProblem;
  label: string;
  buttonLabel: string;
  onContinue: () => void;
}

function FinalView({ topbar, problem, label, buttonLabel, onContinue }: FinalViewProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
  }, []);
  return (
    <QuestionLayout
      topbar={topbar}
      stage={<StepContext problem={problem} stepIndex={problem.steps.length} label={label} final />}
      stageAnchor="end"
      announcement="Problem complete."
      dock={
        <div className="dock-actions">
          <button ref={buttonRef} type="button" className="btn btn-primary btn-lg btn-block" onClick={onContinue}>
            {buttonLabel}
          </button>
        </div>
      }
    />
  );
}
