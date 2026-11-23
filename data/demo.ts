// DEMONSTRATION CONTENT for the client preview.
// Each value stands in for something HIJRA has not supplied yet, so that every page reads as finished. To replace one,
// put the real value in data/site.ts or data/branches.ts (a real value always wins), or rewrite the text here.
//
// Safeguards:
// - Shown only while the site is closed to search engines. A launch build (NEXT_PUBLIC_ALLOW_INDEXING=true) shows
//   HIJRA's real values, or a marked placeholder, and never these (see `useDemo` in data/site.ts).
// - NO CONTACT DETAILS: phone numbers, WhatsApp, email, opening hours, reply times and directions come only from
//   HIJRA, in data/site.ts and data/branches.ts. scripts/check-contacts.mjs fails the build if one appears here.
// - Nothing here states a registration, licence, award, rating, date or a named person. The copy is written in
//   HIJRA's voice for HIJRA to review and replace.

export const demo = {
  facts: {
    /** The figure in HIJRA's own brief (I17: HIJRA has also said 30+). */
    yearsOfExperience: '25+',
  },
  /** The leadership's letter (About) and its opening line (homepage), signed by the team rather than a named person. */
  letter: {
    lead: 'Every family that trusts us with its journey becomes part of ours.',
    paragraphs: [
      'HIJRA began on the Malabar coast with one promise: that no family would set out for Makkah unsure of what lay ahead.',
      'We keep it still. An advisor explains each rite, plans around your parents’ pace, and stays in touch until you are home.',
    ],
    signature: 'The HIJRA leadership team',
  },
  /** About: the company's journey, told without invented dates. */
  journey: [
    { step: 'The start', title: 'Where it began', text: 'A small office on the Malabar coast, helping families from nearby towns plan their Umrah.' },
    { step: 'Early years', title: 'The first pilgrim groups', text: 'Groups that travelled with an advisor from Kerala to Madinah and Makkah, and home again.' },
    { step: 'Growth', title: 'Branches across Kerala', text: 'As families recommended HIJRA to relatives, branches opened in the towns they came from.' },
  ],
  nameStory: 'The founders chose the name for the journey every pilgrim makes: leaving home for the sake of Allah, and coming back changed.',
  teams: 'Each branch has a branch manager and Hajj and Umrah advisors, supported by group leaders who travel with every group.',
  bookATrip: {
    whoReplies: 'An advisor from your nearest branch replies',
    free: 'An enquiry costs nothing and commits you to nothing',
  },
  /**
   * Privacy and Terms drafts: complete-reading defaults that state no legal fact. Identity details point to pages that
   * show HIJRA's own details; periods are policy proposals for HIJRA's legal adviser to confirm or change.
   */
  legal: {
    entity: 'HIJRA Travels',
    office: 'the head office listed on our Branches page',
    hosting: 'our website hosting provider',
    retainEnquiries: '24 months',
    retainLegal: 'as long as Indian law requires',
    retainLogs: '90 days',
    providers: 'our website host, our email provider and the WhatsApp Business platform',
    storage: 'in data centres in India and, for some providers, abroad, under contracts that protect it',
    security: 'encrypted connections (HTTPS), access limited to the staff who handle your enquiry, and regular reviews of who can see it',
    malayalam: 'available on request',
    officer: 'Grievance Officer, HIJRA Travels',
    response: 'the period the DPDP Rules allow',
    analytics: 'none is used in this preview',
    jurisdiction: 'Kerala',
    adopted: 'Not yet adopted: draft of November 2026',
  },
};
