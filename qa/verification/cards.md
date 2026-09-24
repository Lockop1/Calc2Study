VERDICT: PASS

# Math verification: `content/cards/deck.ts` (Cards mode, 50 cards)

Verifier: math-verifier (did not author this deck). Commit under review: `761f81d`.

- `npx vitest run tests/cards.test.ts`: **54/54 pass** (counts, ids, no LIATE, KaTeX, LaTeX↔expr, numeric checks).
- Independent re-derivation: by hand (below), plus my own script (plain JS `Math`, not the project checker). It compares each stored `back.expr` with my derived answer over wide domains: derivatives and antiderivatives on [−6, 6] or [−4.5, 4.5] minus singularities, so every sign of every |·| argument is exercised; arcsin/arccos on (−1, 1); arcsec on |x| > 1 in [−5, 5]; ln|x| on negative x; trig sub with a ∈ {0.5, 1, 2.5, 4} over the whole principal θ interval. The script also confirms each `check.of` / `integrand` / `lhs` equals the card's front. All 42 checkable cards: 0 failures.
- Check-strength (mutation) test: I ran each card's own `check`, `domain`, `variable` and seed with a wrong answer. All 22 mutations were **rejected**: arcsec 1/(x√(x²−1)), arccos without the minus, csc without the minus, ln|cos x|, −ln|sin x|, ln|sec x − tan x|, +ln|csc x + cot x|, arccos for 1/√(1−x²), trig sub −a cos θ / cos θ (a dropped) / −a tan θ / a sec θ / a sec²θ / sec θ tan θ (a dropped) / wrong dx / wrong why-identity, the swapped half-angle sign, cos²+sin² for cos 2x, and 1 − tan² for sec² − 1. So no check was written to match its answer.

## Board-list conformance
The deck matches the whiteboard list exactly: 12 + 11 + 4 + 2 + 2 + 12 + 4 + 2 + 1 = 50. Every card maps 1:1 to a board entry, in board order, with no extras and no LIATE/choosing-u card. `also` appears only on `card-antiderivatives-05` (tan) and `card-area-volume-01` (area). The list says "also" for exactly those two. All answers use the board's notation.

Judgements requested:
- **tan card** (`card-antiderivatives-05`): main answer ln|sec x| + C, with −ln|cos x| + C as `also`. This is acceptable. The two forms are identically equal, not just equal up to a constant, because |sec x| = 1/|cos x|. The `also` form is also the CLAUDE.md course convention, so both conventions appear.
- **washer card** (`card-area-volume-03`): π∫(R_out² − R_in²) dx. This is acceptable. It is the board's notation and matches CLAUDE.md's π(R² − r²), where R and r are the distances from the axis.

## Findings
There are no blocking findings (no WRONG_ANSWER, WRONG_CHECK, SCOPE or NOTATION issue). The notes below are non-blocking.

- `card-derivatives-10` (arcsec). **Verified, no issue.** arcsec x = arccos(1/x), so d/dx = −(1 − 1/x²)^(−1/2)·(−1/x²) = 1/(x²·√(x²−1)/|x|) = 1/(|x|√(x²−1)). This holds for x > 1 and x < −1, because √(x²) = |x|. mathjs `asec` = acos(1/x) with range [0, π], which is the same branch. The domain [−3, 3] does sample negative x: replaying the test's seeded RNG gives accepted x = 2.112, −2.552, 2.983, −1.905, 2.519, −2.954, −2.657, 2.337. The non-|x| form 1/(x√(x²−1)) is rejected by the card's own check.
- `card-trig-sub-09`, `card-trig-sub-11`. **MINOR, informational.** √(a²sec²θ − a²) = a|tan θ|. This equals a tan θ only for θ ∈ [0, π/2), i.e. x ≥ a. For x ≤ −a (θ ∈ (π/2, π]) it is −a tan θ; at θ = 2.5, a = 2 the radical is 1.494 while a tan θ = −1.494. The board's answer a tan θ is the standard one, and the card's `domain` θ ∈ [0.1, 1.3] correctly encodes that convention. No change needed. (The sin and tan rows hold on the whole principal interval, since cos θ ≥ 0 and sec θ > 0 there.)
- `card-antiderivatives-05`…`09`. **MINOR, optional test hardening.** These cards use the default domain [0.25, 1.25], where every |·| argument is positive. So the automated check would also accept the forms without absolute values (e.g. ln x + C). The stored answers do have the |·|, and my own check covers all quadrants and negative x. Optionally, add domains that exercise the sign, e.g. `domain: [-3, 3]` on `-09`, and a second-quadrant interval such as [1.8, 3] on the trig ones.
- `tests/cards.test.ts`. **MINOR, test-harness gap, not a content defect.** Nothing links a sub card's displayed sub (`back.expr`, e.g. `a*sin(theta)`) to the sub embedded in `check.lhs`. Nothing links a dx card's front text ("x = a sin θ") to `check.of` either. A card showing x = a tan θ over a sin-row check would still pass. I checked all 12 trig-sub cards by hand and by script: every `check.lhs` contains exactly the displayed sub and the front's radical, and every dx `check.of` is the front's sub. Optionally, add a test that the sub card's `back.expr` appears inside `check.lhs`.
- `card-area-volume-01`. **MINOR, acceptable.** The `also` form writes the bounds as ∫_c^d (right − left) dy, while the list shows "∫ (right − left) dy". Same formula, and it matches `card-arc-length-02`. Keep it.
- `card-area-volume-03`. **MINOR, cosmetic, optional.** `\right)dx` has no `\,` before dx, unlike the other formula cards. It renders as the standard "(…)dx", so no change is required.

