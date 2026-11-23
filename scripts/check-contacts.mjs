// Contact-data guard. Runs before every `npm run build` (the `prebuild` script) and alone as `npm run check:contacts`.
// The build stops when:
//   1. demonstration or placeholder contact details appear in the source: reserved-domain email addresses
//      (.example, example.com, .test, .invalid), placeholder numbers (000 0000, XXXX), hard-coded tel:, mailto: or
//      wa.me links, or contact fields in data/demo.ts;
//   2. a contact value in data/site.ts or data/branches.ts is not a real one: phone and WhatsApp must be +91 and
//      10 digits (not a run of one digit), email a real domain, Google links on Google's own domains;
//   3. a launch build (NEXT_PUBLIC_ALLOW_INDEXING=true, from the shell or the .env files) lacks HIJRA's central phone,
//      WhatsApp or email, so its Call, WhatsApp and Email buttons would open the "not connected yet" notice.
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

// 3. A launch build needs the central contacts.
if (launch) {
  for (const key of ['phone', 'whatsapp', 'email'])
    if (!central[key]) problems.push(`data/site.ts: launch build without HIJRA's central ${key}: its buttons would open the "not connected yet" notice`);
}

if (problems.length) {
  console.error(`Contact check failed (${problems.length}):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`contact check: no demonstration or placeholder contact details${launch ? '; central contacts present for launch' : ' (preview build)'}`);
