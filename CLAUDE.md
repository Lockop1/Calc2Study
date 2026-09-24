# Calc2Study — CLAUDE.md

Read this file first. It is the project contract for every agent (orchestrator and subagents).

## What this is

A phone-first, offline-only micro-learning web app for **MAC 2312 Calculus II (UCF), Exam 1**. The
student opens it for 2–5 minutes and gets drilled with questions that require actual thinking (no
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

Exam 1 topics (source of truth: `reference/lectures/`, read-only):
1. Differentiation review (Lecture 1, §1.4–1.7) · 2. Antiderivatives & u-substitution (Lecture 1) ·
3. Area between curves (Lecture 2, §2.1) · 4. Volumes: slicing, disks & washers (Lecture 3, §2.2) ·
5. Volumes: shells & method selection (Lecture 4, §2.3) · 6. Arc length (Lecture 5 Part 1) ·
7. Integration by parts (Lecture 5 Part 2, §3.1) · 8. Trigonometric integrals (Lecture 6, §3.2) ·
9. Trigonometric substitution (Lecture 7, §3.3).

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
- lecture notes in `reference/lectures/` are the source of truth for scope and notation; don't add topics beyond Exam 1 scope
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
  VERIFICATION_LOG.md    verifier results, blind-option results, resolved disagreements
checker/                 TEST-TIME ONLY (mathjs): mathenv.ts, numeric.ts, latex2math.ts, validate.ts
tests/                   vitest: content checks, parser tests, app logic tests
scripts/                 blind-sample.ts, blind-score.ts, content-stats.ts, make-icons.py
src/                     the app (React + TS). Never imports mathjs or checker/.
qa/                      QA scripts, screenshots, reports; qa/blind/ holds blind-test artifacts
.claude/agents/          subagent definitions (content-author, math-verifier, ui-builder, qa-tester)
PHASES.md                progress tracker
```

Topic ids and item-id prefixes: `diff-review`→`dr`, `antiderivatives`→`ad`, `area`→`ar`,
`volumes-disks`→`vd`, `volumes-shells`→`vs`, `arc-length`→`al`, `ibp`→`ip`, `trig-integrals`→`ti`,
`trig-sub`→`ts`. Flash ids `dr-f-001`, generator ids `dr-g-<name>` (instances `dr-g-<name>:<seed>`),
step problems `dr-s-01`, step ids `dr-s-01#<stepIndex>`.

## Content schema (summary — `content/types.ts` is authoritative)

```ts
Option      { latex?, text?, expr?, mistake?, why? }         // distractors: mistake + why required
Check       { kind:'derivative', of } | { kind:'antiderivative', integrand }
          | { kind:'definite-integral', integrand, lower, upper } | { kind:'identity', lhs }
          | { kind:'value', expected } | { kind:'none', reason }
FlashItem   { id, topic, kind, prompt:{text?,latex?}, options[≥5], correct, explanation,
              variable?, domain?, check, difficulty?, tags? }
  kind: derivative | antiderivative | evaluate | formula | technique | concept
  - derivative:     prompt.latex = f(x) (bare); options latex+expr; check.kind 'derivative'
  - antiderivative: prompt.latex = integrand; options latex+expr, ALL ending "+ C"; check 'antiderivative'
  - evaluate:       prompt.latex = full definite integral; options = values; check 'definite-integral'
  - formula / technique / concept: free-form prompt; exprs optional (all options or none)
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
there (e.g. `domain: [2.5, 4]` for `√(x²−4)`, or `{ x: [-2, 2] }`).

Automated checks (tests/content.test.ts) per item/step: schema; ≥5 options; unique options;
`correct` in range; every distractor has a known `mistake` and a `why`; the correct option has no
mistake tag; no all/none/both-of-the-above; `+ C` on all options or none; numeric correctness of the
correct answer per `check` (finite differences / tanh-sinh quadrature at ≥6 random points in the
domain); numeric distinctness of every distractor (for antiderivatives, via the derivative, so
"differs by a constant" is caught); LaTeX↔expr agreement (the LaTeX is parsed by
`checker/latex2math.ts` and compared numerically); generators are deterministic and valid for seeds
1..20. tests/content-volume.test.ts enforces the minimum counts (≥40 flash per topic counting a
generator as 5, ≥30 static; ≥8 step problems for topics 2–9 with both difficulty levels).

Parseable LaTeX subset (keep option/prompt LaTeX inside it when the option has an `expr`):
numbers, `\frac{}{}`, `\pi`, `e^{...}`, variables (single letters, `\theta`), `+ - \cdot /`, `^{}`,
implicit multiplication, `\sqrt{}`, `\sqrt[3]{}`, `( ) [ ] \left \right`, `|...|`, `\ln`, `\sin`
… `\csc`, `\arcsin` … `\arctan`, `\sin^{-1}` … `\sec^{-1}`, `\operatorname{arcsec}`, `\sin^2 x`,
`\ln|...|`, `\int_a^b f\,dx`, `\int f\,dx`, top-level `name = expr` (left side ignored), and
top-level lists `A = …,\quad B = …` (→ vector). Not supported: `\frac{d}{dx}`, `\Big|_a^b`,
`\text{}`, subscripts, `\to`, inequalities — keep those in `result`/`explanation` strings only.

Text fields (`explanation`, `why`, `prompt.text`, `text` options, `recap`, `result.text`) may contain
inline math delimited by `$...$`.

## Distractor rules (verifier-enforced; the mechanical parts are test-enforced)

1. Every distractor encodes ONE specific, realistic student mistake, tagged from `content/mistakes.ts`.
2. All options share the same form (notation, length, `+ C`, absolute values, simplification level). No odd one out.
3. Every option is mathematically distinct from the correct answer (tested numerically).
4. No "all/none of the above". Option order is shuffled every display (never reference letters).
5. Blind-option test: the verifier tries to pick answers from options alone for ≥30% of items per
   topic; guessable items are rewritten. Results go in `content/VERIFICATION_LOG.md`.

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
npx tsx scripts/blind-sample.ts <topic> <seed>   # blind-option sample for the verifier
npx tsx scripts/blind-score.ts qa/blind/<topic>-<seed>.guesses.json
python3 scripts/make-icons.py           # regenerate PWA icons (Pillow + bundled KaTeX fonts)
```

Deploy: copy `dist/` to any static host; open on the phone; "Add to Home Screen"; it then works in
airplane mode.
