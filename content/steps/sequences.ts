import type { StepProblem } from '../types';

/** Step-Through problems for topic "sequences" (session 3, Phase C). */
export const steps: StepProblem[] = [
  // ───────────────────────── sq-s-01: a_n = 2^(2n+1) / 3^n ─────────────────────────
  {
    id: 'sq-s-01',
    topic: 'sequences',
    title: 'The class example',
    difficulty: 1,
    statement: { text: 'Does the sequence converge? If so, find the limit.', latex: 'a_n = \\frac{2^{2n+1}}{3^{n}}' },
    steps: [
      {
        prompt: 'What is the first move?',
        options: [
          { text: 'Rewrite $2^{2n+1} = 2\\cdot 4^{n}$ so the term becomes $a\\cdot r^{n}$' },
          {
            text: 'Take the limit directly: $\\dfrac{\\infty}{\\infty} = 1$',
            mistake: 'sq-substitute-infinity',
            why: 'Substituting infinity gives ∞/∞, which is an indeterminate form and not equal to 1.',
          },
          {
            text: 'Compare the exponents: $2n + 1 > n$, so it diverges',
            mistake: 'sq-dominant-term',
            why: 'The bases differ (2 and 3), so comparing the exponents alone decides nothing.',
          },
          {
            text: 'Compute $a_1, a_2, a_3$ and look for a pattern',
            mistake: 'sq-first-terms',
            why: 'A few terms never prove what the limit is; the behaviour as n grows has to be argued.',
          },
          {
            text: "Use L'Hôpital on $\\dfrac{2^{2x+1}}{3^{x}}$",
            mistake: 'sq-theorem-misattributed',
            why: 'It is allowed in principle, but the geometric rewrite is the intended tool and far quicker.',
          },
        ],
        correct: 0,
        explanation: 'Separate the constant from the power: $2^{2n+1} = 2\\cdot(2^{2})^{n}$.',
        result: { latex: 'a_n = \\frac{2\\cdot 4^{n}}{3^{n}}' },
        check: { kind: 'none', reason: 'first move' },
      },
      {
        prompt: 'Write $a_n$ as $a\\cdot r^{n}$.',
        options: [
          { latex: '2\\left(\\dfrac{4}{3}\\right)^{n}', expr: '2*(4/3)^n' },
          {
            latex: '2\\left(\\dfrac{2}{3}\\right)^{n}',
            expr: '2*(2/3)^n',
            mistake: 'exponent-arithmetic',
            why: 'Wrote 2^{2n} as 2^n; in fact 2^{2n} = (2²)ⁿ = 4ⁿ.',
          },
          {
            latex: '\\left(\\dfrac{4}{3}\\right)^{n}',
            expr: '(4/3)^n',
            mistake: 'algebra-error',
            why: 'Dropped the factor 2 that comes from 2^{2n+1} = 2·4ⁿ.',
          },
          {
            latex: '\\left(\\dfrac{8}{3}\\right)^{n}',
            expr: '(8/3)^n',
            mistake: 'exponent-arithmetic',
            why: 'Treated 2^{2n+1} as 8ⁿ, but 2^{2n+1} is not 8ⁿ.',
          },
          {
            latex: '4\\left(\\dfrac{4}{3}\\right)^{n}',
            expr: '4*(4/3)^n',
            mistake: 'arithmetic-error',
            why: 'Used 4 as the leading constant, but 2^{2n+1} = 2·4ⁿ, not 4·4ⁿ.',
          },
        ],
        correct: 0,
        explanation: '$(2\\cdot 4^{n})/3^{n} = 2\\left(\\tfrac{4}{3}\\right)^{n}$.',
        result: { latex: 'a_n = 2\\left(\\frac{4}{3}\\right)^{n},\\quad r = \\frac{4}{3}' },
        check: { kind: 'identity', lhs: '2^(2*n+1)/3^n' },
        variable: 'n',
        domain: { n: [1, 5] },
      },
      {
        prompt: 'What does the $\\{r^{n}\\}$ rule say here?',
        options: [
          { text: '$r = \\tfrac{4}{3} > 1$, so $r^{n} \\to \\infty$: the sequence diverges' },
          {
            text: '$r = \\tfrac{4}{3}$ is positive, so $r^{n} \\to 1$',
            mistake: 'sq-rn-boundary',
            why: 'rⁿ → 1 only when r = 1 exactly; positivity of r is not enough.',
          },
          {
            text: '$r = \\tfrac{4}{3}$, so $r^{n} \\to 0$',
            mistake: 'sq-rn-boundary',
            why: 'rⁿ → 0 needs |r| < 1, and here r is larger than 1.',
          },
          {
            text: 'The rule needs $-1 < r \\le 1$; since $r > 1$ the rule says nothing',
            mistake: 'sq-rn-boundary',
            why: 'Outside that interval the rule does say something: {rⁿ} diverges.',
          },
          {
            text: '$r = \\tfrac{4}{3}$ is close to 1, so the sequence converges to $2$',
            mistake: 'sq-first-terms',
            why: 'The terms grow without bound, however slowly they seem to grow at first.',
          },
        ],
        correct: 0,
        explanation: 'For r > 1, {rⁿ} is unbounded, so {2rⁿ} diverges.',
        result: { text: 'Diverges ($r = 4/3 > 1$)' },
        check: { kind: 'none', reason: 'the {r^n} rule' },
      },
    ],
    final: {
      latex: '\\text{diverges } (a_n \\to \\infty)',
      check: { kind: 'limit', term: '2*(4/3)^n', limit: 'infinity' },
      recap: 'Rewrite $2^{2n+1}/3^{n}$ as $2(4/3)^{n}$, so $r = 4/3 > 1$ and the sequence diverges.',
    },
  },

  // ───────────────────────── sq-s-02: a_n = (3n² + 1)/(n² − 5) ─────────────────────────
  {
    id: 'sq-s-02',
    topic: 'sequences',
    title: 'Rational sequence',
    difficulty: 1,
    statement: { text: 'Find the limit.', latex: 'a_n = \\frac{3n^{2}+1}{n^{2}-5}' },
    steps: [
      {
        prompt: 'Which rule applies?',
        options: [
          { text: 'Equal degrees: divide top and bottom by $n^{2}$ (ratio of leading coefficients)' },
          {
            text: 'Plug in $n = \\infty$: $\\dfrac{\\infty}{\\infty} = 1$',
            mistake: 'sq-substitute-infinity',
            why: 'Substituting infinity gives ∞/∞, which is indeterminate rather than equal to 1.',
          },
          {
            text: 'Degree of the top is bigger, so the limit is $\\infty$',
            mistake: 'sq-dominant-term',
            why: 'Both degrees are 2, so neither side dominates.',
          },
          {
            text: 'Degree of the bottom is bigger, so the limit is $0$',
            mistake: 'sq-dominant-term',
            why: 'Both degrees are 2, so the bottom does not dominate.',
          },
          {
            text: 'Plug in $n = 1$: $a_1 = -1$',
            mistake: 'sq-term-vs-limit',
            why: 'A single term of the sequence is not its limit.',
          },
        ],
        correct: 0,
        explanation: 'Both degrees are 2, so the limit is the ratio of the leading coefficients.',
        result: { latex: 'a_n = \\frac{3 + 1/n^{2}}{1 - 5/n^{2}}' },
        check: { kind: 'none', reason: 'method choice' },
      },
      {
        prompt: 'Take the limit.',
        options: [
          { latex: '3', expr: '3' },
          { latex: '1', expr: '1', mistake: 'sq-substitute-infinity', why: 'Cancelled ∞/∞ to 1 instead of dividing out the powers of n.' },
          { latex: '0', expr: '0', mistake: 'sq-dominant-term', why: 'The 1/n² terms vanish, but the 3 and the 1 remain, so the limit is not 0.' },
          { latex: '-\\dfrac{1}{5}', expr: '-1/5', mistake: 'sq-term-vs-limit', why: 'This is the value of the expression at n = 0, not the limit as n grows.' },
          { latex: '-\\dfrac{3}{5}', expr: '-3/5', mistake: 'arithmetic-error', why: 'Divided the 3 by the constant term −5 instead of by the leading coefficient 1.' },
        ],
        correct: 0,
        explanation: '$1/n^{2} \\to 0$, leaving $3/1$.',
        result: { latex: '\\lim_{n\\to\\infty} a_n = 3' },
        check: { kind: 'value', expected: '3' },
      },
    ],
    final: {
      latex: '3',
      expr: '3',
      check: { kind: 'limit', term: '(3*n^2+1)/(n^2-5)', limit: '3' },
      recap: 'Equal degrees: divide by $n^{2}$, the $1/n^{2}$ terms vanish, and the limit is 3.',
    },
  },

  // ───────────────────────── sq-s-03: a_n = ln n / n ─────────────────────────
  {
    id: 'sq-s-03',
    topic: 'sequences',
    title: "L'Hôpital through the Underlying Function Theorem",
    difficulty: 2,
    statement: { text: 'Find the limit.', latex: 'a_n = \\frac{\\ln n}{n}' },
    steps: [
      {
        prompt: "The form is $\\infty/\\infty$. What justifies using L'Hôpital's rule?",
        options: [
          { text: 'The Underlying Function Theorem: if $f(x) = \\dfrac{\\ln x}{x}$ has $\\lim_{x\\to\\infty} f(x) = L$, then $a_n \\to L$' },
          {
            text: "Nothing: L'Hôpital never applies to sequences",
            mistake: 'sq-theorem-misattributed',
            why: "The Underlying Function Theorem transfers the function's limit to the sequence, so L'Hôpital is available.",
          },
          {
            text: 'The Continuous Function Theorem',
            mistake: 'sq-theorem-misattributed',
            why: 'That theorem moves a limit through a continuous function f; it does not justify L’Hôpital.',
          },
          {
            text: 'The Squeeze Theorem',
            mistake: 'sq-theorem-misattributed',
            why: 'No upper and lower bounding sequences are being used here.',
          },
          {
            text: 'The Monotone Convergence Theorem',
            mistake: 'sq-theorem-misattributed',
            why: 'That theorem gives convergence of a monotone bounded sequence, not the value of a limit.',
          },
        ],
        correct: 0,
        explanation: "Replace $n$ by a real variable $x$; the function's limit is the sequence's limit.",
        result: { latex: '\\lim_{n\\to\\infty} \\frac{\\ln n}{n} = \\lim_{x\\to\\infty} \\frac{\\ln x}{x}' },
        check: { kind: 'none', reason: 'theorem choice' },
      },
      {
        prompt: "Apply L'Hôpital: differentiate top and bottom.",
        options: [
          { latex: '\\dfrac{1/x}{1}', expr: '(1/x)/1' },
          {
            latex: '\\dfrac{1}{1/x}',
            expr: '1/(1/x)',
            mistake: 'algebra-error',
            why: "Applied L'Hôpital upside down, with the derivatives in the wrong places.",
          },
          {
            text: '$\\dfrac{1}{x}\\cdot\\dfrac{1}{1}$ differentiated again: $-\\dfrac{1}{x^{2}}$',
            expr: '-1/x^2',
            mistake: 'algebra-error',
            why: 'One application is enough; the student kept differentiating after the quotient was already 1/x.',
          },
          {
            latex: '\\dfrac{\\ln x}{1}',
            expr: 'log(x)',
            mistake: 'sq-limit-law-misuse',
            why: 'Only the denominator was differentiated; the numerator must be differentiated too.',
          },
          {
            latex: '\\dfrac{x}{\\ln x}',
            expr: 'x/log(x)',
            mistake: 'algebra-error',
            why: 'Inverted the quotient instead of differentiating the top and bottom.',
          },
        ],
        correct: 0,
        explanation: '$(\\ln x)\' = 1/x$ and $(x)\' = 1$.',
        result: { latex: '= \\lim_{x\\to\\infty} \\frac{1/x}{1}' },
        check: { kind: 'identity', lhs: '1/x' },
        variable: 'x',
        domain: [1, 5],
      },
      {
        prompt: 'Evaluate.',
        options: [
          { latex: '0', expr: '0' },
          { latex: '1', expr: '1', mistake: 'sq-substitute-infinity', why: 'Cancelled ∞/∞ to 1 instead of finishing the L’Hôpital step.' },
          { latex: 'e', expr: 'e', mistake: 'sq-theorem-misattributed', why: 'Confused this with the standard limit of (1 + 1/n)ⁿ.' },
          { latex: '-1', expr: '-1', mistake: 'sign-error', why: 'Introduced a minus sign that nothing in the work produces.' },
          { latex: '\\dfrac{1}{2}', expr: '1/2', mistake: 'arithmetic-error', why: 'An arithmetic slip; 1/x tends to 0 and not to 1/2.' },
        ],
        correct: 0,
        explanation: '$1/x \\to 0$, so $\\ln n / n \\to 0$.',
        result: { latex: '\\lim_{n\\to\\infty} \\frac{\\ln n}{n} = 0' },
        check: { kind: 'value', expected: '0' },
      },
    ],
    final: {
      latex: '0',
      expr: '0',
      check: { kind: 'limit', term: 'log(n)/n', limit: '0' },
      recap: "The form $\\infty/\\infty$ plus the Underlying Function Theorem allows L'Hôpital, which gives $(1/x)/1 \\to 0$.",
    },
  },

  // ───────────────────────── sq-s-04: a_n = (1 + 2/n)^n ─────────────────────────
  {
    id: 'sq-s-04',
    topic: 'sequences',
    title: 'An e-type limit',
    difficulty: 2,
    statement: { text: 'Find the limit.', latex: 'a_n = \\left(1 + \\frac{2}{n}\\right)^{n}' },
    steps: [
      {
        prompt: 'The form is $1^{\\infty}$. What is the right move?',
        options: [
          { text: 'Take logarithms: $\\ln a_n = n\\ln\\!\\left(1 + \\tfrac{2}{n}\\right)$, find its limit, then exponentiate' },
          {
            text: '$1^{\\infty} = 1$, so the limit is $1$',
            mistake: 'sq-substitute-infinity',
            why: '1^∞ is an indeterminate form, so it cannot simply be set equal to 1.',
          },
          {
            text: 'Use the standard limit directly: it equals $e$',
            mistake: 'sq-theorem-misattributed',
            why: 'The standard limit has 1/n inside the parentheses, not 2/n.',
          },
          {
            text: 'Expand with the binomial theorem and keep the first two terms',
            mistake: 'algebra-error',
            why: 'Infinitely many terms matter as n grows, so truncating the expansion changes the limit.',
          },
          {
            text: 'Squeeze between $1$ and $3^{n}$',
            mistake: 'sq-squeeze-misuse',
            why: 'The squeeze needs both bounds to have the same limit, and these bounds do not.',
          },
        ],
        correct: 0,
        explanation: "Logarithms turn the power into a product that L'Hôpital can handle.",
        result: { latex: '\\ln a_n = n\\ln\\left(1 + \\frac{2}{n}\\right)' },
        check: { kind: 'none', reason: 'method' },
      },
      {
        prompt: "$n\\ln(1 + 2/n)$ has the form $\\infty\\cdot 0$. Rewrite it for L'Hôpital.",
        options: [
          { text: '$\\dfrac{\\ln(1 + 2/x)}{1/x}$, a $0/0$ form' },
          {
            text: '$\\dfrac{x}{1/\\ln(1+2/x)}$',
            mistake: 'algebra-error',
            why: "The algebra is correct but the shape is wrong for L'Hôpital: the derivative becomes a mess.",
          },
          {
            text: '$\\infty \\cdot 0 = 0$, so $\\ln a_n \\to 0$',
            mistake: 'sq-limit-law-misuse',
            why: '∞·0 is an indeterminate form and is not automatically 0.',
          },
          {
            text: '$\\ln\\!\\left(1 + \\dfrac{2}{x}\\right)^{x} = x\\cdot\\ln 1 = 0$',
            mistake: 'sq-substitute-infinity',
            why: 'Plugged ∞ into part of the expression while the other factor still grows.',
          },
          {
            text: '$\\dfrac{\\ln(1 + 2/x)}{x}$',
            mistake: 'algebra-error',
            why: 'That puts n in the denominator, a 0/∞ form, which is not the same quantity as n·ln(1 + 2/n).',
          },
        ],
        correct: 0,
        explanation: 'Move $n$ into the denominator as $1/n$ to get a $0/0$ form.',
        result: { latex: '\\lim_{x\\to\\infty} \\frac{\\ln(1+2/x)}{1/x}' },
        check: { kind: 'none', reason: 'rewriting an ∞·0 form' },
      },
      {
        prompt: "Apply L'Hôpital and evaluate the limit of $\\ln a_n$.",
        options: [
          { latex: '2', expr: '2' },
          { latex: '1', expr: '1', mistake: 'arithmetic-error', why: 'Forgot the factor 2 from the inner derivative of 2/x.' },
          { latex: '0', expr: '0', mistake: 'sq-limit-law-misuse', why: 'Treated ∞·0 as 0 instead of resolving the indeterminate form.' },
          { latex: '-2', expr: '-2', mistake: 'sign-error', why: 'Kept one of the two minus signs; they cancel in the quotient of derivatives.' },
          { latex: '\\dfrac{1}{2}', expr: '1/2', mistake: 'algebra-error', why: 'Inverted the quotient of derivatives.' },
        ],
        correct: 0,
        explanation: 'Derivatives: $\\dfrac{-2/x^{2}}{1 + 2/x}$ over $-1/x^{2}$ gives $\\dfrac{2}{1 + 2/x} \\to 2$.',
        result: { latex: '\\lim_{n\\to\\infty} \\ln a_n = 2' },
        check: { kind: 'value', expected: '2' },
      },
      {
        prompt: 'Exponentiate.',
        options: [
          { latex: 'e^{2}', expr: 'e^2' },
          { latex: '2', expr: '2', mistake: 'sq-term-vs-limit', why: 'The value 2 is the limit of ln aₙ, not the limit of aₙ.' },
          { latex: 'e', expr: 'e', mistake: 'sq-theorem-misattributed', why: 'Confused this with the standard limit of (1 + 1/n)ⁿ.' },
          { latex: '2e', expr: '2*e', mistake: 'arithmetic-error', why: 'Multiplied by e instead of exponentiating.' },
          { latex: '\\ln 2', expr: 'log(2)', mistake: 'algebra-error', why: 'Took a logarithm instead of exponentiating.' },
        ],
        correct: 0,
        explanation: '$a_n = e^{\\ln a_n} \\to e^{2}$.',
        result: { latex: '\\lim_{n\\to\\infty} a_n = e^{2}' },
        check: { kind: 'value', expected: 'e^2' },
      },
    ],
    final: {
      latex: 'e^{2}',
      expr: 'e^2',
      check: { kind: 'limit', term: '(1+2/n)^n', limit: 'e^2' },
      recap: "The form $1^{\\infty}$: take logs, rewrite as $0/0$, L'Hôpital gives 2, then exponentiate to get $e^{2}$.",
    },
  },

  // ───────────────────────── sq-s-05: a_n = (−1)^n / n ─────────────────────────
  {
    id: 'sq-s-05',
    topic: 'sequences',
    title: 'Alternating signs and the Squeeze corollary',
    difficulty: 2,
    statement: { text: 'Does the sequence converge? If so, find the limit.', latex: 'a_n = \\frac{(-1)^{n}}{n}' },
    steps: [
      {
        prompt: 'The signs alternate. What is the right tool?',
        options: [
          { text: 'Look at $|a_n| = \\dfrac{1}{n}$ and use the corollary $|a_n| \\to 0 \\Rightarrow a_n \\to 0$' },
          {
            text: 'Alternating signs mean the sequence diverges',
            mistake: 'sq-oscillation-means-divergence',
            why: 'Sign changes do not prevent convergence; the size of the terms is what matters.',
          },
          {
            text: 'Use the $\\{r^{n}\\}$ rule with $r = -1$',
            mistake: 'sq-rn-boundary',
            why: '(−1)ⁿ alone has no limit, but the factor 1/n matters, so the rule does not apply to this term.',
          },
          {
            text: 'Use L\'Hôpital on $\\dfrac{(-1)^{x}}{x}$',
            mistake: 'sq-theorem-misattributed',
            why: '(−1)ˣ is not a real-valued function, so the Underlying Function Theorem cannot be used.',
          },
          {
            text: 'The sequence is bounded by $1$, so it converges',
            mistake: 'sq-bounded-implies-convergent',
            why: 'Boundedness alone does not give convergence.',
          },
        ],
        correct: 0,
        explanation: 'The corollary of the Squeeze Theorem handles sign changes.',
        result: { latex: '|a_n| = \\frac{1}{n}' },
        check: { kind: 'none', reason: 'method' },
      },
      {
        prompt: '$\\lim |a_n| = ?$',
        options: [
          { latex: '0', expr: '0' },
          { latex: '1', expr: '1', mistake: 'sq-term-vs-limit', why: 'This is the first term, not the limit.' },
          { latex: '-1', expr: '-1', mistake: 'sign-error', why: 'An absolute value is never negative, so the limit of |aₙ| cannot be −1.' },
          { latex: '\\dfrac{1}{2}', expr: '1/2', mistake: 'sq-term-vs-limit', why: 'This is a single term of |aₙ|, not the limit.' },
          { latex: 'e', expr: 'e', mistake: 'sq-theorem-misattributed', why: 'There is no e-type limit in this problem.' },
        ],
        correct: 0,
        explanation: '$1/n \\to 0$.',
        result: { latex: '|a_n| \\to 0' },
        check: { kind: 'value', expected: '0' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: '$|a_n| \\to 0$, so $a_n \\to 0$: converges to $0$' },
          {
            text: '$|a_n| \\to 0$, but $a_n$ alternates, so the limit does not exist',
            mistake: 'sq-oscillation-means-divergence',
            why: 'The corollary says that |aₙ| → 0 forces aₙ → 0, regardless of the signs.',
          },
          {
            text: '$|a_n| \\to 0$, so $a_n \\to \\pm 0$: two limits, hence diverges',
            mistake: 'sq-oscillation-means-divergence',
            why: '+0 and −0 are the same number, so there is only one limit.',
          },
          {
            text: 'Converges to $-1$, the first term',
            mistake: 'sq-term-vs-limit',
            why: 'The first term is not the limit of the sequence.',
          },
          {
            text: 'Converges to $0$ because $(-1)^{n} \\to 0$',
            mistake: 'sq-rn-boundary',
            why: 'The value 0 is right, but the reason is invalid: (−1)ⁿ has no limit at all.',
          },
        ],
        correct: 0,
        explanation: '$-\\tfrac{1}{n} \\le a_n \\le \\tfrac{1}{n}$ and both bounds tend to 0.',
        result: { latex: '\\lim_{n\\to\\infty} \\frac{(-1)^{n}}{n} = 0' },
        check: { kind: 'none', reason: 'conclusion' },
      },
    ],
    final: {
      latex: '0',
      expr: '0',
      check: { kind: 'limit', term: '(-1)^n/n', limit: '0' },
      recap: 'Alternating signs: look at $|a_n| = 1/n \\to 0$, and the Squeeze corollary gives $a_n \\to 0$.',
    },
  },

  // ───────────────────────── sq-s-06: a_n = n/(n+1), Monotone Convergence Theorem ─────────────────────────
  {
    id: 'sq-s-06',
    topic: 'sequences',
    title: 'Monotone Convergence Theorem',
    difficulty: 1,
    statement: {
      text: 'Show that the sequence converges using the Monotone Convergence Theorem, then find the limit.',
      latex: 'a_n = \\frac{n}{n+1}',
    },
    steps: [
      {
        prompt: 'Is it monotone? Compute $a_{n+1} - a_n$.',
        options: [
          { text: '$\\dfrac{1}{(n+1)(n+2)} > 0$: increasing', expr: '1/((n+1)*(n+2))' },
          {
            text: '$\\dfrac{1}{n+1} - \\dfrac{1}{n} < 0$: decreasing',
            expr: '1/(n+1) - 1/n',
            mistake: 'algebra-error',
            why: 'That is the difference of 1/n, not of n/(n+1).',
          },
          {
            latex: '\\dfrac{1}{n+2} - \\dfrac{1}{n+1}',
            expr: '1/(n+2) - 1/(n+1)',
            mistake: 'sign-error',
            why: 'A sign slip: the true difference is positive.',
          },
          {
            latex: '1',
            expr: '1',
            mistake: 'algebra-error',
            why: 'Subtracted the numerators without putting the fractions over a common denominator.',
          },
          {
            latex: '\\dfrac{2n+1}{(n+1)(n+2)}',
            expr: '(2*n+1)/((n+1)*(n+2))',
            mistake: 'algebra-error',
            why: 'An algebra slip in the numerator when combining the two fractions.',
          },
        ],
        correct: 0,
        explanation: '$\\dfrac{n+1}{n+2} - \\dfrac{n}{n+1} = \\dfrac{(n+1)^{2} - n(n+2)}{(n+1)(n+2)} = \\dfrac{1}{(n+1)(n+2)} > 0$.',
        result: { text: 'Increasing' },
        check: { kind: 'identity', lhs: '1/((n+1)*(n+2))' },
        variable: 'n',
        domain: { n: [1, 6] },
      },
      {
        prompt: 'Is it bounded?',
        options: [
          { text: 'Yes: $0 < \\dfrac{n}{n+1} < 1$ for all $n$' },
          {
            text: 'No: $n \\to \\infty$ makes it unbounded',
            mistake: 'sq-dominant-term',
            why: 'The denominator grows too, so the ratio stays below 1.',
          },
          {
            text: 'Bounded above by $\\tfrac{1}{2}$',
            mistake: 'sq-first-terms',
            why: 'a₁ = 1/2 is the smallest term, not the largest, so it is not an upper bound.',
          },
          {
            text: 'Only bounded below, by $0$',
            mistake: 'sq-dominant-term',
            why: 'It is also bounded above, since every term is below 1.',
          },
          {
            text: 'Bounded, so it converges to $1$ right away',
            mistake: 'sq-bounded-implies-convergent',
            why: 'Boundedness alone is not the theorem; monotonicity is needed as well.',
          },
        ],
        correct: 0,
        explanation: '$n < n + 1$ gives $a_n < 1$, and all terms are positive.',
        result: { text: 'Bounded: $0 < a_n < 1$' },
        check: { kind: 'none', reason: 'boundedness' },
      },
      {
        prompt: 'What does the Monotone Convergence Theorem give?',
        options: [
          { text: 'Increasing and bounded above, so $\\{a_n\\}$ converges' },
          {
            text: 'Increasing, so it converges',
            mistake: 'sq-monotone-implies-convergent',
            why: 'Both hypotheses (monotone and bounded) are needed.',
          },
          {
            text: 'Bounded, so it converges',
            mistake: 'sq-bounded-implies-convergent',
            why: 'Both hypotheses (monotone and bounded) are needed.',
          },
          {
            text: 'It converges to its upper bound $1$ by the theorem',
            mistake: 'sq-theorem-misattributed',
            why: 'The theorem gives convergence, not the value of the limit.',
          },
          {
            text: 'Nothing: the theorem needs the sequence to be decreasing',
            mistake: 'sq-theorem-misattributed',
            why: 'Increasing or decreasing both work, as long as the sequence is bounded in the right direction.',
          },
        ],
        correct: 0,
        explanation: 'Monotone AND bounded implies convergent.',
        result: { text: 'Converges (MCT)' },
        check: { kind: 'none', reason: 'theorem' },
      },
      {
        prompt: 'Find the limit.',
        options: [
          { latex: '1', expr: '1' },
          { latex: '0', expr: '0', mistake: 'sq-dominant-term', why: 'Equal degrees give the ratio of the leading coefficients, not 0.' },
          { latex: '\\dfrac{1}{2}', expr: '1/2', mistake: 'sq-term-vs-limit', why: 'This is the first term, not the limit.' },
          { latex: '2', expr: '2', mistake: 'arithmetic-error', why: 'An arithmetic slip; the ratio of leading coefficients is 1/1 = 1.' },
          { latex: '-1', expr: '-1', mistake: 'sign-error', why: 'A sign slip; all terms are positive, so the limit cannot be negative.' },
        ],
        correct: 0,
        explanation: '$\\dfrac{n}{n+1} = \\dfrac{1}{1 + 1/n} \\to 1$.',
        result: { latex: '\\lim_{n\\to\\infty} a_n = 1' },
        check: { kind: 'value', expected: '1' },
      },
    ],
    final: {
      latex: '1',
      expr: '1',
      check: { kind: 'limit', term: 'n/(n+1)', limit: '1' },
      recap: '$a_{n+1} - a_n > 0$ (increasing) and $0 < a_n < 1$ (bounded), so the MCT gives convergence; the limit is 1.',
    },
  },

  // ───────────────────────── sq-s-07: a_n = √(n² + n) − n ─────────────────────────
  {
    id: 'sq-s-07',
    topic: 'sequences',
    title: '∞ − ∞: rationalize',
    difficulty: 2,
    statement: { text: 'Find the limit.', latex: 'a_n = \\sqrt{n^{2}+n} - n' },
    steps: [
      {
        prompt: 'The form is $\\infty - \\infty$. What is the right move?',
        options: [
          { text: 'Multiply and divide by the conjugate $\\sqrt{n^{2}+n} + n$' },
          {
            text: '$\\infty - \\infty = 0$',
            mistake: 'sq-substitute-infinity',
            why: '∞ − ∞ is an indeterminate form, not automatically 0.',
          },
          {
            text: '$\\sqrt{n^{2}+n} \\approx n$, so the limit is $0$',
            mistake: 'sq-dominant-term',
            why: 'The difference of two things that both grow like n need not be 0.',
          },
          {
            text: '$\\infty - \\infty$ is indeterminate, so the limit does not exist',
            mistake: 'sq-limit-law-misuse',
            why: 'Indeterminate means more work is needed, not that the limit fails to exist.',
          },
          {
            text: "Use L'Hôpital immediately",
            mistake: 'sq-theorem-misattributed',
            why: "L'Hôpital needs a quotient, and this expression is a difference.",
          },
        ],
        correct: 0,
        explanation: 'Rationalizing turns the difference into a quotient.',
        result: {
          latex: 'a_n = \\frac{(n^{2}+n) - n^{2}}{\\sqrt{n^{2}+n} + n} = \\frac{n}{\\sqrt{n^{2}+n} + n}',
        },
        check: { kind: 'none', reason: 'method' },
      },
      {
        prompt: 'Divide top and bottom by $n$.',
        options: [
          { latex: '\\dfrac{1}{\\sqrt{1 + 1/n} + 1}', expr: '1/(sqrt(1+1/n)+1)' },
          {
            latex: '\\dfrac{1}{\\sqrt{n + 1} + 1}',
            expr: '1/(sqrt(n+1)+1)',
            mistake: 'algebra-error',
            why: 'Dividing inside the root by n means dividing by n², not n.',
          },
          {
            latex: '\\dfrac{1}{\\sqrt{1 + 1/n}}',
            expr: '1/sqrt(1+1/n)',
            mistake: 'algebra-error',
            why: 'The + n term in the denominator was dropped.',
          },
          {
            latex: '\\dfrac{1}{\\sqrt{1 + 1/n^{2}} + 1}',
            expr: '1/(sqrt(1+1/n^2)+1)',
            mistake: 'algebra-error',
            why: 'Divided n² + n by n² incorrectly: (n² + n)/n² = 1 + 1/n.',
          },
          {
            latex: '\\dfrac{1}{1 + 1/n + 1}',
            expr: '1/(2+1/n)',
            mistake: 'algebra-error',
            why: 'The square root was dropped from the denominator.',
          },
        ],
        correct: 0,
        explanation: '$\\sqrt{n^{2}+n}\\,/\\,n = \\sqrt{1 + 1/n}$.',
        result: { latex: 'a_n = \\frac{1}{\\sqrt{1+1/n} + 1}' },
        check: { kind: 'identity', lhs: 'n/(sqrt(n^2+n)+n)' },
        variable: 'n',
        domain: { n: [1, 9] },
      },
      {
        prompt: 'Take the limit.',
        options: [
          { latex: '\\dfrac{1}{2}', expr: '1/2' },
          { latex: '0', expr: '0', mistake: 'sq-dominant-term', why: 'The denominator tends to 2, not to ∞, so the limit is not 0.' },
          { latex: '1', expr: '1', mistake: 'arithmetic-error', why: 'Forgot that √1 + 1 = 2 in the denominator.' },
          { latex: '\\dfrac{1}{4}', expr: '1/4', mistake: 'arithmetic-error', why: 'An arithmetic slip when evaluating the denominator.' },
          { latex: '2', expr: '2', mistake: 'algebra-error', why: 'Inverted the result: the fraction is 1/2, not 2.' },
        ],
        correct: 0,
        explanation: '$1/n \\to 0$, so the denominator tends to $\\sqrt{1} + 1 = 2$.',
        result: { latex: '\\lim_{n\\to\\infty} a_n = \\frac{1}{2}' },
        check: { kind: 'value', expected: '1/2' },
      },
    ],
    final: {
      latex: '\\frac{1}{2}',
      expr: '1/2',
      check: { kind: 'limit', term: 'sqrt(n^2+n)-n', limit: '1/2' },
      recap: 'The form ∞ − ∞: multiply by the conjugate to get $n/(\\sqrt{n^{2}+n} + n)$, divide by $n$, and the limit is $1/2$.',
    },
  },

  // ───────────────────────── sq-s-08: a_n = (−1)^n ─────────────────────────
  {
    id: 'sq-s-08',
    topic: 'sequences',
    title: 'Bounded but divergent',
    difficulty: 1,
    statement: { text: 'Decide whether the sequence is bounded, monotone and convergent.', latex: 'a_n = (-1)^{n}' },
    steps: [
      {
        prompt: 'Is it bounded?',
        options: [
          { text: 'Yes: $|a_n| = 1 \\le 1$ for all $n$' },
          {
            text: 'No: it never settles, so it is unbounded',
            mistake: 'sq-oscillation-means-divergence',
            why: 'Bounded means |aₙ| ≤ M for some M, and that holds here with M = 1.',
          },
          {
            text: 'Only bounded above',
            mistake: 'sq-theorem-misattributed',
            why: 'It is bounded below as well, since −1 ≤ aₙ for every n.',
          },
          {
            text: 'Bounded, hence convergent',
            mistake: 'sq-bounded-implies-convergent',
            why: 'Boundedness alone does not give convergence.',
          },
          {
            text: 'Cannot say: the terms keep changing',
            mistake: 'sq-first-terms',
            why: 'The bound is immediate from the formula, whatever the terms are doing.',
          },
        ],
        correct: 0,
        explanation: 'Every term is $1$ or $-1$.',
        result: { text: 'Bounded ($|a_n| \\le 1$)' },
        check: { kind: 'none', reason: 'boundedness' },
      },
      {
        prompt: 'Is it monotone?',
        options: [
          { text: 'No: the terms go $-1, 1, -1, 1, \\ldots$, neither increasing nor decreasing' },
          {
            text: 'Yes, increasing: $-1 < 1$',
            mistake: 'sq-first-terms',
            why: 'Two terms do not make a sequence monotone; every later pair must be checked.',
          },
          {
            text: 'Yes, decreasing: $1 > -1$',
            mistake: 'sq-first-terms',
            why: 'Two terms do not make a sequence monotone; every later pair must be checked.',
          },
          {
            text: 'Monotone because $|a_n|$ is constant',
            mistake: 'algebra-error',
            why: 'A constant |aₙ| says nothing about the signs, which are what decide monotonicity.',
          },
          {
            text: 'Monotone, so it converges',
            mistake: 'sq-monotone-implies-convergent',
            why: 'It is not monotone, and monotone alone would not suffice for convergence anyway.',
          },
        ],
        correct: 0,
        explanation: '$a_{n+1} - a_n$ alternates between $2$ and $-2$.',
        result: { text: 'Not monotone' },
        check: { kind: 'none', reason: 'monotonicity' },
      },
      {
        prompt: 'Does it converge?',
        options: [
          { text: 'No: the terms alternate between $-1$ and $1$ and never settle (the limit does not exist)' },
          {
            text: 'Yes, to $0$: the terms average out',
            mistake: 'sq-squeeze-misuse',
            why: 'Squeezing between −1 and 1 gives no limit, since the bounds do not converge to a common value.',
          },
          {
            text: 'Yes, to $1$: $|a_n| \\to 1$',
            mistake: 'sq-theorem-misattributed',
            why: 'Only |aₙ| → 0 transfers to aₙ; |aₙ| → 1 says nothing about aₙ itself.',
          },
          {
            text: 'Yes, because it is bounded',
            mistake: 'sq-bounded-implies-convergent',
            why: 'Bounded does not imply convergent.',
          },
          {
            text: 'Yes, to $-1$: $r = -1$ is allowed in the $\\{r^{n}\\}$ rule',
            mistake: 'sq-rn-boundary',
            why: 'The {rⁿ} rule requires −1 < r ≤ 1, so r = −1 is excluded.',
          },
        ],
        correct: 0,
        explanation: 'A limit $L$ would need the terms to be eventually within any distance of $L$; the values $\\pm 1$ never are.',
        result: { text: 'Diverges (limit DNE)' },
        check: { kind: 'limit', term: '(-1)^n', limit: 'dne' },
      },
    ],
    final: {
      latex: '\\text{diverges (bounded, not monotone, limit DNE)}',
      check: { kind: 'limit', term: '(-1)^n', limit: 'dne' },
      recap: 'Bounded by 1, not monotone, and the terms never settle, so the sequence diverges: bounded does not imply convergent.',
    },
  },

  // ───────────────────────── sq-s-09: a_n = n sin(1/n) ─────────────────────────
  {
    id: 'sq-s-09',
    topic: 'sequences',
    title: 'n sin(1/n)',
    difficulty: 1,
    statement: { text: 'Find the limit.', latex: 'a_n = n\\sin\\!\\left(\\frac{1}{n}\\right)' },
    steps: [
      {
        prompt: 'What form is this, and what is the right move?',
        options: [
          { text: "$\\infty\\cdot 0$: write it as $\\dfrac{\\sin(1/x)}{1/x}$ and use the Underlying Function Theorem with L'Hôpital" },
          {
            text: '$\\infty\\cdot 0 = 0$',
            mistake: 'sq-limit-law-misuse',
            why: '∞·0 is an indeterminate form, not automatically 0.',
          },
          {
            text: '$\\sin(1/n)$ is bounded, so $n\\sin(1/n) \\to \\infty$',
            mistake: 'sq-dominant-term',
            why: 'sin(1/n) → 0, so it is not merely bounded; it shrinks and competes with the growing n.',
          },
          {
            text: '$\\sin$ oscillates, so the limit does not exist',
            mistake: 'sq-connect-the-dots',
            why: 'The argument 1/n tends to 0, so sin(1/n) does not oscillate.',
          },
          {
            text: 'Plug in $n = 1$: $\\sin 1$',
            mistake: 'sq-term-vs-limit',
            why: 'A single term of the sequence is not the limit.',
          },
        ],
        correct: 0,
        explanation: 'Move $n$ to the denominator as $1/n$ to get a $0/0$ quotient.',
        result: { latex: '\\lim_{x\\to\\infty} \\frac{\\sin(1/x)}{1/x}' },
        check: { kind: 'none', reason: 'form and method' },
      },
      {
        prompt: "Apply L'Hôpital.",
        options: [
          { text: '$\\dfrac{\\cos(1/x)\\cdot(-1/x^{2})}{-1/x^{2}} = \\cos(1/x)$' },
          {
            text: '$\\dfrac{\\cos(1/x)}{-1/x^{2}}$',
            mistake: 'chain-rule-missing',
            why: 'The inner derivative of 1/x is missing on top, so the factor −1/x² does not cancel.',
          },
          {
            text: '$\\dfrac{-\\cos(1/x)}{1/x^{2}}$',
            mistake: 'sign-error',
            why: 'The minus signs in the numerator and denominator cancel; they were not tracked correctly.',
          },
          {
            text: '$\\dfrac{\\sin(1/x)}{1}$',
            mistake: 'algebra-error',
            why: 'The top was not differentiated.',
          },
          {
            text: '$\\dfrac{\\cos(1/x)}{\\ln x}$',
            mistake: 'log-derivative-wrong',
            why: 'The derivative of 1/x is −1/x², not ln x.',
          },
        ],
        correct: 0,
        explanation: 'Both derivatives carry the factor $-1/x^{2}$, which cancels.',
        result: { latex: '= \\lim_{x\\to\\infty} \\cos(1/x)' },
        check: { kind: 'none', reason: "L'Hôpital step" },
      },
      {
        prompt: 'Evaluate.',
        options: [
          { latex: '1', expr: '1' },
          { latex: '0', expr: '0', mistake: 'sq-limit-law-misuse', why: 'cos(1/x) tends to cos 0 = 1, not to 0.' },
          { latex: '\\sin 1', expr: 'sin(1)', mistake: 'sq-term-vs-limit', why: 'This is the value of the first term at n = 1, not the limit.' },
          { latex: '-1', expr: '-1', mistake: 'sign-error', why: 'A sign slip; cos(1/x) approaches +1.' },
          { latex: '\\dfrac{\\pi}{2}', expr: 'pi/2', mistake: 'inverse-trig-value-wrong', why: 'Recalled an arctan-type limit, but there is no arctan in this problem.' },
        ],
        correct: 0,
        explanation: '$\\cos(1/x) \\to \\cos 0 = 1$ by continuity.',
        result: { latex: '\\lim_{n\\to\\infty} n\\sin(1/n) = 1' },
        check: { kind: 'value', expected: '1' },
      },
    ],
    final: {
      latex: '1',
      expr: '1',
      check: { kind: 'limit', term: 'n*sin(1/n)', limit: '1' },
      recap: "The form $\\infty\\cdot 0$: rewrite as $\\sin(1/x)/(1/x)$, L'Hôpital leaves $\\cos(1/x)$, which tends to 1.",
    },
  },
];
