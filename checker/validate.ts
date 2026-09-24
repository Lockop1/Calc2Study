/**
 * Content validation (test-time only). Enforces the schema and the numeric rules described in
 * content/types.ts. Every rule here is deliberate; never loosen a check to make content pass —
 * fix the content.
 */
import type { Check, Domain, FlashItem, Option, Step, StepProblem } from '../content/types';
import { isMistakeId } from '../content/mistakes';
import { TOPICS, TOPIC_IDS, topicById } from '../content/topics';
import { evaluate, freeVariables, ExprError, parseExpr } from './mathenv';
import { approxEqual, hashString, isFiniteNumber, mulberry32, numDeriv, uniform } from './numeric';
import { tryLatexToMath } from './latex2math';

export interface Issue {
  level: 'error' | 'warn';
  code: string;
  where: string;
  message: string;
}

const DEFAULT_DOMAIN: [number, number] = [0.25, 1.25];
const MIN_POINTS = 6;
const CANDIDATES = 120;

const FORBIDDEN_OPTION = /\b(all|none|neither|both)\s+of\s+the\s+above\b|\bboth\s+[a-z](\s+and\s+[a-z])?\b|\bnone\s+of\s+these\b|\ball\s+of\s+these\b/i;

function optionLabel(o: Option): string {
  return (o.latex ?? o.text ?? '').trim();
}

function normalizeLabel(s: string): string {
  return s.replace(/\s+/g, '').replace(/\\left|\\right|\\,|\;|\\!|\\quad|\\qquad|\\displaystyle/g, '');
}

function endsWithPlusC(latex: string): boolean {
  return /\+\s*C\s*$/.test(latex.trim());
}

export interface NumericContext {
  where: string;
  seed: number;
  variable: string;
  domain?: Domain;
}

function domainFor(v: string, domain?: Domain): [number, number] {
  if (!domain) return DEFAULT_DOMAIN;
  if (Array.isArray(domain)) return domain;
  return domain[v] ?? domain['*'] ?? DEFAULT_DOMAIN;
}

type Scope = Record<string, number>;

/** Evaluate to a scalar-or-vector, or NaN. */
function ev(expr: string, scope: Scope): number | number[] {
  try {
    return evaluate(expr, scope);
  } catch {
    return NaN;
  }
}

function valuesEqual(a: number | number[], b: number | number[], rel: number, abs: number): boolean {
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every((x, i) => valuesEqualScalar(x, b[i], rel, abs));
  }
  return valuesEqualScalar(a, b, rel, abs);
}

function valuesEqualScalar(a: number, b: number, rel: number, abs: number): boolean {
  const an = !isFiniteNumber(a);
  const bn = !isFiniteNumber(b);
  if (an && bn) return true; // both undefined at this point: consistent
  if (an || bn) return false;
  return approxEqual(a, b, rel, abs);
}

function saneValue(v: number | number[]): boolean {
  const arr = Array.isArray(v) ? v : [v];
  return arr.every((x) => isFiniteNumber(x) && Math.abs(x) < 1e8);
}

/** d/dv of expr at scope (scalar only). */
function derivAt(expr: string, v: string, scope: Scope): { value: number; ok: boolean } {
  return numDeriv((x) => {
    const val = ev(expr, { ...scope, [v]: x });
    return typeof val === 'number' ? val : NaN;
  }, scope[v] ?? 0);
}

function safeFreeVars(expr: string, issues: Issue[], where: string, label: string): string[] {
  try {
    return freeVariables(expr);
  } catch (err) {
    issues.push({
      level: 'error',
      code: 'expr-unparseable',
      where,
      message: `${label}: ${(err as Error).message}`,
    });
    return [];
  }
}

function checkExprs(check: Check): string[] {
  switch (check.kind) {
    case 'derivative':
      return [check.of];
    case 'antiderivative':
      return [check.integrand];
    case 'definite-integral':
      return [check.integrand, check.lower, check.upper];
    case 'identity':
      return [check.lhs];
    case 'value':
      return [check.expected];
    case 'none':
      return [];
  }
}

