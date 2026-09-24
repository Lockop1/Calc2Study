/**
 * The checker (mathjs) is test-time only; the app bundle must never include it, and the app must
 * never reference remote assets.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|css|html)$/.test(name)) out.push(p);
  }
  return out;
}

describe('app source hygiene', () => {
  const files = [...walk('src'), 'index.html'];
  it('never imports mathjs or the checker', () => {
    for (const f of files) {
      const src = readFileSync(f, 'utf8');
      expect(src, f).not.toMatch(/from\s+['"]mathjs['"]/);
      expect(src, f).not.toMatch(/checker\//);
    }
  });
  it('never references remote URLs (no CDN, no fetch)', () => {
    for (const f of files) {
      const src = readFileSync(f, 'utf8');
      expect(src, f).not.toMatch(/https?:\/\/(?!www\.w3\.org\/2000\/svg)/);
      expect(src, f).not.toMatch(/\bfetch\s*\(/);
      expect(src, f).not.toMatch(/XMLHttpRequest|WebSocket|navigator\.sendBeacon/);
    }
  });
  it('content files never import the checker or mathjs', () => {
    for (const f of walk('content')) {
      const src = readFileSync(f, 'utf8');
      expect(src, f).not.toMatch(/from\s+['"]mathjs['"]/);
      expect(src, f).not.toMatch(/checker\//);
    }
  });
});
