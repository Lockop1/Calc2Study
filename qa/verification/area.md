VERDICT: FAIL (44 blocking issues)

Topic `area` (prefix `ar`). Verifier: math-verifier (not the author). Files: `content/flash/area.ts` (45 flash items, 1 generator) and `content/steps/area.ts` (12 problems, 52 steps). Blind seed: 16. Lecture source: Lecture 2, §2.1.

**The math is sound.** I re-derived all of the following and found no errors:
- all 45 flash items
- the generator over all 20 seeds (k ∈ {3, 5, 6, 7, 8, 9})
- every step, every `result` line and every `final`
- every number quoted in a `why` or `explanation`

No stored answer is wrong. Every check expression describes its region as stated. No distractor is also correct, and nothing is outside Exam 1 scope.

**All 44 blocking issues are FORM_LEAK.** Given only the options, the key can be picked without the math:
- 28 units were guessable in the blind test.
- 15 more units have a strong tell I found by inspection.
- 1 SYSTEMIC entry: the one-mistake-per-distractor star pattern makes the key the option closest to all the others (the hub). This entry covers 34 further units.

In total, 77 of 98 units are affected.

To keep the test blind, I did it before opening either content file.

## Automated checks
- `npx vitest run tests/content.test.ts -t "area"`: **59 passed** (45 flash + generator + 12 step problems + the aggregation guard).
- `npx vitest run tests/content-volume.test.ts -t "area"`: **2 passed**.
- Independent check (mpmath, not the project checker). I recomputed every region's area without using any stored setup, as ∫|f − g| over the region. That is 36 regions: every "which integral" item, every evaluate item and every step problem. All 36 match the stored values to 1e-12.
- Roots of sin x = 2x/π: −π/2, 0 and π/2 (see ar-f-025 / ar-f-035 below).
- Answer-blind heuristics (they use the key only for scoring), on JSON produced by `…/scratchpad/ar-verify/dump.ts`:
  - Medoid (the option with the smallest total normalized edit distance to the others; same script `…/scratchpad/ad/heur.py` as the antiderivatives verifier): unique key hits **62/98 (63%)**, against **19%** chance.
  - Longest option: **15/98**.
  - Generator check: `…/scratchpad/ar-verify/gencheck.py`.

## Findings

