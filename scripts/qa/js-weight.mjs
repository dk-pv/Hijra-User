// JavaScript a visitor downloads to see and use a page (no interaction), file by file, on a production server.
// Also lists every request that failed or returned 4xx/5xx, and console errors and warnings.
// MSYS_NO_PATHCONV=1 node scripts/qa/js-weight.mjs --base http://localhost:3100 --paths /,/umrah [--width 390] [--settle 4000] [--files]
// "html" = chunks referenced by the page's HTML (needed for hydration); "later" = chunks fetched afterwards
// (lazy components, prefetched routes).
import { launch } from './cdp.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://localhost:3100');
const paths = arg('paths', '/').split(',');
const settle = Number(arg('settle', 4000));
const showFiles = process.argv.includes('--files');
const width = Number(arg('width', 390));

const browser = await launch();
try {
  for (const path of paths) {
    const page = await browser.newPage();
    const urls = new Map();
    const bad = [];
    page.onEvent = (m) => {
      if (m.method === 'Network.requestWillBeSent') urls.set(m.params.requestId, m.params.request.url);
      if (m.method === 'Network.responseReceived' && m.params.response.status >= 400)
        bad.push(`${m.params.response.status} ${m.params.type} ${m.params.response.url.replace(base, '')}`);
      if (m.method === 'Network.loadingFailed' && !m.params.canceled)
        bad.push(`${m.params.errorText} ${m.params.type} ${(urls.get(m.params.requestId) || '').replace(base, '')}`);
    };
    await page.send('Network.enable');
    await page.send('Network.setCacheDisabled', { cacheDisabled: true });
    await page.viewport(width, width < 810 ? 844 : 900);
    await page.goto(base + path, { settle });
    const files = await page.eval(`(async () => {
      // The server's HTML, not the live DOM: the router inserts script tags later for prefetched routes.
      const html = await (await fetch(location.href, { cache: 'no-store' })).text();
      const inHtml = new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => new URL(m[1].replace(/&amp;/g, '&'), location.href).href));
      return performance.getEntriesByType('resource').filter((x) => /\\.js(\\?|$)/.test(x.name)).map((x) => ({
        file: x.name.replace(location.origin, ''), kb: +(x.encodedBodySize / 1024).toFixed(1), rawKb: +(x.decodedBodySize / 1024).toFixed(1), html: inHtml.has(x.name),
      }));
    })()`);
    const sum = (list, k) => +list.reduce((a, f) => a + f[k], 0).toFixed(1);
    const html = files.filter((f) => f.html);
    const later = files.filter((f) => !f.html);
    console.log(JSON.stringify({
      path,
      htmlJsKB: sum(html, 'kb'), htmlJsRawKB: sum(html, 'rawKb'), htmlFiles: html.length,
      laterJsKB: sum(later, 'kb'), laterFiles: later.length,
      bad, console: page.console, exceptions: page.exceptions,
      ...(showFiles ? { files: files.sort((a, b) => b.kb - a.kb) } : {}),
    }));
    await page.close();
  }
} finally {
  await browser.close();
}
