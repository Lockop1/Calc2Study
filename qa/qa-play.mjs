/**
 * Independent QA pass for Calc2Study (qa-tester). Playwright + the preinstalled Chromium under
 * /opt/pw-browsers (never runs `playwright install`). Phone context everywhere: 390×844, isMobile,
 * hasTouch, deviceScaleFactor 2.
 *
 *   npm run build && npm run preview           # production build served on :4173 (keep it running)
 *   npx tsx qa/qa-content.ts                   # writes qa/results/units.json (answer key, see below)
 *   node qa/qa-play.mjs [scenario ...]         # default: every scenario, in the order listed below
 *
 * Scenarios: home flash steps review settings dark storage perf weighting offline offline-hard
 *            sweep-steps sweep-flash longmath
 * Output: qa/results/play-<scenario>.json (checks, metrics, console errors), qa/results/layout.json,
 *         screenshots qa/screenshots/qa-*.png. Exit code 1 when any check fails.
 *
 * Answer oracle: the DOM never reveals the correct option before an answer. To answer right or
 * wrong on purpose, the script rebuilds each displayed question's source from the rendered DOM
 * (text nodes + KaTeX <annotation encoding="application/x-tex">) and looks it up in
 * qa/results/units.json. Generator instances with random seeds are not in the key; for those the
 * script taps the last option. The same key lets the script verify that the option the UI marks
 * green is the content's `correct` option.
 *
 * User-like taps wait 420 ms first: the app ignores pointer taps within 350 ms of a control
 * appearing (double-tap guard). The two sweeps use keyboard digits + programmatic clicks (detail 0,
 * which the guard lets through) to cover every unit quickly.
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const BASE = process.env.BASE_URL ?? 'http://localhost:4173/';
const SHOTS = 'qa/screenshots';
const RESULTS = 'qa/results';
const PHONE = { width: 390, height: 844 };
const GUARD_WAIT = 420;
const TOPIC_IDS = ['diff-review', 'antiderivatives', 'area', 'volumes-disks', 'volumes-shells', 'arc-length', 'ibp', 'trig-integrals', 'trig-sub'];
const SHORT = {
  Derivatives: 'diff-review', 'u-sub': 'antiderivatives', Area: 'area', 'Disks/washers': 'volumes-disks', Shells: 'volumes-shells',
  'Arc length': 'arc-length', IBP: 'ibp', 'Trig integrals': 'trig-integrals', 'Trig sub': 'trig-sub',
};
const TITLE = {
  'Differentiation review': 'diff-review', 'Antiderivatives & u-substitution': 'antiderivatives', 'Area between curves': 'area',
  'Volumes: slicing, disks & washers': 'volumes-disks', 'Volumes: cylindrical shells & method selection': 'volumes-shells',
  'Arc length': 'arc-length', 'Integration by parts': 'ibp', 'Trigonometric integrals': 'trig-integrals', 'Trigonometric substitution': 'trig-sub',
};
// Content text that legitimately contains the word "undefined" (found by qa/qa-content.ts).
const SHOT_ONCE = new Set();
const PENDING_SHOT = [];
const LEGIT_UNDEFINED = [/is undefined at/, /is undefined for/, /ln u is undefined/, /where ln u is undefined/];

mkdirSync(SHOTS, { recursive: true });
mkdirSync(RESULTS, { recursive: true });
const UNITS = JSON.parse(readFileSync(`${RESULTS}/units.json`, 'utf8'));
const BY_KEY = new Map();
for (const u of UNITS) if (!BY_KEY.has(u.key)) BY_KEY.set(u.key, u);
const BY_ID = new Map(UNITS.map((u) => [u.id, u]));

// ── result bookkeeping ───────────────────────────────────────────────────────────────────────
let current = null;
let activePage = null;
const LAYOUT = existsSync(`${RESULTS}/layout.json`) ? JSON.parse(readFileSync(`${RESULTS}/layout.json`, 'utf8')) : {};
function check(name, ok, detail = '') {
  current.checks.push({ name, ok: Boolean(ok), detail: String(detail) });
  console.log(`${ok ? 'PASS' : 'FAIL'} [${current.name}] ${name}${detail !== '' ? ` — ${detail}` : ''}`);
}
function metric(key, value) {
  current.metrics[key] = value;
}
function agg(name, ok, detail = '') {
  const a = (current.agg[name] ??= { pass: 0, fail: 0, examples: [] });
  if (ok) a.pass++;
  else {
    a.fail++;
    if (a.examples.length < 6) a.examples.push(String(detail));
  }
}
function aggFlush() {
  for (const [name, a] of Object.entries(current.agg)) {
    check(name, a.fail === 0, `${a.pass}/${a.pass + a.fail} ok${a.fail ? `; failures e.g.: ${a.examples.join(' || ')}` : ''}`);
  }
  current.agg = {};
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/** Waits for running CSS transitions/animations (option colours 120ms, feedback slide-in). */
const settle = (page) =>
  page.evaluate(() => Promise.race([Promise.all(document.getAnimations().map((a) => a.finished.catch(() => null))), new Promise((r) => setTimeout(r, 1500))]));
const pct = (xs, p) => {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  return +s[Math.min(s.length - 1, Math.ceil((p / 100) * s.length) - 1)].toFixed(1);
};

// ── browser & context ────────────────────────────────────────────────────────────────────────
async function launch() {
  const candidates = [
    process.env.CHROMIUM_PATH,
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  ].filter((p) => p && existsSync(p));
  for (const executablePath of candidates) {
    try {
      return await chromium.launch({ executablePath });
    } catch {
      // next
    }
  }
  return chromium.launch();
}

