/**
 * Per-unit progress and the Review deck.
 *
 * Each answered unit keeps `{ misses, lastMissedAt, lastSeenAt, correctSince }`. Review draws from
 * every missed unit, weighted toward recent and repeated misses:
 *
 *   weight = (1 + misses) · (1 + 2·e^(−ageDays/2)) / (1 + correctSince)
 *
 * where ageDays is the time since the last miss. Units never missed have weight 0.
 */
import type { TopicContent, TopicId } from '@content/types';
import { getContent } from './content-source';
import type { Rng } from './rng';
import { isGeneratorInstanceId, isUnitId, resolveUnit, unitTopic } from './units';
import { isRecord, ownValue } from './util';

export const DAY_MS = 86_400_000;

export interface UnitProgress {
  misses: number;
  /** Epoch ms of the most recent miss; null if never missed. */
  lastMissedAt: number | null;
  /** Epoch ms of the most recent answer (right or wrong). */
  lastSeenAt: number;
  /** Correct answers since the last miss. */
  correctSince: number;
}

export interface Progress {
  version: 1;
  units: Record<string, UnitProgress>;
}

export function emptyProgress(): Progress {
  return { version: 1, units: {} };
}

export function progressEntry(progress: Progress, id: string): UnitProgress | undefined {
  return ownValue(progress.units, id);
}

/** Records one answer. Returns a new Progress; the input is not modified. */
export function recordAnswer(progress: Progress, id: string, correct: boolean, now: number): Progress {
  const prev = progressEntry(progress, id) ?? { misses: 0, lastMissedAt: null, lastSeenAt: now, correctSince: 0 };
  const next: UnitProgress = correct
    ? { ...prev, correctSince: prev.correctSince + 1, lastSeenAt: now }
    : { ...prev, misses: prev.misses + 1, lastMissedAt: now, correctSince: 0, lastSeenAt: now };
  return { version: 1, units: { ...progress.units, [id]: next } };
}

export function reviewWeight(entry: UnitProgress | undefined, now: number): number {
  if (!entry || !(entry.misses > 0)) return 0;
  const ageDays = entry.lastMissedAt === null ? Infinity : Math.max(0, (now - entry.lastMissedAt) / DAY_MS);
  const recency = 1 + 2 * Math.exp(-ageDays / 2);
  return ((1 + entry.misses) * recency) / (1 + Math.max(0, entry.correctSince));
}

function count(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function timestamp(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
}

/** Turns anything read from storage into valid progress; malformed entries are dropped. */
export function sanitizeProgress(raw: unknown): Progress {
  if (!isRecord(raw) || raw.version !== 1 || !isRecord(raw.units)) return emptyProgress();
  const units: Record<string, UnitProgress> = {};
  for (const [id, value] of Object.entries(raw.units)) {
    if (!isUnitId(id) || !isRecord(value)) continue;
    units[id] = {
      misses: count(value.misses),
      lastMissedAt: timestamp(value.lastMissedAt),
      lastSeenAt: timestamp(value.lastSeenAt) ?? 0,
      correctSince: count(value.correctSince),
    };
  }
  return { version: 1, units };
}

/** Generator instances that were never missed are only useful for ~a day; drop them after two. */
export const PRUNE_AFTER_MS = 2 * DAY_MS;

/** Keeps stored progress small: forgets never-missed generator instances older than two days. */
export function pruneProgress(progress: Progress, now: number): Progress {
  const units: Record<string, UnitProgress> = {};
  let dropped = false;
  for (const [id, entry] of Object.entries(progress.units)) {
    if (isGeneratorInstanceId(id) && entry.misses === 0 && now - entry.lastSeenAt > PRUNE_AFTER_MS) {
      dropped = true;
      continue;
    }
    units[id] = entry;
  }
  return dropped ? { version: 1, units } : progress;
}

export interface DueOptions {
  topics: readonly TopicId[];
  progress: Progress;
  now?: number;
  content?: readonly TopicContent[];
  /** Restrict to these unit ids (e.g. the misses of the round just played). */
  onlyIds?: readonly string[];
}

interface WeightedId {
  id: string;
  weight: number;
}

function reviewCandidates({ topics, progress, now = Date.now(), content = getContent(), onlyIds }: DueOptions): WeightedId[] {
  const wanted = new Set(topics);
  const allowed = onlyIds ? new Set(onlyIds) : null;
  const out: WeightedId[] = [];
  for (const id of Object.keys(progress.units).sort()) {
    if (allowed && !allowed.has(id)) continue;
    const weight = reviewWeight(progressEntry(progress, id), now);
    if (!(weight > 0)) continue;
    const unit = resolveUnit(id, content);
    if (!unit || !wanted.has(unitTopic(unit))) continue;
    out.push({ id, weight });
  }
  return out;
}

/** Ids of every missed unit in the selected topics that still exists (the Review badge count). */
export function dueUnitIds(options: DueOptions): string[] {
  return reviewCandidates(options).map((c) => c.id);
}

/** Weighted sampling without replacement: each draw picks proportionally to the remaining weights. */
export function weightedSample(items: readonly WeightedId[], size: number, rng: Rng): string[] {
  const pool = items.slice();
  const out: string[] = [];
  while (out.length < size && pool.length > 0) {
    const total = pool.reduce((sum, c) => sum + c.weight, 0);
    let r = rng() * total;
    let pick = pool.length - 1;
    for (let i = 0; i < pool.length; i++) {
      r -= pool[i].weight;
      if (r < 0) {
        pick = i;
        break;
      }
    }
    out.push(pool[pick].id);
    pool.splice(pick, 1);
  }
  return out;
}

export interface ReviewRoundOptions extends DueOptions {
  size: number;
  rng?: Rng;
}

/** A Review round: up to `size` missed units, sampled by review weight without replacement. */
export function buildReviewRound(options: ReviewRoundOptions): string[] {
  const size = Math.max(0, Math.floor(options.size));
  return weightedSample(reviewCandidates(options), size, options.rng ?? Math.random);
}
