// Whole-site responsive + health sweep. Collects every internal page from the rendered links, then probes each at
// every width. MSYS_NO_PATHCONV=1 node site-qa.mjs --out <dir> [--widths 320,...] [--shots 390,1440] [--base url]
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { launch, PROBE } from './cdp.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://localhost:3000');
const out = arg('out', '.');
const widths = arg('widths', '320,360,375,390,430,480,640,768,820,1024,1280,1366,1440,1600,1920,2560').split(',').map(Number);
const shots = new Set(arg('shots', '').split(',').filter(Boolean).map(Number));
const only = arg('paths', '');
mkdirSync(out, { recursive: true });

const browser = await launch();
const page = await browser.newPage();
const report = { base, widths, pages: {} };
try {
  // 1. Discover pages: start from the nav + footer of a few pages, follow internal links (no query strings, no hashes).
  let pages = only ? only.split(',') : [];
  if (!pages.length) {
    const seen = new Set(['/']);
    const queue = ['/'];
    await page.viewport(1440, 900);
    while (queue.length) {
      const p = queue.shift();
      await page.goto(base + p, { settle: 300 });
      const hrefs = await page.eval(`[...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href'))`);
      for (const h of hrefs) {
        if (!h.startsWith('/') || h.startsWith('//')) continue;
        const clean = h.split('#')[0].split('?')[0];
        if (!clean || seen.has(clean) || /\.[a-z0-9]+$/i.test(clean)) continue; // pages only, not image or file links
        seen.add(clean);
        queue.push(clean);
      }
    }
    pages = [...seen].sort();
  }
  report.discovered = pages;
  // HTTP status of every discovered page (a broken internal link shows up here as a 404), and URLs that must be 404:
  // the removed language routes and unknown pages and slugs.
  report.status = {};
  for (const u of pages) {
    const r = await fetch(base + u, { redirect: 'manual' });
    report.status[u] = r.status;
    if (r.status !== 200) console.log(`STATUS ${r.status} ${u}`);
  }
  console.log(`checked ${pages.length} URLs, non-200: ${Object.values(report.status).filter((c) => c !== 200).length}`);
  report.mustBe404 = {};
  for (const u of ['/ml', '/ml/about', '/en/about', '/no-such-page', '/tours/no-such-tour', '/blogs/no-such-article', '/branches/no-such-branch']) {
    const r = await fetch(base + u, { redirect: 'manual' });
    report.mustBe404[u] = r.status;
    if (r.status !== 404) console.log(`EXPECTED 404, GOT ${r.status} ${u}`);
  }
  console.log(`must-be-404 URLs: ${Object.values(report.mustBe404).filter((c) => c === 404).length}/${Object.keys(report.mustBe404).length} return 404`);
  // 2. Probe every page at every width.
  for (const p of pages) {
    report.pages[p] = {};
    for (const w of widths) {
      const h = w < 810 ? 844 : w <= 1024 ? 1024 : 900;
      await page.viewport(w, h, { reduced: true });
      await page.goto(base + p, { settle: 250 });
      if (shots.has(w)) await page.loadLazy();
      const r = await page.eval(PROBE);
      r.console = page.console.filter((c) => !/Largest Contentful Paint|Fast Refresh|\[HMR\]/.test(c)).slice(0, 3);
      r.exceptions = page.exceptions.slice(0, 2);
      if (shots.has(w)) {
        const name = `${p === '/' ? 'home' : p.slice(1).replace(/\//g, '_')}-${w}.jpg`;
        await page.shot(join(out, name));
        r.shot = name;
      }
      report.pages[p][w] = r;
      const bad = r.overflow > 0 || r.brokenImages.length || r.deadLinks.length || r.h1 !== 1 || r.unnamed.length || r.console.length || r.exceptions.length || r.forbidden || r.smallText.length;
      if (bad) console.log(`ISSUE ${p} @${w}: ${JSON.stringify({ overflow: r.overflow, offenders: r.offenders, broken: r.brokenImages, dead: r.deadLinks, h1: r.h1, unnamed: r.unnamed, small: r.smallText, console: r.console, exc: r.exceptions, forbidden: r.forbidden })}`);
    }
    process.stdout.write(`done ${p}\n`);
  }
} finally {
  writeFileSync(join(out, 'site-qa.json'), JSON.stringify(report, null, 1));
  await page.close();
  await browser.close();
}
const rows = Object.entries(report.pages).map(([p, ws]) => {
  const v = Object.values(ws);
  return `${p.padEnd(42)} maxOverflow=${Math.max(...v.map((r) => r.overflow))} broken=${v.reduce((a, r) => a + r.brokenImages.length, 0)} dead=${v.reduce((a, r) => a + r.deadLinks.length, 0)} h1=${[...new Set(v.map((r) => r.h1))].join('/')} console=${v.reduce((a, r) => a + r.console.length + r.exceptions.length, 0)} title="${v[0].title}"`;
});
console.log(rows.join('\n'));
