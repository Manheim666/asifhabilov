// QA for the built site: node scripts/check.mjs http://localhost:4173/
// Needs Playwright (installed in ~/Desktop/Asif_Career_Kit/.tools) and a Chromium-based browser.
import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:4173/';
const exe = process.env.BROWSER || '/usr/bin/brave';
const out = process.env.SHOTS || '.';
const b = await chromium.launch({ executablePath: exe, headless: true });
let problems = 0;
const runs = [['desktop', 1440, 900, 'no-preference'], ['tablet', 820, 1180, 'no-preference'], ['mobile', 390, 844, 'no-preference'], ['mobile-reduced', 390, 844, 'reduce']];
for (const [name, w, h, motion] of runs) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: motion });
  const p = await ctx.newPage();
  const errs = [];
  p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  p.on('pageerror', e => errs.push(String(e)));
  p.on('requestfailed', r => errs.push('FAILED ' + r.url()));
  p.on('response', r => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(3200); // intro
  await p.screenshot({ path: `${out}/shot-${name}-0.png` });
  const total = await p.evaluate(() => document.documentElement.scrollHeight);
  let i = 1;
  for (let y = 0; y < total; y += h * 0.9) {
    await p.mouse.wheel(0, h * 0.9); await p.waitForTimeout(700);
    if (i <= 12 && (name === 'desktop' || name === 'mobile')) await p.screenshot({ path: `${out}/shot-${name}-${i}.png` });
    i++;
  }
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => ({
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
    broken: [...document.images].filter(im => im.complete && im.naturalWidth === 0).map(im => im.src),
    missingAlt: [...document.images].filter(im => !im.hasAttribute('alt')).length,
    videoOk: (() => { const v = document.querySelector('video'); return !!v && v.readyState >= 2; })(),
    hiddenReveal: [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity === '0').length,
    font: document.fonts.check('16px Archivo') || [...document.fonts].some(f => f.status === 'loaded'),
    deadAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(x => x.length > 1 && !document.querySelector(x)),
  }));
  const bad = errs.length || r.overflowX > 0 || r.broken.length || r.missingAlt || !r.videoOk || r.hiddenReveal || r.deadAnchors.length;
  if (bad) problems++;
  console.log(name, bad ? 'PROBLEMS' : 'ok', JSON.stringify({ ...r, errs }));
  if (name === 'desktop') {
    const links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="http"]')].map(a => a.href))]);
    for (const l of links) { let s; try { s = (await fetch(l)).status; } catch (e) { s = 'ERR'; } if (s !== 200) problems++; console.log('  link', s, l); }
  }
  await ctx.close();
}
await b.close();
console.log(problems ? `${problems} problem group(s)` : 'All checks passed');
process.exit(problems ? 1 : 0);
