/**
 * The single place the app gets its question content from.
 *
 * Production: always the real aggregate `CONTENT` from `content/index.ts`.
 * Development only: when no topic has any content yet (authoring in progress), or when the page is
 * opened with `?sample=1`, the reference examples in `content/examples/sample.ts` are used instead so
 * every screen can be developed and smoke-tested. The sample module is pulled in through
 * `import.meta.glob` INSIDE the `import.meta.env.DEV` branch, so production builds drop both the
 * branch and the (side-effect-free) module.
 */
import { CONTENT } from '@content/index';
import { TOPICS } from '@content/topics';
import type { FlashGenerator, FlashItem, StepProblem, TopicContent } from '@content/types';

export interface SampleModule {
  sampleFlash: FlashItem[];
  sampleGenerators: FlashGenerator[];
  sampleSteps: StepProblem[];
}

/** True when no topic has a single flash item, generator, or step problem. */
export function isContentEmpty(content: readonly TopicContent[]): boolean {
  return content.every((c) => c.flash.length === 0 && c.generators.length === 0 && c.steps.length === 0);
}

/** Groups the reference examples by topic, in TOPICS order (topics without examples stay empty). */
export function contentFromSample(sample: SampleModule): TopicContent[] {
  return TOPICS.map((t) => ({
    topic: t.id,
    flash: sample.sampleFlash.filter((f) => f.topic === t.id),
    generators: sample.sampleGenerators.filter((g) => g.topic === t.id),
    steps: sample.sampleSteps.filter((s) => s.topic === t.id),
  }));
}

function sampleRequestedByUrl(): boolean {
  try {
    return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sample') === '1';
  } catch {
    return false;
  }
}

let cached: readonly TopicContent[] | null = null;
let usingSample = false;

/** The content the app plays. Stable for the lifetime of the page (computed once). */
export function getContent(): readonly TopicContent[] {
  if (cached) return cached;
  let content: readonly TopicContent[] = CONTENT;
  if (import.meta.env.DEV) {
    if (sampleRequestedByUrl() || isContentEmpty(CONTENT)) {
      const modules = import.meta.glob<SampleModule>('@content/examples/sample.ts', { eager: true });
      const sample = Object.values(modules)[0];
      if (sample) {
        content = contentFromSample(sample);
        usingSample = true;
      }
    }
  }
  cached = content;
  return content;
}

/** Whether `getContent()` is serving the reference examples (only ever true in development). */
export function usingSampleContent(): boolean {
  getContent();
  return usingSample;
}
