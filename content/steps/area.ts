import type { StepProblem } from '../types';

/**
 * Step-Through problems for topic "area" (Lecture 2, §2.1). Authored by content-author;
 * verified by math-verifier. Seeds: lecture Examples 2.1, 2.2, 2.4, the "try it yourself"
 * region (y = x, y = x³), and Level I/II practice problems. Each problem walks
 * intersections → test point (top/bottom or right/left) → setup (dx or dy, split?) → value.
 */
export const steps: StepProblem[] = [
  // ───────────── ar-s-01: parabola and a line through the origin (Example 2.1, varied) ─────────────
  {
    id: 'ar-s-01',
    topic: 'area',
    title: 'Parabola and a line',
    difficulty: 1,
    statement: { text: 'Find the area of the region enclosed by $y = x^2$ and $y = 4x$.' },
    steps: [
      {
        prompt: 'Where do the curves intersect? Give the $x$-coordinates.',
        options: [
          {
            latex: 'x = 4',
            expr: '4',
            mistake: 'missing-intersection',
            why: 'Dividing $x^2 = 4x$ by $x$ loses the solution $x = 0$; factor instead: $x(x - 4) = 0$.',
          },
          { latex: 'x = 0,\\quad x = 4', expr: '[0, 4]' },
          {
            latex: 'x = 0,\\quad x = 16',
            expr: '[0, 16]',
            mistake: 'bounds-wrong-variable',
            why: '$16$ is the $y$-coordinate of the intersection point $(4, 16)$, not an $x$-value.',
          },
          {
            latex: 'x = -2,\\quad x = 2',
            expr: '[-2, 2]',
            mistake: 'algebra-error',
            why: 'That solves $x^2 = 4$; the equation is $x^2 = 4x$, i.e. $x(x - 4) = 0$.',
          },
          {
            latex: 'x = -4,\\quad x = 0',
            expr: '[-4, 0]',
            mistake: 'sign-error',
            why: '$x^2 - 4x = x(x - 4)$, so the nonzero root is $+4$.',
          },
        ],
        correct: 1,
        explanation: '$x^2 = 4x \\Rightarrow x^2 - 4x = x(x - 4) = 0$, so $x = 0$ or $x = 4$.',
        result: { latex: 'x^2 - 4x = x(x - 4) = 0 \\Rightarrow x = 0,\\ x = 4' },
        check: { kind: 'value', expected: '[0, 4]' },
      },
      {
        prompt: 'Which curve is on top between the intersection points?',
        options: [
          {
            text: '$y = x^2$ is on top, since a parabola eventually rises above any line',
            mistake: 'top-bottom-swapped',
            why: 'That happens only for $x > 4$; between the intersections the line is higher.',
          },
          {
            text: 'At $x = 5$: $x^2 = 25 > 20 = 4x$, so $y = x^2$ is on top',
            mistake: 'top-bottom-swapped',
            why: '$x = 5$ lies outside $(0, 4)$; the test point must be between the intersections.',
          },
          { text: 'At $x = 1$: $4x = 4 > 1 = x^2$, so $y = 4x$ is on top on $(0, 4)$' },
          {
            text: '$y = 4x$ is on top, and the bottom boundary is the $x$-axis',
            mistake: 'single-function-area',
            why: 'The region is enclosed by the two curves; its lower boundary is the parabola, not the axis.',
          },
          {
            text: 'At $x = 1$: $4x = 4 > 1 = x^2$, so $y = 4x$ is on top on $(0, 16)$',
            mistake: 'bounds-wrong-variable',
            why: 'The comparison holds on the $x$-interval $(0, 4)$; $16$ is a $y$-value.',
          },
        ],
        correct: 2,
        explanation: 'One test point between consecutive intersections decides the order: at $x = 1$ the line is higher.',
        result: { text: 'Top: $y = 4x$; bottom: $y = x^2$ on $[0, 4]$.' },
      },
      {
        prompt: 'Set up the area integral.',
        options: [
          {
            latex: '\\int_0^4 (x^2 - 4x)\\,dx',
            expr: 'integral(x^2 - 4*x, x, 0, 4)',
            mistake: 'top-bottom-swapped',
            why: 'This is bottom − top; the line is above the parabola on $(0, 4)$.',
          },
          {
            latex: '\\int_0^{16} (4x - x^2)\\,dx',
            expr: 'integral(4*x - x^2, x, 0, 16)',
            mistake: 'bounds-wrong-variable',
            why: 'The $x$-limits are $0$ and $4$; $16$ is a $y$-value.',
          },
          {
            latex: '\\int_0^4 (4x + x^2)\\,dx',
            expr: 'integral(4*x + x^2, x, 0, 4)',
            mistake: 'sum-instead-of-difference',
            why: 'The vertical length is top minus bottom, $4x - x^2$.',
          },
          {
            latex: '\\int_0^4 4x\\,dx',
            expr: 'integral(4*x, x, 0, 4)',
            mistake: 'single-function-area',
            why: 'This is the area under the line; the area under the parabola must be subtracted.',
          },
          { latex: '\\int_0^4 (4x - x^2)\\,dx', expr: 'integral(4*x - x^2, x, 0, 4)' },
        ],
        correct: 4,
        explanation: 'Integrate top − bottom over $[0, 4]$: $A = \\int_0^4 (4x - x^2)\\,dx$.',
        result: { latex: 'A = \\int_0^4 (4x - x^2)\\,dx' },
        check: { kind: 'value', expected: '32/3' },
      },
      {
        prompt: 'Evaluate the integral.',
        options: [
          { latex: '\\frac{32}{3}', expr: '32/3' },
          {
            latex: '\\frac{128}{3}',
            expr: '128/3',
            mistake: 'power-rule-int-coefficient',
            why: 'Used $\\int 4x\\,dx = 4x^2$ without dividing by 2: $64 - \\frac{64}{3}$.',
          },
          {
            latex: '\\frac{160}{3}',
            expr: '160/3',
            mistake: 'sign-error',
            why: 'The antiderivative was written $2x^2 + \\frac{x^3}{3}$; the minus sign was lost.',
          },
          {
            latex: '-32',
            expr: '-32',
            mistake: 'power-rule-int-coefficient',
            why: 'Used $\\int x^2\\,dx = x^3$ without dividing by 3: $32 - 64$.',
          },
          {
            latex: '-\\frac{32}{3}',
            expr: '-32/3',
            mistake: 'ftc-order-swapped',
            why: 'Computed $F(0) - F(4)$; subtract the lower-limit value from the upper one.',
          },
        ],
        correct: 0,
        explanation: '$\\left[2x^2 - \\frac{x^3}{3}\\right]_0^4 = 32 - \\frac{64}{3} = \\frac{32}{3}$.',
        result: { latex: '= \\left[2x^2 - \\frac{x^3}{3}\\right]_0^4 = 32 - \\frac{64}{3} = \\frac{32}{3}' },
        check: { kind: 'value', expected: '32/3' },
      },
    ],
    final: {
      latex: 'A = \\frac{32}{3}',
      expr: '32/3',
      check: { kind: 'definite-integral', integrand: '4*x - x^2', lower: '0', upper: '4' },
      recap: 'Factor (never divide by $x$) to get both intersections $x = 0, 4$, test a point to see the line is on top, and integrate top − bottom: $A = \\frac{32}{3}$.',
    },
  },

  // ───────────── ar-s-02: Example 2.2, two integrals on [−1, 1] ─────────────
  {
    id: 'ar-s-02',
    topic: 'area',
    title: 'Curves that cross inside the interval',
    difficulty: 2,
    statement: {
      text: 'Find the area of the region between $f(x) = x^2 - 2x - 3$ and $g(x) = x - 3$ for $-1 \\le x \\le 1$ (the region is also bounded by the vertical lines $x = -1$ and $x = 1$).',
    },
    steps: [
      {
        prompt: 'Solve $f(x) = g(x)$. Which crossing points lie inside $[-1, 1]$?',
        options: [
          {
            latex: 'x = 0,\\quad x = 3',
            expr: '[0, 3]',
            mistake: 'interval-not-respected',
            why: '$x = 3$ solves $f = g$ but lies outside $[-1, 1]$, so it plays no role here.',
          },
          {
            latex: 'x = 3',
            expr: '3',
            mistake: 'missing-intersection',
            why: 'Dividing $x^2 - 3x = 0$ by $x$ loses $x = 0$, the one crossing inside the interval.',
          },
          { latex: 'x = 0', expr: '0' },
          {
            latex: 'x = -1,\\quad x = 3',
            expr: '[-1, 3]',
            mistake: 'missing-intersection',
            why: '$-1$ and $3$ are the $x$-intercepts of the parabola ($f(x) = 0$), not the points where $f = g$.',
          },
          {
            latex: 'x = -3,\\quad x = 0',
            expr: '[-3, 0]',
            mistake: 'sign-error',
            why: '$x^2 - 3x = x(x - 3)$, so the roots are $0$ and $+3$.',
          },
        ],
        correct: 2,
        explanation: '$x^2 - 2x - 3 = x - 3 \\Rightarrow x^2 - 3x = 0 \\Rightarrow x = 0$ or $x = 3$; only $x = 0$ is in $[-1, 1]$.',
        result: { text: '$x(x - 3) = 0$: $x = 0$ is inside $[-1, 1]$, $x = 3$ is not. Subintervals: $[-1, 0]$ and $[0, 1]$.' },
        check: { kind: 'value', expected: '0' },
      },
      {
        prompt: 'Use test points to find the top curve on each subinterval.',
        options: [
          {
            text: 'The parabola is on top on all of $(-1, 1)$',
            mistake: 'top-bottom-not-split',
            why: 'At $x = \\tfrac12$ the line ($-2.5$) is above the parabola ($-3.75$), so the order changes at $x = 0$.',
          },
          {
            text: 'On $(-1, 0)$ the parabola is on top (at $x = -\\tfrac12$: $-1.75 > -3.5$); on $(0, 1)$ the line is on top (at $x = \\tfrac12$: $-2.5 > -3.75$)',
          },
          {
            text: 'The line is on top on all of $(-1, 1)$',
            mistake: 'top-bottom-not-split',
            why: 'At $x = -\\tfrac12$ the parabola ($-1.75$) is above the line ($-3.5$).',
          },
          {
            text: 'On $(-1, 0)$ the line is on top; on $(0, 1)$ the parabola is on top',
            mistake: 'top-bottom-swapped',
            why: 'The test values show the reverse order on each subinterval.',
          },
          {
            text: 'Both curves are below the $x$-axis, so the lower curve counts as the top one',
            mistake: 'signed-area-confusion',
            why: 'Top − bottom works the same below the axis: the larger $y$-value is always the top.',
          },
        ],
        correct: 1,
        explanation: 'At $x = -\\tfrac12$: $f = -1.75$, $g = -3.5$; at $x = \\tfrac12$: $f = -3.75$, $g = -2.5$.',
        result: { text: 'On $[-1, 0]$: $T = x^2 - 2x - 3$, $B = x - 3$. On $[0, 1]$: $T = x - 3$, $B = x^2 - 2x - 3$.' },
      },
      {
        prompt: 'Set up the area.',
        options: [
          {
            latex: '\\int_{-1}^{1} (x^2 - 3x)\\,dx',
            expr: 'integral(x^2 - 3*x, x, -1, 1)',
            mistake: 'top-bottom-not-split',
            why: 'One integral keeps the parabola on top on $(0, 1)$ too, so that piece is subtracted.',
          },
          {
            latex: '\\int_{-1}^{0} (3x - x^2)\\,dx + \\int_{0}^{1} (x^2 - 3x)\\,dx',
            expr: 'integral(3*x - x^2, x, -1, 0) + integral(x^2 - 3*x, x, 0, 1)',
            mistake: 'top-bottom-swapped',
            why: 'Both pieces are bottom − top.',
          },
          {
            latex: '\\int_{0}^{3} (3x - x^2)\\,dx',
            expr: 'integral(3*x - x^2, x, 0, 3)',
            mistake: 'interval-not-respected',
            why: 'The intersections $0$ and $3$ are not the limits here; the problem fixes $-1 \\le x \\le 1$.',
          },
          {
            latex: '\\int_{-1}^{0} (x^2 - 3x)\\,dx + \\int_{0}^{1} (3x - x^2)\\,dx',
            expr: 'integral(x^2 - 3*x, x, -1, 0) + integral(3*x - x^2, x, 0, 1)',
          },
          {
            latex: '\\int_{-1}^{1} (3x - x^2)\\,dx',
            expr: 'integral(3*x - x^2, x, -1, 1)',
            mistake: 'top-bottom-not-split',
            why: 'This keeps the line on top on $(-1, 0)$, where the parabola is higher.',
          },
        ],
        correct: 3,
        explanation: 'Top − bottom on each piece: $(x^2 - 2x - 3) - (x - 3) = x^2 - 3x$ on $[-1, 0]$, and $(x - 3) - (x^2 - 2x - 3) = 3x - x^2$ on $[0, 1]$.',
        result: { latex: 'A = \\int_{-1}^{0} (x^2 - 3x)\\,dx + \\int_{0}^{1} (3x - x^2)\\,dx' },
        check: { kind: 'value', expected: '3' },
      },
      {
        prompt: 'Evaluate the first piece, $\\int_{-1}^{0} (x^2 - 3x)\\,dx$.',
        options: [
          {
            latex: '-\\frac{11}{6}',
            expr: '-11/6',
            mistake: 'ftc-order-swapped',
            why: 'Computed $F(-1) - F(0)$; the upper limit here is $0$.',
          },
          {
            latex: '\\frac{7}{6}',
            expr: '7/6',
            mistake: 'negative-squared-wrong',
            why: 'Used $(-1)^3 = 1$: then $F(-1) = \\frac13 - \\frac32 = -\\frac76$ instead of $-\\frac{11}{6}$.',
          },
          {
            latex: '\\frac{10}{3}',
            expr: '10/3',
            mistake: 'power-rule-int-coefficient',
            why: 'Used $\\int 3x\\,dx = 3x^2$ without dividing by 2, so $F(-1) = -\\frac13 - 3$.',
          },
          { latex: '\\frac{11}{6}', expr: '11/6' },
          {
            latex: '-\\frac{7}{6}',
            expr: '-7/6',
            mistake: 'negative-squared-wrong',
            why: 'Used $(-1)^2 = -1$: then $F(-1) = -\\frac13 + \\frac32 = \\frac76$.',
          },
        ],
        correct: 3,
        explanation: '$F(x) = \\frac{x^3}{3} - \\frac{3x^2}{2}$: $F(0) - F(-1) = 0 - \\left(-\\frac13 - \\frac32\\right) = \\frac{11}{6}$.',
        result: { latex: '\\left[\\frac{x^3}{3} - \\frac{3x^2}{2}\\right]_{-1}^{0} = \\frac{11}{6}' },
        check: { kind: 'definite-integral', integrand: 'x^2 - 3*x', lower: '-1', upper: '0' },
      },
      {
        prompt: 'Evaluate the second piece, $\\int_{0}^{1} (3x - x^2)\\,dx$, and add. What is the area?',
        options: [
          {
            latex: '\\frac{2}{3}',
            expr: '2/3',
            mistake: 'ftc-order-swapped',
            why: 'The second piece was computed as $F(0) - F(1) = -\\frac76$, giving $\\frac{11}{6} - \\frac76$.',
          },
          {
            latex: '\\frac{9}{2}',
            expr: '9/2',
            mistake: 'power-rule-int-coefficient',
            why: 'Used $\\int 3x\\,dx = 3x^2$ in the second piece, which gives $\\frac83$ instead of $\\frac76$.',
          },
          {
            latex: '\\frac{7}{3}',
            expr: '7/3',
            mistake: 'power-rule-int-coefficient',
            why: 'Used $\\int x^2\\,dx = x^3$ in the second piece: $\\frac32 - 1 = \\frac12$ instead of $\\frac76$.',
          },
          {
            latex: '\\frac{19}{3}',
            expr: '19/3',
            mistake: 'interval-not-respected',
            why: 'The second piece was taken over $[0, 3]$ (worth $\\frac92$) instead of $[0, 1]$.',
          },
          { latex: '3', expr: '3' },
        ],
        correct: 4,
        explanation: '$\\int_0^1 (3x - x^2)\\,dx = \\frac32 - \\frac13 = \\frac76$, so $A = \\frac{11}{6} + \\frac76 = 3$.',
        result: { latex: 'A = \\frac{11}{6} + \\left[\\frac{3x^2}{2} - \\frac{x^3}{3}\\right]_0^1 = \\frac{11}{6} + \\frac{7}{6} = 3' },
        check: { kind: 'value', expected: 'integral(x^2 - 3*x, x, -1, 0) + integral(3*x - x^2, x, 0, 1)' },
      },
    ],
    final: {
      latex: 'A = 3',
      expr: '3',
      check: { kind: 'value', expected: 'integral(x^2 - 3*x, x, -1, 0) + integral(3*x - x^2, x, 0, 1)' },
      recap: 'Only $x = 0$ lies inside $[-1, 1]$, but that is where the top curve changes, so the area is two integrals of top − bottom: $\\frac{11}{6} + \\frac{7}{6} = 3$.',
    },
  },

  // ───────────── ar-s-03: Example 2.4, integrate in y ─────────────
  {
    id: 'ar-s-03',
    topic: 'area',
    title: 'Parabola opening sideways and a line',
    difficulty: 2,
    variable: 'y',
    statement: { text: 'Find the area of the region enclosed by the parabola $y^2 = 2x + 6$ and the line $y = x - 1$.' },
    steps: [
      {
        prompt: 'Which variable of integration gives a single integral?',
        options: [
          {
            text: '$x$: every vertical segment runs from the line (bottom) up to the parabola (top)',
            mistake: 'top-bottom-not-split',
            why: 'For $-3 \\le x \\le -1$ the bottom is the lower half of the parabola, $y = -\\sqrt{2x + 6}$, so $dx$ needs two integrals.',
          },
          {
            text: '$y$, but it needs two integrals split at $y = 0$, the vertex of the parabola',
            mistake: 'technique-wrong',
            why: 'The left curve is the parabola for every $y$ in the region; the vertex is not a place where a boundary changes.',
          },
          { text: '$y$: every horizontal segment runs from the parabola (left) to the line (right)' },
          {
            text: 'Either one: both $dx$ and $dy$ give a single integral here',
            mistake: 'top-bottom-not-split',
            why: 'In $x$ the lower boundary changes at $x = -1$, so a $dx$ setup needs two integrals.',
          },
          {
            text: '$x$, because both equations are given with $y$ on the left-hand side',
            mistake: 'technique-wrong',
            why: 'How the equations are written does not decide; look at which boundaries stay the same along the slices.',
          },
        ],
        correct: 2,
        explanation: 'Horizontal slices always meet the parabola on the left and the line on the right, so one $dy$-integral covers the region.',
        result: { text: 'Integrate with respect to $y$ (right − left).' },
      },
      {
        prompt: 'Write both curves as functions of $y$.',
        options: [
          {
            latex: 'x = \\frac{y^2}{2} + 3,\\quad x = y + 1',
            expr: '[y^2/2 + 3, y + 1]',
            mistake: 'inverse-function-wrong',
            why: 'From $y^2 = 2x + 6$: $2x = y^2 - 6$, so the constant is $-3$, not $+3$.',
          },
          {
            latex: 'x = y^2 - 3,\\quad x = y + 1',
            expr: '[y^2 - 3, y + 1]',
            mistake: 'inverse-function-wrong',
            why: 'Both terms must be divided by 2: $x = \\frac{y^2 - 6}{2} = \\frac{y^2}{2} - 3$.',
          },
          {
            latex: 'x = \\frac{y^2}{2} - 6,\\quad x = y + 1',
            expr: '[y^2/2 - 6, y + 1]',
            mistake: 'inverse-function-wrong',
            why: 'Only $y^2$ was divided by 2; the $-6$ must be halved too.',
          },
          { latex: 'x = \\frac{y^2}{2} - 3,\\quad x = y + 1', expr: '[y^2/2 - 3, y + 1]' },
          {
            latex: 'x = \\frac{y^2}{2} - 3,\\quad x = y - 1',
            expr: '[y^2/2 - 3, y - 1]',
            mistake: 'inverse-function-wrong',
            why: 'Solving $y = x - 1$ for $x$ gives $x = y + 1$.',
          },
        ],
        correct: 3,
        explanation: '$y^2 = 2x + 6 \\Rightarrow x = \\frac{y^2}{2} - 3$, and $y = x - 1 \\Rightarrow x = y + 1$.',
        result: { latex: 'x = \\frac{y^2}{2} - 3,\\quad x = y + 1' },
        check: { kind: 'value', expected: '[y^2/2 - 3, y + 1]' },
      },
      {
        prompt: 'Find the $y$-coordinates of the intersection points.',
        options: [
          { latex: 'y = -2,\\quad y = 4', expr: '[-2, 4]' },
          {
            latex: 'y = -1,\\quad y = 5',
            expr: '[-1, 5]',
            mistake: 'bounds-wrong-variable',
            why: '$-1$ and $5$ are the $x$-coordinates of the intersection points.',
          },
          {
            latex: 'y = -4,\\quad y = 2',
            expr: '[-4, 2]',
            mistake: 'sign-error',
            why: '$y^2 - 2y - 8 = (y - 4)(y + 2)$; the signs of the roots were flipped.',
          },
          {
            latex: 'y = -\\sqrt{6},\\quad y = \\sqrt{6}',
            expr: '[-sqrt(6), sqrt(6)]',
            mistake: 'missing-intersection',
            why: 'These are where the parabola meets the $y$-axis; the curves meet each other where $\\frac{y^2}{2} - 3 = y + 1$.',
          },
          {
            latex: 'y = 0,\\quad y = 4',
            expr: '[0, 4]',
            mistake: 'missing-intersection',
            why: '$y = 0$ is the vertex of the parabola, not an intersection; the lower intersection is at $y = -2$.',
          },
        ],
        correct: 0,
        explanation: '$\\frac{y^2}{2} - 3 = y + 1 \\Rightarrow y^2 - 2y - 8 = 0 \\Rightarrow (y - 4)(y + 2) = 0$.',
        result: { latex: 'y^2 - 2y - 8 = (y - 4)(y + 2) = 0 \\Rightarrow y = -2,\\ y = 4' },
        check: { kind: 'value', expected: '[-2, 4]' },
      },
      {
        prompt: 'Which is the right curve $R(y)$ and which the left curve $L(y)$ on $(-2, 4)$?',
        options: [
          {
            text: '$R(y) = \\frac{y^2}{2} - 3$ and $L(y) = y + 1$, since the parabola opens to the right',
            mistake: 'top-bottom-swapped',
            why: 'Opening to the right does not put it on the right: at $y = 0$ the parabola is at $x = -3$, left of the line.',
          },
          {
            text: '$R(y) = y + 1$ on $(0, 4)$, but $R(y) = \\frac{y^2}{2} - 3$ on $(-2, 0)$',
            mistake: 'top-bottom-swapped',
            why: 'At $y = -1$ the line ($x = 0$) is still right of the parabola ($x = -2.5$); the order never changes between the intersections.',
          },
          {
            text: 'Top $y = x - 1$ and bottom $y = -\\sqrt{2x + 6}$',
            mistake: 'dx-dy-mismatch',
            why: 'Top/bottom in $x$ belong to a $dx$ setup; for $dy$ we need right and left curves written in $y$.',
          },
          {
            text: '$R(y) = y + 1$ and $L(y) = 0$, the $y$-axis',
            mistake: 'single-function-area',
            why: 'The $y$-axis is not a boundary of this region; the left boundary is the parabola.',
          },
          {
            text: 'Test $y = 0$: the line gives $x = 1$, the parabola $x = -3$; so $R(y) = y + 1$ and $L(y) = \\frac{y^2}{2} - 3$',
          },
        ],
        correct: 4,
        explanation: 'One test point between $y = -2$ and $y = 4$ decides the order: at $y = 0$, $1 > -3$.',
        result: { text: '$R(y) = y + 1$, $L(y) = \\frac{y^2}{2} - 3$ for $-2 \\le y \\le 4$.' },
      },
      {
        prompt: 'Set up the area integral.',
        options: [
          {
            latex: '\\int_{-2}^{4} \\left(\\frac{y^2}{2} - y - 4\\right)dy',
            expr: 'integral(y^2/2 - y - 4, y, -2, 4)',
            mistake: 'top-bottom-swapped',
            why: 'This is left − right.',
          },
          { latex: '\\int_{-2}^{4} \\left(y + 4 - \\frac{y^2}{2}\\right)dy', expr: 'integral(y + 4 - y^2/2, y, -2, 4)' },
          {
            latex: '\\int_{-1}^{5} \\left(y + 4 - \\frac{y^2}{2}\\right)dy',
            expr: 'integral(y + 4 - y^2/2, y, -1, 5)',
            mistake: 'bounds-wrong-variable',
            why: '$-1$ and $5$ are $x$-values; the $y$-limits are $-2$ and $4$.',
          },
          {
            latex: '\\int_{-2}^{4} \\left(y + 4 - \\frac{y^2}{2}\\right)dx',
            expr: 'integral(y + 4 - y^2/2, x, -2, 4)',
            mistake: 'dx-dy-mismatch',
            why: 'The integrand is in $y$, so the differential must be $dy$.',
          },
          {
            latex: '\\int_{-2}^{4} \\left(y - 2 - \\frac{y^2}{2}\\right)dy',
            expr: 'integral(y - 2 - y^2/2, y, -2, 4)',
            mistake: 'sign-error',
            why: 'Subtracting $L(y) = \\frac{y^2}{2} - 3$ turns $-3$ into $+3$: $(y + 1) - \\frac{y^2}{2} + 3$.',
          },
        ],
        correct: 1,
        explanation: '$R - L = (y + 1) - \\left(\\frac{y^2}{2} - 3\\right) = y + 4 - \\frac{y^2}{2}$, integrated from $y = -2$ to $y = 4$.',
        result: { latex: 'A = \\int_{-2}^{4}\\left(y + 4 - \\frac{y^2}{2}\\right)dy' },
        check: { kind: 'value', expected: '18' },
      },
      {
        prompt: 'Evaluate the integral.',
        options: [
          {
            latex: '\\frac{40}{3}',
            expr: '40/3',
            mistake: 'ftc-not-subtracted',
            why: 'Only $F(4) = \\frac{40}{3}$ was computed; $F(-2) = -\\frac{14}{3}$ must be subtracted.',
          },
          {
            latex: '\\frac{26}{3}',
            expr: '26/3',
            mistake: 'ftc-not-subtracted',
            why: 'Added $F(-2)$ instead of subtracting it: $\\frac{40}{3} - \\frac{14}{3}$.',
          },
          {
            latex: '22',
            expr: '22',
            mistake: 'negative-squared-wrong',
            why: 'Used $(-2)^2 = -4$, so $F(-2) = -2 - 8 + \\frac43 = -\\frac{26}{3}$.',
          },
          { latex: '18', expr: '18' },
          {
            latex: '6',
            expr: '6',
            mistake: 'coefficient-mishandled',
            why: 'Integrated $\\frac{y^2}{2}$ as $\\frac{y^3}{3}$, losing the factor $\\frac12$; it should be $\\frac{y^3}{6}$.',
          },
        ],
        correct: 3,
        explanation: '$F(y) = \\frac{y^2}{2} + 4y - \\frac{y^3}{6}$: $F(4) - F(-2) = \\frac{40}{3} - \\left(-\\frac{14}{3}\\right) = 18$.',
        result: { latex: '\\left[\\frac{y^2}{2} + 4y - \\frac{y^3}{6}\\right]_{-2}^{4} = \\frac{40}{3} + \\frac{14}{3} = 18' },
        check: { kind: 'value', expected: '18' },
      },
    ],
    final: {
      latex: 'A = 18',
      expr: '18',
      check: { kind: 'definite-integral', integrand: 'y + 4 - y^2/2', lower: '-2', upper: '4' },
      recap: 'Every horizontal segment runs from the parabola to the line, so one $dy$-integral of right − left from $y = -2$ to $y = 4$ gives $A = 18$; in $x$ it would take two integrals.',
    },
  },

  // ───────────── ar-s-04: Level I #1 ─────────────
  {
    id: 'ar-s-04',
    topic: 'area',
    title: 'Parabola and a line',
    difficulty: 1,
    statement: { text: 'Find the area of the region enclosed by $y = x^2$ and $y = x + 2$.' },
    steps: [
      {
        prompt: 'Find the $x$-coordinates of the intersection points.',
        options: [
          {
            latex: 'x = -2,\\quad x = 1',
            expr: '[-2, 1]',
            mistake: 'sign-error',
            why: '$x^2 - x - 2 = (x - 2)(x + 1)$, so the roots are $-1$ and $2$.',
          },
          {
            latex: 'x = 1,\\quad x = 4',
            expr: '[1, 4]',
            mistake: 'bounds-wrong-variable',
            why: '$1$ and $4$ are the $y$-coordinates of $(-1, 1)$ and $(2, 4)$.',
          },
          {
            latex: 'x = 2,\\quad x = 3',
            expr: '[2, 3]',
            mistake: 'algebra-error',
            why: 'From $x(x - 1) = 2$ you cannot set each factor equal to 2; rewrite as $x^2 - x - 2 = 0$ and factor.',
          },
          { latex: 'x = -1,\\quad x = 2', expr: '[-1, 2]' },
          {
            latex: 'x = 2',
            expr: '2',
            mistake: 'missing-intersection',
            why: 'Spotting $x = 2$ by inspection misses the second root $x = -1$.',
          },
        ],
        correct: 3,
        explanation: '$x^2 = x + 2 \\Rightarrow x^2 - x - 2 = (x - 2)(x + 1) = 0$.',
        result: { latex: 'x^2 - x - 2 = (x - 2)(x + 1) = 0 \\Rightarrow x = -1,\\ x = 2' },
        check: { kind: 'value', expected: '[-1, 2]' },
      },
      {
        prompt: 'Which curve is on top on $(-1, 2)$?',
        options: [
          { text: 'At $x = 0$: $x + 2 = 2 > 0 = x^2$, so the line is on top' },
          {
            text: 'The parabola is on top, since it is the curved boundary',
            mistake: 'top-bottom-swapped',
            why: 'Shape does not decide; at $x = 0$ the line ($2$) is above the parabola ($0$).',
          },
          {
            text: 'At $x = 3$: $x^2 = 9 > 5 = x + 2$, so the parabola is on top',
            mistake: 'top-bottom-swapped',
            why: '$x = 3$ lies outside $(-1, 2)$; choose a test point between the intersections.',
          },
          {
            text: 'The line on $(-1, 0)$ and the parabola on $(0, 2)$',
            mistake: 'top-bottom-swapped',
            why: 'The curves do not cross at $x = 0$; at $x = 1$ the line ($3$) is still above the parabola ($1$).',
          },
          {
            text: 'The line is on top, with the $x$-axis as the bottom',
            mistake: 'single-function-area',
            why: 'The region is enclosed by the two curves; the parabola is the bottom boundary.',
          },
        ],
        correct: 0,
        explanation: 'Between consecutive intersections one test point decides: at $x = 0$, $2 > 0$.',
        result: { text: 'Top: $y = x + 2$; bottom: $y = x^2$ on $[-1, 2]$.' },
      },
      {
        prompt: 'Set up the area integral.',
        options: [
          {
            latex: '\\int_{-1}^{2} (x^2 - x - 2)\\,dx',
            expr: 'integral(x^2 - x - 2, x, -1, 2)',
            mistake: 'top-bottom-swapped',
            why: 'This is bottom − top.',
          },
          {
            latex: '\\int_{1}^{4} (x + 2 - x^2)\\,dx',
            expr: 'integral(x + 2 - x^2, x, 1, 4)',
            mistake: 'bounds-wrong-variable',
            why: '$1$ and $4$ are $y$-values; the $x$-limits are $-1$ and $2$.',
          },
          { latex: '\\int_{-1}^{2} (x + 2 - x^2)\\,dx', expr: 'integral(x + 2 - x^2, x, -1, 2)' },
          {
            latex: '\\int_{-1}^{2} (x^2 + x + 2)\\,dx',
            expr: 'integral(x^2 + x + 2, x, -1, 2)',
            mistake: 'sum-instead-of-difference',
            why: 'The vertical length is $(x + 2) - x^2$, not $(x + 2) + x^2$.',
          },
          {
            latex: '\\int_{0}^{2} (x + 2 - x^2)\\,dx',
            expr: 'integral(x + 2 - x^2, x, 0, 2)',
            mistake: 'missing-intersection',
            why: 'The region starts at the intersection $x = -1$, not at the $y$-axis.',
          },
        ],
        correct: 2,
        explanation: 'Top − bottom from $x = -1$ to $x = 2$: $A = \\int_{-1}^{2}\\left((x + 2) - x^2\\right)dx$.',
        result: { latex: 'A = \\int_{-1}^{2} (x + 2 - x^2)\\,dx' },
        check: { kind: 'value', expected: '9/2' },
      },
      {
        prompt: 'Evaluate the integral.',
        options: [
          {
            latex: '\\frac{10}{3}',
            expr: '10/3',
            mistake: 'ftc-not-subtracted',
            why: 'Only $F(2) = \\frac{10}{3}$ was computed; $F(-1) = -\\frac76$ must be subtracted.',
          },
          {
            latex: '\\frac{13}{6}',
            expr: '13/6',
            mistake: 'ftc-not-subtracted',
            why: 'Added $F(-1)$ instead of subtracting it: $\\frac{10}{3} - \\frac76$.',
          },
          {
            latex: '\\frac{31}{6}',
            expr: '31/6',
            mistake: 'negative-squared-wrong',
            why: 'Used $(-1)^3 = 1$, so $-\\frac{x^3}{3}$ gave $-\\frac13$ at $x = -1$ and $F(-1) = -\\frac{11}{6}$.',
          },
          {
            latex: '-\\frac{3}{2}',
            expr: '-3/2',
            mistake: 'power-rule-int-coefficient',
            why: 'Used $\\int x^2\\,dx = x^3$, so $F(x) = \\frac{x^2}{2} + 2x - x^3$.',
          },
          { latex: '\\frac{9}{2}', expr: '9/2' },
        ],
        correct: 4,
        explanation: '$\\left[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\right]_{-1}^{2} = \\frac{10}{3} + \\frac76 = \\frac92$.',
        result: { latex: '= \\left[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\right]_{-1}^{2} = \\frac{10}{3} - \\left(-\\frac{7}{6}\\right) = \\frac{9}{2}' },
        check: { kind: 'value', expected: '9/2' },
      },
    ],
    final: {
      latex: 'A = \\frac{9}{2}',
      expr: '9/2',
      check: { kind: 'definite-integral', integrand: 'x + 2 - x^2', lower: '-1', upper: '2' },
      recap: 'Solve $x^2 = x + 2$ for both limits, test a point to put the line on top, and integrate top − bottom from $-1$ to $2$.',
    },
  },

  // ───────────── ar-s-05: Level I #2, two parabolas ─────────────
  {
    id: 'ar-s-05',
    topic: 'area',
    title: 'Two parabolas',
    difficulty: 1,
    statement: { text: 'Find the area of the region enclosed by the parabolas $y = x^2$ and $y = 2x - x^2$.' },
    steps: [
      {
        prompt: 'Find the $x$-coordinates of the intersection points.',
        options: [
          {
            latex: 'x = 0,\\quad x = 2',
            expr: '[0, 2]',
            mistake: 'algebra-error',
            why: 'The $-x^2$ on the right was dropped: $x^2 = 2x - x^2$ becomes $2x^2 - 2x = 0$, not $x^2 - 2x = 0$.',
          },
          { latex: 'x = 0,\\quad x = 1', expr: '[0, 1]' },
          {
            latex: 'x = 1',
            expr: '1',
            mistake: 'missing-intersection',
            why: 'Dividing $2x^2 = 2x$ by $2x$ loses $x = 0$.',
          },
          {
            latex: 'x = -1,\\quad x = 0',
            expr: '[-1, 0]',
            mistake: 'sign-error',
            why: '$2x^2 - 2x = 2x(x - 1)$, so the nonzero root is $+1$.',
          },
          {
            latex: 'x = -1,\\quad x = 1',
            expr: '[-1, 1]',
            mistake: 'algebra-error',
            why: 'That solves $2x^2 - 2 = 0$; the equation is $2x^2 - 2x = 0$.',
          },
        ],
        correct: 1,
        explanation: '$x^2 = 2x - x^2 \\Rightarrow 2x^2 - 2x = 2x(x - 1) = 0$.',
        result: { latex: '2x^2 - 2x = 2x(x - 1) = 0 \\Rightarrow x = 0,\\ x = 1' },
        check: { kind: 'value', expected: '[0, 1]' },
      },
      {
        prompt: 'Which curve is on top on $(0, 1)$?',
        options: [
          {
            text: 'At $x = \\tfrac12$: both equal $\\tfrac14$, so neither is on top',
            mistake: 'arithmetic-error',
            why: '$2 \\cdot \\tfrac12 - \\tfrac14 = \\tfrac34$, not $\\tfrac14$.',
          },
          {
            text: 'At $x = 2$: $x^2 = 4 > 0 = 2x - x^2$, so $y = x^2$ is on top',
            mistake: 'top-bottom-swapped',
            why: '$x = 2$ is outside $(0, 1)$.',
          },
          {
            text: '$y = 2x - x^2$ is on top, with the $x$-axis as the bottom',
            mistake: 'single-function-area',
            why: 'The lower boundary is the other parabola, $y = x^2$.',
          },
          { text: 'At $x = \\tfrac12$: $2x - x^2 = \\tfrac34 > \\tfrac14 = x^2$, so $y = 2x - x^2$ is on top' },
          {
            text: '$y = x^2$ is on top, since it opens upward',
            mistake: 'top-bottom-swapped',
            why: 'Opening upward says nothing about which curve is higher between the intersections.',
          },
        ],
        correct: 3,
        explanation: 'At the test point $x = \\tfrac12$ the downward parabola is higher.',
        result: { text: 'Top: $y = 2x - x^2$; bottom: $y = x^2$ on $[0, 1]$.' },
      },
      {
        prompt: 'Set up the area integral.',
        options: [
          {
            latex: '\\int_0^1 (2x^2 - 2x)\\,dx',
            expr: 'integral(2*x^2 - 2*x, x, 0, 1)',
            mistake: 'top-bottom-swapped',
            why: 'This is bottom − top.',
          },
          {
            latex: '\\int_0^1 2x\\,dx',
            expr: 'integral(2*x, x, 0, 1)',
            mistake: 'sum-instead-of-difference',
            why: 'Adding the curves gives $(2x - x^2) + x^2 = 2x$; the length is their difference.',
          },
          {
            latex: '\\int_0^2 (2x - 2x^2)\\,dx',
            expr: 'integral(2*x - 2*x^2, x, 0, 2)',
            mistake: 'algebra-error',
            why: 'The limit $2$ comes from dropping the $-x^2$ when solving for the intersections; the curves meet at $x = 1$.',
          },
          {
            latex: '\\int_0^1 (2x - x^2)\\,dx',
            expr: 'integral(2*x - x^2, x, 0, 1)',
            mistake: 'single-function-area',
            why: 'This is the area under the top parabola alone; $y = x^2$ must be subtracted.',
          },
          { latex: '\\int_0^1 (2x - 2x^2)\\,dx', expr: 'integral(2*x - 2*x^2, x, 0, 1)' },
        ],
        correct: 4,
        explanation: '$(2x - x^2) - x^2 = 2x - 2x^2$ on $[0, 1]$.',
        result: { latex: 'A = \\int_0^1 \\left((2x - x^2) - x^2\\right)dx = \\int_0^1 (2x - 2x^2)\\,dx' },
        check: { kind: 'value', expected: '1/3' },
      },
      {
        prompt: 'Evaluate the integral.',
        options: [
          {
            latex: '-1',
            expr: '-1',
            mistake: 'power-rule-int-coefficient',
            why: 'Took $\\int 2x^2\\,dx = 2x^3$ without dividing by 3: $1 - 2$.',
          },
          {
            latex: '\\frac{4}{3}',
            expr: '4/3',
            mistake: 'power-rule-int-coefficient',
            why: 'Took $\\int 2x\\,dx = 2x^2$ without dividing by 2: $2 - \\frac23$.',
          },
          { latex: '\\frac{1}{3}', expr: '1/3' },
          {
            latex: '\\frac{5}{3}',
            expr: '5/3',
            mistake: 'sign-error',
            why: 'The antiderivative was written $x^2 + \\frac{2x^3}{3}$; the minus sign was lost.',
          },
          {
            latex: '-\\frac{1}{3}',
            expr: '-1/3',
            mistake: 'ftc-order-swapped',
            why: 'Computed $F(0) - F(1)$.',
          },
        ],
        correct: 2,
        explanation: '$\\left[x^2 - \\frac{2x^3}{3}\\right]_0^1 = 1 - \\frac23 = \\frac13$.',
        result: { latex: '= \\left[x^2 - \\frac{2x^3}{3}\\right]_0^1 = \\frac{1}{3}' },
        check: { kind: 'value', expected: '1/3' },
      },
    ],
    final: {
      latex: 'A = \\frac{1}{3}',
      expr: '1/3',
      check: { kind: 'definite-integral', integrand: '2*x - 2*x^2', lower: '0', upper: '1' },
      recap: 'Set the parabolas equal (keep both $x^2$ terms) to get $x = 0, 1$, then integrate top − bottom $= 2x - 2x^2$.',
    },
  },

  // ───────────── ar-s-06: Level I #3, √x and x² ─────────────
  {
    id: 'ar-s-06',
    topic: 'area',
    title: 'Square root over a parabola',
    difficulty: 1,
    statement: { text: 'Find the area of the region between $y = \\sqrt{x}$ and $y = x^2$ for $0 \\le x \\le 1$.' },
    steps: [
      {
        prompt: 'The curves meet only at $x = 0$ and $x = 1$. Which one is on top on $(0, 1)$?',
        options: [
          {
            text: '$y = x^2$ is on top, since squaring makes numbers bigger',
            mistake: 'top-bottom-swapped',
            why: 'For $0 < x < 1$, squaring makes numbers smaller and square roots make them bigger.',
          },
          { text: 'At $x = \\tfrac14$: $\\sqrt{x} = \\tfrac12 > \\tfrac1{16} = x^2$, so $y = \\sqrt{x}$ is on top' },
          {
            text: 'At $x = 2$: $x^2 = 4 > \\sqrt2$, so $y = x^2$ is on top',
            mistake: 'top-bottom-swapped',
            why: '$x = 2$ lies outside $(0, 1)$.',
          },
          {
            text: '$y = \\sqrt{x}$ on $(0, \\tfrac12)$ and $y = x^2$ on $(\\tfrac12, 1)$',
            mistake: 'top-bottom-swapped',
            why: 'The curves cross only at $0$ and $1$; at $x = \\tfrac34$, $\\sqrt{x} \\approx 0.87 > 0.56 \\approx x^2$.',
          },
          {
            text: '$y = \\sqrt{x}$ is on top, with the $x$-axis as the bottom',
            mistake: 'single-function-area',
            why: 'The lower boundary is $y = x^2$, not the axis.',
          },
        ],
        correct: 1,
        explanation: 'With no crossing inside $(0, 1)$, one test point decides: at $x = \\tfrac14$ the square root is higher.',
        result: { text: 'Top: $y = \\sqrt{x}$; bottom: $y = x^2$.' },
      },
      {
        prompt: 'Set up the area integral.',
        options: [
          {
            latex: '\\int_0^1 \\left(x^2 - \\sqrt{x}\\right)dx',
            expr: 'integral(x^2 - sqrt(x), x, 0, 1)',
            mistake: 'top-bottom-swapped',
            why: 'This is bottom − top.',
          },
          {
            latex: '\\int_0^1 \\left(\\sqrt{x} + x^2\\right)dx',
            expr: 'integral(sqrt(x) + x^2, x, 0, 1)',
            mistake: 'sum-instead-of-difference',
            why: 'The vertical length is $\\sqrt{x} - x^2$.',
          },
          {
            latex: '\\int_0^1 \\sqrt{x}\\,dx',
            expr: 'integral(sqrt(x), x, 0, 1)',
            mistake: 'single-function-area',
            why: 'This ignores the lower curve $y = x^2$.',
          },
          { latex: '\\int_0^1 \\left(\\sqrt{x} - x^2\\right)dx', expr: 'integral(sqrt(x) - x^2, x, 0, 1)' },
          {
            latex: '\\int_0^1 \\left(\\sqrt{x} - x^2\\right)dy',
            expr: 'integral(sqrt(x) - x^2, y, 0, 1)',
            mistake: 'dx-dy-mismatch',
            why: 'The integrand is in $x$, so the differential must be $dx$.',
          },
        ],
        correct: 3,
        explanation: 'Top − bottom over $[0, 1]$.',
        result: { latex: 'A = \\int_0^1 \\left(\\sqrt{x} - x^2\\right)dx' },
        check: { kind: 'value', expected: '1/3' },
      },
      {
        prompt: 'Which is an antiderivative of $\\sqrt{x} - x^2$?',
        options: [
          {
            latex: '\\frac{3}{2}x^{3/2} - \\frac{x^3}{3}',
            expr: '3/2*x^(3/2) - x^3/3',
            mistake: 'power-rule-int-coefficient',
            why: 'Multiplied by the new exponent $\\frac32$ instead of dividing by it.',
          },
          {
            latex: '\\frac{1}{2}x^{-1/2} - 2x',
            expr: '1/2*x^(-1/2) - 2*x',
            mistake: 'differentiated-instead',
            why: 'This is the derivative of $\\sqrt{x} - x^2$, not an antiderivative.',
          },
          {
            latex: '\\frac{2}{3}x^{1/2} - \\frac{x^3}{3}',
            expr: '2/3*x^(1/2) - x^3/3',
            mistake: 'power-rule-int-exponent',
            why: 'The exponent of $x^{1/2}$ must increase to $\\frac32$.',
          },
          {
            latex: '\\frac{2}{3}x^{3/2} + \\frac{x^3}{3}',
            expr: '2/3*x^(3/2) + x^3/3',
            mistake: 'sign-error',
            why: 'The minus sign in front of $x^2$ carries over: $-\\frac{x^3}{3}$.',
          },
          { latex: '\\frac{2}{3}x^{3/2} - \\frac{x^3}{3}', expr: '2/3*x^(3/2) - x^3/3' },
        ],
        correct: 4,
        explanation: '$\\int x^{1/2}\\,dx = \\frac{x^{3/2}}{3/2} = \\frac23 x^{3/2}$ and $\\int x^2\\,dx = \\frac{x^3}{3}$.',
        result: { latex: '\\left[\\frac{2}{3}x^{3/2} - \\frac{x^3}{3}\\right]_0^1' },
        check: { kind: 'antiderivative', integrand: 'sqrt(x) - x^2' },
      },
      {
        prompt: 'Evaluate from $0$ to $1$.',
        options: [
          { latex: '\\frac{1}{3}', expr: '1/3' },
          {
            latex: '\\frac{7}{6}',
            expr: '7/6',
            mistake: 'power-rule-int-coefficient',
            why: 'With $\\frac32 x^{3/2}$ as the antiderivative: $\\frac32 - \\frac13$.',
          },
          {
            latex: '1',
            expr: '1',
            mistake: 'sign-error',
            why: 'Added instead of subtracting: $\\frac23 + \\frac13$.',
          },
          {
            latex: '-\\frac{1}{3}',
            expr: '-1/3',
            mistake: 'ftc-order-swapped',
            why: 'Computed $F(0) - F(1)$.',
          },
          {
            latex: '\\frac{2}{3}',
            expr: '2/3',
            mistake: 'single-function-area',
            why: 'Only the $\\frac23 x^{3/2}$ term was evaluated; the $-\\frac{x^3}{3}$ term from the lower curve was dropped.',
          },
        ],
        correct: 0,
        explanation: '$\\frac23(1)^{3/2} - \\frac{1^3}{3} - 0 = \\frac23 - \\frac13 = \\frac13$.',
        result: { latex: '= \\frac{2}{3} - \\frac{1}{3} = \\frac{1}{3}' },
        check: { kind: 'value', expected: '1/3' },
      },
    ],
    final: {
      latex: 'A = \\frac{1}{3}',
      expr: '1/3',
      check: { kind: 'definite-integral', integrand: 'sqrt(x) - x^2', lower: '0', upper: '1' },
      recap: 'On $(0, 1)$ the square root lies above the square, so $A = \\int_0^1 (\\sqrt{x} - x^2)\\,dx = \\frac23 - \\frac13 = \\frac13$.',
    },
  },

  // ───────────── ar-s-07: Level I #4, e^x over y = x ─────────────
  {
    id: 'ar-s-07',
    topic: 'area',
    title: 'Exponential over a line',
    difficulty: 1,
    statement: {
      text: 'Find the area of the region bounded above by $y = e^{x}$, below by $y = x$, and on the sides by $x = 0$ and $x = 1$.',
    },
    steps: [
      {
        prompt: 'What are the limits, and is a split needed?',
        options: [
          {
            text: 'Find where $e^x = x$ and use those points as the limits',
            mistake: 'interval-not-respected',
            why: 'The sides $x = 0$ and $x = 1$ are given; besides, $e^x = x$ has no solution.',
          },
          {
            text: 'Limits $y = 1$ and $y = e$, the heights of $e^x$ at the two sides',
            mistake: 'bounds-wrong-variable',
            why: 'A $dx$-integral needs $x$-limits; $1$ and $e$ are $y$-values.',
          },
          { text: 'Limits $x = 0$ and $x = 1$; no split, since $e^x > x$ on the whole interval' },
          {
            text: 'Limits $0$ and $1$, split at $x = \\tfrac12$ where the top and bottom trade places',
            mistake: 'top-bottom-swapped',
            why: '$e^x$ stays above $x$ on the whole interval; at $x = \\tfrac12$, $e^{1/2} \\approx 1.65 > 0.5$.',
          },
          {
            text: 'Limits $0$ and $1$; no split, and the lower boundary is the $x$-axis',
            mistake: 'single-function-area',
            why: 'The lower boundary is the line $y = x$, not the axis.',
          },
        ],
        correct: 2,
        explanation: 'The sides are given, and $e^x - x \\ge 1 > 0$ on $[0, 1]$, so one integral from $0$ to $1$ works.',
        result: { text: 'One integral over $0 \\le x \\le 1$: top $e^x$, bottom $x$.' },
      },
      {
        prompt: 'Set up the area integral.',
        options: [
          {
            latex: '\\int_0^1 (x - e^{x})\\,dx',
            expr: 'integral(x - exp(x), x, 0, 1)',
            mistake: 'top-bottom-swapped',
            why: 'This is bottom − top.',
          },
          {
            latex: '\\int_0^1 (e^{x} + x)\\,dx',
            expr: 'integral(exp(x) + x, x, 0, 1)',
            mistake: 'sum-instead-of-difference',
            why: 'The vertical length is $e^x - x$.',
          },
          {
            latex: '\\int_0^1 e^{x}\\,dx',
            expr: 'integral(exp(x), x, 0, 1)',
            mistake: 'single-function-area',
            why: 'This ignores the lower boundary $y = x$.',
          },
          { latex: '\\int_0^1 (e^{x} - x)\\,dx', expr: 'integral(exp(x) - x, x, 0, 1)' },
          {
            latex: '\\int_1^{e} (e^{x} - x)\\,dx',
            expr: 'integral(exp(x) - x, x, 1, e)',
            mistake: 'bounds-wrong-variable',
            why: '$1$ and $e$ are the $y$-values of $e^x$ at the sides; the $x$-limits are $0$ and $1$.',
          },
        ],
        correct: 3,
        explanation: 'Top − bottom from $x = 0$ to $x = 1$.',
        result: { latex: 'A = \\int_0^1 (e^{x} - x)\\,dx' },
        check: { kind: 'value', expected: 'e - 3/2' },
      },
      {
        prompt: 'Which is an antiderivative of $e^{x} - x$?',
        options: [
          {
            latex: 'e^{x} - x^2',
            expr: 'exp(x) - x^2',
            mistake: 'power-rule-int-coefficient',
            why: '$\\int x\\,dx = \\frac{x^2}{2}$; the division by 2 is missing.',
          },
          { latex: 'e^{x} - \\frac{x^2}{2}', expr: 'exp(x) - x^2/2' },
          {
            latex: '\\frac{e^{x+1}}{x+1} - \\frac{x^2}{2}',
            expr: 'exp(x + 1)/(x + 1) - x^2/2',
            mistake: 'exp-antiderivative-wrong',
            why: '$e^x$ is not a power of $x$; its antiderivative is $e^x$ itself.',
          },
          {
            latex: 'e^{x} - 1',
            expr: 'exp(x) - 1',
            mistake: 'differentiated-instead',
            why: 'This is the derivative of $e^x - x$.',
          },
          {
            latex: 'e^{x} + \\frac{x^2}{2}',
            expr: 'exp(x) + x^2/2',
            mistake: 'sign-error',
            why: 'The minus sign in front of $x$ carries over to $-\\frac{x^2}{2}$.',
          },
        ],
        correct: 1,
        explanation: '$\\int e^x\\,dx = e^x$ and $\\int x\\,dx = \\frac{x^2}{2}$.',
        result: { latex: '\\left[e^{x} - \\frac{x^2}{2}\\right]_0^1' },
        check: { kind: 'antiderivative', integrand: 'exp(x) - x' },
      },
      {
        prompt: 'Evaluate from $0$ to $1$.',
        options: [
          {
            latex: 'e - \\frac{1}{2}',
            expr: 'e - 1/2',
            mistake: 'ftc-not-subtracted',
            why: '$F(0) = e^0 - 0 = 1$, not $0$; it must be subtracted.',
          },
          {
            latex: '\\frac{3}{2} - e',
            expr: '3/2 - e',
            mistake: 'ftc-order-swapped',
            why: 'Computed $F(0) - F(1)$.',
          },
          {
            latex: 'e - 2',
            expr: 'e - 2',
            mistake: 'power-rule-int-coefficient',
            why: 'With $e^x - x^2$ as the antiderivative: $(e - 1) - 1$.',
          },
          {
            latex: 'e - 1',
            expr: 'e - 1',
            mistake: 'differentiated-instead',
            why: 'Evaluating the derivative $e^x - 1$ gives $(e - 1) - 0$.',
          },
          { latex: 'e - \\frac{3}{2}', expr: 'e - 3/2' },
        ],
        correct: 4,
        explanation: '$\\left(e - \\frac12\\right) - (1 - 0) = e - \\frac32$.',
        result: { latex: '= \\left(e - \\frac{1}{2}\\right) - (1 - 0) = e - \\frac{3}{2}' },
        check: { kind: 'value', expected: 'e - 3/2' },
      },
    ],
    final: {
      latex: 'A = e - \\frac{3}{2}',
      expr: 'e - 3/2',
      check: { kind: 'definite-integral', integrand: 'exp(x) - x', lower: '0', upper: '1' },
      recap: 'With the sides given and $e^x$ always above $x$, the area is one integral, $\\int_0^1 (e^x - x)\\,dx = e - \\frac32$; remember $e^0 = 1$ at the lower limit.',
    },
  },

  // ───────────── ar-s-08: Level II #1, sin x and cos x ─────────────
  {
    id: 'ar-s-08',
    topic: 'area',
    title: 'Sine and cosine',
    difficulty: 2,
    statement: { text: 'Find the area between $y = \\sin x$ and $y = \\cos x$ on $\\left[0, \\frac{\\pi}{2}\\right]$.' },
    steps: [
      {
        prompt: 'Where do the curves cross in $\\left[0, \\frac{\\pi}{2}\\right]$?',
        options: [
          {
            text: '$\\tan x = 1$ at $x = \\frac{\\pi}{4}$ and $x = \\frac{5\\pi}{4}$, and both are split points',
            mistake: 'interval-not-respected',
            why: '$\\frac{5\\pi}{4}$ lies outside $\\left[0, \\frac{\\pi}{2}\\right]$.',
          },
          {
            text: 'They never cross, since sine and cosine are never equal',
            mistake: 'missing-intersection',
            why: 'At $x = \\frac{\\pi}{4}$ both equal $\\frac{\\sqrt2}{2}$.',
          },
          {
            text: 'Squaring gives $\\sin^2 x = \\cos^2 x = \\frac12$, so $x = \\frac{\\pi}{4}$ and $x = \\frac{3\\pi}{4}$',
            mistake: 'algebra-error',
            why: 'Squaring adds $x = \\frac{3\\pi}{4}$, where $\\sin x = -\\cos x$; it also lies outside the interval.',
          },
          {
            text: '$\\tan x = 1$ gives $x = \\frac{\\pi}{3}$',
            mistake: 'arithmetic-error',
            why: '$\\tan\\frac{\\pi}{3} = \\sqrt3$; $\\tan x = 1$ at $x = \\frac{\\pi}{4}$.',
          },
          { text: '$\\sin x = \\cos x$ means $\\tan x = 1$, so $x = \\frac{\\pi}{4}$' },
        ],
        correct: 4,
        explanation: 'Dividing by $\\cos x$ (nonzero on $\\left[0, \\frac{\\pi}{2}\\right)$) gives $\\tan x = 1$, so $x = \\frac{\\pi}{4}$.',
        result: { text: 'They cross at $x = \\frac{\\pi}{4}$; subintervals $\\left[0, \\frac{\\pi}{4}\\right]$ and $\\left[\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right]$.' },
      },
      {
        prompt: 'Which curve is on top on each subinterval?',
        options: [
          {
            text: '$\\cos x$ on top on all of $\\left(0, \\frac{\\pi}{2}\\right)$',
            mistake: 'top-bottom-not-split',
            why: 'At $x = \\frac{\\pi}{3}$, $\\sin x = \\frac{\\sqrt3}{2}$ is above $\\cos x = \\frac12$.',
          },
          {
            text: '$\\cos x$ on $\\left(0, \\frac{\\pi}{4}\\right)$ (at $\\frac{\\pi}{6}$: $\\frac{\\sqrt3}{2} > \\frac12$); $\\sin x$ on $\\left(\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right)$ (at $\\frac{\\pi}{3}$: $\\frac{\\sqrt3}{2} > \\frac12$)',
          },
          {
            text: '$\\sin x$ on top on all of $\\left(0, \\frac{\\pi}{2}\\right)$',
            mistake: 'top-bottom-not-split',
            why: 'At $x = \\frac{\\pi}{6}$, $\\cos x = \\frac{\\sqrt3}{2}$ is above $\\sin x = \\frac12$.',
          },
          {
            text: '$\\sin x$ on $\\left(0, \\frac{\\pi}{4}\\right)$ and $\\cos x$ on $\\left(\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right)$',
            mistake: 'top-bottom-swapped',
            why: 'The test points show the reverse order on each piece.',
          },
          {
            text: 'They are equal at $x = \\frac{\\pi}{4}$, so either may be taken as the top on both pieces',
            mistake: 'top-bottom-swapped',
            why: 'Equality at the crossing says nothing about the order on either side; test a point inside each piece.',
          },
        ],
        correct: 1,
        explanation: 'Test one point inside each subinterval.',
        result: { text: '$T = \\cos x$, $B = \\sin x$ on $\\left[0, \\frac{\\pi}{4}\\right]$; $T = \\sin x$, $B = \\cos x$ on $\\left[\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right]$.' },
      },
      {
        prompt: 'Set up the area.',
        options: [
          {
            latex: '\\int_0^{\\pi/2} (\\cos x - \\sin x)\\,dx',
            expr: 'integral(cos(x) - sin(x), x, 0, pi/2)',
            mistake: 'top-bottom-not-split',
            why: 'A single integral subtracts the piece on $\\left(\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right)$ and cancels to $0$.',
          },
          {
            latex: '\\int_0^{\\pi/4} (\\sin x - \\cos x)\\,dx + \\int_{\\pi/4}^{\\pi/2} (\\cos x - \\sin x)\\,dx',
            expr: 'integral(sin(x) - cos(x), x, 0, pi/4) + integral(cos(x) - sin(x), x, pi/4, pi/2)',
            mistake: 'top-bottom-swapped',
            why: 'Both pieces are bottom − top.',
          },
          {
            latex: '\\int_0^{\\pi/4} (\\cos x - \\sin x)\\,dx + \\int_{\\pi/4}^{\\pi/2} (\\cos x - \\sin x)\\,dx',
            expr: 'integral(cos(x) - sin(x), x, 0, pi/4) + integral(cos(x) - sin(x), x, pi/4, pi/2)',
            mistake: 'top-bottom-not-split',
            why: 'The split is right, but cosine was kept on top after $\\frac{\\pi}{4}$.',
          },
          {
            latex: '\\int_0^{\\pi/4} (\\cos x - \\sin x)\\,dx',
            expr: 'integral(cos(x) - sin(x), x, 0, pi/4)',
            mistake: 'interval-not-respected',
            why: 'The region continues past the crossing to $x = \\frac{\\pi}{2}$.',
          },
          {
            latex: '\\int_0^{\\pi/4} (\\cos x - \\sin x)\\,dx + \\int_{\\pi/4}^{\\pi/2} (\\sin x - \\cos x)\\,dx',
            expr: 'integral(cos(x) - sin(x), x, 0, pi/4) + integral(sin(x) - cos(x), x, pi/4, pi/2)',
          },
        ],
        correct: 4,
        explanation: 'Each piece is top − bottom on its own subinterval.',
        result: { latex: 'A = \\int_0^{\\pi/4} (\\cos x - \\sin x)\\,dx + \\int_{\\pi/4}^{\\pi/2} (\\sin x - \\cos x)\\,dx' },
        check: { kind: 'value', expected: '2*sqrt(2) - 2' },
      },
      {
        prompt: 'Evaluate both pieces and add.',
        options: [
          {
            latex: '0',
            expr: '0',
            mistake: 'trig-antiderivative-sign',
            why: 'Used $\\int \\sin x\\,dx = \\cos x$: the pieces become $\\left[\\sin x - \\cos x\\right]$ and $\\left[\\cos x - \\sin x\\right]$, giving $1 + (-1)$.',
          },
          {
            latex: '2 - 2\\sqrt{2}',
            expr: '2 - 2*sqrt(2)',
            mistake: 'ftc-order-swapped',
            why: 'Each piece was computed as $F(\\text{lower}) - F(\\text{upper})$.',
          },
          { latex: '2\\sqrt{2} - 2', expr: '2*sqrt(2) - 2' },
          {
            latex: '4\\sqrt{2} - 2',
            expr: '4*sqrt(2) - 2',
            mistake: 'arithmetic-error',
            why: 'Used $\\sin\\frac{\\pi}{4} = \\cos\\frac{\\pi}{4} = \\sqrt2$; each equals $\\frac{\\sqrt2}{2}$.',
          },
          {
            latex: '\\sqrt{2} - 1',
            expr: 'sqrt(2) - 1',
            mistake: 'interval-not-respected',
            why: 'That is only the piece over $\\left[0, \\frac{\\pi}{4}\\right]$; the piece over $\\left[\\frac{\\pi}{4}, \\frac{\\pi}{2}\\right]$ adds another $\\sqrt2 - 1$.',
          },
        ],
        correct: 2,
        explanation: '$\\left[\\sin x + \\cos x\\right]_0^{\\pi/4} = \\sqrt2 - 1$ and $\\left[-\\cos x - \\sin x\\right]_{\\pi/4}^{\\pi/2} = -1 + \\sqrt2$; the sum is $2\\sqrt2 - 2$.',
        result: { latex: '= (\\sqrt{2} - 1) + (\\sqrt{2} - 1) = 2\\sqrt{2} - 2' },
        check: { kind: 'value', expected: '2*sqrt(2) - 2' },
      },
    ],
    final: {
      latex: 'A = 2\\sqrt{2} - 2',
      expr: '2*sqrt(2) - 2',
      check: { kind: 'value', expected: 'integral(cos(x) - sin(x), x, 0, pi/4) + integral(sin(x) - cos(x), x, pi/4, pi/2)' },
      recap: 'The curves cross at $\\frac{\\pi}{4}$, so split there and take top − bottom on each side; without the split the two pieces cancel to $0$.',
    },
  },

  // ───────────── ar-s-09: Level II #3, x + 3 over 2|x| ─────────────
  {
    id: 'ar-s-09',
    topic: 'area',
    title: 'A line over an absolute value',
    difficulty: 2,
    statement: { text: 'Find the area of the region bounded above by $y = x + 3$ and below by $y = 2|x|$.' },
    steps: [
      {
        prompt: 'Find the $x$-coordinates where the curves meet.',
        options: [
          {
            latex: 'x = 3',
            expr: '3',
            mistake: 'abs-value-region-wrong',
            why: 'Treating $2|x|$ as $2x$ finds only $x = 3$; for $x < 0$ solve $x + 3 = -2x$.',
          },
          {
            latex: 'x = -3,\\quad x = 3',
            expr: '[-3, 3]',
            mistake: 'algebra-error',
            why: '$x + 3 = -2x$ gives $3x = -3$, so $x = -1$; $-3$ is where the line meets the $x$-axis.',
          },
          { latex: 'x = -1,\\quad x = 3', expr: '[-1, 3]' },
          {
            latex: 'x = 2,\\quad x = 6',
            expr: '[2, 6]',
            mistake: 'bounds-wrong-variable',
            why: '$2$ and $6$ are the $y$-coordinates of $(-1, 2)$ and $(3, 6)$.',
          },
          {
            latex: 'x = -1,\\quad x = 1',
            expr: '[-1, 1]',
            mistake: 'sign-error',
            why: 'For $x \\ge 0$, $x + 3 = 2x$ gives $x = 3$; moving $x$ across with the wrong sign gives $3x = 3$.',
          },
        ],
        correct: 2,
        explanation: 'For $x \\ge 0$: $x + 3 = 2x \\Rightarrow x = 3$; for $x < 0$: $x + 3 = -2x \\Rightarrow x = -1$.',
        result: { text: 'The curves meet at $(-1, 2)$ and $(3, 6)$.' },
        check: { kind: 'value', expected: '[-1, 3]' },
      },
      {
        prompt: 'Where must the region be split, and what are the pieces?',
        options: [
          {
            text: 'No split: the top $y = x + 3$ never changes, so one integral of $(x + 3) - 2x$ works',
            mistake: 'abs-value-region-wrong',
            why: 'The top stays the same, but the bottom $2|x|$ changes formula at $x = 0$.',
          },
          {
            text: 'At $x = 0$: the bottom is $y = 2x$ on $[-1, 0]$ and $y = -2x$ on $[0, 3]$',
            mistake: 'abs-value-region-wrong',
            why: '$|x| = -x$ for $x < 0$ and $|x| = x$ for $x \\ge 0$; these cases are reversed.',
          },
          {
            text: 'At $x = 0$: on $[0, 3]$ the top is $y = 2x$ and the bottom is $y = x + 3$',
            mistake: 'top-bottom-swapped',
            why: 'At $x = 1$: $x + 3 = 4 > 2 = 2x$, so the line stays on top.',
          },
          { text: 'At $x = 0$: the bottom is $y = -2x$ on $[-1, 0]$ and $y = 2x$ on $[0, 3]$' },
          {
            text: 'No split: use $y = -2x$ as the bottom on all of $[-1, 3]$',
            mistake: 'abs-value-region-wrong',
            why: '$-2x$ is the bottom only for $x < 0$; for $x \\ge 0$ it is $2x$.',
          },
        ],
        correct: 3,
        explanation: '$2|x|$ is $-2x$ for $x < 0$ and $2x$ for $x \\ge 0$, so the bottom boundary changes at $x = 0$.',
        result: { text: 'On $[-1, 0]$: $T = x + 3$, $B = -2x$. On $[0, 3]$: $T = x + 3$, $B = 2x$.' },
      },
      {
        prompt: 'Set up the area.',
        options: [
          {
            latex: '\\int_{-1}^{3} (3 - x)\\,dx',
            expr: 'integral(3 - x, x, -1, 3)',
            mistake: 'abs-value-region-wrong',
            why: 'Using $2x$ as the bottom on $[-1, 0]$ treats $|x|$ as $x$ there.',
          },
          { latex: '\\int_{-1}^{0} (3x + 3)\\,dx + \\int_{0}^{3} (3 - x)\\,dx', expr: 'integral(3*x + 3, x, -1, 0) + integral(3 - x, x, 0, 3)' },
          {
            latex: '\\int_{-1}^{0} (3 - x)\\,dx + \\int_{0}^{3} (3x + 3)\\,dx',
            expr: 'integral(3 - x, x, -1, 0) + integral(3*x + 3, x, 0, 3)',
            mistake: 'abs-value-region-wrong',
            why: 'The two cases of $|x|$ are reversed.',
          },
          {
            latex: '\\int_{-1}^{0} (-3x - 3)\\,dx + \\int_{0}^{3} (x - 3)\\,dx',
            expr: 'integral(-3*x - 3, x, -1, 0) + integral(x - 3, x, 0, 3)',
            mistake: 'top-bottom-swapped',
            why: 'Both pieces are bottom − top.',
          },
          {
            latex: '\\int_{0}^{3} (3 - x)\\,dx',
            expr: 'integral(3 - x, x, 0, 3)',
            mistake: 'missing-intersection',
            why: 'The left intersection $x = -1$ was dropped, so the piece over $[-1, 0]$ is missing.',
          },
        ],
        correct: 1,
        explanation: '$(x + 3) - (-2x) = 3x + 3$ on $[-1, 0]$ and $(x + 3) - 2x = 3 - x$ on $[0, 3]$.',
        result: { latex: 'A = \\int_{-1}^{0} (3x + 3)\\,dx + \\int_{0}^{3} (3 - x)\\,dx' },
        check: { kind: 'value', expected: '6' },
      },
      {
        prompt: 'Evaluate.',
        options: [
          {
            latex: '9',
            expr: '9',
            mistake: 'negative-squared-wrong',
            why: 'Used $(-1)^2 = -1$ in $\\frac{3x^2}{2}$, so the first piece came out $\\frac92$ instead of $\\frac32$.',
          },
          {
            latex: '3',
            expr: '3',
            mistake: 'ftc-order-swapped',
            why: 'The first piece was computed as $F(-1) - F(0) = -\\frac32$.',
          },
          {
            latex: '\\frac{3}{2}',
            expr: '3/2',
            mistake: 'power-rule-int-coefficient',
            why: 'Used $\\int x\\,dx = x^2$ in the second piece: $9 - 9 = 0$.',
          },
          {
            latex: '\\frac{9}{2}',
            expr: '9/2',
            mistake: 'ftc-not-subtracted',
            why: 'The first piece was taken as $F(0) = 0$; $F(-1) = -\\frac32$ must be subtracted.',
          },
          { latex: '6', expr: '6' },
        ],
        correct: 4,
        explanation: '$\\left[\\frac{3x^2}{2} + 3x\\right]_{-1}^{0} = \\frac32$ and $\\left[3x - \\frac{x^2}{2}\\right]_0^3 = \\frac92$, so $A = 6$.',
        result: { latex: '= \\frac{3}{2} + \\frac{9}{2} = 6' },
        check: { kind: 'value', expected: '6' },
      },
    ],
    final: {
      latex: 'A = 6',
      expr: '6',
      check: { kind: 'value', expected: 'integral(3*x + 3, x, -1, 0) + integral(3 - x, x, 0, 3)' },
      recap: 'The top never changes, but $2|x|$ switches from $-2x$ to $2x$ at $x = 0$, so split there; the region is a triangle of area $6$.',
    },
  },

  // ───────────── ar-s-10: y = x and y = x³ on [−1, 1] ─────────────
  {
    id: 'ar-s-10',
    topic: 'area',
    title: 'A line and a cubic',
    difficulty: 2,
    statement: { text: 'Let $R$ be the region enclosed by $y = x$ and $y = x^3$ for $-1 \\le x \\le 1$. Find its area.' },
    steps: [
      {
        prompt: 'Where do the curves cross?',
        options: [
          {
            latex: 'x = -1,\\quad x = 1',
            expr: '[-1, 1]',
            mistake: 'missing-intersection',
            why: 'Dividing $x^3 = x$ by $x$ loses $x = 0$, where the curves trade places.',
          },
          {
            latex: 'x = 0,\\quad x = 1',
            expr: '[0, 1]',
            mistake: 'missing-intersection',
            why: '$x^2 = 1$ has two roots; $x = -1$ is missing.',
          },
          { latex: 'x = -1,\\quad x = 0,\\quad x = 1', expr: '[-1, 0, 1]' },
          {
            latex: 'x = 0',
            expr: '0',
            mistake: 'sign-error',
            why: '$x^3 - x = x(x^2 - 1)$, and $x^2 = 1$ has the real roots $\\pm 1$; it was treated as $x^2 = -1$.',
          },
          {
            latex: 'x = 1',
            expr: '1',
            mistake: 'missing-intersection',
            why: 'Dividing by $x$ and keeping only the positive root of $x^2 = 1$ loses both $x = 0$ and $x = -1$.',
          },
        ],
        correct: 2,
        explanation: '$x^3 - x = x(x - 1)(x + 1) = 0$ gives $x = -1, 0, 1$.',
        result: { latex: 'x^3 - x = x(x - 1)(x + 1) = 0 \\Rightarrow x = -1,\\ 0,\\ 1' },
        check: { kind: 'value', expected: '[-1, 0, 1]' },
      },
      {
        prompt: 'Which curve is on top on each subinterval?',
        options: [
          {
            text: '$y = x$ on top on all of $(-1, 1)$',
            mistake: 'top-bottom-not-split',
            why: 'At $x = -\\tfrac12$: $x^3 = -\\tfrac18$ is above $x = -\\tfrac12$.',
          },
          {
            text: '$y = x$ on $(-1, 0)$ and $y = x^3$ on $(0, 1)$',
            mistake: 'top-bottom-swapped',
            why: 'Among negatives $-\\tfrac18 > -\\tfrac12$, so the cubic is on top on $(-1, 0)$; the line is on top on $(0, 1)$.',
          },
          {
            text: '$y = x^3$ on top on all of $(-1, 1)$',
            mistake: 'top-bottom-not-split',
            why: 'At $x = \\tfrac12$: $x = \\tfrac12$ is above $x^3 = \\tfrac18$.',
          },
          {
            text: 'The two pieces are mirror images, so the area is $0$',
            mistake: 'signed-area-confusion',
            why: 'Mirror-image pieces have equal areas that add; only signed integrals cancel.',
          },
          {
            text: '$y = x^3$ on $(-1, 0)$ (at $-\\tfrac12$: $-\\tfrac18 > -\\tfrac12$); $y = x$ on $(0, 1)$ (at $\\tfrac12$: $\\tfrac12 > \\tfrac18$)',
          },
        ],
        correct: 4,
        explanation: 'Test one point in each subinterval; among negatives, $-\\tfrac18 > -\\tfrac12$.',
        result: { text: 'On $[-1, 0]$: $T = x^3$, $B = x$. On $[0, 1]$: $T = x$, $B = x^3$.' },
      },
      {
        prompt: 'Set up the area.',
        options: [
          { latex: '\\int_{-1}^{0} (x^3 - x)\\,dx + \\int_{0}^{1} (x - x^3)\\,dx', expr: 'integral(x^3 - x, x, -1, 0) + integral(x - x^3, x, 0, 1)' },
          {
            latex: '\\int_{-1}^{1} (x - x^3)\\,dx',
            expr: 'integral(x - x^3, x, -1, 1)',
            mistake: 'top-bottom-not-split',
            why: 'Without the split the two pieces cancel: this integral is $0$.',
          },
          {
            latex: '\\int_{-1}^{0} (x - x^3)\\,dx + \\int_{0}^{1} (x^3 - x)\\,dx',
            expr: 'integral(x - x^3, x, -1, 0) + integral(x^3 - x, x, 0, 1)',
            mistake: 'top-bottom-swapped',
            why: 'Both pieces are bottom − top.',
          },
          {
            latex: '\\int_{0}^{1} (x - x^3)\\,dx',
            expr: 'integral(x - x^3, x, 0, 1)',
            mistake: 'missing-intersection',
            why: 'This covers only the piece over $[0, 1]$; the region also has a piece over $[-1, 0]$.',
          },
          {
            latex: '\\int_{-1}^{0} (x^3 - x)\\,dx + \\int_{0}^{1} (x^3 - x)\\,dx',
            expr: 'integral(x^3 - x, x, -1, 0) + integral(x^3 - x, x, 0, 1)',
            mistake: 'top-bottom-not-split',
            why: 'The split is right, but $x^3$ was kept on top on $(0, 1)$.',
          },
        ],
        correct: 0,
        explanation: 'Each piece is top − bottom on its own subinterval.',
        result: { latex: 'A = \\int_{-1}^{0} (x^3 - x)\\,dx + \\int_{0}^{1} (x - x^3)\\,dx' },
        check: { kind: 'value', expected: '1/2' },
      },
      {
        prompt: 'Evaluate.',
        options: [
          {
            latex: '0',
            expr: '0',
            mistake: 'ftc-order-swapped',
            why: 'The first piece was computed as $F(-1) - F(0) = -\\frac14$, cancelling the second piece.',
          },
          {
            latex: '\\frac{1}{4}',
            expr: '1/4',
            mistake: 'ftc-not-subtracted',
            why: 'The first piece was taken as $F(0) = 0$; $F(-1) = -\\frac14$ must be subtracted.',
          },
          {
            latex: '1',
            expr: '1',
            mistake: 'negative-squared-wrong',
            why: 'Used $(-1)^4 = -1$, so $F(-1) = -\\frac14 - \\frac12 = -\\frac34$ and the first piece became $\\frac34$.',
          },
          { latex: '\\frac{1}{2}', expr: '1/2' },
          {
            latex: '\\frac{1}{3}',
            expr: '1/3',
            mistake: 'power-rule-int-coefficient',
            why: 'Used $\\int x^3\\,dx = \\frac{x^4}{3}$, making each piece $\\frac16$.',
          },
        ],
        correct: 3,
        explanation: '$\\left[\\frac{x^4}{4} - \\frac{x^2}{2}\\right]_{-1}^{0} = \\frac14$ and $\\left[\\frac{x^2}{2} - \\frac{x^4}{4}\\right]_0^1 = \\frac14$.',
        result: { latex: '= \\frac{1}{4} + \\frac{1}{4} = \\frac{1}{2}' },
        check: { kind: 'value', expected: '1/2' },
      },
    ],
    final: {
      latex: 'A = \\frac{1}{2}',
      expr: '1/2',
      check: { kind: 'value', expected: 'integral(x^3 - x, x, -1, 0) + integral(x - x^3, x, 0, 1)' },
      recap: 'The curves trade places at $x = 0$; without the split, $\\int_{-1}^{1}(x - x^3)\\,dx = 0$ measures signed area, not area.',
    },
  },

  // ───────────── ar-s-11: Level II #2, parabola and the y-axis ─────────────
  {
    id: 'ar-s-11',
    topic: 'area',
    title: 'Parabola and the y-axis',
    difficulty: 2,
    variable: 'y',
    statement: { text: 'Find the area of the region enclosed by the parabola $y^2 = 2x + 6$ and the $y$-axis.' },
    steps: [
      {
        prompt: 'To integrate with respect to $y$, write the parabola as $x = g(y)$.',
        options: [
          {
            latex: 'x = \\frac{y^2}{2} + 3',
            expr: 'y^2/2 + 3',
            mistake: 'inverse-function-wrong',
            why: '$2x = y^2 - 6$, so $x = \\frac{y^2}{2} - 3$; the sign of the constant flipped.',
          },
          {
            latex: 'x = y^2 - 3',
            expr: 'y^2 - 3',
            mistake: 'inverse-function-wrong',
            why: 'Only the $6$ was halved; $y^2$ must be divided by 2 as well.',
          },
          { latex: 'x = \\frac{y^2}{2} - 3', expr: 'y^2/2 - 3' },
          {
            latex: 'x = \\frac{y^2}{2} - 6',
            expr: 'y^2/2 - 6',
            mistake: 'inverse-function-wrong',
            why: 'Only $y^2$ was halved; the $6$ must be divided by 2 as well.',
          },
          {
            latex: 'x = \\sqrt{2y + 6}',
            expr: 'sqrt(2*y + 6)',
            mistake: 'inverse-function-wrong',
            why: 'Swapping the letters $x$ and $y$ does not solve for $x$.',
          },
        ],
        correct: 2,
        explanation: '$y^2 = 2x + 6 \\Rightarrow 2x = y^2 - 6 \\Rightarrow x = \\frac{y^2}{2} - 3$.',
        result: { latex: 'x = \\frac{y^2}{2} - 3' },
        check: { kind: 'identity', lhs: 'y^2/2 - 3' },
      },
      {
        prompt: 'Where does the parabola meet the $y$-axis?',
        options: [
          {
            latex: 'y = -3,\\quad y = 0',
            expr: '[-3, 0]',
            mistake: 'bounds-wrong-variable',
            why: '$-3$ and $0$ are the $x$-extent of the region (vertex to axis), not $y$-values.',
          },
          {
            latex: 'y = 0,\\quad y = \\sqrt{6}',
            expr: '[0, sqrt(6)]',
            mistake: 'missing-intersection',
            why: '$y^2 = 6$ has two roots; $y = -\\sqrt6$ is missing.',
          },
          {
            latex: 'y = -6,\\quad y = 6',
            expr: '[-6, 6]',
            mistake: 'algebra-error',
            why: 'From $y^2 = 6$, $y = \\pm\\sqrt6$; the square root was not taken.',
          },
          { latex: 'y = -\\sqrt{6},\\quad y = \\sqrt{6}', expr: '[-sqrt(6), sqrt(6)]' },
          {
            latex: 'y = -\\sqrt{3},\\quad y = \\sqrt{3}',
            expr: '[-sqrt(3), sqrt(3)]',
            mistake: 'algebra-error',
            why: 'On the $y$-axis $x = 0$, so $y^2 = 6$; the $6$ was halved by mistake.',
          },
        ],
        correct: 3,
        explanation: 'On the $y$-axis $x = 0$: $y^2 = 6$, so $y = \\pm\\sqrt6$.',
        result: { latex: 'x = 0 \\Rightarrow y^2 = 6 \\Rightarrow y = \\pm\\sqrt{6}' },
        check: { kind: 'value', expected: '[-sqrt(6), sqrt(6)]' },
      },
      {
        prompt: 'Which boundary is on the right and which on the left?',
        options: [
          { text: 'Right: the $y$-axis $x = 0$; left: the parabola $x = \\frac{y^2}{2} - 3$ (at $y = 0$: $0 > -3$)' },
          {
            text: 'Right: the parabola $x = \\frac{y^2}{2} - 3$; left: the $y$-axis',
            mistake: 'top-bottom-swapped',
            why: 'At $y = 0$ the parabola is at $x = -3$, to the left of the axis.',
          },
          {
            text: 'Top: $y = \\sqrt{2x + 6}$; bottom: $y = -\\sqrt{2x + 6}$',
            mistake: 'dx-dy-mismatch',
            why: 'Top and bottom in $x$ belong to a $dx$ setup; a $dy$-integral needs right and left curves in $y$.',
          },
          {
            text: 'Right: $x = 0$ for $y > 0$, but the parabola for $y < 0$',
            mistake: 'top-bottom-swapped',
            why: 'The order never changes between $y = -\\sqrt6$ and $y = \\sqrt6$: at $y = -1$, $0 > -2.5$.',
          },
          {
            text: 'Right: $x = 0$; left: $x = \\frac{y^2}{2} + 3$',
            mistake: 'inverse-function-wrong',
            why: 'The parabola is $x = \\frac{y^2}{2} - 3$; with $+3$ it would lie to the right of the axis.',
          },
        ],
        correct: 0,
        explanation: 'At $y = 0$ the axis ($x = 0$) is to the right of the vertex ($x = -3$), and the order holds for all $y$ in between.',
        result: { text: '$R(y) = 0$, $L(y) = \\frac{y^2}{2} - 3$ for $-\\sqrt6 \\le y \\le \\sqrt6$.' },
      },
      {
        prompt: 'Set up the area integral.',
        options: [
          {
            latex: '\\int_{-\\sqrt{6}}^{\\sqrt{6}} \\left(\\frac{y^2}{2} - 3\\right)dy',
            expr: 'integral(y^2/2 - 3, y, -sqrt(6), sqrt(6))',
            mistake: 'top-bottom-swapped',
            why: 'This is left − right.',
          },
          {
            latex: '\\int_{-3}^{0} \\left(3 - \\frac{y^2}{2}\\right)dy',
            expr: 'integral(3 - y^2/2, y, -3, 0)',
            mistake: 'bounds-wrong-variable',
            why: '$-3$ and $0$ are $x$-values; the $y$-limits are $\\pm\\sqrt6$.',
          },
          {
            latex: '\\int_{0}^{\\sqrt{6}} \\left(3 - \\frac{y^2}{2}\\right)dy',
            expr: 'integral(3 - y^2/2, y, 0, sqrt(6))',
            mistake: 'missing-intersection',
            why: 'The negative root $y = -\\sqrt6$ was dropped, so only the upper half is counted.',
          },
          {
            latex: '\\int_{-3}^{0} \\sqrt{2x + 6}\\,dx',
            expr: 'integral(sqrt(2*x + 6), x, -3, 0)',
            mistake: 'inverse-function-wrong',
            why: 'In $x$, $y = \\pm\\sqrt{2x + 6}$; using only the $+$ branch gives the upper half of the region.',
          },
          { latex: '\\int_{-\\sqrt{6}}^{\\sqrt{6}} \\left(3 - \\frac{y^2}{2}\\right)dy', expr: 'integral(3 - y^2/2, y, -sqrt(6), sqrt(6))' },
        ],
        correct: 4,
        explanation: '$R - L = 0 - \\left(\\frac{y^2}{2} - 3\\right) = 3 - \\frac{y^2}{2}$, from $y = -\\sqrt6$ to $y = \\sqrt6$.',
        result: { latex: 'A = \\int_{-\\sqrt{6}}^{\\sqrt{6}}\\left(3 - \\frac{y^2}{2}\\right)dy' },
        check: { kind: 'value', expected: '4*sqrt(6)' },
      },
      {
        prompt: 'Evaluate.',
        options: [
          {
            latex: '2\\sqrt{6}',
            expr: '2*sqrt(6)',
            mistake: 'ftc-not-subtracted',
            why: 'Only $F(\\sqrt6) = 2\\sqrt6$ was kept; $F(-\\sqrt6) = -2\\sqrt6$ must be subtracted.',
          },
          { latex: '4\\sqrt{6}', expr: '4*sqrt(6)' },
          {
            latex: '6\\sqrt{6}',
            expr: '6*sqrt(6)',
            mistake: 'negative-squared-wrong',
            why: 'Used $(-\\sqrt6)^3 = 6\\sqrt6$; an odd power keeps the sign, so it is $-6\\sqrt6$.',
          },
          {
            latex: '0',
            expr: '0',
            mistake: 'power-rule-int-coefficient',
            why: 'Used $\\int \\frac{y^2}{2}\\,dy = \\frac{y^3}{2}$; then $F(\\pm\\sqrt6) = 3(\\pm\\sqrt6) - 3(\\pm\\sqrt6) = 0$.',
          },
          {
            latex: '8\\sqrt{6}',
            expr: '8*sqrt(6)',
            mistake: 'coefficient-mishandled',
            why: 'Doubled for symmetry although the limits already run from $-\\sqrt6$ to $\\sqrt6$.',
          },
        ],
        correct: 1,
        explanation: '$\\left[3y - \\frac{y^3}{6}\\right]_{-\\sqrt6}^{\\sqrt6} = 2\\sqrt6 - (-2\\sqrt6) = 4\\sqrt6$, using $(\\sqrt6)^3 = 6\\sqrt6$.',
        result: { latex: '= \\left[3y - \\frac{y^3}{6}\\right]_{-\\sqrt{6}}^{\\sqrt{6}} = 2\\sqrt{6} - (-2\\sqrt{6}) = 4\\sqrt{6}' },
        check: { kind: 'value', expected: '4*sqrt(6)' },
      },
    ],
    final: {
      latex: 'A = 4\\sqrt{6}',
      expr: '4*sqrt(6)',
      check: { kind: 'definite-integral', integrand: '3 - y^2/2', lower: '-sqrt(6)', upper: 'sqrt(6)' },
      recap: 'Solve for $x = \\frac{y^2}{2} - 3$ and integrate right − left, $0 - \\left(\\frac{y^2}{2} - 3\\right)$, between the $y$-intercepts $\\pm\\sqrt6$: $A = 4\\sqrt6$.',
    },
  },

  // ───────────── ar-s-12: Example 2.1 redone in y ─────────────
  {
    id: 'ar-s-12',
    topic: 'area',
    title: 'Example 2.1 with horizontal slices',
    difficulty: 2,
    variable: 'y',
    statement: {
      text: 'Find the area of the region enclosed by $y = x^2$ and $y = 2x$, this time integrating with respect to $y$.',
    },
    steps: [
      {
        prompt: 'On this region $x \\ge 0$. Write both curves as $x = g(y)$.',
        options: [
          {
            latex: 'x = y^2,\\quad x = 2y',
            expr: '[y^2, 2*y]',
            mistake: 'inverse-function-wrong',
            why: 'Swapping the letters $x$ and $y$ does not solve for $x$: $y = x^2$ gives $x = \\sqrt{y}$, and $y = 2x$ gives $x = \\frac{y}{2}$.',
          },
          {
            latex: 'x = \\sqrt{y},\\quad x = 2y',
            expr: '[sqrt(y), 2*y]',
            mistake: 'inverse-function-wrong',
            why: 'Solving $y = 2x$ for $x$ divides by 2: $x = \\frac{y}{2}$.',
          },
          {
            latex: 'x = -\\sqrt{y},\\quad x = \\frac{y}{2}',
            expr: '[-sqrt(y), y/2]',
            mistake: 'inverse-function-wrong',
            why: 'The region has $x \\ge 0$, so the relevant branch of $y = x^2$ is $x = +\\sqrt{y}$.',
          },
          { latex: 'x = \\sqrt{y},\\quad x = \\frac{y}{2}', expr: '[sqrt(y), y/2]' },
          {
            latex: 'x = y^2,\\quad x = \\frac{y}{2}',
            expr: '[y^2, y/2]',
            mistake: 'inverse-function-wrong',
            why: '$y = x^2$ solved for $x$ is $x = \\sqrt{y}$, not $y^2$.',
          },
        ],
        correct: 3,
        explanation: '$y = x^2$ with $x \\ge 0$ gives $x = \\sqrt{y}$; $y = 2x$ gives $x = \\frac{y}{2}$.',
        result: { latex: 'x = \\sqrt{y}\\ (\\text{parabola}),\\quad x = \\frac{y}{2}\\ (\\text{line})' },
        check: { kind: 'value', expected: '[sqrt(y), y/2]' },
      },
      {
        prompt: 'Find the $y$-limits and the right and left curves.',
        options: [
          {
            text: '$0 \\le y \\le 4$; right $x = \\frac{y}{2}$, left $x = \\sqrt{y}$',
            mistake: 'top-bottom-swapped',
            why: 'At $y = 1$ the parabola ($x = 1$) is to the right of the line ($x = \\tfrac12$).',
          },
          {
            text: '$0 \\le y \\le 2$; right $x = \\sqrt{y}$, left $x = \\frac{y}{2}$',
            mistake: 'bounds-wrong-variable',
            why: '$2$ is the $x$-coordinate of $(2, 4)$; the $y$-limits are $0$ and $4$.',
          },
          { text: '$0 \\le y \\le 4$; right $x = \\sqrt{y}$, left $x = \\frac{y}{2}$ (at $y = 1$: $1 > \\tfrac12$)' },
          {
            text: '$0 \\le y \\le 4$; right $x = \\sqrt{y}$ on $(0, 1)$ but $x = \\frac{y}{2}$ on $(1, 4)$',
            mistake: 'top-bottom-swapped',
            why: 'At $y = 3$: $\\sqrt3 \\approx 1.73 > 1.5$, so the parabola stays on the right until $y = 4$.',
          },
          {
            text: '$0 \\le x \\le 2$; top $y = 2x$, bottom $y = x^2$',
            mistake: 'dx-dy-mismatch',
            why: 'That is the $dx$ description; for $dy$ we need $y$-limits and right/left curves in $y$.',
          },
        ],
        correct: 2,
        explanation: 'The intersection points $(0, 0)$ and $(2, 4)$ give $y$ from $0$ to $4$; a test at $y = 1$ puts the parabola on the right.',
        result: { text: '$0 \\le y \\le 4$, $R(y) = \\sqrt{y}$, $L(y) = \\frac{y}{2}$.' },
      },
      {
        prompt: 'Set up the area integral.',
        options: [
          {
            latex: '\\int_0^4 \\left(\\frac{y}{2} - \\sqrt{y}\\right)dy',
            expr: 'integral(y/2 - sqrt(y), y, 0, 4)',
            mistake: 'top-bottom-swapped',
            why: 'This is left − right.',
          },
          {
            latex: '\\int_0^2 \\left(\\sqrt{y} - \\frac{y}{2}\\right)dy',
            expr: 'integral(sqrt(y) - y/2, y, 0, 2)',
            mistake: 'bounds-wrong-variable',
            why: 'The upper $y$-limit is $4$; $2$ is an $x$-value.',
          },
          {
            latex: '\\int_0^4 \\left(\\sqrt{y} - \\frac{y}{2}\\right)dx',
            expr: 'integral(sqrt(y) - y/2, x, 0, 4)',
            mistake: 'dx-dy-mismatch',
            why: 'The integrand is in $y$, so the differential must be $dy$.',
          },
          {
            latex: '\\int_0^4 \\left(2y - y^2\\right)dy',
            expr: 'integral(2*y - y^2, y, 0, 4)',
            mistake: 'inverse-function-wrong',
            why: 'Swapping letters gives $x = 2y$ and $x = y^2$; solved for $x$ the curves are $x = \\frac{y}{2}$ and $x = \\sqrt{y}$.',
          },
          { latex: '\\int_0^4 \\left(\\sqrt{y} - \\frac{y}{2}\\right)dy', expr: 'integral(sqrt(y) - y/2, y, 0, 4)' },
        ],
        correct: 4,
        explanation: 'Right − left from $y = 0$ to $y = 4$.',
        result: { latex: 'A = \\int_0^4 \\left(\\sqrt{y} - \\frac{y}{2}\\right)dy' },
        check: { kind: 'value', expected: '4/3' },
      },
      {
        prompt: 'Evaluate.',
        options: [
          {
            latex: '8',
            expr: '8',
            mistake: 'power-rule-int-coefficient',
            why: 'Multiplied by $\\frac32$ instead of dividing: $\\frac32 y^{3/2}$ gives $\\frac32 \\cdot 8 - 4$.',
          },
          {
            latex: '-\\frac{8}{3}',
            expr: '-8/3',
            mistake: 'power-rule-int-coefficient',
            why: 'Took $\\int \\frac{y}{2}\\,dy = \\frac{y^2}{2}$, missing the extra factor $\\frac12$: $\\frac{16}{3} - 8$.',
          },
          {
            latex: '0',
            expr: '0',
            mistake: 'arithmetic-error',
            why: 'Took $4^{3/2} = 6$; in fact $4^{3/2} = (\\sqrt4)^3 = 8$.',
          },
          { latex: '\\frac{4}{3}', expr: '4/3' },
          {
            latex: '\\frac{16}{3}',
            expr: '16/3',
            mistake: 'single-function-area',
            why: 'Only the $\\sqrt{y}$ term was integrated; the $-\\frac{y^2}{4}$ term from the left curve was dropped.',
          },
        ],
        correct: 3,
        explanation: '$\\left[\\frac23 y^{3/2} - \\frac{y^2}{4}\\right]_0^4 = \\frac{16}{3} - 4 = \\frac43$, the same as the $dx$ answer.',
        result: { latex: '= \\left[\\frac{2}{3}y^{3/2} - \\frac{y^2}{4}\\right]_0^4 = \\frac{16}{3} - 4 = \\frac{4}{3}' },
        check: { kind: 'value', expected: '4/3' },
      },
    ],
    final: {
      latex: 'A = \\frac{4}{3}',
      expr: '4/3',
      check: { kind: 'definite-integral', integrand: 'sqrt(y) - y/2', lower: '0', upper: '4' },
      recap: 'In $y$ the limits are $y$-values ($0$ to $4$) and the integrand is right − left $= \\sqrt{y} - \\frac{y}{2}$; the result matches the $dx$ answer $\\int_0^2 (2x - x^2)\\,dx = \\frac43$.',
    },
  },
];