### Blocking: blind-test guessable units (28)
Each of these was a HIT whose stated reason was a surface feature (see the blind-test table). The general fix is the same everywhere: give each unit a decoy cluster, i.e. a distractor with two mistakes that shares features with other distractors rather than with the key. Then re-run the medoid script.
- ar-f-005 — FORM_LEAK — The key is the longest option (111 characters vs ≤ 86) and the only one that prescribes the remedy ("split at x = 0"). — Blind unit 10. — Fix: drop "; split at $x = 0$" from the key (the explanation already says it), and/or give a distractor an equally specific wrong remedy, e.g. "It is a signed total: $x - x^3 < 0$ on $(0, 1)$, so split at $x = 1$".
- ar-f-010 — FORM_LEAK — Two distractors are the same expression: $-\int_a^b (f - g)\,dx \equiv \int_a^b (g - f)\,dx$. Both can be struck at once, which leaves the textbook formula against $-\int g$ and $\int(|f| + |g|)$. — Blind unit 23: HIT by this elimination. — Fix: replace $-\int_a^b (f(x) - g(x))\,dx$ with $-\int_a^b f(x)\,dx$ (`single-function-area`: area between the upper curve and the axis). It is distinct from every other option and forms a decoy pair with $-\int_a^b g(x)\,dx$.
- ar-f-011 — FORM_LEAK — Star pattern. Limits $[0, 2]$ appear in 4 of 6 options and the integrand $2x - x^2$ in 2; the key is the only option with both. — Blind unit 8. — Fix: e.g. replace $\int_0^2 2x\,dx$ with $\int_0^4 (x^2 - 2x)\,dx$ (y-limit and swapped).
- ar-f-014 — FORM_LEAK — Star pattern: the key is the only option with all the majority features (dx, [0, 1], √x first, minus sign). — Blind unit 11. — Fix: e.g. replace $\int_0^1 \sqrt{x}\,dx$ with $\int_0^1 (\sqrt{y} - \sqrt[3]{y})\,dy$ (wrong inverse and left − right; value −1/12), which makes the dy options a 3-option cluster.
- ar-f-022 — FORM_LEAK — Star pattern. dy appears in 4 of 6 options, [0, 1] in 4 and $2 - y - y^2$ in 2; the key is the only option with all three. — Blind unit 24. — Fix: e.g. replace $\int_0^2 \sqrt{x}\,dx$ with $\int_0^2 (y^2 + y - 2)\,dy$ (x-extent used as y-limits, and left − right; value 2/3).
- ar-f-023 — FORM_LEAK — Star pattern. $y + 2 - y^2$ appears in 4 of 6 options and $[-1, 2]$ in 2; the key has both. — Blind unit 26. — Fix: e.g. replace $\int_0^2 (y + 2 - y^2)\,dy$ with $\int_{-2}^{1} (y^2 - y - 2)\,dy$ (sign-flipped roots and left − right; value −3/2).
- ar-f-024 — FORM_LEAK — Star pattern. $[-2, 2]$ appears in 3 of 6 options and $4 - x^2$ in 3; the key has both. — Blind unit 21. — Fix: e.g. replace $\int_0^4 (4 - x^2)\,dx$ with $\int_0^2 (x^2 - 4)\,dx$ (half the region and bottom − top). The per-feature vote then ties.
- ar-f-025 — FORM_LEAK — Star pattern. $[0, \pi/2]$ appears in 4 of 5 options and $\sin x - \frac{2x}{\pi}$ in 2; the key has both. — Blind unit 5. — Fix: e.g. replace $\int_0^{\pi/2}\sin x\,dx$ with $\int_0^1 \left(\frac{2x}{\pi} - \sin x\right)dx$ (y-limit and swapped).
- ar-f-026 — FORM_LEAK — Two problems:
  - Star pattern: $[-1, 2]$ appears in 4 of 5 options and $x + 2 - x^2$ in 3.
  - Equivalent pair: $\int_{-1}^{2} (x^2 - x - 2)\,dx \equiv -\int_{-1}^{2} (x + 2 - x^2)\,dx$, so both can be struck at once.
  - Blind unit 4.
  - Fix: keep one of the pair, and replace the other with a decoy that has two mistakes, e.g. $\int_{-2}^{2} (x^2 - x - 2)\,dx$ (x-intercept limits and bottom − top; value −8/3).
