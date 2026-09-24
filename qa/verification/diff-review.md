VERDICT: FAIL (29 blocking issues)

Topic `diff-review` (prefix `dr`). Files: `content/flash/diff-review.ts` (54 flash items dr-f-001…054, 4 generators) and `content/steps/diff-review.ts` (4 problems, 19 steps). Verifier: math-verifier (not the author). Date: 2026-09-24.

Automated checks (recorded first): `npx vitest run tests/content.test.ts -t "diff-review"` → 63 passed; `npx vitest run tests/content-volume.test.ts -t "diff-review"` → 2 passed. Green does not mean correct, so every item was re-derived by hand (below).

**Correctness summary.** I re-derived every flash answer, every generator family over its full coefficient range (k = 2..9; a ∈ {2,3,5,7} × k = 2..4; the tan domain [0.1/k, 1.2/k]), every step answer and `result` line, and all 4 finals. Every stored `correct` option is right, and every `check.of` / `lhs` / `expected` matches the problem as stated. I also confirmed the lecture seeds against `reference/lectures/lecture01.pdf` p.1 (10(c) is $(\tan^{-1}(x))^2$). **No WRONG_ANSWER and no WRONG_CHECK.** The failure is almost entirely **form**: the distractors are single-mistake mutations of the key, so the key is the unique "centre" of the option set. That is how I scored 27/27 on the blind test, 19 of them from surface cues alone.

## Findings

### Blocking: DISTRACTOR_ALSO_CORRECT
- dr-f-051 — DISTRACTOR_ALSO_CORRECT — The prompt "Which function can be differentiated WITHOUT the chain rule?" is literally true for three options, not one. (1) $e^{2x} = (e^2)^x$ is $a^x$ with $a = e^2$, so the table rule this topic teaches (dr-f-041) gives $e^{2x}\ln e^2 = 2e^{2x}$ with no chain rule. The product rule on $e^x\cdot e^x$ also works. (2) $(x^3+1)^5$ can be expanded binomially into a degree-15 polynomial and differentiated with the power rule alone. The stored key $x^2e^x$ is right only under the unstated reading "as written, which is not a composition". — Fix: reword to "As written, which function is NOT a composition $f(g(x))$ (so the chain rule is not needed)?". Replace $e^{2x}$ and $(x^3+1)^5$ with compositions that have no elementary rewrite, e.g. $e^{\sin x}$, $\cos\sqrt{x}$. See also the odd-one-out leak below.