/**
 * Core numeric validation shared by flash items, steps and final answers.
 * `correctExpr` is the expression that must satisfy `check`; `distractorExprs` must all differ.
 */
export function numericChecks(
  ctx: NumericContext,
  check: Check | undefined,
  correctExpr: string,
  distractors: { label: string; expr: string }[],
  latexPairs: { label: string; latex: string; expr: string }[],
  promptLatex?: { latex: string; expected: string },
): Issue[] {
  const issues: Issue[] = [];
  const where = ctx.where;
  const v = ctx.variable;

  // Parse everything first.
  const vars = new Set<string>();
  for (const x of safeFreeVars(correctExpr, issues, where, 'correct expr')) vars.add(x);
  for (const d of distractors) for (const x of safeFreeVars(d.expr, issues, where, `option "${d.label}" expr`)) vars.add(x);
  if (check) {
    for (const e of checkExprs(check)) for (const x of safeFreeVars(e, issues, where, `check.${check.kind}`)) vars.add(x);
  }
  vars.add(v);
  const parsedLatex: { label: string; parsed: string; expr: string }[] = [];
  for (const p of latexPairs) {
    const r = tryLatexToMath(p.latex);
    if (!r.ok) {
      issues.push({
        level: 'error',
        code: 'latex-unparseable',
        where,
        message: `option "${p.label}": latex could not be parsed for the latex↔expr agreement check: ${r.error.message}`,
      });
      continue;
    }
    for (const x of safeFreeVars(r.expr, issues, where, `option "${p.label}" latex`)) vars.add(x);
    parsedLatex.push({ label: p.label, parsed: r.expr, expr: p.expr });
  }
  let promptParsed: string | undefined;
  if (promptLatex) {
    const r = tryLatexToMath(promptLatex.latex);
    if (!r.ok) {
      issues.push({
        level: 'error',
        code: 'latex-unparseable',
        where,
        message: `prompt latex could not be parsed: ${r.error.message}`,
      });
    } else {
      promptParsed = r.expr;
      for (const x of safeFreeVars(r.expr, issues, where, 'prompt latex')) vars.add(x);
      for (const x of safeFreeVars(promptLatex.expected, issues, where, 'prompt expected')) vars.add(x);
    }
  }
  if (issues.some((i) => i.level === 'error')) return issues;

  // Reference function: what the correct expr must equal, and how to compare an option.
  // For 'antiderivative', options are compared through their derivative.
  const viaDerivative = check?.kind === 'antiderivative';
  const rel = viaDerivative || check?.kind === 'derivative' ? 1e-5 : 1e-6;
  const abs = viaDerivative || check?.kind === 'derivative' ? 1e-7 : 1e-8;

  const reference = (scope: Scope): number | number[] | null => {
    if (!check) return null;
    switch (check.kind) {
      case 'derivative': {
        const d = derivAt(check.of, v, scope);
        return d.ok ? d.value : NaN;
      }
      case 'antiderivative':
        return ev(check.integrand, scope);
      case 'definite-integral': {
        const lo = ev(check.lower, scope);
        const hi = ev(check.upper, scope);
        if (typeof lo !== 'number' || typeof hi !== 'number') return NaN;
        return ev(`integral(${check.integrand}, ${v}, ${lo}, ${hi})`, scope);
      }
      case 'identity':
        return ev(check.lhs, scope);
      case 'value':
        return ev(check.expected, scope);
      case 'none':
        return null;
    }
  };
  const optionValue = (expr: string, scope: Scope): number | number[] => {
    if (viaDerivative) {
      const d = derivAt(expr, v, scope);
      return d.ok ? d.value : NaN;
    }
    return ev(expr, scope);
  };

  // Sample points.
  const rng = mulberry32(ctx.seed);
  const varList = [...vars].sort();
  const accepted: { scope: Scope; ref: number | number[] | null; correct: number | number[] }[] = [];
  for (let i = 0; i < CANDIDATES && accepted.length < MIN_POINTS + 2; i++) {
    const scope: Scope = {};
    for (const name of varList) {
      const [lo, hi] = domainFor(name, ctx.domain);
      scope[name] = uniform(rng, lo, hi);
    }
    const ref = reference(scope);
    if (ref !== null && !saneValue(ref)) continue;
    const correctVal = optionValue(correctExpr, scope);
    if (!saneValue(correctVal)) continue;
    // Direct value of the correct expr must also be sane (for latex agreement).
    if (viaDerivative && !saneValue(ev(correctExpr, scope))) continue;
    accepted.push({ scope, ref, correct: correctVal });
  }
  if (accepted.length < MIN_POINTS) {
    issues.push({
      level: 'error',
      code: 'no-valid-samples',
      where,
      message: `only ${accepted.length} valid sample points found in the domain (need ${MIN_POINTS}); set \`domain\` so the correct answer${check ? ' and the check' : ''} are finite (variables: ${varList.join(', ')})`,
    });
    return issues;
  }

  // Correctness.
  if (check && check.kind !== 'none') {
    const bad = accepted.filter((p) => !valuesEqual(p.ref!, p.correct, rel, abs));
    if (bad.length > 0) {
      const p = bad[0];
      issues.push({
        level: 'error',
        code: 'answer-incorrect',
        where,
        message: `correct answer fails the ${check.kind} check at ${bad.length}/${accepted.length} points, e.g. ${fmtScope(p.scope)}: expected ${fmt(p.ref!)} but the stored answer gives ${fmt(p.correct)}`,
      });
    }
  }

  // Distinctness of distractors.
  for (const d of distractors) {
    let matches = 0;
    for (const p of accepted) {
      const val = optionValue(d.expr, p.scope);
      if (valuesEqual(val, p.correct, rel, abs)) matches++;
    }
    if (matches === accepted.length) {
      issues.push({
        level: 'error',
        code: 'distractor-not-distinct',
        where,
        message: `distractor "${d.label}" is numerically identical to the correct answer at all ${accepted.length} sample points${viaDerivative ? ' (same derivative ⇒ same antiderivative up to a constant)' : ''}`,
      });
    } else if (matches * 2 > accepted.length) {
      issues.push({
        level: 'warn',
        code: 'distractor-mostly-equal',
        where,
        message: `distractor "${d.label}" equals the correct answer at ${matches}/${accepted.length} sample points; check the domain`,
      });
    }
  }

  // LaTeX ↔ expr agreement (direct values, at the accepted points).
  for (const p of parsedLatex) {
    const bad = accepted.filter((pt) => !valuesEqual(ev(p.parsed, pt.scope), ev(p.expr, pt.scope), 1e-6, 1e-8));
    if (bad.length > 0) {
      const pt = bad[0];
      issues.push({
        level: 'error',
        code: 'latex-expr-mismatch',
        where,
        message: `option "${p.label}": latex parses to \`${p.parsed}\` which differs from expr \`${p.expr}\` at ${bad.length}/${accepted.length} points, e.g. ${fmtScope(pt.scope)}: latex→${fmt(ev(p.parsed, pt.scope))}, expr→${fmt(ev(p.expr, pt.scope))}`,
      });
    }
  }
  if (promptLatex && promptParsed) {
    const bad = accepted.filter(
      (pt) => !valuesEqual(ev(promptParsed!, pt.scope), ev(promptLatex.expected, pt.scope), 1e-6, 1e-8),
    );
    if (bad.length > 0) {
      const pt = bad[0];
      issues.push({
        level: 'error',
        code: 'prompt-check-mismatch',
        where,
        message: `prompt latex parses to \`${promptParsed}\` which differs from the check expression \`${promptLatex.expected}\` at ${bad.length}/${accepted.length} points, e.g. ${fmtScope(pt.scope)}: latex→${fmt(ev(promptParsed!, pt.scope))}, check→${fmt(ev(promptLatex.expected, pt.scope))}`,
      });
    }
  }
  return issues;
}

