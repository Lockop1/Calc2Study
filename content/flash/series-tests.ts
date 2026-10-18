import type { FlashGenerator, FlashItem } from '../types';

/**
 * Flash Drill items for topic "series-tests" (topic 14: integral test, direct & limit comparison,
 * choosing a test; Lecture 12, §5.3–5.4). Positive-term series only. Authored by content-author;
 * verified by math-verifier.
 *
 * Verdict items (text options, no exprs) carry a `series` or `limit` claim check; those checks are
 * necessary conditions only, so every verdict here was re-derived by hand under the exact test
 * statements of the spec (CLAUDE.md, "Series tests").
 */
export const flash: FlashItem[] = [
  // ───────────────────────── choosing a test (flowchart) ─────────────────────────
  {
    id: 'st-f-001',
    topic: 'series-tests',
    kind: 'technique',
    prompt: { text: 'Which argument correctly settles this series?', latex: '\\sum_{n=1}^{\\infty} \\frac{n}{2n+1}' },
    options: [
      { text: 'Divergence test: $a_n \\to \\frac{1}{2} \\ne 0$, so the series diverges' },
      {
        text: 'Divergence test: $a_n \\to \\frac{1}{2}$, a finite limit, so the series converges',
        mistake: 'sb-sequence-vs-series',
        why: 'The terms converge to $\\frac{1}{2}$, but that is the sequence $a_n$; a series whose terms do not tend to $0$ diverges.',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n}$: $L = \\frac{1}{2}$, so the series diverges',
        mistake: 'st-lct-limit-wrong',
        why: '$\\frac{a_n}{1/n} = \\frac{n^2}{2n+1} \\to \\infty$, not $\\frac{1}{2}$ (that is $\\lim a_n$ itself); the verdict is right but the computation behind it is wrong.',
      },
      {
        text: 'Integral test: $f(x) = \\frac{x}{2x+1}$ is not decreasing, so no conclusion',
        mistake: 'st-divergence-test-skipped',
        why: 'The integral test does fail here, but the divergence test, the first step of the flowchart, settles it: $a_n \\to \\frac{1}{2} \\ne 0$.',
      },
      {
        text: 'Direct comparison: $a_n \\le \\frac{1}{2}$ and $\\sum \\frac{1}{2}$ diverges, so the series diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'Being smaller than a divergent series proves nothing; only being larger than a divergent series proves divergence.',
      },
      {
        text: 'Integral test: $\\int_1^{\\infty} \\frac{x}{2x+1}\\,dx = \\infty$, so the series diverges',
        mistake: 'st-integral-test-conditions',
        why: '$f(x) = \\frac{x}{2x+1}$ is increasing ($f^{\\prime}(x) = \\frac{1}{(2x+1)^2} > 0$), so the integral test does not apply, even though the verdict happens to be right.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{n}{2n+1} \\to \\frac{1}{2} \\ne 0$, so the series diverges by the divergence test, the first check of the flowchart.',
    check: { kind: 'series', term: 'n/(2*n+1)', converges: false },
    difficulty: 1,
    tags: ['flowchart'],
  },
  {
    id: 'st-f-002',
    topic: 'series-tests',
    kind: 'technique',
    prompt: { text: 'Which argument correctly settles this series?', latex: '\\sum_{n=1}^{\\infty} \\frac{4}{3^n}' },
    options: [
      { text: 'Geometric with $r = \\frac{1}{3}$, so the series converges to $2$' },
      {
        text: 'Geometric with $r = 3$, so the series diverges',
        mistake: 'sb-wrong-ratio',
        why: '$\\frac{4}{3^n} = \\frac{4}{3}\\left(\\frac{1}{3}\\right)^{n-1}$: the ratio is $\\frac{1}{3}$, not the base $3$ of the denominator.',
      },
      {
        text: 'Geometric with $r = \\frac{1}{3}$, so the series converges to $6$',
        mistake: 'sb-wrong-first-term',
        why: '$\\frac{a}{1-r}$ needs the first term $a = \\frac{4}{3}$ (at $n = 1$), not the coefficient $4$: $\\frac{4/3}{2/3} = 2$.',
      },
      {
        text: '$p$-series with $p = 3 > 1$, so the series converges',
        mistake: 'st-wrong-p',
        why: '$3^n$ is an exponential, not $n^3$: this is a geometric series, not a $p$-series (right verdict, wrong reason).',
      },
      {
        text: 'Divergence test: $a_n \\to 0$, so the series converges',
        mistake: 'sb-divergence-test-converse',
        why: '$\\lim a_n = 0$ is inconclusive; the divergence test can only ever prove divergence.',
      },
      {
        text: 'Integral test, so the series converges to $\\int_1^{\\infty} \\frac{4}{3^x}\\,dx$',
        mistake: 'st-sum-equals-integral',
        why: 'The integral test only says the series and the integral both converge; the integral, $\\frac{4}{3\\ln 3} \\approx 1.21$, is not the sum.',
      },
    ],
    correct: 0,
    explanation: 'The divergence test is inconclusive ($a_n \\to 0$), but $S_n$ is known: geometric with $a = \\frac{4}{3}$, $r = \\frac{1}{3}$, so the sum is $\\frac{a}{1-r} = \\frac{4/3}{2/3} = 2$.',
    check: { kind: 'series', term: '4/3^n', converges: true, sum: '2' },
    difficulty: 1,
    tags: ['flowchart'],
  },
  {
    // Spec example: limit comparison is inconclusive both ways (L = 0 vs the divergent 1/n,
    // L = ∞ vs any convergent p-series); the integral test with u = ln x settles it.
    id: 'st-f-003',
    topic: 'series-tests',
    kind: 'technique',
    prompt: { text: 'Which argument correctly settles this series?', latex: '\\sum_{n=2}^{\\infty} \\frac{1}{n\\ln n}' },
    options: [
      { text: 'Integral test: $\\int_2^{\\infty} \\frac{dx}{x\\ln x} = \\infty$, so the series diverges' },
      {
        text: 'Integral test: $\\int_2^{\\infty} \\frac{dx}{x\\ln x}$ is finite, so the series converges',
        mistake: 'im-limit-evaluated-wrong',
        why: 'With $u = \\ln x$ the integral is $\\lim_{t\\to\\infty} [\\ln(\\ln t) - \\ln(\\ln 2)]$; $\\ln(\\ln t)$ grows very slowly but without bound.',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n}$: $L = 0$, so the series converges',
        mistake: 'st-lct-boundary',
        why: '$L = 0$ is right, but it only carries convergence over from a convergent $\\sum b_n$; $\\sum \\frac{1}{n}$ diverges, so this is inconclusive.',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n^2}$: $L = \\infty$, so the series diverges',
        mistake: 'st-lct-boundary',
        why: '$L = \\infty$ only carries divergence over from a divergent $\\sum b_n$; $\\sum \\frac{1}{n^2}$ converges, so this is inconclusive (right verdict, invalid reason).',
      },
      {
        text: 'Direct comparison: $a_n < \\frac{1}{n}$ for $n \\ge 3$ and $\\sum \\frac{1}{n}$ diverges, so the series diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'Being smaller than a divergent series proves nothing (right verdict, invalid reason).',
      },
      {
        text: 'Divergence test: $a_n \\to 0$, so the series converges',
        mistake: 'sb-divergence-test-converse',
        why: '$\\lim a_n = 0$ is inconclusive; the divergence test can only ever prove divergence.',
      },
    ],
    correct: 0,
    explanation: '$f(x) = \\frac{1}{x\\ln x}$ is positive, continuous and decreasing on $[2, \\infty)$; with $u = \\ln x$, $\\int_2^t \\frac{dx}{x\\ln x} = \\ln(\\ln t) - \\ln(\\ln 2) \\to \\infty$, so the series diverges.',
    check: { kind: 'series', term: '1/(n*log(n))', from: '2', converges: false },
    difficulty: 2,
    tags: ['flowchart', 'integral-test'],
  },
  {
    id: 'st-f-004',
    topic: 'series-tests',
    kind: 'technique',
    prompt: { text: 'Which argument correctly settles this series?', latex: '\\sum_{n=1}^{\\infty} n e^{-n^2}' },
    options: [
      { text: 'Integral test: $\\int_1^{\\infty} xe^{-x^2}\\,dx = \\frac{1}{2e}$, so the series converges' },
      {
        text: 'Integral test: $\\int_1^{\\infty} xe^{-x^2}\\,dx = \\frac{1}{2e}$, so the series converges to $\\frac{1}{2e}$',
        mistake: 'st-sum-equals-integral',
        why: 'The integral test gives convergence, not the sum: the sum is about $0.405$, while the integral is $\\frac{1}{2e} \\approx 0.184$.',
      },
      {
        text: 'Integral test: $\\int_1^{\\infty} xe^{-x^2}\\,dx = \\frac{1}{e}$, so the series converges',
        mistake: 'du-constant-wrong',
        why: 'With $u = x^2$, $x\\,dx = \\frac{1}{2}\\,du$; the factor $\\frac{1}{2}$ was dropped, so the stated value is wrong.',
      },
      {
        text: 'Divergence test: $a_n \\to 0$, so the series converges',
        mistake: 'sb-divergence-test-converse',
        why: '$\\lim a_n = 0$ is inconclusive; the divergence test can only ever prove divergence.',
      },
      {
        text: 'Direct comparison: $a_n \\le n$ and $\\sum n$ diverges, so the series diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'Being smaller than a divergent series proves nothing.',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n}$: $L = 0$, so the series converges',
        mistake: 'st-lct-boundary',
        why: '$L = 0$ is right, but it only carries convergence over from a convergent $\\sum b_n$; $\\sum \\frac{1}{n}$ diverges, so this is inconclusive.',
      },
    ],
    correct: 0,
    explanation: '$f(x) = xe^{-x^2}$ is positive, continuous and decreasing for $x \\ge 1$ ($f^{\\prime}(x) = (1-2x^2)e^{-x^2} < 0$); with $u = x^2$ the integral is $\\frac{1}{2}e^{-1} = \\frac{1}{2e}$, finite, so the series converges.',
    check: { kind: 'series', term: 'n*exp(-n^2)', converges: true },
    difficulty: 2,
    tags: ['flowchart', 'integral-test'],
  },
  {
    id: 'st-f-005',
    topic: 'series-tests',
    kind: 'technique',
    prompt: { text: 'Which argument correctly settles this series?', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{\\sqrt{n^3+1}}' },
    options: [
      { text: 'Limit comparison with $\\frac{1}{n^{3/2}}$: $L = 1$, so the series converges' },
      {
        text: 'Limit comparison with $\\frac{1}{n^{3}}$: $L = 1$, so the series converges',
        mistake: 'st-wrong-comparison-series',
        why: 'The square root was ignored: $\\sqrt{n^3+1}$ grows like $n^{3/2}$, not $n^3$ (against $\\frac{1}{n^3}$ the limit is $\\infty$, which says nothing).',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n^{2/3}}$: $L = 1$, so the series diverges',
        mistake: 'st-wrong-p',
        why: '$\\sqrt{n^3} = n^{3/2}$; the exponent was inverted to $\\frac{2}{3}$, which flips the verdict.',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n}$: $L = 0$, so the series converges',
        mistake: 'st-lct-boundary',
        why: '$L = 0$ is right, but $L = 0$ against the divergent $\\sum \\frac{1}{n}$ is inconclusive.',
      },
      {
        text: 'Direct comparison: $a_n \\le \\frac{1}{\\sqrt{n}}$ and $\\sum \\frac{1}{\\sqrt{n}}$ diverges, so the series diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'The inequality is true, but being smaller than a divergent series proves nothing.',
      },
    ],
    correct: 0,
    explanation: 'Dominant terms give $b_n = \\frac{1}{n^{3/2}}$: $\\frac{a_n}{b_n} = \\sqrt{\\frac{n^3}{n^3+1}} \\to 1$, and $\\sum \\frac{1}{n^{3/2}}$ converges ($p = \\frac{3}{2} > 1$).',
    check: { kind: 'series', term: '1/sqrt(n^3+1)', converges: true },
    difficulty: 1,
    tags: ['flowchart', 'limit-comparison'],
  },
  {
    // a_n/b_n = 2 + cos n has no limit, so limit comparison cannot be used; f(x) = (2 + cos x)/x^3
    // is not decreasing (f' > 0 near x ≈ 11, 17, 23, …), so the integral test does not apply either.
    id: 'st-f-006',
    topic: 'series-tests',
    kind: 'technique',
    prompt: { text: 'Which argument correctly settles this series?', latex: '\\sum_{n=1}^{\\infty} \\frac{2+\\cos n}{n^3}' },
    options: [
      { text: 'Direct comparison: $a_n \\le \\frac{3}{n^3}$ and $\\sum \\frac{3}{n^3}$ converges, so the series converges' },
      {
        text: 'Direct comparison: $a_n \\ge \\frac{1}{n^3}$ and $\\sum \\frac{1}{n^3}$ converges, so the series converges',
        mistake: 'st-comparison-wrong-direction',
        why: 'The inequality is true, but being larger than a convergent series proves nothing.',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n^3}$: $L = 2$, so the series converges',
        mistake: 'st-lct-limit-wrong',
        why: '$\\frac{a_n}{1/n^3} = 2 + \\cos n$ oscillates between $1$ and $3$ and has no limit, so limit comparison cannot be used.',
      },
      {
        text: 'Integral test: $\\int_1^{\\infty} \\frac{2+\\cos x}{x^3}\\,dx$ converges, so the series converges',
        mistake: 'st-integral-test-conditions',
        why: '$f(x) = \\frac{2+\\cos x}{x^3}$ is not decreasing (for large $x$ it rises again wherever $\\cos x$ is increasing fast enough), so the integral test does not apply.',
      },
      {
        text: 'Divergence test: $\\cos n$ has no limit, so the series diverges',
        mistake: 'sq-limit-law-misuse',
        why: '$\\frac{1}{n^3} \\le a_n \\le \\frac{3}{n^3}$ forces $a_n \\to 0$; $\\cos n$ having no limit does not stop $a_n$ from having one.',
      },
    ],
    correct: 0,
    explanation: '$1 \\le 2 + \\cos n \\le 3$, so $0 < a_n \\le \\frac{3}{n^3}$, and $\\sum \\frac{3}{n^3}$ converges ($p = 3$); the larger series converges, so this one does.',
    check: { kind: 'series', term: '(2+cos(n))/n^3', converges: true },
    difficulty: 2,
    tags: ['flowchart', 'direct-comparison'],
  },
  {
    id: 'st-f-007',
    topic: 'series-tests',
    kind: 'technique',
    prompt: { text: 'Which argument correctly settles this series?', latex: '\\sum_{n=1}^{\\infty} \\left(1 + \\frac{1}{n}\\right)^{n}' },
    options: [
      { text: 'Divergence test: $a_n \\to e \\ne 0$, so the series diverges' },
      {
        text: 'Divergence test: $a_n \\to e$, a finite limit, so the series converges',
        mistake: 'st-wrong-inference',
        why: 'Computed the limit correctly but read a finite limit as convergence of the series.',
      },
      {
        text: 'Divergence test: $a_n \\to 1$, a finite limit, so the series converges',
        mistake: 'sq-substitute-infinity',
        why: 'Plugged $\\infty$ into the base ($1^{\\infty} = 1$) and then read a finite limit as convergence.',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n}$: $L = e$, a finite limit, so the series converges',
        mistake: 'st-lct-limit-wrong',
        why: 'The limit $a_n/(1/n) = n\\,a_n$ is $\\infty$, not $e$; and a finite $L$ against a divergent series would give divergence anyway.',
      },
      {
        text: 'Direct comparison: $a_n \\le e$ and $\\sum e$ diverges, so the series diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'Being below a divergent series gives no information (right verdict, invalid reason).',
      },
    ],
    correct: 0,
    explanation: '$\\left(1 + \\frac{1}{n}\\right)^n \\to e \\ne 0$ (a limit to know), so the series diverges by the divergence test.',
    check: { kind: 'series', term: '(1+1/n)^n', converges: false },
    difficulty: 1,
    tags: ['flowchart'],
  },

  // ───────────────────────── integral test ─────────────────────────
  {
    id: 'st-f-008',
    topic: 'series-tests',
    kind: 'formula',
    prompt: { text: 'The integral test for $\\sum_{n=k}^{\\infty} a_n$ with $a_n = f(n)$ needs which conditions on $f$ over $[k, \\infty)$?' },
    options: [
      { text: '$f$ positive, continuous and decreasing' },
      {
        text: '$f$ continuous and decreasing, with $f(x) \\to 0$',
        mistake: 'st-integral-test-conditions',
        why: 'Dropped "positive" and added the irrelevant condition $f(x) \\to 0$.',
      },
      {
        text: '$f$ positive and continuous, with $f(x) \\to 0$',
        mistake: 'st-integral-test-conditions',
        why: 'Dropped "decreasing" and added the irrelevant condition $f(x) \\to 0$.',
      },
      {
        text: '$f$ positive and decreasing, with $f(x) \\to 0$',
        mistake: 'st-integral-test-conditions',
        why: 'Dropped "continuous" and added the irrelevant condition $f(x) \\to 0$.',
      },
      {
        text: '$f$ positive, continuous and increasing',
        mistake: 'st-integral-test-conditions',
        why: 'Reversed the monotonicity condition: the test needs $f$ decreasing, not increasing.',
      },
    ],
    correct: 0,
    explanation: 'If $f$ is positive, continuous and decreasing on $[k, \\infty)$ with $a_n = f(n)$, then $\\sum_{n=k}^{\\infty} a_n$ and $\\int_k^{\\infty} f(x)\\,dx$ both converge or both diverge.',
    check: { kind: 'none', reason: 'statement of the integral test hypotheses (symbolic f); verified by math-verifier' },
    difficulty: 1,
    tags: ['integral-test'],
  },
  {
    id: 'st-f-009',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Why is the integral test the wrong tool here, and what settles the series?', latex: '\\sum_{n=1}^{\\infty} \\frac{\\sin^2 n}{n^2}' },
    options: [
      { text: '$f(x) = \\frac{\\sin^2 x}{x^2}$ is not decreasing; $a_n \\le \\frac{1}{n^2}$, so it converges' },
      {
        text: '$f(x) = \\frac{\\sin^2 x}{x^2}$ is not decreasing; limit comparison with $\\frac{1}{n^2}$ gives $L = 1$, so it converges',
        mistake: 'st-lct-limit-wrong',
        why: '$a_n/(1/n^2) = \\sin^2 n$ has no limit, so limit comparison does not apply (the verdict happens to be right).',
      },
      {
        text: '$f(x) = \\frac{\\sin^2 x}{x^2}$ is not decreasing; limit comparison with $\\frac{1}{n^2}$ gives $L = 1$, so it diverges',
        mistake: 'st-wrong-inference',
        why: 'Invented a limit $L = 1$ and then drew the wrong conclusion from a convergent comparison series.',
      },
      {
        text: '$f(x) = \\frac{\\sin^2 x}{x^2}$ is not continuous; limit comparison with $\\frac{1}{n^2}$ gives $L = 1$, so it converges',
        mistake: 'st-integral-test-conditions',
        why: '$f$ is continuous; the failing hypothesis is "decreasing", and the limit $L = 1$ does not exist.',
      },
      {
        text: '$f(x) = \\frac{\\sin^2 x}{x^2}$ is not decreasing; $a_n \\le \\frac{1}{n}$, so it diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'Being below a divergent series gives no information about the series.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{\\sin^2 x}{x^2}$ falls to $0$ at every multiple of $\\pi$ and rises again, so it is not decreasing; instead $0 < a_n \\le \\frac{1}{n^2}$ with $\\sum \\frac{1}{n^2}$ convergent, so the series converges by direct comparison.',
    check: { kind: 'series', term: 'sin(n)^2/n^2', converges: true },
    difficulty: 2,
    tags: ['integral-test', 'direct-comparison'],
  },
  {
    // Positivity item only: no verdict on this series is stated or implied (out of scope).
    id: 'st-f-010',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Can the integral test or a comparison test be used on this series?', latex: '\\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n}' },
    options: [
      { text: 'No: its terms are not all positive, and these tests need positive terms' },
      {
        text: 'Yes: compare with $\\sum \\frac{1}{n}$, which diverges, so the series diverges',
        mistake: 'st-positive-terms-required',
        why: 'Comparison tests need positive terms; every odd-numbered term here is negative, so comparing with $\\sum \\frac{1}{n}$ proves nothing.',
      },
      {
        text: 'Yes: $\\int_1^{\\infty} \\frac{dx}{x} = \\infty$, so the series diverges',
        mistake: 'st-positive-terms-required',
        why: 'The integral test needs a positive $f$ with $f(n) = a_n$; $\\frac{1}{x}$ matches $|a_n|$, not $a_n$, so the test says nothing here.',
      },
      {
        text: 'No: its terms do not tend to $0$',
        mistake: 'sq-oscillation-means-divergence',
        why: 'Sign changes do not stop the terms from tending to $0$: $|a_n| = \\frac{1}{n} \\to 0$.',
      },
      {
        text: 'No: $f(x) = \\frac{1}{x}$ is not decreasing',
        mistake: 'st-integral-test-conditions',
        why: '$\\frac{1}{x}$ is decreasing; what fails is positivity, since the terms change sign.',
      },
    ],
    correct: 0,
    explanation: 'The integral test and both comparison tests are for positive-term series; $\\frac{(-1)^n}{n}$ is negative for every odd $n$, so none of them applies.',
    check: { kind: 'none', reason: 'hypothesis check (positive terms); verified by math-verifier' },
    difficulty: 1,
    tags: ['integral-test'],
  },
  {
    id: 'st-f-011',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Integral test for $\\sum_{n=1}^{\\infty} n e^{-n}$: is $f(x) = xe^{-x}$ decreasing on $[1, \\infty)$?' },
    options: [
      { text: 'Yes: $f^{\\prime}(x) = (1-x)e^{-x} \\le 0$ for $x \\ge 1$' },
      {
        text: 'No: $f^{\\prime}(x) = (1-x)e^{-x}$ changes sign at $x = 1$',
        mistake: 'st-integral-test-conditions',
        why: 'The sign change at $x = 1$ is the left endpoint; on $[1, \\infty)$ the derivative is $\\le 0$, so $f$ is decreasing there.',
      },
      {
        text: 'No: $f^{\\prime}(x) = (1+x)e^{-x}$ changes sign at $x = 1$',
        mistake: 'product-rule-missing-term',
        why: 'Differentiated with a sign slip (the derivative is $(1-x)e^{-x}$) and misread the sign.',
      },
      {
        text: 'No: $f^{\\prime}(x) = -xe^{-x}$ changes sign at $x = 1$',
        mistake: 'product-rule-missing-term',
        why: 'Dropped the $e^{-x}$ term of the product rule and misread the sign.',
      },
      {
        text: 'Yes: $e^{-x}$ is decreasing, so $xe^{-x}$ is decreasing',
        mistake: 'st-integral-test-conditions',
        why: 'Right verdict, invalid reason: a product with an increasing factor needs the derivative check.',
      },
    ],
    correct: 0,
    explanation: '$f^{\\prime}(x) = e^{-x} - xe^{-x} = (1-x)e^{-x}$, which is $\\le 0$ for $x \\ge 1$ (zero only at $x = 1$), so $f$ is decreasing on $[1, \\infty)$.',
    check: { kind: 'none', reason: 'hypothesis check of the integral test (sign of the derivative); verified by math-verifier' },
    difficulty: 1,
    tags: ['integral-test'],
  },
  {
    id: 'st-f-012',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Integral test for $\\sum_{n=1}^{\\infty} n e^{-n}$: evaluate the integral it uses.', latex: '\\int_1^{\\infty} xe^{-x}\\,dx' },
    options: [
      { latex: '\\frac{2}{e}', expr: '2/e' },
      {
        latex: '-\\frac{2}{e}',
        expr: '-2/e',
        mistake: 'sign-error',
        why: 'Evaluated $F(1) - F(t)$ instead of $F(t) - F(1)$, which flips the sign of the result.',
      },
      {
        latex: '-\\frac{1}{e}',
        expr: '-1/e',
        mistake: 'ibp-v-wrong',
        why: 'Used $v = e^{-x}$ instead of $-e^{-x}$ and lost the sign of the result.',
      },
      {
        latex: '-\\frac{3}{e}',
        expr: '-3/e',
        mistake: 'arithmetic-error',
        why: 'Added the two terms with the wrong sign and coefficient.',
      },
      {
        latex: '\\frac{1}{e}',
        expr: '1/e',
        mistake: 'ibp-stopped-early',
        why: 'Kept only the $uv$ term of integration by parts and never finished the remaining integral.',
      },
    ],
    correct: 0,
    explanation: 'By parts ($u = x$, $dv = e^{-x}\\,dx$): $\\int xe^{-x}\\,dx = -(x+1)e^{-x}$, so the integral is $\\lim_{t\\to\\infty}\\left[-(t+1)e^{-t}\\right] + 2e^{-1} = \\frac{2}{e}$, finite, so the series converges.',
    check: { kind: 'improper-integral', integrand: 'x*exp(-x)', lower: '1', upper: 'inf', converges: true, value: '2/e' },
    difficulty: 2,
    tags: ['integral-test'],
  },
  {
    // The check validates the u-form ∫_{ln 2}^∞ u^{-2} du (u = ln x, du = dx/x), which equals the
    // prompt's integral; the x-form's 1/ln T tail decays too slowly for the quadrature to pin the value.
    id: 'st-f-013',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Integral test for $\\sum_{n=2}^{\\infty} \\frac{1}{n(\\ln n)^2}$: evaluate the integral it uses.', latex: '\\int_2^{\\infty} \\frac{dx}{x(\\ln x)^2}' },
    options: [
      { latex: '\\frac{1}{\\ln 2}', expr: '1/log(2)' },
      {
        latex: '-\\frac{1}{\\ln 2}',
        expr: '-1/log(2)',
        mistake: 'ftc-order-swapped',
        why: 'Computed $F(2) - F(t)$ instead of $F(t) - F(2)$, which flips the sign of the result.',
      },
      {
        latex: '-\\frac{1}{2\\ln 2}',
        expr: '-1/(2*log(2))',
        mistake: 'du-constant-wrong',
        why: 'Introduced a spurious factor $\\frac{1}{2}$ with $u = \\ln x$ and swapped the FTC order.',
      },
      {
        latex: '-\\frac{1}{(\\ln 2)^2}',
        expr: '-1/log(2)^2',
        mistake: 'power-rule-int-exponent',
        why: 'Integrated $u^{-2}$ as $-u^{-2}$ instead of $-u^{-1}$ and swapped the FTC order.',
      },
      {
        latex: '\\ln 2',
        expr: 'log(2)',
        mistake: 'algebra-error',
        why: 'Inverted the final value, writing $\\ln 2$ instead of $\\frac{1}{\\ln 2}$.',
      },
    ],
    correct: 0,
    explanation: '$u = \\ln x$, $du = \\frac{dx}{x}$: $\\int_{\\ln 2}^{\\infty} u^{-2}\\,du = \\left[-\\frac{1}{u}\\right]_{\\ln 2}^{\\infty} = \\frac{1}{\\ln 2}$, finite, so the series converges.',
    check: { kind: 'improper-integral', integrand: 'u^(-2)', lower: 'log(2)', upper: 'inf', converges: true, value: '1/log(2)' },
    difficulty: 2,
    tags: ['integral-test'],
  },
  {
    // Σ_{n≥2} 1/(n ln²n) ≈ 2.11, while the integral is 1/ln 2 ≈ 1.44.
    id: 'st-f-014',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'With $f$ positive, continuous, decreasing and $\\int_2^{\\infty} \\frac{dx}{x(\\ln x)^2} = \\frac{1}{\\ln 2}$, what follows?', latex: '\\sum_{n=2}^{\\infty} \\frac{1}{n(\\ln n)^2}' },
    options: [
      { text: 'It converges, but $\\frac{1}{\\ln 2}$ is not its sum' },
      {
        text: 'It converges, and $\\frac{1}{\\ln 2}$ is its sum',
        mistake: 'st-sum-equals-integral',
        why: 'The integral test only says both converge; the sum is about $2.11$, not $\\frac{1}{\\ln 2} \\approx 1.44$.',
      },
      {
        text: 'It diverges, since $\\frac{1}{\\ln 2}$ is not $0$',
        mistake: 'st-wrong-inference',
        why: 'A finite integral means convergence; "nonzero means divergence" is the divergence test, which is about $\\lim a_n$, not about the integral.',
      },
      {
        text: 'No conclusion: the integral test can only prove divergence',
        mistake: 'st-wrong-inference',
        why: 'The integral test works both ways: a finite integral proves convergence, an infinite one proves divergence.',
      },
      {
        text: 'It converges, and $0$ is its sum, since $a_n \\to 0$',
        mistake: 'sb-sum-is-term-limit',
        why: 'The sum is $\\lim S_n$, not $\\lim a_n$; the partial sums here increase past $1$.',
      },
    ],
    correct: 0,
    explanation: 'A finite integral (with the three conditions) means the series converges, but the integral test does not give the sum: the series adds to about $2.11$.',
    check: { kind: 'series', term: '1/(n*log(n)^2)', from: '2', converges: true },
    difficulty: 1,
    tags: ['integral-test'],
  },
  {
    id: 'st-f-015',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Integral test for $\\sum_{n=2}^{\\infty} \\frac{1}{n\\ln n}$: with $u = \\ln x$, which expression equals this integral?', latex: '\\int_2^{t} \\frac{dx}{x\\ln x}' },
    options: [
      { latex: '\\ln(\\ln t) - \\ln(\\ln 2)', expr: 'log(log(t)) - log(log(2))' },
      {
        latex: '\\ln(t\\ln t) - \\ln(2\\ln 2)',
        expr: 'log(t*log(t)) - log(2*log(2))',
        mistake: 'ln-misapplied',
        why: 'The log of the whole denominator is not an antiderivative: its derivative is $\\frac{\\ln x + 1}{x\\ln x}$. With $u = \\ln x$ the integrand is $\\frac{du}{u}$.',
      },
      {
        latex: '\\frac{(\\ln t)^2}{2} - \\frac{(\\ln 2)^2}{2}',
        expr: '(log(t))^2/2 - (log(2))^2/2',
        mistake: 'algebra-error',
        why: '$\\frac{dx}{x\\ln x}$ becomes $\\frac{du}{u}$, not $u\\,du$; this is the integral of $\\frac{\\ln x}{x}$.',
      },
      {
        latex: '\\ln(\\ln t)',
        expr: 'log(log(t))',
        mistake: 'ftc-not-subtracted',
        why: 'The lower limit was dropped: $\\ln(\\ln 2)$ must be subtracted.',
      },
      {
        latex: '\\ln(\\ln 2) - \\ln(\\ln t)',
        expr: 'log(log(2)) - log(log(t))',
        mistake: 'ftc-order-swapped',
        why: 'The antiderivative was evaluated lower minus upper.',
      },
      {
        latex: '\\frac{1}{\\ln 2} - \\frac{1}{\\ln t}',
        expr: '1/log(2) - 1/log(t)',
        mistake: 'formula-swapped',
        why: 'That is the result for $\\frac{1}{x(\\ln x)^2}$ ($\\int u^{-2}\\,du$); here the integrand is $u^{-1}$, whose antiderivative is $\\ln|u|$.',
      },
    ],
    correct: 0,
    explanation: '$u = \\ln x$, $du = \\frac{dx}{x}$: $\\int_{\\ln 2}^{\\ln t} \\frac{du}{u} = \\ln(\\ln t) - \\ln(\\ln 2)$, which grows without bound as $t \\to \\infty$, so the series diverges.',
    check: { kind: 'identity', lhs: 'integral(1/(x*log(x)), x, 2, t)' },
    variable: 't',
    domain: [3, 30],
    difficulty: 2,
    tags: ['integral-test'],
  },
  {
    id: 'st-f-016',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Integral test for $\\sum_{n=1}^{\\infty} \\frac{1}{n^2+1}$: evaluate the integral it uses.', latex: '\\int_1^{\\infty} \\frac{dx}{1+x^2}' },
    options: [
      { latex: '\\frac{\\pi}{4}', expr: 'pi/4' },
      {
        latex: '-\\frac{\\pi}{4}',
        expr: '-pi/4',
        mistake: 'ftc-order-swapped',
        why: 'Computed $\\arctan 1 - \\lim_{t\\to\\infty}\\arctan t$; the order is upper minus lower.',
      },
      {
        latex: '-\\frac{\\pi}{2}',
        expr: '-pi/2',
        mistake: 'inverse-trig-value-wrong',
        why: 'Dropped the $\\arctan 1$ term and swapped the FTC order.',
      },
      {
        latex: '-\\frac{3\\pi}{4}',
        expr: '-3*pi/4',
        mistake: 'arithmetic-error',
        why: 'Added $\\frac{\\pi}{4}$ instead of subtracting it, with the FTC order swapped.',
      },
      {
        latex: '\\frac{\\pi}{2}',
        expr: 'pi/2',
        mistake: 'inverse-trig-value-wrong',
        why: 'Forgot to subtract $\\arctan 1 = \\frac{\\pi}{4}$ from $\\lim_{t\\to\\infty}\\arctan t$.',
      },
    ],
    correct: 0,
    explanation: '$\\lim_{t\\to\\infty}\\arctan t - \\arctan 1 = \\frac{\\pi}{2} - \\frac{\\pi}{4} = \\frac{\\pi}{4}$: finite, so the series converges (its sum, about $1.08$, is not $\\frac{\\pi}{4}$).',
    check: { kind: 'improper-integral', integrand: '1/(1+x^2)', lower: '1', upper: 'inf', converges: true, value: 'pi/4' },
    difficulty: 1,
    tags: ['integral-test'],
  },
  {
    id: 'st-f-017',
    topic: 'series-tests',
    kind: 'technique',
    prompt: { text: 'Which integral-test argument is correct?', latex: '\\sum_{n=1}^{\\infty} \\frac{n}{n^2+1}' },
    options: [
      { text: '$\\int_1^{\\infty} \\frac{x}{x^2+1}\\,dx = \\infty$, so the series diverges' },
      {
        text: '$\\int_1^{\\infty} \\frac{x}{x^2+1}\\,dx = \\frac{\\pi}{4}$, so the series converges',
        mistake: 'algebra-error',
        why: 'Integrated as if the integrand were $\\frac{1}{x^2+1}$; the antiderivative is $\\frac{1}{2}\\ln(x^2+1)$, which is unbounded.',
      },
      {
        text: '$\\int_1^{\\infty} \\frac{x}{x^2+1}\\,dx = \\frac{\\pi}{4}$, so the sum of the series is $\\frac{\\pi}{4}$',
        mistake: 'st-sum-equals-integral',
        why: 'Used the wrong integral, and the integral\'s value is never the sum of the series.',
      },
      {
        text: '$\\int_0^{\\infty} \\frac{x}{x^2+1}\\,dx = \\frac{\\pi}{4}$, so the series converges',
        mistake: 'arithmetic-error',
        why: 'Used the wrong lower bound and the wrong integral.',
      },
      {
        text: '$\\frac{n}{n^2+1} \\to 0$, so the series converges',
        mistake: 'sb-divergence-test-converse',
        why: '$\\lim a_n = 0$ is inconclusive; the divergence test can only ever prove divergence.',
      },
    ],
    correct: 0,
    explanation: '$f(x) = \\frac{x}{x^2+1}$ is positive, continuous and decreasing on $[1, \\infty)$ ($f^{\\prime}(x) = \\frac{1-x^2}{(x^2+1)^2} \\le 0$); $\\int_1^t f = \\frac{1}{2}\\ln(t^2+1) - \\frac{1}{2}\\ln 2 \\to \\infty$, so the series diverges.',
    check: { kind: 'series', term: 'n/(n^2+1)', converges: false },
    difficulty: 1,
    tags: ['integral-test'],
  },

  // ───────────────────────── p-series ─────────────────────────
  {
    id: 'st-f-018',
    topic: 'series-tests',
    kind: 'formula',
    prompt: { text: 'For which values of $p$ does the $p$-series converge?', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^p}' },
    options: [
      { text: 'It converges exactly when $p > 1$' },
      {
        text: 'It converges exactly when $p \\ge 1$',
        mistake: 'st-p-rule-wrong',
        why: 'At $p = 1$ it is the harmonic series, which diverges.',
      },
      {
        text: 'It converges exactly when $p \\ge 0$',
        mistake: 'st-p-rule-wrong',
        why: 'Included every $p$ from $0$ to $1$, where the series diverges.',
      },
      {
        text: 'It converges exactly when $|p| \\ge 1$',
        mistake: 'st-p-rule-wrong',
        why: 'Included $p = 1$ and negative $p$, where the terms do not even tend to $0$.',
      },
      {
        text: 'It converges exactly when $p < 1$',
        mistake: 'st-p-rule-wrong',
        why: 'Reversed the rule: a larger $p$ makes the terms shrink faster, so it converges for $p > 1$.',
      },
    ],
    correct: 0,
    explanation: '$\\sum \\frac{1}{n^p}$ converges iff $p > 1$ (integral test with $\\int_1^{\\infty} x^{-p}\\,dx$); $p = 1$ is the divergent harmonic series, and for $p \\le 0$ the terms do not even tend to $0$.',
    check: { kind: 'none', reason: 'rule for a symbolic exponent p; verified by math-verifier' },
    difficulty: 1,
    tags: ['p-series'],
  },
  {
    id: 'st-f-019',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Write the term as $\\frac{1}{n^p}$. Which statement is right?', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n\\sqrt{n}}' },
    options: [
      { text: '$p = \\frac{3}{2}$, so the series converges' },
      {
        text: '$p = \\frac{1}{2}$, so the series diverges',
        mistake: 'st-wrong-p',
        why: 'The exponents were multiplied ($1 \\cdot \\frac{1}{2}$) instead of added: $n\\sqrt{n} = n^{1 + 1/2} = n^{3/2}$.',
      },
      {
        text: '$p = \\frac{2}{3}$, so the series diverges',
        mistake: 'st-wrong-p',
        why: 'The exponent was inverted: $n\\sqrt{n} = n^{3/2}$, so $p = \\frac{3}{2}$.',
      },
      {
        text: '$p = -\\frac{3}{2}$, so the series diverges',
        mistake: 'st-wrong-p',
        why: '$\\frac{1}{n^{3/2}} = n^{-3/2}$, but $p$ is the exponent in the denominator of $\\frac{1}{n^p}$: $p = \\frac{3}{2}$.',
      },
      {
        text: '$p = 3$, so the series converges',
        mistake: 'exponent-arithmetic',
        why: '$n\\sqrt{n} = \\sqrt{n^3}$, and the square root still halves the exponent: $p = \\frac{3}{2}$, not $3$.',
      },
      {
        text: '$p = \\frac{3}{2}$, so the series diverges',
        mistake: 'st-p-rule-wrong',
        why: '$p = \\frac{3}{2} > 1$, and a $p$-series with $p > 1$ converges.',
      },
    ],
    correct: 0,
    explanation: '$n\\sqrt{n} = n^{1}\\cdot n^{1/2} = n^{3/2}$, so $p = \\frac{3}{2} > 1$ and the $p$-series converges.',
    check: { kind: 'series', term: '1/(n*sqrt(n))', converges: true },
    difficulty: 1,
    tags: ['p-series'],
  },
  {
    id: 'st-f-020',
    topic: 'series-tests',
    kind: 'formula',
    prompt: { text: 'Rewrite the term as a single power of $n$ (to read off $p$).', latex: '\\frac{\\sqrt{n}}{n^2}' },
    options: [
      { latex: 'n^{-3/2}', expr: 'n^(-3/2)' },
      {
        latex: 'n^{3/2}',
        expr: 'n^(3/2)',
        mistake: 'sign-error',
        why: 'Dividing by $n^2$ subtracts $2$ from the exponent: $\\frac{1}{2} - 2 = -\\frac{3}{2}$; the subtraction was done the wrong way round.',
      },
      {
        latex: 'n^{5/2}',
        expr: 'n^(5/2)',
        mistake: 'exponent-arithmetic',
        why: 'The exponents were added as for a product $\\sqrt{n}\\cdot n^2$; for a quotient they subtract.',
      },
      {
        latex: 'n^{-5/2}',
        expr: 'n^(-5/2)',
        mistake: 'exponent-arithmetic',
        why: 'The exponents were added ($\\frac{1}{2} + 2$) and then negated; a quotient gives $\\frac{1}{2} - 2 = -\\frac{3}{2}$.',
      },
      {
        latex: 'n^{-1}',
        expr: 'n^(-1)',
        mistake: 'algebra-error',
        why: '$\\sqrt{n}$ was cancelled against a whole factor $n$; it only cancels $n^{1/2}$.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{n^{1/2}}{n^2} = n^{1/2 - 2} = n^{-3/2} = \\frac{1}{n^{3/2}}$, so $p = \\frac{3}{2}$.',
    check: { kind: 'identity', lhs: 'sqrt(n)/n^2' },
    variable: 'n',
    domain: [1, 4],
    difficulty: 1,
    tags: ['p-series'],
  },
  {
    id: 'st-f-021',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Which statement about this series is right?', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{\\sqrt[3]{n^2}}' },
    options: [
      { text: '$p = \\frac{2}{3} \\le 1$, so the series diverges' },
      {
        text: '$p = \\frac{3}{2} > 1$, so the series converges',
        mistake: 'st-wrong-p',
        why: '$\\sqrt[3]{n^2} = n^{2/3}$; the exponent was inverted.',
      },
      {
        text: '$p = 2 > 1$, so the series converges',
        mistake: 'st-wrong-p',
        why: 'The cube root was ignored: $\\sqrt[3]{n^2} = n^{2/3}$.',
      },
      {
        text: '$p = \\frac{2}{3} < 1$, so the series converges',
        mistake: 'st-p-rule-wrong',
        why: 'The rule is backwards: a $p$-series converges only for $p > 1$.',
      },
      {
        text: '$p = \\frac{1}{3} \\le 1$, so the series diverges',
        mistake: 'st-wrong-p',
        why: 'Only the cube root was read; the power $n^2$ under it makes $p = \\frac{2}{3}$ (right verdict, wrong $p$).',
      },
    ],
    correct: 0,
    explanation: '$\\sqrt[3]{n^2} = n^{2/3}$, so $p = \\frac{2}{3} \\le 1$ and the $p$-series diverges.',
    check: { kind: 'series', term: '1/nthRoot(n^2, 3)', converges: false },
    difficulty: 1,
    tags: ['p-series'],
  },
  {
    id: 'st-f-022',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Simplify the term first. Which statement is right?', latex: '\\sum_{n=1}^{\\infty} \\frac{\\sqrt{n}}{n^{3/2}}' },
    options: [
      { text: 'It is $\\sum \\frac{1}{n}$ ($p = 1$), so it diverges' },
      {
        text: 'It is $\\sum \\frac{1}{n}$ ($p = 1$), so it converges',
        mistake: 'st-p-rule-wrong',
        why: '$p = 1$ is the harmonic series, which diverges; convergence needs $p > 1$.',
      },
      {
        text: 'It is $\\sum \\frac{1}{n^{3/2}}$ ($p = \\frac{3}{2}$), so it converges',
        mistake: 'st-wrong-p',
        why: 'The numerator $\\sqrt{n}$ was ignored; it lowers the exponent by $\\frac{1}{2}$.',
      },
      {
        text: 'It is $\\sum \\frac{1}{n^2}$ ($p = 2$), so it converges',
        mistake: 'exponent-arithmetic',
        why: 'The exponents were added; for a quotient they subtract: $\\frac{3}{2} - \\frac{1}{2} = 1$.',
      },
      {
        text: 'It is $\\sum \\frac{1}{\\sqrt{n}}$ ($p = \\frac{1}{2}$), so it diverges',
        mistake: 'exponent-arithmetic',
        why: '$\\frac{3}{2} - \\frac{1}{2} = 1$, not $\\frac{1}{2}$ (right verdict, wrong $p$).',
      },
      {
        text: 'It is $\\sum \\frac{1}{n}$, and $\\frac{1}{n} \\to 0$, so it converges',
        mistake: 'sb-divergence-test-converse',
        why: 'Terms tending to $0$ never prove convergence; the harmonic series is the standard counterexample.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{n^{1/2}}{n^{3/2}} = \\frac{1}{n}$: the harmonic series ($p = 1$), which diverges.',
    check: { kind: 'series', term: 'sqrt(n)/n^(3/2)', converges: false },
    difficulty: 1,
    tags: ['p-series'],
  },
  {
    id: 'st-f-023',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Which statement about this series is right?', latex: '\\sum_{n=1}^{\\infty} \\frac{n^2}{\\sqrt{n}}' },
    options: [
      { text: '$a_n = n^{3/2} \\to \\infty$, so it diverges by the divergence test' },
      {
        text: '$a_n = n^{3/2}$, so $p = -\\frac{3}{2} < 1$ and the series converges',
        mistake: 'st-p-rule-wrong',
        why: 'Read "$p < 1$" as the convergence case; the rule is $p > 1$.',
      },
      {
        text: '$a_n = n^{3/2}$, so $p = -\\frac{3}{2}$ and the $p$-series rule says nothing',
        mistake: 'sb-no-information',
        why: 'Thought the rule says nothing; it covers every $p$: $p \\le 1$ diverges (here the terms even grow).',
      },
      {
        text: '$a_n = n^{5/2}$, so $p = -\\frac{5}{2} < 1$ and the series converges',
        mistake: 'st-wrong-p',
        why: 'Simplified $\\frac{n^2}{\\sqrt{n}}$ to $n^{5/2}$ and then read $p < 1$ as convergence.',
      },
      {
        text: '$a_n = \\frac{1}{n^{3/2}}$, a $p$-series with $p = \\frac{3}{2}$, so it converges',
        mistake: 'st-wrong-p',
        why: 'Inverted the term: $\\frac{n^2}{\\sqrt{n}} = n^{3/2}$, not $\\frac{1}{n^{3/2}}$.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{n^2}{n^{1/2}} = n^{3/2} \\to \\infty$ ($p = -\\frac{3}{2} \\le 0$), so $\\lim a_n \\ne 0$ and the series diverges by the divergence test.',
    check: { kind: 'series', term: 'n^2/sqrt(n)', converges: false },
    difficulty: 1,
    tags: ['p-series'],
  },

  // ───────────────────────── direct comparison ─────────────────────────
  {
    id: 'st-f-024',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Which direct comparison correctly settles this series?', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2+1}' },
    options: [
      { text: '$a_n \\le \\frac{1}{n^2}$ and $\\sum \\frac{1}{n^2}$ converges, so this series does too' },
      {
        text: '$a_n \\le \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ diverges, so this series does too',
        mistake: 'st-comparison-wrong-direction',
        why: 'The inequality is true, but being smaller than a divergent series proves nothing.',
      },
      {
        text: '$a_n \\le \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ converges, so this series does too',
        mistake: 'st-p-rule-wrong',
        why: '$\\sum \\frac{1}{n}$ is the harmonic series, which diverges ($p = 1$), so this comparison proves nothing.',
      },
      {
        text: '$a_n \\ge \\frac{1}{2n^2}$ and $\\sum \\frac{1}{2n^2}$ converges, so this series does too',
        mistake: 'st-comparison-wrong-direction',
        why: 'The inequality is true, but being larger than a convergent series proves nothing.',
      },
      {
        text: '$a_n \\ge \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ diverges, so this series does too',
        mistake: 'algebra-error',
        why: '$n^2 + 1 > n$, so $\\frac{1}{n^2+1} < \\frac{1}{n}$: the inequality is false.',
      },
    ],
    correct: 0,
    explanation: '$n^2 + 1 > n^2$ gives $0 < \\frac{1}{n^2+1} < \\frac{1}{n^2}$, and $\\sum \\frac{1}{n^2}$ converges ($p = 2$), so the smaller series converges.',
    check: { kind: 'series', term: '1/(n^2+1)', converges: true },
    difficulty: 1,
    tags: ['direct-comparison'],
  },
  {
    id: 'st-f-025',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'All you know is $0 < a_n \\le \\frac{1}{n}$ for every $n$. What does direct comparison say about $\\sum a_n$?' },
    options: [
      { text: 'Nothing: being below a divergent series settles nothing' },
      {
        text: 'It diverges: it is below the divergent $\\sum \\frac{1}{n}$',
        mistake: 'st-comparison-wrong-direction',
        why: 'Only being larger than a divergent series proves divergence; $a_n = \\frac{1}{n^2}$ also satisfies the inequality, and it converges.',
      },
      {
        text: 'It converges: it is below the convergent $\\sum \\frac{1}{n}$',
        mistake: 'st-p-rule-wrong',
        why: '$\\sum \\frac{1}{n}$ diverges ($p = 1$); and being below a divergent series settles nothing.',
      },
      {
        text: 'It converges: $a_n \\le \\frac{1}{n} \\to 0$',
        mistake: 'sb-divergence-test-converse',
        why: 'Terms tending to $0$ never prove convergence: $a_n = \\frac{1}{2n}$ satisfies the inequality and diverges.',
      },
      {
        text: 'Nothing: direct comparison must use $\\sum \\frac{1}{n^2}$',
        mistake: 'st-wrong-comparison-series',
        why: 'Any series of known behaviour may be used; what makes this comparison useless is its direction (smaller than a divergent series).',
      },
    ],
    correct: 0,
    explanation: 'Smaller than a divergent series gives no information: $a_n = \\frac{1}{n^2}$ (convergent) and $a_n = \\frac{1}{2n}$ (divergent) both satisfy $0 < a_n \\le \\frac{1}{n}$.',
    check: { kind: 'none', reason: 'abstract comparison (no specific series); verified by math-verifier' },
    difficulty: 1,
    tags: ['direct-comparison'],
  },
  {
    id: 'st-f-026',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Which direct-comparison conclusion is right?', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n - \\frac{1}{2}}' },
    options: [
      { text: 'Diverges: $\\frac{1}{n-1/2} > \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ diverges' },
      {
        text: 'No conclusion: $\\frac{1}{n-1/2} > \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'Treated "larger than a divergent series" as inconclusive; it IS conclusive (the series diverges).',
      },
      {
        text: 'No conclusion: $\\frac{1}{n-1/2} < \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ diverges',
        mistake: 'algebra-error',
        why: 'Got the inequality backwards: $n - \\frac{1}{2} < n$ makes the fraction larger, not smaller.',
      },
      {
        text: 'No conclusion: $\\frac{1}{n-1/2} < \\frac{2}{n}$ and $\\sum \\frac{2}{n}$ diverges',
        mistake: 'st-wrong-comparison-series',
        why: 'Chose a true but useless comparison; the series itself does diverge.',
      },
      {
        text: 'Diverges: $\\frac{1}{n-1/2} < \\frac{2}{n}$ and $\\sum \\frac{2}{n}$ diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'Being below a divergent series gives no information (right verdict, invalid reason).',
      },
    ],
    correct: 0,
    explanation: '$n - \\frac{1}{2} < n$, so $\\frac{1}{n-1/2} > \\frac{1}{n} > 0$; the series is larger than the divergent harmonic series, so it diverges.',
    check: { kind: 'series', term: '1/(n-1/2)', converges: false },
    difficulty: 1,
    tags: ['direct-comparison'],
  },
  {
    // 1/(2^n + n) < 1/n^2 also holds (2^n + n > n^2 for all n ≥ 1), so no option uses 1/n^2.
    id: 'st-f-027',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Which direct-comparison conclusion is right?', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{2^n + n}' },
    options: [
      { text: 'Converges: $a_n < \\frac{1}{2^n}$ and $\\sum \\frac{1}{2^n}$ converges' },
      {
        text: 'Converges: $a_n < \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ converges',
        mistake: 'st-p-rule-wrong',
        why: 'Believed the harmonic series converges, but $\\sum \\frac{1}{n}$ diverges.',
      },
      {
        text: 'Diverges: $a_n < \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'Being below a divergent series gives no information about the series.',
      },
      {
        text: 'No conclusion: $a_n < \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ diverges',
        mistake: 'st-wrong-comparison-series',
        why: 'Picked a useless comparison; comparing with $\\frac{1}{2^n}$ settles it.',
      },
      {
        text: 'Diverges: $a_n < \\frac{1}{2^n}$ and $\\sum \\frac{1}{2^n}$ diverges',
        mistake: 'sb-r-boundary',
        why: 'Thought the geometric series with $r = \\frac{1}{2}$ diverges; it converges.',
      },
    ],
    correct: 0,
    explanation: '$2^n + n > 2^n$, so $0 < a_n < \\left(\\frac{1}{2}\\right)^n$, a convergent geometric series ($r = \\frac{1}{2}$); the smaller series converges.',
    check: { kind: 'series', term: '1/(2^n+n)', converges: true },
    difficulty: 1,
    tags: ['direct-comparison'],
  },
  {
    id: 'st-f-028',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Which direct-comparison conclusion is right?', latex: '\\sum_{n=3}^{\\infty} \\frac{\\ln n}{n}' },
    options: [
      { text: 'Diverges: $\\frac{\\ln n}{n} > \\frac{1}{n}$ for $n \\ge 3$ and $\\sum \\frac{1}{n}$ diverges' },
      {
        text: 'No conclusion: $\\frac{\\ln n}{n} > \\frac{1}{n}$ for $n \\ge 3$ and $\\sum \\frac{1}{n}$ diverges',
        mistake: 'st-wrong-inference',
        why: 'Larger than a divergent series is exactly the case that proves divergence.',
      },
      {
        text: 'Diverges: $\\frac{\\ln n}{n} < \\frac{1}{\\sqrt{n}}$ for $n \\ge 3$ and $\\sum \\frac{1}{\\sqrt{n}}$ diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'The inequality is true ($\\ln n < \\sqrt{n}$), but being smaller than a divergent series proves nothing.',
      },
      {
        text: 'No conclusion: $\\frac{\\ln n}{n} < \\frac{1}{n}$ for $n \\ge 3$ and $\\sum \\frac{1}{n}$ diverges',
        mistake: 'algebra-error',
        why: 'For $n \\ge 3$, $\\ln n > 1$, so $\\frac{\\ln n}{n} > \\frac{1}{n}$; the inequality was reversed.',
      },
      {
        text: 'Converges: $\\frac{\\ln n}{n} \\to 0$',
        mistake: 'sb-divergence-test-converse',
        why: '$\\lim a_n = 0$ is inconclusive; the divergence test can only ever prove divergence.',
      },
    ],
    correct: 0,
    explanation: 'For $n \\ge 3$, $\\ln n > 1$, so $\\frac{\\ln n}{n} > \\frac{1}{n} > 0$; larger than the divergent harmonic series, so the series diverges.',
    check: { kind: 'series', term: 'log(n)/n', from: '3', converges: false },
    difficulty: 1,
    tags: ['direct-comparison'],
  },
  {
    // 1/(n+1) and 1/(2n) would also be valid lower bounds, so neither appears as a distractor.
    id: 'st-f-029',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Which direct comparison proves this series diverges?', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{\\sqrt{n^2+1}}' },
    options: [
      { text: '$a_n \\ge \\frac{1}{2n}$, and $\\sum \\frac{1}{2n}$ diverges' },
      {
        text: '$a_n \\ge \\frac{1}{n}$, and $\\sum \\frac{1}{n}$ diverges',
        mistake: 'algebra-error',
        why: '$\\sqrt{n^2+1} > n$, so $a_n < \\frac{1}{n}$: this inequality is false.',
      },
      {
        text: '$a_n \\le \\frac{1}{n}$, and $\\sum \\frac{1}{n}$ diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'The inequality is true, but being smaller than a divergent series proves nothing.',
      },
      {
        text: '$a_n \\ge \\frac{1}{n^2}$, and $\\sum \\frac{1}{n^2}$ diverges',
        mistake: 'st-p-rule-wrong',
        why: 'The inequality is true, but $\\sum \\frac{1}{n^2}$ converges ($p = 2$), so this proves nothing.',
      },
      {
        text: '$a_n \\le \\frac{1}{\\sqrt{n}}$, and $\\sum \\frac{1}{\\sqrt{n}}$ diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'True, since $n^2 + 1 \\ge n$, but being smaller than a divergent series proves nothing.',
      },
    ],
    correct: 0,
    explanation: '$n^2 + 1 \\le 4n^2$, so $\\sqrt{n^2+1} \\le 2n$ and $a_n \\ge \\frac{1}{2n}$; $\\sum \\frac{1}{2n} = \\frac{1}{2}\\sum \\frac{1}{n}$ diverges, so the larger series diverges.',
    check: { kind: 'series', term: '1/sqrt(n^2+1)', converges: false },
    difficulty: 2,
    tags: ['direct-comparison'],
  },

  // ───────────────────────── limit comparison ─────────────────────────
  {
    id: 'st-f-030',
    topic: 'series-tests',
    kind: 'formula',
    prompt: { text: 'Limit comparison with $a_n, b_n > 0$ and $L = \\lim_{n\\to\\infty} \\frac{a_n}{b_n}$. Which conclusion is valid?' },
    options: [
      { text: '$L = 0$ and $\\sum b_n$ converges, so $\\sum a_n$ converges' },
      {
        text: '$L = 0$ and $\\sum b_n$ diverges, so $\\sum a_n$ diverges',
        mistake: 'st-lct-boundary',
        why: '$L = 0$ means $a_n$ is eventually much smaller than $b_n$; being smaller than a divergent series says nothing.',
      },
      {
        text: '$L = \\infty$ and $\\sum b_n$ converges, so $\\sum a_n$ converges',
        mistake: 'st-lct-boundary',
        why: '$L = \\infty$ means $a_n$ is eventually much larger than $b_n$; being larger than a convergent series says nothing.',
      },
      {
        text: '$L = 0$ and $\\sum b_n$ diverges, so $\\sum a_n$ converges',
        mistake: 'st-lct-boundary',
        why: '$L = 0$ only carries convergence over from $\\sum b_n$; with $\\sum b_n$ divergent nothing follows.',
      },
      {
        text: '$L = \\infty$ and $\\sum b_n$ converges, so $\\sum a_n$ diverges',
        mistake: 'st-lct-boundary',
        why: '$L = \\infty$ only carries divergence over from $\\sum b_n$; with $\\sum b_n$ convergent nothing follows.',
      },
    ],
    correct: 0,
    explanation: '$L = 0$ means $a_n \\le b_n$ eventually, so a convergent $\\sum b_n$ makes $\\sum a_n$ converge (the other conclusive boundary case is $L = \\infty$ with $\\sum b_n$ divergent).',
    check: { kind: 'none', reason: 'statement of the limit comparison boundary cases (symbolic series); verified by math-verifier' },
    difficulty: 2,
    tags: ['limit-comparison'],
  },
  {
    id: 'st-f-031',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Limit comparison of $\\sum_{n=2}^{\\infty} \\frac{\\ln n}{n}$ with $b_n = \\frac{1}{n}$: what is $L$, and what follows?' },
    options: [
      { text: '$L = \\infty$ and $\\sum \\frac{1}{n}$ diverges, so the series diverges' },
      {
        text: '$L = \\infty$, so the test is inconclusive',
        mistake: 'st-lct-boundary',
        why: '$L = \\infty$ is conclusive when $\\sum b_n$ diverges: the larger series diverges too.',
      },
      {
        text: '$L = 0$ and $\\sum \\frac{1}{n}$ diverges, so the series diverges',
        mistake: 'st-lct-limit-wrong',
        why: 'The ratio was inverted: $\\frac{b_n}{a_n} = \\frac{1}{\\ln n} \\to 0$, but $L = \\frac{a_n}{b_n} = \\ln n \\to \\infty$ (and $L = 0$ against a divergent series would say nothing).',
      },
      {
        text: '$L = 0$ and $\\sum \\frac{1}{n}$ diverges, so no conclusion',
        mistake: 'st-lct-limit-wrong',
        why: 'The ratio was inverted: $L = \\frac{a_n}{b_n} = \\ln n \\to \\infty$, not $\\frac{1}{\\ln n} \\to 0$.',
      },
      {
        text: '$L = 1$ and $\\sum \\frac{1}{n}$ diverges, so the series diverges',
        mistake: 'st-lct-limit-wrong',
        why: '$\\ln n$ was treated as a constant; $\\frac{a_n}{b_n} = \\ln n \\to \\infty$.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{\\ln n/n}{1/n} = \\ln n \\to \\infty$, and $\\sum \\frac{1}{n}$ diverges, so the series diverges ($L = \\infty$ with a divergent $\\sum b_n$).',
    check: { kind: 'limit', term: '(log(n)/n)/(1/n)', limit: 'infinity' },
    difficulty: 1,
    tags: ['limit-comparison'],
  },
  {
    id: 'st-f-032',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Which limit comparison settles this series?', latex: '\\sum_{n=2}^{\\infty} \\frac{\\ln n}{n^2}' },
    options: [
      { text: '$b_n = \\frac{1}{n^{3/2}}$: $L = 0$ and $\\sum b_n$ converges, so it converges' },
      {
        text: '$b_n = \\frac{1}{n^2}$: $L = \\infty$ and $\\sum b_n$ converges, so it converges',
        mistake: 'st-lct-boundary',
        why: '$L = \\infty$ against a convergent $\\sum b_n$ is inconclusive (right verdict, invalid reason).',
      },
      {
        text: '$b_n = \\frac{1}{n}$: $L = 0$ and $\\sum b_n$ diverges, so it diverges',
        mistake: 'st-lct-boundary',
        why: '$L = 0$ against a divergent $\\sum b_n$ is inconclusive.',
      },
      {
        text: '$b_n = \\frac{1}{n^2}$: $L = 1$ and $\\sum b_n$ converges, so it converges',
        mistake: 'st-lct-limit-wrong',
        why: '$\\ln n$ was treated as a constant: $\\frac{a_n}{1/n^2} = \\ln n \\to \\infty$.',
      },
      {
        text: '$b_n = \\frac{1}{n^{3/2}}$: $L = \\infty$ and $\\sum b_n$ converges, so no conclusion',
        mistake: 'sq-dominant-term',
        why: '$\\frac{a_n}{b_n} = \\frac{\\ln n}{\\sqrt{n}} \\to 0$: any positive power of $n$ outgrows $\\ln n$.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{\\ln n/n^2}{1/n^{3/2}} = \\frac{\\ln n}{\\sqrt{n}} \\to 0$ and $\\sum \\frac{1}{n^{3/2}}$ converges, so the series converges ($L = 0$ with a convergent $\\sum b_n$).',
    check: { kind: 'limit', term: '(log(n)/n^2)/(1/n^(3/2))', limit: '0' },
    difficulty: 2,
    tags: ['limit-comparison'],
  },
  {
    id: 'st-f-033',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Limit comparison of $\\sum_{n=2}^{\\infty} \\frac{1}{n\\ln n}$ with $b_n = \\frac{1}{n}$ gives $L = 0$. What does that show?' },
    options: [
      { text: 'Nothing: $L = 0$ only helps when $\\sum b_n$ converges' },
      {
        text: 'It converges, because $L = 0$',
        mistake: 'st-lct-boundary',
        why: '$L = 0$ only carries convergence over from a convergent $\\sum b_n$; $\\sum \\frac{1}{n}$ diverges.',
      },
      {
        text: 'It diverges, because $\\sum b_n$ diverges',
        mistake: 'st-lct-boundary',
        why: 'With $L = 0$ the series is eventually smaller than $\\sum b_n$; smaller than a divergent series says nothing.',
      },
      {
        text: 'Nothing: $L = 0$ only helps when $\\sum b_n$ diverges',
        mistake: 'st-lct-boundary',
        why: 'Backwards: $L = 0$ is conclusive exactly when $\\sum b_n$ converges.',
      },
      {
        text: 'It converges, because $\\frac{1}{n\\ln n} \\le \\frac{1}{n^2}$',
        mistake: 'algebra-error',
        why: '$n\\ln n < n^2$, so $\\frac{1}{n\\ln n} > \\frac{1}{n^2}$; the inequality is reversed.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{a_n}{b_n} = \\frac{1}{\\ln n} \\to 0$, but $L = 0$ only carries over convergence of $\\sum b_n$, and $\\sum \\frac{1}{n}$ diverges; the integral test shows this series diverges.',
    check: { kind: 'limit', term: '(1/(n*log(n)))/(1/n)', limit: '0' },
    difficulty: 2,
    tags: ['limit-comparison'],
  },
  {
    id: 'st-f-034',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'For limit comparison, which $b_n$ comes from the dominant terms?', latex: '\\sum_{n=1}^{\\infty} \\frac{\\sqrt{n}+2}{n^2+1}' },
    options: [
      { latex: 'b_n = \\frac{1}{n^{3/2}}' },
      {
        latex: 'b_n = \\frac{1}{n^{2}}',
        mistake: 'st-wrong-comparison-series',
        why: 'The numerator was ignored; its dominant term $\\sqrt{n}$ matters: $\\frac{\\sqrt{n}}{n^2} = \\frac{1}{n^{3/2}}$.',
      },
      {
        latex: 'b_n = \\frac{2}{n^{2}}',
        mistake: 'sq-dominant-term',
        why: 'The constant $2$ was taken as the dominant term of $\\sqrt{n} + 2$; $\\sqrt{n}$ grows, so it dominates.',
      },
      {
        latex: 'b_n = \\frac{1}{n^{5/2}}',
        mistake: 'exponent-arithmetic',
        why: 'The exponents were added; $\\frac{n^{1/2}}{n^2} = n^{1/2 - 2} = n^{-3/2}$.',
      },
      {
        latex: 'b_n = \\frac{1}{n}',
        mistake: 'st-wrong-comparison-series',
        why: '$\\frac{1}{n}$ does not match the growth: $\\frac{a_n}{1/n} \\to 0$, and against the divergent $\\sum \\frac{1}{n}$ that is inconclusive.',
      },
    ],
    correct: 0,
    explanation: 'Keep the dominant terms: $\\frac{\\sqrt{n}}{n^2} = \\frac{1}{n^{3/2}}$; then $\\frac{a_n}{b_n} \\to 1$, and since $\\sum \\frac{1}{n^{3/2}}$ converges, so does the series.',
    check: { kind: 'limit', term: '((sqrt(n)+2)/(n^2+1))/(1/n^(3/2))', limit: '1' },
    difficulty: 1,
    tags: ['limit-comparison'],
  },
  {
    id: 'st-f-035',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Limit comparison with $b_n = \\frac{1}{n^2}$: find $L$ and conclude.', latex: '\\sum_{n=1}^{\\infty} \\frac{3n+1}{2n^3-n}' },
    options: [
      { text: '$L = \\frac{3}{2}$ and $\\sum \\frac{1}{n^2}$ converges, so the series converges' },
      {
        text: '$L = \\frac{2}{3}$ and $\\sum \\frac{1}{n^2}$ converges, so the series converges',
        mistake: 'st-lct-limit-wrong',
        why: 'The ratio was inverted ($\\frac{b_n}{a_n}$); $\\frac{a_n}{b_n} = \\frac{3n^3+n^2}{2n^3-n} \\to \\frac{3}{2}$ (right verdict, wrong $L$).',
      },
      {
        text: '$L = 0$ and $\\sum \\frac{1}{n^2}$ converges, so the series converges',
        mistake: 'st-lct-limit-wrong',
        why: 'That is $\\lim a_n$; the test needs $\\lim \\frac{a_n}{b_n} = \\lim \\frac{n^2(3n+1)}{2n^3-n} = \\frac{3}{2}$.',
      },
      {
        text: '$L = 3$ and $\\sum \\frac{1}{n^2}$ converges, so the series converges',
        mistake: 'st-lct-limit-wrong',
        why: 'The leading coefficient $2$ of the denominator was dropped: $\\frac{3n^3}{2n^3} \\to \\frac{3}{2}$.',
      },
      {
        text: '$L = \\frac{3}{2} \\ne 1$, so the test is inconclusive',
        mistake: 'st-lct-boundary',
        why: 'Any finite $L > 0$ is conclusive, not only $L = 1$: the series behaves like $\\sum \\frac{1}{n^2}$.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{a_n}{b_n} = \\frac{n^2(3n+1)}{2n^3-n} = \\frac{3n^3+n^2}{2n^3-n} \\to \\frac{3}{2}$, with $0 < \\frac{3}{2} < \\infty$, so the series behaves like the convergent $\\sum \\frac{1}{n^2}$.',
    check: { kind: 'limit', term: '((3*n+1)/(2*n^3-n))/(1/n^2)', limit: '3/2' },
    difficulty: 1,
    tags: ['limit-comparison'],
  },
  {
    // Settled by limit comparison with 1/n (L = √n/ln n → ∞); its integral has no elementary antiderivative.
    id: 'st-f-036',
    topic: 'series-tests',
    kind: 'concept',
    prompt: { text: 'Which limit comparison settles this series?', latex: '\\sum_{n=2}^{\\infty} \\frac{1}{\\sqrt{n}\\,\\ln n}' },
    options: [
      { text: '$b_n = \\frac{1}{n}$: $L = \\infty$ and $\\sum b_n$ diverges, so it diverges' },
      {
        text: '$b_n = \\frac{1}{\\sqrt{n}}$: $L = 0$ and $\\sum b_n$ diverges, so it diverges',
        mistake: 'st-lct-boundary',
        why: '$L = 0$ is right for this $b_n$, but $L = 0$ against a divergent $\\sum b_n$ is inconclusive.',
      },
      {
        text: '$b_n = \\frac{1}{n}$: $L = 0$ and $\\sum b_n$ diverges, so no conclusion',
        mistake: 'sq-dominant-term',
        why: '$\\frac{a_n}{1/n} = \\frac{\\sqrt{n}}{\\ln n} \\to \\infty$: $\\sqrt{n}$ outgrows $\\ln n$.',
      },
      {
        text: '$b_n = \\frac{1}{\\sqrt{n}}$: $L = 1$ and $\\sum b_n$ diverges, so it diverges',
        mistake: 'st-lct-limit-wrong',
        why: '$\\ln n$ was treated as a constant; $\\frac{a_n}{1/\\sqrt{n}} = \\frac{1}{\\ln n} \\to 0$.',
      },
      {
        text: '$b_n = \\frac{1}{n^{3/2}}$: $L = \\infty$ and $\\sum b_n$ converges, so it converges',
        mistake: 'st-lct-boundary',
        why: '$L = \\infty$ against a convergent $\\sum b_n$ is inconclusive.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{a_n}{1/n} = \\frac{\\sqrt{n}}{\\ln n} \\to \\infty$ and $\\sum \\frac{1}{n}$ diverges, so the series diverges ($L = \\infty$ with a divergent $\\sum b_n$).',
    check: { kind: 'limit', term: '(1/(sqrt(n)*log(n)))/(1/n)', limit: 'infinity' },
    difficulty: 2,
    tags: ['limit-comparison'],
  },
  {
    id: 'st-f-037',
    topic: 'series-tests',
    kind: 'technique',
    prompt: { text: 'Which argument settles this series?', latex: '\\sum_{n=1}^{\\infty} \\sin\\left(\\frac{1}{n}\\right)' },
    options: [
      { text: 'Limit comparison with $\\frac{1}{n}$: $L = 1$ and $\\sum \\frac{1}{n}$ diverges, so it diverges' },
      {
        text: 'Limit comparison with $\\frac{1}{n}$: $L = 0$ and $\\sum \\frac{1}{n}$ diverges, so no conclusion',
        mistake: 'st-lct-limit-wrong',
        why: 'Used the wrong limit: $\\frac{\\sin(1/n)}{1/n} \\to 1$, not $0$.',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n^2}$: $L = 0$ and $\\sum \\frac{1}{n^2}$ converges, so it converges',
        mistake: 'st-lct-boundary',
        why: 'The limit against $\\frac{1}{n^2}$ is $\\infty$, not $0$; and $L = \\infty$ with a convergent comparison is inconclusive.',
      },
      {
        text: 'Limit comparison with $\\frac{1}{n}$: $L = 0$ and $\\sum \\frac{1}{n}$ diverges, so it converges',
        mistake: 'st-wrong-inference',
        why: 'Used the wrong limit, and $L = 0$ with a divergent comparison would be inconclusive, not convergent.',
      },
      {
        text: 'Direct comparison: $\\sin\\left(\\frac{1}{n}\\right) \\le \\frac{1}{n}$ and $\\sum \\frac{1}{n}$ diverges, so it diverges',
        mistake: 'st-comparison-wrong-direction',
        why: 'Being below a divergent series gives no information (right verdict, invalid reason).',
      },
    ],
    correct: 0,
    explanation: '$\\frac{\\sin(1/n)}{1/n} \\to 1$ (since $\\frac{\\sin x}{x} \\to 1$ as $x \\to 0$), with $0 < 1 < \\infty$, so the series behaves like the divergent $\\sum \\frac{1}{n}$.',
    check: { kind: 'limit', term: 'sin(1/n)/(1/n)', limit: '1' },
    difficulty: 2,
    tags: ['limit-comparison'],
  },
];

// ───────────────────────── generators ─────────────────────────

/** Greatest common divisor (positive integers). */
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/** LaTeX for the fraction m/k in lowest terms (an integer when k divides m). */
function fracTex(m: number, k: number): string {
  const g = gcd(m, k);
  const p = m / g;
  const q = k / g;
  return q === 1 ? `${p}` : `\\frac{${p}}{${q}}`;
}

/** LaTeX for n^e (just n when e = 1). */
function nPow(e: number): string {
  return e === 1 ? 'n' : `n^{${e}}`;
}

/** LaTeX for 1/n^e. */
function recipPow(e: number): string {
  return `\\frac{1}{${nPow(e)}}`;
}

/** Shift an array left by s places (option order is shuffled in the app anyway). */
function rotate<T>(xs: T[], s: number): { items: T[]; index: (i: number) => number } {
  const k = ((s % xs.length) + xs.length) % xs.length;
  return { items: [...xs.slice(k), ...xs.slice(0, k)], index: (i) => (i - k + xs.length) % xs.length };
}

// p-series in radical form c / (k-th root of n^m): p = m/k with gcd(m, k) = 1, m ≥ 2, m ≠ k,
// and m ≠ k², k ≠ m² so that every distractor's p differs from the others.
const P_SERIES: { m: number; k: number }[] = [
  { m: 3, k: 2 },
  { m: 2, k: 3 },
  { m: 5, k: 2 },
  { m: 3, k: 4 },
  { m: 4, k: 3 },
  { m: 2, k: 5 },
  { m: 5, k: 3 },
  { m: 3, k: 5 },
  { m: 5, k: 4 },
  { m: 4, k: 5 },
  { m: 7, k: 2 },
  { m: 6, k: 5 },
  { m: 7, k: 4 },
  { m: 7, k: 3 },
];
const P_COEF = [1, 2, 3, 5, 4];

// Limit comparison for a rational term (αn^a + β)/(γn^b + δ) with b > a ≥ 1 and α ≠ γ:
// b_n = 1/n^(b−a), L = α/γ.
const LCT_RATIONAL: { a: number; b: number; al: number; be: number; ga: number; de: number }[] = [
  { a: 1, b: 2, al: 3, be: 1, ga: 2, de: 5 },
  { a: 1, b: 3, al: 4, be: 1, ga: 3, de: 2 },
  { a: 2, b: 4, al: 3, be: 2, ga: 4, de: 1 },
  { a: 1, b: 2, al: 1, be: 4, ga: 3, de: 1 },
  { a: 2, b: 3, al: 5, be: 1, ga: 2, de: 3 },
  { a: 1, b: 4, al: 2, be: 3, ga: 5, de: 1 },
  { a: 1, b: 3, al: 2, be: 5, ga: 7, de: 1 },
  { a: 2, b: 4, al: 5, be: 1, ga: 3, de: 2 },
  { a: 2, b: 3, al: 2, be: 7, ga: 5, de: 1 },
  { a: 1, b: 3, al: 6, be: 1, ga: 2, de: 1 },
  { a: 1, b: 4, al: 3, be: 1, ga: 2, de: 7 },
  { a: 1, b: 2, al: 4, be: 3, ga: 5, de: 2 },
  { a: 2, b: 5, al: 1, be: 3, ga: 4, de: 1 },
  { a: 2, b: 4, al: 7, be: 2, ga: 3, de: 4 },
  { a: 3, b: 4, al: 2, be: 1, ga: 3, de: 5 },
  { a: 1, b: 3, al: 5, be: 2, ga: 4, de: 3 },
  { a: 3, b: 5, al: 4, be: 1, ga: 5, de: 2 },
  { a: 2, b: 3, al: 3, be: 4, ga: 4, de: 1 },
  { a: 1, b: 2, al: 6, be: 5, ga: 4, de: 3 },
  { a: 3, b: 6, al: 2, be: 5, ga: 3, de: 1 },
];

/** "αn^a + β" as LaTeX (α = 1 is written as n^a). */
function polyTex(coef: number, e: number, c: number): string {
  return `${coef === 1 ? '' : coef}${nPow(e)} + ${c}`;
}

// Direct comparison: a_n vs b_n with a true inequality; the case decides what follows.
type DcCase = 'smaller-conv' | 'smaller-div' | 'larger-div' | 'larger-conv';
type DcBTag = 'st-p-rule-wrong' | 'sb-wrong-ratio';
const DC_TEMPLATES: { a: (k: number) => string; term: (k: number) => string; b: string; c: DcCase; bWhy: string; bTag: DcBTag }[] = [
  { a: (k) => `\\frac{1}{n^2 + ${k}}`, term: (k) => `1/(n^2+${k})`, b: '\\frac{1}{n^2}', c: 'smaller-conv', bWhy: '$\\sum \\frac{1}{n^2}$ converges ($p = 2$)', bTag: 'st-p-rule-wrong' },
  { a: (k) => `\\frac{1}{n^2 + ${k}}`, term: (k) => `1/(n^2+${k})`, b: '\\frac{1}{n}', c: 'smaller-div', bWhy: '$\\sum \\frac{1}{n}$ diverges ($p = 1$)', bTag: 'st-p-rule-wrong' },
  { a: (k) => `\\frac{n + ${k}}{n^2}`, term: (k) => `(n+${k})/n^2`, b: '\\frac{1}{n}', c: 'larger-div', bWhy: '$\\sum \\frac{1}{n}$ diverges ($p = 1$)', bTag: 'st-p-rule-wrong' },
  { a: (k) => `\\frac{n + ${k}}{n^3}`, term: (k) => `(n+${k})/n^3`, b: '\\frac{1}{n^2}', c: 'larger-conv', bWhy: '$\\sum \\frac{1}{n^2}$ converges ($p = 2$)', bTag: 'st-p-rule-wrong' },
  { a: (k) => `\\frac{1}{2^n + ${k}}`, term: (k) => `1/(2^n+${k})`, b: '\\frac{1}{2^n}', c: 'smaller-conv', bWhy: '$\\sum \\frac{1}{2^n}$ converges (geometric, $r = \\frac{1}{2}$)', bTag: 'sb-wrong-ratio' },
  { a: (k) => `\\frac{1}{\\sqrt{n} + ${k}}`, term: (k) => `1/(sqrt(n)+${k})`, b: '\\frac{1}{\\sqrt{n}}', c: 'smaller-div', bWhy: '$\\sum \\frac{1}{\\sqrt{n}}$ diverges ($p = \\frac{1}{2}$)', bTag: 'st-p-rule-wrong' },
  { a: (k) => `\\frac{\\sqrt{n} + ${k}}{n}`, term: (k) => `(sqrt(n)+${k})/n`, b: '\\frac{1}{\\sqrt{n}}', c: 'larger-div', bWhy: '$\\sum \\frac{1}{\\sqrt{n}}$ diverges ($p = \\frac{1}{2}$)', bTag: 'st-p-rule-wrong' },
  { a: (k) => `\\frac{n^2 + ${k}}{n^4}`, term: (k) => `(n^2+${k})/n^4`, b: '\\frac{1}{n^2}', c: 'larger-conv', bWhy: '$\\sum \\frac{1}{n^2}$ converges ($p = 2$)', bTag: 'st-p-rule-wrong' },
];

export const generators: FlashGenerator[] = [
  {
    id: 'st-g-p-series',
    topic: 'series-tests',
    kind: 'concept',
    describe: 'p-series in radical form c/ⁿ√(nᵐ): read off p = m/k and apply the p-series rule',
    generate(seed) {
      const { m, k } = P_SERIES[(seed - 1) % P_SERIES.length];
      const c = P_COEF[(seed - 1) % P_COEF.length];
      const conv = m > k;
      const root = k === 2 ? `\\sqrt{n^{${m}}}` : `\\sqrt[${k}]{n^{${m}}}`;
      const verdict = (v: boolean) => (v ? 'converges' : 'diverges');
      const p = fracTex(m, k);
      const options = [
        { text: `$p = ${p}$, so the series ${verdict(conv)}` },
        {
          text: `$p = ${p}$, so the series ${verdict(!conv)}`,
          mistake: 'st-p-rule-wrong' as const,
          why: conv
            ? `$p = ${p} > 1$, and a $p$-series with $p > 1$ converges; the rule was applied backwards.`
            : `$p = ${p} \\le 1$, and a $p$-series with $p \\le 1$ diverges (even though $a_n \\to 0$); the rule was applied backwards.`,
        },
        {
          text: `$p = ${fracTex(k, m)}$, so the series ${verdict(k > m)}`,
          mistake: 'st-wrong-p' as const,
          why: `The exponent was inverted: $${root} = n^{${m}/${k}}$, so $p = ${p}$.`,
        },
        {
          text: `$p = ${m}$, so the series converges`,
          mistake: 'st-wrong-p' as const,
          why: `The root was ignored: the ${k === 2 ? 'square' : `${k}th`} root divides the exponent ${m} by ${k}, so $p = ${p}$.`,
        },
        {
          text: `$p = ${fracTex(1, k)}$, so the series diverges`,
          mistake: 'st-wrong-p' as const,
          why: `Only the root was read; the power $n^{${m}}$ under it makes $p = ${p}$.`,
        },
      ];
      const r = rotate(options, seed);
      return {
        id: `st-g-p-series:${seed}`,
        topic: 'series-tests',
        kind: 'concept',
        prompt: {
          text: 'Write the term as a constant times $\\frac{1}{n^p}$. Which statement is right?',
          latex: `\\sum_{n=1}^{\\infty} \\frac{${c}}{${root}}`,
        },
        options: r.items,
        correct: r.index(0),
        explanation: `$${root} = n^{${m}/${k}}$, so $p = ${p}$ ${conv ? '> 1' : '\\le 1'} and the $p$-series ${verdict(conv)}${c === 1 ? '' : ` (the constant ${c} does not affect convergence)`}.`,
        check: { kind: 'series', term: `${c}*n^(-${m}/${k})`, converges: conv },
        difficulty: 1,
        tags: ['p-series'],
      };
    },
  },
  {
    id: 'st-g-lct-rational',
    topic: 'series-tests',
    kind: 'concept',
    describe: 'limit comparison for a rational term (αnᵃ + β)/(γnᵇ + δ): b_n = 1/n^(b−a), L = α/γ, verdict from p = b − a',
    generate(seed) {
      const { a, b, al, be, ga, de } = LCT_RATIONAL[(seed - 1) % LCT_RATIONAL.length];
      const q = b - a;
      const conv = q > 1;
      const L = fracTex(al, ga);
      const Linv = fracTex(ga, al);
      const verdict = conv ? 'the series converges' : 'the series diverges';
      const num = polyTex(al, a, be);
      const den = polyTex(ga, b, de);
      const options: { text: string; mistake?: 'st-lct-limit-wrong' | 'st-lct-boundary' | 'st-wrong-comparison-series' | 'exponent-arithmetic' | 'st-p-rule-wrong'; why?: string }[] = [
        { text: `$b_n = ${recipPow(q)}$, $L = ${L}$: ${verdict}` },
        {
          text: `$b_n = ${recipPow(q)}$, $L = ${Linv}$: ${verdict}`,
          mistake: 'st-lct-limit-wrong',
          why: `The ratio was inverted ($\\frac{b_n}{a_n}$); $\\frac{a_n}{b_n} \\to \\frac{${al}}{${ga}}$ (right verdict, wrong $L$).`,
        },
        {
          text: `$b_n = ${recipPow(q)}$, $L = ${L}$: no conclusion`,
          mistake: 'st-lct-boundary',
          why: `Any finite $L > 0$ is conclusive, not only $L = 1$: the series behaves like $\\sum ${recipPow(q)}$.`,
        },
        {
          text: `$b_n = ${recipPow(b)}$, $L = \\infty$: no conclusion`,
          mistake: 'st-wrong-comparison-series',
          why: `Only the denominator was used; the numerator's $${nPow(a)}$ matters, so the dominant terms give $b_n = ${recipPow(q)}$ and a finite $L$.`,
        },
        {
          text: `$b_n = ${recipPow(a + b)}$, $L = \\infty$: no conclusion`,
          mistake: 'exponent-arithmetic',
          why: `The degrees were added; dividing $${nPow(a)}$ by $${nPow(b)}$ subtracts them: $b_n = ${recipPow(q)}$.`,
        },
      ];
      if (!conv) {
        options.push({
          text: `$b_n = \\frac{1}{n}$, $L = ${L}$: the series converges`,
          mistake: 'st-p-rule-wrong',
          why: '$\\sum \\frac{1}{n}$ is the harmonic series ($p = 1$), which diverges, so this series diverges too.',
        });
      }
      const r = rotate(options, seed);
      return {
        id: `st-g-lct-rational:${seed}`,
        topic: 'series-tests',
        kind: 'concept',
        prompt: {
          text: 'Limit comparison: which $b_n$, value of $L$ and conclusion are right?',
          latex: `\\sum_{n=1}^{\\infty} \\frac{${num}}{${den}}`,
        },
        options: r.items,
        correct: r.index(0),
        explanation: `Dominant terms: $\\frac{${al === 1 ? '' : al}${nPow(a)}}{${ga}${nPow(b)}} = \\frac{${al}}{${ga}} \\cdot ${recipPow(q)}$, so $b_n = ${recipPow(q)}$ and $L = ${L}$, with $0 < L < \\infty$; $\\sum ${recipPow(q)}$ ${conv ? 'converges' : 'diverges'} ($p = ${q}$), so ${verdict}.`,
        check: { kind: 'limit', term: `((${al}*n^${a}+${be})/(${ga}*n^${b}+${de}))/(1/n^${q})`, limit: `${al}/${ga}` },
        difficulty: 2,
        tags: ['limit-comparison'],
      };
    },
  },
  {
    id: 'st-g-comparison-direction',
    topic: 'series-tests',
    kind: 'concept',
    describe: 'direct comparison with a true inequality: valid conclusion or no information, by direction and by the behaviour of Σb_n',
    generate(seed) {
      const t = DC_TEMPLATES[(seed - 1) % DC_TEMPLATES.length];
      const k = 1 + (Math.floor((seed - 1) / DC_TEMPLATES.length) % 5);
      const aTex = t.a(k);
      const smaller = t.c === 'smaller-conv' || t.c === 'smaller-div';
      const rel = smaller ? '\\le' : '\\ge';
      const conv = t.c === 'smaller-conv' || t.c === 'larger-conv';
      const S = (v: boolean) => (v ? 'convergent' : 'divergent');
      const R = (s: boolean) => (s ? 'smaller' : 'larger');
      const opt = (head: string, s: boolean, v: boolean) => `${head}: it is ${R(s)} than a ${S(v)} series`;
      const zero = { text: '$\\sum a_n$ converges: its terms tend to $0$', mistake: 'sb-divergence-test-converse' as const, why: 'Terms tending to $0$ never prove convergence (the harmonic series is the counterexample).' };
      type Opt = { text: string; mistake?: 'st-comparison-wrong-direction' | DcBTag | 'st-wrong-inference' | 'algebra-error' | 'sb-divergence-test-converse'; why?: string };
      let options: Opt[];
      let explanation: string;
      if (t.c === 'smaller-conv') {
        options = [
          { text: opt('$\\sum a_n$ converges', true, true) },
          { text: opt('No information', true, true), mistake: 'st-wrong-inference', why: 'Smaller than a convergent series is exactly the case that proves convergence.' },
          { text: opt('No information', true, false), mistake: t.bTag, why: `The comparison series was misjudged: ${t.bWhy}.` },
          { text: opt('No information', false, true), mistake: 'algebra-error', why: `The inequality was read backwards: $a_n ${rel} b_n$ makes $a_n$ the smaller one.` },
          zero,
        ];
        explanation = `$0 < a_n \\le b_n$ and ${t.bWhy}, so the smaller series $\\sum a_n$ converges.`;
      } else if (t.c === 'smaller-div') {
        options = [
          { text: opt('No information', true, false) },
          { text: opt('$\\sum a_n$ diverges', true, false), mistake: 'st-comparison-wrong-direction', why: 'Being smaller than a divergent series proves nothing; only larger than divergent proves divergence.' },
          { text: opt('$\\sum a_n$ converges', true, true), mistake: t.bTag, why: `The comparison series was misjudged: ${t.bWhy}.` },
          { text: opt('$\\sum a_n$ diverges', false, false), mistake: 'algebra-error', why: `The inequality was read backwards: $a_n ${rel} b_n$ makes $a_n$ the smaller one.` },
          zero,
        ];
        explanation = `$a_n \\le b_n$ and ${t.bWhy}: smaller than a divergent series, so this comparison gives no information about $\\sum a_n$.`;
      } else if (t.c === 'larger-div') {
        options = [
          { text: opt('$\\sum a_n$ diverges', false, false) },
          { text: opt('No information', false, false), mistake: 'st-wrong-inference', why: 'Larger than a divergent series is exactly the case that proves divergence.' },
          { text: opt('No information', false, true), mistake: t.bTag, why: `The comparison series was misjudged: ${t.bWhy}.` },
          { text: opt('No information', true, false), mistake: 'algebra-error', why: `The inequality was read backwards: $a_n ${rel} b_n$ makes $a_n$ the larger one.` },
          zero,
        ];
        explanation = `$a_n \\ge b_n > 0$ and ${t.bWhy}, so the larger series $\\sum a_n$ diverges.`;
      } else {
        options = [
          { text: opt('No information', false, true) },
          { text: opt('$\\sum a_n$ converges', false, true), mistake: 'st-comparison-wrong-direction', why: 'Being larger than a convergent series proves nothing; only smaller than convergent proves convergence.' },
          { text: opt('$\\sum a_n$ diverges', false, false), mistake: t.bTag, why: `The comparison series was misjudged: ${t.bWhy}.` },
          { text: opt('$\\sum a_n$ converges', true, true), mistake: 'algebra-error', why: `The inequality was read backwards: $a_n ${rel} b_n$ makes $a_n$ the larger one.` },
          zero,
        ];
        explanation = `$a_n \\ge b_n$ and ${t.bWhy}: larger than a convergent series, so this comparison gives no information about $\\sum a_n$.`;
      }
      const r = rotate(options, seed);
      return {
        id: `st-g-comparison-direction:${seed}`,
        topic: 'series-tests',
        kind: 'concept',
        prompt: {
          text: 'Direct comparison, for all $n \\ge 1$. What does this comparison show about $\\sum a_n$?',
          latex: `a_n = ${aTex} ${rel} ${t.b} = b_n`,
        },
        options: r.items,
        correct: r.index(0),
        explanation,
        check:
          t.c === 'smaller-conv' || t.c === 'larger-div'
            ? { kind: 'series', term: t.term(k), converges: conv }
            : { kind: 'none', reason: 'no-information case: the item asks what this comparison shows, not how the series behaves; verified by math-verifier' },
        difficulty: 1,
        tags: ['direct-comparison'],
      };
    },
  },
];
