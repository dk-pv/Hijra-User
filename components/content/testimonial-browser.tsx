'use client';

import { useState } from 'react';
import type { TestimonialCategory } from '@/data/testimonials';
import { FilterChips } from './filter-chips';
import { AboutLink, Attribution, Quote } from './testimonial-parts';
import type { VideoItem, WrittenItem } from './testimonial-items';
import { VideoPlayer } from './video-player';

// /testimonials: one filter for videos and written reviews. A featured video, then the other videos, then the
// written reviews (the first set large, the rest in two balanced columns). A category chip appears only when that
// category has something to show. Nothing is paged: the list is short by nature.

export function TestimonialBrowser({ videos, written, labels }: { videos: VideoItem[]; written: WrittenItem[]; labels: Record<TestimonialCategory, string> }) {
  const [category, setCategory] = useState<TestimonialCategory | 'all'>('all');
  const fits = (t: { category: TestimonialCategory }) => category === 'all' || t.category === category;
  const v = videos.filter(fits);
  const w = written.filter(fits);
  const [featured, ...moreVideos] = v;
  const [lead, ...rest] = w;

  const count = (c: TestimonialCategory) => videos.filter((t) => t.category === c).length + written.filter((t) => t.category === c).length;
  const options = [
    { value: 'all' as const, label: 'All experiences', count: videos.length + written.length },
    ...(Object.keys(labels) as TestimonialCategory[]).map((c) => ({ value: c, label: labels[c], count: count(c) })).filter((o) => o.count),
  ];
  const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
  const status = `${category === 'all' ? '' : `${labels[category]}: `}${plural(v.length, 'video', 'videos')} and ${plural(w.length, 'written review', 'written reviews')}`;

  return (
    <>
      <div className="wrap mt-10 flex flex-col gap-3 md:mt-14 md:items-center">
        <FilterChips name="testimonial-category" legend="Show experiences from" options={options} value={category} onChange={setCategory} />
        <p role="status" className="text-small font-semibold text-navy">
          {status}
        </p>
      </div>

      {featured ? (
        <section aria-labelledby="videos-h" className="pb-section pt-12 md:pt-16">
          <div className="wrap">
            <div className="site-grid items-end gap-y-4">
              <div className="col-span-full lg:col-span-6">
                <p className="eyebrow">On video</p>
                <h2 id="videos-h" className="mt-3 text-h2">
                  In their own voices.
                </h2>
              </div>
              <p className="col-span-full max-w-[34rem] text-muted lg:col-span-5 lg:col-start-8">
                Short videos recorded with travellers’ consent, with captions where they speak. Nothing plays until you press play.
              </p>
            </div>

            <figure className="site-grid mt-10 items-end gap-y-6 md:mt-12">
              <VideoPlayer
                key={featured.id}
                title={featured.title}
                thumb={featured.thumb}
                source={featured.source}
                sample={featured.sample}
                sizes="(min-width: 1200px) 62vw, 94vw"
                className="col-span-full rounded-lg lg:col-span-8"
              />
              <figcaption className="col-span-full lg:col-span-4">
                <h3 className="text-h3">{featured.title}</h3>
                <p className="mt-3 max-w-[34rem]">{featured.description}</p>
                <Attribution t={featured} className="mt-5" />
                <AboutLink t={featured} className="mt-2" />
              </figcaption>
            </figure>

            {moreVideos.length ? (
              <ul role="list" className="mt-14 grid gap-x-(--g) gap-y-10 border-t border-warm-border pt-10 min-[600px]:grid-cols-2 md:mt-16 lg:grid-cols-3">
                {moreVideos.map((t) => (
                  <li key={t.id}>
                    <VideoPlayer title={t.title} thumb={t.thumb} source={t.source} sample={t.sample} sizes="(min-width: 1200px) 30vw, (min-width: 600px) 46vw, 94vw" />
                    <h3 className="mt-4 text-h4">{t.title}</h3>
                    <p className="mt-1.5 text-small text-muted">{t.description}</p>
                    <Attribution t={t} className="mt-3" />
                    <AboutLink t={t} className="mt-1" />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {lead ? (
        <section aria-labelledby="written-h" className="bg-warm-grey py-section">
          <div className="wrap">
            <p className="eyebrow md:text-center">In their words</p>
            <h2 id="written-h" className="mt-3 text-h2 md:text-center">
              Written reviews.
            </h2>
            <figure className="mx-auto mt-10 max-w-[56rem] border-t border-warm-border pt-10 md:mt-12 md:pt-12 md:text-center">
              <Quote text={lead.review} className="text-[clamp(1.5rem,1.15rem+1.2vw,2.375rem)] leading-[1.2]" />
              <figcaption>
                <Attribution t={lead} className="mt-5 md:justify-center" />
                <AboutLink t={lead} className="mt-1" />
              </figcaption>
            </figure>
            {rest.length ? (
              <div className="mt-14 gap-x-(--g) md:mt-16 md:columns-2 lg:gap-x-16">
                {rest.map((t) => (
                  <figure key={t.id} className="break-inside-avoid border-t border-warm-border pb-10 pt-7">
                    <Quote text={t.review} className="text-h4 leading-[1.4]" />
                    <figcaption>
                      <Attribution t={t} className="mt-4" />
                      <AboutLink t={t} className="mt-1" />
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
