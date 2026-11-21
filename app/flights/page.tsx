import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { faqs } from '@/data/faqs';
import type { ImageKey } from '@/data/images';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { EnquiryForm } from '@/components/forms/enquiry-form';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CtaBand } from '@/components/ui/cta-band';
import { FaqGroups } from '@/components/ui/faq';
import { Icon } from '@/components/ui/icons';
import { Photo } from '@/components/ui/photo';
import { ContactPanel } from '@/components/travel/enquiry-section';
import { Steps } from '@/components/travel/steps';

// Flight tickets (report 8.2 "Flight, Visa"; audit 2.5): the labelled form sits in the first screen beside the promise,
// then what HIJRA arranges, how an enquiry becomes a ticket, questions with every contact route, and a closing band.
// Enquiry only: no live fares, no search results, nothing issued without the traveller's approval.

const PHOTO: ImageKey = 'travel-calicut-airport';

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.flights,
    title: 'Flight tickets from Kerala, arranged by an advisor',
    description:
      'Domestic and international flight tickets from Kerala, arranged by HIJRA Travels advisors, with group bookings, date changes and special assistance.',
    image: PHOTO,
  });
}

const promises = [
  'No online payment: you approve the fare first',
  'Fare rules, baggage and changes explained in writing',
  'Help after booking, for changes and special requests',
];

const services = [
  {
    title: 'Domestic and international tickets',
    text: 'One-way, return and multi-city tickets from the Kerala airports to cities across India, the Gulf and beyond, for work, family visits, holidays and pilgrimage.',
    points: ['Gulf routes for work and family visits', 'Connections with sensible layovers', 'Baggage allowances explained before you book', 'Tickets combined with a visa or a tour'],
  },
  {
    title: 'Group bookings',
    text: 'Families travelling together, wedding parties, community groups and Umrah groups. Group fares depend on the airline, so we explain deposits, name deadlines and change rules before you commit.',
    points: ['One contact for the group organiser', 'Names and passport details collected once', 'Seats together where the airline allows'],
  },
  {
    title: 'Changes and special assistance',
    text: 'Plans change. We help with date changes, cancellations and refunds under the fare rules, and with the requests an airline can arrange.',
    points: ['Wheelchair assistance at airports', 'Help for older travellers and families with infants', 'Special meal requests', 'Extra baggage'],
  },
];

const steps = [
  { title: 'Send your route and dates', text: 'Use the form, WhatsApp or a branch. Flexible dates often open up better options.' },
  { title: 'Compare the options', text: 'An advisor sends suitable flights with the times, stops, baggage and fare rules.' },
  { title: 'Confirm in writing', text: 'Nothing is issued until you approve the fare, the names and the rules. Payment is arranged directly with HIJRA.' },
  { title: 'Travel with support', text: 'Your e-ticket arrives by WhatsApp or email, and we help with changes and requests afterwards.' },
];

