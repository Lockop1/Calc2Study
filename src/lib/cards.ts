/**
 * Cards mode (flashcards): persisted per-card results and filter choices, the filter itself, the
 * front framing, and the session queue. Pure functions; persistence lives in storage.ts.
 *
 * Session queue: the filtered cards (shuffled, or in deck order). `queue[0]` is the card on screen.
 * "Got it" removes it from the queue; "Missed it" re-inserts it after REINSERT_GAP other cards (at
 * the end when fewer remain), so it keeps coming back until it is got. The session ends when the
 * queue is empty, i.e. when every card of the session has been got.
 */
import type { Card, CardSection } from '@content/types';
import { hasTopLevelSum, variableTex } from './framing';
import type { Rng } from './rng';
import { shuffle } from './shuffle';
import { isRecord, ownValue } from './util';

export type CardResult = 'got' | 'missed';

export interface CardRecord {
  got: number;
  missed: number;
  /** The most recent grade; null when the card has never been graded. */
  last: CardResult | null;
  /** Epoch ms of the most recent grade (0 when unknown). */
  lastAt: number;
}

export interface CardFilters {
  /** Selected sections in whiteboard order (an explicit empty selection is kept). */
  sections: CardSection[];
  shuffle: boolean;
  /** Only cards whose last grade was "Missed it". */
  missedOnly: boolean;
}

export interface CardState {
  version: 1;
  cards: Record<string, CardRecord>;
  filters: CardFilters;
}

/** A filter chip: section id and label (content/cards/deck.ts `CARD_SECTIONS`). */
export interface CardSectionInfo {
  id: CardSection;
  label: string;
}

/** Keyed by the `CardSection` union, so a new section fails to compile until it is listed here. */
const SECTION_SET: Record<CardSection, true> = {
  derivatives: true,
  antiderivatives: true,
  pythagorean: true,
  'double-angle': true,
  'half-angle': true,
  'trig-sub': true,
  'area-volume': true,
  'arc-length': true,
  ibp: true,
};

/** Every section, in whiteboard order. */
export const ALL_CARD_SECTIONS: readonly CardSection[] = Object.keys(SECTION_SET) as CardSection[];

/** A missed card comes back after this many other cards. */
export const REINSERT_GAP = 3;

export function isCardSection(value: unknown): value is CardSection {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(SECTION_SET, value);
}

/** Known sections only, de-duplicated, in whiteboard order. */
export function normalizeSections(list: readonly unknown[]): CardSection[] {
  const wanted = new Set(list);
  return ALL_CARD_SECTIONS.filter((s) => wanted.has(s));
}

export function toggleSection(sections: readonly CardSection[], id: CardSection): CardSection[] {
  return sections.includes(id) ? sections.filter((s) => s !== id) : normalizeSections([...sections, id]);
}

export function defaultCardFilters(): CardFilters {
  return { sections: [...ALL_CARD_SECTIONS], shuffle: true, missedOnly: false };
}

export function defaultCardState(): CardState {
  return { version: 1, cards: {}, filters: defaultCardFilters() };
}

// ─────────────────────────────── persistence shape ───────────────────────────────

const CARD_ID = /^card-[a-z0-9-]{1,60}$/;