function fmt(v: number | number[]): string {
  if (Array.isArray(v)) return `[${v.map((x) => fmtNum(x)).join(', ')}]`;
  return fmtNum(v);
}
function fmtNum(x: number): string {
  return Number.isFinite(x) ? x.toPrecision(8) : String(x);
}
function fmtScope(scope: Scope): string {
  return Object.entries(scope)
    .map(([k, val]) => `${k}=${val.toFixed(4)}`)
    .join(', ');
}

/** Structural checks common to a flash item's or a step's option list. */
function optionListIssues(where: string, options: Option[], correct: number, explanation: string): Issue[] {
  const issues: Issue[] = [];
  const err = (code: string, message: string) => issues.push({ level: 'error', code, where, message });
  if (!Array.isArray(options) || options.length < 5) {
    err('too-few-options', `has ${options?.length ?? 0} options; at least 5 are required`);
    return issues;
  }
  if (!Number.isInteger(correct) || correct < 0 || correct >= options.length) {
    err('correct-out-of-range', `correct index ${correct} is out of range for ${options.length} options`);
    return issues;
  }
  if (!explanation || explanation.trim().length < 8) err('missing-explanation', 'explanation (why the correct answer is correct) is missing or too short');
  const seen = new Map<string, number>();
  options.forEach((o, i) => {
    const label = optionLabel(o);
    if (!label) err('empty-option', `option ${i} has neither latex nor text`);
    const norm = normalizeLabel(label);
    if (seen.has(norm)) err('duplicate-option', `option ${i} duplicates option ${seen.get(norm)} ("${label}")`);
    seen.set(norm, i);
    if (FORBIDDEN_OPTION.test(label)) err('forbidden-option', `option ${i} ("${label}") is an all/none/both-of-the-above style option`);
    if (i === correct) {
      if (o.mistake) err('correct-has-mistake-tag', `the correct option (${i}) must not carry a mistake tag`);
    } else {
      if (!o.mistake) err('distractor-missing-mistake', `distractor ${i} ("${label}") has no mistake tag`);
      else if (!isMistakeId(o.mistake)) err('unknown-mistake', `distractor ${i} uses unknown mistake id "${o.mistake}"`);
      if (!o.why || o.why.trim().length < 10) err('distractor-missing-why', `distractor ${i} ("${label}") has no \`why\` explanation`);
    }
  });
  const withExpr = options.filter((o) => o.expr).length;
  if (withExpr !== 0 && withExpr !== options.length) err('expr-all-or-none', `${withExpr}/${options.length} options have expr; either all options or none must have expr`);
  const withPlusC = options.filter((o) => o.latex && endsWithPlusC(o.latex)).length;
  if (withPlusC !== 0 && withPlusC !== options.length) err('plus-c-inconsistent', `${withPlusC}/${options.length} options end with "+ C"; all or none must`);
  return issues;
}

