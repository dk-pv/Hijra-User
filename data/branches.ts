import type { ServiceKey } from './navigation';

// Branch records (report 8.5, decision C12). One record feeds the Branches page, branch pages, the homepage,
// the footer and the enquiry form. THESE SIX RECORDS ARE SAMPLES for layout testing: no real address, phone,
// hours, coordinates or Google profile is invented. Replace each record with HIJRA's verified data (I3).
// Rules: no map pin without verified coordinates; no Directions link without a verified Google Maps link;
// sample and draft records are never indexed or listed in the sitemap.

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type WeekHours = Record<Day, 'closed' | [open: string, close: string][]>;

export type Branch = {
  id: string;
  slug: string;
  name: string;
  isHeadOffice: boolean;
  address: { lines: string[]; locality: string; district: string; state: string; postalCode: string };
  /** E.164, e.g. '+9198XXXXXXXX'; null until verified. */
  phone: string | null;
  whatsapp: string | null;
  /** Weekly hours in India time (Asia/Kolkata). */
  hours: WeekHours | null;
  /** The branch's own Google Maps place link; drives the Directions buttons. */
  mapsUrl: string | null;
  gbpUrl: string | null;
  /** Verified WGS84 coordinates from the Business Profile pin; never geocoded or guessed. */
  geo: { lat: number; lng: number } | null;
  /** Directions from nearby landmarks, written by HIJRA. */
  directions: string | null;
  /** Verified photographs of the branch (P17 asks for at least two before a branch page is published). */
  photos: { src: string; width: number; height: number; alt: string }[];
  services: ServiceKey[];
  status: 'sample' | 'draft' | 'verified';
  /** Development builds only: a marker position in map units, to test the map's marker layout. Never a real location. */
  samplePin?: { x: number; y: number };
};

const sampleHours: WeekHours = {
  mon: [['09:30', '13:00'], ['14:00', '18:00']],
  tue: [['09:30', '13:00'], ['14:00', '18:00']],
  wed: [['09:30', '13:00'], ['14:00', '18:00']],
  thu: [['09:30', '13:00'], ['14:00', '18:00']],
  fri: [['09:30', '12:30'], ['14:30', '18:00']],
  sat: [['09:30', '13:00'], ['14:00', '17:00']],
  sun: 'closed',
};

const sample = (
  n: number,
  slug: string,
  name: string,
  street: string,
  extra: Partial<Branch> & { samplePin: { x: number; y: number } },
): Branch => ({
  id: `sample-0${n}`,
  slug,
  name,
  isHeadOffice: false,
  address: {
    lines: [`Sample Building ${n}, Ground Floor`, street],
    locality: `Sample Town ${String.fromCharCode(64 + n)}`,
    district: 'Sample District',
    state: 'Kerala',
    postalCode: '6XX XXX',
  },
  phone: null,
  whatsapp: null,
  hours: sampleHours,
  mapsUrl: null,
  gbpUrl: null,
  geo: null,
  directions: null,
  photos: [],
  services: ['umrah', 'hajj', 'tour', 'flight', 'visa'],
  status: 'sample',
  ...extra,
});

export const branches: Branch[] = [
  sample(1, 'head-office', 'Head Office', 'Main Road', { isHeadOffice: true, samplePin: { x: 205, y: 335 } }),
  sample(2, 'city-centre', 'City Centre', 'Town Hall Road', { samplePin: { x: 118, y: 205 } }),
  sample(3, 'beach-road', 'Beach Road', 'Beach Road', { samplePin: { x: 40, y: 70 } }),
  sample(4, 'market-square', 'Market Square', 'Market Square', { services: ['umrah', 'hajj', 'visa'], samplePin: { x: 262, y: 392 } }),
  sample(5, 'hill-view', 'Hill View', 'Ghat Road', { services: ['umrah', 'tour', 'flight'], samplePin: { x: 292, y: 300 } }),
  sample(6, 'riverside', 'Riverside', 'River Road', { services: ['umrah', 'hajj', 'tour', 'flight'], samplePin: { x: 298, y: 505 } }),
];

export const getBranch = (slug: string) => branches.find((b) => b.slug === slug);

/** A branch may be indexed (sitemap, local SEO) only when its record is verified. */
export const isPublishable = (b: Branch) => b.status === 'verified';

export const dayNames: Record<Day, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

/** '09:30' -> '9:30 am' */
export function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function formatAddress(b: Branch) {
  const a = b.address;
  return [...a.lines, a.locality, `${a.state} ${a.postalCode}`].join(', ');
}
