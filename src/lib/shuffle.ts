/**
 * Fisher–Yates shuffling, seeded or unseeded, plus option shuffling that keeps track of where the
 * correct answer went. Options are shuffled once per question display (see QuestionView).
 */
import { mulberry32, randomIndex, type Rng } from './rng';

/** An rng function, or a numeric seed for a deterministic shuffle. Omitted → `Math.random`. */
export type RngOrSeed = Rng | number;

function toRng(source: RngOrSeed | undefined): Rng {
  if (typeof source === 'number') return mulberry32(source);
  return source ?? Math.random;
}

/** Returns a shuffled copy of `items` (the input is never modified). */
export function shuffle<T>(items: readonly T[], rng?: RngOrSeed): T[] {
  const next = toRng(rng);
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomIndex(next, i + 1);
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

export interface ShuffledOptions<T> {
  /** The options in display order. */
  options: T[];
  /** Index of the correct option within `options` (-1 only if `correct` was out of range). */
  correctIndex: number;
  /** `order[i]` is the original index of `options[i]` (stable React keys, debugging). */
  order: number[];
}

/** Shuffles options while preserving which one is correct. */
export function shuffleOptions<T>(options: readonly T[], correct: number, rng?: RngOrSeed): ShuffledOptions<T> {
  const order = shuffle(
    options.map((_, i) => i),
    rng,
  );
  return {
    options: order.map((i) => options[i]),
    correctIndex: order.indexOf(correct),
    order,
  };
}
