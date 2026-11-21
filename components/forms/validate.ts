// Enquiry form values and validation. Pure functions with no imports at runtime, so the same rules can run on
// the server in Milestone 2 and be checked by `npm run check:forms`.

export type EnquiryService = 'umrah' | 'hajj' | 'tour' | 'flight' | 'visa' | 'general';
export type ContactMethod = 'whatsapp' | 'call' | 'email';

export type EnquiryValues = {
  service: EnquiryService | '';
  name: string;
  code: string;
  phone: string;
  email: string;
  method: ContactMethod;
  month: string;
  adults: number;
  children: number;
  infants: number;
  airport: string;
  interest: string;
  hajjYear: string;
  hajjApplied: string;
  tourType: string;
  destination: string;
  tripType: 'return' | 'oneWay';
  from: string;
  to: string;
  depart: string;
  returnDate: string;
  cabin: string;
  visaCountry: string;
  visaType: string;
  applicants: number;
  topic: string;
  branch: string;
  message: string;
  consent: boolean;
};

export type ErrorKey =
  | 'choose'
  | 'name'
  | 'phone'
  | 'phoneIntl'
  | 'email'
  | 'emailNeeded'
  | 'required'
  | 'date'
  | 'returnDate'
  | 'consent'
  | 'travellers';

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, ErrorKey>>;

export const emptyEnquiry = (service: EnquiryService | '' = ''): EnquiryValues => ({
  service,
  name: '',
  code: '+91',
  phone: '',
  email: '',
  method: 'whatsapp',
  month: '',
  adults: 2,
  children: 0,
  infants: 0,
  airport: '',
  interest: '',
  hajjYear: '',
  hajjApplied: '',
  tourType: 'domestic',
  destination: '',
  tripType: 'return',
  from: '',
  to: '',
  depart: '',
  returnDate: '',
  cabin: 'economy',
  visaCountry: '',
  visaType: 'visit',
  applicants: 1,
  topic: 'question',
  branch: '',
  message: '',
  consent: false,
});

/** Digits of a mobile number; for India, a typed leading 0 or 91 is dropped. */
export function normalisePhone(code: string, phone: string) {
  let d = phone.replace(/\D/g, '');
  if (code === '+91') {
    if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
    if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  }
  return d;
}

/** `today` is 'YYYY-MM-DD' in the visitor's time zone. */
export function validateEnquiry(v: EnquiryValues, today: string): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!v.service) e.service = 'choose';
  if (v.name.trim().replace(/\s+/g, ' ').length < 2) e.name = 'name';

  const digits = normalisePhone(v.code, v.phone);
  if (v.code === '+91') {
    if (!/^[6-9]\d{9}$/.test(digits)) e.phone = 'phone';
  } else if (!/^\d{7,12}$/.test(digits)) e.phone = 'phoneIntl';

  const email = v.email.trim();
  if (email) {
    if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i.test(email)) e.email = 'email';
  } else if (v.method === 'email') e.email = 'emailNeeded';

  const needsTravellers = v.service === 'umrah' || v.service === 'hajj' || v.service === 'tour' || v.service === 'flight';
  if (needsTravellers && v.adults < 1) e.adults = 'travellers';
  if (v.service === 'tour' && !v.destination.trim()) e.destination = 'required';
  if (v.service === 'visa' && !v.visaCountry) e.visaCountry = 'choose';
  if (v.service === 'flight') {
    if (!v.from.trim()) e.from = 'required';
    if (!v.to.trim()) e.to = 'required';
    if (!v.depart) e.depart = 'required';
    else if (v.depart < today) e.depart = 'date';
    if (v.tripType === 'return') {
      if (!v.returnDate) e.returnDate = 'required';
      else if (v.depart && v.returnDate <= v.depart) e.returnDate = 'returnDate';
    }
  }
  if (v.service === 'general' && !v.message.trim()) e.message = 'required';
  if (!v.consent) e.consent = 'consent';
  return e;
}
