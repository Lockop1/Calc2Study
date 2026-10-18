/** User settings: round size and the topic selection (persisted by storage.ts). */
import { TOPIC_IDS, type TopicId } from '@content/topics';
import { isRecord } from './util';

export const ROUND_SIZES = [5, 10, 20] as const;
export type RoundSize = (typeof ROUND_SIZES)[number];
export const DEFAULT_ROUND_SIZE: RoundSize = 10;

export interface Settings {
  /** 2 since session 3 (topics 10–14). Version-1 saves are migrated: the new topics start selected. */
  version: 2;
  /** Questions per Flash Drill / Review round; steps per Step-Through round. */
  roundSize: RoundSize;
  /** Selected topics in TOPICS order. Defaults to every topic. */
  topics: TopicId[];
}

export function defaultSettings(): Settings {
  return { version: 2, roundSize: DEFAULT_ROUND_SIZE, topics: [...TOPIC_IDS] };
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

/** The topics that existed when settings were version 1 (sessions 1–2). */
const VERSION_1_TOPICS: readonly TopicId[] = [
  'diff-review',
  'antiderivatives',
  'area',
  'volumes-disks',
  'volumes-shells',
  'arc-length',
  'ibp',
  'trig-integrals',
  'trig-sub',
];

/**
 * Turns anything read from storage into valid settings; unknown shapes fall back to defaults.
 * A version-1 save (before topics 10–14 existed) keeps its selection among the original nine topics
 * and gets every newer topic selected, so new topics default to "on" for returning students.
 */
export function sanitizeSettings(raw: unknown): Settings {
  const defaults = defaultSettings();
  if (!isRecord(raw) || (raw.version !== 1 && raw.version !== 2)) return defaults;
  let topics = defaults.topics;
  if (Array.isArray(raw.topics)) {
    topics = normalizeTopics(raw.topics);
    if (raw.version === 1) topics = normalizeTopics([...topics, ...TOPIC_IDS.filter((id) => !VERSION_1_TOPICS.includes(id))]);
  }
  return {
    version: 2,
    roundSize: isRoundSize(raw.roundSize) ? raw.roundSize : defaults.roundSize,
    topics,
  };
}
