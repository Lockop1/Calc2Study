/** Cards mode logic: session queue, counter, filters, reset plan, state sanitizing, front framing. */
import type { Card, CardSection } from '@content/types';
import { describe, expect, it } from 'vitest';
import {
  ALL_CARD_SECTIONS,
  REINSERT_GAP,
  clearCardProgress,
  currentCardId,
  defaultCardState,
  filterCards,
  frameCardFront,
  gradeCurrent,
  inDeckOrder,
  isFilterActive,
  isSessionDone,
  missedInSections,
  recordCardResult,
  resetPlan,
  sanitizeCardState,
  sessionCounter,
  startSession,
  summarizeSession,
  toggleSection,
  withFilters,
  type CardSession,
  type CardState,
} from '../../src/lib/cards';
import { mulberry32 } from '../../src/lib/rng';

const mk = (id: string, section: CardSection, extra: Partial<Card> = {}): Card => ({
  id,
  category: 'Derivatives',
  section,
  kind: 'formula',
  front: { text: `Front ${id}` },
  back: { latex: 'x' },
  check: { kind: 'none', reason: 'fixture' },
  ...extra,
});

const DECK: Card[] = [
  mk('card-derivatives-01', 'derivatives'),
  mk('card-derivatives-02', 'derivatives'),
  mk('card-antiderivatives-01', 'antiderivatives'),
  mk('card-pythagorean-01', 'pythagorean'),
  mk('card-trig-sub-01', 'trig-sub'),
  mk('card-arc-length-01', 'arc-length'),
];

function play(session: CardSession, ...grades: Array<'got' | 'missed'>): CardSession {
  return grades.reduce((s, g) => gradeCurrent(s, g), session);
}

describe('session queue', () => {
  it('keeps deck order without shuffle and shuffles the same cards deterministically with an rng', () => {
    const ids = DECK.map((c) => c.id);
    expect(startSession(ids).queue).toEqual(ids);
    const a = startSession(ids, { shuffle: true, rng: mulberry32(9) });
    const b = startSession(ids, { shuffle: true, rng: mulberry32(9) });
    expect(a.queue).toEqual(b.queue);
    expect([...a.queue].sort()).toEqual([...ids].sort());
    expect(a.ids).toEqual(a.queue);
    expect(startSession(['A', 'A', 'B']).ids).toEqual(['A', 'B']); // distinct cards
  });

  it('re-inserts a missed card after 3 other cards', () => {
    expect(REINSERT_GAP).toBe(3);
    let s = startSession(['A', 'B', 'C', 'D', 'E', 'F']);
    s = gradeCurrent(s, 'missed');
    expect(s.queue).toEqual(['B', 'C', 'D', 'A', 'E', 'F']);
    expect(currentCardId(s)).toBe('B');
    s = play(s, 'got', 'got', 'got');
    expect(currentCardId(s)).toBe('A');
  });

  it('puts a missed card at the end when fewer than 3 others remain, and repeats a lone card', () => {
    expect(gradeCurrent(startSession(['A', 'B', 'C']), 'missed').queue).toEqual(['B', 'C', 'A']);
    expect(gradeCurrent(startSession(['A', 'B']), 'missed').queue).toEqual(['B', 'A']);
    expect(gradeCurrent(startSession(['A']), 'missed').queue).toEqual(['A']);
  });

  it('a missed card keeps coming back until it is got; "Got it" removes a card', () => {
    let s = startSession(['A', 'B']);
    s = play(s, 'missed', 'got'); // A back after B
    expect(s.queue).toEqual(['A']);
    s = play(s, 'missed', 'missed');
    expect(s.queue).toEqual(['A']);
    expect(isSessionDone(s)).toBe(false);
    s = gradeCurrent(s, 'got');
    expect(s.queue).toEqual([]);
    expect(s.got).toEqual(['B', 'A']);
    expect(s.missed).toEqual(['A']); // once, however often it was missed
    expect(s.attempts).toBe(5);
  });

  it('ends when the queue is empty; grading a finished session changes nothing', () => {
    let s = startSession(['A', 'B', 'C']);
    expect(isSessionDone(s)).toBe(false);
    s = play(s, 'got', 'got', 'got');
    expect(isSessionDone(s)).toBe(true);
    expect(currentCardId(s)).toBeNull();
    expect(gradeCurrent(s, 'got')).toBe(s);
    expect(isSessionDone(startSession([]))).toBe(true);
  });

  it('counter: got / distinct cards in the session', () => {
    let s = startSession(DECK.map((c) => c.id));
    expect(sessionCounter(s)).toEqual({ got: 0, total: 6, text: '0 / 6 got' });
    s = play(s, 'got', 'missed', 'got', 'missed');
    expect(sessionCounter(s).text).toBe('2 / 6 got');
    expect(sessionCounter(s).total).toBe(6); // misses never change the total
  });

  it('summary: got, missed at least once, first try', () => {
    let s = startSession(['A', 'B', 'C', 'D']);
    // A missed → [B, C, D, A]; B got → [C, D, A]; C missed → [D, A, C]; D got → [A, C]
    s = play(s, 'missed', 'got', 'missed', 'got');
    expect(s.queue).toEqual(['A', 'C']);
    s = play(s, 'got', 'got');
    expect(isSessionDone(s)).toBe(true);
    expect(summarizeSession(s)).toEqual({ total: 4, got: 4, missed: 2, firstTry: 2 });
    // mid-session: a missed card not yet got does not reduce the first-try count of others
    expect(summarizeSession(play(startSession(['A', 'B']), 'missed', 'got'))).toEqual({ total: 2, got: 1, missed: 1, firstTry: 1 });
  });
});

