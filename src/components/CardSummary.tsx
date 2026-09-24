/** End of a Cards session: how many were got, how many were missed at least once, what next. */
import type { SessionSummary } from '../lib/cards';
import { plural } from '../lib/cards';
import { useTapGuard } from '../lib/tap-guard';

export interface CardSummaryProps {
  summary: SessionSummary;
  onStudyMissed: () => void;
  onStudyAgain: () => void;
  onHome: () => void;
}

export function CardSummary({ summary, onStudyMissed, onStudyAgain, onHome }: CardSummaryProps) {
  const tooSoon = useTapGuard(); // the twin of the last "Got it" tap must not hit an action
  const guarded = (action: () => void) => (event: { detail: number }) => {
    if (!tooSoon(event)) action();
  };
  const { total, got, missed, firstTry } = summary;
  return (
    <main className="page summary card-summary">
      <header>
        <p className="section-label">Cards</p>
        <h1 className="card-summary-title">Session complete</h1>
        <p className="muted">
          {missed === 0
            ? `All ${plural(total, 'card')} on the first try. Nice.`
            : `${firstTry} of ${total} on the first try. The ones you missed kept coming back until you got them.`}
        </p>
      </header>

      <section className="card-stats" aria-label="Session results">
        <p className="card-stat card-stat--got">
          <span className="card-stat-num">{got}</span>
          <span className="card-stat-label">got it (of {total})</span>
        </p>
        <p className="card-stat card-stat--missed">
          <span className="card-stat-num">{missed}</span>
          <span className="card-stat-label">missed at least once</span>
        </p>
      </section>

      <div className="actions">
        {missed > 0 ? (
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={guarded(onStudyMissed)}>
            Study missed only ({missed})
          </button>
        ) : null}
        <button type="button" className={`btn btn-lg btn-block${missed === 0 ? ' btn-primary' : ''}`} onClick={guarded(onStudyAgain)}>
          Study again
        </button>
        <button type="button" className="btn btn-lg btn-block btn-ghost" onClick={guarded(onHome)}>
          Home
        </button>
      </div>
    </main>
  );
}
