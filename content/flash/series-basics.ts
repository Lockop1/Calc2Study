import type { FlashGenerator, FlashItem } from '../types';

/** Flash Drill items for topic "series-basics" (session 3, Phase B). */
export const flash: FlashItem[] = [
  // ───────────────────────── definition and partial sums ─────────────────────────
  {
    id: 'sb-f-001',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { text: '"$\\sum a_n$ converges" means:' },
    options: [
      { text: 'The partial sums $S_n = a_1 + \\cdots + a_n$ approach a finite limit' },
      {
        text: '$a_n \\to 0$',
        mistake: 'sb-divergence-test-converse',
        why: 'Terms tending to 0 is necessary for convergence but not sufficient, so it cannot be the definition.',
      },
      {
        text: '$a_n \\to L$ for some finite $L$',
        mistake: 'sb-sequence-vs-series',
        why: 'This confuses convergence of the sequence of terms with convergence of the series (the sequence of partial sums).',
      },
      {
        text: '$S_n$ is bounded',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Bounded partial sums need not converge, for example partial sums that oscillate between 0 and 1.',
      },
      {
        text: '$a_n$ decreases to $0$',
        mistake: 'sb-divergence-test-converse',
        why: 'The harmonic series has terms that decrease to 0 and yet it diverges, so this is not enough.',
      },
    ],
    correct: 0,
    explanation: 'By definition the sum is $\\lim S_n$, so the series converges exactly when $\\{S_n\\}$ converges.',
    check: { kind: 'none', reason: 'definition of series convergence; verified by math-verifier' },
  },
  {
    id: 'sb-f-002',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { text: 'The partial sums of a series are $S_n = \\dfrac{n}{n+1}$. What is the sum of the series?' },
    options: [
      { latex: '1', expr: '1' },
      {
        latex: '0',
        expr: '0',
        mistake: 'sb-sum-is-term-limit',
        why: 'Took the limit of the terms (which tend to 0) instead of the limit of the partial sums.',
      },
      {
        latex: '\\frac{1}{2}',
        expr: '1/2',
        mistake: 'sq-term-vs-limit',
        why: 'Reported S₁ = 1/2, the first partial sum, instead of lim Sₙ.',
      },
      {
        latex: '\\frac{2}{3}',
        expr: '2/3',
        mistake: 'sq-term-vs-limit',
        why: 'Reported S₂ = 2/3, an early partial sum, instead of lim Sₙ.',
      },
      {
        latex: '-1',
        expr: '-1',
        mistake: 'sign-error',
        why: 'Made a sign slip when taking the limit of the partial sums.',
      },
    ],
    correct: 0,
    explanation: 'The sum is $\\lim S_n = \\lim \\frac{n}{n+1} = 1$.',
    check: { kind: 'limit', term: 'n/(n+1)', limit: '1' },
  },
  {
    id: 'sb-f-003',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { text: '$S_n = 3 - \\dfrac{2}{n}$. For $n \\ge 2$, $a_n = ?$' },
    options: [
      { latex: '\\frac{2}{n(n-1)}', expr: '2/(n*(n-1))' },
      {
        latex: '3 - \\frac{2}{n}',
        expr: '3 - 2/n',
        mistake: 'sb-sequence-vs-series',
        why: 'Took aₙ = Sₙ, treating the partial sum as if it were the n-th term.',
      },
      {
        latex: '\\frac{2}{n}',
        expr: '2/n',
        mistake: 'algebra-error',
        why: 'Dropped the Sₙ₋₁ part of the difference Sₙ − Sₙ₋₁ and kept only the variable piece −2/n of Sₙ, losing its sign.',
      },
      {
        latex: '\\frac{2}{n^{2}}',
        expr: '2/n^2',
        mistake: 'algebra-error',
        why: 'Differentiated −2/n with respect to n instead of subtracting consecutive partial sums.',
      },
      {
        latex: '\\frac{2}{n(n+1)}',
        expr: '2/(n*(n+1))',
        mistake: 'arithmetic-error',
        why: 'Shifted the index the wrong way, using Sₙ₊₁ − Sₙ instead of Sₙ − Sₙ₋₁.',
      },
    ],
    correct: 0,
    explanation: 'aₙ = Sₙ − Sₙ₋₁ = −2/n + 2/(n − 1) = 2/(n(n − 1)).',
    variable: 'n',
    domain: { n: [2, 8] },
    check: { kind: 'identity', lhs: '(3 - 2/n) - (3 - 2/(n-1))' },
  },
  {
    id: 'sb-f-004',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { text: '$S_n = 2^{n} - 1$. Then $a_5 = ?$' },
    options: [
      { latex: '16', expr: '16' },
      {
        latex: '31',
        expr: '31',
        mistake: 'sb-sequence-vs-series',
        why: 'Reported S₅ = 31, the fifth partial sum, instead of the fifth term.',
      },
      {
        latex: '32',
        expr: '32',
        mistake: 'arithmetic-error',
        why: 'Computed 2⁵ without subtracting S₄ from S₅.',
      },
      {
        latex: '15',
        expr: '15',
        mistake: 'arithmetic-error',
        why: 'Reported S₄ = 15, the previous partial sum, instead of S₅ − S₄.',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'algebra-error',
        why: 'Subtracted the exponents, 2⁵ − 2⁴ = 2^{5−4} = 2, instead of subtracting the values.',
      },
    ],
    correct: 0,
    explanation: 'a₅ = S₅ − S₄ = 31 − 15 = 16.',
    check: { kind: 'value', expected: '16' },
  },

  // ───────────────────────── divergence test ─────────────────────────
  {
    id: 'sb-f-005',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\frac{n}{n+1}' },
    options: [
      { text: 'Diverges: $a_n \\to 1 \\ne 0$ (divergence test)' },
      {
        text: 'Converges to $1$, since $a_n \\to 1$',
        mistake: 'sb-sum-is-term-limit',
        why: 'The limit of the terms is not the sum of the series; and a nonzero limit of the terms forces divergence.',
      },
      {
        text: 'Converges: $a_n$ is bounded',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Bounded terms do not make a series converge; the terms here do not even tend to 0.',
      },
      {
        text: 'Inconclusive: the test only applies when $a_n \\to 0$',
        mistake: 'sb-divergence-test-converse',
        why: 'The divergence test is conclusive exactly when the limit is NOT 0; it is inconclusive when the limit is 0.',
      },
      {
        text: 'Converges: $S_n = \\dfrac{n}{n+1} \\to 1$',
        mistake: 'sb-sequence-vs-series',
        why: 'Confused the term formula with the partial-sum formula; n/(n+1) is the n-th term here, not Sₙ.',
      },
    ],
    correct: 0,
    explanation: 'The terms do not tend to 0, so the series diverges by the divergence test.',
    check: { kind: 'series', term: 'n/(n+1)', converges: false },
  },
  {
    id: 'sb-f-006',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { text: 'For $\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n}$, $a_n \\to 0$. What does the divergence test tell you?' },
    options: [
      { text: 'Nothing: the test is inconclusive when $a_n \\to 0$ (this series in fact diverges)' },
      {
        text: 'The series converges',
        mistake: 'sb-divergence-test-converse',
        why: 'Used the test backwards: terms tending to 0 never proves convergence.',
      },
      {
        text: 'The series converges to $0$',
        mistake: 'sb-sum-is-term-limit',
        why: 'Took the limit of the terms as the sum of the series.',
      },
      {
        text: 'The series diverges, because $a_n \\ne 0$ for every $n$',
        mistake: 'sq-term-vs-limit',
        why: 'The test is about lim aₙ, not about whether individual terms are nonzero.',
      },
      {
        text: 'The series diverges by the divergence test',
        mistake: 'sb-divergence-test-converse',
        why: 'Right verdict but invalid reason: the divergence test cannot show divergence when the terms tend to 0.',
      },
    ],
    correct: 0,
    explanation: 'The divergence test never proves convergence and says nothing when aₙ → 0.',
    check: { kind: 'series', term: '1/n', converges: false },
  },
  {
    id: 'sb-f-007',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} (-1)^{n}' },
    options: [
      { text: 'Diverges: $\\lim (-1)^{n}$ does not exist' },
      {
        text: 'Converges to $0$: the terms cancel in pairs',
        mistake: 'sb-no-information',
        why: 'The partial sums alternate between −1 and 0 and never settle, so pairing terms does not give a sum.',
      },
      {
        text: 'Converges: geometric with $r = -1$',
        mistake: 'sb-r-boundary',
        why: 'A geometric series needs |r| < 1 to converge; r = −1 is on the boundary and diverges.',
      },
      {
        text: 'Converges to $-\\tfrac{1}{2}$: $\\dfrac{a}{1-r}$ with $a = -1,\\ r = -1$',
        mistake: 'sb-r-boundary',
        why: 'Applied the formula a/(1 − r) outside its range of validity |r| < 1.',
      },
      {
        text: 'Converges: $|a_n| = 1$ is bounded',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Bounded terms do not give convergence of a series.',
      },
    ],
    correct: 0,
    explanation: 'The terms have no limit, so the divergence test applies.',
    check: { kind: 'series', term: '(-1)^n', converges: false },
  },
  {
    id: 'sb-f-008',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\cos\\!\\left(\\frac{1}{n}\\right)' },
    options: [
      { text: 'Diverges: $\\cos(1/n) \\to \\cos 0 = 1 \\ne 0$' },
      {
        text: 'Converges to $\\cos 0 = 1$',
        mistake: 'sb-sum-is-term-limit',
        why: 'The limit of the terms is not the sum of the series.',
      },
      {
        text: 'Converges: $\\dfrac{1}{n} \\to 0$',
        mistake: 'sb-sequence-vs-series',
        why: 'Looked at the limit of the argument 1/n instead of the limit of the terms cos(1/n).',
      },
      {
        text: 'Inconclusive: $\\cos$ oscillates',
        mistake: 'sq-connect-the-dots',
        why: 'cos(1/n) does not oscillate; its argument 1/n tends to 0, so the terms settle at 1.',
      },
      {
        text: 'Converges: $\\cos$ is bounded',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Bounded terms do not give convergence of a series.',
      },
    ],
    correct: 0,
    explanation: 'The terms tend to 1, not 0, so the divergence test shows divergence.',
    check: { kind: 'series', term: 'cos(1/n)', converges: false },
  },
  {
    id: 'sb-f-009',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\left(1+\\frac{1}{n}\\right)^{n}' },
    options: [
      { text: 'Diverges: $a_n \\to e \\ne 0$' },
      {
        text: 'Converges to $e$',
        mistake: 'sb-sum-is-term-limit',
        why: 'The limit of the terms is not the sum of the series.',
      },
      {
        text: 'Converges: the terms are bounded by $e$',
        mistake: 'sq-bounded-implies-convergent',
        why: 'Bounded terms do not give convergence of a series.',
      },
      {
        text: 'Inconclusive: $a_n \\to e$ is finite',
        mistake: 'sb-sequence-vs-series',
        why: 'A finite nonzero limit of the terms forces divergence; finiteness of the limit of the terms is not the issue.',
      },
      {
        text: 'Converges to $1$: $1 + \\dfrac{1}{n} \\to 1$',
        mistake: 'sq-substitute-infinity',
        why: 'Plugged n = ∞ into the base only, ignoring the exponent n that also grows.',
      },
    ],
    correct: 0,
    explanation: 'The terms tend to e ≠ 0, so the series diverges by the divergence test.',
    check: { kind: 'series', term: '(1+1/n)^n', converges: false },
  },
  {
    id: 'sb-f-010',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { text: 'Which statement about the divergence test is right?' },
    options: [
      { text: '$\\lim a_n \\ne 0$ (or DNE) $\\Rightarrow \\sum a_n$ diverges; $\\lim a_n = 0$ tells you nothing' },
      {
        text: '$\\lim a_n = 0 \\Rightarrow \\sum a_n$ converges',
        mistake: 'sb-divergence-test-converse',
        why: 'This is the false converse; the harmonic series has aₙ → 0 and diverges.',
      },
      {
        text: '$\\lim a_n = 0 \\Rightarrow \\sum a_n$ diverges',
        mistake: 'sq-theorem-misattributed',
        why: 'Reversed what the test says: a limit of 0 gives no information, it does not force divergence.',
      },
      {
        text: '$\\lim a_n = L \\Rightarrow \\sum a_n = L$',
        mistake: 'sb-sum-is-term-limit',
        why: 'The sum of a series is lim Sₙ, not lim aₙ.',
      },
      {
        text: 'It applies only to geometric series',
        mistake: 'sq-theorem-misattributed',
        why: 'The divergence test applies to every series, not just geometric ones.',
      },
    ],
    correct: 0,
    explanation: 'The test can only prove divergence; it never proves convergence.',
    check: { kind: 'none', reason: 'statement of the divergence test; verified by math-verifier' },
  },

  // ───────────────────────── geometric series ─────────────────────────
  {
    id: 'sb-f-011',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} 3\\left(\\frac{1}{2}\\right)^{n-1} = ?' },
    options: [
      { latex: '6', expr: '6' },
      {
        latex: '\\frac{3}{2}',
        expr: '3/2',
        mistake: 'sb-partial-sum-formula',
        why: 'Computed a(1 − r) = 3 · 1/2 instead of dividing, a/(1 − r).',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 1 and ignored the coefficient 3, getting 1/(1 − 1/2) = 2.',
      },
      {
        latex: '12',
        expr: '12',
        mistake: 'arithmetic-error',
        why: 'Used the n = 0 term 3·(1/2)⁻¹ = 6 as a, giving 6/(1/2) = 12.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'sb-sum-is-term-limit',
        why: 'Took the limit of the terms (which tend to 0) as the sum.',
      },
    ],
    correct: 0,
    explanation: 'Here $a = 3$ and $r = \\tfrac12$, so the sum is $\\frac{a}{1-r} = \\frac{3}{1/2} = 6$.',
    check: { kind: 'series', term: '3*(1/2)^(n-1)', converges: true, sum: '6' },
  },
  {
    id: 'sb-f-012',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=0}^{\\infty} \\left(\\frac{1}{3}\\right)^{n} = ?' },
    options: [
      { latex: '\\frac{3}{2}', expr: '3/2' },
      {
        latex: '\\frac{1}{2}',
        expr: '1/2',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 1/3 although the series starts at n = 0, where the first term is 1.',
      },
      {
        latex: '\\frac{1}{3}',
        expr: '1/3',
        mistake: 'sb-partial-sum-formula',
        why: 'Reported the n = 1 term as the sum instead of summing the whole series.',
      },
      {
        latex: '\\frac{2}{9}',
        expr: '2/9',
        mistake: 'arithmetic-error',
        why: 'Computed a(1 − r) with a = 1/3 instead of a/(1 − r).',
      },
      {
        latex: '3',
        expr: '3',
        mistake: 'arithmetic-error',
        why: 'Inverted r (computing 1/r) instead of computing 1/(1 − r).',
      },
    ],
    correct: 0,
    explanation: 'The first term (n = 0) is 1 and $r = \\tfrac13$, so the sum is $\\frac{1}{1 - 1/3} = \\frac{3}{2}$.',
    check: { kind: 'series', term: '(1/3)^n', from: '0', converges: true, sum: '3/2' },
  },
  {
    id: 'sb-f-013',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\left(\\frac{2}{3}\\right)^{n} = ?' },
    options: [
      { latex: '2', expr: '2' },
      {
        latex: '3',
        expr: '3',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 1 although the series starts at n = 1, where the first term is 2/3.',
      },
      {
        latex: '6',
        expr: '6',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 2 (the numerator of the ratio) as the first term.',
      },
      {
        latex: '\\frac{2}{3}',
        expr: '2/3',
        mistake: 'sb-partial-sum-formula',
        why: 'Reported the first term as the sum instead of dividing it by 1 − r.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'arithmetic-error',
        why: 'Divided the first term by r = 2/3 instead of by 1 − r, getting (2/3)/(2/3) = 1.',
      },
    ],
    correct: 0,
    explanation: 'The first term is $\\tfrac23$ and $r = \\tfrac23$, so the sum is $\\frac{2/3}{1/3} = 2$.',
    check: { kind: 'series', term: '(2/3)^n', converges: true, sum: '2' },
  },
  {
    id: 'sb-f-014',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=2}^{\\infty} 5\\left(\\frac{1}{4}\\right)^{n} = ?' },
    options: [
      { latex: '\\frac{5}{12}', expr: '5/12' },
      {
        latex: '\\frac{20}{3}',
        expr: '20/3',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 5 as the first term, giving 5/(1 − 1/4), although the series starts at n = 2.',
      },
      {
        latex: '\\frac{5}{3}',
        expr: '5/3',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 5/4 (the n = 1 term) although the series starts at n = 2.',
      },
      {
        latex: '\\frac{5}{16}',
        expr: '5/16',
        mistake: 'sb-partial-sum-formula',
        why: 'Reported the first term as the sum instead of dividing it by 1 − r.',
      },
      {
        latex: '\\frac{5}{4}',
        expr: '5/4',
        mistake: 'arithmetic-error',
        why: 'Divided the first term 5/16 by r = 1/4 instead of by 1 − r.',
      },
    ],
    correct: 0,
    explanation: 'The first term (n = 2) is $\\tfrac{5}{16}$ and $r = \\tfrac14$, so the sum is $\\frac{5/16}{3/4} = \\frac{5}{12}$.',
    check: { kind: 'series', term: '5*(1/4)^n', from: '2', converges: true, sum: '5/12' },
  },
  {
    id: 'sb-f-015',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\left(-\\frac{2}{3}\\right)^{n} = ?' },
    options: [
      { latex: '-\\frac{2}{5}', expr: '-2/5' },
      {
        latex: '\\frac{2}{5}',
        expr: '2/5',
        mistake: 'sign-error',
        why: 'Dropped the sign of the first term, which is −2/3.',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'sb-wrong-ratio',
        why: 'Used 1 − r = 1/3 as if r were +2/3, and dropped the sign of the first term.',
      },
      {
        latex: '\\frac{2}{3}',
        expr: '2/3',
        mistake: 'sb-partial-sum-formula',
        why: 'Reported the first term as the sum, without its sign, instead of dividing by 1 − r.',
      },
      {
        latex: '\\frac{3}{5}',
        expr: '3/5',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 1 although the series starts at n = 1, where the first term is −2/3.',
      },
    ],
    correct: 0,
    explanation: 'Here $a = -\\tfrac23$ and $r = -\\tfrac23$, so the sum is $\\frac{-2/3}{1 + 2/3} = -\\frac{2}{5}$.',
    check: { kind: 'series', term: '(-2/3)^n', converges: true, sum: '-2/5' },
  },
  {
    id: 'sb-f-016',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\frac{2^{n}}{3^{n+1}} = ?' },
    options: [
      { latex: '\\frac{2}{3}', expr: '2/3' },
      {
        latex: '\\frac{2}{9}',
        expr: '2/9',
        mistake: 'sb-partial-sum-formula',
        why: 'Reported the first term as the sum instead of dividing it by 1 − r.',
      },
      {
        latex: '\\frac{1}{9}',
        expr: '1/9',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 1/3 as the first term and multiplied by 1 − r instead of dividing by it.',
      },
      {
        latex: '\\frac{4}{9}',
        expr: '4/9',
        mistake: 'arithmetic-error',
        why: 'Doubled the first term instead of dividing it by 1 − r.',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'sb-wrong-first-term',
        why: 'Dropped the 1/3 from 3^{n+1} = 3·3ⁿ, so the series became Σ(2/3)ⁿ, which sums to 2.',
      },
    ],
    correct: 0,
    explanation: 'The term is $\\tfrac13\\left(\\tfrac23\\right)^n$: the first term is $\\tfrac29$ and $r = \\tfrac23$, so the sum is $\\frac{2/9}{1/3} = \\frac23$.',
    check: { kind: 'series', term: '(1/3)*(2/3)^n', converges: true, sum: '2/3' },
  },
  {
    id: 'sb-f-017',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\left(\\frac{3}{2}\\right)^{n}' },
    options: [
      { text: 'Diverges: geometric with $|r| = \\tfrac{3}{2} \\ge 1$' },
      {
        text: 'Converges to $-3$: $\\dfrac{a}{1-r} = \\dfrac{3/2}{-1/2}$',
        mistake: 'sb-r-boundary',
        why: 'Applied the formula a/(1 − r) outside its range of validity |r| < 1.',
      },
      {
        text: 'Converges to $3$',
        mistake: 'sb-r-boundary',
        why: 'Applied the formula a/(1 − r) outside |r| < 1 and then "fixed" the negative sign.',
      },
      {
        text: 'Inconclusive: the divergence test is needed',
        mistake: 'sb-divergence-test-converse',
        why: 'The geometric rule already settles it (and the divergence test agrees: the terms tend to ∞).',
      },
      {
        text: 'Converges to $\\infty$',
        mistake: 'im-divergent-called-convergent',
        why: 'Unbounded partial sums mean divergence; a series does not "converge to ∞".',
      },
    ],
    correct: 0,
    explanation: 'A geometric series with |r| ≥ 1 diverges.',
    check: { kind: 'series', term: '(3/2)^n', converges: false },
  },
  {
    id: 'sb-f-018',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} (-0.9)^{n} = ?' },
    options: [
      { latex: '-\\frac{9}{19}', expr: '-9/19' },
      {
        latex: '\\frac{9}{19}',
        expr: '9/19',
        mistake: 'sign-error',
        why: 'Dropped the sign of the first term, which is −0.9.',
      },
      {
        latex: '\\frac{10}{19}',
        expr: '10/19',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 1 although the series starts at n = 1, where the first term is −0.9.',
      },
      {
        latex: '\\frac{9}{10}',
        expr: '9/10',
        mistake: 'sb-partial-sum-formula',
        why: 'Reported the first term as the sum, without its sign, instead of dividing by 1 − r.',
      },
      {
        latex: '9',
        expr: '9',
        mistake: 'sb-wrong-ratio',
        why: 'Used 1 − r = 0.1 as if r were +0.9, and dropped the sign of the first term.',
      },
    ],
    correct: 0,
    explanation: 'Here $a = -0.9$ and $r = -0.9$, so the sum is $\\frac{-0.9}{1.9} = -\\frac{9}{19}$.',
    check: { kind: 'series', term: '(-9/10)^n', converges: true, sum: '-9/19' },
  },
  {
    id: 'sb-f-019',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '0.999\\ldots = \\displaystyle\\sum_{n=1}^{\\infty} \\frac{9}{10^{n}} = ?' },
    options: [
      { latex: '1', expr: '1' },
      {
        latex: '\\frac{9}{10}',
        expr: '9/10',
        mistake: 'sb-partial-sum-formula',
        why: 'Reported the first term as the sum instead of dividing it by 1 − r.',
      },
      {
        latex: '\\frac{10}{9}',
        expr: '10/9',
        mistake: 'sb-wrong-first-term',
        why: 'Used a = 1 as the first term although the first term is 9/10.',
      },
      {
        latex: '9',
        expr: '9',
        mistake: 'arithmetic-error',
        why: 'Divided the first term by r = 1/10 instead of by 1 − r, getting (9/10)/(1/10) = 9.',
      },
      {
        latex: '\\frac{1}{9}',
        expr: '1/9',
        mistake: 'sb-wrong-first-term',
        why: 'Dropped the 9 and used a = 1/10 as the first term, giving (1/10)/(9/10) = 1/9.',
      },
    ],
    correct: 0,
    explanation: 'Here $a = \\tfrac{9}{10}$ and $r = \\tfrac{1}{10}$, so the sum is $\\frac{9/10}{9/10} = 1$.',
    check: { kind: 'series', term: '9/10^n', converges: true, sum: '1' },
  },
  {
    id: 'sb-f-020',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: 'S_n = \\displaystyle\\sum_{k=1}^{n} 2\\cdot 3^{k-1} = ?' },
    options: [
      { latex: '3^{n} - 1', expr: '3^n - 1' },
      {
        latex: '2\\left(3^{n} - 1\\right)',
        expr: '2*(3^n - 1)',
        mistake: 'sb-partial-sum-formula',
        why: 'Forgot to divide by r − 1 = 2 in a(rⁿ − 1)/(r − 1), which would cancel the factor 2.',
      },
      {
        latex: '2\\left(3^{n} + 1\\right)',
        expr: '2*(3^n + 1)',
        mistake: 'sign-error',
        why: 'Forgot to divide by r − 1 = 2 and flipped the sign of the 1.',
      },
      {
        latex: '2\\left(3^{n-1} - 1\\right)',
        expr: '2*(3^(n-1) - 1)',
        mistake: 'exponent-arithmetic',
        why: 'Forgot to divide by r − 1 = 2 and used rⁿ⁻¹ in the partial-sum formula instead of rⁿ.',
      },
      {
        latex: '-1',
        expr: '-1',
        mistake: 'sb-partial-sum-formula',
        why: 'Used the infinite-series formula a/(1 − r) = 2/(−2) for a finite sum.',
      },
    ],
    correct: 0,
    explanation: 'Sₙ = a(1 − rⁿ)/(1 − r) = 2(1 − 3ⁿ)/(−2) = 3ⁿ − 1.',
    variable: 'n',
    domain: { n: [1, 6] },
    check: { kind: 'identity', lhs: '2*(1 - 3^n)/(1 - 3)' },
  },
  {
    id: 'sb-f-021',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { text: '$\\displaystyle\\sum_{n=1}^{\\infty} a r^{n-1}$ (with $a \\ne 0$) converges exactly when' },
    options: [
      { text: '$|r| < 1$' },
      {
        text: '$|r| \\le 1$',
        mistake: 'sb-r-boundary',
        why: 'Included the boundary: r = 1 and r = −1 both diverge.',
      },
      {
        text: '$r \\le 1$',
        mistake: 'sb-r-boundary',
        why: 'Ignored negative ratios and the boundary: r ≤ −1 gives terms that do not tend to 0, and r = 1 diverges too.',
      },
      {
        text: '$|a| \\le 1$',
        mistake: 'sb-wrong-ratio',
        why: 'Looked at the first term instead of the ratio; the first term does not affect convergence.',
      },
      {
        text: '$-1 < r \\le 1$',
        mistake: 'sb-sequence-vs-series',
        why: 'Used the convergence condition of the sequence {rⁿ} instead of the series',
      },
    ],
    correct: 0,
    explanation: 'The series converges iff $|r| < 1$, and then its sum is $\\frac{a}{1-r}$.',
    check: { kind: 'none', reason: 'statement of the geometric series convergence condition; verified by math-verifier' },
  },
  {
    id: 'sb-f-022',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { text: 'For $\\displaystyle\\sum_{n=1}^{\\infty} 4\\left(-\\frac{1}{3}\\right)^{n-1}$, identify $a$ and $r$.' },
    options: [
      { latex: 'a = 4,\\quad r = -\\frac{1}{3}', expr: '[4, -1/3]' },
      {
        latex: 'a = 4,\\quad r = \\frac{1}{3}',
        expr: '[4, 1/3]',
        mistake: 'sb-wrong-ratio',
        why: 'Dropped the sign of r; the ratio is −1/3.',
      },
      {
        latex: 'a = 1,\\quad r = \\frac{1}{3}',
        expr: '[1, 1/3]',
        mistake: 'sb-wrong-first-term',
        why: 'Ignored the coefficient 4 and dropped the sign of r.',
      },
      {
        latex: 'a = 4,\\quad r = 3',
        expr: '[4, 3]',
        mistake: 'sb-wrong-ratio',
        why: 'Inverted r and dropped its sign; the ratio is −1/3.',
      },
      {
        latex: 'a = -\\frac{4}{3},\\quad r = -\\frac{1}{3}',
        expr: '[-4/3, -1/3]',
        mistake: 'sb-wrong-first-term',
        why: 'Used the n = 2 term as a; the first term (n = 1) is 4.',
      },
    ],
    correct: 0,
    explanation: 'The n = 1 term is 4, and each term is −1/3 times the previous one.',
    check: { kind: 'value', expected: '[4, -1/3]' },
  },

  // ───────────────────────── telescoping series ─────────────────────────
  {
    id: 'sb-f-023',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { text: 'Partial fractions: $\\dfrac{1}{n(n+1)} = ?$' },
    options: [
      { latex: '\\frac{1}{n} - \\frac{1}{n+1}', expr: '1/n - 1/(n+1)' },
      {
        latex: '\\frac{1}{n} + \\frac{1}{n+1}',
        expr: '1/n + 1/(n+1)',
        mistake: 'pf-coefficient-wrong',
        why: 'Got the sign of the second coefficient wrong; plugging n = −1 gives B = −1.',
      },
      {
        latex: '\\frac{1}{n} + \\frac{1}{n+2}',
        expr: '1/n + 1/(n+2)',
        mistake: 'arithmetic-error',
        why: 'Used the wrong second factor n + 2 and the wrong sign.',
      },
      {
        latex: '\\frac{1}{2n} + \\frac{1}{2(n+1)}',
        expr: '1/(2*n) + 1/(2*(n+1))',
        mistake: 'algebra-error',
        why: 'Introduced a spurious factor 1/2 in both coefficients and used the wrong sign.',
      },
      {
        latex: '\\frac{1}{n+1} - \\frac{1}{n}',
        expr: '1/(n+1) - 1/n',
        mistake: 'sign-error',
        why: 'Flipped both coefficients, so the whole expression has the wrong sign.',
      },
    ],
    correct: 0,
    explanation: 'Write $\\frac{A}{n} + \\frac{B}{n+1}$: $n = 0$ gives $A = 1$ and $n = -1$ gives $B = -1$.',
    variable: 'n',
    check: { kind: 'identity', lhs: '1/(n*(n+1))' },
  },
  {
    id: 'sb-f-024',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)} = ?' },
    options: [
      { latex: '1', expr: '1' },
      {
        latex: '\\frac{1}{2}',
        expr: '1/2',
        mistake: 'sb-telescoping-sum-wrong',
        why: 'Kept only b₁ − b₂ = 1 − 1/2 instead of the full telescoped sum b₁ − lim bₙ₊₁.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'sb-sum-is-term-limit',
        why: 'Took the limit of the terms (which tend to 0) as the sum.',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'sb-telescoping-sum-wrong',
        why: 'Counted b₁ twice (Sₙ = 2 − 1/n), so the limit comes out as 2.',
      },
      {
        latex: '\\frac{3}{2}',
        expr: '3/2',
        mistake: 'arithmetic-error',
        why: 'Kept the two leading terms 1 + 1/2, as if the gap were 2.',
      },
    ],
    correct: 0,
    explanation: '$S_n = 1 - \\frac{1}{n+1} \\to 1$.',
    check: { kind: 'series', term: '1/(n*(n+1))', converges: true, sum: '1' },
  },
  {
    id: 'sb-f-025',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { text: 'For $\\displaystyle\\sum_{k=1}^{\\infty} \\frac{1}{k(k+1)}$, the partial sum $S_n = ?$' },
    options: [
      { latex: '1 - \\frac{1}{n+1}', expr: '1 - 1/(n+1)' },
      {
        latex: '1 - \\frac{1}{n}',
        expr: '1 - 1/n',
        mistake: 'sb-telescoping-sum-wrong',
        why: 'Kept bₙ instead of bₙ₊₁ as the last surviving term.',
      },
      {
        latex: '1 + \\frac{1}{n}',
        expr: '1 + 1/n',
        mistake: 'sign-error',
        why: 'Kept bₙ and added it instead of subtracting.',
      },
      {
        latex: '2 - \\frac{1}{n}',
        expr: '2 - 1/n',
        mistake: 'arithmetic-error',
        why: 'Counted b₁ twice and kept bₙ.',
      },
      {
        latex: '\\frac{1}{n+1}',
        expr: '1/(n+1)',
        mistake: 'sb-telescoping-sum-wrong',
        why: 'Kept only the last surviving term (with its minus sign dropped) and forgot the first term b₁ = 1.',
      },
    ],
    correct: 0,
    explanation: '$\\sum_{k=1}^{n}\\left(\\frac1k - \\frac1{k+1}\\right)$ telescopes to $1 - \\frac{1}{n+1}$.',
    variable: 'n',
    domain: { n: [1, 8] },
    check: { kind: 'identity', lhs: 'n/(n+1)' },
  },
  {
    id: 'sb-f-026',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\left(\\frac{1}{n} - \\frac{1}{n+2}\\right) = ?' },
    options: [
      { latex: '\\frac{3}{2}', expr: '3/2' },
      {
        latex: '1',
        expr: '1',
        mistake: 'sb-telescoping-sum-wrong',
        why: 'Assumed only b₁ = 1 survives; with a gap of 2, the terms 1 and 1/2 both survive.',
      },
      {
        latex: '\\frac{1}{2}',
        expr: '1/2',
        mistake: 'sb-telescoping-sum-wrong',
        why: 'Kept only b₁ − b₂ = 1 − 1/2 instead of the two surviving first terms.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'sb-sum-is-term-limit',
        why: 'Took the limit of the terms (which tend to 0) as the sum.',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'arithmetic-error',
        why: 'Made an arithmetic slip in adding the surviving terms 1 + 1/2.',
      },
    ],
    correct: 0,
    explanation: '$S_n = 1 + \\frac12 - \\frac{1}{n+1} - \\frac{1}{n+2} \\to \\frac32$.',
    check: { kind: 'series', term: '1/n - 1/(n+2)', converges: true, sum: '3/2' },
  },
  {
    id: 'sb-f-027',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\ln\\!\\left(\\frac{n}{n+1}\\right)' },
    options: [
      { text: 'Diverges: $S_n = \\ln 1 - \\ln(n+1) = -\\ln(n+1) \\to -\\infty$' },
      {
        text: 'Converges to $\\ln 1 = 0$',
        mistake: 'sb-telescoping-sum-wrong',
        why: 'Forgot that bₙ₊₁ = ln(n+1) does not have a finite limit, so the telescoping sum is not b₁ alone.',
      },
      {
        text: 'Converges to $0$: the terms $\\to 0$',
        mistake: 'sb-divergence-test-converse',
        why: 'Terms tending to 0 is not enough for convergence, and the limit of the terms is not the sum.',
      },
      {
        text: 'Converges: telescoping series always converge',
        mistake: 'sb-no-information',
        why: 'A telescoping series converges only when lim bₙ is finite; there is no rule that it always does.',
      },
      {
        text: 'Converges to $-\\infty$',
        mistake: 'im-divergent-called-convergent',
        why: 'An infinite limit of the partial sums means the series diverges, not that it converges to −∞.',
      },
    ],
    correct: 0,
    explanation: 'ln(n/(n+1)) = ln n − ln(n+1) telescopes to −ln(n+1), which is unbounded.',
    check: { kind: 'series', term: 'log(n/(n+1))', converges: false },
  },
  {
    id: 'sb-f-028',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{(n+1)(n+2)} = ?' },
    options: [
      { latex: '\\frac{1}{2}', expr: '1/2' },
      {
        latex: '1',
        expr: '1',
        mistake: 'sb-telescoping-sum-wrong',
        why: 'Used the sum of Σ 1/(n(n+1)) without accounting for the index shift: the first surviving term is 1/2, not 1.',
      },
      {
        latex: '\\frac{1}{6}',
        expr: '1/6',
        mistake: 'sb-partial-sum-formula',
        why: 'Reported the first term 1/(2·3) as the sum of the series.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'sb-sum-is-term-limit',
        why: 'Took the limit of the terms (which tend to 0) as the sum.',
      },
      {
        latex: '\\frac{1}{3}',
        expr: '1/3',
        mistake: 'arithmetic-error',
        why: 'Kept 1/(n+2) at n = 1 instead of the first surviving term 1/(n+1) at n = 1.',
      },
    ],
    correct: 0,
    explanation: '$S_n = \\frac12 - \\frac{1}{n+2} \\to \\frac12$.',
    check: { kind: 'series', term: '1/((n+1)*(n+2))', converges: true, sum: '1/2' },
  },
  {
    id: 'sb-f-029',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=2}^{\\infty} \\frac{1}{n^{2}-1} = ?' },
    options: [
      { latex: '\\frac{3}{4}', expr: '3/4' },
      {
        latex: '\\frac{3}{2}',
        expr: '3/2',
        mistake: 'pf-coefficient-wrong',
        why: 'Dropped the factor 1/2 in the partial fraction decomposition 1/(n²−1) = (1/2)(1/(n−1) − 1/(n+1)).',
      },
      {
        latex: '\\frac{1}{2}',
        expr: '1/2',
        mistake: 'sb-telescoping-sum-wrong',
        why: 'Kept only the first surviving term instead of both surviving terms 1 and 1/2.',
      },
      {
        latex: '\\frac{1}{4}',
        expr: '1/4',
        mistake: 'arithmetic-error',
        why: 'Computed (1/2)(1/2) instead of (1/2)(1 + 1/2), keeping only one surviving term.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'sb-sum-is-term-limit',
        why: 'Took the limit of the terms (which tend to 0) as the sum.',
      },
    ],
    correct: 0,
    explanation: '$\\frac{1}{n^2-1} = \\frac12\\left(\\frac{1}{n-1} - \\frac{1}{n+1}\\right)$; the surviving terms give $\\frac12\\left(1 + \\frac12\\right) = \\frac34$.',
    check: { kind: 'series', term: '1/(n^2-1)', from: '2', converges: true, sum: '3/4' },
  },

  // ───────────────────────── properties of series ─────────────────────────
  {
    id: 'sb-f-030',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { text: '$\\sum a_n = 3$ and $\\sum b_n = -1$. $\\sum (2a_n - b_n) = ?$' },
    options: [
      { latex: '7', expr: '7' },
      {
        latex: '5',
        expr: '5',
        mistake: 'sign-error',
        why: 'Subtracted +1 instead of −1, so the minus sign in front of Σbₙ = −1 was mishandled.',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'arithmetic-error',
        why: 'Computed 3 − 1, forgetting the factor 2 and the sign of Σbₙ.',
      },
      {
        latex: '6',
        expr: '6',
        mistake: 'arithmetic-error',
        why: 'Dropped the bₙ sum and computed only 2 · 3.',
      },
      {
        latex: '4',
        expr: '4',
        mistake: 'coefficient-mishandled',
        why: 'Dropped the factor 2 on the first sum, computing 3 − (−1) = 4.',
      },
    ],
    correct: 0,
    explanation: 'By linearity, $\\sum(2a_n - b_n) = 2\\cdot 3 - (-1) = 7$.',
    check: { kind: 'value', expected: '7' },
  },
  {
    id: 'sb-f-031',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { text: '$\\sum \\dfrac{1}{2^{n}}$ converges and $\\sum \\dfrac{1}{n}$ diverges. $\\displaystyle\\sum \\left(\\frac{1}{2^{n}} + \\frac{1}{n}\\right)$:' },
    options: [
      { text: 'Diverges: convergent + divergent is always divergent' },
      {
        text: 'Converges: the convergent part dominates',
        mistake: 'sb-no-information',
        why: 'There is no such rule; a convergent part does not rescue a divergent one.',
      },
      {
        text: 'Insufficient information',
        mistake: 'sb-no-information',
        why: 'The difference rule settles it: if the sum converged, then Σ1/n would converge too.',
      },
      {
        text: 'Converges to $1 + \\infty$',
        mistake: 'im-divergent-called-convergent',
        why: 'An infinite sum means divergence; a series does not converge to an infinite value.',
      },
      {
        text: 'Converges: the terms $\\to 0$',
        mistake: 'sb-divergence-test-converse',
        why: 'Terms tending to 0 is necessary but not sufficient for convergence.',
      },
    ],
    correct: 0,
    explanation: 'If $\\sum(a_n + b_n)$ converged, then $\\sum b_n = \\sum(a_n + b_n) - \\sum a_n$ would converge.',
    check: { kind: 'series', term: '1/2^n + 1/n', converges: false },
  },
  {
    id: 'sb-f-032',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { text: '$\\sum a_n$ and $\\sum b_n$ both diverge. $\\sum (a_n + b_n)$:' },
    options: [
      { text: 'Insufficient information: it may converge or diverge' },
      {
        text: 'Diverges: the sum of two divergent series diverges',
        mistake: 'sb-no-information',
        why: 'No theorem says so; for example aₙ = 1 and bₙ = −1 give Σ0, which converges.',
      },
      {
        text: 'Converges: the divergences cancel',
        mistake: 'sb-split-divergent',
        why: 'No theorem says so either; aₙ = bₙ = 1 gives Σ2, which diverges.',
      },
      {
        text: 'Diverges by the divergence test',
        mistake: 'sb-divergence-test-converse',
        why: 'Nothing is known about lim(aₙ + bₙ), so the divergence test cannot be applied.',
      },
      {
        text: 'Converges to $0$',
        mistake: 'sb-no-information',
        why: 'There is no basis for assigning a value; the combined series may not even converge.',
      },
    ],
    correct: 0,
    explanation: 'Examples go both ways, so nothing can be concluded.',
    check: { kind: 'none', reason: 'property of series: divergent + divergent is inconclusive; verified by math-verifier' },
  },
  {
    id: 'sb-f-033',
    topic: 'series-basics',
    kind: 'concept',
    prompt: { text: 'Which manipulation is valid?' },
    options: [
      { text: '$\\displaystyle\\sum \\left(\\frac{1}{2^{n}} + \\frac{1}{3^{n}}\\right) = \\sum \\frac{1}{2^{n}} + \\sum \\frac{1}{3^{n}}$ (both converge)' },
      {
        text: '$\\displaystyle\\sum \\left(\\frac{1}{n} - \\frac{1}{n}\\right) = \\sum \\frac{1}{n} - \\sum \\frac{1}{n} = 0$',
        mistake: 'sb-split-divergent',
        why: 'Split the series into two divergent pieces (∞ − ∞), which the difference rule does not allow.',
      },
      {
        text: '$\\displaystyle\\sum \\left(\\frac{1}{n} + \\frac{1}{n^{2}}\\right) = \\sum \\frac{1}{n} + \\sum \\frac{1}{n^{2}}$',
        mistake: 'sb-split-divergent',
        why: 'The sum rule needs both series to be convergent, and Σ1/n diverges.',
      },
      {
        text: '$\\sum c\\,a_n = c \\sum a_n$ for every series',
        mistake: 'sb-split-divergent',
        why: 'Pulling out the constant is valid only when Σaₙ converges.',
      },
      {
        text: '$\\sum a_n b_n = \\left(\\sum a_n\\right)\\left(\\sum b_n\\right)$',
        mistake: 'algebra-error',
        why: 'There is no product rule for series; the sum of products is not the product of sums.',
      },
    ],
    correct: 0,
    explanation: 'The sum rule applies when both series converge.',
    check: { kind: 'none', reason: 'which series manipulations are valid; verified by math-verifier' },
  },
  {
    id: 'sb-f-034',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { latex: '\\displaystyle\\sum_{n=1}^{\\infty} \\left(\\frac{3}{2^{n}} - \\frac{2}{3^{n}}\\right) = ?' },
    options: [
      { latex: '2', expr: '2' },
      {
        latex: '3',
        expr: '3',
        mistake: 'sb-wrong-first-term',
        why: 'Treated both pieces as if they started at n = 0, getting 3·2 − 2·(3/2) = 3, instead of starting at n = 1.',
      },
      {
        latex: '4',
        expr: '4',
        mistake: 'sign-error',
        why: 'Added the two sums instead of subtracting the second.',
      },
      {
        latex: '\\frac{5}{6}',
        expr: '5/6',
        mistake: 'sb-partial-sum-formula',
        why: 'Reported the first term of the combined series, 3/2 − 2/3 = 5/6, as the sum.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'sb-sum-is-term-limit',
        why: 'Took the limit of the terms (which tend to 0) as the sum.',
      },
    ],
    correct: 0,
    explanation: 'Both pieces converge, so $3\\cdot 1 - 2\\cdot\\tfrac12 = 2$.',
    check: { kind: 'series', term: '3/2^n - 2/3^n', converges: true, sum: '2' },
  },
  {
    id: 'sb-f-035',
    topic: 'series-basics',
    kind: 'formula',
    prompt: { text: '$S_n = n^{2}$. Then $a_3 = ?$' },
    options: [
      { latex: '5', expr: '5' },
      {
        latex: '9',
        expr: '9',
        mistake: 'sb-sequence-vs-series',
        why: 'Reported S₃ = 9, the third partial sum, instead of the third term.',
      },
      {
        latex: '6',
        expr: '6',
        mistake: 'arithmetic-error',
        why: 'Used 2n, the derivative of n², instead of the difference S₃ − S₂.',
      },
      {
        latex: '3',
        expr: '3',
        mistake: 'arithmetic-error',
        why: 'Reported n itself instead of S₃ − S₂.',
      },
      {
        latex: '7',
        expr: '7',
        mistake: 'arithmetic-error',
        why: 'Computed a₄ = S₄ − S₃ = 16 − 9 instead of a₃.',
      },
    ],
    correct: 0,
    explanation: 'a₃ = S₃ − S₂ = 9 − 4 = 5.',
    check: { kind: 'value', expected: '5' },
  },
];

