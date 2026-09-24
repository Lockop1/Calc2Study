/**
 * Full-height question screen: top bar, a scrollable "stage" (question, work so far, prompt) in
 * the upper part, and a dock pinned to the bottom (answer buttons, feedback, Next) within thumb
 * reach. The page itself never scrolls; each region scrolls on its own.
 */
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { cx } from '../lib/util';
import { TopBar, type TopBarProps } from './TopBar';

export interface QuestionLayoutProps {
  topbar: TopBarProps;
  stage: ReactNode;
  dock: ReactNode;
  /** 'end' keeps the newest content (current step prompt) in view. */
  stageAnchor?: 'top' | 'end';
  answered?: boolean;
  /** Text for the polite live region (announced by screen readers). */
  announcement?: string;
}

export function QuestionLayout({ topbar, stage, dock, stageAnchor = 'top', answered, announcement }: QuestionLayoutProps) {
  const stageRef = useRef<HTMLElement>(null);

  // Step questions keep the newest content (the current prompt) in view, also when the feedback
  // panel appears and the stage shrinks.
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (el && stageAnchor === 'end') el.scrollTop = el.scrollHeight;
  }, [stageAnchor, answered]);

  // A new question moves focus to it, so keyboard and screen-reader users start from the top.
  useEffect(() => {
    stageRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={cx('screen-q', answered && 'is-answered')}>
      <TopBar {...topbar} />
      <main className="stage" ref={stageRef} tabIndex={-1} aria-label="Question">
        {stage}
      </main>
      {dock}
      <p className="visually-hidden" aria-live="polite">
        {announcement ?? ''}
      </p>
    </div>
  );
}
