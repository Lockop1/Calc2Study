/**
 * Cards mode smoke test (phone-first, 390×844 portrait) against a production preview:
 *
 *   npm run build && npm run preview          # serves dist/ on :4173 (service worker included)
 *   node qa/cards-smoke.mjs                   # or BASE_URL=http://localhost:4173/ node qa/cards-smoke.mjs
 *
 * Checks every Cards view (filters, front, back, summary; light and dark) for: no horizontal page
 * scroll, ≥44px tap targets, grade buttons ≥52px tall / full width / in the lower half, a flip fade
 * ≤200ms, the long formulas (arc length, washers) contained in their own scroll box (also at 320px),
 * and a session that works offline after context.setOffline(true) + reload.
 * Screenshots: qa/screenshots/cards-*.png. Exit code 1 if any check fails.
 */
import { chromium } from 'playwright';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE_URL = process.env.BASE_URL ?? process.argv[2] ?? 'http://localhost:4173/';
const SHOTS = 'qa/screenshots';
const PHONE = { width: 390, height: 844 };
const GUARD_WAIT = 420; // > TAP_GUARD_MS (350): real taps right after a view change are ignored on purpose
mkdirSync(SHOTS, { recursive: true });

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok: Boolean(ok), detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
}

function chromiumCandidates() {
  const out = [];
  if (process.env.CHROMIUM_PATH) out.push(process.env.CHROMIUM_PATH);
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH ?? '/opt/pw-browsers';
  if (existsSync(root)) {
    for (const dir of readdirSync(root).sort().reverse()) {
      if (dir.startsWith('chromium_headless_shell-')) out.push(join(root, dir, 'chrome-linux', 'headless_shell'));
      if (dir.startsWith('chromium-')) out.push(join(root, dir, 'chrome-linux', 'chrome'));
    }
  }
  return out.filter((p) => existsSync(p));
}

async function launch() {
  try {
    return await chromium.launch();
  } catch (error) {
    for (const executablePath of chromiumCandidates()) {
      try {
        return await chromium.launch({ executablePath });
      } catch {
        // try the next one
      }
    }
    throw error;
  }
}

// ── page helpers ─────────────────────────────────────────────────────────────────────────────
const settle = (page) => page.waitForTimeout(GUARD_WAIT);
const shot = (page, name) => page.screenshot({ path: `${SHOTS}/cards-${name}.png` });

async function noHorizontalScroll(page, where) {
  const m = await page.evaluate(() => {
    window.scrollTo(200, window.scrollY);
    const scrolledX = window.scrollX;
    window.scrollTo(0, window.scrollY);
    return { doc: document.documentElement.scrollWidth, body: document.body.scrollWidth, vw: window.innerWidth, scrolledX };
  });
  check(`${where}: no horizontal page scroll`, m.doc <= m.vw && m.body <= m.vw && m.scrolledX === 0, `doc ${m.doc}, body ${m.body}, vw ${m.vw}`);
}

async function tapTargets(page, where) {
  const small = await page.evaluate(() =>
    Array.from(document.querySelectorAll('button, [role="switch"]'))
      .filter((el) => el.getClientRects().length > 0 && !el.closest('.visually-hidden'))
      .map((el) => ({ label: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 30), r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.height < 44 || r.width < 44)
      .map(({ label, r }) => `${label} ${Math.round(r.width)}×${Math.round(r.height)}`),
  );
  check(`${where}: tap targets ≥44px`, small.length === 0, small.join('; '));
}

async function openCards(page) {
  await page.getByRole('button', { name: /^Cards/ }).click();
  await page.getByRole('heading', { name: /Sections/ }).waitFor();
  await settle(page);
}

async function flip(page) {
  await page.locator('.flashcard').click();
  await page.locator('.flashcard[data-side="back"]').waitFor();
  await settle(page);
}

async function gradeCard(page, name) {
  await page.getByRole('button', { name, exact: true }).click();
  await settle(page);
}

async function mathBox(page, selector) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const before = el.scrollLeft;
    el.scrollLeft = 10_000;
    const scrolled = el.scrollLeft;
    el.scrollLeft = before;
    const cs = getComputedStyle(el);
    return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, overflowX: cs.overflowX, scrolled };
  }, selector);
}

