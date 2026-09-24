/**
 * Units: anything the student can answer.
 *   - a static flash item            `dr-f-001`
 *   - a generator instance           `dr-g-sin-kx:<seed>`  (regenerated with `generate(seed)`)
 *   - one step of a step problem     `ad-s-01#3`
 * Progress is recorded per unit id; Review replays units by id.
 */
import { TOPICS } from '@content/topics';
import type {
  FlashGenerator,
  FlashItem,
  Option,
  Step,
  StepProblem,
  TopicContent,
  TopicId,
} from '@content/types';
import { getContent } from './content-source';

/** Every question and every step shows at least this many options. */
export const MIN_OPTIONS = 5;

export type ResolvedUnit =
  | { kind: 'flash'; item: FlashItem }
  | { kind: 'step'; problem: StepProblem; stepIndex: number };

const UNIT_ID_RE = /^[a-z]{2}-(?:f-\d+|g-[a-z0-9-]+:\d+|s-\d+#\d+)$/;
const DIGITS_RE = /^\d+$/;

/** Syntactic check of a unit id (also keeps odd keys such as `__proto__` out of stored progress). */
export function isUnitId(id: string): boolean {
  return UNIT_ID_RE.test(id);
}

export function stepUnitId(problemId: string, stepIndex: number): string {
  return `${problemId}#${stepIndex}`;
}

export function generatorInstanceId(generatorId: string, seed: number): string {
  return `${generatorId}:${seed}`;
}

export function isGeneratorInstanceId(id: string): boolean {
  return id.includes(':');
}

/** A question can be shown when it has ≥5 options and a valid `correct` index. */
export function isPlayable(q: { options: readonly Option[]; correct: number }): boolean {
  return (
    Array.isArray(q.options) &&
    q.options.length >= MIN_OPTIONS &&
    Number.isInteger(q.correct) &&
    q.correct >= 0 &&
    q.correct < q.options.length
  );
}

export function isPlayableProblem(problem: StepProblem): boolean {
  return Array.isArray(problem.steps) && problem.steps.length > 0 && problem.steps.every(isPlayable);
}

interface ContentIndex {
  flash: Map<string, FlashItem>;
  generators: Map<string, FlashGenerator>;
  problems: Map<string, StepProblem>;
  /** Generated instances by unit id (generators are deterministic, so caching is safe). */
  instances: Map<string, FlashItem | null>;
}

const indexes = new WeakMap<readonly TopicContent[], ContentIndex>();
const MAX_CACHED_INSTANCES = 500;

function indexFor(content: readonly TopicContent[]): ContentIndex {
  let index = indexes.get(content);
  if (!index) {
    index = { flash: new Map(), generators: new Map(), problems: new Map(), instances: new Map() };
    for (const c of content) {
      for (const f of c.flash) if (!index.flash.has(f.id)) index.flash.set(f.id, f);
      for (const g of c.generators) if (!index.generators.has(g.id)) index.generators.set(g.id, g);
      for (const p of c.steps) if (!index.problems.has(p.id)) index.problems.set(p.id, p);
    }
    indexes.set(content, index);
  }
  return index;
}

function generatedItem(index: ContentIndex, id: string, generatorId: string, seedText: string): FlashItem | null {
  const cachedItem = index.instances.get(id);
  if (cachedItem !== undefined) return cachedItem;
  let item: FlashItem | null = null;
  const generator = index.generators.get(generatorId);
  const seed = Number(seedText);
  if (generator && DIGITS_RE.test(seedText) && Number.isSafeInteger(seed) && seed >= 1) {
    try {
      const generated = generator.generate(seed);
      if (generated && isPlayable(generated)) item = generated;
    } catch {
      item = null; // a broken generator must never crash a round
    }
  }
  if (index.instances.size >= MAX_CACHED_INSTANCES) index.instances.clear();
  index.instances.set(id, item);
  return item;
}

/** Looks a unit up by id. Returns null for unknown, malformed, or unplayable units. */
export function resolveUnit(id: string, content: readonly TopicContent[] = getContent()): ResolvedUnit | null {
  const index = indexFor(content);
  const hash = id.indexOf('#');
  if (hash >= 0) {
    const problem = index.problems.get(id.slice(0, hash));
    const stepText = id.slice(hash + 1);
    if (!problem || !DIGITS_RE.test(stepText)) return null;
    const stepIndex = Number(stepText);
    const step = problem.steps[stepIndex];
    if (!step || !isPlayable(step)) return null;
    return { kind: 'step', problem, stepIndex };
  }
  const colon = id.lastIndexOf(':');
  if (colon >= 0) {
    const item = generatedItem(index, id, id.slice(0, colon), id.slice(colon + 1));
    return item ? { kind: 'flash', item } : null;
  }
  const item = index.flash.get(id);
  return item && isPlayable(item) ? { kind: 'flash', item } : null;
}

export function problemById(id: string, content: readonly TopicContent[] = getContent()): StepProblem | null {
  return indexFor(content).problems.get(id) ?? null;
}

export function unitTopic(unit: ResolvedUnit): TopicId {
  return unit.kind === 'flash' ? unit.item.topic : unit.problem.topic;
}

/** Topic from an id's prefix (`dr-…` → diff-review), without resolving the unit. */
export function topicOfId(id: string): TopicId | null {
  const prefix = id.split('-', 1)[0];
  return TOPICS.find((t) => t.prefix === prefix)?.id ?? null;
}

// ── enumeration helpers ──────────────────────────────────────────────────────────────────────

function selected(topics: readonly TopicId[], content: readonly TopicContent[]): readonly TopicContent[] {
  const wanted = new Set(topics);
  return content.filter((c) => wanted.has(c.topic));
}

/** Playable static flash items of the given topics. */
export function flashItemsFor(topics: readonly TopicId[], content: readonly TopicContent[] = getContent()): FlashItem[] {
  return selected(topics, content).flatMap((c) => c.flash.filter(isPlayable));
}

export function generatorsFor(
  topics: readonly TopicId[],
  content: readonly TopicContent[] = getContent(),
): FlashGenerator[] {
  return selected(topics, content).flatMap((c) => c.generators);
}

/** Playable step problems of the given topics. */
export function problemsFor(topics: readonly TopicId[], content: readonly TopicContent[] = getContent()): StepProblem[] {
  return selected(topics, content).flatMap((c) => c.steps.filter(isPlayableProblem));
}

export function stepUnitIds(problem: StepProblem): string[] {
  return problem.steps.map((_, i) => stepUnitId(problem.id, i));
}

/** Every unit id of the given topics that exists without a seed (flash items and all steps). */
export function staticUnitIdsFor(
  topics: readonly TopicId[],
  content: readonly TopicContent[] = getContent(),
): string[] {
  return [
    ...flashItemsFor(topics, content).map((f) => f.id),
    ...problemsFor(topics, content).flatMap(stepUnitIds),
  ];
}

// ── step helpers ─────────────────────────────────────────────────────────────────────────────

export interface WorkLine {
  latex?: string;
  text?: string;
}

/** What a step contributes to "Work so far": its `result`, else the correct option's math/text. */
export function stepResult(step: Step): WorkLine {
  if (step.result && (step.result.latex || step.result.text)) return step.result;
  const correct = step.options[step.correct];
  return { latex: correct?.latex, text: correct?.text };
}

/** The work lines visible before step `stepIndex` (all of them when stepIndex = steps.length). */
export function workLinesBefore(problem: StepProblem, stepIndex: number): WorkLine[] {
  return problem.steps.slice(0, Math.max(0, stepIndex)).map(stepResult);
}
