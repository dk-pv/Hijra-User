import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { enquiryPath, routes, tourPath } from '@/data/navigation';
import { images } from '@/data/images';
import { getTour, tours, type Tour } from '@/data/tours';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { cn } from '@/lib/cn';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';
import { Note, SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { SectionIntro } from '@/components/ui/section';
import { StatusBadge } from '@/components/ui/status-badge';
import { EnquirySection } from '@/components/travel/enquiry-section';
import { Steps } from '@/components/travel/steps';
import { TourTile, idealForLabel, tourLength, tourPlace } from '@/components/travel/tour-tile';
import { toCard } from '@/components/travel/tour-card';

// Tour page (designed fresh; the reference has none): split hero with a key-facts ledger, overview and highlights,
// the sample itinerary on the double rule, inclusions, "good to know" on Deep Navy, a gallery, the enquiry and
// related tours. Every record is a sample: no prices, dates or availability.

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = getTour((await params).slug);
  if (!tour) notFound();
  return pageMetadata({
    path: tourPath(tour.slug),
    title: `${tour.title}: a sample ${tour.days}-day tour`,
    description: tour.description ?? tour.summary,
    image: tour.image,
    noindex: tour.sample,
  });
}

/** "Prayer: Mosques are..." → ['Prayer', 'Mosques are...']; notes without a topic keep their text. */
const splitNote = (note: string) => {
  const i = note.indexOf(': ');
  return i > 0 && i < 24 ? [note.slice(0, i), note.slice(i + 2)] : ['Note', note];
};

/** Three tours, the same region first, never repeating a photograph already on the page. */
function relatedTo(tour: Tour) {
  const onPage = new Set([tour.image, ...tour.gallery]);
  const pool = tours.filter((t) => t.slug !== tour.slug && !onPage.has(t.image));
  return [...pool.filter((t) => t.region === tour.region), ...pool.filter((t) => t.region !== tour.region)].slice(0, 3);
}

/** The slug is URL data: it is read inside Suspense so the route's shared App Shell stays valid (Partial Prefetching).
 * Unknown slugs never reach this page: proxy.ts answers them with the 404 page and a real 404 status. */
export default function TourPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-svh pt-nav" aria-busy="true" />}>
      <TourDetail params={params} />
    </Suspense>
  );
}

