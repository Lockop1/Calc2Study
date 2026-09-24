/** User settings: round size and the topic selection (persisted by storage.ts). */
import { TOPIC_IDS, type TopicId } from '@content/topics';
import { isRecord } from './util';

export const ROUND_SIZES = [5, 10, 20] as const;
export type RoundSize = (typeof ROUND_SIZES)[number];
export const DEFAULT_ROUND_SIZE: RoundSize = 10;

export interface Settings {
  version: 1;
  /** Questions per Flash Drill / Review round; steps per Step-Through round. */
  roundSize: RoundSize;
  /** Selected topics in TOPICS order. Defaults to every topic. */
  topics: TopicId[];
}

export function defaultSettings(): Settings {
  return { version: 1, roundSize: DEFAULT_ROUND_SIZE, topics: [...TOPIC_IDS] };
}

export function isRoundSize(value: unknown): value is RoundSize {
  return typeof value === 'number' && (ROUND_SIZES as readonly number[]).includes(value);
}

/** Known topic ids only, de-duplicated, in TOPICS order. */
export function normalizeTopics(list: readonly unknown[]): TopicId[] {
  const wanted = new Set(list);
  return TOPIC_IDS.filter((id) => wanted.has(id));
}

export function toggleTopic(topics: readonly TopicId[], id: TopicId): TopicId[] {
  return topics.includes(id) ? topics.filter((t) => t !== id) : normalizeTopics([...topics, id]);
}

/** Turns anything read from storage into valid settings; unknown shapes fall back to defaults. */
export function sanitizeSettings(raw: unknown): Settings {
  const defaults = defaultSettings();
  if (!isRecord(raw) || raw.version !== 1) return defaults;
  return {
    version: 1,
    roundSize: isRoundSize(raw.roundSize) ? raw.roundSize : defaults.roundSize,
    topics: Array.isArray(raw.topics) ? normalizeTopics(raw.topics) : defaults.topics,
  };
}