/** Plays the rest of the session (Show answer → Got it) with keyboard-style clicks (detail 0, so no
 *  tap-guard waits), measuring every card's front and back. */
async function sweepSession(page) {
  return page.evaluate(async () => {
    const tick = () => new Promise((r) => setTimeout(r, 20));
    const press = (text) => {
      const b = Array.from(document.querySelectorAll('button')).find((x) => x.textContent === text);
      b?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 0 }));
    };
    const box = (sel) => {
      const el = document.querySelector(sel);
      return el ? { sw: el.scrollWidth, cw: el.clientWidth } : null;
    };
    const out = [];
    for (let i = 0; i < 80 && document.querySelector('.flashcard'); i++) {
      const id = document.querySelector('.flashcard').dataset.card;
      const front = box('.fc-front .fc-math');
      const frontDoc = document.documentElement.scrollWidth;
      press('Show answer');
      await tick();
      out.push({
        id,
        front,
        back: box('.fc-answer'),
        also: box('.fc-also .math-scroll'),
        frontDoc,
        backDoc: document.documentElement.scrollWidth,
        katex: !!document.querySelector('.fc-answer .katex'),
        errors: document.querySelectorAll('.katex-error').length,
      });
      press('Got it');
      await tick();
    }
    return { cards: out, vw: window.innerWidth };
  });
}

