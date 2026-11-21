// Navigation interaction test (report 3.9 rules) with real key events.
// MSYS_NO_PATHCONV=1 node nav-test.mjs [--base http://localhost:3000] [--out dir]
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { launch } from './cdp.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://localhost:3000');
const out = arg('out', '.');
mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail: typeof detail === 'string' ? detail : JSON.stringify(detail) });

const browser = await launch();
try {
  const page = await browser.newPage();
  const key = async (k, code, vk, shift = false) => {
    const p = { key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk, modifiers: shift ? 8 : 0 };
    await page.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...p });
    await page.send('Input.dispatchKeyEvent', { type: 'keyUp', ...p });
    await sleep(60);
  };
  const tab = (shift) => key('Tab', 'Tab', 9, shift);
  const active = () => page.eval(`(() => { const a = document.activeElement; return a ? (a.getAttribute('aria-label') || a.textContent.trim().slice(0, 24) || a.tagName) + '|' + a.className : null })()`);
  const click = async (sel) => {
    const box = await page.eval(`(() => { const r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`);
    for (const type of ['mousePressed', 'mouseReleased']) await page.send('Input.dispatchMouseEvent', { type, x: box.x, y: box.y, button: 'left', clickCount: 1 });
  };

  // Desktop, full motion
  await page.viewport(1440, 900, { reduced: false });
  await page.goto(base + '/');
  await sleep(3500);
  check('menu prebuilt when idle (F8)', await page.eval(`!!document.getElementById('site-menu')`));
  check('trigger is a named button (F2)', await page.eval(`(() => { const b = document.querySelector('.nav-burger'); return b.tagName === 'BUTTON' && b.getAttribute('aria-label') === 'Open menu' && b.getAttribute('aria-expanded') === 'false' })()`));
  await click('.nav-burger');
  await sleep(150);
  check('aria-expanded true after open', (await page.eval(`document.querySelector('.nav-burger').getAttribute('aria-expanded')`)) === 'true');
  check('focus moves to the X first', (await active())?.startsWith('Close menu|menu-close'), await active());
  check('page inert (F3)', await page.eval(`document.getElementById('page').hasAttribute('inert')`));
  check('scroll locked (F5)', (await page.eval(`document.documentElement.style.overflow`)) === 'hidden');
  check('dialog semantics', await page.eval(`(() => { const d = document.getElementById('site-menu'); return d.getAttribute('role') === 'dialog' && d.getAttribute('aria-modal') === 'true' })()`));
  await page.shot(join(out, 'menu-opening-1440.jpg'), { full: false });
  await sleep(900);
  await page.shot(join(out, 'menu-open-1440.jpg'), { full: false });
  const links = await page.eval(`[...document.querySelectorAll('#site-menu .menu-link')].map(a => [a.textContent.trim(), a.getAttribute('href'), a.getAttribute('aria-current')])`);
  check('nine links in the confirmed order (C6)', links.map((l) => l[0]).join(',') === 'Home,About Us,Branches,Hajj & Umrah,Tours,Flight,Visa,Blogs,Book A Trip', links);
  check('current page marked (O10)', links[0][2] === 'page');
  check('no # links in menu', links.every((l) => l[1] && l[1] !== '#'));
  // Tab order and the trap
  const order = [];
  for (let i = 0; i < 18; i++) { await tab(); order.push(await active()); }
  check('Tab stays inside the menu (F3)', order.every((o) => o && !o.includes('nav-burger') && !o.includes('skip-link')), order);
  await key('Escape', 'Escape', 27);
  await sleep(1100);
  check('Escape closes', (await page.eval(`document.documentElement.dataset.menu || 'closed'`)) === 'closed');
  check('focus returns to the menu button', (await active())?.includes('nav-burger'), await active());
  check('page no longer inert, scroll unlocked', await page.eval(`!document.getElementById('page').hasAttribute('inert') && document.documentElement.style.overflow === ''`));
  // Hover line (pointer device)
  await click('.nav-burger');
  await sleep(1000);
  const tours = await page.eval(`(() => { const r = [...document.querySelectorAll('#site-menu .menu-link')][4].getBoundingClientRect(); return { x: r.x + 20, y: r.y + r.height / 2 } })()`);
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: tours.x, y: tours.y });
  await sleep(500);
  check('hover line grows to 25 px (R11)', (await page.eval(`getComputedStyle([...document.querySelectorAll('#site-menu .menu-line')][4]).width`)) === '25px');
  await page.shot(join(out, 'menu-hover-1440.jpg'), { full: false });
  // Navigate by link: menu closes as the page changes, focus moves to the h1
  await click('#site-menu .menu-link[href="/about"]');
  await sleep(2500);
  check('link navigates', (await page.eval('location.pathname')) === '/about', await page.eval('location.pathname'));
  check('menu closed after navigation', (await page.eval(`document.documentElement.dataset.menu || 'closed'`)) === 'closed');
  check('focus on the new page h1', (await page.eval(`document.activeElement?.tagName`)) === 'H1', await active());

  // Background requests (Milestone 1 bug: the hidden menu prefetched in a loop, about 1,100 requests in 4 s).
  // After load the page goes quiet; opening the menu prefetches its nine destinations once, and never again.
  let requests = [];
  page.onEvent = (m) => {
    if (m.method === 'Network.requestWillBeSent') requests.push(m.params.request.url.replace(base, ''));
  };
  await page.send('Network.enable');
  await page.goto(base + '/');
  await sleep(4000);
  requests = [];
  await sleep(4000);
  const idle = requests.length;
  await click('.nav-burger');
  await sleep(2500);
  await key('Escape', 'Escape', 27);
  await sleep(1200);
  const first = requests.slice(idle);
  await click('.nav-burger');
  await sleep(2500);
  await key('Escape', 'Escape', 27);
  await sleep(1200);
  const second = requests.slice(idle + first.length);
  check(`quiet after load: ${idle} requests in 4 s with the menu closed (at most 2)`, idle <= 2, requests.slice(0, idle));
  check(`first menu open and close: ${first.length} requests, one round of prefetches (at most 30)`, first.length <= 30, first);
  check(`second menu open and close: ${second.length} requests, nothing fetched again (at most 2)`, second.length <= 2, second);
  page.onEvent = null;
  await page.send('Network.disable');

  // Reduced motion: appears with a short fade
  await page.viewport(1440, 900, { reduced: true });
  await page.goto(base + '/');
  await sleep(3500);
  await click('.nav-burger');
  await sleep(250);
  check('reduced motion: open within 250 ms', (await page.eval(`getComputedStyle(document.getElementById('site-menu')).opacity`)) === '1');

  // Floating WhatsApp button (F11, F14): not on the first screen, appears after scrolling, hidden in the open menu,
  // steps aside for the footer, absent on Book A Trip.
  await page.viewport(390, 844, { reduced: true });
  await page.goto(base + '/about');
  await sleep(1500);
  const fab = () => page.eval(`(() => { const f = document.querySelector('.wa-fab'); return f ? { show: f.dataset.show, visibility: getComputedStyle(f).visibility } : null })()`);
  check('WhatsApp button hidden on the first screen', (await fab())?.show === 'false', await fab());
  let shownAt = null;
  for (let y = 400; y < 8000 && shownAt === null; y += 400) {
    await page.eval(`scrollTo(0, ${y})`);
    await sleep(350);
    if ((await fab())?.show === 'true') shownAt = y;
  }
  check(`WhatsApp button appears after scrolling (at ${shownAt} px)`, shownAt !== null);
  await click('.nav-burger');
  await sleep(500);
  check('WhatsApp button hidden while the menu is open', (await fab())?.visibility === 'hidden', await fab());
  await key('Escape', 'Escape', 27);
  await sleep(500);
  await page.eval('scrollTo(0, document.documentElement.scrollHeight)');
  await sleep(600);
  check('WhatsApp button steps aside at the footer', (await fab())?.show === 'false', await fab());
  await page.goto(base + '/book-a-trip');
  await sleep(1000);
  check('no WhatsApp button on Book A Trip', (await fab()) === null);

  // Phones
  for (const [w, h] of [[390, 844], [375, 667], [320, 568]]) {
    await page.viewport(w, h, { reduced: true });
    await page.goto(base + '/umrah-missing-page');
    await sleep(3500);
    await page.shot(join(out, `pill-${w}.jpg`), { full: false });
    const pill = await page.eval(`(() => { const p = document.querySelector('.nav-pill').getBoundingClientRect(); const items = [...document.querySelectorAll('.nav-pill > *')].map(e => e.getBoundingClientRect()); return { left: p.left, right: p.right, overflow: items.some(r => r.right > p.right + 0.5 || r.left < p.left - 0.5) } })()`);
    check(`pill fits at ${w}px`, pill.left >= 0 && pill.right <= w && !pill.overflow, pill);
    await click('.nav-burger');
    await sleep(400);
    await page.shot(join(out, `menu-open-${w}x${h}.jpg`), { full: false });
    const fit = await page.eval(`(() => { const l = [...document.querySelectorAll('#site-menu .menu-link')].map(a => a.getBoundingClientRect()); const x = document.querySelector('#site-menu .menu-close').getBoundingClientRect(); return { lastBottom: Math.round(l[8].bottom), minH: Math.round(Math.min(...l.map(r => r.height))), xVisible: x.top >= 0 && x.bottom <= innerHeight && x.right > innerWidth - 80, noLanguageControl: !document.querySelector('[hreflang], .nav-lang, .menu-lang-phone') } })()`);
    check(`phone ${w}x${h}: links ≥ 48 px tall, X visible at top right, no language control`, fit.minH >= 48 && fit.xVisible && fit.noLanguageControl, fit);
    await key('Escape', 'Escape', 27);
    await sleep(300);
  }
  await page.close();
} finally {
  await browser.close();
}
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : '  -> ' + r.detail}`);
console.log(`${results.filter((r) => r.ok).length}/${results.length} passed`);
