import type { FlashGenerator, FlashItem } from '../types';

/** Flash Drill items for topic "improper" (session 3, Phase B). */
export const flash: FlashItem[] = [
  // ───────────────────────── type identification ─────────────────────────
  {
    id: 'im-f-001',
    topic: 'improper',
    kind: 'concept',
    prompt: { text: 'Classify', latex: '\\int_{1}^{\\infty} \\frac{dx}{x^{3}}' },
    options: [
      { text: 'Type I: the interval $[1, \\infty)$ is unbounded' },
      {
        text: 'Type II: $\\dfrac{1}{x^{3}}$ blows up at $x = 0$',
        mistake: 'im-wrong-type',
        why: 'Looked at the point x = 0, which is not in the interval of integration [1, ∞), so it is irrelevant.',
      },
      {
        text: 'Both Type I and Type II',
        mistake: 'im-wrong-type',
        why: 'Claimed a second kind of problem, but there is no discontinuity anywhere on [1, ∞).',
      },
      {
        text: 'Not improper: $\\dfrac{1}{x^{3}}$ is continuous on $[1, \\infty)$',
        mistake: 'im-wrong-type',
        why: 'Assumed continuity is enough, but an infinite bound makes the integral improper regardless of continuity.',
      },
      {
        text: 'Type II: a discontinuity at the endpoint $x = 1$',
        mistake: 'im-wrong-type',
        why: 'Invented a discontinuity at the lower endpoint, but 1/x³ is finite at x = 1.',
      },
    ],
    correct: 0,
    explanation: 'Only the upper bound ∞ is "bad", so this is Type I.',
    check: { kind: 'none', reason: 'type identification' },
  },
  {
    id: 'im-f-002',
    topic: 'improper',
    kind: 'concept',
    prompt: { text: 'Classify', latex: '\\int_{0}^{1} \\frac{dx}{\\sqrt{x}}' },
    options: [
      { text: 'Type II: $\\dfrac{1}{\\sqrt{x}} \\to \\infty$ at the endpoint $x = 0$' },
      {
        text: 'Type I',
        mistake: 'im-wrong-type',
        why: 'Called it Type I, but both bounds are finite so the interval is not unbounded.',
      },
      {
        text: 'Not improper: the bounds are finite',
        mistake: 'im-wrong-type',
        why: 'Only checked the bounds, but an infinite discontinuity of the integrand also makes an integral improper.',
      },
      {
        text: 'Type II at $x = 1$',
        mistake: 'im-wrong-type',
        why: 'Put the discontinuity at the wrong endpoint, but the integrand equals 1 at x = 1.',
      },
      {
        text: 'Both Type I and Type II',
        mistake: 'im-wrong-type',
        why: 'Claimed both kinds, but neither bound is infinite so it cannot be Type I.',
      },
    ],
    correct: 0,
    explanation: 'The bounds are finite but the integrand has an infinite discontinuity at 0, so this is Type II.',
    check: { kind: 'none', reason: 'type identification' },
  },
  {
    id: 'im-f-003',
    topic: 'improper',
    kind: 'concept',
    prompt: { text: 'Classify', latex: '\\int_{-1}^{1} \\frac{dx}{x^{2}}' },
    options: [
      { text: 'Type II: an interior infinite discontinuity at $x = 0$; split there' },
      {
        text: 'Not improper: finite bounds, so apply the FTC',
        mistake: 'im-hidden-discontinuity',
        why: 'Missed that 1/x² blows up at 0, which lies inside the interval, so the FTC cannot be applied directly.',
      },
      {
        text: 'Not improper: $\\dfrac{1}{x^{2}}$ is even, so the two halves cancel the problem',
        mistake: 'im-symmetric-limit',
        why: 'Hoped symmetry removes the trouble, but symmetry never removes an interior discontinuity.',
      },
      {
        text: 'Not improper: $\\dfrac{1}{x^{2}}$ is continuous except at one point, which does not matter',
        mistake: 'im-wrong-type',
        why: 'Dismissed the single point of discontinuity, but one infinite discontinuity is exactly what makes a Type II integral.',
      },
      {
        text: 'Type II at the endpoints $x = \\pm 1$',
        mistake: 'im-wrong-type',
        why: 'Put the discontinuities at the endpoints, but the integrand equals 1 at both ends; the blow-up is at 0.',
      },
    ],
    correct: 0,
    explanation: 'The singularity sits inside (−1, 1), so split at 0 into two Type II integrals.',
    check: { kind: 'none', reason: 'type identification (hidden discontinuity)' },
  },
  {
    id: 'im-f-004',
    topic: 'improper',
    kind: 'concept',
    prompt: { text: 'Classify', latex: '\\int_{0}^{\\infty} e^{-x}\\,dx' },
    options: [
      { text: 'Type I: the interval is unbounded' },
      {
        text: 'Type II: a discontinuity at $x = 0$',
        mistake: 'im-wrong-type',
        why: 'Invented a discontinuity at 0, but e^{−x} is continuous everywhere.',
      },
      {
        text: 'Type II: $e^{-x}$ is undefined at $\\infty$',
        mistake: 'im-plug-infinity',
        why: 'Treated ∞ as a point where the function is evaluated, but ∞ is a bound, not a point.',
      },
      {
        text: 'Type II: $e^{-x} \\to 0$ as $x \\to \\infty$',
        mistake: 'im-wrong-type',
        why: 'Treated the integrand tending to 0 as a discontinuity, which it is not.',
      },
      {
        text: 'Not improper: the integrand is bounded',
        mistake: 'im-wrong-type',
        why: 'Assumed a bounded integrand fixes the problem, but boundedness does not fix an infinite interval.',
      },
    ],
    correct: 0,
    explanation: 'One infinite bound and a continuous integrand make this Type I.',
    check: { kind: 'none', reason: 'type identification' },
  },
  {
    id: 'im-f-005',
    topic: 'improper',
    kind: 'concept',
    prompt: { text: 'Classify', latex: '\\int_{0}^{\\pi/2} \\tan x\\,dx' },
    options: [
      { text: 'Type II at $x = \\tfrac{\\pi}{2}$' },
      {
        text: 'Not improper: finite bounds and a familiar integrand',
        mistake: 'im-hidden-discontinuity',
        why: 'Missed the vertical asymptote of tan x at the upper endpoint π/2.',
      },
      {
        text: 'Type I',
        mistake: 'im-wrong-type',
        why: 'Called it Type I, but both bounds are finite so the interval is not unbounded.',
      },
      {
        text: 'Type II at $x = 0$',
        mistake: 'im-wrong-type',
        why: 'Put the discontinuity at the lower endpoint, but tan 0 = 0 is finite.',
      },
      {
        text: 'Both Type I and Type II',
        mistake: 'im-wrong-type',
        why: 'Claimed both kinds, but neither bound is infinite so it cannot be Type I.',
      },
    ],
    correct: 0,
    explanation: 'tan x has a vertical asymptote at the upper endpoint, so this is Type II.',
    check: { kind: 'none', reason: 'type identification' },
  },
  {
    id: 'im-f-006',
    topic: 'improper',
    kind: 'concept',
    prompt: { text: 'Classify', latex: '\\int_{0}^{2} \\frac{dx}{x-1}' },
    options: [
      { text: 'Type II at the interior point $x = 1$' },
      {
        text: 'Not improper: $\\ln|x-1|$ handles the sign',
        mistake: 'im-hidden-discontinuity',
        why: 'Thought the absolute value in the antiderivative removes the problem, but it does not remove the blow-up at x = 1.',
      },
      {
        text: 'Type II at the endpoint $x = 0$',
        mistake: 'im-wrong-type',
        why: 'Put the discontinuity at the lower endpoint, but the integrand equals −1 at x = 0.',
      },
      {
        text: 'Type I',
        mistake: 'im-wrong-type',
        why: 'Called it Type I, but both bounds are finite so the interval is not unbounded.',
      },
      {
        text: 'Type II at the endpoint $x = 2$',
        mistake: 'im-wrong-type',
        why: 'Put the discontinuity at the upper endpoint, but the integrand equals 1 at x = 2.',
      },
    ],
    correct: 0,
    explanation: 'The point x = 1 lies inside (0, 2) and the integrand blows up there, so split at 1.',
    check: { kind: 'none', reason: 'type identification (interior point)' },
  },

  // ───────────────────────── limit set-up ─────────────────────────
  {
    id: 'im-f-007',
    topic: 'improper',
    kind: 'technique',
    prompt: { text: 'Rewrite this as a limit.', latex: '\\int_{2}^{\\infty} f(x)\\,dx' },
    options: [
      { text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{2}^{t} f(x)\\,dx$' },
      {
        text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{t}^{\\infty} f(x)\\,dx$',
        mistake: 'im-plug-infinity',
        why: 'Kept ∞ as a bound inside the limit instead of replacing it by the variable t.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to 2^{+}} \\int_{t}^{\\infty} f(x)\\,dx$',
        mistake: 'im-wrong-type',
        why: 'Treated the finite endpoint 2 as the bad one and kept ∞ as a bound.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to-\\infty} \\int_{t}^{\\infty} f(x)\\,dx$',
        mistake: 'im-wrong-one-sided-limit',
        why: 'Sent t to −∞ and kept ∞ as a bound inside the limit.',
      },
      {
        text: '$F(\\infty) - F(2)$',
        mistake: 'im-plug-infinity',
        why: 'Plugged ∞ into the antiderivative instead of taking a limit.',
      },
    ],
    correct: 0,
    explanation: 'Replace the infinite bound by t and let t → ∞.',
    check: { kind: 'none', reason: 'limit set-up' },
  },
  {
    id: 'im-f-008',
    topic: 'improper',
    kind: 'technique',
    prompt: { text: 'Rewrite this as a limit.', latex: '\\int_{-\\infty}^{0} f(x)\\,dx' },
    options: [
      { text: '$\\displaystyle\\lim_{t\\to-\\infty} \\int_{t}^{0} f(x)\\,dx$' },
      {
        text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{0}^{t} f(x)\\,dx$',
        mistake: 'im-wrong-one-sided-limit',
        why: 'Integrated over the wrong half-line, 0 to +∞, instead of −∞ to 0.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to 0^{-}} \\int_{-\\infty}^{t} f(x)\\,dx$',
        mistake: 'im-wrong-type',
        why: 'Treated 0 as the bad endpoint and kept −∞ as a bound inside the limit.',
      },
      {
        text: '$F(0) - F(-\\infty)$',
        mistake: 'im-plug-infinity',
        why: 'Plugged −∞ into the antiderivative instead of taking a limit.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to-\\infty} \\int_{0}^{t} f(x)\\,dx$',
        mistake: 'ftc-order-swapped',
        why: 'Wrote the bounds in the wrong order, which reverses the sign of the integral.',
      },
    ],
    correct: 0,
    explanation: 'Replace −∞ by t and let t → −∞.',
    check: { kind: 'none', reason: 'limit set-up' },
  },
  {
    id: 'im-f-009',
    topic: 'improper',
    kind: 'technique',
    prompt: { text: 'Rewrite this as a limit.', latex: '\\int_{0}^{3} \\frac{dx}{3-x}' },
    options: [
      { text: '$\\displaystyle\\lim_{t\\to 3^{-}} \\int_{0}^{t} \\frac{dx}{3-x}$' },
      {
        text: '$\\displaystyle\\lim_{t\\to 3^{+}} \\int_{0}^{t} \\frac{dx}{3-x}$',
        mistake: 'im-wrong-one-sided-limit',
        why: 'Approached 3 from outside the interval instead of from inside.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to 0^{+}} \\int_{t}^{3} \\frac{dx}{3-x}$',
        mistake: 'im-wrong-type',
        why: 'Treated 0 as the bad endpoint, but the blow-up is at 3.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{0}^{t} \\frac{dx}{3-x}$',
        mistake: 'im-wrong-type',
        why: 'Used a Type I limit (t → ∞) for a Type II integral.',
      },
      {
        text: '$\\displaystyle\\int_{0}^{3} \\frac{dx}{3-x}$ by the FTC directly',
        mistake: 'im-hidden-discontinuity',
        why: 'Missed the blow-up at x = 3 and applied the FTC straight through it.',
      },
    ],
    correct: 0,
    explanation: 'The discontinuity is at the upper endpoint b = 3, so the integral is $\\lim_{t\\to 3^{-}} \\int_{0}^{t}$.',
    check: { kind: 'none', reason: 'limit set-up' },
  },
  {
    id: 'im-f-010',
    topic: 'improper',
    kind: 'technique',
    prompt: { text: 'Rewrite this as a limit.', latex: '\\int_{1}^{5} \\frac{dx}{\\sqrt{x-1}}' },
    options: [
      { text: '$\\displaystyle\\lim_{t\\to 1^{+}} \\int_{t}^{5} \\frac{dx}{\\sqrt{x-1}}$' },
      {
        text: '$\\displaystyle\\lim_{t\\to 1^{-}} \\int_{t}^{5} \\frac{dx}{\\sqrt{x-1}}$',
        mistake: 'im-wrong-one-sided-limit',
        why: 'Approached 1 from outside the interval instead of from inside.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to 5^{-}} \\int_{1}^{t} \\frac{dx}{\\sqrt{x-1}}$',
        mistake: 'im-wrong-type',
        why: 'Treated 5 as the bad endpoint, but the blow-up is at 1.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{1}^{t} \\frac{dx}{\\sqrt{x-1}}$',
        mistake: 'im-wrong-type',
        why: 'Used a Type I limit (t → ∞) for a Type II integral.',
      },
      {
        text: '$\\displaystyle\\int_{1}^{5} \\frac{dx}{\\sqrt{x-1}}$ by the FTC directly',
        mistake: 'im-hidden-discontinuity',
        why: 'Missed the blow-up at x = 1 and applied the FTC straight through it.',
      },
    ],
    correct: 0,
    explanation: 'The discontinuity is at the lower endpoint a = 1, so the integral is $\\lim_{t\\to 1^{+}} \\int_{t}^{5}$.',
    check: { kind: 'none', reason: 'limit set-up' },
  },
  {
    id: 'im-f-011',
    topic: 'improper',
    kind: 'technique',
    prompt: { text: 'How must this integral be set up?', latex: '\\int_{-\\infty}^{\\infty} x e^{-x^{2}}\\,dx' },
    options: [
      {
        text: '$\\displaystyle\\lim_{s\\to-\\infty} \\int_{s}^{0} x e^{-x^{2}}\\,dx + \\lim_{t\\to\\infty} \\int_{0}^{t} x e^{-x^{2}}\\,dx$',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to\\infty} \\left(\\int_{-t}^{0} x e^{-x^{2}}\\,dx + \\int_{0}^{t} x e^{-x^{2}}\\,dx\\right)$',
        mistake: 'im-symmetric-limit',
        why: 'Split at 0 but used one shared t for both halves, which is still a single symmetric limit; each half needs its own limit.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{-t}^{t} x e^{-x^{2}}\\,dx$',
        mistake: 'im-symmetric-limit',
        why: 'Used one symmetric limit, which is never allowed for an integral over the whole line.',
      },
      {
        text: '$0$ by odd symmetry, no limits needed',
        mistake: 'im-symmetric-limit',
        why: 'Used symmetry up front, but it may be used only after both halves are shown to converge.',
      },
      {
        text: '$2\\displaystyle\\int_{0}^{\\infty} x e^{-x^{2}}\\,dx$',
        mistake: 'algebra-error',
        why: 'Doubled one half as if the integrand were even, but this integrand is odd.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to\\infty} \\int_{-\\infty}^{t} x e^{-x^{2}}\\,dx$',
        mistake: 'im-split-mishandled',
        why: 'Kept −∞ as a bound inside a single limit instead of splitting into two separate limits.',
      },
    ],
    correct: 0,
    explanation:
      'Split at any c (here 0) into two separate limits; it converges (to 0) because each half converges (to −1/2 and 1/2).',
    check: { kind: 'improper-integral', integrand: 'x*exp(-x^2)', lower: '-inf', upper: 'inf', converges: true, value: '0', split: ['0'] },
  },
  {
    id: 'im-f-012',
    topic: 'improper',
    kind: 'technique',
    prompt: { text: 'How must this integral be set up?', latex: '\\int_{0}^{3} \\frac{dx}{(x-1)^{2/3}}' },
    options: [
      { text: '$\\displaystyle\\lim_{s\\to 1^{-}} \\int_{0}^{s} + \\lim_{t\\to 1^{+}} \\int_{t}^{3}$' },
      {
        text: 'Apply the FTC straight through $x = 1$',
        mistake: 'im-hidden-discontinuity',
        why: 'Missed the blow-up at x = 1 inside the interval and ignored it.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to 1} \\int_{0}^{3} \\frac{dx}{(x-1)^{2/3}}$',
        mistake: 'im-split-mishandled',
        why: 'Used one two-sided limit, which does not separate the two pieces on either side of 1.',
      },
      {
        text: 'Only $\\displaystyle\\int_{1}^{3}$ needs a limit; $\\displaystyle\\int_{0}^{1}$ is fine',
        mistake: 'im-one-half-only',
        why: 'Treated only one piece as improper, but both pieces touch the discontinuity at 1.',
      },
      {
        text: '$\\displaystyle\\lim_{t\\to 1^{-}} \\int_{0}^{t} + \\int_{1}^{3}$ by the FTC',
        mistake: 'im-one-half-only',
        why: 'Gave only the left piece a limit, but the right piece also needs its own one-sided limit.',
      },
    ],
    correct: 0,
    explanation: 'An interior discontinuity splits the integral into two one-sided limits (s → 1⁻ and t → 1⁺); it converges only if both do.',
    check: { kind: 'none', reason: 'limit set-up with an interior discontinuity' },
  },

  // ───────────────────────── evaluate (numeric answers) ─────────────────────────
  {
    id: 'im-f-013',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\int_{2}^{\\infty} \\frac{dx}{x^{2}} = ?' },
    options: [
      { latex: '\\frac{1}{2}', expr: '1/2' },
      {
        latex: '-\\frac{1}{2}',
        expr: '-1/2',
        mistake: 'ftc-order-swapped',
        why: 'Computed F(2) − F(t) instead of F(t) − F(2), which flips the sign.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'im-plug-infinity',
        why: 'Wrote F(∞) = 0 and stopped, forgetting to subtract the lower-bound value.',
      },
      {
        latex: '\\frac{1}{8}',
        expr: '1/8',
        mistake: 'power-rule-int-exponent',
        why: 'Integrated x^{−2} as −1/(2x²) instead of −1/x, giving 1/(2·4) at the lower bound.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'arithmetic-error',
        why: 'Subtracted −1/2 twice when evaluating at the bounds.',
      },
    ],
    correct: 0,
    explanation: '$\\lim_{t\\to\\infty} \\left(\\frac{1}{2} - \\frac{1}{t}\\right) = \\frac{1}{2}$.',
    check: { kind: 'improper-integral', integrand: '1/x^2', lower: '2', upper: 'inf', converges: true, value: '1/2' },
  },
  {
    id: 'im-f-014',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\int_{2}^{\\infty} \\frac{dx}{x^{3}} = ?' },
    options: [
      { latex: '\\frac{1}{8}', expr: '1/8' },
      {
        latex: '-\\frac{1}{8}',
        expr: '-1/8',
        mistake: 'ftc-order-swapped',
        why: 'Computed F(2) − F(t) instead of F(t) − F(2), which flips the sign.',
      },
      {
        latex: '-\\frac{1}{2}',
        expr: '-1/2',
        mistake: 'power-rule-int-exponent',
        why: 'Treated it like the integral of 1/x², which gives 1/2 from 2 to ∞, and also swapped the FTC order.',
      },
      {
        latex: '\\frac{1}{12}',
        expr: '1/12',
        mistake: 'power-rule-int-coefficient',
        why: 'Divided by the old exponent −3 instead of the new exponent −2, so used −1/(3x²) as the antiderivative.',
      },
      {
        latex: '-\\frac{1}{12}',
        expr: '-1/12',
        mistake: 'power-rule-int-coefficient',
        why: 'Divided by the old exponent −3 instead of the new exponent −2, and also swapped the FTC order.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'im-plug-infinity',
        why: 'Wrote F(∞) = 0 and stopped, forgetting to subtract the lower-bound value.',
      },
    ],
    correct: 0,
    explanation: '$\\int x^{-3}\\,dx = -\\frac{1}{2x^{2}}$, and $\\lim_{t\\to\\infty} \\left(\\frac{1}{8} - \\frac{1}{2t^{2}}\\right) = \\frac{1}{8}$.',
    check: { kind: 'improper-integral', integrand: '1/x^3', lower: '2', upper: 'inf', converges: true, value: '1/8' },
  },
  {
    id: 'im-f-015',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\int_{0}^{\\infty} e^{-x/3}\\,dx = ?' },
    options: [
      { latex: '3', expr: '3' },
      {
        latex: '-3',
        expr: '-3',
        mistake: 'sign-error',
        why: 'Lost the minus sign of the antiderivative −3e^{−x/3} when evaluating.',
      },
      {
        latex: '-1',
        expr: '-1',
        mistake: 'inner-constant-factor-missing',
        why: 'Forgot the factor 3 = 1/k that comes from the inner derivative of −x/3, and lost the sign.',
      },
      {
        latex: '-\\frac{1}{3}',
        expr: '-1/3',
        mistake: 'du-constant-wrong',
        why: 'Multiplied by 1/3 instead of dividing by 1/3 for the inner constant, and lost the sign.',
      },
      {
        latex: '\\frac{1}{3}',
        expr: '1/3',
        mistake: 'inner-constant-factor-missing',
        why: 'Multiplied by 1/3 instead of dividing by 1/3 for the inner constant, so used −(1/3)e^{−x/3} as the antiderivative.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'im-limit-evaluated-wrong',
        why: 'Took e^{−t/3} → 1 as t → ∞ instead of → 0, so everything cancelled.',
      },
    ],
    correct: 0,
    explanation: '$-3e^{-t/3} + 3 \\to 3$ as $t \\to \\infty$.',
    check: { kind: 'improper-integral', integrand: 'exp(-x/3)', lower: '0', upper: 'inf', converges: true, value: '3' },
  },
  {
    id: 'im-f-016',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\int_{0}^{\\infty} x e^{-x^{2}}\\,dx = ?' },
    options: [
      { latex: '\\frac{1}{2}', expr: '1/2' },
      {
        latex: '-\\frac{1}{2}',
        expr: '-1/2',
        mistake: 'sign-error',
        why: 'Lost the minus sign of the antiderivative −(1/2)e^{−x²} when evaluating.',
      },
      {
        latex: '-1',
        expr: '-1',
        mistake: 'du-constant-wrong',
        why: 'Forgot the factor 1/2 coming from du = 2x dx, and lost the sign.',
      },
      {
        latex: '\\frac{1}{4}',
        expr: '1/4',
        mistake: 'arithmetic-error',
        why: 'Halved twice, applying the factor 1/2 from du = 2x dx two times.',
      },
      {
        latex: '-\\frac{1}{4}',
        expr: '-1/4',
        mistake: 'arithmetic-error',
        why: 'Halved twice, applying the factor 1/2 two times, and lost the sign.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'im-plug-infinity',
        why: 'Wrote F(∞) = 0 and stopped, forgetting to subtract the lower-bound value.',
      },
    ],
    correct: 0,
    explanation: 'With $u = x^{2}$: $-\\frac{1}{2}e^{-t^{2}} + \\frac{1}{2} \\to \\frac{1}{2}$.',
    check: { kind: 'improper-integral', integrand: 'x*exp(-x^2)', lower: '0', upper: 'inf', converges: true, value: '1/2' },
  },
  {
    id: 'im-f-017',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\int_{0}^{1} \\frac{dx}{\\sqrt{x}} = ?' },
    options: [
      { latex: '2', expr: '2' },
      {
        latex: '1',
        expr: '1',
        mistake: 'power-rule-int-coefficient',
        why: 'Integrated x^{−1/2} as x^{1/2} without the factor 2 from dividing by 1/2.',
      },
      {
        latex: '-2',
        expr: '-2',
        mistake: 'ftc-order-swapped',
        why: 'Computed F(t) − F(1) instead of F(1) − F(t), which flips the sign.',
      },
      {
        latex: '\\frac{1}{2}',
        expr: '1/2',
        mistake: 'arithmetic-error',
        why: 'Divided by 2 instead of multiplying, since dividing by the exponent 1/2 means multiplying by 2.',
      },
      {
        latex: '-1',
        expr: '-1',
        mistake: 'power-rule-int-coefficient',
        why: 'Used x^{1/2} without the factor 2 from dividing by 1/2, and also swapped the FTC order.',
      },
    ],
    correct: 0,
    explanation: '$\\lim_{t\\to 0^{+}} \\left(2 - 2\\sqrt{t}\\right) = 2$.',
    check: { kind: 'improper-integral', integrand: '1/sqrt(x)', lower: '0', upper: '1', converges: true, value: '2' },
  },
  {
    id: 'im-f-018',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\int_{0}^{4} \\frac{dx}{\\sqrt{4-x}} = ?' },
    options: [
      { latex: '4', expr: '4' },
      {
        latex: '-4',
        expr: '-4',
        mistake: 'sign-error',
        why: 'Missed the sign that comes from the inner derivative of 4 − x.',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'power-rule-int-coefficient',
        why: 'Dropped the factor 2 in the antiderivative −2√(4 − x).',
      },
      {
        latex: '-2',
        expr: '-2',
        mistake: 'power-rule-int-coefficient',
        why: 'Dropped the factor 2 in the antiderivative −2√(4 − x) and also missed the minus sign from the inner derivative of 4 − x.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'im-plug-infinity',
        why: 'Plugged in x = 4, got 0, and stopped without subtracting the lower-bound value.',
      },
    ],
    correct: 0,
    explanation: '$-2\\sqrt{4-t} + 2\\sqrt{4} \\to 4$ as $t \\to 4^{-}$.',
    check: { kind: 'improper-integral', integrand: '1/sqrt(4-x)', lower: '0', upper: '4', converges: true, value: '4' },
  },
  {
    id: 'im-f-019',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\int_{1}^{\\infty} \\frac{dx}{1+x^{2}} = ?' },
    options: [
      { latex: '\\frac{\\pi}{4}', expr: 'pi/4' },
      {
        latex: '-\\frac{\\pi}{4}',
        expr: '-pi/4',
        mistake: 'ftc-order-swapped',
        why: 'Computed arctan 1 − arctan t instead of arctan t − arctan 1.',
      },
      {
        latex: '-\\frac{\\pi}{2}',
        expr: '-pi/2',
        mistake: 'inverse-trig-value-wrong',
        why: 'Dropped the arctan 1 term at the lower bound and also swapped the FTC order.',
      },
      {
        latex: '-\\frac{3\\pi}{4}',
        expr: '-3*pi/4',
        mistake: 'arithmetic-error',
        why: 'Added π/4 instead of subtracting it, with the FTC order swapped.',
      },
      {
        latex: '\\frac{\\pi}{2}',
        expr: 'pi/2',
        mistake: 'inverse-trig-value-wrong',
        why: 'Forgot to subtract arctan 1 = π/4 at the lower bound.',
      },
    ],
    correct: 0,
    explanation: '$\\lim_{t\\to\\infty} (\\arctan t - \\arctan 1) = \\frac{\\pi}{2} - \\frac{\\pi}{4} = \\frac{\\pi}{4}$.',
    check: { kind: 'improper-integral', integrand: '1/(1+x^2)', lower: '1', upper: 'inf', converges: true, value: 'pi/4' },
  },
  {
    id: 'im-f-020',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\int_{-\\infty}^{\\infty} \\frac{dx}{1+x^{2}} = ?' },
    options: [
      { latex: '\\pi', expr: 'pi' },
      {
        latex: '-\\pi',
        expr: '-pi',
        mistake: 'sign-error',
        why: 'Subtracted the two halves in the wrong order.',
      },
      {
        latex: '-\\frac{\\pi}{2}',
        expr: '-pi/2',
        mistake: 'im-one-half-only',
        why: 'Computed only one half of the integral and lost the sign.',
      },
      {
        latex: '-2\\pi',
        expr: '-2*pi',
        mistake: 'arithmetic-error',
        why: 'Doubled π instead of doubling the half-line value π/2, and lost the sign.',
      },
      {
        latex: '\\frac{\\pi}{2}',
        expr: 'pi/2',
        mistake: 'im-one-half-only',
        why: 'Computed only one half, the integral from 0 to ∞, and forgot the other half.',
      },
    ],
    correct: 0,
    explanation: 'Split at 0: each half equals π/2 and both converge, so the total is π.',
    check: { kind: 'improper-integral', integrand: '1/(1+x^2)', lower: '-inf', upper: 'inf', converges: true, value: 'pi', split: ['0'] },
  },
  {
    id: 'im-f-021',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\int_{0}^{1} \\ln x\\,dx = ?' },
    options: [
      { latex: '-1', expr: '-1' },
      {
        latex: '1',
        expr: '1',
        mistake: 'sign-error',
        why: 'Lost the sign of x ln x − x when evaluating at x = 1.',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'arithmetic-error',
        why: 'Counted the −x term twice and lost the sign.',
      },
      {
        latex: '\\frac{1}{2}',
        expr: '1/2',
        mistake: 'ibp-formula-wrong',
        why: 'Used x ln x − x/2 as the antiderivative of ln x and lost the sign.',
      },
      {
        latex: '-\\frac{1}{2}',
        expr: '-1/2',
        mistake: 'ibp-formula-wrong',
        why: 'Used x ln x − x/2 as the antiderivative of ln x.',
      },
    ],
    correct: 0,
    explanation:
      '$\\int \\ln x\\,dx = x\\ln x - x$, and $\\lim_{t\\to 0^{+}} \\left[(0 - 1) - (t\\ln t - t)\\right] = -1$ since $t\\ln t \\to 0$.',
    check: { kind: 'improper-integral', integrand: 'log(x)', lower: '0', upper: '1', converges: true, value: '-1' },
  },

  // ───────────────────────── convergence verdicts ─────────────────────────
  {
    id: 'im-f-022',
    topic: 'improper',
    kind: 'concept',
    prompt: { latex: '\\int_{1}^{\\infty} \\frac{dx}{x}' },
    options: [
      { text: 'Diverges: $\\displaystyle\\lim_{t\\to\\infty} \\ln t = \\infty$' },
      {
        text: 'Converges to $0$: $\\dfrac{1}{x} \\to 0$',
        mistake: 'im-p-rule-wrong',
        why: 'Assumed an integrand tending to 0 is enough, but p = 1 fails the p-rule.',
      },
      {
        text: 'Converges to $\\infty$',
        mistake: 'im-divergent-called-convergent',
        why: 'Called an infinite limit "convergence", but an infinite limit means the integral diverges.',
      },
      {
        text: 'Converges to $1$ by the $p$-rule',
        mistake: 'im-p-rule-wrong',
        why: 'Misapplied the p-rule, which needs p > 1; here p = 1.',
      },
      {
        text: 'Converges to $\\ln 1 = 0$: plug in the bounds',
        mistake: 'im-plug-infinity',
        why: 'Plugged ∞ (treated as nothing) into ln x instead of taking a limit.',
      },
    ],
    correct: 0,
    explanation: 'ln t has no finite limit as t → ∞, so the integral diverges (p = 1).',
    check: { kind: 'improper-integral', integrand: '1/x', lower: '1', upper: 'inf', converges: false },
  },
  {
    id: 'im-f-023',
    topic: 'improper',
    kind: 'concept',
    prompt: { latex: '\\int_{1}^{\\infty} \\frac{dx}{\\sqrt{x}}' },
    options: [
      { text: 'Diverges: $2\\sqrt{t} - 2 \\to \\infty$' },
      {
        text: 'Converges to $2$',
        mistake: 'im-p-rule-wrong',
        why: 'Used the value of the integral of 1/√x from 0 to 1, which is a different integral.',
      },
      {
        text: 'Converges to $\\infty$',
        mistake: 'im-divergent-called-convergent',
        why: 'Called an infinite limit "convergence", but an infinite limit means the integral diverges.',
      },
      {
        text: 'Converges to $0$: $\\dfrac{1}{\\sqrt{x}} \\to 0$',
        mistake: 'im-p-rule-wrong',
        why: 'Assumed an integrand tending to 0 is enough, but p = 1/2 < 1 diverges even though the integrand tends to 0.',
      },
      {
        text: 'Diverges: $\\dfrac{1}{\\sqrt{x}}$ is undefined at $\\infty$',
        mistake: 'im-plug-infinity',
        why: 'Right verdict but an invalid reason: ∞ is a bound, not a point where the function is evaluated.',
      },
    ],
    correct: 0,
    explanation: '$2\\sqrt{t} - 2 \\to \\infty$, so it diverges; the p-rule needs $p > 1$.',
    check: { kind: 'improper-integral', integrand: '1/sqrt(x)', lower: '1', upper: 'inf', converges: false },
  },
  {
    id: 'im-f-024',
    topic: 'improper',
    kind: 'concept',
    prompt: { latex: '\\int_{0}^{1} \\frac{dx}{x}' },
    options: [
      { text: 'Diverges: $\\displaystyle\\lim_{t\\to 0^{+}} (0 - \\ln t) = \\infty$' },
      {
        text: 'Converges to $0$: $\\ln 1 - \\ln 0 = 0$',
        mistake: 'im-plug-infinity',
        why: 'Treated ln 0 as 0 instead of recognizing that ln t → −∞ as t → 0⁺.',
      },
      {
        text: 'Converges to $-\\infty$',
        mistake: 'im-divergent-called-convergent',
        why: 'Called an infinite limit "convergence", but an infinite limit means the integral diverges.',
      },
      {
        text: 'Converges to $1$ by the $p$-rule',
        mistake: 'im-p-rule-wrong',
        why: 'Misapplied the p-rule, which is stated for the integral from 1 to ∞ and also fails at p = 1.',
      },
      {
        text: 'Diverges because $\\ln 1 = 0$',
        mistake: 'im-limit-evaluated-wrong',
        why: 'Right verdict but an invalid reason: ln 1 = 0 has nothing to do with the blow-up at the lower endpoint.',
      },
    ],
    correct: 0,
    explanation: 'The limit of −ln t as t → 0⁺ is ∞, so the integral diverges.',
    check: { kind: 'improper-integral', integrand: '1/x', lower: '0', upper: '1', converges: false },
  },
  {
    id: 'im-f-025',
    topic: 'improper',
    kind: 'concept',
    prompt: { latex: '\\int_{-1}^{1} \\frac{dx}{x^{2}}' },
    options: [
      { text: 'Diverges: split at $0$; $\\displaystyle\\lim_{t\\to 0^{+}} \\int_{t}^{1} \\frac{dx}{x^{2}} = \\infty$' },
      {
        text: '$= -2$ by the FTC: $\\left[-\\dfrac{1}{x}\\right]_{-1}^{1}$',
        mistake: 'im-hidden-discontinuity',
        why: 'Applied the FTC across the blow-up at 0 inside the interval.',
      },
      {
        text: '$= 2$ by the FTC, since the integrand is positive',
        mistake: 'im-hidden-discontinuity',
        why: 'Fixed the sign but still ignored the discontinuity at 0.',
      },
      {
        text: '$= 0$ by the FTC and symmetry',
        mistake: 'im-symmetric-limit',
        why: 'Used symmetry, but symmetry cannot rescue an interior discontinuity.',
      },
      {
        text: 'Diverges because the limits at $x = \\pm 1$ are infinite',
        mistake: 'im-wrong-type',
        why: 'Right verdict but an invalid reason: the integrand equals 1 at x = ±1, so nothing blows up there.',
      },
    ],
    correct: 0,
    explanation: 'The right piece alone gives $\\frac{1}{t} - 1 \\to \\infty$, so the whole integral diverges; −2 is impossible for a positive integrand.',
    check: { kind: 'improper-integral', integrand: '1/x^2', lower: '-1', upper: '1', converges: false, split: ['0'] },
  },
  {
    id: 'im-f-026',
    topic: 'improper',
    kind: 'concept',
    prompt: { latex: '\\int_{2}^{\\infty} \\frac{dx}{x\\ln x}' },
    options: [
      { text: 'Diverges: $\\ln(\\ln t) - \\ln(\\ln 2) \\to \\infty$' },
      {
        text: 'Converges to $-\\ln(\\ln 2)$',
        mistake: 'im-limit-evaluated-wrong',
        why: 'Dropped the ln(ln t) term as if it tended to 0, although it tends to ∞.',
      },
      {
        text: 'Converges to $0$ since the integrand $\\to 0$',
        mistake: 'im-p-rule-wrong',
        why: 'Assumed an integrand tending to 0 gives convergence, which it does not.',
      },
      {
        text: 'Converges to $\\infty$',
        mistake: 'im-divergent-called-convergent',
        why: 'Called an infinite limit "convergence", but an infinite limit means the integral diverges.',
      },
      {
        text: 'Diverges because $\\dfrac{1}{x\\ln x} \\ge \\dfrac{1}{x}$',
        mistake: 'algebra-error',
        why: 'Right verdict but an invalid reason: the inequality is false for x > e, where ln x > 1.',
      },
    ],
    correct: 0,
    explanation: 'With $u = \\ln x$ the integral becomes $\\int \\frac{du}{u} = \\ln u$, which is unbounded.',
    check: { kind: 'improper-integral', integrand: '1/(x*log(x))', lower: '2', upper: 'inf', converges: false },
  },
  {
    id: 'im-f-027',
    topic: 'improper',
    kind: 'concept',
    prompt: { latex: '\\int_{-\\infty}^{\\infty} x\\,dx' },
    options: [
      { text: 'Diverges: $\\displaystyle\\int_{0}^{\\infty} x\\,dx = \\lim_{t\\to\\infty} \\tfrac{t^{2}}{2} = \\infty$' },
      {
        text: '$= 0$ by symmetry (odd function)',
        mistake: 'im-symmetric-limit',
        why: 'Used symmetry, but both halves must converge before symmetry can be used.',
      },
      {
        text: '$= 0$: $\\displaystyle\\lim_{t\\to\\infty} \\int_{-t}^{t} x\\,dx = 0$',
        mistake: 'im-split-mishandled',
        why: 'Used one symmetric limit instead of two separate limits.',
      },
      {
        text: 'Converges to $\\infty + (-\\infty) = 0$',
        mistake: 'im-plug-infinity',
        why: 'Treated ∞ as a number that cancels against −∞.',
      },
      {
        text: 'Converges to $\\infty$',
        mistake: 'im-divergent-called-convergent',
        why: 'Called an infinite limit "convergence", but an infinite limit means the integral diverges.',
      },
    ],
    correct: 0,
    explanation: 'One divergent half is enough, so the whole integral diverges.',
    check: { kind: 'improper-integral', integrand: 'x', lower: '-inf', upper: 'inf', converges: false, split: ['0'] },
  },
  {
    id: 'im-f-028',
    topic: 'improper',
    kind: 'concept',
    prompt: { latex: '\\int_{0}^{\\infty} \\cos x\\,dx' },
    options: [
      { text: 'Diverges: $\\displaystyle\\lim_{t\\to\\infty} \\sin t$ does not exist' },
      {
        text: 'Converges to $0$: $\\sin\\infty = 0$',
        mistake: 'im-plug-infinity',
        why: 'Plugged ∞ into sin as if it were a number with a value.',
      },
      {
        text: 'Converges to $0$: $\\cos$ averages out to $0$',
        mistake: 'im-limit-evaluated-wrong',
        why: 'Used averaging, which is not a limit; sin t keeps oscillating and has no limit.',
      },
      {
        text: 'Converges to $\\infty$',
        mistake: 'im-divergent-called-convergent',
        why: 'Called an infinite limit "convergence", but an infinite limit means the integral diverges.',
      },
      {
        text: 'Diverges because $\\cos x$ is not integrable',
        mistake: 'im-wrong-type',
        why: 'Right verdict but an invalid reason: cos x does have an antiderivative, sin x.',
      },
    ],
    correct: 0,
    explanation: 'sin t oscillates between −1 and 1 forever, so the limit does not exist and the integral diverges.',
    check: { kind: 'improper-integral', integrand: 'cos(x)', lower: '0', upper: 'inf', converges: false },
  },
  {
    id: 'im-f-029',
    topic: 'improper',
    kind: 'concept',
    prompt: { latex: '\\int_{0}^{\\infty} e^{-x}\\,dx' },
    options: [
      { text: 'Converges to $1$: $\\displaystyle\\lim_{t\\to\\infty} \\left(1 - e^{-t}\\right) = 1$' },
      {
        text: 'Converges to $0$: $e^{-\\infty} = 0$',
        mistake: 'im-plug-infinity',
        why: 'Plugged ∞ in and forgot to subtract the value at the lower bound.',
      },
      {
        text: 'Diverges: $\\displaystyle\\lim_{t\\to\\infty} \\left(e^{t} - 1\\right) = \\infty$',
        mistake: 'exp-antiderivative-wrong',
        why: 'Integrated e^{−x} as e^{x}, ignoring the inner minus sign, so the limit blew up.',
      },
      {
        text: 'Converges to $-1$: $\\displaystyle\\lim_{t\\to\\infty} \\left(e^{-t} - 1\\right) = -1$',
        mistake: 'sign-error',
        why: 'Lost the minus sign of the antiderivative −e^{−x}, so F(t) − F(0) became e^{−t} − 1.',
      },
      {
        text: 'Converges to $0$: $\\displaystyle\\lim_{t\\to\\infty} \\left(1 - e^{-t}\\right) = 0$',
        mistake: 'im-limit-evaluated-wrong',
        why: 'Took e^{−t} → 1 as t → ∞ instead of → 0.',
      },
    ],
    correct: 0,
    explanation: '$-e^{-t} + 1 \\to 1$ as $t \\to \\infty$.',
    check: { kind: 'improper-integral', integrand: 'exp(-x)', lower: '0', upper: 'inf', converges: true, value: '1' },
  },

  // ───────────────────────── the p-rule, limits needed, first step ─────────────────────────
  {
    id: 'im-f-030',
    topic: 'improper',
    kind: 'concept',
    prompt: { text: 'The integral $\\displaystyle\\int_{1}^{\\infty} \\frac{dx}{x^{p}}$ converges exactly when' },
    options: [
      { text: '$p > 1$' },
      {
        text: '$p \\ge 1$',
        mistake: 'im-p-rule-wrong',
        why: 'Included p = 1, where ln t → ∞ and the integral diverges.',
      },
      {
        text: '$p \\ge 0$',
        mistake: 'im-p-rule-wrong',
        why: 'Included every p from 0 to 1, where the integral diverges.',
      },
      {
        text: '$|p| \\ge 1$',
        mistake: 'im-p-rule-wrong',
        why: 'Included p = 1 and negative p, where the integrand grows and the integral diverges.',
      },
      {
        text: '$p < 1$',
        mistake: 'im-p-rule-wrong',
        why: 'Reversed the rule: the integral diverges for p < 1.',
      },
    ],
    correct: 0,
    explanation: '$\\int_{1}^{\\infty} x^{-p}\\,dx = \\frac{1}{p-1}$ for $p > 1$ and diverges for $p \\le 1$.',
    check: { kind: 'none', reason: 'p-rule statement' },
  },
  {
    id: 'im-f-031',
    topic: 'improper',
    kind: 'formula',
    prompt: { text: 'For $p > 1$,', latex: '\\int_{1}^{\\infty} \\frac{dx}{x^{p}} = ?' },
    options: [
      { latex: '\\frac{1}{p-1}', expr: '1/(p-1)' },
      {
        latex: '\\frac{1}{1-p}',
        expr: '1/(1-p)',
        mistake: 'sign-error',
        why: 'Lost the sign when evaluating x^{1−p}/(1 − p) at the lower bound.',
      },
      {
        latex: '\\frac{p}{1-p}',
        expr: 'p/(1-p)',
        mistake: 'arithmetic-error',
        why: 'Multiplied the value by an extra factor of p and lost the sign.',
      },
      {
        latex: '\\frac{2}{1-p}',
        expr: '2/(1-p)',
        mistake: 'arithmetic-error',
        why: 'Doubled the result and lost the sign.',
      },
      {
        latex: '\\frac{1}{p}',
        expr: '1/p',
        mistake: 'power-rule-int-coefficient',
        why: 'Divided by the old exponent −p instead of the new exponent 1 − p after raising the exponent.',
      },
    ],
    correct: 0,
    explanation: '$\\left[\\frac{x^{1-p}}{1-p}\\right]_{1}^{t} = \\frac{t^{1-p} - 1}{1-p} \\to \\frac{1}{p-1}$.',
    variable: 'p',
    domain: { p: [1.5, 4] },
    check: { kind: 'none', reason: 'symbolic p; the value 1/(p-1) is verified by hand (the p-rule)' },
  },
  {
    id: 'im-f-032',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\lim_{t\\to\\infty} \\arctan t = ?' },
    options: [
      { latex: '\\frac{\\pi}{2}', expr: 'pi/2' },
      {
        latex: '\\pi',
        expr: 'pi',
        mistake: 'inverse-trig-value-wrong',
        why: 'Confused the range of arctan, which is (−π/2, π/2), with (0, π).',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'im-plug-infinity',
        why: 'Treated arctan ∞ as undefined and wrote 0 instead of finding the limit.',
      },
      {
        latex: '\\frac{\\pi}{4}',
        expr: 'pi/4',
        mistake: 'inverse-trig-value-wrong',
        why: 'Used arctan 1 = π/4 instead of the limit of arctan t.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'sq-substitute-infinity',
        why: 'Substituted ∞ and "cancelled" the infinity to get 1.',
      },
    ],
    correct: 0,
    explanation: 'The graph of arctan t levels off at the horizontal asymptote π/2, so arctan t → π/2 as t → ∞.',
    variable: 't',
    check: { kind: 'limit', term: 'arctan(t)', variable: 't', limit: 'pi/2' },
  },
  {
    id: 'im-f-033',
    topic: 'improper',
    kind: 'concept',
    prompt: { text: '(Needed for $\\int_{0}^{1} \\ln x\\,dx$.)', latex: '\\lim_{t\\to 0^{+}} t\\ln t = ?' },
    options: [
      { text: '$0$: by L\'Hôpital on $\\dfrac{\\ln t}{1/t}$' },
      {
        text: '$-\\infty$: $\\ln t \\to -\\infty$',
        mistake: 'im-limit-evaluated-wrong',
        why: 'Ignored the factor t → 0, which beats the logarithm and drives the product to 0.',
      },
      {
        text: '$1$: $0 \\cdot \\infty$ cancels',
        mistake: 'sq-limit-law-misuse',
        why: 'Treated the indeterminate form 0·∞ as 1.',
      },
      {
        text: '$-1$: by L\'Hôpital on $\\dfrac{\\ln t}{1/t}$',
        mistake: 'arithmetic-error',
        why: 'Simplified the L\'Hôpital quotient (1/t)/(−1/t²) to −1 instead of −t, which tends to 0.',
      },
      {
        text: 'DNE: the one-sided limit cannot exist',
        mistake: 'im-wrong-one-sided-limit',
        why: 'Claimed the limit does not exist, but one-sided limits exist just as well as two-sided ones.',
      },
    ],
    correct: 0,
    explanation: '$\\dfrac{\\ln t}{1/t} \\to \\dfrac{1/t}{-1/t^{2}} = -t \\to 0$ by L\'Hôpital.',
    check: { kind: 'none', reason: 'a limit as t -> 0+, verified by hand (L\'Hopital on ln t/(1/t))' },
  },
  {
    id: 'im-f-034',
    topic: 'improper',
    kind: 'formula',
    prompt: { latex: '\\lim_{t\\to\\infty} e^{-3t} = ?' },
    options: [
      { latex: '0', expr: '0' },
      {
        latex: '1',
        expr: '1',
        mistake: 'im-limit-evaluated-wrong',
        why: 'Took e^{−3t} → 1 as t → ∞ instead of → 0.',
      },
      {
        latex: '-\\frac{1}{3}',
        expr: '-1/3',
        mistake: 'du-constant-wrong',
        why: 'Confused the limit with the constant factor −1/3 in an antiderivative.',
      },
      {
        latex: 'e',
        expr: 'e',
        mistake: 'arithmetic-error',
        why: 'Dropped the exponent and kept only the base e.',
      },
      {
        latex: '-3',
        expr: '-3',
        mistake: 'sign-error',
        why: 'Reported the coefficient of t in the exponent instead of the limit.',
      },
    ],
    correct: 0,
    explanation: '$e^{-3t} = \\dfrac{1}{e^{3t}} \\to 0$ as $t \\to \\infty$.',
    variable: 't',
    check: { kind: 'limit', term: 'exp(-3*t)', variable: 't', limit: '0' },
  },
  {
    id: 'im-f-035',
    topic: 'improper',
    kind: 'technique',
    prompt: { text: 'What is the first step for', latex: '\\int_{0}^{\\infty} \\frac{dx}{1+x^{2}}\\,?' },
    options: [
      { text: 'Type I: write $\\displaystyle\\lim_{t\\to\\infty} \\int_{0}^{t} \\frac{dx}{1+x^{2}}$' },
      {
        text: 'Not improper: write $\\left[\\arctan x\\right]_{0}^{\\infty}$',
        mistake: 'im-plug-infinity',
        why: 'An infinite bound makes the integral improper, and ∞ is never plugged into arctan x; a limit is taken instead.',
      },
      {
        text: 'Type I: write $\\displaystyle\\lim_{t\\to\\infty} \\int_{-t}^{t} \\frac{dx}{1+x^{2}}$',
        mistake: 'im-symmetric-limit',
        why: 'Used a symmetric limit, which changes the interval to the whole line; this integral starts at 0.',
      },
      {
        text: 'Type I: write $\\displaystyle\\lim_{t\\to\\infty} \\int_{t}^{\\infty} \\frac{dx}{1+x^{2}}$',
        mistake: 'im-plug-infinity',
        why: 'Replaced the finite bound by t and kept ∞ as a bound; it is the ∞ that must become t.',
      },
      {
        text: 'Type II: write $\\displaystyle\\lim_{t\\to 0^{+}} \\int_{t}^{\\infty} \\frac{dx}{1+x^{2}}$',
        mistake: 'im-wrong-type',
        why: 'Looked for a Type II problem at 0, but 1/(1 + x²) is continuous there; the only bad bound is ∞.',
      },
    ],
    correct: 0,
    explanation: 'Step 1 is to identify the type: only the upper bound is infinite (Type I), so replace it by $t$ and let $t \\to \\infty$.',
    check: { kind: 'none', reason: 'first step of the procedure' },
  },
];

