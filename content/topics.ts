/**
 * Topics for MAC 2312 (Calculus II, UCF). Topics 1–9 (Exam 1) follow the lecture notes in
 * `reference/lectures/`; topics 10–14 (Lectures 8–12) follow the spec block in CLAUDE.md. Do not add
 * topics beyond Lectures 1–12.
 */
export type TopicId =
  | 'diff-review'
  | 'antiderivatives'
  | 'area'
  | 'volumes-disks'
  | 'volumes-shells'
  | 'arc-length'
  | 'ibp'
  | 'trig-integrals'
  | 'trig-sub'
  | 'partial-fractions'
  | 'improper'
  | 'sequences'
  | 'series-basics'
  | 'series-tests';

export interface Topic {
  id: TopicId;
  /** 1-based number used in the UI and in the brief. */
  num: number;
  title: string;
  /** Short label for chips at 390px width. */
  short: string;
  /** Id prefix for content items, e.g. `dr-f-001`, `dr-s-01`. */
  prefix: string;
  lecture: string;
  sections: string;
  /** Whether the topic has memorization content (flash minimum of 40 applies). */
  hasFlashMinimum: boolean;
  /** Whether step-through problems are required (topics 2–14; off for a topic until its Phase C lands). */
  hasStepMinimum: boolean;
}

export const TOPICS: readonly Topic[] = [
  {
    id: 'diff-review',
    num: 1,
    title: 'Differentiation review',
    short: 'Derivatives',
    prefix: 'dr',
    lecture: 'Lecture 1',
    sections: '§1.4–1.7',
    hasFlashMinimum: true,
    hasStepMinimum: false,
  },
  {
    id: 'antiderivatives',
    num: 2,
    title: 'Antiderivatives & u-substitution',
    short: 'u-sub',
    prefix: 'ad',
    lecture: 'Lecture 1',
    sections: '§1.4–1.7',
    hasFlashMinimum: true,
    hasStepMinimum: true,
  },
  {
    id: 'area',
    num: 3,
    title: 'Area between curves',
    short: 'Area',
    prefix: 'ar',
    lecture: 'Lecture 2',
    sections: '§2.1',
    hasFlashMinimum: true,
    hasStepMinimum: true,
  },
  {
    id: 'volumes-disks',
    num: 4,
    title: 'Volumes: slicing, disks & washers',
    short: 'Disks/washers',
    prefix: 'vd',
    lecture: 'Lecture 3',
    sections: '§2.2',
    hasFlashMinimum: true,
    hasStepMinimum: true,
  },
  {
    id: 'volumes-shells',
    num: 5,
    title: 'Volumes: cylindrical shells & method selection',
    short: 'Shells',
    prefix: 'vs',
    lecture: 'Lecture 4',
    sections: '§2.3',
    hasFlashMinimum: true,
    hasStepMinimum: true,
  },
  {
    id: 'arc-length',
    num: 6,
    title: 'Arc length',
    short: 'Arc length',
    prefix: 'al',
    lecture: 'Lecture 5 Part 1',
    sections: '§2.4',
    hasFlashMinimum: true,
    hasStepMinimum: true,
  },
  {
    id: 'ibp',
    num: 7,
    title: 'Integration by parts',
    short: 'IBP',
    prefix: 'ip',
    lecture: 'Lecture 5 Part 2',
    sections: '§3.1',
    hasFlashMinimum: true,
    hasStepMinimum: true,
  },
  {
    id: 'trig-integrals',
    num: 8,
    title: 'Trigonometric integrals',
    short: 'Trig integrals',
    prefix: 'ti',
    lecture: 'Lecture 6',
    sections: '§3.2',
    hasFlashMinimum: true,
    hasStepMinimum: true,
  },
  {
    id: 'trig-sub',
    num: 9,
    title: 'Trigonometric substitution',
    short: 'Trig sub',
    prefix: 'ts',
    lecture: 'Lecture 7',
    sections: '§3.3',
    hasFlashMinimum: true,
    hasStepMinimum: true,
  },
  {
    id: 'partial-fractions',
    num: 10,
    title: 'Partial fractions',
    short: 'Partial fractions',
    prefix: 'pf',
    lecture: 'Lecture 8',
    sections: '§3.4',
    hasFlashMinimum: true,
    hasStepMinimum: false,
  },
  {
    id: 'improper',
    num: 11,
    title: 'Improper integrals',
    short: 'Improper',
    prefix: 'im',
    lecture: 'Lecture 9',
    sections: '§3.7',
    hasFlashMinimum: true,
    hasStepMinimum: false,
  },
  {
    id: 'sequences',
    num: 12,
    title: 'Sequences',
    short: 'Sequences',
    prefix: 'sq',
    lecture: 'Lecture 10',
    sections: '§5.1',
    hasFlashMinimum: true,
    hasStepMinimum: false,
  },
  {
    id: 'series-basics',
    num: 13,
    title: 'Series: partial sums, divergence test, geometric, telescoping',
    short: 'Series basics',
    prefix: 'sb',
    lecture: 'Lecture 11',
    sections: '§5.2',
    hasFlashMinimum: true,
    hasStepMinimum: false,
  },
  {
    id: 'series-tests',
    num: 14,
    title: 'Integral test, direct & limit comparison, choosing a test',
    short: 'Series tests',
    prefix: 'st',
    lecture: 'Lecture 12',
    sections: '§5.3–5.4',
    hasFlashMinimum: true,
    hasStepMinimum: false,
  },
] as const;

export const TOPIC_IDS: readonly TopicId[] = TOPICS.map((t) => t.id);

export function topicById(id: TopicId): Topic {
  const t = TOPICS.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown topic ${id}`);
  return t;
}

/** Minimum content counts enforced by tests/content-volume.test.ts. */
export const MIN_FLASH_PER_TOPIC = 40;
export const MIN_STEPS_PER_TOPIC = 8;
