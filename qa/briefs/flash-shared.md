# Flash Drill brief — shared part (read fully before the topic file)

You are a `content-author` for Calc2Study (phone-first, offline micro-learning PWA for MAC 2312 Calculus II, UCF).
You write the Flash Drill content for ONE topic in ONE file. You never review your own work: a separate
`math-verifier` re-derives every answer and attacks every distractor afterwards; a failing numeric test or a
guessable item comes back to you as rework, so get it right the first time.

## Read first (in this order)
1. /home/user/Calc2Study/CLAUDE.md — project contract (schema summary, rules, commands).
2. /home/user/Calc2Study/content/types.ts — `FlashItem`, `FlashGenerator`, `Option`, `Check` (note the claim check kinds
   `improper-integral`, `limit`, `series` added for topics 10–14; their doc comments say exactly what is checked).
3. /home/user/Calc2Study/content/mistakes.ts — the mistake taxonomy. Your topic's tags are at the bottom (prefixes `pf-`, `im-`,
   `sq-`, `sb-`, `st-`); the general tags (`sign-error`, `arithmetic-error`, `algebra-error`, `ln-misapplied`, `abs-dropped`,
   `power-rule-int-exponent`, `du-constant-wrong`, `bounds-swapped`, `ftc-order-swapped`, `technique-wrong`, `formula-swapped`,
   `formula-missing-factor`, `formula-wrong-sign`, `inverse-trig-value-wrong`, …) are also available. You must NOT edit this file;
   if no tag fits, pick the closest and say so in your report.
4. /home/user/Calc2Study/content/examples/sample.ts — a validated example of every item kind and a generator.
5. The first ~120 lines of /home/user/Calc2Study/content/flash/antiderivatives.ts — house style.
6. /home/user/Calc2Study/checker/claims.ts (header + the three `*Check` doc comments) and
   /home/user/Calc2Study/scripts/medoid-scan.ts (header) — what the numeric and answer-blind checks do.
7. /home/user/Calc2Study/tests/content.test.ts and tests/content-volume.test.ts — the rules, as code.

## Your file
`content/flash/<topic>.ts` (the topic file names it). It currently exports empty arrays; keep exactly:
```ts
import type { FlashGenerator, FlashItem } from '../types';
export const flash: FlashItem[] = [ … ];
export const generators: FlashGenerator[] = [ … ];
```
Touch nothing else (not mistakes.ts, not tests, not checker, not other topics). Write with the Write/Edit tools, never via
a shell heredoc (backslashes get mangled).

## Volume
≥ 40 flash items counting each generator as 5, with ≥ 30 static items (tests/content-volume.test.ts). Aim for 34–40 static
items plus 2–3 generators. Spread over the whole topic spec; every bullet of the spec should be exercised by at least one item.

## Item schema (content/types.ts is authoritative)
```ts
FlashItem {
  id: '<prefix>-f-001' …  (three digits, sequential, unique)
  topic: '<topic id>'
  kind: 'derivative' | 'antiderivative' | 'evaluate' | 'formula' | 'technique' | 'concept'
  prompt: { text?: string; latex?: string }   // text may contain inline math $…$; keep ≤ ~160 characters
  options: Option[]   // ≥ 5; Option { latex?, text?, expr?, mistake?, why? }
  correct: number     // index into options (the app shuffles; never reference letters/positions in text)
  explanation: string // one line: why the correct answer is correct (may use $…$)
  variable?: string   // default 'x'; set 'n' when option exprs are in n
  domain?: [lo, hi] | { n: [lo, hi] }   // sampling domain for numeric checks (default [0.25, 1.25] per variable)
  check: Check
  difficulty?: 1 | 2
  tags?: string[]
}
```
Kinds and what the checker does:
- `antiderivative`: prompt.latex = the bare integrand; every option has latex + expr, ALL ending in "+ C"; check
  `{ kind: 'antiderivative', integrand }`. The checker differentiates the correct expr and compares with the integrand, checks
  each distractor differs (via its derivative, so "differs by a constant" is caught), and parses the LaTeX of every option to
  make sure it agrees with its expr. Use this for "integrate this partial-fraction term / this decomposed integrand".
- `derivative`: same shape with `{ kind: 'derivative', of }`.
- `evaluate`: prompt.latex = a full definite integral with FINITE bounds and no singularity; options = values with exprs;
  check `{ kind: 'definite-integral', integrand, lower, upper }`. (Not for improper integrals.)
- `formula` / `technique` / `concept`: free-form prompt. Options either ALL have exprs or NONE do (test `expr-all-or-none`).
  With exprs: the check gives the reference —
    `{ kind: 'identity', lhs }` (options are expressions in the variable; correct must equal lhs at random points — use this
    for "which decomposition form / closed form / rewrite is right"), `{ kind: 'value', expected }` (constants),
    `{ kind: 'limit', term, variable?, limit }` (options are constants; the correct one must equal `limit`),
    `{ kind: 'series', term, from?, converges: true, sum }` (options constants = the sum),
    `{ kind: 'improper-integral', integrand, lower, upper, converges: true, value, split? }` (options constants = the value).
  Without exprs (text/latex-only options): the item is a VERDICT item; the check still validates the claim itself
  (`limit` with 'infinity' | '-infinity' | 'dne', `series`/`improper-integral` with `converges: false` or without a sum/value),
  or `{ kind: 'none', reason }` for purely conceptual items. The verifier checks the options by hand, so keep verdict items
  unambiguous.
