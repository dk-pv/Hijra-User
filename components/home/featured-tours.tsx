import Link from 'next/link';
import { tours } from '@/data/tours';
import { tourPath } from '@/data/navigation';
import { Photo } from '@/components/ui/photo';
import { StatusBadge } from '@/components/ui/status-badge';
import { tourLength } from '@/components/travel/tour-tile';

/** Homepage: the featured international tours as tall editorial portraits; a swipe strip on phones, 2 by 2 on tablets. */
export function FeaturedTours() {
  const picks = tours.filter((t) => t.featured && t.region === 'international').slice(0, 4);
  return (
    <ul
      role="list"
      aria-label="Featured international tours (sample itineraries)"
      className="-mx-(--m) flex snap-x snap-mandatory scroll-px-(--m) gap-4 overflow-x-auto px-(--m) pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-x-(--g) md:gap-y-12 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
    >
      {picks.map((t) => (
        <li key={t.slug} className="w-[78%] shrink-0 snap-start min-[600px]:w-[46%] md:w-auto">
          <Link href={tourPath(t.slug)} className="group flex h-full flex-col">
            <div className="relative">
              <Photo
                image={t.image}
                sizes="(min-width: 1200px) 23vw, (min-width: 810px) 46vw, (min-width: 600px) 46vw, 78vw"
                className="aspect-[4/5] rounded-md"
              />
              <span className="chip absolute left-3 top-3">{tourLength(t)}</span>
              <StatusBadge status={t.status} className="absolute bottom-3 left-3" />
            </div>
            <p className="eyebrow mt-4">{t.country}</p>
            <h3 className="mt-1.5 text-[clamp(1.375rem,1.2rem+0.4vw,1.5rem)] leading-tight group-hover:text-red">{t.title}</h3>
            <p className="mt-2 line-clamp-3 text-small text-muted">{t.summary}</p>
            <p className="mt-auto pt-3 text-small font-semibold text-navy">Fare on enquiry</p>
            <span className="link-arrow">Explore package</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
