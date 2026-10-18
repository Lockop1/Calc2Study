# Topic 13 — Series: partial sums, divergence test, geometric, telescoping (Lecture 11, §5.2)
topic id `series-basics` · prefix `sb` · file `content/flash/series-basics.ts` · ids `sb-f-001`…, generators `sb-g-<name>`.
Mistake tags: `sb-divergence-test-converse`, `sb-sequence-vs-series`, `sb-sum-is-term-limit`, `sb-wrong-first-term`,
`sb-wrong-ratio`, `sb-r-boundary`, `sb-partial-sum-formula`, `sb-telescoping-sum-wrong`, `sb-split-divergent`,
`sb-no-information` (+ `sq-*` tags where a sequence error is the cause, `pf-coefficient-wrong` for a wrong partial-fraction
split, general `arithmetic-error`, `algebra-error`, `sign-error`).

## Spec (source of truth; no lecture PDF exists for this topic)
Σaₙ converges iff {Sₙ} converges; sum = lim Sₙ; aₙ = Sₙ − Sₙ₋₁. Divergence Test: lim aₙ ≠ 0 or DNE ⇒ Σaₙ diverges; lim aₙ = 0
⇒ inconclusive; it never proves convergence (Σ1/n). Geometric Σ_{n=1}^∞ a rⁿ⁻¹: Sₙ = a(1 − rⁿ)/(1 − r); converges iff |r| < 1,
sum a/(1 − r), a = FIRST TERM (watch the index); diverges if |r| ≥ 1. Telescoping Σ(bₙ − bₙ₊₁): Sₙ = b₁ − bₙ₊₁; converges iff
lim bₙ = L finite; sum b₁ − L (partial fractions, e.g. 1/(n(n+1)) = 1/n − 1/(n+1)). Properties: both convergent ⇒ Σ(aₙ ± bₙ),
Σc aₙ converge; cannot split into divergent pieces; convergent ± divergent ⇒ divergent (difference rule); divergent +
divergent ⇒ insufficient information (it may converge, e.g. 1/n + (−1/n), or diverge).

## Checks
Sum items: `{ kind: 'series', term, from?, converges: true, sum }` with five finite constant options (exprs). Verdict items
(text-only): `{ kind: 'series', term, converges: false }` or `converges: true` without sum — options like "Diverges by the
divergence test", "Converges to $1$", "Converges because $a_n \\to 0$" (distractor `sb-divergence-test-converse`), …
Partial-sum formulas: use `{ kind: 'value', expected }` for a specific n ("S₄ of …") or `identity` with `variable: 'n'` for a
closed form in n (e.g. Sₙ of Σ 1/(k(k+1)) = 1 − 1/(n+1): lhs 'n/(n+1)', options exprs in n). Telescoping splits:
`identity` (lhs '1/(n*(n+1))', options '1/n - 1/(n+1)' …, variable 'n'). Properties / insufficient-information items: `none`.

## Item mix (suggested)
- definition items (series vs sequence, sum = lim Sₙ, aₙ = Sₙ − Sₙ₋₁ with a given Sₙ formula → identity check) — 4 items;
- divergence test verdicts: Σ n/(n+1), Σ (−1)ⁿ, Σ cos(1/n), Σ 1/n (inconclusive → "no conclusion from this test"), Σ (1 + 1/n)ⁿ
  — 6 items, with the "aₙ → 0 so it converges" distractor every time it is believable;
- geometric: identify a and r, sum items with numeric checks (Σ 3(1/2)ⁿ⁻¹ = 6, Σ_{n=0} (1/3)ⁿ = 3/2, Σ_{n=1} (2/3)ⁿ = 2,
  Σ_{n=2} 5(1/4)ⁿ = 5/12, Σ (−2/3)ⁿ = −2/5, Σ 2ⁿ/3ⁿ⁺¹, 0.999… as a series), convergence decisions by |r| (r = 1, −1, 3/2, −0.9),
  Sₙ formula items — 12–14 items;
- telescoping: split, Sₙ, sum (Σ 1/(n(n+1)) = 1, Σ 1/((n+1)(n+2)) = 1/2, Σ (1/n − 1/(n+2)) = 3/2, Σ ln(n/(n+1)) diverges,
  Σ 1/(n² − 1) from 2 = 3/4) — 7–8 items;
- properties / insufficient info — 4 items;
- generators: `sb-g-geometric-sum` (random a, r, start index → sum), `sb-g-telescoping` (Σ 1/((n+p)(n+p+1)) = 1/(p+1)),
  `sb-g-divergence-test` (random rational term → verdict).