// ───────────────────────── generators ─────────────────────────

interface Frac {
  n: number;
  d: number;
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function fr(n: number, d = 1): Frac {
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
}

function fmul(x: Frac, y: Frac): Frac {
  return fr(x.n * y.n, x.d * y.d);
}

function fdiv(x: Frac, y: Frac): Frac {
  return fr(x.n * y.d, x.d * y.n);
}

function fpow(x: Frac, k: number): Frac {
  let out = fr(1);
  for (let i = 0; i < k; i++) out = fmul(out, x);
  return out;
}

/** KaTeX for a fraction: 3, \frac{1}{2}, -\frac{5}{3}. */
function fLatex(x: Frac): string {
  if (x.d === 1) return `${x.n}`;
  return `${x.n < 0 ? '-' : ''}\\frac{${Math.abs(x.n)}}{${x.d}}`;
}

/** mathjs for a fraction: 3, 1/2, -5/3. */
function fExpr(x: Frac): string {
  return x.d === 1 ? `${x.n}` : `${x.n}/${x.d}`;
}

const GEO_TABLE: { a: number; r: Frac; s: number }[] = [
  { a: 3, r: fr(1, 2), s: 1 },
  { a: 2, r: fr(1, 3), s: 2 },
  { a: 5, r: fr(-1, 2), s: 1 },
  { a: 4, r: fr(2, 3), s: 2 },
  { a: 1, r: fr(1, 4), s: 1 },
  { a: 6, r: fr(-1, 3), s: 2 },
  { a: 2, r: fr(3, 4), s: 1 },
  { a: 9, r: fr(1, 3), s: 2 },
];

const geometricSum: FlashGenerator = {
  id: 'sb-g-geometric-sum',
  topic: 'series-basics',
  kind: 'formula',
  describe: 'sum of a geometric series from a given index',
  generate(seed) {
    const { a, r, s } = GEO_TABLE[(seed - 1) % GEO_TABLE.length];
    const first = fmul(fr(a), fpow(r, s)); // a r^s
    const oneMinusR = fr(r.d - r.n, r.d);
    const correct = fdiv(first, oneMinusR); // a r^s / (1 - r)
    const onePlusR = fr(r.d + r.n, r.d);
    const wrongStart = fdiv(fr(a), oneMinusR); // a / (1 - r)
    const plusDen = fdiv(first, onePlusR); // a r^s / (1 + r)
    const times = fmul(first, oneMinusR); // a r^s (1 - r)
    const neg = fdiv(first, fr(-oneMinusR.n, oneMinusR.d)); // a r^s / (r - 1)
    const rLatex = `\\left(${fLatex(r)}\\right)`;
    const rExpr = `(${fExpr(r)})`;
    const coefLatex = a === 1 ? '' : `${a}`;
    const coefExpr = a === 1 ? '' : `${a}*`;
    const termExpr = `${coefExpr}${rExpr}^n`;
    return {
      id: `sb-g-geometric-sum:${seed}`,
      topic: 'series-basics',
      kind: 'formula',
      prompt: { latex: `\\displaystyle\\sum_{n=${s}}^{\\infty} ${coefLatex}${rLatex}^{n} = ?` },
      options: [
        { latex: fLatex(correct), expr: fExpr(correct) },
        {
          latex: fLatex(wrongStart),
          expr: fExpr(wrongStart),
          mistake: 'sb-wrong-first-term',
          why: `Used a = ${a} as the first term although the series starts at n = ${s}, where the first term is ar^${s}.`,
        },
        {
          latex: fLatex(plusDen),
          expr: fExpr(plusDen),
          mistake: 'sb-wrong-ratio',
          why: 'Used 1 + r in the denominator instead of 1 − r.',
        },
        {
          latex: fLatex(times),
          expr: fExpr(times),
          mistake: 'sb-partial-sum-formula',
          why: 'Multiplied the first term by 1 − r instead of dividing by it.',
        },
        {
          latex: fLatex(neg),
          expr: fExpr(neg),
          mistake: 'sign-error',
          why: 'Wrote the denominator as r − 1 instead of 1 − r, which flips the sign of the answer.',
        },
      ],
      correct: 0,
      explanation: `The series starts at n = ${s}, so the first term is $${coefLatex}${rLatex}^{${s}} = ${fLatex(first)}$ and the ratio is $r = ${fLatex(r)}$: sum = (first term)/(1 − r) = $${fLatex(correct)}$.`,
      check: { kind: 'series', term: termExpr, from: `${s}`, converges: true, sum: fExpr(correct) },
    };
  },
};

const telescoping: FlashGenerator = {
  id: 'sb-g-telescoping',
  topic: 'series-basics',
  kind: 'formula',
  describe: 'telescoping sum Σ 1/((n+p)(n+p+1))',
  generate(seed) {
    const p = ((seed - 1) % 8) + 1;
    return {
      id: `sb-g-telescoping:${seed}`,
      topic: 'series-basics',
      kind: 'formula',
      prompt: { latex: `\\displaystyle\\sum_{n=1}^{\\infty} \\frac{1}{(n+${p})(n+${p + 1})} = ?` },
      options: [
        { latex: `\\frac{1}{${p + 1}}`, expr: `1/${p + 1}` },
        {
          latex: '1',
          expr: '1',
          mistake: 'sb-telescoping-sum-wrong',
          why: 'Assumed b₁ = 1 as in Σ 1/(n(n+1)); here the first surviving term is 1/(1+p).',
        },
        {
          latex: `\\frac{1}{${p + 2}}`,
          expr: `1/${p + 2}`,
          mistake: 'arithmetic-error',
          why: 'Was off by one in the surviving term, using 1/(p+2) instead of 1/(p+1).',
        },
        {
          latex: `\\frac{1}{${(p + 1) * (p + 2)}}`,
          expr: `1/${(p + 1) * (p + 2)}`,
          mistake: 'sb-telescoping-sum-wrong',
          why: 'Kept only the first difference b₁ − b₂ instead of the full telescoped sum b₁ − lim bₙ₊₁.',
        },
        {
          latex: '0',
          expr: '0',
          mistake: 'sb-sum-is-term-limit',
          why: 'Took the limit of the terms (which tend to 0) as the sum.',
        },
      ],
      correct: 0,
      explanation: `$\\frac{1}{(n+${p})(n+${p + 1})} = \\frac{1}{n+${p}} - \\frac{1}{n+${p + 1}}$; the only surviving term is $\\frac{1}{1+${p}} = \\frac{1}{${p + 1}}$.`,
      check: { kind: 'series', term: `1/((n+${p})*(n+${p + 1}))`, converges: true, sum: `1/${p + 1}` },
    };
  },
};

export const generators: FlashGenerator[] = [geometricSum, telescoping];