### Blocking: blind-test guessable items (FORM_LEAK; hit plus a surface reason)
General recipe for all of these. Each distractor is the key plus one mutation, so the key is one edit from almost every other option. Fix it by adding 1–2 **second-order** distractors (two mistakes) that sit one edit away from a plausible *wrong* answer, usually the sign-flipped or chain-dropped key. Also balance each binary feature (sign, chain factor, exponent) so the key's value is not the majority. Then re-run the blind test.
- dr-f-004 — FORM_LEAK — Key $2e^{2x}$ is one edit from $e^{2x}$, $2e^{2x}-1$, $2xe^{2x}$ and $\frac12e^{2x}$ (4 of 5 distractors). — Fix: replace $2xe^{2x-1}$ with $e^{2x}-1$ (chain dropped and constant kept), so $e^{2x}$ is as central as the key.
- dr-f-005 — FORM_LEAK — 5 of 6 options have the form "$\ln x + \square$". The key's □ = 1 is one edit from $x$, $-1$, $\frac1x$ and the empty slot. — Fix: add a competing cluster, e.g. $\ln x - x$ (sign slip plus $(\ln x)' = 1$).
- dr-f-009 — FORM_LEAK — Key is one edit from the chain-dropped, sign-flipped, arctan-form and "outer evaluated at $x$" options (4 of 5). — Fix: add the sign-flipped chain-dropped option (two mistakes), so the chain-dropped form is equally central.
- dr-f-010 — FORM_LEAK — Key $\frac{2\arcsin x}{\sqrt{1-x^2}}$ is one edit from $2\arcsin x$, $\frac{2}{\sqrt{1-x^2}}$, its ± twin and the $1+x^2$ form. — Fix: add $-\frac{2}{\sqrt{1-x^2}}$ and/or $\frac{2}{1+x^2}$ so that $\frac{2}{\sqrt{1-x^2}}$ becomes a rival centre.
- dr-f-029 — FORM_LEAK — Key $\frac{x}{\sqrt{x^2+9}}$ is one edit from $\frac{2x}{\sqrt{x^2+9}}$, $x\sqrt{x^2+9}$ and $\frac{x}{(x^2+9)^{3/2}}$. — Fix: add $2x\sqrt{x^2+9}$ and $\frac{2x}{(x^2+9)^{3/2}}$.
- dr-f-032 — FORM_LEAK — Key $-2xe^{-x^2}$ is one edit from $2xe^{-x^2}$, $-2xe^{-2x}$ and $e^{-x^2}$, and 4 of 6 options are negative. — Fix: add $2xe^{-2x}$ (sign slip plus exponent replaced) so the signs balance.
- dr-f-033 — FORM_LEAK — Key $\frac{1}{x\ln x}$ is one edit from $\frac{1}{\ln x}$, $\frac1x$, $\frac{1}{x^2\ln x}$ and $x\ln x$. — Fix: add two-mistake options such as $\frac{1}{x^2}$ and $\frac{x}{\ln x}$.
- dr-f-036 — FORM_LEAK — Key shares $\pi x^{\pi-1}$ with 3 options and $\pi^x\ln\pi$ with 2, and each distractor changes one term. The "+2π" option also reveals the $\pi^2$ term. — Fix: add two-term errors, e.g. $x^{\pi}\ln x + \pi^{x}$ and $\pi x^{\pi-1} + x\pi^{x-1}\ln\pi$.
- dr-f-041 — FORM_LEAK — Key $a^x\ln a$ is one edit from $a^x$, $\frac{a^x}{\ln a}$ and $a^x\ln x$. The author-flagged $\frac{a^{x+1}}{x+1}$ needs two unrelated errors and is easy to eliminate. — Fix: replace it with $\frac{a^x}{\ln x}$, which sits next to both $a^x\ln x$ and $\frac{a^x}{\ln a}$.
- dr-f-042 — FORM_LEAK — Key $\frac{1}{x\ln a}$ is one edit from $\frac1x$, $\frac{\ln a}{x}$ and $\frac{1}{x\ln x}$. — Fix: add a second cluster, e.g. $\frac{\ln x}{x}$ or $\frac{x}{\ln a}$.
- dr-f-046 — FORM_LEAK — Key is one edit from its sign twin and from $\frac{1}{\sqrt{x^2-1}}$, and positive options outnumber negative ones. — Fix: add $-\frac{1}{\sqrt{x^2-1}}$ (sign slip and $|x|$ dropped). Do NOT use $\frac{1}{x\sqrt{x^2-1}}$: it equals the key for $x>1$.
- dr-f-049 — FORM_LEAK — Key $f'(g(x))\,g'(x)$ is one edit from $f'(g(x))$, $f'(x)g'(x)$, $g'(f(x))f'(x)$ and $f'(g'(x))$. — Fix: add $g'(f(x))$ and $g'(f'(x))$ so the swapped form is equally central.
- dr-f-051 — FORM_LEAK — Odd one out: the key $x^2e^x$ is the only product and the only non-composition, so it can be picked without reading the prompt. — Fix: along with the DAC fix, include products that contain an inner function (e.g. $x\sin(2x)$, $x^2e^{3x}$), so "product" no longer singles out the key.
- dr-s-01#2 — FORM_LEAK — Each of the 4 distractors differs from the key in exactly one slot: numerator order, plus sign, $g$ not squared, $(g')^2$. — Fix: replace the weak $(-\sin x)^2$ option (author-flagged) with two-slot errors, e.g. plus sign *and* unsquared denominator.
- dr-s-02#0 — FORM_LEAK — Key $(x^2+x+1)^{-1/3}$ is one edit from $(\cdot)^{1/3}$, $(\cdot)^{-3}$ and $-(\cdot)^{1/3}$. — Fix: add $(x^2+x+1)^{3}$ (reciprocal exponent and lost sign) and/or $x^{2/3}+x^{1/3}+1$.
- dr-s-02#3 — FORM_LEAK — Key shares $-\frac13$ with 3 options, exponent $-\frac43$ with 3, and $(2x+1)$ with 4. — Fix: add $-\frac13(x^2+x+1)^{-1/3}$ (exponent kept and chain dropped) and $\frac13(x^2+x+1)^{-1/3}(2x+1)$.
- dr-s-03#4 — FORM_LEAK — Key $-\frac{1}{2\sqrt{x-x^2}}$ is one edit (sign, factor 2, or form) from every other option. — Fix: add $\frac{1}{\sqrt{x-x^2}}$ and $\frac{\sqrt{x}}{2\sqrt{1-x}}$ so the sign is balanced.
- dr-g-exp-kx — FORM_LEAK — Seed 1 (k = 7) was a blind hit via centre, and every seed has the same structure. Key $ke^{kx}$ is one edit from $e^{kx}$, $\frac1k e^{kx}$ and $k^2e^{kx}$, and $k$ is the middle coefficient of {1/k, 1, k, k²}. — Fix: add a second cluster, e.g. $kxe^{kx}$ (inner function instead of its derivative) and $xe^{kx-1}$, or draw distractors per seed from a larger pool.
- dr-g-cos-kx — FORM_LEAK — Seed 1 (k = 7) was a blind hit via centre. Key $-k\sin(kx)$ is one edit from $k\sin(kx)$, $-\sin(kx)$, $-k\cos(kx)$ and $-k^2\sin(kx)$, and 4 of 6 options are negative. — Fix: balance sign and coefficient, e.g. {$-k\sin$, $k\sin$, $-\sin$, $\sin$, $-k^2\sin$, $k^2\sin$}, with the cos/integral variants drawn from a pool.

