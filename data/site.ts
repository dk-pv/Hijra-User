// Brand facts and contact details: one source for the whole site.
// Contact details are HIJRA's real values only; `null` means not supplied yet, and pages show a marked placeholder.
// There are no demonstration contacts: scripts/check-contacts.mjs (run before every build) rejects placeholder
// values, and a launch build without the central phone, WhatsApp and email.
// Contact buttons link only to real values: until then they open the "not connected yet" notice.
import { demo } from './demo';

export type SocialNetwork = 'facebook' | 'instagram' | 'youtube';

/** Search engines are kept out until NEXT_PUBLIC_ALLOW_INDEXING=true (sample content must not be indexed). */
const indexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';
/** Demonstration stand-ins (text, never contact details) appear only in preview builds, never in an indexable build. */
const useDemo = !indexable;
const orDemo = <T,>(real: T | null, stand: T): T | null => real ?? (useDemo ? stand : null);

/** I16: HIJRA's real contact details; phone and WhatsApp in E.164 (+91 and 10 digits). They become tel:, wa.me and mailto: links. */
const contact = {
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
    /** The total number of branches, only once HIJRA confirms it (e.g. '6'). Until then pages say "branches across Kerala". */
    branchCount: null as string | null,
  },

  contact,

  /** I10: HIJRA's own profiles only. */
  social: {
    facebook: null,
    instagram: null,
    youtube: null,
  } as Record<SocialNetwork, string | null>,
};
