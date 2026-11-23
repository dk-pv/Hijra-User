import type { ServiceKey } from './navigation';

// Branch records (report 8.5, decision C12): the one source for the map pins, the Branches page, each branch page,
// the homepage, Contact, the footer and the enquiry forms.
// The six branches and the head office in Manjeri are confirmed by HIJRA (21 Nov 2026). Every business detail
// (address, phone, WhatsApp, hours, Google links, directions, photographs) is null until HIJRA verifies it, and pages
// show it as pending; nothing is invented. Draft records render for review but are never indexed or in the sitemap.

export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type WeekHours = Record<Day, 'closed' | [open: string, close: string][]>;

export type Branch = {
  id: string;
  slug: string;
  /** The branch as HIJRA names it: its town (for Wayanad, the district). */
  name: string;
  isHeadOffice: boolean;
  /** The Kerala district the branch is in. */
  district: string;
  /** Town centre (public coordinates, not the premises): where the map pins the branch until `geo` is verified, and
   *  the pin is then labelled "town location". `lean` tilts the pin about its tip, in degrees, so pins of nearby towns
   *  fan out instead of stacking; the tip stays on the point. `tip: 'left'` opens the name tooltip on the left of the
   *  head (default right), chosen so it stays on screen on the narrowest map and clear of the neighbouring pins. */
  pin: { lat: number; lng: number; lean?: number; tip?: 'left' };
  /** The verified postal address; null until HIJRA supplies it. */
  address: { lines: string[]; locality: string; postalCode: string } | null;
  /** E.164, e.g. '+9198XXXXXXXX'; null until verified. */
  phone: string | null;
  whatsapp: string | null;
  /** Weekly hours in India time (Asia/Kolkata). */
  hours: WeekHours | null;
  /** The branch's own Google Maps place link; drives the Directions buttons. */
  mapsUrl: string | null;
  gbpUrl: string | null;
  /** Verified WGS84 coordinates of the premises from the Business Profile pin; never geocoded or guessed. When set,
   *  the map pins the office here instead of the town. */
  geo: { lat: number; lng: number } | null;
  /** Directions from nearby landmarks, written by HIJRA. */
  directions: string | null;
  /** Verified photographs of the branch (P17 asks for at least two before a branch page is published). */
  photos: { src: string; width: number; height: number; alt: string }[];
  /** The services this branch handles, once HIJRA confirms them; null shows "to be confirmed". */
  services: ServiceKey[] | null;
  status: 'draft' | 'verified';
};

const branch = (slug: string, name: string, district: string, pin: Branch['pin'], extra: Partial<Branch> = {}): Branch => ({
  id: slug,
  slug,
  name,
  isHeadOffice: false,
  district,
  pin,
  address: null,
  phone: null,
  whatsapp: null,
  hours: null,
  mapsUrl: null,
  gbpUrl: null,
  geo: null,
  directions: null,
  photos: [],
  services: null,
  status: 'draft',
  ...extra,
});

// Pins: town centres from Wikipedia (checked against Mapcarta and latlong.net, 23 Nov 2026). Manjeri, Malappuram and
// Kozhikode lie within 40 km of each other, so their pins lean apart; these angles keep the three heads clear of each
// other on every map size, down to the 210 px map on 810 px tablets.
export const branches: Branch[] = [
  branch('manjeri', 'Manjeri', 'Malappuram', { lat: 11.1202, lng: 76.1198, lean: 34 }, { isHeadOffice: true }),
  branch('kozhikode', 'Kozhikode', 'Kozhikode', { lat: 11.2588, lng: 75.7804, lean: -40 }),
  branch('malappuram', 'Malappuram', 'Malappuram', { lat: 11.051, lng: 76.0711, lean: -40, tip: 'left' }),
  // Kalpetta, the district headquarters, until HIJRA confirms the branch's town.
  branch('wayanad', 'Wayanad', 'Wayanad', { lat: 11.6226, lng: 76.0813 }),
  branch('palakkad', 'Palakkad', 'Palakkad', { lat: 10.775, lng: 76.651, tip: 'left' }),
  branch('kannur', 'Kannur', 'Kannur', { lat: 11.8745, lng: 75.3704 }),
];

export const getBranch = (slug: string) => branches.find((b) => b.slug === slug);

/** A branch may be indexed (sitemap, local SEO) only when its record is verified. */
export const isPublishable = (b: Branch) => b.status === 'verified';

/** 'Malappuram district, Kerala' */
export const branchArea = (b: Branch) => `${b.district} district, Kerala`;

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

/** The verified address on one line, or null while it is pending. */
export function formatAddress(b: Branch) {
  const a = b.address;
  return a ? [...a.lines, a.locality, b.district, `Kerala ${a.postalCode}`].join(', ') : null;
}
