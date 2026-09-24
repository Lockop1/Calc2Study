VERDICT: FAIL (64 blocking issues)

Verifier: math-verifier (did not author this topic). Files: `content/flash/volumes-shells.ts` (vs-f-001…048 + generator vs-g-axis-radius), `content/steps/volumes-shells.ts` (vs-s-01…10, 45 steps). Lecture source: Lecture 4 (§2.3) + Lecture 3 appendix.

**Summary.** Every stored correct answer, every step `result`, every `final`, and every check expression was re-derived independently and is **mathematically correct**. Each volume was cross-checked by a second method: washers/disks, the cone formula, or numeric quadrature. There are **0 WRONG_ANSWER, 0 WRONG_CHECK, 0 DISTRACTOR_ALSO_CORRECT, 0 SCOPE** findings. The topic fails on **form parity**. The blind-option test scored **31/33 hits (94%) against a chance level of ≈6.2/33 (19%)**. 28 sampled units were guessed correctly for a surface reason. Four systemic option-construction patterns (T1–T4 below) extend the same leak to 36 more unsampled units. 64 of 94 units are affected.

Automated checks (recorded before verification): `npx vitest run tests/content.test.ts -t "volumes-shells"` → 60 passed; `npx vitest run tests/content-volume.test.ts -t "volumes-shells"` → 2 passed. Green, as expected: the leaks are not machine-checkable.

## Findings

### Systemic root causes (fix these patterns; the per-item bullets below point back to them)

- **T1 — swapped radius/height twin.** Every "r = …, h = …" option set contains exactly one distractor that is the correct pair with r and h swapped, and no other mirror pair. The correct option is therefore one of a unique mirror pair. The remaining distractors almost always share the correct h (or r), which breaks the tie. This affects all 18 static r/h units and every generator seed (a scan of seeds 1–20 found the twin in 20/20). In the blind sample, 7/7 of these units were hits. **Fix:** drop the swap distractor from pair items. The swap confusion is already tested by vs-f-005/006/007, and by steps that ask for r and h separately; vs-s-06#1/#2 do this and are not leaky. If a swap is kept, also add the swap of the most attractive distractor, and vary h across the distractors.
- **T2 — convergence ("centre") in setup integrals and antiderivatives.** Each distractor changes exactly one slot of the correct option: 2π→π, r→r², the bounds, the disk formula, the shift sign, or the height. The correct option is then the unique option that matches the per-slot majority, or is adjacent to all the others. In the blind sample, 15/15 such units were hits. **Fix:** make at least two distractors two-slot changes that share a wrong slot value with another distractor (e.g. π together with the wrong bounds; a squared radius together with the shift-sign error). That makes a distractor an equally good hub. After the rewrite, no option should be the unique per-slot-majority match.
- **T3 — half-pair / ×2 bracket in evaluations.** The "lost the factor 2 of 2π" distractor is always exactly half the correct value. In vs-f-044/045/048 there is also a ×2 distractor, and in 044/048 a negation. So the correct value is the unique option whose half also appears, or the middle of a ×2 chain. Applied retroactively, this rule picks the right answer in 5/5 sampled evaluation units, including vs-f-043, which I missed. **Fix:** add a decoy ratio-2 pair among the distractors in each evaluation unit (e.g. the product-rule value and its half), or omit the half distractor in some units. Replace the "compensated twice" π/2 options in vs-f-045/048.
- **T4 — length / qualifier.** The correct option is the longest and most specific: vs-s-09#0 (100 chars vs ≤51), vs-s-04#0 (76 vs ≤42). In vs-s-02#0 it is the only option with a parenthetical "(on the curve)". **Fix:** equalize length and specificity across the options.

### Blocking — guessable in the blind test (HIT + surface reason)

