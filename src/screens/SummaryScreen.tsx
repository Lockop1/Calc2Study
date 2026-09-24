/** End of a round: score, misses by topic, and what to do next. */
import { topicById } from '@content/topics';
import { MODE_TITLES, summarize, type RoundResult } from '../lib/session';
import { useTapGuard } from '../lib/tap-guard';

export interface SummaryScreenProps {
  result: RoundResult;
  onReviewMisses: (ids: string[]) => void;
  onAnotherRound: () => void;
  onHome: () => void;
}

function verdict(correct: number, total: number): string {
  if (total === 0) return 'Round complete.';
  const ratio = correct / total;
  if (ratio === 1) return 'Perfect round!';
  if (ratio >= 0.8) return 'Strong work.';
  if (ratio >= 0.5) return 'Getting there. Review the misses while they are fresh.';
  return 'Tough round. Reviewing the misses now helps most.';
}

export function SummaryScreen({ result, onReviewMisses, onAnotherRound, onHome }: SummaryScreenProps) {
  const s = summarize(result);
  const tooSoon = useTapGuard(); // the Finish tap's twin must not hit an action
  const guarded = (action: () => void) => (event: { detail: number }) => {
    if (!tooSoon(event)) action();
  };
  const unit = result.mode === 'steps' ? 'steps' : 'questions';
  return (
    <main className="page summary">
      <header>
        <p className="section-label">{MODE_TITLES[result.mode]} · Round complete</p>
        <h1 className="score" aria-label={`Score: ${s.correct} out of ${s.total}`}>
          {s.correct}
          <span className="score-total">/{s.total}</span>
        </h1>
        <p className="muted">
          {s.correct} of {s.total} {unit} right. {verdict(s.correct, s.total)}
        </p>
      </header>

      <section aria-labelledby="missed-heading">
        <h2 id="missed-heading" className="section-title">
          Topics missed
        </h2>
        {s.missesByTopic.length === 0 ? (
          <p className="muted">No misses this round.</p>
        ) : (
          <ul className="missed-list">
            {s.missesByTopic.map(({ topic, count }) => {
              const t = topicById(topic);
              return (
                <li key={topic} className="missed-item">
                  <span className="chip-num" aria-hidden="true">
                    {t.num}
                  </span>
                  <span className="missed-name">{t.title}</span>
                  <span className="missed-count" aria-label={`${count} missed`}>
                    {count}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="actions">
        {s.missedIds.length > 0 ? (
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={guarded(() => onReviewMisses(s.missedIds))}>
            Review misses ({s.missedIds.length})
          </button>
        ) : null}
        <button
          type="button"
          className={`btn btn-lg btn-block${s.missedIds.length === 0 ? ' btn-primary' : ''}`}
          onClick={guarded(onAnotherRound)}
        >
          Another round
        </button>
        <button type="button" className="btn btn-lg btn-block btn-ghost" onClick={guarded(onHome)}>
          Home
        </button>
      </div>
    </main>
  );
}