- ar-f-028 — FORM_LEAK — The key is the only two-integral option and the longest (72 characters vs ≤ 44). — Blind unit 16. — Fix: add a second two-piece option of the same length, e.g. $\int_1^3 (\sqrt{x-1} - x + 3)\,dx + \int_3^5 \sqrt{x-1}\,dx$ (the bottoms are assigned to the wrong pieces; value 22/3; tag `boundary-pieces-swapped` or `top-bottom-swapped`). It can replace $\int_1^5 \sqrt{x-1}\,dx$.
- ar-f-031 — FORM_LEAK — "/12" appears in 3 of 6 values and "5" in 2; 5/12 is the only value with both. — Blind unit 30. — Fix: e.g. replace $\frac{1}{12}$ with $\frac74$ (`power-rule-int-exponent`: $\int x^{1/2}dx$ taken as $x^{1/2}/\tfrac12$, so $2 - \tfrac14$). Then "/4" (5/4, 3/4, 7/4) becomes the majority denominator.
- ar-f-032 — FORM_LEAK — 3 of the 6 values are negative, so "an area is positive" strikes them at once. Among what is left, "2 ln 2" appears in 4 of 6 and "−1" in 2, which points to 2 ln 2 − 1. — Blind unit 6. — Fix: e.g. replace $2\ln 2 - 3$ with $\ln 2$ (evaluated $e^{\ln 2}$ as $\ln 2$ and dropped $F(0) = -1$). The "ln 2" and "2 ln 2" families are then 3/3, and the vote ties.
- ar-f-034 — FORM_LEAK — √2 appears in 5 of 6 values and "− 1" in 3; √2 − 1 is the simplest value with both. — Blind unit 29. — Fix: add a decoy pair so that the per-feature majority points to a wrong value, e.g. two values that share a wrong antiderivative.
- ar-f-035 — FORM_LEAK — 3 of the 5 values are negative. Of the two left, 1 − π/4 has the majority form ("π/4" appears in 4 of 5). — Blind unit 19. — Fix: at most one negative distractor, and add positive slips that share features with each other.
- ar-f-039 — FORM_LEAK — Confirms the author's own concern. "In y" appears in 4 of 6 options, "0 ≤ y ≤ 2" in 3, and "from x = y² + 1 to x = y + 3" in 2; the key has all three. — Blind unit 17. — Fix: e.g. replace the $x = \sqrt{y-1}$ option with "In $y$: from $x = y + 3$ to $x = y^2 + 1$, for $1 \le y \le 5$" (swapped and x-limits). The wrong order and the wrong limits then each appear twice.
- ar-f-041 — FORM_LEAK — The key is the longest option (109 characters) and the only one with a hedge ("at x = 0 they only touch"). It is also the per-feature majority: "One integral" appears in 3 of 5, $\int_{-1}^{1}$ in 2 and $x^2 - x^4$ in 2. — Blind unit 1. — Fix: move the hedge into the explanation, and add a decoy that shares "∫₀¹" or "two integrals" features with the other distractors.
- ar-f-042 — FORM_LEAK — Every distractor is one edit away from $x = -2, 3$ (sign flip, one root only, the y-values, the factor-equals-6 slip), so the key is the hub. — Blind unit 7. — Fix: add a pair built around a wrong centre, so that "3" and "−2" are not the majority values.
- ar-s-03#1 — FORM_LEAK — Every distractor changes one coordinate of the key pair: $x = y + 1$ appears in 4 of 5 and $\frac{y^2}{2} - 3$ in 2. — Blind unit 35. — Fix: e.g. use the options $(y^2 - 3,\ y + 1)$, $(y^2 - 3,\ y - 1)$, $(\frac{y^2}{2} + 3,\ y - 1)$ and $(\frac{y^2}{2} - 6,\ y - 1)$. Then the per-coordinate vote picks $y - 1$ and $y^2 - 3$, both wrong.
- ar-s-03#2 — FORM_LEAK — $(-2, 4)$ is the hub: its mirror $(-4, 2)$ loses the tie because of $(0, 4)$, and $(-1, 5)$ are the key's own x-values. — Blind unit 14 (surface majority alone was enough). — Fix: add a decoy pair around $(-4, 2)$, e.g. its x-values $(-3, 3)$, in place of $(0, 4)$.
- ar-s-03#3 — FORM_LEAK — The key is the only option with a worked test ("Test $y = 0$: …") and the longest (109 characters vs 84). — Blind unit 9. — Fix: strip the test from the key (it is already in the explanation), or give two distractors equally concrete wrong tests, e.g. a test point outside $(-2, 4)$.
- ar-s-05#0 — FORM_LEAK — "0" appears in 3 of 5 options and "1" in 3; $(0, 1)$ is the only pair with both. — Blind unit 25. — Fix: e.g. replace "$x = 1$" with "$x = -2,\ x = 0$" (dropped the −x² and flipped the sign). The per-value vote then ties between the key and $(-1, 0)$.
- ar-s-06#0 — FORM_LEAK — The key is the longest (89 characters vs 66). It shares "√x on top" with one distractor and the "At x = …" form with another, so it is the hub. — Blind unit 33. — Fix: shorten the key, and add a third "At x = t" option with an inside point and a slip, e.g. "At $x = \tfrac12$: $x^2 = 1 > \tfrac{\sqrt2}{2}$, so $y = x^2$ is on top" (`arithmetic-error`).
- ar-s-07#1 — FORM_LEAK — $[0, 1]$ appears in 4 of 5 options and $e^x - x$ in 2; the key has both. — Blind unit 13. — Fix: e.g. replace $\int_0^1 e^x\,dx$ with $\int_1^{e} (x - e^x)\,dx$ (y-values as limits and bottom − top).
- ar-s-07#2 — FORM_LEAK — $e^x$ appears in 4 of 5 options, $\frac{x^2}{2}$ in 3 and the minus sign in 4; the key has all three. — Blind unit 12. — Fix: e.g. replace $e^x - 1$ with $\frac{e^{x+1}}{x+1} - x^2$ (two slips), so that a second cluster forms.
- ar-s-07#3 — FORM_LEAK — "e −" appears in 4 of 5 values and "3/2" in 2. Also, the key is the only value whose negative ($\frac32 - e$) is listed (± twin). — Blind unit 18. — Fix: add a decoy twin (e.g. $\frac12 - e$ next to $e - \frac12$), or replace $\frac32 - e$ with a positive slip.
- ar-s-11#0 — FORM_LEAK — $\frac{y^2}{2}$ appears in 3 of 5 options and "−3" in 2; the key has both. — Blind unit 31. — Fix: e.g. use $x = y^2 - 6$ (did not halve at all) in place of $x = \sqrt{2y + 6}$, and $x = y^2 + 3$ in place of $x = \frac{y^2}{2} + 3$. Coefficient 1 then becomes the majority.
- ar-s-11#1 — FORM_LEAK — Symmetric ± pairs appear in 3 of 5 options and √6 in 2; $\pm\sqrt6$ is the only option with both. — Blind unit 3. — Fix: e.g. replace "$y = -6,\ y = 6$" with "$y = 0,\ y = 6$" (dropped the negative root and the square root). The hub then moves to a wrong option.
- ar-s-12#0 — FORM_LEAK — $x = \frac{y}{2}$ appears in 3 of 5 options and $x = \sqrt{y}$ in 2; the key has both. — Blind unit 34. — Fix: e.g. replace $(-\sqrt{y},\ \frac{y}{2})$ with $(-\sqrt{y},\ 2y)$, so that $2y$ becomes the majority second coordinate.

