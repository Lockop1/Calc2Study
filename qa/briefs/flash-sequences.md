# Topic 12 — Sequences (Lecture 10, §5.1)
topic id `sequences` · prefix `sq` · file `content/flash/sequences.ts` · ids `sq-f-001`…, generators `sq-g-<name>`.
Mistake tags: `sq-connect-the-dots`, `sq-term-vs-limit`, `sq-substitute-infinity`, `sq-oscillation-means-divergence`,
`sq-bounded-implies-convergent`, `sq-monotone-implies-convergent`, `sq-first-terms`, `sq-rn-boundary`, `sq-wrong-form`,
`sq-limit-law-misuse`, `sq-dominant-term`, `sq-squeeze-misuse`, `sq-theorem-misattributed` (+ general: `arithmetic-error`,
`algebra-error`, `sign-error`, `exponent-arithmetic`, `inverse-trig-value-wrong`).

## Spec (source of truth; no lecture PDF exists for this topic)
Notation {aₙ}ₙ₌₁^∞. Geometric sequences are written a·rⁿ or a·rⁿ⁻¹; arithmetic aₙ = a + (n − 1)d; geometric aₙ = a·rⁿ⁻¹.
Class example: 2^{2n+1}/3ⁿ = 2·(4/3)ⁿ, ratio 4/3 > 1 ⇒ divergent. Convergent iff aₙ → L finite; else divergent. {rⁿ} converges
iff −1 < r ≤ 1 (limit 0 if |r| < 1, 1 if r = 1). Underlying Function Theorem: f(n) = aₙ and lim_{x→∞} f(x) = L ⇒ lim aₙ = L
(allows L'Hôpital on f(x)). Limits to know: sin x, cos x — DNE; aˣ depends on a (∞ if a > 1, 0 if 0 < a < 1, 1 if a = 1);
ln x → ∞; rational by degrees (lower top → 0; equal → ratio of leading coefficients; higher top → ±∞); arctan x → π/2;
(1 + 1/x)ˣ → e. Limit laws for convergent sequences. Continuous Function Theorem: aₙ → L, f continuous at L ⇒ f(aₙ) → f(L).
Squeeze Theorem; corollary |aₙ| → 0 ⇒ aₙ → 0. Bounded: |aₙ| ≤ M. Convergent ⇒ bounded; converse false ({(−1)ⁿ}). Monotone =
increasing or decreasing. Monotone Convergence Theorem: monotone AND bounded ⇒ convergent.

## Checks
Limit items: `{ kind: 'limit', term: '<mathjs in n>', limit: '<constant>' }` with five finite constant options (exprs) when
the answer is finite — e.g. for (3n² + 1)/(n² − 5): 3, 0, 1, −1/5, 3/5. When "∞" or "DNE" must be an option, make the item a
verdict item (text-only options: "$0$", "$\\infty$", "DNE", "$1$", "$3$") with `limit: '…' | 'infinity' | 'dne'`. Closed-form
items ("which formula gives 2, 6, 18, 54, …" / "rewrite 2^{2n+1}/3ⁿ") use `{ kind: 'identity', lhs }` with `variable: 'n'` and
exprs in n (domain default is fine, or `domain: { n: [1, 6] }`). Theorem / bounded / monotone items: check `none` with reason.
Avoid factorials in exprs (the checker samples n up to 10⁶).

## Item mix (suggested)
- limits with numeric checks: rational (3 cases), ln n/n, n/eⁿ, (1 + 1/n)^n, (1 + 2/n)^n (e²), n sin(1/n), arctan n, n^{1/n},
  (−1)ⁿ/n, cos n/n, √(n + 1) − √n, (2n + 1)/(n + 3), 2·(4/3)ⁿ (verdict ∞), (−1)ⁿ (verdict DNE), sin(nπ) (= 0 for every n: the
  connect-the-dots trap), (−3/4)ⁿ (0), 1.01ⁿ (∞) — 14–18 items;
- {rⁿ} rule items (which r converge; limit for r = 1, r = −1, r = 0.5) — 3 items;
- closed-form / notation items (arithmetic vs geometric, a·rⁿ⁻¹ vs a·rⁿ, the class example) — 4 items (identity checks);
- theorem items: which theorem justifies a step (UFT / CFT / Squeeze / MCT), bounded ⇒ convergent? (no), monotone + bounded ⇒
  convergent (yes), convergent ⇒ bounded (yes), counterexample {(−1)ⁿ}, limit-law misuse — 8–10 concept items;
- generators: `sq-g-rational` (random degrees/coefficients → limit), `sq-g-geometric` (random r → converge? limit?),
  `sq-g-closed-form` (random a, r → aₙ formula with identity check).
