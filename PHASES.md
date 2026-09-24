# PHASES.md — progress tracker

Legend: ☐ not started · ◐ in progress · ☑ done · ✗ blocked

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Scaffold + project docs (Vite/React/TS, KaTeX, vitest, agents, CLAUDE.md, PHASES.md) | ☑ | Subagent defs in `.claude/agents/` with `model: claude-opus-5-5`, `effort: max` |
| 2 | Content schema + mistake taxonomy | ☑ | `content/types.ts`, `content/mistakes.ts` (100+ tags), `content/topics.ts` |
| 3 | Automated content checks | ◐ | `checker/` (mathjs env, tanh-sinh, finite differences, LaTeX parser, validator) + `tests/content*.test.ts` |
| 4 | Content authoring (9 topics, parallel content-author agents) | ☐ | |
| 5 | Content verification (math-verifier per file, blind-option test, VERIFICATION_LOG.md) | ☐ | |
| 6 | Flash Drill mode | ☐ | |
| 7 | Step-Through mode | ☐ | |
| 8 | Topic picker, Review mode, progress, settings | ☐ | |
| 9 | PWA/offline + mobile QA | ☐ | |

## Log

- Task 1–2 done by the orchestrator: scaffold, agents, schema, taxonomy, topics, sample content, icons.
- Task 3: numeric core + validator written; LaTeX→mathjs parser delegated to a subagent.
