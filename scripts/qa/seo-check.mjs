// SEO and indexing-gate check on a production server, from the server HTML (no browser needed).
// MSYS_NO_PATHCONV=1 node scripts/qa/seo-check.mjs --base http://localhost:3100 [--site https://www.example.com] [--gate-open]
// Default: expects the preview state (NEXT_PUBLIC_ALLOW_INDEXING unset): every page noindex, robots.txt disallows all.
// --gate-open: expects a build made with NEXT_PUBLIC_ALLOW_INDEXING=true: pages indexable except sample records and
// legal pages, robots.txt allows crawling and names the sitemap. --site: the expected canonical origin
// (NEXT_PUBLIC_SITE_URL at build time).
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://localhost:3100');
const site = arg('site', null);
const gateOpen = process.argv.includes('--gate-open');

const failures = [];
const fail = (msg) => failures.push(msg);
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attr = (html, re) => { const m = re.exec(html); return m ? decode(m[1]) : null; };
const get = async (path) => {
  const r = await fetch(base + path, { redirect: 'manual' });
  return { status: r.status, text: await r.text() };
};

// 1. Crawl internal links from the server HTML.
const seen = new Set(['/']);
const queue = ['/'];
const pages = {};
while (queue.length) {
  const path = queue.shift();
  const { status, text } = await get(path);
  pages[path] = { status, html: text };
  for (const m of text.matchAll(/href="(\/[^"#?]*)/g)) {
    const p = m[1];
    if (p.startsWith('//') || /\.[a-z0-9]+$/i.test(p) || p.startsWith('/_next') || seen.has(p)) continue;
    seen.add(p);
    queue.push(p);
  }
}

// 2. Per-page metadata.
const sampleOrLegal = (p) => /^\/(tours|blogs|branches)\/[^/]+$/.test(p) || ['/privacy', '/terms', '/image-credits'].includes(p);
const rows = [];
for (const [path, { status, html }] of Object.entries(pages)) {
  if (status !== 200) { fail(`${path}: status ${status}`); continue; }
  const row = {
    path,
    lang: attr(html, /<html[^>]*\slang="([^"]*)"/),
    title: attr(html, /<title>([^<]*)<\/title>/),
    description: attr(html, /<meta name="description" content="([^"]*)"/),
    canonical: attr(html, /<link rel="canonical" href="([^"]*)"/),
    robots: attr(html, /<meta name="robots" content="([^"]*)"/),
    ogUrl: attr(html, /<meta property="og:url" content="([^"]*)"/),
    ogLocale: attr(html, /<meta property="og:locale" content="([^"]*)"/),
    ogImage: attr(html, /<meta property="og:image" content="([^"]*)"/),
    hreflang: [...html.matchAll(/hreflang="([^"]*)"/g)].length,
  };
  rows.push(row);
  if (row.lang !== 'en') fail(`${path}: html lang is ${row.lang}`);
  if (!row.title) fail(`${path}: no title`);
  if (!row.description) fail(`${path}: no meta description`);
  else if (row.description.length < 50 || row.description.length > 170) fail(`${path}: description is ${row.description.length} characters`);
  if (!row.canonical) fail(`${path}: no canonical`);
  else {
    const u = new URL(row.canonical);
    if (u.pathname !== path) fail(`${path}: canonical points to ${u.pathname}`);
    if (site && u.origin !== new URL(site).origin) fail(`${path}: canonical origin ${u.origin}, expected ${site}`);
  }
  if (row.ogUrl !== row.canonical) fail(`${path}: og:url ${row.ogUrl} differs from canonical`);
  if (row.ogLocale !== 'en_IN') fail(`${path}: og:locale ${row.ogLocale}`);
  if (!row.ogImage) fail(`${path}: no og:image`);
  if (row.hreflang) fail(`${path}: ${row.hreflang} hreflang links`);
  const noindex = /noindex/.test(row.robots || '');
  const expectNoindex = !gateOpen || sampleOrLegal(path);
  if (noindex !== expectNoindex) fail(`${path}: robots "${row.robots}", expected ${expectNoindex ? 'noindex' : 'indexable'}`);
}
for (const key of ['title', 'description']) {
  const by = new Map();
  for (const r of rows) if (r[key]) by.set(r[key], [...(by.get(r[key]) || []), r.path]);
  for (const [v, ps] of by) if (ps.length > 1) fail(`duplicate ${key} on ${ps.join(', ')}: "${v.slice(0, 80)}"`);
}

// 3. robots.txt and sitemap.xml.
const robots = (await get('/robots.txt')).text;
const sitemap = await get('/sitemap.xml');
const locs = [...sitemap.text.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => new URL(decode(m[1])));
if (gateOpen) {
  if (!/Allow: \//.test(robots) || /Disallow: \/\s*$/m.test(robots)) fail(`robots.txt does not allow crawling:\n${robots}`);
  if (!/Sitemap: /.test(robots)) fail('robots.txt does not name the sitemap');
} else if (!/Disallow: \/\s*$/m.test(robots)) fail(`robots.txt does not block crawlers:\n${robots}`);
if (sitemap.status !== 200 || !locs.length) fail(`sitemap.xml: status ${sitemap.status}, ${locs.length} URLs`);
for (const u of locs) {
  if (!pages[u.pathname]) fail(`sitemap lists ${u.pathname}, which no page links to`);
  else if (pages[u.pathname].status !== 200) fail(`sitemap lists ${u.pathname} (status ${pages[u.pathname].status})`);
  if (sampleOrLegal(u.pathname)) fail(`sitemap lists a sample or legal page: ${u.pathname}`);
  if (u.pathname.startsWith('/ml')) fail(`sitemap lists ${u.pathname}`);
  if (site && u.origin !== new URL(site).origin) fail(`sitemap origin ${u.origin}, expected ${site}`);
}

const lengths = rows.map((r) => r.description?.length || 0);
console.log(`pages: ${rows.length} (crawled from /), sitemap URLs: ${locs.length}, gate: ${gateOpen ? 'open' : 'closed'}`);
console.log(`titles unique: ${new Set(rows.map((r) => r.title)).size}/${rows.length}; descriptions unique: ${new Set(rows.map((r) => r.description)).size}/${rows.length}; description length ${Math.min(...lengths)}–${Math.max(...lengths)}`);
console.log(`noindex pages: ${rows.filter((r) => /noindex/.test(r.robots || '')).length}/${rows.length}; robots.txt: ${robots.trim().replace(/\n/g, ' | ')}`);
console.log(`canonical origin: ${[...new Set(rows.map((r) => r.canonical && new URL(r.canonical).origin))].join(', ')}`);
for (const f of failures) console.log(`FAIL  ${f}`);
console.log(failures.length ? `${failures.length} problems` : 'all SEO checks passed');
process.exitCode = failures.length ? 1 : 0;
