import { describe, expect, it } from 'vitest';
import {
  buildReviewRound,
  DAY_MS,
  dueUnitIds,
  emptyProgress,
  pruneProgress,
  recordAnswer,
  reviewWeight,
  sanitizeProgress,
  weightedSample,
  type Progress,
  type UnitProgress,
} from '../../src/lib/progress';
import { mulberry32 } from '../../src/lib/rng';
import { makeContent } from './fixtures';

const NOW = Date.UTC(2026, 8, 24, 12);
const entry = (e: Partial<UnitProgress>): UnitProgress => ({
  misses: 0,
  lastMissedAt: null,
  lastSeenAt: NOW,
  correctSince: 0,
  ...e,
});

describe('recordAnswer', () => {
  it('a miss increments misses, sets lastMissedAt and lastSeenAt, resets correctSince', () => {
    let p = recordAnswer(emptyProgress(), 'dr-f-001', true, NOW - 5000);
    p = recordAnswer(p, 'dr-f-001', true, NOW - 4000);
    expect(p.units['dr-f-001']).toEqual({ misses: 0, lastMissedAt: null, lastSeenAt: NOW - 4000, correctSince: 2 });
    p = recordAnswer(p, 'dr-f-001', false, NOW);
    expect(p.units['dr-f-001']).toEqual({ misses: 1, lastMissedAt: NOW, lastSeenAt: NOW, correctSince: 0 });
  });

  it('a correct answer increments correctSince and keeps the miss history', () => {
    let p = recordAnswer(emptyProgress(), 'ad-s-01#2', false, NOW - DAY_MS);
    p = recordAnswer(p, 'ad-s-01#2', false, NOW - 1000);
    p = recordAnswer(p, 'ad-s-01#2', true, NOW);
    expect(p.units['ad-s-01#2']).toEqual({ misses: 2, lastMissedAt: NOW - 1000, lastSeenAt: NOW, correctSince: 1 });
  });

  it('never mutates the previous progress', () => {
    const before = emptyProgress();
    const after = recordAnswer(before, 'dr-f-001', false, NOW);
    expect(before.units).toEqual({});
    expect(after).not.toBe(before);
    expect(after.version).toBe(1);
  });
});

describe('reviewWeight', () => {
  it('is 0 for units that were never missed (or unknown)', () => {
    expect(reviewWeight(undefined, NOW)).toBe(0);
    expect(reviewWeight(entry({ correctSince: 4 }), NOW)).toBe(0);
  });

  it('matches (1 + misses)(1 + 2e^(-ageDays/2)) / (1 + correctSince)', () => {
    expect(reviewWeight(entry({ misses: 1, lastMissedAt: NOW }), NOW)).toBeCloseTo(6, 10);
    expect(reviewWeight(entry({ misses: 2, lastMissedAt: NOW - 2 * DAY_MS }), NOW)).toBeCloseTo(3 * (1 + 2 * Math.exp(-1)), 10);
    expect(reviewWeight(entry({ misses: 3, lastMissedAt: NOW - 4 * DAY_MS, correctSince: 2 }), NOW)).toBeCloseTo(
      (4 * (1 + 2 * Math.exp(-2))) / 3,
      10,
    );
  });

  it('prefers recent misses, repeated misses, and units not yet answered correctly since', () => {
    const recent = reviewWeight(entry({ misses: 1, lastMissedAt: NOW - DAY_MS / 24 }), NOW);
    const old = reviewWeight(entry({ misses: 1, lastMissedAt: NOW - 10 * DAY_MS }), NOW);
    const repeated = reviewWeight(entry({ misses: 3, lastMissedAt: NOW - 10 * DAY_MS }), NOW);
    const fixedSince = reviewWeight(entry({ misses: 1, lastMissedAt: NOW - DAY_MS / 24, correctSince: 3 }), NOW);
    expect(recent).toBeGreaterThan(old);
    expect(repeated).toBeGreaterThan(old);
    expect(recent).toBeGreaterThan(fixedSince);
    expect(fixedSince).toBeGreaterThan(0);
  });

  it('treats a future timestamp (clock skew) as age 0', () => {
    expect(reviewWeight(entry({ misses: 1, lastMissedAt: NOW + DAY_MS }), NOW)).toBeCloseTo(6, 10);
  });
});