### Blocking: strong tells found by inspection (15 units, not in the blind sample)
- ar-f-006 — FORM_LEAK — The key is the longest (111 characters vs ≤ 75) and the only option with a test-point justification ("at $x = 0$ the line (2) is above the parabola (0)"). The medoid heuristic also picks it. — Fix: shorten the key, or give two distractors comparable clauses.
- ar-f-007 — FORM_LEAK — The key is the longest (134 characters vs ≤ 92) and the only hedged statement; every distractor uses an absolute ("Whenever", "Only when", "always"). — Fix: balance lengths and qualifiers, e.g. one hedged but wrong distractor.
- ar-f-009 — FORM_LEAK — The key is the longest (122 characters vs ≤ 96) and the only one with a precise qualifier ("strictly between"). A distractor uses the absolute "stays on top across every intersection point". — Fix: balance lengths and qualifiers.
- ar-f-038 — FORM_LEAK — Confirms the author's concern. The key has every majority feature: "In x" appears in 5 of 6 options, "one integral" in 4, "from y = x² − 2x up to y = x" in 2 and "0 ≤ x ≤ 3" in 2. The medoid also picks it. — Fix: add a decoy cluster, e.g. two "In y" plans or two plans with $0 \le x \le 2$.
- ar-s-02#1 — FORM_LEAK — The key is 1.8× the length of the next option (140 characters vs 76) and the only one with numeric test values. — Fix: move the test values into `result`/explanation, or give two distractors test values of their own (wrong points or wrong values).
- ar-s-08#1 — FORM_LEAK — Same tell: 202 characters vs 103, and the only option with test values. — Fix: same as ar-s-02#1.
- ar-s-10#0 — FORM_LEAK — Every distractor is a proper subset of the key $\{-1, 0, 1\}$ ("the most complete answer"), and the key is the longest (1.7×). — Fix: include at least one wrong option that is not a subset of the key.
- ar-s-10#1 — FORM_LEAK — The key is 2.4× the length of the next option (124 characters vs 52) and the only one with test values. — Fix: same as ar-s-02#1.
- ar-s-11#2 — FORM_LEAK — The key is 1.5× the length of the next option (94 characters vs 63) and the only one with a test, "(at $y = 0$: $0 > -3$)". — Fix: same as ar-s-02#1.
- ar-s-12#1 — FORM_LEAK — The key is the only option with a test, "(at $y = 1$: $1 > \tfrac12$)", and it is the per-feature majority: "$0 \le y \le 4$" appears in 4 of 5 options and "right $\sqrt{y}$, left $\frac{y}{2}$" in 3. — Fix: drop the parenthetical, and add a decoy such as "$0 \le y \le 2$; right $x = \frac{y}{2}$, left $x = \sqrt{y}$".
- ar-s-01#3 — FORM_LEAK — ± twin: $\frac{32}{3}$ is the only value whose negative ($-\frac{32}{3}$) is listed. — Fix: add a decoy twin, or replace $-\frac{32}{3}$ with a positive slip. ar-f-033 is the model: its ±16/3 pair is a decoy, not the key.
- ar-s-05#3 — FORM_LEAK — ± twin: $\frac13$ and $-\frac13$ are listed, and no other value has its negative. — Fix: same as ar-s-01#3.
- ar-s-06#3 — FORM_LEAK — ± twin: $\frac13$ and $-\frac13$. — Fix: same as ar-s-01#3.
- ar-s-08#3 — FORM_LEAK — ± twin: $2\sqrt2 - 2$ and $2 - 2\sqrt2$. — Fix: same as ar-s-01#3.
- ar-g-line-parabola-eval — FORM_LEAK — Two tells hold in **20/20 seeds**:
  - The key k³/6 is the only positive value whose negative (−k³/6, `ftc-order-swapped`) is listed.
  - The key is always the smallest positive option: k³/6 < (3k³ − 2k²)/6 < 2k³/3 < 5k³/6 for k ≥ 2.
  - The medoid also picks it in 16/20 seeds.
  - Fix: replace −k³/6 with a positive single-curve value, k³/2 (∫kx dx) or k³/3 (∫x² dx), both `single-function-area`. Also make one distractor smaller than k³/6.

