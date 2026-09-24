// Node environment: no `window` at all. Storage must silently use the in-memory fallback.
import { describe, expect, it, vi } from 'vitest';
import { emptyProgress, recordAnswer } from '../../src/lib/progress';
import { loadProgress, loadSettings, saveProgress, saveSettings, storageAvailable } from '../../src/lib/storage';

// These tests inject fixture content. Never load the real content aggregate: it is authored
// concurrently and may be mid-edit, and app logic must not depend on it.
vi.mock('@content/index', () => ({ CONTENT: [] }));

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
