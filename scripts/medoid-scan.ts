/**
 * Answer-blind "medoid" scan: for every multiple-choice item, guess the option that is most similar
 * to all the others (the hub of the option set) and count how often that guess is the correct
 * answer. Well-built items (one distractor is the hub, the others are built off it) keep this rate
 * at or below ~30% per topic. Two similarity measures are used: normalized edit distance and
 * character-bigram Jaccard. Ties share the credit (a 2-way tie that includes the answer counts ½).
 *
 *   npx tsx scripts/medoid-scan.ts                 # every topic, flash (generators: seeds 1..5) + steps
 *   npx tsx scripts/medoid-scan.ts improper --verbose   # one topic, list the hit ids
 */
import { contentFor } from '../content/index';
import { TOPICS } from '../content/topics';
import type { Option } from '../content/types';

export interface ScanRow {
  id: string;
  edit: number; // credit in [0,1]
  bigram: number;
}
export interface TopicScan {
  topic: string;
  n: number;
  editRate: number;
  bigramRate: number;
  rows: ScanRow[];
}

export function normalizeOption(o: Option): string {
  const s = o.latex ?? o.text ?? '';
  return s
    .replace(/\\(left|right|displaystyle|,|;|!|quad|qquad)/g, '')
    .replace(/\s+/g, '')
    .replace(/\\mathrm\{d\}/g, 'd')
    .toLowerCase();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

function editSim(a: string, b: string): number {
  const m = Math.max(a.length, b.length);
  return m === 0 ? 1 : 1 - levenshtein(a, b) / m;
}

function bigrams(s: string): Set<string> {
  const out = new Set<string>();
  for (let i = 0; i + 1 < s.length; i++) out.add(s.slice(i, i + 2));
  if (s.length === 1) out.add(s);
  return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

/** Credit the medoid heuristic earns on one option list: 1 if the unique hub is the answer, 1/k for a k-way tie containing it, else 0. */
export function medoidCredit(options: Option[], correct: number, sim: (a: string, b: string) => number): number {
  const strs = options.map(normalizeOption);
  const scores = strs.map((s, i) => strs.reduce((acc, t, j) => (i === j ? acc : acc + sim(s, t)), 0));
  const max = Math.max(...scores);
  const winners = scores.map((s, i) => (Math.abs(s - max) < 1e-9 ? i : -1)).filter((i) => i >= 0);
  return winners.includes(correct) ? 1 / winners.length : 0;
}

const bigramSim = (a: string, b: string): number => jaccard(bigrams(a), bigrams(b));

export function scanTopic(topicId: string, opts: { seeds?: number[]; steps?: boolean } = {}): TopicScan {
  const content = contentFor(topicId as Parameters<typeof contentFor>[0]);
  const seeds = opts.seeds ?? [1, 2, 3, 4, 5];
  const rows: ScanRow[] = [];
  const push = (id: string, options: Option[], correct: number) =>
    rows.push({ id, edit: medoidCredit(options, correct, editSim), bigram: medoidCredit(options, correct, bigramSim) });
  for (const item of content.flash) push(item.id, item.options, item.correct);
  for (const gen of content.generators) for (const seed of seeds) {
    const item = gen.generate(seed);
    push(item.id, item.options, item.correct);
  }
  if (opts.steps !== false) {
    for (const p of content.steps) p.steps.forEach((s, i) => push(`${p.id}#${i}`, s.options, s.correct));
  }
  const n = rows.length;
  const sum = (k: 'edit' | 'bigram') => rows.reduce((a, r) => a + r[k], 0);
  return { topic: topicId, n, editRate: n ? sum('edit') / n : 0, bigramRate: n ? sum('bigram') / n : 0, rows };
}

function main(): void {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose');
  const topics = args.filter((a) => !a.startsWith('--'));
  const ids = topics.length ? topics : TOPICS.map((t) => t.id);
  const pct = (x: number) => `${(100 * x).toFixed(1)}%`;
  console.log('topic                n    edit-medoid  bigram-medoid');
  for (const id of ids) {
    const r = scanTopic(id);
    console.log(`${id.padEnd(20)} ${String(r.n).padStart(4)}   ${pct(r.editRate).padStart(8)}     ${pct(r.bigramRate).padStart(8)}`);
    if (verbose) {
      for (const row of r.rows) if (row.edit > 0 || row.bigram > 0) console.log(`   ${row.id.padEnd(28)} edit ${row.edit.toFixed(2)}  bigram ${row.bigram.toFixed(2)}`);
    }
  }
}

if (process.argv[1] && /medoid-scan\.ts$/.test(process.argv[1])) main();
