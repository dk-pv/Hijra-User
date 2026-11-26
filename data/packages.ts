import type { ImageKey } from './images';

// Umrah and Hajj packages. ALL RECORDS ARE SAMPLES for the preview: names, durations and departure months show
// the layout only; there are no fares, seat counts, dates or confirmed offers. HIJRA's package data replaces them (I5).
// Each package has its own page (/umrah/packages/<slug>, /hajj/packages/<slug>); listings drop it once it departs.

/** Availability as HIJRA sets it. `null` = not confirmed, and nothing is shown; never defaulted to 'available'. */
export type PackageStatus = 'upcoming' | 'enquiry-open' | 'available' | 'fully-booked' | 'completed';

export const statusLabel: Record<PackageStatus, string> = {
  upcoming: 'Upcoming',
  'enquiry-open': 'Enquiry open',
  available: 'Available',
  'fully-booked': 'Fully booked',
  completed: 'Completed',
};

export type Airport = 'COK' | 'CCJ' | 'CNN' | 'TRV';

export type Package = {
  slug: string;
  service: 'umrah' | 'hajj';
  name: string;
  summary: string;
  days: number;
  /** Nights in each city, in travel order. */
  stays: { city: 'Makkah' | 'Madinah' | 'Mina, Arafat and Muzdalifah' | 'Azizia, Makkah'; nights: number }[];
  /** Sample departure window, e.g. 'February 2027'. */
  departure: string;
  /** Confirmed travel dates (YYYY-MM-DD); null until HIJRA announces them, so no date is ever invented. */
  dates: { depart: string; return: string } | null;
  status: PackageStatus | null;
  /** Cover photograph (licensed temporary photography until HIJRA's own). */
  image: ImageKey;
  airports: Airport[];
  pace: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  /** Fares are given on enquiry; never invented. */
  fare: null;
  sample: true;
};

export const airportNames: Record<Airport, string> = {
  COK: 'Kochi',
  CCJ: 'Kozhikode',
  CNN: 'Kannur',
  TRV: 'Thiruvananthapuram',
};

const umrahIncludes = [
  'Return economy flights from Kerala',
  'Umrah visa processing',
  'Hotels in Makkah and Madinah, as listed for the package',
  'Airport and intercity transfers by coach',
  'Ziyarat visits in Makkah and Madinah',
  'Group guidance, with a pre-departure session',
];
const umrahExcludes = [
  'Meals not listed in the package',
  'Personal expenses and extra baggage',
  'Travel insurance, unless added on request',
];

