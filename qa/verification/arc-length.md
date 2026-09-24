VERDICT: FAIL (6 blocking issues)

Topic `arc-length` (prefix `al`). Files: `content/flash/arc-length.ts` (al-f-001…046, generators al-g-line-length and al-g-root-shift) and `content/steps/arc-length.ts` (al-s-01…10, 46 steps). Verifier: a math-verifier instance that did not author these files. Authority: Lecture 5 Part 1 (§2.4), including the Common Mistakes box. Blind seed: 18.

**Automated checks:** `npx vitest run tests/content.test.ts -t "arc-length"` gives 59/59 passing (46 flash, 2 generators, 10 problems, aggregate). `tests/content-volume.test.ts -t "arc-length"` gives 2/2 passing.

**Correctness summary:** There is **no WRONG_ANSWER and no WRONG_CHECK**.
- I re-derived every correct option, `result` line and `final`, plus both generator families over their full ranges (m = 2..6, k = 2..5; all five (p, q) pairs).
- Every check expression (`lhs`, `expected`, integrand, bounds) matches the curve and interval as stated.
- I confirmed all 18 distinct stored lengths with my own tanh-sinh quadrature, independent of `checker/`. Every difference is below 1e-10, except the 2π improper case at 5e-8.

## Findings

Blocking:
- al-s-07#0 — DISTRACTOR_ALSO_CORRECT — The option "$L=\int_0^1\sqrt{1+(f'(x))^2}\,dx$ after swapping the letters $x$ and $y$" gives the correct length. Swapping the letters turns $x=e^y+\frac14e^{-y}$, $0\le y\le1$, into $y=e^x+\frac14e^{-x}$, $0\le x\le1$. That is the mirror image in $y=x$, and reflection preserves length. The integral is the stored integral with its dummy variable renamed. Numerically both equal 1.8763119681662 = $e-\frac1{4e}-\frac34$. The `why` ("different curve with different endpoints") is misleading. — Fix: replace it with a genuinely wrong setup, e.g. "$L=\int_0^1\sqrt{1+\left(\frac{1}{g'(y)}\right)^2}\,dy$, using the slope $dy/dx$" (arclength-variable-mismatch).
- al-s-04#3 — FORM_LEAK — Guessable: my blind HIT was for a surface reason (centre: −2π is a sign flip of 2π; 4π, π and π/2 are ×2 or ÷2 of it). Worse, the problem statement says "show that the unit circle … has perimeter $2\pi$", so the "Evaluate" step's answer is printed in the statement. — Fix: state the problem as "find the perimeter". Then either ask for the quarter-arc value $\int_0^1\frac{dx}{\sqrt{1-x^2}}$ (π/2; distractors π/4, π, −π/2, 1), or accept this step as a non-diagnostic verification step and say so.
- al-s-01#2 — FORM_LEAK — Guessable: my blind HIT was picked by centre ($x^2/2$, $+$ and the halves are the modal parts; math only confirmed the sign). Each distractor is a single edit of the key. Both mechanical heuristics also pick it. — Fix: add second-order distractors that cluster around a wrong centre, e.g. $\left(\frac{x^2}{2}-\frac{1}{2x}\right)^2$, $\left(\frac{x}{2}-\frac{1}{2x}\right)^2$, $\left(\frac{x^2}{4}-\frac{1}{4x^2}\right)^2$.
- al-s-05#2 — FORM_LEAK (form parity, by inspection; not in the blind sample) — The key is the only option that does not begin with "Because", and the only one that writes $|\csc 2x|$. That is a unique justification clause. — Fix: give every option the same frame, e.g. "On this interval …, so $|\csc 2x|=\csc 2x$", with the wrong reasons being $\cos 2x>0$, $x>0$, $\csc^2\ge1$ and "$\sqrt{u^2}=u$".
- al-f-008 — FORM_LEAK (form parity, by inspection; the author flagged it) — The key is the only hedged or moderate statement. Two distractors say "Always", one says "never", and one claims the lengths differ, so test-wise elimination leaves only the key. — Fix: use non-absolute misconceptions, e.g. "Use $y=f(x)$ unless the curve fails the vertical-line test" and "Use whichever variable has the shorter interval of integration, since both give the same length". The second one is still wrong as a selection rule.
- SYSTEMIC — FORM_LEAK — On the 92 static units, a no-math centroid guesser (bag-of-tokens Jaccard, never sees the question) scores 73% against 18% chance. An edit-distance medoid scores 67%. Both pick the key **uniquely** in the 53 units below, because every distractor is the key plus exactly one mutation (a star pattern with no second cluster). The generators are fine: al-g-root-shift is 0/20 seeds on both heuristics; al-g-line-length is 16/20 on Jaccard but 0/20 on edit distance, so it is not listed. — Fix: add one or two second-order distractors per unit that sit around a plausible wrong centre, and balance binary features (sign, root or no root, limits). Then re-run the blind test with a new seed. Affected ids: al-f-001, 002, 004, 005, 006, 010, 012, 015, 019, 021, 022, 023, 024, 025, 028, 029, 031, 032, 038, 041; al-s-01#0, 01#1, 01#2, 01#3, 02#2, 02#3, 02#4, 03#0, 03#2, 03#3, 03#4, 03#5, 04#0, 04#2, 04#3, 05#0, 05#1, 05#3, 05#4, 06#0, 06#1, 06#2, 06#3, 07#1, 07#2, 07#3, 08#0, 08#1, 08#2, 09#1, 09#3, 10#1, 10#2. Weaker evidence (Jaccard only): al-f-009, 011, 014, 020, 027, 030, 037, 039, 043, 046, al-s-03#1, 09#0, 10#0. Edit distance only: al-f-008, al-f-018.