/** In-page helpers (serialized into every page with addInitScript; must be self-contained). */
function qaInit() {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const ann = (el) => {
    const a = el && el.querySelector('annotation[encoding="application/x-tex"]');
    return a ? a.textContent : '\u0000NOANN';
  };
  const richSource = (el) => {
    let s = '';
    for (const n of el.childNodes) {
      if (n.nodeType === Node.TEXT_NODE) s += n.textContent;
      else if (n.classList && n.classList.contains('rich-math')) s += `$${ann(n)}$`;
      else if (n.classList && n.classList.contains('rich-display')) s += `$$${ann(n)}$$`;
      else s += n.textContent;
    }
    return s;
  };
  const texSource = (el) => {
    const a = ann(el);
    return a.startsWith('\\displaystyle ') ? a.slice('\\displaystyle '.length) : a;
  };
  const contentSource = (el) => {
    let s = '';
    for (const c of el.children) {
      if (c.classList.contains('rich')) s += `T:${richSource(c)}`;
      else if (c.classList.contains('math-scroll')) s += `L:${texSource(c)}`;
    }
    return s;
  };
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1), left: +r.left.toFixed(1), right: +r.right.toFixed(1), height: +r.height.toFixed(1), width: +r.width.toFixed(1) };
  };
  const visibleFraction = (el, container) => {
    if (!el || !container) return null;
    const a = el.getBoundingClientRect();
    const b = container.getBoundingClientRect();
    const top = Math.max(a.top, b.top, 0);
    const bottom = Math.min(a.bottom, b.bottom, window.innerHeight);
    return a.height > 0 ? +Math.max(0, (bottom - top) / a.height).toFixed(2) : 0;
  };
  function read() {
    const out = { vw: window.innerWidth, vh: window.innerHeight };
    out.screen = $('.home') ? 'home' : $('.summary') ? 'summary' : $('.settings') ? 'settings' : $('.final-card') ? 'final' : $('.answers') ? 'question' : $('.page--center') ? 'empty' : 'unknown';
    out.counter = $('.topbar-meta')?.textContent ?? null;
    out.title = $('.topbar-title')?.textContent ?? null;
    const qcard = $('.q-card');
    out.qKind = qcard ? $('.q-kind', qcard)?.textContent ?? null : null;
    const stepPrompt = $('.step-prompt');
    if ($('.q-title')) {
      out.isStep = true;
      out.problemTitle = $('.q-title').textContent;
      out.promptSig = `P:${$('.q-title').textContent}|S:${stepPrompt ? richSource($('.step-q', stepPrompt)) : ''}`;
      out.stepLabel = stepPrompt ? $('.section-label', stepPrompt)?.textContent : null;
      out.workLines = $$('.work-line').map(contentSource);
      out.workEmpty = Boolean($('.work-empty'));
      out.stepPromptVisible = stepPrompt ? visibleFraction(stepPrompt, $('.stage')) : null;
    } else if (qcard) {
      out.isStep = false;
      const c = $('.q-context', qcard);
      const le = $('.q-lead', qcard);
      const t = $('.q-text', qcard);
      const m = $('.q-math', qcard);
      out.promptSig = (c ? `C:${richSource(c)}` : '') + (le ? `Le:${richSource(le)}` : '') + (t ? `T:${richSource(t)}` : '') + (m ? `M:${ann(m)}` : '');
    }
    const answers = $('.answers');
    out.answers = rect(answers);
    out.options = $$('.opt').map((b) => {
      const body = $('.opt-body', b);
      const r = b.getBoundingClientRect();
      const inner = $$('.math-scroll, .rich', body).map((e) => e.scrollWidth - e.clientWidth);
      return {
        source: contentSource(body),
        text: body.innerText.trim(),
        state: b.dataset.state,
        disabled: b.disabled,
        top: +r.top.toFixed(1),
        bottom: +r.bottom.toFixed(1),
        height: +r.height.toFixed(1),
        right: +r.right.toFixed(1),
        overflowX: b.scrollWidth - b.clientWidth,
        bodyOverflowX: body.scrollWidth - body.clientWidth,
        innerScrollX: inner.length ? Math.max(...inner) : 0,
        empty: !body.textContent.trim() || Boolean($('[aria-label="empty option"]', body)),
        border: getComputedStyle(b).borderTopColor,
        visible: visibleFraction(b, answers),
      };
    });
    const fb = $('.feedback');
    out.feedback = fb
      ? {
          ok: fb.classList.contains('feedback--ok'),
          title: $('.feedback-title', fb)?.innerText.trim(),
          mistake: $('.feedback-mistake', fb)?.innerText.trim() ?? null,
          why: $('.feedback-why', fb)?.innerText.trim() ?? null,
          expl: $('.feedback-expl', fb)?.innerText.trim() ?? null,
          answer: $('.feedback-answer-body', fb) ? contentSource($('.feedback-answer-body', fb)) : null,
          nextLabel: $('.btn-next', fb)?.innerText.trim(),
          next: rect($('.btn-next', fb)),
          rect: rect(fb),
        }
      : null;
    const final = $('.final-card');
    out.final = final
      ? { latex: ann($('.q-math', final)), recap: $('.final-recap', final)?.innerText.trim() ?? '', button: $('.dock-actions .btn')?.innerText.trim(), buttonRect: rect($('.dock-actions .btn')), workLines: $$('.work-line').map(contentSource) }
      : null;
    const sum = $('.summary');
    out.summary = sum
      ? {
          label: $('.section-label', sum)?.innerText.trim(),
          score: $('.score', sum)?.getAttribute('aria-label'),
          scoreText: $('.score', sum)?.innerText.replace(/\s+/g, ''),
          line: $('header .muted', sum)?.innerText.trim(),
          missed: $$('.missed-item', sum).map((li) => ({ name: $('.missed-name', li).innerText.trim(), count: Number($('.missed-count', li).innerText) })),
          noMisses: Boolean([...sum.querySelectorAll('p.muted')].find((p) => /No misses/.test(p.textContent))),
          buttons: $$('.actions button', sum).map((b) => b.innerText.trim()),
        }
      : null;
    const home = $('.home');
    out.home = home
      ? {
          chips: $$('.chip').map((c) => ({ label: c.getAttribute('aria-label'), pressed: c.getAttribute('aria-pressed') === 'true' })),
          count: $('#topics-heading .muted')?.innerText.trim(),
          badge: $('.badge') ? Number($('.badge').innerText) : 0,
          notice: $('.notice')?.innerText.trim() ?? '',
          modes: $$('.mode-btn').map((b) => ({ title: $('.mode-title', b)?.childNodes[0]?.textContent, sub: $('.mode-sub', b)?.innerText.trim(), empty: b.classList.contains('mode-btn--empty') })),
        }
      : null;
    const settings = $('.settings');
    out.settings = settings
      ? {
          sizes: $$('.segmented button').map((b) => ({ n: Number(b.innerText), pressed: b.getAttribute('aria-pressed') === 'true' })),
          texts: $$('p', settings).map((p) => p.innerText.trim()).filter(Boolean),
          confirm: $$('.confirm-row button').map((b) => b.innerText.trim()),
          reset: Boolean($('.btn-danger-outline')),
        }
      : null;
    out.katexErrors = $$('.katex-error').map((e) => e.textContent.slice(0, 100));
    out.docScrollW = document.documentElement.scrollWidth;
    out.bodyScrollW = document.body.scrollWidth;
    out.docScrollTop = document.scrollingElement ? document.scrollingElement.scrollTop : 0;
    const sq = $('.screen-q');
    out.screenQScrollTop = sq ? sq.scrollTop : null;
    out.topbarTop = $('.topbar') ? $('.topbar').getBoundingClientRect().top : null;
    const text = document.body.innerText;
    out.badText = [...text.matchAll(/.{0,50}(undefined|NaN|\[object Object\]).{0,50}/g)].map((m) => m[0]);
    out.emptyText = $$('.opt-body, .q-card, .feedback-expl, .final-recap, .step-q').filter((e) => !e.textContent.trim()).map((e) => e.className);
    out.hClipped = [];
    out.hScroll = [];
    out.vClipped = [];
    for (const el of $$('.stage, .answers, .feedback, .feedback-body, .q-card, .work, .work-line, .opt, .opt-body, .final-card, .step-prompt, .feedback-answer-body, .math-scroll, .rich, .rich-display, .summary, .settings, .home, .chips, .modes')) {
      const cs = getComputedStyle(el);
      const ox = el.scrollWidth - el.clientWidth;
      const oy = el.scrollHeight - el.clientHeight;
      const label = `${el.className.toString().slice(0, 40)}: ${el.textContent.trim().slice(0, 50)}`;
      if (ox > 1) {
        if (cs.overflowX === 'auto' || cs.overflowX === 'scroll') out.hScroll.push({ label, ox, cw: el.clientWidth, inOpt: Boolean(el.closest('.opt')), inStage: Boolean(el.closest('.stage')), inFeedback: Boolean(el.closest('.feedback')) });
        else out.hClipped.push({ label, ox, overflowX: cs.overflowX });
      }
      if (oy > 2 && el.matches('.math-scroll, .rich, .rich-display') && cs.overflowY !== 'visible') out.vClipped.push({ label, oy, ch: el.clientHeight });
    }
    return out;
  }
  function contrast() {
    const parse = (c) => {
      const m = /rgba?\(([^)]+)\)/.exec(c);
      if (!m) return null;
      const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    };
    const over = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
    const lum = ({ r, g, b }) => {
      const f = (v) => {
        const x = v / 255;
        return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const bgOf = (el) => {
      const layers = [];
      for (let e = el; e; e = e.parentElement) {
        const c = parse(getComputedStyle(e).backgroundColor);
        if (c && c.a > 0) {
          layers.push(c);
          if (c.a >= 1) break;
        }
      }
      let base = layers.length && layers[layers.length - 1].a >= 1 ? layers.pop() : { r: 255, g: 255, b: 255, a: 1 };
      for (let i = layers.length - 1; i >= 0; i--) base = over(layers[i], base);
      return base;
    };
    const opacityOf = (el) => {
      let o = 1;
      for (let e = el; e; e = e.parentElement) o *= Number(getComputedStyle(e).opacity);
      return o;
    };
    const sels = ['.home-title', '.home .muted', '.chip[aria-pressed="true"] .chip-label', '.chip[aria-pressed="false"] .chip-label', '.mode-title', '.mode-sub', '.badge', '.topbar-title', '.topbar-meta', '.q-kind', '.q-card .rich', '.q-card .katex', '.q-title', '.work-line .katex', '.work-empty', '.step-q', '.opt--idle .katex', '.opt--idle .rich', '.opt--correct .katex', '.opt--correct .rich', '.opt--wrong .katex', '.opt--wrong .rich', '.opt--dim .katex', '.opt--dim .rich', '.feedback-title', '.feedback-mistake', '.feedback-why', '.feedback-expl', '.feedback-answer-label', '.btn-next', '.final-card .katex', '.final-recap', '.score', '.summary .muted', '.missed-name', '.settings .small', '.settings .muted', '.segmented button[aria-pressed="true"]', '.segmented button[aria-pressed="false"]', '.btn-danger-outline', '.btn-primary'];
    const out = [];
    for (const s of sels) {
      const el = document.querySelector(s);
      if (!el) continue;
      const cs = getComputedStyle(el);
      const fg = parse(cs.color);
      const bg = bgOf(el);
      const o = opacityOf(el);
      const eff = over({ ...fg, a: fg.a * o }, bg);
      const l1 = lum(eff);
      const l2 = lum(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const size = parseFloat(cs.fontSize);
      const bold = Number(cs.fontWeight) >= 700;
      const large = size >= 24 || (bold && size >= 18.66);
      out.push({ sel: s, color: cs.color, bg: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`, opacity: +o.toFixed(2), ratio: +ratio.toFixed(2), size, bold, need: large ? 3 : 4.5 });
    }
    return out;
  }
  window.__qa = { read, contrast, ann, richSource, contentSource };
  // latency instrumentation: pointerdown on an option → feedback in DOM (+ next frame);
  // pointerdown on Next → the next question's options in DOM (+ next frame)
  window.__lat = { tapToFeedback: [], tapToFeedbackFrame: [], nextToQuestion: [], nextToQuestionFrame: [] };
  document.addEventListener(
    'pointerdown',
    (e) => {
      const t = e.target instanceof Element ? e.target : null;
      if (!t) return;
      const opt = t.closest('.opt');
      if (opt && !opt.disabled && !document.querySelector('.feedback')) window.__tapOpt = performance.now();
      if (t.closest('.btn-next')) {
        window.__tapNext = performance.now();
        window.__oldQ = document.querySelector('.screen-q');
      }
    },
    true,
  );
  const obs = new MutationObserver(() => {
    const now = performance.now();
    if (window.__tapOpt !== undefined && document.querySelector('.feedback')) {
      const t0 = window.__tapOpt;
      window.__tapOpt = undefined;
      window.__lat.tapToFeedback.push(now - t0);
      requestAnimationFrame(() => requestAnimationFrame(() => window.__lat.tapToFeedbackFrame.push(performance.now() - t0)));
    }
    if (document.querySelector('.summary')) window.__tapNext = undefined;
    const q = document.querySelector('.screen-q');
    if (window.__tapNext !== undefined && q && q !== window.__oldQ && q.querySelector('.opt:not([disabled])') && !q.querySelector('.feedback')) {
      const t0 = window.__tapNext;
      window.__tapNext = undefined;
      window.__lat.nextToQuestion.push(now - t0);
      requestAnimationFrame(() => requestAnimationFrame(() => window.__lat.nextToQuestionFrame.push(performance.now() - t0)));
    }
  });
  const start = () => obs.observe(document.documentElement, { childList: true, subtree: true });
  if (document.documentElement) start();
  else document.addEventListener('DOMContentLoaded', start);
}

async function newCtx(browser, opts = {}) {
  const context = await browser.newContext({
    viewport: opts.viewport ?? PHONE,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    colorScheme: opts.colorScheme ?? 'light',
    serviceWorkers: opts.serviceWorkers ?? 'block',
  });
  if (opts.init) await context.addInitScript(opts.init);
  await context.addInitScript(qaInit);
  const page = await context.newPage();
  activePage = page;
  const errors = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if ((m.type() === 'error' || m.type() === 'warning') && !/Service Worker registration blocked by Playwright/.test(m.text())) errors.push(`${m.type()}: ${m.text()}`);
  });
  const failed = [];
  context.on('requestfailed', (r) => failed.push(`${r.method()} ${r.url()} — ${r.failure()?.errorText ?? ''}`));
  return { context, page, errors, failed };
}

async function open(page, url = BASE) {
  await page.goto(url);
  await page.waitForSelector('.home');
}
const read = (page) => page.evaluate(() => window.__qa.read());
async function shot(page, name) {
  await sleep(260);
  await page.screenshot({ path: `${SHOTS}/${name}.png` });
  return `qa/screenshots/${name}.png`;
}
async function tap(page, locator) {
  await sleep(GUARD_WAIT);
  await locator.tap();
}
async function markScreen(page) {
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('.screen-q, .screen-page, main.page')) el.__qaOld = true;
  });
}
async function waitNewScreen(page, timeout = 4000) {
  await page.waitForFunction(
    () => {
      const el = document.querySelector('.screen-q, .screen-page, main.page');
      return Boolean(el) && !el.__qaOld;
    },
    null,
    { timeout },
  );
}
/** Tap something that should change the screen; returns true if a new screen appeared. */
async function tapTo(page, locator, timeout = 4000) {
  await markScreen(page);
  await tap(page, locator);
  try {
    await waitNewScreen(page, timeout);
    return true;
  } catch {
    return false;
  }
}
async function clickTo(page, selectorOrText, timeout = 4000) {
  await markScreen(page);
  await page.evaluate((s) => {
    const el = s.startsWith('text=')
      ? [...document.querySelectorAll('button')].find((b) => b.innerText.trim().startsWith(s.slice(5)))
      : document.querySelector(s);
    if (!el) throw new Error(`no element ${s}`);
    el.click();
  }, selectorOrText);
  await waitNewScreen(page, timeout);
}
const modeButton = (page, name) => page.locator('.mode-btn', { hasText: name });
const homeButton = (page) => page.locator('.topbar .icon-btn[aria-label="Home"]');
async function goHome(page) {
  const q = await read(page);
  if (q.screen === 'home') return;
  if (q.screen === 'summary') await tapTo(page, page.locator('.summary .actions button', { hasText: /^Home$/ }));
  else await tapTo(page, homeButton(page));
}
async function setStorage(page, { progress, settings }) {
  await page.evaluate(
    ({ progress, settings }) => {
      if (progress === null) localStorage.removeItem('calc2study:progress');
      else if (progress) localStorage.setItem('calc2study:progress', JSON.stringify(progress));
      if (settings) localStorage.setItem('calc2study:settings', JSON.stringify(settings));
    },
    { progress, settings },
  );
}
const getProgress = (page) =>
  page.evaluate(() => {
    try {
      return JSON.parse(localStorage.getItem('calc2study:progress') ?? 'null');
    } catch {
      return 'unreadable';
    }
  });

// ── question helpers ─────────────────────────────────────────────────────────────────────────
function keyOf(q) {
  return `${q.promptSig}\u0002${q.options.map((o) => o.source).sort().join('\u0001')}`;
}
function lookup(q) {
  if (!q.promptSig) return null;
  return BY_KEY.get(keyOf(q)) ?? null;
}
function topicOf(q) {
  const parts = (q.qKind ?? '').split(' · ');
  for (const p of parts) if (SHORT[p]) return SHORT[p];
  return null;
}
const isGreen = (c) => {
  const m = /rgba?\((\d+), (\d+), (\d+)/.exec(c);
  return m ? +m[2] > +m[1] && +m[2] > +m[3] : false;
};
const isRed = (c) => {
  const m = /rgba?\((\d+), (\d+), (\d+)/.exec(c);
  return m ? +m[1] > +m[2] && +m[1] > +m[3] : false;
};
const legitBad = (s) => /undefined/.test(s) && LEGIT_UNDEFINED.some((re) => re.test(s));

/** Standard per-question checks before answering (aggregated). */
function questionChecks(q, label) {
  const n = q.options.length;
  agg(`${label}: ≥5 options per question`, n >= 5, `${n} options at ${q.counter}`);
  agg(`${label}: no empty options`, q.options.every((o) => !o.empty), `${q.counter}`);
  agg(`${label}: option sources distinct`, new Set(q.options.map((o) => o.source)).size === n, `${q.counter}`);
  agg(`${label}: no .katex-error`, q.katexErrors.length === 0, q.katexErrors.join(' ; '));
  const bad = q.badText.filter((s) => !legitBad(s));
  agg(`${label}: no undefined/NaN/[object Object] text`, bad.length === 0, bad.join(' ; '));
  agg(`${label}: no horizontal page scroll (html & body ≤ 390)`, q.docScrollW <= 390 && q.bodyScrollW <= 390, `html ${q.docScrollW} body ${q.bodyScrollW}`);
  agg(`${label}: no content clipped sideways (overflow-x:hidden containers)`, q.hClipped.length === 0, JSON.stringify(q.hClipped.slice(0, 2)));
  agg(`${label}: no option spills out of its button`, q.options.every((o) => o.overflowX <= 1 && o.bodyOverflowX <= 1 && o.right <= 390.5), q.options.filter((o) => o.overflowX > 1 || o.bodyOverflowX > 1 || o.right > 390.5).map((o) => o.text.slice(0, 40)).join(' ; '));
  const minH = Math.min(...q.options.map((o) => o.height));
  agg(`${label}: option buttons ≥44px tall`, minH >= 44, `min ${minH}`);
  agg(`${label}: first option in the lower half (top ≥ 422)`, q.options[0].top >= 422, `first top ${q.options[0].top}`);
  if (q.isStep) agg(`${label}: current step prompt visible in the stage`, (q.stepPromptVisible ?? 0) >= 0.99, `visible ${q.stepPromptVisible}`);
  agg(`${label}: page not scrolled, top bar visible`, q.docScrollTop === 0 && (q.screenQScrollTop ?? 0) === 0 && q.topbarTop === 0, `doc ${q.docScrollTop} screen-q ${q.screenQScrollTop} topbar ${q.topbarTop}`);
  return minH;
}

/** Checks after an answer (aggregated). `res` from answer(). */
function feedbackChecks(res, label) {
  const { after: a, idx, expected, unit } = res;
  const fb = a.feedback;
  agg(`${label}: feedback panel appears after one tap`, Boolean(fb), a.counter);
  if (!fb) return;
  const states = a.options.map((o) => o.state);
  agg(`${label}: all options disabled after answering`, a.options.every((o) => o.disabled), a.counter);
  agg(`${label}: exactly one option marked correct`, states.filter((s) => s === 'correct').length === 1, states.join(','));
  const chosen = a.options[idx];
  if (fb.ok) {
    agg(`${label}: right answer → "Correct", chosen option green`, /Correct/.test(fb.title) && chosen.state === 'correct' && isGreen(chosen.border), `${fb.title} ${chosen.state} ${chosen.border}`);
    agg(`${label}: right answer → no mistake label / why`, fb.mistake === null && fb.why === null, `${fb.mistake} ${fb.why}`);
  } else {
    const green = a.options.find((o) => o.state === 'correct');
    agg(`${label}: wrong answer → chosen option red, correct option green`, chosen.state === 'wrong' && isRed(chosen.border) && green && isGreen(green.border), `${chosen.state} ${chosen.border} / ${green?.border}`);
    agg(`${label}: wrong answer → "Not quite" + mistake label + why`, /Not quite/.test(fb.title) && Boolean(fb.mistake) && Boolean(fb.why), `title=${fb.title} mistake=${fb.mistake} why=${(fb.why ?? '').slice(0, 40)}`);
  }
  agg(`${label}: explanation shown`, Boolean(fb.expl), a.counter);
  agg(`${label}: Next button fully on screen and ≥44px`, fb.next && fb.next.top >= 0 && fb.next.bottom <= a.vh && fb.next.height >= 44, JSON.stringify(fb.next));
  agg(`${label}: no .katex-error after answering`, a.katexErrors.length === 0, a.katexErrors.join(' ; '));
  const bad = a.badText.filter((s) => !legitBad(s));
  agg(`${label}: no undefined/NaN/[object Object] in feedback`, bad.length === 0, bad.join(' ; '));
  agg(`${label}: no horizontal page scroll with feedback`, a.docScrollW <= 390 && a.bodyScrollW <= 390, `html ${a.docScrollW} body ${a.bodyScrollW}`);
  agg(`${label}: nothing clipped sideways with feedback`, a.hClipped.length === 0, JSON.stringify(a.hClipped.slice(0, 2)));
  agg(`${label}: page not scrolled after answering (top bar visible)`, a.docScrollTop === 0 && (a.screenQScrollTop ?? 0) === 0 && a.topbarTop === 0, `doc ${a.docScrollTop} screen-q ${a.screenQScrollTop} topbar ${a.topbarTop}`);
  if (expected >= 0) {
    agg(`${label}: option marked green is the content's correct option`, a.options[expected].state === 'correct', `${unit?.id}`);
    agg(`${label}: verdict agrees with the content key`, fb.ok === (idx === expected), `${unit?.id} tapped ${idx} expected ${expected} ui ${fb.ok}`);
  }
  if (a.isStep) {
    agg(`${label}: "Correct step:" shows the correct option`, unit ? fb.answer === unit.correct : Boolean(fb.answer), `${unit?.id} shown=${(fb.answer ?? '').slice(0, 60)}`);
    agg(`${label}: current step prompt still visible with feedback`, (a.stepPromptVisible ?? 0) >= 0.5, `${unit?.id}: visible ${a.stepPromptVisible}`);
    if ((a.stepPromptVisible ?? 0) < 0.5 && !SHOT_ONCE.has('prompt-hidden')) {
      SHOT_ONCE.add('prompt-hidden');
      PENDING_SHOT.push(`qa-steps-prompt-hidden-${String(unit?.id).replace(/\W+/g, '-')}`);
    }
  } else {
    const green = a.options.find((o) => o.state === 'correct');
    agg(`${label}: green (correct) option visible after answering`, (green?.visible ?? 0) >= 0.5, `visible ${green?.visible} at ${a.counter}`);
  }
}

/** User-like answer: waits out the tap guard, taps an option. want: 'right' | 'wrong' | 'any'. */
async function answer(page, want = 'any', rotate = 0, opts = {}) {
  const before = opts.before ?? (await read(page));
  const unit = lookup(before);
  const expected = unit ? before.options.findIndex((o) => o.source === unit.correct) : -1;
  let idx = before.options.length - 1;
  if (expected >= 0 && want === 'right') idx = expected;
  else if (expected >= 0 && want === 'wrong') {
    const wrong = before.options.map((_, i) => i).filter((i) => i !== expected);
    idx = wrong[rotate % wrong.length];
  }
  if (opts.fast) {
    await fastAnswer(page, idx);
  } else {
    await tap(page, page.locator('.opt').nth(idx));
    await page.waitForSelector('.feedback', { timeout: 3000 });
  }
  await settle(page);
  const after = await read(page);
  return { before, after, idx, expected, unit, ok: after.feedback?.ok ?? null };
}
async function fastAnswer(page, idx) {
  for (let attempt = 0; attempt < 25; attempt++) {
    await page.keyboard.press(String(idx + 1));
    try {
      await page.waitForSelector('.feedback', { timeout: 250 });
      return;
    } catch {
      // the keydown listener attaches in an effect; retry
    }
  }
  throw new Error('fastAnswer: no feedback');
}
async function fastNext(page) {
  await clickTo(page, '.btn-next, .dock-actions .btn');
}
/** One tap on Next (user-like); verifies that one tap is enough. */
async function next(page) {
  const ok = await tapTo(page, page.locator('.btn-next'));
  agg('one tap on Next advances', ok, (await read(page)).counter);
  return ok;
}
function recordLayout(label, q, extra = {}) {
  const opts = q.options ?? [];
  LAYOUT[label] = {
    htmlScrollWidth: q.docScrollW,
    bodyScrollWidth: q.bodyScrollW,
    viewport: `${q.vw}x${q.vh}`,
    options: opts.length,
    minOptionHeight: opts.length ? Math.min(...opts.map((o) => o.height)) : null,
    firstOptionTop: opts.length ? opts[0].top : null,
    katexErrors: q.katexErrors.length,
    clippedSideways: q.hClipped.length,
    ...extra,
  };
  check(`layout ${label}: html & body scrollWidth ≤ 390`, q.docScrollW <= 390 && q.bodyScrollW <= 390, `html ${q.docScrollW}, body ${q.bodyScrollW}`);
  if (opts.length && !extra.skipOptionPosition) {
    const minH = Math.min(...opts.map((o) => o.height));
    check(`layout ${label}: option buttons ≥44px (min)`, minH >= 44, `min ${minH}px over ${opts.length} options`);
    check(`layout ${label}: first option top ≥ 422`, opts[0].top >= 422, `first option top ${opts[0].top}px`);
  }
}

// ── scenario: Home & topic picker ───────────────────────────────────────────────────────────
async function scenarioHome(browser) {
  const { context, page, errors } = await newCtx(browser);
  await open(page);
  let q = await read(page);
  check('9 topic chips, all selected by default', q.home.chips.length === 9 && q.home.chips.every((c) => c.pressed), q.home.chips.map((c) => `${c.label}:${c.pressed}`).join(', '));
  check('topic counter shows 9/9', q.home.count === '9/9', q.home.count);
  check('Review badge absent on a fresh device', q.home.badge === 0, `badge ${q.home.badge}`);
  recordLayout('Home', q);
  metric('home', q.home);
  await shot(page, 'qa-home');
  // deselect 4: #1 Derivatives, #3 Area, #6 Arc length, #9 Trig sub
  const off = [0, 2, 5, 8];
  for (const i of off) await page.locator('.chip').nth(i).tap();
  await sleep(150);
  q = await read(page);
  const selected = TOPIC_IDS.filter((_, i) => !off.includes(i));
  const pattern = q.home.chips.map((c) => c.pressed);
  check('deselecting 4 chips updates aria-pressed and the counter (5/9)', pattern.every((p, i) => p === !off.includes(i)) && q.home.count === '5/9', `${pattern.join(',')} ${q.home.count}`);
  await shot(page, 'qa-home-4-deselected');
  await page.reload();
  await page.waitForSelector('.home');
  q = await read(page);
  const after = q.home.chips.map((c) => c.pressed);
  check('selection persists across reload', after.join() === pattern.join() && q.home.count === '5/9', `${after.join(',')} ${q.home.count}`);
  const stored = await page.evaluate(() => localStorage.getItem('calc2study:settings'));
  metric('storedSettings', stored);

  // Flash round: every question's topic must be selected
  check('Flash Drill starts', await tapTo(page, modeButton(page, 'Flash Drill')));
  let n = 0;
  const seenTopics = new Set();
  const topicExposure = [];
  while ((await read(page)).screen === 'question') {
    q = await read(page);
    const t = topicOf(q);
    const u = lookup(q);
    topicExposure.push(q.qKind);
    seenTopics.add(t);
    agg('Flash question topic (from the .q-kind label) is a selected topic', selected.includes(t), `${q.qKind}`);
    if (u) agg('Flash question topic (from the content key) is a selected topic', selected.includes(u.topic), u.id);
    await answer(page, 'wrong', n, { before: q });
    n++;
    await next(page);
  }
  aggFlush();
  metric('flashTopicsSeen', [...seenTopics]);
  metric('qKindExamples', topicExposure.slice(0, 4));
  q = await read(page);
  check('Flash round under a 5-topic filter completes with a summary', q.screen === 'summary', `${n} questions`);
  // Step-Through under the same filter (fast)
  await goHome(page);
  check('Step-Through starts', await tapTo(page, modeButton(page, 'Step-Through')));
  let steps = 0;
  for (;;) {
    q = await read(page);
    if (q.screen === 'question') {
      const t = topicOf(q);
      agg('Step-Through problem topic is a selected topic', selected.includes(t), q.qKind);
      await answer(page, 'any', 0, { before: q, fast: true });
      steps++;
      await fastNext(page);
    } else if (q.screen === 'final') await fastNext(page);
    else break;
  }
  aggFlush();
  // Review under the filter; then deselect a topic that has misses → badge drops, review excludes it
  await goHome(page);
  q = await read(page);
  const progress = await getProgress(page);
  const missedIds = Object.entries(progress?.units ?? {}).filter(([, v]) => v.misses > 0).map(([id]) => id);
  const prefixOf = { dr: 'diff-review', ad: 'antiderivatives', ar: 'area', vd: 'volumes-disks', vs: 'volumes-shells', al: 'arc-length', ip: 'ibp', ti: 'trig-integrals', ts: 'trig-sub' };
  const missedByTopic = {};
  for (const id of missedIds) missedByTopic[prefixOf[id.slice(0, 2)]] = (missedByTopic[prefixOf[id.slice(0, 2)]] ?? 0) + 1;
  check('Review badge = number of missed units in the selected topics', q.home.badge === missedIds.length, `badge ${q.home.badge}, missed units ${missedIds.length} ${JSON.stringify(missedByTopic)}`);
  const victim = Object.keys(missedByTopic).sort((a, b) => missedByTopic[b] - missedByTopic[a])[0];
  const vi = TOPIC_IDS.indexOf(victim);
  await page.locator('.chip').nth(vi).tap();
  await sleep(150);
  q = await read(page);
  check(`deselecting ${victim} lowers the badge by its misses (${missedByTopic[victim]})`, q.home.badge === missedIds.length - missedByTopic[victim], `badge ${q.home.badge}`);
  const nowSelected = selected.filter((t) => t !== victim);
  if (q.home.badge > 0) {
    await tapTo(page, modeButton(page, 'Review'));
    for (;;) {
      q = await read(page);
      if (q.screen !== 'question') break;
      const t = topicOf(q);
      agg('Review question topic is a selected topic', nowSelected.includes(t), q.qKind);
      await answer(page, 'any', 0, { before: q, fast: true });
      await fastNext(page);
    }
    aggFlush();
  }
  // None → friendly notice
  await goHome(page);
  await page.getByRole('button', { name: 'None', exact: true }).tap();
  await sleep(100);
  q = await read(page);
  check('"None" deselects all; Home asks to pick a topic', q.home.count === '0/9' && /Pick at least one topic/.test(q.home.notice), `${q.home.count} "${q.home.notice}"`);
  const started = await tapTo(page, modeButton(page, 'Flash Drill'), 1200);
  q = await read(page);
  check('with no topics, Flash Drill stays on Home with a message', !started && q.screen === 'home' && q.home.notice.length > 0, `"${q.home.notice}"`);
  await page.getByRole('button', { name: 'All', exact: true }).tap();
  await sleep(100);
  q = await read(page);
  check('"All" reselects all 9', q.home.count === '9/9', q.home.count);
  metric('consoleErrors', errors);
  check('no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}

// ── scenario: Flash Drill, 3 rounds of 10 ────────────────────────────────────────────────────
async function scenarioFlash(browser) {
  const { context, page, errors } = await newCtx(browser);
  await open(page);
  const displays = new Map(); // key → [orders]
  const correctPos = {};
  const summaries = [];
  let firstQuestionShot = false;
  let wrongShot = false;
  let rightShot = false;
  const contrastLight = [];
  for (let round = 1; round <= 3; round++) {
    await goHome(page);
    check(`round ${round}: Flash Drill starts`, await tapTo(page, modeButton(page, 'Flash Drill')));
    let q = await read(page);
    const total = Number(q.counter.split('/')[1]);
    check(`round ${round}: round length is 10`, total === 10, q.counter);
    const tracked = [];
    for (let i = 1; i <= total; i++) {
      q = await read(page);
      agg('counter shows k/10', q.counter === `${i}/${total}`, `${q.counter} expected ${i}/${total}`);
      questionChecks(q, 'Flash');
      if (!firstQuestionShot) {
        firstQuestionShot = true;
        recordLayout('Flash question', q);
        await shot(page, 'qa-flash-question');
        contrastLight.push(...(await page.evaluate(() => window.__qa.contrast())));
      }
      const key = keyOf(q);
      if (!displays.has(key)) displays.set(key, []);
      displays.get(key).push(q.options.map((o) => o.source).join('\u0001'));
      const want = i % 2 === 1 ? 'wrong' : 'right';
      // double tap on an option (round 1, q 5): the second tap must not do anything else
      let res;
      if (round === 1 && i === 5) {
        await sleep(GUARD_WAIT);
        const box = await page.locator('.opt').last().boundingBox();
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
        await sleep(90);
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
        await sleep(500);
        await settle(page);
        const a = await read(page);
        check('double tap on an option: answered once, still on the same question with feedback', Boolean(a.feedback) && a.counter === q.counter, `counter ${a.counter}, feedback ${Boolean(a.feedback)}`);
        const unit = lookup(q);
        res = { before: q, after: a, idx: q.options.length - 1, expected: unit ? q.options.findIndex((o) => o.source === unit.correct) : -1, unit, ok: a.feedback?.ok };
      } else {
        res = await answer(page, want, i + round, { before: q });
      }
      feedbackChecks(res, 'Flash');
      const green = res.after.options.findIndex((o) => o.state === 'correct');
      correctPos[green + 1] = (correctPos[green + 1] ?? 0) + 1;
      tracked.push({ key, topic: res.unit?.topic ?? topicOf(q), ok: res.ok, id: res.unit?.id ?? null, sources: res.after.options.map((o) => o.source), correct: res.after.options[green]?.source });
      if (!res.ok && !wrongShot) {
        wrongShot = true;
        recordLayout('Flash feedback (wrong)', res.after, { skipOptionPosition: true, nextButton: res.after.feedback.next, feedbackTop: res.after.feedback.rect.top });
        await shot(page, 'qa-flash-feedback-wrong');
        contrastLight.push(...(await page.evaluate(() => window.__qa.contrast())));
      }
      if (res.ok && !rightShot) {
        rightShot = true;
        await shot(page, 'qa-flash-feedback-right');
      }
      if (i < total) {
        if (round === 1 && i === 3) {
          // double tap on Next: exactly one advance, the next question stays unanswered
          await sleep(GUARD_WAIT);
          const box = await page.locator('.btn-next').boundingBox();
          await markScreen(page);
          await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
          await sleep(80);
          await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
          await sleep(600);
          const a = await read(page);
          check('double tap on Next advances exactly one question and does not answer the next one', a.counter === `${i + 1}/${total}` && !a.feedback && a.options.every((o) => !o.disabled), `counter ${a.counter}, feedback ${Boolean(a.feedback)}`);
        } else {
          await next(page);
        }
      } else {
        const ok = await tapTo(page, page.locator('.btn-next'));
        check(`round ${round}: Finish shows the summary`, ok && (await read(page)).screen === 'summary');
      }
    }
    // summary
    q = await read(page);
    const s = q.summary;
    const correct = tracked.filter((t) => t.ok).length;
    const missed = tracked.filter((t) => !t.ok);
    check(`round ${round}: summary score matches (${correct}/10)`, s.score === `Score: ${correct} out of 10` && s.scoreText === `${correct}/10`, `${s.score} "${s.line}"`);
    const expectTopics = {};
    for (const m of missed) expectTopics[m.topic] = (expectTopics[m.topic] ?? 0) + 1;
    const shown = Object.fromEntries(s.missed.map((m) => [TITLE[m.name], m.count]));
    check(`round ${round}: "Topics missed" lists each missed topic with its count`, JSON.stringify(Object.entries(shown).sort()) === JSON.stringify(Object.entries(expectTopics).sort()), `shown ${JSON.stringify(shown)} expected ${JSON.stringify(expectTopics)}`);
    const reviewBtn = s.buttons.find((b) => b.startsWith('Review misses'));
    const distinctMissed = new Set(missed.map((m) => m.key)).size;
    check(`round ${round}: "Review misses (${distinctMissed})" button`, missed.length === 0 ? !reviewBtn : reviewBtn === `Review misses (${distinctMissed})`, String(reviewBtn));
    summaries.push({ round, score: s.score, line: s.line, missed: s.missed, buttons: s.buttons });
    if (round === 1) {
      recordLayout('Summary', q);
      await shot(page, 'qa-summary');
    }
    if (reviewBtn) {
      check(`round ${round}: Review misses starts a review round`, await tapTo(page, page.locator('.summary .actions button', { hasText: 'Review misses' })));
      q = await read(page);
      const rtotal = Number(q.counter?.split('/')[1]);
      check(`round ${round}: review round has exactly the ${distinctMissed} missed item(s)`, rtotal === distinctMissed, q.counter);
      const missedKeys = new Set(missed.map((m) => m.key));
      let reordered = 0;
      let compared = 0;
      const seen = new Set();
      for (let i = 1; i <= rtotal; i++) {
        q = await read(page);
        const key = keyOf(q);
        seen.add(key);
        agg('review-misses round contains only items missed in the round', missedKeys.has(key), q.promptSig?.slice(0, 60));
        const prev = displays.get(key)?.[0];
        if (prev) {
          compared++;
          if (prev !== q.options.map((o) => o.source).join('\u0001')) reordered++;
        }
        displays.get(key)?.push(q.options.map((o) => o.source).join('\u0001'));
        if (round === 1 && i === 1) {
          recordLayout('Review question', q);
          await shot(page, 'qa-review-question');
        }
        questionChecks(q, 'Review');
        const res = await answer(page, 'any', i, { before: q });
        feedbackChecks(res, 'Review');
        if (i < rtotal) await next(page);
        else await tapTo(page, page.locator('.btn-next'));
      }
      check(`round ${round}: every missed item appears once in the review round`, seen.size === missedKeys.size, `${seen.size}/${missedKeys.size}`);
      check(`round ${round}: option order reshuffled between the Flash display and the Review display`, compared === 0 || reordered === compared, `${reordered}/${compared} items in a different order`);
      metric(`round${round}ReviewReordered`, `${reordered}/${compared}`);
      q = await read(page);
      check(`round ${round}: review round ends with a Review summary`, q.screen === 'summary' && /Review/i.test(q.summary.label), q.summary?.label);
    }
  }
  aggFlush();
  metric('summaries', summaries);
  metric('correctPositionHistogram', correctPos);
  metric('contrastLight', contrastLight);
  const repeatedAcrossFlashRounds = [...displays.values()].filter((v) => v.length > 1).length;
  metric('itemsDisplayedMoreThanOnce', repeatedAcrossFlashRounds);
  metric('consoleErrors', errors);
  check('no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}

// ── scenario: Step-Through ───────────────────────────────────────────────────────────────────
async function scenarioSteps(browser) {
  const { context, page, errors } = await newCtx(browser);
  await open(page);
  check('Step-Through starts', await tapTo(page, modeButton(page, 'Step-Through')));
  let q = await read(page);
  const totalSteps = Number(q.counter.split('/')[1]);
  metric('roundTotalSteps', totalSteps);
  check('round has ≥10 steps (size 10 = minimum steps)', totalSteps >= 10, q.counter);
  let problemsDone = 0;
  let wrongs = 0;
  let rights = 0;
  let stepNo = 0;
  let shots = { q: false, fbWrong: false, fbRight: false, final: false };
  const problems = [];
  let curProblem = null;
  for (let guard = 0; guard < 80; guard++) {
    q = await read(page);
    if (q.screen === 'question') {
      stepNo++;
      const u = lookup(q);
      agg('step unit found in the content key', Boolean(u), q.promptSig?.slice(0, 80));
      const m = /Step (\d+) of (\d+)/.exec(q.stepLabel ?? '');
      const k = m ? Number(m[1]) : NaN;
      if (k === 1) curProblem = { title: q.problemTitle, id: u?.problemId, steps: Number(m[2]), wrong: 0 };
      agg('topbar counter counts steps across the round', q.counter === `${stepNo}/${totalSteps}`, `${q.counter} expected ${stepNo}/${totalSteps}`);
      agg('"Work so far" has one line per finished step', k === 1 ? q.workEmpty && q.workLines.length === 0 : q.workLines.length === k - 1, `step ${k}: ${q.workLines.length} lines`);
      if (u && k > 1) {
        const prevUnit = BY_ID.get(`${u.problemId}#${k - 2}`);
        agg('the newest work line is the previous step\'s result', q.workLines[k - 2] === prevUnit?.workLine, `${u.problemId}#${k - 2}: shown ${String(q.workLines[k - 2]).slice(0, 60)} expected ${String(prevUnit?.workLine).slice(0, 60)}`);
      }
      questionChecks(q, 'Step-Through');
      if (!shots.q) {
        shots.q = true;
        recordLayout('Step-Through question', q);
        await shot(page, 'qa-steps-question');
      }
      // wrong on odd steps (so ≥2 wrongs in the first two problems), right on even steps
      const want = stepNo % 2 === 1 ? 'wrong' : 'right';
      const res = await answer(page, want, stepNo, { before: q });
      feedbackChecks(res, 'Step-Through');
      if (res.ok) rights++;
      else {
        wrongs++;
        if (curProblem) curProblem.wrong++;
      }
      if (!res.ok && !shots.fbWrong) {
        shots.fbWrong = true;
        recordLayout('Step-Through feedback (wrong)', res.after, { skipOptionPosition: true, nextButton: res.after.feedback.next });
        await shot(page, 'qa-steps-feedback-wrong');
      }
      if (res.ok && !shots.fbRight) {
        shots.fbRight = true;
        await shot(page, 'qa-steps-feedback-right');
      }
      await next(page);
      const n = await read(page);
      if (n.screen === 'question') {
        agg('after an answer (right or wrong) the problem advances to the next step', (n.stepLabel ?? '').startsWith(`Step ${k + 1} of`), `${q.stepLabel} → ${n.stepLabel} (answer ${res.ok ? 'right' : 'wrong'})`);
        agg('the correct step is appended to "Work so far"', n.workLines.length === k && (!u || n.workLines[k - 1] === u.workLine), `${n.workLines.length} lines; last ${String(n.workLines[k - 1]).slice(0, 60)}`);
      } else if (n.screen === 'final') {
        agg('after the last step the final answer card appears', m && k === Number(m[2]), `${q.stepLabel}`);
      }
    } else if (q.screen === 'final') {
      const u = curProblem?.id ? BY_ID.get(`${curProblem.id}#0`) : null;
      agg('final card shows the final answer (matches content)', u ? q.final.latex === u.finalLatex : q.final.latex.length > 0, `${curProblem?.id}: ${q.final.latex.slice(0, 60)}`);
      agg('final card shows a recap', q.final.recap.length > 20, q.final.recap.slice(0, 60));
      agg('final card lists every step in "Work so far"', q.final.workLines.length === curProblem?.steps, `${q.final.workLines.length}/${curProblem?.steps}`);
      agg('final card: no .katex-error / page scroll', q.katexErrors.length === 0 && q.docScrollW <= 390 && q.bodyScrollW <= 390, `${q.katexErrors.length} ${q.docScrollW}`);
      problemsDone++;
      problems.push({ ...curProblem });
      if (!shots.final) {
        shots.final = true;
        recordLayout('Step-Through final answer', q, { button: q.final.buttonRect });
        await shot(page, 'qa-steps-final');
      }
      const last = q.final.button === 'Finish';
      if (!last && problemsDone === 1) {
        // double tap on "Next problem": must land on step 1 of the next problem, unanswered
        await sleep(GUARD_WAIT);
        const box = await page.locator('.dock-actions .btn').boundingBox();
        await markScreen(page);
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
        await sleep(80);
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
        await sleep(600);
        const a = await read(page);
        check('double tap on "Next problem" opens step 1 of the next problem, unanswered', a.screen === 'question' && /^Step 1 of/.test(a.stepLabel ?? '') && !a.feedback, `${a.screen} ${a.stepLabel} feedback=${Boolean(a.feedback)}`);
      } else {
        const ok = await tapTo(page, page.locator('.dock-actions .btn'));
        agg('one tap on the final card button continues', ok);
      }
    } else break;
  }
  aggFlush();
  q = await read(page);
  check('round ends on a Step-Through summary', q.screen === 'summary' && /Step-Through/i.test(q.summary?.label ?? ''), q.summary?.label);
  check(`completed ≥2 problems with ≥2 wrong answers`, problemsDone >= 2 && wrongs >= 2, `${problemsDone} problems, ${wrongs} wrong / ${rights} right`);
  check('summary counts steps', q.summary && q.summary.line.startsWith(`${rights} of ${rights + wrongs} steps right`), q.summary?.line);
  metric('problems', problems);
  metric('consoleErrors', errors);
  check('no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}

// ── scenario: Review badge + retirement ──────────────────────────────────────────────────────
async function scenarioReview(browser) {
  const { context, page, errors } = await newCtx(browser);
  await open(page);
  // only topic 9 (no generators → every question is in the answer key)
  await page.getByRole('button', { name: 'None', exact: true }).tap();
  await page.locator('.chip').nth(8).tap();
  await sleep(100);
  let q = await read(page);
  check('only "Trig sub" selected', q.home.count === '1/9', q.home.count);
  check('Review with nothing missed stays on Home with a friendly notice', !(await tapTo(page, modeButton(page, 'Review'), 1200)) && /Nothing to review/.test((await read(page)).home.notice), (await read(page)).home.notice);
  await tapTo(page, modeButton(page, 'Flash Drill'));
  const missedKeys = [];
  const known = [];
  for (let i = 1; ; i++) {
    q = await read(page);
    if (q.screen !== 'question') break;
    const want = i <= 3 ? 'wrong' : 'right';
    const res = await answer(page, want, i, { before: q });
    known.push(Boolean(res.unit));
    if (!res.ok) missedKeys.push({ key: keyOf(q), id: res.unit?.id });
    if (i < 10) await next(page);
    else await tapTo(page, page.locator('.btn-next'));
  }
  check('all trig-sub questions were in the answer key', known.every(Boolean), `${known.filter(Boolean).length}/${known.length}`);
  check('3 deliberate misses recorded', missedKeys.length === 3, missedKeys.map((m) => m.id).join(', '));
  await goHome(page);
  q = await read(page);
  check('Home Review badge shows the miss count (3)', q.home.badge === 3, `badge ${q.home.badge}`);
  await shot(page, 'qa-home-badge');
  const target = missedKeys[0];
  const badges = [q.home.badge];
  const perRound = [];
  for (let r = 1; r <= 4; r++) {
    check(`review round ${r} starts`, await tapTo(page, modeButton(page, 'Review')));
    q = await read(page);
    const total = Number(q.counter.split('/')[1]);
    const keys = [];
    for (let i = 1; i <= total; i++) {
      q = await read(page);
      const key = keyOf(q);
      keys.push(key);
      const isTarget = key === target.key;
      const res = await answer(page, isTarget ? 'right' : 'wrong', i, { before: q });
      agg('review round: only missed units', missedKeys.some((m) => m.key === key), res.unit?.id);
      if (isTarget) agg('target answered correctly', res.ok === true, res.unit?.id);
      if (i < total) await next(page);
      else await tapTo(page, page.locator('.btn-next'));
    }
    await goHome(page);
    q = await read(page);
    badges.push(q.home.badge);
    perRound.push({ round: r, size: total, containsTarget: keys.includes(target.key), badgeAfter: q.home.badge });
  }
  aggFlush();
  metric('reviewRounds', perRound);
  metric('badges', badges);
  check('review rounds 1–3 contain the target unit', perRound.slice(0, 3).every((p) => p.containsTarget), JSON.stringify(perRound));
  check('badge stays 3 after 1 and 2 correct answers', perRound[0].badgeAfter === 3 && perRound[1].badgeAfter === 3, badges.join(' → '));
  check('target retires after 3 correct answers: badge 3 → 2', perRound[2].badgeAfter === 2, badges.join(' → '));
  check('retired unit no longer appears in the next review round', !perRound[3].containsTarget && perRound[3].size === 2, JSON.stringify(perRound[3]));
  const progress = await getProgress(page);
  metric('targetProgress', progress?.units?.[target.id]);
  metric('consoleErrors', errors);
  check('no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}

// ── scenario: Settings ───────────────────────────────────────────────────────────────────────
async function scenarioSettings(browser) {
  const { context, page, errors } = await newCtx(browser);
  await open(page);
  check('Settings opens from the gear', await tapTo(page, page.locator('.icon-btn[aria-label="Settings"]')));
  let q = await read(page);
  recordLayout('Settings', q);
  await shot(page, 'qa-settings');
  check('round size defaults to 10', q.settings.sizes.find((s) => s.pressed)?.n === 10, JSON.stringify(q.settings.sizes));
  for (const size of [5, 20, 10]) {
    await page.locator('.segmented button', { hasText: new RegExp(`^${size}$`) }).tap();
    await sleep(100);
    q = await read(page);
    check(`round size ${size} selected`, q.settings.sizes.find((s) => s.pressed)?.n === size);
    await tapTo(page, homeButton(page));
    await tapTo(page, modeButton(page, 'Flash Drill'));
    q = await read(page);
    check(`Flash counter shows 1/${size}`, q.counter === `1/${size}`, q.counter);
    await tapTo(page, homeButton(page));
    await tapTo(page, modeButton(page, 'Step-Through'));
    q = await read(page);
    const steps = Number(q.counter.split('/')[1]);
    check(`Step-Through round with size ${size} has ≥${size} steps`, steps >= size, q.counter);
    await tapTo(page, homeButton(page));
    await tapTo(page, page.locator('.icon-btn[aria-label="Settings"]'));
  }
  const stored = await page.evaluate(() => localStorage.getItem('calc2study:settings'));
  check('round size persisted to localStorage', /"roundSize":10/.test(stored ?? ''), stored);
  // make misses: Flash round of 10, all wrong
  await tapTo(page, homeButton(page));
  await tapTo(page, modeButton(page, 'Flash Drill'));
  for (let i = 1; ; i++) {
    q = await read(page);
    if (q.screen !== 'question') break;
    await answer(page, 'wrong', i, { before: q, fast: true });
    await fastNext(page);
  }
  await goHome(page);
  q = await read(page);
  const badge = q.home.badge;
  check('misses → badge > 0', badge > 0, `badge ${badge}`);
  // Review round size follows the setting (10 → min(10, due))
  await tapTo(page, page.locator('.icon-btn[aria-label="Settings"]'));
  await page.locator('.segmented button', { hasText: /^5$/ }).tap();
  await tapTo(page, homeButton(page));
  await tapTo(page, modeButton(page, 'Review'));
  q = await read(page);
  check('Review round size follows the setting (5)', q.counter === `1/${Math.min(5, badge)}`, `${q.counter} (badge ${badge})`);
  await tapTo(page, homeButton(page));
  await tapTo(page, page.locator('.icon-btn[aria-label="Settings"]'));
  q = await read(page);
  const missedLine = q.settings.texts.find((t) => /missed/.test(t));
  check('Settings shows the missed count', new RegExp(`^${badge} missed`).test(missedLine ?? ''), missedLine);
  // first tap → confirmation, nothing erased yet
  await tap(page, page.locator('.btn-danger-outline'));
  await sleep(100);
  q = await read(page);
  const p1 = await getProgress(page);
  check('first tap on "Reset progress" asks for confirmation and erases nothing', q.settings.confirm.includes('Tap again to erase') && q.settings.confirm.includes('Cancel') && p1 && Object.keys(p1.units).length > 0, `${q.settings.confirm.join('/')} units ${p1 ? Object.keys(p1.units).length : 0}`);
  await shot(page, 'qa-settings-confirm');
  await tap(page, page.getByRole('button', { name: 'Cancel' }));
  await sleep(100);
  q = await read(page);
  check('Cancel returns to the Reset button without erasing', q.settings.reset && (await getProgress(page)) !== null);
  await tap(page, page.locator('.btn-danger-outline'));
  await tap(page, page.getByRole('button', { name: 'Tap again to erase' }));
  await sleep(100);
  q = await read(page);
  check('second tap erases: "Progress cleared." and no missed questions', q.settings.texts.some((t) => t === 'Progress cleared.') && q.settings.texts.some((t) => /No missed questions/.test(t)), q.settings.texts.join(' | '));
  check('progress removed from localStorage', (await getProgress(page)) === null);
  await tapTo(page, homeButton(page));
  q = await read(page);
  check('after reset the Home badge is gone', q.home.badge === 0 && /Missed questions show up here/.test(q.home.modes[2].sub), `badge ${q.home.badge} "${q.home.modes[2].sub}"`);
  // accidental double tap on "Reset progress": does the confirm step protect the data?
  await tapTo(page, modeButton(page, 'Flash Drill'));
  for (let i = 1; ; i++) {
    q = await read(page);
    if (q.screen !== 'question') break;
    await answer(page, 'wrong', i, { before: q, fast: true });
    await fastNext(page);
  }
  await goHome(page);
  const badge2 = (await read(page)).home.badge;
  await tapTo(page, page.locator('.icon-btn[aria-label="Settings"]'));
  await sleep(GUARD_WAIT);
  const box = await page.locator('.btn-danger-outline').boundingBox();
  const pt = { x: box.x + box.width * 0.25, y: box.y + box.height / 2 };
  await page.touchscreen.tap(pt.x, pt.y);
  await sleep(120);
  await page.touchscreen.tap(pt.x, pt.y);
  await sleep(300);
  q = await read(page);
  const p2 = await getProgress(page);
  const erased = p2 === null;
  check('an accidental double tap on "Reset progress" does not erase progress (confirmation holds)', !erased, `badge before ${badge2}; after double tap: ${erased ? 'progress ERASED' : 'progress kept'}; status "${q.settings.texts.join(' | ').slice(0, 120)}"`);
  if (erased) await shot(page, 'qa-settings-double-tap-erased');
  metric('consoleErrors', errors);
  check('no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}

// ── scenario: dark mode ──────────────────────────────────────────────────────────────────────
async function scenarioDark(browser) {
  const { context, page, errors } = await newCtx(browser, { colorScheme: 'dark' });
  await open(page);
  const all = [];
  const grab = async (label) => all.push(...(await page.evaluate(() => window.__qa.contrast())).map((c) => ({ ...c, screen: label })));
  const scheme = await page.evaluate(() => ({ dark: matchMedia('(prefers-color-scheme: dark)').matches, bg: getComputedStyle(document.body).backgroundColor, fg: getComputedStyle(document.body).color }));
  check('dark scheme active (prefers-color-scheme: dark, dark background)', scheme.dark && /rgb\((\d+), (\d+), (\d+)\)/.exec(scheme.bg).slice(1).every((v) => +v < 60), JSON.stringify(scheme));
  await grab('Home');
  await shot(page, 'qa-dark-home');
  await tapTo(page, modeButton(page, 'Flash Drill'));
  await grab('Flash question');
  await shot(page, 'qa-dark-flash-question');
  let res = await answer(page, 'wrong', 1);
  if (res.ok) {
    await next(page);
    res = await answer(page, 'wrong', 2);
  }
  await grab('Flash feedback');
  await shot(page, 'qa-dark-flash-feedback');
  await tapTo(page, homeButton(page));
  await tapTo(page, modeButton(page, 'Step-Through'));
  await answer(page, 'right', 0, { fast: true });
  await fastNext(page);
  await grab('Step-Through question');
  await shot(page, 'qa-dark-steps-question');
  await answer(page, 'wrong', 1);
  await grab('Step-Through feedback');
  await shot(page, 'qa-dark-steps-feedback');
  for (;;) {
    const q = await read(page);
    if (q.screen === 'final') {
      await grab('Step-Through final');
      await shot(page, 'qa-dark-steps-final');
      break;
    }
    if (q.screen === 'question' && !q.feedback) await answer(page, 'any', 0, { before: q, fast: true });
    await fastNext(page);
  }
  await tapTo(page, homeButton(page));
  await tapTo(page, page.locator('.icon-btn[aria-label="Settings"]'));
  await grab('Settings');
  await shot(page, 'qa-dark-settings');
  const low = all.filter((c) => c.ratio < c.need && c.opacity === 1);
  const dim = all.filter((c) => c.opacity < 1);
  metric('contrast', all);
  check('dark mode: every sampled text meets WCAG AA contrast (4.5:1, 3:1 large)', low.length === 0, low.map((c) => `${c.screen} ${c.sel} ${c.ratio}`).join('; '));
  metric('dimmedOptionContrast', dim.map((c) => `${c.screen} ${c.sel} ${c.ratio}`));
  const katexColor = await page.evaluate(() => null);
  metric('katexColor', katexColor);
  metric('consoleErrors', errors);
  check('no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}

// ── scenario: storage unavailable ────────────────────────────────────────────────────────────
async function scenarioStorage(browser) {
  const variants = {
    'setItem/getItem throw': () => {
      const boom = () => {
        throw new DOMException('The operation is insecure.', 'SecurityError');
      };
      Storage.prototype.setItem = boom;
      Storage.prototype.getItem = boom;
    },
    'localStorage getter throws': () => {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new DOMException('Access is denied for this document.', 'SecurityError');
        },
      });
    },
  };
  for (const [name, init] of Object.entries(variants)) {
    const { context, page, errors } = await newCtx(browser, { init });
    await page.goto(BASE);
    const loaded = await page.waitForSelector('.home', { timeout: 5000 }).then(() => true, () => false);
    check(`[${name}] app loads`, loaded);
    if (!loaded) {
      await shot(page, `qa-storage-${name.replace(/\W+/g, '-')}-fail`);
      await context.close();
      continue;
    }
    await page.locator('.chip').nth(0).tap(); // topic toggles work (in memory)
    await sleep(100);
    let q = await read(page);
    check(`[${name}] topic toggle works in memory`, q.home.count === '8/9', q.home.count);
    check(`[${name}] Flash round starts`, await tapTo(page, modeButton(page, 'Flash Drill')));
    let misses = 0;
    let n = 0;
    for (let i = 1; ; i++) {
      q = await read(page);
      if (q.screen !== 'question') break;
      const res = await answer(page, i <= 4 ? 'wrong' : 'right', i, { before: q });
      if (!res.ok) misses++;
      n++;
      if (q.counter.startsWith(`${q.counter.split('/')[1]}/`)) await tapTo(page, page.locator('.btn-next'));
      else await next(page);
    }
    q = await read(page);
    check(`[${name}] full round of 10 played to the summary`, q.screen === 'summary' && n === 10, `${n} questions, screen ${q.screen}`);
    await goHome(page);
    q = await read(page);
    check(`[${name}] Review badge counts misses in memory`, q.home.badge === misses, `badge ${q.home.badge}, misses ${misses}`);
    if (misses > 0) {
      check(`[${name}] Review round plays`, await tapTo(page, modeButton(page, 'Review')));
      for (;;) {
        q = await read(page);
        if (q.screen !== 'question') break;
        await answer(page, 'any', 0, { before: q, fast: true });
        await fastNext(page);
      }
      check(`[${name}] Review round ends on a summary`, (await read(page)).screen === 'summary');
      await goHome(page);
    }
    await tapTo(page, page.locator('.icon-btn[aria-label="Settings"]'));
    q = await read(page);
    const msg = q.settings.texts.find((t) => /Storage is unavailable|saved on this device/.test(t));
    check(`[${name}] Settings says storage is unavailable`, /Storage is unavailable/.test(msg ?? ''), msg);
    await shot(page, `qa-storage-${name.replace(/\W+/g, '-')}`);
    check(`[${name}] no page errors / console errors`, errors.length === 0, errors.slice(0, 3).join(' | '));
    metric(`${name} errors`, errors);
    await context.close();
  }
}

// ── scenario: performance ───────────────────────────────────────────────────────────────────
async function scenarioPerf(browser) {
  for (const throttle of [1, 4]) {
    const { context, page } = await newCtx(browser);
    await open(page);
    await setStorage(page, { settings: { version: 1, roundSize: 20, topics: TOPIC_IDS } });
    await page.reload();
    await page.waitForSelector('.home');
    if (throttle > 1) {
      const cdp = await context.newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle });
    }
    for (let round = 0; round < 2; round++) {
      await goHome(page);
      await tapTo(page, modeButton(page, 'Flash Drill'));
      for (let i = 1; i <= 20; i++) {
        const q = await read(page);
        await answer(page, 'any', i, { before: q });
        if (i < 20) await next(page);
        else await tapTo(page, page.locator('.btn-next'));
      }
    }
    await sleep(300);
    const lat = await page.evaluate(() => window.__lat);
    const s = (xs) => ({ n: xs.length, p50: pct(xs, 50), p95: pct(xs, 95), max: xs.length ? +Math.max(...xs).toFixed(1) : null });
    const out = {
      tapToFeedbackDom: s(lat.tapToFeedback),
      tapToFeedbackNextFrame: s(lat.tapToFeedbackFrame),
      nextToQuestionDom: s(lat.nextToQuestion),
      nextToQuestionNextFrame: s(lat.nextToQuestionFrame),
    };
    metric(`cpu×${throttle}`, out);
    check(`[CPU ×${throttle}] tap → feedback p95 < 200ms (${out.tapToFeedbackNextFrame.n} samples)`, out.tapToFeedbackNextFrame.n >= 20 && out.tapToFeedbackNextFrame.p95 < 200, `DOM p50 ${out.tapToFeedbackDom.p50} p95 ${out.tapToFeedbackDom.p95}; next frame p50 ${out.tapToFeedbackNextFrame.p50} p95 ${out.tapToFeedbackNextFrame.p95} max ${out.tapToFeedbackNextFrame.max} ms`);
    check(`[CPU ×${throttle}] Next → next question p95 < 200ms (${out.nextToQuestionNextFrame.n} samples)`, out.nextToQuestionNextFrame.n >= 20 && out.nextToQuestionNextFrame.p95 < 200, `DOM p50 ${out.nextToQuestionDom.p50} p95 ${out.nextToQuestionDom.p95}; next frame p50 ${out.nextToQuestionNextFrame.p50} p95 ${out.nextToQuestionNextFrame.p95} max ${out.nextToQuestionNextFrame.max} ms`);
    // cold start
    await context.close();
  }
  const { context, page } = await newCtx(browser);
  const t0 = Date.now();
  await page.goto(BASE);
  await page.waitForSelector('.home');
  const cold = Date.now() - t0;
  const nav = await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0];
    return { domContentLoaded: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd) };
  });
  metric('coldStart', { goToHomeMs: cold, ...nav });
  await context.close();
}

// ── scenario: Review weighting (statistics) ─────────────────────────────────────────────────
async function scenarioWeighting(browser) {
  const { context, page } = await newCtx(browser);
  await open(page);
  const statics = UNITS.filter((u) => u.kind === 'flash' && !u.id.includes(':'));
  // 10 units per group from different topics
  const pick = (offset) => Array.from({ length: 10 }, (_, i) => statics[(i * 47 + offset) % statics.length].id);
  const A = pick(3);
  const B = pick(19).filter((id) => !A.includes(id));
  const C = pick(31).filter((id) => !A.includes(id) && !B.includes(id));
  const now = Date.now();
  const units = {};
  for (const id of A) units[id] = { misses: 3, lastMissedAt: now - 3600e3, lastSeenAt: now - 3600e3, correctSince: 0 };
  for (const id of B) units[id] = { misses: 1, lastMissedAt: now - 3600e3, lastSeenAt: now - 3600e3, correctSince: 0 };
  for (const id of C) units[id] = { misses: 1, lastMissedAt: now - 10 * 86400e3, lastSeenAt: now - 10 * 86400e3, correctSince: 0 };
  const group = (id) => (A.includes(id) ? 'A' : B.includes(id) ? 'B' : C.includes(id) ? 'C' : '?');
  const counts = { A: 0, B: 0, C: 0, '?': 0 };
  const ROUNDS = 40;
  for (let r = 0; r < ROUNDS; r++) {
    await setStorage(page, { progress: { version: 1, units }, settings: { version: 1, roundSize: 5, topics: TOPIC_IDS } });
    await page.reload();
    await page.waitForSelector('.home');
    if (r === 0) check('badge counts all 30 seeded misses', (await read(page)).home.badge === A.length + B.length + C.length, String((await read(page)).home.badge));
    await clickTo(page, '.mode-btn:nth-of-type(3)').catch(async () => clickTo(page, 'text=Review'));
    for (;;) {
      const q = await read(page);
      if (q.screen !== 'question') break;
      const u = lookup(q);
      counts[u ? group(u.id) : '?']++;
      await answer(page, 'any', 0, { before: q, fast: true });
      await fastNext(page);
    }
  }
  // expected inclusion counts from the documented formula, by simulation
  const w = (m, ageDays) => (1 + m) * (1 + 2 * Math.exp(-ageDays / 2));
  const pool = [...A.map(() => ['A', w(3, 1 / 24)]), ...B.map(() => ['B', w(1, 1 / 24)]), ...C.map(() => ['C', w(1, 10)])];
  const exp = { A: 0, B: 0, C: 0 };
  const SIM = 20000;
  for (let s = 0; s < SIM; s++) {
    const p = pool.slice();
    for (let k = 0; k < 5; k++) {
      const total = p.reduce((a, x) => a + x[1], 0);
      let x = Math.random() * total;
      let j = p.length - 1;
      for (let i = 0; i < p.length; i++) {
        x -= p[i][1];
        if (x < 0) {
          j = i;
          break;
        }
      }
      exp[p[j][0]]++;
      p.splice(j, 1);
    }
  }
  for (const g of Object.keys(exp)) exp[g] = +((exp[g] / SIM) * ROUNDS).toFixed(1);
  metric('observed', counts);
  metric('expectedFromFormula', exp);
  metric('groups', { A: 'misses 3, missed 1h ago', B: 'misses 1, missed 1h ago', C: 'misses 1, missed 10 days ago' });
  check('Review draws repeated misses more often than single misses (A > B)', counts.A > counts.B, JSON.stringify(counts));
  check('Review draws recent misses more often than old ones (B > C)', counts.B > counts.C, JSON.stringify(counts));
  check('every reviewed unit identified', counts['?'] === 0, `${counts['?']} unidentified`);
  await context.close();
}

// ── offline ──────────────────────────────────────────────────────────────────────────────────
async function playOffline(page, label) {
  // a full Flash round (user-like taps)
  let q;
  check(`${label}: Flash round starts offline`, await tapTo(page, modeButton(page, 'Flash Drill')));
  let n = 0;
  for (;;) {
    q = await read(page);
    if (q.screen !== 'question') break;
    questionChecks(q, `${label} Flash`);
    await answer(page, n % 2 ? 'right' : 'wrong', n, { before: q });
    n++;
    if (q.counter === `${q.counter.split('/')[1]}/${q.counter.split('/')[1]}`) await tapTo(page, page.locator('.btn-next'));
    else await next(page);
  }
  check(`${label}: full Flash round (10) played offline`, n === 10 && (await read(page)).screen === 'summary', `${n} questions`);
  await goHome(page);
  // one Step-Through problem to its final card
  check(`${label}: Step-Through starts offline`, await tapTo(page, modeButton(page, 'Step-Through')));
  let steps = 0;
  for (;;) {
    q = await read(page);
    if (q.screen === 'final') break;
    if (q.screen !== 'question') break;
    await answer(page, steps % 2 ? 'right' : 'wrong', steps, { before: q });
    steps++;
    await next(page);
  }
  q = await read(page);
  check(`${label}: one Step-Through problem completed offline (final answer + recap)`, q.screen === 'final' && q.final.recap.length > 0 && q.katexErrors.length === 0, `${steps} steps`);
  await goHome(page);
  // one Review round
  const badge = (await read(page)).home.badge;
  check(`${label}: Review round starts offline`, badge > 0 && (await tapTo(page, modeButton(page, 'Review'))), `badge ${badge}`);
  let r = 0;
  for (;;) {
    q = await read(page);
    if (q.screen !== 'question') break;
    await answer(page, 'any', r, { before: q });
    r++;
    if (q.counter === `${q.counter.split('/')[1]}/${q.counter.split('/')[1]}`) await tapTo(page, page.locator('.btn-next'));
    else await next(page);
  }
  check(`${label}: Review round played offline to its summary`, r > 0 && (await read(page)).screen === 'summary', `${r} questions`);
  aggFlush();
}
async function fontReport(page) {
  return page.evaluate(async () => {
    await document.fonts.ready;
    const faces = [...document.fonts].filter((f) => f.family.replace(/["']/g, '').startsWith('KaTeX'));
    const byStatus = {};
    for (const f of faces) byStatus[f.status] = (byStatus[f.status] ?? 0) + 1;
    return {
      faces: faces.length,
      byStatus,
      loaded: faces.filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`),
      errors: faces.filter((f) => f.status === 'error').map((f) => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`),
      checkMain: document.fonts.check('16px KaTeX_Main'),
      checkMathItalic: document.fonts.check('italic 16px KaTeX_Math'),
      katexNodes: document.querySelectorAll('.katex').length,
      katexErrors: document.querySelectorAll('.katex-error').length,
    };
  });
}
async function swSetup(page, label) {
  const sw = await page.evaluate(async () => {
    const reg = await Promise.race([navigator.serviceWorker.ready, new Promise((r) => setTimeout(() => r(null), 15000))]);
    if (!reg) return null;
    const t0 = performance.now();
    while (reg.active?.state !== 'activated' && performance.now() - t0 < 10000) await new Promise((r) => setTimeout(r, 100));
    return { state: reg.active?.state, scope: reg.scope, script: reg.active?.scriptURL, msToActivated: Math.round(performance.now() - t0) };
  });
  check(`${label}: service worker registered and active`, sw?.state === 'activated', JSON.stringify(sw));
  let controlled = await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), null, { timeout: 8000 }).then(() => true, () => false);
  metric(`${label} controlledWithoutReload`, controlled);
  if (!controlled) {
    await page.reload();
    await page.waitForSelector('.home');
    controlled = await page.evaluate(() => Boolean(navigator.serviceWorker.controller));
  }
  check(`${label}: page is controlled by the service worker`, controlled);
  const cache = await page.evaluate(async () => {
    const names = await caches.keys();
    const out = {};
    for (const n of names) {
      const c = await caches.open(n);
      out[n] = (await c.keys()).map((k) => new URL(k.url).pathname.replace(/^.*\/(assets|icons)\//, '$1/').replace(/^\//, ''));
    }
    return out;
  });
  const entries = Object.values(cache).flat();
  const woff2 = entries.filter((e) => e.endsWith('.woff2'));
  metric(`${label} cacheStorage`, Object.fromEntries(Object.entries(cache).map(([k, v]) => [k, v.length])));
  metric(`${label} precachedWoff2`, woff2.length);
  check(`${label}: Cache Storage holds index.html, JS, CSS and the KaTeX woff2 fonts`, entries.some((e) => /index\.html/.test(e)) && entries.some((e) => /\.js/.test(e)) && entries.some((e) => /\.css/.test(e)) && woff2.length >= 19, `${entries.length} entries, ${woff2.length} woff2`);
}
async function scenarioOffline(browser) {
  const { context, page, errors, failed } = await newCtx(browser, { serviceWorkers: 'allow' });
  const responses = [];
  context.on('response', (r) => responses.push({ url: r.url(), status: r.status(), sw: r.fromServiceWorker() }));
  await open(page);
  await swSetup(page, 'setOffline');
  await context.setOffline(true);
  const failedBefore = failed.length;
  const respBefore = responses.length;
  await page.reload();
  const loaded = await page.waitForSelector('.home', { timeout: 10000 }).then(() => true, () => false);
  check('setOffline: app reloads offline', loaded);
  check('setOffline: navigator.onLine is false', (await page.evaluate(() => navigator.onLine)) === false);
  await shot(page, 'qa-offline-home');
  await playOffline(page, 'setOffline');
  const fonts = await fontReport(page);
  metric('fontsOffline', fonts);
  check('setOffline: KaTeX fonts loaded offline, none failed', fonts.errors.length === 0 && fonts.byStatus.loaded >= 3 && fonts.checkMain && fonts.katexErrors === 0, JSON.stringify({ byStatus: fonts.byStatus, checkMain: fonts.checkMain, errors: fonts.errors }));
  const offFailed = failed.slice(failedBefore);
  check('setOffline: no failed requests while offline', offFailed.length === 0, offFailed.slice(0, 5).join(' | '));
  const offResp = responses.slice(respBefore);
  const notSW = offResp.filter((r) => !r.sw && !r.url.startsWith('data:'));
  metric('offlineResponses', { total: offResp.length, fromServiceWorker: offResp.filter((r) => r.sw).length, notFromSW: notSW.slice(0, 10) });
  check('setOffline: every response while offline came from the service worker', notSW.length === 0, notSW.slice(0, 3).map((r) => r.url).join(' | '));
  await shot(page, 'qa-offline-after-review');
  metric('consoleErrors', errors);
  check('setOffline: no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}
/** Airplane mode for real: a second preview server that is killed after the first load. */
async function scenarioOfflineHard(browser) {
  const port = 4174;
  const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { stdio: 'ignore', detached: true });
  const url = `http://127.0.0.1:${port}/`;
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) break;
    } catch {
      // not up yet
    }
    await sleep(250);
  }
  const { context, page, errors, failed } = await newCtx(browser, { serviceWorkers: 'allow' });
  try {
    await open(page, url);
    await swSetup(page, 'server killed');
  } finally {
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      server.kill('SIGTERM');
    }
  }
  await sleep(800);
  let serverDown = false;
  try {
    await fetch(url);
  } catch {
    serverDown = true;
  }
  check('server killed: preview server on :4174 is really down', serverDown);
  await context.setOffline(true);
  const failedBefore = failed.length;
  await page.reload();
  const loaded = await page.waitForSelector('.home', { timeout: 10000 }).then(() => true, () => false);
  check('server killed: app reloads with no server and no network', loaded);
  if (loaded) {
    await playOffline(page, 'server killed');
    const fonts = await fontReport(page);
    metric('fonts', fonts);
    check('server killed: KaTeX fonts loaded, none failed', fonts.errors.length === 0 && fonts.byStatus.loaded >= 3 && fonts.checkMain, JSON.stringify({ byStatus: fonts.byStatus, errors: fonts.errors }));
    // a brand-new tab in the same (offline) profile
    const page2 = await context.newPage();
    await page2.goto(url).catch(() => {});
    const ok2 = await page2.waitForSelector('.home', { timeout: 8000 }).then(() => true, () => false);
    check('server killed: a new tab opens the app offline', ok2);
    await page2.close();
  } else await shot(page, 'qa-offline-hard-fail');
  const offFailed = failed.slice(failedBefore);
  check('server killed: no failed requests', offFailed.length === 0, offFailed.slice(0, 5).join(' | '));
  metric('consoleErrors', errors);
  check('server killed: no page errors', errors.filter((e) => e.startsWith('pageerror')).length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}

// ── sweeps: every unit through the real UI ──────────────────────────────────────────────────
function sweepRecord(store, u, q, a) {
  const optInner = Math.max(0, ...q.options.map((o) => o.innerScrollX));
  const promptScroll = q.hScroll.filter((h) => h.inStage).reduce((m, h) => Math.max(m, h.ox), 0);
  store.push({
    id: u?.id ?? null,
    counter: q.counter,
    optionScrollX: optInner,
    optionsScrolling: q.options.filter((o) => o.innerScrollX > 1).length,
    promptScrollX: promptScroll,
    vClipped: [...q.vClipped, ...(a?.vClipped ?? [])].map((v) => `${v.oy}px ${v.label.slice(0, 60)}`),
    minOptH: Math.min(...q.options.map((o) => o.height)),
    firstTop: q.options[0]?.top,
    feedbackScroll: a ? a.hScroll.filter((h) => h.inFeedback).reduce((m, h) => Math.max(m, h.ox), 0) : 0,
  });
}
async function scenarioSweepSteps(browser) {
  const { context, page, errors } = await newCtx(browser);
  await open(page);
  await setStorage(page, { progress: null, settings: { version: 1, roundSize: 20, topics: TOPIC_IDS } });
  await page.reload();
  await page.waitForSelector('.home');
  const allProblems = new Set(UNITS.filter((u) => u.kind === 'step').map((u) => u.problemId));
  const seenProblems = new Set();
  const seenSteps = new Set();
  const store = [];
  let finals = 0;
  let rot = 0;
  let rounds = 0;
  while (seenProblems.size < allProblems.size && rounds < 40) {
    rounds++;
    await goHome(page);
    await clickTo(page, 'text=Step-Through');
    let problemId = null;
    for (;;) {
      const q = await read(page);
      if (q.screen === 'question') {
        const u = lookup(q);
        agg('sweep: displayed step found in the content key', Boolean(u), q.promptSig?.slice(0, 80));
        if (u) {
          seenSteps.add(u.id);
          problemId = u.problemId;
          seenProblems.add(u.problemId);
          agg('sweep: work lines match the previous steps\' results', q.workLines.every((w, i) => w === BY_ID.get(`${u.problemId}#${i}`)?.workLine) && q.workLines.length === u.stepIndex, `${u.id}`);
        }
        questionChecks(q, 'sweep steps');
        const res = await answer(page, 'wrong', rot++, { before: q, fast: true });
        feedbackChecks(res, 'sweep steps');
        while (PENDING_SHOT.length) await shot(page, PENDING_SHOT.shift());
        sweepRecord(store, u, q, res.after);
        await fastNext(page);
      } else if (q.screen === 'final') {
        finals++;
        const u0 = problemId ? BY_ID.get(`${problemId}#0`) : null;
        agg('sweep: final answer matches content', u0 ? q.final.latex === u0.finalLatex : false, problemId);
        agg('sweep: final recap present', q.final.recap.length > 20, problemId);
        agg('sweep: final card has no .katex-error / bad text / page scroll', q.katexErrors.length === 0 && q.badText.filter((s) => !legitBad(s)).length === 0 && q.docScrollW <= 390 && q.bodyScrollW <= 390 && q.hClipped.length === 0, `${problemId} ${q.katexErrors.join(';')} ${q.badText.join(';')} ${q.docScrollW} ${JSON.stringify(q.hClipped.slice(0, 1))}`);
        if (q.vClipped.length) store.push({ id: `${problemId} (final)`, vClipped: q.vClipped.map((v) => `${v.oy}px ${v.label.slice(0, 60)}`) });
        await fastNext(page);
      } else break;
    }
  }
  aggFlush();
  check('sweep: every step problem played to its final card', seenProblems.size === allProblems.size, `${seenProblems.size}/${allProblems.size} problems, ${finals} final cards, ${rounds} rounds`);
  check('sweep: every step displayed', seenSteps.size === UNITS.filter((u) => u.kind === 'step').length, `${seenSteps.size} steps`);
  finishSweep(store, 'steps');
  metric('consoleErrors', errors);
  check('no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}
async function scenarioSweepFlash(browser) {
  const { context, page, errors } = await newCtx(browser);
  await open(page);
  const ids = UNITS.filter((u) => u.kind === 'flash').map((u) => u.id);
  const seen = new Set();
  const store = [];
  let rot = 0;
  const now = Date.now();
  for (let b = 0; b < ids.length; b += 20) {
    const batch = ids.slice(b, b + 20);
    const units = Object.fromEntries(batch.map((id) => [id, { misses: 1, lastMissedAt: now, lastSeenAt: now, correctSince: 0 }]));
    await setStorage(page, { progress: { version: 1, units }, settings: { version: 1, roundSize: 20, topics: TOPIC_IDS } });
    await page.reload();
    await page.waitForSelector('.home');
    await clickTo(page, 'text=Review');
    let shown = 0;
    for (;;) {
      const q = await read(page);
      if (q.screen !== 'question') break;
      shown++;
      const u = lookup(q);
      agg('sweep: displayed flash item found in the content key', Boolean(u), q.promptSig?.slice(0, 80));
      if (u) {
        agg('sweep: displayed item belongs to the seeded batch', batch.includes(u.id) || batch.some((id) => BY_ID.get(id)?.key === u.key), u.id);
        seen.add(u.key);
      }
      questionChecks(q, 'sweep flash');
      const res = await answer(page, 'wrong', rot++, { before: q, fast: true });
      feedbackChecks(res, 'sweep flash');
      sweepRecord(store, u, q, res.after);
      await fastNext(page);
    }
    agg('sweep: review round shows every seeded unit', shown === batch.length, `batch ${b / 20}: ${shown}/${batch.length}`);
  }
  aggFlush();
  const keys = new Set(UNITS.filter((u) => u.kind === 'flash').map((u) => u.key));
  check('sweep: every flash item (static + generator instances at 5 seeds each) displayed', seen.size === keys.size, `${seen.size}/${keys.size} distinct items`);
  finishSweep(store, 'flash');
  metric('consoleErrors', errors);
  check('no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}
function finishSweep(store, kind) {
  const clipped = store.filter((s) => s.vClipped?.length);
  const scrolling = store.filter((s) => s.optionsScrolling > 0);
  const widestOpt = [...store].sort((a, b) => (b.optionScrollX ?? 0) - (a.optionScrollX ?? 0)).slice(0, 8);
  const widestPrompt = [...store].sort((a, b) => (b.promptScrollX ?? 0) - (a.promptScrollX ?? 0)).slice(0, 8);
  metric('unitsSwept', store.filter((s) => s.counter).length);
  metric('unitsWithSideScrollingOptions', scrolling.length);
  metric('widestOptions', widestOpt.map((s) => ({ id: s.id, scrollX: s.optionScrollX })));
  metric('widestPrompts', widestPrompt.map((s) => ({ id: s.id, scrollX: s.promptScrollX })));
  metric('verticallyClipped', clipped.map((s) => ({ id: s.id, vClipped: s.vClipped })));
  metric('minOptionHeight', Math.min(...store.filter((s) => s.minOptH).map((s) => s.minOptH)));
  metric('minFirstOptionTop', Math.min(...store.filter((s) => s.firstTop).map((s) => s.firstTop)));
  writeFileSync(`${RESULTS}/sweep-${kind}-units.json`, JSON.stringify(store, null, 1));
  check(`sweep ${kind}: no vertically clipped math/text (overflow-y hidden, >2px)`, clipped.length === 0, `${clipped.length} units, e.g. ${clipped.slice(0, 3).map((s) => `${s.id}: ${s.vClipped[0]}`).join(' || ')}`);
}

// ── long math: widest option and widest prompt from the sweeps ─────────────────────────────
async function scenarioLongMath(browser) {
  const load = (k) => (existsSync(`${RESULTS}/sweep-${k}-units.json`) ? JSON.parse(readFileSync(`${RESULTS}/sweep-${k}-units.json`, 'utf8')) : []);
  const all = [...load('flash'), ...load('steps')].filter((s) => s.id && s.counter);
  const widestOpt = [...all].sort((a, b) => b.optionScrollX - a.optionScrollX)[0];
  const widestPrompt = [...all].sort((a, b) => b.promptScrollX - a.promptScrollX)[0];
  const longestSource = [...UNITS].sort((a, b) => Math.max(...b.sources.map((s) => s.length)) - Math.max(...a.sources.map((s) => s.length)))[0];
  const targets = [
    ['widest option', widestOpt?.id],
    ['widest prompt', widestPrompt?.id],
    ['longest option source', longestSource?.id],
  ].filter(([, id]) => id);
  metric('targets', Object.fromEntries(targets));
  const { context, page, errors } = await newCtx(browser);
  await open(page);
  for (const [label, id] of targets) {
    const now = Date.now();
    await setStorage(page, { progress: { version: 1, units: { [id]: { misses: 1, lastMissedAt: now, lastSeenAt: now, correctSince: 0 } } }, settings: { version: 1, roundSize: 10, topics: TOPIC_IDS } });
    await page.reload();
    await page.waitForSelector('.home');
    await clickTo(page, 'text=Review');
    const q = await read(page);
    const slug = label.replace(/\W+/g, '-');
    await shot(page, `qa-long-math-${slug}`);
    const scroll = await page.evaluate(() => {
      const els = [...document.querySelectorAll('.opt .math-scroll, .opt .rich, .stage .math-scroll, .stage .rich')].filter((e) => e.scrollWidth > e.clientWidth + 1);
      return els.map((e) => {
        const before = e.scrollLeft;
        e.scrollLeft = e.scrollWidth;
        const after = e.scrollLeft;
        return { cls: e.className, scrollWidth: e.scrollWidth, clientWidth: e.clientWidth, overflowX: getComputedStyle(e).overflowX, scrolledTo: after, before, html: document.documentElement.scrollWidth, body: document.body.scrollWidth };
      });
    });
    await shot(page, `qa-long-math-${slug}-scrolled`);
    metric(label, { id, scroll });
    check(`long math (${label}, ${id}): page does not scroll sideways`, q.docScrollW <= 390 && q.bodyScrollW <= 390 && scroll.every((s) => s.html <= 390 && s.body <= 390), `html ${q.docScrollW} body ${q.bodyScrollW}`);
    check(`long math (${label}, ${id}): overflowing math scrolls inside its own container`, scroll.length === 0 || scroll.every((s) => s.overflowX === 'auto' && s.scrolledTo > 0), JSON.stringify(scroll.map((s) => `${s.cls} ${s.scrollWidth}/${s.clientWidth} → scrollLeft ${s.scrolledTo}`)));
    const res = await answer(page, 'wrong', 0, { before: q, fast: true });
    await shot(page, `qa-long-math-${slug}-feedback`);
    check(`long math (${label}): feedback layout keeps the page ≤390`, res.after.docScrollW <= 390 && res.after.bodyScrollW <= 390 && res.after.hClipped.length === 0, `html ${res.after.docScrollW} clipped ${JSON.stringify(res.after.hClipped.slice(0, 1))}`);
  }
  check('no console errors / page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  await context.close();
}

// ── main ─────────────────────────────────────────────────────────────────────────────────────
const SCENARIOS = {
  home: scenarioHome,
  flash: scenarioFlash,
  steps: scenarioSteps,
  review: scenarioReview,
  settings: scenarioSettings,
  dark: scenarioDark,
  storage: scenarioStorage,
  perf: scenarioPerf,
  weighting: scenarioWeighting,
  offline: scenarioOffline,
  'offline-hard': scenarioOfflineHard,
  'sweep-steps': scenarioSweepSteps,
  'sweep-flash': scenarioSweepFlash,
  longmath: scenarioLongMath,
};
const wanted = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SCENARIOS);
const browser = await launch();
let failures = 0;
for (const name of wanted) {
  const fn = SCENARIOS[name];
  if (!fn) {
    console.error(`unknown scenario ${name}`);
    continue;
  }
  current = { name, startedAt: new Date().toISOString(), checks: [], metrics: {}, agg: {} };
  const t0 = Date.now();
  try {
    await fn(browser);
  } catch (e) {
    aggFlush();
    check('scenario ran to completion', false, (e.stack ?? String(e)).split('\n').slice(0, 4).join(' ⏎ '));
    try {
      if (activePage && !activePage.isClosed()) await activePage.screenshot({ path: `${SHOTS}/qa-error-${name}.png` });
    } catch {
      // ignore
    }
  }
  aggFlush();
  current.seconds = Math.round((Date.now() - t0) / 1000);
  delete current.agg;
  writeFileSync(`${RESULTS}/play-${name}.json`, JSON.stringify(current, null, 2));
  writeFileSync(`${RESULTS}/layout.json`, JSON.stringify(LAYOUT, null, 2));
  const f = current.checks.filter((c) => !c.ok).length;
  failures += f;
  console.log(`== ${name}: ${current.checks.length - f}/${current.checks.length} checks passed (${current.seconds}s)`);
}
await browser.close();
process.exit(failures ? 1 : 0);
