# Step-Through brief — shared part (read fully before the topic file)

You are a `content-author` for Calc2Study. You write the Step-Through ("what's next?") problems for ONE topic in ONE
file. You never review your own work; a separate `math-verifier` re-derives every step afterwards.

## Read first (in this order)
1. /home/user/Calc2Study/CLAUDE.md — project contract: the Step-Through mode description, the "Spec for topics 10–14"
   block (SOURCE OF TRUTH for your topic; no lecture PDFs), the distractor rules incl. the decoy-hub rule (rule 6) and the
   convergence-question rule (rule 7).
2. /home/user/Calc2Study/content/types.ts — `StepProblem`, `Step`, `Option`, `Check` (incl. the claim kinds
   `improper-integral`, `limit`, `series`).
3. /home/user/Calc2Study/content/mistakes.ts — tags; yours are `pf-`, `im-`, `sq-`, `sb-`, `st-` plus the general ones. Do not
   edit this file.
4. /home/user/Calc2Study/content/examples/sample.ts — a validated step problem; and the first problem of
   /home/user/Calc2Study/content/steps/antiderivatives.ts for house style.
5. /home/user/Calc2Study/content/flash/<your topic>.ts — the Flash items already written for your topic: re-use their
   notation and do not duplicate their questions; your problems are multi-step workings.
6. /home/user/Calc2Study/checker/claims.ts (doc comments) and /home/user/Calc2Study/scripts/medoid-scan.ts (header).
7. /home/user/Calc2Study/tests/content.test.ts and tests/content-volume.test.ts — the rules, as code.

## Your file
`content/steps/<topic>.ts` (named in the topic file). It currently exports an empty array; keep exactly:
```ts
import type { StepProblem } from '../types';
export const steps: StepProblem[] = [ … ];
```
Touch nothing else. Write with the Write/Edit tools, never via a shell heredoc.

## Volume and shape
≥ 8 problems with BOTH difficulty levels present (tests/content-volume.test.ts); aim for 9–10 (about half difficulty 1,
half difficulty 2). Each problem: 3–7 steps that follow the professor's procedure order from the spec exactly (e.g.
partial fractions: proper? → divide → factor → form → coefficients → integrate; improper integrals: type → limit
set-up (split if needed) → FTC inside the limit → evaluate the limit → conclude; series: divergence test first → …).
Each step: `prompt` (what's next?), ≥ 5 options (one correct, four+ distractors each tagged with a mistake and a `why`),
`explanation` (one line), `result` (the new state after this step: latex and/or text — this is shown whether the student
was right or wrong), and a `check` where the step's answer is checkable (`none` with a reason otherwise). The problem
ends with `final: { latex, expr?, check, recap }`; `recap` is 1–3 sentences of the whole path.

## Schema (content/types.ts is authoritative)
```ts
StepProblem { id: '<prefix>-s-01' …, topic, title, difficulty: 1 | 2, statement: { text?, latex? },
              steps: Step[3..7], final: { latex, expr?, check, recap }, variable?, domain?, tags? }
Step        { prompt, options[≥5], correct, explanation, result?: { latex?, text? }, check?, variable?, domain? }
```
Checks per step, same conventions as Flash: options with exprs are checked numerically against the step's check
(`antiderivative` for an integrated term — all options "+ C"; `identity` for a rewrite/decomposition/closed form;
`value` for a number; `limit` for a limit; `series`/`improper-integral` with a target for a sum/value); text-only options
(setup choices, test choices, verdicts) → claim check without a target, or `none` with a reason. Option LaTeX that comes
with an expr must be in the parseable subset (see CLAUDE.md); `\lim`, `\to`, `\infty`, `\sum`, `\int` with bounds,
`\text{}` go in text-only options, `result`, `explanation`, `recap`. mathjs: `C` is the integration constant (0) — never
name a coefficient `C` in an expr. A final answer that is a verdict ("diverges") has no `expr`.

## Distractor rules and the decoy hub
Same as Flash (CLAUDE.md rules 1–7): one realistic mistake per distractor, tagged, with a `why`; same form; distinct;
no all/none; the correct option carries no tag; a correct verdict with an invalid reason is a distractor. Build every
step's option set around a DECOY HUB (a wrong next move that the others, and the correct one, are single-feature
mutations of). `tests/medoid.test.ts` requires ≤ 30% per topic over flash + steps under both measures:
`npx tsx scripts/medoid-scan.ts <topic> --verbose` (the flash items are already in; your steps must not push the topic
over). Prompts and options short enough for a 390 px phone (option ≤ ~70 characters of text or a one-line formula).

## Checks to run (all must pass before you report)
```
npx tsc -p tsconfig.json --noEmit
npx vitest run tests/content.test.ts -t "<topic id>"
npx vitest run tests/content-volume.test.ts tests/medoid.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts
npx tsx scripts/medoid-scan.ts <topic id> --verbose
```
Never edit a test or the checker; fix the content. Other authors are writing other topics in parallel in their own files.

## Report back (final message)
Problem list (id, title, difficulty, number of steps, which spec procedure it follows), check-kind breakdown, medoid rates
for the topic (both measures), anything you are unsure about, any tag you wished existed.