function latexPairsOf(options: Option[]): { label: string; latex: string; expr: string }[] {
  return options
    .filter((o) => o.latex && o.expr)
    .map((o) => ({ label: optionLabel(o), latex: o.latex!, expr: o.expr! }));
}

export function validateFlashItem(item: FlashItem, opts: { generated?: boolean } = {}): Issue[] {
  const issues: Issue[] = [];
  const where = item.id ?? '(no id)';
  const err = (code: string, message: string) => issues.push({ level: 'error', code, where, message });

  if (!item.id) err('missing-id', 'item has no id');
  if (!TOPIC_IDS.includes(item.topic)) err('unknown-topic', `unknown topic "${item.topic}"`);
  else {
    const prefix = topicById(item.topic).prefix;
    const re = opts.generated ? new RegExp(`^${prefix}-g-[a-z0-9-]+:\\d+$`) : new RegExp(`^${prefix}-f-\\d{3}$`);
    if (!re.test(item.id)) err('bad-id', `id "${item.id}" must match ${re}`);
  }
  const kinds = ['derivative', 'antiderivative', 'evaluate', 'formula', 'technique', 'concept'];
  if (!kinds.includes(item.kind)) err('unknown-kind', `unknown kind "${item.kind}"`);
  if (!item.prompt || (!item.prompt.text && !item.prompt.latex)) err('missing-prompt', 'prompt needs text and/or latex');
  if (!item.check) err('missing-check', 'check is required (use { kind: "none", reason } only when no numeric check is possible)');
  if (item.check?.kind === 'none' && !item.check.reason) err('check-none-reason', 'check.kind "none" requires a reason');
  issues.push(...optionListIssues(where, item.options ?? [], item.correct, item.explanation));
  if (issues.some((i) => i.level === 'error')) return issues;

  const correctOpt = item.options[item.correct];
  const v = item.variable ?? 'x';

  // Kind-specific structural rules.
  const mathKinds = ['derivative', 'antiderivative', 'evaluate'];
  if (mathKinds.includes(item.kind)) {
    if (!item.prompt.latex) err('missing-prompt-latex', `${item.kind} items need prompt.latex (the bare expression)`);
    item.options.forEach((o, i) => {
      if (!o.latex) err('option-missing-latex', `option ${i} needs latex for a ${item.kind} item`);
      if (!o.expr) err('option-missing-expr', `option ${i} needs a mathjs expr for a ${item.kind} item`);
    });
    if (item.kind === 'derivative' && item.check.kind !== 'derivative') err('check-kind-mismatch', 'derivative items need check.kind "derivative"');
    if (item.kind === 'antiderivative' && item.check.kind !== 'antiderivative') err('check-kind-mismatch', 'antiderivative items need check.kind "antiderivative"');
    if (item.kind === 'evaluate' && item.check.kind !== 'definite-integral') err('check-kind-mismatch', 'evaluate items need check.kind "definite-integral"');
    if (item.kind === 'antiderivative') {
      item.options.forEach((o, i) => {
        if (o.latex && !endsWithPlusC(o.latex)) err('missing-plus-c', `option ${i} ("${o.latex}") must end with "+ C" (indefinite integral)`);
      });
    } else {
      item.options.forEach((o, i) => {
        if (o.latex && endsWithPlusC(o.latex)) err('unexpected-plus-c', `option ${i} ("${o.latex}") must not end with "+ C"`);
      });
    }
  }
  if (item.check.kind !== 'none' && !correctOpt.expr) err('correct-missing-expr', `check.kind "${item.check.kind}" requires the correct option to have an expr`);
  if (issues.some((i) => i.level === 'error')) return issues;

  if (correctOpt.expr) {
    const distractors = item.options
      .filter((_, i) => i !== item.correct)
      .map((o) => ({ label: optionLabel(o), expr: o.expr! }));
    let promptLatex: { latex: string; expected: string } | undefined;
    if (item.kind === 'derivative' && item.check.kind === 'derivative') promptLatex = { latex: item.prompt.latex!, expected: item.check.of };
    if (item.kind === 'antiderivative' && item.check.kind === 'antiderivative') promptLatex = { latex: item.prompt.latex!, expected: item.check.integrand };
    if (item.kind === 'evaluate' && item.check.kind === 'definite-integral') {
      promptLatex = {
        latex: item.prompt.latex!,
        expected: `integral(${item.check.integrand}, ${v}, ${item.check.lower}, ${item.check.upper})`,
      };
    }
    issues.push(
      ...numericChecks(
        { where, seed: hashString(item.id), variable: v, domain: item.domain },
        item.check,
        correctOpt.expr,
        distractors,
        latexPairsOf(item.options),
        promptLatex,
      ),
    );
  } else {
    // No exprs at all: conceptual item. Still make sure check exprs parse if present.
    for (const e of checkExprs(item.check)) {
      try {
        parseExpr(e);
      } catch (e2) {
        err('expr-unparseable', (e2 as ExprError).message);
      }
    }
  }
  return issues;
}

