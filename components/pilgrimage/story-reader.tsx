'use client';

import { useEffect, useState, type ReactNode } from 'react';
import type { Story } from '@/data/stories';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icons';
import { PhotoFrame, type PhotoAsset } from '@/components/ui/photo-frame';
import { storyDialogId } from './story-id';

// Pilgrim Stories: each story is read in a native modal <dialog> (rendered on the server by StoryDialog, so the
// text is in the page), opened by these buttons. /pilgrim-stories#<slug> opens that story directly, and the
// address keeps the story's anchor while it is open, so it can be shared.

function openStory(slug: string) {
  const d = document.getElementById(storyDialogId(slug));
  if (!(d instanceof HTMLDialogElement) || d.open) return;
  d.showModal();
  if (location.hash !== `#${slug}`) history.replaceState(null, '', `#${slug}`);
}

export function OpenStory({ slug, className, children, label }: { slug: string; className?: string; children: ReactNode; label?: string }) {
  return (
    <button type="button" aria-haspopup="dialog" aria-label={label} className={className} onClick={() => openStory(slug)}>
      {children}
    </button>
  );
}

/** Opens the story named in the address, and clears the anchor when a story is closed. */
export function StoryHash({ slugs }: { slugs: string[] }) {
  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(location.hash.slice(1));
      if (slugs.includes(slug)) openStory(slug);
    };
    const onClose = () => {
      if (slugs.includes(decodeURIComponent(location.hash.slice(1)))) history.replaceState(null, '', location.pathname + location.search);
    };
    const dialogs = slugs.map((s) => document.getElementById(storyDialogId(s))).filter((d): d is HTMLDialogElement => d instanceof HTMLDialogElement);
    dialogs.forEach((d) => d.addEventListener('close', onClose));
    window.addEventListener('hashchange', fromHash);
    fromHash();
    return () => {
      dialogs.forEach((d) => d.removeEventListener('close', onClose));
      window.removeEventListener('hashchange', fromHash);
    };
  }, [slugs]);
  return null;
}

type Filter = 'all' | 'umrah' | 'hajj';
const labels: Record<Filter, string> = { all: 'All stories', umrah: 'Umrah', hajj: 'Hajj' };

/** What a story card shows (the story itself is rendered on the server in its dialog); the photo is resolved there too. */
export type StoryTeaser = Pick<Story, 'slug' | 'title' | 'journey' | 'who' | 'season' | 'excerpt' | 'hasVideo'> & { image: PhotoAsset };

/** The story listing with its Umrah / Hajj filter. Cards are whole-card buttons that open the story. */
export function StoryBrowser({ stories }: { stories: StoryTeaser[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const shown = filter === 'all' ? stories : stories.filter((s) => s.journey === filter);
  const count = (f: Filter) => (f === 'all' ? stories.length : stories.filter((s) => s.journey === f).length);

  return (
    <div>
      <div role="group" aria-label="Show stories" className="flex flex-wrap gap-2">
        {(Object.keys(labels) as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-semibold transition-colors',
              filter === f ? 'border-navy bg-navy text-white' : 'border-field bg-white text-navy hover:border-navy',
            )}
          >
            {labels[f]}
            <span className={cn('text-caption', filter === f ? 'text-mist' : 'text-muted')}>{count(f)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} stories shown
      </p>

      <ul className="mt-10 grid gap-x-(--g) gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
        {shown.map((s, i) => {
          // A card left alone on the last row spans it, photo beside text, so the grid never ends on an orphan.
          const last = i === shown.length - 1;
          const wideMd = last && shown.length % 2 === 1;
          const wideLg = last && shown.length % 3 === 1;
          return (
            <li
              key={s.slug}
              id={s.slug}
              className={cn(
                'photo-zoom group relative',
                i % 3 === 1 && 'lg:mt-20',
                wideMd && 'md:col-span-2',
                wideLg ? 'lg:col-span-3' : wideMd && 'lg:col-span-1',
              )}
            >
              <div
                className={cn(
                  'grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-x-4 xs:grid-cols-[8rem_minmax(0,1fr)]',
                  wideMd ? 'md:grid-cols-2 md:items-center md:gap-x-(--g)' : 'md:block',
                  wideLg ? 'lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-x-12' : wideMd && 'lg:block',
                )}
              >
                <PhotoFrame
                  asset={s.image}
                  alt=""
                  sizes={wideMd || wideLg ? '(min-width: 1200px) 46rem, (min-width: 810px) 45vw, 8rem' : '(min-width: 1200px) 26rem, (min-width: 810px) 45vw, 8rem'}
                  className={cn(
                    'rounded-md aspect-[4/5]',
                    wideMd ? 'md:aspect-[16/10]' : i % 3 === 1 && 'md:aspect-square',
                    wideLg ? 'lg:aspect-[16/10]' : wideMd && (i % 3 === 1 ? 'lg:aspect-square' : 'lg:aspect-[4/5]'),
                  )}
                />
                <div className={cn(wideMd ? 'md:mt-0' : 'md:mt-5', wideLg ? 'lg:mt-0' : wideMd && 'lg:mt-5')}>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-semibold uppercase tracking-[0.12em] text-muted">
                  <span className="text-red">{s.journey === 'hajj' ? 'Hajj' : 'Umrah'}</span>
                  <span className="hidden sm:inline">{s.season}</span>
                  {s.hasVideo ? (
                    <span className="flex items-center gap-1.5 normal-case tracking-normal">
                      <Icon name="video" size={16} />
                      Video
                    </span>
                  ) : null}
                </p>
                <h3 className="mt-2 text-h4 group-hover:text-red">
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => openStory(s.slug)}
                    className="cursor-pointer text-left after:absolute after:inset-0 after:content-['']"
                  >
                    {s.title}
                  </button>
                </h3>
                <p className="mt-1.5 text-small text-muted">{s.who}</p>
                <p className="mt-3 hidden text-small md:block">{s.excerpt}</p>
                <span aria-hidden="true" className="link-arrow min-h-11 text-small">
                  Read the story
                </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
