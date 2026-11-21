// Lab Core Web Vitals on a production server, under throttled mobile conditions (Lighthouse-like "Slow 4G" + 4x CPU).
// MSYS_NO_PATHCONV=1 node perf.mjs --base http://localhost:3100 --paths /,/umrah [--runs 3] [--desktop]
// LCP and CLS come from PerformanceObserver (buffered); INP is approximated by the slowest event-timing duration of
// three real interactions (menu open, menu close, an accordion/summary click).
import { launch } from './cdp.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://localhost:3100');
const paths = arg('paths', '/').split(',');
const runs = Number(arg('runs', 3));
const desktop = process.argv.includes('--desktop');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await launch();
const rows = [];
try {
  for (const path of paths) {
    const samples = [];
    for (let i = 0; i < runs; i++) {
      const page = await browser.newPage();
      await page.send('Network.enable');
      await page.send('Network.setCacheDisabled', { cacheDisabled: true });
      if (!desktop) {
        await page.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
        await page.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      }
      await page.viewport(desktop ? 1440 : 390, desktop ? 900 : 844, { reduced: false });
      await page.send('Page.addScriptToEvaluateOnNewDocument', {
        source: `window.__v = { lcp: 0, lcpEl: '', cls: 0, inp: 0 };
          new PerformanceObserver(l => { for (const e of l.getEntries()) { __v.lcp = e.startTime; __v.lcpEl = (e.element && (e.element.tagName + ' ' + (e.element.currentSrc || e.element.textContent || '').slice(0, 60))) || e.url || ''; } }).observe({ type: 'largest-contentful-paint', buffered: true });
          new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) __v.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
          new PerformanceObserver(l => { for (const e of l.getEntries()) if (e.interactionId) __v.inp = Math.max(__v.inp, e.duration); }).observe({ type: 'event', buffered: true, durationThreshold: 16 });`,
      });
      const t0 = Date.now();
      await page.goto(base + path, { settle: 2500 });
      const load = Date.now() - t0;
      // Interactions for the INP proxy
      const click = async (sel) => {
        const box = await page.eval(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`);
        if (!box) return;
        for (const type of ['mousePressed', 'mouseReleased']) await page.send('Input.dispatchMouseEvent', { type, x: box.x, y: box.y, button: 'left', clickCount: 1 });
        await sleep(1200);
      };
      const lcpBefore = await page.eval('JSON.stringify(__v)');
      await click('.nav-burger');
      await click('.menu-close');
      await page.eval(`(() => { const s = document.querySelector('summary'); if (s) s.scrollIntoView({ block: 'center' }); return 1 })()`);
      await sleep(400);
      await click('summary');
      const v = JSON.parse(lcpBefore);
      v.inp = JSON.parse(await page.eval('JSON.stringify(__v)')).inp;
      const res = await page.eval(`(() => { const r = performance.getEntriesByType('resource'); const nav = performance.getEntriesByType('navigation')[0]; const sum = (f) => Math.round(r.filter(f).reduce((a, x) => a + (x.encodedBodySize || x.transferSize || 0), 0) / 1024);
        return { html: Math.round((nav.encodedBodySize || nav.transferSize) / 1024), js: sum(x => /\\.js(\\?|$)/.test(x.name)), css: sum(x => /\\.css(\\?|$)/.test(x.name)), img: sum(x => x.initiatorType === 'img' || /_next\\/image/.test(x.name)), font: sum(x => /\\.woff2/.test(x.name)), ttfb: Math.round(nav.responseStart) } })()`);
      samples.push({ ...v, load, ...res });
      await page.close();
    }
    const med = (k) => samples.map((s) => s[k]).sort((a, b) => a - b)[Math.floor(samples.length / 2)];
    rows.push({ path, mode: desktop ? 'desktop' : 'mobile-throttled', lcp: Math.round(med('lcp')), cls: +med('cls').toFixed(3), inpProxy: Math.round(med('inp')), ttfb: med('ttfb'), htmlKB: med('html'), jsKB: med('js'), cssKB: med('css'), imgKB: med('img'), fontKB: med('font'), lcpEl: samples[0].lcpEl });
  }
} finally {
  await browser.close();
}
for (const r of rows) console.log(JSON.stringify(r));
