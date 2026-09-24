/**
 * The upper part of a step question: the problem statement, the "Work so far" (results of every
 * earlier step, already revealed), and either the current step prompt or the final answer card.
 */
import type { StepProblem } from '@content/types';
import { topicShort } from '../lib/framing';
import { workLinesBefore } from '../lib/units';
import { Tex } from './Math';
import { RichText } from './RichText';

export interface StepContextProps {
  problem: StepProblem;
  /** Index of the current step; `problem.steps.length` with `final` shows the answer card. */
  stepIndex: number;
  /** Small caption, e.g. "Problem 1 of 3" or "Review". */
  label: string;
  final?: boolean;
}

export function StepContext({ problem, stepIndex, label, final = false }: StepContextProps) {
  const work = workLinesBefore(problem, final ? problem.steps.length : stepIndex);
  const step = problem.steps[stepIndex];
  return (
    <>
      <section className="q-card" aria-label="Problem">
        <p className="q-kind">
          {label} · {topicShort(problem.topic)} · Level {problem.difficulty === 2 ? 'II' : 'I'}
        </p>
        <h2 className="q-title">{problem.title}</h2>
        {problem.statement.text ? <RichText className="q-text" text={problem.statement.text} /> : null}
        {problem.statement.latex ? <Tex className="q-math" latex={problem.statement.latex} displayMode /> : null}
      </section>

      <section className="work" aria-label="Work so far">
        <h3 className="section-label">Work so far</h3>
        {work.length === 0 ? (
          <p className="work-empty">Nothing yet. Each finished step lands here.</p>
        ) : (
          <ol className="work-list">
            {work.map((line, i) => (
              <li key={i} className="work-line">
                {line.text ? <RichText text={line.text} /> : null}
                {line.latex ? <Tex latex={`\\displaystyle ${line.latex}`} /> : null}
              </li>
            ))}
          </ol>
        )}
      </section>

      {final ? (
        <section className="final-card" aria-label="Final answer">
          <h3 className="section-label">Answer</h3>
          <Tex className="q-math" latex={problem.final.latex} displayMode />
          <RichText className="final-recap" text={problem.final.recap} />
        </section>
      ) : step ? (
        <section className="step-prompt" aria-label="Current step">
          <p className="section-label">
            Step {stepIndex + 1} of {problem.steps.length}
          </p>
          <RichText className="step-q" text={step.prompt} />
        </section>
      ) : null}
    </>
  );
}
