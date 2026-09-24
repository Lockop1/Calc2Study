/**
 * One flashcard. The front shows the prompt framed by the card kind (d/dx[…], ∫ … dx, LHS = ?, or
 * the board's question); the back repeats the prompt small, then the answer in display math and the
 * optional "also written as" form. Tapping anywhere on the card flips it (the keyboard path is the
 * "Show answer" button in the dock). Long formulas scroll inside their own `.math-scroll` box.
 */
import type { Card } from '@content/types';
import { useEffect, useState } from 'react';
import { frameCardFront, type CardFront } from '../lib/cards';
import { cx } from '../lib/util';
import { Tex } from './Math';
import { RichText } from './RichText';

export interface FlashcardProps {
  card: Card;
  /** Showing the back. */
  flipped: boolean;
  onFlip: (event: { detail: number }) => void;
}

/** Whole flip: the card turns edge-on, swaps face and colour, and turns back (≤ 200 ms). */
export const FLIP_MS = 200;

/** Animations are skipped for reduced-motion users and outside browsers (tests): the face swaps at once. */
function flipAnimated(): boolean {
  try {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function Prompt({ front, className }: { front: CardFront; className: string }) {
  return (
    <div className={className}>
      {front.text ? <RichText className="fc-text" text={front.text} /> : null}
      {front.latex ? <Tex className="fc-math" latex={front.latex} displayMode /> : null}
    </div>
  );
}

export function Flashcard({ card, flipped, onFlip }: FlashcardProps) {
  const front = frameCardFront(card);
  // `shown` lags `flipped` by half a turn so the face (and its colour) swaps while the card is edge-on.
  const [shown, setShown] = useState(flipped);
  const [turning, setTurning] = useState(false);
  useEffect(() => {
    if (shown === flipped) return;
    if (!flipAnimated()) {
      setShown(flipped);
      return;
    }
    setTurning(true);
    const mid = setTimeout(() => setShown(flipped), FLIP_MS / 2);
    const end = setTimeout(() => setTurning(false), FLIP_MS);
    return () => {
      clearTimeout(mid);
      clearTimeout(end);
    };
  }, [flipped]);
  return (
    <section
      className={cx('flashcard', shown && 'flashcard--back', turning && 'flashcard--turning')}
      data-card={card.id}
      data-side={shown ? 'back' : 'front'}
      aria-label={shown ? 'Card, answer side' : 'Card'}
      onClick={onFlip}
    >
      <p className="fc-category">
        {card.category}
        {shown ? <span className="fc-side-tag">Answer</span> : null}
      </p>
      {shown ? (
        <div key="back" className="fc-face fc-back">
          <Prompt front={front} className="fc-recall" />
          <Tex className="fc-answer" latex={card.back.latex} displayMode />
          {card.back.also ? (
            <div className="fc-also">
              <span className="fc-also-label">also written as</span>
              <Tex latex={card.back.also} />
            </div>
          ) : null}
        </div>
      ) : (
        <div key="front" className="fc-face fc-front">
          <Prompt front={front} className="fc-prompt" />
        </div>
      )}
      <p className="fc-flip-hint" aria-hidden="true">
        {shown ? 'Tap to see the front' : 'Tap to flip'}
      </p>
    </section>
  );
}
