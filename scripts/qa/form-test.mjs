// Enquiry form behaviour: errors, error summary focus, preserved input, demo success, query preselection, no double submit,
// and a failed submission (previewed with ?demo-enquiry=network): message focused, input kept, retry possible.
// MSYS_NO_PATHCONV=1 node form-test.mjs [--base url]
import { launch } from './cdp.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://localhost:3000');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail: JSON.stringify(detail) });

const browser = await launch();
try {
  const page = await browser.newPage();
  await page.viewport(390, 844);
  const typeInto = async (selector, text) => {
    await page.eval(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.focus(); el.select && el.select(); return true })()`);
    await page.send('Input.insertText', { text });
    await sleep(50);
  };
  const form = (prefix = '#enquiry') => `${prefix} form`;

  // Book A Trip: empty submit
  await page.goto(base + '/book-a-trip?service=hajj&interest=hajj-group-azizia', { settle: 1500 });
  check('query preselects Hajj', await page.eval(`(() => { const r = [...document.querySelectorAll('${form()} input[type=radio]')].find(i => i.checked && i.value === 'hajj'); return !!r })()`));
  check('query preselects the package', (await page.eval(`(() => { const s = [...document.querySelectorAll('${form()} select')].find(s => [...s.options].some(o => o.value === 'hajj-group-azizia')); return s ? s.value : null })()`)) === 'hajj-group-azizia');
  await page.eval(`document.querySelector('${form()} button[type=submit]').click()`);
  await sleep(400);
  const summary = await page.eval(`(() => { const a = document.activeElement; return { focusedSummary: !!a && a.textContent.includes('Please check'), items: [...document.querySelectorAll('${form()} [tabindex="-1"] li')].length, invalid: document.querySelectorAll('${form()} [aria-invalid=true]').length } })()`);
  check('empty submit: summary focused, errors listed and fields marked', summary.focusedSummary && summary.items >= 3 && summary.invalid >= 3, summary);
  check('errors are linked with aria-describedby', await page.eval(`[...document.querySelectorAll('${form()} [aria-invalid=true]')].every(el => (el.getAttribute('aria-describedby') || '').split(' ').some(id => id && document.getElementById(id)))`));
  // Fill name only, submit again: name kept
  await typeInto(`${form()} input[autocomplete=name]`, 'Aisha K');
  await page.eval(`document.querySelector('${form()} button[type=submit]').click()`);
  await sleep(300);
  check('input preserved after a failed submit', (await page.eval(`document.querySelector('${form()} input[autocomplete=name]').value`)) === 'Aisha K');
  // Complete and submit
  await typeInto(`${form()} input[type=tel]`, '90000 00000');
  await page.eval(`(() => { const c = document.querySelector('${form()} input[type=checkbox]'); if (!c.checked) c.click(); return true })()`);
  await page.eval(`(() => { const b = document.querySelector('${form()} button[type=submit]'); b.click(); b.click(); b.click(); return true })()`);
  await sleep(150);
  check('busy state shown while sending', (await page.eval(`document.querySelector('${form()} button[type=submit]')?.getAttribute('aria-busy')`)) === 'true');
  await sleep(1200);
  const done = await page.eval(`(() => { const s = document.querySelector('#enquiry [role=status]'); return s ? s.textContent : '' })()`);
  check('demo success shown and honest', done.includes('Demo enquiry completed') && done.includes('does not send information to HIJRA'), done.slice(0, 160));
  check('one submission only (one demo reference)', (done.match(/DEMO-/g) || []).length === 1, done.slice(0, 80));
  await page.eval(`[...document.querySelectorAll('#enquiry [role=status] button')].find(b => /another/i.test(b.textContent)).click()`);
  await sleep(300);
  check('start again resets to a clean form', await page.eval(`!!document.querySelector('${form()}') && document.querySelector('${form()} input[autocomplete=name]').value === ''`));

  // Failed submission: the Milestone 2 failure path, previewed by the demo with ?demo-enquiry=network
  await page.goto(base + '/book-a-trip?service=hajj&demo-enquiry=network', { settle: 1500 });
  await typeInto(`${form()} input[autocomplete=name]`, 'Test Visitor');
  await typeInto(`${form()} input[type=tel]`, '90000 00000');
  await page.eval(`(() => { const c = document.querySelector('${form()} input[type=checkbox]'); if (!c.checked) c.click(); return true })()`);
  await page.eval(`document.querySelector('${form()} button[type=submit]').click()`);
  await sleep(1300);
  const failed = await page.eval(`(() => { const a = document.activeElement; const b = document.querySelector('${form()} button[type=submit]'); return { focused: a ? a.textContent.slice(0, 160) : '', success: !!document.querySelector('#enquiry [role=status]'), name: document.querySelector('${form()} input[autocomplete=name]').value, busy: b.getAttribute('aria-busy'), disabled: b.disabled } })()`);
  check('failed submission: message focused, nothing claimed as sent', failed.focused.includes('Your enquiry was not sent') && failed.focused.includes('connection failed') && !failed.success, failed);
  check('failed submission: input kept and the button ready to retry', failed.name === 'Test Visitor' && failed.busy === null && !failed.disabled, failed);

  // Flight rules
  await page.goto(base + '/flights', { settle: 1500 });
  const f = 'main form';
  check('flight form present with from/to/date fields', await page.eval(`document.querySelectorAll('${f} input[type=date]').length >= 1`));

  // Homepage compact form
  await page.goto(base + '/', { settle: 1500 });
  await page.eval(`document.querySelector('#enquiry form button[type=submit]').click()`);
  await sleep(300);
  check('homepage form validates', (await page.eval(`document.querySelectorAll('#enquiry form [aria-invalid=true]').length`)) >= 2);
  await page.close();
} finally {
  await browser.close();
}
for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : '  -> ' + r.detail}`);
console.log(`${results.filter((r) => r.ok).length}/${results.length} passed`);
