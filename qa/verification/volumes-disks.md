VERDICT: FAIL (22 blocking issues)

Topic `volumes-disks` (prefix `vd`). Files: `content/flash/volumes-disks.ts` (vd-f-001…vd-f-046, generator `vd-g-washer-slice`) and `content/steps/volumes-disks.ts` (vd-s-01…vd-s-10, 39 steps). Verifier: math-verifier instance that did not author these files. Lecture 3, §2.2 (incl. Table 1 and the Common Mistakes box) used as the authority.

Automated checks: `npx vitest run tests/content.test.ts -t "volumes-disks"` → 58 passed. `npx vitest run tests/content-volume.test.ts -t "volumes-disks"` → 2 passed.

Summary:
- Math: I re-derived every stored answer independently, and all of them are correct. That covers the 46 flash items, the generator (seeds 1–200, recomputed from a, b and the axis), the 39 steps and the 10 finals.
- Distractors: every one is genuinely wrong, and numerically distinct from the correct answer.
- Checks: every check expression describes the problem as stated.
- Rendering: all 2244 LaTeX strings (options, prompts, whys, explanations, results, recaps, generator seeds 1–20) render in KaTeX with `throwOnError`.
- Scope and notation: match the lecture (π(R² − r²) with R and r as distances to the axis; V = ∫A(x)dx; slicing examples 3.1, 3.2, 3.5–3.7; Level I #1–3; Level II #1–2; Checking-your-understanding #1–2). Nothing is out of scope.
- What blocks the merge:
  - 18 blind-test surface hits.
  - 2 more surface tells found by reading the options.
  - A systemic "centroid" pattern: the correct option is the one most similar to the others.
  - One distractor that is a valid answer by the shell method (vd-s-04#0).

## Findings

### Blocking — FORM_LEAK, guessed in the blind test from the options alone for a surface reason

Most of these are "centroid" leaks. Every distractor is a one-mistake edit of the correct answer. So the correct option is the only one that combines the most common parts of the list ("modal parts"), and a test-wise student picks it without solving anything.

**General fixes**
- For R/r-pair items (vd-f-017, vd-f-018, vd-f-019, vd-f-025, vd-s-04#1, vd-s-07#1), pick one:
  - Ask for one radius per question ("What is the inner radius r(y)?"), so there is no pair to triangulate.
  - Make sure each part of the correct pair appears in no more options than the most frequent wrong part.
- For "which integral" items: at least two distractors should be *well-formed* (π, the correct bounds, R² − r² or R²) but built from a realistic wrong radius. That way "the well-formed one with the common parts" is not unique.

**Items**
- vd-s-07#1 — FORM_LEAK — Tell: R = 3 is in 4 of 6 options (and 3 appears in all 6), and e^y in 3; [3, e^y]/[e^y, 3] is a swap pair. Picked as "combines the modal parts" (blind unit 1). Math is correct: R = 3, r = e^y. Fix: use the R/r fixes above.
- vd-s-05#2 — FORM_LEAK — Tell: 5 is in 4 of 5 options and (y² + 1) in 3. The correct option is the only well-formed [R² − r²] that uses the common radii (unit 3). Math: π∫₀²[25 − (y²+1)²]dy = 544π/15 ✓. Fix example: replace the `[5² − y⁴ − 1]` option with well-formed wrong radii, e.g. `π∫₀²[5² − (y² − 1)²]dy` (axis-shift-sign) or `π∫₀²[5² − (√y + 1)²]dy` (inverse-function-wrong).
- vd-f-014 — FORM_LEAK — Tell: `∫₀⁴…dy` is in 4 of 5 options, a squared side in 4 of 5, and 2√y in 2. The correct option alone has all three (unit 5). Math: ∫₀⁴(2√y)²dy = ∫₀⁴4y dy = 32 ✓. Fix example: add `π∫₀⁴(2√y)²dy` (cross-section-area-wrong: π on a square) and `∫₀²(2√y)²dy` (bounds-wrong-axis), and drop one of the two `(√y)²` options.
- vd-f-017 — FORM_LEAK — Tell: 4 appears in 4 of 5 options (as R in 3), and x² in 3; [4, x²]/[x², 4] is a swap pair (unit 9). Math: R = 4, r = x² ✓. Fix: R/r fixes above.
- vd-f-018 — FORM_LEAK — Tell: 4 − x² is in 2 options and r = 0 in 3; the correct option combines them (unit 31). Math: disk, R = 4 − x² ✓. Fix: R/r fixes above.
- vd-f-019 — FORM_LEAK — Tell: R = 5 is in 2 options and x² + 1 in 2; [5, x²+1]/[x²+1, 5] is a swap pair (unit 10). Math: R = 5, r = x² + 1 ✓. Fix: R/r fixes above.
- vd-f-025 — FORM_LEAK — Tell: 2 − √y is in 2 options and r = 0 in 4 of 6 (unit 14). Math: disk, R = 2 − √y ✓. Fix: R/r fixes above.
- vd-s-04#1 — FORM_LEAK — Tell: R = 4 is in 4 of 6 options and y² in 3 (unit 25). Math: R = 4, r = y² ✓. Fix: R/r fixes above.
- vd-f-026 — FORM_LEAK — Tell: π∫₀² is in 4 of 6 options and (2x − x²)² in 3. The correct option is the only standard π∫R² (unit 23). Math: 16π/15 ✓. Fix: add a second well-formed distractor with a realistic wrong radius or bounds.
- vd-f-032 — FORM_LEAK — Tell: bounds −1..2 are in 5 of 6 options and [(y+2)² − (y²)²] in 2 (unit 28). Math: π∫₋₁²[(y+2)² − y⁴]dy = π(21 − 33/5) = 72π/5 ✓. Fix: as above.
- vd-f-033 — FORM_LEAK — Tell: π∫₀⁴ is in 5 of 6 options, (√y + 1)² in 2 and "− 1²" in 2 (unit 26). Math: π∫₀⁴(y + 2√y)dy = 56π/3 ✓. Fix: as above.
- vd-s-02#2 — FORM_LEAK — Tell: π∫₀² and (4 − 2x)² are the most common parts; the correct option is the standard disk form (unit 18). Math: 32π/3 ✓. Fix: as above.
- vd-s-07#2 — FORM_LEAK — Tell: bounds 0..ln 3 are in 4 of 6 options and [3² − (e^y)²] in 2 (unit 20). Math: π(9 ln 3 − 4) ✓. Fix: as above.
- vd-s-08#1 — FORM_LEAK — Tell: π∫₀¹ is in 3 of 6 options and (e^x)² in 2 (unit 16). Math: π(e² − 1)/2 ✓. Fix: as above.
- vd-f-044 — FORM_LEAK — Tell: "y from 0 to 4" is in 4 of 6 options, R = √y in 3 and r = y/2 in 2 (unit 29). Math: horizontal slices, y ∈ [0, 4], x runs from y/2 (near) to √y (far) ✓. Fix: R/r fixes above.
- vd-s-02#0 — FORM_LEAK — Tell: each distractor changes exactly one attribute of the correct plan (orientation, variable, or bounds), so the correct plan is the unique intersection: "Disks ⊥ x-axis" 3 of 5, "in x" 2, "0 to 2" 2 (unit 15). Math: disks ⊥ x-axis, 0 ≤ x ≤ 2 ✓. Fix: use distractors that are internally consistent alternative plans, not one-attribute edits. The same pattern appears in vd-s-04#0, vd-s-06#0, vd-s-07#0, vd-s-08#0 and vd-s-09#0; review them too.
- vd-f-042 — FORM_LEAK — Tell: the correct option is the only one with a full because-clause, and it is more than 15% longer than any other (unit 27). Math: washers, R = e^x + 1, r = 1 ✓. Fix: give every option a same-length reason, or strip the reasons from all of them.
- vd-f-043 — FORM_LEAK — Tell: the correct option is the only one with a justification clause ("the axis is the top edge of the region") (unit 12). Math: disks of radius 1 − x² ✓. Fix: same as vd-f-042.

### Blocking — FORM_LEAK found by reading the options (not in the blind sample)
- vd-f-010 — FORM_LEAK — Tell: the correct option is uniquely longest, and it is the only one stating a consequence ("so r² > R² on the slices"), which echoes the prompt's "negative". Math: only swapped radii can make π(R² − r²) negative ✓. Fix: shorten it to "The inner and outer radii were swapped", or give every option a consequence clause.
- vd-s-05#0 — FORM_LEAK — Tell: the correct option is the only one with a parenthetical ("(perpendicular to the line x = −1)"), and it is uniquely longest. Math: horizontal washers, 0 ≤ y ≤ 2 ✓. Fix: drop the parenthetical, or add one to every option.

### Blocking — FORM_LEAK, systemic (needs an orchestrator policy decision)
- **What I measured.** A mechanical rule, "pick the option most similar to all the others", finds the correct answer in 60 of 105 units in this topic by token bigrams, and in 42 of 105 by edit distance. About 19 would be expected by chance. The 105 units are the flash items, generator seeds 1–20 and every step.
- **Cause.** Every distractor is a single-mistake edit of the correct answer.
- **Calibration.** The same scan on the other topics gives 47–79%, so the effect is project-wide. It is not specific to this author.
- **Items hit by both measures and not already listed above:** vd-f-011, vd-f-012, vd-f-022, vd-f-024, vd-f-029, vd-f-030, vd-f-031, vd-f-038, vd-f-046, vd-s-01#0, vd-s-01#2, vd-s-02#1, vd-s-02#3, vd-s-03#0, vd-s-03#2, vd-s-03#3, vd-s-04#3, vd-s-05#1, vd-s-05#3, vd-s-06#0, vd-s-08#2, vd-s-10#1, vd-s-10#2, and generator seed 6. The numeric evaluate items in this list (vd-f-038, vd-s-02#3, vd-s-03#3, vd-s-04#3, vd-s-05#3, vd-s-08#2) give a weaker signal.
- **Fix:** when rewriting, check that no single option maximizes the parts shared with the others. The scan script is `/tmp/claude-0/-home-user-Calc2Study/6ed826b6-ed8f-5336-b2e6-6799eb8df213/scratchpad/vd-verify/medoid.ts` (token-bigram Jaccard and normalized-Levenshtein medoid).

### Blocking — DISTRACTOR_ALSO_CORRECT
- vd-s-04#0 — DISTRACTOR_ALSO_CORRECT
  - **Problem.** The option "Vertical slices (perpendicular to the x-axis), integrating in $x$ from 0 to 4" is the valid shell setup for this solid.
  - **Derivation.** By shells, 2π∫₀⁴ x·√x dx = 2π·(2/5)·4^{5/2} = 128π/5. By washers, π∫₀²(16 − y⁴)dy = 128π/5. Same volume.
  - **Why it is defensible.** Neither the statement ("Find the volume of the solid…") nor the prompt ("How should the region be sliced?") limits the method to disks or washers. Only the distractor's why ("washers need slices perpendicular…") assumes it. Shells (Lecture 4) are Exam 1 material.
  - **Fix.** Put "Use the disk/washer method" in the statement, as vd-s-02 does, or change the option to "Vertical washers…". I recommend naming the method in every vd-s statement. The similar options in vd-s-05#0, vd-s-06#0, vd-s-07#0 and vd-s-09#0 are already wrong as written: wrong bounds (−1 to 4), "Washers ⊥ y-axis", "Vertical disks", "Vertical washers".

### Non-blocking — WRONG_TAG
- vd-s-06#1 (option R = √x, r = x²) and vd-s-06#2 (option π∫₀¹[(√x)² − (x²)²]dx) — WRONG_TAG — Both are tagged `axis-shift-sign`, but the axis is y = 0. The student dropped the "+1" of each curve as if it were an axis shift. That is exactly `phantom-axis-shift`; retag. (Author flag confirmed.)
- vd-f-045 — WRONG_TAG, two options:
  - "radius 2 − x on [0,1] and x² on [1,2]" is tagged `top-bottom-swapped` → retag `boundary-pieces-swapped`. On [0,1], x² ≤ 2 − x, so the parabola is the top edge there. (Author flag confirmed.)
  - "One integral … R = 2 − x and r = x²" invents a hole in a region that touches the x-axis. `disk-as-washer` fits better than `volume-two-integrals-missed`; its own why already says "there is no hole".
- vd-f-018 (R = 4 − x², r = 4), vd-f-025 (R = 2 − √y, r = 2), vd-f-043 ("Washers with R = 1 − x² and r = 1") — WRONG_TAG — All three are tagged `radius-is-function-value`. Each is a nonzero inner radius although the axis is the region's own edge → retag `disk-as-washer`.
- vd-s-05#0 (option "Horizontal washers, $y$ from −1 to 2") — WRONG_TAG — Tagged `bounds-wrong-axis`, but the axis position was used as a limit → retag `bounds-from-axis`. Its why already says "The axis position x = −1 is not a limit".
- vd-s-03#2 (option π∫₋₁¹√3(1 − x²)dx) — WRONG_TAG — Tagged `coefficient-mishandled`, but this is a circle's π put on a triangle → retag `cross-section-area-wrong`. vd-f-012 already tags the same mistake that way.
- vd-f-011 (option s = 4 − y) — WRONG_TAG (minor) — The variable is already y. The mistake is measuring the vertical gap instead of the horizontal width, so `cross-section-area-wrong` fits better than `wrong-integration-variable`. Keep `wrong-integration-variable` for s = 4 − x². (Author flag.)
- vd-f-017 (option R = 4, r = √y, tagged `not-in-terms-of-variable`) — no change. √y inside an x-slice matches the tag's description exactly. (Author flag resolved: keep.)

### Non-blocking — EXPLANATION
- vd-s-01#0 — EXPLANATION (render bug) — `result.latex` is written `'r(z)^2 + z^2 = 9 \;\\Rightarrow\; r(z) …'`. In a JS string `\;` becomes `;`, so the runtime value is `9 ;\Rightarrow; r(z) = …` and students see literal semicolons: "9 ;⇒; r(z)". Fix: `\;\\Rightarrow\;`. This is the only such string in the topic.

### Non-blocking — MINOR
- vd-f-015, vd-f-016, vd-f-017, vd-f-019, vd-f-020, vd-f-021, vd-f-022, vd-f-023, vd-f-024, vd-f-044 — MINOR — The prompts say "For the washer…" or "using washers". That tells the student there is a hole, so the `washer-as-disk` option (r = 0) can be eliminated for free, and spotting the gap is one of the lecture's Common Mistakes. Use the neutral "For the slice…", as vd-f-018 and vd-f-025 do.
- vd-g-washer-slice — MINOR — R − r and (R − r)² are always the two smallest values and R² is always the largest. So the correct value always ranks 3rd–5th smallest (600 seeds: 165/196/239, never 1st, 2nd or 6th), which gives a 1-in-3 pick. vd-f-001 has the same shape. This is not a full leak: my blind guess on seed 1 missed.
  - Everything else about the generator checks out: 200 seeds match my own derivation (27 distinct cases), all option values are positive and distinct, the axis never cuts the slice, it is deterministic, the correct position is uniform, and it excludes vd-f-001's case.
- Impossible values (a negative or zero volume) can be eliminated on sight:
  - These items drop to 4 live options: vd-f-038 and vd-f-040 (two negatives each); vd-s-01#3, vd-s-04#3 and vd-s-10#3 (V = 0); vd-s-02#3, vd-s-09#3 and vd-s-08#2 (one negative each).
  - vd-f-034, vd-f-039, vd-f-041 and vd-s-03#3 keep 5 live options.
  - Consider replacing some of these with positive slips.
- vd-s-10#0 (option D = 2x² − 2) — MINOR (author flag) — This is genuinely wrong, not DISTRACTOR_ALSO_CORRECT: a diameter is a length, and 2x² − 2 < 0 on (−1, 1). But squaring hides the sign: radius x² − 1 gives area π(x² − 1)² = π(1 − x²)², the same volume, so picking it costs nothing downstream. Keep it, and optionally say so in the why.
- Checks that restate the answer — MINOR — vd-f-003 and vd-f-004 (identity of the answer with itself), vd-f-011, vd-f-015…vd-f-025 and the R/r step checks use the stored answer as `expected`, so the tests cannot catch a wrong answer there; my re-derivation covers them. Where cheap, encode the derivation instead, as vd-f-001, vd-f-005, vd-s-03#1 and vd-s-10#0/#1 already do. Examples: vd-f-003 `'1/2*s*(sqrt(3)/2*s)'`, vd-f-004 `'1/2*pi*(s/2)^2'`, vd-f-011 `'sqrt(y) - (-sqrt(y))'`.
- Author-flagged formula items (triangle/semicircle areas) — not guessable. vd-f-003 was in the blind sample, and I hit it by recalling the formula, not from its form. The "most-similar option" rule picks a distractor for vd-f-003 (√3/2·s²), vd-f-004 (π/2·s²) and vd-s-03#1. vd-f-046 is a hit and is listed under the systemic finding.

## Blind-option test

- Sample: `npx tsx scripts/blind-sample.ts volumes-disks 14` → 31 of 86 units (36%): flash items, generator seed 1, and step units. I guessed from the option lists only, before opening any content file or the key file.
- Hits: 30/31 (97%). Chance level ≈ 5.6/31 (18%).
- Guessable (HIT + surface reason), 18: vd-s-07#1, vd-s-05#2, vd-f-014, vd-f-017, vd-f-019, vd-f-043, vd-f-025, vd-s-02#0, vd-s-08#1, vd-s-02#2, vd-s-07#2, vd-f-026, vd-s-04#1, vd-f-033, vd-f-042, vd-f-032, vd-f-044, vd-f-018 (all listed under Findings).
- Hits reached by doing the math from the options (not counted as guessable), 12: vd-f-040, vd-s-01#0, vd-f-006, vd-f-011, vd-s-09#1, vd-s-10#0, vd-s-01#2, vd-f-045, vd-f-009, vd-f-030, vd-s-07#3, vd-f-003. Of these, vd-s-01#0, vd-s-01#2, vd-f-011 and vd-f-030 are also caught by the "most-similar option" rule (see the systemic finding).
- Miss, 1: vd-g-washer-slice:1.

| # | item | guess | correct | hit | reason |
|---|------|-------|---------|-----|--------|
| 1 | vd-s-07#1 | 2 | 2 | HIT | SURFACE: centroid - R = 3 appears in 4 options and e^y in 3; options 2/4 are a swap pair; 2 combines the modal parts |
| 2 | vd-f-040 | 4 | 4 | HIT | MATH-from-options: negatives impossible for a volume; the rest reverse-engineer to pi*int_1^3 x^-2 dx (52pi/27 = differentiated, pi ln3 = unsquared, 26pi/81 = squared twice), which is 2pi/3 |
| 3 | vd-s-05#2 | 4 | 4 | HIT | SURFACE: centroid - 5 appears in 4 options, (y^2+1) in 3; 4 is the only one with the proper [R^2 - r^2] shape using the modal radii |
| 4 | vd-s-01#0 | 1 | 1 | HIT | MATH: sphere cross-section r = sqrt(R^2 - z^2) with R = 3 (inferred from the 9); centroid is a tie between 1 and 6 so surface does not decide |
| 5 | vd-f-014 | 4 | 4 | HIT | SURFACE: centroid - bounds 0..4 in dy and squares are modal, 2sqrt(y) appears twice; 4 combines them (narrow margin over option 1) |
| 6 | vd-f-006 | 5 | 5 | HIT | MATH: washer = disk of radius R minus disk of radius r; the other statements are false |
| 7 | vd-f-011 | 2 | 2 | HIT | MATH-from-options: inferred base y = x^2 up to y = 4; horizontal chord at height y is 2sqrt(y) (full width, not half) |
| 8 | vd-s-09#1 | 5 | 5 | HIT | MATH: curves x = sqrt(y), x = y/2 with axis x = 4 on the right; y/2 is the far curve so R = 4 - y/2, r = 4 - sqrt(y); swap pair 4/5 needed math |
| 9 | vd-f-017 | 2 | 2 | HIT | SURFACE: centroid - R = 4 in 3 options, x^2 in 3; 1/2 swap pair; 2 combines the modal parts |
| 10 | vd-f-019 | 2 | 2 | HIT | SURFACE: centroid - R = 5 in 2 options and x^2+1 in 2; 2/6 swap pair; 2 combines them |
| 11 | vd-s-10#0 | 1 | 1 | HIT | MATH: diameter = top - bottom = (2 - x^2) - x^2 on [-1, 1]; 2x^2 - 2 is negative there |
| 12 | vd-f-043 | 1 | 1 | HIT | SURFACE: the only option carrying a justification clause ('the axis is the top edge of the region') |
| 13 | vd-s-01#2 | 6 | 6 | HIT | MATH: sphere of radius 3, V = int_-3^3 pi(9 - z^2) dz (centroid agrees) |
| 14 | vd-f-025 | 6 | 6 | HIT | SURFACE: centroid - 2 - sqrt(y) in 2 options, r = 0 in 4; 6 combines them |
| 15 | vd-s-02#0 | 1 | 1 | HIT | SURFACE: centroid - 'disks perpendicular to the x-axis' in 3 options, 'in x' in 2, '0 to 2' in 2; 1 combines them |
| 16 | vd-s-08#1 | 2 | 2 | HIT | SURFACE: centroid - pi*int_0^1 in 3 options, (e^x)^2 in 2; 2 combines them |
| 17 | vd-g-washer-slice:1 | 5 | 1 |  | SURFACE/random: 12pi = 36pi/3 looks like the cone-vs-cylinder pair; otherwise no idea |
| 18 | vd-s-02#2 | 2 | 2 | HIT | SURFACE: centroid - pi*int_0^2 and (4 - 2x)^2 are modal; the standard disk shape |
| 19 | vd-f-045 | 4 | 4 | HIT | MATH: region under both y = x^2 and y = 2 - x above the x-axis: lower curve x^2 on [0,1], 2 - x on [1,2]; the 3/4 swap pair needed math |
| 20 | vd-s-07#2 | 4 | 4 | HIT | SURFACE: centroid - bounds 0..ln3 in 4 options, [3^2 - (e^y)^2] in 2; (math agrees: y = ln x, x = 3 about the y-axis) |
| 21 | vd-f-009 | 2 | 2 | HIT | MATH: axis y = -1 below the region: R = f + 1 > r = 1; swap pair 1/2 resolved by the sign |
| 22 | vd-f-030 | 5 | 5 | HIT | MATH-from-options: the axis y = 1 story explains every distractor (unsquared, +sqrt(x) shift sign, invented hole, dy version); centroid narrowly agrees |
| 23 | vd-f-026 | 6 | 6 | HIT | SURFACE: centroid - pi*int_0^2 in 3 options and (2x - x^2)^2 in 3; the standard disk shape |
| 24 | vd-s-07#3 | 1 | 1 | HIT | MATH: computed pi*int_0^ln3 (9 - e^(2y)) dy = pi(9 ln3 - (9 - 1)/2) = pi(9 ln3 - 4) |
| 25 | vd-s-04#1 | 4 | 4 | HIT | SURFACE: centroid - R = 4 in 4 options, y^2 in 3; (math agrees: lecture Ex. 3.6, x from y^2 to 4) |
| 26 | vd-f-033 | 5 | 5 | HIT | SURFACE: centroid - (sqrt(y) + 1)^2 in 2 options, '- 1^2' in 2, bounds 0..4 in 5; 5 combines them |
| 27 | vd-f-042 | 2 | 2 | HIT | SURFACE: the longest option, the only one with a full justification |
| 28 | vd-f-032 | 5 | 5 | HIT | SURFACE: centroid - bounds -1..2 in 5 options and [(y+2)^2 - (y^2)^2] in 2; 5 combines them |
| 29 | vd-f-044 | 6 | 6 | HIT | SURFACE: centroid - 'y from 0 to 4' in 4 options, R = sqrt(y) in 3, r = y/2 in 2; 6 combines them |
| 30 | vd-f-003 | 3 | 3 | HIT | MATH: equilateral triangle area (sqrt3/4)s^2 (formula recall; centroid also agrees) |
| 31 | vd-f-018 | 2 | 2 | HIT | SURFACE: centroid - 4 - x^2 in 2 options and r = 0 in 3; 2 combines them |

Hits: 30/31 (97%). Chance level ≈ 5.6/31 (18%).

## Certified

**Re-derived and mathematically correct.** This covers every unit: all 46 flash items vd-f-001…vd-f-046, generator `vd-g-washer-slice` (seeds 1–200), all 39 steps, and the finals of vd-s-01…vd-s-10. For each one:
- the correct answer, and any result line, are right;
- every distractor is wrong and matches its why;
- the check expression describes the problem as stated.

**Certified clean** (no blocking finding; non-blocking notes may still apply):
- Flash: vd-f-001, vd-f-002, vd-f-003, vd-f-004, vd-f-005, vd-f-006, vd-f-007, vd-f-008, vd-f-009, vd-f-013, vd-f-015, vd-f-016, vd-f-020, vd-f-021, vd-f-023, vd-f-027, vd-f-028, vd-f-034, vd-f-035, vd-f-036, vd-f-037, vd-f-039, vd-f-040, vd-f-041, vd-f-045.
- Generator: vd-g-washer-slice (the generator itself; seed 6 is in the systemic list).
- Steps: vd-s-01#1, vd-s-01#3, vd-s-03#1, vd-s-04#2, vd-s-06#1, vd-s-06#2, vd-s-06#3, vd-s-07#0, vd-s-07#3, vd-s-08#0, vd-s-09#0, vd-s-09#1, vd-s-09#2, vd-s-09#3, vd-s-10#0, vd-s-10#3.
- Finals: vd-s-01 … vd-s-10.

**Math correct but blocked; revise, then re-verify:** vd-f-010, vd-f-014, vd-f-017, vd-f-018, vd-f-019, vd-f-025, vd-f-026, vd-f-032, vd-f-033, vd-f-042, vd-f-043, vd-f-044, vd-s-02#0, vd-s-02#2, vd-s-04#0, vd-s-04#1, vd-s-05#0, vd-s-05#2, vd-s-07#1, vd-s-07#2, vd-s-08#1.

**Math correct; on the systemic "most-similar option" list, pending the orchestrator's policy:** vd-f-011, vd-f-012, vd-f-022, vd-f-024, vd-f-029, vd-f-030, vd-f-031, vd-f-038, vd-f-046, vd-s-01#0, vd-s-01#2, vd-s-02#1, vd-s-02#3, vd-s-03#0, vd-s-03#2, vd-s-03#3, vd-s-04#3, vd-s-05#1, vd-s-05#3, vd-s-06#0, vd-s-08#2, vd-s-10#1, vd-s-10#2.

## Uncertain

- I disagree with none of the stored answers.
- vd-s-04#0: the math is certain; the verdict is a judgment call. Both routes give 128π/5, so the option is correct under the shell method. The open question is whether the washers-topic context alone rules out that reading. I rate it blocking because neither the statement nor the prompt names the method, and the author's own vd-s-02 does name it ("with the disk method"). A one-line edit to the statement fixes it.
- Systemic centroid finding: the evidence is objective (60/105 vs ≈19 by chance), but it is project-wide (47–79% in every topic). Whether to require rewrites for the non-sampled items is a policy call for the orchestrator.
