/**
 * UI smoke test for Calc2Study (phone-first, 390×844 portrait).
 *
 *   npm run dev -- --port 5173 --host        # in another terminal
 *   node qa/ui-smoke.mjs                      # defaults to http://localhost:5173/?sample=1
 *   BASE_URL=http://localhost:4173/ node qa/ui-smoke.mjs   # e.g. a production preview with real content
 *
 * Checks every screen for: no horizontal page scroll, no KaTeX error boxes, answer buttons ≥52px
 * tall and starting in the lower half of the viewport, one-tap feedback (≤150ms) and one-tap Next,
 * Step-Through advancing after a wrong answer, the Review badge counting misses, Settings (round
 * size, two-tap reset), dark mode, other viewport sizes, blocked localStorage, and contained long
 * math. Screenshots go to qa/screenshots/ui-*.png. Exit code 1 if any check fails.
 *
 * Uses the preinstalled Chromium (never runs `playwright install`): tries the default launch, then
 * falls back to the browsers under $PLAYWRIGHT_BROWSERS_PATH (or $CHROMIUM_PATH).
 */
import { chromium } from 'playwright';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE_URL = process.env.BASE_URL ?? process.argv[2] ?? 'http://localhost:5173/?sample=1';
const SHOTS = 'qa/screenshots';
const PHONE = { width: 390, height: 844 };
mkdirSync(SHOTS, { recursive: true });

// ── results ──────────────────────────────────────────────────────────────────────────────────
const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok: Boolean(ok), detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
}

// ── browser ──────────────────────────────────────────────────────────────────────────────────
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
/** In-page instrumentation: time from pointerdown on an option to the feedback panel in the DOM. */
function instrument() {
  window.__feedbackLatencies = [];
  document.addEventListener(
    'pointerdown',
    (e) => {
      if (e.target instanceof Element && e.target.closest('.opt')) window.__tapAt = performance.now();
    },
    true,
  );
  new MutationObserver(() => {
    const panel = document.querySelector('.feedback');
    if (panel && !panel.__timed && window.__tapAt !== undefined) {
      panel.__timed = true;
      window.__feedbackLatencies.push(performance.now() - window.__tapAt);
      window.__tapAt = undefined;
    }
  }).observe(document, { childList: true, subtree: true });
}

async function newPage(browser, options = {}) {
  const context = await browser.newContext({
    viewport: options.viewport ?? PHONE,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    colorScheme: options.colorScheme ?? 'light',
  });
  if (options.initScript) await context.addInitScript(options.initScript);
  await context.addInitScript(instrument);
  const page = await context.newPage();
  const problems = [];
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') problems.push(`console.error: ${m.text()}`);
  });
  await page.goto(BASE_URL);
  await page.waitForSelector('.home');
  return { context, page, problems };
}

const settle = (page, ms = 220) => page.waitForTimeout(ms); // longer than every animation (≤150ms)

async function shot(page, name) {
  await settle(page);
  await page.screenshot({ path: `${SHOTS}/ui-${name}.png` });
}

