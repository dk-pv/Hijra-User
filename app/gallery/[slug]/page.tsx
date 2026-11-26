import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { galleryCategories, galleryCollections, getCollection } from '@/data/gallery';
import { images } from '@/data/images';
import { galleryPath, routes, tourPath } from '@/data/navigation';
import { photoAsset } from '@/lib/image';
import { pageMetadata } from '@/lib/seo';
import { CollectionCard } from '@/components/content/collection-card';
import { PhotoGallery } from '@/components/content/photo-gallery';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CtaBand } from '@/components/ui/cta-band';
import { Note, SampleTag } from '@/components/ui/pending';

// One gallery collection: its photographs in justified rows with the lightbox, the tour it belongs to, and more
// collections from the same category. Unknown slugs never reach this page: proxy.ts answers them with a real 404.

type Props = { params: Promise<{ slug: string }> };

const categoryOf = (id: string) => galleryCategories.find((c) => c.id === id)!;

export function generateStaticParams() {
  return galleryCollections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCollection((await params).slug);
  if (!c) notFound();
  return pageMetadata({
    path: galleryPath(c.slug),
    title: `${c.title}: gallery`,
    description: `Photographs from ${c.title}, ${c.country}, in the ${categoryOf(c.category).label.toLowerCase()} collection of the HIJRA Travels gallery.`,
    image: c.photos[0],
    noindex: c.sample,
  });
}

export default function CollectionPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-svh pt-nav" aria-busy="true" />}>
      <Collection params={params} />
    </Suspense>
  );
}

async function Collection({ params }: Props) {
  const c = getCollection((await params).slug);
  if (!c) notFound();
  const cat = categoryOf(c.category);
  const more = galleryCollections.filter((x) => x.category === c.category && x.slug !== c.slug).slice(0, 3);
  const n = c.photos.length;

  return (
    <>
      <section className="pt-nav">
        <div className="wrap pt-6 md:pt-10">
          <Breadcrumbs items={[{ label: 'Gallery', href: routes.gallery }, { label: cat.label, href: `${routes.gallery}#${cat.id}` }, { label: c.title }]} />
          <div className="site-grid mt-8 items-end gap-y-5 md:mt-12">
            <div className="col-span-full lg:col-span-8">
              <p className="eyebrow rise">{cat.label}</p>
              <h1 className="rise rise-2 mt-4 text-h1">{c.title}</h1>
              <p className="rise rise-3 mt-4 text-lead">
                {c.country}
                {c.date ? ` · ${c.date}` : ''} · {n} {n === 1 ? 'photograph' : 'photographs'}
              </p>
            </div>
            {c.tour ? (
              <div className="col-span-full lg:col-span-4 lg:justify-self-end lg:pb-1">
                <Link href={tourPath(c.tour)} className="btn btn-outline">
                  See this tour
                </Link>
              </div>
            ) : null}
          </div>
          <Note className="mt-8 max-w-[46rem]">
            <SampleTag className="mb-2">Sample collection</SampleTag>
            <br />
            Licensed photographs of the places, each credited to its photographer, shown until HIJRA’s own photographs of this journey are ready. They are not
            photographs of HIJRA’s travellers.
          </Note>
        </div>
      </section>

      <div className="wrap pb-section pt-10 md:pt-14">
        <PhotoGallery
          label={`${c.title}: ${n} ${n === 1 ? 'photograph' : 'photographs'}`}
          photos={c.photos.map((key) => ({ key, file: images[key].src, asset: photoAsset(key), credit: images[key].credit }))}
          creditsHref={routes.imageCredits}
        />
      </div>

      {more.length ? (
        <section className="bg-warm-grey py-section" aria-labelledby="more-h">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <p className="eyebrow">{cat.label}</p>
                <h2 id="more-h" className="mt-3 text-h2">
                  More collections
                </h2>
              </div>
              <Link href={routes.gallery} className="link-arrow">
                The whole gallery
              </Link>
            </div>
            <ul role="list" className="mt-8 grid gap-x-(--g) gap-y-10 min-[600px]:grid-cols-2 md:mt-10 lg:grid-cols-3">
              {more.map((x) => (
                <li key={x.slug}>
                  <CollectionCard c={x} sizes="(min-width: 1200px) 30vw, (min-width: 600px) 46vw, 94vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        eyebrow="Plan your journey"
        title="Would you like to travel here?"
        body="Tell us when and who is travelling. An advisor replies with dates, fares and the next steps; nothing is booked or paid online."
        service={c.category === 'umrah' || c.category === 'hajj' ? c.category : 'tour'}
        interest={c.tour}
      />
    </>
  );
}