export const packages: Package[] = [
  {
    slug: 'ramadan-umrah',
    service: 'umrah',
    name: 'Ramadan Umrah: the last ten nights',
    summary: 'The final ten nights of Ramadan in Makkah, followed by quieter days in Madinah.',
    days: 16,
    stays: [{ city: 'Makkah', nights: 10 }, { city: 'Madinah', nights: 5 }],
    departure: 'February 2027',
    dates: null,
    status: 'enquiry-open',
    image: 'makkah-clock-tower-night',
    airports: ['COK', 'CCJ'],
    pace: 'Steady; the nights are long, the days are kept light',
    highlights: ['The last ten nights in Makkah', 'Eid preparations explained in advance', 'Ziyarat in Madinah after Ramadan'],
    inclusions: umrahIncludes,
    exclusions: umrahExcludes,
    fare: null,
    sample: true,
  },
  {
    slug: 'family-umrah',
    service: 'umrah',
    name: 'Family Umrah in the school holidays',
    summary: 'Timed for school holidays, with rooms for families and time to rest between visits.',
    days: 12,
    stays: [{ city: 'Makkah', nights: 6 }, { city: 'Madinah', nights: 5 }],
    departure: 'April 2027',
    dates: null,
    status: 'upcoming',
    image: 'madinah-piazza-umbrellas',
    airports: ['CCJ', 'CNN'],
    pace: 'Unhurried, with free afternoons',
    highlights: ['Family rooms on request', 'Children’s questions welcome in the briefing', 'Madinah first or Makkah first'],
    inclusions: umrahIncludes,
    exclusions: umrahExcludes,
    fare: null,
    sample: true,
  },
  {
    slug: 'gentle-umrah',
    service: 'umrah',
    name: 'Unhurried Umrah for senior pilgrims',
    summary: 'A slower itinerary for parents and grandparents, with assistance arranged before you leave.',
    days: 14,
    stays: [{ city: 'Madinah', nights: 5 }, { city: 'Makkah', nights: 8 }],
    departure: 'January 2027',
    dates: null,
    status: 'enquiry-open',
    image: 'madinah-green-dome',
    airports: ['COK', 'TRV'],
    pace: 'Gentle; one main visit a day',
    highlights: ['Wheelchair assistance requested where available', 'Ground-floor or near-lift rooms on request', 'A companion briefing for family members'],
    inclusions: umrahIncludes,
    exclusions: umrahExcludes,
    fare: null,
    sample: true,
  },
  {
    slug: 'short-umrah',
    service: 'umrah',
    name: 'Nine-day Umrah',
    summary: 'For pilgrims with limited leave: Umrah and Madinah in nine days, without rushing the rites.',
    days: 9,
    stays: [{ city: 'Makkah', nights: 4 }, { city: 'Madinah', nights: 4 }],
    departure: 'November 2026',
    dates: null,
    status: 'enquiry-open',
    image: 'makkah-haram-king-fahd-gate',
    airports: ['CCJ', 'COK'],
    pace: 'Focused, with the rites unhurried',
    highlights: ['Weekend departures', 'Compact ziyarat programme', 'Return in time for work'],
    inclusions: umrahIncludes,
    exclusions: umrahExcludes,
    fare: null,
    sample: true,
  },
  {
    slug: 'hajj-group-azizia',
    service: 'hajj',
    name: 'Hajj group package, Azizia stay',
    summary: 'A longer group programme with accommodation in Azizia, transport to the Haram and full guidance through the days of Hajj.',
    days: 35,
    stays: [{ city: 'Azizia, Makkah', nights: 22 }, { city: 'Mina, Arafat and Muzdalifah', nights: 5 }, { city: 'Madinah', nights: 7 }],
    departure: 'Hajj season 2027',
    dates: null,
    status: 'enquiry-open',
    image: 'hajj-arafat-plain',
    airports: ['COK', 'CCJ'],
    pace: 'Structured, with rest days before the days of Hajj',
    highlights: ['Pre-departure classes', 'A group leader through the days of Hajj', 'Madinah after Hajj'],
    inclusions: [
      'Return economy flights',
      'Hajj visa processing, subject to quota and approval',
      'Accommodation as listed for the package',
      'Transport between Makkah, Mina, Arafat, Muzdalifah and Madinah',
      'Guidance before and during Hajj',
    ],
    exclusions: ['Qurbani (sacrifice), unless added', 'Personal expenses', 'Items not listed as included'],
    fare: null,
    sample: true,
  },
  {
    slug: 'hajj-group-near-haram',
    service: 'hajj',
    name: 'Hajj group package, closer to the Haram',
    summary: 'A shorter programme with hotels closer to Masjid al-Haram, for pilgrims who want less daily travel.',
    days: 24,
    stays: [{ city: 'Makkah', nights: 13 }, { city: 'Mina, Arafat and Muzdalifah', nights: 5 }, { city: 'Madinah', nights: 5 }],
    departure: 'Hajj season 2027',
    dates: null,
    status: 'upcoming',
    image: 'makkah-haram-aerial',
    airports: ['COK'],
    pace: 'Compact, with shorter walks to the Haram',
    highlights: ['Hotels nearer the Haram', 'Small group size', 'Madinah before or after Hajj'],
    inclusions: [
      'Return economy flights',
      'Hajj visa processing, subject to quota and approval',
      'Accommodation as listed for the package',
      'Transport between the holy sites',
      'Guidance before and during Hajj',
    ],
    exclusions: ['Qurbani (sacrifice), unless added', 'Personal expenses', 'Items not listed as included'],
    fare: null,
    sample: true,
  },
];

export const umrahPackages = packages.filter((p) => p.service === 'umrah');
export const hajjPackages = packages.filter((p) => p.service === 'hajj');
export const getPackage = (service: Package['service'], slug: string) => packages.find((p) => p.service === service && p.slug === slug);

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** The last day the package can still depart: its confirmed date, else the end of its month ('…-31' compares correctly
 * as text) or of its year ('Hajj season 2027'). */
export function lastDeparture(p: Pick<Package, 'dates' | 'departure'>) {
  if (p.dates) return p.dates.depart;
  const year = /\d{4}/.exec(p.departure)?.[0];
  if (!year) return '9999-12-31';
  const m = MONTHS.findIndex((x) => p.departure.includes(x));
  return `${year}-${m < 0 ? '12' : String(m + 1).padStart(2, '0')}-31`;
}

/** The status to show on `today` (YYYY-MM-DD): once a package has departed it is completed, whatever the data says. */
export const shownStatus = (p: Pick<Package, 'dates' | 'departure' | 'status'>, today: string): PackageStatus | null =>
  lastDeparture(p) < today ? 'completed' : p.status;

/** Listings show only packages still to depart and not marked completed. */
export const isListed = (p: Pick<Package, 'dates' | 'departure' | 'status'>, today: string) => shownStatus(p, today) !== 'completed';
