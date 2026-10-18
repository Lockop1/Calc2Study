# Topic 11 — Improper integrals (Lecture 9, §3.7)
topic id `improper` · prefix `im` · file `content/flash/improper.ts` · ids `im-f-001`…, generators `im-g-<name>`.
Mistake tags: `im-plug-infinity`, `im-hidden-discontinuity`, `im-wrong-one-sided-limit`, `im-symmetric-limit`,
`im-one-half-only`, `im-divergent-called-convergent`, `im-wrong-type`, `im-p-rule-wrong`, `im-limit-evaluated-wrong`,
`im-split-mishandled` (+ general: `ftc-order-swapped`, `sign-error`, `power-rule-int-exponent`, `inverse-trig-value-wrong`,
`arithmetic-error`, `ln-misapplied`, `abs-dropped`).

## Spec (source of truth; no lecture PDF exists for this topic)
Type I (unbounded interval): ∫ₐ^∞ f = lim_{t→∞} ∫ₐᵗ f; ∫_{−∞}^b f = lim_{t→−∞} ∫ₜᵇ f; ∫_{−∞}^∞ f = ∫_{−∞}^c f + ∫_c^∞ f as two
SEPARATE limits that are never combined into one; converges only if BOTH converge (any c). Type II (infinite discontinuity):
at b: lim_{t→b⁻} ∫ₐᵗ f; at a: lim_{t→a⁺} ∫ₜᵇ f; at an interior point c: split at c, two one-sided limits, both must converge;
always approach from inside the interval. Converges if the limit is finite; otherwise diverges (a limit of ∞ means DIVERGES,
never "converges to ∞"). Steps: identify the type → replace the bad bound(s) by a variable and write the limit(s), splitting if
needed → FTC inside the limit → evaluate the limit(s) → conclude (value if convergent). p-rule: ∫₁^∞ 1/xᵖ dx converges iff
p > 1 (value 1/(p − 1)).

## Checks
Use `{ kind: 'improper-integral', integrand, lower: '1' | '-inf' …, upper: 'inf' | …, converges, value?, split? }` on every
concrete integral item. Value items: all five options are finite constants with exprs (e.g. 1, 2, 1/2, −1, 0) — the checker
verifies the integral and the correct option. Verdict items: text-only options such as "Converges to $1$" / "Diverges" /
"Converges to $0$" / "Converges to $\\infty$" (that one is a distractor: `im-divergent-called-convergent`) — the checker
verifies only the claim; keep the verdict unambiguous. Limit-evaluation items (e.g. lim_{t→∞} arctan t, lim_{t→0⁺} ln t,
lim_{t→∞} e^{−t}) use `{ kind: 'limit', term: 'arctan(t)', variable: 't', limit: 'pi/2' }` — note `variable: 't'` in the check.
Setup items (which limit expression is the right rewrite) are text/latex-only with check `none` (reason: setup).

## Item mix (suggested)
- type identification (Type I / Type II / both / not improper) for 6–8 given integrals, including hidden discontinuities
  (∫₋₁¹ 1/x², ∫₀² 1/(x − 1), ∫₀^π tan x) — concept, check none;
- limit setup (which rewrite) for each of the four limit forms + the split cases — technique/formula, 6–8 items;
- evaluations with value checks: ∫₁^∞ 1/x², ∫₁^∞ 1/x³, ∫₀^∞ e^{−x}, ∫₀^∞ x e^{−x²}, ∫₀¹ 1/√x, ∫₀⁴ 1/√(4 − x), ∫₁^∞ 1/(1 + x²)
  (π/4), ∫_{−∞}^∞ 1/(1 + x²) (π, split ['0']), ∫₀¹ ln x (−1), ∫_{−∞}^0 eˣ (1), ∫₁^∞ 1/x^{3/2} (2) — 8–10 items;
- verdict items incl. "diverges": ∫₁^∞ 1/x, ∫₁^∞ 1/√x, ∫₀¹ 1/x, ∫₋₁¹ 1/x² (trap), ∫₂^∞ 1/(x ln x), ∫_{−∞}^∞ x (split, diverges —
  distractor "= 0 by symmetry": `im-symmetric-limit`), ∫₀^∞ cos x — 6–8 items;
- p-rule items (which p converge, value 1/(p − 1), ∫₀¹ 1/xᵖ for comparison is NOT in the spec — stay with ∫₁^∞) — 3 items;
- limit evaluations inside the procedure (`limit` checks) — 4 items;
- generators: `im-g-p-integral` (∫₁^∞ 1/xᵖ for p from a table, value 1/(p−1) or verdict), `im-g-exp` (∫₀^∞ e^{−kx} = 1/k),
  `im-g-type` (classify a random integral).
