// Smoke test: serve dist/ under /Calc2Study/ (like GitHub Pages) and verify SW + offline reload.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '/home/user/Calc2Study/node_modules/playwright/index.mjs';
const dist = '/home/user/Calc2Study/dist';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };
const server = http.createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!p.startsWith('/Calc2Study/')) { res.statusCode = 404; return res.end('not under prefix'); }
  p = p.slice('/Calc2Study/'.length) || 'index.html';
  try { const data = await readFile(path.join(dist, p)); res.setHeader('Content-Type', types[path.extname(p)] || 'application/octet-stream'); res.end(data); }
  catch { res.statusCode = 404; res.end('nf'); }
});
await new Promise((r) => server.listen(5055, r));
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const failed = [];
page.on('requestfailed', (r) => failed.push(r.url()));
await page.goto('http://localhost:5055/Calc2Study/');
const scope = await page.evaluate(async () => { const reg = await navigator.serviceWorker.ready; return reg.scope; });
await page.waitForTimeout(2500); // let precache finish
const cached = await page.evaluate(async () => { const keys = await caches.keys(); let n = 0; for (const k of keys) n += (await (await caches.open(k)).keys()).length; return n; });
await ctx.setOffline(true);
await page.reload();
await page.waitForTimeout(1500);
const text = await page.evaluate(() => document.body.innerText.slice(0, 200).replace(/\s+/g, ' '));
const modes = await page.evaluate(() => document.querySelectorAll('button').length);
console.log(JSON.stringify({ scope, cached, offlineText: text, buttons: modes, failedRequests: failed }, null, 1));
await browser.close(); server.close();
