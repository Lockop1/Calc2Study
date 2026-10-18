# Topic 10 — Partial fractions (Lecture 8, §3.4)
topic id `partial-fractions` · prefix `pf` · file `content/flash/partial-fractions.ts` · ids `pf-f-001`…, generators `pf-g-<name>`.
Mistake tags for this topic: `pf-improper-not-divided`, `pf-not-fully-factored`, `pf-constant-over-quadratic`,
`pf-missing-repeated-power`, `pf-linear-over-repeated-linear`, `pf-irreducible-misjudged`, `pf-coefficient-wrong`,
`pf-division-wrong`, `pf-missing-1-over-a`, `pf-arctan-missing-1-over-k`, `pf-ln-arctan-swapped`, `pf-square-not-completed`,
`pf-power-term-as-ln` (+ general tags: `abs-dropped`, `ln-misapplied`, `power-rule-int-exponent`, `sign-error`,
`algebra-error`, `arithmetic-error`, `du-constant-wrong`, `technique-wrong`).

## Spec (source of truth; no lecture PDF exists for this topic)
A rational function R = p/s is proper iff deg p < deg s. A quadratic ax² + bx + c is irreducible iff b² − 4ac < 0 (the
professor checks the discriminant explicitly). Procedure, in this order: (1) Is the fraction proper? (2) If improper, long
division: p = s·q + r, so p/s = q + r/s. (3) Factor the denominator completely into linear factors and irreducible quadratics.
(4) Write the decomposition form. (5) Solve for the coefficients. (6) Integrate each term.
Forms: linear factor (ax + b) → A/(ax + b); repeated linear (ax + b)ⁿ → A₁/(ax + b) + A₂/(ax + b)² + … + Aₙ/(ax + b)ⁿ (one term
per power); irreducible quadratic → (Ax + B)/(ax² + bx + c); repeated irreducible quadratic (ax² + bx + c)ⁿ → one
(Aₖx + Bₖ)/(ax² + bx + c)ᵏ term for each k = 1 … n.
Coefficients: multiply out by the denominator, plug in the roots of the linear factors, then x = 0, then equate the remaining
coefficients. Class example: (3 − x²)/((x − 1)(x² + 1)) = A/(x − 1) + (Bx + C)/(x² + 1): x = 1 ⇒ A = 1; x = 0 ⇒ C = −2; the x²
coefficient ⇒ B = −2; result 1/(x − 1) − (2x + 2)/(x² + 1).
Integrating: A/(ax + b): u = ax + b ⇒ (A/a) ln|ax + b| + C. A/(ax + b)ⁿ, n ≥ 2: power rule ⇒ −A/(a(n − 1)(ax + b)ⁿ⁻¹) + C.
(Ax + B)/(x² + k²)ⁿ: split into the Ax part (u = x² + k²) and the B part (x = k tan θ; for n = 1: ∫ 1/(x² + k²) dx =
(1/k) arctan(x/k) + C). When b ≠ 0 complete the square first.

## Item mix (suggested; cover everything in the spec)
- proper vs improper decisions and "what is the first step" for a given fraction (technique / concept; 4–5 items);
- discriminant checks: is x² + 4, x² − 4, x² + 2x + 5, x² − 5x + 6 irreducible? (concept; 3 items; include one where the
  student must compute b² − 4ac);
- long division results (formula with `identity` check: lhs e.g. 'x^3/(x^2+1)', options like 'x - x/(x^2+1)'; 3 items);
- decomposition FORM items: given a factored denominator, which form is right (formula, text/latex-only options → check
  'none' with reason, or `identity` with concrete coefficients when all options are concrete; 8–10 items covering every form
  incl. repeated linear, irreducible quadratic, repeated irreducible quadratic, mixed);
- coefficient solving: "plug x = 1 to get A = ?" / "what are A, B, C?" (formula with `value` or vector identity check — remember
  mathjs treats `C` as 0, so name the third coefficient D in exprs or phrase as the decomposed expression; 6 items incl. the
  class example);
- integrating a single term (antiderivative items with numeric checks: A/(ax + b) with concrete numbers, 3/(2x + 5),
  4/(x − 3)², (2x + 2)/(x² + 1), 5/(x² + 9), x/(x² + 4), 1/(x² + 2x + 5) after completing the square; 8–10 items);
- full integrals of decomposed integrands (antiderivative items: e.g. ∫ (3 − x²)/((x − 1)(x² + 1)) dx with domain [1.5, 3];
  ∫ 1/(x² − 1) dx; ∫ (x + 4)/(x² + 2x) dx; 4–6 items; options all "+ C", same form, |…| everywhere);
- generators: e.g. `pf-g-linear-term` (∫ A/(ax + b) with random small integers), `pf-g-two-linear` (∫ 1/((x−p)(x−q))),
  `pf-g-form` (which decomposition form for a random factored denominator).
