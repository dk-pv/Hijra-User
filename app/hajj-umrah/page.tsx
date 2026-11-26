import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { enquiryPath, packagePath, routes } from '@/data/navigation';
import { faqs } from '@/data/faqs';
import { guidanceSteps, hubFaqs } from '@/data/guides';
import { hajjPackages, isListed, umrahPackages } from '@/data/packages';
import { site } from '@/data/site';
import type { ImageKey } from '@/data/images';
import { pageMetadata } from '@/lib/seo';
import { today } from '@/lib/today';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { FaqList } from '@/components/ui/faq';
import { Icon } from '@/components/ui/icons';
import { SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { JourneyBand } from '@/components/pilgrimage/journey-band';
import { RouteSteps } from '@/components/pilgrimage/route-steps';
import { allAirports, byDeparture, dayRange, numberWord, splitDeparture } from '@/components/pilgrimage/trip';

// Hajj & Umrah hub (report 8.6, mock-up 5): Umrah in daylight beside Hajj in the night chapter, then the
// comparison, the six guidance steps, shared questions and the enquiry band.

const IMG: Record<'umrah' | 'hajj', ImageKey> = {
  umrah: 'makkah-haram-aerial',
  hajj: 'hajj-arafat-plain',
};

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.hajjUmrah,
    title: 'Hajj & Umrah from Kerala',
    description:
      'Umrah or Hajj? Compare the two journeys, see upcoming Umrah departures from Kerala, learn how Indian pilgrims register for Hajj and how HIJRA guides you.',
    image: IMG.umrah,
  });
}

const [, hajjSeason] = splitDeparture(hajjPackages[0]?.departure ?? '');

const questions = [hubFaqs.first, faqs.umrah[1], hubFaqs.visaTime, faqs.umrah[2], faqs.branches[0], faqs.booking[0]];

const compare: { topic: string; umrah: ReactNode; hajj: ReactNode }[] = [
  {
    topic: 'When',
    umrah: 'Through the year, except the Hajj season (dates set each year)',
    hajj: 'Once a year, 8–13 Dhul Hijjah. The dates move about eleven days earlier each year',
  },
  {
    topic: 'Length with HIJRA',
    umrah: `${dayRange(umrahPackages)} in the sample packages`,
    hajj: `${dayRange(hajjPackages)} in the sample packages`,
  },
  {
    topic: 'How you go',
    umrah: 'On an Umrah visa, which HIJRA applies for with you',
    hajj: 'Through the Haj Committee of India or a registered Haj Group Organiser, within India’s quota',
  },
  {
    topic: 'Documents',
    umrah: 'Passport valid for at least six months, photographs and vaccination records; we confirm the current list',
    hajj: 'The same, plus whatever your registration route asks for that season',
  },
  {
    topic: 'Good to know',
    umrah: 'Shorter and flexible; families often travel together',
    hajj: 'Physically demanding; registration opens months ahead',
  },
];

