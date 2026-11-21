// Self-check for the enquiry validation rules: `npm run check:forms` (Node 22 strips the TypeScript types).
import assert from 'node:assert/strict';
import { emptyEnquiry, normalisePhone, validateEnquiry } from '../components/forms/validate.ts';

const today = '2026-11-20';
const ok = { ...emptyEnquiry('umrah'), name: 'Aisha K', phone: '90000 00000', consent: true };

assert.deepEqual(validateEnquiry(ok, today), {}, 'a complete Umrah enquiry is valid');
assert.equal(validateEnquiry({ ...ok, service: '' }, today).service, 'choose');
assert.equal(validateEnquiry({ ...ok, name: ' A ' }, today).name, 'name');
assert.equal(validateEnquiry({ ...ok, phone: '12345' }, today).phone, 'phone');
assert.equal(validateEnquiry({ ...ok, phone: '5000000000' }, today).phone, 'phone', 'Indian mobiles start 6-9');
assert.equal(normalisePhone('+91', '090000 00000'), '9000000000', 'a leading 0 is dropped');
assert.equal(normalisePhone('+91', '+91 90000 00000'), '9000000000', 'a typed 91 is dropped');
assert.deepEqual(validateEnquiry({ ...ok, phone: '090000-00000' }, today), {});
assert.equal(validateEnquiry({ ...ok, code: '+971', phone: '50 123 4567' }, today).phone, undefined, 'UAE number');
assert.equal(validateEnquiry({ ...ok, code: '+971', phone: '123' }, today).phone, 'phoneIntl');
assert.equal(validateEnquiry({ ...ok, email: 'name@' }, today).email, 'email');
assert.equal(validateEnquiry({ ...ok, method: 'email' }, today).email, 'emailNeeded');
assert.deepEqual(validateEnquiry({ ...ok, method: 'email', email: 'family@example.com' }, today), {});
assert.equal(validateEnquiry({ ...ok, consent: false }, today).consent, 'consent');
assert.equal(validateEnquiry({ ...ok, adults: 0 }, today).adults, 'travellers');

const flight = { ...ok, service: 'flight', from: 'Kozhikode', to: 'Dubai', depart: '2026-12-10', returnDate: '2026-12-20' };
assert.deepEqual(validateEnquiry(flight, today), {});
assert.equal(validateEnquiry({ ...flight, depart: '2026-11-01' }, today).depart, 'date');
assert.equal(validateEnquiry({ ...flight, returnDate: '2026-12-09' }, today).returnDate, 'returnDate');
assert.equal(validateEnquiry({ ...flight, tripType: 'oneWay', returnDate: '' }, today).returnDate, undefined);
assert.equal(validateEnquiry({ ...flight, to: ' ' }, today).to, 'required');

assert.equal(validateEnquiry({ ...ok, service: 'visa' }, today).visaCountry, 'choose');
assert.equal(validateEnquiry({ ...ok, service: 'tour' }, today).destination, 'required');
assert.equal(validateEnquiry({ ...ok, service: 'general', message: '' }, today).message, 'required');
console.log('enquiry validation: all checks passed');
