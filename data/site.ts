// Brand facts and contact details: one source for the whole site.
// `null` in the *Live objects means HIJRA has not supplied the value yet. Preview builds then show the
// demonstration stand-in from data/demo.ts; launch builds show a clearly marked placeholder instead.
// Contact buttons link only to real values: until then they open the preview notice, never an invented number.
import { demo } from './demo';

export type SocialNetwork = 'facebook' | 'instagram' | 'youtube';

/** Search engines are kept out until NEXT_PUBLIC_ALLOW_INDEXING=true (sample content must not be indexed). */
const indexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';
/** Demonstration stand-ins appear only in preview builds, never in a build that search engines may index. */
const useDemo = !indexable;
const orDemo = <T,>(real: T | null, stand: T): T | null => real ?? (useDemo ? stand : null);

/** I16: HIJRA's real contact details, E.164 numbers (e.g. '+9198XXXXXXXX'). Only these become tel:, wa.me and mailto: links. */
const contactLive = {
  phone: null as string | null,
  whatsapp: null as string | null,
  email: null as string | null,
  /** Office hours as HIJRA wants them shown, e.g. 'Mon–Sat, 9:30 am – 6:00 pm'. */
  hours: null as string | null,
  /** How quickly an advisor replies, e.g. 'within one working day'. */
  replyTime: null as string | null,
};

/** I17: the brief says 25+, HIJRA has also said 30+. */
const yearsLive = null as string | null;

export const site = {
  name: 'HIJRA Travels',
  /** As written on the official logo ("TRAVELS | HAJ GROUP"). The brief writes "Hajj Group": HIJRA to confirm. */
  fullName: 'HIJRA Travels | Haj Group',
  positioning: 'Hajj & Umrah Travel Specialist',
  region: 'Malabar, Kerala',
  description:
    'HIJRA Travels guides families from Kerala on Hajj and Umrah, and arranges tours, flight tickets and visa assistance. Enquire by form, phone or WhatsApp.',
  /** Set NEXT_PUBLIC_SITE_URL to the live domain at launch (canonical URLs, sitemap, Open Graph). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  indexable,
  /** True while demonstration stand-ins fill gaps (preview builds); pages may mark such values as samples. */
  demo: useDemo,

  facts: {
    yearsOfExperience: orDemo(yearsLive, demo.facts.yearsOfExperience),
    /** True when the years figure is a demonstration stand-in. */
    yearsIsDemo: !yearsLive && useDemo,
    /** From HIJRA's business brief ("6+ branches"); must match the verified branch list before launch. */
    branchCount: '6+' as string | null,
  },

  /** Real values only: what links may use. */
  contactLive,
  /** What pages show: HIJRA's value, or the demonstration stand-in in preview builds. */
  contact: {
    phone: orDemo(contactLive.phone, demo.contact.phone),
    whatsapp: orDemo(contactLive.whatsapp, demo.contact.whatsapp),
    email: orDemo(contactLive.email, demo.contact.email),
    hours: orDemo(contactLive.hours, demo.contact.hours),
    replyTime: orDemo(contactLive.replyTime, demo.contact.replyTime),
  },

  /** I10: HIJRA's own profiles only. */
  social: {
    facebook: null,
    instagram: null,
    youtube: null,
  } as Record<SocialNetwork, string | null>,
};