### Blocking: FORM_LEAK found in form review (not in the blind sample)
- dr-f-002 — FORM_LEAK — Author-flagged "centre" concern: **confirmed**. $-\frac{2}{x^3}$ is one edit from $\frac{2}{x^3}$, $-\frac{2}{x}$, $-\frac{3}{x^3}$ and $-\frac{2}{x^2}$, and a no-math edit-distance medoid picks it uniquely. — Fix: add $\frac{2}{x^2}$ or $\frac{3}{x^3}$ (two mistakes) to balance sign and exponent.
- dr-f-013 — FORM_LEAK — Author-flagged: **confirmed (moderate)**. The core $12x^3-4x$ appears in 3 of 6 options (+7, +1, bare). The power-rule part is given away by majority, and only the easiest decision (constant → 0) remains. — Fix: give the constant variants different cores (e.g. $12x^3-4x^2+7$ or $3x^3-2x+1$) so the key's core is not the majority.
- dr-f-050 — FORM_LEAK — The key is the only "Chain rule: outer function …, inner function …" option. The distractors give themselves away with naive qualifiers ("Power rule only … with no extra factor", "Split the root …", "keep it under the root"), and the medoid guesser picks the key uniquely. — Fix: add a chain-rule option with a wrong decomposition, as dr-s-04#0 does (e.g. "Chain rule: outer $\sqrt{u} + \sin u$, inner $u = x^2$"). Drop the "only / no extra factor" wording or use matching wording in the key.
- dr-f-052 — FORM_LEAK — The prompt ("In class we write both $\sin^{-1}x$ and $\arcsin x$") points straight at the only option that says $\sin^{-1}x = \arcsin x$. The key is also the longest option and the only one with a precise range. — Fix: use a neutral prompt ("What does $\sin^{-1}x$ mean?") and parallel options of similar length ("$\sin^{-1}x = \dots$, i.e. …").
- dr-f-053 — FORM_LEAK — Options 0 and 4 are the **same function**: $\frac{\sqrt x}{x} \equiv \frac{1}{\sqrt x}$ (confirmed numerically). A student can eliminate both, leaving 3 of 5. — Fix: replace option 0 with a distinct error, e.g. $\frac{df}{dx} = -\frac{1}{2\sqrt x}$ or $\frac{df}{dx} = \frac12x^{-3/2}$. The left-hand sides before `=` are fine (the parser ignores them).
- dr-s-02#1 — FORM_LEAK — Only one chain-rule option, and the qualifiers "with no extra factor" and "because there is an exponent" give the distractors away. — Fix: add a chain-rule option with a wrong decomposition, e.g. "Chain rule: outer $u^{-3}$, inner $u = \sqrt[3]{x^2+x+1}$". Do NOT use outer $\sqrt[3]{u}$ with inner $\frac{1}{x^2+x+1}$: that decomposition is valid.
- dr-s-02#4 — FORM_LEAK — Options 1 and 2 are the **same function**: $-\frac{2x+1}{3u^{-4/3}} \equiv -\frac{(2x+1)u^{4/3}}{3}$ (confirmed numerically). Option 1 also visibly still has a negative exponent although the prompt asks for none. So 2 of 4 distractors can be eliminated by inspection. — Fix: keep one of them and add a distinct error, e.g. $-\frac{2x+1}{3(x^2+x+1)^{3/4}}$ (exponent inverted) or $-\frac{2x+1}{(x^2+x+1)^{4/3}}$ (the 3 dropped).
- dr-s-03#0 — FORM_LEAK — Only one chain-rule option, and "nothing else is needed" / "Power rule only, since … the only power present" give the distractors away. — Fix: add "Chain rule: outer function $\sqrt{u}$, inner function $u = \arccos x$" (inner and outer reversed) as a distractor.

