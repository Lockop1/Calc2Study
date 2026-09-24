/**
 * Aggregates all content. The app imports only this module (via the `@content` alias).
 */
import type { FlashGenerator, FlashItem, StepProblem, TopicContent } from './types';
import { TOPICS, type TopicId } from './topics';

import * as f1 from './flash/diff-review';
import * as f2 from './flash/antiderivatives';
import * as f3 from './flash/area';
import * as f4 from './flash/volumes-disks';
import * as f5 from './flash/volumes-shells';
import * as f6 from './flash/arc-length';
import * as f7 from './flash/ibp';
import * as f8 from './flash/trig-integrals';
import * as f9 from './flash/trig-sub';

import * as s1 from './steps/diff-review';
import * as s2 from './steps/antiderivatives';
import * as s3 from './steps/area';
import * as s4 from './steps/volumes-disks';
import * as s5 from './steps/volumes-shells';
import * as s6 from './steps/arc-length';
import * as s7 from './steps/ibp';
import * as s8 from './steps/trig-integrals';
import * as s9 from './steps/trig-sub';

type FlashModule = { flash: FlashItem[]; generators?: FlashGenerator[] };
type StepModule = { steps: StepProblem[] };

const flashModules: Record<TopicId, FlashModule> = {
  'diff-review': f1,
  antiderivatives: f2,
  area: f3,
  'volumes-disks': f4,
  'volumes-shells': f5,
  'arc-length': f6,
  ibp: f7,
  'trig-integrals': f8,
  'trig-sub': f9,
};

const stepModules: Record<TopicId, StepModule> = {
  'diff-review': s1,
  antiderivatives: s2,
  area: s3,
  'volumes-disks': s4,
  'volumes-shells': s5,
  'arc-length': s6,
  ibp: s7,
  'trig-integrals': s8,
  'trig-sub': s9,
};

export const CONTENT: readonly TopicContent[] = TOPICS.map((t) => ({
  topic: t.id,
  flash: flashModules[t.id].flash,
  generators: flashModules[t.id].generators ?? [],
  steps: stepModules[t.id].steps,
}));

export function contentFor(topic: TopicId): TopicContent {
  const c = CONTENT.find((x) => x.topic === topic);
  if (!c) throw new Error(`No content for topic ${topic}`);
  return c;
}

export const ALL_FLASH: readonly FlashItem[] = CONTENT.flatMap((c) => c.flash);
export const ALL_GENERATORS: readonly FlashGenerator[] = CONTENT.flatMap((c) => c.generators);
export const ALL_STEPS: readonly StepProblem[] = CONTENT.flatMap((c) => c.steps);

export { CARDS, CARD_SECTIONS, cardsInSection } from './cards/deck';
export { TOPICS } from './topics';
export type { TopicId } from './topics';
export type * from './types';
