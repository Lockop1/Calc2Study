import type { FlashGenerator, FlashItem } from '../types';

/**
 * Flash Drill items for topic "volumes-shells" (Lecture 4, §2.3: cylindrical shells and method
 * selection). Authored by content-author; verified by math-verifier.
 *
 * Course conventions (Lecture 4, Table 1): shell slices are parallel to the axis of rotation; the
 * radius is the distance from the slice to the axis; the height is the distance between the two
 * points P and Q where the slice meets the boundary; S = 2π r h and V = ∫ S(x) dx or ∫ S(y) dy.
 * Regions are described by equations (no figures). Radius/height pairs are vectors [r, h].
 */
export const flash: FlashItem[] = [
  // ───────────── formulas, orientation, definitions ─────────────
  {
    id: 'vs-f-001',
    topic: 'volumes-shells',
    kind: 'formula',
    prompt: {
      text: 'In the shell method, $V = \\int_a^b S(x)\\,dx$, where $S$ is the lateral (side) surface area of a cylindrical shell. What is $S$ for a shell of radius $r$ and height $h$?',
    },
    options: [
      { latex: 'S = \\pi r^2 h', mistake: 'formula-swapped', why: 'πr²h is the volume of a solid cylinder, not the side area of a thin shell.' },
      { latex: 'S = 2\\pi r h' },
      { latex: 'S = 2\\pi r^2 h', mistake: 'shell-radius-squared', why: 'Squaring the radius is a disk habit; the side area is the circumference 2πr times the height h.' },
      { latex: 'S = \\pi r h', mistake: 'two-pi-missing', why: 'πr is only half the circumference; unrolled, the side of the shell is 2πr long.' },
      { latex: 'S = \\pi(R^2 - r^2)', mistake: 'method-formula-swapped', why: 'π(R² − r²) is the area of a washer, the cross-section of a slice perpendicular to the axis.' },
      { latex: 'S = 2rh', mistake: 'formula-missing-factor', why: 'The circumference of a circle of radius r is 2πr; the factor π was dropped.' },
    ],
    correct: 1,
    explanation: 'Cut open and unrolled, the side of the shell is a rectangle of length $2\\pi r$ (the circumference) and height $h$, so $S = 2\\pi r h$.',
    check: { kind: 'none', reason: 'formula recall; options are symbolic formulas in r, h, R' },
    difficulty: 1,
    tags: ['formula'],
  },
  {
    id: 'vs-f-002',
    topic: 'volumes-shells',
    kind: 'formula',
    prompt: {
      text: 'The region under $y = f(x) \\ge 0$ for $0 \\le a \\le x \\le b$ is rotated about the y-axis. Which integral gives the volume by cylindrical shells?',
    },
    options: [
      { latex: '\\int_a^b \\pi x f(x)\\,dx', mistake: 'two-pi-missing', why: 'The side area of a shell is 2πrh; using π instead of 2π halves the volume.' },
      { latex: '\\int_a^b \\pi f(x)^2\\,dx', mistake: 'method-formula-swapped', why: 'πf(x)² is the disk area of a slice perpendicular to the x-axis; vertical slices are parallel to the y-axis and sweep out shells.' },
      { latex: '\\int_a^b 2\\pi x^2 f(x)\\,dx', mistake: 'shell-radius-squared', why: 'The radius x is not squared in 2πrh; squaring belongs to the disk area πR².' },
      { latex: '\\int_a^b 2\\pi x f(x)\\,dx' },
      { latex: '\\int_a^b 2\\pi f(x)^2\\,dx', mistake: 'shell-radius-wrong', why: 'The height f(x) was also used as the radius; the radius is the distance x from the slice to the y-axis.' },
      { latex: '\\int_{f(a)}^{f(b)} 2\\pi x f(x)\\,dx', mistake: 'bounds-wrong-axis', why: 'f(a) and f(b) are heights (y-values); the vertical slices run from x = a to x = b.' },
    ],
    correct: 3,
    explanation: 'A vertical slice at $x$ is parallel to the y-axis: radius $x$, height $f(x) - 0$, so $V = \\int_a^b 2\\pi x f(x)\\,dx$.',
    check: { kind: 'none', reason: 'general formula with an unspecified f; options are symbolic' },
    difficulty: 1,
    tags: ['formula'],
  },
  {
    id: 'vs-f-003',
    topic: 'volumes-shells',
    kind: 'formula',
    prompt: {
      text: 'The region between the y-axis and the curve $x = g(y) \\ge 0$, for $0 \\le c \\le y \\le d$, is rotated about the line $y = -2$. Which integral gives the volume by cylindrical shells?',
    },
    options: [
      { latex: '\\int_c^d 2\\pi(y - 2)g(y)\\,dy', mistake: 'axis-shift-sign', why: 'The distance from height y down to the line y = −2 is y − (−2) = y + 2.' },
      { latex: '\\int_c^d 2\\pi y\\,g(y)\\,dy', mistake: 'axis-shift-missing', why: 'Radius y is the distance to the x-axis (y = 0); the axis here is the line y = −2.' },
      { latex: '\\int_c^d 2\\pi(2 - y)g(y)\\,dy', mistake: 'axis-shift-sign', why: '2 − y is the distance to the line y = 2 above the slice, not to y = −2 below it.' },
      { latex: '\\int_c^d 2\\pi(d - y)g(y)\\,dy', mistake: 'shell-radius-wrong', why: 'd − y is the distance to the top edge of the region; the radius is measured to the axis of rotation.' },
      { latex: '\\int_c^d 2\\pi(y + 2)g(y)\\,dy' },
      { latex: '\\int_c^d \\pi\\,g(y)^2\\,dy', mistake: 'method-formula-swapped', why: 'πg(y)² is the disk area of a horizontal slice turned about the y-axis; horizontal slices are parallel to y = −2, so they make shells.' },
    ],
    correct: 4,
    explanation: 'Horizontal slices are parallel to $y = -2$: radius $y - (-2) = y + 2$, height $g(y) - 0 = g(y)$.',
    check: { kind: 'none', reason: 'general formula with an unspecified g; options are symbolic' },
    difficulty: 2,
    tags: ['formula', 'axis-shift'],
  },
  {
    id: 'vs-f-004',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: { text: 'How are the representative slices drawn relative to the axis of rotation in each method?' },
    options: [
      { text: 'Shells: perpendicular to the axis. Disks/washers: parallel to the axis.', mistake: 'shell-orientation-wrong', why: 'The two orientations are swapped: perpendicular slices sweep out disks or washers, parallel slices sweep out shells.' },
      { text: 'Shells: parallel to the axis. Disks/washers: parallel to the axis.', mistake: 'method-formula-swapped', why: 'A slice parallel to the axis sweeps out a shell; disks and washers come from slices perpendicular to the axis.' },
      { text: 'Shells: parallel to the axis. Disks/washers: perpendicular to the axis.' },
      { text: 'Shells: perpendicular to the axis. Disks/washers: perpendicular to the axis.', mistake: 'shell-orientation-wrong', why: 'A slice perpendicular to the axis sweeps out a disk or a washer, never a shell.' },
      { text: 'Shells: always vertical. Disks/washers: always horizontal.', mistake: 'shell-orientation-wrong', why: 'The orientation depends on the axis: shells about a horizontal axis use horizontal slices.' },
    ],
    correct: 2,
    explanation: 'Lecture 4: shell slices are parallel to the axis of rotation; disk/washer slices are perpendicular to it.',
    check: { kind: 'none', reason: 'conceptual recall; text options' },
    difficulty: 1,
    tags: ['orientation'],
  },
  {
    id: 'vs-f-005',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'In the shell method, the representative slice meets the boundary of the region at two points $P$ and $Q$. What is the height $h$ of the shell?',
    },
    options: [
      { text: 'The distance from $P$ (or $Q$) to the axis of rotation', mistake: 'shell-height-wrong', why: 'That distance is the radius of the shell; the height is the length of the slice itself.' },
      { text: 'The distance between $P$ and $Q$' },
      { text: 'The distance from the axis to the farthest point of the region', mistake: 'method-formula-swapped', why: 'That is the outer radius R of a washer, which belongs to slices perpendicular to the axis.' },
      { text: 'The $y$-coordinate of the upper endpoint of the slice', mistake: 'shell-height-wrong', why: 'That equals the height only when the slice starts on y = 0; in general it is top minus bottom (or right minus left).' },
      { text: 'The thickness $\\Delta x$ (or $\\Delta y$) of the slice', mistake: 'shell-height-wrong', why: 'Δx is the thickness of the shell wall, not its height.' },
    ],
    correct: 1,
    explanation: 'Table 1: the height of the shell is the distance between $P$ and $Q$, i.e. the length of the slice.',
    check: { kind: 'none', reason: 'definition recall; text options' },
    difficulty: 1,
    tags: ['definition'],
  },
  {
    id: 'vs-f-006',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'In the shell method, the representative slice meets the boundary of the region at two points $P$ and $Q$. What is the radius $r$ of the shell?',
    },
    options: [
      { text: 'The distance between $P$ and $Q$', mistake: 'shell-radius-wrong', why: 'That is the height of the shell (the length of the slice), not its radius.' },
      { text: 'The distance from the axis to the farthest point of the region', mistake: 'method-formula-swapped', why: 'That is the outer radius R of a washer, used with slices perpendicular to the axis.' },
      { text: 'The $x$-coordinate of the slice, whatever the axis', mistake: 'shell-radius-wrong', why: 'x is the radius only when the axis is the y-axis; about the line x = k the radius is the distance |x − k|.' },
      { text: 'The distance from $P$ (or $Q$) to the axis of rotation' },
      { text: 'The $y$-coordinate of the upper endpoint of the slice', mistake: 'radius-is-function-value', why: 'A function value is a disk radius about the x-axis; a shell radius is the distance from the slice to the axis.' },
    ],
    correct: 3,
    explanation: 'Table 1: $P$ and $Q$ are equally far from the axis (the slice is parallel to it), and that distance is the radius.',
    check: { kind: 'none', reason: 'definition recall; text options' },
    difficulty: 1,
    tags: ['definition'],
  },
  {
    id: 'vs-f-007',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'A thin cylindrical shell has radius $r$, height $h$, and thickness $\\Delta x$. Cut it along its height and flatten it. About what size is the flat slab?',
    },
    options: [
      { text: '$\\pi r$ long, $h$ tall, $\\Delta x$ thick', mistake: 'two-pi-missing', why: 'Unrolling a circle of radius r gives its full circumference 2πr, not πr.' },
      { text: '$\\pi r^2$ long, $h$ tall, $\\Delta x$ thick', mistake: 'formula-swapped', why: 'πr² is the area of a disk, not a length; the slab is as long as the circumference 2πr.' },
      { text: '$2\\pi r$ long, $h$ tall, $\\Delta x$ thick' },
      { text: '$2\\pi h$ long, $r$ tall, $\\Delta x$ thick', mistake: 'shell-radius-wrong', why: 'The circumference comes from the radius (2πr), and the slab is h tall.' },
      { text: '$r$ long, $h$ tall, $\\Delta x$ thick', mistake: 'formula-missing-factor', why: 'The unrolled length is the circumference 2πr, not the radius r.' },
    ],
    correct: 2,
    explanation: 'The slab is $2\\pi r$ (the circumference) by $h$ by $\\Delta x$, so its volume is about $2\\pi r h\\,\\Delta x$, the shell integrand.',
    check: { kind: 'none', reason: 'conceptual; text options' },
    difficulty: 1,
    tags: ['formula'],
  },
  {
    id: 'vs-f-008',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region between $y = x^2$ and $y = 2x$ is rotated about the line $y = -1$ using cylindrical shells. Which slices and limits of integration?',
    },
    options: [
      { text: 'Vertical slices; integrate in $x$ from 0 to 2', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to y = −1 and sweep out washers; shells need horizontal slices.' },
      { text: 'Horizontal slices; integrate in $y$ from 0 to 2', mistake: 'bounds-wrong-axis', why: '0 and 2 are the x-coordinates of the intersections (0, 0) and (2, 4); the y-limits are 0 and 4.' },
      { text: 'Horizontal slices; integrate in $y$ from 0 to 4' },
      { text: 'Horizontal slices; integrate in $x$ from 0 to 2', mistake: 'wrong-integration-variable', why: 'A horizontal slice has thickness dy, so the shells are stacked along y.' },
      { text: 'Vertical slices; integrate in $y$ from 0 to 4', mistake: 'wrong-integration-variable', why: 'A vertical slice has thickness dx; and shells about a horizontal axis need horizontal slices.' },
    ],
    correct: 2,
    explanation: 'The axis is horizontal, so shell slices are horizontal (thickness $dy$); the curves meet at $(0,0)$ and $(2,4)$, so $0 \\le y \\le 4$.',
    check: { kind: 'none', reason: 'setup recognition; text options' },
    difficulty: 1,
    tags: ['orientation', 'bounds'],
  },
  {
    id: 'vs-f-009',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $y = x^2$, $y = 0$, and $x = 2$ is rotated about the line $x = 3$ using cylindrical shells. Which slices and limits of integration?',
    },
    options: [
      { text: 'Horizontal slices; integrate in $y$ from 0 to 4', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to x = 3 and sweep out washers; shells need vertical slices.' },
      { text: 'Vertical slices; integrate in $x$ from 0 to 4', mistake: 'bounds-wrong-axis', why: '4 is the largest y-value of the region (at x = 2); the region spans 0 ≤ x ≤ 2.' },
      { text: 'Vertical slices; integrate in $y$ from 0 to 4', mistake: 'wrong-integration-variable', why: 'A vertical slice has thickness dx, so the integral is in x.' },
      { text: 'Vertical slices; integrate in $x$ from 0 to 2' },
      { text: 'Horizontal slices; integrate in $x$ from 0 to 2', mistake: 'wrong-integration-variable', why: 'A horizontal slice has thickness dy; and about the vertical line x = 3 the shell slices must be vertical.' },
    ],
    correct: 3,
    explanation: 'The axis $x = 3$ is vertical, so shell slices are vertical (thickness $dx$) across the region, $0 \\le x \\le 2$.',
    check: { kind: 'none', reason: 'setup recognition; text options' },
    difficulty: 1,
    tags: ['orientation', 'bounds'],
  },
  {
    id: 'vs-f-010',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'This shell integral is the volume of the solid formed by rotating the region under $y = \\sqrt{x}$, $0 \\le x \\le 4$, about a line. Which line?',
      latex: '\\int_0^4 2\\pi(x + 1)\\sqrt{x}\\,dx',
    },
    options: [
      { latex: 'x = 1', mistake: 'axis-shift-sign', why: 'About x = 1 the radius would be |x − 1|; the radius x + 1 = x − (−1) is the distance to x = −1.' },
      { latex: 'y = -1', mistake: 'shell-orientation-wrong', why: 'The slices are vertical (dx), and shell slices are parallel to the axis, so the axis must be a vertical line.' },
      { latex: 'x = 0', mistake: 'axis-shift-missing', why: 'About the y-axis the radius would be just x; the +1 means the axis is shifted.' },
      { latex: 'y = 1', mistake: 'shell-orientation-wrong', why: 'A dx shell integral comes from vertical slices, which are parallel only to vertical lines; y = 1 is horizontal.' },
      { latex: 'x = -1' },
    ],
    correct: 4,
    explanation: 'Vertical slices ($dx$) mean a vertical axis, and the radius $x + 1 = x - (-1)$ is the distance to $x = -1$.',
    check: { kind: 'none', reason: 'reading an axis from a setup; options are equations of lines' },
    difficulty: 2,
    tags: ['axis-shift', 'orientation'],
  },
  {
    id: 'vs-f-011',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'This shell integral is the volume of the solid formed by rotating the region bounded by $y = \\sqrt{x}$, $y = 0$, and $x = 4$ about a line. Which line?',
      latex: '\\int_0^2 2\\pi(3 - y)(4 - y^2)\\,dy',
    },
    options: [
      { latex: 'y = -3', mistake: 'axis-shift-sign', why: 'About y = −3 the radius would be y + 3; the radius 3 − y is the distance from the slice up to y = 3.' },
      { latex: 'x = 3', mistake: 'shell-orientation-wrong', why: 'The slices are horizontal (dy), so the axis they are parallel to must be horizontal.' },
      { latex: 'y = 3' },
      { latex: 'y = 0', mistake: 'axis-shift-missing', why: 'About the x-axis the radius would be just y.' },
      { latex: 'x = -3', mistake: 'shell-orientation-wrong', why: 'A dy shell integral comes from horizontal slices, which are parallel only to horizontal lines.' },
    ],
    correct: 2,
    explanation: 'Horizontal slices ($dy$) mean a horizontal axis; the radius $3 - y$ is the distance from the slice up to $y = 3$ (the region lies below it).',
    check: { kind: 'none', reason: 'reading an axis from a setup; options are equations of lines' },
    difficulty: 2,
    tags: ['axis-shift', 'orientation'],
  },

  // ───────────── radius and height of the shell ─────────────
  {
    id: 'vs-f-012',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $y = x^2$, $y = 0$, and $x = 2$ is rotated about the line $x = 3$. What are the radius and height of the shell at position $x$?',
    },
    options: [
      { latex: 'r = x - 3,\\quad h = x^2', expr: '[x - 3, x^2]', mistake: 'axis-shift-sign', why: 'For 0 ≤ x ≤ 2 this is negative; the slice lies left of x = 3, so its distance to the axis is 3 − x.' },
      { latex: 'r = x,\\quad h = x^2', expr: '[x, x^2]', mistake: 'axis-shift-missing', why: 'x is the distance to the y-axis, but the axis of rotation is the line x = 3.' },
      { latex: 'r = x^2,\\quad h = 3 - x', expr: '[x^2, 3 - x]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is x² long and sits 3 − x from the axis.' },
      { latex: 'r = 3 - x,\\quad h = x^2', expr: '[3 - x, x^2]' },
      { latex: 'r = x + 3,\\quad h = x^2', expr: '[x + 3, x^2]', mistake: 'axis-shift-sign', why: 'x + 3 is the distance to the line x = −3, not to x = 3.' },
      { latex: 'r = 2 - x,\\quad h = x^2', expr: '[2 - x, x^2]', mistake: 'shell-radius-wrong', why: '2 − x is the distance to the edge x = 2 of the region; the radius is measured to the axis x = 3.' },
    ],
    correct: 3,
    explanation: 'The vertical slice at $x$ runs from $y = 0$ to $y = x^2$ (height $x^2$) and lies $3 - x$ units left of the axis $x = 3$.',
    check: { kind: 'value', expected: '[3 - x, x^2]' },
    difficulty: 1,
    tags: ['radius-height', 'axis-shift'],
  },
  {
    id: 'vs-f-013',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region between $y = x^2$ and $y = 2x$ is rotated about the y-axis. What are the radius and height of the shell at position $x$?',
    },
    options: [
      { latex: 'r = x,\\quad h = x^2 - 2x', expr: '[x, x^2 - 2*x]', mistake: 'top-bottom-swapped', why: 'On 0 ≤ x ≤ 2 the line y = 2x lies above the parabola, so the height is 2x − x², not x² − 2x.' },
      { latex: 'r = x,\\quad h = 2x + x^2', expr: '[x, 2*x + x^2]', mistake: 'sum-instead-of-difference', why: 'The length of the slice is top minus bottom, not the sum of the two curves.' },
      { latex: 'r = x,\\quad h = 2x - x^2', expr: '[x, 2*x - x^2]' },
      { latex: 'r = x,\\quad h = 2x', expr: '[x, 2*x]', mistake: 'shell-height-wrong', why: 'Only the top curve was used; the slice starts on the parabola y = x², not on y = 0.' },
      { latex: 'r = 2x - x^2,\\quad h = x', expr: '[2*x - x^2, x]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is 2x − x² long and sits x units from the y-axis.' },
      { latex: 'r = y,\\quad h = \\sqrt{y} - \\frac{y}{2}', expr: '[y, sqrt(y) - y/2]', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to the y-axis; shells about the y-axis come from vertical slices.' },
    ],
    correct: 2,
    explanation: 'On $0 \\le x \\le 2$ the slice runs from $y = x^2$ up to $y = 2x$, so $h = 2x - x^2$, and it lies $x$ units from the y-axis.',
    check: { kind: 'value', expected: '[x, 2*x - x^2]' },
    difficulty: 1,
    tags: ['radius-height'],
  },
  {
    id: 'vs-f-014',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region between $y = x^2$ and $y = 2x$ is rotated about the line $y = -1$ using shells. What are the radius and height of the shell for the horizontal slice at height $y$?',
    },
    options: [
      { latex: 'r = y - 1,\\quad h = \\sqrt{y} - \\frac{y}{2}', expr: '[y - 1, sqrt(y) - y/2]', mistake: 'axis-shift-sign', why: 'The distance from height y down to the line y = −1 is y − (−1) = y + 1.' },
      { latex: 'r = x + 1,\\quad h = 2x - x^2', expr: '[x + 1, 2*x - x^2]', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to y = −1 and sweep out washers; shells about a horizontal axis need horizontal slices.' },
      { latex: 'r = y,\\quad h = \\sqrt{y} - \\frac{y}{2}', expr: '[y, sqrt(y) - y/2]', mistake: 'axis-shift-missing', why: 'y is the distance to the x-axis; the axis of rotation is one unit lower, at y = −1.' },
      { latex: 'r = \\sqrt{y} - \\frac{y}{2},\\quad h = y + 1', expr: '[sqrt(y) - y/2, y + 1]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is √y − y/2 long and sits y + 1 from the axis.' },
      { latex: 'r = y + 1,\\quad h = \\sqrt{y} - \\frac{y}{2}', expr: '[y + 1, sqrt(y) - y/2]' },
      { latex: 'r = 1 - y,\\quad h = \\sqrt{y} - \\frac{y}{2}', expr: '[1 - y, sqrt(y) - y/2]', mistake: 'axis-shift-sign', why: '1 − y is the distance to the line y = 1 for a slice below it, not the distance to y = −1.' },
    ],
    correct: 4,
    explanation: 'At height $y$ the slice runs from the line ($x = y/2$) to the parabola ($x = \\sqrt{y}$), so $h = \\sqrt{y} - \\frac{y}{2}$; it lies $y - (-1) = y + 1$ above the axis.',
    variable: 'y',
    check: { kind: 'value', expected: '[y + 1, sqrt(y) - y/2]' },
    difficulty: 2,
    tags: ['radius-height', 'axis-shift'],
  },
  {
    id: 'vs-f-015',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $y = x^2$, $y = 0$, and $x = 2$ is rotated about the x-axis using shells. What are the radius and height of the shell for the horizontal slice at height $y$?',
    },
    options: [
      { latex: 'r = y,\\quad h = \\sqrt{y}', expr: '[y, sqrt(y)]', mistake: 'shell-height-wrong', why: 'From the y-axis to x = √y lies outside the region; the slice runs from the curve x = √y to the line x = 2.' },
      { latex: 'r = y,\\quad h = 2 - y^2', expr: '[y, 2 - y^2]', mistake: 'inverse-function-wrong', why: 'Solving y = x² for x gives x = √y, not x = y².' },
      { latex: 'r = y,\\quad h = x^2', expr: '[y, x^2]', mistake: 'not-in-terms-of-variable', why: 'x² is the height of a vertical slice; a horizontal slice needs its length written in y.' },
      { latex: 'r = 2 - \\sqrt{y},\\quad h = y', expr: '[2 - sqrt(y), y]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is 2 − √y long and sits y above the axis.' },
      { latex: 'r = x,\\quad h = x^2', expr: '[x, x^2]', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to the x-axis (they sweep out disks); this pair belongs to rotation about the y-axis.' },
      { latex: 'r = y,\\quad h = 2 - \\sqrt{y}', expr: '[y, 2 - sqrt(y)]' },
    ],
    correct: 5,
    explanation: 'Shells about the x-axis use horizontal slices: at height $y$ the slice runs from $x = \\sqrt{y}$ to $x = 2$, so $h = 2 - \\sqrt{y}$ and $r = y$.',
    variable: 'y',
    check: { kind: 'value', expected: '[y, 2 - sqrt(y)]' },
    difficulty: 2,
    tags: ['radius-height'],
  },
  {
    id: 'vs-f-016',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region between $y = x$ and $y = x^2$ ($0 \\le x \\le 1$) is rotated about the line $x = -2$. What are the radius and height of the shell at position $x$?',
    },
    options: [
      { latex: 'r = x + 2,\\quad h = x - x^2', expr: '[x + 2, x - x^2]' },
      { latex: 'r = x - 2,\\quad h = x - x^2', expr: '[x - 2, x - x^2]', mistake: 'axis-shift-sign', why: 'x − 2 is negative on 0 ≤ x ≤ 1; the distance from x to the line x = −2 is x − (−2) = x + 2.' },
      { latex: 'r = x,\\quad h = x - x^2', expr: '[x, x - x^2]', mistake: 'axis-shift-missing', why: 'x is the distance to the y-axis; the axis of rotation is two units further left, at x = −2.' },
      { latex: 'r = 2 - x,\\quad h = x - x^2', expr: '[2 - x, x - x^2]', mistake: 'axis-shift-sign', why: '2 − x is the distance to the line x = 2 on the right, not to x = −2.' },
      { latex: 'r = x - x^2,\\quad h = x + 2', expr: '[x - x^2, x + 2]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is x − x² long and sits x + 2 from the axis.' },
      { latex: 'r = y + 2,\\quad h = \\sqrt{y} - y', expr: '[y + 2, sqrt(y) - y]', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to x = −2; shells about a vertical axis come from vertical slices.' },
    ],
    correct: 0,
    explanation: 'On $0 \\le x \\le 1$ the line $y = x$ lies above $y = x^2$, so $h = x - x^2$; the slice is $x - (-2) = x + 2$ from the axis.',
    check: { kind: 'value', expected: '[x + 2, x - x^2]' },
    difficulty: 1,
    tags: ['radius-height', 'axis-shift'],
  },
  {
    id: 'vs-f-017',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $x = 2$, $x = 4$, $y = 1$, and the curve $y = (x - 2)^2 + 3$ (the same curve as $x = 2 + \\sqrt{y - 3}$) is rotated about the line $x = 1$. What are the radius and height of the shell at position $x$?',
    },
    options: [
      { latex: 'r = 1 - x,\\quad h = (x - 2)^2 + 2', expr: '[1 - x, (x - 2)^2 + 2]', mistake: 'axis-shift-sign', why: 'For 2 ≤ x ≤ 4 this is negative; the slice is right of x = 1, so its distance to the axis is x − 1.' },
      { latex: 'r = x,\\quad h = (x - 2)^2 + 2', expr: '[x, (x - 2)^2 + 2]', mistake: 'axis-shift-missing', why: 'x is the distance to the y-axis; the axis of rotation is the line x = 1.' },
      { latex: 'r = x + 1,\\quad h = (x - 2)^2 + 2', expr: '[x + 1, (x - 2)^2 + 2]', mistake: 'axis-shift-sign', why: 'x + 1 is the distance to the line x = −1, not to x = 1.' },
      { latex: 'r = x - 2,\\quad h = (x - 2)^2 + 2', expr: '[x - 2, (x - 2)^2 + 2]', mistake: 'shell-radius-wrong', why: 'x − 2 is the distance to the left edge x = 2 of the region; the radius is measured to the axis x = 1.' },
      { latex: 'r = x - 1,\\quad h = (x - 2)^2 + 2', expr: '[x - 1, (x - 2)^2 + 2]' },
      { latex: 'r = (x - 2)^2 + 2,\\quad h = x - 1', expr: '[(x - 2)^2 + 2, x - 1]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is (x − 2)² + 2 long and sits x − 1 from the axis.' },
    ],
    correct: 4,
    explanation: 'The slice at $x$ runs from $y = 1$ up to $y = (x - 2)^2 + 3$, so $h = (x - 2)^2 + 2$; it lies $x - 1$ units right of the axis $x = 1$.',
    check: { kind: 'value', expected: '[x - 1, (x - 2)^2 + 2]' },
    difficulty: 2,
    tags: ['radius-height', 'axis-shift'],
  },
  {
    id: 'vs-f-018',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region between the y-axis and $x = 2y - y^2$ ($0 \\le y \\le 2$) is rotated about the line $y = 3$. What are the radius and height of the shell for the horizontal slice at height $y$?',
    },
    options: [
      { latex: 'r = y - 3,\\quad h = 2y - y^2', expr: '[y - 3, 2*y - y^2]', mistake: 'axis-shift-sign', why: 'y − 3 is negative for 0 ≤ y ≤ 2; the slice is below y = 3, so its distance to the axis is 3 − y.' },
      { latex: 'r = 3 - y,\\quad h = 2y - y^2', expr: '[3 - y, 2*y - y^2]' },
      { latex: 'r = y,\\quad h = 2y - y^2', expr: '[y, 2*y - y^2]', mistake: 'axis-shift-missing', why: 'y is the distance to the x-axis; the axis of rotation is the line y = 3.' },
      { latex: 'r = y + 3,\\quad h = 2y - y^2', expr: '[y + 3, 2*y - y^2]', mistake: 'axis-shift-sign', why: 'y + 3 is the distance to the line y = −3, not to y = 3.' },
      { latex: 'r = 2 - y,\\quad h = 2y - y^2', expr: '[2 - y, 2*y - y^2]', mistake: 'shell-radius-wrong', why: '2 − y is the distance to the top of the region (y = 2); the radius is measured to the axis y = 3.' },
      { latex: 'r = 2y - y^2,\\quad h = 3 - y', expr: '[2*y - y^2, 3 - y]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is 2y − y² long and sits 3 − y from the axis.' },
    ],
    correct: 1,
    explanation: 'The slice at height $y$ runs from $x = 0$ to $x = 2y - y^2$, and it lies $3 - y$ below the axis $y = 3$.',
    variable: 'y',
    check: { kind: 'value', expected: '[3 - y, 2*y - y^2]' },
    difficulty: 2,
    tags: ['radius-height', 'axis-shift'],
  },
  {
    id: 'vs-f-019',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region between $y = \\sqrt{x} + 1$ and $y = x^2 + 1$ ($0 \\le x \\le 1$) is rotated about the x-axis using shells. What are the radius and height of the shell for the horizontal slice at height $y$ ($1 \\le y \\le 2$)?',
    },
    options: [
      { latex: 'r = y,\\quad h = (y - 1)^2 - \\sqrt{y - 1}', expr: '[y, (y - 1)^2 - sqrt(y - 1)]', mistake: 'top-bottom-swapped', why: 'Right minus left: x = √(y − 1) is the right boundary and x = (y − 1)² the left one.' },
      { latex: 'r = y,\\quad h = \\sqrt{y} - y^2', expr: '[y, sqrt(y) - y^2]', mistake: 'inverse-function-wrong', why: 'Solving y = x² + 1 for x gives √(y − 1), and y = √x + 1 gives (y − 1)²; the −1 shifts were dropped.' },
      { latex: 'r = y,\\quad h = \\sqrt{y - 1} - (y - 1)^2', expr: '[y, sqrt(y - 1) - (y - 1)^2]' },
      { latex: 'r = y,\\quad h = \\sqrt{x} - x^2', expr: '[y, sqrt(x) - x^2]', mistake: 'not-in-terms-of-variable', why: 'That is the vertical height at x; a horizontal slice needs its length written in y.' },
      { latex: 'r = y,\\quad h = \\sqrt{y - 1}', expr: '[y, sqrt(y - 1)]', mistake: 'shell-height-wrong', why: 'Measured from the y-axis to the right boundary; the slice starts at the left boundary x = (y − 1)².' },
      { latex: 'r = \\sqrt{y - 1} - (y - 1)^2,\\quad h = y', expr: '[sqrt(y - 1) - (y - 1)^2, y]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is √(y − 1) − (y − 1)² long and sits y above the axis.' },
    ],
    correct: 2,
    explanation: 'At height $y$ the slice runs from $x = (y-1)^2$ (on $y = \\sqrt{x} + 1$) to $x = \\sqrt{y - 1}$ (on $y = x^2 + 1$), so $h = \\sqrt{y-1} - (y-1)^2$ and $r = y$.',
    variable: 'y',
    domain: { y: [1.05, 1.95] },
    check: { kind: 'value', expected: '[y, sqrt(y - 1) - (y - 1)^2]' },
    difficulty: 2,
    tags: ['radius-height', 'inverse'],
  },
  {
    id: 'vs-f-020',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $x = y^2$ and $x = 4$ is rotated about the line $x = 5$. What are the radius and height of the shell at position $x$ ($0 \\le x \\le 4$)?',
    },
    options: [
      { latex: 'r = 5 - x,\\quad h = \\sqrt{x}', expr: '[5 - x, sqrt(x)]', mistake: 'shell-height-wrong', why: 'The region is symmetric about the x-axis: the slice runs from y = −√x to y = √x, so its length is 2√x.' },
      { latex: 'r = 5 - x,\\quad h = 2x^2', expr: '[5 - x, 2*x^2]', mistake: 'inverse-function-wrong', why: 'Solving x = y² for y gives y = ±√x, not ±x².' },
      { latex: 'r = 5 - x,\\quad h = 4 - y^2', expr: '[5 - x, 4 - y^2]', mistake: 'not-in-terms-of-variable', why: '4 − y² is the length of a horizontal slice; a vertical slice needs its length written in x.' },
      { latex: 'r = 5 - x,\\quad h = -2\\sqrt{x}', expr: '[5 - x, -2*sqrt(x)]', mistake: 'top-bottom-swapped', why: 'Bottom minus top gives a negative height; subtract the lower boundary −√x from the upper √x.' },
      { latex: 'r = 2\\sqrt{x},\\quad h = 5 - x', expr: '[2*sqrt(x), 5 - x]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is 2√x long and sits 5 − x from the axis.' },
      { latex: 'r = 5 - x,\\quad h = 2\\sqrt{x}', expr: '[5 - x, 2*sqrt(x)]' },
    ],
    correct: 5,
    explanation: 'The vertical slice at $x$ runs from $y = -\\sqrt{x}$ to $y = \\sqrt{x}$, so $h = 2\\sqrt{x}$; it lies $5 - x$ left of the axis $x = 5$.',
    check: { kind: 'value', expected: '[5 - x, 2*sqrt(x)]' },
    difficulty: 2,
    tags: ['radius-height'],
  },
  {
    id: 'vs-f-021',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The triangle bounded by $y = x$, $y = 2 - x$, and the x-axis is rotated about the x-axis using shells. What are the radius and height of the shell for the horizontal slice at height $y$ ($0 \\le y \\le 1$)?',
    },
    options: [
      { latex: 'r = y,\\quad h = 2 - y', expr: '[y, 2 - y]', mistake: 'shell-height-wrong', why: 'That is only the right endpoint x = 2 − y; the slice starts at x = y, so subtract it.' },
      { latex: 'r = y,\\quad h = 2y - 2', expr: '[y, 2*y - 2]', mistake: 'top-bottom-swapped', why: 'Left minus right gives a negative length; the height is right (2 − y) minus left (y).' },
      { latex: 'r = y,\\quad h = 2 - 2x', expr: '[y, 2 - 2*x]', mistake: 'not-in-terms-of-variable', why: 'The height is written with x; a horizontal slice needs its length as a function of y.' },
      { latex: 'r = y,\\quad h = 2 - 2y', expr: '[y, 2 - 2*y]' },
      { latex: 'r = 2 - 2y,\\quad h = y', expr: '[2 - 2*y, y]', mistake: 'shell-radius-wrong', why: 'Radius and height are swapped: the slice is 2 − 2y long and sits y above the axis.' },
      { latex: 'r = y,\\quad h = 2', expr: '[y, 2]', mistake: 'shell-height-wrong', why: '2 is the length of the base at y = 0; the slices get shorter as y increases.' },
    ],
    correct: 3,
    explanation: 'At height $y$ the slice runs from $x = y$ (on $y = x$) to $x = 2 - y$ (on $y = 2 - x$), so $h = 2 - 2y$ and $r = y$.',
    variable: 'y',
    check: { kind: 'value', expected: '[y, 2 - 2*y]' },
    difficulty: 1,
    tags: ['radius-height'],
  },

  // ───────────── which integral gives the volume ─────────────
  {
    id: 'vs-f-022',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $y = x^2$, $y = 0$, and $x = 2$ is rotated about the line $y = 5$. Which integral gives the volume by cylindrical shells?',
    },
    options: [
      { latex: '\\int_0^4 2\\pi(5 - y)\\sqrt{y}\\,dy', expr: 'integral(2*pi*(5 - y)*sqrt(y), y, 0, 4)', mistake: 'shell-height-wrong', why: 'The piece from the y-axis to x = √y is outside the region; the slice runs from x = √y to x = 2.' },
      { latex: '\\int_0^4 2\\pi(5 - y)(2 - y^2)\\,dy', expr: 'integral(2*pi*(5 - y)*(2 - y^2), y, 0, 4)', mistake: 'inverse-function-wrong', why: 'Solving y = x² for x gives x = √y, not y².' },
      { latex: '\\int_0^4 2\\pi(5 - y)(2 - \\sqrt{y})\\,dy', expr: 'integral(2*pi*(5 - y)*(2 - sqrt(y)), y, 0, 4)' },
      { latex: '\\int_0^4 2\\pi(5 - y)(\\sqrt{y} - 2)\\,dy', expr: 'integral(2*pi*(5 - y)*(sqrt(y) - 2), y, 0, 4)', mistake: 'top-bottom-swapped', why: 'Left minus right gives a negative length; the height is right (x = 2) minus left (x = √y).' },
      { latex: '\\int_0^4 2\\pi(5 - y)x^2\\,dy', expr: 'integral(2*pi*(5 - y)*x^2, y, 0, 4)', mistake: 'not-in-terms-of-variable', why: 'x² is the height of a vertical slice; in a dy integral the slice length must be written in y.' },
      { latex: '\\int_0^2 2\\pi(5 - x)x^2\\,dx', expr: 'integral(2*pi*(5 - x)*x^2, x, 0, 2)', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to y = 5 and sweep out washers; this integral rotates the region about the line x = 5.' },
    ],
    correct: 2,
    explanation: 'Horizontal slices are parallel to $y = 5$: radius $5 - y$, height $2 - \\sqrt{y}$ (right minus left), $0 \\le y \\le 4$.',
    variable: 'y',
    check: { kind: 'value', expected: 'integral(pi*(25 - (5 - x^2)^2), x, 0, 2)' },
    difficulty: 2,
    tags: ['setup', 'axis-shift'],
  },
  {
    id: 'vs-f-023',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $y = x^2$, $y = 0$, and $x = 1$ is rotated about the line $x = -2$. Which integral gives the volume?',
    },
    options: [
      { latex: '\\int_0^1 2\\pi(x - 2)x^2\\,dx', expr: 'integral(2*pi*(x - 2)*x^2, x, 0, 1)', mistake: 'axis-shift-sign', why: 'x − 2 is negative on 0 ≤ x ≤ 1; the distance from x to the line x = −2 is x + 2.' },
      { latex: '\\int_0^1 2\\pi(2 - x)x^2\\,dx', expr: 'integral(2*pi*(2 - x)*x^2, x, 0, 1)', mistake: 'axis-shift-sign', why: '2 − x is the distance to the line x = 2; this integral rotates the region about x = 2.' },
      { latex: '\\int_0^1 2\\pi x\\cdot x^2\\,dx', expr: 'integral(2*pi*x*x^2, x, 0, 1)', mistake: 'axis-shift-missing', why: 'Radius x is the distance to the y-axis; the axis here is two units further left.' },
      { latex: '\\int_0^1 2\\pi(1 - x)x^2\\,dx', expr: 'integral(2*pi*(1 - x)*x^2, x, 0, 1)', mistake: 'shell-radius-wrong', why: '1 − x is the distance to the edge x = 1 of the region, not to the axis of rotation.' },
      { latex: '\\int_0^1 2\\pi(y + 2)(1 - \\sqrt{y})\\,dy', expr: 'integral(2*pi*(y + 2)*(1 - sqrt(y)), y, 0, 1)', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to x = −2; this integral rotates the region about the horizontal line y = −2.' },
      { latex: '\\int_0^1 2\\pi(x + 2)x^2\\,dx', expr: 'integral(2*pi*(x + 2)*x^2, x, 0, 1)' },
    ],
    correct: 5,
    explanation: 'Vertical slices are parallel to $x = -2$: radius $x - (-2) = x + 2$, height $x^2$, $0 \\le x \\le 1$.',
    check: { kind: 'value', expected: 'integral(pi*(9 - (sqrt(y) + 2)^2), y, 0, 1)' },
    difficulty: 1,
    tags: ['setup', 'axis-shift'],
  },
  {
    id: 'vs-f-024',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $y = \\sqrt{x}$, $y = 0$, and $x = 4$ is rotated about the line $y = -1$. Using shells, which integral gives the volume?',
    },
    options: [
      { latex: '\\int_0^2 2\\pi(y - 1)(4 - y^2)\\,dy', expr: 'integral(2*pi*(y - 1)*(4 - y^2), y, 0, 2)', mistake: 'axis-shift-sign', why: 'The distance from height y down to the line y = −1 is y − (−1) = y + 1.' },
      { latex: '\\int_0^2 2\\pi(y + 1)(4 - y^2)\\,dy', expr: 'integral(2*pi*(y + 1)*(4 - y^2), y, 0, 2)' },
      { latex: '\\int_0^2 2\\pi(1 - y)(4 - y^2)\\,dy', expr: 'integral(2*pi*(1 - y)*(4 - y^2), y, 0, 2)', mistake: 'axis-shift-sign', why: '1 − y is the distance to the line y = 1, not to y = −1.' },
      { latex: '\\int_0^2 2\\pi y(4 - y^2)\\,dy', expr: 'integral(2*pi*y*(4 - y^2), y, 0, 2)', mistake: 'axis-shift-missing', why: 'Radius y is the distance to the x-axis; the axis here is one unit lower.' },
      { latex: '\\int_0^2 2\\pi(2 - y)(4 - y^2)\\,dy', expr: 'integral(2*pi*(2 - y)*(4 - y^2), y, 0, 2)', mistake: 'shell-radius-wrong', why: '2 − y is the distance to the top of the region (y = 2), not to the axis y = −1.' },
      { latex: '\\int_0^4 2\\pi(x + 1)\\sqrt{x}\\,dx', expr: 'integral(2*pi*(x + 1)*sqrt(x), x, 0, 4)', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to y = −1; this integral rotates the region about the vertical line x = −1.' },
    ],
    correct: 1,
    explanation: 'Horizontal slices run from $x = y^2$ to $x = 4$ (height $4 - y^2$) and lie $y + 1$ above the axis $y = -1$, for $0 \\le y \\le 2$.',
    variable: 'y',
    check: { kind: 'value', expected: 'integral(pi*((sqrt(x) + 1)^2 - 1), x, 0, 4)' },
    difficulty: 1,
    tags: ['setup', 'axis-shift'],
  },
  {
    id: 'vs-f-025',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $x = 1$, $y = 3$, $y = 5$, and the curve $y = \\sqrt{x - 4} + 3$ (that is, $x = (y - 3)^2 + 4$) is rotated about the x-axis. Which single integral gives the volume?',
    },
    options: [
      { latex: '\\int_3^5 2\\pi y\\left((y - 3)^2 + 4\\right)\\,dy', expr: 'integral(2*pi*y*((y - 3)^2 + 4), y, 3, 5)', mistake: 'shell-height-wrong', why: 'That is the right endpoint only; the slice starts at x = 1, so the height is (y − 3)² + 4 − 1.' },
      { latex: '\\int_3^5 2\\pi y\\left((y + 3)^2 + 3\\right)\\,dy', expr: 'integral(2*pi*y*((y + 3)^2 + 3), y, 3, 5)', mistake: 'inverse-function-wrong', why: 'From √(x − 4) = y − 3 we get x = (y − 3)² + 4; the sign inside the square was flipped.' },
      { latex: '\\int_3^5 2\\pi y\\left((y - 3)^2 + 5\\right)\\,dy', expr: 'integral(2*pi*y*((y - 3)^2 + 5), y, 3, 5)', mistake: 'sign-error', why: 'The left boundary x = 1 was added instead of subtracted.' },
      { latex: '\\int_3^5 2\\pi y(x - 1)\\,dy', expr: 'integral(2*pi*y*(x - 1), y, 3, 5)', mistake: 'not-in-terms-of-variable', why: 'The right endpoint x was never written in terms of y; replace it by (y − 3)² + 4.' },
      { latex: '\\int_1^8 2\\pi y\\left((y - 3)^2 + 3\\right)\\,dy', expr: 'integral(2*pi*y*((y - 3)^2 + 3), y, 1, 8)', mistake: 'bounds-wrong-axis', why: '1 and 8 are x-values; the horizontal slices run from y = 3 to y = 5.' },
      { latex: '\\int_3^5 2\\pi y\\left((y - 3)^2 + 3\\right)\\,dy', expr: 'integral(2*pi*y*((y - 3)^2 + 3), y, 3, 5)' },
    ],
    correct: 5,
    explanation: 'Shells in $y$: each horizontal slice runs from $x = 1$ to $x = (y - 3)^2 + 4$, so $h = (y - 3)^2 + 3$, $r = y$, $3 \\le y \\le 5$; washers in $x$ would need a split at $x = 4$.',
    variable: 'y',
    check: { kind: 'value', expected: 'integral(pi*(25 - 9), x, 1, 4) + integral(pi*(25 - (sqrt(x - 4) + 3)^2), x, 4, 8)' },
    difficulty: 2,
    tags: ['setup', 'single-integral'],
  },
  {
    id: 'vs-f-026',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $y = e^x$, $y = 0$, $x = 1$, and $x = 2$ is rotated about the line $x = 3$. Which integral gives the volume?',
    },
    options: [
      { latex: '\\int_1^2 2\\pi(x - 3)e^{x}\\,dx', expr: 'integral(2*pi*(x - 3)*exp(x), x, 1, 2)', mistake: 'axis-shift-sign', why: 'x − 3 is negative on 1 ≤ x ≤ 2; the slice is left of x = 3, so the radius is 3 − x.' },
      { latex: '\\int_1^2 2\\pi x e^{x}\\,dx', expr: 'integral(2*pi*x*exp(x), x, 1, 2)', mistake: 'axis-shift-missing', why: 'Radius x is the distance to the y-axis; the axis here is the line x = 3.' },
      { latex: '\\int_1^2 2\\pi(3 - x)e^{x}\\,dx', expr: 'integral(2*pi*(3 - x)*exp(x), x, 1, 2)' },
      { latex: '\\int_1^2 2\\pi(x + 3)e^{x}\\,dx', expr: 'integral(2*pi*(x + 3)*exp(x), x, 1, 2)', mistake: 'axis-shift-sign', why: 'x + 3 is the distance to the line x = −3, not to x = 3.' },
      { latex: '\\int_1^2 2\\pi(2 - x)e^{x}\\,dx', expr: 'integral(2*pi*(2 - x)*exp(x), x, 1, 2)', mistake: 'shell-radius-wrong', why: '2 − x is the distance to the right edge x = 2 of the region, not to the axis x = 3.' },
      { latex: '\\int_1^2 2\\pi(x - 1)e^{x}\\,dx', expr: 'integral(2*pi*(x - 1)*exp(x), x, 1, 2)', mistake: 'shell-radius-wrong', why: 'x − 1 is the distance to the left edge x = 1 of the region, not to the axis x = 3.' },
    ],
    correct: 2,
    explanation: 'Vertical slices are parallel to $x = 3$: height $e^x$, radius $3 - x$ (the region lies left of the axis), $1 \\le x \\le 2$.',
    check: { kind: 'value', expected: 'integral(3*pi, y, 0, e) + integral(pi*((3 - log(y))^2 - 1), y, e, e^2)' },
    difficulty: 2,
    tags: ['setup', 'axis-shift'],
  },
  {
    id: 'vs-f-027',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $x = 2$, $x = 4$, $y = 1$, and the curve $x = 2 + \\sqrt{y - 3}$ (from $(2, 3)$ to $(4, 7)$) is rotated about the x-axis. Using shells, which expression gives the volume?',
    },
    options: [
      { latex: '\\int_1^7 4\\pi y\\,dy', expr: 'integral(4*pi*y, y, 1, 7)', mistake: 'volume-two-integrals-missed', why: 'Above y = 3 the slice starts at the curve, not at x = 2, so its length changes; shells need two integrals.' },
      { latex: '\\int_1^3 8\\pi y\\,dy + \\int_3^7 2\\pi y(2 - \\sqrt{y - 3})\\,dy', expr: 'integral(8*pi*y, y, 1, 3) + integral(2*pi*y*(2 - sqrt(y - 3)), y, 3, 7)', mistake: 'shell-height-wrong', why: 'For 1 ≤ y ≤ 3 the slice runs from x = 2 to x = 4, so its length is 2, not 4.' },
      { latex: '\\int_1^3 4\\pi y\\,dy + \\int_3^7 2\\pi y(2 + \\sqrt{y - 3})\\,dy', expr: 'integral(4*pi*y, y, 1, 3) + integral(2*pi*y*(2 + sqrt(y - 3)), y, 3, 7)', mistake: 'sign-error', why: '4 − (2 + √(y − 3)) = 2 − √(y − 3); the minus sign was not distributed.' },
      { latex: '\\int_1^3 4\\pi y\\,dy + \\int_3^7 2\\pi y(2 - \\sqrt{y - 3})\\,dy', expr: 'integral(4*pi*y, y, 1, 3) + integral(2*pi*y*(2 - sqrt(y - 3)), y, 3, 7)' },
      { latex: '\\int_1^3 4\\pi y\\,dy + \\int_3^7 2\\pi y\\sqrt{y - 3}\\,dy', expr: 'integral(4*pi*y, y, 1, 3) + integral(2*pi*y*sqrt(y - 3), y, 3, 7)', mistake: 'shell-height-wrong', why: '√(y − 3) measures from x = 2 to the curve, which is outside the region; the slice runs from the curve to x = 4.' },
      { latex: '\\int_1^3 2\\pi y\\,dy + \\int_3^7 \\pi y(2 - \\sqrt{y - 3})\\,dy', expr: 'integral(2*pi*y, y, 1, 3) + integral(pi*y*(2 - sqrt(y - 3)), y, 3, 7)', mistake: 'two-pi-missing', why: 'The shell integrand is 2π·r·h; with π alone every shell is counted at half its volume.' },
    ],
    correct: 3,
    explanation: 'For $1 \\le y \\le 3$ the slice runs from $x = 2$ to $x = 4$ ($h = 2$); for $3 \\le y \\le 7$ from the curve to $x = 4$ ($h = 2 - \\sqrt{y - 3}$); $r = y$ throughout.',
    variable: 'y',
    check: { kind: 'value', expected: 'integral(pi*(((x - 2)^2 + 3)^2 - 1), x, 2, 4)' },
    difficulty: 2,
    tags: ['setup', 'two-integrals'],
  },
  {
    id: 'vs-f-028',
    topic: 'volumes-shells',
    kind: 'concept',
    prompt: {
      text: 'The region bounded by $y = 2x^2 - x^3$ and the x-axis ($0 \\le x \\le 2$) is rotated about the y-axis. Which integral gives the volume?',
    },
    options: [
      { latex: '\\int_0^2 2\\pi x^2(2x^2 - x^3)\\,dx', expr: 'integral(2*pi*x^2*(2*x^2 - x^3), x, 0, 2)', mistake: 'shell-radius-squared', why: 'The radius x is not squared in 2πrh; squaring belongs to the disk formula.' },
      { latex: '\\int_0^2 \\pi(2x^2 - x^3)^2\\,dx', expr: 'integral(pi*(2*x^2 - x^3)^2, x, 0, 2)', mistake: 'method-formula-swapped', why: 'This is the disk formula for a vertical slice, which is parallel to the y-axis; it gives the x-axis solid instead.' },
      { latex: '\\int_0^2 \\pi x(2x^2 - x^3)\\,dx', expr: 'integral(pi*x*(2*x^2 - x^3), x, 0, 2)', mistake: 'two-pi-missing', why: 'The shell integrand is 2π·r·h; with π alone the volume is halved.' },
      { latex: '\\int_0^2 2\\pi x(x^3 - 2x^2)\\,dx', expr: 'integral(2*pi*x*(x^3 - 2*x^2), x, 0, 2)', mistake: 'top-bottom-swapped', why: 'The curve lies above the x-axis on [0, 2], so the height is (2x² − x³) − 0.' },
      { latex: '\\int_0^2 2\\pi x(2x^2 - x^3)\\,dx', expr: 'integral(2*pi*x*(2*x^2 - x^3), x, 0, 2)' },
      { latex: '\\int_0^2 2\\pi(2x^2 - x^3)^2\\,dx', expr: 'integral(2*pi*(2*x^2 - x^3)^2, x, 0, 2)', mistake: 'shell-radius-wrong', why: 'The height was used as the radius too; the radius is the distance x to the y-axis.' },
    ],
    correct: 4,
    explanation: 'Vertical slices are parallel to the y-axis: $r = x$, $h = 2x^2 - x^3$, $0 \\le x \\le 2$ — no need to solve the cubic for $x$.',
    check: { kind: 'value', expected: '16*pi/5' },
    difficulty: 1,
    tags: ['setup'],
  },

  // ───────────── method selection ─────────────
  {
    id: 'vs-f-029',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region bounded by $y = e^x$, $y = 0$, $x = 1$, and $x = 2$ is rotated about the y-axis. Which setup works without changing the independent variable (keeping $y = e^x$ as given)?',
    },
    options: [
      { text: 'Disks: vertical slices, integrate in $x$ from 1 to 2', mistake: 'method-formula-swapped', why: 'Vertical slices are parallel to the y-axis, so they sweep out shells, not disks.' },
      { text: 'Shells: vertical slices, integrate in $x$ from 1 to 2' },
      { text: 'Washers: horizontal slices, integrate in $y$ from 0 to $e^2$', mistake: 'method-choice-poor', why: 'Horizontal slices need x = ln y (a change of variable) and a split at y = e.' },
      { text: 'Shells: horizontal slices, integrate in $y$ from 0 to $e^2$', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to the y-axis; shells come from slices parallel to the axis.' },
      { text: 'Shells: vertical slices, integrate in $x$ from $e$ to $e^2$', mistake: 'bounds-wrong-axis', why: 'e and e² are y-values of the curve; the region spans 1 ≤ x ≤ 2.' },
    ],
    correct: 1,
    explanation: 'About the y-axis, vertical slices are parallel to the axis: shells with $r = x$, $h = e^x$, $1 \\le x \\le 2$ — no inverse needed.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 1,
    tags: ['method-selection'],
  },
  {
    id: 'vs-f-030',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region bounded by $y = e^x$, $y = 0$, $x = 1$, and $x = 2$ is rotated about the x-axis. Which setup works without changing the independent variable (keeping $y = e^x$ as given)?',
    },
    options: [
      { text: 'Shells: vertical slices, integrate in $x$ from 1 to 2', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to the x-axis; they sweep out disks, not shells.' },
      { text: 'Shells: horizontal slices, integrate in $y$ from 0 to $e^2$', mistake: 'method-choice-poor', why: 'Correct orientation, but it needs x = ln y and a split at y = e, so the variable changes.' },
      { text: 'Washers: horizontal slices, integrate in $y$ from 0 to $e^2$', mistake: 'method-formula-swapped', why: 'Horizontal slices are parallel to the x-axis; washers need slices perpendicular to it.' },
      { text: 'Disks: vertical slices, integrate in $x$ from $e$ to $e^2$', mistake: 'bounds-wrong-axis', why: 'e and e² are y-values of the curve; the region spans 1 ≤ x ≤ 2.' },
      { text: 'Disks: vertical slices, integrate in $x$ from 1 to 2' },
    ],
    correct: 4,
    explanation: 'Vertical slices are perpendicular to the x-axis: disks of radius $e^x$ for $1 \\le x \\le 2$, so $V = \\pi\\int_1^2 e^{2x}\\,dx$ stays in $x$.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 1,
    tags: ['method-selection'],
  },
  {
    id: 'vs-f-031',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region bounded by $y = x^3$, $y = 8$, and $x = 0$ is revolved about the line $x = -2$. If the washer method is used, which setup is correct?',
    },
    options: [
      { text: 'Vertical slices; integrate in $x$ over $[0, 2]$', mistake: 'method-formula-swapped', why: 'Vertical slices are parallel to x = −2, so they generate shells, not washers.' },
      { text: 'Horizontal slices; integrate in $y$ over $[0, 2]$', mistake: 'bounds-wrong-axis', why: '[0, 2] is the x-range; the region spans 0 ≤ y ≤ 8.' },
      { text: 'Horizontal slices; integrate in $x$ over $[0, 2]$', mistake: 'wrong-integration-variable', why: 'A horizontal slice has thickness dy, so washers are stacked along y.' },
      { text: 'Horizontal slices; integrate in $y$ over $[0, 8]$' },
      { text: 'Vertical slices; integrate in $y$ over $[0, 8]$', mistake: 'wrong-integration-variable', why: 'A vertical slice has thickness dx, and washers about a vertical axis need horizontal slices.' },
    ],
    correct: 3,
    explanation: 'Washers need slices perpendicular to the vertical axis $x = -2$: horizontal slices, $dy$, $0 \\le y \\le 8$ (one integral: $R = \\sqrt[3]{y} + 2$, $r = 2$).',
    check: { kind: 'none', reason: 'method setup; options are setups (text)' },
    difficulty: 1,
    tags: ['method-selection', 'orientation'],
  },
  {
    id: 'vs-f-032',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region bounded by $y = x^3$, $y = 8$, and $x = 0$ is revolved about the line $x = -2$. If the shell method is used, which setup is correct?',
    },
    options: [
      { text: 'Horizontal slices; integrate in $y$ over $[0, 8]$', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to x = −2; that is the washer setup.' },
      { text: 'Vertical slices; integrate in $x$ over $[0, 8]$', mistake: 'bounds-wrong-axis', why: '8 is the top y-value; the region spans 0 ≤ x ≤ 2.' },
      { text: 'Vertical slices; integrate in $x$ over $[0, 2]$' },
      { text: 'Vertical slices; integrate in $y$ over $[0, 8]$', mistake: 'wrong-integration-variable', why: 'Vertical slices have thickness dx, so shells about a vertical axis are integrated in x.' },
      { text: 'Horizontal slices; integrate in $x$ over $[0, 2]$', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to x = −2 (and have thickness dy); shell slices must be vertical here.' },
    ],
    correct: 2,
    explanation: 'Shells need slices parallel to $x = -2$: vertical slices, $dx$, $0 \\le x \\le 2$ (radius $x + 2$, height $8 - x^3$).',
    check: { kind: 'none', reason: 'method setup; options are setups (text)' },
    difficulty: 1,
    tags: ['method-selection', 'orientation'],
  },
  {
    id: 'vs-f-033',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region bounded by $x = 2$, $x = 4$, $y = 1$, and the curve $x = 2 + \\sqrt{y - 3}$ (from $(2, 3)$ to $(4, 7)$) is rotated about the y-axis. Which setup gives the volume as a single integral?',
    },
    options: [
      { text: 'Washers: horizontal slices, $y$ from 1 to 7', mistake: 'volume-two-integrals-missed', why: 'The inner radius is 2 for 1 ≤ y ≤ 3 but 2 + √(y − 3) for 3 ≤ y ≤ 7, so washers need two integrals.' },
      { text: 'Washers: vertical slices, $x$ from 2 to 4', mistake: 'method-formula-swapped', why: 'Vertical slices are parallel to the y-axis, so they generate shells, not washers.' },
      { text: 'Shells: horizontal slices, $y$ from 1 to 7', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to the y-axis; shell slices must be parallel to it.' },
      { text: 'Shells: vertical slices, $x$ from 1 to 7', mistake: 'bounds-wrong-axis', why: '1 and 7 are the lowest and highest y-values; the region spans 2 ≤ x ≤ 4.' },
      { text: 'Shells: vertical slices, $x$ from 2 to 4' },
    ],
    correct: 4,
    explanation: 'Every vertical slice runs from $y = 1$ up to $y = (x-2)^2 + 3$, so shells give one integral $\\int_2^4 2\\pi x\\left((x-2)^2 + 2\\right)dx$.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 2,
    tags: ['method-selection', 'single-integral'],
  },
  {
    id: 'vs-f-034',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region bounded by $x = 2$, $x = 4$, $y = 1$, and the curve $x = 2 + \\sqrt{y - 3}$ (from $(2, 3)$ to $(4, 7)$) is rotated about the x-axis. Which setup gives the volume as a single integral?',
    },
    options: [
      { text: 'Shells: horizontal slices, $y$ from 1 to 7', mistake: 'volume-two-integrals-missed', why: 'Horizontal slices start at x = 2 for y ≤ 3 but at the curve for y ≥ 3, so shells need two integrals.' },
      { text: 'Washers: vertical slices, $x$ from 2 to 4' },
      { text: 'Shells: vertical slices, $x$ from 2 to 4', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to the x-axis; they sweep out washers, not shells.' },
      { text: 'Washers: horizontal slices, $y$ from 1 to 7', mistake: 'method-formula-swapped', why: 'Horizontal slices are parallel to the x-axis, so they generate shells, not washers.' },
      { text: 'Disks: vertical slices, $x$ from 2 to 4', mistake: 'washer-as-disk', why: 'The region sits above y = 1, leaving a hole of radius 1 around the axis: washers, not disks.' },
    ],
    correct: 1,
    explanation: 'Vertical slices run from $y = 1$ to $y = (x-2)^2 + 3$ for every $2 \\le x \\le 4$: washers with $R = (x-2)^2 + 3$, $r = 1$ in one integral.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 2,
    tags: ['method-selection', 'single-integral'],
  },
  {
    id: 'vs-f-035',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region bounded by $y = 2x^2 - x^3$ and $y = 0$ ($0 \\le x \\le 2$) is rotated about the y-axis. Which setup avoids solving $y = 2x^2 - x^3$ for $x$?',
    },
    options: [
      { text: 'Washers: horizontal slices, integrate in $y$', mistake: 'method-choice-poor', why: 'Horizontal slices need both x-solutions of the cubic 2x² − x³ = y, which have no convenient formula.' },
      { text: 'Disks: vertical slices, integrate in $x$', mistake: 'method-formula-swapped', why: 'Vertical slices are parallel to the y-axis; they sweep out shells, and π(2x² − x³)² would give the x-axis solid.' },
      { text: 'Shells: horizontal slices, integrate in $y$', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to the y-axis; shell slices must be parallel to it.' },
      { text: 'Disks: horizontal slices, integrate in $y$', mistake: 'washer-as-disk', why: 'Each horizontal slice starts at the left branch of the curve, not at the axis (a washer), and it still requires solving the cubic.' },
      { text: 'Shells: vertical slices, integrate in $x$' },
    ],
    correct: 4,
    explanation: 'Vertical slices are parallel to the y-axis: shells with $r = x$ and $h = 2x^2 - x^3$ use the curve exactly as given.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 2,
    tags: ['method-selection', 'inverse'],
  },
  {
    id: 'vs-f-036',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region bounded by $x = 2y - y^2$ and the y-axis is rotated about the x-axis. Which setup is the most efficient?',
    },
    options: [
      { text: 'Shells: horizontal slices, integrate in $y$ from 0 to 2' },
      { text: 'Washers: vertical slices, integrate in $x$ from 0 to 1', mistake: 'method-choice-poor', why: 'Vertical slices need y = 1 ± √(1 − x), i.e. solving the parabola for y; shells use x = 2y − y² directly.' },
      { text: 'Shells: vertical slices, integrate in $x$ from 0 to 1', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to the x-axis; shell slices must be parallel to it.' },
      { text: 'Disks: horizontal slices, integrate in $y$ from 0 to 2', mistake: 'method-formula-swapped', why: 'Horizontal slices are parallel to the x-axis; disks come from perpendicular slices.' },
      { text: 'Shells: horizontal slices, integrate in $y$ from 0 to 1', mistake: 'bounds-wrong-axis', why: '1 is the largest x-value (at y = 1); the region spans 0 ≤ y ≤ 2.' },
    ],
    correct: 0,
    explanation: 'Horizontal slices are parallel to the x-axis and run from $x = 0$ to $x = 2y - y^2$: shells with $r = y$, $h = 2y - y^2$, $0 \\le y \\le 2$, no inverse needed.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 2,
    tags: ['method-selection', 'inverse'],
  },
  {
    id: 'vs-f-037',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region bounded by $x = 2y - y^2$ and the y-axis is rotated about the y-axis. Which setup is the most efficient?',
    },
    options: [
      { text: 'Shells: horizontal slices, integrate in $y$ from 0 to 2', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to the y-axis; they sweep out disks, not shells.' },
      { text: 'Shells: vertical slices, integrate in $x$ from 0 to 1', mistake: 'method-choice-poor', why: 'Valid, but the height 2√(1 − x) requires solving x = 2y − y² for y.' },
      { text: 'Disks: horizontal slices, integrate in $y$ from 0 to 2' },
      { text: 'Washers: vertical slices, integrate in $x$ from 0 to 1', mistake: 'method-formula-swapped', why: 'Vertical slices are parallel to the y-axis; washers need slices perpendicular to the axis.' },
      { text: 'Disks: horizontal slices, integrate in $y$ from 0 to 1', mistake: 'bounds-wrong-axis', why: '1 is the largest x-value; the region spans 0 ≤ y ≤ 2.' },
    ],
    correct: 2,
    explanation: 'Horizontal slices are perpendicular to the y-axis and run from the axis to $x = 2y - y^2$: disks of radius $2y - y^2$, $0 \\le y \\le 2$.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 2,
    tags: ['method-selection'],
  },
  {
    id: 'vs-f-038',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region between $y = \\sqrt{x} + 1$ and $y = x^2 + 1$ is rotated about the x-axis. Which setup avoids solving the curves for $x$?',
    },
    options: [
      { text: 'Shells: horizontal slices, integrate in $y$ from 1 to 2', mistake: 'method-choice-poor', why: 'Horizontal slices need x = (y − 1)² and x = √(y − 1), both curves solved for x.' },
      { text: 'Shells: vertical slices, integrate in $x$ from 0 to 1', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to the x-axis; they sweep out washers, not shells.' },
      { text: 'Disks: vertical slices, integrate in $x$ from 0 to 1', mistake: 'washer-as-disk', why: 'The region lies above y = x² + 1 ≥ 1, so each slice leaves a hole around the axis.' },
      { text: 'Washers: vertical slices, integrate in $x$ from 0 to 1' },
      { text: 'Washers: vertical slices, integrate in $x$ from 1 to 2', mistake: 'bounds-wrong-axis', why: '1 and 2 are the y-values at the intersections; x runs from 0 to 1.' },
    ],
    correct: 3,
    explanation: 'Vertical slices are perpendicular to the x-axis: washers with $R = \\sqrt{x} + 1$, $r = x^2 + 1$, $0 \\le x \\le 1$; both curves are already functions of $x$.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 1,
    tags: ['method-selection', 'inverse'],
  },
  {
    id: 'vs-f-039',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The region between $y = \\sqrt{x} + 1$ and $y = x^2 + 1$ is rotated about the y-axis. Which setup avoids solving the curves for $x$?',
    },
    options: [
      { text: 'Washers: vertical slices, integrate in $x$ from 0 to 1', mistake: 'method-formula-swapped', why: 'Vertical slices are parallel to the y-axis, so they generate shells, not washers.' },
      { text: 'Shells: vertical slices, integrate in $x$ from 0 to 1' },
      { text: 'Shells: horizontal slices, integrate in $y$ from 1 to 2', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to the y-axis; shell slices must be parallel to it.' },
      { text: 'Washers: horizontal slices, integrate in $y$ from 1 to 2', mistake: 'method-choice-poor', why: 'Valid, but the radii (y − 1)² and √(y − 1) require solving both curves for x.' },
      { text: 'Shells: vertical slices, integrate in $x$ from 1 to 2', mistake: 'bounds-wrong-axis', why: '1 and 2 are y-values; the region spans 0 ≤ x ≤ 1.' },
    ],
    correct: 1,
    explanation: 'Vertical slices are parallel to the y-axis: shells with $r = x$ and $h = (\\sqrt{x} + 1) - (x^2 + 1) = \\sqrt{x} - x^2$, $0 \\le x \\le 1$.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 1,
    tags: ['method-selection', 'inverse'],
  },
  {
    id: 'vs-f-040',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The triangle bounded by $y = x$, $y = 2 - x$, and the x-axis is rotated about the y-axis. Which setup needs only one integral?',
    },
    options: [
      { text: 'Shells: vertical slices, integrate in $x$ from 0 to 2', mistake: 'volume-two-integrals-missed', why: 'The top of a vertical slice is y = x for x ≤ 1 but y = 2 − x for x ≥ 1, so shells need two integrals.' },
      { text: 'Shells: horizontal slices, integrate in $y$ from 0 to 1', mistake: 'shell-orientation-wrong', why: 'Horizontal slices are perpendicular to the y-axis; shell slices must be parallel to it.' },
      { text: 'Disks: horizontal slices, integrate in $y$ from 0 to 1', mistake: 'washer-as-disk', why: 'Each horizontal slice starts at x = y, not at the axis, so there is a hole: washers, not disks.' },
      { text: 'Washers: horizontal slices, integrate in $y$ from 0 to 2', mistake: 'bounds-wrong-axis', why: 'The triangle is 1 unit tall (apex (1, 1)); 2 is its width along x.' },
      { text: 'Washers: horizontal slices, integrate in $y$ from 0 to 1' },
    ],
    correct: 4,
    explanation: 'Each horizontal slice runs from $x = y$ to $x = 2 - y$: washers with $R = 2 - y$, $r = y$ for $0 \\le y \\le 1$ in one integral.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 2,
    tags: ['method-selection', 'single-integral'],
  },
  {
    id: 'vs-f-041',
    topic: 'volumes-shells',
    kind: 'technique',
    prompt: {
      text: 'The triangle bounded by $y = x$, $y = 2 - x$, and the x-axis is rotated about the x-axis. Which setup needs only one integral?',
    },
    options: [
      { text: 'Disks: vertical slices, integrate in $x$ from 0 to 2', mistake: 'volume-two-integrals-missed', why: 'The disk radius is x for x ≤ 1 but 2 − x for x ≥ 1, so disks need two integrals.' },
      { text: 'Shells: horizontal slices, integrate in $y$ from 0 to 1' },
      { text: 'Shells: vertical slices, integrate in $x$ from 0 to 2', mistake: 'shell-orientation-wrong', why: 'Vertical slices are perpendicular to the x-axis; they sweep out disks, not shells.' },
      { text: 'Washers: horizontal slices, integrate in $y$ from 0 to 1', mistake: 'method-formula-swapped', why: 'Horizontal slices are parallel to the x-axis, so they generate shells, not washers.' },
      { text: 'Shells: horizontal slices, integrate in $y$ from 0 to 2', mistake: 'bounds-wrong-axis', why: 'The triangle is 1 unit tall (apex (1, 1)); 2 is its width along x.' },
    ],
    correct: 1,
    explanation: 'Horizontal slices run from $x = y$ to $x = 2 - y$: shells with $r = y$, $h = 2 - 2y$, $0 \\le y \\le 1$ in one integral.',
    check: { kind: 'none', reason: 'method selection; options are setups (text)' },
    difficulty: 2,
    tags: ['method-selection', 'single-integral'],
  },

  // ───────────── evaluating shell integrals ─────────────
  {
    id: 'vs-f-042',
    topic: 'volumes-shells',
    kind: 'evaluate',
    prompt: { latex: '\\int_0^2 2\\pi x\\cdot x^2\\,dx' },
    options: [
      { latex: '32\\pi', expr: '32*pi', mistake: 'power-rule-int-coefficient', why: '∫x³ dx = x⁴/4; without dividing by 4 the result is 2π·16 = 32π.' },
      { latex: '8\\pi', expr: '8*pi' },
      { latex: '\\frac{32\\pi}{3}', expr: '32*pi/3', mistake: 'power-rule-int-coefficient', why: 'x⁴ was divided by 3 (the old exponent) instead of by 4.' },
      { latex: '24\\pi', expr: '24*pi', mistake: 'differentiated-instead', why: 'x³ was differentiated to 3x² (12 at x = 2) instead of integrated.' },
      { latex: '4\\pi', expr: '4*pi', mistake: 'coefficient-mishandled', why: 'The factor 2 of 2π was lost: π·[x⁴/4] from 0 to 2 is 4π.' },
      { latex: '\\frac{16\\pi}{3}', expr: '16*pi/3', mistake: 'power-rule-int-exponent', why: 'x³ was integrated as x³/3 without raising the exponent: 2π·8/3.' },
    ],
    correct: 1,
    explanation: '$2\\pi\\int_0^2 x^3\\,dx = 2\\pi\\left[\\frac{x^4}{4}\\right]_0^2 = 2\\pi\\cdot 4 = 8\\pi$.',
    check: { kind: 'definite-integral', integrand: '2*pi*x*x^2', lower: '0', upper: '2' },
    difficulty: 1,
    tags: ['evaluate'],
  },
  {
    id: 'vs-f-043',
    topic: 'volumes-shells',
    kind: 'evaluate',
    prompt: { latex: '\\int_0^1 2\\pi y(2 - 2y)\\,dy' },
    options: [
      { latex: '\\frac{8\\pi}{3}', expr: '8*pi/3', mistake: 'power-rule-int-coefficient', why: '∫2y dy = y²; writing 2y² gives 2π(2 − 2/3).' },
      { latex: '-2\\pi', expr: '-2*pi', mistake: 'power-rule-int-coefficient', why: '∫2y² dy = (2/3)y³; writing 2y³ gives 2π(1 − 2).' },
      { latex: '\\pi', expr: 'pi', mistake: 'product-rule-integral', why: 'The factors were integrated separately and multiplied: 2π·(1/2)·1; there is no product rule for integrals.' },
      { latex: '\\frac{\\pi}{3}', expr: 'pi/3', mistake: 'coefficient-mishandled', why: 'The factor 2 of 2π was lost: π·(1 − 2/3).' },
      { latex: '\\frac{2\\pi}{3}', expr: '2*pi/3' },
      { latex: '\\frac{10\\pi}{3}', expr: '10*pi/3', mistake: 'sign-error', why: 'y(2 − 2y) was expanded as 2y + 2y², giving 2π(1 + 2/3).' },
    ],
    correct: 4,
    explanation: '$2\\pi\\int_0^1 (2y - 2y^2)\\,dy = 2\\pi\\left[y^2 - \\frac{2}{3}y^3\\right]_0^1 = 2\\pi\\cdot\\frac{1}{3} = \\frac{2\\pi}{3}$.',
    variable: 'y',
    check: { kind: 'definite-integral', integrand: '2*pi*y*(2 - 2*y)', lower: '0', upper: '1' },
    difficulty: 1,
    tags: ['evaluate'],
  },
  {
    id: 'vs-f-044',
    topic: 'volumes-shells',
    kind: 'evaluate',
    prompt: { latex: '\\int_0^{\\sqrt{\\pi}} 2\\pi x\\sin(x^2)\\,dx' },
    options: [
      { latex: '4\\pi', expr: '4*pi', mistake: 'du-constant-wrong', why: 'With u = x², du = 2x dx, so 2πx dx = π du; keeping 2π doubles the answer.' },
      { latex: '0', expr: '0', mistake: 'trig-antiderivative-swapped', why: 'sin u was used as its own antiderivative: π[sin u] from 0 to π is 0.' },
      { latex: '-2\\pi', expr: '-2*pi', mistake: 'trig-antiderivative-sign', why: '∫sin u du = −cos u; using +cos u flips the sign.' },
      { latex: '\\pi', expr: 'pi', mistake: 'ftc-not-subtracted', why: 'Only the upper limit was used: π(−cos π) = π; the value −π cos 0 = −π at the lower limit must be subtracted.' },
      { latex: '\\pi\\left(1 - \\cos(\\sqrt{\\pi})\\right)', expr: 'pi*(1 - cos(sqrt(pi)))', mistake: 'bounds-not-converted', why: 'The x-limit √π was kept; with u = x² the upper limit becomes u = π.' },
      { latex: '2\\pi', expr: '2*pi' },
    ],
    correct: 5,
    explanation: 'Let $u = x^2$, $du = 2x\\,dx$: $\\pi\\int_0^{\\pi} \\sin u\\,du = \\pi\\left[-\\cos u\\right]_0^{\\pi} = 2\\pi$.',
    check: { kind: 'definite-integral', integrand: '2*pi*x*sin(x^2)', lower: '0', upper: 'sqrt(pi)' },
    difficulty: 2,
    tags: ['evaluate', 'u-sub'],
  },
  {
    id: 'vs-f-045',
    topic: 'volumes-shells',
    kind: 'evaluate',
    prompt: { latex: '\\int_0^1 \\frac{2\\pi x}{1 + x^2}\\,dx' },
    options: [
      { latex: '2\\pi\\ln 2', expr: '2*pi*log(2)', mistake: 'du-constant-wrong', why: 'With u = 1 + x², du = 2x dx, so 2πx dx = π du; keeping 2π doubles the answer.' },
      { latex: '\\pi\\ln 2', expr: 'pi*log(2)' },
      { latex: '\\frac{\\pi}{2}\\ln 2', expr: 'pi/2*log(2)', mistake: 'du-constant-wrong', why: 'The factor 2 from du = 2x dx was compensated twice.' },
      { latex: '\\pi\\ln\\left(\\frac{5}{2}\\right)', expr: 'pi*log(5/2)', mistake: 'mixed-limits-variable', why: 'The u-limits 1 and 2 were plugged into ln(1 + x²), an expression in x.' },
      { latex: '\\frac{\\pi^2}{4}', expr: 'pi^2/4', mistake: 'product-rule-integral', why: '2πx and 1/(1 + x²) were integrated separately and multiplied: π·(π/4).' },
    ],
    correct: 1,
    explanation: 'Let $u = 1 + x^2$, $du = 2x\\,dx$: $\\pi\\int_1^2 \\frac{du}{u} = \\pi\\ln 2$.',
    check: { kind: 'definite-integral', integrand: '2*pi*x/(1 + x^2)', lower: '0', upper: '1' },
    difficulty: 2,
    tags: ['evaluate', 'u-sub'],
  },
  {
    id: 'vs-f-046',
    topic: 'volumes-shells',
    kind: 'evaluate',
    prompt: { latex: '\\int_0^1 2\\pi x(x - x^2)\\,dx' },
    options: [
      { latex: '\\frac{\\pi}{3}', expr: 'pi/3', mistake: 'power-rule-int-coefficient', why: 'x³ and x⁴ were divided by the old exponents 2 and 3: 2π(1/2 − 1/3).' },
      { latex: '0', expr: '0', mistake: 'power-rule-int-coefficient', why: 'The powers were raised without dividing: 2π[x³ − x⁴] from 0 to 1 is 0.' },
      { latex: '\\frac{\\pi}{6}', expr: 'pi/6' },
      { latex: '\\frac{7\\pi}{6}', expr: '7*pi/6', mistake: 'sign-error', why: 'The minus sign was lost: 2π(1/3 + 1/4).' },
      { latex: '\\frac{\\pi}{12}', expr: 'pi/12', mistake: 'coefficient-mishandled', why: 'The factor 2 of 2π was lost: π(1/3 − 1/4).' },
      { latex: '-\\frac{\\pi}{6}', expr: '-pi/6', mistake: 'ftc-order-swapped', why: 'F(0) − F(1) was computed instead of F(1) − F(0).' },
    ],
    correct: 2,
    explanation: '$2\\pi\\int_0^1 (x^2 - x^3)\\,dx = 2\\pi\\left(\\frac{1}{3} - \\frac{1}{4}\\right) = \\frac{\\pi}{6}$.',
    check: { kind: 'definite-integral', integrand: '2*pi*x*(x - x^2)', lower: '0', upper: '1' },
    difficulty: 1,
    tags: ['evaluate'],
  },
  {
    id: 'vs-f-047',
    topic: 'volumes-shells',
    kind: 'evaluate',
    prompt: { latex: '\\int_0^2 2\\pi(x + 1)(2x - x^2)\\,dx' },
    options: [
      { latex: '16\\pi', expr: '16*pi', mistake: 'algebra-error', why: 'In the expansion the term 1·(−x²) was written +x², giving ∫(3x² − x³ + 2x) dx = 8.' },
      { latex: '\\frac{32\\pi}{3}', expr: '32*pi/3', mistake: 'product-rule-integral', why: 'The factors were integrated separately and multiplied: 2π·4·(4/3); there is no product rule for integrals.' },
      { latex: '\\frac{64\\pi}{3}', expr: '64*pi/3', mistake: 'sign-error', why: 'The −x³ term became +x³: ∫(x² + x³ + 2x) dx = 32/3.' },
      { latex: '\\frac{40\\pi}{3}', expr: '40*pi/3', mistake: 'power-rule-int-coefficient', why: 'Each power was divided by its old exponent: x³/2 − x⁴/3 + 2x² at 2 gives 20/3.' },
      { latex: '\\frac{8\\pi}{3}', expr: '8*pi/3', mistake: 'coefficient-mishandled', why: 'The factor 2 of 2π was lost: π·(8/3).' },
      { latex: '\\frac{16\\pi}{3}', expr: '16*pi/3' },
    ],
    correct: 5,
    explanation: '$(x+1)(2x - x^2) = x^2 - x^3 + 2x$, and $\\int_0^2 (x^2 - x^3 + 2x)\\,dx = \\frac{8}{3} - 4 + 4 = \\frac{8}{3}$; times $2\\pi$ gives $\\frac{16\\pi}{3}$.',
    check: { kind: 'definite-integral', integrand: '2*pi*(x + 1)*(2*x - x^2)', lower: '0', upper: '2' },
    difficulty: 1,
    tags: ['evaluate'],
  },
  {
    id: 'vs-f-048',
    topic: 'volumes-shells',
    kind: 'evaluate',
    prompt: { latex: '\\int_1^2 2\\pi x e^{x^2}\\,dx' },
    options: [
      { latex: '2\\pi(e^4 - e)', expr: '2*pi*(e^4 - e)', mistake: 'du-constant-wrong', why: 'With u = x², du = 2x dx, so 2πx dx = π du; keeping 2π doubles the answer.' },
      { latex: '\\pi(e^2 - e)', expr: 'pi*(e^2 - e)', mistake: 'bounds-not-converted', why: 'The x-limits 1 and 2 were kept; with u = x² they become 1 and 4.' },
      { latex: '\\pi e^4', expr: 'pi*e^4', mistake: 'ftc-not-subtracted', why: 'Only the upper limit was used; F(1) = πe must be subtracted.' },
      { latex: '\\pi(e^4 - e)', expr: 'pi*(e^4 - e)' },
      { latex: '\\pi(e - e^4)', expr: 'pi*(e - e^4)', mistake: 'ftc-order-swapped', why: 'F(1) − F(2) was computed instead of F(2) − F(1).' },
      { latex: '\\frac{\\pi}{2}(e^4 - e)', expr: 'pi/2*(e^4 - e)', mistake: 'du-constant-wrong', why: 'The factor 2 from du = 2x dx was compensated twice.' },
    ],
    correct: 3,
    explanation: 'Let $u = x^2$, $du = 2x\\,dx$: $\\pi\\int_1^4 e^u\\,du = \\pi(e^4 - e)$.',
    check: { kind: 'definite-integral', integrand: '2*pi*x*exp(x^2)', lower: '1', upper: '2' },
    difficulty: 2,
    tags: ['evaluate', 'u-sub'],
  },
];