### Blocking: systemic convergence leak (FORM_LEAK, topic-wide)
- TOPIC-WIDE (derivative flash items, generators, and the step-problem steps that compute derivatives or simplify) — FORM_LEAK — Design-level convergence cue: each distractor is the key plus exactly one mutation, so the key is the unique centre of the option set. Evidence from the blind test: 19 of 27 picks were made on centre / odd-one-out alone, all correct. Evidence from a mechanical no-math guesser (it picks the option with the smallest total token edit distance to the others): 47.6/73 expected hits (65%) against chance 13.1 (18%). It picks the key **uniquely** in 42 of 73 static units and in **80/80** generator instances (4 generators × seeds 1–20). Units it picks uniquely that are not already listed above: dr-f-006, dr-f-007, dr-f-008, dr-f-011, dr-f-015, dr-f-016, dr-f-017, dr-f-018, dr-f-019, dr-f-022, dr-f-024, dr-f-025, dr-f-026, dr-f-027, dr-f-030, dr-f-035, dr-f-037, dr-f-039, dr-f-048, dr-s-01#0, dr-s-01#1, dr-s-01#3, dr-s-01#4, dr-s-03#2, dr-s-03#3, dr-s-04#1, dr-s-04#2, dr-s-04#3, and all seeds of dr-g-a-pow-kx and dr-g-tan-kx. Examples: in dr-f-022, $\cot x$ is the only function that also appears with a sign twin ($-\cot x$). In dr-f-039, 3 of 4 csc-options carry a minus sign. In dr-f-048, all four distractors are single mutations of the quotient rule. — Fix: apply the recipe above to every listed unit, then re-run the blind test with a fresh seed. The scan script is at `/tmp/claude-0/-home-user-Calc2Study/6ed826b6-ed8f-5336-b2e6-6799eb8df213/scratchpad/dr-scan.ts` (session scratchpad; worth copying into `scripts/` as a regression aid).

