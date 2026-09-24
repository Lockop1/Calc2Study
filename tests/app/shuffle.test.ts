import { describe, expect, it } from 'vitest';
import { mulberry32, randomInt } from '../../src/lib/rng';
import { shuffle, shuffleOptions } from '../../src/lib/shuffle';

describe('rng', () => {
  it('mulberry32 is deterministic and stays in [0, 1)', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 1000; i++) {
      const x = a();
      expect(x).toBe(b());
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(1);
    }
  });

  it('randomInt covers the inclusive range and survives an rng that returns 1', () => {
    const rng = mulberry32(7);
    const seen = new Set<number>();
    for (let i = 0; i < 2000; i++) seen.add(randomInt(rng, 1, 6));
    expect([...seen].sort()).toEqual([1, 2, 3, 4, 5, 6]);
    expect(randomInt(() => 1, 1, 6)).toBe(6);
    expect(randomInt(() => 0, 1, 6)).toBe(1);
  });
});

describe('shuffle', () => {
  it('returns a permutation and never mutates the input', () => {
    const input = Object.freeze([1, 2, 3, 4, 5, 6, 7]);
    const out = shuffle(input, 3);
    expect([...out].sort()).toEqual([...input]);
    expect(input).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('is reproducible with a seed and varies across seeds', () => {
    const items = Array.from({ length: 10 }, (_, i) => i);
    expect(shuffle(items, 11)).toEqual(shuffle(items, 11));
    const distinct = new Set(Array.from({ length: 20 }, (_, s) => shuffle(items, s + 1).join(',')));
    expect(distinct.size).toBeGreaterThan(15);
  });

  it('reaches every permutation about equally often', () => {
    const rng = mulberry32(2024);
    const counts = new Map<string, number>();
    const trials = 6000;
    for (let i = 0; i < trials; i++) {
      const key = shuffle(['a', 'b', 'c'], rng).join('');
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    expect(counts.size).toBe(6);
    for (const n of counts.values()) {
      expect(n).toBeGreaterThan(trials / 6 - 200);
      expect(n).toBeLessThan(trials / 6 + 200);
    }
  });

  it('handles empty and single-element arrays', () => {
    expect(shuffle([], 1)).toEqual([]);
    expect(shuffle(['only'], 1)).toEqual(['only']);
  });
});

describe('shuffleOptions', () => {
  const options = ['A', 'B', 'C', 'D', 'E', 'F'];

  it('keeps the correct answer mapping for every seed and every correct index', () => {
    for (let correct = 0; correct < options.length; correct++) {
      for (let seed = 1; seed <= 200; seed++) {
        const s = shuffleOptions(options, correct, seed);
        expect(s.options[s.correctIndex]).toBe(options[correct]);
        expect([...s.options].sort()).toEqual(options);
        s.order.forEach((orig, i) => expect(s.options[i]).toBe(options[orig]));
      }
    }
  });

  it('moves the correct answer around (not always in the same slot)', () => {
    const slots = new Set<number>();
    for (let seed = 1; seed <= 100; seed++) slots.add(shuffleOptions(options, 0, seed).correctIndex);
    expect(slots.size).toBe(options.length);
  });

  it('works with an rng function (unseeded path)', () => {
    const s = shuffleOptions(options, 2);
    expect(s.options[s.correctIndex]).toBe('C');
  });
});
