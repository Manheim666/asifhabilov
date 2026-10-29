// Local QA: node scripts/check.mjs [url] — needs `npm i playwright` somewhere on NODE_PATH.
// Checks console errors, failed requests, broken images, horizontal overflow, mobile menu, and link status.
import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:8000/';
const exe = process.env.BROWSER || '/usr/bin/brave';
const outDir = process.env.SHOTS || '.';
const b = await chromium.launch({ executablePath: exe, headless: true });
let problems = 0;
for (const [name, w, h] of [['desktop', 1440, 900], ['tablet', 820, 1180], ['mobile', 390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = [];
  p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  p.on('pageerror', e => errs.push(String(e)));
  p.on('requestfailed', r => errs.push('FAILED ' + r.url()));
  p.on('response', r => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  await p.goto(url, { waitUntil: 'networkidle' });
  for (let y = 0; y < 12000; y += 700) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(60); }
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    broken: [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src),
    missingAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
    font: document.fonts.check('16px "Schibsted Grotesk"'),
    anchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')).filter(h => h.length > 1 && !document.querySelector(h)),
  }));
  if (name === 'mobile') {
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.click('.nav-toggle');
    r.menuOpens = await p.isVisible('#site-nav a[href="#skills"]');
    await p.click('#site-nav a[href="#skills"]');
    await p.waitForTimeout(600);
    r.menuClosesAfterNav = !(await p.isVisible('#site-nav a[href="#skills"]'));
    await p.evaluate(() => window.scrollTo(0, 0));
  }
  await p.screenshot({ path: `${outDir}/shot-${name}.png`, fullPage: true });
  const bad = errs.length || r.overflow > 0 || r.broken.length || r.missingAlt || !r.font || r.anchors.length || r.menuOpens === false || r.menuClosesAfterNav === false;
  if (bad) problems++;
  console.log(name, bad ? 'PROBLEMS' : 'ok', JSON.stringify({ ...r, errs }));
  if (name === 'desktop') {
    const links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="http"]')].map(a => a.href))]);
    for (const l of links) {
      let s; try { s = (await fetch(l, { method: 'GET', redirect: 'follow' })).status; } catch (e) { s = 'ERR ' + e.message; }
      if (s !== 200) problems++;
      console.log('  link', s, l);
    }
  }
  await p.close();
}
await b.close();
console.log(problems ? `${problems} problem group(s)` : 'All checks passed');
process.exit(problems ? 1 : 0);
