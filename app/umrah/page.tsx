import Link from 'next/link';
import type { Metadata } from 'next';
import { packagePath, routes } from '@/data/navigation';
import { branches } from '@/data/branches';
import { faqs } from '@/data/faqs';
import { umrahRites } from '@/data/guides';
import { isListed, shownStatus, umrahPackages } from '@/data/packages';
import { site } from '@/data/site';
import { stories } from '@/data/stories';
import type { ImageKey } from '@/data/images';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { today } from '@/lib/today';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { FaqGroups } from '@/components/ui/faq';
import { Icon } from '@/components/ui/icons';
import { Note, SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { EnquiryForm } from '@/components/forms/enquiry-form';
import { articleLinks, LinkIndex } from '@/components/pilgrimage/link-index';
import { PackageFolio } from '@/components/pilgrimage/package-folio';
import { StoryCard } from '@/components/pilgrimage/story-card';
import { allAirports, byDeparture, numberWord, orList } from '@/components/pilgrimage/trip';
import { ContactValue } from '@/components/ui/contact-value';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Umrah (report 8.2): the premium Umrah service page. An editorial sequence: the opening, why HIJRA, the rites
// in the night chapter, the packages, what HIJRA arranges, preparation, families, stories, questions, enquiry.

const IMG: Record<'hero' | 'rites' | 'arranged', ImageKey> = {
  hero: 'makkah-tawaf-night',
  rites: 'makkah-masa-safa-marwa',
  arranged: 'makkah-haram-clock-tower-night',
};

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.umrah,
    title: 'Umrah packages from Kerala',
    description:
      'Umrah from Kerala with HIJRA Travels: the rites explained step by step, sample packages, flights, hotels, transfers and visa help. Enquire today.',
    image: IMG.hero,
  });
}

const familyStory = stories.find((s) => s.slug === 'three-generations');
// Three Umrah stories whose photographs differ from this page's own (the Ramadan story shares the clock tower).
const shownStories = ['at-her-own-pace', 'the-questions-we-were-shy-to-ask', 'nine-days-unhurried']
  .map((slug) => stories.find((s) => s.slug === slug))
  .filter((s) => s !== undefined);

const reasons = [
  { title: 'Every step explained', text: 'Before you fly and while you are there. No question is too small.' },
  { title: 'A pace that suits your family', text: 'Madinah first or Makkah first, free afternoons, and time to rest before the rites.' },
  { title: 'One advisor who knows your plans', text: 'From the first question to the journey home, you deal with someone who knows who is travelling.' },
  { title: 'Enquiry first', text: 'Nothing is booked or paid online. Dates, rooms and fares are confirmed with you before anything is booked.' },
  { title: 'Branches across Kerala', text: 'Sit down with an advisor near home. Families often come together to plan.' },
];

const arranged = [
  {
    title: 'Flights from Kerala',
    text: `Return economy flights from ${orList(allAirports(umrahPackages))}, with the route, the timings and the baggage explained before you confirm.`,
    link: { href: routes.flights, label: 'Flight tickets' },
  },
  {
    title: 'Stays in Makkah and Madinah',
    text: 'Hotels as listed for each package, and how far each one is from the Haram, explained before you choose. Family rooms, and rooms near the lift for older parents, on request.',
  },
  {
    title: 'Transport and ziyarat',
    text: 'Airport transfers and the journey between Makkah and Madinah by coach, with ziyarat visits to the historic sites of both cities.',
  },
  {
    title: 'Visa assistance',
    text: 'We check your documents first, then apply for the Umrah visa with you. Requirements change, so we confirm the current list when you apply; the decision rests with the Saudi authorities.',
    link: { href: routes.visa, label: 'Visa assistance' },
  },
];

const countdown = [
  { when: 'When you enquire', items: ['Choose the month, the package and who is travelling', 'Check every passport: valid for at least six months', 'Ask about rooms, pace and assistance'] },
  { when: '4 to 8 weeks before', items: ['Hand in documents and photographs for the visa', 'Arrange the vaccinations required, with certificates', 'See your doctor for a check-up'] },
  { when: 'The last two weeks', items: ['Join the session before departure', 'Pack ihram clothes, medicines and sandals you have worn in', 'Arrange money and a phone plan'] },
  { when: 'The day you fly', items: ['Keep passport, visa and tickets in one pouch', 'If Makkah comes first, change into ihram before boarding', 'Keep HIJRA’s contact numbers to hand'] },
];

