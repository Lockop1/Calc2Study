# Steps typist brief — turn a step-problem plan into `content/steps/<topic>.ts`

Same role and rules as qa/briefs/flash-typist.md (read it first: conventions for LaTeX, exprs, tags, `why`, checks, what
to fix vs report). This file adds the Step-Through specifics. The plan fixes every decision; you type it faithfully and
run the checks. Never change the mathematics or which option is correct.

## Read first
1. qa/briefs/flash-typist.md; CLAUDE.md (Step-Through description, schema, parseable LaTeX subset).
2. content/types.ts (`StepProblem`, `Step`, `Option`, `Check`); content/examples/sample.ts (`sampleSteps` — copy its shape).
3. The first problem of content/steps/antiderivatives.ts for house style.
4. The plan file named in your task.

## Plan → TypeScript
- One `## <id> · difficulty d · title "…"` block per problem; `S:` is the statement (words → `statement.text`, a displayed
  formula → `statement.latex`).
- Each `### step` block: `P:` prompt (inline `$…$` allowed); options as in the flash plan (`*` = correct, `- … | tag |
  reason` = distractor); `E:` explanation; `R:` the `result` shown after the step (`R latex:` → `result.latex`, `R text:`
  → `result.text`; both allowed); `check:` in the flash-plan compact form, or `none: <reason>`, or absent (then omit
  `check`). Options with exprs are checked against the step's check; text options get no exprs. `var:`/`domain:` on a
  step set `variable`/`domain` for that step.
- `FINAL:` gives `final.latex`, optional `final.expr` (required when the check has a numeric target), `final.check`
  (compact form) and `final.recap` (1–3 sentences). A verdict final ("diverges") has no `expr`.
- Ids: `<prefix>-s-01` … exactly as in the plan; `topic` is the topic id.
- Keep each option short (phone screen): a one-line formula or ≤ ~80 characters of text.

## Checks (after writing; fix only mechanical problems; budget ~30 fixing tool calls)
```
npx tsc -p tsconfig.json --noEmit
npx vitest run tests/content.test.ts -t "<topic id>"
npx vitest run tests/content-volume.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts tests/medoid.test.ts
npx tsx scripts/medoid-scan.ts <topic id> --verbose
```
The volume test for steps is OFF for this topic until Phase C closes (`hasStepMinimum: false`), so it will not complain
about steps; the medoid test covers flash + steps together — report the rates and every step-level hit id (`<id>#<n>`).

## Report (final message)
Counts (problems, steps, difficulty split), test summaries, medoid rates and hit ids, remaining failures verbatim, and
plan lines you could not translate literally.
