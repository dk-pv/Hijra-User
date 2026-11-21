import Link from 'next/link';
import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { faqs } from '@/data/faqs';
import type { ImageKey } from '@/data/images';
import { tours } from '@/data/tours';
import { dictionary } from '@/lib/dictionary';
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
import { TourBrowser } from '@/components/travel/tour-browser';
import { toCard } from '@/components/travel/tour-card';

// Tours (report 8.2 "Tours listing"; audit 2.4): a magazine opener, the filterable catalogue (featured mosaic, then a
// ledger), families and groups, customised travel on Deep Navy, questions and the enquiry.

// Not the hero of any tour below, so no photograph repeats on the page.
const HERO: ImageKey = 'kerala-athirappilly-falls';

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.tours,
    title: 'Tours from Kerala, within India and abroad',
    description:
      'Sample tours from HIJRA Travels: Munnar, the backwaters and Kashmir, then Istanbul, Dubai and Malaysia, planned around prayer, halal food and family.',
    image: HERO,
  });
}

const family = [
  'Unhurried days, with rest built in for grandparents and small children',
  'Prayer times planned into each day, with Friday prayers in mind',
  'Halal food, and honest advice where the choice is limited',
  'Rooms close together, and wheelchair help at airports on request',
];
const group = [
  'One advisor for the organiser, from the first plan to the journey home',
  'A single quote that sets out clearly what each person pays',
  'Names, passports and visas collected and checked in one place',
  'Departures from the Kerala airport that suits most of the group',
];

const customSteps = [
  { title: 'Tell us the basics', text: 'Who is travelling, when, for how long, and what matters most: pace, food, prayer and comfort.' },
  { title: 'Receive a draft plan', text: 'A day-by-day itinerary with suggested hotels and transfers, by WhatsApp or email.' },
  { title: 'Shape it together', text: 'Change the pace, the hotels or the stops, and add flights or visas if you need them.' },
  { title: 'Confirm in writing', text: 'The final fare, what is included and the terms, before anything is booked. Nothing is paid online.' },
];

export default function ToursPage() {
  const t = dictionary;

  return (
    <>
      {/* 01 Opener: headline and standfirst, then a wide photograph */}
      <section className="pt-nav">
        <div className="wrap pt-6 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Tours' }]} />
          <div className="site-grid mt-8 items-end gap-y-6 lg:mt-12">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow rise">Tours · Kerala, India and abroad</p>
              <h1 className="rise rise-2 mt-5 text-display">Travel further, with the same care.</h1>
            </div>
            <div className="col-span-full lg:col-span-5 lg:pb-2">
              <p className="rise rise-3 max-w-[34rem] text-lead">
                From the tea hills of Munnar to the mosques of Istanbul, HIJRA plans tours the way it plans pilgrimages: around your family, your prayers and your pace.
              </p>
              <div className="rise rise-4 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#enquiry" className="btn btn-primary">
                  Plan a tour
                </a>
                <ContactAction kind="whatsapp" className="btn btn-outline" message="Hello HIJRA, I would like to plan a tour.">
                  <Icon name="whatsapp" className="wa-mark" />
                  {t.common.whatsappUs}
                </ContactAction>
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
              <span className="eyebrow block">Kerala first</span>
              <span className="mt-2 block font-serif text-[clamp(1.25rem,1.1rem+0.5vw,1.625rem)] font-semibold leading-snug text-navy">
                Hills, backwaters and the Malabar coast, then the rest of India and the world beyond.
              </span>
              <a href="#tours" className="link-arrow mt-2 text-small">
                Browse the tours
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 02 The catalogue: featured mosaic and ledger, filtered in the browser */}
      <section id="tours" aria-labelledby="tours-h" className="py-section">
        <div className="wrap">
          <SectionIntro
            eyebrow="Sample tours"
            title={<span id="tours-h">Find your tour.</span>}
            lead="Kerala first, then the rest of India and abroad. Choose a region, a length or who is travelling; every itinerary can be changed."
            className="mb-8 md:mb-10"
          >
            <SampleTag className="mt-5">Sample itineraries · fares on enquiry</SampleTag>
          </SectionIntro>
          <TourBrowser tours={tours.map(toCard)} />
        </div>
      </section>

      {/* 03 Families and groups */}
      <section className="bg-warm-grey py-section" aria-labelledby="families-h">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">Families and groups</p>
            <h2 id="families-h" className="mt-3 text-h2">
              Planned around prayer, food and every generation.
            </h2>
            <p className="mt-5 max-w-[36rem] text-lead">
              A good family holiday starts with the people, not the sights: who needs rest, where everyone will pray, and what the children will eat.
            </p>
            <p className="mt-5 max-w-[36rem]">
              For groups of relatives, friends, mahallu and community groups, colleagues or alumni, one advisor handles the whole party.
            </p>
            <a href="#enquiry" className="link-arrow mt-6">
              Plan a family or group tour
            </a>
          </div>
          <div className="col-span-full grid gap-10 md:grid-cols-2 md:gap-gutter lg:col-span-6 lg:col-start-7 lg:grid-cols-1 lg:gap-12">
            {[
              { title: 'Travelling as a family', items: family },
              { title: 'Travelling as a group', items: group },
            ].map((block) => (
              <div key={block.title}>
                <h3 className="text-h4">{block.title}</h3>
                <ul className="mt-4 border-b border-warm-border">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 border-t border-warm-border py-3.5">
                      <Icon name="check" className="mt-0.5 shrink-0 text-red" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Customised travel: the night chapter */}
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

      {/* 05 Questions */}
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

      {/* 06 Enquiry */}
      <EnquirySection
        className="bg-warm-grey"
        eyebrow="Plan a tour"
        title="Tell us where you would like to go."
        lead="Share your dates and who is travelling. An advisor replies with a suggested itinerary and the fare; nothing is booked or paid online."
        service="tour"
        tours={tours.map((x) => ({ slug: x.slug, name: x.title }))}
        source="tours"
        message="Hello HIJRA, I would like to plan a tour."
      />
    </>
  );
}
