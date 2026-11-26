import type { ImageKey } from './images';

// Written and video testimonials: one list for the homepage and /testimonials.
// ALL RECORDS ARE SAMPLES for the preview. They carry no name, place, year, photograph or video, so no customer or
// experience is invented, and each is labelled "Sample" where it appears. Replace them with reviews and videos HIJRA
// has written consent to publish, showing only as much of the person as they agreed to.

export type TestimonialCategory = 'hajj' | 'umrah' | 'international' | 'domestic';

export const categoryLabel: Record<TestimonialCategory, string> = {
  hajj: 'Hajj',
  umrah: 'Umrah',
  international: 'International tours',
  domestic: 'Indian tours',
};

type Common = {
  /** Unique across written and video records. */
  id: string;
  category: TestimonialCategory;
  /** What the journey was, without identifying anyone, e.g. 'Umrah with elderly parents'. */
  context: string;
  /** Shown only with the person's written consent, and only as much as they agreed to show. Never on samples. */
  customerName: string | null;
  customerLocation: string | null;
  /** Only when verified. */
  travelYear: number | null;
  /** The package or tour the review is about, if any. */
  packageRef?: { kind: 'umrah' | 'hajj' | 'tour'; slug: string };
  /** Chosen for the homepage. */
  featured?: boolean;
  /** Lower first. */
  displayOrder: number;
  /** 'published' only once written consent covers everything in the record; drafts never appear. */
  status: 'draft' | 'published';
  sample: boolean;
};

export type WrittenTestimonial = Common & {
  type: 'written';
  review: string;
  /** Consented photograph from the library (data/images.ts), or null. */
  customerImage: ImageKey | null;
};

export type VideoTestimonial = Common & {
  type: 'video';
  title: string;
  description: string;
  /** Poster frame from the library (data/images.ts). */
  thumbnail: ImageKey;
  /** A YouTube or Vimeo link, or an https .mp4/.webm file on HIJRA's own storage. Null on samples. */
  videoUrl: string | null;
};

export type Testimonial = WrittenTestimonial | VideoTestimonial;

export type VideoSource = { kind: 'youtube' | 'vimeo'; embed: string } | { kind: 'file'; src: string };

/** A supported video link, as something the player can load; null for anything else (the player then says the
 * video is unavailable instead of loading a broken frame). Embeds start only when the visitor presses play. */
export function videoSource(url: string | null): VideoSource | null {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  if (u.protocol !== 'https:') return null;
  const host = u.hostname.replace(/^(www|m)\./, '');
  const yt =
    host === 'youtu.be'
      ? u.pathname.slice(1)
      : host === 'youtube.com' || host === 'youtube-nocookie.com'
        ? (u.searchParams.get('v') ?? /^\/(?:embed|shorts|live)\/([^/]+)/.exec(u.pathname)?.[1])
        : null;
  if (yt && /^[\w-]{11}$/.test(yt)) return { kind: 'youtube', embed: `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0` };
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    // vimeo.com/123456789, vimeo.com/123456789/<hash> (unlisted), player.vimeo.com/video/123456789?h=<hash>
    const m = /^\/(?:video\/)?(\d{6,12})(?:\/([\da-f]{6,}))?\/?$/.exec(u.pathname);
    if (m) {
      const hash = m[2] ?? u.searchParams.get('h');
      return { kind: 'vimeo', embed: `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1${hash ? `&h=${hash}` : ''}` };
    }
  }
  if (/\.(mp4|webm)$/i.test(u.pathname)) return { kind: 'file', src: u.href };
  return null;
}

/** Why a record cannot be shown, or null when it can. Empty or unconsented records never reach a page. */
export function testimonialProblem(t: Testimonial): string | null {
  if (t.sample && (t.customerName || t.customerLocation || t.travelYear || (t.type === 'written' && t.customerImage)))
    return 'a sample carries a name, place, year or photograph';
  if (t.type === 'written') return t.review.trim() ? null : 'a written testimonial needs its review';
  if (!t.title.trim() || !t.description.trim()) return 'a video testimonial needs a title and description';
  if (t.videoUrl === null) return t.sample ? null : 'a video testimonial needs its video';
  return videoSource(t.videoUrl) ? null : `unsupported video link: ${t.videoUrl}`;
}

