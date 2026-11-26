import { airportNames, MONTHS, type Package } from '@/data/packages';

// Small, pure helpers that present the (sample) package data on the pilgrimage pages.

/** 'February 2027' -> a sortable number; strings without a month sort to the start of their year. */
export const departureOrder = (departure: string) =>
  Number(/\d{4}/.exec(departure)?.[0] ?? 0) * 12 + Math.max(0, MONTHS.findIndex((m) => departure.includes(m)));

/** Packages in departure order, soonest first (a fixed order: no clock is read, so pages stay static). */
export const byDeparture = (list: Package[]) => [...list].sort((a, b) => departureOrder(a.departure) - departureOrder(b.departure));

/** 'February 2027' -> ['February', '2027']; 'Hajj season 2027' -> ['Hajj season', '2027']. */
export function splitDeparture(departure: string): [string, string] {
  const i = departure.lastIndexOf(' ');
  return i > 0 ? [departure.slice(0, i), departure.slice(i + 1)] : [departure, ''];
}

export const nights = (p: Package) => p.stays.reduce((n, s) => n + s.nights, 0);

/** '9–16 days' across a list of packages (word joiners keep the range on one line). */
export function dayRange(list: Package[]) {
  const d = list.map((p) => p.days);
  const lo = Math.min(...d);
  const hi = Math.max(...d);
  return lo === hi ? `${lo} days` : `${lo}⁠–⁠${hi} days`;
}

/** ['Kochi', 'Kozhikode', 'Kannur'] -> 'Kochi, Kozhikode or Kannur' */
export const orList = (names: string[]) => (names.length > 1 ? `${names.slice(0, -1).join(', ')} or ${names.at(-1)}` : (names[0] ?? ''));

/** 'Kochi or Kozhikode' */
export const airportsText = (p: Package) => orList(p.airports.map((a) => airportNames[a]));

/** 4 -> 'four' (prose spells out small numbers). */
export const numberWord = (n: number) => ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][n] ?? String(n);

/** Every airport the given packages leave from, in a stable order. */
export const allAirports = (list: Package[]) => [...new Set(list.flatMap((p) => p.airports))].map((a) => airportNames[a]);
