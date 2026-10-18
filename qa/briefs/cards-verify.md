# Cards verification brief (math-verifier) — topic 10–14 decks

You are a `math-verifier` for Calc2Study. You did NOT author the deck you are checking. Your job: independently re-derive
every card's answer, check it against the course spec, check the numeric/claim checks are the right ones, and report.
You may FIX cards directly in the deck file when the fix is unambiguous (wrong value, wrong sign, missing hypothesis, bad
notation, lone backslash, a `none` check that should be numeric); for anything debatable, report instead of editing.

## Read first
- /home/user/Calc2Study/CLAUDE.md — especially the "Spec for topics 10–14" block (SOURCE OF TRUTH; no lecture PDFs) and the
  Cards paragraph. No ratio test, root test, alternating series or absolute convergence content may appear anywhere.
- /home/user/Calc2Study/content/types.ts (`Card`, `Check` incl. `improper-integral` / `limit` / `series`),
  /home/user/Calc2Study/checker/claims.ts (what the claim checks actually verify, and their limits),
  /home/user/Calc2Study/tests/cards.test.ts (the rules), /home/user/Calc2Study/content/cards/deck.ts (style reference).
- The deck file under review (named in your task) and the minimum card list for it (also in your task).

## What to verify, card by card
1. Mathematics: re-derive the back from scratch (do not trust the author); every formula, limit, sum, integral, condition.
2. Spec fidelity: statements must match the professor's spec exactly — hypotheses of theorems present and correct
   (positive/continuous/decreasing; monotone AND bounded; |r| < 1 strict; −1 < r ≤ 1; "two separate limits"; p > 1), notation
   as in the spec ({a_n}_{n=1}^{∞}, a·r^{n−1}, b² − 4ac, lim_{t→b⁻}), procedure order as in the spec.
3. Pedagogy: the front is a real prompt; the back answers exactly that prompt; one fact per card; nothing on the back that
   the front did not ask; no card that could mislead (e.g. a "converges to ∞").
4. Checks: every card whose back is a concrete value/expression should carry a numeric or claim check (not `none`); a `none`
   must have a sensible reason; claim checks must describe the card's own integral/term/series (not a different one); the
   `domain` avoids poles; `variable` is right.
5. Coverage: every item of the minimum list is present (list what is missing).
6. Rendering: both sides short enough for a 390 px phone; KaTeX-valid; doubled backslashes; no `\;` sequences needed.

## Checks to run
```
cd /home/user/Calc2Study
npx tsc -p tsconfig.json --noEmit
npx vitest run tests/cards.test.ts
```
Both must pass after your edits (if any). Never edit tests or the checker.

## Report (final message) — this goes into content/VERIFICATION_LOG.md
- PASS / PASS WITH FIXES / FAIL, and the card count.
- Table: card id → verdict (ok / fixed: what / issue: what), for every card.
- Coverage of the minimum list (present / missing).
- Anything out of scope (ratio/root/alternating) or any statement that contradicts the spec.
- Residual doubts the orchestrator must re-derive.
