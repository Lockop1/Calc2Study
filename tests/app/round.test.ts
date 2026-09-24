import { sampleFlash, sampleGenerators, sampleSteps } from '@content/examples/sample';
import { TOPIC_IDS } from '@content/topics';
import { describe, expect, it } from 'vitest';
import { contentFromSample } from '../../src/lib/content-source';
import { DAY_MS, emptyProgress, recordAnswer, type Progress } from '../../src/lib/progress';
import { mulberry32 } from '../../src/lib/rng';
import { buildFlashRound, buildStepRound, MAX_GENERATOR_SEED } from '../../src/lib/round';
import { MIN_OPTIONS, resolveUnit, topicOfId, unitTopic } from '../../src/lib/units';
import { makeContent, makeFlash, makeGenerator, withTopic } from './fixtures';

const NOW = Date.UTC(2026, 8, 24, 12);

describe('buildFlashRound', () => {
  const content = makeContent({
    'diff-review': { flash: 12, generators: ['sin-kx', 'exp-kx'] },
    antiderivatives: { flash: 8 },
    area: { flash: 30, generators: ['between'] },
  });

  it('respects the topic selection, the round size, and ≥5 options per unit', () => {
    for (const size of [5, 10, 20]) {
      for (let seed = 1; seed <= 25; seed++) {
        const ids = buildFlashRound({
          topics: ['diff-review', 'antiderivatives'],
          size,
          progress: emptyProgress(),
          rng: mulberry32(seed),
          now: NOW,
          content,
        });
        expect(ids).toHaveLength(size);
        expect(new Set(ids).size).toBe(size);
        for (const id of ids) {
          const unit = resolveUnit(id, content);
          if (!unit || unit.kind !== 'flash') throw new Error(`${id} did not resolve to a flash unit`);
          expect(['diff-review', 'antiderivatives']).toContain(unitTopic(unit));
          expect(unit.item.options.length).toBeGreaterThanOrEqual(MIN_OPTIONS);
        }
      }
    }
  });

  it('returns fewer units when the pool is smaller, with one fresh instance per generator', () => {
    const ids = buildFlashRound({
      topics: ['diff-review'],
      size: 20,
      progress: emptyProgress(),
      rng: mulberry32(4),
      now: NOW,
      content,
    });
    expect(ids).toHaveLength(12 + 2);
    const instances = ids.filter((id) => id.includes(':'));
    expect(instances.map((id) => id.split(':')[0]).sort()).toEqual(['dr-g-exp-kx', 'dr-g-sin-kx']);
    for (const id of instances) {
      const seed = Number(id.split(':')[1]);
      expect(Number.isInteger(seed)).toBe(true);
      expect(seed).toBeGreaterThanOrEqual(1);
      expect(seed).toBeLessThanOrEqual(MAX_GENERATOR_SEED);
    }
  });

  it('returns nothing for no topics or topics without flash content', () => {
    const base = { size: 10, progress: emptyProgress(), rng: mulberry32(1), now: NOW, content };
    expect(buildFlashRound({ ...base, topics: [] })).toEqual([]);
    expect(buildFlashRound({ ...base, topics: ['trig-sub'] })).toEqual([]);
    expect(buildFlashRound({ ...base, topics: ['diff-review'], size: 0 })).toEqual([]);
  });

  it('prefers units not seen in the last 24h and falls back to the oldest recent ones', () => {
    // 8 antiderivative items; 5 were seen within the last day at different times.
    let progress: Progress = emptyProgress();
    const seenAt: Record<string, number> = {
      'ad-f-001': NOW - 1 * 3600_000,
      'ad-f-002': NOW - 2 * 3600_000,
      'ad-f-003': NOW - 3 * 3600_000,
      'ad-f-004': NOW - 4 * 3600_000,
      'ad-f-005': NOW - 5 * 3600_000,
      'ad-f-006': NOW - 2 * DAY_MS, // seen, but not recently
    };
    for (const [id, t] of Object.entries(seenAt)) progress = recordAnswer(progress, id, true, t);
    for (let seed = 1; seed <= 30; seed++) {
      const ids = buildFlashRound({ topics: ['antiderivatives'], size: 5, progress, rng: mulberry32(seed), now: NOW, content });
      // fresh pool: 006, 007, 008 → all included; then the two oldest recent ones: 005, 004
      expect([...ids].sort()).toEqual(['ad-f-004', 'ad-f-005', 'ad-f-006', 'ad-f-007', 'ad-f-008']);
    }
  });

  it('skips items with fewer than 5 options and generators that throw', () => {
    const broken = withTopic(content, 'ibp', {
      flash: [makeFlash('ibp', 1), makeFlash('ibp', 2, 4)],
      generators: [makeGenerator('ibp', 'bad', { throws: true }), makeGenerator('ibp', 'good')],
    });
    const ids = buildFlashRound({ topics: ['ibp'], size: 10, progress: emptyProgress(), rng: mulberry32(1), now: NOW, content: broken });
    expect(ids.map((id) => id.split(':')[0]).sort()).toEqual(['ip-f-001', 'ip-g-good']);
  });

  it('works on the reference sample content (dev fallback)', () => {
    const sample = contentFromSample({ sampleFlash, sampleGenerators, sampleSteps });
    const ids = buildFlashRound({ topics: TOPIC_IDS, size: 10, progress: emptyProgress(), rng: mulberry32(1), now: NOW, content: sample });
    expect(ids).toHaveLength(sampleFlash.length + sampleGenerators.length);
    for (const id of ids) expect(resolveUnit(id, sample)).not.toBeNull();
    for (const id of ids) expect(topicOfId(id)).not.toBeNull();
  });
});