### Blocking: SYSTEMIC hub (star) pattern
- SYSTEMIC — FORM_LEAK — Almost every distractor is exactly one mistake away from the key, so the key is the per-feature majority, i.e. the centre of the star.
  - Evidence: the answer-blind medoid heuristic picks the key uniquely in **62/98 units (63%)**, against 19% chance. This matches the 61% the antiderivatives verifier measured.
  - Units hit and not listed above (34):
    - Flash: ar-f-001 002 003 004 008 012 013 015 016 017 020 021 029 030 040 043 044 045.
    - Steps: ar-s-01#0 #1 #2; ar-s-02#3; ar-s-03#4; ar-s-04#2; ar-s-05#1 #2; ar-s-06#1 #2; ar-s-08#0; ar-s-09#0 #1 #2; ar-s-11#3; ar-s-12#2.
  - Fix pattern: in each unit, add at least one decoy cluster, i.e. distractors with two mistakes that share features with each other rather than with the key (wrong limits + swapped integrand; the wrong inverse on both curves). Balance signs in the evaluate units. Target ≲ 30% unique medoid hits for the topic.
  - This is probably shared across authors, so the orchestrator may prefer a project-wide policy.

### Non-blocking
- WRONG_TAG — the new tags fit better in these places:
  - ar-f-003, option "The area of the whole region between the two curves": `formula-swapped` → `integrand-vs-integral`.
  - Retag to `split-at-wrong-point`: each of these options splits at a vertex or an x-intercept:
    - ar-f-006, "split at $x = 0$, where $y = x^2$ touches the $x$-axis" (was `signed-area-confusion`)
    - ar-f-038, "two integrals … vertex $x = 1$" (was `top-bottom-swapped`)
    - ar-f-038, "two integrals … crosses the $x$-axis at $x = 2$" (was `signed-area-confusion`)
    - ar-f-040, "Split at $x = 1$, the vertex" (was `missing-intersection`)
    - ar-f-044, "$(-\sqrt3, 0)$ … since the cubic changes sign at $\pm\sqrt3$" (was `signed-area-confusion`)
    - ar-s-03#0, "$y$, but it needs two integrals split at $y = 0$, the vertex" (was `technique-wrong`)
    - ar-s-03#3, "$R(y) = y + 1$ on $(0, 4)$, but … on $(-2, 0)$" (was `top-bottom-swapped`)
    - ar-s-04#1, "The line on $(-1, 0)$ and the parabola on $(0, 2)$" (was `top-bottom-swapped`)
    - ar-s-11#2, "Right: $x = 0$ for $y > 0$, but the parabola for $y < 0$" (was `top-bottom-swapped`)
  - Retag from `top-bottom-swapped` to `test-point-outside-interval`; each whys already says the point is outside the interval:
    - ar-f-009, "Evaluate both functions at $x = a$" ($x = a$ is not strictly between the crossings)
    - ar-s-01#1 ($x = 5$), ar-s-04#1 ($x = 3$), ar-s-05#1 ($x = 2$) and ar-s-06#0 ($x = 2$)
  - ar-s-08#0, option "$\tan x = 1$ gives $x = \frac{\pi}{3}$": `arithmetic-error` → `inverse-trig-value-wrong`.
- ar-f-025 — MINOR — Giving the crossing points is legitimate:
  - sin x = 2x/π is transcendental, so students cannot solve it algebraically.
  - Both points check by substitution, and "between these points" restricts the region correctly.
  - However, the curves also meet at $x = -\pi/2$ (roots confirmed numerically), so "meet at $x = 0$ and $x = \frac{\pi}{2}$" reads as a complete list when it is not.
  - Suggest: "On $[0, \frac{\pi}{2}]$ the curves meet only at $x = 0$ and $x = \frac{\pi}{2}$."
