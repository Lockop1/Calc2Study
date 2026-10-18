# Decoy-hub rewrite rule (mechanical) — for option lists that hit the medoid heuristic

Background (CLAUDE.md distractor rule 6 and content/VERIFICATION_LOG.md "star pattern"): when every distractor is the
correct answer with one change, the correct answer is the most central option and an answer-blind heuristic finds it.
The accepted fix is a decoy hub: one distractor H, plus other distractors that share H's change (compound mistakes), so
that H, not the answer, is central. This rule turns that into a mechanical rewrite.

For each option list (flash item or step) named in the task, with correct option A and distractors D1, D2, D3, D4 in
file order:
1. H := D1. Leave it unchanged.
2. Let δ1 be the change that turns A into H (a flipped sign, a swapped bound, "converges" → "diverges", a dropped
   factor, a different limit letter, …). Rewrite D2 as D2' = D2 with δ1 ALSO applied (equivalently: H with D2's own
   change applied). Do the same for D3 → D3'. Apply δ1 only where it makes syntactic sense; if δ1 cannot be applied to
   D2 (the texts share nothing), build D2' from H instead by applying D2's change to H.
3. Keep D2's and D3's `mistake` tags. Rewrite their `why` to name both slips in one sentence, e.g. "Swapped the FTC order
   and also dropped the factor 2" (≥ 15 characters).
4. Leave D4 unchanged.
5. Constraints: the five option labels must stay distinct; no option may become mathematically equal to A (the content
   test checks expr options; for text options read the result once — if D2' or D3' would be a correct statement, use
   D4 as the compounding partner instead, i.e. D4' = D4 + δ1, and leave that D2/D3 alone). Never change A, the prompt,
   the check or the explanation. Keep LaTeX inside the parseable subset for expr options; double backslashes in TS.
6. After rewriting every listed option list, run the checks and the medoid scan named in the task. If a list still hits
   under both measures, also compound D4 (D4' = D4 + δ1). Report any list where the rule could not be applied.
