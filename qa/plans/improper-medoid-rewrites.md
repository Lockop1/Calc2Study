# improper: decoy-hub rewrites (medoid 43%/38% → target ≤ 30%)
Apply EXACTLY. Keep option index 0 (✓), prompt, kind, check, explanation. Replace the four distractors by the listed ones
in order, with the given tag and a `why` (≥ 15 chars) from the reason. Exprs items: latex + expr given.

## im-f-003 — text
0 ✓ keep
1 "Not improper: finite bounds, so apply the FTC" | im-hidden-discontinuity | missed that 1/x² blows up at 0 inside the interval
2 "Not improper: $\dfrac{1}{x^{2}}$ is even, so the two halves cancel the problem" | im-symmetric-limit | symmetry never removes an interior discontinuity
3 "Not improper: $\dfrac{1}{x^{2}}$ is continuous except at one point, which does not matter" | im-wrong-type | a single infinite discontinuity is exactly what makes a Type II integral
4 "Type II at the endpoints $x = \pm 1$" | im-wrong-type | the integrand is 1 at both endpoints; the blow-up is at 0

## im-f-004 — text
0 ✓ keep
1 "Type II: a discontinuity at $x = 0$" | im-wrong-type | e^{−x} is continuous everywhere
2 "Type II: $e^{-x}$ is undefined at $\infty$" | im-plug-infinity | ∞ is a bound, not a point where the function is evaluated
3 "Type II: $e^{-x} \to 0$ as $x \to \infty$" | im-wrong-type | an integrand tending to 0 is not a discontinuity
4 "Not improper: the integrand is bounded" | im-wrong-type | boundedness does not fix an infinite interval

## im-f-007 — text
0 ✓ keep
1 "$\displaystyle\lim_{t\to\infty} \int_{t}^{\infty} f(x)\,dx$" | im-split-mishandled | kept ∞ as a bound inside the limit
2 "$\displaystyle\lim_{t\to 2^{+}} \int_{t}^{\infty} f(x)\,dx$" | im-wrong-type | treated the finite endpoint 2 as the bad one and kept ∞ as a bound
3 "$\displaystyle\lim_{t\to-\infty} \int_{t}^{\infty} f(x)\,dx$" | im-wrong-one-sided-limit | sent t to −∞ and kept ∞ as a bound
4 "$F(\infty) - F(2)$" | im-plug-infinity | plugged ∞ into the antiderivative

## im-f-014 — exprs (∫₁^∞ dx/x³ = 1/2)
0 ✓ keep \frac{1}{2}
1 latex "-\frac{1}{2}", expr "-1/2" | ftc-order-swapped | computed F(1) − F(t)
2 latex "-1", expr "-1" | power-rule-int-exponent | treated it like ∫ dx/x² and swapped the FTC order
3 latex "-\frac{1}{3}", expr "-1/3" | arithmetic-error | divided by 3 instead of 2 and swapped the FTC order
4 latex "0", expr "0" | im-plug-infinity | wrote F(∞) = 0 and stopped

## im-f-015 — exprs (∫₀^∞ e^{−2x} dx = 1/2)
0 ✓ keep \frac{1}{2}
1 latex "-\frac{1}{2}", expr "-1/2" | sign-error | lost the minus sign of −(1/2)e^{−2x}
2 latex "-1", expr "-1" | inner-constant-factor-missing | forgot the 1/2 from the inner derivative and lost the sign
3 latex "-2", expr "-2" | du-constant-wrong | multiplied by 2 instead of dividing and lost the sign
4 latex "0", expr "0" | im-limit-evaluated-wrong | took e^{−2t} → 1 as t → ∞

## im-f-016 — exprs (∫₀^∞ x e^{−x²} dx = 1/2)
0 ✓ keep \frac{1}{2}
1 latex "-\frac{1}{2}", expr "-1/2" | sign-error | lost the minus sign of −(1/2)e^{−x²}
2 latex "-1", expr "-1" | du-constant-wrong | forgot the 1/2 from du = 2x dx and lost the sign
3 latex "-\frac{1}{4}", expr "-1/4" | arithmetic-error | halved twice and lost the sign
4 latex "0", expr "0" | im-plug-infinity | wrote F(∞) = 0 and stopped