- vs-f-001 — FORM_LEAK (T2) — πrh, 2πr²h and 2rh are one-change mutations of 2πrh; πr²h is two changes away, so 2πrh is the unique hub — add a second hub, e.g. replace `S = 2rh` with `S = \tfrac13\pi r^2 h` (cone confusion, adjacent to πr²h).
- vs-f-002 — FORM_LEAK (T2) — π·x·f, 2π·x²·f, 2π·f², π·f² and the f(a)..f(b) bounds all mutate ∫_a^b 2πx f(x)dx — add two-slot distractors, e.g. `\int_a^b \pi x^2 f(x)\,dx`.
- vs-f-006 — FORM_LEAK (weak) — options 1/2 are the lecture's radius and height definitions; "whatever the axis" marks option 3 as wrong; two radius-type distractors reveal that the stem asks for the radius — drop "whatever the axis"; balance radius-type and height-type distractors.
- vs-f-010 — FORM_LEAK (weak) — the only "no-shift" line offered is x = 0, which reveals a vertical axis; x = ±1 is then a coin flip — offer both x = 0 and y = 0 (e.g. replace the double-error option y = 1 with y = 0).
- vs-f-012 — FORM_LEAK (T1) — twin (x², 3 − x); the other four keep h = x² — see T1.
- vs-f-019 — FORM_LEAK (T1) — twin (√(y−1) − (y−1)², y) — see T1.
- vs-f-026 — FORM_LEAK (weak) — "3" appears in three radii; 3 − x vs x + 3 is a coin flip — add, e.g., `(x - 2)` or `(4 - x)` so the constant is not a majority.
- vs-f-028 — FORM_LEAK (T2) — π, x², reversed order, (…)² and 2π(…)² all mutate 2πx(2x² − x³) — see T2.
- vs-f-032 — FORM_LEAK (weak) — after discarding the two variable-inconsistent options, a coin flip remains — acceptable after the T2 fix; keep the option grid symmetric as in vs-f-031.
- vs-f-044 — FORM_LEAK (T3) — π, 4π, −2π are ÷2, ×2 and negation of 2π — replace 4π or π with a non-ratio slip, e.g. `\pi(1 + \cos 1)`.
- vs-f-045 — FORM_LEAK (T3) — 2π ln 2 and (π/2) ln 2 bracket π ln 2 — replace (π/2) ln 2 with `\frac{\pi^2}{2}` (x dropped, 1/(1+x²) integrated to arctan: 2π·π/4). That value also pairs with π²/4 and breaks the bracket.
- vs-f-048 — FORM_LEAK (T3) — 2π(e⁴−e), (π/2)(e⁴−e), π(e−e⁴) bracket π(e⁴−e) — replace (π/2)(e⁴−e) with `\pi(4e^4 - e)` (product rule for integrals: 2π[(x²/2)e^{x²}]₁²).
- vs-s-01#1 — FORM_LEAK (T1) — twin (6 − 2y, y) — see T1.
- vs-s-01#2 — FORM_LEAK (T2) — π, y², π(6−2y)² and bounds 0..6 all mutate ∫₀³ 2πy(6 − 2y)dy — see T2.
- vs-s-02#0 — FORM_LEAK (T4) — the only option with "(on the curve)" (40 chars vs ≤33) — remove the qualifier or add parallel qualifiers to every option.
- vs-s-02#1 — FORM_LEAK (T2) — "y from 0 to" appears 3×, and "−2 to 2" reveals the magnitude 2 — replace "−2 to 2" with e.g. "y from 0 to √2", or add "x from 0 to 2".
- vs-s-02#2 — FORM_LEAK (T1) — twin (4 − y², y) — see T1.
- vs-s-02#3 — FORM_LEAK (T2) — π, y², π(4−y²)² and bounds 0..4 mutate the correct integral — see T2.
- vs-s-03#1 — FORM_LEAK (T1) — twin (√x, x) — see T1.
- vs-s-05#2 — FORM_LEAK (T2) — π(eˣ)², bounds e..e², x², π all mutate ∫₁² 2πx eˣ dx — see T2.
- vs-s-06#3 — FORM_LEAK (T2) — h = x³, r = x, (x+2)², bounds 0..8, π all mutate the correct integral — see T2.
- vs-s-07#2 — FORM_LEAK (T2) — bounds 1..2, u, u − 1, π all mutate 2π∫₀¹(u+1)(√u − u²)du — see T2.
- vs-s-08#0 — FORM_LEAK (T2) — "Shells", "vertical" and "x from 1 to 3" are each shared with a different distractor, so the correct option is the unique hub (sum of feature distances 7 vs ≥8) — see T2.
- vs-s-09#0 — FORM_LEAK (T4) — correct 100 chars, others 34–51; the only option with a concrete justification — shorten it to e.g. "Vertical slices always run from y = 1 to the curve", and give distractors the same specificity.
- vs-s-09#1 — FORM_LEAK (T2) — (x+2)²+3, (x−2)²−3 and √(x−2)+3 mutate (x−2)²+3 — add e.g. `(x + 2)^2 - 3` or `\sqrt{x + 2} + 3` as a second hub.
- vs-s-09#2 — FORM_LEAK (T1) — twin ((x−2)² + 2, x) — see T1.
- vs-s-10#1 — FORM_LEAK (T1) — twin (2y − y², y + 1) — see T1.
- vs-s-10#2 — FORM_LEAK (T2) — y, y − 1, π, (y+1)² and the disk form mutate 2π(y+1)(2y − y²) — see T2.