- ar-f-035 — EXPLANATION — "This integral is the area between $y = \sin x$ and $y = \frac{2x}{\pi}$" is loose. The two curves enclose two congruent regions, with total area $2 - \frac{\pi}{2}$, and the integral is the area of the one on $[0, \frac{\pi}{2}]$. Add "for $0 \le x \le \frac{\pi}{2}$".
- ar-f-008 — MINOR — The key says the inner solutions "are split points". A touching point need not be one: $x = 0$ for $x^2$ and $x^4$ is not, as ar-f-041 itself teaches. Suggest "are possible split points; test each subinterval".
- ar-f-018, ar-s-08#2, ar-s-10#2 — MINOR — The "split in the right place but same top on both pieces" distractor is, by additivity, the same integral as the unsplit distractor (ar-s-10#2: its negative; both are 0). So both can be struck at once. This is pedagogically fine but costs an effective option; consider changing one of them.
- ar-g-line-parabola-eval — MINOR — `k = K[seed % 6]`, so seeds 1–20 produce only 6 distinct items, and the key's pre-shuffle slot is tied to k. This is harmless: the display shuffles, and the volume test counts a generator as 5.

### Author's special-attention items
- Tags in ar-f-003, ar-f-009, and the split-at-vertex / split-at-x-intercept cases: see WRONG_TAG above.
- ar-f-025 (given crossing points): legitimate, with one wording fix (see MINOR).
- ar-f-038 / ar-f-039 majority vote: the leak is real in both (FORM_LEAK above).

## Blind-option test
- Sample: 35 of 98 units (36%), seed 16: 18 flash items and 17 steps (no generator instance).
- I made the guesses before reading either content file. Artifacts: `qa/blind/area-16.sample.md`, `qa/blind/area-16.guesses.json`, `qa/blind/area-16.key.json`.
- **Hits: 33/35 (94%)**, against a chance level of ≈ 6.6/35 (19%).

