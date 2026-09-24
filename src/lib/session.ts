/** Types shared by the screens: what a finished round reports, and its summary. */
import { TOPICS } from '@content/topics';
import type { TopicId } from '@content/types';

export type Mode = 'flash' | 'steps' | 'review';

export const MODE_TITLES: Record<Mode, string> = {
  flash: 'Flash Drill',
  steps: 'Step-Through',
  review: 'Review',
};

export interface AnswerRecord {
  /** Unit id (flash item, generator instance, or `problemId#step`). */
  id: string;
  topic: TopicId;
  correct: boolean;
}

export interface RoundResult {
  mode: Mode;
  answers: AnswerRecord[];
}

export interface TopicMisses {
  topic: TopicId;
  count: number;
}

export interface RoundSummary {
  correct: number;
  total: number;
  /** Unit ids answered wrong, in the order they were missed (no duplicates). */
  missedIds: string[];
  /** Misses per topic, in TOPICS order, only topics with at least one miss. */
  missesByTopic: TopicMisses[];
}

export function summarize(result: RoundResult): RoundSummary {
  const missed = result.answers.filter((a) => !a.correct);
  const counts = new Map<TopicId, number>();
  for (const a of missed) counts.set(a.topic, (counts.get(a.topic) ?? 0) + 1);
  return {
    correct: result.answers.length - missed.length,
    total: result.answers.length,
    missedIds: [...new Set(missed.map((a) => a.id))],
    missesByTopic: TOPICS.filter((t) => counts.has(t.id)).map((t) => ({ topic: t.id, count: counts.get(t.id) ?? 0 })),
  };
}
