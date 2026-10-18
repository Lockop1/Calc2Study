# Calc2Study — CLAUDE.md

Read this file first. It is the project contract for every agent (orchestrator and subagents).

## What this is

A phone-first, offline-only micro-learning web app for **MAC 2312 Calculus II (UCF)**: the nine Exam 1
topics (Lectures 1–7) plus five topics from Lectures 8–12 (partial fractions, improper integrals,
sequences, series basics, series tests). The student opens it for 2–5 minutes and gets drilled with questions that require actual thinking (no
answer is guessable from the options alone). No backend, no accounts, no API keys, no network calls;
everything ships in the static bundle and works offline as an installable PWA.

Three modes:
- **Flash Drill** — fast multiple choice (derivatives, antiderivatives, rules & formulas, technique
  recognition). ≥5 options, instant feedback, one-line explanation, and for a wrong pick the specific
  mistake the choice represents.
- **Step-Through ("what's next?")** — a problem worked step by step; at each step the student picks
  the next move from 5 options; the correct step is revealed and becomes the new state whether the
  answer was right or wrong; 3–7 steps; ends with the final answer and a recap.
- **Review** — a deck of everything missed, weighted toward recent and repeated misses.

Topic picker (multi-select, defaults to all, persisted) filters every mode. Rounds of 10 (5/10/20).

A fourth mode, **Cards**, is a flashcard deck: the exact identities and formulas from the class
whiteboard (50 cards in 9 sections: derivatives, antiderivatives, Pythagorean / double-angle /
half-angle identities, trig substitution, area & volume, arc length, integration by parts) plus one
section per topic 10–14 (definitions, theorems with their hypotheses, limit forms, test statements,
the limits to know). Tap to flip, grade "Got it" / "Missed it", missed cards re-enter the queue a few cards later until marked
got, session summary with "Study missed only", section filters + shuffle + missed-only toggles,
and a two-tap reset (filtered or full). Card progress and filters persist through the storage
wrapper. **Cards are not multiple-choice, so the ≥5-option / mistake-tag rules do not apply to
Cards mode**; every other constraint does. The whiteboard deck lives in `content/cards/deck.ts`
(`WHITEBOARD_CARDS`, never changed); each topic-10–14 deck is its own file `content/cards/<topic>.ts`
and `deck.ts` concatenates them into `CARDS`. The Cards topic picker is independent of the quiz
topic picker.

Exam 1 topics (source of truth: `reference/lectures/`, read-only):
1. Differentiation review (Lecture 1, §1.4–1.7) · 2. Antiderivatives & u-substitution (Lecture 1) ·
3. Area between curves (Lecture 2, §2.1) · 4. Volumes: slicing, disks & washers (Lecture 3, §2.2) ·
5. Volumes: shells & method selection (Lecture 4, §2.3) · 6. Arc length (Lecture 5 Part 1) ·
7. Integration by parts (Lecture 5 Part 2, §3.1) · 8. Trigonometric integrals (Lecture 6, §3.2) ·
9. Trigonometric substitution (Lecture 7, §3.3).

Topics 10–14 (Lectures 8–12; **no lecture PDFs exist for these — the spec below is their source of
truth** for scope, notation and procedures; never add ratio test, root test, alternating series or
absolute convergence content anywhere):
10. Partial fractions (Lecture 8, §3.4) · 11. Improper integrals (Lecture 9, §3.7) ·
12. Sequences (Lecture 10, §5.1) · 13. Series: partial sums, divergence test, geometric, telescoping
(Lecture 11, §5.2) · 14. Integral test, direct & limit comparison, choosing a test (Lecture 12,
§5.3–5.4).

Spec for topics 10–14 (condensed from the course):
- *Partial fractions.* p/s is proper iff deg p < deg s; ax²+bx+c is irreducible iff b²−4ac < 0
  (check the discriminant explicitly). Order: proper? → if not, long division p = sq + r,
  p/s = q + r/s → factor the denominator completely → write the form → solve coefficients (multiply
  out; plug roots of the linear factors, then x = 0, then equate remaining coefficients) → integrate
  each term. Forms: (ax+b) → A/(ax+b); (ax+b)ⁿ → one Aₖ/(ax+b)ᵏ per power; irreducible quadratic →
  (Ax+B)/(ax²+bx+c); repeated irreducible quadratic → one (Aₖx+Bₖ)/(…)ᵏ per power. Class example:
  (3−x²)/((x−1)(x²+1)) = 1/(x−1) − (2x+2)/(x²+1). Integrals: ∫A/(ax+b) = (A/a)ln|ax+b| + C;
  A/(ax+b)ⁿ (n ≥ 2) by the power rule; (Ax+B)/(x²+k²)ⁿ split into the Ax part (u = x²+k²) and the B
  part (x = k tan θ; n = 1 gives (1/k)arctan(x/k)); complete the square when b ≠ 0.
