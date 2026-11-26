import Link from 'next/link';
import type { Metadata } from 'next';
import { enquiryPath, routes, tourPath } from '@/data/navigation';
import { faqs } from '@/data/faqs';
import type { ImageKey } from '@/data/images';
import { tours, type Tour } from '@/data/tours';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { FaqGroups } from '@/components/ui/faq';
import { Icon } from '@/components/ui/icons';
import { SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { SectionIntro } from '@/components/ui/section';
import { EnquirySection } from '@/components/travel/enquiry-section';
import { Steps } from '@/components/travel/steps';
import { TourTile } from '@/components/travel/tour-tile';
import { toCard } from '@/components/travel/tour-card';

// Tours: international holidays first, because they are HIJRA's main holiday offering; India follows as a smaller
// range. Opener, the international packages, a destination index, India, why HIJRA, customised travel, questions
// and the enquiry. Too few tours to need filters: every tour is on the page.

// Not the cover of any tour below, so no photograph repeats on the page.
const HERO: ImageKey = 'intl-singapore-marina-bay';

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.tours,
    title: 'International holiday tours',
    description:
      'Sample holiday tours from HIJRA Travels: Istanbul, Dubai, Malaysia and Singapore, Egypt and Uzbekistan, and a smaller range within India. Fares on enquiry.',
    image: HERO,
  });
}

const international = [...tours.filter((t) => t.region === 'international')].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
const india = tours.filter((t) => t.region === 'domestic');
/** Destination index: each country with its tours, international first. */
const byCountry = [...international, ...india].reduce<Record<string, Tour[]>>((acc, t) => {
  (acc[t.country] ??= []).push(t);
  return acc;
}, {});

const reasons = [
  { icon: 'compass', title: 'Planned around you', text: 'Prayer times, halal food and rest planned into each day, with the pace set for every generation travelling.' },
  { icon: 'chat', title: 'One advisor throughout', text: 'One person who knows your plans, from the first itinerary to the journey home, for families and groups alike.' },
  { icon: 'passport', title: 'Flights and visas arranged', text: 'Flight tickets and visa assistance alongside the tour, with your documents checked before anything is submitted.' },
  { icon: 'shield', title: 'Enquiry first', text: 'A written quote with the fare and what is included before anything is booked. Nothing is paid online.' },
] as const;

const customSteps = [
  { title: 'Tell us the basics', text: 'Who is travelling, when, for how long, and what matters most: pace, food, prayer and comfort.' },
  { title: 'Receive a draft plan', text: 'A day-by-day itinerary with suggested hotels and transfers, by WhatsApp or email.' },
  { title: 'Shape it together', text: 'Change the pace, the hotels or the stops, and add flights or visas if you need them.' },
  { title: 'Confirm in writing', text: 'The final fare, what is included and the terms, before anything is booked. Nothing is paid online.' },
];

