// Visa assistance by destination. SAMPLE INFORMATION for the preview: the visa types and typical documents show the
// layout only. Requirements change and must be verified with official sources at the time of applying. No fees,
// processing times or approval rates are given, and approval is always decided by the issuing country.

/** Keys match the enquiry form's country list (lib/dictionary.ts, form.visaCountries). */
export type VisaKey = 'sa' | 'ae' | 'qa' | 'om' | 'my' | 'tr';

export type VisaCountry = {
  key: VisaKey;
  country: string;
  /** Who usually asks: shown under the country name. */
  context: string;
  types: string[];
  documents: string[];
  /** Null until HIJRA confirms it; the page then says the time varies and is confirmed on application. */
  processing: null;
  sample: true;
};

const passport = 'Passport valid for at least six months';
const photo = 'Recent photograph to the country’s specification';

export const visaCountries: VisaCountry[] = [
  {
    key: 'sa',
    country: 'Saudi Arabia',
    context: 'Umrah, and visits to family working in the Kingdom',
    types: ['Umrah', 'Family visit', 'Tourist', 'Business'],
    documents: [passport, photo, 'Vaccination records, such as the meningococcal vaccine for Umrah', 'For family visits, the invitation issued by your relative in Saudi Arabia'],
    processing: null,
    sample: true,
  },
  {
    key: 'ae',
    country: 'United Arab Emirates',
    context: 'Holidays, family visits and transit through the Emirates',
    types: ['Tourist', 'Family visit', 'Transit'],
    documents: [passport, photo, 'Return ticket and hotel booking, or your host’s details', 'For family visits, your relative’s residence documents'],
    processing: null,
    sample: true,
  },
  {
    key: 'qa',
    country: 'Qatar',
    context: 'Family visits, holidays and stopovers',
    types: ['Tourist', 'Family visit'],
    documents: [passport, photo, 'Return ticket and hotel booking', 'For family visits, your relative’s residence documents'],
    processing: null,
    sample: true,
  },
  {
    key: 'om',
    country: 'Oman',
    context: 'Family visits and holidays in Muscat and Salalah',
    types: ['Tourist', 'Family visit'],
    documents: [passport, photo, 'Return ticket and hotel booking', 'For family visits, a sponsor letter from your relative'],
    processing: null,
    sample: true,
  },
  {
    key: 'my',
    country: 'Malaysia',
    context: 'Family holidays in Kuala Lumpur, Penang and Langkawi',
    types: ['Tourist', 'Business'],
    documents: [passport, photo, 'Return ticket and hotel booking', 'Recent bank statements'],
    processing: null,
    sample: true,
  },
  {
    key: 'tr',
    country: 'Türkiye',
    context: 'Istanbul holidays, on their own or with Umrah',
    types: ['Tourist', 'Business'],
    documents: [passport, photo, 'Bank statements and income tax returns', 'Employer’s letter or business registration', 'Flight and hotel reservations, and travel insurance'],
    processing: null,
    sample: true,
  },
];