- *Improper integrals.* Type I: ∫ₐ^∞ = lim_{t→∞}∫ₐᵗ, ∫_{−∞}^b = lim_{t→−∞}∫ₜᵇ, ∫_{−∞}^∞ = ∫_{−∞}^c +
  ∫_c^∞ as two SEPARATE limits (never one symmetric limit), convergent only if both converge.
  Type II: discontinuity at b → lim_{t→b⁻}∫ₐᵗ; at a → lim_{t→a⁺}∫ₜᵇ; interior c → split, two
  one-sided limits, both must converge; approach from inside the interval. Converges iff the limit
  is finite (a limit of ∞ means divergent). Steps: identify the type → replace the bad bound(s) by a
  variable and write the limit(s) → FTC inside the limit → evaluate → conclude. ∫₁^∞ 1/xᵖ converges
  iff p > 1.
- *Sequences.* {aₙ}ₙ₌₁^∞; geometric a·rⁿ or a·rⁿ⁻¹; arithmetic aₙ = a + (n−1)d; convergent iff
  aₙ → L finite; {rⁿ} converges iff −1 < r ≤ 1 (0 if |r| < 1, 1 if r = 1). Underlying Function
  Theorem (L'Hôpital on f(x)); limits to know: sin x, cos x DNE; aˣ by a; ln x → ∞; rational by
  degrees; arctan x → π/2; (1+1/x)ˣ → e. Limit laws; Continuous Function Theorem; Squeeze Theorem
  (corollary |aₙ| → 0 ⇒ aₙ → 0); bounded (|aₙ| ≤ M); convergent ⇒ bounded, not the converse
  ({(−1)ⁿ}); monotone; Monotone Convergence Theorem (monotone AND bounded ⇒ convergent).
- *Series basics.* Σaₙ converges iff {Sₙ} converges, sum = lim Sₙ, aₙ = Sₙ − Sₙ₋₁. Divergence Test:
  lim aₙ ≠ 0 or DNE ⇒ diverges; lim aₙ = 0 is inconclusive (never proves convergence). Geometric
  Σarⁿ⁻¹ (from n = 1): Sₙ = a(1−rⁿ)/(1−r), converges iff |r| < 1 to a/(1−r), a = first term (watch
  the index). Telescoping Σ(bₙ − bₙ₊₁): Sₙ = b₁ − bₙ₊₁, converges iff lim bₙ = L finite, sum b₁ − L.
  Properties: both convergent ⇒ Σ(aₙ ± bₙ), Σcaₙ converge; never split into divergent pieces;
  recognize insufficient information.
- *Series tests* (positive terms). Integral Test: f positive, continuous, decreasing on [k, ∞) ⇒
  Σaₙ and ∫ₖ^∞ f both converge or both diverge; the integral's value ≠ the sum; state all three
  conditions. p-series converges iff p > 1. Direct Comparison (0 < aₙ ≤ bₙ): larger converges ⇒
  smaller converges; smaller diverges ⇒ larger diverges; other directions give no information.
  Limit Comparison L = lim aₙ/bₙ: 0 < L < ∞ ⇒ same behaviour; L = 0 and Σbₙ converges ⇒ Σaₙ
  converges; L = ∞ and Σbₙ diverges ⇒ Σaₙ diverges; otherwise inconclusive; pick bₙ from the dominant
  terms. Examples: ln n/n vs 1/n (L = ∞ ⇒ diverges); ln n/n² vs 1/n^{3/2} (L = 0 ⇒ converges);
  1/(n ln n) defeats LCT (L = 0 against the divergent 1/n, L = ∞ against any convergent p-series)
  → integral test with u = ln x (diverges). (The session brief wrote this example as 1/(√n ln n);
  that series is settled by LCT with 1/n (L = ∞, diverges) and its integral has no elementary
  antiderivative, so the intended example is the standard 1/(n ln n) — logged in
  VERIFICATION_LOG.md.) Flowchart: divergence test → Sₙ findable
  (geometric/telescoping)? → p-series? → positive terms: integral / direct / limit comparison.

Course conventions to respect: trig substitution is written `ax = b sin(θ)`, `ax = b tan(θ)`,
`ax = b sec(θ)` with `dx = (b/a)cos θ dθ` etc.; `∫tan x dx = −ln|cos x| + C`;
`∫sec x dx = ln|sec x + tan x| + C`; LIATE is a guideline for choosing u; washers `π(R² − r²)`
with R/r the distances from the axis of rotation; shells `2π r h`; arc length `∫√(1 + (f′)²)`.

## Constraints (use if any of these features are touched, or close proximity features are touched)

- no backend, no accounts, no API keys, no network requests at runtime — the app must work fully offline after first load
- no CDN assets; all dependencies are bundled
- every question item must pass the automated content checks before merging — never disable or loosen a check to make content pass; fix the content
- every question and every step has at least 5 options, each distractor tagged with a mistake from `content/mistakes.ts`
- no content file merges without a `math-verifier` pass from an instance that did not author it
- lecture notes in `reference/lectures/` are the source of truth for scope and notation of topics 1–9; the spec above is the source of truth for topics 10–14; don't add topics beyond Lectures 1–12 (no ratio/root/alternating series anywhere)
- localStorage access is always wrapped in try/catch, and the app works correctly when storage is empty or unavailable
- mobile-first at ~390px width; nothing scrolls the page sideways

## Repository layout

```
reference/lectures/      READ-ONLY lecture PDFs (source of truth). reference/guided-notes/: handwritten class notes (scans).
content/                 all question content (pure data, TypeScript)
  types.ts               schema (FlashItem, FlashGenerator, StepProblem, Step, Option, Check)
  mistakes.ts            shared mistake taxonomy (MistakeId); authors must not edit it
  topics.ts              topic list, id prefixes, minimum counts
  flash/<topic>.ts       `export const flash: FlashItem[]`, `export const generators: FlashGenerator[]`
  steps/<topic>.ts       `export const steps: StepProblem[]`
  index.ts               aggregate (CONTENT, ALL_FLASH, ALL_STEPS, contentFor)
  examples/sample.ts     reference examples for authors (validated, not shipped)
  cards/deck.ts          Cards mode deck: `WHITEBOARD_CARDS` (sections 1–9, frozen), `CARD_SECTIONS`, `CARDS` (all)
  cards/<topic>.ts       topic 10–14 card decks (partial-fractions, improper, sequences, series-basics, series-tests)
  VERIFICATION_LOG.md    verifier results, blind-option results, resolved disagreements
checker/                 TEST-TIME ONLY (mathjs): mathenv.ts, numeric.ts, latex2math.ts, validate.ts,
                         claims.ts (improper-integral / limit / series claim checks)
tests/                   vitest: content checks, parser tests, claim-check tests, medoid test, app logic tests
scripts/                 blind-sample.ts, blind-score.ts, medoid-scan.ts, content-stats.ts, make-icons.py
src/                     the app (React + TS). Never imports mathjs or checker/.
qa/                      QA scripts, screenshots, reports; qa/blind/ holds blind-test artifacts
.claude/agents/          subagent definitions (content-author, math-verifier, ui-builder, qa-tester)
PHASES.md                progress tracker
```

Topic ids and item-id prefixes: `diff-review`→`dr`, `antiderivatives`→`ad`, `area`→`ar`,
`volumes-disks`→`vd`, `volumes-shells`→`vs`, `arc-length`→`al`, `ibp`→`ip`, `trig-integrals`→`ti`,
`trig-sub`→`ts`, `partial-fractions`→`pf`, `improper`→`im`, `sequences`→`sq`, `series-basics`→`sb`,
`series-tests`→`st`. Flash ids `dr-f-001`, generator ids `dr-g-<name>` (instances `dr-g-<name>:<seed>`),
step problems `dr-s-01`, step ids `dr-s-01#<stepIndex>`.

## Content schema (summary — `content/types.ts` is authoritative)

```ts
Option      { latex?, text?, expr?, mistake?, why? }         // distractors: mistake + why required
Check       { kind:'derivative', of } | { kind:'antiderivative', integrand }
          | { kind:'definite-integral', integrand, lower, upper } | { kind:'identity', lhs }
          | { kind:'value', expected } | { kind:'none', reason }
          | { kind:'improper-integral', integrand, lower, upper, converges, value?, split? }  // bounds may be 'inf' / '-inf'
          | { kind:'limit', term, variable?, limit }        // limit: expr | 'infinity' | '-infinity' | 'dne'
          | { kind:'series', term, from?, converges, sum? }
FlashItem   { id, topic, kind, prompt:{text?,latex?}, options[≥5], correct, explanation,
              variable?, domain?, check, difficulty?, tags? }
  kind: derivative | antiderivative | evaluate | formula | technique | concept
  - derivative:     prompt.latex = f(x) (bare); options latex+expr; check.kind 'derivative'
  - antiderivative: prompt.latex = integrand; options latex+expr, ALL ending "+ C"; check 'antiderivative'
  - evaluate:       prompt.latex = full definite integral; options = values; check 'definite-integral'
  - formula / technique / concept: free-form prompt; exprs optional (all options or none)
  - claim checks (improper-integral / limit / series) validate the claim itself numerically
    (checker/claims.ts: truncations toward the bad endpoint, the term at n = 10³…10⁶, partial sums);
    with a numeric target (value / finite limit / sum) the correct option's expr must equal it;
    without one the options are text-only (a "verdict" item) and the math-verifier checks them by hand
FlashGenerator { id, topic, kind, describe, generate(seed): FlashItem }  // deterministic; id `${gen.id}:${seed}`
Step        { prompt, options[≥5], correct, explanation, result?:{latex?,text?}, check?, variable?, domain? }
StepProblem { id, topic, title, difficulty:1|2, statement:{text?,latex?}, steps[3..7],
              final:{latex, expr?, check, recap}, variable?, domain?, tags? }
```

Machine expressions are **mathjs** syntax evaluated by `checker/mathenv.ts`: `log(x)` = natural log
(aliases `ln`, `arcsin`, `arccos`, `arctan`, `arcsec`, `arccsc`, `arccot`); `sqrt`, `abs`, `exp`,
`nthRoot(x, 3)`, `pi`, `e`, `theta`; differentials are plain symbols `dx`, `du`, `dtheta`; the
constant `C` evaluates to 0; `integral(f, x, a, b)` is a numeric definite integral;
`indefinite(f, x)` compares by integrand; vectors `[a, b]` express pairs like "R = …, r = …".
Default sampling domain is `[0.25, 1.25]` per variable; set `domain` when the answer is undefined
there (e.g. `domain: [2.5, 4]` for `√(x²−4)`, or `{ x: [-2, 2] }`). Because `C` is the integration
constant (0), never name a partial-fraction coefficient `C` inside an expr.

Automated checks (tests/content.test.ts) per item/step: schema; ≥5 options; unique options;
`correct` in range; every distractor has a known `mistake` and a `why`; the correct option has no
mistake tag; no all/none/both-of-the-above; `+ C` on all options or none; numeric correctness of the
correct answer per `check` (finite differences / tanh-sinh quadrature at ≥6 random points in the
domain); numeric distinctness of every distractor (for antiderivatives, via the derivative, so
"differs by a constant" is caught); LaTeX↔expr agreement (the LaTeX is parsed by
`checker/latex2math.ts` and compared numerically); generators are deterministic and valid for seeds
1..20. tests/content-volume.test.ts enforces the minimum counts (≥40 flash per topic counting a
generator as 5, ≥30 static; ≥8 step problems for topics 2–14 with both difficulty levels).
tests/medoid.test.ts (topics 10–14) requires the answer-blind medoid rate ≤ 30% per topic under both
similarity measures of `scripts/medoid-scan.ts`.

Parseable LaTeX subset (keep option/prompt LaTeX inside it when the option has an `expr`):
numbers, `\frac{}{}`, `\pi`, `e^{...}`, variables (single letters, `\theta`), `+ - \cdot /`, `^{}`,
implicit multiplication, `\sqrt{}`, `\sqrt[3]{}`, `( ) [ ] \left \right`, `|...|`, `\ln`, `\sin`
… `\csc`, `\arcsin` … `\arctan`, `\sin^{-1}` … `\sec^{-1}`, `\operatorname{arcsec}`, `\sin^2 x`,
`\ln|...|`, `\int_a^b f\,dx`, `\int f\,dx`, top-level `name = expr` (left side ignored), and
top-level lists `A = …,\quad B = …` (→ vector). Not supported: `\frac{d}{dx}`, `\Big|_a^b`,
`\text{}`, subscripts, `\to`, inequalities — keep those in `result`/`explanation` strings only.

Text fields (`explanation`, `why`, `prompt.text`, `text` options, `recap`, `result.text`) may contain
inline math delimited by `$...$`.

Cards (`Card` in `content/types.ts`): `{ id: 'card-<section>-<nn>', category, section, kind, front,
back:{latex, also?, expr?, checkExpr?}, check, variable?, domain? }`. `kind` frames the front
(derivative → d/dx[…], antiderivative → ∫…dx, identity → LHS = ?, trig-sub / formula → as written)
and picks the check: derivative and antiderivative cards by finite differences, identities at random
points, trig-sub cards by substituting the sub into the radical on the θ interval (identity) and
differentiating the sub for dx (derivative), formula cards `none` (math-verifier only).
`tests/cards.test.ts` enforces the exact whiteboard deck (50 cards, fixed per-section counts, no
LIATE), minimum sizes for the topic-10–14 sections, KaTeX rendering, doubled backslashes, LaTeX↔expr
agreement and the numeric checks. Formula cards in the topic-10–14 sections may carry a limit /
series / improper-integral / identity / value check (whiteboard formula cards stay `none`). Every
deck change goes through a `math-verifier` that did not author it.

## Distractor rules (verifier-enforced; the mechanical parts are test-enforced)

1. Every distractor encodes ONE specific, realistic student mistake, tagged from `content/mistakes.ts`.
2. All options share the same form (notation, length, `+ C`, absolute values, simplification level). No odd one out.
3. Every option is mathematically distinct from the correct answer (tested numerically).
4. No "all/none of the above". Option order is shuffled every display (never reference letters).
5. Blind-option test: the verifier tries to pick answers from options alone for ≥30% of items per
   topic; guessable items are rewritten. Results go in `content/VERIFICATION_LOG.md`.
6. Decoy hub (topics 10–14, recommended everywhere): one DISTRACTOR is the hub; the other distractors
   and the correct answer are each a single-feature mutation of it, so the answer is never the
   "most central" option. `npx tsx scripts/medoid-scan.ts <topic> --verbose` must report ≤ 30% under
   both measures; rates are recorded per topic in `content/VERIFICATION_LOG.md`.
7. Convergence questions: options include believable wrong conclusions; a correct verdict with an
   invalid justification is a distractor (tagged), never the answer.

## Orchestration rules

- Orchestrator plans, integrates, reviews, resolves disagreements. Heavy work goes to subagents in
  `.claude/agents/` (all `claude-opus-5-5`, `effort: max`).
- `content-author` writes ONE topic at a time; several run in parallel. Authors never review their own work.
- Every content file goes through `math-verifier` (a different instance than the author) before merging.
- If verifier and author disagree, the orchestrator re-derives and logs the decision in `content/VERIFICATION_LOG.md`.
- Subagent prompts are self-contained: schema, topic, lecture text, distractor rules.

## Commands

```
npm install
npm run dev                 # Vite dev server
npm run typecheck           # tsc --noEmit
npm test                    # vitest: content checks + parser + app logic (all must pass)
npx vitest run tests/content.test.ts -t "antiderivatives"   # one topic
npm run build               # typecheck + vite build → dist/ (static, PWA, offline)
npm run preview             # serve dist/ on :4173 (needed to test the service worker)
npx tsx scripts/content-stats.ts        # per-topic counts + warnings
npx tsx scripts/medoid-scan.ts [topic] [--verbose]   # answer-blind medoid rates (target ≤ 30%)
npx tsx scripts/blind-sample.ts <topic> <seed>   # blind-option sample for the verifier
npx tsx scripts/blind-score.ts qa/blind/<topic>-<seed>.guesses.json
python3 scripts/make-icons.py           # regenerate PWA icons (Pillow + bundled KaTeX fonts)
```

Deploy: copy `dist/` to any static host; open on the phone; "Add to Home Screen"; it then works in
airplane mode.
