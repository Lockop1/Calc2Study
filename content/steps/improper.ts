import type { StepProblem } from '../types';

/** Step-Through problems for topic "improper" (session 3, Phase C). */
export const steps: StepProblem[] = [
  // ───────────────────────── im-s-01: ∫₁^∞ dx/x² ─────────────────────────
  {
    id: 'im-s-01',
    topic: 'improper',
    title: 'Type I, convergent',
    difficulty: 1,
    statement: { text: 'Evaluate or show divergence.', latex: '\\int_{1}^{\\infty} \\frac{dx}{x^{2}}' },
    steps: [
      {
        prompt: 'What type of improper integral is this?',
        options: [
          { text: 'Type I: the upper bound is $\\infty$' },
          {
            text: 'Type II: $\\dfrac{1}{x^{2}}$ blows up at $x = 0$',
            mistake: 'im-wrong-type',
            why: 'The point 0 is not in the interval [1, ∞), so the blow-up there is irrelevant.',
          },
          {
            text: 'Not improper: the integrand is continuous on $[1, \\infty)$',
            mistake: 'im-wrong-type',
            why: 'An infinite bound alone makes the integral improper, even with a continuous integrand.',
          },
          {
            text: 'Both types',
            mistake: 'im-wrong-type',
            why: 'There is no discontinuity of the integrand on the interval, so only the infinite bound counts.',
          },
          {
            text: 'Type II at $x = 1$',
            mistake: 'im-wrong-type',
            why: 'The integrand equals 1 at x = 1, so nothing blows up at the endpoint.',
          },
        ],
        correct: 0,
        explanation: 'There is one infinite bound and the integrand is continuous on the interval, so it is Type I.',
        result: { text: 'Type I (bound $\\infty$)' },
        check: { kind: 'none', reason: 'type identification' },
      },
      {
        prompt: 'Write it as a limit.',
        options: [
          { text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{1}^{t} \\frac{dx}{x^{2}}$' },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{t}^{\\infty} \\frac{dx}{x^{2}}$',
            mistake: 'im-plug-infinity',
            why: 'The infinity is still left as a bound; it must be replaced by the variable t.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to 1^{+}} \\int_{t}^{\\infty} \\frac{dx}{x^{2}}$',
            mistake: 'im-wrong-type',
            why: 'The finite bound 1 is fine; the bad bound is the infinite one.',
          },
          {
            text: '$\\left[-\\dfrac{1}{x}\\right]_{1}^{\\infty}$ directly',
            mistake: 'im-plug-infinity',
            why: 'Infinity is never plugged into the antiderivative; a limit must be taken instead.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to-\\infty} \\int_{t}^{1} \\frac{dx}{x^{2}}$',
            mistake: 'im-wrong-one-sided-limit',
            why: 'This integrates over the wrong half-line, (−∞, 1], instead of [1, ∞).',
          },
        ],
        correct: 0,
        explanation: 'Replace the infinite bound by t and let t → ∞.',
        result: { latex: '= \\lim_{t\\to\\infty} \\int_{1}^{t} \\frac{dx}{x^{2}}' },
        check: { kind: 'none', reason: 'limit set-up' },
      },
      {
        prompt: 'Apply the FTC inside the limit: $\\displaystyle\\int_{1}^{t} \\frac{dx}{x^{2}} = ?$',
        options: [
          { latex: '1 - \\dfrac{1}{t}', expr: '1 - 1/t' },
          {
            latex: '\\dfrac{1}{t} - 1',
            expr: '1/t - 1',
            mistake: 'ftc-order-swapped',
            why: 'This is F(1) − F(t); the FTC needs F(t) − F(1).',
          },
          {
            latex: '-\\dfrac{1}{t}',
            expr: '-1/t',
            mistake: 'ftc-not-subtracted',
            why: 'F(1) = −1 must be subtracted from F(t), which was skipped here.',
          },
          {
            latex: '\\ln t',
            expr: 'log(t)',
            mistake: 'ln-misapplied',
            why: 'This is the antiderivative result for dx/x, not for dx/x².',
          },
          {
            latex: '\\dfrac{1}{2} - \\dfrac{1}{2t^{2}}',
            expr: '1/2 - 1/(2*t^2)',
            mistake: 'power-rule-int-exponent',
            why: 'This is the result for ∫ dx/x³, so the exponent was shifted wrongly.',
          },
        ],
        correct: 0,
        explanation: 'The antiderivative is −1/x, so [−1/x] from 1 to t is −1/t + 1.',
        result: { latex: '= \\lim_{t\\to\\infty} \\left(1 - \\frac{1}{t}\\right)' },
        check: { kind: 'identity', lhs: '1 - 1/t' },
        variable: 't',
        domain: [2, 10],
      },
      {
        prompt: 'Evaluate the limit and conclude.',
        options: [
          { latex: '1', expr: '1' },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-limit-evaluated-wrong',
            why: 'Since 1/t → 0, the quantity 1 − 1/t tends to 1, not to 0.',
          },
          { latex: '-1', expr: '-1', mistake: 'sign-error', why: 'A sign slip turned the limit 1 into −1.' },
          { latex: '2', expr: '2', mistake: 'arithmetic-error', why: 'An arithmetic slip gave 2 instead of the limit 1.' },
          {
            latex: '\\frac{1}{2}',
            expr: '1/2',
            mistake: 'power-rule-int-exponent',
            why: 'This uses the antiderivative of 1/x³ instead of 1/x².',
          },
        ],
        correct: 0,
        explanation: '1 − 1/t → 1, a finite limit, so the integral converges to 1.',
        result: { latex: '= 1' },
        check: { kind: 'value', expected: '1' },
      },
    ],
    final: {
      latex: '1',
      expr: '1',
      check: { kind: 'improper-integral', integrand: '1/x^2', lower: '1', upper: 'inf', converges: true, value: '1' },
      recap: 'Type I → replace ∞ by $t$ → FTC gives $1 - 1/t$ → the limit is 1 → converges to 1.',
    },
  },

  // ───────────────────────── im-s-02: ∫₁^∞ dx/x ─────────────────────────
  {
    id: 'im-s-02',
    topic: 'improper',
    title: 'Type I, divergent',
    difficulty: 1,
    statement: { text: 'Evaluate or show divergence.', latex: '\\int_{1}^{\\infty} \\frac{dx}{x}' },
    steps: [
      {
        prompt: 'Type I. Write it as a limit.',
        options: [
          { text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{1}^{t} \\frac{dx}{x}$' },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{t}^{\\infty} \\frac{dx}{x}$',
            mistake: 'im-plug-infinity',
            why: 'The infinity is still left as a bound; it must be replaced by the variable t.',
          },
          {
            text: '$\\left[\\ln x\\right]_{1}^{\\infty}$ directly',
            mistake: 'im-plug-infinity',
            why: 'Infinity is never plugged into the antiderivative; a limit must be taken instead.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to 0^{+}} \\int_{t}^{\\infty} \\frac{dx}{x}$',
            mistake: 'im-wrong-type',
            why: 'The point 0 is not in the interval [1, ∞), so no limit at 0 is needed.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{-t}^{t} \\frac{dx}{x}$',
            mistake: 'im-symmetric-limit',
            why: 'The interval is [1, ∞), not the whole line, so a symmetric limit is the wrong set-up.',
          },
        ],
        correct: 0,
        explanation: 'Replace the infinite bound by t.',
        result: { latex: '= \\lim_{t\\to\\infty} \\int_{1}^{t} \\frac{dx}{x}' },
        check: { kind: 'none', reason: 'limit set-up' },
      },
      {
        prompt: 'Apply the FTC: $\\displaystyle\\int_{1}^{t} \\frac{dx}{x} = ?$',
        options: [
          { latex: '\\ln t', expr: 'log(t)' },
          {
            latex: '\\ln t - 1',
            expr: 'log(t) - 1',
            mistake: 'arithmetic-error',
            why: 'F(1) = ln 1 = 0, not 1, so nothing extra is subtracted.',
          },
          {
            latex: '-\\ln t',
            expr: '-log(t)',
            mistake: 'ftc-order-swapped',
            why: 'This is F(1) − F(t) instead of F(t) − F(1).',
          },
          {
            latex: '1 - \\dfrac{1}{t}',
            expr: '1 - 1/t',
            mistake: 'power-rule-int-exponent',
            why: 'This is the result for ∫ dx/x², not for dx/x.',
          },
          {
            latex: '\\dfrac{t^{2}}{2} - \\dfrac{1}{2}',
            expr: 't^2/2 - 1/2',
            mistake: 'power-rule-int-exponent',
            why: 'This integrates x instead of 1/x.',
          },
        ],
        correct: 0,
        explanation: '[ln x] from 1 to t equals ln t − ln 1 = ln t.',
        result: { latex: '= \\lim_{t\\to\\infty} \\ln t' },
        check: { kind: 'identity', lhs: 'log(t)' },
        variable: 't',
        domain: [2, 10],
      },
      {
        prompt: 'Evaluate the limit and conclude.',
        options: [
          { text: '$\\ln t \\to \\infty$: the integral diverges' },
          {
            text: '$\\ln t \\to \\infty$: the integral converges to $\\infty$',
            mistake: 'im-divergent-called-convergent',
            why: 'An infinite limit means the integral diverges; it never converges to infinity.',
          },
          {
            text: '$\\ln t \\to 0$: converges to $0$',
            mistake: 'im-limit-evaluated-wrong',
            why: 'ln t grows without bound as t → ∞, so it does not tend to 0.',
          },
          {
            text: '$\\ln t \\to 1$: converges to $1$',
            mistake: 'im-limit-evaluated-wrong',
            why: 'ln t is unbounded as t → ∞, so it does not settle at 1.',
          },
          {
            text: 'Converges by the $p$-rule with $p = 1$',
            mistake: 'im-p-rule-wrong',
            why: 'The p-rule gives convergence only for p > 1, and p = 1 is the divergent boundary case.',
          },
        ],
        correct: 0,
        explanation: 'The limit is not finite, so the integral diverges.',
        result: { text: 'Diverges' },
        check: { kind: 'improper-integral', integrand: '1/x', lower: '1', upper: 'inf', converges: false },
      },
    ],
    final: {
      latex: '\\text{diverges}',
      check: { kind: 'improper-integral', integrand: '1/x', lower: '1', upper: 'inf', converges: false },
      recap: 'Type I → limit → $\\ln t$ → unbounded → diverges ($p = 1$ is the boundary case of the $p$-rule).',
    },
  },

  // ───────────────────────── im-s-03: ∫₀¹ dx/√x ─────────────────────────
  {
    id: 'im-s-03',
    topic: 'improper',
    title: 'Type II at the lower endpoint',
    difficulty: 1,
    statement: { text: 'Evaluate or show divergence.', latex: '\\int_{0}^{1} \\frac{dx}{\\sqrt{x}}' },
    steps: [
      {
        prompt: 'What type is this, and where is the problem?',
        options: [
          { text: 'Type II: $\\dfrac{1}{\\sqrt{x}} \\to \\infty$ as $x \\to 0^{+}$' },
          {
            text: 'Type I',
            mistake: 'im-wrong-type',
            why: 'Both bounds are finite, so there is no infinite bound.',
          },
          {
            text: 'Not improper: finite bounds',
            mistake: 'im-hidden-discontinuity',
            why: 'Finite bounds are not enough; the integrand blows up at the endpoint 0.',
          },
          {
            text: 'Type II at $x = 1$',
            mistake: 'im-wrong-type',
            why: 'The integrand equals 1 at x = 1, so nothing blows up there.',
          },
          {
            text: 'Both types',
            mistake: 'im-wrong-type',
            why: 'There is no infinite bound, so only the discontinuity counts.',
          },
        ],
        correct: 0,
        explanation: 'The bounds are finite and the integrand has an infinite discontinuity at the endpoint 0.',
        result: { text: 'Type II at $x = 0$' },
        check: { kind: 'none', reason: 'type identification' },
      },
      {
        prompt: 'Write it as a limit.',
        options: [
          { text: '$\\displaystyle\\lim_{t\\to 0^{+}} \\int_{t}^{1} \\frac{dx}{\\sqrt{x}}$' },
          {
            text: '$\\displaystyle\\lim_{t\\to 0^{-}} \\int_{t}^{1} \\frac{dx}{\\sqrt{x}}$',
            mistake: 'im-wrong-one-sided-limit',
            why: 'The limit must approach 0 from inside the interval [0, 1], that is from the right.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to 1^{-}} \\int_{0}^{t} \\frac{dx}{\\sqrt{x}}$',
            mistake: 'im-wrong-type',
            why: 'The bad endpoint is 0, not 1, so the limit must be taken at 0.',
          },
          {
            text: '$\\left[2\\sqrt{x}\\right]_{0}^{1}$ directly',
            mistake: 'im-hidden-discontinuity',
            why: 'The integrand blows up at 0, so the limit must be written before using the FTC.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{0}^{t} \\frac{dx}{\\sqrt{x}}$',
            mistake: 'im-wrong-type',
            why: 'There is no infinite bound here, so t → ∞ does not belong.',
          },
        ],
        correct: 0,
        explanation: 'Replace the bad endpoint 0 by t and let t → 0⁺.',
        result: { latex: '= \\lim_{t\\to 0^{+}} \\int_{t}^{1} \\frac{dx}{\\sqrt{x}}' },
        check: { kind: 'none', reason: 'limit set-up' },
      },
      {
        prompt: 'Apply the FTC: $\\displaystyle\\int_{t}^{1} x^{-1/2}\\,dx = ?$',
        options: [
          { latex: '2 - 2\\sqrt{t}', expr: '2 - 2*sqrt(t)' },
          {
            latex: '2\\sqrt{t} - 2',
            expr: '2*sqrt(t) - 2',
            mistake: 'ftc-order-swapped',
            why: 'This is F(t) − F(1); the FTC needs F(1) − F(t).',
          },
          {
            latex: '1 - \\sqrt{t}',
            expr: '1 - sqrt(t)',
            mistake: 'power-rule-int-coefficient',
            why: 'The antiderivative of x^{−1/2} is 2x^{1/2}, so the coefficient 2 was lost.',
          },
          {
            latex: '\\sqrt{t} - 1',
            expr: 'sqrt(t) - 1',
            mistake: 'power-rule-int-coefficient',
            why: 'Lost the coefficient 2 of 2x^{1/2} and also computed F(t) − F(1) instead of F(1) − F(t).',
          },
          {
            latex: '-2\\sqrt{t}',
            expr: '-2*sqrt(t)',
            mistake: 'ftc-not-subtracted',
            why: 'Only −F(t) was written; F(1) = 2 must also be included in F(1) − F(t).',
          },
        ],
        correct: 0,
        explanation: '[2√x] from t to 1 equals 2 − 2√t.',
        result: { latex: '= \\lim_{t\\to 0^{+}} \\left(2 - 2\\sqrt{t}\\right)' },
        check: { kind: 'identity', lhs: '2 - 2*sqrt(t)' },
        variable: 't',
        domain: [0.01, 0.9],
      },
      {
        prompt: 'Evaluate the limit.',
        options: [
          { latex: '2', expr: '2' },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-limit-evaluated-wrong',
            why: 'Only 2√t tends to 0, so 2 − 2√t tends to 2.',
          },
          { latex: '-2', expr: '-2', mistake: 'sign-error', why: 'A sign slip turned the limit 2 into −2.' },
          { latex: '1', expr: '1', mistake: 'arithmetic-error', why: 'An arithmetic slip gave 1 instead of the limit 2.' },
          { latex: '4', expr: '4', mistake: 'arithmetic-error', why: 'The result 2 was doubled by mistake.' },
        ],
        correct: 0,
        explanation: '√t → 0 as t → 0⁺, so the limit is 2: the integral converges to 2.',
        result: { latex: '= 2' },
        check: { kind: 'value', expected: '2' },
      },
    ],
    final: {
      latex: '2',
      expr: '2',
      check: { kind: 'improper-integral', integrand: '1/sqrt(x)', lower: '0', upper: '1', converges: true, value: '2' },
      recap: 'Type II at 0 → $\\lim_{t\\to 0^{+}}\\int_t^1$ → $2 - 2\\sqrt{t}$ → 2.',
    },
  },

  // ───────────────────────── im-s-04: ∫₀^∞ e^{-x} dx ─────────────────────────
  {
    id: 'im-s-04',
    topic: 'improper',
    title: 'Exponential tail',
    difficulty: 1,
    statement: { text: 'Evaluate or show divergence.', latex: '\\int_{0}^{\\infty} e^{-x}\\,dx' },
    steps: [
      {
        prompt: 'Type I. Write it as a limit.',
        options: [
          { text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{0}^{t} e^{-x}\\,dx$' },
          {
            text: '$\\left[-e^{-x}\\right]_{0}^{\\infty}$ directly',
            mistake: 'im-plug-infinity',
            why: 'Infinity is never plugged into the antiderivative; a limit must be taken instead.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{t}^{\\infty} e^{-x}\\,dx$',
            mistake: 'im-plug-infinity',
            why: 'The infinity is still left as a bound; it must be replaced by the variable t.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to 0^{+}} \\int_{t}^{\\infty} e^{-x}\\,dx$',
            mistake: 'im-wrong-type',
            why: 'The endpoint 0 is perfectly fine, so no limit at 0 is needed.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to-\\infty} \\int_{t}^{0} e^{-x}\\,dx$',
            mistake: 'im-wrong-one-sided-limit',
            why: 'This integrates over the wrong half-line, (−∞, 0], instead of [0, ∞).',
          },
        ],
        correct: 0,
        explanation: 'Replace the infinite bound by t.',
        result: { latex: '= \\lim_{t\\to\\infty} \\int_{0}^{t} e^{-x}\\,dx' },
        check: { kind: 'none', reason: 'limit set-up' },
      },
      {
        prompt: 'Apply the FTC: $\\displaystyle\\int_{0}^{t} e^{-x}\\,dx = ?$',
        options: [
          { latex: '1 - e^{-t}', expr: '1 - exp(-t)' },
          {
            latex: 'e^{-t} - 1',
            expr: 'exp(-t) - 1',
            mistake: 'ftc-order-swapped',
            why: 'The FTC with F = −e^{−x} gives −e^{−t} + 1, so this has the order and sign reversed.',
          },
          {
            latex: 'e^{-t} + 1',
            expr: 'exp(-t) + 1',
            mistake: 'sign-error',
            why: 'Dropped the minus sign of F(t) = −e^{−t} but kept −F(0) = +1.',
          },
          {
            latex: '-e^{-t}',
            expr: '-exp(-t)',
            mistake: 'ftc-not-subtracted',
            why: 'F(0) = −1 must be subtracted from F(t), which was skipped here.',
          },
          {
            latex: 'e^{t} - 1',
            expr: 'exp(t) - 1',
            mistake: 'exp-antiderivative-wrong',
            why: 'The antiderivative of e^{−x} is −e^{−x}; the inner minus sign was ignored.',
          },
        ],
        correct: 0,
        explanation: '[−e^{−x}] from 0 to t equals −e^{−t} + 1.',
        result: { latex: '= \\lim_{t\\to\\infty} \\left(1 - e^{-t}\\right)' },
        check: { kind: 'identity', lhs: '1 - exp(-t)' },
        variable: 't',
        domain: [0.5, 5],
      },
      {
        prompt: 'Evaluate the limit.',
        options: [
          { latex: '1', expr: '1' },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-limit-evaluated-wrong',
            why: 'Since e^{−t} → 0, the quantity 1 − e^{−t} tends to 1, not to 0.',
          },
          { latex: '-1', expr: '-1', mistake: 'sign-error', why: 'A sign slip turned the limit 1 into −1.' },
          {
            latex: '1 - e',
            expr: '1 - e',
            mistake: 'im-limit-evaluated-wrong',
            why: 'This takes e^{−t} to tend to e, but it tends to 0 as t → ∞.',
          },
          {
            latex: '1 - \\dfrac{1}{e}',
            expr: '1 - 1/e',
            mistake: 'im-limit-evaluated-wrong',
            why: 'This plugs in t = 1 instead of taking the limit as t → ∞.',
          },
        ],
        correct: 0,
        explanation: 'e^{−t} → 0, so the integral converges to 1.',
        result: { latex: '= 1' },
        check: { kind: 'value', expected: '1' },
      },
    ],
    final: {
      latex: '1',
      expr: '1',
      check: { kind: 'improper-integral', integrand: 'exp(-x)', lower: '0', upper: 'inf', converges: true, value: '1' },
      recap: 'Type I → limit → $1 - e^{-t}$ → 1.',
    },
  },

  // ───────────────────────── im-s-05: ∫_{-∞}^{∞} dx/(1+x²) ─────────────────────────
  {
    id: 'im-s-05',
    topic: 'improper',
    title: 'Both bounds infinite: split',
    difficulty: 2,
    statement: { text: 'Evaluate or show divergence.', latex: '\\int_{-\\infty}^{\\infty} \\frac{dx}{1+x^{2}}' },
    steps: [
      {
        prompt: 'Both bounds are infinite. What is the correct set-up?',
        options: [
          {
            text: '$\\displaystyle\\lim_{s\\to-\\infty}\\int_{s}^{0} + \\lim_{t\\to\\infty}\\int_{0}^{t}$',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{-t}^{t} \\frac{dx}{1+x^{2}}$',
            mistake: 'im-symmetric-limit',
            why: 'One symmetric limit is never allowed; each infinite bound needs its own limit.',
          },
          {
            text: '$2\\displaystyle\\int_{0}^{\\infty} \\frac{dx}{1+x^{2}}$ without checking the left half',
            mistake: 'im-one-half-only',
            why: 'Symmetry may be used only after it is known that both halves converge.',
          },
          {
            text: '$\\arctan(\\infty) - \\arctan(-\\infty)$',
            mistake: 'im-plug-infinity',
            why: 'Infinity is never plugged into the antiderivative; limits must be taken instead.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{-\\infty}^{t} \\frac{dx}{1+x^{2}}$',
            mistake: 'im-split-mishandled',
            why: 'The bound −∞ is still left in place; it needs its own limit.',
          },
        ],
        correct: 0,
        explanation: 'Use two SEPARATE limits; the integral converges only if both of them do.',
        result: {
          latex: '= \\lim_{s\\to-\\infty}\\int_{s}^{0}\\frac{dx}{1+x^{2}} + \\lim_{t\\to\\infty}\\int_{0}^{t}\\frac{dx}{1+x^{2}}',
        },
        check: { kind: 'none', reason: 'split rule' },
      },
      {
        prompt: 'Right half: $\\displaystyle\\lim_{t\\to\\infty} \\left[\\arctan x\\right]_{0}^{t} = ?$',
        options: [
          { latex: '\\frac{\\pi}{2}', expr: 'pi/2' },
          {
            latex: '\\pi',
            expr: 'pi',
            mistake: 'inverse-trig-value-wrong',
            why: 'arctan t tends to π/2 as t → ∞, not to π.',
          },
          {
            latex: '\\frac{\\pi}{4}',
            expr: 'pi/4',
            mistake: 'inverse-trig-value-wrong',
            why: 'arctan 1 = π/4, but here t → ∞, so the value is π/2.',
          },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-plug-infinity',
            why: 'Treated arctan(∞) as undefined and wrote 0 instead of taking the limit π/2.',
          },
          {
            latex: '-\\frac{\\pi}{2}',
            expr: '-pi/2',
            mistake: 'sign-error',
            why: 'That is the limit of arctan at −∞, not at +∞.',
          },
        ],
        correct: 0,
        explanation: 'arctan t → π/2 as t → ∞ and arctan 0 = 0.',
        result: { latex: '\\text{right half} = \\frac{\\pi}{2}' },
        check: { kind: 'value', expected: 'pi/2' },
      },
      {
        prompt: 'Left half: $\\displaystyle\\lim_{s\\to-\\infty} \\left[\\arctan x\\right]_{s}^{0} = ?$',
        options: [
          { latex: '\\frac{\\pi}{2}', expr: 'pi/2' },
          {
            latex: '-\\frac{\\pi}{2}',
            expr: '-pi/2',
            mistake: 'sign-error',
            why: 'The subtraction is 0 − (−π/2) = +π/2, so the sign is positive.',
          },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-one-half-only',
            why: 'The left half is not zero; it must be computed rather than assumed.',
          },
          {
            latex: '\\pi',
            expr: 'pi',
            mistake: 'inverse-trig-value-wrong',
            why: 'arctan s tends to −π/2 as s → −∞, so the half equals π/2, not π.',
          },
          {
            latex: '\\frac{\\pi}{4}',
            expr: 'pi/4',
            mistake: 'inverse-trig-value-wrong',
            why: 'arctan(−1) = −π/4 is a single value, not the limit as s → −∞.',
          },
        ],
        correct: 0,
        explanation: 'arctan 0 − arctan s → 0 − (−π/2) = π/2 as s → −∞.',
        result: { latex: '\\text{left half} = \\frac{\\pi}{2}' },
        check: { kind: 'value', expected: 'pi/2' },
      },
      {
        prompt: 'Conclude.',
        options: [
          { latex: '\\pi', expr: 'pi' },
          {
            latex: '\\frac{\\pi}{2}',
            expr: 'pi/2',
            mistake: 'im-one-half-only',
            why: 'Both halves contribute to the total, but only one was counted.',
          },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-symmetric-limit',
            why: 'The halves add, they do not cancel; the symmetric-cancellation idea fails for an even integrand.',
          },
          { latex: '2\\pi', expr: '2*pi', mistake: 'arithmetic-error', why: 'The total π was doubled by mistake.' },
          { latex: '-\\pi', expr: '-pi', mistake: 'sign-error', why: 'A sign slip turned the total π into −π.' },
        ],
        correct: 0,
        explanation: 'Each half is π/2; both converge, so the total is π.',
        result: { latex: '= \\pi' },
        check: { kind: 'value', expected: 'pi' },
      },
    ],
    final: {
      latex: '\\pi',
      expr: 'pi',
      check: {
        kind: 'improper-integral',
        integrand: '1/(1+x^2)',
        lower: '-inf',
        upper: 'inf',
        converges: true,
        value: 'pi',
        split: ['0'],
      },
      recap: 'Split at 0 into two separate limits → each half is $\\frac{\\pi}{2}$ → both converge → $\\pi$.',
    },
  },

  // ───────────────────────── im-s-06: ∫_{-1}^{1} dx/x² ─────────────────────────
  {
    id: 'im-s-06',
    topic: 'improper',
    title: 'The hidden discontinuity',
    difficulty: 2,
    statement: { text: 'Evaluate or show divergence.', latex: '\\int_{-1}^{1} \\frac{dx}{x^{2}}' },
    steps: [
      {
        prompt: 'What is special about this integral?',
        options: [
          {
            text: 'Type II at the interior point $x = 0$',
          },
          {
            text: 'Nothing: finite bounds, so use the FTC',
            mistake: 'im-hidden-discontinuity',
            why: 'Finite bounds are not enough; the integrand blows up at 0, inside the interval.',
          },
          {
            text: 'Type I',
            mistake: 'im-wrong-type',
            why: 'The bounds are finite, so there is no infinite bound.',
          },
          {
            text: 'The integrand is even, so it equals $2\\displaystyle\\int_{0}^{1}\\frac{dx}{x^{2}}$ computed by the FTC',
            mistake: 'im-symmetric-limit',
            why: 'This still ignores the discontinuity at 0; symmetry does not remove the need for a limit.',
          },
          {
            text: 'Type II at the endpoints $\\pm 1$',
            mistake: 'im-wrong-type',
            why: 'The integrand equals 1 at both endpoints, so nothing blows up there.',
          },
        ],
        correct: 0,
        explanation: 'The singularity sits inside (−1, 1), so the integral must be split there.',
        result: { text: 'Type II at the interior point $x = 0$: split' },
        check: { kind: 'none', reason: 'type identification' },
      },
      {
        prompt: 'Write the set-up.',
        options: [
          {
            text: '$\\displaystyle\\lim_{s\\to 0^{-}} \\int_{-1}^{s} \\frac{dx}{x^{2}} + \\lim_{t\\to 0^{+}} \\int_{t}^{1} \\frac{dx}{x^{2}}$',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to 0} \\int_{-1}^{1} \\frac{dx}{x^{2}}$',
            mistake: 'im-split-mishandled',
            why: 'One two-sided limit does not separate the pieces on either side of the singularity.',
          },
          {
            text: '$\\left[-\\dfrac{1}{x}\\right]_{-1}^{1} = -2$',
            mistake: 'im-hidden-discontinuity',
            why: 'This applies the FTC straight across the blow-up at 0.',
          },
          {
            text: 'Only $\\displaystyle\\lim_{t\\to 0^{+}} \\int_{t}^{1}$; the left piece is the same by symmetry',
            mistake: 'im-one-half-only',
            why: 'Each piece needs its own limit, even though one divergent piece already settles the question.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to 0^{+}} \\int_{-1}^{t} \\frac{dx}{x^{2}}$',
            mistake: 'im-wrong-one-sided-limit',
            why: 'The left piece must approach 0 from the left, not from the right.',
          },
        ],
        correct: 0,
        explanation: 'An interior discontinuity splits the integral into two one-sided limits, and both must converge.',
        result: {
          latex: '\\lim_{t\\to 0^{+}} \\int_{t}^{1}\\frac{dx}{x^{2}} + \\lim_{s\\to 0^{-}} \\int_{-1}^{s}\\frac{dx}{x^{2}}',
        },
        check: { kind: 'none', reason: 'set-up' },
      },
      {
        prompt: 'Right piece: $\\displaystyle\\int_{t}^{1} \\frac{dx}{x^{2}} = ?$',
        options: [
          { latex: '\\dfrac{1}{t} - 1', expr: '1/t - 1' },
          {
            latex: '1 - \\dfrac{1}{t}',
            expr: '1 - 1/t',
            mistake: 'ftc-order-swapped',
            why: 'F(1) − F(t) with F = −1/x gives −1 + 1/t, so this has the order reversed.',
          },
          {
            latex: '-\\dfrac{1}{t}',
            expr: '-1/t',
            mistake: 'ftc-not-subtracted',
            why: 'Evaluated F only at the bound t, F(t) = −1/t, instead of forming F(1) − F(t).',
          },
          {
            latex: '\\ln t',
            expr: 'log(t)',
            mistake: 'ln-misapplied',
            why: 'This is the shape of the result for 1/x, and it even has the wrong sign.',
          },
          {
            latex: '\\dfrac{1}{t^{2}} - 1',
            expr: '1/t^2 - 1',
            mistake: 'power-rule-int-exponent',
            why: 'The antiderivative of x^{−2} is −x^{−1}, not a power of 1/t².',
          },
        ],
        correct: 0,
        explanation: '[−1/x] from t to 1 equals −1 + 1/t.',
        result: { latex: '= \\lim_{t\\to 0^{+}} \\left(\\frac{1}{t} - 1\\right)' },
        check: { kind: 'identity', lhs: '1/t - 1' },
        variable: 't',
        domain: [0.01, 0.9],
      },
      {
        prompt: 'Evaluate and conclude.',
        options: [
          { text: '$\\dfrac{1}{t} - 1 \\to \\infty$: diverges' },
          {
            text: '$\\dfrac{1}{t} - 1 \\to -1$: converges to $-1$',
            mistake: 'im-limit-evaluated-wrong',
            why: 'As t → 0⁺ the term 1/t tends to ∞, so it does not vanish.',
          },
          {
            text: '$\\dfrac{1}{t} - 1 \\to \\infty$, but the left piece might cancel it',
            mistake: 'im-split-mishandled',
            why: 'One divergent piece is enough to make the integral diverge; nothing cancels.',
          },
          {
            text: '$-2$ by the FTC',
            mistake: 'im-hidden-discontinuity',
            why: 'The FTC does not apply across a discontinuity inside the interval.',
          },
          {
            text: '$\\dfrac{1}{t} - 1 \\to \\infty$: converges to $\\infty$',
            mistake: 'im-divergent-called-convergent',
            why: 'An infinite limit means the integral diverges; it never converges to infinity.',
          },
        ],
        correct: 0,
        explanation: 'The right piece diverges, so the whole integral diverges (and −2 was never possible for a positive integrand).',
        result: { text: 'Diverges' },
        check: { kind: 'improper-integral', integrand: '1/x^2', lower: '-1', upper: '1', converges: false, split: ['0'] },
      },
    ],
    final: {
      latex: '\\text{diverges}',
      check: { kind: 'improper-integral', integrand: '1/x^2', lower: '-1', upper: '1', converges: false, split: ['0'] },
      recap:
        'Spot the interior discontinuity at 0 → split into two one-sided limits → the right piece gives $\\frac{1}{t} - 1 \\to \\infty$ → diverges; the FTC answer $-2$ is the trap.',
    },
  },

  // ───────────────────────── im-s-07: ∫₀^∞ x e^{-x²} dx ─────────────────────────
  {
    id: 'im-s-07',
    topic: 'improper',
    title: 'Substitution inside the limit',
    difficulty: 2,
    statement: { text: 'Evaluate or show divergence.', latex: '\\int_{0}^{\\infty} x e^{-x^{2}}\\,dx' },
    steps: [
      {
        prompt: 'Type I. Write it as a limit.',
        options: [
          { text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{0}^{t} x e^{-x^{2}}\\,dx$' },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{-t}^{t} x e^{-x^{2}}\\,dx$',
            mistake: 'im-symmetric-limit',
            why: 'The interval is [0, ∞), not the whole line, so a symmetric limit is the wrong set-up.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{t}^{\\infty} x e^{-x^{2}}\\,dx$',
            mistake: 'im-plug-infinity',
            why: 'The infinity is still left as a bound; it must be replaced by the variable t.',
          },
          {
            text: '$\\left[-\\tfrac{1}{2}e^{-x^{2}}\\right]_{0}^{\\infty}$ directly',
            mistake: 'im-plug-infinity',
            why: 'Infinity is never plugged into the antiderivative; a limit must be taken instead.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to 0^{+}} \\int_{t}^{\\infty} x e^{-x^{2}}\\,dx$',
            mistake: 'im-wrong-type',
            why: 'The endpoint 0 is perfectly fine, so no limit at 0 is needed.',
          },
        ],
        correct: 0,
        explanation: 'Replace the infinite bound by t.',
        result: { latex: '= \\lim_{t\\to\\infty} \\int_{0}^{t} x e^{-x^{2}}\\,dx' },
        check: { kind: 'none', reason: 'limit set-up' },
      },
      {
        prompt: 'Find the antiderivative of $x e^{-x^{2}}$.',
        options: [
          { latex: '-\\frac{1}{2}e^{-x^{2}} + C', expr: '-1/2*exp(-x^2) + C' },
          {
            latex: '\\frac{1}{2}e^{-x^{2}} + C',
            expr: '1/2*exp(-x^2) + C',
            mistake: 'sign-error',
            why: 'The derivative of e^{−x²} is −2x e^{−x²}, so the minus sign must stay.',
          },
          {
            latex: '-e^{-x^{2}} + C',
            expr: '-exp(-x^2) + C',
            mistake: 'du-constant-wrong',
            why: 'With u = x², du = 2x dx, so a factor 1/2 is needed.',
          },
          {
            latex: '\\frac{x^{2}}{2}e^{-x^{2}} + C',
            expr: 'x^2/2*exp(-x^2) + C',
            mistake: 'product-rule-integral',
            why: 'The factors x and e^{−x²} were integrated separately and multiplied.',
          },
          {
            latex: '-\\frac{1}{2x}e^{-x^{2}} + C',
            expr: '-1/(2*x)*exp(-x^2) + C',
            mistake: 'inner-constant-factor-missing',
            why: 'The result was divided by the inner derivative 2x instead of substituting.',
          },
        ],
        correct: 0,
        explanation: 'With u = x², du = 2x dx, so ∫ x e^{−x²} dx = (1/2)∫ e^{−u} du = −(1/2)e^{−x²}.',
        result: { latex: '\\int x e^{-x^{2}}\\,dx = -\\frac{1}{2}e^{-x^{2}} + C' },
        check: { kind: 'antiderivative', integrand: 'x*exp(-x^2)' },
      },
      {
        prompt: 'Apply the FTC: $\\displaystyle\\int_{0}^{t} x e^{-x^{2}}\\,dx = ?$',
        options: [
          { latex: '\\dfrac{1}{2} - \\dfrac{1}{2}e^{-t^{2}}', expr: '1/2 - 1/2*exp(-t^2)' },
          {
            latex: '\\dfrac{1}{2}e^{-t^{2}} - \\dfrac{1}{2}',
            expr: '1/2*exp(-t^2) - 1/2',
            mistake: 'ftc-order-swapped',
            why: 'This is F(0) − F(t); the FTC needs F(t) − F(0).',
          },
          {
            latex: '-\\dfrac{1}{2}e^{-t^{2}}',
            expr: '-1/2*exp(-t^2)',
            mistake: 'ftc-not-subtracted',
            why: 'F(0) = −1/2 must be subtracted from F(t), which was skipped here.',
          },
          {
            latex: '1 - e^{-t^{2}}',
            expr: '1 - exp(-t^2)',
            mistake: 'du-constant-wrong',
            why: 'The factor 1/2 from the substitution was dropped.',
          },
          {
            latex: '\\dfrac{1}{2} - \\dfrac{1}{2}e^{-t}',
            expr: '1/2 - 1/2*exp(-t)',
            mistake: 'back-substitution-wrong',
            why: 'Since u = x², the exponent at the upper bound is −t², not −t.',
          },
          {
            latex: '\\dfrac{1}{2}e^{-t} - \\dfrac{1}{2}',
            expr: '1/2*exp(-t) - 1/2',
            mistake: 'back-substitution-wrong',
            why: 'Used e^{−t} instead of e^{−t²} at the upper bound and also computed F(0) − F(t).',
          },
        ],
        correct: 0,
        explanation: 'F(t) − F(0) equals −(1/2)e^{−t²} + 1/2.',
        result: { latex: '= \\lim_{t\\to\\infty} \\left(\\frac{1}{2} - \\frac{1}{2}e^{-t^{2}}\\right)' },
        check: { kind: 'identity', lhs: '1/2 - 1/2*exp(-t^2)' },
        variable: 't',
        domain: [0.5, 3],
      },
      {
        prompt: 'Evaluate the limit.',
        options: [
          { latex: '\\frac{1}{2}', expr: '1/2' },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-limit-evaluated-wrong',
            why: 'Only e^{−t²} tends to 0, so the limit is 1/2, not 0.',
          },
          { latex: '1', expr: '1', mistake: 'du-constant-wrong', why: 'The factor 1/2 from the substitution was forgotten.' },
          { latex: '-\\frac{1}{2}', expr: '-1/2', mistake: 'sign-error', why: 'A sign slip turned the limit 1/2 into −1/2.' },
          {
            latex: '\\frac{1}{2} - \\frac{1}{2e}',
            expr: '1/2 - 1/(2*e)',
            mistake: 'im-limit-evaluated-wrong',
            why: 'This plugs in t = 1 instead of taking the limit as t → ∞.',
          },
        ],
        correct: 0,
        explanation: 'e^{−t²} → 0, so the integral converges to 1/2.',
        result: { latex: '= \\frac{1}{2}' },
        check: { kind: 'value', expected: '1/2' },
      },
    ],
    final: {
      latex: '\\frac{1}{2}',
      expr: '1/2',
      check: { kind: 'improper-integral', integrand: 'x*exp(-x^2)', lower: '0', upper: 'inf', converges: true, value: '1/2' },
      recap: 'Type I → limit → $u = x^2$ inside → $\\frac{1}{2} - \\frac{1}{2}e^{-t^2}$ → $\\frac{1}{2}$.',
    },
  },

  // ───────────────────────── im-s-08: ∫₂^∞ dx/(x ln x) ─────────────────────────
  {
    id: 'im-s-08',
    topic: 'improper',
    title: 'Logarithmic substitution, divergent',
    difficulty: 2,
    statement: { text: 'Evaluate or show divergence.', latex: '\\int_{2}^{\\infty} \\frac{dx}{x\\ln x}' },
    steps: [
      {
        prompt: 'Type I. Write it as a limit.',
        options: [
          { text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{2}^{t} \\frac{dx}{x\\ln x}$' },
          {
            text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{t}^{\\infty} \\frac{dx}{x\\ln x}$',
            mistake: 'im-plug-infinity',
            why: 'The infinity is still left as a bound; it must be replaced by the variable t.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to 2^{+}} \\int_{t}^{\\infty} \\frac{dx}{x\\ln x}$',
            mistake: 'im-wrong-type',
            why: 'Since ln 2 ≠ 0, the integrand is fine at 2 and no limit at 2 is needed.',
          },
          {
            text: '$\\displaystyle\\lim_{t\\to 1^{+}} \\int_{t}^{\\infty} \\frac{dx}{x\\ln x}$',
            mistake: 'im-wrong-type',
            why: 'The point 1 is not in the interval [2, ∞), so the blow-up of 1/(x ln x) there is irrelevant.',
          },
          {
            text: '$\\left[\\ln(\\ln x)\\right]_{2}^{\\infty}$ directly',
            mistake: 'im-plug-infinity',
            why: 'Infinity is never plugged into the antiderivative; a limit must be taken instead.',
          },
        ],
        correct: 0,
        explanation: 'Replace the infinite bound by t.',
        result: { latex: '= \\lim_{t\\to\\infty} \\int_{2}^{t} \\frac{dx}{x\\ln x}' },
        check: { kind: 'none', reason: 'limit set-up' },
      },
      {
        prompt: 'Find the antiderivative with $u = \\ln x$.',
        options: [
          { latex: '\\ln|\\ln x| + C', expr: 'log(abs(log(x))) + C' },
          {
            latex: '\\dfrac{(\\ln x)^{2}}{2} + C',
            expr: 'log(x)^2/2 + C',
            mistake: 'du-derivative-wrong',
            why: 'After substituting, the integral is ∫ du/u = ln|u|, not u²/2.',
          },
          {
            latex: '\\ln x \\cdot \\ln|\\ln x| + C',
            expr: 'log(x)*log(abs(log(x))) + C',
            mistake: 'leftover-x-in-u-integral',
            why: 'The factor 1/x became du, so nothing else should remain in front of the logarithm.',
          },
          {
            latex: '-\\dfrac{1}{\\ln x} + C',
            expr: '-1/log(x) + C',
            mistake: 'power-rule-int-exponent',
            why: 'This is the antiderivative of 1/(x ln²x), not of 1/(x ln x).',
          },
          {
            latex: '\\ln(x\\ln x) + C',
            expr: 'log(x*log(x)) + C',
            mistake: 'ln-misapplied',
            why: 'The integral of 1/g is not ln g in general; this ignores the chain rule.',
          },
        ],
        correct: 0,
        explanation: 'With u = ln x, du = dx/x, so the integral becomes ∫ du/u = ln|u|.',
        result: { latex: '\\int \\frac{dx}{x\\ln x} = \\ln(\\ln x) + C' },
        check: { kind: 'antiderivative', integrand: '1/(x*log(x))' },
        domain: [2, 6],
      },
      {
        prompt: 'Apply the FTC: $\\displaystyle\\int_{2}^{t} \\frac{dx}{x\\ln x} = ?$',
        options: [
          { latex: '\\ln(\\ln t) - \\ln(\\ln 2)', expr: 'log(log(t)) - log(log(2))' },
          {
            latex: '\\ln(\\ln t)',
            expr: 'log(log(t))',
            mistake: 'ftc-not-subtracted',
            why: 'F(2) = ln(ln 2) is not 0, so it must still be subtracted.',
          },
          {
            latex: '\\ln(\\ln 2) - \\ln(\\ln t)',
            expr: 'log(log(2)) - log(log(t))',
            mistake: 'ftc-order-swapped',
            why: 'This is F(2) − F(t); the FTC needs F(t) − F(2).',
          },
          {
            latex: '\\ln t - \\ln 2',
            expr: 'log(t) - log(2)',
            mistake: 'not-back-substituted',
            why: 'The antiderivative is ln(ln x), so the inner logarithm must be kept.',
          },
          {
            latex: '\\ln(\\ln t) - \\ln 2',
            expr: 'log(log(t)) - log(2)',
            mistake: 'arithmetic-error',
            why: 'F(2) equals ln(ln 2), not ln 2.',
          },
        ],
        correct: 0,
        explanation: 'The FTC gives F(t) − F(2) with F(x) = ln(ln x).',
        result: { latex: '= \\lim_{t\\to\\infty} \\left[\\ln(\\ln t) - \\ln(\\ln 2)\\right]' },
        check: { kind: 'identity', lhs: 'log(log(t)) - log(log(2))' },
        variable: 't',
        domain: [3, 20],
      },
      {
        prompt: 'Evaluate the limit and conclude.',
        options: [
          { text: '$\\ln(\\ln t) \\to \\infty$: diverges' },
          {
            text: '$\\ln(\\ln t) \\to 0$: converges to $-\\ln(\\ln 2)$',
            mistake: 'im-limit-evaluated-wrong',
            why: 'ln(ln t) grows without bound, though slowly, so it does not tend to 0.',
          },
          {
            text: 'Converges because the integrand $\\to 0$',
            mistake: 'im-p-rule-wrong',
            why: 'An integrand tending to 0 does not guarantee convergence of the integral.',
          },
          {
            text: 'Converges to $\\infty$',
            mistake: 'im-divergent-called-convergent',
            why: 'An infinite limit means the integral diverges; it never converges to infinity.',
          },
          {
            text: 'Diverges because $\\ln(\\ln 2) < 0$',
            mistake: 'im-limit-evaluated-wrong',
            why: 'The verdict is right but the reason is invalid; divergence comes from ln(ln t) → ∞.',
          },
        ],
        correct: 0,
        explanation: 'ln(ln t) → ∞, so the limit is not finite.',
        result: { text: 'Diverges' },
        check: { kind: 'improper-integral', integrand: '1/(x*log(x))', lower: '2', upper: 'inf', converges: false },
      },
    ],
    final: {
      latex: '\\text{diverges}',
      check: { kind: 'improper-integral', integrand: '1/(x*log(x))', lower: '2', upper: 'inf', converges: false },
      recap: 'Type I → limit → $u = \\ln x$ gives $\\ln(\\ln x)$ → $\\ln(\\ln t) \\to \\infty$ → diverges.',
    },
  },

  // ───────────────────────── im-s-09: ∫₀⁴ dx/√(4−x) ─────────────────────────
  {
    id: 'im-s-09',
    topic: 'improper',
    title: 'Type II at the upper endpoint',
    difficulty: 1,
    statement: { text: 'Evaluate or show divergence.', latex: '\\int_{0}^{4} \\frac{dx}{\\sqrt{4-x}}' },
    steps: [
      {
        prompt: 'Identify the type and write the limit.',
        options: [
          { text: 'Type II at $x = 4$: $\\displaystyle\\lim_{t\\to 4^{-}} \\int_{0}^{t} \\frac{dx}{\\sqrt{4-x}}$' },
          {
            text: 'Type II at $x = 0$: $\\displaystyle\\lim_{t\\to 0^{+}} \\int_{t}^{4} \\frac{dx}{\\sqrt{4-x}}$',
            mistake: 'im-wrong-type',
            why: 'The integrand equals 1/2 at x = 0, so nothing blows up there.',
          },
          {
            text: 'Type II at $x = 4$: $\\displaystyle\\lim_{t\\to 4^{+}} \\int_{0}^{t} \\frac{dx}{\\sqrt{4-x}}$',
            mistake: 'im-wrong-one-sided-limit',
            why: 'The limit must approach 4 from inside the interval [0, 4], that is from the left.',
          },
          {
            text: 'Not improper: apply the FTC on $[0, 4]$',
            mistake: 'im-hidden-discontinuity',
            why: 'The integrand blows up at the endpoint 4, so a limit is required.',
          },
          {
            text: 'Type I: $\\displaystyle\\lim_{t\\to\\infty} \\int_{0}^{t} \\frac{dx}{\\sqrt{4-x}}$',
            mistake: 'im-wrong-type',
            why: 'Both bounds are finite, so there is no infinite bound.',
          },
        ],
        correct: 0,
        explanation: 'The integrand blows up at the upper endpoint 4.',
        result: { latex: '= \\lim_{t\\to 4^{-}} \\int_{0}^{t} \\frac{dx}{\\sqrt{4-x}}' },
        check: { kind: 'none', reason: 'type and set-up' },
      },
      {
        prompt: 'Find the antiderivative.',
        options: [
          { latex: '-2\\sqrt{4-x} + C', expr: '-2*sqrt(4-x) + C' },
          {
            latex: '2\\sqrt{4-x} + C',
            expr: '2*sqrt(4-x) + C',
            mistake: 'sign-error',
            why: 'The inner derivative of 4 − x is −1, which supplies a minus sign.',
          },
          {
            latex: '-\\sqrt{4-x} + C',
            expr: '-sqrt(4-x) + C',
            mistake: 'power-rule-int-coefficient',
            why: 'The integral of u^{−1/2} is 2u^{1/2}, so the factor 2 was lost.',
          },
          {
            latex: '-\\dfrac{1}{2\\sqrt{4-x}} + C',
            expr: '-1/(2*sqrt(4-x)) + C',
            mistake: 'differentiated-instead',
            why: 'This is shaped like a derivative, not an antiderivative.',
          },
          {
            latex: '-2\\sqrt{4-x}\\cdot x + C',
            expr: '-2*sqrt(4-x)*x + C',
            mistake: 'leftover-x-in-u-integral',
            why: 'No stray x should remain after the substitution.',
          },
        ],
        correct: 0,
        explanation: 'With u = 4 − x, du = −dx, so ∫ u^{−1/2}(−du) = −2√u.',
        result: { latex: '\\int \\frac{dx}{\\sqrt{4-x}} = -2\\sqrt{4-x} + C' },
        check: { kind: 'antiderivative', integrand: '1/sqrt(4-x)' },
        domain: [0, 3],
      },
      {
        prompt: 'Apply the FTC: $\\displaystyle\\int_{0}^{t} \\frac{dx}{\\sqrt{4-x}} = ?$',
        options: [
          { latex: '4 - 2\\sqrt{4-t}', expr: '4 - 2*sqrt(4-t)' },
          {
            latex: '2\\sqrt{4-t} - 4',
            expr: '2*sqrt(4-t) - 4',
            mistake: 'ftc-order-swapped',
            why: 'This is F(0) − F(t); the FTC needs F(t) − F(0).',
          },
          {
            latex: '-2\\sqrt{4-t}',
            expr: '-2*sqrt(4-t)',
            mistake: 'ftc-not-subtracted',
            why: 'F(0) = −4 must be subtracted from F(t), which was skipped here.',
          },
          {
            latex: '2 - 2\\sqrt{4-t}',
            expr: '2 - 2*sqrt(4-t)',
            mistake: 'arithmetic-error',
            why: 'F(0) = −2√4 = −4, not −2.',
          },
          {
            latex: '4 - \\sqrt{4-t}',
            expr: '4 - sqrt(4-t)',
            mistake: 'power-rule-int-coefficient',
            why: 'The factor 2 belongs to both terms, but it was dropped from the t term.',
          },
        ],
        correct: 0,
        explanation: 'F(t) − F(0) equals −2√(4 − t) + 4.',
        result: { latex: '= \\lim_{t\\to 4^{-}} \\left(4 - 2\\sqrt{4-t}\\right)' },
        check: { kind: 'identity', lhs: '4 - 2*sqrt(4-t)' },
        variable: 't',
        domain: [0.5, 3.9],
      },
      {
        prompt: 'Evaluate the limit.',
        options: [
          { latex: '4', expr: '4' },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-plug-infinity',
            why: 'This plugs t = 4 into the wrong term and stops, instead of evaluating the whole limit.',
          },
          { latex: '-4', expr: '-4', mistake: 'sign-error', why: 'A sign slip turned the limit 4 into −4.' },
          { latex: '2', expr: '2', mistake: 'arithmetic-error', why: 'The result 4 was halved by mistake.' },
          { latex: '8', expr: '8', mistake: 'arithmetic-error', why: 'The result 4 was doubled by mistake.' },
        ],
        correct: 0,
        explanation: '√(4 − t) → 0 as t → 4⁻, so the integral converges to 4.',
        result: { latex: '= 4' },
        check: { kind: 'value', expected: '4' },
      },
    ],
    final: {
      latex: '4',
      expr: '4',
      check: { kind: 'improper-integral', integrand: '1/sqrt(4-x)', lower: '0', upper: '4', converges: true, value: '4' },
      recap: 'Type II at 4 → $\\lim_{t\\to 4^{-}}$ → $-2\\sqrt{4-x}$ → $4 - 2\\sqrt{4-t}$ → 4.',
    },
  },
];
