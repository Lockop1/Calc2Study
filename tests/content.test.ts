/**
 * Automated content checks. Run a single topic with:
 *   npx vitest run tests/content.test.ts -t "antiderivatives"
 */
import { describe, it, expect } from 'vitest';
import { CONTENT } from '../content/index';
import { validateFlashItem, validateStepProblem, type Issue } from '../checker/validate';

export const GENERATOR_SEEDS = Array.from({ length: 20 }, (_, i) => i + 1);

function formatIssues(issues: Issue[]): string {
  return issues.map((i) => `[${i.code}] ${i.where}: ${i.message}`).join('\n');
}

function expectClean(issues: Issue[]): void {
  const errors = issues.filter((i) => i.level === 'error');
  if (errors.length > 0) {
    expect.fail(formatIssues(errors));
  }
}

const seenIds = new Set<string>();

for (const topic of CONTENT) {
  describe(`topic ${topic.topic}`, () => {
    // vitest fails a describe block that registers no tests; topics may legitimately have no
    // generators (or, while being authored, no items). The volume test enforces minimum counts.
    it('is aggregated', () => {
      expect(topic.topic).toBeTruthy();
    });
    describe.runIf(topic.flash.length > 0)('flash', () => {
      for (const item of topic.flash) {
        it(`${item.id}`, () => {
          expect(item.topic).toBe(topic.topic);
          expect(seenIds.has(item.id), `duplicate id ${item.id}`).toBe(false);
          seenIds.add(item.id);
          expectClean(validateFlashItem(item));
        });
      }
    });
    describe.runIf(topic.generators.length > 0)('generators', () => {
      for (const gen of topic.generators) {
        it(`${gen.id}`, () => {
          expect(gen.topic).toBe(topic.topic);
          expect(seenIds.has(gen.id), `duplicate id ${gen.id}`).toBe(false);
          seenIds.add(gen.id);
          const all: Issue[] = [];
          const instanceIds = new Set<string>();
          for (const seed of GENERATOR_SEEDS) {
            const a = gen.generate(seed);
            const b = gen.generate(seed);
            expect(JSON.stringify(a), `generator ${gen.id} is not deterministic for seed ${seed}`).toBe(JSON.stringify(b));
            expect(a.id).toBe(`${gen.id}:${seed}`);
            expect(a.topic).toBe(topic.topic);
            expect(a.kind).toBe(gen.kind);
            instanceIds.add(a.id);
            all.push(...validateFlashItem(a, { generated: true }));
          }
          expect(instanceIds.size).toBe(GENERATOR_SEEDS.length);
          expectClean(all);
        });
      }
    });
    describe.runIf(topic.steps.length > 0)('steps', () => {
      for (const problem of topic.steps) {
        it(`${problem.id}`, () => {
          expect(problem.topic).toBe(topic.topic);
          expect(seenIds.has(problem.id), `duplicate id ${problem.id}`).toBe(false);
          seenIds.add(problem.id);
          expectClean(validateStepProblem(problem));
        });
      }
    });
  });
}