### Non-blocking: WRONG_TAG (an exact-fit tag exists in `content/mistakes.ts`)
- dr-f-004 — WRONG_TAG — Option $2xe^{2x}$ is tagged `exponential-as-power`, but its own `why` ("the exponent 2x itself was brought down; the chain-rule factor is its derivative, 2") describes `inner-function-not-derivative`. — Retag.
- dr-f-024 — WRONG_TAG — Option $x^2\sec(x^2)\tan(x^2)$ is tagged `chain-rule-missing`. It multiplies by the inner function instead of its derivative → `inner-function-not-derivative`.
- dr-f-054 — WRONG_TAG — Option "$x^3$" is tagged `chain-rule-missing`. The why says "the inner function itself" → `inner-function-not-derivative`.
- dr-f-036 — WRONG_TAG — Option $x^{\pi}\ln x + \pi^x\ln\pi$ is tagged `exponential-as-power`. The mistake is treating a power as an exponential → `power-as-exponential` (its description uses exactly $x^\pi \to x^\pi\ln x$).
- dr-s-02#1 — WRONG_TAG — Option "Exponential rule … because there is an exponent" is tagged `exponential-as-power`. Its why says the variable is in the base → `power-as-exponential`.
- dr-f-049 — WRONG_TAG — Option $g'(f(x))\,f'(x)$ is tagged `formula-swapped`. It is inner and outer reversed → `composition-misread` ("f(g(x)) with the wrong inner/outer function").
- dr-s-04#0 — WRONG_TAG — Option "Chain rule: outer $\tan^{-1}u$, inner $u = x^2$" is tagged `algebra-error`. This is exactly `composition-misread` ("Read (f(x))² as f(x²)").
- dr-s-01#0 — WRONG_TAG — Option "Differentiate top and bottom separately: $\frac{\cos x}{-\sin x}$" is tagged `technique-wrong`. The exact tag is `quotient-of-derivatives`.
- dr-s-02#3 — WRONG_TAG — Option with exponent $-\frac23$ is tagged `power-rule-exponent` ("kept or added 1"), which it is neither. → `arithmetic-error` (see the EXPLANATION item).

### Non-blocking: EXPLANATION
- dr-s-02#3 — EXPLANATION — The why for $-\frac13(x^2+x+1)^{-2/3}(2x+1)$ says "the exponent was raised to $-\frac23$ instead of lowered". That is false: $-\frac23 < -\frac13$, so the exponent was lowered, just by $\frac13$ instead of 1. — Fix: "The exponent was lowered by only $\frac13$; the power rule subtracts 1: $-\frac13 - 1 = -\frac43$."
- dr-s-01#0 — EXPLANATION — The why for "Quotient rule with $f = 1+\cos x$ (top), $g = \sin x$ (bottom)" says the swap only "changes the sign of the numerator". Swapping the roles actually differentiates $\frac{1+\cos x}{\sin x}$: the numerator becomes $-(1+\cos x)$ **and** the denominator becomes $\sin^2 x$. — Fix the wording. This distractor is also weak: the "(top)/(bottom)" labels contradict the displayed statement.

### Non-blocking: MINOR
- dr-f-001, dr-f-003, dr-f-029 — MINOR — Exponent-arithmetic slips ($\frac34-1 \to \frac14$; $\frac23-1 \to \frac13$; $\frac12-1 \to -\frac32$) are tagged `power-rule-exponent`, whose description is "kept the original exponent (or added 1)". `arithmetic-error` fits better. The why texts themselves are accurate.
- dr-f-045, dr-f-046, dr-s-04#2 — MINOR — $\sec^2x$ and $\sec x\tan x$ (derivative of the function, not of its inverse) are tagged `inverse-trig-confused`, whose description covers the three inverse-trig derivative shapes. `formula-swapped` fits better.
- dr-f-005 vs dr-f-034 — MINOR — The same slip (factor $f$ dropped from the $fg'$ term) is tagged `product-rule-missing-term` in one item and `algebra-error` in the other. Pick one.
- dr-f-052 — MINOR — $\sin(x^{-1})$ is tagged `algebra-error`; `composition-misread` fits better.
- dr-f-038 — MINOR — The why for $-\sec x\tan x$ says "$\frac{\sin x}{\cos^2 x}$ is positive here". There is no "here" in the question. Suggest: "$-(\cos x)^{-2}\cdot(-\sin x)$: the two minus signs cancel."
- dr-f-049 — MINOR — The explanation's "(in class: $g'(x)\cdot f'(g(x))$)" cannot be checked against the lecture text (which only shows $f(g(x))g'(x)$ in the substitution rule). Remove it or cite the source.
- dr-f-044 — MINOR (test robustness only) — The distractor $\frac{1}{|x|\sqrt{x^2-1}}$ is NaN everywhere on the sampling domain [0.1, 0.9], so the automated distinctness check is vacuous for it. It is symbolically distinct, and students are not affected.
- dr-f-054 — note (no action) — The text options carry the full derivative $\sec^2(x^3)\cdot\square$ as `expr`. I verified this is a sound check: the correct expr equals $\frac{d}{dx}\tan(x^3)$ and every distractor is distinct.