## im-f-019 — exprs (∫₁^∞ dx/(1+x²) = π/4)
0 ✓ keep \frac{\pi}{4}
1 latex "-\frac{\pi}{4}", expr "-pi/4" | ftc-order-swapped | computed arctan 1 − arctan t
2 latex "-\frac{\pi}{2}", expr "-pi/2" | inverse-trig-value-wrong | dropped the arctan 1 term and swapped the FTC order
3 latex "-\frac{3\pi}{4}", expr "-3*pi/4" | arithmetic-error | added π/4 instead of subtracting it, with the FTC order swapped
4 latex "\frac{\pi}{2}", expr "pi/2" | inverse-trig-value-wrong | forgot to subtract arctan 1

## im-f-020 — exprs (∫_{−∞}^{∞} dx/(1+x²) = π)
0 ✓ keep \pi
1 latex "-\pi", expr "-pi" | sign-error | subtracted the halves in the wrong order
2 latex "-\frac{\pi}{2}", expr "-pi/2" | im-one-half-only | computed only one half and lost the sign
3 latex "-2\pi", expr "-2*pi" | arithmetic-error | doubled π and lost the sign
4 latex "\frac{\pi}{2}", expr "pi/2" | im-one-half-only | computed only ∫₀^∞

## im-f-021 — exprs (∫₀¹ ln x dx = −1)
0 ✓ keep -1
1 latex "1", expr "1" | sign-error | lost the sign of x ln x − x at x = 1
2 latex "2", expr "2" | arithmetic-error | counted the −x term twice and lost the sign
3 latex "\frac{1}{2}", expr "1/2" | ibp-formula-wrong | used x ln x − x/2 as the antiderivative and lost the sign
4 latex "-\frac{1}{2}", expr "-1/2" | ibp-formula-wrong | used x ln x − x/2 as the antiderivative

## im-f-025 — text
0 ✓ keep
1 "$= -2$ by the FTC: $\left[-\dfrac{1}{x}\right]_{-1}^{1}$" | im-hidden-discontinuity | applied the FTC across the blow-up at 0
2 "$= 2$ by the FTC, since the integrand is positive" | im-hidden-discontinuity | fixed the sign but still ignored the discontinuity
3 "$= 0$ by the FTC and symmetry" | im-symmetric-limit | symmetry cannot rescue an interior discontinuity
4 "Diverges because the limits at $x = \pm 1$ are infinite" | im-wrong-type | right verdict, invalid reason: the integrand is 1 at ±1

## im-f-030 — text
0 ✓ keep "$p > 1$"
1 "$p \ge 1$" | im-p-rule-wrong | included p = 1, where ln t → ∞
2 "$p \ge 0$" | im-p-rule-wrong | included every p from 0 to 1, where the integral diverges
3 "$|p| \ge 1$" | im-p-rule-wrong | included p = 1 and negative p, where the integrand grows
4 "$p < 1$" | im-p-rule-wrong | reversed the rule

## im-f-031 — exprs (symbolic p; variable p, domain p in [1.5, 4]; check none unchanged)
0 ✓ keep \frac{1}{p-1}
1 latex "\frac{1}{1-p}", expr "1/(1-p)" | sign-error | lost the sign when evaluating x^{1−p}/(1 − p) at the lower bound
2 latex "\frac{p}{1-p}", expr "p/(1-p)" | arithmetic-error | multiplied by p and lost the sign
3 latex "\frac{2}{1-p}", expr "2/(1-p)" | arithmetic-error | doubled the result and lost the sign
4 latex "\frac{1}{p}", expr "1/p" | power-rule-int-exponent | divided by p instead of 1 − p

## im-g-exp — generator options (keep ✓ = 1/k and the check)
Replace the four distractors by: −1/k | sign-error | lost the minus sign of −(1/k)e^{−kx};  −k | du-constant-wrong | multiplied by k instead of dividing and lost the sign;  −1 | inner-constant-factor-missing | forgot the 1/k and lost the sign;  0 | im-limit-evaluated-wrong | took e^{−kt} → 1. (Render −k and −1/k as reduced fractions / integers, e.g. -\frac{1}{2}, -2, -\frac{2}{3}.)

## im-g-p — generator options (keep ✓ = 1/(p−1) and the check)
Replace the four distractors by: −1/(p−1) | ftc-order-swapped | evaluated F(1) − F(t);  −1/p | power-rule-int-exponent | divided by p instead of p − 1 and swapped the FTC order;  −1/(p+1) | arithmetic-error | used p + 1 instead of p − 1 and swapped the FTC order;  0 | im-plug-infinity | wrote F(∞) = 0 and stopped. (Reduced fractions, e.g. for p = 3/2: 2, −2, −\frac{2}{3}, −\frac{2}{5}, 0.)