describe('filters', () => {
  it('default to every section, shuffle on, missed-only off', () => {
    const s = defaultCardState();
    expect(s.filters).toEqual({ sections: [...ALL_CARD_SECTIONS], shuffle: true, missedOnly: false });
    expect(ALL_CARD_SECTIONS).toEqual([
      'derivatives',
      'antiderivatives',
      'pythagorean',
      'double-angle',
      'half-angle',
      'trig-sub',
      'area-volume',
      'arc-length',
      'ibp',
    ]);
    expect(isFilterActive(s.filters)).toBe(false);
    expect(filterCards(DECK, s)).toEqual(DECK);
  });

  it('select sections (whiteboard order kept) and missed-only uses the last grade', () => {
    let s = defaultCardState();
    expect(toggleSection(['ibp'], 'derivatives')).toEqual(['derivatives', 'ibp']);
    s = withFilters(s, { ...s.filters, sections: toggleSection(ALL_CARD_SECTIONS, 'derivatives') });
    expect(isFilterActive(s.filters)).toBe(true);
    expect(filterCards(DECK, s).map((c) => c.id)).not.toContain('card-derivatives-01');

    s = withFilters(defaultCardState(), { ...defaultCardState().filters, missedOnly: true });
    expect(isFilterActive(s.filters)).toBe(true);
    expect(filterCards(DECK, s)).toEqual([]);
    s = recordCardResult(s, 'card-trig-sub-01', 'missed', 1);
    s = recordCardResult(s, 'card-derivatives-02', 'missed', 2);
    s = recordCardResult(s, 'card-derivatives-02', 'got', 3); // last result: got
    expect(filterCards(DECK, s).map((c) => c.id)).toEqual(['card-trig-sub-01']);
    expect(missedInSections(DECK, s)).toBe(1);
    s = withFilters(s, { ...s.filters, sections: ['derivatives'] });
    expect(filterCards(DECK, s)).toEqual([]);
    expect(missedInSections(DECK, s)).toBe(0);
  });

  it('inDeckOrder restricts ids to the deck in deck order', () => {
    expect(inDeckOrder(DECK, ['card-arc-length-01', 'nope', 'card-derivatives-01'])).toEqual(['card-derivatives-01', 'card-arc-length-01']);
  });
});

describe('recording and reset', () => {
  it('records got / missed per card without mutating the input', () => {
    const before = defaultCardState();
    const a = recordCardResult(before, 'card-derivatives-01', 'missed', 100);
    const b = recordCardResult(a, 'card-derivatives-01', 'got', 200);
    expect(before.cards).toEqual({});
    expect(a.cards['card-derivatives-01']).toEqual({ got: 0, missed: 1, last: 'missed', lastAt: 100 });
    expect(b.cards['card-derivatives-01']).toEqual({ got: 1, missed: 1, last: 'got', lastAt: 200 });
  });

  it('resets everything without a filter and only the filtered cards with one', () => {
    let s: CardState = defaultCardState();
    for (const c of DECK) s = recordCardResult(s, c.id, 'missed', 5);
    s = recordCardResult(s, 'card-gone-01', 'missed', 5); // no longer in the deck

    const all = resetPlan(DECK, s);
    expect(all).toEqual({ ids: null, count: 6, label: 'Reset all 6 cards' });
    expect(clearCardProgress(s, all.ids).cards).toEqual({});

    const bySection = withFilters(s, { ...s.filters, sections: ['derivatives', 'trig-sub'] });
    const plan = resetPlan(DECK, bySection);
    expect(plan).toEqual({ ids: ['card-derivatives-01', 'card-derivatives-02', 'card-trig-sub-01'], count: 3, label: 'Reset 3 filtered cards' });
    const cleared = clearCardProgress(bySection, plan.ids);
    expect(Object.keys(cleared.cards).sort()).toEqual(['card-antiderivatives-01', 'card-arc-length-01', 'card-gone-01', 'card-pythagorean-01']);
    expect(cleared.filters).toEqual(bySection.filters); // filters survive a reset

    let missedOnly = withFilters(defaultCardState(), { ...defaultCardState().filters, missedOnly: true });
    missedOnly = recordCardResult(missedOnly, 'card-pythagorean-01', 'missed', 1);
    expect(resetPlan(DECK, missedOnly).label).toBe('Reset 1 filtered card');
  });
});