describe('buildReviewRound', () => {
  const content = makeContent({
    'diff-review': { flash: 6, generators: ['sin-kx'] },
    antiderivatives: { flash: 3, problems: [4] },
    area: { flash: 2 },
  });
  const progress: Progress = {
    version: 1,
    units: {
      'dr-f-001': entry({ misses: 4, lastMissedAt: NOW - DAY_MS / 24 }), // recent + repeated
      'dr-f-002': entry({ misses: 1, lastMissedAt: NOW - 20 * DAY_MS }), // old, single
      'dr-f-003': entry({ correctSince: 5 }), // never missed → not due
      'dr-g-sin-kx:777': entry({ misses: 1, lastMissedAt: NOW - DAY_MS }),
      'ad-f-001': entry({ misses: 1, lastMissedAt: NOW - DAY_MS }),
      'ad-s-01#2': entry({ misses: 2, lastMissedAt: NOW }),
      'ar-f-001': entry({ misses: 1, lastMissedAt: NOW }),
      'dr-f-999': entry({ misses: 5, lastMissedAt: NOW }), // no longer in the content
    },
  };
  const all = ['diff-review', 'antiderivatives', 'area'] as const;

  it('includes only missed units that still exist, from the selected topics', () => {
    const ids = buildReviewRound({ topics: all, size: 20, progress, rng: mulberry32(1), now: NOW, content });
    expect([...ids].sort()).toEqual(['ad-f-001', 'ad-s-01#2', 'ar-f-001', 'dr-f-001', 'dr-f-002', 'dr-g-sin-kx:777']);
    const onlyDr = buildReviewRound({ topics: ['diff-review'], size: 20, progress, rng: mulberry32(1), now: NOW, content });
    expect([...onlyDr].sort()).toEqual(['dr-f-001', 'dr-f-002', 'dr-g-sin-kx:777']);
  });

  it('respects size and onlyIds, and never repeats a unit', () => {
    const ids = buildReviewRound({ topics: all, size: 3, progress, rng: mulberry32(2), now: NOW, content });
    expect(ids).toHaveLength(3);
    expect(new Set(ids).size).toBe(3);
    const only = buildReviewRound({
      topics: all,
      size: 10,
      progress,
      rng: mulberry32(3),
      now: NOW,
      content,
      onlyIds: ['ad-s-01#2', 'dr-f-003', 'ar-f-001'],
    });
    expect([...only].sort()).toEqual(['ad-s-01#2', 'ar-f-001']);
  });

  it('is deterministic for a seeded rng', () => {
    const a = buildReviewRound({ topics: all, size: 4, progress, rng: mulberry32(9), now: NOW, content });
    const b = buildReviewRound({ topics: all, size: 4, progress, rng: mulberry32(9), now: NOW, content });
    expect(a).toEqual(b);
  });

  it('draws recent and repeated misses first far more often (weighted sampling)', () => {
    const rng = mulberry32(12345);
    const firsts = new Map<string, number>();
    const trials = 4000;
    for (let i = 0; i < trials; i++) {
      const [first] = buildReviewRound({ topics: ['diff-review'], size: 1, progress, rng, now: NOW, content });
      firsts.set(first, (firsts.get(first) ?? 0) + 1);
    }
    const w1 = reviewWeight(progress.units['dr-f-001'], NOW);
    const w2 = reviewWeight(progress.units['dr-f-002'], NOW);
    const w3 = reviewWeight(progress.units['dr-g-sin-kx:777'], NOW);
    const total = w1 + w2 + w3;
    expect(firsts.get('dr-f-001')! / trials).toBeCloseTo(w1 / total, 1);
    expect(firsts.get('dr-f-002')! / trials).toBeCloseTo(w2 / total, 1);
    expect(firsts.get('dr-f-001')!).toBeGreaterThan(firsts.get('dr-g-sin-kx:777')!);
    expect(firsts.get('dr-g-sin-kx:777')!).toBeGreaterThan(firsts.get('dr-f-002')!);
  });

  it('dueUnitIds counts every missed, existing unit of the selected topics', () => {
    expect(dueUnitIds({ topics: all, progress, now: NOW, content })).toHaveLength(6);
    expect(dueUnitIds({ topics: ['area'], progress, now: NOW, content })).toEqual(['ar-f-001']);
    expect(dueUnitIds({ topics: [], progress, now: NOW, content })).toEqual([]);
  });

  it('weightedSample returns everything when size exceeds the pool', () => {
    const out = weightedSample(
      [
        { id: 'a', weight: 1 },
        { id: 'b', weight: 5 },
      ],
      10,
      mulberry32(1),
    );
    expect([...out].sort()).toEqual(['a', 'b']);
  });
});

describe('sanitizeProgress / pruneProgress', () => {
  it('drops malformed entries and odd keys, coerces bad numbers', () => {
    const raw = JSON.parse(
      '{"version":1,"units":{"__proto__":{"misses":3},"bogus":{"misses":1},"dr-f-001":{"misses":2.7,"lastMissedAt":5,"lastSeenAt":"x","correctSince":-3},"ad-s-01#0":"nope"}}',
    );
    const p = sanitizeProgress(raw);
    expect(Object.keys(p.units)).toEqual(['dr-f-001']);
    expect(p.units['dr-f-001']).toEqual({ misses: 2, lastMissedAt: 5, lastSeenAt: 0, correctSince: 0 });
    expect(Object.getPrototypeOf(p.units)).toBe(Object.prototype);
  });

  it('ignores other versions and non-objects', () => {
    expect(sanitizeProgress({ version: 2, units: { 'dr-f-001': { misses: 1 } } })).toEqual(emptyProgress());
    expect(sanitizeProgress(null)).toEqual(emptyProgress());
    expect(sanitizeProgress([1, 2])).toEqual(emptyProgress());
  });

  it('forgets never-missed generator instances older than two days, keeps everything else', () => {
    const p: Progress = {
      version: 1,
      units: {
        'dr-g-sin-kx:1': entry({ lastSeenAt: NOW - 3 * DAY_MS, correctSince: 1 }),
        'dr-g-sin-kx:2': entry({ lastSeenAt: NOW - 3 * DAY_MS, misses: 1, lastMissedAt: NOW - 3 * DAY_MS }),
        'dr-g-sin-kx:3': entry({ lastSeenAt: NOW - DAY_MS, correctSince: 1 }),
        'dr-f-001': entry({ lastSeenAt: NOW - 30 * DAY_MS, correctSince: 1 }),
      },
    };
    expect(Object.keys(pruneProgress(p, NOW).units).sort()).toEqual(['dr-f-001', 'dr-g-sin-kx:2', 'dr-g-sin-kx:3']);
    const clean: Progress = { version: 1, units: { 'dr-f-001': entry({}) } };
    expect(pruneProgress(clean, NOW)).toBe(clean);
  });
});
