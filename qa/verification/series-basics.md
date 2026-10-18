# series-basics verification — PARTIAL (stopped on coordinator request)

VERDICT: FAIL (16 blocking issues, partial run). No WRONG_ANSWER: every stored correct answer is right.

- **Verifier:** math-verifier (did not author either file).
- **Files:** `content/flash/series-basics.ts` (35 static items, 2 generators) and `content/steps/series-basics.ts` (9 problems, 27 steps).
- **Edits made:** NONE. Every fix below is still to be applied.
- **Not done:** `tsc`; the vitest suites (content, volume, medoid, no-lone-backslash, katex); `medoid-scan.ts`; the blind-option test (no sample was drawn); a KaTeX render check.

## What was checked (by hand, from scratch)
- **All 35 flash items:** I re-derived each correct answer and confirmed its check describes it. Every one is correct.
- **sb-g-geometric-sum, all 8 rows.** Correct value a·r^s/(1−r), with the 4 distractors in brackets:
  - (3, 1/2, 1) = 3 [6, 1, 3/4, −3]
  - (2, 1/3, 2) = 1/3 [3, 1/6, 4/27, −1/3]
  - (5, −1/2, 1) = −5/3 [10/3, −5, −15/4, 5/3]
  - (4, 2/3, 2) = 16/3 [12, 16/15, 16/27, −16/3]
  - (1, 1/4, 1) = 1/3 [4/3, 1/5, 3/16, −1/3]
  - (6, −1/3, 2) = 1/2 [9/2, 1, 8/9, −1/2]
  - (2, 3/4, 1) = 6 [8, 6/7, 3/8, −6]
  - (9, 1/3, 2) = 3/2 [27/2, 3/4, 2/3, −3/2]

  All correct, and the distractors in each row are distinct.
- **sb-g-telescoping, p = 1..8:** Σ1/((n+p)(n+p+1)) = 1/(p+1). The distractors 1, 1/(p+2), 1/((p+1)(p+2)) and 0 are all wrong and all distinct.
- **All 9 step problems:** every correct option, `result`, check, final and recap is correct.
  - The step order follows the spec: identify a, r → |r| test → a/(1−r); divergence test first; decompose → Sₙ = b₁ − bₙ₊₁ → limit; difference rule.
  - sb-s-02 and sb-s-08 have 3 steps where the plan had 2. The added steps are correct.
- **Verdicts:**
  - Diverge: Σn/(n+1), Σ(−1)ⁿ, Σcos(1/n), Σ(1+1/n)ⁿ, Σ(3/2)ⁿ, Σln(n/(n+1)) (Sₙ = −ln(n+1) → −∞), Σ(1/2ⁿ + 1/n) (difference rule).
  - Insufficient information: divergent + divergent.
- **Sums:** 6, 3/2, 2, 5/12, −2/5, 2/3, −9/19, 1, 1, 3/2, 1/2, 3/4, 7, 2, 5. All correct.

## Blocking issues

### `why` text that does not produce its option (the distractor is wrong, but the stated slip gives a different value)
| Unit | Option | Problem | Fix |
|---|---|---|---|
| sb-f-002 | 2 | "Inverted the ratio": lim (n+1)/n = 1, not 2, and no realistic slip gives 2 | Replace the distractor, e.g. 2/3 = S₂, tag `sq-term-vs-limit` |
| sb-f-004 | 1 | "Differenced only the constants" gives −1 − (−1) = 0; the tag `sb-sum-is-term-limit` does not fit | Replace with 2 ("subtracted exponents: 2⁵ − 2⁴ = 2^{5−4}", `algebra-error`), or why "reported a₁ = S₁ = 1" |
| sb-f-012 | 1/6 | a(1−r) with a = 1/3 is (1/3)(2/3) = 2/9 | Change the option to 2/9 |
| sb-s-02#2 | 1/6 | Same slip; it gives 2/9 | Change the option to 2/9 |
| sb-f-016 | 1/9 | "a = 1/3, then halved it" gives 1/6. In fact 1/9 = (1/3)(1 − 2/3) | Why: "used a = 1/3 and multiplied by 1 − r" |
| sb-f-016 | 2 | "a = 2/3, the n = 0 term": the n = 0 term is 2⁰/3¹ = 1/3. In fact 2 = Σ(2/3)ⁿ | Why: "dropped the 1/3 from 3^{n+1} = 3·3ⁿ" |
| sb-f-019 | 9 | "First term taken as 9" gives 9/(9/10) = 10. In fact 9 = (9/10)/(1/10) | Why: "divided by r instead of 1 − r" |
| sb-f-019 | 1/9 | "Inverted r": with r = 10 you get (9/10)/(−9) = −1/10. In fact 1/9 = Σ1/10ⁿ | Why: "dropped the 9, a = 1/10", tag `sb-wrong-first-term` |
| sb-f-020 | 2(3ⁿ−1), 2(3ⁿ+1), 2(3ⁿ⁻¹−1) | "Forgot to divide by 1 − r = −2": with the spec form a(1−rⁿ)/(1−r) that slip leaves 2(1−3ⁿ) = −2(3ⁿ−1). The options match forgetting r − 1 = 2 in a(rⁿ−1)/(r−1) | Rewrite all three whys around r − 1 = 2 |
| sb-f-024 | 2 | "b₁ + limit = 1 + 1": in fact b₁ + lim bₙ = 1 + 0 = 1 | Why: "counted b₁ twice (Sₙ = 2 − 1/n)", as in sb-f-025 |
| sb-f-030 | 4 | "Applied the 2 to both sums" gives 6 + 2 = 8. In fact 4 = 3 − (−1) | Why: "dropped the factor 2", tag `coefficient-mishandled` |
| sb-f-034 | 1 | "Both pieces as if from n = 0" gives 3·2 − 2·(3/2) = 3 | Change the option to 3, or change the why |
| sb-f-034 | 2/3 | "First term of the combined series": it is 3/2 − 2/3 = 5/6 | Change the option to 5/6 |