## Derivations (terse)
- Derivatives: (sin)′ = cos; (cos)′ = −sin; (tan)′ = (sin/cos)′ = 1/cos² = sec²; (cot)′ = −1/sin² = −csc²; (sec)′ = sin/cos² = sec tan; (csc)′ = −cos/sin² = −csc cot. arcsin: y = arcsin x, so cos y · y′ = 1, and cos y = √(1−x²) ≥ 0 on [−π/2, π/2]. arccos gives the negative of that. arctan: sec²y · y′ = 1, so y′ = 1/(1+x²). arcsec: see above. (eˣ)′ = eˣ; (ln x)′ = 1/x.
- Antiderivatives (differentiate the back): (−cos)′ = sin; (sin)′ = cos; (tan)′ = sec²; (sec)′ = sec tan. (ln|sec|)′ = sec tan/sec = tan. (ln|sin|)′ = cot. (ln|sec+tan|)′ = (sec tan + sec²)/(sec + tan) = sec. (−ln|csc+cot|)′ = (csc cot + csc²)/(csc + cot) = csc. (ln|x|)′ = 1/x for x ≠ 0. (arctan)′ = 1/(1+x²). (arcsin)′ = 1/√(1−x²). All backs carry "+ C".
- Identities: sin² + cos² = 1; divide by cos² to get 1 + tan² = sec², hence sec² − 1 = tan² and 1 − sin² = cos². sin 2x = 2 sin x cos x and cos 2x = cos² x − sin² x come from the addition formulas with A = B = x. cos 2x = 1 − 2sin² x gives sin² x = (1 − cos 2x)/2; cos 2x = 2cos² x − 1 gives cos² x = (1 + cos 2x)/2.
- Trig sub (a > 0): √(a² − a²sin²θ) = a√(cos²θ) = a cos θ for θ ∈ [−π/2, π/2]. √(a² + a²tan²θ) = a√(sec²θ) = a sec θ for θ ∈ (−π/2, π/2). √(a²sec²θ − a²) = a√(tan²θ) = a tan θ for θ ∈ [0, π/2). dx: d(a sin θ) = a cos θ dθ; d(a tan θ) = a sec²θ dθ; d(a sec θ) = a sec θ tan θ dθ. Each "why" is the Pythagorean identity that removes the radical. Every card sets `variable: 'theta'`; the domains a ∈ [1, 3] and θ ⊂ the principal interval are correct.
- Formula cards (check `none`, by hand):
  - Area: a vertical strip has height top − bottom and width dx; a horizontal strip has width right − left and height dy.
  - Disk: the cross-section is πR².
  - Washer: π(R_out² − R_in²), with the radii measured from the axis.
  - Shell: 2π(radius)(height)·dx.
  - Arc length: ds = √(dx² + dy²), which gives √(1 + (dy/dx)²) dx or √(1 + (dx/dy)²) dy.
  - IBP: d(uv) = u dv + v du, so ∫u dv = uv − ∫v du.

  All of these match the CLAUDE.md conventions (shells 2πrh, washers π(R² − r²), arc length ∫√(1 + (f′)²)).

## Certified
All 50 cards are re-derived and correct, and their checks describe the card:
card-derivatives-01…12, card-antiderivatives-01…11, card-pythagorean-01…04, card-double-angle-01…02, card-half-angle-01…02, card-trig-sub-01…12, card-area-volume-01…04, card-arc-length-01…02, card-ibp-01.

## Uncertain
Nothing about correctness. The lecture PDFs could not be text-searched in this environment (no `pdftotext`), so notation was judged against the whiteboard list in the assignment and the conventions in CLAUDE.md. The arcsec |x| form also matches OpenStax (the course text).