describe('sanitizeCardState', () => {
  it('turns garbage into the defaults', () => {
    for (const raw of [undefined, null, 42, 'x', [], {}, { version: 2, cards: {} }, { version: '1' }]) {
      expect(sanitizeCardState(raw)).toEqual(defaultCardState());
    }
  });

  it('keeps valid entries, repairs fields, drops malformed ids and entries', () => {
    const raw = JSON.parse(
      JSON.stringify({
        version: 1,
        cards: {
          'card-derivatives-01': { got: 2.7, missed: -1, last: 'bogus', lastAt: 'x' },
          'card-ibp-01': { got: 1, missed: 3, last: 'missed', lastAt: 99 },
          'bad id': { got: 1 },
          'card-trig-sub-02': 'nope',
        },
        filters: { sections: ['ibp', 'nope', 'derivatives', 'ibp'], shuffle: 'yes', missedOnly: true },
      }),
    );
    expect(sanitizeCardState(raw)).toEqual({
      version: 1,
      cards: {
        'card-derivatives-01': { got: 2, missed: 0, last: null, lastAt: 0 },
        'card-ibp-01': { got: 1, missed: 3, last: 'missed', lastAt: 99 },
      },
      filters: { sections: ['derivatives', 'ibp'], shuffle: true, missedOnly: true },
    });
  });

  it('ignores __proto__ keys, keeps an explicit empty section list, and round-trips JSON', () => {
    const polluted = JSON.parse('{"version":1,"cards":{"__proto__":{"got":1}},"filters":{"sections":[]}}');
    const s = sanitizeCardState(polluted);
    expect(Object.keys(s.cards)).toEqual([]);
    expect(s.filters.sections).toEqual([]);
    const full = recordCardResult(withFilters(defaultCardState(), { sections: ['half-angle'], shuffle: false, missedOnly: true }), 'card-half-angle-01', 'got', 7);
    expect(sanitizeCardState(JSON.parse(JSON.stringify(full)))).toEqual(full);
  });
});

describe('front framing per kind', () => {
  it('derivative → d/dx[…], antiderivative → ∫ … dx, identity → LHS = ?', () => {
    expect(frameCardFront(mk('card-derivatives-01', 'derivatives', { kind: 'derivative', front: { latex: '\\sin x' } }))).toEqual({
      text: undefined,
      latex: '\\frac{d}{dx}\\left[\\sin x\\right]',
    });
    expect(frameCardFront(mk('card-derivatives-09', 'derivatives', { kind: 'derivative', front: { latex: '\\sin\\theta' }, variable: 'theta' })).latex).toBe(
      '\\frac{d}{d\\theta}\\left[\\sin\\theta\\right]',
    );
    expect(frameCardFront(mk('card-antiderivatives-05', 'antiderivatives', { kind: 'antiderivative', front: { latex: '\\tan x' } })).latex).toBe('\\int \\tan x\\,dx');
    expect(frameCardFront(mk('card-antiderivatives-06', 'antiderivatives', { kind: 'antiderivative', front: { latex: 'x^2 + 1' } })).latex).toBe(
      '\\int \\left(x^2 + 1\\right)\\,dx',
    );
    expect(frameCardFront(mk('card-half-angle-01', 'half-angle', { kind: 'identity', front: { latex: '\\sin^2 x' } })).latex).toBe('\\sin^2 x = \\,?');
  });

  it('trig-sub and formula cards show the text (and latex, if any) as written', () => {
    expect(frameCardFront(mk('card-trig-sub-02', 'trig-sub', { kind: 'trig-sub', front: { text: 'dx when $x = a\\sin\\theta$?' } }))).toEqual({
      text: 'dx when $x = a\\sin\\theta$?',
      latex: undefined,
    });
    expect(frameCardFront(mk('card-ibp-01', 'ibp', { kind: 'formula', front: { text: 'IBP', latex: '\\int u\\,dv' } }))).toEqual({
      text: 'IBP',
      latex: '\\int u\\,dv',
    });
  });
});
