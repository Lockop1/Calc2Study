import type { StepProblem } from '../types';

/** Step-Through problems for topic "series-tests" (session 3, Phase C). */
export const steps: StepProblem[] = [
  // ───────────────────────── st-s-01: Σ 1/n² — choose a test ─────────────────────────
  {
    id: 'st-s-01',
    topic: 'series-tests',
    title: 'Choose a test: p-series',
    difficulty: 1,
    statement: { text: 'Decide whether the series converges, naming the test.', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^{2}}' },
    steps: [
      {
        prompt: 'First test to apply?',
        options: [
          { text: 'Divergence test: $\\dfrac{1}{n^{2}} \\to 0$, so it is inconclusive; move on' },
          {
            text: 'Divergence test: $\\dfrac{1}{n^{2}} \\to 0$, so the series converges',
            mistake: 'sb-divergence-test-converse',
            why: 'The divergence test never proves convergence; terms tending to 0 leaves the question open.',
          },
          {
            text: 'Divergence test: $\\dfrac{1}{n^{2}} \\to 0$, so the series converges to $0$',
            mistake: 'sb-sum-is-term-limit',
            why: 'The test never proves convergence, and the limit of the terms is not the sum of the series.',
          },
          {
            text: 'Divergence test: $\\dfrac{1}{n^{2}} \\to 0$, so the series diverges',
            mistake: 'st-wrong-inference',
            why: 'When the limit of the terms is 0 the divergence test says nothing, so it cannot show divergence either.',
          },
          {
            text: 'Integral test right away',
            mistake: 'st-divergence-test-skipped',
            why: 'The divergence test comes first in the flowchart (here it is inconclusive, and a p-series needs no integral).',
          },
        ],
        correct: 0,
        explanation: 'Terms → 0: inconclusive, go to the next question in the flowchart.',
        result: { text: 'Divergence test inconclusive' },
        check: { kind: 'none', reason: 'flowchart' },
      },
      {
        prompt: 'What kind of series is it, and which rule applies?',
        options: [
          { text: 'A $p$-series with $p = 2$: converges because $p > 1$' },
          {
            text: 'A $p$-series with $p = 2$: diverges because $p > 1$',
            mistake: 'st-p-rule-wrong',
            why: 'For a p-series, p > 1 is the convergent case, so this verdict is backwards.',
          },
          {
            text: 'A $p$-series with $p = -2$: diverges because $p < 1$',
            mistake: 'st-wrong-p',
            why: '1/n² = n^{−2} has p = 2 in the p-series Σ1/nᵖ, and p > 1 converges.',
          },
          {
            text: 'A $p$-series with $p = 2$: diverges because $p \\ne 1$',
            mistake: 'st-p-rule-wrong',
            why: 'The p-series rule is p > 1, not p ≠ 1.',
          },
          {
            text: 'A geometric series with $r = \\tfrac{1}{2}$',
            mistake: 'sb-wrong-ratio',
            why: 'A geometric series needs a constant ratio aₙ₊₁/aₙ, and this ratio is not constant.',
          },
        ],
        correct: 0,
        explanation: 'Σ1/nᵖ converges iff p > 1.',
        result: { text: '$p$-series, $p = 2 > 1$: converges' },
        check: { kind: 'none', reason: 'recognition' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: 'Converges; the $p$-series rule gives no value for the sum' },
          {
            text: 'Converges to $1$, the value of $\\int_1^{\\infty} dx/x^{2}$',
            mistake: 'st-sum-equals-integral',
            why: "The integral's value is never the sum of the series.",
          },
          {
            text: 'Converges to $1$, the first term',
            mistake: 'sb-no-information',
            why: 'The first term is not the sum of the series.',
          },
          {
            text: 'Converges to $1$, by the $p$-rule: $\\frac{1}{p-1}$ with $p = 2$',
            mistake: 'st-sum-equals-integral',
            why: '1/(p − 1) is the value of the improper integral, not the sum of the series.',
          },
          {
            text: 'Converges to $0$, since the terms tend to $0$',
            mistake: 'sb-sum-is-term-limit',
            why: 'The limit of the terms is not the sum of the series.',
          },
        ],
        correct: 0,
        explanation: 'The tests decide convergence; none of them gives the sum of $\\sum 1/n^{2}$.',
        result: { text: 'Converges (value not given by the test)' },
        check: { kind: 'series', term: '1/n^2', converges: true },
      },
    ],
    final: {
      latex: '\\text{converges } (p\\text{-series}, p = 2)',
      check: { kind: 'series', term: '1/n^2', converges: true },
      recap: 'Divergence test inconclusive → recognize a $p$-series with $p = 2 > 1$ → converges.',
    },
  },

  // ───────────────────────── st-s-02: Σ 1/√n — p ≤ 1 ─────────────────────────
  {
    id: 'st-s-02',
    topic: 'series-tests',
    title: 'p-series with p ≤ 1',
    difficulty: 1,
    statement: { text: 'Decide whether the series converges, naming the test.', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{\\sqrt{n}}' },
    steps: [
      {
        prompt: 'Divergence test first: what does it say?',
        options: [
          { text: '$\\frac{1}{\\sqrt{n}} \\to 0$: inconclusive, move on in the flowchart' },
          {
            text: '$\\frac{1}{\\sqrt{n}} \\to 0$: the series converges',
            mistake: 'sb-divergence-test-converse',
            why: 'The divergence test never proves convergence.',
          },
          {
            text: '$\\frac{1}{\\sqrt{n}} \\to 0$: the series converges to $0$',
            mistake: 'sb-sum-is-term-limit',
            why: 'The test never proves convergence, and the limit of the terms is not the sum.',
          },
          {
            text: '$\\frac{1}{\\sqrt{n}} \\to 0$: the series diverges',
            mistake: 'st-wrong-inference',
            why: 'The divergence test says nothing when the limit is 0.',
          },
          {
            text: '$\\frac{1}{\\sqrt{n}} \\to 1$: the series diverges',
            mistake: 'im-limit-evaluated-wrong',
            why: 'Right verdict, wrong limit: 1/√n → 0, and the test is inconclusive.',
          },
        ],
        correct: 0,
        explanation: 'The terms tend to 0, so the divergence test is inconclusive.',
        result: { text: 'Divergence test inconclusive' },
        check: { kind: 'limit', term: '1/sqrt(n)', limit: '0' },
      },
      {
        prompt: 'Write the term as $\\dfrac{1}{n^{p}}$. What is $p$?',
        options: [
          { latex: '\\frac{1}{2}', expr: '1/2' },
          { latex: '2', expr: '2', mistake: 'st-wrong-p', why: '√n = n^{1/2}, not n², so p is not 2.' },
          { latex: '-2', expr: '-2', mistake: 'st-wrong-p', why: '√n = n^{1/2}, and the sign of this value is wrong as well.' },
          {
            latex: '-\\frac{1}{2}',
            expr: '-1/2',
            mistake: 'st-wrong-p',
            why: '1/√n = n^{−1/2}, but in Σ1/nᵖ the p is +1/2.',
          },
          { latex: '1', expr: '1', mistake: 'st-wrong-p', why: 'Treated √n as n; √n = n^{1/2}, so p = 1/2, not the harmonic p = 1.' },
        ],
        correct: 0,
        explanation: '$\\frac{1}{\\sqrt{n}} = \\frac{1}{n^{1/2}}$.',
        result: { latex: 'p = \\frac{1}{2}' },
        check: { kind: 'value', expected: '1/2' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: '$p = \\tfrac{1}{2} \\le 1$: diverges' },
          {
            text: '$p = \\tfrac{1}{2} < 1$: converges',
            mistake: 'st-p-rule-wrong',
            why: 'For a p-series, p < 1 is the divergent case, not the convergent one.',
          },
          {
            text: '$p = \\tfrac{1}{2} < 1$: converges to $2$',
            mistake: 'st-p-rule-wrong',
            why: 'Picked the wrong case (p < 1 diverges) and then quoted a made-up value for the sum.',
          },
          {
            text: '$p = \\tfrac{1}{2} < 1$: converges because the terms $\\to 0$',
            mistake: 'st-p-rule-wrong',
            why: 'Picked the wrong case, and terms tending to 0 proves nothing about convergence.',
          },
          {
            text: 'Inconclusive: the $p$-series rule needs $p > 0$ integer',
            mistake: 'st-p-rule-wrong',
            why: 'The p-series rule holds for any real p, not just integers.',
          },
        ],
        correct: 0,
        explanation: 'Σ1/nᵖ diverges for p ≤ 1.',
        result: { text: 'Diverges ($p = 1/2$)' },
        check: { kind: 'series', term: '1/sqrt(n)', converges: false },
      },
    ],
    final: {
      latex: '\\text{diverges } (p = 1/2 \\le 1)',
      check: { kind: 'series', term: '1/sqrt(n)', converges: false },
      recap: '$p = \\frac{1}{2} \\le 1$ → the $p$-series diverges.',
    },
  },

  // ───────────────────────── st-s-03: Σ ln n / n — LCT with L = ∞ ─────────────────────────
  {
    id: 'st-s-03',
    topic: 'series-tests',
    title: 'Limit comparison, L = ∞',
    difficulty: 2,
    statement: { text: 'Decide whether the series converges, naming the test.', latex: '\\sum_{n=2}^{\\infty} \\frac{\\ln n}{n}' },
    steps: [
      {
        prompt: 'The divergence test gives $\\dfrac{\\ln n}{n} \\to 0$, inconclusive. What next?',
        options: [
          { text: 'Compare with $b_n = \\dfrac{1}{n}$' },
          {
            text: 'Compare with $b_n = \\dfrac{\\ln n}{n^{2}}$',
            mistake: 'st-wrong-comparison-series',
            why: 'The comparison series should be simpler and of known behaviour; this one is neither.',
          },
          {
            text: 'Compare with $b_n = \\dfrac{\\ln n}{n^{2}}$, which converges, so the series converges',
            mistake: 'st-wrong-comparison-series',
            why: 'This is not a known series, and no conclusion follows from comparing with it.',
          },
          {
            text: 'Compare with $b_n = \\dfrac{\\ln n}{n^{2}}$ using the integral test',
            mistake: 'st-wrong-comparison-series',
            why: "The integral test uses the series' own term, not a comparison series.",
          },
          {
            text: 'It is a $p$-series with $p = 1$: diverges',
            mistake: 'st-wrong-p',
            why: 'The ln n on top means it is not a p-series (the verdict happens to agree).',
          },
        ],
        correct: 0,
        explanation: 'Positive terms, and not geometric, telescoping or a p-series: compare, choosing bₙ from the dominant terms (ln n/n behaves like 1/n times a slowly growing factor).',
        result: { latex: 'b_n = \\frac{1}{n}' },
        check: { kind: 'none', reason: 'flowchart' },
      },
      {
        prompt: 'Compute $L = \\displaystyle\\lim_{n\\to\\infty} \\frac{a_n}{b_n}$.',
        options: [
          { text: '$L = \\lim \\ln n = \\infty$' },
          {
            text: '$L = \\lim \\dfrac{1}{n} = 0$',
            mistake: 'st-lct-limit-wrong',
            why: 'aₙ/bₙ = (ln n/n)·n = ln n, not 1/n.',
          },
          {
            text: '$L = \\lim \\dfrac{1}{n} = 0$, so the series converges',
            mistake: 'st-lct-limit-wrong',
            why: 'Wrong limit, and L = 0 with a divergent bₙ would be inconclusive anyway.',
          },
          {
            text: '$L = \\lim \\dfrac{1}{n\\ln n} = 0$',
            mistake: 'st-lct-limit-wrong',
            why: 'Inverted the quotient and added a factor of n.',
          },
          { text: '$L = 1$', mistake: 'st-lct-limit-wrong', why: 'ln n is not bounded, so the quotient cannot settle at 1.' },
        ],
        correct: 0,
        explanation: '$\\frac{\\ln n / n}{1/n} = \\ln n \\to \\infty$.',
        result: { latex: 'L = \\infty' },
        check: { kind: 'limit', term: 'log(n)', limit: 'infinity' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: '$L = \\infty$ and $\\sum \\dfrac{1}{n}$ diverges, so $\\sum \\dfrac{\\ln n}{n}$ diverges' },
          {
            text: '$L = \\infty$: the test is inconclusive',
            mistake: 'st-lct-boundary',
            why: 'L = ∞ with a divergent bₙ is conclusive: the series diverges.',
          },
          {
            text: '$L = \\infty$: the test is inconclusive, so use the integral test',
            mistake: 'st-lct-boundary',
            why: 'The limit comparison test already decides this case, so no other test is needed.',
          },
          {
            text: '$L = \\infty$: the test is inconclusive, so compare with $\\dfrac{1}{n^{2}}$ instead',
            mistake: 'st-lct-boundary',
            why: 'The test already decides; 1/n² would give L = ∞ with a convergent series, which is truly inconclusive.',
          },
          {
            text: '$L = \\infty$ and $\\sum \\dfrac{1}{n}$ diverges, so $\\sum \\dfrac{\\ln n}{n}$ converges',
            mistake: 'st-wrong-inference',
            why: 'The conclusion is backwards: L = ∞ with a divergent bₙ means the series diverges.',
          },
        ],
        correct: 0,
        explanation: 'L = ∞ and Σbₙ diverges ⇒ Σaₙ diverges.',
        result: { text: 'Diverges (limit comparison with $1/n$)' },
        check: { kind: 'series', term: 'log(n)/n', from: '2', converges: false },
      },
    ],
    final: {
      latex: '\\text{diverges (limit comparison with } 1/n\\text{, } L = \\infty)',
      check: { kind: 'series', term: 'log(n)/n', from: '2', converges: false },
      recap: 'Divergence test inconclusive → compare with $\\frac{1}{n}$ → $L = \\ln n \\to \\infty$ → divergent comparison ⇒ diverges.',
    },
  },

  // ───────────────────────── st-s-04: Σ ln n / n² — LCT with L = 0 ─────────────────────────
  {
    id: 'st-s-04',
    topic: 'series-tests',
    title: 'Limit comparison, L = 0',
    difficulty: 2,
    statement: { text: 'Decide whether the series converges, naming the test.', latex: '\\sum_{n=2}^{\\infty} \\frac{\\ln n}{n^{2}}' },
    steps: [
      {
        prompt: 'Which comparison series works?',
        options: [
          { text: '$b_n = \\dfrac{1}{n^{3/2}}$' },
          {
            text: '$b_n = \\dfrac{1}{n^{2}}$',
            mistake: 'st-wrong-comparison-series',
            why: 'L = lim ln n = ∞ with a convergent bₙ: inconclusive.',
          },
          {
            text: '$b_n = \\dfrac{1}{n^{2}}$, giving $L = \\infty$, so the series converges',
            mistake: 'st-lct-boundary',
            why: 'L = ∞ with a convergent bₙ gives no information about the series.',
          },
          {
            text: '$b_n = \\dfrac{1}{n^{2}}$, giving $L = 1$',
            mistake: 'st-lct-limit-wrong',
            why: 'The limit of the quotient is ln n → ∞, not 1.',
          },
          {
            text: '$b_n = \\dfrac{1}{n}$',
            mistake: 'st-wrong-comparison-series',
            why: 'L = lim ln n/n = 0 with a divergent bₙ: inconclusive.',
          },
        ],
        correct: 0,
        explanation: 'Pick a p-series between 1/n² and 1/n that still converges: 1/n^{3/2}.',
        result: { latex: 'b_n = \\frac{1}{n^{3/2}}' },
        check: { kind: 'none', reason: 'choosing b_n' },
      },
      {
        prompt: 'Compute $L = \\displaystyle\\lim \\frac{\\ln n / n^{2}}{1/n^{3/2}}$.',
        options: [
          { text: '$L = \\lim \\dfrac{\\ln n}{\\sqrt{n}} = 0$' },
          {
            text: '$L = \\lim \\sqrt{n}\\,\\ln n = \\infty$',
            mistake: 'st-lct-limit-wrong',
            why: 'n^{3/2}/n² = n^{−1/2}, so the quotient is ln n/√n, not √n ln n.',
          },
          {
            text: '$L = \\lim \\sqrt{n}\\,\\ln n = \\infty$, so the series diverges',
            mistake: 'st-lct-limit-wrong',
            why: 'Wrong limit, and L = ∞ with a convergent bₙ is inconclusive anyway.',
          },
          {
            text: '$L = \\lim \\sqrt{n}\\,\\ln n = 1$',
            mistake: 'st-lct-limit-wrong',
            why: 'Both the quotient and its limit are wrong here.',
          },
          {
            text: '$L = \\lim \\dfrac{\\ln n}{n} = 0$',
            mistake: 'st-lct-limit-wrong',
            why: 'The exponent left over is 1/2, not 1 (the value 0 is right by accident).',
          },
        ],
        correct: 0,
        explanation: '$\\frac{\\ln n}{n^{2}} \\cdot n^{3/2} = \\frac{\\ln n}{\\sqrt{n}} \\to 0$ (L\'Hôpital).',
        result: { latex: 'L = 0' },
        check: { kind: 'limit', term: 'log(n)/sqrt(n)', limit: '0' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: '$L = 0$ and $\\sum \\dfrac{1}{n^{3/2}}$ converges, so $\\sum \\dfrac{\\ln n}{n^{2}}$ converges' },
          {
            text: '$L = 0$: inconclusive',
            mistake: 'st-lct-boundary',
            why: 'L = 0 with a convergent bₙ is conclusive: the series converges.',
          },
          {
            text: '$L = 0$: inconclusive, so the series diverges',
            mistake: 'st-lct-boundary',
            why: 'Inconclusive never means diverges, and this case is conclusive anyway.',
          },
          {
            text: '$L = 0$: inconclusive, so compare with $\\dfrac{1}{n}$ instead',
            mistake: 'st-lct-boundary',
            why: 'The case is conclusive; comparing with 1/n would be truly inconclusive.',
          },
          {
            text: '$L = 0$ and $\\sum \\dfrac{1}{n^{3/2}}$ converges, so $\\sum \\dfrac{\\ln n}{n^{2}}$ diverges',
            mistake: 'st-wrong-inference',
            why: 'The conclusion is backwards: L = 0 with a convergent bₙ means the series converges.',
          },
        ],
        correct: 0,
        explanation: 'L = 0 and Σbₙ converges ⇒ Σaₙ converges.',
        result: { text: 'Converges (limit comparison with $1/n^{3/2}$)' },
        check: { kind: 'series', term: 'log(n)/n^2', from: '2', converges: true },
      },
    ],
    final: {
      latex: '\\text{converges (limit comparison with } 1/n^{3/2}\\text{, } L = 0)',
      check: { kind: 'series', term: 'log(n)/n^2', from: '2', converges: true },
      recap: 'Compare with $\\frac{1}{n^{3/2}}$ → $L = \\frac{\\ln n}{\\sqrt{n}} \\to 0$ → convergent comparison ⇒ converges.',
    },
  },

  // ───────────────────────── st-s-05: Σ 1/(n ln n) — integral test ─────────────────────────
  {
    id: 'st-s-05',
    topic: 'series-tests',
    title: 'When limit comparison fails: the integral test',
    difficulty: 2,
    statement: { text: 'Decide whether the series converges, naming the test.', latex: '\\sum_{n=2}^{\\infty} \\frac{1}{n\\ln n}' },
    steps: [
      {
        prompt: 'Try limit comparison with $b_n = \\dfrac{1}{n}$. What happens?',
        options: [
          { text: '$L = \\lim \\dfrac{1}{\\ln n} = 0$ with $\\sum \\dfrac{1}{n}$ divergent: inconclusive' },
          {
            text: '$L = 0$ with $\\sum \\dfrac{1}{n}$ divergent, so the series converges',
            mistake: 'st-lct-boundary',
            why: 'L = 0 transfers convergence, not divergence; here nothing follows.',
          },
          {
            text: '$L = 0$ with $\\sum \\dfrac{1}{n}$ divergent, so the series diverges',
            mistake: 'st-lct-boundary',
            why: 'L = 0 with a divergent bₙ gives no information.',
          },
          {
            text: '$L = 0$ with $\\sum \\dfrac{1}{n}$ convergent, so the series converges',
            mistake: 'st-p-rule-wrong',
            why: 'Σ1/n diverges, and L = 0 with a divergent bₙ is inconclusive.',
          },
          {
            text: '$L = 1$, so both diverge',
            mistake: 'st-lct-limit-wrong',
            why: 'aₙ/bₙ = 1/ln n → 0, not 1.',
          },
        ],
        correct: 0,
        explanation: 'L = 0 is conclusive only when Σbₙ converges.',
        result: { text: 'Limit comparison with $1/n$: inconclusive' },
        check: { kind: 'none', reason: 'LCT boundary cases' },
      },
      {
        prompt: 'Use the integral test with $f(x) = \\dfrac{1}{x\\ln x}$ on $[2, \\infty)$. Which conditions must hold, and do they?',
        options: [
          { text: 'Positive, continuous and decreasing on $[2, \\infty)$: all three hold ($x\\ln x$ is positive and increasing)' },
          {
            text: 'Positive and continuous on $[2, \\infty)$: both hold ($x\\ln x$ is positive)',
            mistake: 'st-integral-test-conditions',
            why: 'Decreasing is also required by the integral test.',
          },
          {
            text: 'Positive and continuous on $[2, \\infty)$: both hold, so the integral equals the sum',
            mistake: 'st-integral-test-conditions',
            why: 'Decreasing is also required, and the integral is never equal to the sum.',
          },
          {
            text: 'Positive, continuous and decreasing on $[2, \\infty)$: decreasing fails ($x\\ln x$ is increasing, so $f$ is increasing)',
            mistake: 'st-integral-test-conditions',
            why: 'A positive, increasing denominator makes the reciprocal decreasing: $f = \\frac{1}{x\\ln x}$ decreases, so all three conditions hold.',
          },
          {
            text: 'Decreasing and $f(x) \\to 0$ on $[2, \\infty)$: both hold ($x\\ln x$ is increasing)',
            mistake: 'st-integral-test-conditions',
            why: 'Positive and continuous are conditions; f → 0 is not one of them.',
          },
        ],
        correct: 0,
        explanation: 'f > 0, f is continuous, and f is decreasing because x ln x increases.',
        result: { text: 'Integral test applies' },
        check: { kind: 'none', reason: 'integral test conditions' },
      },
      {
        prompt: 'With $u = \\ln x$: $\\displaystyle\\int_{2}^{t} \\frac{dx}{x\\ln x} = ?$',
        variable: 't',
        domain: [3, 20],
        options: [
          { latex: '\\ln(\\ln t) - \\ln(\\ln 2)', expr: 'log(log(t)) - log(log(2))' },
          {
            latex: '\\ln(\\ln t)',
            expr: 'log(log(t))',
            mistake: 'ftc-not-subtracted',
            why: 'The lower-limit value F(2) = ln(ln 2) is not 0, so it must be subtracted.',
          },
          {
            latex: '\\ln(\\ln t) - \\ln 2',
            expr: 'log(log(t)) - log(2)',
            mistake: 'bounds-not-converted',
            why: 'The lower limit was not converted: with u = ln x it is u = ln 2, so the term subtracted is ln(ln 2), not ln 2.',
          },
          {
            latex: '\\ln(\\ln t) + \\ln(\\ln 2)',
            expr: 'log(log(t)) + log(log(2))',
            mistake: 'ftc-not-subtracted',
            why: 'F(2) must be subtracted, not added.',
          },
          {
            latex: '\\frac{(\\ln t)^{2}}{2} - \\frac{(\\ln 2)^{2}}{2}',
            expr: 'log(t)^2/2 - log(2)^2/2',
            mistake: 'du-derivative-wrong',
            why: 'With u = ln x the integral is ∫ du/u = ln|u|, not u²/2.',
          },
        ],
        correct: 0,
        explanation: '$\\int \\frac{du}{u} = \\ln u$, evaluated from $\\ln 2$ to $\\ln t$.',
        result: { latex: '\\lim_{t\\to\\infty}\\left[\\ln(\\ln t) - \\ln(\\ln 2)\\right]' },
        check: { kind: 'identity', lhs: 'integral(1/(x*log(x)), x, 2, t)' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: '$\\ln(\\ln t) \\to \\infty$: the integral diverges, so the series diverges' },
          {
            text: '$\\ln(\\ln t) \\to \\infty$: the integral diverges, so the series converges',
            mistake: 'st-wrong-inference',
            why: 'The integral test says the series and the integral both converge or both diverge.',
          },
          {
            text: '$\\ln(\\ln t) \\to \\infty$: the integral diverges, so the sum is $\\infty$',
            mistake: 'sb-no-information',
            why: 'Right verdict, but "sum = ∞" is not the conclusion of the test; a divergent series has no sum.',
          },
          {
            text: '$\\ln(\\ln t) \\to \\infty$: the integral diverges, so the test is inconclusive',
            mistake: 'st-wrong-inference',
            why: 'The integral test is conclusive in both directions.',
          },
          {
            text: '$\\ln(\\ln t) \\to 0$: the integral converges, so the series converges',
            mistake: 'im-limit-evaluated-wrong',
            why: 'The limit was evaluated wrongly: ln(ln t) → ∞ as t → ∞.',
          },
        ],
        correct: 0,
        explanation: 'Integral and series share their behaviour: both diverge.',
        result: { text: 'Diverges (integral test)' },
        check: { kind: 'series', term: '1/(n*log(n))', from: '2', converges: false },
      },
    ],
    final: {
      latex: '\\text{diverges (integral test, } u = \\ln x)',
      check: { kind: 'series', term: '1/(n*log(n))', from: '2', converges: false },
      recap:
        'Limit comparison with $\\frac{1}{n}$ is inconclusive ($L = 0$, divergent $b_n$) → integral test: conditions hold → $\\int \\frac{dx}{x\\ln x} = \\ln(\\ln x) \\to \\infty$ → diverges.',
    },
  },

  // ───────────────────────── st-s-06: Σ 1/(n²+1) — direct comparison ─────────────────────────
  {
    id: 'st-s-06',
    topic: 'series-tests',
    title: 'Direct comparison, convergent',
    difficulty: 1,
    statement: { text: 'Decide whether the series converges, naming the test.', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n^{2}+1}' },
    steps: [
      {
        prompt: 'Divergence test first, then where in the flowchart?',
        options: [
          { text: '$\\frac{1}{n^{2}+1} \\to 0$: inconclusive; positive terms and not exactly a $p$-series, so compare it with one' },
          {
            text: '$\\frac{1}{n^{2}+1} \\to 0$: the series converges',
            mistake: 'sb-divergence-test-converse',
            why: 'The divergence test never proves convergence.',
          },
          {
            text: '$\\frac{1}{n^{2}+1} \\to 0$: the series converges to $0$',
            mistake: 'sb-sum-is-term-limit',
            why: 'The test never proves convergence, and the limit of the terms is not the sum.',
          },
          {
            text: '$\\frac{1}{n^{2}+1} \\to 0$: the series converges because it is geometric with $r = \\tfrac{1}{2}$',
            mistake: 'sb-wrong-ratio',
            why: 'The test never proves convergence, and the ratio of consecutive terms is not constant.',
          },
          {
            text: 'It is a $p$-series with $p = 2$, so it converges',
            mistake: 'st-wrong-p',
            why: 'The +1 means it is not a p-series; a comparison is needed (the verdict happens to be right).',
          },
        ],
        correct: 0,
        explanation: 'Terms → 0 is inconclusive; the next flowchart step for positive terms is a comparison.',
        result: { text: 'Divergence test inconclusive; compare with a $p$-series' },
        check: { kind: 'limit', term: '1/(n^2+1)', limit: '0' },
      },
      {
        prompt: 'Which comparison settles the series?',
        options: [
          { text: '$\\dfrac{1}{n^{2}+1} < \\dfrac{1}{n^{2}}$ and $\\sum \\dfrac{1}{n^{2}}$ converges: converges' },
          {
            text: '$\\dfrac{1}{n^{2}+1} < \\dfrac{1}{n}$ and $\\sum \\dfrac{1}{n}$ diverges: no conclusion',
            mistake: 'st-wrong-comparison-series',
            why: 'True but useless; compare with 1/n² instead.',
          },
          {
            text: '$\\dfrac{1}{n^{2}+1} < \\dfrac{1}{n}$ and $\\sum \\dfrac{1}{n}$ diverges: diverges',
            mistake: 'st-comparison-wrong-direction',
            why: 'Being smaller than a divergent series gives nothing.',
          },
          {
            text: '$\\dfrac{1}{n^{2}+1} < \\dfrac{1}{n}$ and $\\sum \\dfrac{1}{n}$ converges: converges',
            mistake: 'st-p-rule-wrong',
            why: 'The harmonic series diverges, and the comparison would be useless anyway.',
          },
          {
            text: '$\\dfrac{1}{n^{2}+1} > \\dfrac{1}{n^{2}}$ and $\\sum \\dfrac{1}{n^{2}}$ converges: converges',
            mistake: 'algebra-error',
            why: 'The inequality is backwards, since n² + 1 > n² makes the fraction smaller.',
          },
        ],
        correct: 0,
        explanation: 'Smaller than a convergent series ⇒ converges.',
        result: { latex: '0 < \\frac{1}{n^{2}+1} < \\frac{1}{n^{2}}' },
        check: { kind: 'none', reason: 'choosing a comparison' },
      },
      {
        prompt: 'State the conclusion precisely.',
        options: [
          { text: '$0 < a_n \\le b_n$ with $\\sum b_n$ convergent ($p = 2$), so $\\sum a_n$ converges' },
          {
            text: '$\\sum a_n$ converges to $\\sum \\dfrac{1}{n^{2}}$',
            mistake: 'sb-no-information',
            why: 'Comparison bounds the sum; it does not give its value.',
          },
          {
            text: '$\\sum a_n$ converges to $\\sum \\dfrac{1}{n^{2}} - 1$',
            mistake: 'sb-no-information',
            why: 'This is a made-up value; comparison gives no value for the sum.',
          },
          {
            text: '$\\sum a_n$ converges to $\\dfrac{\\pi}{4}$ (the integral)',
            mistake: 'st-sum-equals-integral',
            why: "An integral's value is never the sum of the series.",
          },
          {
            text: '$\\sum a_n$ converges because $a_n \\to 0$',
            mistake: 'sb-divergence-test-converse',
            why: 'Terms tending to 0 proves nothing about convergence.',
          },
        ],
        correct: 0,
        explanation: 'Direct comparison gives convergence, not the value.',
        result: { text: 'Converges (direct comparison with $1/n^{2}$)' },
        check: { kind: 'series', term: '1/(n^2+1)', converges: true },
      },
    ],
    final: {
      latex: '\\text{converges (direct comparison with } 1/n^{2})',
      check: { kind: 'series', term: '1/(n^2+1)', converges: true },
      recap: '$\\frac{1}{n^{2}+1} < \\frac{1}{n^{2}}$ and $\\sum \\frac{1}{n^{2}}$ converges ($p = 2$) → converges.',
    },
  },

  // ───────────────────────── st-s-07: Σ 1/(2ⁿ+n) — comparison with geometric ─────────────────────────
  {
    id: 'st-s-07',
    topic: 'series-tests',
    title: 'Direct comparison with a geometric series',
    difficulty: 1,
    statement: { text: 'Decide whether the series converges, naming the test.', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{2^{n}+n}' },
    steps: [
      {
        prompt: 'Divergence test first, then choose the comparison.',
        options: [
          { text: '$\\frac{1}{2^{n}+n} \\to 0$: inconclusive; the dominant term is $2^{n}$, so compare with $\\frac{1}{2^{n}}$' },
          {
            text: '$\\frac{1}{2^{n}+n} \\to 0$: the series converges',
            mistake: 'sb-divergence-test-converse',
            why: 'The divergence test never proves convergence.',
          },
          {
            text: '$\\frac{1}{2^{n}+n} \\to 0$: the series converges to $0$',
            mistake: 'sb-sum-is-term-limit',
            why: 'The test never proves convergence, and the limit of the terms is not the sum.',
          },
          {
            text: '$\\frac{1}{2^{n}+n} \\to 0$: the series converges because it is geometric with $r = \\tfrac{1}{2}$',
            mistake: 'sb-wrong-ratio',
            why: 'The test never proves convergence, and the series is not geometric.',
          },
          {
            text: 'The dominant term is $n$, so compare with $\\frac{1}{n}$',
            mistake: 'st-wrong-comparison-series',
            why: '2ⁿ dominates n; comparing with 1/n gives no information.',
          },
        ],
        correct: 0,
        explanation: 'Terms → 0 is inconclusive; pick the comparison from the dominant term $2^{n}$.',
        result: { text: 'Compare with $1/2^{n}$' },
        check: { kind: 'limit', term: '1/(2^n+n)', limit: '0' },
      },
      {
        prompt: 'Which comparison is valid?',
        options: [
          { text: '$\\dfrac{1}{2^{n}+n} < \\dfrac{1}{2^{n}}$ and $\\sum \\dfrac{1}{2^{n}}$ converges ($r = \\tfrac{1}{2}$): converges' },
          {
            text: '$\\dfrac{1}{2^{n}+n} < \\dfrac{1}{n}$ and $\\sum \\dfrac{1}{n}$ diverges: diverges',
            mistake: 'st-comparison-wrong-direction',
            why: 'Being smaller than a divergent series gives nothing.',
          },
          {
            text: '$\\dfrac{1}{2^{n}+n} < \\dfrac{1}{n}$ and $\\sum \\dfrac{1}{n}$ diverges: no conclusion, so the series diverges',
            mistake: 'st-comparison-wrong-direction',
            why: '"No conclusion" never becomes "diverges".',
          },
          {
            text: '$\\dfrac{1}{2^{n}+n} < \\dfrac{1}{n}$ and $\\sum \\dfrac{1}{n}$ converges: converges',
            mistake: 'st-p-rule-wrong',
            why: 'The harmonic series diverges, so it cannot be used as a convergent bound.',
          },
          {
            text: '$\\dfrac{1}{2^{n}+n} > \\dfrac{1}{2^{n}}$ and $\\sum \\dfrac{1}{2^{n}}$ converges: converges',
            mistake: 'algebra-error',
            why: 'The inequality is backwards, since 2ⁿ + n > 2ⁿ makes the fraction smaller.',
          },
        ],
        correct: 0,
        explanation: 'The term is smaller than a convergent geometric series.',
        result: { latex: '0 < \\frac{1}{2^{n}+n} < \\frac{1}{2^{n}}' },
        check: { kind: 'none', reason: 'comparison' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: 'Converges by direct comparison with the geometric series $\\sum \\dfrac{1}{2^{n}}$' },
          {
            text: 'Converges to $1$, the sum of $\\sum \\dfrac{1}{2^{n}}$',
            mistake: 'sb-no-information',
            why: "The comparison series' sum is only an upper bound, not the value of this series.",
          },
          {
            text: 'Converges to $1$, by the divergence test',
            mistake: 'sb-divergence-test-converse',
            why: 'The divergence test gives no sums and never proves convergence.',
          },
          {
            text: 'Converges to $\\dfrac{1}{3}$, its first term',
            mistake: 'sb-no-information',
            why: 'The first term a₁ = 1/3 is not the sum of the series.',
          },
          {
            text: 'Diverges: $2^{n} + n \\to \\infty$',
            mistake: 'st-wrong-inference',
            why: 'The terms tend to 0; growth of the denominator favours convergence, not divergence.',
          },
        ],
        correct: 0,
        explanation: 'Direct comparison gives convergence.',
        result: { text: 'Converges (direct comparison with $1/2^{n}$)' },
        check: { kind: 'series', term: '1/(2^n+n)', converges: true },
      },
    ],
    final: {
      latex: '\\text{converges (direct comparison with } 1/2^{n})',
      check: { kind: 'series', term: '1/(2^n+n)', converges: true },
      recap: '$\\frac{1}{2^{n}+n} < \\frac{1}{2^{n}}$ and $\\sum \\frac{1}{2^{n}}$ converges ($|r| < 1$) → converges.',
    },
  },

  // ───────────────────────── st-s-08: Σ (n+1)/(n³+2) — LCT with rational term ─────────────────────────
  {
    id: 'st-s-08',
    topic: 'series-tests',
    title: 'Limit comparison with a rational term',
    difficulty: 2,
    statement: { text: 'Decide whether the series converges, naming the test.', latex: '\\sum_{n=1}^{\\infty} \\frac{n+1}{n^{3}+2}' },
    steps: [
      {
        prompt: 'Choose $b_n$ from the dominant terms.',
        options: [
          { text: '$b_n = \\dfrac{1}{n^{2}}$' },
          {
            text: '$b_n = \\dfrac{1}{n^{3}}$',
            mistake: 'st-wrong-comparison-series',
            why: "The numerator's dominant term n must be kept.",
          },
          {
            text: '$b_n = \\dfrac{1}{n^{3}}$, a convergent $p$-series, so the series converges',
            mistake: 'st-wrong-comparison-series',
            why: 'Wrong bₙ (L = ∞ there, which is inconclusive with a convergent bₙ).',
          },
          {
            text: '$b_n = \\dfrac{1}{n^{3}}$ with direct comparison: $a_n < b_n$',
            mistake: 'st-wrong-comparison-series',
            why: 'Wrong bₙ, and the inequality aₙ < bₙ is false.',
          },
          {
            text: '$b_n = \\dfrac{1}{n}$',
            mistake: 'st-wrong-comparison-series',
            why: 'n/n³ = 1/n², not 1/n.',
          },
        ],
        correct: 0,
        explanation: 'Keep the highest power in the numerator and in the denominator: n/n³.',
        result: { latex: 'b_n = \\frac{1}{n^{2}}' },
        check: { kind: 'none', reason: 'choosing b_n' },
      },
      {
        prompt: 'Compute $L = \\displaystyle\\lim \\frac{a_n}{b_n}$.',
        options: [
          { latex: '1', expr: '1' },
          { latex: '0', expr: '0', mistake: 'st-lct-limit-wrong', why: 'The degrees are equal, so L is the ratio of leading coefficients, not 0.' },
          { latex: '2', expr: '2', mistake: 'st-lct-limit-wrong', why: 'The leading coefficients are both 1, so their ratio is not 2.' },
          { latex: '\\frac{1}{2}', expr: '1/2', mistake: 'st-lct-limit-wrong', why: 'Divided by the constant 2 instead of comparing leading coefficients.' },
          { latex: '3', expr: '3', mistake: 'st-lct-limit-wrong', why: 'Added the exponents instead of taking the ratio of leading coefficients.' },
        ],
        correct: 0,
        explanation: '$\\frac{n+1}{n^{3}+2} \\cdot n^{2} = \\frac{n^{3}+n^{2}}{n^{3}+2} \\to 1$.',
        result: { latex: 'L = 1' },
        check: { kind: 'limit', term: '((n+1)/(n^3+2))/(1/n^2)', limit: '1' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: '$0 < L = 1 < \\infty$ and $\\sum \\dfrac{1}{n^{2}}$ converges, so the series converges' },
          {
            text: '$0 < L < \\infty$, so the series diverges',
            mistake: 'st-wrong-inference',
            why: 'Both series behave the same way, and Σ1/n² converges.',
          },
          {
            text: '$0 < L < \\infty$, so the series diverges because $L \\ne 0$',
            mistake: 'st-wrong-inference',
            why: 'L ≠ 0 is not a divergence criterion in the limit comparison test.',
          },
          {
            text: '$0 < L < \\infty$, so the test is inconclusive',
            mistake: 'st-lct-boundary',
            why: '0 < L < ∞ is exactly the conclusive case.',
          },
          {
            text: '$L = 1$, so the sum is $\\sum \\dfrac{1}{n^{2}}$',
            mistake: 'sb-no-information',
            why: 'The test compares behaviour, not values.',
          },
        ],
        correct: 0,
        explanation: '0 < L < ∞ ⇒ same behaviour as Σ1/n², which converges.',
        result: { text: 'Converges (limit comparison with $1/n^{2}$)' },
        check: { kind: 'series', term: '(n+1)/(n^3+2)', converges: true },
      },
    ],
    final: {
      latex: '\\text{converges (limit comparison with } 1/n^{2}\\text{, } L = 1)',
      check: { kind: 'series', term: '(n+1)/(n^3+2)', converges: true },
      recap: 'Dominant terms give $b_n = \\frac{1}{n^{2}}$ → $L = 1$ → same behaviour as a convergent $p$-series → converges.',
    },
  },

  // ───────────────────────── st-s-09: Σ n e^{−n²} — integral test with substitution ─────────────────────────
  {
    id: 'st-s-09',
    topic: 'series-tests',
    title: 'Integral test with a substitution',
    difficulty: 2,
    statement: { text: 'Decide whether the series converges, naming the test.', latex: '\\sum_{n=1}^{\\infty} n e^{-n^{2}}' },
    steps: [
      {
        prompt: 'Use the integral test with $f(x) = x e^{-x^{2}}$. Check the conditions on $[1, \\infty)$.',
        options: [
          { text: 'Positive and continuous; decreasing since $f\'(x) = (1 - 2x^{2})e^{-x^{2}} < 0$ for $x \\ge 1$' },
          {
            text: 'Positive and continuous; increasing since $x$ grows',
            mistake: 'st-integral-test-conditions',
            why: 'The derivative is negative for x ≥ 1, so f is decreasing, not increasing.',
          },
          {
            text: 'Positive and continuous; increasing since $x$ grows, so the test fails and the series diverges',
            mistake: 'st-integral-test-conditions',
            why: 'Wrong monotonicity, and a failed hypothesis never gives a verdict.',
          },
          {
            text: 'Positive and continuous; increasing since $f\'(x) = (1 + 2x^{2})e^{-x^{2}} > 0$',
            mistake: 'sign-error-derivative',
            why: 'Differentiated e^{−x²} as +2x e^{−x²}, dropping the minus of the inner derivative −2x; in fact f′(x) = (1 − 2x²)e^{−x²} < 0 for x ≥ 1.',
          },
          {
            text: 'The conditions do not matter for a convergent integral',
            mistake: 'st-integral-test-conditions',
            why: 'All three conditions must hold before the integral says anything about the series.',
          },
        ],
        correct: 0,
        explanation: "$f'(x) = e^{-x^{2}}(1 - 2x^{2})$ is negative for $x \\ge 1$.",
        result: { text: 'Integral test applies' },
        check: { kind: 'none', reason: 'conditions' },
      },
      {
        prompt: 'With $u = x^{2}$: $\\displaystyle\\int_{1}^{t} x e^{-x^{2}}\\,dx = ?$',
        variable: 't',
        domain: [1.5, 4],
        options: [
          { latex: '\\frac{1}{2}e^{-1} - \\frac{1}{2}e^{-t^{2}}', expr: '1/2*exp(-1) - 1/2*exp(-t^2)' },
          {
            latex: 'e^{-1} - e^{-t^{2}}',
            expr: 'exp(-1) - exp(-t^2)',
            mistake: 'du-constant-wrong',
            why: 'du = 2x dx brings a factor 1/2 that was left out.',
          },
          {
            latex: 'e^{-t^{2}} - e^{-1}',
            expr: 'exp(-t^2) - exp(-1)',
            mistake: 'du-constant-wrong',
            why: 'The factor 1/2 is missing and the order of the FTC subtraction is swapped.',
          },
          {
            latex: 'e^{-1} - e^{-t}',
            expr: 'exp(-1) - exp(-t)',
            mistake: 'du-constant-wrong',
            why: 'The factor 1/2 is missing and u = x² was not back-substituted at the upper limit.',
          },
          {
            latex: '\\frac{1}{2}e^{-t^{2}} - \\frac{1}{2}e^{-1}',
            expr: '1/2*exp(-t^2) - 1/2*exp(-1)',
            mistake: 'ftc-order-swapped',
            why: 'Computed F(1) − F(t) instead of F(t) − F(1).',
          },
        ],
        correct: 0,
        explanation: 'An antiderivative is $-\\frac{1}{2}e^{-x^{2}}$, evaluated from $1$ to $t$.',
        result: { latex: '\\lim_{t\\to\\infty}\\left(\\frac{1}{2e} - \\frac{1}{2}e^{-t^{2}}\\right) = \\frac{1}{2e}' },
        check: { kind: 'identity', lhs: 'integral(x*exp(-x^2), x, 1, t)' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: 'The integral converges (to $\\tfrac{1}{2e}$), so the series converges' },
          {
            text: 'The integral converges to $\\tfrac{1}{2e}$, so the series converges to $\\tfrac{1}{2e}$',
            mistake: 'st-sum-equals-integral',
            why: "The integral's value is not the sum of the series.",
          },
          {
            text: 'The integral converges to $\\tfrac{1}{2e}$, so the sum is at most $\\tfrac{1}{2e}$',
            mistake: 'st-sum-equals-integral',
            why: 'The test gives no such bound (the first term alone is 1/e).',
          },
          {
            text: 'The integral converges to $\\tfrac{1}{2e}$, so the series converges to $\\tfrac{1}{e}$',
            mistake: 'st-sum-equals-integral',
            why: 'The test gives no value for the sum at all.',
          },
          {
            text: 'The integral converges, so the series diverges',
            mistake: 'st-wrong-inference',
            why: 'The integral and the series both converge or both diverge.',
          },
        ],
        correct: 0,
        explanation: 'Integral converges ⇒ series converges (the value of the sum is not given by the test).',
        result: { text: 'Converges (integral test)' },
        check: { kind: 'series', term: 'n*exp(-n^2)', converges: true },
      },
    ],
    final: {
      latex: '\\text{converges (integral test)}',
      check: { kind: 'series', term: 'n*exp(-n^2)', converges: true },
      recap: 'Conditions hold ($f\' < 0$) → $\\int x e^{-x^{2}}\\,dx$ converges → the series converges; the integral\'s value $\\frac{1}{2e}$ is not the sum.',
    },
  },
];