export function validateStep(problem: StepProblem, step: Step, index: number): Issue[] {
  const where = `${problem.id}#${index}`;
  const issues: Issue[] = [];
  const err = (code: string, message: string) => issues.push({ level: 'error', code, where, message });
  if (!step.prompt || step.prompt.trim().length < 5) err('missing-step-prompt', 'step prompt is missing');
  issues.push(...optionListIssues(where, step.options ?? [], step.correct, step.explanation));
  if (step.result && !step.result.latex && !step.result.text) err('empty-result', 'step.result needs latex or text');
  if (issues.some((i) => i.level === 'error')) return issues;
  const correctOpt = step.options[step.correct];
  if (step.check && step.check.kind !== 'none' && !correctOpt.expr) err('correct-missing-expr', `step.check "${step.check.kind}" requires the correct option to have an expr`);
  if (step.check?.kind === 'none' && !step.check.reason) err('check-none-reason', 'check.kind "none" requires a reason');
  if (issues.some((i) => i.level === 'error')) return issues;
  if (correctOpt.expr) {
    const distractors = step.options.filter((_, i) => i !== step.correct).map((o) => ({ label: optionLabel(o), expr: o.expr! }));
    issues.push(
      ...numericChecks(
        {
          where,
          seed: hashString(where),
          variable: step.variable ?? problem.variable ?? 'x',
          domain: step.domain ?? problem.domain,
        },
        step.check,
        correctOpt.expr,
        distractors,
        latexPairsOf(step.options),
      ),
    );
  }
  return issues;
}

