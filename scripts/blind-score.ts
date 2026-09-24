/**
 *   npx tsx scripts/blind-score.ts qa/blind/<topic>-<seed>.guesses.json
 * Scores blind guesses against the hidden key and prints a Markdown table for the verification log.
 */
import { readFileSync } from 'node:fs';

const file = process.argv[2];
if (!file || !file.endsWith('.guesses.json')) {
  console.error('usage: npx tsx scripts/blind-score.ts qa/blind/<topic>-<seed>.guesses.json');
  process.exit(1);
}
const guesses = JSON.parse(readFileSync(file, 'utf8')) as Record<string, { guess: number | null; reason: string }>;
const key = JSON.parse(readFileSync(file.replace(/\.guesses\.json$/, '.key.json'), 'utf8')) as Record<
  string,
  { id: string; correctDisplayed: number; nOptions: number }
>;
let hits = 0;
let chance = 0;
const rows: string[] = ['| # | item | guess | correct | hit | reason |', '|---|------|-------|---------|-----|--------|'];
for (const k of Object.keys(key)) {
  const g = guesses[k];
  const kk = key[k];
  const hit = g?.guess === kk.correctDisplayed;
  if (hit) hits++;
  chance += 1 / kk.nOptions;
  rows.push(`| ${k} | ${kk.id} | ${g?.guess ?? '—'} | ${kk.correctDisplayed} | ${hit ? 'HIT' : ''} | ${(g?.reason ?? '').replace(/\|/g, '/')} |`);
}
const n = Object.keys(key).length;
console.log(rows.join('\n'));
console.log(`\nHits: ${hits}/${n} (${((100 * hits) / n).toFixed(0)}%). Chance level ≈ ${chance.toFixed(1)}/${n} (${((100 * chance) / n).toFixed(0)}%).`);
console.log('An item is "guessable" only if it was a HIT and the reason is a surface feature (form, length, oddness, symmetry). Rewrite those.');
