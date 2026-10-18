# series-tests (topic 14) — math-verifier report — PARTIAL

**VERDICT: PARTIAL / INCOMPLETE.** The coordinator stopped the run early. Found so far: 0 wrong answers, 2 wrong tags, 2 inaccurate `why` lines, 1 debatable also-correct point, 1 scope note, 2 minor points. Neither file has a verdict yet.

**No edits were made.** Both content files are unchanged. All fixes below are recommendations only.

## Coverage

| Area | Status |
|------|--------|
| Flash st-f-001 … st-f-013 | Checked in full: every answer re-derived and every distractor attacked |
| Flash st-f-014 … st-f-020 | Read once. The stored answers look right, but distractors, tags and whys were not attacked. **Not certified.** |
| Flash st-f-021 … st-f-037 | **Not checked** |
| Generators (3, seeds 1..8) | **Not checked** |
| Steps file (9 problems, st-s-01 … st-s-09) | **Not checked** (file not opened; only the plan was read) |
| Blind-option test | **Not run** |
| Medoid scan | **Not run** |
| tsc / vitest content, volume, medoid, backslash, katex | **Not run** |

## Findings in the checked units

| id / option | Severity | Finding and derivation | Recommended fix |
|---|---|---|---|
| st-f-011 opt "No: $f'(x) = (1+x)e^{-x}$ changes sign at $x=1$" | WRONG_TAG | $(1+x)e^{-x}$ comes from differentiating $e^{-x}$ as $+e^{-x}$, i.e. dropping the inner factor $-1$. No product-rule term is missing. | Change the tag `product-rule-missing-term` → `chain-rule-missing`. Rewrite the why to say "differentiated $e^{-x}$ as $e^{-x}$, dropping the inner factor $-1$". |
| st-f-011 opts with $(1+x)e^{-x}$ and $-xe^{-x}$ | MINOR (plausibility) | Both options say the derivative "changes sign at $x = 1$". That is false for both: $(1+x)e^{-x} > 0$ on $[1,\infty)$ (its sign change is at $-1$), and $-xe^{-x}$ changes sign at $0$. Both options are wrong, but no single realistic chain of reasoning produces either one. | Reword so each option follows from its own derivative. |
| st-f-012 opt $-\frac{2}{e}$ | WRONG_TAG (minor) | The why describes evaluating $F(1) - F(t)$, which is exactly `ftc-order-swapped`. That tag is already used for the same slip in st-f-013 and st-f-016. | Change `sign-error` → `ftc-order-swapped`. |
| st-f-012 opt $-\frac{1}{e}$ | EXPLANATION | The why says "Used $v = e^{-x}$ … and lost the sign". But a complete IBP with $v = e^{-x}$ gives $(x+1)e^{-x}$, which evaluates to $-\frac{2}{e}$. The value $-\frac{1}{e}$ needs $v = e^{-x}$ **and** keeping only the $uv$ term: $[xe^{-x}]_1^{\infty} = -\frac{1}{e}$. | Make the why name both slips. |
| st-f-012 opt $-\frac{3}{e}$ | EXPLANATION (minor) | The why "Added the two terms with the wrong sign and coefficient" names no actual mistake. The only route I found is $du = 2\,dx$ (antiderivative $-(x+2)e^{-x}$) combined with a swapped FTC order, which is contrived. | Replace the value or name a concrete derivation. |
| st-f-008 opts "$f$ continuous and decreasing, with $f(x)\to 0$" and "$f$ positive and decreasing, with $f(x)\to 0$" | DISTRACTOR_ALSO_CORRECT (debatable, low) | Decreasing with limit 0 forces $f \ge 0$, so the first option's missing "positive" is implied. Monotone functions are integrable, so the second option's missing "continuous" is not mathematically needed. Read as "the test as stated in class", only the stored answer is right, so the item stands. Still, the why "added the irrelevant condition $f(x)\to 0$" is inaccurate for the first option. | Orchestrator to decide: add "as stated in class" to the prompt, or use an add-on condition that implies nothing. |
| st-f-010 | SCOPE (report) | The prompt series is $\sum (-1)^n/n$, an alternating series. It is used only as a non-positive-terms example: no verdict is stated or implied, and no alternating series test or absolute convergence appears. The why on one option mentions $|a_n| = \frac{1}{n}$. The author brief's item ideas allow this example. | Orchestrator to decide whether it stays. |
| st-f-007 opt "$a_n\to e$, a finite limit, so the series converges" | MINOR (tag consistency) | st-f-001 tags the same slip `sb-sequence-vs-series`; here it is `st-wrong-inference`. Both are defensible; `sb-sequence-vs-series` is the more precise. | Optional: align the tags. |
| st-f-001 opt "Integral test: $\int_1^\infty \frac{x}{2x+1}dx=\infty$ …" | note (no action) | $f'(x) = \frac{1}{(2x+1)^2} > 0$, so the course's integral test does not apply. A distractor is the right role. (A strong student could argue that for an increasing positive $f$ a divergent integral still forces divergence, but not through the test as stated.) | — |
| st-f-009 compound distractors | note (no action) | The tags `st-wrong-inference` and `st-integral-test-conditions` each cover only one of the two slips, but the whys name both. This is acceptable under the star-pattern policy. | — |

## Certified (answers re-derived; distractors are wrong; tags and whys OK)
- **st-f-001:** $\frac{n}{2n+1}\to\frac12$, so it diverges.
- **st-f-002:** $\frac{4/3}{1-1/3} = 2$. The integral in the distractor's why is $\frac{4}{3\ln 3}\approx 1.21$, as stated.
- **st-f-003:** $\ln\ln t\to\infty$, so it diverges. Comparison with $\frac{1}{n}$ gives $L = 0$ and with $\frac{1}{n^2}$ gives $L = \infty$; both are inconclusive. $a_n < \frac{1}{n}$ holds for $n\ge3$.
- **st-f-004:** $f' = (1-2x^2)e^{-x^2} < 0$ and $\int = \frac{1}{2e}$. The why's figures check out: sum ≈ 0.4049, $\frac{1}{2e}\approx 0.184$.
- **st-f-005:** $L = 1$ against $\frac{1}{n^{3/2}}$, so it converges.
- **st-f-006:** $1\le 2+\cos n\le 3$, so it converges by direct comparison. The claim "$f$ not decreasing" holds: $f' > 0$ near $x\approx 11.0, 17.3, 23.6$.
- **st-f-007:** $a_n\to e\ne0$, so it diverges.
- **st-f-009:** $\sin^2 n > 0$ and $a_n\le\frac{1}{n^2}$, so it converges. $\sin^2 x/x^2$ is not decreasing.
- **st-f-013:** with $u = \ln x$, $\int_{\ln 2}^\infty u^{-2}\,du = \frac{1}{\ln 2}$. Checking the u-form is a valid workaround.

Correct answers also verified, but the items carry the issues above:
- **st-f-008:** positive, continuous, decreasing.
- **st-f-010:** these tests need positive terms.
- **st-f-011:** $f' = (1-x)e^{-x}\le0$ on $[1,\infty)$.
- **st-f-012:** $\int_1^\infty xe^{-x}\,dx = \frac{2}{e}$.

## Remaining for the next verifier
- st-f-014 … st-f-037 in full, plus the three generators (seeds 1..8).
- All nine step problems: step order, results, checks, finals.
- The scope sweep for ratio, root, alternating and absolute content in the rest of both files.
- The blind-option test (≥30% sample), the medoid scan, and the five automated check commands from the brief.
- Applying the recommended fixes above (none have been applied).
