// Minimal Chrome DevTools Protocol client (Node 22: global WebSocket, no packages).
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch({ port = 9300 + Math.floor(Math.random() * 600) } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'hijra-qa-'));
  const proc = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${dir}`, '--no-first-run', '--no-default-browser-check',
    '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--disable-extensions', '--force-color-profile=srgb', 'about:blank',
  ], { stdio: 'ignore' });
  let ver;
  for (let i = 0; i < 60; i++) {
    try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); break; } catch { await sleep(250); }
  }
  if (!ver) throw new Error('Chrome did not start');
  const ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0;
  const pending = new Map();
  const listeners = new Set();
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id); pending.delete(msg.id);
      if (msg.error) rej(new Error(`${msg.error.message} ${msg.error.data || ''}`));
      else res(msg.result);
    } else for (const l of listeners) l(msg);
  };
  const send = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const mid = ++id; pending.set(mid, { res, rej });
    ws.send(JSON.stringify({ id: mid, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
  const browser = {
    async newPage() {
      const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
      const s = (method, params) => send(method, params, sessionId);
      const page = { targetId, sessionId, send: s, console: [], exceptions: [] };
      listeners.add((msg) => {
        if (msg.sessionId !== sessionId) return;
        if (msg.method === 'Runtime.consoleAPICalled' && (msg.params.type === 'error' || msg.params.type === 'warning'))
          page.console.push(`${msg.params.type}: ${msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ')}`.slice(0, 400));
        if (msg.method === 'Runtime.exceptionThrown') page.exceptions.push((msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text || '').slice(0, 400));
        if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') page.console.push(`log: ${msg.params.entry.text} ${msg.params.entry.url || ''}`.slice(0, 400));
        if (msg.method === 'Page.loadEventFired') page._loaded = true;
        if (page.onEvent) page.onEvent(msg);
      });
      await s('Page.enable'); await s('Runtime.enable'); await s('Log.enable');
      page.eval = async (expr) => {
        const r = await s('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
        if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
        return r.result.value;
      };
      page.viewport = async (width, height = 900, { mobile = width < 810, reduced = true } = {}) => {
        await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile, screenWidth: width, screenHeight: height });
        await s('Emulation.setTouchEmulationEnabled', mobile ? { enabled: true, maxTouchPoints: 5 } : { enabled: false });
        await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }] });
      };
      page.goto = async (url, { settle = 600 } = {}) => {
        page._loaded = false; page.console.length = 0; page.exceptions.length = 0;
        await s('Page.navigate', { url });
        // A busy dev server can take a while to compile a route: wait up to 90 s for the load event, never throw.
        for (let i = 0; i < 900 && !page._loaded; i++) await sleep(100);
        if (!page._loaded) page.console.push('harness: load event not seen within 90 s');
        try { await page.eval("document.head.appendChild(Object.assign(document.createElement('style'), { textContent: 'html{scrollbar-gutter:auto!important}' })); document.fonts.ready.then(() => true)"); } catch (e) { page.console.push('harness: ' + String(e).slice(0, 120)); }
        // (headless hides scrollbars, so the reserved scrollbar gutter is dropped and captures are edge to edge)
        await sleep(settle);
      };
      page.loadLazy = async () => {
        await page.eval(`(async () => {
          const h = () => document.documentElement.scrollHeight;
          for (let y = 0; y < h(); y += Math.max(400, innerHeight * 0.8)) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
          scrollTo(0, h()); await new Promise(r => setTimeout(r, 150));
          await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000); })));
          scrollTo(0, 0); await new Promise(r => setTimeout(r, 150)); return true; })()`);
      };
      page.shot = async (file, { full = true, maxHeight = 16000 } = {}) => {
        const { writeFileSync } = await import('node:fs');
        const dims = await page.eval('({ w: innerWidth, h: Math.min(document.documentElement.scrollHeight, ' + maxHeight + ') })');
        const r = await s('Page.captureScreenshot', full
          ? { format: 'jpeg', quality: 72, captureBeyondViewport: true, clip: { x: 0, y: 0, width: dims.w, height: dims.h, scale: 1 } }
          : { format: 'jpeg', quality: 80 });
        writeFileSync(file, Buffer.from(r.data, 'base64'));
        return dims;
      };
      page.close = () => send('Target.closeTarget', { targetId });
      return page;
    },
    async close() { try { await send('Browser.close'); } catch {} ws.close(); await sleep(300); try { proc.kill(); } catch {} try { rmSync(dir, { recursive: true, force: true }); } catch {} },
  };
  return browser;
}

/** Page health probe: overflow, broken images, dead links, headings, unnamed controls, metadata, and (with QA_FORBID set to
 * a regular expression) whether any excluded wording appears on the page. */
export const PROBE = `(() => {
  const FORBID = ${JSON.stringify(process.env.QA_FORBID || '')};
  const W = innerWidth, out = { url: location.pathname, title: document.title };
  out.sw = document.documentElement.scrollWidth; out.overflow = out.sw - W;
  const clipped = (el) => { for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o !== 'visible') return true; } return false; };
  out.offenders = [...document.querySelectorAll('body *')].filter((el) => { const r = el.getBoundingClientRect(); return r.width && (r.right > W + 1 || r.left < -1) && !clipped(el) && getComputedStyle(el).position !== 'fixed'; })
    .slice(0, 6).map((el) => (el.tagName + '.' + (el.className?.baseVal ?? el.className)).slice(0, 80) + ' ' + Math.round(el.getBoundingClientRect().right));
  out.brokenImages = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.getClientRects().length).map((i) => i.currentSrc || i.src).slice(0, 5);
  out.imgNoAlt = [...document.images].filter((i) => !i.hasAttribute('alt')).length;
  out.deadLinks = [...document.querySelectorAll('a')].filter((a) => { const h = a.getAttribute('href'); return h === null || h === '' || h === '#'; }).map((a) => a.outerHTML.slice(0, 120)).slice(0, 5);
  out.h1 = [...document.querySelectorAll('main h1')].filter((h) => h.getClientRects().length).length;
  const hs = [...document.querySelectorAll('main h1, main h2, main h3, main h4')].filter((h) => h.getClientRects().length).map((h) => +h.tagName[1]);
  out.headingJumps = hs.filter((l, i) => i && l - hs[i - 1] > 1).length;
  out.unnamed = [...document.querySelectorAll('button, a[href], input:not([type=hidden]), select, textarea')].filter((el) => {
    if (!el.getClientRects().length) return false;
    const name = (el.getAttribute('aria-label') || el.textContent || '').trim() || (el.labels && el.labels.length) || el.getAttribute('aria-labelledby') || el.getAttribute('title') || (el.querySelector && el.querySelector('img[alt]:not([alt=""])'));
    return !name;
  }).map((el) => el.outerHTML.slice(0, 100)).slice(0, 5);
  const small = [...document.querySelectorAll('main *, footer *')].filter((el) => el.childElementCount === 0 && el.textContent.trim() && el.getClientRects().length && parseFloat(getComputedStyle(el).fontSize) < 13.9);
  out.smallText = small.slice(0, 4).map((el) => el.tagName + ':' + el.textContent.trim().slice(0, 30) + ':' + getComputedStyle(el).fontSize);
  out.description = document.querySelector('meta[name=description]')?.content?.slice(0, 160) || null;
  out.canonical = document.querySelector('link[rel=canonical]')?.href || null;
  out.height = document.documentElement.scrollHeight;
  out.forbidden = FORBID ? new RegExp(FORBID, 'i').test(document.body.innerText) : false;
  return out;
})()`;
