/** Round builders for Flash Drill and Step-Through (Review lives in progress.ts). */
import type { TopicContent, TopicId } from '@content/types';
import { getContent } from './content-source';
import { DAY_MS, progressEntry, type Progress } from './progress';
import { randomInt, type Rng } from './rng';
import { shuffle } from './shuffle';
import { flashItemsFor, generatorInstanceId, generatorsFor, problemsFor, resolveUnit, stepUnitId } from './units';

/** Units answered within this window are used only when nothing fresher is left. */
export const RECENT_MS = DAY_MS;
/** Generator instances use a random seed in 1..MAX_GENERATOR_SEED. */
export const MAX_GENERATOR_SEED = 1_000_000;

export interface RoundOptions {
  topics: readonly TopicId[];
  /** Flash: number of questions. Step-Through: minimum number of steps. */
  size: number;
  progress: Progress;
  rng?: Rng;
  now?: number;
  content?: readonly TopicContent[];
}

/**
 * Flash Drill round: static flash items of the selected topics plus one fresh random instance per
 * generator, sampled without replacement. Units not seen in the last 24h come first; recently seen
 * units (oldest first) only fill the round when the fresh pool runs out.
 */
export function buildFlashRound({
  topics,
  size,
  progress,
  rng = Math.random,
  now = Date.now(),
  content = getContent(),
}: RoundOptions): string[] {
  const pool = new Set<string>(flashItemsFor(topics, content).map((item) => item.id));
  for (const generator of generatorsFor(topics, content)) {
    const id = generatorInstanceId(generator.id, randomInt(rng, 1, MAX_GENERATOR_SEED));
    if (resolveUnit(id, content)) pool.add(id); // skips generators that throw or emit bad items
  }
  const lastSeen = (id: string): number | null => progressEntry(progress, id)?.lastSeenAt ?? null;
  const isRecent = (id: string): boolean => {
    const seen = lastSeen(id);
    return seen !== null && now - seen < RECENT_MS;
  };
  const ids = [...pool];
  const fresh = shuffle(
    ids.filter((id) => !isRecent(id)),
    rng,
  );
  const recent = shuffle(
    ids.filter(isRecent),
    rng,
  ).sort((a, b) => (lastSeen(a) ?? 0) - (lastSeen(b) ?? 0));
  const count = Math.max(0, Math.floor(size));
  return shuffle([...fresh, ...recent].slice(0, count), rng);
}

/**
 * Step-Through round: whole problems, least-recently-seen first (random tiebreak), added until the
 * number of steps reaches `size`. A problem is never cut, and a round has at least one problem.
 */
export function buildStepRound({ topics, size, progress, rng = Math.random, content = getContent() }: RoundOptions): string[] {
  const problems = problemsFor(topics, content);
  const lastSeen = new Map<string, number>();
  for (const p of problems) {
    let latest = 0;
    p.steps.forEach((_, i) => {
      latest = Math.max(latest, progressEntry(progress, stepUnitId(p.id, i))?.lastSeenAt ?? 0);
    });
    lastSeen.set(p.id, latest);
  }
  const ordered = shuffle(problems, rng).sort((a, b) => (lastSeen.get(a.id) ?? 0) - (lastSeen.get(b.id) ?? 0));
  const picked: string[] = [];
  let steps = 0;
  for (const problem of ordered) {
    if (picked.length > 0 && steps >= size) break;
    picked.push(problem.id);
    steps += problem.steps.length;
  }
  return picked;
}
