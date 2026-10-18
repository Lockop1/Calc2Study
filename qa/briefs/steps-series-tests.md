# Step-Through topic file — series-tests
File: content/steps/series-tests.ts · export `steps` · ids `<prefix>-s-01` … (prefix from content/topics.ts). The topic spec,
mistake tags and item ideas are in flash-series-tests.md in this folder (read it; the spec there is the source of truth).
Suggested problems (3–7 steps each, professor's order):
- Σ 1/n² (choose test: p-series, p = 2 → converges); Σ 1/√n (p = 1/2 → diverges); Σ ln n/n (divergence test inconclusive → limit comparison with 1/n, L = ∞ → diverges); Σ ln n/n² (LCT with 1/n^{3/2}, L = 0 → converges); Σ 1/(n ln n) from 2 (LCT inconclusive → integral test: conditions → u = ln x → ln ln t → ∞ → diverges); Σ 1/(n² + 1) (direct comparison ≤ 1/n² → converges); Σ 1/(2ⁿ + n) (≤ 1/2ⁿ geometric → converges); Σ (n + 1)/(n³ + 2) (LCT with 1/n², L = 1 → converges); Σ 1/(n − 1/2) (≥ 1/n → diverges); Σ n e^{−n²} (integral test, u = n² → converges); Σ 1/(√n + 1) (LCT with 1/√n → diverges).
Every verdict step's correct option must state the verdict AND the valid test; distractors include right-verdict-wrong-reason (`st-wrong-inference`, `st-comparison-wrong-direction`, `sb-divergence-test-converse`).
Difficulty 1: p-series / direct comparison; difficulty 2: limit comparison boundary cases, integral test with substitution.
