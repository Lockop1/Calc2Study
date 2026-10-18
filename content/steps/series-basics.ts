import type { StepProblem } from '../types';

/** Step-Through problems for topic "series-basics" (session 3, Phase C). */
export const steps: StepProblem[] = [
  // ───────────────────────── sb-s-01: Σ 3(1/2)^(n−1) ─────────────────────────
  {
    id: 'sb-s-01',
    topic: 'series-basics',
    title: 'Geometric series: a and r',
    difficulty: 1,
    statement: { text: 'Find the sum, if it exists.', latex: '\\sum_{n=1}^{\\infty} 3\\left(\\frac{1}{2}\\right)^{n-1}' },
    steps: [
      {
        prompt: 'Identify the first term $a$ and the ratio $r$.',
        options: [
          { latex: 'a = 3,\\quad r = \\frac{1}{2}', expr: '[3, 1/2]' },
          {
            latex: 'a = \\frac{3}{2},\\quad r = \\frac{1}{2}',
            expr: '[3/2, 1/2]',
            mistake: 'sb-wrong-first-term',
            why: 'Used the n = 2 term as a, although the series starts at n = 1 with the term 3.',
          },
          {
            latex: 'a = \\frac{3}{2},\\quad r = 2',
            expr: '[3/2, 2]',
            mistake: 'sb-wrong-first-term',
            why: 'Used the n = 2 term as a and also inverted the ratio r.',
          },
          {
            latex: 'a = \\frac{3}{2},\\quad r = \\frac{1}{4}',
            expr: '[3/2, 1/4]',
            mistake: 'sb-wrong-first-term',
            why: 'Used the n = 2 term as a and also squared the ratio r.',
          },
          {
            latex: 'a = 1,\\quad r = \\frac{1}{2}',
            expr: '[1, 1/2]',
            mistake: 'sb-wrong-first-term',
            why: 'Ignored the coefficient 3, so the first term was taken to be 1 instead of 3.',
          },
        ],
        correct: 0,
        explanation: 'At n = 1 the term is 3·(1/2)⁰ = 3; each term is half the previous one.',
        result: { latex: 'a = 3,\\quad r = \\frac{1}{2}' },
        check: { kind: 'value', expected: '[3, 1/2]' },
      },
      {
        prompt: 'Does the series converge?',
        options: [
          { text: 'Yes: $|r| = \\frac{1}{2} < 1$' },
          {
            text: 'No: $r = \\frac{1}{2} \\le 1$ fails the condition $r > 1$',
            mistake: 'sb-r-boundary',
            why: 'Used the wrong condition: a geometric series converges when |r| < 1, not when r > 1.',
          },
          {
            text: 'No: $r = \\frac{1}{2} \\le 1$ fails the condition, and the terms do not tend to $0$',
            mistake: 'sb-r-boundary',
            why: 'Used the wrong condition, and the terms do tend to 0 here because |r| < 1 holds.',
          },
          {
            text: 'No: $a = 3$ is not less than $1$',
            mistake: 'sb-wrong-ratio',
            why: 'Applied the condition |r| < 1 to the first term a instead of r',
          },
          {
            text: 'Yes, because $a_n \\to 0$',
            mistake: 'sb-divergence-test-converse',
            why: 'The verdict is right but the reason is invalid: terms tending to 0 never prove convergence.',
          },
        ],
        correct: 0,
        explanation: 'A geometric series converges exactly when |r| < 1.',
        result: { text: 'Converges ($|r| < 1$)' },
        check: { kind: 'none', reason: 'convergence condition' },
      },
      {
        prompt: 'Compute the sum.',
        options: [
          { latex: '6', expr: '6' },
          {
            latex: '\\frac{3}{2}',
            expr: '3/2',
            mistake: 'sb-partial-sum-formula',
            why: 'Computed a(1 − r) = 3 · 1/2 instead of dividing a by 1 − r.',
          },
          {
            latex: '\\frac{3}{4}',
            expr: '3/4',
            mistake: 'sb-partial-sum-formula',
            why: 'Computed a(1 − r) and then halved the result again.',
          },
          {
            latex: '\\frac{1}{2}',
            expr: '1/2',
            mistake: 'sb-partial-sum-formula',
            why: 'Computed a(1 − r) with a = 1 instead of dividing a = 3 by 1 − r.',
          },
          {
            latex: '2',
            expr: '2',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1 in a/(1 − r), forgetting the coefficient 3.',
          },
        ],
        correct: 0,
        explanation: 'a/(1 − r) = 3/(1/2) = 6.',
        result: { latex: 'S = \\frac{3}{1 - 1/2} = 6' },
        check: { kind: 'series', term: '3*(1/2)^(n-1)', converges: true, sum: '6' },
      },
    ],
    final: {
      latex: '6',
      expr: '6',
      check: { kind: 'series', term: '3*(1/2)^(n-1)', converges: true, sum: '6' },
      recap: 'a = 3, r = 1/2 → |r| < 1 → sum a/(1 − r) = 6.',
    },
  },

  // ───────────────────────── sb-s-02: Σ_{n=0} (1/3)^n ─────────────────────────
  {
    id: 'sb-s-02',
    topic: 'series-basics',
    title: 'Watch the starting index',
    difficulty: 1,
    statement: { text: 'Find the sum, if it exists.', latex: '\\sum_{n=0}^{\\infty} \\left(\\frac{1}{3}\\right)^{n}' },
    steps: [
      {
        prompt: 'Identify $a$ (the first term) and $r$.',
        options: [
          { latex: 'a = 1,\\quad r = \\frac{1}{3}', expr: '[1, 1/3]' },
          {
            latex: 'a = \\frac{1}{3},\\quad r = \\frac{1}{3}',
            expr: '[1/3, 1/3]',
            mistake: 'sb-wrong-first-term',
            why: 'The series starts at n = 0, where the term is 1, not at n = 1.',
          },
          {
            latex: 'a = \\frac{1}{3},\\quad r = 3',
            expr: '[1/3, 3]',
            mistake: 'sb-wrong-first-term',
            why: 'Started at n = 1 instead of n = 0 and also inverted the ratio r.',
          },
          {
            latex: 'a = \\frac{1}{3},\\quad r = \\frac{1}{9}',
            expr: '[1/3, 1/9]',
            mistake: 'sb-wrong-first-term',
            why: 'Started at n = 1 instead of n = 0 and also squared the ratio r.',
          },
          {
            latex: 'a = 0,\\quad r = \\frac{1}{3}',
            expr: '[0, 1/3]',
            mistake: 'sb-wrong-first-term',
            why: 'Took the starting index 0 as the first term; the first term is (1/3)⁰ = 1.',
          },
        ],
        correct: 0,
        explanation: 'a is the actual first term: (1/3)⁰ = 1.',
        result: { latex: 'a = 1,\\quad r = \\frac{1}{3}' },
        check: { kind: 'value', expected: '[1, 1/3]' },
      },
      {
        prompt: 'Does the series converge?',
        options: [
          { text: 'Yes: $|r| = \\tfrac{1}{3} < 1$' },
          {
            text: 'No: $r = \\tfrac{1}{3} \\le 1$ fails the condition $r > 1$',
            mistake: 'sb-r-boundary',
            why: 'Misstated the condition; it is |r| < 1.',
          },
          {
            text: 'No: $r = \\tfrac{1}{3} \\le 1$ fails the condition, and the terms do not tend to $0$',
            mistake: 'sb-r-boundary',
            why: 'Misstated the condition, and the terms do tend to 0.',
          },
          {
            text: 'No: $a = 1$ fails the condition $|a| < 1$',
            mistake: 'sb-r-boundary',
            why: 'Misstated the condition and applied it to a, which plays no role.',
          },
          {
            text: 'Yes, because the terms tend to $0$',
            mistake: 'sb-divergence-test-converse',
            why: 'Right verdict, invalid reason: terms → 0 never proves convergence.',
          },
        ],
        correct: 0,
        explanation: 'A geometric series converges exactly when $|r| < 1$.',
        result: { text: 'Converges ($|r| < 1$)' },
        check: { kind: 'none', reason: 'convergence condition stated in words' },
      },
      {
        prompt: '$|r| < 1$, so compute the sum.',
        options: [
          { latex: '\\frac{3}{2}', expr: '3/2' },
          {
            latex: '\\frac{1}{2}',
            expr: '1/2',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1/3 (the n = 1 term) in a/(1 − r), but the series starts at n = 0 with a = 1.',
          },
          {
            latex: '\\frac{2}{9}',
            expr: '2/9',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1/3 and multiplied by 1 − r instead of dividing by it.',
          },
          {
            latex: '\\frac{1}{4}',
            expr: '1/4',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1/3 and put 1 + r in the denominator instead of 1 − r.',
          },
          {
            latex: '\\frac{2}{3}',
            expr: '2/3',
            mistake: 'sb-partial-sum-formula',
            why: 'Computed a(1 − r) = 1 · 2/3 instead of dividing a by 1 − r.',
          },
        ],
        correct: 0,
        explanation: '1/(1 − 1/3) = 3/2.',
        result: { latex: 'S = \\frac{1}{1 - 1/3} = \\frac{3}{2}' },
        check: { kind: 'series', term: '(1/3)^n', from: '0', converges: true, sum: '3/2' },
      },
    ],
    final: {
      latex: '\\frac{3}{2}',
      expr: '3/2',
      check: { kind: 'series', term: '(1/3)^n', from: '0', converges: true, sum: '3/2' },
      recap: 'The index starts at 0, so a = 1 → r = 1/3 → 1/(1 − 1/3) = 3/2.',
    },
  },

  // ───────────────────────── sb-s-03: Σ 2^n / 3^(n+1) ─────────────────────────
  {
    id: 'sb-s-03',
    topic: 'series-basics',
    title: 'Rewrite into geometric form',
    difficulty: 2,
    statement: { text: 'Find the sum, if it exists.', latex: '\\sum_{n=1}^{\\infty} \\frac{2^{n}}{3^{n+1}}' },
    steps: [
      {
        prompt: 'Rewrite the term as $a\\cdot r^{n}$ or $a\\cdot r^{n-1}$.',
        options: [
          { latex: '\\frac{1}{3}\\left(\\frac{2}{3}\\right)^{n}', expr: '(1/3)*(2/3)^n' },
          {
            latex: '\\left(\\frac{2}{3}\\right)^{n}',
            expr: '(2/3)^n',
            mistake: 'algebra-error',
            why: 'Dropped the extra factor 1/3 that comes from 3^{n+1} = 3 · 3ⁿ.',
          },
          {
            latex: '\\left(\\frac{2}{3}\\right)^{n+1}',
            expr: '(2/3)^(n+1)',
            mistake: 'algebra-error',
            why: 'Dropped the factor 1/3 and moved the +1 onto the whole ratio 2/3.',
          },
          {
            latex: '3\\left(\\frac{2}{3}\\right)^{n}',
            expr: '3*(2/3)^n',
            mistake: 'algebra-error',
            why: 'Dropped the factor 1/3 and multiplied by 3 instead.',
          },
          {
            latex: '\\frac{1}{3}\\left(\\frac{2}{3}\\right)^{n-1}',
            expr: '(1/3)*(2/3)^(n-1)',
            mistake: 'exponent-arithmetic',
            why: 'The exponent on 2/3 is n, not n − 1, so this form has the wrong power.',
          },
        ],
        correct: 0,
        explanation: '3^{n+1} = 3·3ⁿ, so the term is (1/3)(2/3)ⁿ.',
        result: { latex: '\\frac{2^{n}}{3^{n+1}} = \\frac{1}{3}\\left(\\frac{2}{3}\\right)^{n}' },
        check: { kind: 'identity', lhs: '2^n/3^(n+1)' },
        variable: 'n',
        domain: { n: [1, 5] },
      },
      {
        prompt: 'Identify $a$ (first term, $n = 1$) and $r$.',
        options: [
          { latex: 'a = \\frac{2}{9},\\quad r = \\frac{2}{3}', expr: '[2/9, 2/3]' },
          {
            latex: 'a = \\frac{1}{3},\\quad r = \\frac{2}{3}',
            expr: '[1/3, 2/3]',
            mistake: 'sb-wrong-first-term',
            why: 'Took the coefficient 1/3 as a, but the n = 1 term is (1/3)(2/3) = 2/9.',
          },
          {
            latex: 'a = \\frac{1}{3},\\quad r = \\frac{3}{2}',
            expr: '[1/3, 3/2]',
            mistake: 'sb-wrong-first-term',
            why: 'Took the coefficient as a and also inverted the ratio r.',
          },
          {
            latex: 'a = \\frac{1}{3},\\quad r = \\frac{2}{9}',
            expr: '[1/3, 2/9]',
            mistake: 'sb-wrong-first-term',
            why: 'Took the coefficient as a and mistook the first term 2/9 for the ratio r.',
          },
          {
            latex: 'a = \\frac{2}{3},\\quad r = \\frac{2}{3}',
            expr: '[2/3, 2/3]',
            mistake: 'sb-wrong-first-term',
            why: 'Read the first term as 2/3, ignoring the +1 in the exponent 3^{n+1}; the n = 1 term is 2/9.',
          },
        ],
        correct: 0,
        explanation: 'a = (1/3)(2/3) = 2/9 and r = 2/3.',
        result: { latex: 'a = \\frac{2}{9},\\quad r = \\frac{2}{3}' },
        check: { kind: 'value', expected: '[2/9, 2/3]' },
      },
      {
        prompt: '$|r| < 1$: compute the sum.',
        options: [
          { latex: '\\frac{2}{3}', expr: '2/3' },
          {
            latex: '1',
            expr: '1',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1/3 (the coefficient) in a/(1 − r) instead of the first term 2/9.',
          },
          {
            latex: '\\frac{1}{3}',
            expr: '1/3',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1/3 as the first term and forgot to divide by 1 − r.',
          },
          {
            latex: '\\frac{1}{5}',
            expr: '1/5',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1/3 as the first term and put 1 + r in the denominator.',
          },
          {
            latex: '\\frac{2}{9}',
            expr: '2/9',
            mistake: 'sb-partial-sum-formula',
            why: 'Reported the first term as the sum, without dividing by 1 − r.',
          },
        ],
        correct: 0,
        explanation: '(2/9)/(1/3) = 2/3.',
        result: { latex: 'S = \\frac{2/9}{1 - 2/3} = \\frac{2}{3}' },
        check: { kind: 'series', term: '(1/3)*(2/3)^n', converges: true, sum: '2/3' },
      },
    ],
    final: {
      latex: '\\frac{2}{3}',
      expr: '2/3',
      check: { kind: 'series', term: '(1/3)*(2/3)^n', converges: true, sum: '2/3' },
      recap: 'Rewrite as (1/3)(2/3)ⁿ → a = 2/9, r = 2/3 → (2/9)/(1/3) = 2/3.',
    },
  },

  // ───────────────────────── sb-s-04: Σ n/(n+1) ─────────────────────────
  {
    id: 'sb-s-04',
    topic: 'series-basics',
    title: 'Divergence test',
    difficulty: 1,
    statement: { text: 'Does the series converge?', latex: '\\sum_{n=1}^{\\infty} \\frac{n}{n+1}' },
    steps: [
      {
        prompt: 'Which test comes first?',
        options: [
          { text: 'The divergence test: compute $\\lim a_n$' },
          {
            text: 'Find $S_n$ in closed form',
            mistake: 'st-divergence-test-skipped',
            why: 'There is no closed form for Sₙ here; taking the limit of the terms is much faster.',
          },
          {
            text: 'Find $S_n$ in closed form, then take $\\lim S_n$',
            mistake: 'st-divergence-test-skipped',
            why: 'There is no closed form for Sₙ here, so this plan cannot even start.',
          },
          {
            text: 'Find $S_n$ by partial fractions',
            mistake: 'st-divergence-test-skipped',
            why: 'n/(n+1) is not a telescoping difference, so partial fractions do not produce a closed form.',
          },
          {
            text: 'Check whether it is geometric',
            mistake: 'st-divergence-test-skipped',
            why: 'The ratio aₙ₊₁/aₙ is not constant, so the series is not geometric.',
          },
        ],
        correct: 0,
        explanation: 'The divergence test is always the first check.',
        result: { text: 'Divergence test first' },
        check: { kind: 'none', reason: 'flowchart' },
      },
      {
        prompt: '$\\lim_{n\\to\\infty} \\dfrac{n}{n+1} = ?$',
        options: [
          { latex: '1', expr: '1' },
          {
            latex: '0',
            expr: '0',
            mistake: 'sq-dominant-term',
            why: 'The degrees of numerator and denominator are equal, so the limit is not 0.',
          },
          {
            latex: '-1',
            expr: '-1',
            mistake: 'sq-dominant-term',
            why: 'The degrees are equal, so the limit is the ratio of leading coefficients, and a sign slip made it negative.',
          },
          {
            latex: '2',
            expr: '2',
            mistake: 'sq-dominant-term',
            why: 'The degrees are equal, so the limit is the ratio of leading coefficients, and an arithmetic slip gave 2.',
          },
          {
            latex: '\\frac{1}{2}',
            expr: '1/2',
            mistake: 'sq-term-vs-limit',
            why: 'Reported the first term (n = 1 gives 1/2) instead of the limit as n grows.',
          },
        ],
        correct: 0,
        explanation: 'Equal degrees, ratio of leading coefficients 1.',
        result: { latex: '\\lim a_n = 1' },
        check: { kind: 'value', expected: '1' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: '$\\lim a_n = 1 \\ne 0$: the series diverges' },
          {
            text: '$\\lim a_n = 1$ is finite: the series converges',
            mistake: 'st-wrong-inference',
            why: 'A finite nonzero limit of the terms means the series diverges, not converges.',
          },
          {
            text: '$\\lim a_n = 1$ is finite: the series converges to $1$',
            mistake: 'sb-sum-is-term-limit',
            why: 'The limit of the terms is neither the sum nor a sign of convergence.',
          },
          {
            text: '$\\lim a_n = 1$ is finite: the test is inconclusive',
            mistake: 'sb-divergence-test-converse',
            why: 'The divergence test is inconclusive only when the limit is 0; a limit of 1 proves divergence.',
          },
          {
            text: '$S_n = \\dfrac{n}{n+1} \\to 1$: converges to $1$',
            mistake: 'sb-sequence-vs-series',
            why: 'n/(n+1) is the term aₙ, not the partial sum Sₙ.',
          },
        ],
        correct: 0,
        explanation: 'Terms not tending to 0 ⇒ divergence.',
        result: { text: 'Diverges' },
        check: { kind: 'series', term: 'n/(n+1)', converges: false },
      },
    ],
    final: {
      latex: '\\text{diverges}',
      check: { kind: 'series', term: 'n/(n+1)', converges: false },
      recap: 'Divergence test first → aₙ → 1 ≠ 0 → diverges.',
    },
  },

  // ───────────────────────── sb-s-05: Σ 1/(n(n+1)) ─────────────────────────
  {
    id: 'sb-s-05',
    topic: 'series-basics',
    title: 'Telescoping',
    difficulty: 2,
    statement: { text: 'Find the sum, if it exists.', latex: '\\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)}' },
    steps: [
      {
        prompt: 'Decompose the term.',
        options: [
          { latex: '\\frac{1}{n} - \\frac{1}{n+1}', expr: '1/n - 1/(n+1)' },
          {
            latex: '\\frac{1}{n} + \\frac{1}{n+1}',
            expr: '1/n + 1/(n+1)',
            mistake: 'pf-coefficient-wrong',
            why: 'Got the wrong sign on the second coefficient: B = −1, not +1.',
          },
          {
            latex: '\\frac{1}{n} + \\frac{1}{n+2}',
            expr: '1/n + 1/(n+2)',
            mistake: 'pf-coefficient-wrong',
            why: 'Got the wrong sign on the second coefficient and also the wrong second factor.',
          },
          {
            latex: '\\frac{1}{2n} + \\frac{1}{2(n+1)}',
            expr: '1/(2*n) + 1/(2*(n+1))',
            mistake: 'pf-coefficient-wrong',
            why: 'Got the wrong sign on the second coefficient and added a spurious factor 1/2.',
          },
          {
            latex: '\\frac{1}{n+1} - \\frac{1}{n}',
            expr: '1/(n+1) - 1/n',
            mistake: 'sign-error',
            why: 'Flipped both coefficients, so the whole decomposition has the opposite sign.',
          },
        ],
        correct: 0,
        explanation: 'A/n + B/(n+1): n = 0 gives A = 1, n = −1 gives B = −1.',
        result: { latex: '\\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}' },
        check: { kind: 'identity', lhs: '1/(n*(n+1))' },
        variable: 'n',
      },
      {
        prompt: 'Write the partial sum $S_n$.',
        options: [
          { latex: '1 - \\frac{1}{n+1}', expr: '1 - 1/(n+1)' },
          {
            latex: '1 - \\frac{1}{n}',
            expr: '1 - 1/n',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Kept bₙ instead of bₙ₊₁ as the surviving last term.',
          },
          {
            latex: '1 + \\frac{1}{n}',
            expr: '1 + 1/n',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Kept bₙ instead of bₙ₊₁ and added it instead of subtracting.',
          },
          {
            latex: '2 - \\frac{1}{n}',
            expr: '2 - 1/n',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Kept bₙ instead of bₙ₊₁ and counted b₁ twice.',
          },
          {
            latex: '\\frac{1}{n+1}',
            expr: '1/(n+1)',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Kept only the last surviving term and lost the first term b₁ = 1.',
          },
        ],
        correct: 0,
        explanation: 'Σ(1/k − 1/(k+1)) collapses to b₁ − bₙ₊₁ = 1 − 1/(n+1).',
        result: { latex: 'S_n = 1 - \\frac{1}{n+1}' },
        check: { kind: 'identity', lhs: 'n/(n+1)' },
        variable: 'n',
        domain: { n: [1, 8] },
      },
      {
        prompt: 'Take $\\lim S_n$ and conclude.',
        options: [
          { text: '$S_n \\to 1$: converges to $1$' },
          {
            text: '$S_n \\to 0$: converges to $0$',
            mistake: 'sb-sum-is-term-limit',
            why: 'Since 1/(n+1) → 0, Sₙ = 1 − 1/(n+1) tends to 1, not 0; the 0 is the limit of the terms.',
          },
          {
            text: '$S_n \\to 0$: converges to $0$ because the terms tend to $0$',
            mistake: 'sb-sum-is-term-limit',
            why: 'The terms tending to 0 says nothing about the value of the sum.',
          },
          {
            text: '$S_n \\to 0$: the series diverges',
            mistake: 'sb-sum-is-term-limit',
            why: 'Sₙ actually tends to 1, and a finite limit of Sₙ would mean convergence anyway.',
          },
          {
            text: '$S_n \\to \\tfrac{1}{2}$: converges to $\\tfrac{1}{2}$',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'The value 1/2 is S₁, the first partial sum, not the limit of Sₙ.',
          },
        ],
        correct: 0,
        explanation: 'Sum = lim Sₙ = 1.',
        result: { latex: 'S = 1' },
        check: { kind: 'series', term: '1/(n*(n+1))', converges: true, sum: '1' },
      },
    ],
    final: {
      latex: '1',
      expr: '1',
      check: { kind: 'series', term: '1/(n*(n+1))', converges: true, sum: '1' },
      recap: 'Partial fractions → telescoping Sₙ = 1 − 1/(n+1) → sum 1.',
    },
  },

  // ───────────────────────── sb-s-06: Σ_{n=2} 1/(n²−1) ─────────────────────────
  {
    id: 'sb-s-06',
    topic: 'series-basics',
    title: 'Telescoping with a factor',
    difficulty: 2,
    statement: { text: 'Find the sum, if it exists.', latex: '\\sum_{n=2}^{\\infty} \\frac{1}{n^{2}-1}' },
    steps: [
      {
        prompt: 'Decompose the term.',
        options: [
          { latex: '\\frac{1}{2}\\left(\\frac{1}{n-1} - \\frac{1}{n+1}\\right)', expr: '1/2*(1/(n-1) - 1/(n+1))' },
          {
            latex: '\\frac{1}{n-1} - \\frac{1}{n+1}',
            expr: '1/(n-1) - 1/(n+1)',
            mistake: 'pf-coefficient-wrong',
            why: 'Dropped the factor 1/2; the coefficients are A = 1/2 and B = −1/2.',
          },
          {
            latex: '\\frac{1}{n-1} + \\frac{1}{n+1}',
            expr: '1/(n-1) + 1/(n+1)',
            mistake: 'pf-coefficient-wrong',
            why: 'Dropped the factor 1/2 and also the minus sign on the second coefficient.',
          },
          {
            latex: '\\frac{1}{n-1} - \\frac{1}{n}',
            expr: '1/(n-1) - 1/n',
            mistake: 'pf-coefficient-wrong',
            why: 'Dropped the factor 1/2 and used the wrong second factor n instead of n + 1.',
          },
          {
            latex: '\\frac{1}{2}\\left(\\frac{1}{n+1} - \\frac{1}{n-1}\\right)',
            expr: '1/2*(1/(n+1) - 1/(n-1))',
            mistake: 'sign-error',
            why: 'Flipped both coefficients, so the whole decomposition has the opposite sign.',
          },
        ],
        correct: 0,
        explanation: '1/((n−1)(n+1)): A = 1/2 at n = 1, B = −1/2 at n = −1.',
        result: { latex: '\\frac{1}{n^{2}-1} = \\frac{1}{2}\\left(\\frac{1}{n-1} - \\frac{1}{n+1}\\right)' },
        check: { kind: 'identity', lhs: '1/(n^2-1)' },
        variable: 'n',
        domain: { n: [2, 8] },
      },
      {
        prompt: 'Which terms survive in $S_n$ (from $n = 2$)?',
        options: [
          { latex: '\\frac{1}{2}\\left(1 + \\frac{1}{2} - \\frac{1}{n} - \\frac{1}{n+1}\\right)' },
          {
            latex: '\\frac{1}{2}\\left(1 - \\frac{1}{n+1}\\right)',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'With a gap of 2 between the indices, two terms survive at each end, not one.',
          },
          {
            latex: '1 - \\frac{1}{n+1}',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Only one term was kept at each end instead of two, and the factor 1/2 was dropped.',
          },
          {
            latex: '\\frac{1}{2}\\left(1 - \\frac{1}{n}\\right)',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Only one term was kept at each end instead of two, and the wrong tail term was kept.',
          },
          {
            latex: '\\frac{1}{2}\\left(1 + \\frac{1}{2}\\right)',
            mistake: 'sq-term-vs-limit',
            why: 'That value is the limit of the partial sums, not the partial sum Sₙ itself.',
          },
        ],
        correct: 0,
        explanation: '1/(n−1) − 1/(n+1) skips one index, so the first two and the last two terms survive.',
        result: { latex: 'S_n = \\frac{1}{2}\\left(\\frac{3}{2} - \\frac{1}{n} - \\frac{1}{n+1}\\right)' },
        check: { kind: 'none', reason: 'surviving terms' },
      },
      {
        prompt: 'Take the limit.',
        options: [
          { latex: '\\frac{3}{4}', expr: '3/4' },
          {
            latex: '\\frac{3}{2}',
            expr: '3/2',
            mistake: 'pf-coefficient-wrong',
            why: 'Dropped the factor 1/2 from the decomposition, which doubles the sum.',
          },
          {
            latex: '3',
            expr: '3',
            mistake: 'pf-coefficient-wrong',
            why: 'Dropped the factor 1/2 and then doubled the result again.',
          },
          {
            latex: '1',
            expr: '1',
            mistake: 'pf-coefficient-wrong',
            why: 'Dropped the factor 1/2 and kept only the first surviving term b₂ = 1.',
          },
          {
            latex: '\\frac{1}{2}',
            expr: '1/2',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Kept only the first surviving term (times 1/2) and lost the second one.',
          },
        ],
        correct: 0,
        explanation: '(1/2)(3/2) = 3/4.',
        result: { latex: 'S = \\frac{3}{4}' },
        check: { kind: 'series', term: '1/(n^2-1)', from: '2', converges: true, sum: '3/4' },
      },
    ],
    final: {
      latex: '\\frac{3}{4}',
      expr: '3/4',
      check: { kind: 'series', term: '1/(n^2-1)', from: '2', converges: true, sum: '3/4' },
      recap: 'Decompose with the factor 1/2 → two surviving terms at each end → (1/2)(1 + 1/2) = 3/4.',
    },
  },

  // ───────────────────────── sb-s-07: Σ ln(n/(n+1)) ─────────────────────────
  {
    id: 'sb-s-07',
    topic: 'series-basics',
    title: 'Telescoping that diverges',
    difficulty: 2,
    statement: { text: 'Does the series converge?', latex: '\\sum_{n=1}^{\\infty} \\ln\\!\\left(\\frac{n}{n+1}\\right)' },
    steps: [
      {
        prompt: 'Rewrite the term.',
        options: [
          { latex: '\\ln n - \\ln(n+1)', expr: 'log(n) - log(n+1)' },
          {
            latex: '\\ln(n+1) - \\ln n',
            expr: 'log(n+1) - log(n)',
            mistake: 'sign-error',
            why: 'Reversed the difference: ln(a/b) = ln a − ln b with a = n, not ln b − ln a.',
          },
          {
            latex: '\\ln(n+1) + \\ln n',
            expr: 'log(n+1) + log(n)',
            mistake: 'sign-error',
            why: 'ln of a quotient is a difference, not a sum, and the order was reversed too.',
          },
          {
            latex: '\\ln(n+1) - \\ln n - 1',
            expr: 'log(n+1) - log(n) - 1',
            mistake: 'sign-error',
            why: 'Reversed the difference and also subtracted a spurious 1.',
          },
          {
            latex: '\\dfrac{\\ln n}{\\ln(n+1)}',
            expr: 'log(n)/log(n+1)',
            mistake: 'algebra-error',
            why: 'The log of a quotient is not a quotient of logs.',
          },
        ],
        correct: 0,
        explanation: 'ln(n/(n+1)) = ln n − ln(n+1), a telescoping difference bₙ − bₙ₊₁ with bₙ = ln n.',
        result: { latex: 'a_n = \\ln n - \\ln(n+1)' },
        check: { kind: 'identity', lhs: 'log(n/(n+1))' },
        variable: 'n',
      },
      {
        prompt: 'Write $S_n$.',
        options: [
          { latex: '-\\ln(n+1)', expr: '-log(n+1)' },
          {
            latex: '\\ln(n+1)',
            expr: 'log(n+1)',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Lost the sign: b₁ − bₙ₊₁ = 0 − ln(n+1) = −ln(n+1).',
          },
          {
            latex: '\\ln n',
            expr: 'log(n)',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Got the wrong sign and kept bₙ instead of bₙ₊₁.',
          },
          {
            latex: '1 + \\ln(n+1)',
            expr: '1 + log(n+1)',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Got the wrong sign and used b₁ = 1 instead of b₁ = ln 1 = 0.',
          },
          {
            latex: '0',
            expr: '0',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'Kept only b₁ = ln 1 = 0 and lost the surviving last term −bₙ₊₁.',
          },
        ],
        correct: 0,
        explanation: 'Sₙ = b₁ − bₙ₊₁ = ln 1 − ln(n+1).',
        result: { latex: 'S_n = -\\ln(n+1)' },
        check: { kind: 'identity', lhs: '-log(n+1)' },
        variable: 'n',
        domain: { n: [1, 8] },
      },
      {
        prompt: 'Conclude.',
        options: [
          { text: '$S_n = -\\ln(n+1) \\to -\\infty$: diverges' },
          {
            text: '$S_n \\to 0$: converges to $0$',
            mistake: 'im-limit-evaluated-wrong',
            why: 'ln(n+1) → ∞, so Sₙ does not tend to 0.',
          },
          {
            text: '$S_n \\to 0$: converges to $0$, since the terms $\\to 0$',
            mistake: 'sb-divergence-test-converse',
            why: 'Terms tending to 0 is not enough for convergence, and Sₙ is actually unbounded.',
          },
          {
            text: '$S_n \\to 0$: converges to $\\ln 1 = 0$',
            mistake: 'sb-telescoping-sum-wrong',
            why: 'The sum b₁ − lim bₙ needs lim bₙ to be finite, and bₙ = ln n → ∞.',
          },
          {
            text: 'Converges to $-\\infty$',
            mistake: 'im-divergent-called-convergent',
            why: 'An infinite limit of Sₙ means the series diverges, not that it converges.',
          },
        ],
        correct: 0,
        explanation: 'The partial sums are unbounded, so the series diverges even though the terms → 0.',
        result: { text: 'Diverges' },
        check: { kind: 'series', term: 'log(n/(n+1))', converges: false },
      },
    ],
    final: {
      latex: '\\text{diverges}',
      check: { kind: 'series', term: 'log(n/(n+1))', converges: false },
      recap: 'ln(n/(n+1)) = ln n − ln(n+1) telescopes → Sₙ = −ln(n+1) → unbounded → diverges.',
    },
  },

  // ───────────────────────── sb-s-08: Σ (3/2)^n ─────────────────────────
  {
    id: 'sb-s-08',
    topic: 'series-basics',
    title: 'Geometric with |r| ≥ 1',
    difficulty: 1,
    statement: { text: 'Does the series converge?', latex: '\\sum_{n=1}^{\\infty} \\left(\\frac{3}{2}\\right)^{n}' },
    steps: [
      {
        prompt: 'Identify $a$ and $r$.',
        options: [
          { latex: 'a = \\frac{3}{2},\\quad r = \\frac{3}{2}', expr: '[3/2, 3/2]' },
          {
            latex: 'a = 1,\\quad r = \\frac{3}{2}',
            expr: '[1, 3/2]',
            mistake: 'sb-wrong-first-term',
            why: 'The first term is the n = 1 term (3/2)¹ = 3/2, not 1.',
          },
          {
            latex: 'a = 1,\\quad r = \\frac{2}{3}',
            expr: '[1, 2/3]',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1 instead of 3/2 and also inverted the ratio r.',
          },
          {
            latex: 'a = 1,\\quad r = \\frac{9}{4}',
            expr: '[1, 9/4]',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1 instead of 3/2 and also squared the ratio r.',
          },
          {
            latex: 'a = \\frac{3}{2},\\quad r = \\frac{2}{3}',
            expr: '[3/2, 2/3]',
            mistake: 'sb-wrong-ratio',
            why: 'Inverted the ratio: the terms are multiplied by 3/2 each step, not 2/3.',
          },
        ],
        correct: 0,
        explanation: 'First term (3/2)¹, ratio 3/2.',
        result: { latex: 'a = r = \\frac{3}{2}' },
        check: { kind: 'value', expected: '[3/2, 3/2]' },
      },
      {
        prompt: 'What does the divergence test say?',
        options: [
          { text: '$(3/2)^{n} \\to \\infty \\ne 0$: the series diverges' },
          {
            text: '$(3/2)^{n} \\to 0$: inconclusive',
            mistake: 'sq-rn-boundary',
            why: 'Took rⁿ → 0 although r = 3/2 > 1.',
          },
          {
            text: '$(3/2)^{n} \\to 0$: the series converges',
            mistake: 'sb-divergence-test-converse',
            why: 'Wrong limit, and terms → 0 would not prove convergence anyway.',
          },
          {
            text: '$(3/2)^{n} \\to 0$: the series converges to $0$',
            mistake: 'sb-sum-is-term-limit',
            why: 'Wrong limit, and the limit of the terms is never the sum.',
          },
          {
            text: '$(3/2)^{n} \\to \\tfrac{3}{2}$: the series diverges',
            mistake: 'sq-term-vs-limit',
            why: 'Right verdict, but 3/2 is the first term, not the limit.',
          },
        ],
        correct: 0,
        explanation: 'For $r > 1$, $r^{n}$ grows without bound, so the terms do not tend to $0$.',
        result: { text: 'Terms $\\to \\infty$: diverges' },
        check: { kind: 'limit', term: '(3/2)^n', limit: 'infinity' },
      },
      {
        prompt: 'Does it converge?',
        options: [
          { text: 'No: $|r| = \\frac{3}{2} \\ge 1$, so the geometric series diverges' },
          {
            text: 'Yes: $r = \\frac{3}{2} > 0$',
            mistake: 'sb-r-boundary',
            why: 'The condition for convergence is |r| < 1, not r > 0.',
          },
          {
            text: 'Yes: $r = \\frac{3}{2} > 0$, with sum $\\dfrac{3/2}{1 - 3/2} = -3$',
            mistake: 'sb-r-boundary',
            why: 'The formula a/(1 − r) applies only when |r| < 1; here it gives a meaningless negative value.',
          },
          {
            text: 'Yes: $r = \\frac{3}{2} > 0$, with sum $\\dfrac{3/2}{3/2 - 1} = 3$',
            mistake: 'sb-r-boundary',
            why: 'The sum formula does not apply when |r| ≥ 1, whatever the sign of the denominator.',
          },
          {
            text: 'Inconclusive: apply the divergence test',
            mistake: 'sb-divergence-test-converse',
            why: 'The geometric rule already decides the question, and the terms actually tend to ∞.',
          },
        ],
        correct: 0,
        explanation: '|r| ≥ 1 ⇒ divergent.',
        result: { text: 'Diverges' },
        check: { kind: 'series', term: '(3/2)^n', converges: false },
      },
    ],
    final: {
      latex: '\\text{diverges}',
      check: { kind: 'series', term: '(3/2)^n', converges: false },
      recap: 'r = 3/2, |r| ≥ 1 → diverges.',
    },
  },

  // ───────────────────────── sb-s-09: Σ (1/2^n + 1/n) ─────────────────────────
  {
    id: 'sb-s-09',
    topic: 'series-basics',
    title: 'Properties: convergent + divergent',
    difficulty: 2,
    statement: { text: 'Does the series converge?', latex: '\\sum_{n=1}^{\\infty} \\left(\\frac{1}{2^{n}} + \\frac{1}{n}\\right)' },
    steps: [
      {
        prompt: 'What is $\\sum_{n=1}^{\\infty} \\dfrac{1}{2^{n}}$?',
        options: [
          { text: 'Converges to $1$ (geometric, $a = r = \\tfrac{1}{2}$)' },
          {
            text: 'Converges to $2$ (geometric, $a = 1$, $r = \\tfrac{1}{2}$)',
            mistake: 'sb-wrong-first-term',
            why: 'Used a = 1, but the n = 1 term is 1/2.',
          },
          {
            text: 'Converges to $\\tfrac{1}{2}$, its first term',
            mistake: 'sb-partial-sum-formula',
            why: 'Reported the first term as the sum',
          },
          {
            text: 'Converges to $\\tfrac{1}{3}$: $\\dfrac{1/2}{1 + 1/2}$',
            mistake: 'sb-wrong-ratio',
            why: 'Used 1 + r instead of 1 − r in the denominator',
          },
          {
            text: 'Diverges: $\\tfrac{1}{2^{n}} \\to 0$',
            mistake: 'sb-divergence-test-converse',
            why: 'Terms tending to 0 does not mean divergence (and does not prove convergence either).',
          },
        ],
        correct: 0,
        explanation: 'a/(1 − r) = (1/2)/(1/2) = 1.',
        result: { latex: '\\sum \\frac{1}{2^{n}} = 1' },
        check: { kind: 'series', term: '1/2^n', converges: true, sum: '1' },
      },
      {
        prompt: 'What about $\\sum_{n=1}^{\\infty} \\dfrac{1}{n}$?',
        options: [
          { text: 'Diverges (the harmonic series)' },
          {
            text: 'Converges, since $\\tfrac{1}{n} \\to 0$',
            mistake: 'sb-divergence-test-converse',
            why: 'Terms tending to 0 never proves convergence.',
          },
          {
            text: 'Converges to $0$, since $\\tfrac{1}{n} \\to 0$',
            mistake: 'sb-sum-is-term-limit',
            why: 'The limit of the terms is not the sum of the series.',
          },
          {
            text: 'Converges to $1$, since $\\tfrac{1}{n} \\to 0$ and $a = 1$',
            mistake: 'sb-wrong-ratio',
            why: 'Treated 1/n as geometric, but the ratio aₙ₊₁/aₙ is not constant.',
          },
          {
            text: 'Inconclusive',
            mistake: 'sb-no-information',
            why: 'The harmonic series is known to diverge, so the question is settled.',
          },
        ],
        correct: 0,
        explanation: 'Σ1/n is the harmonic series, which diverges.',
        result: { text: '$\\sum 1/n$ diverges' },
        check: { kind: 'series', term: '1/n', converges: false },
      },
      {
        prompt: 'Conclude about $\\sum \\left(\\dfrac{1}{2^{n}} + \\dfrac{1}{n}\\right)$.',
        options: [
          { text: 'Diverges: convergent + divergent is divergent (if the sum converged, so would $\\sum \\tfrac{1}{n}$)' },
          {
            text: 'Insufficient information: the sum rule needs both series convergent',
            mistake: 'sb-no-information',
            why: 'The difference rule settles it: convergent + divergent is always divergent.',
          },
          {
            text: 'Insufficient information, so test it with the divergence test',
            mistake: 'sb-no-information',
            why: 'The difference rule settles it, and the divergence test is inconclusive here because the terms tend to 0.',
          },
          {
            text: 'Insufficient information: it depends on which piece dominates',
            mistake: 'sb-no-information',
            why: 'The difference rule settles it; there is no "domination" rule for sums of series.',
          },
          {
            text: 'Converges to $1 + \\sum \\tfrac{1}{n}$',
            mistake: 'sb-split-divergent',
            why: 'One piece is divergent, so splitting into a sum of two series is meaningless.',
          },
        ],
        correct: 0,
        explanation: 'Σbₙ = Σ(aₙ + bₙ) − Σaₙ would converge if the total did.',
        result: { text: 'Diverges' },
        check: { kind: 'series', term: '1/2^n + 1/n', converges: false },
      },
    ],
    final: {
      latex: '\\text{diverges}',
      check: { kind: 'series', term: '1/2^n + 1/n', converges: false },
      recap: 'Σ1/2ⁿ = 1 converges, Σ1/n diverges → their sum diverges by the difference rule.',
    },
  },
];
