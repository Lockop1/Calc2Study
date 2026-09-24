// @vitest-environment jsdom
/** Cards persistence: `calc2study:cards` through the storage wrapper (try/catch, in-memory fallback). */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defaultCardState, recordCardResult, withFilters, type CardState } from '../../src/lib/cards';
import { CARDS_KEY, clearMemoryFallback, loadCardState, resetCardState, saveCardState } from '../../src/lib/storage';

// Never load the real content aggregate in app tests (it is authored concurrently).
vi.mock('@content/index', () => ({ CONTENT: [] }));

beforeEach(() => {
  localStorage.clear();
  clearMemoryFallback();
});
afterEach(() => vi.restoreAllMocks());

function sample(): CardState {
  let s = withFilters(defaultCardState(), { sections: ['derivatives', 'trig-sub'], shuffle: false, missedOnly: true });
  s = recordCardResult(s, 'card-derivatives-01', 'missed', 1000);
  s = recordCardResult(s, 'card-trig-sub-02', 'got', 2000);
  s = recordCardResult(s, 'card-ibp-01', 'missed', 3000);
  return s;
}

describe('card state persistence', () => {
  it('defaults when storage is empty', () => {
    expect(loadCardState()).toEqual(defaultCardState());
  });

  it('round-trips through saveCardState / loadCardState under calc2study:cards', () => {
    expect(CARDS_KEY).toBe('calc2study:cards');
    const s = sample();
    expect(saveCardState(s)).toBe(true);
    expect(JSON.parse(localStorage.getItem(CARDS_KEY)!)).toEqual(s);
    expect(loadCardState()).toEqual(s);
  });

  it('ignores unparseable or foreign data', () => {
    for (const raw of ['{not json', 'null', '[1,2]', JSON.stringify({ version: 9 })]) {
      localStorage.setItem(CARDS_KEY, raw);
      expect(loadCardState()).toEqual(defaultCardState());
    }
  });

  it('resetCardState erases only the given ids, or everything; filters are kept', () => {
    const s = sample();
    saveCardState(s);
    const partial = resetCardState(s, ['card-derivatives-01', 'card-trig-sub-02']);
    expect(Object.keys(partial.cards)).toEqual(['card-ibp-01']);
    expect(loadCardState()).toEqual(partial);
    const all = resetCardState(partial);
    expect(all.cards).toEqual({});
    expect(all.filters).toEqual(s.filters);
    expect(loadCardState()).toEqual(all);
  });
});

describe('card state when storage fails', () => {
  it('falls back to memory when setItem throws (quota / private mode)', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota', 'QuotaExceededError');
    });
    const s = sample();
    expect(saveCardState(s)).toBe(false);
    expect(loadCardState()).toEqual(s);
    expect(resetCardState(s).cards).toEqual({});
    expect(loadCardState().cards).toEqual({});
  });

  it('works when getItem throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(loadCardState()).toEqual(defaultCardState());
  });

  it('works when even reading window.localStorage throws (storage disabled)', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError');
    });
    expect(loadCardState()).toEqual(defaultCardState());
    const s = sample();
    expect(saveCardState(s)).toBe(false);
    expect(loadCardState()).toEqual(s);
  });
});
