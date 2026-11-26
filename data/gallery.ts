import type { ImageKey } from './images';

// Gallery collections: one per completed journey (a package, group or departure), in four separate categories, so
// Hajj, Umrah and holiday photographs are never mixed. Each collection has its own page, /gallery/<slug>.
// ALL COLLECTIONS ARE SAMPLES for the preview: licensed photographs of the places (credited on /image-credits), never
// of HIJRA's travellers, and no journey or date is claimed. HIJRA's own trip photographs, published only with the
// written consent of everyone pictured, replace them: one collection per completed journey, with its travel date.

export type GalleryCategory = 'international' | 'domestic' | 'umrah' | 'hajj';

export const galleryCategories: { id: GalleryCategory; label: string; note: string }[] = [
  { id: 'international', label: 'International tours', note: 'Holidays abroad, one collection per completed tour.' },
  { id: 'domestic', label: 'Indian domestic tours', note: 'Tours within India.' },
  { id: 'umrah', label: 'Umrah journeys', note: 'Umrah groups, by package or departure.' },
  { id: 'hajj', label: 'Hajj journeys', note: 'Hajj groups, by season.' },
];

export type GalleryCollection = {
  slug: string;
  category: GalleryCategory;
  /** The package or destination. */
  title: string;
  country: string;
  /** When the group travelled, e.g. 'April 2026'; null until HIJRA confirms it (never invented). */
  date: string | null;
  /** The first photograph is the cover. */
  photos: ImageKey[];
  /** The tour this collection belongs to, if any (data/tours.ts). */
  tour?: string;
  sample: true;
};

export const galleryCollections: GalleryCollection[] = [
  { slug: 'istanbul-bursa', category: 'international', title: 'Istanbul and Bursa', country: 'Türkiye', date: null, photos: ['intl-istanbul-golden-horn'], tour: 'istanbul-bursa', sample: true },
  { slug: 'dubai-abu-dhabi', category: 'international', title: 'Dubai and Abu Dhabi', country: 'UAE', date: null, photos: ['intl-dubai-creek-abra'], tour: 'dubai-abu-dhabi', sample: true },
  {
    slug: 'malaysia-singapore',
    category: 'international',
    title: 'Kuala Lumpur and Singapore',
    country: 'Malaysia and Singapore',
    date: null,
    photos: ['intl-putrajaya-putra-mosque', 'intl-singapore-marina-bay'],
    tour: 'malaysia-singapore',
    sample: true,
  },
  { slug: 'egypt-cairo-nile', category: 'international', title: 'Cairo and the Nile', country: 'Egypt', date: null, photos: ['intl-cairo-giza-pyramids'], tour: 'egypt-cairo-nile', sample: true },
  { slug: 'samarkand-bukhara', category: 'international', title: 'Samarkand and Bukhara', country: 'Uzbekistan', date: null, photos: ['intl-samarkand-registan'], tour: 'uzbekistan-samarkand-bukhara', sample: true },
  { slug: 'baku', category: 'international', title: 'Baku', country: 'Azerbaijan', date: null, photos: ['intl-baku-old-city'], tour: 'baku-azerbaijan', sample: true },
  { slug: 'kashmir', category: 'domestic', title: 'Kashmir', country: 'India', date: null, photos: ['india-kashmir-dal-lake'], tour: 'kashmir-srinagar-gulmarg', sample: true },
  { slug: 'delhi-agra-jaipur', category: 'domestic', title: 'Delhi, Agra and Jaipur', country: 'India', date: null, photos: ['india-agra-taj-mahal'], tour: 'delhi-agra-jaipur', sample: true },
  {
    slug: 'umrah-makkah',
    category: 'umrah',
    title: 'Umrah: Makkah',
    country: 'Saudi Arabia',
    date: null,
    photos: [
      'makkah-tawaf-night',
      'makkah-kaaba-tawaf',
      'makkah-haram-clock-tower-night',
      'makkah-clock-tower-night',
      'makkah-haram-king-fahd-gate',
      'makkah-masa-safa-marwa',
      'makkah-jabal-al-nour',
      'makkah-haram-aerial',
    ],
    sample: true,
  },
  {
    slug: 'umrah-madinah',
    category: 'umrah',
    title: 'Umrah: Madinah',
    country: 'Saudi Arabia',
    date: null,
    photos: ['madinah-nabawi-golden-hour', 'madinah-green-dome', 'madinah-minaret-arcade', 'madinah-quba-mosque', 'madinah-piazza-umbrellas', 'madinah-mosque-interior-arches'],
    sample: true,
  },
  {
    slug: 'hajj-holy-sites',
    category: 'hajj',
    title: 'Hajj: Mina, Arafat and the Jamarat',
    country: 'Saudi Arabia',
    date: null,
    photos: ['hajj-arafat-jabal-rahmah', 'hajj-mina-tent-city', 'hajj-arafat-plain', 'hajj-pilgrims-jamarat', 'hajj-jamarat-bridge-aerial'],
    sample: true,
  },
];

export const getCollection = (slug: string) => galleryCollections.find((c) => c.slug === slug);