## Blind-option test

`npx tsx scripts/blind-sample.ts diff-review 12` → **27 of 77 units (35%)** (54 flash + 4 generators + 19 steps). I guessed before opening any content file or the key. **Hits: 27/27 (100%)**; chance ≈ 4.8/27 (18%). Reasons marked SURFACE are those where a no-calculus cue (centre / odd one out) alone picked the option. MATH means I had to apply the rule to decide.

| # | item | guess | correct | hit | reason |
|---|------|-------|---------|-----|--------|
| 1 | dr-f-010 | 4 | 4 | HIT | SURFACE(centre): 2arcsin x/sqrt(1-x^2) is one feature away from every other option (2,3,5,6: denominator dropped/changed, arcsin dropped, sign). Math agrees if f=(arcsin x)^2. |
| 2 | dr-f-047 | 2 | 2 | HIT | MATH: distractors f'g', f'g-fg', f'+g' are product-rule errors, so the question is (fg)'; recalled product rule. Centre is ambiguous (f'g-fg' equally central). |
| 3 | dr-f-034 | 6 | 6 | HIT | MATH: options reconstruct f = x e^{x^2}; product + chain gives e^{x^2}+2x^2 e^{x^2}. Centre heuristic would pick 4 (one change from 1,3,6), so not surface. |
| 4 | dr-f-053 | 2 | 2 | HIT | MATH: d/dx sqrt(x) = 1/(2sqrt x). Surface tell also present: options 1 and 5 are equal (sqrt(x)/x = 1/sqrt(x)) so both are eliminable, leaving 2 as the centre. |
| 5 | dr-f-003 | 5 | 5 | HIT | MATH: f = x^{2/3} (the cbrt(x^5) option is its integral); (2/3)x^{-1/3} = 2/(3cbrt x). Visual centre ambiguous between 2 and 5. |
| 6 | dr-f-045 | 4 | 4 | HIT | MATH: d/dx tan^{-1}x = 1/(1+x^2) (sec^2x and -csc^2x are the tan and 1/tan misreadings). Centre ambiguous (4 vs 5). |
| 7 | dr-f-004 | 2 | 2 | HIT | SURFACE(centre): 2e^{2x} is one change away from 1,3,4,5. Math agrees (d/dx e^{2x} or e^{2x}-1). |
| 8 | dr-f-001 | 1 | 1 | HIT | MATH: power rule on x^{3/4} gives (3/4)x^{-1/4}. Feature count ties option 1 with option 3, so no unique centre. |
| 9 | dr-s-03#4 | 4 | 4 | HIT | SURFACE(centre): -1/(2sqrt(x-x^2)) is one change (sign / factor 1/2 / form) from every other option. Math agrees for arccos(sqrt x). |
| 10 | dr-f-033 | 3 | 3 | HIT | SURFACE(centre): 1/(x ln x) is one change from 1/ln x, 1/x, 1/(x^2 ln x) and x ln x. Math agrees for ln(ln x). |
| 11 | dr-s-02#3 | 1 | 1 | HIT | SURFACE(centre): shares -1/3 with 4,5,6, exponent -4/3 with 2,3,5, factor (2x+1) with 2,3,4,6. Math agrees for (x^2+x+1)^{-1/3}. |
| 12 | dr-f-009 | 4 | 4 | HIT | SURFACE(centre): one change from 1,2,3,6 (x vs u, arctan form, sign, missing 1/(2sqrt x)). Math agrees for sec^{-1}(sqrt x - 1). |
| 13 | dr-f-029 | 5 | 5 | HIT | SURFACE(centre): x/sqrt(x^2+9) one change from 1 (coefficient), 3 (times vs over), 4 (power). Math agrees for sqrt(x^2+9). |
| 14 | dr-f-037 | 1 | 1 | HIT | MATH: recall d/dx tan x = sec^2 x; no unique centre among the options. |
| 15 | dr-s-02#0 | 4 | 4 | HIT | SURFACE(centre): (x^2+x+1)^{-1/3} is one change from each other rewrite (sign, reciprocal exponent, minus outside, term-by-term). Math agrees for 1/cbrt(x^2+x+1). |
| 16 | dr-s-04#0 | 5 | 5 | HIT | MATH: options 1 and 4 imply f = (tan^{-1}x)^2; the last operation is squaring, so outer u^2, inner tan^{-1}x. Choosing 5 over 3 needs the chain-rule idea. |
| 17 | dr-g-exp-kx:1 | 4 | 4 | HIT | SURFACE(centre): 7e^{7x} is one change from 49e^{7x}, e^{7x}, (1/7)e^{7x}. Math agrees for e^{7x}. |
| 18 | dr-f-036 | 2 | 2 | HIT | SURFACE(centre): shares pi x^{pi-1} with 1,3,4 and pi^x ln pi with 4,5; option 4's +2pi reveals a pi^2 term. Math agrees. |
| 19 | dr-f-049 | 3 | 3 | HIT | SURFACE(centre): f'(g(x))g'(x) is one change from 1,4,5,6. Math: chain rule. |
| 20 | dr-f-041 | 6 | 6 | HIT | SURFACE(centre): a^x ln a is one change from a^x ln x, a^x/ln a, a^x. Math agrees for a^x. |
| 21 | dr-s-01#2 | 5 | 5 | HIT | SURFACE(centre): every other option differs from 5 in exactly one slot (denominator twice, numerator order, sign). |
| 22 | dr-g-cos-kx:1 | 6 | 6 | HIT | SURFACE(centre): -7sin(7x) is one change from 1,3,4,5. Math agrees for cos(7x). |
| 23 | dr-f-046 | 5 | 5 | HIT | SURFACE(centre): 1/(/x/sqrt(x^2-1)) is one change from 1 (sign) and 3 (/x/). Math agrees for sec^{-1}x. |
| 24 | dr-f-042 | 3 | 3 | HIT | SURFACE(centre): 1/(x ln a) is one change from 1/x, ln a/x, 1/(x ln x). Math agrees for log_a x. |
| 25 | dr-f-051 | 1 | 1 | HIT | SURFACE(odd one out): x^2 e^x is the only product / the only function that is not a composition; all others need the chain rule. |
| 26 | dr-f-005 | 3 | 3 | HIT | SURFACE(centre): ln x + 1 is one change from 2,4,5,6. Math agrees for x ln x. |
| 27 | dr-f-032 | 6 | 6 | HIT | SURFACE(centre): -2xe^{-x^2} is one change from 1 (sign), 3 (exponent), 5 (chain factor). Math agrees for e^{-x^2}. |

