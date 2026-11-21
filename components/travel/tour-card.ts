import type { Tour } from '@/data/tours';
import { photoAsset } from '@/lib/image';
import type { TourCard } from './tour-tile';

/** Server side: only the fields a tile needs, so client components receive a small payload, with the photo resolved. */
export const toCard = ({ slug, title, region, state, country, days, nights, summary, image, bestTime, idealFor, featured }: Tour): TourCard => ({
  slug,
  title,
  region,
  state,
  country,
  days,
  nights,
  summary,
  image: photoAsset(image),
  bestTime,
  idealFor,
  featured: featured ?? false,
});
