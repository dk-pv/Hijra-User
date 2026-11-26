// Contact and launch guard. next.config.ts runs it at the start of every production build (`npm run build` and
// `next build` alike, so it cannot be skipped); `npm run check:contacts` runs it alone.
// Mode: TRIAL is the default; LAUNCH is NEXT_PUBLIC_ALLOW_INDEXING=true (from the shell or the .env files).
// Every build stops when:
//   1. demonstration or placeholder contact details appear in the source: reserved-domain email addresses
//      (.example, example.com, .test, .invalid), placeholder numbers (000 0000, XXXX), hard-coded tel:, mailto: or
//      wa.me links, or contact fields in data/demo.ts;
//   2. a contact value in data/site.ts or data/branches.ts is not a real one: phone and WhatsApp must be +91 and
//      10 digits (not a run of one digit), email a real domain, Google links on Google's own domains.
// A LAUNCH build also stops when:
//   3. HIJRA's central phone, WhatsApp or email is missing (its buttons would open the "not connected yet" notice);
//   4. NEXT_PUBLIC_SITE_URL is not the live https domain;
//   5. the enquiry form still runs the demo submission (lib/enquiry.ts), i.e. the backend is not connected;
//   6. a data file still holds sample records (`sample: true`).
// Anything else unconfirmed (branch details, legal details, figures, photo slots) renders a pending mark or sample
// label, and those throw during a launch build's prerender (components/ui/pending.tsx), which stops it too.
// A line that must keep an address-like example (a form hint) ends with the comment `contact-check-ignore`.
// Usage: node scripts/check-contacts.mjs [project root]
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import nextEnv from '@next/env';

const root = process.argv[2] ?? fileURLToPath(new URL('..', import.meta.url));
nextEnv.loadEnvConfig(root, false, { info() {}, error() {} });
const launch = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';
const problems = [];

const files = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : /\.(ts|tsx|js|mjs)$/.test(f) ? [p] : [];
  });
/** The code without comments, line numbers kept; URLs (https://) survive. */
const code = (text) =>
  text
    .replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '))
    .split('\n')
    .map((l) => (l.includes('contact-check-ignore') ? '' : l.replace(/(^|[^:])\/\/.*$/, '$1')));

// 1. Placeholder and hard-coded contact details anywhere in the source.
const rules = [
  [/[\w.+-]+@(?:[\w-]+\.)*(?:example|test|invalid|localhost)\b/i, 'a reserved-domain (demonstration) email address'],
  [/\b0{3}[\s-]?0{4}\b|\dX{3,}|X{4,}/, 'a placeholder phone number'],
  [/(?:tel:|mailto:)(?!\$\{)[\w+]/, 'a hard-coded tel: or mailto: link'],
  [/wa\.me\/(?!\?|\$\{)\w/, 'a hard-coded WhatsApp number'],
];
const sources = ['app', 'components', 'lib', 'data'].flatMap((d) => files(join(root, d))).concat(join(root, 'proxy.ts'));
for (const f of sources) {
  code(readFileSync(f, 'utf8')).forEach((line, i) => {
    for (const [re, what] of rules) if (re.test(line)) problems.push(`${relative(root, f)}:${i + 1}: ${what}: ${line.trim().slice(0, 100)}`);
  });
}
const demo = code(readFileSync(join(root, 'data/demo.ts'), 'utf8'));
demo.forEach((line, i) => {
  if (/\b(contact|phone|whatsapp|email|hours|replyTime|directions)\s*:/.test(line))
    problems.push(`data/demo.ts:${i + 1}: demonstration contact details are not allowed: ${line.trim().slice(0, 100)}`);
});

// 2. Every contact value in the data files must be a real one.
const phone = (v) => {
  const d = v.replace(/[\s-]/g, '');
  return /^\+91\d{10}$/.test(d) && !/(\d)\1{6,}/.test(d.slice(3));
};
const email = (v) => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(v) && !/@(?:[\w-]+\.)*(?:example|test|invalid|localhost)\b/i.test(v);
const google = (v) => /^https:\/\/(?:www\.google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl|goo\.gl\/maps|g\.page|g\.co\/kgs)\//.test(v);
const checks = { phone, whatsapp: phone, email, mapsUrl: google, gbpUrl: google };
const central = {};
for (const file of ['data/site.ts', 'data/branches.ts']) {
  code(readFileSync(join(root, file), 'utf8')).forEach((line, i) => {
    for (const m of line.matchAll(/\b(phone|whatsapp|email|mapsUrl|gbpUrl|hours|replyTime):\s*(null|'[^']*'|"[^"]*")/g)) {
      const [, key, raw] = m;
      const value = raw === 'null' ? null : raw.slice(1, -1);
      if (file === 'data/site.ts') central[key] = value;
      if (value !== null && checks[key] && !checks[key](value)) problems.push(`${file}:${i + 1}: ${key} "${value}" is not a real ${key === 'mapsUrl' || key === 'gbpUrl' ? 'Google link' : key}`);
      if (value !== null && !value.trim()) problems.push(`${file}:${i + 1}: ${key} is empty; use null until HIJRA supplies it`);
    }
  });
}

// 3–6. A launch build needs the real thing.
if (launch) {
  for (const key of ['phone', 'whatsapp', 'email'])
    if (!central[key]) problems.push(`data/site.ts: launch build without HIJRA's central ${key}: its buttons would open the "not connected yet" notice`);
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  if (!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}\/?$/i.test(url) || /localhost|127\.0\.0\.1|\.example\b|\.test\b/i.test(url))
    problems.push(`NEXT_PUBLIC_SITE_URL is "${url}": a launch build needs the live https domain (canonical URLs, sitemap, Open Graph)`);
  if (/mode: 'demo',/.test(readFileSync(join(root, 'lib/enquiry.ts'), 'utf8')))
    problems.push('lib/enquiry.ts: submitEnquiry() is still the demo, so enquiries would not reach HIJRA; connect the backend (Milestone 2)');
  for (const f of files(join(root, 'data'))) {
    // Records end `sample: true,` or `sample: true }`; the type declarations (`sample: true;`) are not records.
    const n = (readFileSync(f, 'utf8').match(/\bsample: true(?=\s*[,}])/g) ?? []).length;
    if (n) problems.push(`${relative(root, f)}: ${n} sample record${n > 1 ? 's' : ''} (sample: true); replace with HIJRA's verified content or remove`);
  }
}

const mode = launch ? 'LAUNCH (indexable; strict checks)' : 'TRIAL (not indexable; sample content allowed and labelled; enquiries in demo mode)';
if (problems.length) {
  console.error(`Build mode: ${mode}\nContact and launch check failed (${problems.length}):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`Build mode: ${mode}. Contact${launch ? ' and launch' : ''} check passed: no demonstration or placeholder contact details.`);
// For the project owner: what a trial build still shows as "not connected yet".
const missing = ['phone', 'whatsapp', 'email'].filter((k) => !central[k]);
if (missing.length)
  console.warn(`Not connected yet: HIJRA's verified ${missing.join(', ')} (data/site.ts, contact). Until set, those buttons, the floating WhatsApp button included, open the "not connected yet" notice.`);