describe('buildStepRound', () => {
  const content = makeContent({
    antiderivatives: { problems: [4, 3, 5, 6] },
    area: { problems: [7, 3] },
    ibp: { flash: 5 },
  });
  const stepsOf = (ids: string[]) =>
    ids.reduce((n, id) => n + (content.flatMap((c) => c.steps).find((p) => p.id === id)?.steps.length ?? 0), 0);

  it('adds whole problems until the step count reaches the round size', () => {
    for (let seed = 1; seed <= 30; seed++) {
      const ids = buildStepRound({ topics: ['antiderivatives'], size: 10, progress: emptyProgress(), rng: mulberry32(seed), content });
      const total = stepsOf(ids);
      expect(total).toBeGreaterThanOrEqual(10);
      // removing the last problem would drop below the target (no extra problems)
      expect(stepsOf(ids.slice(0, -1))).toBeLessThan(10);
      expect(new Set(ids).size).toBe(ids.length);
      for (const id of ids) expect(id.startsWith('ad-s-')).toBe(true);
    }
  });

  it('always returns at least one problem, and never cuts one', () => {
    const ids = buildStepRound({ topics: ['area'], size: 5, progress: emptyProgress(), rng: mulberry32(3), content });
    expect(ids.length).toBeGreaterThanOrEqual(1);
    const one = buildStepRound({ topics: ['area'], size: 0, progress: emptyProgress(), rng: mulberry32(3), content });
    expect(one).toHaveLength(1);
  });

  it('uses every problem when the topics have fewer steps than the round size', () => {
    const ids = buildStepRound({ topics: ['antiderivatives', 'area'], size: 20, progress: emptyProgress(), rng: mulberry32(8), content });
    expect(stepsOf(ids)).toBeGreaterThanOrEqual(20);
    const all = buildStepRound({ topics: ['area'], size: 20, progress: emptyProgress(), rng: mulberry32(8), content });
    expect([...all].sort()).toEqual(['ar-s-01', 'ar-s-02']);
  });

  it('picks least-recently-seen problems first', () => {
    let progress = emptyProgress();
    progress = recordAnswer(progress, 'ad-s-01#0', true, NOW - 1000);
    progress = recordAnswer(progress, 'ad-s-02#2', false, NOW - 5000);
    progress = recordAnswer(progress, 'ad-s-03#1', true, NOW - 9000);
    for (let seed = 1; seed <= 20; seed++) {
      const ids = buildStepRound({ topics: ['antiderivatives'], size: 30, progress, rng: mulberry32(seed), content });
      expect(ids).toEqual(['ad-s-04', 'ad-s-03', 'ad-s-02', 'ad-s-01']);
    }
  });

  it('returns nothing for topics without step problems', () => {
    expect(buildStepRound({ topics: ['ibp'], size: 10, progress: emptyProgress(), rng: mulberry32(1), content })).toEqual([]);
    expect(buildStepRound({ topics: [], size: 10, progress: emptyProgress(), rng: mulberry32(1), content })).toEqual([]);
  });
});
