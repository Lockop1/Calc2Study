import type { FlashGenerator, FlashItem } from '../types';

/** Flash Drill items for topic "sequences" (session 3, Phase B). Typed from qa/plans/sequences-flash-plan.md. */
export const flash: FlashItem[] = [
  // ───────────────────────── limits of rational / standard sequences (numeric options) ─────────────────────────
  {
    id: 'sq-f-001',
    topic: 'sequences',
    kind: 'formula',
    prompt: { latex: '\\lim_{n\\to\\infty} \\dfrac{3n^2+1}{n^2-5} = ?' },
    options: [
      { latex: '3', expr: '3' },
      {
        latex: '0',
        expr: '0',
        mistake: 'sq-dominant-term',
        why: 'Compared the degrees wrongly and took the limit to be 0, although numerator and denominator have the same degree.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'sq-substitute-infinity',
        why: 'Plugged in n = ∞ and cancelled ∞/∞ to 1 instead of comparing the leading terms.',
      },
      {
        latex: '-\\frac{1}{5}',
        expr: '-1/5',
        mistake: 'sq-term-vs-limit',
        why: 'Evaluated the term at n = 0 (giving 1/(−5)) instead of taking the limit as n grows.',
      },
      {
        latex: '-\\frac{3}{5}',
        expr: '-3/5',
        mistake: 'arithmetic-error',
        why: 'Divided the leading coefficient 3 by the constant term −5 instead of by the leading coefficient of the denominator.',
      },
    ],
    correct: 0,
    explanation: 'Equal degrees: the limit is the ratio of the leading coefficients, $3/1 = 3$.',
    check: { kind: 'limit', term: '(3*n^2+1)/(n^2-5)', limit: '3' },
  },
  {
    id: 'sq-f-002',
    topic: 'sequences',
    kind: 'formula',
    prompt: { latex: '\\lim_{n\\to\\infty} \\dfrac{2n+1}{n+3} = ?' },
    options: [
      { latex: '2', expr: '2' },
      {
        latex: '\\frac{1}{3}',
        expr: '1/3',
        mistake: 'sq-term-vs-limit',
        why: 'Evaluated the term at n = 0 (giving 1/3) instead of taking the limit as n grows.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'sq-dominant-term',
        why: 'Thought the denominator grows faster than the numerator, but both have degree 1.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'sq-substitute-infinity',
        why: 'Plugged in n = ∞ and cancelled ∞/∞ to 1 instead of comparing the leading terms.',
      },
      {
        latex: '\\frac{2}{3}',
        expr: '2/3',
        mistake: 'arithmetic-error',
        why: 'Divided the leading coefficient 2 by the constant 3 instead of by the leading coefficient 1.',
      },
    ],
    correct: 0,
    explanation: 'Equal degrees: the limit is the ratio of the leading coefficients, $2/1 = 2$.',
    check: { kind: 'limit', term: '(2*n+1)/(n+3)', limit: '2' },
  },
  {
    id: 'sq-f-003',
    topic: 'sequences',
    kind: 'formula',
    prompt: { latex: '\\lim_{n\\to\\infty} \\dfrac{5n-2}{n^2+1} = ?' },
    options: [
      { latex: '0', expr: '0' },
      {
        latex: '5',
        expr: '5',
        mistake: 'sq-dominant-term',
        why: 'Took the ratio of leading coefficients even though the degrees differ and the denominator grows faster.',
      },
      {
        latex: '-2',
        expr: '-2',
        mistake: 'sq-term-vs-limit',
        why: 'Evaluated the term at n = 0 (giving −2/1) instead of taking the limit as n grows.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'sq-substitute-infinity',
        why: 'Plugged in n = ∞ and cancelled ∞/∞ to 1 instead of comparing the degrees.',
      },
      {
        latex: '\\frac{5}{2}',
        expr: '5/2',
        mistake: 'arithmetic-error',
        why: 'Divided 5 by the constant 2 (and dropped the sign) instead of comparing degrees.',
      },
    ],
    correct: 0,
    explanation: 'The degree of the top (1) is less than the degree of the bottom (2), so the limit is $0$.',
    check: { kind: 'limit', term: '(5*n-2)/(n^2+1)', limit: '0' },
  },
  {
    id: 'sq-f-004',
    topic: 'sequences',
    kind: 'formula',
    prompt: { latex: '\\lim_{n\\to\\infty} \\left(1+\\dfrac{2}{n}\\right)^{n} = ?' },
    options: [
      { latex: 'e^{2}', expr: 'e^2' },
      {
        latex: 'e',
        expr: 'e',
        mistake: 'sq-theorem-misattributed',
        why: 'Used the standard limit (1 + 1/n)^n → e without accounting for the 2 in the numerator.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'sq-substitute-infinity',
        why: 'Plugged in n = ∞: (1 + 0)^∞ was taken to be 1, ignoring that this is an indeterminate form.',
      },
      {
        latex: '2e',
        expr: '2*e',
        mistake: 'arithmetic-error',
        why: 'Multiplied e by 2 instead of raising e to the power 2.',
      },
      {
        latex: 'e^{\\frac{1}{2}}',
        expr: 'e^(1/2)',
        mistake: 'exponent-arithmetic',
        why: 'Put the 2 in the denominator of the exponent instead of the numerator.',
      },
    ],
    correct: 0,
    explanation: '$(1 + 2/n)^n = \\left((1 + 2/n)^{n/2}\\right)^2 \\to e^2$.',
    check: { kind: 'limit', term: '(1+2/n)^n', limit: 'e^2' },
  },
  // ───────────────────────── concept: Underlying Function Theorem, special limits (text options) ─────────────────────────
  {
    id: 'sq-f-005',
    topic: 'sequences',
    kind: 'concept',
    prompt: { latex: '\\lim_{n\\to\\infty} n\\sin\\!\\left(\\dfrac{1}{n}\\right) = ?' },
    options: [
      { text: "$1$ — Underlying Function Theorem, then L'Hôpital on $\\dfrac{\\sin(1/x)}{1/x}$" },
      {
        text: '$0$ — $n \\to \\infty$ times $\\sin(1/n) \\to 0$ gives $\\infty \\cdot 0 = 0$',
        mistake: 'sq-limit-law-misuse',
        why: 'Treated the indeterminate form ∞·0 as if it were 0.',
      },
      {
        text: '$\\infty$ — $\\sin(1/n)$ is bounded, so the factor $n \\to \\infty$ wins',
        mistake: 'sq-dominant-term',
        why: 'Ignored that sin(1/n) → 0 and let the factor n dominate.',
      },
      {
        text: 'DNE — $\\sin$ keeps oscillating between $-1$ and $1$ as $n$ grows',
        mistake: 'sq-connect-the-dots',
        why: 'Pictured sin as oscillating, although its argument 1/n tends to 0 and does not run through many periods.',
      },
      {
        text: '$\\sin 1$ — move $n$ inside: $n\\sin(1/n) = \\sin\\left(n \\cdot \\tfrac{1}{n}\\right) = \\sin 1$',
        mistake: 'algebra-error',
        why: 'Moved the factor n inside the sine; n·sin(1/n) is not sin(n · 1/n).',
      },
    ],
    correct: 0,
    explanation: 'With $x = 1/n \\to 0^{+}$, $n\\sin(1/n) = \\dfrac{\\sin x}{x} \\to 1$.',
    check: { kind: 'limit', term: 'n*sin(1/n)', limit: '1' },
  },
  {
    id: 'sq-f-006',
    topic: 'sequences',
    kind: 'formula',
    prompt: { latex: '\\lim_{n\\to\\infty} \\arctan n = ?' },
    options: [
      { latex: '\\frac{\\pi}{2}', expr: 'pi/2' },
      {
        latex: '-\\frac{\\pi}{2}',
        expr: '-pi/2',
        mistake: 'sign-error',
        why: 'Took the limit at −∞ instead of +∞.',
      },
      {
        latex: '-\\pi',
        expr: '-pi',
        mistake: 'inverse-trig-value-wrong',
        why: 'Confused the range of arctan with (0, π) and then flipped the sign.',
      },
      {
        latex: '-\\frac{\\pi}{4}',
        expr: '-pi/4',
        mistake: 'sq-term-vs-limit',
        why: 'Evaluated at n = 1 (arctan 1 = π/4) and made a sign slip.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'sq-substitute-infinity',
        why: '"Cancelled" the infinity and wrote 1 instead of recalling the horizontal asymptote.',
      },
    ],
    correct: 0,
    explanation: '$\\arctan x \\to \\dfrac{\\pi}{2}$ as $x \\to \\infty$ (one of the limits to know).',
    check: { kind: 'limit', term: 'arctan(n)', limit: 'pi/2' },
  },
  {
    id: 'sq-f-007',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'Does $\\left\\{\\left(-\\tfrac{3}{4}\\right)^{n}\\right\\}$ converge? If so, to what?' },
    options: [
      { text: 'Converges to $0$: $|r| = \\tfrac{3}{4} < 1$' },
      {
        text: 'Diverges: the terms alternate in sign',
        mistake: 'sq-oscillation-means-divergence',
        why: 'Assumed a sequence whose terms alternate in sign cannot converge, but the terms shrink toward 0.',
      },
      {
        text: 'Converges to $1$: by the $\\{r^n\\}$ rule',
        mistake: 'sq-rn-boundary',
        why: 'Applied the r = 1 case of the {rⁿ} rule to r = −3/4.',
      },
      {
        text: 'Converges to $-\\tfrac{3}{4}$: the first term',
        mistake: 'sq-term-vs-limit',
        why: 'Reported a term of the sequence instead of its limit.',
      },
      {
        text: 'Diverges: $r = -\\tfrac{3}{4}$ is not in $(-1, 1]$',
        mistake: 'sq-rn-boundary',
        why: 'Misread the interval −1 < r ≤ 1; r = −3/4 does lie inside it.',
      },
    ],
    correct: 0,
    explanation: '$\\{r^n\\}$ converges to $0$ whenever $|r| < 1$, whatever the sign of $r$.',
    check: { kind: 'limit', term: '(-3/4)^n', limit: '0' },
  },
  {
    id: 'sq-f-008',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'Does $\\{(1.01)^{n}\\}$ converge?' },
    options: [
      { text: 'Diverges: $r = 1.01 > 1$, so $r^n \\to \\infty$' },
      {
        text: 'Converges to $1$: $r$ is practically $1$',
        mistake: 'sq-rn-boundary',
        why: 'Treated r ≈ 1 as if it were the exact case r = 1, but any r > 1 gives unbounded growth.',
      },
      {
        text: 'Converges: the first few terms barely change',
        mistake: 'sq-first-terms',
        why: 'Judged the behaviour of the sequence from its first few terms instead of its long-run behaviour.',
      },
      {
        text: 'Diverges: it is increasing, so it cannot settle',
        mistake: 'sq-theorem-misattributed',
        why: 'Right verdict, invalid reason: increasing sequences can converge (n/(n + 1) does); it diverges because r = 1.01 > 1.',
      },
      {
        text: 'Converges: it is monotone',
        mistake: 'sq-monotone-implies-convergent',
        why: 'Used monotonicity alone to conclude convergence; the sequence is also unbounded.',
      },
    ],
    correct: 0,
    explanation: '$\\{r^n\\}$ diverges for every $r > 1$, however close to $1$.',
    check: { kind: 'limit', term: '1.01^n', limit: 'infinity' },
  },
  {
    id: 'sq-f-009',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'Does $\\{(-1)^{n}\\}$ converge?' },
    options: [
      { text: 'Diverges: the terms alternate between $-1$ and $1$ and never settle' },
      {
        text: 'Converges to $0$: the terms are squeezed between $-1$ and $1$',
        mistake: 'sq-squeeze-misuse',
        why: 'Squeezed the terms between bounds whose limits differ (−1 and 1), so the Squeeze Theorem does not apply.',
      },
      {
        text: 'Diverges: $|a_n| = 1$ does not tend to $0$',
        mistake: 'sq-squeeze-misuse',
        why: 'Right verdict, invalid reason: |aₙ| not tending to 0 does not force divergence (the constant sequence 1 converges); only |aₙ| → 0 ⇒ aₙ → 0 is a theorem.',
      },
      {
        text: 'Converges: it is bounded',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Used boundedness alone to conclude convergence, which is the converse of a true theorem.',
      },
      {
        text: 'Converges to $-1$: $r = -1$ is allowed',
        mistake: 'sq-rn-boundary',
        why: 'The {rⁿ} rule is −1 < r ≤ 1, which excludes r = −1.',
      },
    ],
    correct: 0,
    explanation: 'A convergent sequence settles near one value; $(-1)^n$ keeps jumping between $-1$ and $1$.',
    check: { kind: 'limit', term: '(-1)^n', limit: 'dne' },
  },
  {
    id: 'sq-f-010',
    topic: 'sequences',
    kind: 'concept',
    prompt: { latex: '\\lim_{n\\to\\infty} \\sin(n\\pi) = ?' },
    options: [
      { text: '$0$: $\\sin(n\\pi) = 0$ for every integer $n$' },
      {
        text: 'DNE: $\\sin$ oscillates between $-1$ and $1$',
        mistake: 'sq-connect-the-dots',
        why: 'Pictured the continuous graph of sin x instead of its values at the integers n.',
      },
      {
        text: 'DNE: $\\sin(x\\pi)$ oscillates between $-1$ and $1$ as $x \\to \\infty$, so by the Underlying Function Theorem the sequence has no limit',
        mistake: 'sq-theorem-misattributed',
        why: 'The theorem only transfers a limit that exists; it says nothing when the function limit fails.',
      },
      {
        text: '$\\pi$: the value at $n = 1$',
        mistake: 'sq-term-vs-limit',
        why: 'Plugged n = 1 into the argument instead of evaluating the term.',
      },
      {
        text: '$\\infty$: $n\\pi \\to \\infty$',
        mistake: 'sq-dominant-term',
        why: 'Took the limit of the argument nπ instead of the limit of the term sin(nπ).',
      },
    ],
    correct: 0,
    explanation: 'Every term is the sine of a multiple of $\\pi$, which is $0$; the sequence is $0, 0, 0, \\ldots$.',
    check: {
      kind: 'none',
      reason: 'the term sin(nπ) is exactly 0 at every integer n; floating-point noise defeats the numeric limit check',
    },
  },
  {
    id: 'sq-f-011',
    topic: 'sequences',
    kind: 'concept',
    prompt: { latex: '\\lim_{n\\to\\infty} \\dfrac{\\cos n}{n} = ?' },
    options: [
      { text: '$0$: $\\left|\\tfrac{\\cos n}{n}\\right| \\le \\tfrac{1}{n}$ and $\\tfrac{1}{n} \\to 0$ (Squeeze)' },
      {
        text: 'DNE: $\\cos n$ oscillates between $-1$ and $1$, so the quotient never settles',
        mistake: 'sq-oscillation-means-divergence',
        why: 'Assumed oscillation in the numerator makes the limit fail, ignoring the denominator that tends to infinity.',
      },
      {
        text: '$1$: $\\tfrac{1}{n} \\to 0$, so the limit is $\\cos 0 = 1$',
        mistake: 'sq-theorem-misattributed',
        why: 'Misapplied the Continuous Function Theorem to the wrong expression: cos n is not a function of 1/n.',
      },
      {
        text: '$0$: $\\cos n \\to 0$ and $\\tfrac{1}{n} \\to 0$, so the product $\\to 0$',
        mistake: 'sq-limit-law-misuse',
        why: 'Right value but an invalid reason: cos n has no limit, so the product law cannot be used.',
      },
      {
        text: '$\\cos 1$: the limit is the value at $n = 1$',
        mistake: 'sq-term-vs-limit',
        why: 'Reported a term of the sequence instead of its limit.',
      },
    ],
    correct: 0,
    explanation: '$\\left|\\dfrac{\\cos n}{n}\\right| \\le \\dfrac{1}{n} \\to 0$, so the Squeeze Theorem gives $0$.',
    check: { kind: 'limit', term: 'cos(n)/n', limit: '0' },
  },
  {
    id: 'sq-f-012',
    topic: 'sequences',
    kind: 'concept',
    prompt: { latex: '\\lim_{n\\to\\infty} \\left(\\sqrt{n+1} - \\sqrt{n}\\right) = ?' },
    options: [
      { text: '$0$: rationalize to $\\dfrac{1}{\\sqrt{n+1}+\\sqrt{n}} \\to 0$' },
      {
        text: 'DNE: $\\infty - \\infty$ is indeterminate, so there is no limit',
        mistake: 'sq-limit-law-misuse',
        why: 'Treated an indeterminate form as "no limit"; indeterminate means more work is needed, not that the limit fails.',
      },
      {
        text: '$0$: because $\\infty - \\infty = 0$',
        mistake: 'sq-substitute-infinity',
        why: 'Right value but an invalid reason: ∞ − ∞ is not 0 in general.',
      },
      {
        text: '$1$: $\\infty - \\infty$ is indeterminate, so subtract the radicands instead: $(n+1) - n = 1$',
        mistake: 'algebra-error',
        why: 'Replaced the difference of the roots by the difference under the roots.',
      },
      {
        text: '$\\infty$: $\\sqrt{n+1}$ is always bigger than $\\sqrt{n}$, so the gap keeps growing',
        mistake: 'sq-dominant-term',
        why: 'The gap is positive but shrinks: √(n+1) − √n = 1/(√(n+1) + √n) → 0.',
      },
    ],
    correct: 0,
    explanation: 'Multiply by the conjugate: $(\\sqrt{n+1} - \\sqrt{n})(\\sqrt{n+1} + \\sqrt{n}) = 1$, so the term equals $\\dfrac{1}{\\sqrt{n+1}+\\sqrt{n}}$.',
    check: { kind: 'limit', term: 'sqrt(n+1)-sqrt(n)', limit: '0' },
  },
  {
    id: 'sq-f-013',
    topic: 'sequences',
    kind: 'concept',
    prompt: { latex: '\\lim_{n\\to\\infty} n^{1/n} = ?' },
    options: [
      { text: '$1$: $\\ln a_n = \\dfrac{\\ln n}{n} \\to 0$, so $a_n \\to e^{0}$' },
      {
        text: '$0$: the exponent $\\to 0$ kills the term',
        mistake: 'exponent-arithmetic',
        why: 'Confused x⁰ = 1 with 0, so the vanishing exponent was taken to make the whole term vanish.',
      },
      {
        text: '$1$: the exponent $\\to 0$ and $n^{0} = 1$',
        mistake: 'sq-limit-law-misuse',
        why: 'Right value but an invalid reason: the base n is not fixed, so the exponent cannot simply be replaced by its limit.',
      },
      {
        text: '$\\infty$: the exponent $\\to 0$ too slowly to tame $n$',
        mistake: 'sq-dominant-term',
        why: 'Ignored that ln n / n → 0, so the exponent does tame the growing base.',
      },
      {
        text: '$e$: it is the standard limit $(1 + 1/n)^{n}$ in disguise',
        mistake: 'sq-theorem-misattributed',
        why: 'Confused this with the standard limit (1 + 1/n)ⁿ → e.',
      },
    ],
    correct: 0,
    explanation: 'Take logs: $\\ln n / n \\to 0$ (L\'Hôpital via the Underlying Function Theorem), so $n^{1/n} \\to e^{0} = 1$.',
    check: { kind: 'limit', term: 'n^(1/n)', limit: '1' },
  },
  {
    id: 'sq-f-014',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'Class example: does $\\left\\{\\dfrac{2^{2n+1}}{3^{n}}\\right\\}$ converge?' },
    options: [
      { text: 'Diverges: it equals $2\\left(\\tfrac{4}{3}\\right)^{n}$ and $\\tfrac{4}{3} > 1$' },
      {
        text: 'Converges to $0$: it equals $2\\left(\\tfrac{2}{3}\\right)^{n}$ and $\\tfrac{2}{3} < 1$',
        mistake: 'exponent-arithmetic',
        why: 'Rewrote 2^{2n} as 2^n and got the ratio 2/3 instead of 4/3.',
      },
      {
        text: 'Converges to $2$: the constant factor $2$ is the limit',
        mistake: 'sq-term-vs-limit',
        why: 'Reported the coefficient 2 of the geometric form as the limit.',
      },
      {
        text: 'Diverges: the numerator $2^{2n+1} \\to \\infty$',
        mistake: 'sq-dominant-term',
        why: 'Right verdict but an invalid reason: the denominator also tends to infinity, so the comparison of growth rates is what matters.',
      },
      {
        text: 'Converges to $\\tfrac{4}{3}$: $r^{n}$ tends to the ratio $r$',
        mistake: 'sq-rn-boundary',
        why: 'Reported the ratio r as the limit instead of noticing that rⁿ with r > 1 is unbounded.',
      },
    ],
    correct: 0,
    explanation: '$2^{2n+1} = 2\\cdot 4^n$, so the term is $2\\left(\\tfrac{4}{3}\\right)^n$, a geometric sequence with $r = \\tfrac{4}{3} > 1$.',
    check: { kind: 'limit', term: '2*(4/3)^n', limit: 'infinity' },
  },
  {
    id: 'sq-f-015',
    topic: 'sequences',
    kind: 'concept',
    prompt: { latex: '\\lim_{n\\to\\infty} \\dfrac{\\ln n}{\\sqrt{n}} = ?' },
    options: [
      { text: "$0$: L'Hôpital gives $\\dfrac{2}{\\sqrt{x}} \\to 0$" },
      {
        text: "$2$: L'Hôpital gives $\\dfrac{2}{\\sqrt{x}}$, which is $2$ at $x = 1$",
        mistake: 'sq-term-vs-limit',
        why: 'Evaluated 2/√x at x = 1 instead of letting x → ∞.',
      },
      {
        text: "$\\infty$: L'Hôpital gives $2\\sqrt{x} \\to \\infty$",
        mistake: 'algebra-error',
        why: 'Simplified (1/x)·2√x to 2√x, dropping the 1/x; the quotient is 2/√x.',
      },
      {
        text: "$\\infty$: L'Hôpital gives $\\dfrac{\\sqrt{x}}{2} \\to \\infty$",
        mistake: 'algebra-error',
        why: 'Inverted the quotient of derivatives: (1/(2√x))/(1/x) = √x/2 is the reciprocal of the right quotient.',
      },
      {
        text: '$1$: $\\ln n$ and $\\sqrt{n}$ both $\\to \\infty$, and $\\dfrac{\\infty}{\\infty} = 1$',
        mistake: 'sq-substitute-infinity',
        why: 'Plugged in n = ∞ and cancelled ∞/∞ to 1 instead of comparing growth rates.',
      },
    ],
    correct: 0,
    explanation: "L'Hôpital on $f(x) = \\dfrac{\\ln x}{\\sqrt{x}}$: $\\dfrac{1/x}{1/(2\\sqrt{x})} = \\dfrac{2}{\\sqrt{x}} \\to 0$ (any positive power of $n$ beats $\\ln n$).",
    check: { kind: 'limit', term: 'log(n)/sqrt(n)', limit: '0' },
  },
  {
    id: 'sq-f-016',
    topic: 'sequences',
    kind: 'concept',
    prompt: { latex: '\\lim_{n\\to\\infty} \\dfrac{(-1)^{n}}{n} = ?' },
    options: [
      { text: '$0$: $|a_n| = \\tfrac{1}{n} \\to 0$, so $a_n \\to 0$' },
      {
        text: '$0$: $(-1)^{n} \\to 0$ and $\\tfrac{1}{n} \\to 0$, so the product $\\to 0$',
        mistake: 'sq-rn-boundary',
        why: 'Right value but an invalid reason: (−1)ⁿ has no limit, so it cannot be used in the product law.',
      },
      {
        text: 'DNE: because $(-1)^{n}$ has no limit, the quotient has none',
        mistake: 'sq-oscillation-means-divergence',
        why: 'Assumed sign changes prevent convergence, although the terms shrink to 0 in size.',
      },
      {
        text: '$1$: $|a_n| \\le 1$, so the limit is the bound $1$',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Turned a bound on the terms into a limit; a bound is not the limit.',
      },
      {
        text: '$-1$: the first term $a_1 = -1$ is the limit',
        mistake: 'sq-term-vs-limit',
        why: 'Reported a term of the sequence instead of its limit.',
      },
    ],
    correct: 0,
    explanation: '$\\left|\\dfrac{(-1)^n}{n}\\right| = \\dfrac{1}{n} \\to 0$ forces $\\dfrac{(-1)^n}{n} \\to 0$.',
    check: { kind: 'limit', term: '(-1)^n/n', limit: '0' },
  },
  {
    id: 'sq-f-017',
    topic: 'sequences',
    kind: 'concept',
    prompt: { latex: '\\lim_{n\\to\\infty} \\dfrac{n^{2}}{e^{n}} = ?' },
    options: [
      { text: "$0$: L'Hôpital twice on $\\dfrac{x^{2}}{e^{x}}$ gives $\\dfrac{2}{e^{x}} \\to 0$" },
      {
        text: "$2$: after L'Hôpital twice the numerator is $2$",
        mistake: 'algebra-error',
        why: 'Stopped before taking the limit of 2/eˣ, reporting only the numerator 2.',
      },
      {
        text: "$1$: after L'Hôpital twice it is still $\\infty/\\infty$, which cancels",
        mistake: 'sq-substitute-infinity',
        why: 'Plugged in ∞ instead of finishing: after two rounds the quotient is 2/eˣ, not ∞/∞.',
      },
      {
        text: "DNE: L'Hôpital twice is not allowed for a sequence",
        mistake: 'sq-theorem-misattributed',
        why: "Forgot the Underlying Function Theorem, which lets L'Hôpital be applied to f(x) with f(n) = aₙ.",
      },
      {
        text: '$\\infty$: $n^{2}$ grows without bound',
        mistake: 'sq-dominant-term',
        why: 'Ignored that eⁿ grows faster than any power of n.',
      },
    ],
    correct: 0,
    explanation: "Exponentials beat polynomials; two rounds of L'Hôpital show $2/e^x \\to 0$.",
    check: { kind: 'limit', term: 'n^2/exp(n)', limit: '0' },
  },
  {
    id: 'sq-f-018',
    topic: 'sequences',
    kind: 'formula',
    prompt: { latex: '\\lim_{n\\to\\infty} \\dfrac{3n+1}{\\sqrt{4n^{2}+1}} = ?' },
    options: [
      { latex: '\\frac{3}{2}', expr: '3/2' },
      {
        latex: '\\frac{3}{4}',
        expr: '3/4',
        mistake: 'algebra-error',
        why: 'Simplified √(4n²) to 4n instead of 2n.',
      },
      {
        latex: '3',
        expr: '3',
        mistake: 'arithmetic-error',
        why: 'Dropped the 4 under the root, treating √(4n² + 1) as n.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'sq-substitute-infinity',
        why: 'Plugged in n = ∞ and cancelled ∞/∞ to 1 instead of comparing the dominant terms.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'sq-dominant-term',
        why: 'Compared n with n² without taking the square root, so the denominator seemed to grow faster.',
      },
    ],
    correct: 0,
    explanation: '$\\sqrt{4n^2+1}$ behaves like $2n$, so the ratio tends to $\\dfrac{3n}{2n} = \\dfrac{3}{2}$.',
    check: { kind: 'limit', term: '(3*n+1)/sqrt(4*n^2+1)', limit: '3/2' },
  },
  // ───────────────────────── recognising formulas for sequences ─────────────────────────
  {
    id: 'sq-f-019',
    topic: 'sequences',
    kind: 'formula',
    prompt: { text: 'Which formula gives the sequence $2, 6, 18, 54, \\ldots$?' },
    options: [
      { latex: '2 \\cdot 3^{n-1}', expr: '2*3^(n-1)' },
      {
        latex: '3 \\cdot 2^{n-1}',
        expr: '3*2^(n-1)',
        mistake: 'arithmetic-error',
        why: 'Swapped the first term and the ratio: the first term is 2 and the ratio is 3.',
      },
      {
        latex: '3 \\cdot 2^{n}',
        expr: '3*2^n',
        mistake: 'exponent-arithmetic',
        why: 'Swapped a and r and used rⁿ instead of rⁿ⁻¹.',
      },
      {
        latex: '3 \\cdot 2^{n+1}',
        expr: '3*2^(n+1)',
        mistake: 'exponent-arithmetic',
        why: 'Swapped a and r and shifted the exponent the wrong way.',
      },
      {
        latex: '2 + 4(n-1)',
        expr: '2+4*(n-1)',
        mistake: 'sq-wrong-form',
        why: 'Used the arithmetic form a + (n − 1)d for a sequence with a constant ratio.',
      },
    ],
    correct: 0,
    explanation: 'Geometric with $a = 2$ and $r = 3$: $a_n = a\\,r^{n-1} = 2\\cdot 3^{n-1}$.',
    check: { kind: 'identity', lhs: '2*3^(n-1)' },
    variable: 'n',
    domain: { n: [1, 6] },
  },
  {
    id: 'sq-f-020',
    topic: 'sequences',
    kind: 'formula',
    prompt: { text: 'Which formula gives the sequence $7, 4, 1, -2, \\ldots$?' },
    options: [
      { latex: '7 - 3(n-1)', expr: '7-3*(n-1)' },
      {
        latex: '7 + 3(n-1)',
        expr: '7+3*(n-1)',
        mistake: 'sign-error',
        why: 'Used d = +3 for a decreasing sequence; the common difference is −3.',
      },
      {
        latex: '7 + 3n',
        expr: '7+3*n',
        mistake: 'sign-error',
        why: 'Used d = +3 for a decreasing sequence and forgot the (n − 1).',
      },
      {
        latex: '7 - 3(n+1)',
        expr: '7-3*(n+1)',
        mistake: 'sq-wrong-form',
        why: 'Shifted the index the wrong way: a + (n + 1)d gives 1 at n = 1 instead of 7.',
      },
      {
        latex: '7 + 3(n+1)',
        expr: '7+3*(n+1)',
        mistake: 'sq-wrong-form',
        why: 'Two slips: used d = +3 for a decreasing sequence and wrote (n + 1) instead of (n − 1).',
      },
    ],
    correct: 0,
    explanation: 'Arithmetic with $a = 7$ and $d = -3$: $a_n = a + (n-1)d = 7 - 3(n-1)$.',
    check: { kind: 'identity', lhs: '10-3*n' },
    variable: 'n',
    domain: { n: [1, 6] },
  },
  {
    id: 'sq-f-021',
    topic: 'sequences',
    kind: 'formula',
    prompt: { text: 'Rewrite $\\dfrac{2^{2n+1}}{3^{n}}$ as $a\\cdot r^{n}$.' },
    options: [
      { latex: '2\\left(\\frac{4}{3}\\right)^{n}', expr: '2*(4/3)^n' },
      {
        latex: '\\left(\\frac{4}{3}\\right)^{n}',
        expr: '(4/3)^n',
        mistake: 'algebra-error',
        why: 'Dropped the leftover factor 2 from 2^{2n+1} = 2 · 2^{2n}.',
      },
      {
        latex: '\\left(\\frac{8}{3}\\right)^{n}',
        expr: '(8/3)^n',
        mistake: 'exponent-arithmetic',
        why: 'Moved the factor 2 inside the power: 2 · 4ⁿ is not 8ⁿ.',
      },
      {
        latex: '\\left(\\frac{2}{3}\\right)^{n}',
        expr: '(2/3)^n',
        mistake: 'exponent-arithmetic',
        why: 'Two slips: treated 2^{2n} as 2ⁿ (ratio 2/3 instead of 4/3) and dropped the leftover factor 2.',
      },
      {
        latex: '4\\left(\\frac{4}{3}\\right)^{n}',
        expr: '4*(4/3)^n',
        mistake: 'exponent-arithmetic',
        why: 'Read 2^{2n+1} as 2^{2(n+1)} = 4 · 4ⁿ; the exponent is 2n + 1, so the factor is 2, not 4.',
      },
    ],
    correct: 0,
    explanation: '$2^{2n+1} = 2\\cdot(2^2)^n = 2\\cdot 4^n$, so the term is $2\\left(\\tfrac{4}{3}\\right)^n$.',
    check: { kind: 'identity', lhs: '2^(2*n+1)/3^n' },
    variable: 'n',
    domain: { n: [1, 5] },
  },
  // ───────────────────────── rules, theorems and hypotheses (text options, verified by hand) ─────────────────────────
  {
    id: 'sq-f-022',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'For which $r$ does $\\{r^{n}\\}$ converge?' },
    options: [
      { text: '$-1 < r \\le 1$' },
      {
        text: '$|r| < 1$ only',
        mistake: 'sq-rn-boundary',
        why: 'Excluded r = 1, where rⁿ = 1 for all n and the sequence converges to 1.',
      },
      {
        text: '$|r| \\le 1$',
        mistake: 'sq-rn-boundary',
        why: 'Included r = −1, where rⁿ alternates between −1 and 1 and never settles.',
      },
      {
        text: '$|r| < 1$ or $r = -1$',
        mistake: 'sq-rn-boundary',
        why: 'Swapped the boundary cases: r = 1 converges, r = −1 does not.',
      },
      {
        text: '$0 < r \\le 1$',
        mistake: 'sq-oscillation-means-divergence',
        why: 'Excluded negative r because the terms alternate in sign, although for −1 < r < 0 they still tend to 0.',
      },
    ],
    correct: 0,
    explanation: '$\\{r^n\\}$ converges exactly for $-1 < r \\le 1$: the limit is $0$ for $|r| < 1$ and $1$ for $r = 1$.',
    check: { kind: 'none', reason: 'statement of the {r^n} rule' },
  },
  {
    id: 'sq-f-023',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'Which sequence converges?' },
    options: [
      { text: '$\\{(-0.9)^{n}\\}$' },
      {
        text: '$\\{(-1)^{n}\\}$',
        mistake: 'sq-rn-boundary',
        why: 'Treated r = −1 as inside the convergence interval −1 < r ≤ 1.',
      },
      {
        text: '$\\{(1.1)^{n}\\}$',
        mistake: 'sq-first-terms',
        why: 'The early terms grow slowly, so the sequence looked convergent from its first few terms.',
      },
      {
        text: '$\\left\\{(-1)^{n}\\dfrac{n}{n+1}\\right\\}$',
        mistake: 'sq-bounded-implies-convergent',
        why: 'The sequence is bounded, but boundedness does not give convergence: the terms approach ±1 alternately.',
      },
      {
        text: '$\\{\\ln n\\}$',
        mistake: 'sq-dominant-term',
        why: 'ln n grows slowly, but it is unbounded, so the sequence still diverges to infinity.',
      },
    ],
    correct: 0,
    explanation: '$|-0.9| < 1$, so $(-0.9)^n \\to 0$; each of the others fails to settle.',
    check: { kind: 'none', reason: 'comparison of five sequences; each verdict re-derived by the verifier' },
  },
  {
    id: 'sq-f-024',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: "Which theorem lets you use L'Hôpital's rule to find $\\lim_{n\\to\\infty} \\dfrac{\\ln n}{n}$?" },
    options: [
      { text: 'Underlying Function Theorem: if $f(n) = a_n$ and $f(x) \\to L$ as $x \\to \\infty$, then $a_n \\to L$' },
      {
        text: 'Continuous Function Theorem: if $a_n \\to L$ and $f$ is continuous at $L$, then $f(a_n) \\to f(L)$',
        mistake: 'sq-theorem-misattributed',
        why: 'That theorem moves a limit through a continuous function f; it does not create a function limit to differentiate.',
      },
      {
        text: 'Squeeze Theorem: if $b_n \\le a_n \\le c_n$ and $b_n, c_n \\to L$, then $a_n \\to L$',
        mistake: 'sq-theorem-misattributed',
        why: 'No bounding sequences are involved in this argument.',
      },
      {
        text: 'Monotone Convergence Theorem: a monotone, bounded sequence converges',
        mistake: 'sq-theorem-misattributed',
        why: 'Monotone and bounded gives convergence, but not the value of the limit, and it says nothing about derivatives.',
      },
      {
        text: "None: L'Hôpital needs a differentiable function, and $a_n$ is defined only at integers",
        mistake: 'sq-theorem-misattributed',
        why: 'The Underlying Function Theorem exactly justifies it, via the function f(x) = ln x / x.',
      },
    ],
    correct: 0,
    explanation: "The Underlying Function Theorem transfers the limit of $f(x) = \\ln x / x$ (found by L'Hôpital) to the sequence.",
    check: { kind: 'none', reason: 'theorem identification' },
  },
  {
    id: 'sq-f-025',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'If $a_n \\to 4$, what is $\\lim_{n\\to\\infty} \\sqrt{a_n}$?' },
    options: [
      { text: '$2$: $\\sqrt{x}$ is continuous at $4$ (Continuous Function Theorem)' },
      {
        text: '$4$: the limit passes through the square root unchanged',
        mistake: 'sq-theorem-misattributed',
        why: 'Forgot to apply the function f to the limit; the theorem gives f(4), not 4.',
      },
      {
        text: 'Cannot be determined without a formula for $a_n$',
        mistake: 'sq-theorem-misattributed',
        why: 'The theorem needs only the limit of aₙ and the continuity of f at that limit.',
      },
      {
        text: '$16$: the limit gets squared, $4^{2} = 16$',
        mistake: 'algebra-error',
        why: 'Squared the limit instead of taking its square root.',
      },
      {
        text: '$2$, but only if $\\{a_n\\}$ is monotone (Monotone Convergence Theorem)',
        mistake: 'sq-theorem-misattributed',
        why: 'Added a hypothesis (monotonicity) that the Continuous Function Theorem does not need.',
      },
    ],
    correct: 0,
    explanation: '$a_n \\to 4$ and $\\sqrt{x}$ is continuous at $4$, so $\\sqrt{a_n} \\to \\sqrt{4} = 2$.',
    check: { kind: 'none', reason: 'theorem application, verified by hand' },
  },
  {
    id: 'sq-f-026',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'Which argument shows $\\dfrac{\\cos^{2} n}{n^{2}} \\to 0$?' },
    options: [
      { text: '$0 \\le \\dfrac{\\cos^{2} n}{n^{2}} \\le \\dfrac{1}{n^{2}}$ and both bounds $\\to 0$ (Squeeze Theorem)' },
      {
        text: '$\\cos^{2} n \\to 0$ and $\\dfrac{1}{n^{2}} \\to 0$, so the product $\\to 0$ (product law)',
        mistake: 'sq-limit-law-misuse',
        why: 'cos² n has no limit, so the product law does not apply.',
      },
      {
        text: '$\\cos^{2} n$ is bounded, so the sequence converges (bounded sequences converge)',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Bounded does not imply convergent, and boundedness of one factor alone gives no limit for the sequence.',
      },
      {
        text: '$\\dfrac{1}{n^{2}} \\le \\dfrac{\\cos^{2} n}{n^{2}}$ and $\\dfrac{1}{n^{2}} \\to 0$ (Squeeze Theorem)',
        mistake: 'sq-squeeze-misuse',
        why: 'The inequality points the wrong way (cos² n ≤ 1 gives cos² n / n² ≤ 1/n²), and one bound alone squeezes nothing.',
      },
      {
        text: 'The terms oscillate with $\\cos^{2} n$, so the sequence diverges',
        mistake: 'sq-oscillation-means-divergence',
        why: 'Oscillation in the numerator does not prevent convergence when the denominator tends to infinity.',
      },
    ],
    correct: 0,
    explanation: 'Trap the term between $0$ and $\\dfrac{1}{n^2}$; both bounds go to $0$.',
    check: { kind: 'none', reason: 'method identification' },
  },
  {
    id: 'sq-f-027',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'Which fact proves $\\dfrac{(-1)^{n}}{n} \\to 0$?' },
    options: [
      { text: '$|a_n| = \\dfrac{1}{n} \\to 0$, so $a_n \\to 0$' },
      {
        text: '$(-1)^{n} \\to 0$',
        mistake: 'sq-rn-boundary',
        why: '(−1)ⁿ has no limit, so it cannot be used to argue that the product tends to 0.',
      },
      {
        text: 'Bounded sequences converge',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Boundedness alone gives no limit; a bounded sequence can oscillate forever.',
      },
      {
        text: 'The terms get smaller, so they approach $0$',
        mistake: 'sq-monotone-implies-convergent',
        why: 'The terms are not even monotone, and "getting smaller" is not a limit argument.',
      },
      {
        text: "L'Hôpital on $\\dfrac{(-1)^{x}}{x}$",
        mistake: 'sq-theorem-misattributed',
        why: '(−1)ˣ is not a real differentiable function, so the Underlying Function Theorem cannot be applied.',
      },
    ],
    correct: 0,
    explanation: 'The corollary of the Squeeze Theorem: $|a_n| \\to 0$ forces $a_n \\to 0$.',
    check: { kind: 'none', reason: 'justification choice' },
  },
  {
    id: 'sq-f-028',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: '$a_n = \\dfrac{n}{n+1}$. Which argument uses the Monotone Convergence Theorem correctly?' },
    options: [
      { text: 'Increasing and bounded above by $1$, so it converges' },
      {
        text: 'Increasing and bounded below by $\\tfrac{1}{2}$, so it converges',
        mistake: 'sq-theorem-misattributed',
        why: 'An increasing sequence is always bounded below by its first term; the theorem needs an increasing sequence to be bounded ABOVE.',
      },
      {
        text: 'Decreasing and bounded below by $\\tfrac{1}{2}$, so it converges',
        mistake: 'algebra-error',
        why: 'The sequence is increasing, not decreasing: aₙ₊₁ − aₙ = 1/((n + 1)(n + 2)) > 0.',
      },
      {
        text: 'Bounded above by $1$ and below by $\\tfrac{1}{2}$, so it converges',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Bounded alone is not enough; the theorem also needs the sequence to be monotone.',
      },
      {
        text: '$\\tfrac{1}{2}, \\tfrac{2}{3}, \\tfrac{3}{4}$ increase toward $1$, so it converges',
        mistake: 'sq-first-terms',
        why: 'Judged convergence from the first few terms, which is not a proof.',
      },
    ],
    correct: 0,
    explanation: '$a_{n+1} - a_n = \\dfrac{1}{(n+1)(n+2)} > 0$ (increasing) and $a_n < 1$ (bounded above): monotone AND bounded in the matching direction.',
    check: { kind: 'none', reason: 'theorem application' },
  },
  {
    id: 'sq-f-029',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: 'What does the sequence $\\{(-1)^{n}\\}$ demonstrate?' },
    options: [
      { text: 'A bounded sequence need not converge' },
      {
        text: 'A convergent sequence need not be bounded',
        mistake: 'sq-theorem-misattributed',
        why: 'Convergent sequences are always bounded; this example does not contradict that.',
      },
      {
        text: 'A monotone sequence need not be bounded',
        mistake: 'sq-theorem-misattributed',
        why: '(−1)ⁿ is not monotone, so it cannot illustrate a statement about monotone sequences.',
      },
      {
        text: 'Every bounded sequence converges to its bound',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Boundedness does not give a limit, and a bound is not the limit.',
      },
      {
        text: 'Oscillating sequences converge to the average of their values',
        mistake: 'sq-theorem-misattributed',
        why: 'Squeezing between −1 and 1 gives no limit; there is no averaging rule for oscillating sequences.',
      },
    ],
    correct: 0,
    explanation: '$\\{(-1)^n\\}$ is bounded by $1$ yet never settles, so bounded does not imply convergent.',
    check: { kind: 'none', reason: 'conceptual' },
  },
  {
    id: 'sq-f-030',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: '$a_n \\to 5$. Which statement must be true?' },
    options: [
      { text: '$\\{a_n\\}$ is bounded' },
      {
        text: '$\\{a_n\\}$ is monotone',
        mistake: 'sq-theorem-misattributed',
        why: 'Convergence does not force monotonicity; the terms may bounce around 5.',
      },
      {
        text: '$a_n = 5$ for all large $n$',
        mistake: 'sq-term-vs-limit',
        why: 'A limit need not be attained by any term of the sequence.',
      },
      {
        text: '$a_n \\le 5$ for every $n$',
        mistake: 'sq-theorem-misattributed',
        why: 'The terms may approach 5 from above, so they need not stay below it.',
      },
      {
        text: '$a_{n+1} - a_n \\to 5$',
        mistake: 'sq-limit-law-misuse',
        why: 'The differences of a convergent sequence tend to 0, not to the limit.',
      },
    ],
    correct: 0,
    explanation: 'Convergent implies bounded (the converse is false).',
    check: { kind: 'none', reason: 'conceptual' },
  },
  {
    id: 'sq-f-031',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: '$a_n \\to 2$ and $b_n \\to 0$. What do the limit laws say about $\\lim \\dfrac{a_n}{b_n}$?' },
    options: [
      { text: 'Nothing: the quotient law needs $\\lim b_n \\ne 0$' },
      {
        text: 'Nothing: the quotient law needs $\\lim a_n \\ne 0$',
        mistake: 'sq-theorem-misattributed',
        why: 'Right conclusion, wrong hypothesis: the quotient law needs the DENOMINATOR limit to be nonzero (and here lim aₙ = 2 ≠ 0 anyway).',
      },
      {
        text: 'It is $\\infty$: the quotient law gives $\\dfrac{\\lim a_n}{\\lim b_n} = \\dfrac{2}{0} = \\infty$',
        mistake: 'sq-limit-law-misuse',
        why: 'Applied the quotient law with a zero denominator limit; the law does not apply, and the quotient can tend to −∞ or have no limit (e.g. bₙ = (−1)ⁿ/n).',
      },
      {
        text: 'It is $0$: anything with a factor tending to $0$ tends to $0$',
        mistake: 'sq-limit-law-misuse',
        why: 'A denominator tending to 0 makes the quotient large in size, not small.',
      },
      {
        text: 'It is $2$: once $b_n \\to 0$ is dropped, only $\\lim a_n = 2$ remains',
        mistake: 'algebra-error',
        why: 'Ignored the denominator; a denominator tending to 0 cannot be dropped.',
      },
    ],
    correct: 0,
    explanation: 'The quotient law requires $\\lim b_n \\ne 0$, so the laws give no value; in fact $|a_n/b_n| \\to \\infty$ and the sign of $b_n$ decides ($b_n = 1/n$ gives $\\infty$, $b_n = -1/n$ gives $-\\infty$, $b_n = (-1)^n/n$ gives no limit).',
    check: { kind: 'none', reason: 'conceptual' },
  },
  {
    id: 'sq-f-032',
    topic: 'sequences',
    kind: 'formula',
    prompt: { text: '$a_n \\to 3$ and $b_n \\to -1$. $\\lim_{n\\to\\infty} \\left(2a_n - b_n^{2}\\right) = ?$' },
    options: [
      { latex: '5', expr: '5' },
      {
        latex: '7',
        expr: '7',
        mistake: 'sign-error',
        why: 'Wrote −(−1)² as +1, forgetting that squaring happens before the subtraction.',
      },
      {
        latex: '4',
        expr: '4',
        mistake: 'algebra-error',
        why: 'Computed 2(3 − 1) instead of 2·3 − 1, distributing the 2 over both terms.',
      },
      {
        latex: '6',
        expr: '6',
        mistake: 'arithmetic-error',
        why: 'Dropped the bₙ² term and reported only 2·3.',
      },
      {
        latex: '8',
        expr: '8',
        mistake: 'exponent-arithmetic',
        why: 'Treated bₙ² as 2bₙ: 2·3 − 2·(−1) = 8 instead of 2·3 − (−1)² = 5.',
      },
    ],
    correct: 0,
    explanation: 'Limit laws: $2\\cdot 3 - (-1)^2 = 6 - 1 = 5$.',
    check: { kind: 'value', expected: '5' },
  },
  {
    id: 'sq-f-033',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: '$\\lim (2/3)^{n}$, $\\lim 1^{n}$, $\\lim (3/2)^{n}$ are, in order:' },
    options: [
      { text: '$0,\\ 1,\\ \\infty$' },
      {
        text: '$0,\\ \\text{DNE},\\ \\infty$',
        mistake: 'sq-substitute-infinity',
        why: 'Treated 1^∞ as indeterminate with no limit, but 1ⁿ = 1 for every n.',
      },
      {
        text: '$0,\\ e,\\ \\infty$',
        mistake: 'sq-theorem-misattributed',
        why: 'Confused 1ⁿ with the standard limit (1 + 1/n)ⁿ → e; here the base is exactly 1, so 1ⁿ = 1.',
      },
      {
        text: '$0,\\ \\text{DNE},\\ \\tfrac{3}{2}$',
        mistake: 'sq-term-vs-limit',
        why: 'Two slips: treated 1ⁿ as having no limit, and reported the first term 3/2 as the limit of (3/2)ⁿ, which grows without bound.',
      },
      {
        text: '$\\tfrac{2}{3},\\ \\text{DNE},\\ \\infty$',
        mistake: 'sq-term-vs-limit',
        why: 'Two slips: reported the first term 2/3 as the limit of (2/3)ⁿ (which tends to 0), and treated 1ⁿ as having no limit.',
      },
    ],
    correct: 0,
    explanation: '$a^x \\to 0$ for $0 < a < 1$, $= 1$ for $a = 1$, and $\\to \\infty$ for $a > 1$.',
    check: { kind: 'none', reason: 'the a^x rule' },
  },
  {
    id: 'sq-f-034',
    topic: 'sequences',
    kind: 'formula',
    prompt: { latex: '\\lim_{n\\to\\infty} \\dfrac{\\ln n}{\\ln(n^{2})} = ?' },
    options: [
      { latex: '\\frac{1}{2}', expr: '1/2' },
      {
        latex: '2',
        expr: '2',
        mistake: 'algebra-error',
        why: 'Inverted the ratio: computed ln(n²)/ln n = 2 instead of ln n/ln(n²).',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'sq-dominant-term',
        why: 'Thought ln(n²) grows much faster than ln n, but they differ only by a constant factor.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'sq-substitute-infinity',
        why: 'Plugged in n = ∞ and cancelled ∞/∞ to 1 instead of simplifying.',
      },
      {
        latex: '\\frac{1}{\\ln 2}',
        expr: '1/log(2)',
        mistake: 'algebra-error',
        why: 'Wrote ln(n²) as (ln 2)(ln n) instead of 2 ln n.',
      },
      {
        latex: '\\ln 2',
        expr: 'log(2)',
        mistake: 'algebra-error',
        why: 'Two slips: wrote ln(n²) as (ln 2)(ln n) and then inverted the ratio.',
      },
    ],
    correct: 0,
    explanation: '$\\ln(n^2) = 2\\ln n$, so the ratio is exactly $\\tfrac{1}{2}$ for every $n$.',
    check: { kind: 'limit', term: 'log(n)/log(n^2)', limit: '1/2' },
  },
  {
    id: 'sq-f-035',
    topic: 'sequences',
    kind: 'concept',
    prompt: { text: '$a_n = \\dfrac{n+1}{n}$. Which statement is right?' },
    options: [
      { text: 'Decreasing and bounded below by $1$, so it converges' },
      {
        text: 'Decreasing and bounded above by $2$, so it converges',
        mistake: 'sq-theorem-misattributed',
        why: 'A decreasing sequence is always bounded above by its first term; the Monotone Convergence Theorem needs a decreasing sequence to be bounded BELOW.',
      },
      {
        text: 'Increasing and bounded above by $2$, so it converges',
        mistake: 'algebra-error',
        why: '(n+1)/n = 1 + 1/n decreases as n grows; the growth of n alone does not make the sequence increase.',
      },
      {
        text: 'Decreasing and bounded below by $0$, so it converges to $0$',
        mistake: 'sq-theorem-misattributed',
        why: 'The theorem gives convergence, not the value; a lower bound need not be the limit (here the limit is 1).',
      },
      {
        text: 'Bounded between $1$ and $2$, so it converges',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Bounded alone does not give convergence; the theorem also needs monotonicity.',
      },
    ],
    correct: 0,
    explanation: '$a_n = 1 + \\tfrac{1}{n}$ decreases and stays above $1$, so the Monotone Convergence Theorem (monotone AND bounded in the matching direction) applies.',
    check: { kind: 'none', reason: 'monotonicity and MCT reasoning' },
  },
];

