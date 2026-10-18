# Verification report: topic 11, improper (`im`) — PARTIAL

**VERDICT: NONE (PARTIAL, stopped early by the coordinator). This is NOT a pass.** Neither content
file has been verified, so neither may merge on the basis of this report.

## Done so far
- Read the brief (qa/briefs/topic-verify.md), CLAUDE.md spec, content/types.ts, content/mistakes.ts,
  checker/claims.ts, VERIFICATION_LOG.md, and the medoid-scan / blind-sample / blind-score scripts.
- Blind-option sample generated BEFORE reading either content file: `npx tsx scripts/blind-sample.ts improper 47`
  gave 25 of 71 units (35%). I filled in my guesses and reasons in
  `/home/user/Calc2Study/qa/blind/improper-47.guesses.json`. **They are not scored yet.** I did not run
  blind-score.ts and did not open the key.
- Notes from the option lists alone (sample unit numbers, not item ids; the key maps them to ids):
  - Star-centre tell: the correct option looks like the hub, with the other options as ×2, ÷2, sign,
    swap or dropped-term edits of it. Units 2, 8, 12, 20, 24, 25 (and maybe 6). Units 8 and 24 I
    guessed from this pattern alone.
  - Length or justification tell: the correct-looking option is the only full or longest one, or the
    only one with a "how-to" clause. Units 1, 19, 22, and more mildly 9 ("both must converge").
  - Could not work out the question from the options: units 5, 7, 16, 18. These were pure surface
    guesses.
  - Answer clear from the math: units 3, 4, 6, 10, 11, 13, 14, 15, 17, 21, 23.

## Fixes made
None. I did not edit any content file.

## Issues found
No mathematical findings, because the content files were not read. The blind-test notes above are
unscored candidates only.

## Still to check (everything substantive)
- `content/flash/improper.ts`: all 35 static items and both generators (seeds 1..5). For each: the
  answer re-derived, every distractor, tag and why (including the compound distractors), form parity,
  check and domain.
- `content/steps/improper.ts`: all 9 problems. For each: step order (type → limit → FTC → evaluate →
  conclude), every step result, check, final, expr and recap.
- Scope sweep (no ratio, root or alternating series, and no absolute convergence).
- Medoid scan: `npx tsx scripts/medoid-scan.ts improper --verbose`.
- Score the blind test: `npx tsx scripts/blind-score.ts qa/blind/improper-47.guesses.json`.
- Automated tests: `npx tsc -p tsconfig.json --noEmit`; `npx vitest run tests/content.test.ts -t "improper"`;
  `npx vitest run tests/content-volume.test.ts tests/medoid.test.ts tests/no-lone-backslash.test.ts tests/katex-render.test.ts`.

## Certified items
None.
