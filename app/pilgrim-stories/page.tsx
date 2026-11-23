import Link from 'next/link';
import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { featuredStory, stories } from '@/data/stories';
import { pageMetadata } from '@/lib/seo';
import { photoAsset } from '@/lib/image';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon } from '@/components/ui/icons';
import { SampleTag } from '@/components/ui/pending';
import { ClientPhoto, Photo } from '@/components/ui/photo';
import { StoryDialog } from '@/components/pilgrimage/story-dialog';
import { OpenStory, StoryBrowser, StoryHash } from '@/components/pilgrimage/story-reader';

// Pilgrim Stories (report 8.9, P19): the featured story, the stories on video, every story behind an Umrah / Hajj
// filter, how stories are published, the journeys themselves and an enquiry. Stories open in native modal
// dialogs (story-dialog.tsx); /pilgrim-stories#<slug> opens one directly. All stories here are samples.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.pilgrimStories,
    title: 'Pilgrim stories: Umrah and Hajj in their words',
    description:
      'Stories of Umrah and Hajj from families in Kerala: what the journey asked of them, and what helped. At launch, only stories shared with written consent.',
    image: featuredStory.image,
  });
}

const onVideo = stories.filter((s) => s.hasVideo);
// Poster photographs for the video slots: matched to the journey, and never one a story card already shows here.
const unused = <T extends string>(keys: readonly T[]) => keys.filter((k) => !stories.some((s) => s.image === k));
const posterPools = {
  umrah: unused(['makkah-tawaf-night', 'madinah-nabawi-golden-hour', 'madinah-green-dome', 'makkah-kaaba-tawaf'] as const),
  hajj: unused(['hajj-arafat-jabal-rahmah', 'hajj-pilgrims-jamarat'] as const),
};
const posters = onVideo.map((s) => {
  const pool = posterPools[s.journey];
  const n = onVideo.filter((o, i) => o.journey === s.journey && i < onVideo.indexOf(s)).length;
  return pool[n % pool.length];
});

