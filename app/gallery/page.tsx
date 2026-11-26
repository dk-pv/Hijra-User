import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { pageMetadata } from '@/lib/seo';
import { galleryCategories, galleryCollections } from '@/data/gallery';
import { CollectionCard } from '@/components/content/collection-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon } from '@/components/ui/icons';
import { Note, SampleTag } from '@/components/ui/pending';

// Gallery: completed journeys in four separate categories (international tours, Indian tours, Umrah, Hajj), never
// mixed. Each collection opens its own page with the photo grid and lightbox (/gallery/<slug>).

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.gallery,
    title: 'Gallery: tours, Umrah and Hajj journeys',
    description:
      'Photographs from HIJRA Travels journeys, kept in four collections: international tours, tours within India, Umrah journeys and Hajj journeys.',
    image: 'madinah-piazza-umbrellas',
  });
}

const categories = galleryCategories
  .map((cat) => ({ ...cat, items: galleryCollections.filter((c) => c.category === cat.id) }))
  .filter((cat) => cat.items.length);

const ownPhotos = ['HIJRA’s Umrah and Hajj groups', 'Tours abroad and within India', 'Pre-departure sessions at the branches'];

export default function GalleryPage() {
  return (
    <>
      <section className="pt-nav">
        <div className="wrap pt-6 md:pt-10">
          <Breadcrumbs items={[{ label: 'Gallery' }]} />
          <div className="site-grid mt-8 items-end gap-y-5 md:mt-12">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow rise">Gallery</p>
              <h1 className="rise rise-2 mt-4 text-h1">Journeys, collection by collection.</h1>
            </div>
            <p className="rise rise-3 col-span-full max-w-[36rem] text-lead md:col-span-6 lg:col-span-5 lg:col-start-8 lg:pb-1">
              Photographs from completed tours and pilgrimages, each journey in its own collection.
            </p>
          </div>
          <nav aria-label="Gallery categories" className="rise rise-4 mt-8 flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="btn btn-outline btn-sm">
                {cat.label}
                <span className="font-normal text-muted">{cat.items.length}</span>
              </a>
            ))}
          </nav>
          <Note className="mt-8 max-w-[46rem]">
            <SampleTag className="mb-2">Sample collections</SampleTag>
            <br />
            These collections show the layout with licensed photographs of the places, each credited to its photographer. They are not photographs of HIJRA’s
            travellers, and no journey or date is claimed.
          </Note>
        </div>
      </section>

      <div className="pb-section">
        {categories.map((cat, i) => (
          <section key={cat.id} id={cat.id} aria-labelledby={`${cat.id}-h`} className="scroll-mt-24 pt-14 md:pt-20">
            <div className="wrap">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-warm-border pt-5 md:pt-7">
                <h2 id={`${cat.id}-h`} className="flex items-baseline gap-3 text-h3">
                  <span className="font-sans text-small font-semibold tabular-nums text-red">{String(i + 1).padStart(2, '0')}</span>
                  {cat.label}
                </h2>
                <p className="text-small text-muted">
                  {cat.note} {cat.items.length} {cat.items.length === 1 ? 'collection' : 'collections'}.
                </p>
              </div>
              <ul role="list" className="mt-8 grid gap-x-(--g) gap-y-10 min-[600px]:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((c) => (
                  <li key={c.slug}>
                    <CollectionCard c={c} sizes="(min-width: 1200px) 30vw, (min-width: 600px) 46vw, 94vw" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="own-h" className="bg-warm-grey py-section">
        <div className="wrap site-grid items-center gap-y-10">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">HIJRA’s own photographs</p>
            <h2 id="own-h" className="mt-3 text-h2">
              Real journeys, shared with consent.
            </h2>
            <p className="mt-4 max-w-[34rem] text-lead">
              At launch, each collection is one of HIJRA’s completed journeys, with its travel date, published only with the consent of everyone pictured.
            </p>
          </div>
          <div className="on-dark col-span-full rounded-lg bg-deep p-7 md:p-10 lg:col-span-6 lg:col-start-7">
            <span className="grid size-12 place-items-center rounded-full border border-white/25 text-sand">
              <Icon name="camera" />
            </span>
            <p className="mt-6 font-serif text-h3 text-warm-white">What this gallery will show</p>
            <ul className="mt-5 divide-y divide-white/15 border-y border-white/15">
              {ownPhotos.map((p) => (
                <li key={p} className="py-3.5 text-small text-mist">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-caption text-mist">Added by HIJRA, with the written consent of everyone pictured.</p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Plan your journey"
        title="Seen somewhere you would like to go?"
        body="Tell us where and when. An advisor replies with dates, fares and the next steps; nothing is booked or paid online."
      />
    </>
  );
}
