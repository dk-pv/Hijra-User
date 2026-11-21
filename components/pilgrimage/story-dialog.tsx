import Link from 'next/link';
import { enquiryPath, routes } from '@/data/navigation';
import type { Story } from '@/data/stories';
import { storyDialogId } from './story-id';
import { Icon } from '@/components/ui/icons';
import { SampleTag } from '@/components/ui/pending';
import { ClientPhoto, Photo } from '@/components/ui/photo';

/**
 * One story, read in a native modal dialog: opened by OpenStory / StoryBrowser, closed by its own button (a
 * method="dialog" form, so closing needs no script), Escape or the browser's back gesture handled natively.
 */
export function StoryDialog({ story }: { story: Story }) {
  const journey = story.journey === 'hajj' ? 'Hajj' : 'Umrah';
  return (
    <dialog
      id={storyDialogId(story.slug)}
      aria-labelledby={`${story.slug}-title`}
      className="m-auto max-h-[calc(100svh-1.5rem)] w-[min(62rem,calc(100vw-1.5rem))] max-w-none overflow-y-auto overscroll-contain rounded-lg bg-warm-white p-0 text-slate shadow-raise backdrop:bg-deep/75 md:max-h-[calc(100svh-4rem)]"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-warm-border bg-warm-white px-5 py-2.5 md:px-8">
        <SampleTag>Sample story</SampleTag>
        <form method="dialog">
          <button type="submit" className="btn btn-outline btn-sm" aria-label={`Close “${story.title}”`}>
            <Icon name="close" />
            Close
          </button>
        </form>
      </div>
      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <Photo image={story.image} alt="" sizes="(min-width: 810px) 26rem, 100vw" className="aspect-[16/10] md:sticky md:top-16 md:aspect-[4/5]" />
        </div>
        <article className="px-5 pb-9 pt-7 md:px-10 md:pb-12 md:pt-10">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-semibold uppercase tracking-[0.12em] text-muted">
            <span className="text-red">{journey}</span>
            <span aria-hidden="true">·</span>
            <span>{story.season}</span>
          </p>
          <h2 id={`${story.slug}-title`} className="mt-3 text-h2">
            {story.title}
          </h2>
          <p className="mt-2 text-small text-muted">{story.who}</p>
          <blockquote className="mt-7 border-l-[3px] border-red pl-5 font-serif text-[clamp(1.25rem,1.1rem+0.5vw,1.5rem)] font-semibold leading-[1.4] text-navy">
            {story.quote}
          </blockquote>
          <div className="prose-hijra mt-7">
            {story.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          {story.hasVideo ? (
            <figure className="mt-9">
              <ClientPhoto
                subject={`${story.title}: the pilgrim’s own video`}
                title="Video with consent"
                icon="video"
                image={story.journey === 'hajj' ? 'hajj-jamarat-bridge-aerial' : 'makkah-masa-safa-marwa'}
                sizes="(min-width: 810px) 40rem, 100vw"
                className="aspect-video rounded-md"
              />
              <figcaption className="mt-2.5 text-caption text-muted">A short video, supplied by HIJRA with the pilgrim’s written consent.</figcaption>
            </figure>
          ) : null}
          <div className="mt-9 flex flex-col gap-3 border-t border-warm-border pt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            <Link href={story.journey === 'hajj' ? routes.hajj : routes.umrah} className="link-arrow">
              The {journey} journey with HIJRA
            </Link>
            <Link href={enquiryPath(story.journey)} className="link-arrow">
              {story.journey === 'hajj' ? 'Register your interest' : 'Plan my Umrah'}
            </Link>
          </div>
        </article>
      </div>
    </dialog>
  );
}