### DISTRACTOR_ALSO_CORRECT
- **sb-f-021, option "$a r^{n-1} \to 0$".** With a ≠ 0, a·r^{n−1} → 0 holds exactly when |r| < 1, which is exactly when the series converges. So the statement is TRUE; its own `why` says so ("for geometric series it happens to coincide"). It must be replaced. Suggestion: "$-1 < r \le 1$", which is the convergence condition for the sequence {rⁿ}; tag it `sb-sequence-vs-series` (the series diverges at r = 1).

### Implausible distractors (the rule: a compound slip is only allowed when both slips are realistic)
- **sb-s-01#1:** "No: $a = 3 > 1$ fails the condition $r > 1$" contradicts itself. Suggest "No: $a = 3 > 1$ fails the condition $|a| < 1$", parallel to sb-s-02#1.
- **sb-s-09#0:** two options are unrealistic.
  - "Converges to $2$, the limit of the terms": lim 1/2ⁿ = 0.
  - "Converges to $2$ by the divergence test": that test never gives convergence.

  Rewrite both inside the "Converges to 2" hub.

## Non-blocking
- **Generic or slightly inaccurate whys (EXPLANATION):**
  - sb-f-011 `12` says "doubled the correct result". Better: the n = 0 term 3·(1/2)⁻¹ = 6 used as a, giving 6/(1/2) = 12.
  - sb-f-013 `1`: better "divided by r".
  - sb-f-014 `5/4`: better "divided by r = 1/4".
  - sb-f-024 `3/2`: better "two leading terms kept, as if the gap were 2".
  - sb-f-026 `2` and sb-f-029 `1/4` are "arithmetic slip"; 1/4 is actually (1/2)(1/2).
  - sb-f-003 `2/n`: the variable piece of Sₙ is −2/n, so the sign in the why is off.
  - sb-f-025 `1/(n+1)`: the surviving term is −1/(n+1).
- **WRONG_TAG suggestions:**
  - sb-f-001 "aₙ decreases to 0": `sq-monotone-implies-convergent` → `sb-divergence-test-converse`. The current feedback ("monotone AND bounded is needed") misleads, because aₙ ↓ 0 is both.
  - sb-f-002 `1/2` → `sq-term-vs-limit`.
  - sb-f-006 "diverges because aₙ ≠ 0 for every n" → `sq-term-vs-limit`. Debatable: "diverges by the divergence test" → `sb-no-information`.
  - sb-f-007 "terms cancel in pairs" → `sb-no-information`.
  - sb-f-010 "lim aₙ = 0 ⇒ diverges" → `sq-theorem-misattributed`.
  - sb-f-025 and sb-s-05#1 `1/(n+1)` → `sb-telescoping-sum-wrong`.
  - sb-f-028 `1` → `sb-telescoping-sum-wrong`, which is what the generator uses for the same slip.
  - sb-f-032 "Converges to 0" → `sb-no-information`.
  - sb-f-033 "Σ(1/n + 1/n²) = Σ1/n + Σ1/n²" → `sb-split-divergent`, whose description is exactly this.
  - sb-s-04#0, all four "find Sₙ / is it geometric?" options → `st-divergence-test-skipped`.
  - sb-s-06#1 "(1/2)(1 + 1/2)" → `sq-term-vs-limit`.
  - sb-s-07#0 "ln n / ln(n+1)": `ln-misapplied` → `algebra-error`.
- **Suspected FORM_LEAK** (not confirmed, since the blind test was not run):
  - The correct option is the longest, or the only one with a justification clause, in sb-f-001, sb-f-006, sb-f-010, sb-f-033 ("(both converge)") and sb-s-09#2.
  - In sb-g-geometric-sum, every seed contains the ± twin a·r^s/(r−1) = −answer, and the answer is the positive member in 7 of 8 rows.
- **Checks that just restate the answer (MINOR):**
  - sb-f-003: use `(3 - 2/n) - (3 - 2/(n-1))` instead.
  - sb-f-020: use `2*(1 - 3^n)/(1 - 3)`.
  - sb-s-04#1: `value 1` could be a limit check, n/(n+1) → 1.
  - sb-s-07#1 also restates its answer.
- **Scope:** I found no ratio, root, alternating-series or absolute-convergence content. One MINOR point: sb-s-09#1's explanation and why cite "p-series, p = 1", which is a Lecture 12 idea inside topic 13.

## Certified (correct answer and check re-derived)
- All 35 flash items.
- Both generators: geometric-sum rows 1–8; telescoping with p = 1..8.
- All 27 steps and 9 finals of sb-s-01…09.

This covers the mathematics only. Distractor and form findings are as listed above.

## Remaining for the next verifier or the orchestrator
1. Apply the blocking fixes.
2. Run tsc, the vitest suites and `medoid-scan.ts series-basics --verbose` (both rates must stay ≤ 30%).
3. Run the blind-option test with a fresh seed and rewrite any unit guessable from surface features.
4. Decide on the WRONG_TAG and FORM_LEAK suggestions.
