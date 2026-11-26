import { dayNames, formatTime, type Branch, type Day, type WeekHours } from '@/data/branches';
import { routes, type ServiceKey } from '@/data/navigation';
import type { IconName } from '@/components/ui/icons';

// Shared by the Branches page, each branch page and the About page. Plain module (no 'use client'),
// so both Server and Client Components can call these helpers.

/** Head office first, then A–Z by name, which is the town (report 8.3). The directory numbers its cards in this order. */
export function orderBranches(list: Branch[]) {
  return [...list].sort((a, b) => Number(b.isHeadOffice) - Number(a.isHeadOffice) || a.name.localeCompare(b.name, 'en'));
}

/** The services a branch can offer, with the page each one links to. */
export const serviceInfo: Record<ServiceKey, { label: string; phrase: string; href: string; icon: IconName; text: string }> = {
  umrah: { label: 'Umrah', phrase: 'Umrah', href: routes.umrah, icon: 'compass', text: 'Departures from Kerala, the visa and preparation before you travel.' },
  hajj: { label: 'Hajj', phrase: 'Hajj', href: routes.hajj, icon: 'users', text: 'Registration routes and the days of Hajj, explained step by step.' },
  tour: { label: 'Tours', phrase: 'tours', href: routes.tours, icon: 'globe', text: 'Holidays abroad and within India, for families and groups.' },
  flight: { label: 'Flight tickets', phrase: 'flight tickets', href: routes.flights, icon: 'plane', text: 'Domestic and international fares, group bookings and date changes.' },
  visa: { label: 'Visa assistance', phrase: 'visas', href: routes.visa, icon: 'passport', text: 'Umrah, visit and tourist visas, with your documents checked first.' },
};

/** 'Umrah, Hajj and tours' */
export function listPhrase(words: string[]) {
  return words.length > 1 ? `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}` : (words[0] ?? '');
}

/** Monday first, as on a signboard. */
export const week: Day[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/** ['9:30 am – 1:00 pm', '2:00 – 6:00 pm'] (a shared am/pm is written once), or [] when the branch is closed that day. */
export function dayRanges(hours: WeekHours, day: Day) {
  const v = hours[day];
  if (v === 'closed') return [];
  return v.map(([open, close]) => {
    const o = formatTime(open);
    const c = formatTime(close);
    return `${o.slice(-2) === c.slice(-2) ? o.slice(0, -3) : o} – ${c}`;
  });
}

/** 'Monday to Saturday' for a run of three or more days, otherwise a list. */
function span(days: Day[]) {
  const first = days[0];
  const last = days[days.length - 1];
  const isRun = days.length > 2 && week.indexOf(last) - week.indexOf(first) === days.length - 1;
  return isRun ? `${dayNames[first]} to ${dayNames[last]}` : days.map((d) => dayNames[d]).join(', ');
}

/** The week in two short lines, used before the visitor's day is known (the static render). */
export function weekSummary(hours: WeekHours) {
  const open = week.filter((d) => hours[d] !== 'closed');
  const closed = week.filter((d) => hours[d] === 'closed');
  return {
    open: open.length ? `Open ${span(open)}` : 'Closed all week',
    closed: closed.length ? `Closed on ${span(closed)}` : 'Open every day',
  };
}

/** Lower-case text the directory search matches: name, town, district and PIN code. */
export const searchText = (b: Branch) =>
  [b.name, b.district, b.address?.locality, b.address?.postalCode].filter(Boolean).join(' ').toLowerCase();