export default function FlightsPage() {
  const t = dictionary;

  return (
    <>
      {/* 01 The promise beside the form: the form is in the first screen (audit 2.5) */}
      <section className="pt-nav pb-section">
        <div className="wrap pt-6 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Flight tickets' }]} />
          <div className="site-grid mt-8 items-start gap-y-12 lg:mt-12">
            <div className="col-span-full lg:col-span-5">
              <p className="eyebrow rise">Flight tickets</p>
              <h1 className="rise rise-2 mt-5 text-h1">Flight tickets, arranged by an advisor.</h1>
              <p className="rise rise-3 mt-6 max-w-[36rem] text-lead">
                Domestic and international tickets for work, family visits, holidays and pilgrimage. Send your route and dates: an advisor compares the options and confirms the fare and its rules with you before anything is issued.
              </p>
              <ul className="rise rise-4 mt-8 max-w-[36rem] border-b border-warm-border">
                {promises.map((p) => (
                  <li key={p} className="flex gap-3 border-t border-warm-border py-3.5">
                    <Icon name="check" className="mt-0.5 shrink-0 text-red" />
                    <span className="font-semibold text-navy">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="enquiry" className="col-span-full lg:col-span-6 lg:col-start-7 lg:row-span-2">
              <h2 className="text-h3">Ask for flight options</h2>
              <p className="mt-2 text-small text-muted">An advisor replies with suitable flights and the current fare.</p>
              <EnquiryForm t={t.form} variant="full" defaultService="flight" lockService source="flights" className="mt-5" />
            </div>
            <figure className="relative col-span-full md:col-span-6 lg:col-span-5 lg:row-start-2 lg:mb-6 lg:self-end">
              <Photo image={PHOTO} sizes="(min-width: 1200px) 38vw, (min-width: 810px) 70vw, 94vw" focus="62% 55%" className="aspect-[3/2] rounded-[18px] md:rounded-lg" />
              <figcaption className="mt-3 text-small text-muted lg:absolute lg:-bottom-6 lg:left-6 lg:mt-0 lg:max-w-[18rem] lg:rounded-md lg:bg-white lg:px-5 lg:py-4">
                <span className="block font-semibold text-navy">From every Kerala airport</span>
                Kozhikode, Kochi, Kannur and Thiruvananthapuram, or wherever your journey starts.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 02 What HIJRA arranges */}
      <section className="bg-warm-grey py-section" aria-labelledby="arrange-h">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow">What we arrange</p>
              <h2 id="arrange-h" className="mt-3 text-h2">
                Every kind of ticket, one advisor.
              </h2>
              <p className="mt-4 max-w-[34rem] text-lead">One seat home or a block for a whole group: the same care goes into the fare, the rules and the timings.</p>
            </div>
          </div>
          <ol className="col-span-full lg:col-span-7 lg:col-start-6">
            {services.map((s, i) => (
              <li key={s.title} className="grid gap-x-6 gap-y-3 border-t border-warm-border py-8 first:border-t-0 first:pt-0 md:grid-cols-[4rem_1fr] lg:py-10">
                <span aria-hidden="true" className="font-serif text-[2rem] font-semibold leading-none text-red">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-h3">{s.title}</h3>
                  <p className="mt-3 max-w-[38rem]">{s.text}</p>
                  <ul className="mt-5 grid gap-x-8 gap-y-2 text-small sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <Icon name="check" size={18} className="mt-0.5 shrink-0 text-red" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 How it works: the night chapter */}
      <section className="on-dark bg-deep py-section" aria-labelledby="how-h">
        <div className="wrap">
          <div className="max-w-[46rem]">
            <span className="rule-double mb-5" aria-hidden="true" />
            <p className="eyebrow">How it works</p>
            <h2 id="how-h" className="mt-3 text-h2">
              From enquiry to ticket, in four steps.
            </h2>
          </div>
          <Steps items={steps} across dark label="How a flight enquiry works" className="mt-14 md:mt-16" />
          <div className="mt-14 flex flex-col items-start gap-6 border-t border-white/15 pt-8 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[44rem] text-small">
              This is not a booking engine: the site shows no live fares or seat availability. Fares change until a ticket is issued, so your advisor always quotes the current fare.
            </p>
            <a href="#enquiry" className="btn btn-light shrink-0">
              Ask for flight options
            </a>
          </div>
        </div>
      </section>

      {/* 04 Questions and every way to reach an advisor */}
      <section className="py-section" aria-labelledby="faq-h">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-h" className="mt-3 text-h2">
              Rather talk it through?
            </h2>
            <p className="mt-4 max-w-[34rem]">Call, message or visit: an advisor can check a route with you before you send anything.</p>
            <ContactPanel message="Hello HIJRA, I would like help with a flight ticket." className="mt-8" />
          </div>
          <FaqGroups
            className="col-span-full lg:col-span-6 lg:col-start-7"
            groups={[
              { label: 'Flights', items: faqs.flights },
              { label: 'Booking and payment', items: faqs.booking },
            ]}
          />
        </div>
      </section>

      {/* 05 Closing band */}
      <CtaBand
        eyebrow="Plan the whole trip"
        title="Flights are often only the first step."
        body="If the journey also needs a visa, a hotel or a full itinerary, the same advisor can arrange all of it."
        cta="Plan the whole trip"
      />
    </>
  );
}
