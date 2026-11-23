import type { ServiceKey } from './navigation';

// SAMPLE TESTIMONIALS for the preview. They show the layout only: no real customer, name, rating or review
// is invented. Replace with reviews HIJRA has written consent to publish (name, town and year as approved).

export type Testimonial = {
  id: string;
  quote: string;
  /** What the journey was, without identifying anyone, e.g. 'Umrah with elderly parents'. */
  context: string;
  service: ServiceKey;
  /** Only with the pilgrim's written consent, and only as much as they agreed to show. */
  name?: string;
  town?: string;
  year?: number;
  /** The quote shown on the homepage. */
  featured?: boolean;
  sample: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Our advisor explained every step before we left. My parents knew what to expect each day, and that made all the difference.',
    context: 'Umrah with elderly parents',
    service: 'umrah',
    sample: true,
  },
  {
    id: 't2',
    quote: 'The classes before Hajj made the days in Mina and Arafat calmer than we imagined. We always knew where to be next.',
    context: 'Hajj, first time',
    service: 'hajj',
    sample: true,
  },
  {
    id: 't3',
    quote: 'As first-time pilgrims we had many questions. Nobody rushed us, on the phone or in the branch.',
    context: 'Umrah, a young couple',
    service: 'umrah',
    featured: true,
    sample: true,
  },
  {
    id: 't4',
    quote: 'The itinerary left time for prayer and rest, which mattered to a family travelling with small children.',
    context: 'Family tour within India',
    service: 'tour',
    sample: true,
  },
  {
    id: 't5',
    quote: 'They told us exactly which documents to bring and checked everything before the application went in.',
    context: 'Visit visa for the Gulf',
    service: 'visa',
    sample: true,
  },
  {
    id: 't6',
    quote: 'Our return date changed twice. Each time it was sorted over WhatsApp, with the new ticket explained clearly.',
    context: 'Flight tickets for a family',
    service: 'flight',
    sample: true,
  },
];