export default function PilgrimStoriesPage() {
  const f = featuredStory;
  return (
    <>
      {/* Page head */}
      <section className="pt-nav">
        <div className="wrap pt-6 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Hajj & Umrah', href: routes.hajjUmrah }, { label: 'Pilgrim Stories' }]} className="rise" />
          <div className="site-grid mt-8 items-end gap-y-6 md:mt-10">
            <div className="col-span-full lg:col-span-7">
              <div className="rise flex flex-wrap items-center gap-3">
                <p className="eyebrow">Pilgrim stories</p>
                <SampleTag>Sample stories</SampleTag>
              </div>
              <h1 className="rise rise-2 mt-4 text-display">In their own words.</h1>
            </div>
            <p className="rise rise-3 col-span-full max-w-[34rem] text-lead lg:col-span-5 lg:pb-3">
              Families from Kerala on what Umrah and Hajj asked of them, and what helped. At launch, only stories pilgrims have agreed to share appear here.
            </p>
          </div>
        </div>
      </section>

      {/* Featured story */}
      <section className="pb-section pt-10 md:pt-14" aria-labelledby="featured-h">
        <div className="wrap site-grid items-center gap-y-8">
          <figure className="relative col-span-full lg:col-span-7">
            <Photo image={f.image} priority sizes="(min-width: 1200px) 46rem, 100vw" className="aspect-[4/3] rounded-[18px] md:rounded-lg" />
            <figcaption className="mt-3 text-caption text-muted lg:absolute lg:-bottom-6 lg:right-6 lg:mt-0 lg:rounded-md lg:bg-white lg:px-4 lg:py-3">
              The photograph shows the place, not the pilgrims.
            </figcaption>
          </figure>
          <div className="col-span-full lg:col-span-5 lg:pl-6">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-semibold uppercase tracking-[0.12em] text-muted">
              <span className="text-red">Featured · {f.journey === 'hajj' ? 'Hajj' : 'Umrah'}</span>
              <span>{f.season}</span>
            </p>
            <h2 id="featured-h" className="mt-3 text-h2">
              {f.title}
            </h2>
            <p className="mt-2 text-small text-muted">{f.who}</p>
            <blockquote className="mt-7 font-serif text-[clamp(1.3125rem,1.1rem+0.6vw,1.75rem)] font-semibold leading-[1.3] text-navy">
              <span className="text-red" aria-hidden="true">
                “
              </span>
              {f.quote}
              <span className="text-red" aria-hidden="true">
                ”
              </span>
            </blockquote>
            <p className="mt-5">{f.excerpt}</p>
            <OpenStory slug={f.slug} label={`Read the story: ${f.title}`} className="btn btn-secondary mt-8">
              Read the story
            </OpenStory>
          </div>
        </div>
      </section>

      {/* On video */}
      <section className="bg-warm-grey py-section" aria-labelledby="video-h">
        <div className="wrap site-grid items-start gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">On video</p>
            <h2 id="video-h" className="mt-3 text-h2">
              Three stories, told on camera.
            </h2>
            <p className="mt-4 max-w-[30rem] text-muted">
              Short videos recorded by the pilgrims themselves, with their consent. They appear here once HIJRA supplies them.
            </p>
          </div>
          <ul className="col-span-full -mx-[var(--m)] flex snap-x snap-mandatory scroll-px-[var(--m)] gap-3 overflow-x-auto px-[var(--m)] pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-gutter md:overflow-visible md:px-0 lg:col-span-7 lg:col-start-6">
            {onVideo.map((s, i) => (
              <li key={s.slug} className="w-[62vw] max-w-[16rem] shrink-0 snap-start md:w-auto md:max-w-none">
                <ClientPhoto subject={s.title} title="Video with consent" icon="video" image={posters[i]} sizes="(min-width: 810px) 22vw, 62vw" className="aspect-[9/16] rounded-md" />
                <p className="mt-3 text-caption font-semibold uppercase tracking-[0.12em] text-red">{s.journey === 'hajj' ? 'Hajj' : 'Umrah'}</p>
                <OpenStory slug={s.slug} label={`Read “${s.title}”`} className="link-arrow mt-0.5 min-h-11 text-left text-small">
                  {s.title}
                </OpenStory>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Every story */}
      <section className="py-section" aria-labelledby="stories-h">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
            <div>
              <p className="eyebrow">More stories</p>
              <h2 id="stories-h" className="mt-3 text-h2">
                Umrah and Hajj, family by family.
              </h2>
            </div>
            <p className="max-w-[26rem] text-small text-muted">Every story is a sample written for this preview. No pilgrim is named or described.</p>
          </div>
          <div className="mt-10">
            <StoryBrowser
              stories={stories
                .filter((s) => s !== featuredStory)
                .map(({ slug, title, journey, who, season, excerpt, hasVideo, image }) => ({ slug, title, journey, who, season, excerpt, hasVideo, image: photoAsset(image) }))}
            />
          </div>
        </div>
      </section>

      {/* How stories are published */}
      <section className="pb-section" aria-labelledby="consent-h">
        <div className="wrap">
          <div className="site-grid gap-y-8 rounded-lg border border-warm-border bg-white px-5 py-10 sm:px-8 md:px-12 md:py-14">
            <div className="col-span-full lg:col-span-4">
              <p className="eyebrow">With consent</p>
              <h2 id="consent-h" className="mt-3 text-h3">
                How stories are published.
              </h2>
            </div>
            <ul className="col-span-full grid gap-6 md:grid-cols-3 lg:col-span-8">
              {[
                { icon: 'shield' as const, title: 'Written consent first', text: 'A story is published only when the pilgrim has agreed in writing, and it comes down whenever they ask.' },
                { icon: 'users' as const, title: 'Their words, their choice', text: 'Names, towns and years appear only if the pilgrim wants them to. Otherwise the story stays anonymous.' },
                { icon: 'camera' as const, title: 'Eight stories at launch', text: 'The page opens with at least eight stories, three of them on video, all from HIJRA’s own pilgrims.' },
              ].map((p) => (
                <li key={p.title}>
                  <Icon name={p.icon} size={24} className="text-red" />
                  <h3 className="mt-3 font-sans text-ui font-semibold text-navy">{p.title}</h3>
                  <p className="mt-1.5 text-small text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The journeys */}
      <section aria-label="Umrah and Hajj with HIJRA" className="pb-section">
        <div className="wrap grid gap-gutter md:grid-cols-2">
          {[
            { href: routes.umrah, title: 'Umrah with HIJRA', text: 'Packages, the rites in order and how we prepare families.' },
            { href: routes.hajj, title: 'Hajj with HIJRA', text: 'The days of Hajj, registration routes and preparation.' },
          ].map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center gap-5 rounded-md border border-warm-border bg-white px-6 py-6 transition-colors hover:border-navy md:px-7"
            >
              <span className="flex-1">
                <span className="block font-serif text-h4 font-semibold text-navy">{s.title}</span>
                <span className="mt-1 block text-small text-muted">{s.text}</span>
              </span>
              <Icon name="arrowRight" className="shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        eyebrow="Your journey"
        title="Begin your own story."
        body="Tell us who is travelling and when. An advisor replies with dates and options, and nothing is booked until you agree."
      />

      {stories.map((s) => (
        <StoryDialog key={s.slug} story={s} />
      ))}
      <StoryHash slugs={stories.map((s) => s.slug)} />
    </>
  );
}
