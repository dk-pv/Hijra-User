// Testimonials: the category filter, sample labelling, the homepage link, the 404 for unknown routes, the inactive
// WhatsApp button, and every video player (played from the keyboard: the player loads with a title and takes focus;
// a missing or failing source shows its notice instead of a frame).
// MSYS_NO_PATHCONV=1 node testimonial-test.mjs --base http://localhost:3100 [--expect-playable 2]
import { launch } from './cdp.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://localhost:3000');
const expectPlayable = Number(arg('expect-playable', 0));
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
    if (k === 'Enter') await page.send('Input.dispatchKeyEvent', { type: 'char', text: '\r', ...p });
    await page.send('Input.dispatchKeyEvent', { type: 'keyUp', ...p });
    await sleep(120);
  };

  for (const [w, h] of [[1440, 900], [390, 844]]) {
    await page.viewport(w, h);
    await page.goto(base + '/testimonials');

    // 1. Filters: one chip per category with content; each shows only its category, in both sections.
    const chips = await page.eval(`[...document.querySelectorAll('input[name="testimonial-category"]')].map((i) => i.value)`);
    check(`${w}px: chips for every category with content`, chips.join(',') === 'all,hajj,umrah,international,domestic', chips);
    for (const c of chips.slice(1)) {
      await page.eval(`document.querySelector('input[name="testimonial-category"][value="${c}"]').click()`);
      await sleep(150);
      const shown = await page.eval(`[...document.querySelectorAll('main span.text-muted')].map((e) => e.textContent).filter((t) => t.includes(' · ')).map((t) => t.split(' · ').pop())`);
      const label = { hajj: 'Hajj', umrah: 'Umrah', international: 'International tours', domestic: 'Indian tours' }[c];
      check(`${w}px: "${label}" shows only ${label}`, shown.length > 0 && shown.every((s) => s === label), shown);
    }
    await page.eval(`document.querySelector('input[name="testimonial-category"][value="all"]').click()`);
    await sleep(150);

    // 2. Every testimonial on the page says "Sample" while it is one.
    const unlabelled = await page.eval(`[...document.querySelectorAll('main figcaption, main li')].filter((f) => f.textContent.includes(' · ') && !f.querySelector('.sample-tag')).length`);
    check(`${w}px: every sample testimonial is labelled`, unlabelled === 0, unlabelled);

    // 3. Players: play each from the keyboard; the rest show their notice.
    const total = await page.eval(`document.querySelectorAll('main .aspect-video').length`);
    const playable = await page.eval(`document.querySelectorAll('main button[aria-label^="Play video"]').length`);
    const notices = await page.eval(`[...document.querySelectorAll('main .aspect-video p')].map((p) => p.textContent.trim())`);
    check(`${w}px: ${total} players: ${playable} playable, ${notices.length} with a notice`, total === playable + notices.length && playable >= expectPlayable, { total, playable, notices });
    check(`${w}px: no frame loads before play`, (await page.eval(`document.querySelectorAll('main iframe, main video').length`)) === 0);
    for (let i = 0; i < playable; i++) {
      await page.eval(`(() => { const b = document.querySelector('main button[aria-label^="Play video"]'); b.closest('.aspect-video').dataset.qa = '${w}-${i}'; b.scrollIntoView({ block: 'center' }); b.focus(); })()`);
      await key('Enter', 'Enter', 13);
      await sleep(600);
      const p = await page.eval(`(() => { const box = document.querySelector('[data-qa="${w}-${i}"]'); const f = box.querySelector('iframe, video'); const n = box.querySelector('p'); if (!f) return { notice: n?.textContent ?? null, focused: document.activeElement === n }; const r = f.getBoundingClientRect(); return { tag: f.tagName, src: f.src, title: f.title || f.getAttribute('aria-label'), full: f.allowFullscreen ?? null, focused: document.activeElement === f, ratio: +(r.width / r.height).toFixed(2) } })()`);
      if (p.tag) {
        const okSrc = p.tag === 'VIDEO' || /^https:\/\/(www\.youtube-nocookie\.com\/embed\/|player\.vimeo\.com\/video\/)/.test(p.src);
        check(`${w}px: player ${i + 1} (${p.tag === 'VIDEO' ? 'file' : new URL(p.src).hostname}) loads from the keyboard, titled, focused, 16:9${p.tag === 'IFRAME' ? ', full screen allowed' : ''}`, okSrc && !!p.title && p.focused && Math.abs(p.ratio - 1.78) < 0.03 && (p.tag !== 'IFRAME' || p.full), p);
      } else {
        check(`${w}px: player ${i + 1} failed to load: shows its notice, focus on it`, /not available/.test(p.notice ?? '') && p.focused, p);
      }
    }
  }

  // 4. Homepage: the section links to /testimonials, its samples are labelled, nothing claims to be real.
  await page.viewport(1440, 900);
  await page.goto(base + '/');
  const home = await page.eval(`(() => { const s = document.querySelector('[aria-labelledby="voices-h"]'); return { h2: s.querySelector('h2').textContent.trim(), link: [...s.querySelectorAll('a')].find((a) => a.textContent.includes('Explore all experiences'))?.getAttribute('href'), quotes: s.querySelectorAll('blockquote').length, videos: s.querySelectorAll('.aspect-video').length, tags: s.querySelectorAll('.sample-tag').length, real: s.textContent.includes('Real experiences') } })()`);
  check('home: heading, link to /testimonials, 3 written + 1 video, all labelled, no "real" claim', home.h2 === 'Stories from our travellers.' && home.link === '/testimonials' && home.quotes === 3 && home.videos === 1 && home.tags >= 5 && !home.real, home);

  // 5. Routes and the WhatsApp button.
  check('/testimonials/anything is a 404', (await fetch(base + '/testimonials/no-such-review')).status === 404);
  const wa = await page.eval(`(() => { const f = document.querySelector('.wa-fab'); return { tag: f?.tagName, href: f?.getAttribute('href') ?? null, notice: f?.getAttribute('popovertarget') } })()`);
  check('WhatsApp button inactive without a verified number (notice, no link)', wa.tag === 'BUTTON' && wa.href === null && wa.notice === 'demo-contact', wa);
  const html = await (await fetch(base + '/testimonials')).text();
  check('/testimonials is noindex in trial mode', /<meta name="robots" content="noindex, nofollow"/.test(html));
} finally {
  await browser.close();
}
console.log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
