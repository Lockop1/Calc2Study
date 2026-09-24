/**
 * The study view of a Cards session: the card fills the upper part of the screen; the dock at the
 * bottom (thumb reach) holds "Show answer" before the flip and the two grade buttons after it. Both
 * docks have the same height, so nothing jumps on the flip. Mount with a `key` per card shown, so the
 * flip state and the tap guards start fresh for every card.
 */
import type { Card } from '@content/types';
import { useRef, useState } from 'react';
import type { CardResult, SessionCounter } from '../lib/cards';
import { TAP_GUARD_MS, useTapGuard } from '../lib/tap-guard';
import { Flashcard } from './Flashcard';
import { QuestionLayout } from './QuestionLayout';

export interface CardStudyProps {
  card: Card;
  counter: SessionCounter;
  onGrade: (result: CardResult) => void;
  /** Opens the filter panel (the session is kept and can be resumed). */
  onFilters: () => void;
  onHome: () => void;
}

function FilterIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  );
}

/** "14 / 50 got" in the top bar; tapping it opens the filters. */
export function CardCounterButton({ counter, onClick }: { counter: SessionCounter; onClick: () => void }) {
  return (
    <button type="button" className="cards-counter" onClick={onClick}>
      <span className="cards-counter-text">{counter.text}</span>
      <FilterIcon />
      <span className="visually-hidden">, filters</span>
    </button>
  );
}

function GradeButtons({ onGrade }: { onGrade: (result: CardResult) => void }) {
  // Mounted by the flip: the second tap of a double tap on the card / "Show answer" must not grade.
  const tooSoon = useTapGuard();
  const grade = (result: CardResult) => (event: { detail: number }) => {
    if (!tooSoon(event)) onGrade(result);
  };
  return (
    <div className="fc-dock" role="group" aria-label="Did you get it?">
      <button type="button" className="btn btn-block fc-dock-btn grade-btn grade-btn--missed" onClick={grade('missed')}>
        Missed it
      </button>
      <button type="button" className="btn btn-block fc-dock-btn grade-btn grade-btn--got" onClick={grade('got')}>
        Got it
      </button>
    </div>
  );
}

export function CardStudy({ card, counter, onGrade, onFilters, onHome }: CardStudyProps) {
  const [flipped, setFlipped] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const tooSoon = useTapGuard(); // the twin of the tap that graded the previous card
  const lastFlipAt = useRef(Number.NEGATIVE_INFINITY);
  const graded = useRef(false);

  /** Pointer flips right after the card appears or right after another flip are double-tap twins. */
  const flipAllowed = (event: { detail: number }): boolean => {
    if (tooSoon(event)) return false;
    const t = performance.now();
    if (event.detail > 0 && t - lastFlipAt.current < TAP_GUARD_MS) return false;
    lastFlipAt.current = t;
    return true;
  };
  const toggle = (event: { detail: number }) => {
    if (!flipAllowed(event)) return;
    setFlipped((f) => !f);
    setRevealed(true);
  };
  const showAnswer = (event: { detail: number }) => {
    if (!flipAllowed(event)) return;
    setFlipped(true);
    setRevealed(true);
  };
  const grade = (result: CardResult) => {
    if (graded.current) return; // one grade per card shown
    graded.current = true;
    onGrade(result);
  };

  return (
    <QuestionLayout
      topbar={{
        title: 'Cards',
        onHome,
        right: <CardCounterButton counter={counter} onClick={onFilters} />,
        progress: counter.total > 0 ? counter.got / counter.total : 0,
      }}
      stage={<Flashcard card={card} flipped={flipped} onFlip={toggle} />}
      answered={revealed}
      announcement={revealed ? 'Answer shown. Did you get it?' : ''}
      dock={
        revealed ? (
          <GradeButtons onGrade={grade} />
        ) : (
          <div className="fc-dock">
            <p className="fc-hint">Answer it in your head, then flip.</p>
            <button type="button" className="btn btn-primary btn-block fc-dock-btn" onClick={showAnswer}>
              Show answer
            </button>
          </div>
        )
      }
    />
  );
}
