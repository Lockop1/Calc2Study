import type { Card, CardSection } from '../types';

/** The nine filter groups, in whiteboard order, with their chip labels. */
export const CARD_SECTIONS: readonly { id: CardSection; label: string }[] = [
  { id: 'derivatives', label: 'Derivatives' },
  { id: 'antiderivatives', label: 'Antiderivatives' },
  { id: 'pythagorean', label: 'Pythagorean' },
  { id: 'double-angle', label: 'Double-angle' },
  { id: 'half-angle', label: 'Half-angle' },
  { id: 'trig-sub', label: 'Trig sub' },
  { id: 'area-volume', label: 'Area & volume' },
  { id: 'arc-length', label: 'Arc length' },
  { id: 'ibp', label: 'IBP' },
];

/** Flashcard deck (whiteboard formulas). Authored by content-author; verified by math-verifier. */
export const CARDS: Card[] = [];

export function cardsInSection(section: CardSection): Card[] {
  return CARDS.filter((c) => c.section === section);
}
