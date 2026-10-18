# Topic 14 — Integral test, direct & limit comparison, choosing a test (Lecture 12, §5.3–5.4)
topic id `series-tests` · prefix `st` · file `content/flash/series-tests.ts` · ids `st-f-001`…, generators `st-g-<name>`.
Mistake tags: `st-integral-test-conditions`, `st-sum-equals-integral`, `st-comparison-wrong-direction`, `st-lct-boundary`,
`st-lct-limit-wrong`, `st-wrong-p`, `st-p-rule-wrong`, `st-positive-terms-required`, `st-wrong-comparison-series`,
`st-divergence-test-skipped`, `st-wrong-inference` (+ `sb-*`, `sq-dominant-term`, `im-p-rule-wrong`, `im-plug-infinity`,
general `arithmetic-error`, `algebra-error`, `exponent-arithmetic`).
NEVER mention the ratio test, root test, alternating series or absolute convergence — not even as a distractor.

## Spec (source of truth; no lecture PDF exists for this topic) — positive-term series
Integral Test: f positive, continuous, decreasing on [k, ∞), aₙ = f(n) ⇒ Σ_{n=k}^∞ aₙ and ∫ₖ^∞ f(x) dx both converge or both
diverge; the integral's value is NOT the sum; all three conditions must be stated/verified. p-series Σ 1/nᵖ converges iff
p > 1 (p ≤ 0 diverges by the divergence test; 0 < p ≤ 1 diverges). Direct Comparison: 0 < aₙ ≤ bₙ: Σbₙ converges ⇒ Σaₙ
converges; Σaₙ diverges ⇒ Σbₙ diverges; the other directions give NO information. Limit Comparison: L = lim aₙ/bₙ:
0 < L < ∞ ⇒ both converge or both diverge; L = 0 and Σbₙ converges ⇒ Σaₙ converges; L = ∞ and Σbₙ diverges ⇒ Σaₙ diverges;
otherwise inconclusive. Choose bₙ from the dominant terms. Class examples: Σ ln n/n vs Σ 1/n (L = ∞, Σ1/n diverges ⇒
diverges); Σ ln n/n² vs Σ 1/n^{3/2} (L = 0, convergent comparison ⇒ converges); Σ 1/(n ln n) defeats LCT (L = 0 against the
divergent 1/n; L = ∞ against any convergent p-series) → integral test with u = ln x: ∫₂^∞ dx/(x ln x) = lim ln(ln t) → ∞,
diverges. (The original brief wrote this example as 1/(√n ln n); that one IS settled by LCT with 1/n — L = ∞ — so use
1/(n ln n) as the "LCT fails, integral test works" example and, if you like, 1/(√n ln n) as an LCT example.) Flowchart: divergence test first → Sₙ findable (geometric/telescoping)? → p-series? → positive terms: integral /
direct comparison / limit comparison.

## Checks
Verdict items: `{ kind: 'series', term, from?, converges }` (text-only options; the correct option names the verdict AND a
valid test/comparison; distractors: right verdict with an invalid reason, wrong direction, wrong p, …). LCT limit items:
`{ kind: 'limit', term: '(log(n)/n)/(1/n)', limit: 'infinity' }` or numeric limits with constant options. p identification:
`{ kind: 'identity', lhs: 'sqrt(n^3)', … }` with `variable: 'n'`, or `value` for "p = ?". Integral-test integrals:
`{ kind: 'improper-integral', integrand: '1/(x*log(x)^2)', lower: '2', upper: 'inf', converges: true, value: '1/log(2)' }`
(value items) or verdict. Test-choice / condition / direction items: `none` with reason (these are the heart of the topic —
make the distractors the classic wrong choices).

## Item mix (suggested)
- which test applies first / next (flowchart) for 8–10 given series (technique; options are test names + one-line reasons);
- integral test: conditions (which condition fails for Σ sin²n/n², Σ (−1)ⁿ/n, Σ n e^{−n}), set-up (∫ₖ^∞ f with the right k),
  conclusions (integral converges to 1 ⇒ series converges — NOT to 1), the ∫ 1/(x ln x) and ∫ 1/(x ln² x) examples — 8 items;
- p-series: identify p (1/√n, 1/(n√n), n^{−2/3}, 1/∛n², √n/n²), verdicts, p = 1 trap — 6 items;
- direct comparison: pick a valid comparison and direction for 1/(n² + 1), 1/(n − 1/2), 1/(2ⁿ + n), ln n/n, 1/(n! ) is NOT in
  scope — skip factorials; include no-information traps — 7–8 items;
- limit comparison: choose bₙ, compute L, conclude; the three class examples; L = 0 / L = ∞ boundary cases — 8 items;
- generators: `st-g-p-series` (random exponent form → converge?), `st-g-lct-rational` (random rational aₙ → bₙ = 1/n^k and
  verdict), `st-g-comparison-direction` (random pair → valid conclusion or no information).
