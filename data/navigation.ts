// Central route configuration. Every internal link is built from here; labels live in lib/dictionary.ts.

export const routes = {
  home: '/',
  about: '/about',
  branches: '/branches',
  hajjUmrah: '/hajj-umrah',
  hajj: '/hajj',
  umrah: '/umrah',
  tours: '/tours',
  flights: '/flights',
  visa: '/visa',
  blogs: '/blogs',
  gallery: '/gallery',
  testimonials: '/testimonials',
  pilgrimGuide: '/pilgrim-guide',
  pilgrimStories: '/pilgrim-stories',
  bookATrip: '/book-a-trip',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  imageCredits: '/image-credits',
} as const;

export type RouteKey = keyof typeof routes;

export const branchPath = (slug: string) => `/branches/${slug}`;
export const tourPath = (slug: string) => `/tours/${slug}`;
export const blogPath = (slug: string) => `/blogs/${slug}`;

/** Enquiry services offered on Book A Trip and the forms. */
export type ServiceKey = 'umrah' | 'hajj' | 'tour' | 'flight' | 'visa';

/** Link to Book A Trip with the service (and optionally a package or tour, and a branch) preselected. */
export function enquiryPath(service?: ServiceKey, interest?: string, branch?: string) {
  const q = new URLSearchParams();
  if (service) q.set('service', service);
  if (interest) q.set('interest', interest);
  if (branch) q.set('branch', branch);
  const s = q.toString();
  return `${routes.bookATrip}${s ? `?${s}` : ''}#enquiry`;
}

export type NavKey = 'home' | 'about' | 'branches' | 'hajjUmrah' | 'tours' | 'flights' | 'visa' | 'blogs' | 'bookATrip';

/** The nine confirmed menu items, in HIJRA's order (C6). `section` lists the paths that mark the item as current. */
export const mainNav: { key: NavKey; href: string; section: string[] }[] = [
  { key: 'home', href: routes.home, section: [] },
  { key: 'about', href: routes.about, section: [routes.about] },
  { key: 'branches', href: routes.branches, section: [routes.branches] },
  {
    key: 'hajjUmrah',
    href: routes.hajjUmrah,
    section: [routes.hajjUmrah, routes.hajj, routes.umrah, routes.pilgrimGuide, routes.pilgrimStories],
  },
  { key: 'tours', href: routes.tours, section: [routes.tours] },
  { key: 'flights', href: routes.flights, section: [routes.flights] },
  { key: 'visa', href: routes.visa, section: [routes.visa] },
  { key: 'blogs', href: routes.blogs, section: [routes.blogs] },
  { key: 'bookATrip', href: routes.bookATrip, section: [routes.bookATrip] },
];

/** True when `path` belongs to the nav item. */
export function isCurrent(item: { href: string; section: string[] }, path: string) {
  if (item.href === '/') return path === '/';
  return item.section.some((s) => path === s || path.startsWith(`${s}/`));
}

/** Footer link groups (the group headings live in lib/dictionary.ts). */
export const footerNav = {
  pilgrimage: [
    { label: 'Hajj & Umrah', href: routes.hajjUmrah },
    { label: 'Umrah', href: routes.umrah },
    { label: 'Hajj', href: routes.hajj },
    { label: 'Pilgrim Guide', href: routes.pilgrimGuide },
    { label: 'Pilgrim Stories', href: routes.pilgrimStories },
  ],
  travel: [
    { label: 'Tours', href: routes.tours },
    { label: 'Flight tickets', href: routes.flights },
    { label: 'Visa assistance', href: routes.visa },
    { label: 'Book A Trip', href: routes.bookATrip },
  ],
  company: [
    { label: 'About Us', href: routes.about },
    { label: 'Branches', href: routes.branches },
    { label: 'Blogs', href: routes.blogs },
    { label: 'Gallery', href: routes.gallery },
    { label: 'Testimonials', href: routes.testimonials },
    { label: 'Contact', href: routes.contact },
  ],
};