### Blocking — same tells found by inspection in unsampled units (plus two sampled units the blind test did not flag)

- vs-f-013, vs-f-014, vs-f-015, vs-f-016, vs-f-017, vs-f-018, vs-f-020, vs-f-021 — FORM_LEAK (T1) — each contains the unique r/h mirror of the correct pair, and every other distractor shares the correct h (or r) — see T1. (One bullet for 8 items to save space; count 8.)
- vs-g-axis-radius — FORM_LEAK (T1) — every instance contains `r = f, h = (shift)`, the mirror of the correct option; 5 of 6 options share h = f(x) — replace the swap distractor with e.g. `r = x + k, h = f(b) - f(x)` (height measured down from the top of the region, tag `shell-height-wrong`).
- vs-s-04#1, vs-s-05#1, vs-s-08#1 — FORM_LEAK (T1) — twins (√x, x + 1), (eˣ, x), (ln x, x) — see T1. (count 3)
- vs-s-07#0 — FORM_LEAK (T1+T2) — "left (y−1)², right √(y−1)" has its left/right mirror, and the other distractors are single mutations — replace the mirror with e.g. "Left end x = (y − 1)², right end x = 1".
- vs-f-022 — FORM_LEAK (T2) — in the height slot, √y, 2 − y² and √y − 2 are each one change from the correct 2 − √y — see T2.
- vs-f-025 — FORM_LEAK (T2) — +4, +5, (y+3)²+3, (x − 1) and bounds 1..8 each change one slot of ∫₃⁵ 2πy((y−3)²+3)dy — see T2.
- vs-f-027 — FORM_LEAK (T2) — 8πy, (2 + √), √ alone and the π halves each change one piece of the correct two-integral sum — see T2.
- vs-s-03#2, vs-s-04#2, vs-s-07#1, vs-s-08#2, vs-s-09#3 — FORM_LEAK (T2) — the standard {π, r², disk formula, bounds, shift/height} single-mutation set around the correct shell integral — see T2. (count 5)
- vs-s-05#0 — FORM_LEAK (T2, moderate) — per-slot majority (from 0, to eˣ) matches only the correct slice description — add a distractor such as "From y = 1 up to y = e²".
- vs-s-06#2 — FORM_LEAK (T2) — x³, x³ − 8, 8 and 8 − ∛x are each one change from 8 − x³ — see T2.
- vs-s-08#3 — FORM_LEAK (T2) — +x²/4, −x²/2, −x³/6 and (x²/2) ln x are each one change from (x²/2) ln x − x²/4 — see T2.
- vs-f-043, vs-f-046, vs-s-01#3, vs-s-02#4, vs-s-03#3, vs-s-04#3, vs-s-06#4, vs-s-07#3, vs-s-08#4, vs-s-09#4, vs-s-10#3 — FORM_LEAK (T3) — in each, the correct value is the unique option whose half is also listed: 2π/3↔π/3, π/6↔π/12 (and ×2 π/3), 18π↔9π, 8π↔4π, 128π/5↔64π/5, 544π/15↔272π/15, 336π/5↔168π/5, 29π/30↔29π/60, π(9ln3−4)↔(π/2)(…), 128π/3↔64π/3, 16π/3↔8π/3 (and ×2 32π/3). vs-f-043 was a blind MISS and vs-s-09#4 a blind HIT for a math reason; both are listed here because the rule would have found them — see T3. (count 11)
- vs-s-04#0 — FORM_LEAK (T4) — the correct "Only the radius: it becomes x + 1; the height and the limits stay the same" is 76 chars vs ≤42, and is the only option that answers all three aspects — shorten it to "Only the radius, which becomes x + 1", or lengthen the distractors to match.

