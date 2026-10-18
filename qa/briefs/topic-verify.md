# Topic verification brief (math-verifier) — Flash + Steps for one of topics 10–14

You are a `math-verifier` for Calc2Study. You did NOT author the files you are checking (they were designed from item
plans and typed by other agents). Verify BOTH files of your topic: `content/flash/<topic>.ts` and
`content/steps/<topic>.ts`. Fix unambiguous errors directly (Edit tool only, never shell heredocs); report debatable
points instead of editing. Never edit tests or the checker; never loosen a rule.

## Read first
- /home/user/Calc2Study/CLAUDE.md — the "Spec for topics 10–14" block is the SOURCE OF TRUTH (no lecture PDFs); the
  distractor rules 1–7 (decoy hub, convergence questions); the content schema and the parseable LaTeX subset.
- content/types.ts, content/mistakes.ts, checker/claims.ts (what the claim checks do and do NOT catch),
  scripts/medoid-scan.ts (header), content/VERIFICATION_LOG.md ("star pattern" policy: compound-mistake distractors are
  the accepted decoy-hub mechanism; a `why` may name two slips).
- The two content files; the item plans in qa/plans/<topic>-flash-plan.md and qa/plans/<topic>-steps-plan.md are the
  design intent (useful to spot typing slips), but the FILES are what ships.

## What to verify
1. Mathematics: re-derive every correct answer from scratch — every limit, sum, integral, decomposition, verdict —
   under the spec's exact statements (comparison directions, the three limit-comparison cases, |r| < 1, p > 1, two
   separate limits, approach from inside the interval, the integral's value ≠ the sum). The claim checks are necessary
   conditions only; YOUR derivation is the real check for every verdict.
2. Every distractor is wrong (not an alternative correct form, not correct under a different reading, not a correct
   verdict with a valid reason). Compound distractors (two slips) are allowed only when both slips are realistic and
   the `why` names them.
3. Tags and `why` describe the distractor; form parity (notation, length, "+ C", |…|); no answer leak.
4. Steps: the step order follows the spec's procedure; each `result` is the true state after that step; each step's
   check describes that step; the final answer, expr and recap are right; 3–7 steps per problem.
5. Scope: nothing beyond the spec; NO ratio test, root test, alternating series or absolute convergence anywhere.
6. Checks: every numeric answer carries a check describing its own integral/term/series; `domain`/`variable` right;
   `none` only with a sensible reason.

## Answer-blind tests (both required; report the numbers)
- Medoid: `npx tsx scripts/medoid-scan.ts <topic> --verbose` — both rates must stay ≤ 30% after your edits.
- Blind-option test: `npx tsx scripts/blind-sample.ts <topic> <seed>` (seed = any integer), guess each sampled unit from
  its options alone, fill in the .guesses.json it writes, score with `npx tsx scripts/blind-score.ts qa/blind/<topic>-<seed>.guesses.json`,
  report the rate, and rewrite (around a decoy hub) any unit you could guess for a structural reason.

## Checks to run (all must pass after your edits)
```
cd /home/user/Calc2Study
npx tsc -p tsconfig.json --noEmit
npx vitest run tests/content.test.ts -t "<topic id>"
npx vitest run tests/content-volume.test.ts tests/medoid.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts
```

## Report — write it to /home/user/Calc2Study/qa/verification/<topic>.md (Write tool) AND return it as your final message
PASS / PASS WITH FIXES / FAIL for each file with counts; a table of every item / step id → verdict (ok / fixed: what /
issue: what); the medoid rates; the blind-option result (sample size, guessed, rate, which units and why); scope
findings; residual doubts the orchestrator must re-derive; tag misuse patterns.
