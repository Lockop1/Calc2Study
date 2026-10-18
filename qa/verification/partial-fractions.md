# Verification report — partial-fractions (topic 10) — PARTIAL

**PARTIAL: stopped early at the coordinator's request.** I made no edits to any content file. The only file I wrote is the blind-test input `qa/blind/partial-fractions-31.guesses.json`.

**VERDICT: FAIL (0 WRONG_ANSWER).**
- Flash (`content/flash/partial-fractions.ts`, 35 items + 3 generators): **FAIL**. Every answer is right, but there are FORM_LEAKs: 3 units are strongly guessable from the options alone (blind test) and 7 more are guessable by inspection.
- Steps (`content/steps/partial-fractions.ts`, 9 problems, 36 steps): **FAIL**. Every answer is right, but:
  - 3 distractors are also correct (DISTRACTOR_ALSO_CORRECT);
  - 3 steps each contain two distractors that are the same function;
  - several `why` texts are false;
  - tags are misused in a systematic way.

## Checked so far
- **By hand: every correct answer, step `result` and final** — all 35 flash items, all 36 steps and all 9 finals. No wrong answer, wrong check or scope problem found. Every distractor except those listed below is genuinely wrong. No ratio, root or alternating-series content appears anywhere.
- **Generators:** I checked the formulas, the row tables (gcd and a ≥ 2 conditions hold) and all distractor formulas. I only instantiated `pf-g-power-term` seeds 1–2 by hand. The test suite checks seeds 1–20 numerically.
- **`npx vitest run tests/content.test.ts -t "partial-fractions"`:** 48/48 pass.
- **Medoid scan:** edit 12.2%, bigram 16.8% (both ≤ 30%).
- **Blind test, seed 31:** 26 of 74 units (35%), 15 hits against a chance level of about 5.2.
  - 7 hits came from doing the math from the options. Those are not leaks.
  - 8 hits came from surface features:
    - strong: **pf-f-008** (per-feature majority), **pf-f-016** (the answer is the hub), **pf-f-021** (per-coordinate majority);
    - moderate: **pf-s-08#1** (the u+1 / u−1 twin), **pf-f-030** (± twin plus majority);
    - weak 50/50 tie-breaks: pf-f-033, pf-f-025, pf-f-009.
  - Caveat: I had already read both files before taking the test. To limit that bias, every guess followed an explicit surface heuristic, and the reason is recorded in the guesses file.

## Issues found (none fixed)

### DISTRACTOR_ALSO_CORRECT
1. **pf-s-03#3, "x = tan θ for the whole term".** This method works: the term becomes ∫(2 tan θ + 2) dθ = 2 ln|sec θ| + 2θ = ln(x²+1) + 2 arctan x + C.
2. **pf-s-04#0, "Substitute u = x² + 1 directly".** This works: x³ dx = (u − 1) du/2, which gives x²/2 − ½ ln(x²+1) + C. Its `why` ("x³ dx is not a multiple of du = 2x dx without first dividing") is false.
3. **pf-s-04#2, "x = tan θ".** This works: ∫tan θ dθ = ln|sec θ| = ½ ln(x²+1) + C. The option "x = tan θ, then u = x" is arguably valid too.
   - Fix A: change the prompt to "most direct way" and retag to `trig-sub-when-usub`.
   - Fix B: replace the options with claims that are actually false, e.g. "x = tan θ: it becomes an arctan".

### FORM_LEAK — two distractors equal as functions (both can be eliminated)
4. **pf-s-01#3:** ½ln|x−1| + ½ln|x+1| ≡ ½ln|x²−1|. This was already in the plan. Suggested replacement: ln|x−1| − ln|x+1| (`pf-coefficient-wrong`).
5. **pf-s-06#3:** ln|x| + ln|x+2| ≡ ln|x²+2x|. The hub rewrite created this. Suggested replacement: ln|x| − ln|x+2|.
6. **pf-s-09#2:** −ln|x−1| − ln|x| ≡ −ln|x²−x|. This was in the plan. Suggested replacement: ln|x−1| + ln|x| (A's sign lost).

### EXPLANATION
7. **pf-s-02#0, (Ax+B)/((x−1)(x+2)).** The `why` says it "cannot represent the fraction". That is false: A = 5, B = −3 gives the fraction itself. The tag `pf-constant-over-quadratic` is also wrong; it should be `pf-not-fully-factored`.
8. **pf-s-03#2, [C, B] = [−2, 0].** The `why` ("x coefficients give C − B = 0, so B = C") actually gives B = −2. The slip that produces B = 0 is reading −1 = A + B as +1 = A + B. This error came from the plan.
9. **pf-s-09#2, −ln|x−1| − ln|x|.** The `why` says "+ln|x|", but the option has −ln|x|. The only slip is the sign of B.
10. **pf-s-09#3, ln(1/2).** "With the wrong sign" contradicts the option, which equals F(2).
11. **pf-s-01#2, [−1/2, −1/2].** The two-slip story does not produce this option; only A's sign differs from the answer.
12. **pf-s-01#0, correct option "deg 1 < deg 2".** The numerator 1 has degree 0 (the explanation correctly says 0 < 2).
13. **pf-s-05#2, `\ln|x+1|^{2}`.** The `expr` is (ln|x+1|)², but the display and the `why` both mean ln((x+1)²). Fix to `\ln\left((x+1)^{2}\right)` with `log((x+1)^2)`.
14. **MINOR whys:**
    - pf-f-021, 1/x + x/(x²+4): the story is forced.
    - pf-s-06#2, [1, 1]: "guessed the split".
    - pf-s-09#1, [1, −1]: the `why` explains only A.