- Option LaTeX that comes with an expr must stay inside the parseable subset: numbers, \frac{}{}, \pi, e^{…}, single-letter
  variables, + − \cdot /, ^{}, implicit multiplication, \sqrt{}, \sqrt[3]{}, ( ) [ ] \left \right, |…|, \ln, \ln|…|, \sin … \csc,
  \arcsin … \arctan, \sin^{-1}, \operatorname{arcsec}, top-level `name = expr`, lists `A = …,\quad B = …` (→ vector).
  NOT parseable: \frac{d}{dx}, \Big|_a^b, \text{}, subscripts (A_1), \to, \lim, \sum, \int with bounds, \infty, inequalities,
  \cdots, \begin{…}. Those may appear only in text-only options, prompts, explanations and `why`.
- mathjs expr syntax: `log(x)` natural log (`ln` alias), `sqrt`, `abs`, `exp`, `pi`, `e`, `arctan`/`arcsin`/`arccos`, `^`,
  explicit `*` for products (`A/a*log(abs(a*x+b)) + C`), constant `C` evaluates to 0, `nthRoot(x, 3)`. For vectors of
  coefficients use `[1, -2, -2]` with latex `A = 1,\quad B = -2,\quad C = -2` — but note `C` is the constant 0 in mathjs, so
  NAME COEFFICIENTS A, B, D (or write the result as a decomposition and use an identity check) whenever an expr would contain C.
- Symbolic constants in an antiderivative/identity item (A, a, b, k …) are sampled in [0.25, 1.25] unless `domain` says
  otherwise; set `domain` to avoid poles (e.g. `domain: [1.5, 3]` for (x−1) in a denominator) or to keep roots real.

## Generators
`FlashGenerator { id: '<prefix>-g-<name>', topic, kind, describe, generate(seed): FlashItem }`. `generate` must be a pure
function of `seed` (use `seed % k` style selection from small parameter tables), return an item with
`id: \`${gen.id}:${seed}\``, and be valid for seeds 1..20 (every instance is run through the full checks). Keep the decoy-hub
pattern inside the generator. Two or three generators per topic is plenty.

## Distractor rules (verifier-enforced; the mechanical parts are test-enforced)
1. Every distractor encodes ONE specific, realistic student mistake, tagged with `mistake` and explained in `why`
   (≥ 10 characters; say what the student did, e.g. "Dropped the 1/a from the u-substitution").
2. All options share the same form: notation, length, "+ C", absolute values, level of simplification. No odd one out.
3. Every option is mathematically distinct from the correct answer (numeric test). Avoid two distractors that coincide.
4. No "all/none/both of the above". Never reference option letters or positions.
5. The correct option carries no `mistake`/`why`.
6. Convergence / verdict questions: the options must include believable wrong conclusions, and a CORRECT verdict with an
   INVALID justification counts as WRONG (make it a distractor with the matching tag, e.g. `sb-divergence-test-converse`,
   `st-comparison-wrong-direction`, `st-wrong-inference`). The correct option states the verdict AND a valid reason.

## The decoy-hub rule (answer-blind guessability) — build it in from the start
The app's answer-blind "medoid" scan (`npx tsx scripts/medoid-scan.ts <topic> --verbose`) guesses the option that is most
similar to all the others (by edit distance and by character bigrams) and counts how often that is the correct answer.
`tests/medoid.test.ts` requires ≤ 30% per topic under BOTH measures. Naively built items fail this: if every distractor is
"the right answer with one thing changed", the right answer is the hub. Instead:
- Pick one DISTRACTOR as the hub H (the most common wrong answer). Build the other distractors as single-feature mutations
  of H, and the correct answer as a single-feature mutation of H too — so the answer is a leaf like the others.
- Keep every option the same length and shape; never let the correct answer be the only option with (or without) a feature
  (|…|, a 1/k factor, a minus sign, "+ C", a second term).
- For text/verdict options: give every option the same sentence skeleton ("Converges to …", "Diverges because …"); do not
  make the correct one longer, more hedged, or more precise.
- Run the scan after every ~10 items and fix hits as you go. Report the final rates.

## Checks to run (all must pass before you report)
```
npx tsc -p tsconfig.json --noEmit
npx vitest run tests/content.test.ts -t "<topic id>"
npx vitest run tests/content-volume.test.ts tests/medoid.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts
npx tsx scripts/medoid-scan.ts <topic id> --verbose
npx tsx scripts/content-stats.ts
```
Never edit a test or the checker to make content pass; fix the content. Other authors are writing other topics in parallel in
their own files; a failure naming another topic is not yours.

## Report back (final message)
Counts (static items, generators, by kind), check-kind breakdown (how many `none` and why), medoid rates (both measures),
any item you are unsure about (math, notation, scope), and any mistake tag you wished existed.
