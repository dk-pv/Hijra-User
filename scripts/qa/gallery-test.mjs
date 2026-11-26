// Gallery and package journeys: every collection and package card opens its own page, the lightbox works by mouse,
// keyboard and touch-size buttons, and package pages carry their status and preselected package.
// MSYS_NO_PATHCONV=1 node gallery-test.mjs --base http://localhost:3100
import { launch } from './cdp.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://localhost:3000');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let failed = 0;
const check = (name, ok, detail) => {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok || detail === undefined ? '' : `  ${JSON.stringify(detail)}`}`);
};

const browser = await launch();
try {
  const page = await browser.newPage();
  const key = async (k, code, vk) => {
    const p = { key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk };
    await page.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...p });
    await page.send('Input.dispatchKeyEvent', { type: 'keyUp', ...p });
    await sleep(80);
  };
  const click = async (sel) => {
    const box = await page.eval(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 } })()`);
    for (const type of ['mousePressed', 'mouseReleased']) await page.send('Input.dispatchMouseEvent', { type, x: box.x, y: box.y, button: 'left', clickCount: 1 });
    await sleep(250);
  };
  const counter = () => page.eval(`document.querySelector('dialog[open] p.tabular-nums')?.textContent.trim() ?? null`);

  // 1. The gallery index: four categories, never mixed, each card links to its own collection page.
  await page.viewport(1440, 900);
  await page.goto(base + '/gallery');
  const cats = await page.eval(`[...document.querySelectorAll('main section[id] h2')].map((h) => h.textContent.replace(/^\\d+/, '').trim())`);
  check('gallery: four categories in order', cats.join('|') === 'International tours|Indian domestic tours|Umrah journeys|Hajj journeys', cats);
  const cards = await page.eval(`[...document.querySelectorAll('main section[id] li a[href^="/gallery/"]')].map((a) => a.getAttribute('href'))`);
  const statuses = await Promise.all(cards.map((h) => fetch(base + h).then((r) => r.status)));
  check(`gallery: all ${cards.length} collection cards open a page (200)`, cards.length === 11 && statuses.every((s) => s === 200), statuses);

  // 2. One collection: lightbox open, arrows, wrap-around, Escape, focus back on the photo.
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    await page.viewport(w, h);
    await page.goto(base + '/gallery/umrah-makkah');
    const tiles = await page.eval(`document.querySelectorAll('ul[aria-label^="Umrah: Makkah"] a[aria-haspopup]').length`);
    check(`${w}px: 8 photo tiles`, tiles === 8, tiles);
    await click('#photo-makkah-tawaf-night');
    check(`${w}px: lightbox opens on the first photo`, (await counter()) === '1 of 8', await counter());
    check(`${w}px: focus on Close`, await page.eval(`document.activeElement?.getAttribute('aria-label') === 'Close the photo viewer'`));
    await key('ArrowRight', 'ArrowRight', 39);
    check(`${w}px: ArrowRight → 2 of 8`, (await counter()) === '2 of 8', await counter());
    await key('ArrowLeft', 'ArrowLeft', 37);
    await key('ArrowLeft', 'ArrowLeft', 37);
    check(`${w}px: ArrowLeft wraps to 8 of 8`, (await counter()) === '8 of 8', await counter());
    const buttons = await page.eval(`[...document.querySelectorAll('dialog[open] button[aria-label$="photograph"]')].filter((b) => b.offsetParent).map((b) => Math.round(b.getBoundingClientRect().width))`);
    check(`${w}px: visible previous/next buttons, at least 44 px`, buttons.length === 2 && buttons.every((x) => x >= 44), buttons);
    await key('Escape', 'Escape', 27);
    await sleep(200);
    check(`${w}px: Escape closes`, (await page.eval(`!document.querySelector('dialog[open]')`)) && (await page.eval(`document.documentElement.style.overflow === ''`)));
    check(`${w}px: focus returns to the last photo viewed`, await page.eval(`document.activeElement?.id === 'photo-makkah-haram-aerial'`), await page.eval(`document.activeElement?.id`));
  }
  // A one-photo collection shows no previous/next.
  await page.viewport(1440, 900);
  await page.goto(base + '/gallery/baku');
  await click('a[aria-haspopup="dialog"]');
  check('one photo: no previous/next buttons', (await page.eval(`document.querySelectorAll('dialog[open] button[aria-label$="photograph"]').length`)) === 0);
  await key('Escape', 'Escape', 27);

  // 3. Packages: every card on Umrah and Hajj opens its own page, with its status and the package preselected.
  for (const service of ['umrah', 'hajj']) {
    await page.goto(base + `/${service}`);
    const links = await page.eval(`[...new Set([...document.querySelectorAll('#packages a[href^="/${service}/packages/"]')].map((a) => a.getAttribute('href')))]`);
    check(`/${service}: package cards link to their pages`, links.length > 0, links);
    for (const href of links) {
      await page.goto(base + href);
      const info = await page.eval(`({ h1: document.querySelector('h1')?.textContent, status: document.querySelector('main .status')?.textContent ?? null, selected: document.querySelector('#enquiry select[id$="interest"]')?.value ?? null, related: [...document.querySelectorAll('[aria-labelledby="related-h"] a[href^="/${service}/packages/"]')].map((a) => a.getAttribute('href')) })`);
      check(`${href}: h1, status, package preselected, related same service`, !!info.h1 && !!info.status && info.selected === href.split('/').pop() && info.related.every((r) => r !== href), info);
    }
  }

  // 4. Tours: three related journeys, each its own page.
  await page.goto(base + '/tours/istanbul-bursa');
  const related = await page.eval(`[...document.querySelectorAll('[aria-labelledby="related-h"] li a[href^="/tours/"]')].map((a) => a.getAttribute('href')).filter((h, i, all) => all.indexOf(h) === i)`);
  check('tour page: "Explore more journeys" shows 3 tours', related.length === 3 && !related.includes('/tours/istanbul-bursa'), related);
} finally {
  await browser.close();
}
console.log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
