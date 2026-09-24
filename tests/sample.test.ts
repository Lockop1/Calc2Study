import { describe, it, expect } from 'vitest';
import { sampleFlash, sampleGenerators, sampleSteps } from '../content/examples/sample';
import { validateFlashItem, validateStepProblem } from '../checker/validate';

describe('reference examples stay valid', () => {
  for (const item of sampleFlash) {
    it(item.id, () => {
      const errors = validateFlashItem(item).filter((i) => i.level === 'error');
      expect(errors.map((e) => `[${e.code}] ${e.message}`)).toEqual([]);
    });
  }
  for (const gen of sampleGenerators) {
    it(gen.id, () => {
      for (let seed = 1; seed <= 20; seed++) {
        const errors = validateFlashItem(gen.generate(seed), { generated: true }).filter((i) => i.level === 'error');
        expect(errors.map((e) => `[${e.code}] ${e.message}`)).toEqual([]);
      }
    });
  }
  for (const p of sampleSteps) {
    it(p.id, () => {
      const errors = validateStepProblem(p).filter((i) => i.level === 'error');
      expect(errors.map((e) => `[${e.code}] ${e.message}`)).toEqual([]);
    });
  }
});