// ── run ──────────────────────────────────────────────────────────────────────────────────────
const browser = await launch();
try {
  // 1. Light mode, phone viewport: Home → Cards → filters → study → summary
  const ctx = await browser.newContext({ viewport: PHONE, isMobile: true, hasTouch: true, colorScheme: 'light' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE_URL);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole('button', { name: /^Cards/ }).waitFor();
  await shot(page, 'home');
  await noHorizontalScroll(page, 'home');
  const home = await page.evaluate(() => ({ scrollH: document.documentElement.scrollHeight, cards: document.querySelectorAll('.mode-btn').length }));
  check('home: four mode buttons (Flash Drill, Step-Through, Review, Cards)', home.cards === 4, `page height ${home.scrollH}px`);
  await settle(page);

  await openCards(page);
  const filters = await page.evaluate(() => ({
    chips: document.querySelectorAll('.chip').length,
    pressed: document.querySelectorAll('.chip[aria-pressed="true"]').length,
    shuffle: document.querySelector('[role="switch"]')?.getAttribute('aria-checked'),
    start: Array.from(document.querySelectorAll('button')).find((b) => /^Study \d+ cards$/.test(b.textContent ?? ''))?.textContent,
  }));
  check('filters: 9 sections, all selected, shuffle on', filters.chips === 9 && filters.pressed === 9 && filters.shuffle === 'true', JSON.stringify(filters));
  check('filters: the whole 50-card deck is selected', filters.start === 'Study 50 cards', filters.start ?? 'no start button');
  await shot(page, 'filters');
  await noHorizontalScroll(page, 'filters');
  await tapTargets(page, 'filters');

  await page.getByRole('button', { name: 'Study 50 cards' }).click();
  await page.locator('.flashcard').waitFor();
  await settle(page);
  check('front: counter reads "0 / 50 got"', (await page.locator('.cards-counter-text').textContent()) === '0 / 50 got');
  const showBox = await page.getByRole('button', { name: 'Show answer' }).boundingBox();
  check('front: "Show answer" in the lower half, ≥52px', showBox && showBox.y >= PHONE.height / 2 && showBox.height >= 52, JSON.stringify(showBox));
  check('front: no grade buttons before the flip', (await page.getByRole('button', { name: /^(Got it|Missed it)$/ }).count()) === 0);
  await shot(page, 'front');
  await noHorizontalScroll(page, 'front');
  await tapTargets(page, 'front');

  await flip(page);
  const fade = await page.evaluate(() => getComputedStyle(document.querySelector('.fc-face')).animationDuration);
  check('flip: fade ≤200ms', parseFloat(fade) * (fade.endsWith('ms') ? 1 : 1000) <= 200, fade);
  check('back: answer rendered by KaTeX', (await page.locator('.fc-answer .katex').count()) === 1);
  for (const name of ['Got it', 'Missed it']) {
    const box = await page.getByRole('button', { name, exact: true }).boundingBox();
    check(`back: "${name}" ≥52px tall, full width, lower half`, box && box.height >= 52 && box.width >= PHONE.width - 40 && box.y >= PHONE.height / 2, JSON.stringify(box));
  }
  await shot(page, 'back');
  await noHorizontalScroll(page, 'back');
  await tapTargets(page, 'back');

  await gradeCard(page, 'Missed it');
  check('grade: a miss keeps the counter at 0 / 50', (await page.locator('.cards-counter-text').textContent()) === '0 / 50 got');
  await flip(page);
  await gradeCard(page, 'Got it');
  check('grade: "Got it" counts', (await page.locator('.cards-counter-text').textContent()) === '1 / 50 got');

  // 1b. Every card of the deck, both faces: never a sideways page scroll; report what scrolls inside its box.
  //     Finish this session, then sweep a fresh 50-card one ("Study again").
  await sweepSession(page);
  await page.getByRole('heading', { name: 'Session complete' }).waitFor();
  await settle(page);
  await page.getByRole('button', { name: 'Study again' }).click();
  await page.locator('.flashcard').waitFor();
  check('"Study again" restarts the whole deck', (await page.locator('.cards-counter-text').textContent()) === '0 / 50 got');
  const sweep = await sweepSession(page);
  const over = (b) => b && b.sw > b.cw;
  check('sweep: every card of the deck shown', new Set(sweep.cards.map((c) => c.id)).size === 50, `${sweep.cards.length} cards`);
  check('sweep: no sideways page scroll on any front or back', sweep.cards.every((c) => c.frontDoc <= sweep.vw && c.backDoc <= sweep.vw));
  check('sweep: every back renders KaTeX without error boxes', sweep.cards.every((c) => c.katex && c.errors === 0));
  const scrolling = sweep.cards.filter((c) => over(c.front) || over(c.back) || over(c.also)).map((c) => c.id);
  console.log(`      at ${sweep.vw}px, formulas scrolling inside their own box: ${scrolling.length ? scrolling.join(', ') : 'none (all fit)'}`);
  await page.getByRole('heading', { name: 'Session complete' }).waitFor();
  await settle(page);
  await page.getByRole('button', { name: 'Study again' }).click();
  await page.locator('.flashcard').waitFor();
  await settle(page);

  // 2. Filters from the counter: only arc length + area & volume, deck order; check the long formulas
  await page.locator('.cards-counter').click();
  await page.getByRole('heading', { name: /Sections/ }).waitFor();
  await settle(page);
  check('counter opens the filters with Resume', (await page.getByRole('button', { name: /^Resume/ }).count()) === 1);
  await page.getByRole('button', { name: 'None', exact: true }).click();
  await page.getByRole('button', { name: 'Area & volume', exact: true }).click();
  await page.getByRole('button', { name: 'Arc length', exact: true }).click();
  await page.getByRole('switch', { name: /Shuffle/ }).click();
  await shot(page, 'filters-narrowed');
  await page.getByRole('button', { name: /^New session \(6 cards\)$/ }).click();
  await page.locator('.flashcard').waitFor();
  await settle(page);

  const seen = [];
  for (let i = 0; i < 12 && (await page.locator('.flashcard').count()) > 0; i++) {
    const id = await page.locator('.flashcard').getAttribute('data-card');
    await flip(page);
    const box = await mathBox(page, '.fc-answer');
    seen.push(`${id}: ${box.scrollWidth}/${box.clientWidth}px`);
    check(`${id}: answer contained (overflow-x ${box.overflowX}${box.scrollWidth > box.clientWidth ? ', scrolls inside its box' : ', fits'})`, box.overflowX === 'auto' && (box.scrollWidth <= box.clientWidth || box.scrolled > 0));
    await noHorizontalScroll(page, `${id} back`);
    if (id === 'card-arc-length-01') await shot(page, 'arc-length');
    if (id === 'card-area-volume-03') await shot(page, 'washer');
    // miss the first card once so the summary has a "Study missed only"
    await gradeCard(page, i === 0 ? 'Missed it' : 'Got it');
  }
  await page.getByRole('heading', { name: 'Session complete' }).waitFor();
  await settle(page);
  const stats = await page.evaluate(() => Array.from(document.querySelectorAll('.card-stat')).map((s) => s.textContent));
  check('summary: 6 got, 1 missed at least once', stats[0]?.startsWith('6') && stats[1]?.startsWith('1'), stats.join(' | '));
  await shot(page, 'summary');
  await noHorizontalScroll(page, 'summary');
  await tapTargets(page, 'summary');
  await page.getByRole('button', { name: 'Study missed only (1)' }).click();
  await page.locator('.flashcard').waitFor();
  check('"Study missed only" starts a 1-card session', (await page.locator('.cards-counter-text').textContent()) === '0 / 1 got');
  check('no page errors', errors.length === 0, errors.join('; '));
  console.log(`      long-formula widths (scrollWidth/clientWidth): ${seen.join(', ')}`);
  await ctx.close();

  // 3. Narrow phone (320px): the long formulas must scroll inside their box, never the page
  const narrow = await browser.newContext({ viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true });
  const np = await narrow.newPage();
  await np.goto(BASE_URL);
  await np.evaluate(() =>
    localStorage.setItem('calc2study:cards', JSON.stringify({ version: 1, cards: {}, filters: { sections: ['area-volume', 'arc-length'], shuffle: false, missedOnly: false } })),
  );
  await np.reload();
  await settle(np);
  await openCards(np);
  await np.getByRole('button', { name: 'Study 6 cards' }).click();
  await np.locator('.flashcard').waitFor();
  await settle(np);
  for (let i = 0; i < 6; i++) {
    const id = await np.locator('.flashcard').getAttribute('data-card');
    await flip(np);
    const box = await mathBox(np, '.fc-answer');
    if (id === 'card-arc-length-01' || id === 'card-area-volume-03') {
      check(`320px ${id}: scrolls inside its box`, box.scrollWidth <= box.clientWidth || box.scrolled > 0, `${box.scrollWidth}/${box.clientWidth}px, scrollLeft→${box.scrolled}`);
      await np.screenshot({ path: `${SHOTS}/cards-320-${id.replace('card-', '')}.png` });
    }
    await noHorizontalScroll(np, `320px ${id}`);
    await gradeCard(np, 'Got it');
  }
  await narrow.close();

  // 4. Dark mode
  const dark = await browser.newContext({ viewport: PHONE, isMobile: true, hasTouch: true, colorScheme: 'dark' });
  const dp = await dark.newPage();
  await dp.goto(BASE_URL);
  await dp.evaluate(() => localStorage.clear());
  await dp.reload();
  await settle(dp);
  await openCards(dp);
  await dp.screenshot({ path: `${SHOTS}/cards-dark-filters.png` });
  await noHorizontalScroll(dp, 'dark filters');
  await dp.getByRole('button', { name: 'Study 50 cards' }).click();
  await dp.locator('.flashcard').waitFor();
  await settle(dp);
  await flip(dp);
  const bg = await dp.evaluate(() => getComputedStyle(document.querySelector('.flashcard')).backgroundColor);
  check('dark: card uses the dark theme', bg === 'rgb(36, 36, 58)', bg);
  await dp.screenshot({ path: `${SHOTS}/cards-dark-back.png` });
  await noHorizontalScroll(dp, 'dark back');
  await dark.close();

  // 5. Offline: service worker precache, then setOffline + reload, then a session
  const off = await browser.newContext({ viewport: PHONE, isMobile: true, hasTouch: true });
  const op = await off.newPage();
  await op.goto(BASE_URL);
  await op.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await op.waitForTimeout(2500); // let the precache finish
  await off.setOffline(true);
  await op.reload();
  await op.getByRole('button', { name: /^Cards/ }).waitFor({ timeout: 10_000 });
  await settle(op);
  await openCards(op);
  await op.getByRole('button', { name: /^Study \d+ cards$/ }).click();
  await op.locator('.flashcard').waitFor();
  await settle(op);
  await flip(op);
  check('offline: KaTeX renders the back', (await op.locator('.fc-answer .katex').count()) === 1);
  await gradeCard(op, 'Got it');
  check('offline: grading works after setOffline + reload', (await op.locator('.cards-counter-text').textContent()) === '1 / 50 got');
  await op.screenshot({ path: `${SHOTS}/cards-offline.png` });
  await off.close();
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length > 0 ? 1 : 0);
