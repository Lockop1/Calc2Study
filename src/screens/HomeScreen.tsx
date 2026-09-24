/** Home: title, topic picker (multi-select, persisted), the three modes, and the Settings gear. */
import { TOPICS } from '@content/topics';
import type { TopicId } from '@content/types';
import { ChevronIcon, GearIcon } from '../components/Icons';
import type { Mode } from '../lib/session';
import { cx } from '../lib/util';

export interface Availability {
  /** Static flash items + generators in the selected topics. */
  flash: number;
  /** Step problems in the selected topics. */
  steps: number;
  /** Missed units in the selected topics (the Review badge). */
  due: number;
}

export interface HomeScreenProps {
  selected: readonly TopicId[];
  availability: Availability;
  notice: string | null;
  devNote?: string | null;
  onToggleTopic: (id: TopicId) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  onStart: (mode: Mode) => void;
  onSettings: () => void;
}

export function HomeScreen({
  selected,
  availability,
  notice,
  devNote,
  onToggleTopic,
  onSelectAll,
  onSelectNone,
  onStart,
  onSettings,
}: HomeScreenProps) {
  const chosen = new Set(selected);
  const none = selected.length === 0;
  const modes: Array<{ mode: Mode; title: string; sub: string; empty: boolean; primary?: boolean }> = [
    {
      mode: 'flash',
      title: 'Flash Drill',
      sub: availability.flash > 0 ? 'Fast multiple choice' : 'No questions for these topics yet',
      empty: availability.flash === 0,
      primary: true,
    },
    {
      mode: 'steps',
      title: 'Step-Through',
      sub: availability.steps > 0 ? 'Pick the next step of a worked problem' : 'No problems for these topics yet',
      empty: availability.steps === 0,
    },
    {
      mode: 'review',
      title: 'Review',
      sub: availability.due > 0 ? 'Your misses, recent and repeated first' : 'Missed questions show up here',
      empty: availability.due === 0,
    },
  ];

  return (
    <main className="page home">
      <header className="home-header">
        <div>
          <h1 className="home-title">Calc 2 Study</h1>
          <p className="muted">MAC 2312 · Exam 1</p>
        </div>
        <button type="button" className="icon-btn" aria-label="Settings" onClick={onSettings}>
          <GearIcon />
        </button>
      </header>

      {devNote ? <p className="dev-note">{devNote}</p> : null}

      <section className="topics" aria-labelledby="topics-heading">
        <div className="section-head">
          <h2 id="topics-heading" className="section-title">
            Topics <span className="muted">{selected.length}/{TOPICS.length}</span>
          </h2>
          <div className="section-links">
            <button type="button" className="link-btn" onClick={onSelectAll}>
              All
            </button>
            <button type="button" className="link-btn" onClick={onSelectNone}>
              None
            </button>
          </div>
        </div>
        <div className="chips">
          {TOPICS.map((t) => {
            const on = chosen.has(t.id);
            return (
              <button
                key={t.id}
                type="button"
                className="chip"
                aria-pressed={on}
                title={t.title}
                aria-label={`${t.num}. ${t.title}`}
                onClick={() => onToggleTopic(t.id)}
              >
                <span className="chip-num" aria-hidden="true">
                  {t.num}
                </span>
                <span className="chip-label" aria-hidden="true">
                  {t.short}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="modes" aria-label="Modes">
        <p className="notice" role="status">
          {notice ?? (none ? 'Pick at least one topic to start.' : '')}
        </p>
        {modes.map((m) => (
          <button
            key={m.mode}
            type="button"
            className={cx('mode-btn', m.primary && 'mode-btn--primary', (m.empty || none) && 'mode-btn--empty')}
            onClick={() => onStart(m.mode)}
          >
            <span className="mode-text">
              <span className="mode-title">
                {m.title}
                {m.mode === 'review' && availability.due > 0 ? (
                  <span className="badge" aria-label={`${availability.due} due`}>
                    {availability.due}
                  </span>
                ) : null}
              </span>
              <span className="mode-sub">{m.sub}</span>
            </span>
            <ChevronIcon />
          </button>
        ))}
      </section>
    </main>
  );
}