Non-blocking:
- al-f-007 — WRONG_TAG — Options "$x$ is positive…" and "$\cos 2x>0$…" use theta-interval-sign, which is specific to trig-sub. Use abs-sign-on-interval.
- al-f-022 — WRONG_TAG — Option $\int(-\sec x)\,dx$ uses theta-interval-sign; use abs-sign-on-interval.
- al-s-05#2 — WRONG_TAG — Options "$x>0$…" and "$\cos 2x>0$…" use theta-interval-sign; use abs-sign-on-interval.
- al-s-06#1 — WRONG_TAG — Option $-\sec x$ uses theta-interval-sign; use abs-sign-on-interval.
- al-f-028 — WRONG_TAG — Option $(1+g')^2$ uses algebra-error; use radicand-as-binomial-square.
- al-f-029 — WRONG_TAG — Option $(1+f')^2$ uses algebra-error; use radicand-as-binomial-square.
- al-f-030 — WRONG_TAG — Option $(1+f')^2$ uses algebra-error; use radicand-as-binomial-square.
- al-s-02#0 — WRONG_TAG — Options $y=-x^{3/2}$ (sign-error) and $y=\pm x^{3/2}$ (interval-not-respected) should both use wrong-branch-chosen.
- al-s-03#0 — WRONG_TAG — Option $x=\pm y^{2/3}$ uses algebra-error; use wrong-branch-chosen.
- al-s-04#0 — WRONG_TAG — Option $-\sqrt{1-x^2}$ uses sign-error; use wrong-branch-chosen.
- al-f-044 — WRONG_TAG — Option π/3 ("arcsin ½ taken as π/3") uses inverse-trig-confused, which is a derivative tag. Use inverse-trig-value-wrong; its description uses this exact example.
- al-s-04#3 — WRONG_TAG — Options π and 4π ("arcsin 1 misremembered") use inverse-trig-confused; use inverse-trig-value-wrong.
- al-s-10#3 — WRONG_TAG — Option 1/3 uses arithmetic-error. Use constant-not-integrated: writing $\int(x^2+1)\,dx=\frac{x^3}{3}+1$ gives $\frac43-1=\frac13$.
- al-s-10#0 — EXPLANATION — The `why` for $2x(x^2+2)^{1/2}$ says "the ⅓ in front was dropped". Dropping only the ⅓ gives $\frac32\cdot2x\sqrt{x^2+2}=3x\sqrt{x^2+2}$ (checked numerically). $2x\sqrt{x^2+2}$ needs both ⅓ and 3/2 dropped. — Fix: change the option to $3x(x^2+2)^{1/2}$.
- al-f-028 — EXPLANATION — For $\left(\frac{3\sqrt y}{2}+\frac{1}{2\sqrt y}\right)^2$: dropping the ⅓ gives $g'=\frac32\sqrt y-\frac{1}{2\sqrt y}$ and $1+(g')^2=\frac94y-\frac12+\frac1{4y}$. That is not a perfect square (4.125 vs 6.125 at y = 2). The option needs a second, pattern-flip slip that the `why` does not mention. — Fix: reword the `why`, or replace the option.
- al-f-025 — EXPLANATION — For $\int_1^2\left(\frac{x^3}{6}+\frac1{2x}\right)dx$, the `why` says "square built from f with its middle sign flipped". That would give $\int\left(\frac{x^3}{6}-\frac1{2x}\right)dx$; the option is just $\int f\,dx$. — Fix: align the `why` with the option (or vice versa).
- al-f-007 — MINOR — Three distractors use absolute language ("every real number", "every expression", "any interval"). Elimination leaves a 50/50 between the key and the $\cos 2x$ option, so it is not guessable, but the wording should be neutralized.
- al-f-004 — MINOR — The chord option is not an integral while the other five are. It is an odd distractor, but it does not expose the key.
- al-s-09#3/#4/final — MINOR (SCOPE judged acceptable) — $x^{-1/3}$ is unbounded at 0, so Theorem 5.1's hypothesis fails and the integral is improper. The lecture assigns this problem (Practice 1), and the recap says honestly that it converges. Optionally, add to the #4 explanation that $(3/2)x^{2/3}$ is continuous at 0. al-f-017 only asks for the integrand on [0.1, 0.9], so it is unaffected.

## Blind-option test

`npx tsx scripts/blind-sample.ts arc-length 18` gave 33 of 94 units (35%): flash items, one instance per generator (seed 1) and every step. I guessed from the printed option lists only, before opening any content file or the key. **Hits: 32/33 (97%). Chance ≈ 5.9/33 (18%).** Reasons: 30 MATH (I reconstructed the problem from the options and solved it), 1 CONCEPT, 1 SURFACE, 1 partly SURFACE. The one miss was al-f-046: its key −sec x depends on the interval [2π/3, 5π/6], so it is not guessable.

| # | item | guess | correct | hit | reason |
|---|------|-------|---------|-----|--------|
| 1 | al-s-03#1 | 2 | 2 | HIT | MATH: y^{4/3}=(y^{2/3})^2 reveals curve x=y^{2/3}; option set targets (g')^2=(4/9)y^{-2/3} |
| 2 | al-f-018 | 6 | 6 | HIT | MATH: distractor (x^2+2)^3/9 reveals f=(1/3)(x^2+2)^{3/2}; f'=x*sqrt(x^2+2); 1+f'^2=(x^2+1)^2; root -> x^2+1 |
| 3 | al-s-03#2 | 5 | 5 | HIT | MATH: lecture Ex 5.3: x=y^{2/3}, y-limits 1..8, dy, root of 1+(4/9)y^{-2/3} |
| 4 | al-s-03#5 | 1 | 1 | HIT | MATH: Ex 5.2 value (8/27)(10^{3/2}-(13/4)^{3/2}) = (80sqrt10-13sqrt13)/27 |
| 5 | al-f-027 | 3 | 3 | HIT | MATH reconstruction: line slope 2 over interval length 3 -> 3sqrt5; 6 forgot 1, 15 no root, 3sqrt3 not squared, 9 split root |
| 6 | al-f-014 | 1 | 1 | HIT | MATH: distractor y^3/6+1/(2y) reveals g; g'=y^2/2-1/(2y^2) squared under the root |
| 7 | al-f-034 | 2 | 2 | HIT | MATH: 1+(a-b)^2 with ab=1/4 equals (a+b)^2 (lecture perfect-square trick) |
| 8 | al-s-10#1 | 1 | 1 | HIT | MATH: 1+x^2(x^2+2)=x^4+2x^2+1=(x^2+1)^2 |
| 9 | al-s-02#3 | 2 | 2 | HIT | MATH: u=1+9x/4, dx=(4/9)du, x=1->13/4, x=4->10 |
| 10 | al-s-04#3 | 5 | 5 | HIT | SURFACE: centre of cluster (-2pi is sign flip of 2pi; 4pi, pi, pi/2 are x2 or /2 of 2pi); also unit-circle circumference |
| 11 | al-f-021 | 1 | 1 | HIT | MATH: full circle = 4 x quarter; sqrt(1+x^2/(1-x^2))=1/sqrt(1-x^2) (factor 4 also in most options) |
| 12 | al-f-037 | 1 | 1 | HIT | MATH reconstruction: x^3/6+1/(2x) on [2,3] = 13/4; 37/12 abs dropped, 49/12 split root, 13/3 F(3) only, 11/4 lower sign slip, 115/12 forgot /3 |
| 13 | al-s-06#1 | 4 | 4 | HIT | MATH: y=ln(cos x) type: sqrt(1+tan^2)=/sec x/=sec x on the interval |
| 14 | al-f-046 | 3 | 1 |  | MATH: sqrt(1+tan^2 x)=sec x (positive on interval) |
| 15 | al-s-03#3 | 1 | 1 | HIT | MATH: sqrt(1+(4/9)y^{-2/3}) = sqrt(9y^{2/3}+4)/(3y^{1/3}) |
| 16 | al-f-012 | 5 | 5 | HIT | MATH: f=ln x (from sqrt(1+(ln x)^2) distractor), f'=1/x, sqrt(1+1/x^2) |
| 17 | al-s-02#1 | 4 | 4 | HIT | MATH: x^3=f^2 reveals f=x^{3/2}; target (f')^2=(9/4)x |
| 18 | al-s-08#1 | 2 | 2 | HIT | MATH: f=(x^4-1)^{3/2}, f'=6x^3 sqrt(x^4-1), (f')^2=36x^6(x^4-1) |
| 19 | al-s-03#4 | 5 | 5 | HIT | MATH: u=4+9x, du=9dx, sqrt(1+9x/4)=sqrt(4+9x)/2 -> (1/18) int sqrt u du; x=1..4 -> u=13..40 |
| 20 | al-s-09#2 | 3 | 3 | HIT | MATH: astroid 1+(y')^2=x^{-2/3}; root = x^{-1/3} (options are root-level integrands) |
| 21 | al-f-009 | 4 | 4 | HIT | MATH: f=(2/3)x^{3/2} (from (4/9)x^3 distractor), f'=sqrt x, sqrt(1+x) |
| 22 | al-f-042 | 5 | 5 | HIT | MATH reconstruction: y=x^{3/2} on [0,4/3]: (8/27)(8-1)=56/27; 64/27 lower term dropped, 14/3 missing 4/9, 28/9 missing 2/3, 21/2 used 9/4, 10/3 no root |
| 23 | al-s-09#3 | 4 | 4 | HIT | MATH: astroid = 4 x first-quadrant arc, integrand x^{-1/3} |
| 24 | al-s-08#0 | 4 | 4 | HIT | MATH: chain rule on (x^4-1)^{3/2} |
| 25 | al-s-01#2 | 4 | 4 | HIT | PARTLY SURFACE: x^2/2 and 1/(2x^2) terms appear in two options (centre); MATH: 1+(a-b)^2=(a+b)^2 needs the + sign |
| 26 | al-s-04#1 | 3 | 3 | HIT | MATH: 1+x^2/(1-x^2)=1/(1-x^2) |
| 27 | al-s-09#4 | 1 | 1 | HIT | MATH: astroid length 4*(3/2)=6 (3/2 = quarter arc) |
| 28 | al-s-02#2 | 1 | 1 | HIT | MATH: y=x^{3/2}, 1<=x<=4, sqrt(1+9x/4) dx |
| 29 | al-f-019 | 1 | 1 | HIT | MATH: same setup y=x^{3/2} on [1,4] |
| 30 | al-f-017 | 3 | 3 | HIT | MATH: astroid integrand simplifies to x^{-1/3} (options are root-level integrands) |
| 31 | al-s-01#4 | 3 | 3 | HIT | MATH reconstruction: x^3/6+1/(2x) on [1,2] = 17/12; 13/12 F(2) only, 11/12 abs dropped, 3/4 added F(1), 15/4 forgot /3 |
| 32 | al-f-003 | 6 | 6 | HIT | CONCEPT: ds = sqrt(dx^2+dy^2), hypotenuse of the small right triangle |
| 33 | al-s-07#4 | 1 | 1 | HIT | MATH: practice 5: [e^y - e^{-y}/4] from 0 to 1 = e - 1/(4e) - 3/4 |

**Guessable (HIT for a surface reason): al-s-04#3, al-s-01#2** (both are Findings above).
- The author-flagged text items al-f-003, al-f-007 and al-f-008 were judged as follows:
  - al-f-003 was sampled and hit by concept; no surface cue decides it.
  - al-f-007 is not guessable: absolute-language elimination leaves a 50/50 (MINOR above).
  - al-f-008 is a form-parity leak (Findings above).
- A mechanical cross-check of the sample found 16 units that both heuristics pick uniquely. They are covered by the SYSTEMIC finding.

## Certified

**Re-derived and mathematically correct: every unit.** This covers:
- flash al-f-001…046;
- al-g-line-length over m = 2..6, k = 2..5, b ∈ {±1, ±2, ±3}. All options are distinct; for m = 3 the not-squared option is the integer 2k;
- al-g-root-shift for all five (p, q) pairs;
- all 46 steps of al-s-01…10, with their result lines, the 10 finals and the recaps.

For each unit, the key is right, every distractor is wrong (except al-s-07#0), and the check describes the stated problem.

**Certified clean (no blocking finding; non-blocking notes may apply):** al-f-003, al-f-007, al-f-009, al-f-011, al-f-013, al-f-014, al-f-016, al-f-017, al-f-018, al-f-020, al-f-026, al-f-027, al-f-030, al-f-033, al-f-034, al-f-035, al-f-036, al-f-037, al-f-039, al-f-040, al-f-042, al-f-043, al-f-044, al-f-045, al-f-046, al-s-01#4, al-s-02#0, al-s-02#1, al-s-03#1, al-s-04#1, al-s-07#4, al-s-09#0, al-s-09#2, al-s-09#4, al-s-10#0, al-s-10#3; both generators; all 10 finals.

## Uncertain

None. No stored answer disagrees with my derivation. Judgement calls the orchestrator may overrule:
- the astroid's improper integral was treated as in scope (MINOR), because the lecture assigns the problem;
- al-f-008 and al-s-05#2 were flagged FORM_LEAK by inspection, since they were not in the blind sample.
