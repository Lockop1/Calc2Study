import type { FlashGenerator, FlashItem } from '../types';

/**
 * Flash Drill items for topic "area" (Lecture 2, §2.1: area between curves).
 * Authored by content-author; verified by math-verifier.
 *
 * The app shows no figures, so every region is described by its equations only.
 *   ar-f-001 … 010  setup rules (formulas, what the integrand means, dx vs dy, splitting, signs)
 *   ar-f-011 … 028  "which integral gives the area of the region …" (integral-valued options)
 *   ar-f-029 … 037  evaluate a set-up area integral
 *   ar-f-038 … 041  technique: integrate in x or y, one integral or two
 *   ar-f-042 … 045  intersections, test points, rewriting a curve as x = g(y)
 */
export const flash: FlashItem[] = [
  // ───────────── setup rules ─────────────
  {
    id: 'ar-f-001',
    topic: 'area',
    kind: 'formula',
    prompt: {
      text: 'A region is bounded above by $y = f(x)$, below by $y = g(x)$, and on the sides by $x = a$ and $x = b$, where $f(x) \\ge g(x)$ on $[a, b]$. Its area is',
    },
    options: [
      {
        latex: 'A = \\int_a^b \\left(g(x) - f(x)\\right)dx',
        mistake: 'top-bottom-swapped',
        why: 'This is bottom − top. Since $f \\ge g$, the integrand is never positive, so the result is $-A$.',
      },
      {
        latex: 'A = \\int_a^b f(x)\\,dx',
        mistake: 'single-function-area',
        why: 'This is the area between $y = f(x)$ and the $x$-axis; the lower boundary $y = g(x)$ is ignored.',
      },
      { latex: 'A = \\int_a^b \\left(f(x) - g(x)\\right)dx' },
      {
        latex: 'A = \\int_a^b \\left(f(x) + g(x)\\right)dx',
        mistake: 'sum-instead-of-difference',
        why: 'The vertical segment from $y = g(x)$ up to $y = f(x)$ has length $f(x) - g(x)$, not the sum of the two heights.',
      },
      {
        latex: 'A = \\int_{g(a)}^{f(b)} \\left(f(x) - g(x)\\right)dx',
        mistake: 'bounds-wrong-variable',
        why: '$g(a)$ and $f(b)$ are $y$-values; a $dx$-integral runs over the $x$-interval from $a$ to $b$.',
      },
      {
        latex: 'A = \\pi\\int_a^b \\left(f(x)^2 - g(x)^2\\right)dx',
        mistake: 'formula-swapped',
        why: 'That is the washer formula for a volume of revolution, not the area of a plane region.',
      },
    ],
    correct: 2,
    explanation: 'Each vertical segment has length top − bottom $= f(x) - g(x)$; integrating these lengths from $a$ to $b$ gives the area.',
    check: { kind: 'none', reason: 'symbolic formula recall; f, g, a, b are generic' },
    difficulty: 1,
  },
  {
    id: 'ar-f-002',
    topic: 'area',
    kind: 'formula',
    prompt: {
      text: 'A region lies between the horizontal lines $y = c$ and $y = d$, with right boundary $x = R(y)$ and left boundary $x = L(y)$. Its area is',
    },
    options: [
      {
        latex: 'A = \\int_c^d \\left(L(y) - R(y)\\right)dy',
        mistake: 'top-bottom-swapped',
        why: 'This is left − right, which is never positive; a horizontal segment has length right − left.',
      },
      {
        latex: 'A = \\int_c^d \\left(R(y) - L(y)\\right)dx',
        mistake: 'dx-dy-mismatch',
        why: 'The integrand is written in $y$, so the differential must be $dy$; pairing it with $dx$ mixes the variables.',
      },
      {
        latex: 'A = \\int_{L(c)}^{R(d)} \\left(R(y) - L(y)\\right)dy',
        mistake: 'bounds-wrong-variable',
        why: '$L(c)$ and $R(d)$ are $x$-values; a $dy$-integral runs over the $y$-interval from $c$ to $d$.',
      },
      {
        latex: 'A = \\int_c^d \\left(R(y) + L(y)\\right)dy',
        mistake: 'sum-instead-of-difference',
        why: 'The horizontal segment from $x = L(y)$ to $x = R(y)$ has length $R(y) - L(y)$, not $R(y) + L(y)$.',
      },
      { latex: 'A = \\int_c^d \\left(R(y) - L(y)\\right)dy' },
      {
        latex: 'A = \\int_c^d R(y)\\,dy',
        mistake: 'single-function-area',
        why: 'This is the area between $x = R(y)$ and the $y$-axis; the left boundary $x = L(y)$ is ignored.',
      },
    ],
    correct: 4,
    explanation: 'Integrating in $y$, each horizontal segment has length right − left $= R(y) - L(y)$, accumulated from $y = c$ to $y = d$.',
    check: { kind: 'none', reason: 'symbolic formula recall; R, L, c, d are generic' },
    difficulty: 1,
  },
  {
    id: 'ar-f-003',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'In $A = \\int_a^b \\left(f(x) - g(x)\\right)dx$ with $f \\ge g$, what does the integrand $f(x) - g(x)$ represent geometrically?',
    },
    options: [
      {
        text: 'The length of the horizontal segment at height $y$, from the left curve to the right curve',
        mistake: 'dx-dy-mismatch',
        why: 'That is the integrand of a $dy$-integral (right − left); here we integrate in $x$, so the segments are vertical.',
      },
      { text: 'The length of the vertical segment at $x$, from the lower curve up to the upper curve' },
      {
        text: 'The height of the upper curve $y = f(x)$ above the $x$-axis',
        mistake: 'single-function-area',
        why: 'That is $f(x)$ alone; subtracting $g(x)$ removes the part below the lower curve.',
      },
      {
        text: 'The sum of the heights of both curves above the $x$-axis',
        mistake: 'sum-instead-of-difference',
        why: 'The heights are subtracted, not added: the segment starts at $y = g(x)$, not at the axis.',
      },
      {
        text: 'The area of the whole region between the two curves',
        mistake: 'formula-swapped',
        why: 'The area is the integral of these lengths; the integrand itself is the length of one segment (integrating lengths produces areas).',
      },
    ],
    correct: 1,
    explanation: 'At each $x$, $f(x) - g(x)$ is the length of the vertical segment from $y = g(x)$ to $y = f(x)$; integrating these lengths produces the area.',
    check: { kind: 'none', reason: 'conceptual; text options' },
    difficulty: 1,
  },
  {
    id: 'ar-f-004',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'You set up an area integral with respect to $y$. Which statement is correct?' },
    options: [
      {
        text: 'The limits are the $x$-coordinates of the intersection points, since that is where the curves meet',
        mistake: 'bounds-wrong-variable',
        why: 'In a $dy$-integral the limits are $y$-values; the $x$-coordinates of the intersection points belong to a $dx$ setup.',
      },
      {
        text: 'The integrand may keep expressions in $x$, such as $\\sqrt{2x + 6}$, as long as it ends in $dy$',
        mistake: 'dx-dy-mismatch',
        why: 'Every function in a $dy$-integral must be written in terms of $y$; an $x$-expression with $dy$ mixes the variables.',
      },
      {
        text: 'The integrand is (left curve) − (right curve)',
        mistake: 'top-bottom-swapped',
        why: 'Left − right is negative; a horizontal segment has length right − left.',
      },
      { text: 'The limits are the $y$-coordinates of the lowest and highest points of the region' },
      {
        text: 'Only the curve that is farther right is integrated; the left curve just sets the limits',
        mistake: 'single-function-area',
        why: 'Both boundaries enter the integrand: the horizontal length is $R(y) - L(y)$.',
      },
    ],
    correct: 3,
    explanation: 'A $dy$-integral accumulates horizontal lengths $R(y) - L(y)$ from the lowest to the highest $y$-value of the region.',
    check: { kind: 'none', reason: 'conceptual; text options' },
    difficulty: 1,
  },
  {
    id: 'ar-f-005',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'For the region between $y = x$ and $y = x^3$ on $[-1, 1]$, a student computes $\\int_{-1}^{1}(x - x^3)\\,dx = 0$. Which statement is correct?',
    },
    options: [
      {
        text: 'It is right: the curves meet at $x = -1, 0, 1$, so they enclose no area',
        mistake: 'negative-area',
        why: 'A zero (or negative) result for a region you can sketch signals a wrong setup; there are two pieces, each of area $\\tfrac14$.',
      },
      {
        text: 'It is an arithmetic slip: evaluated carefully, $\\int_{-1}^{1}(x - x^3)\\,dx = \\tfrac12$',
        mistake: 'top-bottom-not-split',
        why: 'The single integral really equals $0$; only splitting at $x = 0$, where the top curve changes, gives $\\tfrac12$.',
      },
      {
        text: 'It is a signed total: $x - x^3 < 0$ on $(-1, 0)$, so that piece cancels the piece on $(0, 1)$; split at $x = 0$',
      },
      {
        text: 'Swapping the order to $\\int_{-1}^{1}(x^3 - x)\\,dx$ gives the area',
        mistake: 'top-bottom-swapped',
        why: 'Swapping the whole integrand still gives $0$: the curves trade places at $x = 0$, so each piece needs its own top − bottom.',
      },
      {
        text: 'It is right, because $x - x^3$ is odd, and an odd integrand always encloses zero area',
        mistake: 'signed-area-confusion',
        why: 'An odd integrand has zero signed integral over $[-a, a]$, but area counts both pieces as positive.',
      },
    ],
    correct: 2,
    explanation: 'On $(-1, 0)$ the top curve is $x^3$, so $x - x^3$ is negative there; the pieces cancel, while the area is $\\tfrac14 + \\tfrac14 = \\tfrac12$.',
    check: { kind: 'none', reason: 'conceptual; text options' },
    difficulty: 2,
  },
  {
    id: 'ar-f-006',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'For the region enclosed by $y = x^2$ and $y = x + 2$, a student evaluates $\\int_{-1}^{2}(x^2 - x - 2)\\,dx = -\\tfrac92$. Which conclusion is correct?',
    },
    options: [
      {
        text: 'The area is $-\\tfrac92$, because part of the region lies below the $x$-axis',
        mistake: 'negative-area',
        why: 'Area is never negative, and here the whole region lies above the $x$-axis ($y \\ge x^2 \\ge 0$); the sign comes from the swapped integrand.',
      },
      {
        text: 'The limits are wrong: the curves really meet at $x = -2$ and $x = 1$',
        mistake: 'sign-error',
        why: '$x^2 - x - 2 = (x - 2)(x + 1)$, so the curves meet at $x = -1$ and $x = 2$; the limits are right.',
      },
      {
        text: 'The integral must be split at $x = 0$, where $y = x^2$ touches the $x$-axis',
        mistake: 'signed-area-confusion',
        why: 'Splits happen where the two curves cross each other, not where one curve meets the $x$-axis.',
      },
      {
        text: 'The arithmetic is off: this integral actually equals $\\tfrac92$',
        mistake: 'top-bottom-swapped',
        why: 'The integral as written really is $-\\tfrac92$; the error is in the setup (bottom − top), not in the arithmetic.',
      },
      {
        text: 'The integrand is bottom − top: at $x = 0$ the line ($2$) is above the parabola ($0$), so the area is $\\tfrac92$',
      },
    ],
    correct: 4,
    explanation: 'A negative area means the setup is wrong: with top $y = x + 2$ the integrand is $(x + 2) - x^2$, and the area is $\\tfrac92$.',
    check: { kind: 'none', reason: 'conceptual; text options' },
    difficulty: 1,
  },
  {
    id: 'ar-f-007',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'When is integrating with respect to $y$ the better choice for an area?' },
    options: [
      {
        text: 'Whenever one of the boundary curves is a parabola',
        mistake: 'technique-wrong',
        why: 'The shape alone does not decide: for $y = x^2$ and $y = 2x$ the $dx$ setup is one short integral.',
      },
      {
        text: 'When every horizontal segment runs between the same two curves, but vertical segments would need different formulas in different parts',
      },
      {
        text: 'Only when the problem says to integrate with respect to $y$',
        mistake: 'technique-wrong',
        why: 'Usually no variable is specified; you choose the one that gives the simplest setup.',
      },
      {
        text: 'Whenever the curves cross, because switching to $y$ always avoids splitting',
        mistake: 'top-bottom-not-split',
        why: 'Switching does not remove crossings: for $y = x$ and $y = x^3$ the right and left curves also trade places at $y = 0$.',
      },
      {
        text: 'Whenever the region lies below the $x$-axis, because a $dx$-integral would come out negative',
        mistake: 'signed-area-confusion',
        why: 'Top − bottom is positive wherever the region sits; being below the axis does not make a $dx$ setup fail.',
      },
    ],
    correct: 1,
    explanation: 'Pick the variable with the simplest setup: $dy$ wins when the right and left boundaries stay the same while the top or bottom boundary changes.',
    check: { kind: 'none', reason: 'conceptual; text options' },
    difficulty: 1,
  },
  {
    id: 'ar-f-008',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'A region is enclosed by $y = f(x)$ and $y = g(x)$, and no interval is given. How do you find the limits of a $dx$-integral?',
    },
    options: [
      {
        text: 'Solve $f(x) = 0$ and $g(x) = 0$; the $x$-intercepts are the limits',
        mistake: 'missing-intersection',
        why: 'The corners of the region are where the two curves meet each other; the $x$-intercepts of each curve are generally not on its boundary.',
      },
      {
        text: 'Solve $f(x) = g(x)$ and use the $y$-coordinates of the intersection points as the limits',
        mistake: 'bounds-wrong-variable',
        why: 'A $dx$-integral needs $x$-values; the $y$-coordinates belong to a $dy$ setup.',
      },
      {
        text: 'Solve $f(x) = g(x)$ after dividing both sides by a common factor $x$',
        mistake: 'missing-intersection',
        why: 'Dividing by $x$ discards the solution $x = 0$ (for example, $x^2 = 2x$ loses the origin).',
      },
      {
        text: 'Solve $f(x) = g(x)$; the smallest and largest solutions are the limits, and any solutions between them are split points',
      },
      {
        text: 'Solve $f(x) = g(x)$; the smallest and largest solutions are the limits, and one integral always covers everything between them',
        mistake: 'top-bottom-not-split',
        why: 'If the curves cross between the outer solutions, the top curve changes there and the integral must be split.',
      },
    ],
    correct: 3,
    explanation: 'The curves meet where $f(x) = g(x)$: the outer solutions bound the region, and inner ones mark where top and bottom may trade places.',
    check: { kind: 'none', reason: 'conceptual; text options' },
    difficulty: 1,
  },
  {
    id: 'ar-f-009',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'Consecutive intersection points of two curves are $x = a$ and $x = c$. How do you decide which curve is on top on $(a, c)$?',
    },
    options: [
      {
        text: 'Evaluate both functions at one point strictly between $a$ and $c$; the larger value marks the top curve on all of $(a, c)$',
      },
      {
        text: 'Evaluate both functions at $x = a$; the larger value marks the top curve',
        mistake: 'top-bottom-swapped',
        why: 'At an intersection point both functions are equal, so this test decides nothing; use a point strictly inside $(a, c)$.',
      },
      {
        text: 'The curve with the higher power of $x$ is on top',
        mistake: 'top-bottom-swapped',
        why: 'Higher powers win only for large $|x|$; between the crossings, e.g. on $(0, 2)$, $x^2$ lies below $2x$.',
      },
      {
        text: 'The curve with the larger slope at a point between $a$ and $c$ is on top',
        mistake: 'top-bottom-swapped',
        why: 'Slope measures steepness, not height; compare the function values themselves.',
      },
      {
        text: 'One test anywhere is enough, because the same curve stays on top across every intersection point',
        mistake: 'top-bottom-not-split',
        why: 'The top curve can change at each crossing, so every subinterval needs its own test point.',
      },
    ],
    correct: 0,
    explanation: 'Between consecutive crossings the curves cannot trade places, so one test point strictly inside $(a, c)$ decides the order there.',
    check: { kind: 'none', reason: 'conceptual; text options' },
    difficulty: 2,
  },
  {
    id: 'ar-f-010',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'On $[a, b]$, $f(x) \\ge g(x)$, and both curves lie below the $x$-axis. The area between them is',
    },
    options: [
      {
        latex: '-\\int_a^b \\left(f(x) - g(x)\\right)dx',
        mistake: 'signed-area-confusion',
        why: 'The extra minus sign is only for a single curve below the axis; $f(x) - g(x)$ is already a positive length.',
      },
      {
        latex: '\\int_a^b \\left(g(x) - f(x)\\right)dx',
        mistake: 'top-bottom-swapped',
        why: 'Being below the axis does not change which curve is on top: $f$ is still higher, so $g - f \\le 0$ gives $-A$.',
      },
      { latex: '\\int_a^b \\left(f(x) - g(x)\\right)dx' },
      {
        latex: '-\\int_a^b g(x)\\,dx',
        mistake: 'single-function-area',
        why: 'This is the area between the lower curve and the $x$-axis; it includes the extra strip between $y = f(x)$ and the axis.',
      },
      {
        latex: '\\int_a^b \\left(|f(x)| + |g(x)|\\right)dx',
        mistake: 'sum-instead-of-difference',
        why: 'Adding the distances of both curves from the axis does not give the gap between them; the gap is $f(x) - g(x)$.',
      },
    ],
    correct: 2,
    explanation: 'Top − bottom works wherever the region lies: $f(x) - g(x) \\ge 0$ is the length of each vertical segment, even when both values are negative.',
    check: { kind: 'none', reason: 'symbolic setup; f, g, a, b are generic' },
    difficulty: 2,
  },

  // ───────────── which integral gives the area? ─────────────
  {
    id: 'ar-f-011',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which integral gives the area of the region enclosed by $y = x^2$ and $y = 2x$?' },
    options: [
      {
        latex: '\\int_0^2 (x^2 - 2x)\\,dx',
        expr: 'integral(x^2 - 2*x, x, 0, 2)',
        mistake: 'top-bottom-swapped',
        why: 'At the test point $x = 1$, $2x = 2 > 1 = x^2$, so the line is on top; this integrand is bottom − top.',
      },
      {
        latex: '\\int_0^4 (2x - x^2)\\,dx',
        expr: 'integral(2*x - x^2, x, 0, 4)',
        mistake: 'bounds-wrong-variable',
        why: '$4$ is the $y$-coordinate of the intersection point $(2, 4)$; the $x$-limits are $0$ and $2$.',
      },
      {
        latex: '\\int_0^2 2x\\,dx',
        expr: 'integral(2*x, x, 0, 2)',
        mistake: 'single-function-area',
        why: 'This is the area under the line only; the parabola is the lower boundary and must be subtracted.',
      },
      { latex: '\\int_0^2 (2x - x^2)\\,dx', expr: 'integral(2*x - x^2, x, 0, 2)' },
      {
        latex: '\\int_0^2 (2x + x^2)\\,dx',
        expr: 'integral(2*x + x^2, x, 0, 2)',
        mistake: 'sum-instead-of-difference',
        why: 'Vertical segments run from $y = x^2$ up to $y = 2x$, so their length is $2x - x^2$, not $2x + x^2$.',
      },
      {
        latex: '\\int_0^4 \\left(\\frac{y}{2} - \\sqrt{y}\\right)dy',
        expr: 'integral(y/2 - sqrt(y), y, 0, 4)',
        mistake: 'top-bottom-swapped',
        why: 'In $y$ the parabola $x = \\sqrt{y}$ is on the right and the line $x = \\frac{y}{2}$ on the left (test $y = 1$); this is left − right.',
      },
    ],
    correct: 3,
    explanation: '$x^2 = 2x$ gives $x = 0, 2$; at $x = 1$ the line is higher, so $A = \\int_0^2 (2x - x^2)\\,dx = \\tfrac43$.',
    check: { kind: 'value', expected: '4/3' },
    difficulty: 1,
  },
  {
    id: 'ar-f-012',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which integral gives the area of the region enclosed by $y = 4 - x^2$ and $y = x + 2$?' },
    options: [
      {
        latex: '\\int_{-2}^{1} (x^2 + x - 2)\\,dx',
        expr: 'integral(x^2 + x - 2, x, -2, 1)',
        mistake: 'top-bottom-swapped',
        why: 'At $x = 0$ the parabola ($4$) is above the line ($2$); this integrand is line − parabola.',
      },
      { latex: '\\int_{-2}^{1} (2 - x - x^2)\\,dx', expr: 'integral(2 - x - x^2, x, -2, 1)' },
      {
        latex: '\\int_{-1}^{2} (2 - x - x^2)\\,dx',
        expr: 'integral(2 - x - x^2, x, -1, 2)',
        mistake: 'sign-error',
        why: '$x^2 + x - 2 = (x + 2)(x - 1)$, so the curves meet at $x = -2$ and $x = 1$, not at $-1$ and $2$.',
      },
      {
        latex: '\\int_{0}^{1} (2 - x - x^2)\\,dx',
        expr: 'integral(2 - x - x^2, x, 0, 1)',
        mistake: 'missing-intersection',
        why: 'The region also extends left of the $y$-axis, to the intersection at $x = -2$.',
      },
      {
        latex: '\\int_{-2}^{1} (4 - x^2)\\,dx',
        expr: 'integral(4 - x^2, x, -2, 1)',
        mistake: 'single-function-area',
        why: 'This is the area between the parabola and the $x$-axis; the line $y = x + 2$, not the axis, is the lower boundary.',
      },
      {
        latex: '\\int_{0}^{3} (2 - x - x^2)\\,dx',
        expr: 'integral(2 - x - x^2, x, 0, 3)',
        mistake: 'bounds-wrong-variable',
        why: '$0$ and $3$ are the $y$-coordinates of the intersection points $(-2, 0)$ and $(1, 3)$; the limits must be $x$-values.',
      },
    ],
    correct: 1,
    explanation: '$4 - x^2 = x + 2$ gives $x = -2, 1$; the parabola is on top (test $x = 0$), so the integrand is $(4 - x^2) - (x + 2) = 2 - x - x^2$.',
    check: { kind: 'value', expected: '9/2' },
    difficulty: 1,
  },
  {
    id: 'ar-f-013',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which integral gives the area of the region enclosed by $y = x^2$ and $y = 8 - x^2$?' },
    options: [
      {
        latex: '\\int_{-2}^{2} (2x^2 - 8)\\,dx',
        expr: 'integral(2*x^2 - 8, x, -2, 2)',
        mistake: 'top-bottom-swapped',
        why: 'At $x = 0$, $8 - x^2 = 8$ is above $x^2 = 0$; this integrand is bottom − top.',
      },
      {
        latex: '\\int_{0}^{2} (8 - 2x^2)\\,dx',
        expr: 'integral(8 - 2*x^2, x, 0, 2)',
        mistake: 'missing-intersection',
        why: '$x^2 = 4$ has two solutions, $x = \\pm 2$; using only $x = 2$ leaves out the left half of the region.',
      },
      {
        latex: '\\int_{-2}^{2} 8\\,dx',
        expr: 'integral(8, x, -2, 2)',
        mistake: 'sum-instead-of-difference',
        why: 'Adding the curves gives $(8 - x^2) + x^2 = 8$; the vertical length is their difference, $(8 - x^2) - x^2$.',
      },
      {
        latex: '\\int_{-2\\sqrt{2}}^{2\\sqrt{2}} (8 - 2x^2)\\,dx',
        expr: 'integral(8 - 2*x^2, x, -2*sqrt(2), 2*sqrt(2))',
        mistake: 'algebra-error',
        why: 'Setting $x^2 = 8 - x^2$ gives $2x^2 = 8$, so $x^2 = 4$; using $x^2 = 8$ forgot to collect the two $x^2$ terms.',
      },
      {
        latex: '\\int_{-2}^{2} (8 - x^2)\\,dx',
        expr: 'integral(8 - x^2, x, -2, 2)',
        mistake: 'single-function-area',
        why: 'This is the area under the top parabola alone; the lower parabola $y = x^2$ must be subtracted.',
      },
      { latex: '\\int_{-2}^{2} (8 - 2x^2)\\,dx', expr: 'integral(8 - 2*x^2, x, -2, 2)' },
    ],
    correct: 5,
    explanation: '$x^2 = 8 - x^2$ gives $x = \\pm 2$; the downward parabola is on top, so $A = \\int_{-2}^{2}\\left((8 - x^2) - x^2\\right)dx = \\tfrac{64}{3}$.',
    check: { kind: 'value', expected: '64/3' },
    difficulty: 1,
  },
  {
    id: 'ar-f-014',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which integral gives the area of the region enclosed by $y = \\sqrt{x}$ and $y = x^3$?' },
    options: [
      {
        latex: '\\int_0^1 \\left(x^3 - \\sqrt{x}\\right)dx',
        expr: 'integral(x^3 - sqrt(x), x, 0, 1)',
        mistake: 'top-bottom-swapped',
        why: 'At $x = \\tfrac14$, $\\sqrt{x} = \\tfrac12$ is above $x^3 = \\tfrac1{64}$; this integrand is bottom − top.',
      },
      {
        latex: '\\int_0^1 \\left(\\sqrt{x} + x^3\\right)dx',
        expr: 'integral(sqrt(x) + x^3, x, 0, 1)',
        mistake: 'sum-instead-of-difference',
        why: 'The vertical length is $\\sqrt{x} - x^3$; adding counts the area under $y = x^3$ instead of removing it.',
      },
      { latex: '\\int_0^1 \\left(\\sqrt{x} - x^3\\right)dx', expr: 'integral(sqrt(x) - x^3, x, 0, 1)' },
      {
        latex: '\\int_0^1 \\sqrt{x}\\,dx',
        expr: 'integral(sqrt(x), x, 0, 1)',
        mistake: 'single-function-area',
        why: 'This is the area under $y = \\sqrt{x}$ only; the lower curve $y = x^3$ is ignored.',
      },
      {
        latex: '\\int_0^1 \\left(y^2 - \\sqrt[3]{y}\\right)dy',
        expr: 'integral(y^2 - nthRoot(y, 3), y, 0, 1)',
        mistake: 'top-bottom-swapped',
        why: 'In $y$ the curves are $x = y^2$ (left) and $x = \\sqrt[3]{y}$ (right); this integrand is left − right.',
      },
      {
        latex: '\\int_0^1 \\left(\\sqrt[3]{y} - \\sqrt{y}\\right)dy',
        expr: 'integral(nthRoot(y, 3) - sqrt(y), y, 0, 1)',
        mistake: 'inverse-function-wrong',
        why: 'Solving $y = \\sqrt{x}$ for $x$ gives $x = y^2$, not $x = \\sqrt{y}$.',
      },
    ],
    correct: 2,
    explanation: '$\\sqrt{x} = x^3$ gives $x = 0, 1$, and $\\sqrt{x}$ is on top in between, so $A = \\int_0^1 (\\sqrt{x} - x^3)\\,dx = \\tfrac{5}{12}$.',
    check: { kind: 'value', expected: '5/12' },
    difficulty: 1,
  },
  {
    id: 'ar-f-015',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'Which integral gives the area of the region bounded by $y = e^{x}$, the line $y = e$, and the $y$-axis?',
    },
    options: [
      {
        latex: '\\int_0^1 (e^{x} - e)\\,dx',
        expr: 'integral(exp(x) - e, x, 0, 1)',
        mistake: 'top-bottom-swapped',
        why: 'On $(0, 1)$, $e^x < e$, so the line $y = e$ is on top; this integrand is bottom − top.',
      },
      {
        latex: '\\int_0^1 e^{x}\\,dx',
        expr: 'integral(exp(x), x, 0, 1)',
        mistake: 'single-function-area',
        why: 'This is the area under $y = e^x$, which lies below the region; the region is between the curve and the line $y = e$.',
      },
      {
        latex: '\\int_0^{e} (e - e^{x})\\,dx',
        expr: 'integral(e - exp(x), x, 0, e)',
        mistake: 'bounds-wrong-variable',
        why: '$e$ is the $y$-value where the curve meets the line; that happens at $x = 1$, so the upper $x$-limit is $1$.',
      },
      {
        latex: '\\int_1^{e} e^{y}\\,dy',
        expr: 'integral(exp(y), y, 1, e)',
        mistake: 'inverse-function-wrong',
        why: 'Solving $y = e^x$ for $x$ gives $x = \\ln y$, not $x = e^y$.',
      },
      { latex: '\\int_0^1 (e - e^{x})\\,dx', expr: 'integral(e - exp(x), x, 0, 1)' },
      {
        latex: '\\int_0^1 (e + e^{x})\\,dx',
        expr: 'integral(e + exp(x), x, 0, 1)',
        mistake: 'sum-instead-of-difference',
        why: 'The vertical segment from the curve up to the line has length $e - e^x$, not $e + e^x$.',
      },
    ],
    correct: 4,
    explanation: 'The curve meets $y = e$ at $x = 1$ and stays below it on $(0, 1)$: $A = \\int_0^1 (e - e^x)\\,dx = e - (e - 1) = 1$.',
    check: { kind: 'value', expected: '1' },
    difficulty: 1,
  },
  {
    id: 'ar-f-016',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which expression gives the area between $y = \\sin x$ and $y = \\cos x$ for $0 \\le x \\le \\pi$?' },
    options: [
      {
        latex: '\\int_0^{\\pi/4} (\\cos x - \\sin x)\\,dx + \\int_{\\pi/4}^{\\pi} (\\sin x - \\cos x)\\,dx',
        expr: 'integral(cos(x) - sin(x), x, 0, pi/4) + integral(sin(x) - cos(x), x, pi/4, pi)',
      },
      {
        latex: '\\int_0^{\\pi} (\\sin x - \\cos x)\\,dx',
        expr: 'integral(sin(x) - cos(x), x, 0, pi)',
        mistake: 'top-bottom-not-split',
        why: 'On $(0, \\tfrac{\\pi}{4})$ cosine is on top, so a single integral subtracts that piece instead of adding it.',
      },
      {
        latex: '\\int_0^{\\pi/4} (\\sin x - \\cos x)\\,dx + \\int_{\\pi/4}^{\\pi} (\\cos x - \\sin x)\\,dx',
        expr: 'integral(sin(x) - cos(x), x, 0, pi/4) + integral(cos(x) - sin(x), x, pi/4, pi)',
        mistake: 'top-bottom-swapped',
        why: 'Both pieces are bottom − top: at $x = \\tfrac{\\pi}{6}$ cosine is larger, and at $x = \\tfrac{\\pi}{2}$ sine is larger.',
      },
      {
        latex: '\\int_0^{\\pi/4} (\\cos x - \\sin x)\\,dx + \\int_{\\pi/4}^{\\pi} (\\cos x - \\sin x)\\,dx',
        expr: 'integral(cos(x) - sin(x), x, 0, pi/4) + integral(cos(x) - sin(x), x, pi/4, pi)',
        mistake: 'top-bottom-not-split',
        why: 'The split is in the right place, but cosine was kept on top after $x = \\tfrac{\\pi}{4}$, where sine is above it.',
      },
      {
        latex: '\\int_0^{\\pi/4} (\\cos x - \\sin x)\\,dx + \\int_{\\pi/4}^{\\pi/2} (\\sin x - \\cos x)\\,dx',
        expr: 'integral(cos(x) - sin(x), x, 0, pi/4) + integral(sin(x) - cos(x), x, pi/4, pi/2)',
        mistake: 'interval-not-respected',
        why: 'The interval runs to $x = \\pi$, not $\\tfrac{\\pi}{2}$; the part of the region over $(\\tfrac{\\pi}{2}, \\pi)$ is missing.',
      },
      {
        latex: '\\int_0^{3\\pi/4} (\\cos x - \\sin x)\\,dx + \\int_{3\\pi/4}^{\\pi} (\\sin x - \\cos x)\\,dx',
        expr: 'integral(cos(x) - sin(x), x, 0, 3*pi/4) + integral(sin(x) - cos(x), x, 3*pi/4, pi)',
        mistake: 'sign-error',
        why: '$x = \\tfrac{3\\pi}{4}$ solves $\\tan x = -1$; the curves cross where $\\tan x = 1$, at $x = \\tfrac{\\pi}{4}$.',
      },
    ],
    correct: 0,
    explanation: '$\\sin x = \\cos x$ only at $x = \\tfrac{\\pi}{4}$ in $[0, \\pi]$; cosine is on top before it and sine after, giving $(\\sqrt2 - 1) + (1 + \\sqrt2) = 2\\sqrt2$.',
    check: { kind: 'value', expected: '2*sqrt(2)' },
    difficulty: 2,
  },
  {
    id: 'ar-f-017',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'Which expression gives the area of the triangle bounded by the lines $y = 2x$, $y = \\frac{x}{2}$, and $y = 3 - x$?',
    },
    options: [
      {
        latex: '\\int_0^2 \\left(2x - \\frac{x}{2}\\right)dx',
        expr: 'integral(2*x - x/2, x, 0, 2)',
        mistake: 'top-bottom-not-split',
        why: '$y = 2x$ is the top boundary only up to the corner at $x = 1$; after that the top is $y = 3 - x$.',
      },
      {
        latex: '\\int_0^2 \\left(3 - x - \\frac{x}{2}\\right)dx',
        expr: 'integral(3 - x - x/2, x, 0, 2)',
        mistake: 'top-bottom-not-split',
        why: '$y = 3 - x$ is the top boundary only from the corner at $x = 1$ on; before that the top is $y = 2x$.',
      },
      {
        latex: '\\int_0^1 \\left(2x - \\frac{x}{2}\\right)dx + \\int_1^3 \\left(3 - x - \\frac{x}{2}\\right)dx',
        expr: 'integral(2*x - x/2, x, 0, 1) + integral(3 - x - x/2, x, 1, 3)',
        mistake: 'missing-intersection',
        why: 'The right corner is where $y = 3 - x$ meets $y = \\frac{x}{2}$, at $x = 2$; $x = 3$ is where it meets the $x$-axis, which is not a boundary.',
      },
      {
        latex: '\\int_0^1 \\left(2x - \\frac{x}{2}\\right)dx + \\int_1^2 \\left(3 - x - \\frac{x}{2}\\right)dx',
        expr: 'integral(2*x - x/2, x, 0, 1) + integral(3 - x - x/2, x, 1, 2)',
      },
      {
        latex: '\\int_0^1 \\left(\\frac{x}{2} - 2x\\right)dx + \\int_1^2 \\left(\\frac{x}{2} - 3 + x\\right)dx',
        expr: 'integral(x/2 - 2*x, x, 0, 1) + integral(x/2 - 3 + x, x, 1, 2)',
        mistake: 'top-bottom-swapped',
        why: 'The line $y = \\frac{x}{2}$ is the bottom boundary throughout; both integrands here are bottom − top.',
      },
    ],
    correct: 3,
    explanation: 'The corners are at $x = 0, 1, 2$; the top boundary switches from $y = 2x$ to $y = 3 - x$ at $x = 1$ while $y = \\frac{x}{2}$ stays on the bottom, so $A = \\tfrac34 + \\tfrac34 = \\tfrac32$.',
    check: { kind: 'value', expected: '3/2' },
    difficulty: 2,
  },
  {
    id: 'ar-f-018',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which expression gives the area of the region enclosed by $y = x^3$ and $y = 4x$?' },
    options: [
      {
        latex: '\\int_{-2}^{2} (4x - x^3)\\,dx',
        expr: 'integral(4*x - x^3, x, -2, 2)',
        mistake: 'missing-intersection',
        why: 'Dividing $x^3 = 4x$ by $x$ loses the crossing $x = 0$, where the curves trade places; this single integral cancels to $0$.',
      },
      {
        latex: '\\int_{0}^{2} (4x - x^3)\\,dx',
        expr: 'integral(4*x - x^3, x, 0, 2)',
        mistake: 'missing-intersection',
        why: 'The negative root $x = -2$ of $x^2 = 4$ was dropped, so the left half of the region is missing.',
      },
      {
        latex: '\\int_{-2}^{0} (x^3 - 4x)\\,dx + \\int_{0}^{2} (4x - x^3)\\,dx',
        expr: 'integral(x^3 - 4*x, x, -2, 0) + integral(4*x - x^3, x, 0, 2)',
      },
      {
        latex: '\\int_{-2}^{0} (4x - x^3)\\,dx + \\int_{0}^{2} (x^3 - 4x)\\,dx',
        expr: 'integral(4*x - x^3, x, -2, 0) + integral(x^3 - 4*x, x, 0, 2)',
        mistake: 'top-bottom-swapped',
        why: 'At $x = -1$: $x^3 = -1 > -4 = 4x$, and at $x = 1$ the line is on top; both pieces here are bottom − top.',
      },
      {
        latex: '\\int_{-2}^{0} (4x - x^3)\\,dx + \\int_{0}^{2} (4x - x^3)\\,dx',
        expr: 'integral(4*x - x^3, x, -2, 0) + integral(4*x - x^3, x, 0, 2)',
        mistake: 'top-bottom-not-split',
        why: 'The split at $x = 0$ is right, but the line was kept on top on $(-2, 0)$, where the cubic is above it.',
      },
    ],
    correct: 2,
    explanation: '$x^3 = 4x$ gives $x = -2, 0, 2$; the cubic is on top on $(-2, 0)$ and the line on $(0, 2)$, so $A = 4 + 4 = 8$.',
    check: { kind: 'value', expected: '8' },
    difficulty: 2,
  },
  {
    id: 'ar-f-019',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which expression gives the area between $y = x^2$ and $y = x$ for $0 \\le x \\le 2$?' },
    options: [
      {
        latex: '\\int_0^2 (x^2 - x)\\,dx',
        expr: 'integral(x^2 - x, x, 0, 2)',
        mistake: 'top-bottom-not-split',
        why: 'On $(0, 1)$ the line is above the parabola, so that piece is subtracted instead of added.',
      },
      {
        latex: '\\int_0^2 (x - x^2)\\,dx',
        expr: 'integral(x - x^2, x, 0, 2)',
        mistake: 'top-bottom-not-split',
        why: 'On $(1, 2)$ the parabola is above the line, so that piece comes out negative.',
      },
      {
        latex: '\\int_0^1 (x^2 - x)\\,dx + \\int_1^2 (x - x^2)\\,dx',
        expr: 'integral(x^2 - x, x, 0, 1) + integral(x - x^2, x, 1, 2)',
        mistake: 'top-bottom-swapped',
        why: 'Test points $x = \\tfrac12$ and $x = \\tfrac32$ show the line on top first and then the parabola; both pieces here are reversed.',
      },
      {
        latex: '\\int_0^1 (x - x^2)\\,dx',
        expr: 'integral(x - x^2, x, 0, 1)',
        mistake: 'interval-not-respected',
        why: 'The curves meet at $x = 0$ and $x = 1$, but the problem asks for $0 \\le x \\le 2$; the piece over $[1, 2]$ is part of the region.',
      },
      {
        latex: '\\int_0^1 (x - x^2)\\,dx + \\int_1^2 (x^2 - x)\\,dx',
        expr: 'integral(x - x^2, x, 0, 1) + integral(x^2 - x, x, 1, 2)',
      },
    ],
    correct: 4,
    explanation: 'The curves cross at $x = 1$ inside $[0, 2]$: the line is on top on $(0, 1)$ and the parabola on $(1, 2)$, so $A = \\tfrac16 + \\tfrac56 = 1$.',
    check: { kind: 'value', expected: '1' },
    difficulty: 2,
  },
  {
    id: 'ar-f-020',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'Which integral gives the area of the region enclosed by the parabola $y^2 = 2x + 6$ and the line $y = x - 1$?',
    },
    options: [
      {
        latex: '\\int_{-2}^{4} \\left(\\frac{y^2}{2} - y - 4\\right)dy',
        expr: 'integral(y^2/2 - y - 4, y, -2, 4)',
        mistake: 'top-bottom-swapped',
        why: 'At $y = 0$ the line ($x = 1$) is to the right of the parabola ($x = -3$); this integrand is left − right.',
      },
      {
        latex: '\\int_{-2}^{4} \\left(y + 4 - \\frac{y^2}{2}\\right)dy',
        expr: 'integral(y + 4 - y^2/2, y, -2, 4)',
      },
      {
        latex: '\\int_{-1}^{5} \\left(y + 4 - \\frac{y^2}{2}\\right)dy',
        expr: 'integral(y + 4 - y^2/2, y, -1, 5)',
        mistake: 'bounds-wrong-variable',
        why: '$-1$ and $5$ are the $x$-coordinates of the intersection points $(-1, -2)$ and $(5, 4)$; a $dy$-integral needs their $y$-coordinates.',
      },
      {
        latex: '\\int_{-2}^{4} \\left(y + 2 - \\frac{y^2}{2}\\right)dy',
        expr: 'integral(y + 2 - y^2/2, y, -2, 4)',
        mistake: 'inverse-function-wrong',
        why: 'Solving $y = x - 1$ for $x$ gives $x = y + 1$, not $x = y - 1$.',
      },
      {
        latex: '\\int_{-1}^{5} \\left(\\sqrt{2x + 6} - x + 1\\right)dx',
        expr: 'integral(sqrt(2*x + 6) - x + 1, x, -1, 5)',
        mistake: 'top-bottom-not-split',
        why: 'In $x$ the region starts at the vertex $x = -3$, and for $-3 \\le x \\le -1$ its bottom is $y = -\\sqrt{2x + 6}$, not the line.',
      },
      {
        latex: '\\int_{-2}^{4} \\left(y + 4 - \\frac{y^2}{2}\\right)dx',
        expr: 'integral(y + 4 - y^2/2, x, -2, 4)',
        mistake: 'dx-dy-mismatch',
        why: 'The integrand is written in $y$, so the differential must be $dy$.',
      },
    ],
    correct: 1,
    explanation: 'Right: $x = y + 1$; left: $x = \\frac{y^2}{2} - 3$; they meet at $y = -2, 4$, so $A = \\int_{-2}^{4}\\left(y + 4 - \\frac{y^2}{2}\\right)dy = 18$.',
    check: { kind: 'value', expected: '18' },
    difficulty: 2,
  },
  {
    id: 'ar-f-021',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which integral gives the area of the region enclosed by the parabola $x = 9 - y^2$ and the $y$-axis?' },
    options: [
      {
        latex: '\\int_{-3}^{3} (y^2 - 9)\\,dy',
        expr: 'integral(y^2 - 9, y, -3, 3)',
        mistake: 'top-bottom-swapped',
        why: 'The parabola ($x = 9 - y^2 \\ge 0$ here) lies to the right of the $y$-axis; this integrand is left − right.',
      },
      {
        latex: '\\int_{0}^{9} (9 - y^2)\\,dy',
        expr: 'integral(9 - y^2, y, 0, 9)',
        mistake: 'bounds-wrong-variable',
        why: '$0$ to $9$ is the $x$-extent of the region; the $y$-limits come from $9 - y^2 = 0$, i.e. $y = \\pm 3$.',
      },
      {
        latex: '\\int_{0}^{3} (9 - y^2)\\,dy',
        expr: 'integral(9 - y^2, y, 0, 3)',
        mistake: 'missing-intersection',
        why: '$y^2 = 9$ has two solutions; dropping $y = -3$ leaves out the half of the region below the $x$-axis.',
      },
      { latex: '\\int_{-3}^{3} (9 - y^2)\\,dy', expr: 'integral(9 - y^2, y, -3, 3)' },
      {
        latex: '\\int_{0}^{9} \\sqrt{9 - x}\\,dx',
        expr: 'integral(sqrt(9 - x), x, 0, 9)',
        mistake: 'inverse-function-wrong',
        why: 'Solving $x = 9 - y^2$ for $y$ gives $y = \\pm\\sqrt{9 - x}$; using only the $+$ branch misses the lower half.',
      },
      {
        latex: '\\int_{-3}^{3} (9 - y^2)\\,dx',
        expr: 'integral(9 - y^2, x, -3, 3)',
        mistake: 'dx-dy-mismatch',
        why: 'An integrand written in $y$ needs $dy$; with $dx$ the variables are mixed.',
      },
    ],
    correct: 3,
    explanation: 'The parabola meets the $y$-axis at $y = \\pm 3$ and lies to its right, so $A = \\int_{-3}^{3}\\left((9 - y^2) - 0\\right)dy = 36$.',
    check: { kind: 'value', expected: '36' },
    difficulty: 2,
  },
  {
    id: 'ar-f-022',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'Which integral gives the area of the region bounded by $y = \\sqrt{x}$, $y = 2 - x$, and the $x$-axis?',
    },
    options: [
      {
        latex: '\\int_0^1 (y^2 + y - 2)\\,dy',
        expr: 'integral(y^2 + y - 2, y, 0, 1)',
        mistake: 'top-bottom-swapped',
        why: 'In $y$ the line $x = 2 - y$ is on the right and $x = y^2$ on the left; this integrand is left − right.',
      },
      {
        latex: '\\int_0^1 \\left(2 - y - \\sqrt{y}\\right)dy',
        expr: 'integral(2 - y - sqrt(y), y, 0, 1)',
        mistake: 'inverse-function-wrong',
        why: 'Solving $y = \\sqrt{x}$ for $x$ gives $x = y^2$, not $x = \\sqrt{y}$.',
      },
      {
        latex: '\\int_0^2 \\sqrt{x}\\,dx',
        expr: 'integral(sqrt(x), x, 0, 2)',
        mistake: 'top-bottom-not-split',
        why: '$y = \\sqrt{x}$ is the top boundary only for $0 \\le x \\le 1$; after that the top is $y = 2 - x$.',
      },
      {
        latex: '\\int_0^2 (2 - y - y^2)\\,dy',
        expr: 'integral(2 - y - y^2, y, 0, 2)',
        mistake: 'bounds-wrong-variable',
        why: '$0$ to $2$ is the $x$-extent of the region; its $y$-values run only from $0$ up to the intersection at $y = 1$.',
      },
      {
        latex: '\\int_0^1 \\sqrt{x}\\,dx + \\int_1^2 (x - 2)\\,dx',
        expr: 'integral(sqrt(x), x, 0, 1) + integral(x - 2, x, 1, 2)',
        mistake: 'top-bottom-swapped',
        why: 'On $[1, 2]$ the top is $y = 2 - x$ and the bottom is the axis, so the integrand there is $2 - x$, not $x - 2$.',
      },
      { latex: '\\int_0^1 (2 - y - y^2)\\,dy', expr: 'integral(2 - y - y^2, y, 0, 1)' },
    ],
    correct: 5,
    explanation: 'Every horizontal segment runs from $x = y^2$ to $x = 2 - y$ for $0 \\le y \\le 1$, so one $dy$-integral works: $\\int_0^1 (2 - y - y^2)\\,dy = \\tfrac76$.',
    check: { kind: 'value', expected: '7/6' },
    difficulty: 2,
  },
  {
    id: 'ar-f-023',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which integral gives the area of the region enclosed by $x = y^2$ and $x = y + 2$?' },
    options: [
      { latex: '\\int_{-1}^{2} (y + 2 - y^2)\\,dy', expr: 'integral(y + 2 - y^2, y, -1, 2)' },
      {
        latex: '\\int_{-1}^{2} (y^2 - y - 2)\\,dy',
        expr: 'integral(y^2 - y - 2, y, -1, 2)',
        mistake: 'top-bottom-swapped',
        why: 'At $y = 0$ the line ($x = 2$) is to the right of the parabola ($x = 0$); this integrand is left − right.',
      },
      {
        latex: '\\int_{1}^{4} (y + 2 - y^2)\\,dy',
        expr: 'integral(y + 2 - y^2, y, 1, 4)',
        mistake: 'bounds-wrong-variable',
        why: '$1$ and $4$ are the $x$-coordinates of the intersection points $(1, -1)$ and $(4, 2)$; a $dy$-integral needs $y$-limits.',
      },
      {
        latex: '\\int_{-2}^{1} (y + 2 - y^2)\\,dy',
        expr: 'integral(y + 2 - y^2, y, -2, 1)',
        mistake: 'sign-error',
        why: '$y^2 - y - 2 = (y - 2)(y + 1)$, so the curves meet at $y = -1$ and $y = 2$.',
      },
      {
        latex: '\\int_{0}^{2} (y + 2 - y^2)\\,dy',
        expr: 'integral(y + 2 - y^2, y, 0, 2)',
        mistake: 'missing-intersection',
        why: 'The region also extends below the $x$-axis, down to the intersection at $y = -1$.',
      },
      {
        latex: '\\int_{0}^{4} \\left(\\sqrt{x} - x + 2\\right)dx',
        expr: 'integral(sqrt(x) - x + 2, x, 0, 4)',
        mistake: 'top-bottom-not-split',
        why: 'In $x$, for $0 \\le x \\le 1$ the bottom boundary is $y = -\\sqrt{x}$, not the line $y = x - 2$, so one $dx$-integral does not describe the region.',
      },
    ],
    correct: 0,
    explanation: '$y^2 = y + 2$ gives $y = -1, 2$; the line is on the right (test $y = 0$), so $A = \\int_{-1}^{2}\\left((y + 2) - y^2\\right)dy = \\tfrac92$.',
    check: { kind: 'value', expected: '9/2' },
    difficulty: 1,
  },
  {
    id: 'ar-f-024',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which integral gives the area of the region enclosed by $y = x^2$ and the line $y = 4$?' },
    options: [
      {
        latex: '\\int_{-2}^{2} (x^2 - 4)\\,dx',
        expr: 'integral(x^2 - 4, x, -2, 2)',
        mistake: 'top-bottom-swapped',
        why: 'Between $x = -2$ and $x = 2$ the line $y = 4$ is above the parabola; this integrand is bottom − top.',
      },
      {
        latex: '\\int_{0}^{2} (4 - x^2)\\,dx',
        expr: 'integral(4 - x^2, x, 0, 2)',
        mistake: 'missing-intersection',
        why: '$x^2 = 4$ also has the solution $x = -2$; this covers only the right half of the region.',
      },
      { latex: '\\int_{-2}^{2} (4 - x^2)\\,dx', expr: 'integral(4 - x^2, x, -2, 2)' },
      {
        latex: '\\int_{0}^{4} (4 - x^2)\\,dx',
        expr: 'integral(4 - x^2, x, 0, 4)',
        mistake: 'bounds-wrong-variable',
        why: '$0$ to $4$ is the $y$-range of the region; the $x$-limits are $x = \\pm 2$.',
      },
      {
        latex: '\\int_{0}^{4} \\sqrt{y}\\,dy',
        expr: 'integral(sqrt(y), y, 0, 4)',
        mistake: 'inverse-function-wrong',
        why: 'Solving $y = x^2$ for $x$ gives $x = \\pm\\sqrt{y}$, so the horizontal length is $\\sqrt{y} - (-\\sqrt{y}) = 2\\sqrt{y}$.',
      },
      {
        latex: '\\int_{-2}^{2} x^2\\,dx',
        expr: 'integral(x^2, x, -2, 2)',
        mistake: 'single-function-area',
        why: 'This is the area under the parabola, which lies outside the region; the region is between the parabola and the line $y = 4$.',
      },
    ],
    correct: 2,
    explanation: '$x^2 = 4$ gives $x = \\pm 2$ and the line is on top, so $A = \\int_{-2}^{2}(4 - x^2)\\,dx = \\tfrac{32}{3}$.',
    check: { kind: 'value', expected: '32/3' },
    difficulty: 1,
  },
  {
    id: 'ar-f-025',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'The curves $y = \\sin x$ and $y = \\frac{2x}{\\pi}$ meet at $x = 0$ and $x = \\frac{\\pi}{2}$. Which integral gives the area of the region they enclose between these points?',
    },
    options: [
      {
        latex: '\\int_0^{\\pi/2} \\left(\\frac{2x}{\\pi} - \\sin x\\right)dx',
        expr: 'integral(2*x/pi - sin(x), x, 0, pi/2)',
        mistake: 'top-bottom-swapped',
        why: 'At $x = \\tfrac{\\pi}{4}$, $\\sin x \\approx 0.71$ is above $\\frac{2x}{\\pi} = 0.5$, so the sine curve is on top.',
      },
      {
        latex: '\\int_0^{\\pi/2} \\sin x\\,dx',
        expr: 'integral(sin(x), x, 0, pi/2)',
        mistake: 'single-function-area',
        why: 'This is the area under the sine curve alone; the line is the lower boundary and must be subtracted.',
      },
      {
        latex: '\\int_0^{1} \\left(\\sin x - \\frac{2x}{\\pi}\\right)dx',
        expr: 'integral(sin(x) - 2*x/pi, x, 0, 1)',
        mistake: 'bounds-wrong-variable',
        why: '$1$ is the $y$-coordinate of the intersection point $(\\tfrac{\\pi}{2}, 1)$; the upper $x$-limit is $\\tfrac{\\pi}{2}$.',
      },
      {
        latex: '\\int_0^{\\pi/2} \\left(\\sin x - \\frac{2x}{\\pi}\\right)dx',
        expr: 'integral(sin(x) - 2*x/pi, x, 0, pi/2)',
      },
      {
        latex: '\\int_0^{\\pi/2} \\left(\\sin x + \\frac{2x}{\\pi}\\right)dx',
        expr: 'integral(sin(x) + 2*x/pi, x, 0, pi/2)',
        mistake: 'sum-instead-of-difference',
        why: 'The vertical length is $\\sin x - \\frac{2x}{\\pi}$; adding the line\'s height counts the triangle under the line as well.',
      },
    ],
    correct: 3,
    explanation: 'The sine curve bulges above the line between the intersections, so $A = \\int_0^{\\pi/2}\\left(\\sin x - \\frac{2x}{\\pi}\\right)dx = 1 - \\frac{\\pi}{4}$.',
    check: { kind: 'value', expected: '1 - pi/4' },
    difficulty: 2,
  },
  {
    id: 'ar-f-026',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'Which integral gives the area of the region enclosed by $y = x^2 - 4$ and $y = x - 2$? (This region lies below the $x$-axis.)',
    },
    options: [
      {
        latex: '\\int_{-1}^{2} (x^2 - x - 2)\\,dx',
        expr: 'integral(x^2 - x - 2, x, -1, 2)',
        mistake: 'top-bottom-swapped',
        why: 'Lying below the axis does not flip top and bottom: at $x = 0$ the line ($-2$) is above the parabola ($-4$).',
      },
      { latex: '\\int_{-1}^{2} (x + 2 - x^2)\\,dx', expr: 'integral(x + 2 - x^2, x, -1, 2)' },
      {
        latex: '-\\int_{-1}^{2} (x + 2 - x^2)\\,dx',
        expr: '-integral(x + 2 - x^2, x, -1, 2)',
        mistake: 'signed-area-confusion',
        why: 'The extra minus sign is for a single curve below the axis; top − bottom is already positive.',
      },
      {
        latex: '\\int_{-1}^{2} (4 - x^2)\\,dx',
        expr: 'integral(4 - x^2, x, -1, 2)',
        mistake: 'single-function-area',
        why: 'This is the area between the parabola and the $x$-axis; the upper boundary is the line $y = x - 2$, not the axis.',
      },
      {
        latex: '\\int_{-2}^{2} (x + 2 - x^2)\\,dx',
        expr: 'integral(x + 2 - x^2, x, -2, 2)',
        mistake: 'missing-intersection',
        why: '$x = \\pm 2$ are where the parabola meets the $x$-axis; the curves meet each other at $x = -1$ and $x = 2$.',
      },
    ],
    correct: 1,
    explanation: '$x^2 - 4 = x - 2$ gives $x = -1, 2$, and the line is on top, so $A = \\int_{-1}^{2}\\left((x - 2) - (x^2 - 4)\\right)dx = \\tfrac92$, wherever the region sits.',
    check: { kind: 'value', expected: '9/2' },
    difficulty: 2,
  },
  {
    id: 'ar-f-027',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'Which expression gives the area of the region enclosed by $y = |x|$ and $y = 2 - x^2$?' },
    options: [
      {
        latex: '\\int_{-2}^{1} (2 - x^2 - x)\\,dx',
        expr: 'integral(2 - x^2 - x, x, -2, 1)',
        mistake: 'abs-value-region-wrong',
        why: 'Treating $|x|$ as $x$ everywhere gives intersections $x = -2, 1$; for $x < 0$ the boundary is $y = -x$.',
      },
      {
        latex: '\\int_{-1}^{1} (2 - x^2 - x)\\,dx',
        expr: 'integral(2 - x^2 - x, x, -1, 1)',
        mistake: 'abs-value-region-wrong',
        why: 'The limits are right, but on $[-1, 0]$, $|x| = -x$, so the integrand there is $2 - x^2 + x$.',
      },
      {
        latex: '\\int_{0}^{1} (2 - x^2 - x)\\,dx',
        expr: 'integral(2 - x^2 - x, x, 0, 1)',
        mistake: 'missing-intersection',
        why: 'The left intersection $x = -1$ was missed; the region also has a half to the left of the $y$-axis.',
      },
      {
        latex: '\\int_{-1}^{0} (2 - x^2 - x)\\,dx + \\int_{0}^{1} (2 - x^2 + x)\\,dx',
        expr: 'integral(2 - x^2 - x, x, -1, 0) + integral(2 - x^2 + x, x, 0, 1)',
        mistake: 'abs-value-region-wrong',
        why: 'The two cases of $|x|$ are reversed: $|x| = -x$ for $x < 0$ and $|x| = x$ for $x \\ge 0$.',
      },
      {
        latex: '\\int_{-1}^{0} (2 - x^2 + x)\\,dx + \\int_{0}^{1} (2 - x^2 - x)\\,dx',
        expr: 'integral(2 - x^2 + x, x, -1, 0) + integral(2 - x^2 - x, x, 0, 1)',
      },
      {
        latex: '\\int_{-1}^{0} (x^2 - 2 - x)\\,dx + \\int_{0}^{1} (x^2 - 2 + x)\\,dx',
        expr: 'integral(x^2 - 2 - x, x, -1, 0) + integral(x^2 - 2 + x, x, 0, 1)',
        mistake: 'top-bottom-swapped',
        why: 'At $x = 0$ the parabola ($2$) is above $y = |x|$ ($0$); both pieces here are bottom − top.',
      },
    ],
    correct: 4,
    explanation: '$2 - x^2 = |x|$ at $x = \\pm 1$; since $|x|$ changes formula at $0$, split there: $\\tfrac76 + \\tfrac76 = \\tfrac73$.',
    check: { kind: 'value', expected: '7/3' },
    difficulty: 2,
  },
  {
    id: 'ar-f-028',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'Which expression gives the area of the region bounded by $y = \\sqrt{x - 1}$, $y = x - 3$, and the $x$-axis?',
    },
    options: [
      {
        latex: '\\int_1^5 \\left(\\sqrt{x - 1} - x + 3\\right)dx',
        expr: 'integral(sqrt(x - 1) - x + 3, x, 1, 5)',
        mistake: 'top-bottom-not-split',
        why: 'For $1 \\le x \\le 3$ the bottom boundary is the $x$-axis, not the line $y = x - 3$ (which is below the axis there).',
      },
      {
        latex: '\\int_1^5 \\sqrt{x - 1}\\,dx',
        expr: 'integral(sqrt(x - 1), x, 1, 5)',
        mistake: 'single-function-area',
        why: 'This is the whole area under the square-root curve; the triangle between the line and the axis for $3 \\le x \\le 5$ is not part of the region.',
      },
      {
        latex: '\\int_1^3 \\sqrt{x - 1}\\,dx + \\int_3^5 \\left(\\sqrt{x - 1} - x + 3\\right)dx',
        expr: 'integral(sqrt(x - 1), x, 1, 3) + integral(sqrt(x - 1) - x + 3, x, 3, 5)',
      },
      {
        latex: '\\int_0^2 (y^2 - y - 2)\\,dy',
        expr: 'integral(y^2 - y - 2, y, 0, 2)',
        mistake: 'top-bottom-swapped',
        why: 'In $y$ the line $x = y + 3$ is on the right and $x = y^2 + 1$ on the left; this integrand is left − right.',
      },
      {
        latex: '\\int_0^2 (y + 4 - y^2)\\,dy',
        expr: 'integral(y + 4 - y^2, y, 0, 2)',
        mistake: 'inverse-function-wrong',
        why: 'Solving $y = \\sqrt{x - 1}$ for $x$ gives $x = y^2 + 1$, not $x = y^2 - 1$.',
      },
      {
        latex: '\\int_1^5 (y + 2 - y^2)\\,dy',
        expr: 'integral(y + 2 - y^2, y, 1, 5)',
        mistake: 'bounds-wrong-variable',
        why: '$1$ and $5$ are $x$-values; the region\'s $y$-values run from $0$ to $2$.',
      },
    ],
    correct: 2,
    explanation: 'In $x$ the bottom boundary changes at $x = 3$ (first the axis, then the line), so the area splits there; the two pieces total $\\tfrac{10}{3}$.',
    check: { kind: 'value', expected: '10/3' },
    difficulty: 2,
  },

  // ───────────── evaluate a set-up area integral ─────────────
  {
    id: 'ar-f-029',
    topic: 'area',
    kind: 'evaluate',
    prompt: { text: 'This integral is the area between $y = 2x$ and $y = x^2$. Evaluate it.', latex: '\\int_0^2 (2x - x^2)\\,dx' },
    options: [
      {
        latex: '\\frac{16}{3}',
        expr: '16/3',
        mistake: 'power-rule-int-coefficient',
        why: 'Took $\\int 2x\\,dx = 2x^2$ without dividing by 2: $8 - \\frac83 = \\frac{16}{3}$.',
      },
      {
        latex: '-4',
        expr: '-4',
        mistake: 'power-rule-int-coefficient',
        why: 'Took $\\int x^2\\,dx = x^3$ without dividing by 3: $4 - 8 = -4$.',
      },
      { latex: '\\frac{4}{3}', expr: '4/3' },
      {
        latex: '\\frac{8}{3}',
        expr: '8/3',
        mistake: 'power-rule-int-exponent',
        why: 'Divided by 3 but kept the exponent: $\\int x^2\\,dx$ written as $\\frac{x^2}{3}$, giving $4 - \\frac43$.',
      },
      {
        latex: '\\frac{20}{3}',
        expr: '20/3',
        mistake: 'sign-error',
        why: 'The antiderivative was written $x^2 + \\frac{x^3}{3}$; the minus sign in front of $x^2$ was lost.',
      },
      {
        latex: '2',
        expr: '2',
        mistake: 'arithmetic-error',
        why: 'Evaluated $2^3$ as $6$, so $\\frac{2^3}{3}$ became $2$; in fact $2^3 = 8$.',
      },
    ],
    correct: 2,
    explanation: '$\\left[x^2 - \\frac{x^3}{3}\\right]_0^2 = 4 - \\frac83 = \\frac43$.',
    check: { kind: 'definite-integral', integrand: '2*x - x^2', lower: '0', upper: '2' },
    difficulty: 1,
  },
  {
    id: 'ar-f-030',
    topic: 'area',
    kind: 'evaluate',
    prompt: {
      text: 'This integral is the area between $y = 4 - x^2$ and $y = x + 2$. Evaluate it.',
      latex: '\\int_{-2}^{1} (2 - x - x^2)\\,dx',
    },
    options: [
      { latex: '\\frac{9}{2}', expr: '9/2' },
      {
        latex: '\\frac{7}{6}',
        expr: '7/6',
        mistake: 'ftc-not-subtracted',
        why: 'Only $F(1) = \\frac76$ was computed; $F(-2) = -\\frac{10}{3}$ must be subtracted.',
      },
      {
        latex: '-\\frac{13}{6}',
        expr: '-13/6',
        mistake: 'ftc-not-subtracted',
        why: 'Added $F(1) + F(-2) = \\frac76 - \\frac{10}{3}$ instead of subtracting $F(-2)$.',
      },
      {
        latex: '\\frac{1}{2}',
        expr: '1/2',
        mistake: 'negative-squared-wrong',
        why: 'Used $(-2)^2 = -4$ in $-\\frac{x^2}{2}$, so $F(-2)$ came out as $\\frac23$ instead of $-\\frac{10}{3}$.',
      },
      {
        latex: '\\frac{59}{6}',
        expr: '59/6',
        mistake: 'negative-squared-wrong',
        why: 'Used $(-2)^3 = 8$, so $-\\frac{x^3}{3}$ gave $-\\frac83$ at $x = -2$ and $F(-2) = -\\frac{26}{3}$.',
      },
      {
        latex: '-\\frac{3}{2}',
        expr: '-3/2',
        mistake: 'power-rule-int-coefficient',
        why: 'Took $\\int x^2\\,dx = x^3$ without dividing by 3, so $F(x) = 2x - \\frac{x^2}{2} - x^3$.',
      },
    ],
    correct: 0,
    explanation: '$\\left[2x - \\frac{x^2}{2} - \\frac{x^3}{3}\\right]_{-2}^{1} = \\frac76 - \\left(-\\frac{10}{3}\\right) = \\frac92$.',
    check: { kind: 'definite-integral', integrand: '2 - x - x^2', lower: '-2', upper: '1' },
    difficulty: 1,
  },
  {
    id: 'ar-f-031',
    topic: 'area',
    kind: 'evaluate',
    prompt: {
      text: 'This integral is the area between $y = \\sqrt{x}$ and $y = x^3$. Evaluate it.',
      latex: '\\int_0^1 \\left(\\sqrt{x} - x^3\\right)dx',
    },
    options: [
      {
        latex: '\\frac{5}{4}',
        expr: '5/4',
        mistake: 'power-rule-int-coefficient',
        why: 'Multiplied by the new exponent instead of dividing: $\\int\\sqrt{x}\\,dx$ written as $\\frac32 x^{3/2}$, giving $\\frac32 - \\frac14$.',
      },
      {
        latex: '\\frac{1}{3}',
        expr: '1/3',
        mistake: 'power-rule-int-coefficient',
        why: 'Divided by the old exponent: $\\int x^3\\,dx$ written as $\\frac{x^4}{3}$, giving $\\frac23 - \\frac13$.',
      },
      {
        latex: '\\frac{11}{12}',
        expr: '11/12',
        mistake: 'sign-error',
        why: 'The antiderivative was written $\\frac23 x^{3/2} + \\frac{x^4}{4}$; the minus sign was lost.',
      },
      { latex: '\\frac{5}{12}', expr: '5/12' },
      {
        latex: '\\frac{1}{12}',
        expr: '1/12',
        mistake: 'arithmetic-error',
        why: 'Subtracted numerators and multiplied denominators; $\\frac23 - \\frac14 = \\frac{8 - 3}{12} = \\frac{5}{12}$.',
      },
      {
        latex: '\\frac{3}{4}',
        expr: '3/4',
        mistake: 'power-rule-int-coefficient',
        why: 'Wrote $\\int\\sqrt{x}\\,dx = x^{3/2}$, forgetting to divide by $\\frac32$: $1 - \\frac14$.',
      },
    ],
    correct: 3,
    explanation: '$\\left[\\frac23 x^{3/2} - \\frac{x^4}{4}\\right]_0^1 = \\frac23 - \\frac14 = \\frac{5}{12}$.',
    check: { kind: 'definite-integral', integrand: 'sqrt(x) - x^3', lower: '0', upper: '1' },
    difficulty: 1,
  },
  {
    id: 'ar-f-032',
    topic: 'area',
    kind: 'evaluate',
    prompt: {
      text: 'This integral is the area of the region bounded by $y = 2$, $y = e^{x}$, and the $y$-axis. Evaluate it.',
      latex: '\\int_0^{\\ln 2} (2 - e^{x})\\,dx',
    },
    options: [
      {
        latex: '\\ln 2 - 1',
        expr: 'log(2) - 1',
        mistake: 'coefficient-mishandled',
        why: 'Integrated the constant $2$ as $x$ instead of $2x$, so $F(\\ln 2) = \\ln 2 - 2$.',
      },
      {
        latex: '2\\ln 2 - 2',
        expr: '2*log(2) - 2',
        mistake: 'ftc-not-subtracted',
        why: 'Only $F(\\ln 2) = 2\\ln 2 - 2$ was kept; $F(0) = 0 - e^0 = -1$ is not zero and must be subtracted.',
      },
      {
        latex: '2\\ln 2 - 3',
        expr: '2*log(2) - 3',
        mistake: 'sign-error',
        why: 'Subtracted $F(0)$ as if it were $+1$; in fact $F(0) = 0 - e^0 = -1$.',
      },
      {
        latex: '2\\ln 2 + 1',
        expr: '2*log(2) + 1',
        mistake: 'sign-error',
        why: 'The antiderivative was written $2x + e^{x}$; the minus sign in front of $e^x$ was lost.',
      },
      {
        latex: '\\ln 2 + 1',
        expr: 'log(2) + 1',
        mistake: 'arithmetic-error',
        why: 'Evaluated $e^{\\ln 2}$ as $\\ln 2$; since $e^x$ and $\\ln x$ are inverses, $e^{\\ln 2} = 2$.',
      },
      { latex: '2\\ln 2 - 1', expr: '2*log(2) - 1' },
    ],
    correct: 5,
    explanation: '$\\left[2x - e^{x}\\right]_0^{\\ln 2} = (2\\ln 2 - 2) - (0 - 1) = 2\\ln 2 - 1$.',
    check: { kind: 'definite-integral', integrand: '2 - exp(x)', lower: '0', upper: 'log(2)' },
    difficulty: 1,
  },
  {
    id: 'ar-f-033',
    topic: 'area',
    kind: 'evaluate',
    prompt: {
      text: 'This integral is the area of the region between $x = y^2$ and $x = 4$. Evaluate it.',
      latex: '\\int_{-2}^{2} (4 - y^2)\\,dy',
    },
    options: [
      {
        latex: '\\frac{16}{3}',
        expr: '16/3',
        mistake: 'ftc-not-subtracted',
        why: 'Only $F(2) = \\frac{16}{3}$ was computed; subtracting $F(-2) = -\\frac{16}{3}$ doubles it.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'ftc-not-subtracted',
        why: 'Added $F(2) + F(-2)$, which cancel; the Fundamental Theorem subtracts them.',
      },
      {
        latex: '16',
        expr: '16',
        mistake: 'negative-squared-wrong',
        why: 'Used $(-2)^3 = 8$, so $F(-2)$ became $-8 - \\frac83 = -\\frac{32}{3}$ instead of $-\\frac{16}{3}$.',
      },
      {
        latex: '-\\frac{16}{3}',
        expr: '-16/3',
        mistake: 'ftc-not-subtracted',
        why: 'Only the lower-limit value $F(-2) = -\\frac{16}{3}$ was used; the area is $F(2) - F(-2)$.',
      },
      { latex: '\\frac{32}{3}', expr: '32/3' },
      {
        latex: '\\frac{64}{3}',
        expr: '64/3',
        mistake: 'coefficient-mishandled',
        why: 'Doubled for symmetry even though the limits $-2$ to $2$ already cover both halves of the region.',
      },
    ],
    correct: 4,
    explanation: '$\\left[4y - \\frac{y^3}{3}\\right]_{-2}^{2} = \\frac{16}{3} - \\left(-\\frac{16}{3}\\right) = \\frac{32}{3}$.',
    variable: 'y',
    check: { kind: 'definite-integral', integrand: '4 - y^2', lower: '-2', upper: '2' },
    difficulty: 2,
  },
  {
    id: 'ar-f-034',
    topic: 'area',
    kind: 'evaluate',
    prompt: {
      text: 'This integral is the area between $y = \\cos x$ and $y = \\sin x$ for $0 \\le x \\le \\frac{\\pi}{4}$. Evaluate it.',
      latex: '\\int_0^{\\pi/4} (\\cos x - \\sin x)\\,dx',
    },
    options: [
      {
        latex: '\\sqrt{2}',
        expr: 'sqrt(2)',
        mistake: 'ftc-not-subtracted',
        why: 'Stopped at $F\\left(\\frac{\\pi}{4}\\right) = \\sqrt2$; $F(0) = \\sin 0 + \\cos 0 = 1$ must be subtracted.',
      },
      { latex: '\\sqrt{2} - 1', expr: 'sqrt(2) - 1' },
      {
        latex: '\\sqrt{2} + 1',
        expr: 'sqrt(2) + 1',
        mistake: 'ftc-not-subtracted',
        why: 'Added $F(0) = 1$ instead of subtracting it.',
      },
      {
        latex: '1',
        expr: '1',
        mistake: 'trig-antiderivative-sign',
        why: 'Used $\\int \\sin x\\,dx = \\cos x$, so the antiderivative became $\\sin x - \\cos x$ and the result $0 - (-1) = 1$.',
      },
      {
        latex: '\\frac{\\sqrt{2}}{2} - 1',
        expr: 'sqrt(2)/2 - 1',
        mistake: 'arithmetic-error',
        why: '$\\sin\\frac{\\pi}{4} + \\cos\\frac{\\pi}{4} = \\frac{\\sqrt2}{2} + \\frac{\\sqrt2}{2} = \\sqrt2$; only one of the two terms was counted.',
      },
      {
        latex: '2\\sqrt{2} - 1',
        expr: '2*sqrt(2) - 1',
        mistake: 'arithmetic-error',
        why: 'Took $\\sin\\frac{\\pi}{4} = \\cos\\frac{\\pi}{4} = \\sqrt2$; each is $\\frac{\\sqrt2}{2}$.',
      },
    ],
    correct: 1,
    explanation: '$\\left[\\sin x + \\cos x\\right]_0^{\\pi/4} = \\left(\\frac{\\sqrt2}{2} + \\frac{\\sqrt2}{2}\\right) - (0 + 1) = \\sqrt2 - 1$.',
    check: { kind: 'definite-integral', integrand: 'cos(x) - sin(x)', lower: '0', upper: 'pi/4' },
    difficulty: 2,
  },
  {
    id: 'ar-f-035',
    topic: 'area',
    kind: 'evaluate',
    prompt: {
      text: 'This integral is the area between $y = \\sin x$ and $y = \\frac{2x}{\\pi}$. Evaluate it.',
      latex: '\\int_0^{\\pi/2} \\left(\\sin x - \\frac{2x}{\\pi}\\right)dx',
    },
    options: [
      {
        latex: '-\\frac{\\pi}{4}',
        expr: '-pi/4',
        mistake: 'ftc-not-subtracted',
        why: 'Only $F\\left(\\frac{\\pi}{2}\\right) = -\\frac{\\pi}{4}$ was kept; $F(0) = -\\cos 0 = -1$ must be subtracted.',
      },
      {
        latex: '-1 - \\frac{\\pi}{4}',
        expr: '-1 - pi/4',
        mistake: 'trig-antiderivative-sign',
        why: 'Used $\\int \\sin x\\,dx = \\cos x$: then $F(0) = 1$ and the result is $-\\frac{\\pi}{4} - 1$.',
      },
      {
        latex: '1 - \\frac{\\pi}{2}',
        expr: '1 - pi/2',
        mistake: 'power-rule-int-coefficient',
        why: 'Wrote $\\int \\frac{2x}{\\pi}\\,dx = \\frac{2x^2}{\\pi}$ without dividing by 2.',
      },
      { latex: '1 - \\frac{\\pi}{4}', expr: '1 - pi/4' },
      {
        latex: '1 + \\frac{\\pi}{4}',
        expr: '1 + pi/4',
        mistake: 'sign-error',
        why: 'The line\'s term entered the antiderivative with a plus sign: $-\\cos x + \\frac{x^2}{\\pi}$.',
      },
    ],
    correct: 3,
    explanation: '$\\left[-\\cos x - \\frac{x^2}{\\pi}\\right]_0^{\\pi/2} = -\\frac{\\pi}{4} - (-1) = 1 - \\frac{\\pi}{4}$.',
    check: { kind: 'definite-integral', integrand: 'sin(x) - 2*x/pi', lower: '0', upper: 'pi/2' },
    difficulty: 2,
  },
  {
    id: 'ar-f-036',
    topic: 'area',
    kind: 'evaluate',
    prompt: {
      text: 'This integral is the area between $y = e^{2x}$ and $y = e^{x}$ for $0 \\le x \\le 1$. Evaluate it.',
      latex: '\\int_0^1 (e^{2x} - e^{x})\\,dx',
    },
    options: [
      {
        latex: 'e^2 - e',
        expr: 'e^2 - e',
        mistake: 'exp-antiderivative-wrong',
        why: 'Used $\\int e^{2x}\\,dx = e^{2x}$, missing the factor $\\frac12$: $(e^2 - e) - (1 - 1)$.',
      },
      {
        latex: '2e^2 - e - 1',
        expr: '2*e^2 - e - 1',
        mistake: 'exp-antiderivative-wrong',
        why: 'Multiplied by 2 instead of dividing: $\\int e^{2x}\\,dx$ written as $2e^{2x}$.',
      },
      { latex: '\\frac{e^2}{2} - e + \\frac{1}{2}', expr: 'e^2/2 - e + 1/2' },
      {
        latex: '\\frac{e^2}{2} - e',
        expr: 'e^2/2 - e',
        mistake: 'ftc-not-subtracted',
        why: 'Dropped $F(0) = \\frac12 - 1 = -\\frac12$, which must be subtracted.',
      },
      {
        latex: '\\frac{e^2}{2} - e - \\frac{1}{2}',
        expr: 'e^2/2 - e - 1/2',
        mistake: 'sign-error',
        why: 'Subtracted $F(0)$ as if it were $+\\frac12$; in fact $F(0) = \\frac12 - 1 = -\\frac12$.',
      },
    ],
    correct: 2,
    explanation: '$\\left[\\frac{e^{2x}}{2} - e^{x}\\right]_0^1 = \\left(\\frac{e^2}{2} - e\\right) - \\left(\\frac12 - 1\\right) = \\frac{e^2}{2} - e + \\frac12$.',
    check: { kind: 'definite-integral', integrand: 'exp(2*x) - exp(x)', lower: '0', upper: '1' },
    difficulty: 2,
  },
  {
    id: 'ar-f-037',
    topic: 'area',
    kind: 'evaluate',
    prompt: {
      text: 'This integral is the area between $y = x^2$ and $y = x^4$. Evaluate it.',
      latex: '\\int_{-1}^{1} (x^2 - x^4)\\,dx',
    },
    options: [
      { latex: '\\frac{4}{15}', expr: '4/15' },
      {
        latex: '\\frac{2}{15}',
        expr: '2/15',
        mistake: 'ftc-not-subtracted',
        why: 'Only $F(1) = \\frac{2}{15}$ was computed; $F(-1) = -\\frac{2}{15}$ must be subtracted.',
      },
      {
        latex: '0',
        expr: '0',
        mistake: 'ftc-not-subtracted',
        why: 'Added $F(1) + F(-1)$, which cancel; subtract instead.',
      },
      {
        latex: '\\frac{2}{3}',
        expr: '2/3',
        mistake: 'negative-squared-wrong',
        why: 'Used $(-1)^5 = 1$, so $F(-1) = -\\frac13 - \\frac15 = -\\frac{8}{15}$ instead of $-\\frac{2}{15}$.',
      },
      {
        latex: '\\frac{1}{6}',
        expr: '1/6',
        mistake: 'power-rule-int-coefficient',
        why: 'Divided by the old exponent: $\\int x^4\\,dx$ written as $\\frac{x^5}{4}$.',
      },
      {
        latex: '-\\frac{2}{5}',
        expr: '-2/5',
        mistake: 'negative-squared-wrong',
        why: 'Used $(-1)^3 = 1$, so $F(-1) = \\frac13 + \\frac15 = \\frac{8}{15}$ instead of $-\\frac{2}{15}$.',
      },
    ],
    correct: 0,
    explanation: '$\\left[\\frac{x^3}{3} - \\frac{x^5}{5}\\right]_{-1}^{1} = \\frac{2}{15} - \\left(-\\frac{2}{15}\\right) = \\frac{4}{15}$.',
    check: { kind: 'definite-integral', integrand: 'x^2 - x^4', lower: '-1', upper: '1' },
    difficulty: 2,
  },

  // ───────────── technique: x or y, one integral or two ─────────────
  {
    id: 'ar-f-038',
    topic: 'area',
    kind: 'technique',
    prompt: {
      text: 'Region enclosed by $y = x^2 - 2x$ and $y = x$. Which plan is correct and uses the fewest integrals?',
    },
    options: [
      { text: 'In $x$: one integral, from $y = x^2 - 2x$ up to $y = x$, for $0 \\le x \\le 3$' },
      {
        text: 'In $y$: one integral, from $x = y$ to $x = 1 + \\sqrt{1 + y}$, for $0 \\le y \\le 3$',
        mistake: 'top-bottom-not-split',
        why: 'In $y$ the region reaches down to the vertex at $y = -1$, where the left boundary is the other branch of the parabola; $dy$ would need two integrals.',
      },
      {
        text: 'In $x$: two integrals, since the top curve changes at the vertex $x = 1$',
        mistake: 'top-bottom-swapped',
        why: 'The line stays above the parabola on all of $(0, 3)$ (at $x = 2$: $2 > 0$); the vertex is not a crossing.',
      },
      {
        text: 'In $x$: one integral, from $y = x$ up to $y = x^2 - 2x$, for $0 \\le x \\le 3$',
        mistake: 'top-bottom-swapped',
        why: 'At $x = 1$ the line ($1$) is above the parabola ($-1$), so segments run from the parabola up to the line.',
      },
      {
        text: 'In $x$: one integral, from $y = x^2 - 2x$ up to $y = x$, for $0 \\le x \\le 2$',
        mistake: 'missing-intersection',
        why: '$0$ and $2$ are where the parabola meets the $x$-axis; the curves meet each other at $x = 0$ and $x = 3$.',
      },
      {
        text: 'In $x$: two integrals, since the parabola crosses the $x$-axis at $x = 2$ and the integrand changes sign there',
        mistake: 'signed-area-confusion',
        why: 'The integrand $x - (x^2 - 2x) = 3x - x^2$ stays positive on $(0, 3)$; only crossings of the two curves matter.',
      },
    ],
    correct: 0,
    explanation: '$x^2 - 2x = x$ gives $x = 0, 3$, and the line is on top throughout, so a single $dx$-integral works; in $y$ the left boundary changes.',
    check: { kind: 'none', reason: 'technique choice; text options' },
    difficulty: 1,
  },
  {
    id: 'ar-f-039',
    topic: 'area',
    kind: 'technique',
    prompt: {
      text: 'Region bounded by $y = \\sqrt{x - 1}$, $y = x - 3$, and the $x$-axis. Which setup gives its area as a single integral?',
    },
    options: [
      {
        text: 'In $x$: from $y = x - 3$ up to $y = \\sqrt{x - 1}$, for $1 \\le x \\le 5$',
        mistake: 'top-bottom-not-split',
        why: 'For $1 \\le x \\le 3$ the bottom boundary is the $x$-axis, not the line, so a single $dx$-integral is wrong.',
      },
      {
        text: 'In $y$: from $x = y^2 + 1$ to $x = y + 3$, for $1 \\le y \\le 5$',
        mistake: 'bounds-wrong-variable',
        why: '$1$ and $5$ are $x$-values; the region\'s $y$-values run from $0$ to $2$.',
      },
      {
        text: 'In $y$: from $x = \\sqrt{y - 1}$ to $x = y + 3$, for $0 \\le y \\le 2$',
        mistake: 'inverse-function-wrong',
        why: 'Solving $y = \\sqrt{x - 1}$ for $x$ gives $x = y^2 + 1$.',
      },
      {
        text: 'In $x$: from $y = x - 3$ up to $y = \\sqrt{x - 1}$, for $3 \\le x \\le 5$',
        mistake: 'missing-intersection',
        why: 'The region begins at $x = 1$, where $y = \\sqrt{x - 1}$ meets the $x$-axis; the piece over $[1, 3]$ is left out.',
      },
      { text: 'In $y$: from $x = y^2 + 1$ to $x = y + 3$, for $0 \\le y \\le 2$' },
      {
        text: 'In $y$: from $x = y + 3$ to $x = y^2 + 1$, for $0 \\le y \\le 2$',
        mistake: 'top-bottom-swapped',
        why: 'At $y = 1$ the line ($x = 4$) is to the right of the curve ($x = 2$); segments run from the curve to the line.',
      },
    ],
    correct: 4,
    explanation: 'Every horizontal segment runs from the curve $x = y^2 + 1$ to the line $x = y + 3$ for $0 \\le y \\le 2$, while in $x$ the bottom boundary changes at $x = 3$.',
    check: { kind: 'none', reason: 'technique choice; text options' },
    difficulty: 2,
  },
  {
    id: 'ar-f-040',
    topic: 'area',
    kind: 'technique',
    prompt: {
      text: 'Find the area between $y = x^2 - 2x$ and the $x$-axis for $0 \\le x \\le 3$. How should the integral be set up?',
    },
    options: [
      {
        text: 'One integral, $\\int_0^3 (x^2 - 2x)\\,dx$, since the $x$-axis is the other boundary',
        mistake: 'top-bottom-not-split',
        why: 'The curve is below the axis on $(0, 2)$ and above it on $(2, 3)$; this single integral cancels to $0$.',
      },
      { text: 'Split at $x = 2$: integrate $0 - (x^2 - 2x)$ on $[0, 2]$ and $(x^2 - 2x) - 0$ on $[2, 3]$' },
      {
        text: 'Split at $x = 1$, the vertex: integrate $0 - (x^2 - 2x)$ on $[0, 1]$ and $(x^2 - 2x) - 0$ on $[1, 3]$',
        mistake: 'missing-intersection',
        why: 'Top and bottom trade places where the curve crosses the axis, at $x = 2$, not at the vertex.',
      },
      {
        text: 'One integral, $\\int_0^2 (2x - x^2)\\,dx$, since past $x = 2$ the curve is above the axis',
        mistake: 'interval-not-respected',
        why: 'The interval is $[0, 3]$; the piece over $[2, 3]$, where the curve is above the axis, is part of the region.',
      },
      {
        text: 'Split at $x = 2$: integrate $x^2 - 2x$ on $[0, 2]$ and $2x - x^2$ on $[2, 3]$',
        mistake: 'top-bottom-swapped',
        why: 'On $(0, 2)$ the axis is on top (the curve is negative there), so both pieces here are bottom − top.',
      },
    ],
    correct: 1,
    explanation: '$x^2 - 2x = 0$ at $x = 0$ and $x = 2$: the axis is on top on $(0, 2)$ and the curve on $(2, 3)$, so the area is $\\tfrac43 + \\tfrac43 = \\tfrac83$.',
    check: { kind: 'none', reason: 'technique choice; text options' },
    difficulty: 1,
  },
  {
    id: 'ar-f-041',
    topic: 'area',
    kind: 'technique',
    prompt: {
      text: 'The curves $y = x^2$ and $y = x^4$ meet at $x = -1, 0, 1$. Which statement about the area between them is correct?',
    },
    options: [
      {
        text: 'Two integrals, because the curves meet at $x = 0$: $x^4$ is on top on $[-1, 0]$ and $x^2$ on $[0, 1]$',
        mistake: 'top-bottom-swapped',
        why: 'At $x = -\\tfrac12$: $x^2 = \\tfrac14 > \\tfrac1{16} = x^4$; the curves touch at $0$ but do not trade places.',
      },
      {
        text: 'One integral, $\\int_0^1 (x^2 - x^4)\\,dx$, because the region lies to the right of the $y$-axis',
        mistake: 'missing-intersection',
        why: 'The curves also meet at $x = -1$; the region has a second piece over $[-1, 0]$.',
      },
      {
        text: 'One integral, $\\int_{-1}^{1} (x^4 - x^2)\\,dx$, because the higher power of $x$ is on top',
        mistake: 'top-bottom-swapped',
        why: 'For $|x| < 1$ the higher power is the smaller one, so $x^2$ is on top.',
      },
      {
        text: 'One integral, $\\int_{-1}^{1} (x^2 - x^4)\\,dx$, because $x^2 \\ge x^4$ on $[-1, 1]$; at $x = 0$ they only touch',
      },
      {
        text: 'No integral is needed: the region is symmetric about the $y$-axis, so its area is $0$',
        mistake: 'signed-area-confusion',
        why: 'Symmetric pieces have equal areas that add; $x^2 - x^4$ is even and nonnegative, so nothing cancels.',
      },
    ],
    correct: 3,
    explanation: '$x^2 - x^4 = x^2(1 - x^2) \\ge 0$ on $[-1, 1]$, so the top curve never changes and one integral gives $\\tfrac{4}{15}$.',
    check: { kind: 'none', reason: 'technique choice; text options' },
    difficulty: 2,
  },

  // ───────────── intersections, test points, x = g(y) ─────────────
  {
    id: 'ar-f-042',
    topic: 'area',
    kind: 'concept',
    prompt: { text: 'At which $x$-values do $y = x^2$ and $y = x + 6$ intersect?' },
    options: [
      {
        latex: 'x = -3,\\quad x = 2',
        expr: '[-3, 2]',
        mistake: 'sign-error',
        why: '$x^2 - x - 6 = (x - 3)(x + 2)$; the signs of the roots were flipped.',
      },
      {
        latex: 'x = 4,\\quad x = 9',
        expr: '[4, 9]',
        mistake: 'bounds-wrong-variable',
        why: '$4$ and $9$ are the $y$-coordinates of the intersection points $(-2, 4)$ and $(3, 9)$.',
      },
      {
        latex: 'x = 6,\\quad x = 7',
        expr: '[6, 7]',
        mistake: 'algebra-error',
        why: 'From $x(x - 1) = 6$ you cannot set each factor equal to $6$; move everything to one side: $x^2 - x - 6 = 0$.',
      },
      { latex: 'x = -2,\\quad x = 3', expr: '[-2, 3]' },
      {
        latex: 'x = 3',
        expr: '3',
        mistake: 'missing-intersection',
        why: 'Guessing $x = 3$ by inspection finds only one root; the quadratic has a second root, $x = -2$.',
      },
    ],
    correct: 3,
    explanation: '$x^2 = x + 6 \\Rightarrow x^2 - x - 6 = (x - 3)(x + 2) = 0$, so $x = -2$ and $x = 3$.',
    check: { kind: 'value', expected: '[-2, 3]' },
    difficulty: 1,
  },
  {
    id: 'ar-f-043',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'For the region enclosed by $y = x^3$ and $y = 4x$, which $x$-values are needed as limits and split points?',
    },
    options: [
      {
        latex: 'x = -2,\\quad x = 2',
        expr: '[-2, 2]',
        mistake: 'missing-intersection',
        why: 'Dividing $x^3 = 4x$ by $x$ loses the solution $x = 0$, where the curves cross.',
      },
      { latex: 'x = -2,\\quad x = 0,\\quad x = 2', expr: '[-2, 0, 2]' },
      {
        latex: 'x = 0,\\quad x = 2',
        expr: '[0, 2]',
        mistake: 'missing-intersection',
        why: '$x^2 = 4$ has two roots; dropping $x = -2$ loses the left half of the region.',
      },
      {
        latex: 'x = -8,\\quad x = 0,\\quad x = 8',
        expr: '[-8, 0, 8]',
        mistake: 'bounds-wrong-variable',
        why: '$\\pm 8$ are the $y$-coordinates of the intersection points $(\\pm 2, \\pm 8)$.',
      },
      {
        latex: 'x = -4,\\quad x = 0,\\quad x = 4',
        expr: '[-4, 0, 4]',
        mistake: 'algebra-error',
        why: 'From $x^2 = 4$ the roots are $\\pm\\sqrt4 = \\pm 2$; the square root was not taken.',
      },
    ],
    correct: 1,
    explanation: '$x^3 - 4x = x(x - 2)(x + 2) = 0$ gives $x = -2, 0, 2$: the outer values are the limits and $x = 0$ is a split point.',
    check: { kind: 'value', expected: '[-2, 0, 2]' },
    difficulty: 1,
  },
  {
    id: 'ar-f-044',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'The curves $y = x^3 - 3x$ and $y = x$ cross at $x = -2, 0, 2$. Which curve is on top on each piece?',
    },
    options: [
      {
        text: '$y = x$ on $(-2, 0)$ and $y = x^3 - 3x$ on $(0, 2)$',
        mistake: 'top-bottom-swapped',
        why: 'At $x = -1$: $x^3 - 3x = 2 > -1$; at $x = 1$: $x^3 - 3x = -2 < 1$. Both pieces are reversed.',
      },
      {
        text: '$y = x$ on both pieces',
        mistake: 'top-bottom-not-split',
        why: 'At $x = -1$ the cubic ($2$) is above the line ($-1$), so the order changes at $x = 0$.',
      },
      {
        text: '$y = x^3 - 3x$ on both pieces',
        mistake: 'top-bottom-not-split',
        why: 'At $x = 1$ the line ($1$) is above the cubic ($-2$), so the order changes at $x = 0$.',
      },
      { text: '$y = x^3 - 3x$ on $(-2, 0)$ and $y = x$ on $(0, 2)$' },
      {
        text: '$y = x^3 - 3x$ on $(-\\sqrt3, 0)$ and $y = x$ on $(0, \\sqrt3)$, since the cubic changes sign at $\\pm\\sqrt3$',
        mistake: 'signed-area-confusion',
        why: 'The zeros $\\pm\\sqrt3$ of the cubic do not matter; only the crossings of the two curves, $x = -2, 0, 2$, split the region.',
      },
    ],
    correct: 3,
    explanation: 'Test one point per piece: at $x = -1$, $x^3 - 3x = 2 > -1$; at $x = 1$, $x^3 - 3x = -2 < 1$.',
    check: { kind: 'none', reason: 'conceptual; text options' },
    difficulty: 1,
  },
  {
    id: 'ar-f-045',
    topic: 'area',
    kind: 'concept',
    prompt: {
      text: 'To integrate with respect to $y$, the curve $y = \\sqrt{x - 1}$ (where $y \\ge 0$) must be written as $x = g(y)$. Which is it?',
    },
    options: [
      {
        latex: 'x = y^2 - 1',
        expr: 'y^2 - 1',
        mistake: 'inverse-function-wrong',
        why: 'Squaring gives $y^2 = x - 1$, so $x = y^2 + 1$; the constant moved with the wrong sign.',
      },
      {
        latex: 'x = \\sqrt{y - 1}',
        expr: 'sqrt(y - 1)',
        mistake: 'inverse-function-wrong',
        why: 'Swapping the letters $x$ and $y$ does not solve for $x$; undo the square root by squaring.',
      },
      { latex: 'x = y^2 + 1', expr: 'y^2 + 1' },
      {
        latex: 'x = (y + 1)^2',
        expr: '(y + 1)^2',
        mistake: 'inverse-function-wrong',
        why: 'The steps were undone in the wrong order: square first ($y^2 = x - 1$), then add 1.',
      },
      {
        latex: 'x = \\sqrt{y} + 1',
        expr: 'sqrt(y) + 1',
        mistake: 'inverse-function-wrong',
        why: 'The inverse of a square root is a square, not another square root.',
      },
    ],
    correct: 2,
    explanation: 'Square both sides: $y^2 = x - 1$, so $x = y^2 + 1$ (for $y \\ge 0$).',
    variable: 'y',
    domain: { y: [1.25, 2.5] },
    check: { kind: 'identity', lhs: 'y^2 + 1' },
    difficulty: 1,
  },
];

