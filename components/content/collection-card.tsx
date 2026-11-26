import Link from 'next/link';
import type { GalleryCollection } from '@/data/gallery';
import { galleryPath } from '@/data/navigation';
import { Photo } from '@/components/ui/photo';

/** One gallery collection: cover, place, travel date (when HIJRA has confirmed it) and photo count; the card is the link. */
export function CollectionCard({ c, sizes }: { c: GalleryCollection; sizes: string }) {
  const n = c.photos.length;
  return (
    <Link href={galleryPath(c.slug)} className="group block">
      <div className="relative">
        <Photo image={c.photos[0]} alt="" sizes={sizes} className="aspect-[4/3] rounded-md" />
        <span className="chip absolute left-3 top-3">
          {n} {n === 1 ? 'photo' : 'photos'}
        </span>
      </div>
      <p className="eyebrow mt-4">
        {c.country}
        {c.date ? ` · ${c.date}` : ''}
      </p>
      <h3 className="mt-1.5 text-[clamp(1.25rem,1.1rem+0.4vw,1.5rem)] leading-tight group-hover:text-red">{c.title}</h3>
      <span className="link-arrow mt-1">View gallery</span>
    </Link>
  );
}