export default function ToursPage() {
  const links = (x: Tour) => ({ href: tourPath(x.slug), enquireHref: enquiryPath('tour', x.slug) });

  return (
    <>
      {/* 01 Opener: headline and standfirst, then a wide photograph */}
      <section className="pt-nav">
        <div className="wrap pt-6 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Tours' }]} />
          <div className="site-grid mt-8 items-end gap-y-6 lg:mt-12">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow rise">Holiday tours · International</p>
              <h1 className="rise rise-2 mt-5 text-display">Discover extraordinary journeys.</h1>
            </div>
            <div className="col-span-full lg:col-span-5 lg:pb-2">
              <p className="rise rise-3 max-w-[34rem] text-lead">
                Explore international destinations and thoughtfully planned holiday experiences with HIJRA Travels.
              </p>
              <div className="rise rise-4 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#international" className="btn btn-primary">
                  Explore packages
                </a>
                <a href="#enquiry" className="btn btn-outline">
                  Enquire now
                </a>
              </div>
            </div>
          </div>
          <figure className="relative mt-10 md:mt-14 lg:mb-10">
            <Photo
              image={HERO}
              priority
              sizes="(min-width: 1360px) 1280px, 94vw"
              className="aspect-[4/3] rounded-[18px] md:aspect-[16/9] md:rounded-lg lg:aspect-[21/9]"
            />
            <figcaption className="mt-4 max-w-[30rem] lg:absolute lg:-bottom-10 lg:left-8 lg:mt-0 lg:rounded-md lg:bg-white lg:px-7 lg:py-6">
              <span className="eyebrow block">Holidays abroad</span>
              <span className="mt-2 block font-serif text-[clamp(1.25rem,1.1rem+0.5vw,1.625rem)] font-semibold leading-snug text-navy">
                Great mosques, old cities and new skylines, planned around your family, your prayers and your pace.
              </span>
              <a href="#destinations" className="link-arrow mt-2 text-small">
                Explore by destination
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 02 International packages: the main section */}
      <section id="international" aria-labelledby="intl-h" className="scroll-mt-24 py-section">
        <div className="wrap">
          <SectionIntro
            eyebrow="International packages"
            title={<span id="intl-h">Holidays abroad.</span>}
            lead="Itineraries planned for families, groups and couples. Open a tour for the day-by-day plan, what is included and how to enquire; every itinerary can be changed."
            className="mb-10 md:mb-12"
          >
            <SampleTag className="mt-5">Sample itineraries · fares on enquiry</SampleTag>
          </SectionIntro>
          <ul role="list" className="grid gap-x-(--g) gap-y-12 min-[600px]:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
            {international.map((x) => (
              <li key={x.slug}>
                <TourTile tour={toCard(x)} {...links(x)} sizes="(min-width: 1200px) 30vw, (min-width: 600px) 46vw, 94vw" className="h-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 Explore by destination: a plain index, one line per country */}
      <section id="destinations" aria-labelledby="dest-h" className="scroll-mt-24 bg-warm-grey py-12 md:py-16">
        <div className="wrap site-grid gap-y-6">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">Explore by destination</p>
            <h2 id="dest-h" className="mt-3 text-h3">
              Where would you like to go?
            </h2>
          </div>
          <ul role="list" className="col-span-full grid border-b border-warm-border sm:grid-cols-2 sm:gap-x-(--g) lg:col-span-8">
            {Object.entries(byCountry).map(([country, list]) => (
              <li key={country} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-warm-border py-3.5">
                <span className="font-semibold text-navy">{country}</span>
                <span className="flex flex-wrap gap-x-4">
                  {list.map((x) => (
                    <Link key={x.slug} href={tourPath(x.slug)} className="link-inline text-small">
                      {x.title}
                    </Link>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 India: a smaller, secondary range */}
      {india.length ? (
        <section aria-labelledby="india-h" className="py-section">
          <div className="wrap">
            <SectionIntro
              eyebrow="Within India"
              title={<span id="india-h">Explore India.</span>}
              lead="A smaller range of tours within India, planned with the same care."
              size="h3"
              className="mb-4 md:mb-6"
            />
            <ul role="list" aria-labelledby="india-h" className="border-b border-warm-border">
              {india.map((x) => (
                <li key={x.slug}>
                  <TourTile tour={toCard(x)} {...links(x)} layout="row" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 05 Why travel with HIJRA */}
      <section className="bg-warm-grey py-section" aria-labelledby="why-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">Travel assistance</p>
            <h2 id="why-h" className="mt-3 text-h2">
              Why travel with HIJRA?
            </h2>
            <p className="mt-4 max-w-[32rem] text-lead">The care that goes into a pilgrimage, brought to your holiday.</p>
          </div>
          <ul className="col-span-full grid gap-x-(--g) gap-y-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {reasons.map((r) => (
              <li key={r.title} className="flex gap-4 border-t border-warm-border pt-5">
                <Icon name={r.icon} className="mt-0.5 shrink-0 text-red" />
                <div>
                  <h3 className="font-sans text-ui font-semibold text-navy">{r.title}</h3>
                  <p className="mt-1 text-small text-muted">{r.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 Customised travel: the night chapter */}
      <section className="on-dark bg-deep py-section" aria-labelledby="custom-h">
        <div className="wrap">
          <div className="max-w-[46rem]">
            <span className="rule-double mb-5" aria-hidden="true" />
            <p className="eyebrow">Customised travel</p>
            <h2 id="custom-h" className="mt-3 text-h2">
              Start from a sample, or from a blank page.
            </h2>
            <p className="mt-4 max-w-[38rem] text-lead">
              Every tour on this page is a starting point. Tell us who is travelling and what you enjoy, and an advisor shapes the plan around you.
            </p>
          </div>
          <Steps items={customSteps} across dark label="How a customised tour comes together" className="mt-14 md:mt-16" />
          <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 lg:mt-16 lg:flex-row lg:items-center lg:gap-10">
            <p className="text-small">Add to any tour:</p>
            <ul className="flex flex-wrap gap-x-8">
              <li>
                <Link href={routes.flights} className="link-arrow">
                  Flight tickets
                </Link>
              </li>
              <li>
                <Link href={routes.visa} className="link-arrow">
                  Visa assistance
                </Link>
              </li>
              <li>
                <Link href={routes.umrah} className="link-arrow">
                  Umrah on the same journey
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 07 Questions */}
      <section className="py-section" aria-labelledby="faq-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-h" className="mt-3 text-h2">
              Before you plan a tour.
            </h2>
            <ContactAction kind="whatsapp" className="btn btn-outline mt-7" message="Hello HIJRA, I have a question about a tour.">
              <Icon name="whatsapp" className="wa-mark" />
              Ask on WhatsApp
            </ContactAction>
          </div>
          <FaqGroups
            className="col-span-full lg:col-span-7 lg:col-start-6"
            groups={[
              { label: 'Tours', items: faqs.tours },
              { label: 'Booking and payment', items: faqs.booking },
            ]}
          />
        </div>
      </section>

      {/* 08 Enquiry */}
      <EnquirySection
        className="bg-warm-grey"
        eyebrow="Talk to our travel team"
        title="Planning your next journey?"
        lead="Share where you would like to go, your dates and who is travelling. An advisor replies with a suggested itinerary and the fare; nothing is booked or paid online."
        service="tour"
        tours={tours.map((x) => ({ slug: x.slug, name: x.title }))}
        source="tours"
        message="Hello HIJRA, I would like to plan a tour."
      />
    </>
  );
}