async function layoutChecks(page, label) {
  const { scrollWidth, innerWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  check(`${label}: no horizontal page scroll`, scrollWidth <= innerWidth, `scrollWidth ${scrollWidth} ≤ ${innerWidth}`);
  const errors = await page.locator('.katex-error').count();
  check(`${label}: no KaTeX errors`, errors === 0, `${errors} .katex-error`);
  const bad = await page.evaluate(() => {
    const text = document.body.innerText;
    return ['undefined', 'NaN', '[object Object]'].filter((s) => text.includes(s));
  });
  check(`${label}: no undefined/NaN/[object Object] text`, bad.length === 0, bad.join(', '));
}

async function optionChecks(page, label) {
  const info = await page.evaluate(() => {
    const rects = [...document.querySelectorAll('.opt')].map((e) => e.getBoundingClientRect());
    const list = document.querySelector('.answers');
    return {
      vh: window.innerHeight,
      count: rects.length,
      minHeight: Math.min(...rects.map((r) => r.height)),
      firstTop: rects[0]?.top ?? -1,
      listScrolls: list ? getComputedStyle(list).overflowY : '',
      empty: [...document.querySelectorAll('.opt-body')].filter((e) => !e.textContent.trim()).length,
    };
  });
  check(`${label}: ≥5 options`, info.count >= 5, `${info.count} options`);
  check(`${label}: options ≥52px tall (≥44px tap target)`, info.minHeight >= 52, `min ${info.minHeight.toFixed(1)}px`);
  check(`${label}: first option starts in the lower half`, info.firstTop >= info.vh / 2, `top ${info.firstTop.toFixed(0)} / ${info.vh}`);
  check(`${label}: option list scrolls within itself`, info.listScrolls === 'auto', `overflow-y ${info.listScrolls}`);
  check(`${label}: no empty options`, info.empty === 0, `${info.empty} empty`);
}

const counter = (page) => page.locator('.topbar-meta').innerText();
const badgeCount = async (page) =>
  (await page.locator('.badge').count()) ? Number(await page.locator('.badge').innerText()) : 0;
const nextButton = (page) => page.getByRole('button', { name: /^(Next|Finish)$/ });

/** Taps the last option (a wrong one ~80% of the time). Returns true when the answer was wrong. */
async function tapAnswer(page) {
  await page.locator('.opt').last().tap();
  await page.waitForSelector('.feedback');
  return (await page.locator('.opt--wrong').count()) > 0;
}

async function tapAllCorrectOrFirst(page) {
  await page.locator('.opt').first().tap();
  await page.waitForSelector('.feedback');
}

// ── scenarios ────────────────────────────────────────────────────────────────────────────────
async function mainFlow(browser) {
  const { context, page, problems } = await newPage(browser);

  // Home
  await layoutChecks(page, 'Home');
  const chips = await page.locator('.chip').evaluateAll((els) => els.map((e) => e.getAttribute('aria-pressed')));
  check('Home: 9 topic chips, all selected by default', chips.length === 9 && chips.every((p) => p === 'true'), chips.join(','));
  const tapTargets = await page.evaluate(() =>
    [...document.querySelectorAll('button')].map((b) => b.getBoundingClientRect()).filter((r) => r.height < 44 || r.width < 44).length,
  );
  check('Home: every button is ≥44×44px', tapTargets === 0, `${tapTargets} too small`);
  const badgeBefore = await badgeCount(page);
  check('Home: Review badge starts at 0 on a fresh device', badgeBefore === 0, `badge ${badgeBefore}`);
  await shot(page, 'home');

  // Flash Drill
  await page.getByRole('button', { name: /Flash Drill/ }).tap();
  await page.waitForSelector('.opt');
  const total = Number((await counter(page)).split('/')[1]);
  check('Flash: round has questions', total > 0, `counter ${await counter(page)}`);
  await layoutChecks(page, 'Flash question');
  await optionChecks(page, 'Flash question');
  await shot(page, 'flash-question');

  let misses = 0;
  let wrongShot = false;
  for (let q = 1; q <= total; q++) {
    check(`Flash: counter shows ${q}/${total}`, (await counter(page)) === `${q}/${total}`, await counter(page));
    const wrong = await tapAnswer(page);
    const disabled = await page.locator('.opt').evaluateAll((els) => els.every((e) => e.disabled));
    if (q === 1) check('Flash: options are disabled after answering (no double answers)', disabled);
    const green = await page.locator('.opt--correct').count();
    if (q === 1) check('Flash: the correct option turns green', green === 1, `${green} green`);
    if (wrong) {
      misses++;
      if (!wrongShot) {
        wrongShot = true;
        const title = await page.locator('.feedback-title').innerText();
        const mistake = await page.locator('.feedback-mistake').count();
        const why = await page.locator('.feedback-why').count();
        check('Flash wrong: chosen option turns red', (await page.locator('.opt--wrong').count()) === 1);
        check('Flash wrong: feedback says "Not quite" with mistake label + why', title.includes('Not quite') && mistake === 1 && why === 1);
        const nextBox = await nextButton(page).boundingBox();
        check('Flash: Next button ≥52px tall, at the bottom', nextBox && nextBox.height >= 52 && nextBox.y > PHONE.height * 0.75, `h ${nextBox?.height} y ${nextBox?.y}`);
        await layoutChecks(page, 'Flash feedback');
        await shot(page, 'flash-feedback');
      }
    } else if (q === 1) {
      check('Flash right: feedback says "Correct"', (await page.locator('.feedback-title').innerText()).includes('Correct'));
    }
    await nextButton(page).tap();
    if (q < total) {
      await page.waitForSelector('.opt:not([disabled])');
      if (q === 1) {
        check('Flash: one tap on Next shows the next question immediately', (await counter(page)) === `2/${total}` && (await page.locator('.feedback').count()) === 0);
      }
    }
  }
  const latencies = await page.evaluate(() => window.__feedbackLatencies);
  const worst = Math.max(...latencies);
  check('Flash: feedback appears ≤150ms after the tap', worst <= 150, `worst ${worst.toFixed(1)}ms over ${latencies.length} taps`);

  // Summary
  await page.waitForSelector('.summary');
  await layoutChecks(page, 'Summary');
  const score = await page.locator('.score').innerText();
  check('Summary: shows the score', score.replace(/\s/g, '') === `${total - misses}/${total}`, score.replace(/\s/g, ''));
  if (misses > 0) {
    check('Summary: lists missed topics', (await page.locator('.missed-item').count()) >= 1);
    check('Summary: offers "Review misses"', (await page.getByRole('button', { name: /Review misses/ }).count()) === 1);
  }
  await shot(page, 'summary');

  // Review badge
  await page.getByRole('button', { name: /^Home$/ }).tap();
  await page.waitForSelector('.home');
  const badgeAfter = await badgeCount(page);
  check('Home: Review badge increments after a miss', misses === 0 || badgeAfter === badgeBefore + misses, `${badgeBefore} → ${badgeAfter} (${misses} missed)`);

  // Step-Through
  await page.getByRole('button', { name: /Step-Through/ }).tap();
  await page.waitForSelector('.opt');
  await layoutChecks(page, 'Step question');
  await optionChecks(page, 'Step question');
  await shot(page, 'steps-question');
  let advancedAfterWrong = false;
  let stepMisses = 0;
  for (let guard = 0; guard < 60; guard++) {
    if (await page.locator('.summary').count()) break;
    if (await page.locator('.final-card').count()) {
      const recap = (await page.locator('.final-recap').innerText()).trim();
      check('Step final: answer and recap shown', recap.length > 0 && (await page.locator('.final-card .katex').count()) > 0);
      await layoutChecks(page, 'Step final');
      await shot(page, 'steps-final');
      await page.locator('.dock-actions button').tap();
      continue;
    }
    const workBefore = await page.locator('.work-line').count();
    const stepBefore = Number((await counter(page)).split('/')[0]);
    const wrong = await tapAnswer(page);
    const revealed = await page.locator('.feedback-answer').count();
    if (wrong) stepMisses++;
    if (wrong && !advancedAfterWrong) {
      check('Step wrong: feedback shows mistake + "Correct step:"', revealed === 1 && (await page.locator('.feedback-mistake').count()) === 1);
      await shot(page, 'steps-feedback');
    }
    await nextButton(page).tap();
    await settle(page, 60);
    const final = (await page.locator('.final-card').count()) > 0;
    const workAfter = await page.locator('.work-line').count();
    if (wrong && !advancedAfterWrong) {
      const stepAfter = Number((await counter(page)).split('/')[0]);
      advancedAfterWrong = true;
      check(
        'Step-Through advances after a wrong answer (correct step appended to Work so far)',
        workAfter === workBefore + 1 && (final || stepAfter === stepBefore + 1),
        `work ${workBefore} → ${workAfter}, step ${stepBefore} → ${final ? 'final' : stepAfter}`,
      );
      await shot(page, 'steps-advanced');
    }
  }
  check('Step-Through: saw at least one wrong answer to test advancing', advancedAfterWrong);
  await page.waitForSelector('.summary');
  await page.getByRole('button', { name: /^Home$/ }).tap();
  await page.waitForSelector('.home');
  const badgeSteps = await badgeCount(page);
  check('Home: Review badge counts missed steps too', badgeSteps === badgeAfter + stepMisses, `${badgeAfter} → ${badgeSteps}`);

  // Review
  await page.getByRole('button', { name: /Review/ }).tap();
  await page.waitForSelector('.opt');
  await layoutChecks(page, 'Review question');
  await optionChecks(page, 'Review question');
  check('Review: title is "Review"', (await page.locator('.topbar-title').innerText()) === 'Review');
  await shot(page, 'review');
  const reviewTotal = Number((await counter(page)).split('/')[1]);
  for (let i = 0; i < reviewTotal; i++) {
    await tapAllCorrectOrFirst(page);
    await nextButton(page).tap();
  }
  await page.waitForSelector('.summary');
  check('Review: round ends in a summary', true);

  // Settings
  await page.getByRole('button', { name: /^Home$/ }).tap();
  await page.getByRole('button', { name: 'Settings' }).tap();
  await page.waitForSelector('.settings');
  await layoutChecks(page, 'Settings');
  await page.getByRole('button', { name: '5', exact: true }).tap();
  check('Settings: round size 5 selected', (await page.getByRole('button', { name: '5', exact: true }).getAttribute('aria-pressed')) === 'true');
  check('Settings: storage status line', (await page.getByText('Progress is saved on this device.').count()) === 1);
  await page.getByRole('button', { name: 'Reset progress' }).tap();
  await shot(page, 'settings-confirm');
  await page.getByRole('button', { name: 'Tap again to erase' }).tap();
  check('Settings: reset needs a second tap and then confirms', (await page.getByText('Progress cleared.').count()) === 1);
  await shot(page, 'settings');
  await page.getByRole('button', { name: 'Home' }).tap();
  await page.waitForSelector('.home');
  check('Home: badge cleared after reset', (await badgeCount(page)) === 0);
  await page.getByRole('button', { name: /Flash Drill/ }).tap();
  await page.waitForSelector('.opt');
  const smallTotal = Number((await counter(page)).split('/')[1]);
  check('Settings: round size applies to the next round', smallTotal <= 5, `counter ${await counter(page)}`);

  // Long math stays inside its own scroll box
  // Simulate an unbreakable formula far wider than the phone (e.g. a huge fraction): KaTeX never
  // breaks inside a `.base`, so growing one base to 2× the container width forces overflow there.
  // Done on every question of this round so display math, option math and inline math all get hit.
  const growMath = () => {
    const found = {
      display: document.querySelector('.q-card .math-scroll'),
      option: document.querySelector('.opt .math-scroll'),
      text: document.querySelector('.q-card .rich-math')?.closest('.rich') ?? null,
    };
    const scrolls = {};
    for (const [kind, box] of Object.entries(found)) {
      if (!box) continue;
      const base = box.querySelector('.katex-html .base');
      const parts = [...base.childNodes];
      for (let i = 0; i < 400 && base.getBoundingClientRect().width < 2 * box.clientWidth; i++) {
        for (const part of parts) base.appendChild(part.cloneNode(true));
      }
      scrolls[kind] = box.scrollWidth > box.clientWidth + 20 && getComputedStyle(box).overflowX === 'auto';
    }
    return {
      scrolls,
      pageOk: document.documentElement.scrollWidth <= window.innerWidth,
      optionsFit: [...document.querySelectorAll('.opt')].every((o) => o.getBoundingClientRect().right <= window.innerWidth),
    };
  };
  const tested = new Set();
  let containmentOk = true;
  let containmentDetail = '';
  for (let i = 0; i < smallTotal; i++) {
    const r = await page.evaluate(growMath);
    for (const [kind, ok] of Object.entries(r.scrolls)) {
      tested.add(kind);
      if (!ok) containmentOk = false;
    }
    if (!r.pageOk || !r.optionsFit) containmentOk = false;
    containmentDetail = `tested ${[...tested].join('+') || 'nothing'}; last page ok ${r.pageOk}, options fit ${r.optionsFit}`;
    if (i === 0) await shot(page, 'long-math');
    if (i < smallTotal - 1) {
      await tapAnswer(page);
      await nextButton(page).tap();
      await page.waitForSelector('.opt:not([disabled])');
    }
  }
  check(
    'Long math scrolls inside its own container, never the page',
    containmentOk && tested.has('display') && tested.has('option'),
    containmentDetail,
  );

  check('Main flow: no page errors or console errors', problems.length === 0, problems.slice(0, 3).join(' | '));
  await context.close();
}

async function darkMode(browser) {
  const { context, page, problems } = await newPage(browser, { colorScheme: 'dark' });
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  check('Dark mode: dark background', bg === 'rgb(26, 26, 46)', bg);
  await shot(page, 'dark-home');
  await page.getByRole('button', { name: /Flash Drill/ }).tap();
  await page.waitForSelector('.opt');
  await tapAnswer(page);
  await layoutChecks(page, 'Dark flash feedback');
  await shot(page, 'dark-flash-feedback');
  check('Dark mode: no page errors', problems.length === 0, problems.join(' | '));
  await context.close();
}

async function otherViewports(browser) {
  for (const viewport of [
    { width: 320, height: 568 },
    { width: 844, height: 390 },
    { width: 768, height: 1024 },
    { width: 1280, height: 800 },
  ]) {
    const label = `${viewport.width}×${viewport.height}`;
    const { context, page } = await newPage(browser, { viewport });
    await layoutChecks(page, `${label} home`);
    await page.getByRole('button', { name: /Step-Through/ }).tap();
    await page.waitForSelector('.opt');
    await layoutChecks(page, `${label} step question`);
    const top = await page.locator('.opt').first().boundingBox();
    check(`${label}: first option in the lower half`, top && top.y >= viewport.height / 2, `y ${top?.y}`);
    await tapAnswer(page);
    await layoutChecks(page, `${label} step feedback`);
    const next = await nextButton(page).boundingBox();
    check(`${label}: Next button visible`, next && next.y + next.height <= viewport.height + 1, `y ${next?.y}`);
    await shot(page, `vp-${viewport.width}x${viewport.height}`);
    await context.close();
  }
}

async function blockedStorage(browser) {
  const { context, page, problems } = await newPage(browser, {
    initScript: () => {
      Storage.prototype.setItem = () => {
        throw new DOMException('The quota has been exceeded.', 'QuotaExceededError');
      };
    },
  });
  await page.getByRole('button', { name: /Flash Drill/ }).tap();
  await page.waitForSelector('.opt');
  await tapAnswer(page);
  await nextButton(page).tap();
  await page.getByRole('button', { name: 'Home' }).tap();
  await page.getByRole('button', { name: 'Settings' }).tap();
  const status = await page.getByText(/Storage is unavailable/).count();
  check('Blocked localStorage: app still works and says storage is unavailable', status === 1 && problems.length === 0, problems.join(' | '));
  await context.close();
}

// ── main ─────────────────────────────────────────────────────────────────────────────────────
const browser = await launch();
try {
  console.log(`Calc2Study UI smoke test → ${BASE_URL}\n`);
  for (const scenario of [mainFlow, darkMode, otherViewports, blockedStorage]) {
    try {
      await scenario(browser);
    } catch (error) {
      check(`${scenario.name}: completed without exceptions`, false, String(error?.message ?? error).split('\n')[0]);
    }
  }
} finally {
  await browser.close();
}
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
if (failed.length) {
  console.log('Failed:');
  for (const f of failed) console.log(`  - ${f.name}${f.detail ? ` (${f.detail})` : ''}`);
  process.exitCode = 1;
}
