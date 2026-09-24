import { describe, expect, it } from 'vitest';
import {
  isUnitId,
  problemById,
  resolveUnit,
  staticUnitIdsFor,
  stepResult,
  topicOfId,
  workLinesBefore,
} from '../../src/lib/units';
import { makeContent, makeFlash, makeGenerator, makeProblem, withTopic } from './fixtures';

const content = makeContent({
  'diff-review': { flash: 3, generators: ['sin-kx'] },
  antiderivatives: { problems: [4] },
});

describe('resolveUnit', () => {
  it('resolves static flash items', () => {
    const u = resolveUnit('dr-f-002', content);
    expect(u?.kind).toBe('flash');
    if (u?.kind === 'flash') expect(u.item.id).toBe('dr-f-002');
  });

  it('regenerates generator instances from the seed (deterministically)', () => {
    const u = resolveUnit('dr-g-sin-kx:4242', content);
    expect(u?.kind).toBe('flash');
    if (u?.kind === 'flash') expect(u.item.id).toBe('dr-g-sin-kx:4242');
    expect(resolveUnit('dr-g-sin-kx:4242', content)).toEqual(u);
  });

  it('resolves steps of step problems', () => {
    const u = resolveUnit('ad-s-01#3', content);
    expect(u).toMatchObject({ kind: 'step', stepIndex: 3 });
    if (u?.kind === 'step') expect(u.problem.id).toBe('ad-s-01');
  });

  it('returns null for unknown, malformed, or unplayable ids', () => {
    for (const id of [
      'dr-f-999',
      'ad-s-01#4',
      'ad-s-01#-1',
      'ad-s-01#x',
      'ad-s-99#0',
      'dr-g-sin-kx:0',
      'dr-g-sin-kx:abc',
      'dr-g-nope:3',
      '',
      '#',
      ':',
    ]) {
      expect(resolveUnit(id, content), id).toBeNull();
    }
    const odd = withTopic(content, 'ibp', {
      flash: [makeFlash('ibp', 1, 3)],
      generators: [makeGenerator('ibp', 'boom', { throws: true })],
    });
    expect(resolveUnit('ip-f-001', odd)).toBeNull();
    expect(resolveUnit('ip-g-boom:1', odd)).toBeNull();
  });
});

describe('ids and helpers', () => {
  it('isUnitId accepts the three id formats only', () => {
    for (const ok of ['dr-f-001', 'ts-g-sec-sub:123', 'ad-s-01#0', 'vd-s-12#6']) expect(isUnitId(ok), ok).toBe(true);
    for (const bad of ['__proto__', 'constructor', 'dr-f-', 'dr-x-001', 'DR-f-001', 'dr-g-name', 'ad-s-01']) {
      expect(isUnitId(bad), bad).toBe(false);
    }
  });

  it('topicOfId maps id prefixes to topics', () => {
    expect(topicOfId('dr-f-001')).toBe('diff-review');
    expect(topicOfId('ts-s-01#2')).toBe('trig-sub');
    expect(topicOfId('zz-f-001')).toBeNull();
  });

  it('staticUnitIdsFor lists flash items and every step', () => {
    expect(staticUnitIdsFor(['diff-review', 'antiderivatives'], content)).toEqual([
      'dr-f-001',
      'dr-f-002',
      'dr-f-003',
      'ad-s-01#0',
      'ad-s-01#1',
      'ad-s-01#2',
      'ad-s-01#3',
    ]);
  });

  it('stepResult uses result, else the correct option; workLinesBefore accumulates', () => {
    const withResults = makeProblem('area', 1, 3);
    expect(stepResult(withResults.steps[1])).toEqual({ text: 'Result ar-s-01#1' });
    const bare = makeProblem('area', 2, 3, { omitResults: true });
    expect(stepResult(bare.steps[0])).toEqual({ latex: undefined, text: 'Correct ar-s-02#0' });
    expect(workLinesBefore(withResults, 0)).toEqual([]);
    expect(workLinesBefore(withResults, 2).map((l) => l.text)).toEqual(['Result ar-s-01#0', 'Result ar-s-01#1']);
    expect(problemById('ad-s-01', content)?.steps).toHaveLength(4);
    expect(problemById('nope', content)).toBeNull();
  });
});
