/**
 * QA (Node side, test-time only): facts the browser sweeps need + checks that complement them.
 *
 *   npx tsx qa/qa-content.ts [fuzzSeedsPerGenerator=400]
 *
 * Writes
 *   qa/results/units.json          every playable unit the browser sweeps can meet: static flash items,
 *                                  generator instances at fixed seeds, every step. For each: the prompt
 *                                  signature and option "sources" exactly as the browser reconstructs them
 *                                  from the rendered DOM (text nodes + KaTeX `annotation` elements), the
 *                                  correct option's source, and (steps) the expected "Work so far" line.
 *   qa/results/content-check.json  - KaTeX render errors / literal `$` / undefined|NaN|[object Object] in
 *                                    every string the app renders, using the app's own framing
 *                                    (src/lib/framing.ts) and `$…$` splitting (src/components/RichText.tsx)
 *                                  - generator fuzz: random seeds from the app's real seed range
 *                                    (1..1,000,000; the test suite only covers seeds 1..20) run through the
 *                                    project validator (checker/validate.ts), determinism, id format
 *                                  - content stats (counts, longest LaTeX strings)
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import katex from 'katex';
import { CONTENT } from '../content/index';
import type { FlashItem, Option, StepProblem } from '../content/types';
import { validateFlashItem } from '../checker/validate';
import { framePrompt } from '../src/lib/framing';
import { splitMath } from '../src/components/RichText';
import { stepResult } from '../src/lib/units';

const FUZZ = Number(process.argv[2] ?? 400);
const SWEEP_SEEDS = [1, 20, 4242, 500000, 1000000];
const MAX_SEED = 1_000_000;

// ── canonical "sources" (what the browser reconstructs from text nodes + KaTeX annotations) ──
function canonText(text: string): string {
  return splitMath(text)
    .map((s) => (s.kind === 'text' ? s.value : s.display ? `$$${s.value}$$` : `$${s.value}$`))
    .join('');
}
function optionSource(o: Option): string {
  return (o.text ? `T:${canonText(o.text)}` : '') + (o.latex ? `L:${o.latex}` : '');
}
function flashPromptSig(item: FlashItem): string {
  const p = framePrompt(item);
  return [
    p.context ? `C:${canonText(p.context)}` : '',
    p.lead ? `Le:${canonText(p.lead)}` : '',
    p.text ? `T:${canonText(p.text)}` : '',
    p.latex ? `M:${p.latex}` : '',
  ].join('');
}
const keyOf = (promptSig: string, sources: string[]) => `${promptSig}\u0002${[...sources].sort().join('\u0001')}`;

// ── KaTeX exactly as the app calls it (src/components/Math.tsx renderTex, production options) ──
const renderIssues: Array<{ where: string; problem: string; source: string }> = [];
function tex(latex: string, displayMode: boolean, where: string): void {
  let html = '';
  try {
    html = katex.renderToString(latex, { displayMode, throwOnError: false, strict: 'ignore', output: 'htmlAndMathml' });
  } catch (e) {
    renderIssues.push({ where, problem: `throws: ${(e as Error).message.split('\n')[0]}`, source: latex });
    return;
  }
  if (html.includes('katex-error')) {
    const msg = /title="([^"]*)"/.exec(html)?.[1] ?? 'katex-error';
    renderIssues.push({ where, problem: `katex-error: ${msg}`, source: latex });
  }
}
function rich(text: string | undefined, where: string): void {
  if (text === undefined) return;
  for (const seg of splitMath(text)) {
    if (seg.kind === 'math') tex(seg.value, seg.display, where);
    else if (seg.value.includes('$')) renderIssues.push({ where, problem: 'literal $ shown (unbalanced or empty $…$)', source: text });
  }
}
const BAD_TEXT = /\bundefined\b|\bNaN\b|\[object Object\]|\bnull\b|Infinity/;
function suspicious(value: unknown, where: string): void {
  const s = typeof value === 'string' ? value : JSON.stringify(value);
  if (s && BAD_TEXT.test(s)) renderIssues.push({ where, problem: `suspicious text ${BAD_TEXT.exec(s)?.[0]}`, source: s.slice(0, 160) });
}

function checkFlash(item: FlashItem, where: string): void {
  const p = framePrompt(item);
  rich(p.context, `${where} prompt.context`);
  rich(p.lead, `${where} prompt.lead`);
  rich(p.text, `${where} prompt.text`);
  if (p.latex) tex(p.latex, true, `${where} prompt.latex(framed)`);
  rich(item.explanation, `${where} explanation`);
  suspicious(item.prompt, `${where} prompt`);
  suspicious(item.explanation, `${where} explanation`);
  item.options.forEach((o, i) => {
    rich(o.text, `${where} opt${i}.text`);
    if (o.latex) tex(`\\displaystyle ${o.latex}`, false, `${where} opt${i}.latex`);
    rich(o.why, `${where} opt${i}.why`);
    suspicious({ t: o.text, l: o.latex, w: o.why }, `${where} opt${i}`);
    if (!o.text && !o.latex) renderIssues.push({ where: `${where} opt${i}`, problem: 'empty option', source: '' });
  });
  const labels = item.options.map(optionSource);
  if (new Set(labels).size !== labels.length) renderIssues.push({ where, problem: 'duplicate option sources', source: labels.join(' | ') });
}

function checkProblem(p: StepProblem): void {
  rich(p.statement.text, `${p.id} statement.text`);
  if (p.statement.latex) tex(p.statement.latex, true, `${p.id} statement.latex`);
  tex(p.final.latex, true, `${p.id} final.latex`);
  rich(p.final.recap, `${p.id} final.recap`);
  suspicious(p.final, `${p.id} final`);
  suspicious(p.title, `${p.id} title`);
  p.steps.forEach((s, si) => {
    const w = `${p.id}#${si}`;
    rich(s.prompt, `${w} prompt`);
    rich(s.explanation, `${w} explanation`);
    const line = stepResult(s);
    rich(line.text, `${w} work-line.text`);
    if (line.latex) tex(`\\displaystyle ${line.latex}`, false, `${w} work-line.latex`);
    suspicious({ p: s.prompt, e: s.explanation, r: s.result }, w);
    s.options.forEach((o, i) => {
      rich(o.text, `${w} opt${i}.text`);
      if (o.latex) tex(`\\displaystyle ${o.latex}`, false, `${w} opt${i}.latex`);
      rich(o.why, `${w} opt${i}.why`);
      suspicious({ t: o.text, l: o.latex, w: o.why }, `${w} opt${i}`);
      if (!o.text && !o.latex) renderIssues.push({ where: `${w} opt${i}`, problem: 'empty option', source: '' });
    });
    const labels = s.options.map(optionSource);
    if (new Set(labels).size !== labels.length) renderIssues.push({ where: w, problem: 'duplicate option sources', source: labels.join(' | ') });
  });
}

// ── units for the browser sweeps ────────────────────────────────────────────────────────────
interface UnitRec {
  id: string;
  topic: string;
  kind: 'flash' | 'step';
  flashKind?: string;
  key: string;
  sources: string[];
  correct: string;
  optionCount: number;
  whyBySource?: Record<string, boolean>;
  workLine?: string;
  finalLatex?: string;
  problemId?: string;
  stepIndex?: number;
  stepCount?: number;
}
const units: UnitRec[] = [];
const flashRec = (item: FlashItem): UnitRec => {
  const sources = item.options.map(optionSource);
  return {
    id: item.id,
    topic: item.topic,
    kind: 'flash',
    flashKind: item.kind,
    key: keyOf(flashPromptSig(item), sources),
    sources,
    correct: sources[item.correct],
    optionCount: sources.length,
  };
};

let staticFlash = 0;
let generatorCount = 0;
let problemCount = 0;
let stepCount = 0;
const perTopic: Record<string, { flash: number; generators: number; problems: number; steps: number }> = {};
const fuzz: Array<{ generator: string; seedsTested: number; failures: Array<{ seed: number; issues: string[] }> }> = [];

function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

for (const c of CONTENT) {
  perTopic[c.topic] = { flash: c.flash.length, generators: c.generators.length, problems: c.steps.length, steps: 0 };
  for (const item of c.flash) {
    staticFlash++;
    checkFlash(item, item.id);
    units.push(flashRec(item));
  }
  for (const g of c.generators) {
    generatorCount++;
    for (const seed of SWEEP_SEEDS) {
      try {
        const item = g.generate(seed);
        checkFlash(item, `${g.id}:${seed}`);
        units.push(flashRec(item));
      } catch (e) {
        renderIssues.push({ where: `${g.id}:${seed}`, problem: `generate throws: ${(e as Error).message}`, source: '' });
      }
    }
    // fuzz over the app's real seed range
    const rnd = prng(0x51a7 ^ g.id.length * 7919);
    const seeds = new Set<number>([MAX_SEED, MAX_SEED - 1, 21, 99, 1000, 65536, 2 ** 31 - 1 > MAX_SEED ? MAX_SEED : 1]);
    while (seeds.size < FUZZ) seeds.add(1 + Math.floor(rnd() * MAX_SEED));
    const failures: Array<{ seed: number; issues: string[] }> = [];
    for (const seed of seeds) {
      const issues: string[] = [];
      try {
        const a = g.generate(seed);
        const b = g.generate(seed);
        if (JSON.stringify(a) !== JSON.stringify(b)) issues.push('not deterministic');
        if (a.id !== `${g.id}:${seed}`) issues.push(`id ${a.id} ≠ ${g.id}:${seed}`);
        if (a.topic !== g.topic) issues.push(`topic ${a.topic} ≠ ${g.topic}`);
        if (a.kind !== g.kind) issues.push(`kind ${a.kind} ≠ ${g.kind}`);
        for (const i of validateFlashItem(a, { generated: true })) if (i.level === 'error') issues.push(`[${i.code}] ${i.message}`);
        const before = renderIssues.length;
        checkFlash(a, `${g.id}:${seed}`);
        for (const r of renderIssues.splice(before)) issues.push(`[render] ${r.where}: ${r.problem} ${r.source.slice(0, 100)}`);
      } catch (e) {
        issues.push(`throws: ${(e as Error).message}`);
      }
      if (issues.length) failures.push({ seed, issues });
    }
    fuzz.push({ generator: g.id, seedsTested: seeds.size, failures });
  }
  for (const p of c.steps) {
    problemCount++;
    checkProblem(p);
    p.steps.forEach((s, si) => {
      stepCount++;
      perTopic[c.topic].steps++;
      const sources = s.options.map(optionSource);
      const line = stepResult(s);
      units.push({
        id: `${p.id}#${si}`,
        topic: p.topic,
        kind: 'step',
        key: keyOf(`P:${p.title}|S:${canonText(s.prompt)}`, sources),
        sources,
        correct: sources[s.correct],
        optionCount: sources.length,
        workLine: (line.text ? `T:${canonText(line.text)}` : '') + (line.latex ? `L:${line.latex}` : ''),
        finalLatex: p.final.latex,
        problemId: p.id,
        stepIndex: si,
        stepCount: p.steps.length,
      });
    });
  }
}

// keys that map to more than one unit (the browser cannot tell those apart)
const byKey = new Map<string, string[]>();
for (const u of units) byKey.set(u.key, [...(byKey.get(u.key) ?? []), u.id]);
const ambiguousKeys = [...byKey.values()].filter((ids) => ids.length > 1);

const longest = [...units]
  .flatMap((u) => u.sources.map((s) => ({ id: u.id, len: s.length, source: s })))
  .sort((a, b) => b.len - a.len)
  .slice(0, 15);
const optionCounts: Record<number, number> = {};
for (const u of units) optionCounts[u.optionCount] = (optionCounts[u.optionCount] ?? 0) + 1;

mkdirSync('qa/results', { recursive: true });
writeFileSync('qa/results/units.json', JSON.stringify(units));
const summary = {
  generatedAt: new Date().toISOString(),
  counts: { staticFlash, generators: generatorCount, problems: problemCount, steps: stepCount, sweepUnits: units.length, perTopic },
  optionCounts,
  ambiguousKeys,
  renderIssues,
  fuzz: fuzz.map((f) => ({ generator: f.generator, seedsTested: f.seedsTested, failing: f.failures.length, examples: f.failures.slice(0, 5) })),
  longestOptionSources: longest,
};
writeFileSync('qa/results/content-check.json', JSON.stringify(summary, null, 2));
console.log(
  JSON.stringify(
    {
      counts: summary.counts,
      optionCounts,
      ambiguousKeys: ambiguousKeys.length,
      renderIssues: renderIssues.length,
      renderIssueExamples: renderIssues.slice(0, 10),
      fuzz: summary.fuzz.map((f) => `${f.generator}: ${f.failing}/${f.seedsTested} failing`),
    },
    null,
    1,
  ),
);
