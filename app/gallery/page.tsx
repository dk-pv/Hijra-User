import { Icon } from '@/components/ui/icons';
import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { pageMetadata } from '@/lib/seo';
import { photoAsset } from '@/lib/image';
import { images } from '@/data/images';
import { collections, galleryPhotos } from '@/data/gallery';
import { PhotoGallery } from '@/components/content/photo-gallery';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CtaBand } from '@/components/ui/cta-band';
import { Note } from '@/components/ui/pending';

// Gallery: a compact title so the photographs start on the first screen, the collections with their lightbox, then
// the slots for HIJRA's own trip photography (consented), and the closing enquiry.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.gallery,
    title: 'Gallery: Makkah, Madinah, Hajj and tours',
    description:
      'Photographs of Makkah, Madinah, the days of Hajj and destinations in Kerala, India and abroad, each credited to its photographer, from HIJRA Travels.',
    image: 'madinah-piazza-umbrellas',
  });
}

const ownPhotos = [
  { subject: 'HIJRA groups in Makkah and Madinah' },
  { subject: 'Pre-departure sessions at the branches' },
  { subject: 'Family tours in Kerala, across India and abroad' },
];

export default function GalleryPage() {
  return (
    <>
      <section className="pt-nav">
        <div className="wrap pt-6 md:pt-10">
          <Breadcrumbs items={[{ label: 'Gallery' }]} />
          <div className="site-grid mt-8 items-end gap-y-5 md:mt-12">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow rise">Gallery</p>
              <h1 className="rise rise-2 mt-4 text-h1">Where the journey leads.</h1>
            </div>
            <p className="rise rise-3 col-span-full max-w-[36rem] text-lead md:col-span-6 lg:col-span-5 lg:col-start-8 lg:pb-1">
              Makkah and Madinah, the days of Hajj, and destinations in Kerala, across India and abroad.
            </p>
          </div>
          <Note className="rise rise-4 mt-8 max-w-[46rem]">
            These are licensed photographs of places, shown until HIJRA’s own trip photography is ready, and each caption credits its
            photographer. The people in them are not HIJRA’s customers.
          </Note>
        </div>
      </section>

      <div className="pb-section pt-10 md:pt-14">
        <PhotoGallery
          photos={galleryPhotos.map(({ key, collection }) => ({ key, collection, file: images[key].src, asset: photoAsset(key), credit: images[key].credit }))}
          collections={collections}
          creditsHref={routes.imageCredits}
        />
      </div>

      <section aria-labelledby="own-h" className="bg-warm-grey py-section">
        <div className="wrap site-grid items-center gap-y-10">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">HIJRA’s own photographs</p>
            <h2 id="own-h" className="mt-3 text-h2">
              Real journeys, shared with consent.
            </h2>
            <p className="mt-4 max-w-[34rem] text-lead">
              At launch, this gallery opens with photographs from HIJRA’s own groups and tours, published only with the consent of
              everyone pictured.
            </p>
          </div>
          <div className="on-dark col-span-full rounded-lg bg-deep p-7 md:p-10 lg:col-span-6 lg:col-start-7">
            <span className="grid size-12 place-items-center rounded-full border border-white/25 text-sand">
              <Icon name="camera" />
            </span>
            <p className="mt-6 font-serif text-h3 text-warm-white">What this gallery will show</p>
            <ul className="mt-5 divide-y divide-white/15 border-y border-white/15">
              {ownPhotos.map((p) => (
                <li key={p.subject} className="py-3.5 text-small text-mist">
                  {p.subject}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-caption text-mist">Added by HIJRA at launch, with the written consent of everyone pictured.</p>
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