async function TourDetail({ params }: Props) {
  const tour = getTour((await params).slug);
  if (!tour) notFound();
  const t = dictionary;
  const related = relatedTo(tour);
  const whatsapp = `Hello HIJRA, I would like to know more about the ${tour.title} tour.`;

  const facts = [
    { label: 'Duration', value: tourLength(tour) },
    { label: 'Best time', value: tour.bestTime },
    { label: 'Ideal for', value: tour.idealFor.map((k) => idealForLabel[k]).join(', ') },
    { label: 'Fare', value: 'On enquiry' },
  ];

  return (
    <>
      {/* 01 Hero: title and facts beside the photograph */}
      <section className="pt-nav">
        <div className="wrap pt-6 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Tours', href: routes.tours }, { label: tour.title }]} />
          <div className="site-grid mt-8 gap-y-8 lg:mt-12 lg:grid-rows-[auto_1fr]">
            <div className="col-span-full lg:col-span-5">
              <p className="eyebrow rise">
                {tourPlace(tour)} · {tour.region === 'domestic' ? 'Within India' : 'International'}
              </p>
              <h1 className="rise rise-2 mt-5 text-h1">{tour.title}</h1>
              <p className="rise rise-3 mt-6 text-lead">{tour.summary}</p>
            </div>
            <div className="col-span-full lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <Photo
                image={tour.image}
                priority
                sizes="(min-width: 1200px) 56vw, 94vw"
                className="aspect-[4/3] rounded-[18px] md:aspect-[16/10] md:rounded-lg lg:aspect-auto lg:h-full lg:min-h-[36rem]"
              />
            </div>
            <div className="col-span-full lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-end">
              <dl className="grid grid-cols-2 border-t border-warm-border">
                {facts.map((f, i) => (
                  <div key={f.label} className={cn('border-b border-warm-border py-4', i % 2 ? 'border-l pl-5' : 'pr-5')}>
                    <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">{f.label}</dt>
                    <dd className="mt-1 font-semibold text-navy">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#enquiry" className="btn btn-primary">
                  Enquire about this tour
                </a>
                <ContactAction kind="whatsapp" message={whatsapp} className="btn btn-outline">
                  <Icon name="whatsapp" className="wa-mark" />
                  {t.common.whatsappUs}
                </ContactAction>
              </div>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-small text-muted">
                <StatusBadge status={tour.status} />
                <SampleTag>Sample itinerary</SampleTag>
                Dates, hotels and the fare are confirmed by an advisor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 Overview and highlights */}
      <section className="py-section" aria-labelledby="overview-h">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-6">
            <p className="eyebrow">Overview</p>
            <h2 id="overview-h" className="mt-3 text-h2">
              About this journey
            </h2>
            {(tour.overview ?? [tour.summary]).map((p, i) => (
              <p key={p} className={cn('max-w-[38rem]', i ? 'mt-4' : 'mt-6 text-lead')}>
                {p}
              </p>
            ))}
          </div>
          <div className="col-span-full lg:col-span-5 lg:col-start-8">
            <h3 className="text-h4">Highlights</h3>
            <ol className="mt-4 border-b border-warm-border">
              {tour.highlights.map((h, i) => (
                <li key={h} className="flex gap-4 border-t border-warm-border py-4">
                  <span aria-hidden="true" className="w-7 shrink-0 font-serif text-[1.0625rem] font-semibold text-red">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 03 Sample itinerary */}
      <section className="bg-warm-grey py-section" aria-labelledby="itinerary-h">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">Day by day</p>
              <h2 id="itinerary-h" className="mt-3 text-h2">
                Sample itinerary
              </h2>
              <p className="mt-4 max-w-[30rem]">
                {tourLength(tour)}. A starting point: the order, the pace and the hotels can all change to suit you.
              </p>
              <a href="#enquiry" className="link-arrow mt-5">
                Ask for changes
              </a>
            </div>
          </div>
          <Steps
            dots
            label={`Sample itinerary, ${tour.days} days`}
            items={tour.itinerary.map((d) => ({ label: d.day, title: d.title, text: d.detail }))}
            className="col-span-full lg:col-span-7 lg:col-start-6"
          />
        </div>
      </section>

      {/* 04 Included and not included */}
      <section className="py-section" aria-labelledby="included-h">
        <div className="wrap">
          <SectionIntro
            eyebrow="The quote"
            title={<span id="included-h">What is usually included</span>}
            lead="Sample inclusions. Your advisor’s written quote lists exactly what is included before you confirm anything."
          />
          <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-gutter lg:gap-x-24">
            {[
              { title: 'Included', items: tour.inclusions, icon: 'check' as const, tone: 'text-success' },
              { title: 'Not included', items: tour.exclusions, icon: 'minus' as const, tone: 'text-muted' },
            ].map((block) => (
              <div key={block.title}>
                <h3 className="text-h4">{block.title}</h3>
                <ul className="mt-4 border-b border-warm-border">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 border-t border-warm-border py-3.5">
                      <Icon name={block.icon} className={cn('mt-0.5 shrink-0', block.tone)} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Good to know: the night chapter */}
      <section className="on-dark bg-deep py-section" aria-labelledby="notes-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <span className="rule-double mb-5" aria-hidden="true" />
            <p className="eyebrow">Good to know</p>
            <h2 id="notes-h" className="mt-3 text-h2">
              Before you travel
            </h2>
            <p className="mt-4 max-w-[30rem]">Prayer, food, weather and documents for this tour. Your advisor confirms the details when you book.</p>
          </div>
          <dl className="col-span-full grid gap-x-(--g) md:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {tour.notes.map((n) => {
              const [topic, text] = splitNote(n);
              return (
                <div key={n} className="border-t border-white/15 pb-7 pt-5">
                  <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-sand">{topic}</dt>
                  <dd className="mt-2">{text}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* 06 Gallery: a swipe strip on phones, a composed set from 810 px */}
      {tour.gallery.length ? (
        <section className="py-section" aria-labelledby="gallery-h">
          <div className="wrap">
            <p className="eyebrow">Gallery</p>
            <h2 id="gallery-h" className="mt-3 text-h2">
              Along the way
            </h2>
            {tour.gallery.length === 1 ? (
              // One photograph: a wide crop with its caption plate, as in the tours opener
              <figure className="relative mt-8 md:mt-10 lg:mb-8">
                <Photo
                  image={tour.gallery[0]}
                  alt=""
                  sizes="(min-width: 1360px) 1280px, 94vw"
                  className="aspect-[4/3] rounded-[18px] md:aspect-[16/9] md:rounded-lg lg:aspect-[21/9]"
                />
                <figcaption className="mt-3 max-w-[36rem] text-small text-muted lg:absolute lg:-bottom-8 lg:right-8 lg:mt-0 lg:max-w-[22rem] lg:rounded-md lg:bg-white lg:px-6 lg:py-5 lg:text-slate">
                  {images[tour.gallery[0]].alt}
                </figcaption>
              </figure>
            ) : (
              // Several: a swipe strip on phones, a composed set from 810 px
              <ul
                role="list"
                className="-mx-(--m) mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-(--m) px-(--m) pb-2 md:mx-0 md:mt-10 md:grid md:h-[min(40rem,56vw)] md:grid-cols-12 md:grid-rows-2 md:gap-gutter md:overflow-visible md:px-0 md:pb-0"
              >
                {tour.gallery.slice(0, 3).map((key, i, all) => (
                  <li
                    key={key}
                    className={cn(
                      'w-[82%] shrink-0 snap-start min-[600px]:w-[46%] md:w-auto',
                      i === 0 ? 'md:col-span-7 md:row-span-2' : all.length === 2 ? 'md:col-span-5 md:row-span-2' : 'md:col-span-5',
                    )}
                  >
                    <Photo
                      image={key}
                      sizes="(min-width: 1200px) 50vw, (min-width: 810px) 58vw, 82vw"
                      className="aspect-[4/5] rounded-md md:aspect-auto md:h-full"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ) : null}

      {/* 07 Enquiry */}
      <EnquirySection
        className="bg-warm-grey"
        eyebrow="Enquire"
        title="Ask about this tour."
        lead="Tell us your dates and who is travelling. An advisor replies with a version of this itinerary that suits you, and the fare."
        service="tour"
        tours={tours.map((x) => ({ slug: x.slug, name: x.title }))}
        source={`tour:${tour.slug}`}
        initial={{ destination: tour.title, interest: tour.slug, tourType: tour.region }}
        message={whatsapp}
      >
        <Note className="mt-8 max-w-[30rem]">
          This itinerary is a sample. Nothing is booked or paid online: your advisor confirms dates, hotels and the fare with you first.
        </Note>
      </EnquirySection>

      {/* 08 Related tours */}
      {related.length ? (
        <section className="py-section" aria-labelledby="related-h">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <SectionIntro eyebrow="More sample tours" title={<span id="related-h">Explore more journeys</span>} />
              <Link href={routes.tours} className="link-arrow">
                All tours
              </Link>
            </div>
            <ul
              role="list"
              className="-mx-(--m) mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-(--m) px-(--m) pb-2 md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-gutter md:overflow-visible md:px-0 md:pb-0"
            >
              {related.map((r) => (
                <li key={r.slug} className="w-[82%] shrink-0 snap-start min-[600px]:w-[46%] md:w-auto">
                  <TourTile
                    tour={toCard(r)}
                    href={tourPath(r.slug)}
                    enquireHref={enquiryPath('tour', r.slug)}
                    sizes="(min-width: 810px) 30vw, (min-width: 600px) 46vw, 82vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
