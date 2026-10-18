# series-basics: decoy-hub rewrites (medoid 37%/37% → target ≤ 30%)
Apply EXACTLY. Keep option index 0 (✓), prompt, kind, check, explanation. Replace the four distractors by the listed ones
in order, with the given tag and a `why` (≥ 15 chars) from the reason. Exprs items: latex + expr given.

## sb-f-012 — exprs (Σ_{n=0} (1/3)^n = 3/2)
0 ✓ keep \frac{3}{2}
1 latex "\frac{1}{2}", expr "1/2" | sb-wrong-first-term | used a = 1/3 although the series starts at n = 0
2 latex "\frac{1}{3}", expr "1/3" | sb-partial-sum-formula | reported the n = 1 term as the sum
3 latex "\frac{1}{6}", expr "1/6" | arithmetic-error | computed a(1 − r) with a = 1/3
4 latex "3", expr "3" | arithmetic-error | inverted r instead of computing 1/(1 − r)

## sb-f-015 — exprs (Σ (−2/3)^n = −2/5)
0 ✓ keep -\frac{2}{5}
1 latex "\frac{2}{5}", expr "2/5" | sign-error | dropped the sign of the first term
2 latex "2", expr "2" | sb-wrong-ratio | used 1 − r = 1/3 as if r were +2/3, and dropped the sign
3 latex "\frac{2}{3}", expr "2/3" | sb-partial-sum-formula | reported the first term as the sum, without its sign
4 latex "\frac{3}{5}", expr "3/5" | sb-wrong-first-term | used a = 1

## sb-f-016 — exprs (Σ 2^n/3^{n+1} = 2/3)
0 ✓ keep \frac{2}{3}
1 latex "\frac{2}{9}", expr "2/9" | sb-partial-sum-formula | reported the first term as the sum
2 latex "\frac{1}{9}", expr "1/9" | sb-wrong-first-term | used a = 1/3 and then halved it
3 latex "\frac{4}{9}", expr "4/9" | arithmetic-error | doubled the first term instead of dividing by 1 − r
4 latex "2", expr "2" | sb-wrong-first-term | used a = 2/3 (the n = 0 term)

## sb-f-018 — exprs (Σ (−0.9)^n = −9/19)
0 ✓ keep -\frac{9}{19}
1 latex "\frac{9}{19}", expr "9/19" | sign-error | dropped the sign of the first term
2 latex "\frac{10}{19}", expr "10/19" | sb-wrong-first-term | used a = 1
3 latex "\frac{9}{10}", expr "9/10" | sb-partial-sum-formula | reported the first term as the sum, without its sign
4 latex "9", expr "9" | sb-wrong-ratio | used 1 − r = 0.1 as if r were +0.9, and dropped the sign

## sb-f-020 — exprs (Sₙ = 3^n − 1; identity check unchanged)
0 ✓ keep 3^{n} - 1
1 latex "2\left(3^{n} - 1\right)", expr "2*(3^n - 1)" | sb-partial-sum-formula | forgot to divide by 1 − r = −2
2 latex "2\left(3^{n} + 1\right)", expr "2*(3^n + 1)" | sign-error | forgot to divide by 1 − r and flipped the sign of the 1
3 latex "2\left(3^{n-1} - 1\right)", expr "2*(3^(n-1) - 1)" | exponent-arithmetic | forgot to divide by 1 − r and used rⁿ⁻¹ instead of rⁿ
4 latex "-1", expr "-1" | sb-partial-sum-formula | used a/(1 − r) for a finite sum

## sb-f-021 — text
0 ✓ keep "$|r| < 1$"
1 "$|r| \le 1$" | sb-r-boundary | r = ±1 diverges
2 "$r \le 1$" | sb-r-boundary | r ≤ −1 diverges, and r = 1 too
3 "$|a| \le 1$" | sb-wrong-ratio | the first term does not affect convergence
4 "$a r^{n-1} \to 0$" | sb-divergence-test-converse | terms → 0 is necessary, not sufficient in general

## sb-f-022 — exprs (vectors; check value [4, -1/3] unchanged)
0 ✓ keep a = 4, r = −1/3
1 latex "a = 4,\quad r = \frac{1}{3}", expr "[4, 1/3]" | sb-wrong-ratio | dropped the sign of r
2 latex "a = 1,\quad r = \frac{1}{3}", expr "[1, 1/3]" | sb-wrong-first-term | ignored the coefficient 4 and dropped the sign of r
3 latex "a = 4,\quad r = 3", expr "[4, 3]" | sb-wrong-ratio | inverted r and dropped its sign
4 latex "a = -\frac{4}{3},\quad r = -\frac{1}{3}", expr "[-4/3, -1/3]" | sb-wrong-first-term | used the n = 2 term as a

## sb-f-023 — exprs (identity check unchanged)
0 ✓ keep \frac{1}{n} - \frac{1}{n+1}
1 latex "\frac{1}{n} + \frac{1}{n+1}", expr "1/n + 1/(n+1)" | pf-coefficient-wrong | sign of the second coefficient wrong
2 latex "\frac{1}{n} + \frac{1}{n+2}", expr "1/n + 1/(n+2)" | arithmetic-error | wrong second factor and wrong sign
3 latex "\frac{1}{2n} + \frac{1}{2(n+1)}", expr "1/(2*n) + 1/(2*(n+1))" | algebra-error | spurious factor 1/2 and wrong sign
4 latex "\frac{1}{n+1} - \frac{1}{n}", expr "1/(n+1) - 1/n" | sign-error | both coefficients flipped

## sb-f-025 — exprs (identity check unchanged)
0 ✓ keep 1 - \frac{1}{n+1}
1 latex "1 - \frac{1}{n}", expr "1 - 1/n" | sb-telescoping-sum-wrong | kept bₙ instead of bₙ₊₁
2 latex "1 + \frac{1}{n}", expr "1 + 1/n" | sign-error | kept bₙ and added it instead of subtracting
3 latex "2 - \frac{1}{n}", expr "2 - 1/n" | arithmetic-error | counted b₁ twice and kept bₙ
4 latex "\frac{1}{n+1}", expr "1/(n+1)" | sb-partial-sum-formula | kept the wrong surviving term