### WRONG_TAG (systematic)
15. **Long division on a proper fraction tagged `pf-improper-not-divided`.** That tag describes the opposite slip. Affected: pf-s-01#0, pf-s-02#0, pf-s-06#0, pf-s-08#0, pf-s-09#0. Retag to `technique-wrong`, as pf-f-003 already does.
16. **Power rule applied to first-power factors tagged `pf-power-term-as-ln`.** That tag is the reverse slip. Affected: pf-s-01#3, pf-s-02#3, pf-s-09#2. Retag to `ln-misapplied`, whose description covers "integrated 1/x by the power rule".
17. **Completing the square when it isn't needed, tagged `pf-square-not-completed`.** Affected: pf-s-03#3, pf-s-06#0. Retag to `technique-wrong`.
18. **`pf-missing-repeated-power` used for squaring a factor that isn't repeated, or for adding an extra term.** Affected: pf-s-01#1, pf-s-06#1, pf-s-09#0, and pf-s-02#0 (the extra C/(x²+x−2) term should be `pf-not-fully-factored`).
19. **Two more single retags:**
    - pf-s-04#2 "Power rule: (x²/2)/(x³/3+x)" → `product-rule-integral`;
    - pf-s-06#3 "2ln|x| + ½ln|x+2|" → `coefficient-mishandled` (`pf-missing-1-over-a` means a factor was dropped, but this option adds one).
20. **MINOR:**
    - `pf-linear-over-repeated-linear` is used on factors that aren't repeated: pf-f-012, pf-f-018, pf-s-01#1, pf-s-02#0, pf-s-06#1. It is the closest tag available.
    - The "Bx" numerator options in pf-f-012 and pf-f-018 are tagged `pf-constant-over-quadratic`.

### FORM_LEAK found by inspection (not sampled; each guessable by per-coordinate majority or as the unique hub)
- pf-f-015, pf-f-019 (class example), pf-f-022, pf-f-023, pf-f-028, pf-f-031, pf-s-03#2.
- Single-measure medoid hits I am treating as residual: pf-f-024, pf-s-05#0, pf-s-07#2, pf-s-08#3, pf-s-09#3.
- I drafted decoy-hub rewrites but applied none. Examples:
  - pf-f-008: make (x+1)²+5 the hub, with (x+2)²+5, (x−1)²+5 and (x+1)²+6 around it.
  - pf-f-021: make 1/x + (x+4)/(x²+4) the hub, with 4/x + (4−2x)/(x²+4) and 1/x + 4/(x²+4).
  - pf-f-016: make A/(x−1)+B/(x+1) the hub, with (Ax+B)/(x²−1) and (Ax+B)/(x−1)+(Cx+D)/(x+1).
  - pf-s-08#1: replace (u−1)/(u²+4) with (u+3)/(u²+4), i.e. x = u + 1 solved the wrong way.

## Residual doubts for the orchestrator
- **(Ax+B)/(x+1)²-style distractors** (pf-f-011, pf-f-014, pf-f-017, pf-s-05#0) cover the same functions as the standard form. They are wrong only under the course's form convention, which the taxonomy treats as a mistake. I recommend accepting them, but it should be a recorded decision.

## Items with no issue found (my hand derivation)
- **Flash, correct answer and distractors:** pf-f-001–007, 010–014, 017, 018, 020, 024, 026, 027, 029, 032, 034, 035.
- **Flash, correct answer only** (leak or minor issue listed above): pf-f-008, 009, 015, 016, 019, 021, 022, 023, 025, 028, 030, 031, 033.
- **Steps, correct options and finals:** all 9 problems.
- **Steps with no issue at all:** pf-s-02#1, #2; pf-s-03#0, #1, #4; pf-s-04#1, #3; pf-s-05#0, #1; pf-s-07#0–#3; pf-s-08#2, #3.

## Not done
- No sympy or mpmath cross-check (my derivations are by hand only).
- Generator seeds 3–5 were not instantiated by hand.
- I did not run tsc, content-volume, medoid.test, no-lone-backslash or katex-render. No content was edited, so the existing results stand.
- No fixes and no rewrites were applied. All of the above go to the author or orchestrator.
