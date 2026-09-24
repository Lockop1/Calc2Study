import { chromium } from 'playwright';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await ctx.addInitScript(() => localStorage.setItem('calc2study:settings', JSON.stringify({ version: 1, roundSize: 20, topics: ['diff-review','antiderivatives','area','volumes-disks','volumes-shells','arc-length','ibp','trig-integrals','trig-sub'] })));
const page = await ctx.newPage();
const problems = [];
page.on('pageerror', (e) => problems.push(e.message));
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') problems.push(m.text().slice(0, 160)); });
await page.goto('http://localhost:5173/');
await page.waitForSelector('.home');
console.log('dev note (sample?):', await page.locator('.dev-note').count());
const issues = new Map();
let seen = 0;
const audit = async (label) => {
  const r = await page.evaluate(() => {
    const out = [];
    if (document.documentElement.scrollWidth > innerWidth) out.push('page h-scroll ' + document.documentElement.scrollWidth);
    for (const e of document.querySelectorAll('.katex-error')) out.push('katex-error: ' + e.textContent.slice(0, 60));
    for (const el of document.querySelectorAll('.opt, .rich, .math-scroll, .rich-display')) {
      const t = el.textContent.trim(); if (!t) continue;
      if (el.clientHeight === 0) out.push('collapsed: ' + t.slice(0, 40));
      else if (el.scrollHeight > el.clientHeight + 2) out.push(`clipped ${el.scrollHeight}>${el.clientHeight}: ` + t.slice(0, 40));
    }
    const opts = [...document.querySelectorAll('.opt')];
    if (opts.length && opts.length < 5) out.push('only ' + opts.length + ' options');
    if (opts[0] && opts[0].getBoundingClientRect().top < innerHeight / 2) out.push('first option in upper half');
    const scrollers = [...document.querySelectorAll('.math-scroll')].filter(b => b.scrollWidth > b.clientWidth + 1).length;
    return { out, id: document.querySelector('.q-card')?.textContent.slice(0, 50), scrollers };
  });
  for (const o of r.out) issues.set(o, `${label} ${r.id}`);
  return r;
};
let wideMath = 0;
for (let round = 0; round < 3; round++) {
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: /Flash Drill/ }).click();
  const notice = await page.locator('.notice').innerText().catch(() => '');
  if (await page.locator('.home').count()) { console.log('no flash content:', notice); break; }
  const total = Number((await page.locator('.topbar-meta').innerText()).split('/')[1]);
  for (let q = 0; q < total; q++) {
    await page.waitForSelector('.opt:not([disabled])');
    const a = await audit('question');
    wideMath += a.scrollers;
    seen++;
    await page.waitForTimeout(360);
    await page.locator('.opt').last().click();
    await page.waitForSelector('.feedback');
    await audit('feedback');
    await page.waitForTimeout(360);
    await page.getByRole('button', { name: /^(Next|Finish)$/ }).click();
  }
  await page.waitForSelector('.summary');
  await page.waitForTimeout(360);
  await page.getByRole('button', { name: /^Home$/ }).click();
}
console.log('questions audited:', seen, '| formulas wider than their box (scrolling inside):', wideMath);
console.log('issues:', issues.size ? [...issues.entries()] : 'none');
console.log('console/page problems:', problems.length ? problems.slice(0, 5) : 'none');
await page.screenshot({ path: 'qa/_real-last.png' });
await browser.close();
