/**
 * QA: built-output audit of dist/ (run after `npm run build`).
 *   node qa/qa-audit.mjs            → prints a JSON report to stdout and writes qa/results/audit.json
 *
 * 1. Greps every text file in dist/ for remote/network patterns and prints each hit with 60 chars of
 *    context on each side. Binary files (fonts, PNGs) are scanned too and reported separately.
 * 2. Parses the Workbox precache manifest in dist/sw.js (what is precached, how many KaTeX fonts).
 * 3. Checks manifest.webmanifest (name, icons 192/512/maskable, display, start_url, scope) and the
 *    real pixel sizes of the icon PNGs.
 */
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const PATTERNS = [
  'http://',
  'https://',
  'fonts.googleapis',
  'cdn',
  'fetch(',
  'XMLHttpRequest',
  'sendBeacon',
  'WebSocket',
  '<script src="http',
];
const TEXT_EXT = new Set(['.js', '.css', '.html', '.webmanifest', '.svg', '.json', '.txt', '.map']);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(DIST).sort();
const hits = [];
for (const file of files) {
  const ext = extname(file);
  const isText = TEXT_EXT.has(ext);
  const buf = readFileSync(file);
  const s = isText ? buf.toString('utf8') : buf.toString('latin1');
  for (const pat of PATTERNS) {
    let i = s.indexOf(pat);
    while (i >= 0) {
      const ctx = s.slice(Math.max(0, i - 60), i + pat.length + 60).replace(/[\r\n\t]/g, ' ');
      hits.push({ file: relative(ROOT, file), binary: !isText, pattern: pat, offset: i, context: isText ? ctx : ctx.replace(/[^\x20-\x7e]/g, '.') });
      i = s.indexOf(pat, i + pat.length);
    }
  }
}

// ── precache manifest ───────────────────────────────────────────────────────────────────────
const sw = readFileSync(join(DIST, 'sw.js'), 'utf8');
const urls = [...sw.matchAll(/\{url:"([^"]+)",revision:(?:"[^"]*"|null)\}/g)].map((m) => m[1]);
const assetFonts = readdirSync(join(DIST, 'assets')).filter((f) => f.startsWith('KaTeX_'));
const woff2 = assetFonts.filter((f) => f.endsWith('.woff2'));
const precache = {
  count: urls.length,
  urls,
  hasIndexHtml: urls.includes('index.html'),
  js: urls.filter((u) => u.endsWith('.js')),
  css: urls.filter((u) => u.endsWith('.css')),
  woff2: urls.filter((u) => u.endsWith('.woff2')),
  woffOrTtf: urls.filter((u) => /\.(woff|ttf)$/.test(u)),
  woff2InDist: woff2.length,
  woff2NotPrecached: woff2.filter((f) => !urls.includes(`assets/${f}`)),
  navigateFallback: /createHandlerBoundToURL\("index.html"\)/.test(sw),
  skipWaiting: /skipWaiting\(\)/.test(sw),
  clientsClaim: /clientsClaim\(\)/.test(sw),
  cleanupOutdatedCaches: /cleanupOutdatedCaches\(\)/.test(sw),
  runtimeCaching: /registerRoute\(/.test(sw) ? sw.match(/registerRoute\([^;]*/g) : [],
};
// fonts referenced by the CSS: file URLs + inlined data URIs
const cssFile = readdirSync(join(DIST, 'assets')).find((f) => f.endsWith('.css'));
const css = readFileSync(join(DIST, 'assets', cssFile), 'utf8');
const fontFaces = [...css.matchAll(/@font-face\{[^}]*\}/g)].map((m) => m[0]);
const inlinedWoff2 = fontFaces
  .filter((f) => /url\(data:font\/woff2/.test(f))
  .map((f) => f.match(/font-family:([^;]+)/)?.[1] + ' ' + (f.match(/font-weight:([^;]+)/)?.[1] ?? '') + ' ' + (f.match(/font-style:([^;]+)/)?.[1] ?? ''));
precache.cssFontFaces = fontFaces.length;
precache.cssFontFacesWithInlinedWoff2 = inlinedWoff2;
const firstFormatWoff2 = fontFaces.filter((f) => /src:url\([^)]*\)\s*format\("woff2"\)/.test(f)).length;
precache.cssFontFacesListingWoff2First = firstFormatWoff2;

// ── web app manifest ────────────────────────────────────────────────────────────────────────
const manifest = JSON.parse(readFileSync(join(DIST, 'manifest.webmanifest'), 'utf8'));
function pngSize(p) {
  const b = readFileSync(p);
  if (b.toString('ascii', 1, 4) !== 'PNG') return null;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}
const icons = (manifest.icons ?? []).map((icon) => {
  const p = join(DIST, icon.src);
  const exists = existsSync(p);
  const actual = exists ? pngSize(p) : null;
  return { ...icon, exists, actual, sizeMatches: actual ? icon.sizes === `${actual.width}x${actual.height}` : false, precached: urls.includes(icon.src) };
});
const isRelative = (u) => typeof u === 'string' && !/^[a-z]+:/i.test(u) && !u.startsWith('/');
const manifestCheck = {
  manifest,
  name: Boolean(manifest.name),
  shortName: Boolean(manifest.short_name),
  display: manifest.display,
  startUrlRelative: isRelative(manifest.start_url),
  scopeRelative: isRelative(manifest.scope),
  has192: icons.some((i) => i.sizes === '192x192' && i.exists && i.sizeMatches),
  has512: icons.some((i) => i.sizes === '512x512' && (i.purpose ?? 'any').includes('any') && i.exists && i.sizeMatches),
  hasMaskable: icons.some((i) => (i.purpose ?? '').includes('maskable') && i.exists && i.sizeMatches),
  icons,
  linkedFromIndex: /<link rel="manifest" href="\.\/manifest\.webmanifest">/.test(readFileSync(join(DIST, 'index.html'), 'utf8')),
  appleTouchIcon: pngSize(join(DIST, 'icons/apple-touch-icon.png')),
};

// ── other bundle facts ───────────────────────────────────────────────────────────────────────
const jsFile = readdirSync(join(DIST, 'assets')).find((f) => /^index-.*\.js$/.test(f));
const js = readFileSync(join(DIST, 'assets', jsFile), 'utf8');
const bundle = {
  mainJs: jsFile,
  mainJsBytes: js.length,
  containsMathjs: /mathjs|typed-function|complex\.js|decimal\.js/i.test(js),
  containsChecker: /latex2math|tanhSinh|tanh-sinh/.test(js),
  containsSampleContent: /sampleFlash|sampleGenerators/.test(js),
  swRegistration: /serviceWorker\.register|workbox-window|new [A-Za-z_$]+\("\.\/sw\.js"|sw\.js/.test(js),
};

const report = { files: files.map((f) => relative(ROOT, f)), hits, precache, manifestCheck, bundle };
mkdirSync(join(ROOT, 'qa/results'), { recursive: true });
writeFileSync(join(ROOT, 'qa/results/audit.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, files: `${files.length} files` }, null, 2));