| # | item | guess | correct | hit | reason |
|---|------|-------|---------|-----|--------|
| 1 | ar-f-041 | 4 | 4 | HIT | SURFACE: majority vote (shares 'one integral' with 1,5, bounds [-1,1] with 5, integrand x^2-x^4 with 1) and it is the longest, most qualified option ('they only touch'); math agrees: x^2-x^4 = x^2(1-x^2) >= 0 on [-1,1] |
| 2 | ar-s-09#1 | 2 | 2 | HIT | MATH: options 2 and 4 are mirror images (surface cannot split them); bottom must be 2/x/, which is -2x on [-1,0] and 2x on [0,3] |
| 3 | ar-s-11#1 | 5 | 5 | HIT | SURFACE: majority vote, +/- symmetric pair (2,3,5) combined with sqrt6 (4,5); every other option is a one-feature mutation of +/-sqrt6 |
| 4 | ar-f-026 | 2 | 2 | HIT | SURFACE: majority vote, integrand x+2-x^2 in 3 of 5 options and bounds [-1,2] in 4 of 5; math agrees (x^2 = x+2 at -1,2, line on top) |
| 5 | ar-f-025 | 5 | 5 | HIT | SURFACE: majority vote, bounds [0,pi/2] in 4 of 5 and integrand sin x - 2x/pi in 2; option 5 is the only one with both; math agrees (sin x is concave, above the chord 2x/pi) |
| 6 | ar-f-032 | 3 | 3 | HIT | SURFACE: discard the negative values (ln2-1, 2ln2-3, 2ln2-2), then majority vote: '2ln2' in 4 of 6 options and '-1' in 2 |
| 7 | ar-f-042 | 3 | 3 | HIT | SURFACE: majority vote, shares '3' with option 2 and the (neg,pos) pattern with its mirror (-3,2); (4,9) looks like squares of (2,3) i.e. y-values |
| 8 | ar-f-011 | 5 | 5 | HIT | SURFACE: majority vote, bounds [0,2] in 4 options and integrand 2x - x^2 in 2 (3,5); math agrees (2x >= x^2 on [0,2]) |
| 9 | ar-s-03#3 | 3 | 3 | HIT | SURFACE: the only option that shows a worked test-point computation, and it is the majority pair R = y+1, L = y^2/2 - 3; math agrees (y = 0: line x = 1, parabola x = -3) |
| 10 | ar-f-005 | 3 | 3 | HIT | SURFACE: longest, most qualified option and the only one that mentions splitting; math agrees (x - x^3 < 0 on (-1,0), the signed integral cancels) |
| 11 | ar-f-014 | 2 | 2 | HIT | SURFACE: majority vote (dx, [0,1], sqrt x first, minus sign, x^3 all shared with the others); math agrees (sqrt x >= x^3 on [0,1]) |
| 12 | ar-s-07#2 | 5 | 5 | HIT | SURFACE: majority vote, e^x in 4, x^2/2 in 3, minus sign in 4; option 5 has all three |
| 13 | ar-s-07#1 | 1 | 1 | HIT | SURFACE: majority vote, bounds [0,1] in 4 of 5 and integrand e^x - x in 2; option 1 has both |
| 14 | ar-s-03#2 | 3 | 3 | HIT | MATH+SURFACE: (-1,-2) and (5,4) lie on y = x - 1 and on y^2 = 2x + 6, so y = -2, 4 (the x-values -1,5 appear as a distractor); (-2,4) is also the majority pick over its mirror (-4,2) |
| 15 | ar-s-12#3 | 5 | 4 |  | SURFACE (weak): discard -8/3 and 0 (area must be positive); -8/3 = 4/3 - 4 hints at pieces 4/3 and 4, so the area 16/3; low confidence |
| 16 | ar-f-028 | 2 | 2 | HIT | SURFACE: longest option and the only split one; math agrees: the three dy options are wrong (swapped / bounds 1..5 / +4 slip) and the split dx setup equals 10/3 = int_0^2 (y+2-y^2) dy |
| 17 | ar-f-039 | 1 | 1 | HIT | SURFACE: majority vote, 'In y' in 4, '0 <= y <= 2' in 3, 'from x = y^2+1 to x = y+3' in 2; option 1 has all |
| 18 | ar-s-07#3 | 2 | 2 | HIT | SURFACE: majority vote, 'e -' in 4 of 5 and '3/2' in 2; math agrees with int_0^1 (e^x - x) dx = e - 3/2 |
| 19 | ar-f-035 | 4 | 4 | HIT | SURFACE: discard the negatives (1 - pi/2, -1 - pi/4, -pi/4), then majority vote: 'pi/4' in 4, '1 -' in 2 |
| 20 | ar-s-03#5 | 3 | 3 | HIT | MATH: 40/3 = F(4) and 26/3 = F(4) + F(-2) for F = y^2/2 + 4y - y^3/6 (Example 2.4), so the area is F(4) - F(-2) = 18; no surface majority here |
| 21 | ar-f-024 | 4 | 4 | HIT | SURFACE: majority vote, bounds [-2,2] in 3 options and integrand 4 - x^2 in 3; option 4 has both |
| 22 | ar-s-02#3 | 4 | 4 | HIT | MATH: 11/6 and 7/6 each appear with their negatives (surface tie); 10/3 = [x^3/3 - 3x^2] from -1 to 0 (forgot the /2), a mutation of the 11/6 piece, so 11/6 |
| 23 | ar-f-010 | 1 | 1 | HIT | MATH/LOGIC: options 3 and 4 are identical in value (int(g-f) = -int(f-g)) so neither can be the unique key; option 1 is the definition A = int (f-g) dx with f >= g |
| 24 | ar-f-022 | 4 | 4 | HIT | SURFACE: majority vote, dy in 4, bounds [0,1] in 4, integrand 2 - y - y^2 in 2; option 4 has all |
| 25 | ar-s-05#0 | 1 | 1 | HIT | SURFACE: majority vote, '0' in 3 options and '1' in 3; option 1 = (0,1) has both |
| 26 | ar-f-023 | 1 | 1 | HIT | SURFACE: majority vote, integrand y+2-y^2 in 4 of 6 and bounds [-1,2] in 2; option 1 has both |
| 27 | ar-f-027 | 5 | 5 | HIT | MATH: options 2 and 5 are mirror images; with y = /x/ the bottom is -x on [-1,0], so 2 - x^2 - /x/ = 2 - x^2 + x there |
| 28 | ar-s-03#0 | 3 | 3 | HIT | MATH: a parabola opening sideways plus a line is one integral in y (right = line, left = parabola) and needs a split in x; options 2/3 are mirrors so surface does not decide |
| 29 | ar-f-034 | 1 | 1 | HIT | SURFACE: majority vote, sqrt2 in 5 of 6, '- 1' in 3; option 1 is the simplest combination |
| 30 | ar-f-031 | 2 | 2 | HIT | SURFACE: majority vote, '/12' in 3 options and '5' in 2; 5/12 has both; also 11/12 and 5/12 = 2/3 +/- 1/4 look like a sum/difference pair |
| 31 | ar-s-11#0 | 2 | 2 | HIT | SURFACE+MATH: majority (y^2/2 in 3, -3 in 2); solving y^2 = 2x + 6 gives x = y^2/2 - 3 |
| 32 | ar-s-02#0 | 1 | 3 |  | SURFACE: majority vote, '0' in 3 and '3' in 4; the distractors read as mutations of (0,3): one root only, sign flip, (-1,3) = roots of x^2-2x-3 |
| 33 | ar-s-06#0 | 1 | 1 | HIT | SURFACE+MATH: majority (shares 'sqrt x on top' with 4 and 'test point' with 5); the test point 1/4 lies in (0,1) where the curves are between intersections |
| 34 | ar-s-12#0 | 3 | 3 | HIT | SURFACE: majority vote, x = y/2 in 3 and x = sqrt y in 2; option 3 has both |
| 35 | ar-s-03#1 | 3 | 3 | HIT | SURFACE: majority vote, x = y + 1 in 4 and y^2/2 - 3 in 2; option 3 has both |

