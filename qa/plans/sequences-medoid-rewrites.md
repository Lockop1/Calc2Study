# sequences: decoy-hub rewrites (bigram medoid 36% → target ≤ 30%)
Apply EXACTLY. Keep option index 0 (✓) and the prompt/kind/check/explanation unless stated. Replace the four distractors
by the listed ones in order, with the given tag and a `why` (≥ 15 chars) from the reason. Exprs items: latex + expr given.

## sq-f-006 (arctan n) — exprs
0 ✓ keep \frac{\pi}{2}
1 latex "-\frac{\pi}{2}", expr "-pi/2" | sign-error | took the limit at −∞ instead of +∞
2 latex "-\pi", expr "-pi" | inverse-trig-value-wrong | confused the range of arctan with (0, π) and then flipped the sign
3 latex "-\frac{\pi}{4}", expr "-pi/4" | sq-term-vs-limit | evaluated at n = 1 (arctan 1 = π/4) with a sign slip
4 latex "1", expr "1" | sq-substitute-infinity | "cancelled" the infinity and wrote 1

## sq-f-010 (sin(nπ)) — text
0 ✓ keep
1 "DNE: $\sin$ oscillates between $-1$ and $1$" | sq-connect-the-dots | pictured the continuous graph of sin x instead of its values at the integers
2 "DNE: $\sin(x\pi)$ oscillates between $-1$ and $1$ as $x \to \infty$, so by the Underlying Function Theorem the sequence has no limit" | sq-theorem-misattributed | the theorem only transfers a limit that exists; it says nothing when the function limit fails
3 "$\pi$: the value at $n = 1$" | sq-term-vs-limit | plugged n = 1 into the argument instead of evaluating the term
4 "$\infty$: $n\pi \to \infty$" | sq-dominant-term | took the limit of the argument instead of the term

## sq-f-012 (√(n+1) − √n) — text
0 ✓ keep
1 "DNE: $\infty - \infty$ is indeterminate, so there is no limit" | sq-limit-law-misuse | treated an indeterminate form as "no limit"
2 "$0$: because $\infty - \infty = 0$" | sq-substitute-infinity | right value, invalid reason: ∞ − ∞ is not 0
3 "$1$: $\infty - \infty$ is indeterminate, so subtract the radicands instead: $(n+1) - n = 1$" | algebra-error | replaced the difference of roots by the difference under the roots
4 "$\frac{1}{2}$: L'Hôpital gives $\dfrac{1}{2\sqrt{x}}$" | arithmetic-error | differentiated and stopped before taking the limit

## sq-f-013 (n^{1/n}) — text
0 ✓ keep
1 "$0$: the exponent $\to 0$ kills the term" | exponent-arithmetic | confused x^0 = 1 with 0
2 "$1$: because the exponent $\to 0$ and $n^{0} = 1$" | sq-limit-law-misuse | right value, invalid reason: the base is not fixed
3 "$\infty$: the exponent $\to 0$ too slowly to tame $n$" | sq-dominant-term | ignored that ln n / n → 0
4 "$e$: the standard limit" | sq-theorem-misattributed | confused with (1 + 1/n)^n

## sq-f-015 (ln n / √n) — text
0 ✓ keep
1 "$2$: L'Hôpital leaves $\dfrac{2}{\sqrt{x}}$" | algebra-error | stopped after differentiating without taking the limit
2 "$\frac{1}{2}$: L'Hôpital leaves $\dfrac{1}{2\sqrt{x}}$" | arithmetic-error | reported the derivative of the denominator
3 "$\infty$: L'Hôpital leaves $2\sqrt{x}$" | sq-dominant-term | inverted the quotient of derivatives
4 "$1$: $\infty/\infty$ cancels" | sq-substitute-infinity | plugged in n = ∞