/** Reduced fraction n/d as an option (LaTeX + mathjs). */
function fracOption(n: number, d: number): { latex: string; expr: string } {
  let a = Math.abs(n);
  let b = Math.abs(d);
  while (b) [a, b] = [b, a % b];
  let p = n / a;
  let q = d / a;
  if (q < 0) {
    p = -p;
    q = -q;
  }
  if (q === 1) return { latex: `${p}`, expr: `${p}` };
  return { latex: `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}`, expr: `${p}/${q}` };
}

/** Parameterized generators. */
export const generators: FlashGenerator[] = [
  {
    id: 'ar-g-line-parabola-eval',
    topic: 'area',
    kind: 'evaluate',
    describe: 'Evaluate the area integral ∫₀ᵏ (kx − x²) dx between y = kx and y = x² (k ∈ {3, 5, 6, 7, 8, 9})',
    generate(seed: number): FlashItem {
      const K = [3, 5, 6, 7, 8, 9]; // k = 2 and k = 4 appear as static items
      const k = K[seed % K.length];
      const k2 = k * k;
      const k3 = k2 * k;
      const correct = { ...fracOption(k3, 6) };
      const distractors = [
        {
          ...fracOption(2 * k3, 3),
          mistake: 'power-rule-int-coefficient' as const,
          why: `Took $\\int ${k}x\\,dx = ${k}x^2$ without dividing by 2: $${k3} - \\frac{${k3}}{3}$.`,
        },
        {
          ...fracOption(-k3, 2),
          mistake: 'power-rule-int-coefficient' as const,
          why: `Took $\\int x^2\\,dx = x^3$ without dividing by 3: $\\frac{${k3}}{2} - ${k3}$.`,
        },
        {
          ...fracOption(5 * k3, 6),
          mistake: 'sign-error' as const,
          why: `The antiderivative was written $\\frac{${k}x^2}{2} + \\frac{x^3}{3}$; the minus sign was lost.`,
        },
        {
          ...fracOption(3 * k3 - 2 * k2, 6),
          mistake: 'power-rule-int-exponent' as const,
          why: `Divided by 3 but kept the exponent: $\\int x^2\\,dx$ written as $\\frac{x^2}{3}$, giving $\\frac{${k3}}{2} - \\frac{${k2}}{3}$.`,
        },
        {
          ...fracOption(-k3, 6),
          mistake: 'ftc-order-swapped' as const,
          why: `Computed $F(0) - F(${k})$ instead of $F(${k}) - F(0)$.`,
        },
      ];
      const all = [correct, ...distractors];
      const r = seed % all.length; // vary where the correct option sits
      const options = [...all.slice(r), ...all.slice(0, r)];
      return {
        id: `ar-g-line-parabola-eval:${seed}`,
        topic: 'area',
        kind: 'evaluate',
        prompt: {
          text: `This integral is the area between $y = ${k}x$ and $y = x^2$. Evaluate it.`,
          latex: `\\int_0^{${k}} (${k}x - x^2)\\,dx`,
        },
        options,
        correct: (all.length - r) % all.length,
        explanation: `$\\left[\\frac{${k}x^2}{2} - \\frac{x^3}{3}\\right]_0^{${k}} = \\frac{${k3}}{2} - \\frac{${k3}}{3} = ${correct.latex}$.`,
        check: { kind: 'definite-integral', integrand: `${k}*x - x^2`, lower: '0', upper: `${k}` },
        difficulty: 1,
      };
    },
  },
];
