import { imageList, type ImageKey } from './images';

// Gallery collections, derived from each photograph's tags in data/images.ts. A photo joins the FIRST collection
// whose tag it carries (Kaaba photos are also tagged 'hajj', but belong to Makkah), so no photo appears twice.
// These are licensed temporary photographs of places, never HIJRA's customers: HIJRA's own trip photography,
// with consent, replaces them.

export type GalleryCollection = 'makkah' | 'madinah' | 'hajj' | 'kerala' | 'india' | 'international' | 'travel';

export const collections: { id: GalleryCollection; label: string; note: string }[] = [
  { id: 'makkah', label: 'Makkah', note: 'Masjid al-Haram, the Kaaba and the city around it.' },
  { id: 'madinah', label: 'Madinah', note: 'The Prophet’s Mosque, its courtyards and Masjid Quba.' },
  { id: 'hajj', label: 'Hajj', note: 'Mina, Arafat and the Jamarat during the days of Hajj.' },
  { id: 'kerala', label: 'Kerala tours', note: 'Hills, backwaters, beaches and the old mosques of home.' },
  { id: 'india', label: 'India', note: 'Journeys further afield within India.' },
  { id: 'international', label: 'International', note: 'Cities and sights for holidays abroad.' },
  { id: 'travel', label: 'Travel', note: 'The gateways: a Kerala airport and Jeddah on the Red Sea.' },
];

/** Tag → collection, in priority order. */
const rules: [tag: string, collection: GalleryCollection][] = [
  ['makkah', 'makkah'],
  ['madinah', 'madinah'],
  ['jeddah', 'travel'],
  ['hajj', 'hajj'],
  ['kerala', 'kerala'],
  ['india', 'india'],
  ['international', 'international'],
  ['travel', 'travel'],
];

/** Left out: a restricted emblem and a licence under review (lead's instruction), and a still life of US passports. */
const excluded: string[] = ['travel-passports'];

export const galleryPhotos: { key: ImageKey; collection: GalleryCollection }[] = imageList.flatMap((p) => {
  const collection = rules.find(([tag]) => p.tags.includes(tag))?.[1];
  return collection && !excluded.includes(p.key) ? [{ key: p.key, collection }] : [];
});