export default async function HajjUmrahPage() {
  const day = await today();
  const nextUmrah = byDeparture(umrahPackages.filter((p) => isListed(p, day))).slice(0, 3);
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pilgrimages with HIJRA Travels',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Umrah', url: `${site.url}${routes.umrah}` },
      { '@type': 'ListItem', position: 2, name: 'Hajj', url: `${site.url}${routes.hajj}` },
    ],
  };

  return (
    <>
      {/* Page head */}
      <section className="pt-nav">
        <div className="wrap site-grid items-end gap-y-6 pb-10 pt-6 md:pb-14 lg:pt-10">
          <div className="col-span-full lg:col-span-8">
            <Breadcrumbs items={[{ label: 'Hajj & Umrah' }]} className="rise" />
            <p className="eyebrow rise mt-8">Pilgrimage with HIJRA</p>
            <h1 className="rise rise-2 mt-4 text-display">Hajj &amp; Umrah</h1>
            <p className="rise rise-3 mt-6 max-w-[36rem] text-lead">
              Two journeys, one standard of care. Choose the pilgrimage you are planning, or ask us which suits your family.
            </p>
          </div>
          <a href="#compare" className="link-arrow rise rise-4 col-span-full lg:col-span-4 lg:justify-self-end">
            Not sure? Compare the journeys
          </a>
        </div>
      </section>

      {/* The two journeys */}
      <section aria-label="Choose your journey" className="pb-section">
        <div className="wrap grid items-stretch gap-gutter gap-y-6 md:grid-cols-2">
          <article aria-labelledby="umrah-h" className="flex flex-col overflow-hidden rounded-lg border border-warm-border bg-white">
            <Photo image={IMG.umrah} priority sizes="(min-width: 1200px) 39rem, (min-width: 810px) 48vw, 100vw" className="aspect-[4/3] sm:aspect-[16/10]" />
            <div className="flex flex-1 flex-col px-[22px] pb-8 pt-7 sm:px-8 lg:px-10 lg:pb-11 lg:pt-10">
              <p className="eyebrow">01 · Umrah</p>
              <h2 id="umrah-h" className="mt-3 text-h2">
                Umrah
              </h2>
              <p className="mt-3 max-w-[32rem]">
                Groups travel through the year, on journeys of {dayRange(umrahPackages)} from {numberWord(allAirports(umrahPackages).length)} Kerala airports.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <SampleTag>Sample departures</SampleTag>
                <span className="whitespace-nowrap text-caption text-muted">Fares on enquiry</span>
              </div>
              <ul aria-label="Next Umrah departures (sample)" className="mb-8 mt-3 border-b border-warm-border">
                {nextUmrah.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={packagePath('umrah', p.slug)}
                      className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-t border-warm-border py-3.5 text-small transition-colors hover:bg-warm-grey/60 md:grid-cols-[6.5rem_1fr_auto] lg:grid-cols-[7.5rem_1fr_auto]"
                    >
                      <span className="text-muted">{p.departure}</span>
                      <span className="order-3 col-span-2 md:order-none md:col-span-1">
                        <span className="font-semibold text-navy group-hover:text-red">{p.name}</span>
                        <span className="text-muted"> · {p.days} days</span>
                      </span>
                      <span className="text-right text-muted">On request</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href={enquiryPath('umrah')} className="btn btn-primary">
                  Plan my Umrah
                </Link>
                <Link href={routes.umrah} className="link-arrow">
                  All Umrah departures
                </Link>
              </div>
            </div>
          </article>

          <article aria-labelledby="hajj-h" className="on-dark flex flex-col overflow-hidden rounded-lg bg-deep">
            <Photo image={IMG.hajj} sizes="(min-width: 1200px) 39rem, (min-width: 810px) 48vw, 100vw" className="aspect-[4/3] sm:aspect-[16/10]" />
            <div className="flex flex-1 flex-col px-[22px] pb-8 pt-7 sm:px-8 lg:px-10 lg:pb-11 lg:pt-10">
              <p className="eyebrow">02 · Hajj</p>
              <h2 id="hajj-h" className="mt-3 text-h2">
                Hajj
              </h2>
              <p className="mt-3 max-w-[32rem]">Once a year, in Dhul Hijjah. We explain registration and prepare you for every day of the rites.</p>
              <dl className="mb-8 mt-7 border-b border-white/15 text-small">
                <div className="grid gap-x-4 gap-y-1 border-t border-white/15 py-3.5 md:grid-cols-[6.5rem_1fr] lg:grid-cols-[7.5rem_1fr]">
                  <dt>Next season</dt>
                  <dd className="font-semibold text-warm-white">Hajj {hajjSeason}</dd>
                </div>
                <div className="grid gap-x-4 gap-y-1 border-t border-white/15 py-3.5 md:grid-cols-[6.5rem_1fr] lg:grid-cols-[7.5rem_1fr]">
                  <dt>Registration</dt>
                  <dd className="text-warm-white">
                    Haj Committee of India or a registered Haj Group Organiser. Your advisor explains which applies to you.
                  </dd>
                </div>
                <div className="grid gap-x-4 gap-y-1 border-t border-white/15 py-3.5 md:grid-cols-[6.5rem_1fr] lg:grid-cols-[7.5rem_1fr]">
                  <dt>Group dates</dt>
                  <dd>
                    <span className="flex items-center gap-2 font-semibold text-warm-white">
                      <span aria-hidden="true" className="size-2 rounded-full bg-sand" />
                      Not announced yet
                    </span>
                    <span className="mt-1 block">Register your interest and an advisor will contact you as soon as HIJRA confirms them.</span>
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href={enquiryPath('hajj')} className="btn btn-light">
                  Register your interest
                </Link>
                <Link href={routes.hajj} className="link-arrow">
                  Hajj details
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Compare the journeys */}
      <section id="compare" className="bg-warm-grey py-section" aria-labelledby="compare-h">
        <div className="wrap">
          <p className="eyebrow">Compare the journeys</p>
          <h2 id="compare-h" className="mt-3 text-h2">
            Which pilgrimage are you planning?
          </h2>
          <table role="table" className="mt-10 w-full border-collapse text-left text-small md:mt-12 md:text-ui">
            <caption className="sr-only">Umrah and Hajj compared: when, how long, how you go, documents and what to know</caption>
            <thead role="rowgroup">
              <tr role="row" className="grid grid-cols-2 gap-x-4 border-b border-warm-border pb-3 md:table-row md:pb-0">
                <td role="cell" className="hidden md:table-cell md:w-[22%]" />
                {['Umrah', 'Hajj'].map((h) => (
                  <th key={h} role="columnheader" scope="col" className="text-caption font-semibold uppercase tracking-[0.12em] text-muted md:pb-3.5 md:pr-6">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody role="rowgroup">
              {compare.map((r) => (
                <tr key={r.topic} role="row" className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-warm-border py-4 md:table-row md:py-0">
                  <th
                    role="rowheader"
                    scope="row"
                    className="col-span-2 text-caption font-semibold uppercase tracking-[0.08em] text-muted md:w-[22%] md:py-5 md:pr-6 md:align-top md:text-ui md:normal-case md:tracking-normal md:text-navy"
                  >
                    {r.topic}
                  </th>
                  <td role="cell" className="text-slate md:py-5 md:pr-6 md:align-top">
                    {r.umrah}
                  </td>
                  <td role="cell" className="text-slate md:py-5 md:pr-6 md:align-top">
                    {r.hajj}
                  </td>
                </tr>
              ))}
              <tr role="row" className="grid grid-cols-2 gap-x-4 pt-3 md:table-row md:pt-0">
                <th role="rowheader" scope="row" className="sr-only md:not-sr-only md:w-[22%] md:py-4 md:pr-6 md:text-left md:align-middle md:font-semibold md:text-navy">
                  Next step
                </th>
                <td role="cell" className="md:py-4 md:pr-6">
                  <Link href={routes.umrah} className="link-arrow">
                    Explore Umrah
                  </Link>
                </td>
                <td role="cell" className="md:py-4 md:pr-6">
                  <Link href={routes.hajj} className="link-arrow">
                    Explore Hajj
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-6 max-w-[44rem] text-small text-muted">
            Religious wording to be reviewed by HIJRA’s adviser before publishing. Trip lengths come from the sample packages until HIJRA’s package data replaces them.
          </p>
        </div>
      </section>

      {/* How HIJRA guides you */}
      <section className="py-section" aria-labelledby="steps-h">
        <div className="wrap">
          <p className="eyebrow">How HIJRA guides you</p>
          <h2 id="steps-h" className="mt-3 text-h2">
            Six steps, one team.
          </h2>
          <RouteSteps steps={guidanceSteps} label="How HIJRA guides you, from enquiry to return" className="mt-12 md:mt-14" />
        </div>
      </section>

      {/* Questions */}
      <section className="pb-section" aria-labelledby="questions-h">
        <div className="wrap">
          <p className="eyebrow">Questions</p>
          <h2 id="questions-h" className="mt-3 text-h2">
            Before you decide.
          </h2>
          <div className="mt-9 grid gap-x-12 lg:grid-cols-2">
            <FaqList items={questions.slice(0, 3)} className="[&>.faq-item:last-child]:border-b-0 lg:[&>.faq-item:last-child]:border-b" />
            <FaqList items={questions.slice(3)} />
          </div>
        </div>
      </section>

      {/* Read before you go */}
      <section aria-label="Pilgrim Guide and Pilgrim Stories" className="pb-16 md:pb-20">
        <div className="wrap grid gap-gutter md:grid-cols-2">
          {[
            { href: routes.pilgrimGuide, icon: 'compass' as const, title: 'The Pilgrim Guide', text: 'Checklists, documents, packing and the rites, step by step.' },
            { href: routes.pilgrimStories, icon: 'chat' as const, title: 'Pilgrim stories', text: 'Journeys of families from Kerala, in their own words.' },
          ].map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center gap-5 rounded-md border border-warm-border bg-white px-6 py-6 transition-colors hover:border-navy md:px-7"
            >
              <Icon name={s.icon} size={28} className="shrink-0 text-navy" />
              <span className="flex-1">
                <span className="block font-serif text-h4 font-semibold text-navy">{s.title}</span>
                <span className="mt-1 block text-small text-muted">{s.text}</span>
              </span>
              <Icon name="arrowRight" className="shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <JourneyBand title="Not sure which journey fits?" body="Ask an advisor. Nothing is booked or paid online." />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, '\\u003c') }} />
    </>
  );
}
