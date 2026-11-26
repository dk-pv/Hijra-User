import Link from 'next/link';
import type { IdealFor, Tour } from '@/data/tours';
import { PhotoFrame, type PhotoAsset } from '@/components/ui/photo-frame';
import { StatusBadge } from '@/components/ui/status-badge';
import { cn } from '@/lib/cn';

// The one tour tile (report 15.9): photo with a duration chip, place eyebrow, title, "Fare on enquiry" and Enquire.
// Three layouts give the listings their editorial rhythm: 'feature' and 'card' for grids, 'row' for the ledger.
// Cards come from toCard() in tour-card.ts (server), which resolves the photo.

export type TourCard = Pick<
  Tour,
  'slug' | 'title' | 'region' | 'state' | 'country' | 'days' | 'nights' | 'summary' | 'bestTime' | 'idealFor' | 'featured' | 'status'
> & { image: PhotoAsset };

export const idealForLabel: Record<IdealFor, string> = {
  families: 'Families',
  groups: 'Groups',
  couples: 'Couples',
  seniors: 'Older travellers',
};

export const tourPlace = (t: Pick<Tour, 'region' | 'state' | 'country'>) => (t.region === 'domestic' ? (t.state ?? t.country) : t.country);
export const tourLength = (t: Pick<Tour, 'days' | 'nights'>) => `${t.days} days · ${t.nights} nights`;

// The title link stretches over the whole tile; Enquire sits above it as its own link (z-[2]).
export const stretched =
  "outline-none after:absolute after:inset-0 after:z-[1] after:rounded-md after:content-[''] hover:text-red-dark focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-navy";

function Enquire({ tour, enquireHref, className }: { tour: TourCard; enquireHref: string; className?: string }) {
  return (
    <Link href={enquireHref} className={cn('link-arrow relative z-[2]', className)}>
      Enquire<span className="sr-only"> about {tour.title}</span>
    </Link>
  );
}

function FareLine({ tour, enquireHref, className }: { tour: TourCard; enquireHref: string; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-x-6 border-t border-warm-border pt-2', className)}>
      <p className="text-ui font-semibold text-navy">Fare on enquiry</p>
      <Enquire tour={tour} enquireHref={enquireHref} />
    </div>
  );
}

export function TourTile({
  tour,
  href,
  enquireHref,
  layout = 'card',
  sizes,
  photoClassName,
  heading: H = 'h3',
  className,
}: {
  tour: TourCard;
  /** The tour page, localised. */
  href: string;
  /** Book A Trip with this tour preselected, localised. */
  enquireHref: string;
  layout?: 'feature' | 'card' | 'row';
  /** Rendered photo width (feature and card layouts; rows size themselves). */
  sizes?: string;
  /** Frame for the photo (aspect ratio or height) in the feature and card layouts. */
  photoClassName?: string;
  /** Heading level of the title: h4 when the tile sits under a chapter heading. */
  heading?: 'h3' | 'h4';
  className?: string;
}) {
  if (layout === 'row') {
    return (
      <article
        className={cn(
          'photo-zoom relative grid grid-cols-[minmax(0,6.75rem)_minmax(0,1fr)] gap-x-4 border-t border-warm-border py-5 xs:grid-cols-[minmax(0,8rem)_minmax(0,1fr)] min-[600px]:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] min-[600px]:gap-x-6 md:grid-cols-8 md:gap-x-(--g) md:gap-y-5 md:py-8 lg:grid-cols-12',
          className,
        )}
      >
        <div className="relative md:col-span-3 md:row-span-2 lg:col-span-4 lg:row-span-1">
          <PhotoFrame
            asset={tour.image}
            sizes="(min-width: 1200px) 30vw, (min-width: 810px) 33vw, (min-width: 600px) 12rem, 8rem"
            alt=""
            className="aspect-[4/5] rounded-[10px] md:aspect-[4/3] md:rounded-md lg:aspect-[3/2]"
          />
          <span className="chip absolute left-3 top-3 hidden md:inline-flex">{tourLength(tour)}</span>
        </div>
        <div className="min-w-0 md:col-span-5 lg:col-span-5 lg:pr-4">
          <p className="eyebrow">{tourPlace(tour)}</p>
          <H className="mt-1.5 font-serif text-[clamp(1.25rem,1.05rem+0.7vw,1.75rem)] font-semibold leading-[1.15] text-navy">
            <Link href={href} className={stretched}>
              {tour.title}
            </Link>
          </H>
          <p className="mt-3 hidden max-w-[34rem] min-[600px]:block">{tour.summary}</p>
          {/* Phones: length, fare and Enquire sit beside the photograph */}
          <p className="mt-2 text-small text-slate md:hidden">
            <span className="font-semibold text-navy">{tourLength(tour)}</span>
            <span className="block">Fare on enquiry</span>
          </p>
          <Enquire tour={tour} enquireHref={enquireHref} className="md:hidden" />
        </div>
        <div className="hidden md:col-span-5 md:col-start-4 md:block lg:col-span-3 lg:col-start-10 lg:flex lg:flex-col lg:justify-between">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-small lg:grid-cols-1">
            <div>
              <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">Best time</dt>
              <dd className="mt-0.5 text-slate">{tour.bestTime}</dd>
            </div>
            <div>
              <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">Ideal for</dt>
              <dd className="mt-0.5 text-slate">{tour.idealFor.map((k) => idealForLabel[k]).join(', ')}</dd>
            </div>
          </dl>
          <FareLine tour={tour} enquireHref={enquireHref} className="mt-5" />
        </div>
      </article>
    );
  }

  const feature = layout === 'feature';
  return (
    <article className={cn('photo-zoom relative flex flex-col', className)}>
      <div className={cn('relative', feature && 'lg:min-h-0 lg:flex-1')}>
        <PhotoFrame
          asset={tour.image}
          sizes={sizes ?? '(min-width: 1200px) 30vw, (min-width: 810px) 45vw, 94vw'}
          alt=""
          className={cn('rounded-md', photoClassName ?? 'aspect-[3/2]')}
        />
        <span className="chip absolute left-3.5 top-3.5">{tourLength(tour)}</span>
        <StatusBadge status={tour.status} className="absolute bottom-3.5 left-3.5" />
      </div>
      <p className={cn('eyebrow', feature ? 'mt-5' : 'mt-4')}>{tourPlace(tour)}</p>
      <H className={cn('mt-1.5', feature ? 'text-h3' : 'text-[clamp(1.375rem,1.2rem+0.4vw,1.5rem)] leading-[1.2]')}>
        <Link href={href} className={stretched}>
          {tour.title}
        </Link>
      </H>
      <p className={cn('text-muted', feature ? 'mt-3 max-w-[36rem]' : 'mt-2 line-clamp-3 text-small')}>{tour.summary}</p>
      <FareLine tour={tour} enquireHref={enquireHref} className="mt-4" />
    </article>
  );
}