## sq-f-016 ((−1)^n/n) — text
0 ✓ keep
1 "$0$: because $(-1)^{n} \to 0$" | sq-rn-boundary | right value, invalid reason: (−1)ⁿ has no limit
2 "DNE: because $(-1)^{n}$ has no limit, the quotient has none" | sq-oscillation-means-divergence | assumed sign changes prevent convergence
3 "$1$: because $(-1)^{n}$ is bounded by $1$" | sq-bounded-implies-convergent | turned a bound into a limit
4 "$-1$: the first term" | sq-term-vs-limit | reported a term instead of the limit

## sq-f-017 (n²/eⁿ) — text
0 ✓ keep
1 "$2$: after L'Hôpital twice the numerator is $2$" | algebra-error | stopped before taking the limit of 2/eˣ
2 "$1$: after L'Hôpital twice it is still $\infty/\infty$, which cancels" | sq-substitute-infinity | plugged in ∞ instead of finishing
3 "DNE: L'Hôpital twice is not allowed for a sequence" | sq-theorem-misattributed | forgot the Underlying Function Theorem
4 "$\infty$: $n^{2}$ grows without bound" | sq-dominant-term | ignored that eⁿ grows faster than any power

## sq-f-019 (2, 6, 18, 54, …) — exprs (check unchanged: identity 2*3^(n-1))
0 ✓ keep 2 \cdot 3^{n-1}
1 latex "3 \cdot 2^{n-1}", expr "3*2^(n-1)" | arithmetic-error | swapped the first term and the ratio
2 latex "3 \cdot 2^{n}", expr "3*2^n" | exponent-arithmetic | swapped a and r and used rⁿ instead of rⁿ⁻¹
3 latex "3 \cdot 2^{n+1}", expr "3*2^(n+1)" | exponent-arithmetic | swapped a and r and shifted the exponent the wrong way
4 latex "2 + 4(n-1)", expr "2+4*(n-1)" | sq-wrong-form | used the arithmetic form for a geometric sequence

## sq-f-020 (7, 4, 1, −2, …) — exprs (check unchanged: identity 10-3*n)
0 ✓ keep 7 - 3(n-1)
1 latex "7 - 3n", expr "7-3*n" | sq-wrong-form | forgot the (n − 1) in a + (n − 1)d
2 latex "4 - 3n", expr "4-3*n" | arithmetic-error | started from the second term and forgot the (n − 1)
3 latex "7 + 3n", expr "7+3*n" | sign-error | used d = +3 and forgot the (n − 1)
4 latex "7 + 3(n-1)", expr "7+3*(n-1)" | sign-error | used d = +3 for a decreasing sequence

## sq-f-022 ({rⁿ} rule) — text
0 ✓ keep
1 "$|r| < 1$ only" | sq-rn-boundary | excluded r = 1, where rⁿ = 1 converges
2 "$|r| \le 1$" | sq-rn-boundary | included r = −1, where rⁿ alternates
3 "$|r| < 1$ or $r = -1$" | sq-rn-boundary | swapped the boundary cases: r = 1 converges, r = −1 does not
4 "$0 < r \le 1$" | sq-oscillation-means-divergence | excluded negative r because the terms alternate in sign

## sq-f-033 (aˣ triple) — text
0 ✓ keep "$0,\ 1,\ \infty$"
1 "$0,\ 1,\ \text{DNE}$" | sq-oscillation-means-divergence | confused unbounded growth with oscillation
2 "$0,\ \text{DNE},\ \infty$" | sq-substitute-infinity | treated 1^∞ as indeterminate with no limit
3 "$1,\ 1,\ \infty$" | sq-rn-boundary | thought (2/3)ⁿ tends to 1
4 "$0,\ 0,\ \infty$" | sq-rn-boundary | treated r = 1 like |r| < 1

## sq-g-geometric — table fix
Replace −5/4 in the table by −4/5 (so the "Diverges: unbounded" option is never also true when "alternates" is the answer). New table, index (seed − 1) % 8: −3/4, 4/5, −1, 6/5, −4/5, 1/2, −1/2, 3/2. The "Diverges: alternates without settling" option is ✓ only for r = −1 (limit 'dne'); "Diverges: unbounded" ✓ for 6/5 and 3/2 ('infinity'); "Converges to 0" ✓ for the rest ('0').
