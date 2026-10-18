# Flash typist brief — turn an item plan into the TypeScript content file

You are converting a reviewed item plan (qa/plans/<topic>-flash-plan.md) into `content/flash/<topic>.ts` for Calc2Study
(/home/user/Calc2Study). The plan fixes every decision: prompts, options, which option is correct, the mistake tag and the
reason for each distractor, the check. Your job is faithful, careful typing plus the mechanical test loop. You do NOT change
the mathematics, swap the correct answer, invent new distractors or reword options' meaning. When the plan and the tests
disagree, report it; do not "fix" the math.

## Read first
1. /home/user/Calc2Study/CLAUDE.md — content schema, parseable LaTeX subset, mathjs syntax, automated checks.
2. /home/user/Calc2Study/content/types.ts — `FlashItem`, `FlashGenerator`, `Option`, `Check`.
3. /home/user/Calc2Study/content/examples/sample.ts — a validated example of every kind and a generator (copy its shape).
4. The first 120 lines of /home/user/Calc2Study/content/flash/antiderivatives.ts — house style (one item per object, fields
   in the order id, topic, kind, prompt, options, correct, explanation, check, variable?, domain?, difficulty?).
5. The plan file named in your task.

## Plan → TypeScript conventions
- Plan LaTeX is written with SINGLE backslashes; in the .ts strings every backslash must be DOUBLED (`\frac` → `'\\frac'`).
  Inline math in text fields stays `$…$`. A lone backslash fails a test.
- `✓` marks the correct option; `correct` is its 0-based index in the `options` array AS YOU WRITE IT (keep the plan's
  order; the app shuffles at display time).
- Each distractor line is `- <option> | <mistake-tag> | <short reason>`. Expand the short reason into a full sentence `why`
  of at least 15 characters that says what the student did (e.g. "Plugged ∞ into the antiderivative instead of taking a
  limit"). Keep its meaning exactly. The correct option gets NO `mistake` and NO `why`.
- `P:` is the prompt. If it contains a displayed formula, put the formula in `prompt.latex` and the words in `prompt.text`;
  text-only prompts go in `prompt.text` (inline `$…$` allowed).
- Numeric options (the plan says "exprs") get both `latex` and `expr`: latex in the parseable subset (`\frac{1}{2}`,
  `-\frac{\pi}{4}`, `e^{2}`, `\ln 2`, `2\cdot 3^{n-1}`), expr in mathjs (`1/2`, `-pi/4`, `e^2`, `log(2)`, `2*3^(n-1)`).
  Text options (verdicts, statements, set-ups) get `text` only (inline `$…$` for math) and NO expr. Never mix: an item's
  options all have exprs or none do.
- `E:` is the one-line `explanation` (expand to a sentence if it is a fragment).
- `check:` is written in the plan as a compact form; translate literally:
  `limit <term> → <L>` ⇒ `{ kind: 'limit', term: '<term>', limit: '<L>' }` (add `variable: 't'` when the plan says so);
  `series <term> [from k] conv|div [sum S]` ⇒ `{ kind: 'series', term, from?: 'k', converges: true|false, sum?: 'S' }`;
  `improper <integrand> [lo, hi] conv|div [value V] [split c]` ⇒ `{ kind: 'improper-integral', integrand, lower: 'lo',
  upper: 'hi', converges, value?, split?: ['c'] }` (lo/hi may be '-inf'/'inf');
  `identity <lhs>` ⇒ `{ kind: 'identity', lhs }` (set `variable` and `domain` as the plan says);
  `value <expr>` ⇒ `{ kind: 'value', expected }`; `none: <reason>` ⇒ `{ kind: 'none', reason }`.
- `kind:` is the item kind; `var:`/`domain:` set `variable` and `domain` (e.g. `domain: { n: [1, 6] }`).
- Generators: the plan gives the parameter table and the option formulas; write `generate(seed)` as a pure function of
  `seed` (`const p = TABLE[(seed - 1) % TABLE.length]`), build latex/expr strings from the parameters with small helpers
  (a fraction formatter for latex like `\frac{3}{2}` vs `-\frac{1}{2}` vs integers), id `` `${gen.id}:${seed}` ``,
  and a `describe` string. Every instance must pass the checks for seeds 1..20 (the tests run them).
- Ids: `<prefix>-f-001` … in plan order; generator ids as given.

## Checks (run after writing; fix only mechanical problems; budget ~30 fixing tool calls)
```
npx tsc -p tsconfig.json --noEmit
npx vitest run tests/content.test.ts -t "<topic id>"
npx vitest run tests/content-volume.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts tests/medoid.test.ts
npx tsx scripts/medoid-scan.ts <topic id> --verbose
```
Mechanical problems you fix: escaping, LaTeX outside the subset on an expr option, mathjs syntax, latex↔expr typos (the
plan's value is the truth), `why` length, `+ C` consistency, a missing `domain`. Problems you REPORT (with the exact test
message) and leave: `answer-incorrect`, `distractor-not-distinct`, `*-claim*` failures, medoid hits (list ids + credits),
anything where the plan seems internally inconsistent. Use the Edit tool for changes; never shell heredocs.

## Report (final message)
Counts (static items, generators), the test summaries, the medoid rates (both measures) and every hit id, every remaining
failure verbatim, and a list of plan lines you could not translate literally and what you did instead.