function count(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function timestamp(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0;
}

/** Turns anything read from storage into a valid state; malformed parts fall back to defaults. */
export function sanitizeCardState(raw: unknown): CardState {
  const defaults = defaultCardState();
  if (!isRecord(raw) || raw.version !== 1) return defaults;
  const cards: Record<string, CardRecord> = {};
  if (isRecord(raw.cards)) {
    for (const [id, value] of Object.entries(raw.cards)) {
      if (!CARD_ID.test(id) || !isRecord(value)) continue;
      cards[id] = {
        got: count(value.got),
        missed: count(value.missed),
        last: value.last === 'got' || value.last === 'missed' ? value.last : null,
        lastAt: timestamp(value.lastAt),
      };
    }
  }
  const f = isRecord(raw.filters) ? raw.filters : {};
  return {
    version: 1,
    cards,
    filters: {
      sections: Array.isArray(f.sections) ? normalizeSections(f.sections) : defaults.filters.sections,
      shuffle: typeof f.shuffle === 'boolean' ? f.shuffle : defaults.filters.shuffle,
      missedOnly: typeof f.missedOnly === 'boolean' ? f.missedOnly : defaults.filters.missedOnly,
    },
  };
}

export function cardRecord(state: CardState, id: string): CardRecord | undefined {
  return ownValue(state.cards, id);
}

/** Records one grade. Returns a new state; the input is not modified. */
export function recordCardResult(state: CardState, id: string, result: CardResult, now: number): CardState {
  const prev = cardRecord(state, id) ?? { got: 0, missed: 0, last: null, lastAt: 0 };
  const next: CardRecord =
    result === 'got'
      ? { ...prev, got: prev.got + 1, last: 'got', lastAt: now }
      : { ...prev, missed: prev.missed + 1, last: 'missed', lastAt: now };
  return { ...state, cards: { ...state.cards, [id]: next } };
}

export function withFilters(state: CardState, filters: CardFilters): CardState {
  return { ...state, filters };
}

/** Erases the results of `ids`, or of every card when `ids` is null/omitted. Filters are kept. */
export function clearCardProgress(state: CardState, ids?: readonly string[] | null): CardState {
  if (!ids) return { ...state, cards: {} };
  const drop = new Set(ids);
  const cards: Record<string, CardRecord> = {};
  for (const [id, record] of Object.entries(state.cards)) if (!drop.has(id)) cards[id] = record;
  return { ...state, cards };
}

// ─────────────────────────────── filters ───────────────────────────────

/** The card's last grade was "Missed it". */
export function isLastMissed(state: CardState, id: string): boolean {
  return cardRecord(state, id)?.last === 'missed';
}

/** A section filter (not every section selected) or the missed-only filter narrows the deck. */
export function isFilterActive(filters: CardFilters): boolean {
  return filters.missedOnly || ALL_CARD_SECTIONS.some((s) => !filters.sections.includes(s));
}

/** The cards the filters select, in deck order. */
export function filterCards(cards: readonly Card[], state: CardState): Card[] {
  const wanted = new Set(state.filters.sections);
  return cards.filter((c) => wanted.has(c.section) && (!state.filters.missedOnly || isLastMissed(state, c.id)));
}

/** Cards in the selected sections whose last grade was a miss (the missed-only count). */
export function missedInSections(cards: readonly Card[], state: CardState): number {
  const wanted = new Set(state.filters.sections);
  return cards.filter((c) => wanted.has(c.section) && isLastMissed(state, c.id)).length;
}

export function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? '' : 's'}`;
}

export interface ResetPlan {
  /** Ids whose results are erased; null = every card. */
  ids: string[] | null;
  count: number;
  /** Button label: "Reset 24 filtered cards" or "Reset all 50 cards". */
  label: string;
}

/** With a section or missed-only filter active, Reset erases only the filtered cards; otherwise all. */
export function resetPlan(cards: readonly Card[], state: CardState): ResetPlan {
  if (isFilterActive(state.filters)) {
    const ids = filterCards(cards, state).map((c) => c.id);
    return { ids, count: ids.length, label: `Reset ${ids.length} filtered ${ids.length === 1 ? 'card' : 'cards'}` };
  }
  return { ids: null, count: cards.length, label: `Reset all ${plural(cards.length, 'card')}` };
}

/** `ids` restricted to the deck and put in deck order. */
export function inDeckOrder(cards: readonly Card[], ids: Iterable<string>): string[] {
  const wanted = new Set(ids);
  return cards.filter((c) => wanted.has(c.id)).map((c) => c.id);
}

// ─────────────────────────────── front framing ───────────────────────────────

export interface CardFront {
  /** Free text with inline `$…$` math. */
  text?: string;
  /** Display math. */
  latex?: string;
}

/** derivative → d/dx[f]; antiderivative → ∫ f dx; identity → LHS = ?; trig-sub / formula as written. */
export function frameCardFront(card: Card): CardFront {
  const latex = card.front.latex?.trim() || undefined;
  const text = card.front.text?.trim() || undefined;
  if (latex) {
    const v = variableTex(card.variable);
    switch (card.kind) {
      case 'derivative':
        return { text, latex: `\\frac{d}{d${v}}\\left[${latex}\\right]` };
      case 'antiderivative':
        return { text, latex: `\\int ${hasTopLevelSum(latex) ? `\\left(${latex}\\right)` : latex}\\,d${v}` };
      case 'identity':
        return { text, latex: `${latex} = \\,?` };
      default:
        break;
    }
  }
  return { text, latex };
}

// ─────────────────────────────── session queue ───────────────────────────────

export interface CardSession {
  /** Distinct card ids of the session, in their starting order. */
  ids: string[];
  /** Cards still to get; `queue[0]` is on screen. */
  queue: string[];
  /** Cards marked "Got it" (each at most once: getting a card removes it from the queue). */
  got: string[];
  /** Cards missed at least once this session, in first-miss order. */
  missed: string[];
  /** Grades given (got + missed). */
  attempts: number;
}

export function startSession(ids: readonly string[], options: { shuffle?: boolean; rng?: Rng } = {}): CardSession {
  const distinct = [...new Set(ids)];
  const order = options.shuffle ? shuffle(distinct, options.rng) : distinct;
  return { ids: order, queue: order.slice(), got: [], missed: [], attempts: 0 };
}

export function currentCardId(session: CardSession): string | null {
  return session.queue.length > 0 ? session.queue[0] : null;
}

export function isSessionDone(session: CardSession): boolean {
  return session.queue.length === 0;
}

/** Grades the card on screen: got → leaves the queue; missed → back after REINSERT_GAP other cards. */
export function gradeCurrent(session: CardSession, result: CardResult): CardSession {
  const id = currentCardId(session);
  if (id === null) return session;
  const rest = session.queue.slice(1);
  const attempts = session.attempts + 1;
  if (result === 'got') return { ...session, queue: rest, got: [...session.got, id], attempts };
  rest.splice(Math.min(REINSERT_GAP, rest.length), 0, id);
  const missed = session.missed.includes(id) ? session.missed : [...session.missed, id];
  return { ...session, queue: rest, missed, attempts };
}

export interface SessionCounter {
  got: number;
  total: number;
  /** Top-bar text, e.g. "14 / 50 got". */
  text: string;
}

export function sessionCounter(session: CardSession): SessionCounter {
  const got = session.got.length;
  const total = session.ids.length;
  return { got, total, text: `${got} / ${total} got` };
}

export interface SessionSummary {
  total: number;
  got: number;
  /** Missed at least once this session. */
  missed: number;
  /** Got without a miss. */
  firstTry: number;
}

export function summarizeSession(session: CardSession): SessionSummary {
  const missed = new Set(session.missed);
  return {
    total: session.ids.length,
    got: session.got.length,
    missed: missed.size,
    firstTry: session.got.filter((id) => !missed.has(id)).length,
  };
}
