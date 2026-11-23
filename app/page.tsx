import Link from 'next/link';
import type { Metadata } from 'next';
import { branchPath, enquiryPath, routes } from '@/data/navigation';
import { branchArea, branches, formatAddress } from '@/data/branches';
import { faqs } from '@/data/faqs';
import { site } from '@/data/site';
import { demo } from '@/data/demo';
import { testimonials } from '@/data/testimonials';
import type { ImageKey } from '@/data/images';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { Departures } from '@/components/home/departures';
import { HeroPanel } from '@/components/home/hero-panel';
import { ToursMosaic } from '@/components/home/tours-mosaic';
import { Guides } from '@/components/home/guides';
import { ContactAction } from '@/components/ui/contact-action';
import { FaqGroups } from '@/components/ui/faq';
import { Icon } from '@/components/ui/icons';
import { KeralaMap } from '@/components/ui/kerala-map';
import { Pending, SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { SectionIntro } from '@/components/ui/section';
import { EnquiryForm } from '@/components/forms/enquiry-form';
import { umrahPackages, hajjPackages } from '@/data/packages';
import { ContactValue } from '@/components/ui/contact-value';

// Homepage (report 7.3, mock-up 2): the split pilgrimage hero, the trust ledger, Umrah departures, the Hajj night
// chapter, HIJRA's story, pilgrim voices, branches, tours, flight and visa, guides, questions and the enquiry.

const IMG: Record<'umrahHero' | 'hajjHero' | 'umrah' | 'hajj', ImageKey> = {
  umrahHero: 'madinah-green-dome',
  hajjHero: 'hajj-arafat-jabal-rahmah',
  umrah: 'makkah-kaaba-tawaf',
  hajj: 'hajj-pilgrims-jamarat',
};

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.home,
    title: 'HIJRA Travels | Hajj & Umrah specialists from Kerala',
    description:
      'HIJRA Travels guides families from Kerala on Umrah and Hajj, with an advisor beside you from enquiry to return, plus tours, flight tickets and visa help. Enquire today.',
    image: IMG.umrahHero,
  });
}

const hajjDays = [
  { when: '8 Dhul Hijjah', title: 'Mina', text: 'Pilgrims gather in the tents of Mina and prepare.' },
  { when: '9 Dhul Hijjah', title: 'Arafat', text: 'The standing at Arafat, the heart of Hajj.' },
  { when: 'Night of the 9th', title: 'Muzdalifah', text: 'A night under the open sky.' },
  { when: '10 Dhul Hijjah', title: 'Jamarat, sacrifice and Tawaf', text: 'The rites of the day of Eid.' },
  { when: '11–13 Dhul Hijjah', title: 'Days of Tashreeq', text: 'The final days in Mina.' },
];

const reasons = [
  { icon: 'chat', title: 'Guidance at every step', text: 'Advisors explain every step before you travel, and stay in touch while you are away.' },
  { icon: 'pin', title: 'Branches you can visit', text: 'Sit down with an advisor near home. Families often come together to plan.' },
  { icon: 'shield', title: 'Enquiry first', text: 'Nothing is booked or paid online. We confirm dates, rooms and fares with you first.' },
  { icon: 'heart', title: 'Care for every age', text: 'Unhurried itineraries for older pilgrims and families with children, on request.' },
] as const;

