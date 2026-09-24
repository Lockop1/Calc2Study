/**
 * Random-number helpers. The app uses `Math.random` at runtime; tests pass a seeded generator so
 * round building and shuffling are reproducible.
 */

/** Returns a float in [0, 1). `Math.random` satisfies this type. */
export type Rng = () => number;

/** Deterministic 32-bit PRNG (mulberry32): the same seed always yields the same sequence. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Uniform integer in [0, n). Clamped so an rng that returns exactly 1 cannot index past the end. */
export function randomIndex(rng: Rng, n: number): number {
  return Math.min(n - 1, Math.max(0, Math.floor(rng() * n)));
}

/** Uniform integer in [min, max] (inclusive). */
export function randomInt(rng: Rng, min: number, max: number): number {
  return min + randomIndex(rng, max - min + 1);
}