How I classified the results:
- **Guessable (28).** HIT, and a surface cue alone was enough. That includes the mixed "MATH+SURFACE" units 14, 31 and 33, and unit 23, which falls to eliminating the equivalent pair:
  - Flash: ar-f-005, ar-f-010, ar-f-011, ar-f-014, ar-f-022, ar-f-023, ar-f-024, ar-f-025, ar-f-026, ar-f-028, ar-f-031, ar-f-032, ar-f-034, ar-f-035, ar-f-039, ar-f-041, ar-f-042.
  - Steps: ar-s-03#1, ar-s-03#2, ar-s-03#3, ar-s-05#0, ar-s-06#0, ar-s-07#1, ar-s-07#2, ar-s-07#3, ar-s-11#0, ar-s-11#1, ar-s-12#0.
- **HIT by math (5):** ar-s-09#1, ar-s-03#5, ar-s-02#3, ar-f-027, ar-s-03#0. These are not guessable. The mirror-image pairs and the decoy twins in ar-s-02#3 are the design to copy.
- **Misses (2):** ar-s-12#3, ar-s-02#0. Majority vote pointed to a distractor, which is good design.

## Certified
I re-derived every id below and found it mathematically correct: key, check expression, result lines, final, and the numbers in the whys and explanations. The FORM_LEAK units need a rewrite and then a re-check of the rewritten options.
- Flash: ar-f-001, ar-f-002, ar-f-003, ar-f-004, ar-f-005, ar-f-006, ar-f-007, ar-f-008, ar-f-009, ar-f-010, ar-f-011, ar-f-012, ar-f-013, ar-f-014, ar-f-015, ar-f-016, ar-f-017, ar-f-018, ar-f-019, ar-f-020, ar-f-021, ar-f-022, ar-f-023, ar-f-024, ar-f-025, ar-f-026, ar-f-027, ar-f-028, ar-f-029, ar-f-030, ar-f-031, ar-f-032, ar-f-033, ar-f-034, ar-f-035, ar-f-036, ar-f-037, ar-f-038, ar-f-039, ar-f-040, ar-f-041, ar-f-042, ar-f-043, ar-f-044, ar-f-045.
- Generator: ar-g-line-parabola-eval (seeds 1–20; key k³/6, and all five distractor formulas checked for every k).
- Steps: ar-s-01 (#0–#3 + final), ar-s-02 (#0–#4 + final), ar-s-03 (#0–#5 + final), ar-s-04 (#0–#3 + final), ar-s-05 (#0–#3 + final), ar-s-06 (#0–#3 + final), ar-s-07 (#0–#3 + final), ar-s-08 (#0–#3 + final), ar-s-09 (#0–#3 + final), ar-s-10 (#0–#3 + final), ar-s-11 (#0–#4 + final), ar-s-12 (#0–#3 + final).

## Uncertain
None. I agree with every stored answer.
