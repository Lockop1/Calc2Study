// Node environment: no `window` at all. Storage must silently use the in-memory fallback.
import { describe, expect, it } from 'vitest';
import { emptyProgress, recordAnswer } from '../../src/lib/progress';
import { loadProgress, loadSettings, saveProgress, saveSettings, storageAvailable } from '../../src/lib/storage';

describe('storage without a browser', () => {
  it('keeps values in memory', () => {
    expect(typeof window).toBe('undefined');
    expect(storageAvailable()).toBe(false);
    expect(loadSettings().topics).toHaveLength(9);
    expect(saveSettings({ version: 1, roundSize: 5, topics: ['area'] })).toBe(false);
    expect(loadSettings()).toEqual({ version: 1, roundSize: 5, topics: ['area'] });
    const p = recordAnswer(emptyProgress(), 'ar-f-001', false, 1000);
    saveProgress(p);
    expect(loadProgress(1000)).toEqual(p);
  });
});
