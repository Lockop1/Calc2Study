/**
 * Cards filter panel (start of a session, and reachable from the counter mid-session): section
 * chips with All / None, the shuffle and missed-only switches, Reset (two-tap confirm with the same
 * debounce as Settings; only the filtered cards when a filter is active), and Start / Resume at the
 * bottom within thumb reach. The caller saves every change.
 */
import type { Card } from '@content/types';
import { useRef, useState } from 'react';
import {
  ALL_CARD_SECTIONS,
  filterCards,
  missedInSections,
  plural,
  resetPlan,
  toggleSection,
  type CardFilters,
  type CardSectionInfo,
  type CardState,
  type SessionCounter,
} from '../lib/cards';
import { useTapGuard } from '../lib/tap-guard';
import { RESET_CONFIRM_GUARD_MS } from '../screens/SettingsScreen';
import { TopBar } from './TopBar';

export interface CardFilterPanelProps {
  cards: readonly Card[];
  sections: readonly CardSectionInfo[];
  state: CardState;
  /** Counter of the session in progress, if any (offers Resume). */
  resume: SessionCounter | null;
  onFilters: (filters: CardFilters) => void;
  /** Erase the results of `ids` (null = every card). */
  onReset: (ids: string[] | null) => void;
  onStart: (ids: string[]) => void;
  onResume: () => void;
  onHome: () => void;
}

function Switch({ label, sub, on, onToggle }: { label: string; sub: string; on: boolean; onToggle: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} className="switch-row" onClick={onToggle}>
      <span className="switch-text">
        <span className="switch-title">{label}</span>
        <span className="switch-sub">{sub}</span>
      </span>
      <span className="switch" aria-hidden="true" />
    </button>
  );
}

function emptyReason(cards: readonly Card[], filters: CardFilters): string {
  if (cards.length === 0) return 'No cards yet.';
  if (filters.sections.length === 0) return 'Pick at least one section.';
  if (filters.missedOnly) return 'No missed cards in these sections. Turn off “Missed only” to study them all.';
  return 'No cards in these sections yet.';
}

export function CardFilterPanel({ cards, sections, state, resume, onFilters, onReset, onStart, onResume, onHome }: CardFilterPanelProps) {
  const { filters } = state;
  const chosen = new Set(filters.sections);
  const selected = filterCards(cards, state).map((c) => c.id);
  const plan = resetPlan(cards, state);
  const tooSoon = useTapGuard(); // e.g. the twin of the tap on Home's Cards button
  const guarded = (action: () => void) => (event: { detail: number }) => {
    if (!tooSoon(event)) action();
  };

  // Reset: a confirm within RESET_CONFIRM_GUARD_MS of arming is the second tap of a double tap.
  const [confirming, setConfirming] = useState(false);
  const armedAt = useRef(0);
  const [message, setMessage] = useState('');

  const change = (next: Partial<CardFilters>) => {
    setConfirming(false); // the reset target changes with the filters
    setMessage('');
    onFilters({ ...filters, ...next });
  };

  return (
    <div className="screen-page">
      <TopBar title="Cards" onHome={onHome} right={resume ? resume.text : undefined} rightLabel={resume ? `${resume.got} of ${resume.total} got` : undefined} />
      <main className="page cards-filters">
        <section aria-labelledby="card-sections-heading">
          <div className="section-head">
            <h2 id="card-sections-heading" className="section-title">
              Sections{' '}
              <span className="muted">
                {sections.filter((s) => chosen.has(s.id)).length}/{sections.length}
              </span>
            </h2>
            <div className="section-links">
              <button type="button" className="link-btn" onClick={() => change({ sections: [...ALL_CARD_SECTIONS] })}>
                All
              </button>
              <button type="button" className="link-btn" onClick={() => change({ sections: [] })}>
                None
              </button>
            </div>
          </div>
          <div className="chips">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                className="chip chip--text"
                aria-pressed={chosen.has(s.id)}
                onClick={() => change({ sections: toggleSection(filters.sections, s.id) })}
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>

        <section className="card-switches" aria-label="Options">
          <Switch
            label="Shuffle"
            sub={filters.shuffle ? 'New random order every session' : 'Whiteboard order'}
            on={filters.shuffle}
            onToggle={() => change({ shuffle: !filters.shuffle })}
          />
          <Switch
            label="Missed only"
            sub={`Cards you last marked “Missed it” (${missedInSections(cards, state)})`}
            on={filters.missedOnly}
            onToggle={() => change({ missedOnly: !filters.missedOnly })}
          />
        </section>

        <section className="card-reset" aria-label="Reset cards">
          {confirming ? (
            <div className="confirm-row">
              <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={(event) => {
                  if (event.detail > 0 && performance.now() - armedAt.current < RESET_CONFIRM_GUARD_MS) return;
                  onReset(plan.ids);
                  setConfirming(false);
                  setMessage(`${plural(plan.count, 'card')} reset.`);
                }}
              >
                Tap again to reset
              </button>
              <button type="button" className="btn btn-lg" onClick={() => setConfirming(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-lg btn-block btn-danger-outline"
              disabled={plan.count === 0}
              onClick={() => {
                armedAt.current = performance.now();
                setConfirming(true);
                setMessage('');
              }}
            >
              {plan.label}
            </button>
          )}
          <p className="small muted" role="status">
            {confirming
              ? `${plan.label}: erases their “Got it” / “Missed it” history on this device.`
              : message}
          </p>
        </section>

        <div className="actions">
          <p className="cards-selection">{selected.length > 0 ? `${plural(selected.length, 'card')} selected` : emptyReason(cards, filters)}</p>
          {resume ? (
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={guarded(onResume)}>
              Resume ({resume.text})
            </button>
          ) : null}
          <button
            type="button"
            className={`btn btn-lg btn-block${resume ? '' : ' btn-primary'}`}
            disabled={selected.length === 0}
            onClick={guarded(() => onStart(selected))}
          >
            {selected.length === 0 ? 'Nothing to study' : resume ? `New session (${plural(selected.length, 'card')})` : `Study ${plural(selected.length, 'card')}`}
          </button>
        </div>
      </main>
    </div>
  );
}
