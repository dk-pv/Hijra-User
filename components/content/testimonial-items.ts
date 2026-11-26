import { categoryLabel, publishedTestimonials, videoSource, type Testimonial, type TestimonialCategory, type VideoSource } from '@/data/testimonials';
import { getPackage } from '@/data/packages';
import { getTour } from '@/data/tours';
import { packagePath, tourPath } from '@/data/navigation';
import { photoAsset } from '@/lib/image';
import type { PhotoAsset } from '@/components/ui/photo-frame';

// Server side: testimonials reduced to what the pages draw, with photographs resolved and the video link parsed,
// so client components receive small plain props and never the photo registry.

type ItemBase = {
  id: string;
  category: TestimonialCategory;
  categoryLabel: string;
  context: string;
  /** Name, place and year, as far as the person consented; empty for samples. */
  who: string;
  sample: boolean;
  featured: boolean;
  /** The package or tour the review is about. */
  ref: { href: string; label: string } | null;
};
export type WrittenItem = ItemBase & { type: 'written'; review: string; photo: PhotoAsset | null };
export type VideoItem = ItemBase & { type: 'video'; title: string; description: string; thumb: PhotoAsset; source: VideoSource | null };
export type TestimonialItem = WrittenItem | VideoItem;

function refOf(t: Testimonial): ItemBase['ref'] {
  const r = t.packageRef;
  if (!r) return null;
  if (r.kind === 'tour') {
    const tour = getTour(r.slug);
    return tour ? { href: tourPath(r.slug), label: tour.title } : null;
  }
  const p = getPackage(r.kind, r.slug);
  return p ? { href: packagePath(r.kind, r.slug), label: p.name } : null;
}

function toItem(t: Testimonial): TestimonialItem {
  const base: ItemBase = {
    id: t.id,
    category: t.category,
    categoryLabel: categoryLabel[t.category],
    context: t.context,
    who: [t.customerName, t.customerLocation, t.travelYear].filter(Boolean).join(', '),
    sample: t.sample,
    featured: t.featured ?? false,
    ref: refOf(t),
  };
  return t.type === 'written'
    ? { ...base, type: 'written', review: t.review, photo: t.customerImage ? photoAsset(t.customerImage) : null }
    : { ...base, type: 'video', title: t.title, description: t.description, thumb: photoAsset(t.thumbnail), source: videoSource(t.videoUrl) };
}

const items = publishedTestimonials.map(toItem);
export const writtenItems = items.filter((t): t is WrittenItem => t.type === 'written');
/** Featured videos first, then display order. */
export const videoItems = items.filter((t): t is VideoItem => t.type === 'video').sort((a, b) => Number(b.featured) - Number(a.featured));
