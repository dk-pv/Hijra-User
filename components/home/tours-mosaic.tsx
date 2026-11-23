import Link from 'next/link';
import { tours, type Tour } from '@/data/tours';
import { tourPath } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { Photo } from '@/components/ui/photo';

/** Homepage section 09: three featured tours as a mosaic (one large, two stacked); a swipe strip on phones. */
export function ToursMosaic() {
  const featured = tours.filter((t) => t.featured);
  const picks = (featured.length >= 3 ? featured : [...featured, ...tours.filter((t) => !t.featured)]).slice(0, 3);
  return (
    <ul
      className="-mx-[var(--m)] flex snap-x snap-mandatory scroll-px-[var(--m)] gap-3 overflow-x-auto px-[var(--m)] pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-12 md:gap-gutter md:overflow-visible md:px-0 md:pb-0"
      aria-label="Featured tours (sample itineraries)"
    >
      {picks.map((t, i) => (
        <li
          key={t.slug}
          className={cn('w-[82%] shrink-0 snap-start md:w-auto', i === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5')}
        >
          <TourTile tour={t} large={i === 0} />
        </li>
      ))}
    </ul>
  );
}

function TourTile({ tour, large }: { tour: Tour; large: boolean }) {
  return (
    <Link href={tourPath(tour.slug)} className="group block">
      <div className="relative">
        <Photo
          image={tour.image}
          sizes={large ? '(min-width: 1200px) 46vw, (min-width: 810px) 56vw, 82vw' : '(min-width: 1200px) 33vw, (min-width: 810px) 40vw, 82vw'}
          className={cn('rounded-md', large ? 'aspect-[4/3] md:aspect-square' : 'aspect-[4/3] md:aspect-[3/2]')}
        />
        <span className="chip absolute right-3.5 top-3.5">
          {tour.days} days
        </span>
      </div>
      <p className="eyebrow mt-4">
        {tour.region === 'domestic' ? 'Within India' : 'International'} · {tour.destination}
      </p>
      <h3 className={cn('mt-1.5 group-hover:text-red', large ? 'text-h3' : 'text-[clamp(1.375rem,1.2rem+0.4vw,1.5rem)] leading-tight')}>{tour.title}</h3>
      <p className="mt-1.5 font-semibold text-navy">
        Fare on enquiry <span className="font-normal text-muted">· sample itinerary</span>
      </p>
      <span className="link-arrow mt-1">Explore</span>
    </Link>
  );
}
