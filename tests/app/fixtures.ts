/**
 * Synthetic content for app tests. Ids follow the real formats (`xx-f-001`, `xx-g-name:<seed>`,
 * `xx-s-01#<step>`) so every code path (lookup, progress keys, topic prefixes) is exercised.
 * Option text is unique and readable: the correct option is "Correct …", distractors "Wrong …".
 */
import { topicById } from '@content/topics';
import type { FlashGenerator, FlashItem, Option, StepProblem, TopicContent, TopicId } from '@content/types';
import { TOPICS } from '@content/topics';

const pad = (n: number, width: number) => String(n).padStart(width, '0');

/** `count` options; index 0 is correct, the rest are tagged distractors. */
export function makeOptions(label: string, count = 5): Option[] {
  return Array.from({ length: count }, (_, i) =>
    i === 0
      ? { text: `Correct ${label}` }
      : { text: `Wrong ${label}.${i}`, mistake: 'algebra-error' as const, why: `Why wrong ${label}.${i}` },
  );
}

export function makeFlash(topic: TopicId, n: number, optionCount = 5): FlashItem {
  const prefix = topicById(topic).prefix;
  const label = `${prefix}-f-${pad(n, 3)}`;
  return {
    id: label,
    topic,
    kind: 'concept',
    prompt: { text: `Prompt ${label}` },
    options: makeOptions(label, optionCount),
    correct: 0,
    explanation: `Explanation ${label}`,
    check: { kind: 'none', reason: 'fixture' },
  };
}

export function makeGenerator(topic: TopicId, name: string, opts: { throws?: boolean } = {}): FlashGenerator {
  const prefix = topicById(topic).prefix;
  const id = `${prefix}-g-${name}`;
  return {
    id,
    topic,
    kind: 'concept',
    describe: 'fixture generator',
    generate(seed: number): FlashItem {
      if (opts.throws) throw new Error('broken generator');
      const label = `${id}:${seed}`;
      return {
        id: label,
        topic,
        kind: 'concept',
        prompt: { text: `Prompt ${label}` },
        options: makeOptions(label),
        correct: 0,
        explanation: `Explanation ${label}`,
        check: { kind: 'none', reason: 'fixture' },
      };
    },
  };
}

export function makeProblem(topic: TopicId, n: number, stepCount: number, opts: { omitResults?: boolean } = {}): StepProblem {
  const prefix = topicById(topic).prefix;
  const id = `${prefix}-s-${pad(n, 2)}`;
  return {
    id,
    topic,
    title: `Title ${id}`,
    difficulty: 1,
    statement: { text: `Statement ${id}` },
    steps: Array.from({ length: stepCount }, (_, i) => ({
      prompt: `Prompt ${id}#${i}`,
      options: makeOptions(`${id}#${i}`),
      correct: 0,
      explanation: `Explanation ${id}#${i}`,
      ...(opts.omitResults ? {} : { result: { text: `Result ${id}#${i}` } }),
    })),
    final: { latex: '42', expr: '42', check: { kind: 'none', reason: 'fixture' }, recap: `Recap ${id}` },
  };
}

export interface TopicSpec {
  flash?: number;
  generators?: string[];
  /** Step count of each problem. */
  problems?: number[];
}

/** Content for every topic (TOPICS order); unspecified topics are empty. */
export function makeContent(spec: Partial<Record<TopicId, TopicSpec>>): TopicContent[] {
  return TOPICS.map((t) => {
    const s = spec[t.id] ?? {};
    return {
      topic: t.id,
      flash: Array.from({ length: s.flash ?? 0 }, (_, i) => makeFlash(t.id, i + 1)),
      generators: (s.generators ?? []).map((name) => makeGenerator(t.id, name)),
      steps: (s.problems ?? []).map((steps, i) => makeProblem(t.id, i + 1, steps)),
    };
  });
}

/** Deep-ish copy with one topic's content replaced (for edge cases). */
export function withTopic(content: TopicContent[], topic: TopicId, patch: Partial<TopicContent>): TopicContent[] {
  return content.map((c) => (c.topic === topic ? { ...c, ...patch } : c));
}