**Guessable ids (19):** dr-f-004, dr-f-005, dr-f-009, dr-f-010, dr-f-029, dr-f-032, dr-f-033, dr-f-036, dr-f-041, dr-f-042, dr-f-046, dr-f-049, dr-f-051, dr-s-01#2, dr-s-02#0, dr-s-02#3, dr-s-03#4, dr-g-exp-kx, dr-g-cos-kx.

Author-flagged centre items: dr-f-001 is **not** guessable (the key ties with $\frac34x^{7/4}$ on shared features, and the medoid picks the distractor $\frac34x^{1/4}$). dr-f-002 **is** guessable (unique centre, listed above). dr-f-013 is partially guessable (majority core, listed above).

Extra mechanical scan (no math, all units): an edit-distance medoid guesser gets 65% on static units (chance 18%) and 100% on generator instances. See the systemic finding.

## Certified

**(a) Mathematically verified, no blocking issue** (non-blocking notes above may apply): dr-f-001, dr-f-003, dr-f-012, dr-f-014, dr-f-020, dr-f-021, dr-f-023, dr-f-028, dr-f-031, dr-f-034, dr-f-038, dr-f-040, dr-f-043, dr-f-044, dr-f-045, dr-f-047, dr-f-054, dr-s-02#2, dr-s-03#1, dr-s-04#0, and the finals of dr-s-01, dr-s-02, dr-s-03, dr-s-04. Among these, dr-f-014, dr-f-020, dr-f-028, dr-f-038, dr-f-040, dr-f-044, dr-f-047, dr-s-02#2 and dr-s-03#1 show partial convergence: the key ties with one distractor as medoid. Worth a look during the rewrite, but not blocking.

