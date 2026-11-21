// Screenshot + health probe for HIJRA pages.
// node shoot.mjs --paths /,/umrah --widths 390,1440 --out <dir> [--base http://localhost:3000] [--first] [--motion] [--probe-only]
//   --first       viewport-only capture (first screen) instead of the full page
//   --motion      do not emulate prefers-reduced-motion (default: reduced, so reveal animations do not hide content)
//   --probe-only  no screenshots, just the JSON probe
// Prints one JSON line per page+width: overflow, offenders, broken images, dead links, h1 count, unnamed controls,
// console errors, small text, description, canonical, and (with QA_FORBID) excluded wording.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { launch, PROBE } from './cdp.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
const base = arg('base', 'http://localhost:3000');
const paths = arg('paths', '/').split(',');
const widths = arg('widths', '390,1440').split(',').map(Number);
const out = arg('out', '.');
const height = Number(arg('height', 0));
mkdirSync(out, { recursive: true });

const browser = await launch();
try {
  const page = await browser.newPage();
  for (const p of paths) {
    for (const w of widths) {
      const h = height || (w < 810 ? 844 : w <= 1024 ? 1024 : 900);
      await page.viewport(w, h, { reduced: !flag('motion') });
      await page.goto(base + p);
      if (!flag('first')) await page.loadLazy();
      const probe = await page.eval(PROBE);
      probe.width = w;
      probe.console = page.console.slice(0, 5);
      probe.exceptions = page.exceptions.slice(0, 3);
      if (!flag('probe-only')) {
        const name = `${(p === '/' ? 'home' : p.replace(/^\//, '').replace(/[/?#=&]/g, '_'))}-${w}${flag('first') ? '-first' : ''}.jpg`;
        await page.shot(join(out, name), { full: !flag('first') });
        probe.shot = join(out, name);
      }
      console.log(JSON.stringify(probe));
    }
  }
  await page.close();
} finally {
  await browser.close();
}
