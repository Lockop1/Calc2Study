// @vitest-environment jsdom
import { sampleFlash, sampleGenerators, sampleSteps } from '@content/examples/sample';
import { TOPICS } from '@content/topics';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { contentFromSample, isContentEmpty } from '../../src/lib/content-source';
import { makeContent } from './fixtures';

const sample = { sampleFlash, sampleGenerators, sampleSteps };

async function freshContentSource(content: unknown) {
  vi.resetModules();
  vi.doMock('@content/index', () => ({ CONTENT: content }));
  return import('../../src/lib/content-source');
}

beforeEach(() => window.history.replaceState({}, '', '/'));
afterEach(() => {
  vi.doUnmock('@content/index');
  vi.resetModules();
});

describe('content helpers', () => {
  it('isContentEmpty is true only when no topic has flash items, generators, or steps', () => {
    expect(isContentEmpty(makeContent({}))).toBe(true);
    expect(isContentEmpty(makeContent({ ibp: { flash: 1 } }))).toBe(false);
    expect(isContentEmpty(makeContent({ ibp: { generators: ['g'] } }))).toBe(false);
    expect(isContentEmpty(makeContent({ ibp: { problems: [3] } }))).toBe(false);
  });

  it('contentFromSample groups the reference examples by topic in TOPICS order', () => {
    const c = contentFromSample(sample);
    expect(c.map((t) => t.topic)).toEqual(TOPICS.map((t) => t.id));
    expect(c.flatMap((t) => t.flash)).toHaveLength(sampleFlash.length);
    expect(c.flatMap((t) => t.generators)).toHaveLength(sampleGenerators.length);
    expect(c.flatMap((t) => t.steps)).toHaveLength(sampleSteps.length);
    for (const t of c) for (const f of t.flash) expect(f.topic).toBe(t.topic);
  });
});

describe('getContent (development)', () => {
  it('falls back to the sample while every topic is still empty', async () => {
    const mod = await freshContentSource(makeContent({}));
    const content = mod.getContent();
    expect(mod.usingSampleContent()).toBe(true);
    expect(content.flatMap((c) => c.flash).map((f) => f.id)).toEqual(expect.arrayContaining(sampleFlash.map((f) => f.id)));
    expect(mod.getContent()).toBe(content); // stable identity
  });

  it('uses the real content as soon as any exists', async () => {
    const real = makeContent({ area: { flash: 2 } });
    const mod = await freshContentSource(real);
    expect(mod.getContent()).toBe(real);
    expect(mod.usingSampleContent()).toBe(false);
  });

  it('?sample=1 forces the sample even when real content exists', async () => {
    window.history.replaceState({}, '', '/?sample=1');
    const mod = await freshContentSource(makeContent({ area: { flash: 2 } }));
    expect(mod.usingSampleContent()).toBe(true);
    expect(mod.getContent().flatMap((c) => c.steps).map((p) => p.id)).toEqual(sampleSteps.map((p) => p.id));
  });
});