**(b) Mathematically verified (stored answer, check expression, and every distractor wrong in the way its tag and `why` say), but blocked by a FORM_LEAK above. Re-verify after the rewrite:** dr-f-002, 004, 005, 006, 007, 008, 009, 010, 011, 013, 015, 016, 017, 018, 019, 022, 024, 025, 026, 027, 029, 030, 032, 033, 035, 036, 037, 039, 041, 042, 046, 048, 049, 050, 052, 053; dr-s-01#0–#4; dr-s-02#0, #1, #3, #4; dr-s-03#0, #2, #3, #4; dr-s-04#1, #2, #3; generators dr-g-exp-kx, dr-g-cos-kx, dr-g-a-pow-kx, dr-g-tan-kx (each family verified over its full coefficient range).

Not certified: dr-f-051 (DISTRACTOR_ALSO_CORRECT).

Key derivations for the non-trivial items (all agree with the stored keys):
- dr-f-009: $u=\sqrt x-1$, $u'=\frac{1}{2\sqrt x}$, so $f' = \frac{1}{2\sqrt x\,|\sqrt x-1|\sqrt{(\sqrt x-1)^2-1}}$. Valid for $x>4$; the domain [5,12] gives $u>1$.
- dr-f-016: $\frac{e^x x^2 - 2xe^x}{x^4} = \frac{e^x(x-2)}{x^3}$.
- dr-f-035: $\frac{3}{|3x|\sqrt{9x^2-1}} = \frac{1}{|x|\sqrt{9x^2-1}}$.
- dr-f-043: for $x<0$, $\frac{d}{dx}\ln(-x) = \frac{-1}{-x} = \frac1x$.
- dr-s-01: numerator $\cos x+\cos^2x+\sin^2x = 1+\cos x$, so $f' = \frac{1}{1+\cos x}$.
- dr-s-02: $-\frac13(x^2+x+1)^{-4/3}(2x+1) = -\frac{2x+1}{3(x^2+x+1)^{4/3}}$.
- dr-s-03: $-\frac{1}{\sqrt{1-x}}\cdot\frac{1}{2\sqrt x} = -\frac{1}{2\sqrt{x-x^2}}$ on $(0,1)$.
- dr-s-04: $2\tan^{-1}x\cdot\frac{1}{1+x^2}$.
- Generators: $ke^{kx}$; $-k\sin kx$; $k\,a^{kx}\ln a$; $k\sec^2 kx$, with the domain $kx\in[0.1,1.2]$ kept clear of $\pi/2$.

## Uncertain

- dr-f-051: the stored key $x^2e^x$ is correct under the intended reading ("as written, not a composition"). My DAC call rests on the literal wording "can be differentiated WITHOUT the chain rule". Under that wording $e^{2x} = (e^2)^x$ (table rule for $a^x$, or the product rule on $e^x e^x$) and $(x^3+1)^5$ (binomial expansion) also qualify. I am confident a strong student could defend either, so I flagged it. The orchestrator may prefer to treat it as a wording fix only.
- Systemic convergence finding: the blind evidence is unambiguous (19/19 surface picks correct). How many of the 28 extra medoid-listed units must be rewritten before merge, rather than in a follow-up pass, is a policy call for the orchestrator.