// ───────────── generator: shell radius about a shifted vertical axis ─────────────
/** Deterministic PRNG (mulberry32), as in content/examples/sample.ts. */
function mulberry(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Curves that are ≥ 0 on [0, b] for every b used below, so the height is f(x) − 0. */
const AXIS_CURVES: { latex: string; expr: string }[] = [
  { latex: 'x^2', expr: 'x^2' },
  { latex: 'x^3', expr: 'x^3' },
  { latex: '\\sqrt{x}', expr: 'sqrt(x)' },
  { latex: 'e^{x}', expr: 'exp(x)' },
  { latex: 'x^2 + 1', expr: 'x^2 + 1' },
];

/** Parameterized generators. */
export const generators: FlashGenerator[] = [
  {
    id: 'vs-g-axis-radius',
    topic: 'volumes-shells',
    kind: 'concept',
    describe:
      'Radius and height of the shell for the region under y = f(x), 0 ≤ x ≤ b (b = 1..3), rotated about a vertical line x = −k left of the region or x = m right of it',
    generate(seed: number): FlashItem {
      const rng = mulberry(seed);
      const curve = AXIS_CURVES[Math.floor(rng() * AXIS_CURVES.length)];
      const f = curve.latex;
      const b = 1 + Math.floor(rng() * 3); // 1..3
      const left = rng() < 0.5;
      type Opt = FlashItem['options'][number];
      let axis: string;
      let correctOpt: Opt;
      let distractors: Opt[];
      let expected: string;
      let explanation: string;
      if (left) {
        let k = 1 + Math.floor(rng() * 5); // 1..5, k ≠ b so that "k − x" and "b − x" differ
        if (k === b) k = b + 1;
        axis = `-${k}`;
        expected = `[x + ${k}, ${curve.expr}]`;
        correctOpt = { latex: `r = x + ${k},\\quad h = ${f}`, expr: expected };
        distractors = [
          { latex: `r = x - ${k},\\quad h = ${f}`, expr: `[x - ${k}, ${curve.expr}]`, mistake: 'axis-shift-sign', why: `The distance from x to the line x = −${k} is x − (−${k}) = x + ${k}, not x − ${k}.` },
          { latex: `r = x,\\quad h = ${f}`, expr: `[x, ${curve.expr}]`, mistake: 'axis-shift-missing', why: `x is the distance to the y-axis; the axis of rotation is the line x = −${k}.` },
          { latex: `r = ${k} - x,\\quad h = ${f}`, expr: `[${k} - x, ${curve.expr}]`, mistake: 'axis-shift-sign', why: `${k} − x measures to the line x = ${k}, not to x = −${k}.` },
          { latex: `r = ${b} - x,\\quad h = ${f}`, expr: `[${b} - x, ${curve.expr}]`, mistake: 'shell-radius-wrong', why: `${b} − x is the distance to the edge x = ${b} of the region; the radius is measured to the axis x = −${k}.` },
          { latex: `r = ${f},\\quad h = x + ${k}`, expr: `[${curve.expr}, x + ${k}]`, mistake: 'shell-radius-wrong', why: `Radius and height are swapped: the slice has length $${f}$ and sits $x + ${k}$ from the axis.` },
        ];
        explanation = `The slice at $x$ runs from $y = 0$ up to $y = ${f}$, and its distance to the axis $x = -${k}$ is $x - (-${k}) = x + ${k}$.`;
      } else {
        const m = b + 1 + Math.floor(rng() * 3); // b+1..b+3, right of the region
        axis = `${m}`;
        expected = `[${m} - x, ${curve.expr}]`;
        correctOpt = { latex: `r = ${m} - x,\\quad h = ${f}`, expr: expected };
        distractors = [
          { latex: `r = x - ${m},\\quad h = ${f}`, expr: `[x - ${m}, ${curve.expr}]`, mistake: 'axis-shift-sign', why: `For 0 ≤ x ≤ ${b} this is negative; the slice lies left of x = ${m}, so its distance to the axis is ${m} − x.` },
          { latex: `r = x,\\quad h = ${f}`, expr: `[x, ${curve.expr}]`, mistake: 'axis-shift-missing', why: `x is the distance to the y-axis; the axis of rotation is the line x = ${m}.` },
          { latex: `r = x + ${m},\\quad h = ${f}`, expr: `[x + ${m}, ${curve.expr}]`, mistake: 'axis-shift-sign', why: `x + ${m} is the distance to the line x = −${m}, not to x = ${m}.` },
          { latex: `r = ${b} - x,\\quad h = ${f}`, expr: `[${b} - x, ${curve.expr}]`, mistake: 'shell-radius-wrong', why: `${b} − x is the distance to the edge x = ${b} of the region; the radius is measured to the axis x = ${m}.` },
          { latex: `r = ${f},\\quad h = ${m} - x`, expr: `[${curve.expr}, ${m} - x]`, mistake: 'shell-radius-wrong', why: `Radius and height are swapped: the slice has length $${f}$ and sits $${m} - x$ from the axis.` },
        ];
        explanation = `The slice at $x$ runs from $y = 0$ up to $y = ${f}$, and it lies $${m} - x$ units left of the axis $x = ${m}$.`;
      }
      // Rotate so the correct option's position varies with the seed.
      const all = [correctOpt, ...distractors];
      const shift = Math.floor(rng() * all.length);
      const options = [...all.slice(shift), ...all.slice(0, shift)];
      const correct = (all.length - shift) % all.length;
      return {
        id: `vs-g-axis-radius:${seed}`,
        topic: 'volumes-shells',
        kind: 'concept',
        prompt: {
          text: `The region under $y = ${f}$ for $0 \\le x \\le ${b}$ is rotated about the line $x = ${axis}$. What are the radius and height of the shell at position $x$?`,
        },
        options,
        correct,
        explanation,
        check: { kind: 'value', expected },
        difficulty: 1,
        tags: ['radius-height', 'axis-shift'],
      };
    },
  },
];
