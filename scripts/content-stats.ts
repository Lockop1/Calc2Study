/**
 *   npx tsx scripts/content-stats.ts
 * Prints per-topic content counts and any warning-level validator findings.
 */
import { CONTENT } from '../content/index';
import { MIN_FLASH_PER_TOPIC, MIN_STEPS_PER_TOPIC, topicById } from '../content/topics';
import { validateFlashItem, validateStepProblem, type Issue } from '../checker/validate';

const rows: string[] = ['| topic | flash | generators | step problems | steps total | status |', '|---|---|---|---|---|---|'];
const warnings: Issue[] = [];
let errors = 0;
for (const c of CONTENT) {
  const t = topicById(c.topic);
  const stepsTotal = c.steps.reduce((a, p) => a + p.steps.length, 0);
  const flashOk = !t.hasFlashMinimum || c.flash.length + 5 * c.generators.length >= MIN_FLASH_PER_TOPIC;
  const stepsOk = !t.hasStepMinimum || c.steps.length >= MIN_STEPS_PER_TOPIC;
  const issues: Issue[] = [];
  for (const item of c.flash) issues.push(...validateFlashItem(item));
  for (const g of c.generators) for (let s = 1; s <= 5; s++) issues.push(...validateFlashItem(g.generate(s), { generated: true }));
  for (const p of c.steps) issues.push(...validateStepProblem(p));
  const errs = issues.filter((i) => i.level === 'error');
  errors += errs.length;
  warnings.push(...issues.filter((i) => i.level === 'warn'));
  rows.push(`| ${c.topic} | ${c.flash.length} | ${c.generators.length} | ${c.steps.length} | ${stepsTotal} | ${flashOk && stepsOk ? 'volume ok' : 'BELOW MINIMUM'}${errs.length ? `, ${errs.length} errors` : ''} |`);
}
console.log(rows.join('\n'));
if (warnings.length) {
  console.log('\nWarnings:');
  for (const w of warnings) console.log(`  [${w.code}] ${w.where}: ${w.message}`);
}
if (errors) console.log(`\n${errors} validation errors — run npm test for details.`);
