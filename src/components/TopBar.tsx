import type { ReactNode } from 'react';
import { HomeIcon } from './Icons';

export interface TopBarProps {
  title: string;
  onHome?: () => void;
  /** Right-hand slot, e.g. the "3/10" counter. */
  right?: ReactNode;
  /** Accessible label for `right` (e.g. "Question 3 of 10"). */
  rightLabel?: string;
  /** 0..1 fraction for the thin progress bar; omitted → no bar. */
  progress?: number;
}

export function TopBar({ title, onHome, right, rightLabel, progress }: TopBarProps) {
  const fraction = progress === undefined ? undefined : Math.min(1, Math.max(0, progress));
  return (
    <header className="topbar">
      <div className="topbar-row">
        {onHome ? (
          <button type="button" className="icon-btn" aria-label="Home" onClick={onHome}>
            <HomeIcon />
          </button>
        ) : null}
        <h1 className="topbar-title">{title}</h1>
        {right !== undefined ? (
          <div className="topbar-meta" aria-label={rightLabel}>
            {right}
          </div>
        ) : null}
      </div>
      {fraction !== undefined ? (
        <div className="progressbar" aria-hidden="true">
          <span style={{ transform: `scaleX(${fraction})` }} />
        </div>
      ) : null}
    </header>
  );
}