// ───────────────────────── generators ─────────────────────────
// Small exact-rational helpers so that fractions render as \frac{a}{b} (or an integer) in LaTeX and as
// a/b in mathjs.
type Q = [number, number];
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const q = (n: number, d: number): Q => {
  const g = gcd(n, d);
  let nn = n / g;
  let dd = d / g;
  if (dd < 0) {
    nn = -nn;
    dd = -dd;
  }
  return [nn, dd];
};
const ql = ([n, d]: Q): string => (d === 1 ? `${n}` : n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`);
const qe = ([n, d]: Q): string => (d === 1 ? `${n}` : `${n}/${d}`);

/** k in e^{-kx}: [numerator, denominator]. */
const EXP_K: Q[] = [
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [1, 2],
  [3, 2],
  [5, 2],
];

/** p in 1/x^p, p > 1: [numerator, denominator]. */
const P_TABLE: Q[] = [
  [2, 1],
  [3, 1],
  [4, 1],
  [3, 2],
  [5, 2],
  [5, 1],
  [6, 1],
  [7, 2],
];

export const generators: FlashGenerator[] = [
  {
    id: 'im-g-exp',
    topic: 'improper',
    kind: 'formula',
    describe: '∫₀^∞ e^{−kx} dx',
    generate(seed) {
      const [n, d] = EXP_K[(seed - 1) % EXP_K.length];
      const k = q(n, d);
      const negK = q(-n, d); // -k
      const inv = q(d, n); // 1/k
      const negInv = q(-d, n); // -1/k
      // exponent as printed: e^{-2x}, e^{-x/2}, e^{-3x/2}, e^{-5x/2}
      const arg = d === 1 ? `${n}x` : n === 1 ? 'x/2' : `${n}x/2`;
      const kExpr = d === 1 ? `${n}` : `(${n}/${d})`;
      return {
        id: `im-g-exp:${seed}`,
        topic: 'improper',
        kind: 'formula',
        prompt: { latex: `\\int_{0}^{\\infty} e^{-${arg}}\\,dx = ?` },
        options: [
          { latex: ql(inv), expr: qe(inv) },
          {
            latex: ql(negInv),
            expr: qe(negInv),
            mistake: 'sign-error',
            why: 'Lost the minus sign of the antiderivative −(1/k)e^{−kx} when evaluating.',
          },
          {
            latex: ql(negK),
            expr: qe(negK),
            mistake: 'du-constant-wrong',
            why: 'Multiplied by k instead of dividing by k for the inner constant, and lost the sign.',
          },
          {
            latex: ql(k),
            expr: qe(k),
            mistake: 'inner-constant-factor-missing',
            why: 'Multiplied by k instead of dividing by k for the inner constant, so used −k·e^{−kx} as the antiderivative.',
          },
          {
            latex: '-1',
            expr: '-1',
            mistake: 'inner-constant-factor-missing',
            why: 'Forgot the factor 1/k that comes from the inner derivative, and lost the sign.',
          },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-limit-evaluated-wrong',
            why: 'Took e^{−kt} → 1 as t → ∞ instead of → 0.',
          },
        ],
        correct: 0,
        explanation: `$\\int_{0}^{t} e^{-kx}\\,dx = -\\frac{1}{k}e^{-kt} + \\frac{1}{k} \\to \\frac{1}{k}$, here with $k = ${ql(k)}$.`,
        check: {
          kind: 'improper-integral',
          integrand: `exp(-${kExpr}*x)`,
          lower: '0',
          upper: 'inf',
          converges: true,
          value: qe(inv),
        },
      };
    },
  },
  {
    id: 'im-g-p',
    topic: 'improper',
    kind: 'formula',
    describe: '∫₁^∞ dx/x^p, p > 1',
    generate(seed) {
      const [n, d] = P_TABLE[(seed - 1) % P_TABLE.length];
      const ans = q(d, n - d); // 1/(p-1)
      const negAns = q(-d, n - d); // 1/(1-p)
      const invP = q(d, n); // 1/p
      const negInvP = q(-d, n); // -1/p
      const negInvP1 = q(-d, n + d); // -1/(p+1)
      const pl = d === 1 ? `${n}` : `${n}/${d}`; // exponent as printed: x^{3/2}
      return {
        id: `im-g-p:${seed}`,
        topic: 'improper',
        kind: 'formula',
        prompt: { latex: `\\int_{1}^{\\infty} \\frac{dx}{x^{${pl}}} = ?` },
        options: [
          { latex: ql(ans), expr: qe(ans) },
          {
            latex: ql(negAns),
            expr: qe(negAns),
            mistake: 'ftc-order-swapped',
            why: 'Evaluated F(1) − F(t) instead of F(t) − F(1), which flips the sign.',
          },
          {
            latex: ql(invP),
            expr: qe(invP),
            mistake: 'power-rule-int-coefficient',
            why: 'Divided by the old exponent −p instead of the new exponent 1 − p.',
          },
          {
            latex: ql(negInvP),
            expr: qe(negInvP),
            mistake: 'power-rule-int-coefficient',
            why: 'Divided by the old exponent −p instead of the new exponent 1 − p, and also swapped the FTC order.',
          },
          {
            latex: ql(negInvP1),
            expr: qe(negInvP1),
            mistake: 'arithmetic-error',
            why: 'Used p + 1 instead of p − 1 as the new exponent magnitude, and swapped the FTC order.',
          },
          {
            latex: '0',
            expr: '0',
            mistake: 'im-plug-infinity',
            why: 'Wrote F(∞) = 0 and stopped, forgetting to subtract the lower-bound value.',
          },
        ],
        correct: 0,
        explanation: `$\\frac{t^{1-p} - 1}{1-p} \\to \\frac{1}{p-1}$ for $p = ${pl}$, which equals $${ql(ans)}$.`,
        check: {
          kind: 'improper-integral',
          integrand: `1/x^(${qe([n, d])})`,
          lower: '1',
          upper: 'inf',
          converges: true,
          value: qe(ans),
        },
      };
    },
  },
];