export function validateStepProblem(problem: StepProblem): Issue[] {
  const issues: Issue[] = [];
  const where = problem.id ?? '(no id)';
  const err = (code: string, message: string) => issues.push({ level: 'error', code, where, message });
  if (!problem.id) err('missing-id', 'problem has no id');
  if (!TOPIC_IDS.includes(problem.topic)) err('unknown-topic', `unknown topic "${problem.topic}"`);
  else {
    const prefix = topicById(problem.topic).prefix;
    const re = new RegExp(`^${prefix}-s-\\d{2}$`);
    if (!re.test(problem.id)) err('bad-id', `id "${problem.id}" must match ${re}`);
  }
  if (!problem.title) err('missing-title', 'title is required');
  if (![1, 2].includes(problem.difficulty)) err('bad-difficulty', 'difficulty must be 1 or 2');
  if (!problem.statement || (!problem.statement.text && !problem.statement.latex)) err('missing-statement', 'statement needs text and/or latex');
  if (!Array.isArray(problem.steps) || problem.steps.length < 3 || problem.steps.length > 7) err('bad-step-count', `problems need 3–7 steps (has ${problem.steps?.length ?? 0})`);
  if (!problem.final) err('missing-final', 'final is required');
  else {
    if (!problem.final.latex) err('missing-final-latex', 'final.latex is required');
    if (!problem.final.recap || problem.final.recap.trim().length < 10) err('missing-recap', 'final.recap is required');
    if (!problem.final.check) err('missing-final-check', 'final.check is required');
    else if (problem.final.check.kind === 'none') {
      if (!problem.final.check.reason) err('check-none-reason', 'final.check "none" requires a reason');
    } else if (!problem.final.expr) err('missing-final-expr', `final.check "${problem.final.check.kind}" requires final.expr`);
  }
  if (issues.some((i) => i.level === 'error')) return issues;

  problem.steps.forEach((s, i) => issues.push(...validateStep(problem, s, i)));

  if (problem.final.check.kind !== 'none' && problem.final.expr) {
    issues.push(
      ...numericChecks(
        {
          where: `${problem.id}#final`,
          seed: hashString(problem.id + '#final'),
          variable: problem.variable ?? 'x',
          domain: problem.domain,
        },
        problem.final.check,
        problem.final.expr,
        [],
        [{ label: 'final', latex: problem.final.latex, expr: problem.final.expr }],
      ),
    );
  }
  return issues;
}

export function topicPrefixes(): string[] {
  return TOPICS.map((t) => t.prefix);
}