// ───────────────────────── generators ─────────────────────────

/** Greatest common divisor for fraction reduction. */
function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

/** Reduced fraction p/q with q > 0. */
function reduce(p: number, q: number): [number, number] {
  const s = q < 0 ? -1 : 1;
  const g = gcd(p, q) || 1;
  return [(s * p) / g, (s * q) / g];
}

/** KaTeX for p/q: integers stay integers, negatives become -\frac{..}{..}. */
function fracLatex(p: number, q: number): string {
  const [n, d] = reduce(p, q);
  if (d === 1) return `${n}`;
  return n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`;
}

/** mathjs for p/q (reduced). */
function fracExpr(p: number, q: number): string {
  const [n, d] = reduce(p, q);
  return d === 1 ? `${n}` : `${n}/${d}`;
}

/** " + k" / " - k" for LaTeX and mathjs. */
function signed(k: number): string {
  return k < 0 ? ` - ${-k}` : ` + ${k}`;
}

/** Coefficient times n^2 for LaTeX ("n^{2}" when the coefficient is 1). */
function quadLatex(k: number): string {
  return k === 1 ? 'n^{2}' : `${k}n^{2}`;
}

// Rows with d = ±1 made the answer a/c the only fraction among integers; every row now has d ≠ ±1.
const RATIONAL_TABLE: Array<[number, number, number, number]> = [
  [3, 1, 1, -5],
  [2, -1, 5, 3],
  [4, 3, 2, 7],
  [5, 2, 3, -4],
  [6, 1, 2, 3],
  [7, -2, 4, 3],
  [1, 3, 2, 5],
  [9, 1, 3, 4],
];

const GEOMETRIC_TABLE: Array<[number, number]> = [
  [-3, 4],
  [4, 5],
  [-1, 1],
  [6, 5],
  [-4, 5],
  [1, 2],
  [-1, 2],
  [3, 2],
];

/** Parameterized generators (safe families only). */
export const generators: FlashGenerator[] = [
  {
    id: 'sq-g-rational',
    topic: 'sequences',
    kind: 'formula',
    describe: 'limit of (a n² + b)/(c n² + d)',
    generate(seed) {
      const [a, b, c, d] = RATIONAL_TABLE[(seed - 1) % RATIONAL_TABLE.length];
      const num = `${quadLatex(a)}${signed(b)}`;
      const den = `${quadLatex(c)}${signed(d)}`;
      return {
        id: `sq-g-rational:${seed}`,
        topic: 'sequences',
        kind: 'formula',
        prompt: { latex: `\\lim_{n\\to\\infty} \\dfrac{${num}}{${den}} = ?` },
        options: [
          { latex: fracLatex(a, c), expr: fracExpr(a, c) },
          {
            latex: fracLatex(b, d),
            expr: fracExpr(b, d),
            mistake: 'sq-term-vs-limit',
            why: 'Evaluated the term at n = 0 (the ratio of the constants) instead of taking the limit as n grows.',
          },
          {
            latex: '1',
            expr: '1',
            mistake: 'sq-substitute-infinity',
            why: 'Plugged in n = ∞ and cancelled ∞/∞ to 1 instead of comparing the leading terms.',
          },
          {
            latex: '0',
            expr: '0',
            mistake: 'sq-dominant-term',
            why: 'Misjudged the degrees; numerator and denominator both have degree 2, so the limit is not 0.',
          },
          {
            latex: fracLatex(a, d),
            expr: fracExpr(a, d),
            mistake: 'arithmetic-error',
            why: 'Divided the leading coefficient of the numerator by the constant term of the denominator.',
          },
        ],
        correct: 0,
        explanation: `Equal degrees: the limit is the ratio of the leading coefficients, $${a}/${c}$ = $${fracLatex(a, c)}$.`,
        check: {
          kind: 'limit',
          term: `(${a}*n^2${signed(b)})/(${c}*n^2${signed(d)})`,
          limit: fracExpr(a, c),
        },
      };
    },
  },
  {
    id: 'sq-g-geometric',
    topic: 'sequences',
    kind: 'concept',
    describe: 'does {rⁿ} converge, and to what',
    generate(seed) {
      const [p, q] = GEOMETRIC_TABLE[(seed - 1) % GEOMETRIC_TABLE.length];
      const r = p / q;
      const rTex = q === 1 ? `${p}` : p < 0 ? `-\\tfrac{${-p}}{${q}}` : `\\tfrac{${p}}{${q}}`;
      const baseTex = q === 1 ? `(${p})` : p < 0 ? `\\left(-\\tfrac{${-p}}{${q}}\\right)` : `\\left(\\tfrac{${p}}{${q}}\\right)`;
      const absLess1 = Math.abs(r) < 1;
      const alternates = r === -1;
      const unbounded = r > 1;
      const limit = absLess1 ? '0' : unbounded ? 'infinity' : 'dne';
      const ruleText = 'The rule: $|r| < 1$ gives limit $0$; $r = 1$ gives $1$; $r = -1$ or $|r| > 1$ diverges (alternating for $r = -1$, unbounded for $r > 1$).';
      return {
        id: `sq-g-geometric:${seed}`,
        topic: 'sequences',
        kind: 'concept',
        prompt: { text: `Does $\\{r^{n}\\}$ converge with $r = ${rTex}$? That is, $\\left\\{${baseTex}^{n}\\right\\}$.` },
        options: [
          absLess1
            ? { text: 'Converges to $0$' }
            : {
                text: 'Converges to $0$',
                mistake: 'sq-rn-boundary',
                why: 'Applied the |r| < 1 case outside its range; here |r| is not less than 1.',
              },
          {
            text: 'Converges to $1$',
            mistake: 'sq-rn-boundary',
            why: 'Applied the r = 1 case, but this ratio is not r = 1.',
          },
          {
            text: `Converges to $${rTex}$`,
            mistake: 'sq-term-vs-limit',
            why: 'Reported the first term (the ratio r itself) as the limit.',
          },
          alternates
            ? { text: 'Diverges: the terms alternate and never settle' }
            : r < 0
              ? {
                  text: 'Diverges: the terms alternate and never settle',
                  mistake: 'sq-oscillation-means-divergence',
                  why: 'Assumed that sign changes prevent convergence; with |r| < 1 the alternating terms still shrink to 0.',
                }
              : {
                  text: 'Diverges: the terms alternate and never settle',
                  mistake: 'sq-rn-boundary',
                  why: 'Mixed up the divergent cases of the {rⁿ} rule: only r ≤ −1 makes the terms alternate, and this r is positive.',
                },
          unbounded
            ? { text: 'Diverges: the terms grow and never settle' }
            : {
                text: 'Diverges: the terms grow and never settle',
                mistake: 'sq-rn-boundary',
                why: 'Misjudged |r| against 1; |rⁿ| = |r|ⁿ does not grow here, since |r| ≤ 1.',
              },
        ],
        correct: absLess1 ? 0 : alternates ? 3 : 4,
        explanation: ruleText,
        check: { kind: 'limit', term: `(${p}/${q})^n`, limit },
      };
    },
  },
];