export const testimonials: Testimonial[] = [
  {
    id: 'w-umrah-parents',
    type: 'written',
    category: 'umrah',
    review: 'Our advisor explained every step before we left. My parents knew what to expect each day, and that made all the difference.',
    context: 'Umrah with elderly parents',
    customerName: null,
    customerLocation: null,
    travelYear: null,
    customerImage: null,
    packageRef: { kind: 'umrah', slug: 'gentle-umrah' },
    featured: true,
    displayOrder: 1,
    status: 'published',
    sample: true,
  },
  {
    id: 'w-hajj-first',
    type: 'written',
    category: 'hajj',
    review: 'The classes before Hajj made the days in Mina and Arafat calmer than we imagined. We always knew where to be next.',
    context: 'Hajj, first time',
    customerName: null,
    customerLocation: null,
    travelYear: null,
    customerImage: null,
    featured: true,
    displayOrder: 2,
    status: 'published',
    sample: true,
  },
  {
    id: 'w-umrah-couple',
    type: 'written',
    category: 'umrah',
    review: 'As first-time pilgrims we had many questions. Nobody rushed us, on the phone or in the branch.',
    context: 'Umrah, a young couple',
    customerName: null,
    customerLocation: null,
    travelYear: null,
    customerImage: null,
    featured: true,
    displayOrder: 3,
    status: 'published',
    sample: true,
  },
  {
    id: 'w-istanbul-family',
    type: 'written',
    category: 'international',
    review: 'Each day in Istanbul was planned around the prayers, and the pace suited both the children and their grandmother.',
    context: 'A family holiday abroad',
    customerName: null,
    customerLocation: null,
    travelYear: null,
    customerImage: null,
    packageRef: { kind: 'tour', slug: 'istanbul-bursa' },
    displayOrder: 4,
    status: 'published',
    sample: true,
  },
  {
    id: 'w-india-family',
    type: 'written',
    category: 'domestic',
    review: 'The itinerary left time for prayer and rest, which mattered to a family travelling with small children.',
    context: 'Family tour within India',
    customerName: null,
    customerLocation: null,
    travelYear: null,
    customerImage: null,
    displayOrder: 5,
    status: 'published',
    sample: true,
  },
  {
    id: 'v-first-umrah',
    type: 'video',
    category: 'umrah',
    title: 'A first Umrah',
    description: 'Where a pilgrim’s own video about their first Umrah will appear, with captions.',
    context: 'Umrah, first time',
    thumbnail: 'makkah-tawaf-night',
    videoUrl: null,
    customerName: null,
    customerLocation: null,
    travelYear: null,
    featured: true,
    displayOrder: 1,
    status: 'published',
    sample: true,
  },
  {
    id: 'v-family-hajj',
    type: 'video',
    category: 'hajj',
    title: 'A family’s Hajj',
    description: 'Where a family’s video, recorded a few weeks after returning home, will appear.',
    context: 'Hajj with family',
    thumbnail: 'hajj-arafat-plain',
    videoUrl: null,
    customerName: null,
    customerLocation: null,
    travelYear: null,
    displayOrder: 2,
    status: 'published',
    sample: true,
  },
  {
    id: 'v-parents-umrah',
    type: 'video',
    category: 'umrah',
    title: 'Umrah with elderly parents',
    description: 'Where a video about taking parents for Umrah will appear: the pace, the help and the moments that mattered.',
    context: 'Umrah with elderly parents',
    thumbnail: 'madinah-piazza-umbrellas',
    videoUrl: null,
    customerName: null,
    customerLocation: null,
    travelYear: null,
    displayOrder: 3,
    status: 'published',
    sample: true,
  },
  {
    id: 'v-holiday-abroad',
    type: 'video',
    category: 'international',
    title: 'A family holiday abroad',
    description: 'Where a traveller’s video about a holiday abroad with HIJRA will appear.',
    context: 'Holiday with family',
    thumbnail: 'intl-istanbul-golden-horn',
    videoUrl: null,
    customerName: null,
    customerLocation: null,
    travelYear: null,
    displayOrder: 4,
    status: 'published',
    sample: true,
  },
];

/** What pages show: published, complete records, in display order. */
export const publishedTestimonials = testimonials
  .filter((t) => t.status === 'published' && !testimonialProblem(t))
  .sort((a, b) => a.displayOrder - b.displayOrder);
