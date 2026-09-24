/**
 * Blind-option test helper for math-verifier.
 *
 *   npx tsx scripts/blind-sample.ts <topicId> <seed> [fraction=0.35]
 *
 * Prints ≥ fraction of the topic's units (flash items, one instance per generator, and every
 * step of every step-through problem) as OPTION LISTS ONLY — no prompts, no ids — in a shuffled
 * order. Writes:
 *   qa/blind/<topic>-<seed>.key.json      (hidden answer key — do not open before guessing)
 *   qa/blind/<topic>-<seed>.guesses.json  (template: fill in `guess` (1-based) and `reason`)
 * Then score with: npx tsx scripts/blind-score.ts qa/blind/<topic>-<seed>.guesses.json
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { CONTENT } from '../content/index';
import type { Option } from '../content/types';
import { mulberry32, hashString } from '../checker/numeric';

const [topicId, seedArg, fracArg] = process.argv.slice(2);
if (!topicId || !seedArg) {
  console.error('usage: npx tsx scripts/blind-sample.ts <topicId> <seed> [fraction]');
  process.exit(1);
}
const topic = CONTENT.find((c) => c.topic === topicId);
if (!topic) {
  console.error(`unknown topic ${topicId}; valid: ${CONTENT.map((c) => c.topic).join(', ')}`);
  process.exit(1);
}
const seed = Number(seedArg);
const fraction = fracArg ? Number(fracArg) : 0.35;
const rng = mulberry32(hashString(`${topicId}:${seed}`));

interface Unit {
  id: string;
  options: Option[];
  correct: number;
}
const units: Unit[] = [];
for (const item of topic.flash) units.push({ id: item.id, options: item.options, correct: item.correct });
for (const gen of topic.generators) {
  const inst = gen.generate(1);
  units.push({ id: inst.id, options: inst.options, correct: inst.correct });
}
for (const p of topic.steps) p.steps.forEach((s, i) => units.push({ id: `${p.id}#${i}`, options: s.options, correct: s.correct }));

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const n = Math.max(1, Math.ceil(units.length * fraction));
const chosen = shuffle(units).slice(0, n);
const key: Record<string, { id: string; correctDisplayed: number; nOptions: number }> = {};
const guesses: Record<string, { guess: number | null; reason: string }> = {};
const lines: string[] = [];
lines.push(`# Blind-option sample — topic ${topicId}, seed ${seed}: ${n} of ${units.length} units (${Math.round((n / units.length) * 100)}%)`);
lines.push('For each unit, pick the option you think is correct WITHOUT seeing the question, and write your reason.');
lines.push('');
chosen.forEach((u, idx) => {
  const k = String(idx + 1);
  const order = shuffle(u.options.map((_, i) => i));
  const correctDisplayed = order.indexOf(u.correct) + 1;
  key[k] = { id: u.id, correctDisplayed, nOptions: u.options.length };
  guesses[k] = { guess: null, reason: '' };
  lines.push(`### Unit ${k}`);
  order.forEach((origIdx, j) => {
    const o = u.options[origIdx];
    const label = o.latex ? `$${o.latex}$` : (o.text ?? '');
    lines.push(`${j + 1}. ${label}`);
  });
  lines.push('');
});
mkdirSync('qa/blind', { recursive: true });
const base = `qa/blind/${topicId}-${seed}`;
writeFileSync(`${base}.key.json`, JSON.stringify(key, null, 2));
writeFileSync(`${base}.guesses.json`, JSON.stringify(guesses, null, 2));
writeFileSync(`${base}.sample.md`, lines.join('\n'));
console.log(lines.join('\n'));
console.log(`\nWrote ${base}.sample.md, ${base}.guesses.json (fill this in) and ${base}.key.json (do not open).`);
