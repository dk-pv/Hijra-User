// Self-check for package availability: `npm run check:packages` (Node 22 strips the TypeScript types).
// A package that has departed is never shown as upcoming or open, and leaves the listings.
import assert from 'node:assert/strict';
import { isListed, lastDeparture, packages, shownStatus } from '../data/packages.ts';

const p = (departure, status, dates = null) => ({ departure, status, dates });

assert.equal(lastDeparture(p('February 2027')), '2027-02-31', 'a month window ends with its month');
assert.equal(lastDeparture(p('Hajj season 2027')), '2027-12-31', 'a season without a month ends with its year');
assert.equal(lastDeparture(p('On request')), '9999-12-31', 'no year: never treated as departed');
assert.equal(lastDeparture(p('February 2027', null, { depart: '2027-02-10', return: '2027-02-25' })), '2027-02-10', 'confirmed dates win');

assert.equal(shownStatus(p('February 2027', 'enquiry-open'), '2027-02-28'), 'enquiry-open', 'still open in its own month');
assert.equal(shownStatus(p('February 2027', 'enquiry-open'), '2027-03-01'), 'completed', 'past its month: completed');
assert.equal(shownStatus(p('February 2027', 'available', { depart: '2027-02-10', return: '2027-02-25' }), '2027-02-11'), 'completed');
assert.equal(shownStatus(p('February 2027', null), '2027-01-01'), null, 'no status set: none shown, never "available"');
assert.equal(isListed(p('February 2027', 'completed'), '2027-01-01'), false, 'marked completed: not listed');
assert.equal(isListed(p('November 2026', 'upcoming'), '2026-12-01'), false, 'departed: not listed');
assert.equal(isListed(p('November 2026', 'upcoming'), '2026-11-25'), true);

const slugs = packages.map((x) => `${x.service}/${x.slug}`);
assert.equal(new Set(slugs).size, slugs.length, 'package slugs are unique per service');
console.log('Package status checks passed.');
