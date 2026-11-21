import Link from 'next/link';
import { PhotoFrame, type PhotoAsset } from '@/components/ui/photo-frame';
import { cn } from '@/lib/cn';

// Article teasers for the blog list and "Keep reading": a lead story, a tile for the two-up and a hairline row.
// Usable from Server and Client Components (no hooks).

export type StoryCard = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  /** Category label, e.g. 'Umrah'. */
  category: string;
  /** Formatted sample date, e.g. '12 Nov 2026'. */
  date: string;
  dateTime: string;
  minutes: number;
  /** Resolved on the server (lib/image.ts photoAsset). */
  image: PhotoAsset;
};

/** The title link covers the whole teaser (::after), so the accessible name stays the title alone. */
function TitleLink({ card, id }: { card: StoryCard; id?: string }) {
  return (
    <Link href={card.href} id={id} className="after:absolute after:inset-0 hover:text-red">
      {card.title}
    </Link>
  );
}

export function StoryMeta({ card, className }: { card: StoryCard; className?: string }) {
  return (
    <p className={cn('flex flex-wrap gap-x-2 text-caption text-muted', className)}>
      <span>{card.minutes} min read</span>
      <span aria-hidden="true">·</span>
      <time dateTime={card.dateTime}>{card.date}</time>
    </p>
  );
}

export function StoryLead({ card, linkId }: { card: StoryCard; linkId?: string }) {
  return (
    <article className="photo-zoom site-grid relative items-center gap-y-6">
      <PhotoFrame
        asset={card.image}
        sizes="(min-width: 1200px) 52vw, 100vw"
        className="col-span-full aspect-[3/2] rounded-[18px] md:rounded-lg lg:col-span-7"
      />
      <div className="col-span-full md:col-span-6 lg:col-span-5 lg:pl-4">
        <p className="eyebrow">{card.category}</p>
        <h3 className="mt-3 text-h3">
          <TitleLink card={card} id={linkId} />
        </h3>
        <p className="mt-4 text-slate">{card.excerpt}</p>
        <StoryMeta card={card} className="mt-5" />
      </div>
    </article>
  );
}

export function StoryTile({ card, linkId }: { card: StoryCard; linkId?: string }) {
  return (
    <article className="photo-zoom relative">
      <PhotoFrame asset={card.image} sizes="(min-width: 810px) 46vw, 100vw" className="aspect-[3/2] rounded-[18px] md:rounded-lg" />
      <p className="eyebrow mt-6">{card.category}</p>
      <h3 className="mt-3 font-serif text-h4 md:text-h3">
        <TitleLink card={card} id={linkId} />
      </h3>
      <p className="mt-3 max-w-[34rem] text-small text-muted">{card.excerpt}</p>
      <StoryMeta card={card} className="mt-4" />
    </article>
  );
}

/** A hairline row: category key on the left (from 810 px), title and summary, a small photograph on the right. */
export function StoryRow({ card, linkId, compact }: { card: StoryCard; linkId?: string; compact?: boolean }) {
  return (
    <article
      className={cn(
        'photo-zoom relative grid grid-cols-[minmax(0,1fr)_5.5rem] items-start gap-x-4 border-t border-warm-border py-6 xs:grid-cols-[minmax(0,1fr)_7rem]',
        !compact && 'md:grid-cols-[7.5rem_minmax(0,1fr)_11rem] md:gap-x-8 md:py-8 lg:grid-cols-[10rem_minmax(0,1fr)_14rem]',
      )}
    >
      <p className={cn('eyebrow hidden pt-1', !compact && 'md:block')}>{card.category}</p>
      <div>
        <p className={cn('eyebrow', !compact && 'md:hidden')}>{card.category}</p>
        <h3 className="mt-2 font-serif text-h4">
          <TitleLink card={card} id={linkId} />
        </h3>
        <p className={cn('mt-2 hidden max-w-[36rem] text-small text-muted', !compact && 'md:block')}>{card.excerpt}</p>
        <StoryMeta card={card} className="mt-3" />
      </div>
      <PhotoFrame
        asset={card.image}
        sizes={compact ? '112px' : '(min-width: 1200px) 224px, (min-width: 810px) 176px, 112px'}
        className="aspect-[4/3] rounded-sm md:rounded-md"
      />
    </article>
  );
}