export default function HomePage() {
  const t = dictionary;
  const quote = testimonials.find((x) => x.featured) ?? testimonials[0];
  const moreQuotes = testimonials.filter((x) => x !== quote).slice(0, 2);
  const years = site.facts.yearsOfExperience;
  const headOffice = branches.find((b) => b.isHeadOffice);
  // The leadership's opening line: HIJRA's own words when supplied; a demonstration line in preview builds.
  const letterLead = site.demo ? demo.letter.lead : null;

  return (
    <>
      {/* 01 Pilgrimage diptych */}
      <section className="pt-nav">
        <div className="wrap site-grid items-end gap-y-10 pt-6 lg:pt-10">
          <div className="col-span-full lg:col-span-5 lg:pb-16">
            <p className="eyebrow rise">Hajj and Umrah specialists · Kerala</p>
            <h1 className="rise rise-2 mt-5 text-display">Umrah and Hajj, guided with care.</h1>
            <p className="rise rise-3 mt-6 max-w-[34rem] text-lead">
              From the first question to the journey home, HIJRA guides families from Kerala to Makkah and Madinah.
            </p>
            <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={enquiryPath('umrah')} className="btn btn-primary">
                Plan my Umrah
              </Link>
              <ContactAction kind="whatsapp" className="btn btn-outline">
                <Icon name="whatsapp" className="wa-mark" />
                {t.common.whatsappUs}
              </ContactAction>
            </div>
            <p className="mt-5 text-small text-muted">Enquiries only: an advisor replies with dates and fares.</p>
          </div>
          <div className="col-span-full grid grid-cols-2 items-start gap-3 md:gap-gutter lg:col-span-7 lg:col-start-6">
            <HeroPanel image={IMG.umrahHero} title="Umrah" text="Journeys to Makkah and Madinah" href={routes.umrah} priority focus="50% 40%" />
            <HeroPanel image={IMG.hajjHero} title="Hajj" text="The pilgrimage of a lifetime" href={routes.hajj} className="mt-9 md:mt-[72px]" focus="52% 30%" />
          </div>
        </div>
      </section>

      {/* 02 Trust ledger */}
      <section aria-label="HIJRA at a glance" className="pt-12 md:pt-16">
        <div className="wrap">
          <ul className="grid grid-cols-2 border-y border-warm-border lg:grid-cols-4">
            {[
              {
                fig: years ?? <Pending className="text-[0.62em]">25+ or 30+</Pending>,
                label: 'Years serving pilgrims',
                note: site.facts.yearsIsDemo ? 'Sample figure, to be confirmed by HIJRA' : years ? 'Confirmed by HIJRA' : 'Exact figure to be confirmed by HIJRA',
              },
              // No number until HIJRA confirms the total (site.facts.branchCount).
              site.facts.branchCount
                ? { fig: site.facts.branchCount, label: 'Branches across Kerala', note: headOffice ? `Head office in ${headOffice.name}` : '' }
                : {
                    fig: <span className="text-[0.72em] leading-[1.15]">Across Kerala</span>,
                    label: 'Our branches',
                    note: headOffice ? `Head office in ${headOffice.name}` : '',
                  },
              { fig: <span className="text-[0.72em] leading-[1.15]">Hajj &amp; Umrah</span>, label: 'Our specialisation', note: 'Guidance from enquiry to return' },
              { fig: <span className="text-[0.72em] leading-[1.15]">Enquiry first</span>, label: 'Nothing booked online', note: 'An advisor confirms every detail with you' },
            ].map((c, i) => (
              <li
                key={c.label}
                className={[
                  'py-6 pr-4 md:py-9 md:pr-7',
                  i % 2 ? 'border-l border-warm-border pl-4 md:pl-7' : 'pl-0',
                  i > 1 ? 'border-t border-warm-border lg:border-t-0' : '',
                  i === 2 ? 'lg:border-l lg:pl-7' : '',
                ].join(' ')}
              >
                <p className="flex min-h-[clamp(2.5rem,1.9rem+1.4vw,3.75rem)] items-end font-serif text-[clamp(1.625rem,1.15rem+1.5vw,3rem)] font-semibold leading-none tracking-[-0.01em] text-navy">
                  {c.fig}
                </p>
                <p className="mt-3 font-semibold text-navy">{c.label}</p>
                <p className="mt-1 text-small text-muted">{c.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 Umrah: the departures list */}
      <section className="py-section" aria-labelledby="umrah-h">
        <div className="wrap">
          <SectionIntro rule eyebrow="01 · Umrah" title={<span id="umrah-h">Umrah departures</span>} lead="Compare upcoming departures from Kerala, then ask an advisor about seats and fares." className="mb-10 md:mb-14" />
          <div className="site-grid gap-y-8">
            <Photo
              image={IMG.umrah}
              sizes="(min-width: 1200px) 36vw, (min-width: 810px) 90vw, 100vw"
              className="reveal-img col-span-full aspect-[3/2] rounded-[18px] md:aspect-[16/9] md:rounded-lg lg:col-span-5 lg:aspect-auto lg:min-h-[30rem]"
            />
            <div className="col-span-full lg:col-span-7 lg:pl-6">
              <Departures />
            </div>
          </div>
        </div>
      </section>

      {/* 04 Hajj: the night chapter */}
      <section className="on-dark bg-deep py-section" aria-labelledby="hajj-h">
        <div className="wrap">
          <div className="site-grid items-center gap-y-10">
            <div className="col-span-full lg:col-span-6">
              <span className="rule-double mb-5" aria-hidden="true" />
              <p className="eyebrow">02 · Hajj</p>
              <h2 id="hajj-h" className="mt-3 text-h2">
                Hajj, prepared with reverence.
              </h2>
              <p className="mt-4 max-w-[36rem] text-lead">
                The days of Hajj, explained step by step, with classes before you leave and a group leader beside you throughout.
              </p>
              <p className="mt-6 flex flex-wrap items-center gap-3 text-small">
                <SampleTag>{hajjPackages.length} sample package outlines</SampleTag>
                <Link href={routes.hajj} className="link-arrow">
                  The Hajj journey
                </Link>
              </p>
            </div>
            <Photo
              image={IMG.hajj}
              sizes="(min-width: 1200px) 34vw, 100vw"
              className="reveal-img col-span-full aspect-[16/9] rounded-lg lg:col-span-5 lg:col-start-8 lg:aspect-[4/5]"
            />
          </div>
          <ol className="relative mt-16 grid gap-7 pl-10 md:mt-[88px] lg:grid-cols-5 lg:gap-gutter lg:pl-0 lg:pt-[34px]" aria-label="The days of Hajj">
            <span aria-hidden="true" className="absolute bottom-0 left-[6px] top-0 w-[5px] border-x border-sand lg:inset-x-0 lg:bottom-auto lg:h-[5px] lg:w-auto lg:border-x-0 lg:border-y" />
            {hajjDays.map((d) => (
              <li
                key={d.title}
                className="relative before:absolute before:-left-[38px] before:top-1.5 before:size-[13px] before:rounded-full before:border-2 before:border-sand before:bg-deep lg:before:-top-[38px] lg:before:left-0"
              >
                <span className="block text-caption font-semibold uppercase tracking-[0.1em] text-sand">{d.when}</span>
                <span className="mt-2 block font-serif text-h4 font-semibold text-warm-white">{d.title}</span>
                <p className="mt-2 text-small">{d.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 flex flex-col items-start gap-6 border-t border-white/15 pt-8 lg:mt-[72px] lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[44rem] text-small">
              Indian pilgrims travel through the Haj Committee of India or a registered Haj Group Organiser (HGO).{' '}
              <span className="text-sand">Your advisor confirms which route applies to you.</span>
            </p>
            <Link href={enquiryPath('hajj')} className="btn btn-light shrink-0">
              Register your interest
            </Link>
          </div>
        </div>
      </section>

      {/* 06 Our story, with why families choose HIJRA */}
      <section className="bg-warm-grey py-section" aria-labelledby="story-h">
        <div className="wrap site-grid items-center gap-y-10">
          <figure className="col-span-full md:col-span-6 lg:col-span-5">
            <Photo
              image="kerala-kozhikode-mishkal-mosque"
              sizes="(min-width: 1200px) 40vw, (min-width: 810px) 50vw, 100vw"
              className="aspect-[4/3] rounded-lg md:aspect-[4/5]"
            />
            <figcaption className="mt-3 text-caption text-muted">Mishkal Mosque, Kozhikode, on the Malabar coast.</figcaption>
          </figure>
          <div className="col-span-full md:col-span-8 lg:col-span-6 lg:col-start-7">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Our story</p>
              {letterLead ? <SampleTag>Sample text</SampleTag> : null}
            </div>
            <h2 id="story-h" className="mt-3 text-h2">
              Rooted on the Malabar coast.
            </h2>
            <blockquote className="mt-5">
              <p className="font-serif text-[clamp(1.3125rem,1.1rem+0.6vw,1.75rem)] font-semibold leading-[1.3] text-navy">
                {letterLead ? (
                  <>
                    <span className="text-red" aria-hidden="true">“</span>
                    {letterLead}
                    <span className="text-red" aria-hidden="true">”</span>
                  </>
                ) : (
                  <Pending>A short message from HIJRA’s leadership, in their own words</Pending>
                )}
              </p>
              {letterLead ? <footer className="mt-3 text-small text-muted">{demo.letter.signature}</footer> : null}
            </blockquote>
            <p className="mt-5 max-w-[36rem]">
              HIJRA works the way families in Kerala expect: one advisor who knows your plans, clear answers before anything is booked, and help that continues while you are away.
            </p>
            <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {reasons.map((r) => (
                <li key={r.title} className="flex gap-3">
                  <Icon name={r.icon} className="mt-0.5 shrink-0 text-red" />
                  <div>
                    <h3 className="font-sans text-ui font-semibold text-navy">{r.title}</h3>
                    <p className="mt-1 text-small text-muted">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href={routes.about} className="link-arrow mt-8">
              About HIJRA
            </Link>
          </div>
        </div>
      </section>

      {/* 07 Pilgrim voices */}
      <section className="py-section" aria-labelledby="voices-h">
        <div className="wrap site-grid items-center gap-y-12">
          <div className="col-span-full lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow" id="voices-h">
                Pilgrim voices
              </p>
              <SampleTag>Sample testimonials</SampleTag>
            </div>
            <blockquote className="mt-5">
              <p className="font-serif text-[clamp(1.5rem,1.2rem+0.9vw,2.125rem)] font-semibold leading-[1.22] text-navy">
                <span className="text-red" aria-hidden="true">“</span>
                {quote.quote}
                <span className="text-red" aria-hidden="true">”</span>
              </p>
              <footer className="mt-5 text-small text-muted">{quote.context}</footer>
            </blockquote>
            <p className="mt-6 max-w-[34rem] text-small text-muted">
              At launch this section shows only reviews and stories HIJRA has written consent to publish.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-7">
              <Link href={routes.pilgrimStories} className="link-arrow">
                Pilgrim stories
              </Link>
              <Link href={routes.testimonials} className="link-arrow">
                All testimonials
              </Link>
            </div>
          </div>
          <div className="col-span-full grid gap-8 md:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:grid-cols-1 lg:gap-10">
            {moreQuotes.map((q) => (
              <figure key={q.id} className="border-l-2 border-sand pl-5 md:pl-6">
                <blockquote>
                  <p className="font-serif text-h4 font-semibold leading-[1.35] text-navy">“{q.quote}”</p>
                </blockquote>
                <figcaption className="mt-3 text-caption text-muted">{q.context}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 08 Branches */}
      <section className="bg-warm-grey py-section" aria-labelledby="branches-h">
        <div className="wrap">
          <SectionIntro
            eyebrow="Branches"
            title={<span id="branches-h">Visit us across Kerala.</span>}
            lead="Many families prefer to sit down with an advisor before they travel. Find the branch nearest to you."
            className="mb-10 md:mb-14"
          />
          <div className="site-grid items-start gap-y-10">
            <div className="col-span-full mx-auto w-full max-w-[340px] rounded-lg border border-warm-border bg-[#fdf9f7] px-5 pb-5 pt-6 md:col-span-3 md:max-w-none md:px-7 md:pt-7 lg:col-span-4">
              <KeralaMap />
            </div>
            <div className="col-span-full md:col-span-5 lg:col-span-7 lg:col-start-6">
              <div className="mb-2 flex items-center justify-between gap-3">
                <SampleTag>Branch details to be confirmed</SampleTag>
              </div>
              <ul>
                {branches.slice(0, 3).map((b) => (
                  <li key={b.id} className="grid gap-x-6 gap-y-3 border-t border-warm-border py-6 last:border-b lg:grid-cols-[1fr_auto] lg:items-center">
                    <div>
                      <h3 className="text-h4">
                        <Link href={branchPath(b.slug)} className="hover:text-red">
                          {b.name}
                        </Link>
                        {b.isHeadOffice ? <span className="tagline ml-3 align-middle">Head office</span> : null}
                      </h3>
                      <p className="mt-1 text-small text-muted">
                        {formatAddress(b) ?? (
                          <>
                            {branchArea(b)} · <Pending>Street address to be confirmed</Pending>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex gap-2.5">
                      <ContactAction kind="call" value={b.phone} className="btn btn-secondary btn-sm flex-1 lg:flex-none">
                        <Icon name="phone" />
                        {t.common.call}
                      </ContactAction>
                      <ContactAction kind="whatsapp" value={b.whatsapp} className="btn btn-outline btn-sm flex-1 lg:flex-none">
                        <Icon name="whatsapp" className="wa-mark" />
                        WhatsApp
                      </ContactAction>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href={routes.branches} className="link-arrow mt-6">
                All branches
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 09 Tours */}
      <section className="pt-section" aria-labelledby="tours-h">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4 md:mb-14">
            <SectionIntro eyebrow="Tours" title={<span id="tours-h">Beyond the pilgrimage.</span>} lead="Holidays in Kerala, across India and abroad, planned with the same care: prayer times, food and rest included." />
            <Link href={routes.tours} className="link-arrow">
              View all tours
            </Link>
          </div>
          <ToursMosaic />
        </div>
      </section>

      {/* 10 Flights and visa desk */}
      <section className="py-section" aria-label="Flight tickets and visa assistance">
        <div className="wrap grid gap-gutter md:grid-cols-2">
          {[
            { href: routes.flights, icon: 'plane' as const, title: 'Flight tickets, arranged for you', text: 'Domestic and international fares, group bookings and date changes.' },
            { href: routes.visa, icon: 'passport' as const, title: 'Visa assistance, step by step', text: 'Umrah, visit and tourist visas, with your documents checked first.' },
          ].map((s) => (
            <Link key={s.href} href={s.href} className="group flex items-center gap-5 rounded-md border border-warm-border bg-white px-6 py-6 transition-colors hover:border-navy md:px-7">
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

      {/* 11 Guides */}
      <section className="bg-warm-grey py-section" aria-labelledby="guides-h">
        <div className="wrap">
          <SectionIntro eyebrow="Guides" title={<span id="guides-h">Prepare with confidence.</span>} lead="Plain-language guides for pilgrims and families, reviewed by HIJRA before publication." className="mb-10 md:mb-14" />
          <Guides />
        </div>
      </section>

      {/* 12 FAQ */}
      <section className="py-section" aria-labelledby="faq-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-h" className="mt-3 text-h2">
              Questions families ask.
            </h2>
            <ContactAction kind="whatsapp" className="btn btn-outline mt-7">
              <Icon name="whatsapp" className="wa-mark" />
              Still asking? WhatsApp us
            </ContactAction>
          </div>
          <FaqGroups
            className="col-span-full lg:col-span-7 lg:col-start-6"
            groups={[
              { label: 'Umrah', items: faqs.umrah.slice(0, 2) },
              { label: 'Hajj', items: faqs.hajj.slice(0, 1) },
              { label: 'Documents and booking', items: [faqs.documents[0], faqs.booking[0]] },
            ]}
          />
        </div>
      </section>

      {/* 13 Enquiry */}
      <section id="enquiry" className="bg-warm-grey py-section" aria-labelledby="enquiry-h">
        <div className="wrap site-grid items-start gap-y-10">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">Enquiry</p>
            <h2 id="enquiry-h" className="mt-3 text-h2">
              Tell us about your journey.
            </h2>
            <p className="mt-4 text-lead">
              An advisor replies by your preferred method{site.contact.replyTime ? `, ${site.contact.replyTime}` : ''}. Nothing is booked or paid online.
            </p>
            <div className="mt-7 flex flex-col">
              <ContactAction kind="call" className="flex min-h-11 items-center gap-3 font-semibold text-navy">
                <Icon name="phone" />
                <ContactValue kind="phone" />
              </ContactAction>
              <ContactAction kind="whatsapp" className="flex min-h-11 items-center gap-3 font-semibold text-navy">
                <Icon name="whatsapp" className="text-wa" />
                {t.common.whatsappUs}
              </ContactAction>
              <Link href={routes.branches} className="flex min-h-11 items-center gap-3 font-semibold text-navy">
                <Icon name="pin" />
                Find your nearest branch
              </Link>
            </div>
          </div>
          <EnquiryForm
            t={t.form}
            variant="compact"
            source="home"
            packages={[...umrahPackages, ...hajjPackages].map((p) => ({ slug: p.slug, name: p.name, service: p.service }))}
            className="col-span-full lg:col-span-6 lg:col-start-7"
          />
        </div>
      </section>
    </>
  );
}
