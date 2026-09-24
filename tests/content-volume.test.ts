/**
 * Minimum content volume per topic (brief: ≥40 flash items where the topic has memorization
 * content; ≥8 step-through problems for topics 2–9, mixed difficulty).
 */
import { describe, it, expect } from 'vitest';
import { CONTENT } from '../content/index';
import { MIN_FLASH_PER_TOPIC, MIN_STEPS_PER_TOPIC, topicById } from '../content/topics';

describe('content volume', () => {
  for (const c of CONTENT) {
    const t = topicById(c.topic);
    it(`${c.topic}: ≥${MIN_FLASH_PER_TOPIC} flash items (static + generators)`, () => {
      if (!t.hasFlashMinimum) return;
      // A generator counts as 5 items (it yields at least that many distinct instances).
      const count = c.flash.length + 5 * c.generators.length;
      expect(count, `${c.topic} has ${c.flash.length} flash items and ${c.generators.length} generators`).toBeGreaterThanOrEqual(MIN_FLASH_PER_TOPIC);
      expect(c.flash.length, `${c.topic}: at least 30 must be static items`).toBeGreaterThanOrEqual(30);
    });
    it(`${c.topic}: ≥${MIN_STEPS_PER_TOPIC} step-through problems, mixed difficulty`, () => {
      if (!t.hasStepMinimum) return;
      expect(c.steps.length).toBeGreaterThanOrEqual(MIN_STEPS_PER_TOPIC);
      const levels = new Set(c.steps.map((p) => p.difficulty));
      expect(levels.has(1), `${c.topic} needs Level I problems`).toBe(true);
      expect(levels.has(2), `${c.topic} needs Level II problems`).toBe(true);
    });
  }
});
