/**
 * Answer-blind medoid heuristic (scripts/medoid-scan.ts) for the topics added in session 3
 * (10–14): the option that is most similar to all the others must be the correct answer at most
 * ~30% of the time per topic, under both similarity measures. Items are built around a decoy hub so
 * that the answer is not guessable from the option set alone.
 */
import { describe, expect, it } from 'vitest';
import { TOPIC_IDS } from '../content/topics';
import { scanTopic } from '../scripts/medoid-scan';

const NEW_TOPICS = ['partial-fractions', 'improper', 'sequences', 'series-basics', 'series-tests'];
const MAX_RATE = 0.3;
const present = NEW_TOPICS.filter((t) => (TOPIC_IDS as readonly string[]).includes(t));

describe.runIf(present.length > 0)('medoid heuristic (topics 10–14)', () => {
  for (const topic of present) {
    it(`${topic}: medoid hit rate ≤ ${MAX_RATE * 100}% under both measures`, () => {
      const r = scanTopic(topic);
      if (r.n === 0) return;
      const hits = r.rows.filter((row) => row.edit > 0 || row.bigram > 0).map((row) => `${row.id} (edit ${row.edit.toFixed(2)}, bigram ${row.bigram.toFixed(2)})`);
      expect(r.editRate, `edit-distance medoid rate ${(100 * r.editRate).toFixed(1)}% over ${r.n} option lists; hits: ${hits.join(', ')}`).toBeLessThanOrEqual(MAX_RATE);
      expect(r.bigramRate, `bigram medoid rate ${(100 * r.bigramRate).toFixed(1)}% over ${r.n} option lists; hits: ${hits.join(', ')}`).toBeLessThanOrEqual(MAX_RATE);
    });
  }
});