Blocking count: 28 (blind) + 8 + 1 + 3 + 1 + 1 + 1 + 1 + 5 + 1 + 1 + 1 + 11 + 1 = **64** units.

### Non-blocking

- vs-s-07#2 — WRONG_TAG — the option `2\pi\int_0^1 u(\sqrt u - u^2)\,du` is tagged `axis-shift-missing`, which is defined as "radius taken as the function value although the axis is not a coordinate axis". Here the axis is the x-axis, and the error is dropping the +1 of y = u + 1 (effectively rotating about y = 1) — retag `phantom-axis-shift`.
- vs-s-08#0 (option "Shells: vertical slices, integrate in x from 0 to 3") and vs-s-08#2 (option ∫₀³ 2πx ln x dx) — WRONG_TAG (better fit) — the lower limit is taken at the axis of rotation x = 0, while R starts at x = 1 (ln 1 = 0). `bounds-from-axis` describes this exactly; `missing-intersection` is defensible but less precise — retag `bounds-from-axis`.
- vs-s-09#4 (16π) and vs-s-07#1 ((y − 1) radius) — MINOR (tag) — `phantom-axis-shift` fits at least as well as `shell-radius-wrong` (dropping +2 of x = t + 2, or reading the "+1" of both curves as an axis at y = 1). Values verified: 2π∫₀² t(t²+2)dt = 16π.
- vs-s-05#3 — EXPLANATION — the `why` for 2π(e² − e) states the correct fact ("(1−1)e = 0, so nothing is subtracted") instead of the mistake — suggest "F(1) was evaluated as e (e.g. x eˣ at x = 1) instead of (1 − 1)e = 0".
- vs-s-05#3 — MINOR — the prompt supplies ∫xeˣdx = (x − 1)eˣ + C, so the `ibp-formula-wrong` (2π(2e² − e)) and `ibp-sign-error` (2π(3e² − 2e)) distractors are only reachable if the student ignores the given antiderivative — either remove the antiderivative from the prompt or use evaluation slips.
- vs-f-045, vs-f-048 — EXPLANATION — "The factor 2 from du = 2x dx was compensated twice" does not name a concrete step (author-flagged); the replacements are proposed under T3 above.
- vs-s-01#1 — MINOR (display) — `result.latex` is written `'x = 6 - 2y \;\\Rightarrow\; r = y,…'` with a single-backslash `\;`. JavaScript drops the backslash, so the runtime string is `x = 6 - 2y ;\Rightarrow; r = y,\quad h = 6 - 2y` (verified with tsx) and KaTeX renders literal semicolons around ⇒. Use `\\;`. This is the only lone-backslash escape in either file.
- vs-f-036 — MINOR — "most efficient" is debatable. Washers in x are also a single short integral: R² − r² = (1+√(1−x))² − (1−√(1−x))² = 4√(1−x), so V = π∫₀¹4√(1−x)dx = 8π/3, the same as shells. The stored answer (shells) is right by the lecture's criterion ("avoids solving for inverse functions") — rephrase the stem to "Which setup avoids solving x = 2y − y² for y?".
- vs-s-02#1 — MINOR — "y from 0 to 16" is a weak distractor (author-flagged). The tag `interval-not-respected` on "−2 to 2" is acceptable: the x-axis bounds the region below.
- vs-f-011 — MINOR — it has the same weak orientation tell as vs-f-010: the only no-shift option is y = 0, which leaves y = ±3. I missed this one in the blind test, so it is not counted. Apply the vs-f-010 fix (offer both x = 0 and y = 0).
- vs-f-010/vs-f-011 — MINOR — the duplicate `shell-orientation-wrong` tags are acceptable (y = 1 and x = −3 are double errors); replacing them per the fix above also removes the duplicates.
- vs-s-06#0 — MINOR — the correct option is the longest (47 vs ≤38 chars) and the only one naming both boundaries. This is a borderline length tell; the centre heuristic points elsewhere.
- Scope note (no finding) — vs-s-05 and vs-s-08 finish with integration by parts. IBP is Lecture 5 Part 2, which is Exam 1 topic 7, so this is in scope. Lecture 4 itself poses e^x about the y-axis (Level I #2). vs-f-044/045/048 are Lecture 1 u-substitutions.

## Blind-option test

Seed 13 sampled 33 of 94 units (35%): flash items, one generator instance, and all steps. Guesses were made from the option lists only, before either content file was opened; the key was never opened. **Hits: 31/33 (94%). Chance ≈ 6.2/33 (19%).**

| # | item | guess | correct | hit | reason |
|---|------|-------|---------|-----|--------|
| 1 | vs-f-002 | 6 | 6 | HIT | SURFACE(centre): every other option is a one-feature mutation of 6 (pi vs 2pi, x^2, f^2 without x, bounds f(a)..f(b)). Also the standard y-axis shell formula. |
| 2 | vs-f-006 | 1 | 1 | HIT | SURFACE(distractor theme): 3 and 5 are radius-type errors, so the stem probably asks for the radius; 1 is the lecture's radius definition. Coin flip with 2 (height definition). |
| 3 | vs-s-01#1 | 2 | 2 | HIT | SURFACE(swap twin): option 3 is option 2 with r and h exchanged. Math agrees: 3 - x/2 is the line y = 3 - x/2, so x = 6 - 2y. |
| 4 | vs-f-038 | 2 | 2 | HIT | RECONSTRUCTION (test-wise): options imply region x in [0,1], y in [1,2] (gap to a horizontal axis); 1 = valid-but-harder shells, 5 = missed gap, 4 = y-range as x-bounds, 3 = shells with wrong orientation. Not pure math. |
| 5 | vs-f-048 | 6 | 6 | HIT | SURFACE(centre): 2pi(...), pi/2(...), reversed order, dropped term and e^2 all mutate pi(e^4 - e). |
| 6 | vs-f-045 | 2 | 2 | HIT | SURFACE(centre): coefficients 2pi, pi/2 bracket pi ln 2; the pi^2/4 and ln(5/2) are odd ones. |
| 7 | vs-f-028 | 6 | 6 | HIT | SURFACE(centre): one-feature mutations of 6 (pi, x^2, sign swap, squared). Math agrees (2x^2 - x^3 >= 0 on [0,2]). |
| 8 | vs-s-09#4 | 5 | 5 | HIT | MATH/CROSS-UNIT: 64pi/3 and 128pi/3 are a halving pair (surface cue, 50/50), resolved by computing int_0^4 2pi x(4x - x^2) dx = 128pi/3 from the parabola in unit 23. |
| 9 | vs-f-032 | 3 | 3 | HIT | SURFACE(centre + consistency): vertical<->x and horizontal<->y are the consistent pairs; 3 is one change from 1, 4, 5. |
| 10 | vs-s-02#3 | 2 | 2 | HIT | SURFACE(centre): one-feature mutations of 2 (pi squared-disk, y^2, bounds 0..4, pi only). |
| 11 | vs-s-09#1 | 2 | 2 | HIT | SURFACE(centre): sign variants (x+2), (-3) and sqrt version all mutate (x-2)^2 + 3. |
| 12 | vs-s-10#2 | 4 | 4 | HIT | SURFACE(centre): pi only, (y-1), (y+1)^2, y, disk form all mutate 2pi(y+1)(2y-y^2). |
| 13 | vs-f-010 | 5 | 5 | HIT | SURFACE(coin flip): 'no shift' distractor is x = 0, so axis is vertical; picked x = -1 (lecture Example 4.4) over x = 1. |
| 14 | vs-f-026 | 5 | 5 | HIT | SURFACE(coin flip): 3 appears in three options; 3 - x is the positive distance for an axis right of [1,2]; x + 3 equally plausible for axis x = -3. |
| 15 | vs-f-043 | 6 | 5 |  | RECONSTRUCTION (unsure): 8pi/3, 10pi/3, pi/3 fit correct / shift-sign / no-shift for a triangle under 1 - x about x = 3. Low confidence. |
| 16 | vs-s-08#0 | 3 | 3 | HIT | SURFACE(centre): shares 'shells vertical' with 2 and 'x from 1 to 3' with 4. Note: option 1 (washers in y, 0..ln3) may also be a valid setup depending on the stem. |
| 17 | vs-s-02#2 | 3 | 3 | HIT | SURFACE(swap twin): option 5 is option 3 with r and h exchanged. |
| 18 | vs-s-01#2 | 3 | 3 | HIT | SURFACE(centre): one-feature mutations of 3 (y^2, bounds 0..6, disk, pi only). |
| 19 | vs-s-02#1 | 3 | 3 | HIT | SURFACE(centre): 'y from 0 to' in three options; 2 shared with the -2..2 option. |
| 20 | vs-s-09#0 | 4 | 4 | HIT | SURFACE(longest/most specific): only option with a concrete justification; 1-3 are absolute generic claims. |
| 21 | vs-f-012 | 6 | 6 | HIT | SURFACE(swap twin): option 4 is option 6 with r and h exchanged. |
| 22 | vs-s-05#2 | 1 | 1 | HIT | SURFACE(centre): one-feature mutations of 1 (x^2, pi only, disk, bounds e..e^2). |
| 23 | vs-s-09#2 | 3 | 3 | HIT | SURFACE(swap twin): option 4 is option 3 with r and h exchanged. Math agrees ((x-2)^2 + 3 - 1). |
| 24 | vs-f-044 | 3 | 3 | HIT | SURFACE(centre): pi, 4pi, -2pi are half/double/negative of 2pi. Math agrees: int_0^sqrt(pi) 2pi x sin(x^2) dx = 2pi. |
| 25 | vs-f-001 | 1 | 1 | HIT | SURFACE(centre) + recall: every option is a one-feature mutation of 2 pi r h (lecture formula). |
| 26 | vs-f-011 | 4 | 1 |  | SURFACE(coin flip): 'no shift' distractor y = 0 means horizontal axis; y = -3 vs y = 3 is 50/50. |
| 27 | vs-s-07#2 | 5 | 5 | HIT | SURFACE(centre): pi only, u, (u-1), bounds 1..2 all mutate 2pi int_0^1 (u+1)(...). |
| 28 | vs-s-06#3 | 4 | 4 | HIT | SURFACE(centre): one-feature mutations of 4 (pi, squared radius, h = x^3, r = x, bounds 0..8). |
| 29 | vs-s-03#1 | 3 | 3 | HIT | SURFACE(swap twin): option 5 is option 3 with r and h exchanged. |
| 30 | vs-f-019 | 4 | 4 | HIT | SURFACE(swap twin): option 5 is option 4 with r and h exchanged. |
| 31 | vs-s-02#0 | 5 | 5 | HIT | SURFACE(longest/unique qualifier): only option carrying the parenthetical '(on the curve)'. |
| 32 | vs-s-06#1 | 2 | 2 | HIT | MATH/CROSS-UNIT: y = x^3, y = 8 about x = -2 (unit 28) gives r = x + 2. From these options alone x + 2 vs 2 - x is a coin flip. |
| 33 | vs-s-10#1 | 1 | 1 | HIT | SURFACE(swap twin): option 5 is option 1 with r and h exchanged. |

Unit 16 note: after reading the stem ("Which setup avoids rewriting y = ln x as x = e^y?"), the washers option is correctly excluded, so this is not a DISTRACTOR_ALSO_CORRECT.

**Guessable ids (28)**
- Strong surface tell (24): vs-f-001, vs-f-002, vs-f-012, vs-f-019, vs-f-028, vs-f-044, vs-f-045, vs-f-048, vs-s-01#1, vs-s-01#2, vs-s-02#0, vs-s-02#1, vs-s-02#2, vs-s-02#3, vs-s-03#1, vs-s-05#2, vs-s-06#3, vs-s-07#2, vs-s-08#0, vs-s-09#0, vs-s-09#1, vs-s-09#2, vs-s-10#1, vs-s-10#2.
- Weak (surface narrowing to two, then a lucky pick) (4): vs-f-006, vs-f-010, vs-f-026, vs-f-032.

Not guessable: vs-f-038 and vs-s-09#4, whose hits came from reasoning about the math; vs-s-06#1, a cross-unit hit that is a coin flip from its own options. Misses: vs-f-043, vs-f-011.

## Certified

**Fully certified** (answer, distractor values and tags, why lines, and check re-derived; no blocking finding; MINOR notes above where marked):
vs-f-003, vs-f-004, vs-f-005, vs-f-007, vs-f-008, vs-f-009, vs-f-011 (minor), vs-f-023, vs-f-024, vs-f-029, vs-f-030, vs-f-031, vs-f-033, vs-f-034, vs-f-035, vs-f-036 (minor wording), vs-f-037, vs-f-038, vs-f-039, vs-f-040, vs-f-041, vs-f-042, vs-f-047; steps vs-s-01#0, vs-s-03#0, vs-s-05#3 (explanation note), vs-s-06#0 (minor), vs-s-06#1, vs-s-07#4, vs-s-10#0; the `final` (latex, expr, check) of all ten problems vs-s-01…vs-s-10.

**Math re-derived and correct, but NOT certified because of FORM_LEAK:** the other 64 unit ids listed under Blocking.

**Independent derivations** (second method differs from the stored shell integral):
- vs-s-01: 18π — cone formula ⅓π·3²·6.
- vs-s-02: 8π — disks π∫₀⁴x dx.
- vs-s-03: 128π/5 — washers π∫₀²(16 − y⁴)dy.
- vs-s-04: 544π/15 — washers π∫₀²(25 − (y²+1)²)dy.
- vs-s-05: 2πe² — washers 3πe + π∫_e^{e²}(4 − ln²y)dy = 3πe + π(2e² − 3e).
- vs-s-06: 336π/5 — washers π∫₀⁸((∛y + 2)² − 4)dy = π(96/5 + 48).
- vs-s-07: 29π/30 — washers π∫₀¹((√x+1)² − (x²+1)²)dx = π(1/2 + 4/3 − 1/5 − 2/3).
- vs-s-08: π(9 ln 3 − 4) — washers π∫₀^{ln3}(9 − e^{2y})dy.
- vs-s-09: 128π/3 — washers 24π + 56π/3; the t = x − 2 substitution gives 2π∫₀²(t+2)(t²+2)dt = 2π·64/3.
- vs-s-10: 16π/3 — washers π∫₀¹ 8√(1−x)dx.
- Flash setups: vs-f-022 = 304π/15, vs-f-023 = 11π/6, vs-f-024 = 56π/3, vs-f-025 = 72π, vs-f-026 = 2π(2e² − 3e), vs-f-027 = 192π/5, vs-f-028 = 16π/5, vs-f-036 = 8π/3, vs-f-037 = 16π/15, vs-f-040 = 2π, vs-f-041 = 2π/3. Each agrees between the two methods.
- Evaluations: vs-f-042…048 = 8π, 2π/3, 2π, π ln 2, π/6, 16π/3, π(e⁴ − e). Every distractor value was recomputed from its stated mistake and matches.

Generator vs-g-axis-radius: the code was read and seeds 1–200 were run. It is deterministic; the axis is never inside [0, b]; the correct radius is always x + k (axis x = −k) or m − x (axis x = m > b); height is f(x) ≥ 0; options are distinct; k ≠ b is enforced, so "k − x" and "b − x" never coincide. The math is correct over the full parameter range. It is not certified only because of T1.

## Uncertain

None. No stored answer disagrees with my derivations. The only judgment call is vs-f-036's "most efficient" wording (see MINOR above); the stored answer is correct by the lecture's stated criterion.