const care = [
  {
    title: 'With older parents',
    items: [
      'An unhurried itinerary, with one main visit a day',
      'Wheelchair assistance requested at airports and in the holy mosques, where available',
      'Rooms near the lift or on a lower floor, on request',
      'A briefing for the family member who travels with them',
    ],
  },
  {
    title: 'With children',
    items: ['Departures in the school holidays', 'Family rooms on request', 'Children’s questions welcome at the briefing', 'Free afternoons, so that nobody is rushed'],
  },
  {
    title: 'As a group',
    items: ['One itinerary for a family, friends or a community group', 'One advisor for everyone, from enquiry to return', 'Rooms close together, where the hotel allows', 'Group guidance before departure'],
  },
];

export default async function UmrahPage() {
  const t = dictionary;
  // Packages still to depart, soonest first; departed ones leave the page (lib/today.ts).
  const day = await today();
  const packages = byDeparture(umrahPackages).filter((p) => isListed(p, day));
  const next = packages[0];

  return (
    <>
      {/* 01 Opening */}
      <section className="pt-nav">
        <div className="wrap pt-6 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Hajj & Umrah', href: routes.hajjUmrah }, { label: 'Umrah' }]} className="rise" />
          <div className="site-grid mt-8 items-end gap-y-7 md:mt-10">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow rise">Umrah with HIJRA</p>
              <h1 className="rise rise-2 mt-4 text-display">Umrah, with every step explained.</h1>
            </div>
            <div className="col-span-full md:col-span-6 lg:col-span-5 lg:col-start-8 lg:pb-2">
              <p className="rise rise-3 text-lead">
                HIJRA arranges your Umrah from Kerala: the visa, the flights, rooms in Makkah and Madinah, and an advisor who explains each
                rite.
              </p>
              <div className="rise rise-4 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#enquiry" className="btn btn-primary">
                  Plan my Umrah
                </a>
                <ContactAction kind="whatsapp" className="btn btn-outline">
                  <Icon name="whatsapp" className="wa-mark" />
                  {t.common.whatsappUs}
                </ContactAction>
              </div>
            </div>
          </div>

          <figure className="relative mt-10 md:mt-14 lg:mb-8">
            <Photo
              image={IMG.hero}
              priority
              sizes="(min-width: 1280px) 80rem, 100vw"
              className="aspect-[4/3] rounded-[18px] sm:aspect-[16/10] md:rounded-lg lg:aspect-[21/9]"
            />
            {next ? (
              <figcaption className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between lg:absolute lg:-bottom-8 lg:left-8 lg:mt-0 lg:block lg:w-[22rem] lg:rounded-md lg:bg-white lg:px-6 lg:py-5">
                <span>
                  <span className="flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.12em] text-muted">
                    Next departure <SampleTag className="normal-case tracking-normal">Sample</SampleTag>
                  </span>
                  <Link href={packagePath('umrah', next.slug)} className="mt-1.5 block font-serif text-h4 font-semibold text-navy hover:text-red">
                    {next.departure}: {next.name}
                  </Link>
                </span>
                <a href="#packages" className="link-arrow text-small lg:mt-1">
                  All {packages.length} packages
                </a>
              </figcaption>
            ) : null}
          </figure>
        </div>
      </section>

      {/* 02 Why HIJRA */}
      <section className="py-section" aria-labelledby="why-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">Why HIJRA for Umrah</p>
            <h2 id="why-h" className="mt-3 text-h2">
              The rites are yours. We take care of everything around them.
            </h2>
            <p className="mt-5 max-w-[30rem] text-muted">
              Umrah can be made through most of the year, outside the Hajj season. What makes it calm is the preparation: the right month, the right pace and
              someone to ask.
            </p>
          </div>
          <ol className="col-span-full border-b border-warm-border lg:col-span-6 lg:col-start-7">
            {reasons.map((r, i) => (
              <li key={r.title} className="grid grid-cols-[2.75rem_1fr] gap-x-4 border-t border-warm-border py-6 md:grid-cols-[4rem_1fr]">
                <span className="font-serif text-h4 font-semibold leading-tight text-red">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-sans text-ui font-semibold leading-snug text-navy md:text-[1.0625rem]">{r.title}</h3>
                  <p className="mt-1 text-small text-muted">{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 The rites, in the night chapter */}
      <section id="rites" className="on-dark bg-deep py-section" aria-labelledby="rites-h">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="rule-double mb-5" aria-hidden="true" />
              <p className="eyebrow">The journey</p>
              <h2 id="rites-h" className="mt-3 text-h2">
                The rites of Umrah, in order.
              </h2>
              <p className="mt-4 max-w-[30rem] text-lead">Four rites, usually completed in a few hours. The session before departure goes through each one with you.</p>
              <Photo
                image={IMG.rites}
                sizes="(min-width: 1200px) 34vw, 100vw"
                className="reveal-img mt-9 aspect-[16/10] rounded-lg lg:aspect-[4/5] lg:max-h-[26rem] lg:w-full"
              />
            </div>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <ol aria-label="The rites of Umrah" className="relative pl-12 md:pl-16">
              <span aria-hidden="true" className="absolute bottom-3 left-[6px] top-3 w-[5px] border-x border-sand md:left-[10px]" />
              {umrahRites.map((r, i) => (
                <li
                  key={r.id}
                  className="relative pb-11 last:pb-0 before:absolute before:-left-12 before:top-2 before:size-[17px] before:rounded-full before:border-2 before:border-sand before:bg-deep md:pb-14 md:before:-left-[60px]"
                >
                  <p className="flex items-baseline gap-4">
                    <span className="font-serif text-[clamp(2.25rem,1.9rem+1.2vw,3rem)] font-semibold leading-none text-warm-white/30">{i + 1}</span>
                    <span className="text-caption font-semibold uppercase tracking-[0.12em] text-sand">{r.where}</span>
                  </p>
                  <h3 className="mt-3 text-h3">{r.name}</h3>
                  <p className="mt-3 max-w-[34rem]">{r.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 border-t border-dashed border-white/25 pt-8 md:ml-16">
              <h3 className="text-h4">Then, Madinah</h3>
              <p className="mt-2 max-w-[34rem]">
                A visit to Madinah and Masjid an-Nabawi is not one of the rites of Umrah, but many pilgrims make it, before or after Makkah. Every package on this page
                includes time there, with ziyarat to the historic sites.
              </p>
            </div>
            <Note tone="dark" className="mt-10 md:ml-16">
              We describe practice, not rulings: for religious rulings, follow the scholars you trust. This guide is reviewed by HIJRA’s religious adviser before
              launch.
            </Note>
          </div>
        </div>
      </section>

      {/* 04 Packages */}
      <section id="packages" className="py-section" aria-labelledby="packages-h">
        <div className="wrap">
          <div className="site-grid items-end gap-y-6">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow">Packages</p>
              <h2 id="packages-h" className="mt-3 text-h2">
                Choose your Umrah.
              </h2>
              <p className="mt-4 max-w-[38rem] text-lead">
                {packages.length
                  ? `${cap(numberWord(packages.length))} upcoming ${packages.length === 1 ? 'departure' : 'departures'}, by month, length and pace. Open any package for the journey, what is included and how to enquire.`
                  : 'New departures are announced through the year. Tell us the month you have in mind and an advisor will let you know.'}
              </p>
            </div>
            <Note className="col-span-full md:col-span-6 lg:col-span-4 lg:col-start-9">
              Sample packages: names, months and lengths show the layout. HIJRA’s package data replaces them, and fares are always confirmed on enquiry.
            </Note>
          </div>
          <div className="mt-10 grid gap-5 md:mt-14 md:gap-6">
            {packages.map((p) => (
              <PackageFolio key={p.slug} p={p} status={shownStatus(p, day)} />
            ))}
          </div>
        </div>
      </section>

      {/* 05 What HIJRA arranges */}
      <section className="bg-warm-grey py-section" aria-labelledby="arranged-h">
        <div className="wrap site-grid items-start gap-y-10">
          <figure className="col-span-full md:col-span-4 lg:col-span-5 lg:sticky lg:top-28">
            <Photo image={IMG.arranged} sizes="(min-width: 1200px) 34vw, (min-width: 810px) 45vw, 100vw" className="reveal-img aspect-[4/3] rounded-lg md:aspect-[4/5]" />
          </figure>
          <div className="col-span-full md:col-span-4 lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Arranged for you</p>
            <h2 id="arranged-h" className="mt-3 text-h2">
              Everything around the rites, arranged.
            </h2>
            <dl className="mt-9 border-b border-warm-border">
              {arranged.map((a) => (
                <div key={a.title} className="border-t border-warm-border py-6">
                  <dt className="font-serif text-h4 font-semibold text-navy">{a.title}</dt>
                  <dd className="mt-2">
                    <p>{a.text}</p>
                    {a.link ? (
                      <Link href={a.link.href} className="link-arrow mt-1 text-small">
                        {a.link.label}
                      </Link>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 06 Preparation */}
      <section className="py-section" aria-labelledby="prepare-h">
        <div className="wrap">
          <div className="site-grid items-end gap-y-6">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow">Preparation</p>
              <h2 id="prepare-h" className="mt-3 text-h2">
                Prepared before you fly.
              </h2>
              <p className="mt-4 max-w-[38rem] text-lead">
                Guidance starts long before the airport: a consultation, the session before departure and a checklist you can tick off at home.
              </p>
            </div>
            <Link href={`${routes.pilgrimGuide}#checklist`} className="link-arrow col-span-full lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              The full checklist, printable
            </Link>
          </div>
          <ol className="mt-12 grid border-t-2 border-navy md:mt-14 md:grid-cols-2 lg:grid-cols-4">
            {countdown.map((c, i) => (
              <li
                key={c.when}
                className={[
                  'border-b border-warm-border py-7 md:px-6 md:first:pl-0 lg:border-b-0 lg:py-8',
                  i % 2 ? 'md:border-l' : '',
                  i > 0 ? 'lg:border-l' : '',
                  i === 2 ? 'md:pl-0 lg:pl-6' : '',
                ].join(' ')}
              >
                <span className="text-caption font-semibold uppercase tracking-[0.12em] text-red">Step {i + 1}</span>
                <h3 className="mt-2 text-h4">{c.when}</h3>
                <ul className="mt-4 grid gap-2.5 text-small">
                  {c.items.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <Icon name="check" size={18} className="mt-0.5 shrink-0 text-navy" />
                      {x}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-small text-muted">A suggested timeline. Visa and health requirements change: your advisor confirms the current ones when you apply.</p>
        </div>
      </section>

      {/* 07 Families and groups */}
      <section id="families" className="pb-section" aria-labelledby="families-h">
        <div className="wrap">
          <div className="rounded-lg border border-warm-border bg-white px-5 py-10 sm:px-8 md:px-12 md:py-14 lg:px-16">
            <div className="site-grid gap-y-8">
              <div className="col-span-full lg:col-span-5">
                <p className="eyebrow">Families and groups</p>
                <h2 id="families-h" className="mt-3 text-h2">
                  Travelling with parents and children.
                </h2>
              </div>
              {familyStory ? (
                <figure className="col-span-full lg:col-span-6 lg:col-start-7">
                  <blockquote className="font-serif text-[clamp(1.3125rem,1.1rem+0.6vw,1.75rem)] font-semibold leading-[1.3] text-navy">
                    <span className="text-red" aria-hidden="true">
                      “
                    </span>
                    {familyStory.quote}
                    <span className="text-red" aria-hidden="true">
                      ”
                    </span>
                  </blockquote>
                  <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-small text-muted">
                    {familyStory.who}
                    <SampleTag>Sample story</SampleTag>
                    <Link href={`${routes.pilgrimStories}#${familyStory.slug}`} className="link-arrow">
                      Read their story
                    </Link>
                  </figcaption>
                </figure>
              ) : null}
            </div>
            <div className="mt-10 grid gap-x-10 border-t border-warm-border md:mt-12 lg:grid-cols-3">
              {care.map((c, i) => (
                <div key={c.title} className={['pt-8', i ? 'mt-8 border-t border-warm-border lg:mt-0 lg:border-l lg:border-t-0 lg:pl-10' : ''].join(' ')}>
                  <h3 className="text-h4">{c.title}</h3>
                  <ul className="mt-4 grid gap-2.5 text-small">
                    {c.items.map((x) => (
                      <li key={x} className="flex gap-2.5">
                        <Icon name="check" size={18} className="mt-0.5 shrink-0 text-red" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-9 text-small text-muted">
              Assistance at airports and in the mosques is requested on your behalf and depends on availability. Tell us about any health or mobility needs when you
              enquire.
            </p>
          </div>
        </div>
      </section>

      {/* 08 Pilgrim stories */}
      <section className="bg-warm-grey py-section" aria-labelledby="stories-h">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">In their words</p>
                <SampleTag>Sample stories</SampleTag>
              </div>
              <h2 id="stories-h" className="mt-3 text-h2">
                Umrah, as families tell it.
              </h2>
            </div>
            <Link href={routes.pilgrimStories} className="link-arrow">
              All pilgrim stories
            </Link>
          </div>
          <div className="site-grid mt-10 gap-y-12 md:mt-14">
            {shownStories[0] ? (
              <StoryCard story={shownStories[0]} size="large" sizes="(min-width: 1200px) 46vw, 100vw" className="col-span-full lg:col-span-7" />
            ) : null}
            <div className="col-span-full grid gap-12 md:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
              {shownStories.slice(1).map((s) => (
                <StoryCard key={s.slug} story={s} sizes="(min-width: 1200px) 26vw, (min-width: 810px) 45vw, 100vw" />
              ))}
            </div>
          </div>
          <p className="mt-12 max-w-[44rem] text-small text-muted">
            At launch, only stories pilgrims have agreed in writing to share are published. Photographs show the places, not the pilgrims.
          </p>
        </div>
      </section>

      {/* 09 Questions and guides */}
      <section className="py-section" aria-labelledby="faq-h">
        <div className="wrap site-grid gap-y-12 lg:items-start">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-h" className="mt-3 text-h2">
              Questions about Umrah.
            </h2>
            <p className="mt-4 text-small text-muted">Visa, health and travel rules change: we confirm the current ones with you when you apply.</p>
          </div>
          <FaqGroups
            className="col-span-full lg:col-span-7 lg:col-start-6 lg:row-span-2"
            groups={[
              { label: 'Umrah', items: faqs.umrah },
              { label: 'Documents and health', items: faqs.documents },
            ]}
          />
          <div className="col-span-full lg:col-span-4 lg:row-start-2">
            <h3 className="font-sans text-caption font-semibold uppercase tracking-[0.12em] text-muted">Read before you go</h3>
            <LinkIndex
              label="Related guides"
              className="mt-3"
              links={[
                { href: `${routes.pilgrimGuide}#umrah`, label: 'Umrah preparation guide', text: 'Pilgrim Guide' },
                { href: `${routes.pilgrimGuide}#checklist`, label: 'The travel checklist, printable', text: 'Pilgrim Guide' },
                ...articleLinks(['umrah-with-elderly-parents', 'umrah-visa-documents-india']),
                { href: routes.blogs, label: 'All articles on our blog' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* 10 Enquiry */}
      <section id="enquiry" className="bg-warm-grey py-section" aria-labelledby="enquiry-h">
        <div className="wrap site-grid items-start gap-y-10">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">Enquiry</p>
            <h2 id="enquiry-h" className="mt-3 text-h2">
              Plan your Umrah with an advisor.
            </h2>
            <p className="mt-4 text-lead">
              Tell us the month and who is travelling. An advisor replies by your preferred method{site.contact.replyTime ? `, ${site.contact.replyTime}` : ''}.
            </p>
            <ol className="mt-8 grid gap-4 text-small">
              {['We reply on WhatsApp, by phone or by email.', 'We confirm dates, rooms and the fare with you.', 'Nothing is booked or paid until you agree.'].map((x, i) => (
                <li key={x} className="flex items-baseline gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-navy text-caption font-semibold text-navy">{i + 1}</span>
                  {x}
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col border-t border-warm-border pt-6">
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
            source="umrah"
            services={['umrah']}
            defaultService="umrah"
            packages={packages.map((p) => ({ slug: p.slug, name: p.name, service: p.service }))}
            branches={branches.map((b) => ({ slug: b.slug, name: b.name }))}
            className="col-span-full lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7"
          />
        </div>
      </section>
    </>
  );
}
