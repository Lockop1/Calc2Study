// @vitest-environment jsdom
import { TOPIC_IDS } from '@content/topics';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { emptyProgress, recordAnswer } from '../../src/lib/progress';
import { defaultSettings } from '../../src/lib/settings';
import {
  clearMemoryFallback,
  loadProgress,
  loadSettings,
  PROGRESS_KEY,
  resetProgress,
  saveProgress,
  saveSettings,
  SETTINGS_KEY,
  storageAvailable,
} from '../../src/lib/storage';

const NOW = Date.UTC(2026, 8, 24, 12);

beforeEach(() => {
  localStorage.clear();
  clearMemoryFallback();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('settings', () => {
  it('default to every topic and rounds of 10 when storage is empty', () => {
    const s = loadSettings();
    expect(s).toEqual({ version: 1, roundSize: 10, topics: [...TOPIC_IDS] });
    expect(s.topics).toHaveLength(9);
  });

  it('round-trip through localStorage under the versioned key', () => {
    expect(saveSettings({ version: 1, roundSize: 5, topics: ['area', 'ibp'] })).toBe(true);
    expect(JSON.parse(localStorage.getItem(SETTINGS_KEY)!)).toEqual({ version: 1, roundSize: 5, topics: ['area', 'ibp'] });
    expect(loadSettings()).toEqual({ version: 1, roundSize: 5, topics: ['area', 'ibp'] });
  });

  it('keep an explicit empty selection, drop unknown topics, fix bad round sizes', () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ version: 1, roundSize: 7, topics: ['ibp', 'nope', 'area', 'ibp'] }));
    expect(loadSettings()).toEqual({ version: 1, roundSize: 10, topics: ['area', 'ibp'] });
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ version: 1, roundSize: 20, topics: [] }));
    expect(loadSettings()).toEqual({ version: 1, roundSize: 20, topics: [] });
  });

  it('ignore unparseable data and other versions', () => {
    localStorage.setItem(SETTINGS_KEY, '{not json');
    expect(loadSettings()).toEqual(defaultSettings());
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ version: 2, roundSize: 5, topics: ['area'] }));
    expect(loadSettings()).toEqual(defaultSettings());
    localStorage.setItem(SETTINGS_KEY, 'null');
    expect(loadSettings()).toEqual(defaultSettings());
  });
});

describe('progress', () => {
  it('round-trips and prunes stale never-missed generator instances on load', () => {
    let p = recordAnswer(emptyProgress(), 'dr-f-001', false, NOW);
    p = recordAnswer(p, 'dr-g-sin-kx:5', true, NOW - 5 * 86_400_000);
    expect(saveProgress(p)).toBe(true);
    const loaded = loadProgress(NOW);
    expect(Object.keys(loaded.units)).toEqual(['dr-f-001']);
    expect(loaded.units['dr-f-001'].misses).toBe(1);
  });

  it('resetProgress clears stored progress', () => {
    saveProgress(recordAnswer(emptyProgress(), 'dr-f-001', false, NOW));
    expect(resetProgress()).toEqual(emptyProgress());
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull();
    expect(loadProgress(NOW)).toEqual(emptyProgress());
  });
});

describe('when localStorage fails', () => {
  it('falls back to memory when setItem throws (quota / private mode)', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota', 'QuotaExceededError');
    });
    expect(storageAvailable()).toBe(false);
    expect(saveSettings({ version: 1, roundSize: 20, topics: ['trig-sub'] })).toBe(false);
    expect(loadSettings()).toEqual({ version: 1, roundSize: 20, topics: ['trig-sub'] });
    const p = recordAnswer(emptyProgress(), 'ts-f-001', false, NOW);
    expect(saveProgress(p)).toBe(false);
    expect(loadProgress(NOW)).toEqual(p);
    resetProgress();
    expect(loadProgress(NOW)).toEqual(emptyProgress());
  });

  it('memory holds the newest value even if localStorage has an older one', () => {
    saveSettings({ version: 1, roundSize: 5, topics: ['area'] });
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    saveSettings({ version: 1, roundSize: 20, topics: ['ibp'] });
    expect(loadSettings().roundSize).toBe(20);
    spy.mockRestore();
    expect(saveSettings({ version: 1, roundSize: 10, topics: ['ibp'] })).toBe(true);
    expect(loadSettings().roundSize).toBe(10);
  });

  it('works when getItem and removeItem throw', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(loadSettings()).toEqual(defaultSettings());
    expect(loadProgress(NOW)).toEqual(emptyProgress());
    saveProgress(recordAnswer(emptyProgress(), 'dr-f-001', false, NOW));
    expect(resetProgress()).toEqual(emptyProgress());
    expect(loadProgress(NOW)).toEqual(emptyProgress());
    expect(storageAvailable()).toBe(false);
  });

  it('works when even reading window.localStorage throws (storage disabled)', () => {
    const spy = vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('denied', 'SecurityError');
    });
    expect(storageAvailable()).toBe(false);
    expect(loadSettings()).toEqual(defaultSettings());
    expect(saveSettings({ version: 1, roundSize: 5, topics: [] })).toBe(false);
    expect(loadSettings()).toEqual({ version: 1, roundSize: 5, topics: [] });
    spy.mockRestore();
  });

  it('reports storage as available when it works', () => {
    expect(storageAvailable()).toBe(true);
  });
});
