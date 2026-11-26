import Link from 'next/link';
import type { Metadata } from 'next';
import { branchPath, enquiryPath, routes } from '@/data/navigation';
import { branches } from '@/data/branches';
import { faqs } from '@/data/faqs';
import { hajjDays, hajjPreparation } from '@/data/guides';
import { hajjPackages, isListed, shownStatus } from '@/data/packages';
import type { ImageKey } from '@/data/images';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { today } from '@/lib/today';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { CtaBand } from '@/components/ui/cta-band';
import { FaqGroups } from '@/components/ui/faq';
import { Icon } from '@/components/ui/icons';
import { Note, SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { articleLinks, LinkIndex } from '@/components/pilgrimage/link-index';
import { PackageFolio } from '@/components/pilgrimage/package-folio';
import { splitDeparture } from '@/components/pilgrimage/trip';

// Hajj (report 8.2): graver and ceremonial. The night opening, what Hajj is, the days of Hajj in depth, the two
// registration routes for Indian pilgrims, preparation, the route between the holy sites, support, package
// outlines, questions, branches and "Register your interest".

const IMG: Record<'hero' | 'support', ImageKey> = {
  hero: 'hajj-mina-tent-city',
  support: 'madinah-nabawi-golden-hour',
};

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.hajj,
    title: 'Hajj from Kerala: registration and preparation',
    description:
      'Prepare for Hajj with HIJRA Travels: the days of Hajj explained, how Indian pilgrims register, a preparation timeline, sample package outlines and support.',
    image: IMG.hero,
  });
}

const [, season] = splitDeparture(hajjPackages[0]?.departure ?? '');
const days = hajjDays.filter((d) => d.date);
const farewell = hajjDays.find((d) => !d.date);

const route = [
  { place: 'Kerala', text: 'Your flight, with the group' },
  { place: 'Makkah', text: 'The days before Hajj, near the Haram or in Azizia' },
  { place: 'Mina', text: 'Tents, from the 8th' },
  { place: 'Arafat', text: 'The 9th, until sunset' },
  { place: 'Muzdalifah', text: 'The night, under the open sky' },
  { place: 'Mina', text: 'The 10th to the 12th or 13th' },
  { place: 'Makkah', text: 'Tawaf, and the farewell' },
  { place: 'Madinah', text: 'Before or after Hajj' },
];

const support = [
  { title: 'Classes before departure', text: 'Walking through each day of Hajj, what to carry and how the group moves.' },
  { title: 'A group leader', text: 'With the group through the days of Hajj, keeping the practical side moving so that you can pray.' },
  { title: 'Care for older pilgrims', text: 'Assistance requested where it is available, and a pace planned around who is travelling.' },
  { title: 'Health and documents', text: 'Vaccinations, medicines and paperwork checked with you before you leave.' },
];

export default async function HajjPage() {
  const t = dictionary;
  // Packages still to depart; departed ones leave the page (lib/today.ts).
  const day = await today();
  const listed = hajjPackages.filter((p) => isListed(p, day));

  return (
    <>
      {/* 01 Night opening */}
      <section className="on-dark bg-deep pt-nav">
        <div className="wrap pb-section pt-6 lg:pt-10">
          <Breadcrumbs onDark items={[{ label: 'Hajj & Umrah', href: routes.hajjUmrah }, { label: 'Hajj' }]} className="rise" />
          <div className="mx-auto mt-12 max-w-[52rem] text-center md:mt-16">
            <span className="rule-double rise mx-auto mb-6" aria-hidden="true" />
            <p className="eyebrow rise">Hajj with HIJRA</p>
            <h1 className="rise rise-2 mt-5 font-serif text-[clamp(3.75rem,2.2rem+7.6vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.025em]">Hajj</h1>
            <p className="rise rise-2 mt-5 font-serif text-[clamp(1.5rem,1.2rem+1.1vw,2.25rem)] font-semibold leading-tight text-warm-white">
              Once in a lifetime. Prepared day by day.
            </p>
            <p className="rise rise-3 mx-auto mt-6 max-w-[38rem] text-lead">
              Each year, in the days of Dhul Hijjah, pilgrims from every nation stand together at Arafat. HIJRA prepares pilgrims from Kerala for each of those
              days.
            </p>
            <div className="rise rise-4 mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={enquiryPath('hajj')} className="btn btn-light">
                Register your interest
              </Link>
              <a href="#days" className="btn btn-outline-light">
                The days of Hajj
              </a>
            </div>
          </div>

          {/* Season status: the designed state while dates are not announced */}
          <dl className="mx-auto mt-14 grid max-w-[60rem] border-y border-white/15 text-left text-small md:mt-16 md:grid-cols-3">
            <div className="py-5 md:px-6">
              <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-sand">Next season</dt>
              <dd className="mt-1.5 font-serif text-h4 font-semibold text-warm-white">Hajj {season}</dd>
            </div>
            <div className="border-t border-white/15 py-5 md:border-l md:border-t-0 md:px-6">
              <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-sand">HIJRA group dates</dt>
              <dd className="mt-1.5 flex items-center gap-2 font-serif text-h4 font-semibold text-warm-white">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-sand" />
                Not announced yet
              </dd>
            </div>
            <div className="border-t border-white/15 py-5 md:border-l md:border-t-0 md:px-6">
              <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-sand">Interest list</dt>
              <dd className="mt-1.5">We contact you as soon as the dates are confirmed.</dd>
            </div>
          </dl>

          <Photo
            image={IMG.hero}
            priority
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="mt-14 aspect-[4/3] rounded-[18px] sm:aspect-[16/10] md:mt-16 md:rounded-lg lg:aspect-[21/9]"
          />
        </div>
      </section>

      {/* 02 What Hajj is */}
      <section className="py-section" aria-labelledby="about-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">What Hajj is</p>
            <h2 id="about-h" className="mt-3 text-h2">
              The fifth pillar of Islam.
            </h2>
          </div>
          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <p className="font-serif text-[clamp(1.3125rem,1.1rem+0.6vw,1.75rem)] font-semibold leading-[1.35] text-navy">
              Hajj is the pilgrimage to Makkah that Muslims who are physically and financially able make at least once in their lives.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 md:gap-8">
              <p>
                It takes place once a year, from the 8th to the 13th of Dhul Hijjah, the last month of the Islamic calendar. Its rites recall the Prophet Ibrahim, Hajar
                and Ismail, and follow the farewell pilgrimage of the Prophet Muhammad, peace be upon them.
              </p>
              <p>
                The Islamic calendar follows the moon, so the days of Hajj come about eleven days earlier each year. Seats are limited: every country receives a quota,
                and registration opens months before the season.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-1 border-y border-warm-border sm:grid-cols-3">
              {[
                { k: 'When', v: '8–13 Dhul Hijjah' },
                { k: 'Where', v: 'Makkah, Mina, Arafat, Muzdalifah' },
                { k: 'How often', v: 'Once a year' },
              ].map((f, i) => (
                <div key={f.k} className={['py-5 sm:pr-5', i ? 'border-t border-warm-border sm:border-l sm:border-t-0 sm:pl-5' : ''].join(' ')}>
                  <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">{f.k}</dt>
                  <dd className="mt-1 font-semibold text-navy">{f.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-small text-muted">
              We describe practice, not rulings: for religious rulings, follow the scholars you trust. Reviewed by HIJRA’s religious adviser before launch.
            </p>
          </div>
        </div>
      </section>

      {/* 03 The days of Hajj */}
      <section id="days" className="on-dark bg-deep py-section" aria-labelledby="days-h">
        <div className="wrap">
          <div className="site-grid items-end gap-y-6">
            <div className="col-span-full lg:col-span-7">
              <span className="rule-double mb-5" aria-hidden="true" />
              <p className="eyebrow">8 to 13 Dhul Hijjah</p>
              <h2 id="days-h" className="mt-3 text-h2">
                The days of Hajj, one by one.
              </h2>
            </div>
            <p className="col-span-full max-w-[34rem] text-lead lg:col-span-5">What happens on each day, where, and what to expect. The classes before departure go through every day in detail.</p>
          </div>

          <nav aria-label="Jump to a day" className="mt-10 hidden md:mt-14 md:block">
            <ul className="grid grid-cols-5 gap-px overflow-hidden rounded-md border border-white/15 bg-white/15">
              {days.map((d) => (
                <li key={d.id} className="bg-deep">
                  <a href={`#${d.id}`} className="flex h-full min-h-[5.5rem] flex-col justify-between gap-2 p-4 transition-colors hover:bg-white/5">
                    <span className="font-serif text-h3 font-semibold leading-none text-warm-white">{d.date}</span>
                    <span className="text-caption font-semibold text-sand">{d.id === 'day-10' ? 'Eid al-Adha' : d.id === 'days-11-13' ? 'Tashreeq' : d.place}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ol className="mt-12 border-b border-white/15 md:mt-16">
            {days.map((d) => (
              <li key={d.id} id={d.id} className="site-grid gap-y-5 border-t border-white/15 py-10 md:py-14">
                <div className="col-span-full flex items-end gap-4 md:col-span-2 md:block lg:col-span-3">
                  <span aria-hidden="true" className="block shrink-0 whitespace-nowrap font-serif text-[clamp(3.25rem,2.6rem+3vw,5.5rem)] font-semibold leading-[0.85] tracking-[-0.03em] text-warm-white/25">
                    {d.date}
                  </span>
                  <span className="block pb-1 text-caption font-semibold uppercase tracking-[0.12em] text-sand md:mt-4 md:pb-0">{d.day}</span>
                </div>
                <div className="col-span-full md:col-span-6 lg:col-span-5">
                  <h3 className="text-h3">{d.name}</h3>
                  <p className="mt-1.5 font-semibold text-warm-white">
                    {d.meaning}
                    {d.name.includes(d.place) ? null : <span className="font-normal text-mist"> · {d.place}</span>}
                  </p>
                  <p className="mt-4 max-w-[36rem]">{d.text}</p>
                </div>
                <div className="col-span-full md:col-span-6 md:col-start-3 lg:col-span-3 lg:col-start-10">
                  <p className="border-l-2 border-sand pl-4 text-small">
                    <span className="block text-caption font-semibold uppercase tracking-[0.12em] text-sand">What to expect</span>
                    <span className="mt-1.5 block">{d.expect}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {farewell ? (
            <div className="site-grid mt-10 gap-y-3">
              <div className="col-span-full md:col-span-2 lg:col-span-3">
                <span className="text-caption font-semibold uppercase tracking-[0.12em] text-sand">{farewell.day}</span>
              </div>
              <div className="col-span-full md:col-span-6 lg:col-span-8">
                <h3 className="text-h4">{farewell.name}</h3>
                <p className="mt-1 font-semibold text-warm-white">{farewell.meaning}</p>
                <p className="mt-3 max-w-[44rem]">{farewell.text}</p>
              </div>
            </div>
          ) : null}
          <Note tone="dark" className="mt-12 max-w-[48rem]">
            Practice differs in some details between schools of thought. Your classes explain each rite as your group will perform it; for rulings, follow the
            scholars you trust.
          </Note>
        </div>
      </section>

      {/* 04 Registration */}
      <section id="registration" className="py-section" aria-labelledby="register-h">
        <div className="wrap">
          <div className="max-w-[46rem]">
            <p className="eyebrow">Registration</p>
            <h2 id="register-h" className="mt-3 text-h2">
              Two routes to Hajj from India.
            </h2>
            <p className="mt-4 text-lead">
              Indian pilgrims travel either through the Haj Committee of India or through a registered Haj Group Organiser (HGO). Both work within the quota of seats
              Saudi Arabia allots to India each year.
            </p>
          </div>
          <div className="mt-12 grid border-y border-warm-border md:mt-14 md:grid-cols-2">
            {[
              {
                n: 'Route one',
                title: 'The Haj Committee of India',
                text: 'The statutory body that organises Hajj for most Indian pilgrims, with the state Haj committees. Applications are made online in the window it announces for each season; where applications exceed the seats, pilgrims are selected as its guidelines for the year set out.',
              },
              {
                n: 'Route two',
                title: 'A registered Haj Group Organiser',
                text: 'Private organisers registered with the Government of India, who receive a share of the quota and arrange the journey as a package, under the rules set for the season.',
              },
            ].map((r, i) => (
              <div key={r.n} className={['py-8 md:py-10', i ? 'border-t border-warm-border md:border-l md:border-t-0 md:pl-10' : 'md:pr-10'].join(' ')}>
                <p className="text-caption font-semibold uppercase tracking-[0.12em] text-red">{r.n}</p>
                <h3 className="mt-2 text-h3">{r.title}</h3>
                <p className="mt-3 max-w-[34rem]">{r.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[46rem]">
              <span className="font-semibold text-navy">HIJRA’s own route:</span> your advisor confirms which route applies to your application, and
              explains each step open to you before anything is decided.
            </p>
            <Link href={enquiryPath('hajj')} className="link-arrow shrink-0">
              Ask which route suits you
            </Link>
          </div>
        </div>
      </section>

      {/* 05 Preparation */}
      <section id="prepare" className="bg-warm-grey py-section" aria-labelledby="prepare-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Preparation</p>
              <h2 id="prepare-h" className="mt-3 text-h2">
                Preparing, month by month.
              </h2>
              <p className="mt-4 text-muted">A suggested timeline. The dates and documents for each season are announced by your registration route.</p>
              <Link href={`${routes.pilgrimGuide}#hajj`} className="link-arrow mt-5">
                The Hajj preparation guide
              </Link>
            </div>
          </div>
          <ol className="col-span-full border-b border-warm-border lg:col-span-7 lg:col-start-6">
            {hajjPreparation.map((s, i) => (
              <li key={s.when} className="grid gap-x-8 gap-y-3 border-t border-warm-border py-7 md:grid-cols-[13rem_1fr]">
                <div>
                  <span className="text-caption font-semibold uppercase tracking-[0.12em] text-red">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-1 text-h4">{s.when}</h3>
                </div>
                <ul className="grid gap-2.5">
                  {s.items.map((x) => (
                    <li key={x} className="flex gap-2.5 text-small">
                      <Icon name="check" size={18} className="mt-0.5 shrink-0 text-navy" />
                      {x}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 The route between the holy sites, and support */}
      <section className="py-section" aria-labelledby="route-h">
        <div className="wrap">
          <div className="site-grid items-end gap-y-6">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow">Stays and transport</p>
              <h2 id="route-h" className="mt-3 text-h2">
                Where you stay, and how you move.
              </h2>
            </div>
            <p className="col-span-full max-w-[34rem] lg:col-span-5">
              Hotels in Makkah or Azizia as listed for each package, the tents of Mina and Arafat, a night in the open at Muzdalifah. Between the holy sites groups move
              by coach as arranged for the season, and on foot where the way requires.
            </p>
          </div>
          <ol
            aria-label="The route of a Hajj journey"
            className="relative mt-12 grid gap-7 pl-10 md:mt-16 md:grid-cols-4 md:gap-x-0 md:gap-y-14 md:pl-0 lg:grid-cols-8 lg:gap-gutter lg:pt-[34px]"
          >
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-[6px] top-1 w-[5px] border-x border-navy md:hidden lg:block lg:inset-x-0 lg:bottom-auto lg:top-[6px] lg:h-[5px] lg:w-auto lg:border-x-0 lg:border-y"
            />
            {route.map((r, i) => (
              <li
                key={`${r.place}-${i}`}
                className={[
                  'relative before:absolute before:-left-10 before:top-1 before:size-[17px] before:rounded-full before:border-2 before:border-navy',
                  'md:border-t md:border-navy md:pr-6 md:pt-6 md:before:-top-[9px] md:before:left-0',
                  'lg:border-t-0 lg:pr-0 lg:pt-0 lg:before:-top-[34px]',
                  ['Mina', 'Arafat', 'Muzdalifah'].includes(r.place) ? 'before:bg-navy' : 'before:bg-warm-white',
                ].join(' ')}
              >
                <span className="block font-serif text-h4 font-semibold text-navy">{r.place}</span>
                <span className="mt-1 block text-small text-muted">{r.text}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex items-center gap-2.5 text-small text-muted">
            <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-navy" />
            The holy sites of the days of Hajj. The order of Makkah and Madinah depends on the group.
          </p>

          <div className="site-grid mt-16 items-center gap-y-10 md:mt-24">
            <Photo image={IMG.support} sizes="(min-width: 1200px) 34vw, (min-width: 810px) 45vw, 100vw" className="reveal-img col-span-full aspect-[16/10] rounded-lg md:col-span-4 md:aspect-[4/5] lg:col-span-5" />
            <div className="col-span-full md:col-span-4 lg:col-span-6 lg:col-start-7">
              <p className="eyebrow">Pilgrim support</p>
              <h2 className="mt-3 text-h2">Beside you, before and during Hajj.</h2>
              <dl className="mt-8 border-b border-warm-border">
                {support.map((s) => (
                  <div key={s.title} className="border-t border-warm-border py-5">
                    <dt className="font-semibold text-navy">{s.title}</dt>
                    <dd className="mt-1 text-small text-muted">{s.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 07 Package outlines */}
      <section id="packages" className="bg-warm-grey py-section" aria-labelledby="packages-h">
        <div className="wrap">
          <div className="site-grid items-end gap-y-6">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow">Packages</p>
              <h2 id="packages-h" className="mt-3 text-h2">
                Hajj packages.
              </h2>
              <p className="mt-4 max-w-[38rem] text-lead">
                {listed.length
                  ? 'Group packages for the coming season. Open a package for the journey, what is included and how to register your interest.'
                  : 'Packages for the next season are announced once the Hajj dates are known. Register your interest and we will contact you.'}
              </p>
            </div>
            <Note className="col-span-full md:col-span-6 lg:col-span-4 lg:col-start-9">
              Sample outlines, subject to the Hajj quota and registration. HIJRA’s package data replaces them; fares are given on enquiry.
            </Note>
          </div>
          <div className="mt-10 grid gap-5 md:mt-14 md:gap-6">
            {listed.map((p) => (
              <PackageFolio
                key={p.slug}
                p={p}
                status={shownStatus(p, day)}
                note="Subject to the Hajj quota, registration and approval. An advisor confirms the fare and the details with you."
              />
            ))}
          </div>
        </div>
      </section>

      {/* 08 Questions, related guidance and branches */}
      <section className="py-section" aria-labelledby="faq-h">
        <div className="wrap site-grid gap-y-12 lg:items-start">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-h" className="mt-3 text-h2">
              Questions about Hajj.
            </h2>
          </div>
          <FaqGroups
            className="col-span-full lg:col-span-7 lg:col-start-6 lg:row-span-2"
            groups={[
              { label: 'Hajj', items: faqs.hajj },
              { label: 'Health and booking', items: [faqs.documents[1], faqs.booking[0]] },
            ]}
          />
          <div className="col-span-full lg:col-span-4 lg:row-start-2">
            <h3 className="font-sans text-caption font-semibold uppercase tracking-[0.12em] text-muted">Related guidance</h3>
            <LinkIndex
              label="Related guidance"
              className="mt-3"
              links={[
                { href: `${routes.pilgrimGuide}#hajj`, label: 'Hajj preparation guide', text: 'Pilgrim Guide' },
                { href: `${routes.pilgrimGuide}#checklist`, label: 'The travel checklist, printable', text: 'Pilgrim Guide' },
                ...articleLinks(['hajj-registration-india', 'the-days-of-hajj']),
                { href: routes.pilgrimStories, label: 'Pilgrim stories', text: 'In their own words' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="pb-section" aria-labelledby="branches-h">
        <div className="wrap">
          <div className="site-grid gap-y-8 border-t border-warm-border pt-12 md:pt-16">
            <div className="col-span-full lg:col-span-5">
              <p className="eyebrow">Branches</p>
              <h2 id="branches-h" className="mt-3 text-h3">
                Sit down with an advisor.
              </h2>
              <p className="mt-3 max-w-[30rem]">Hajj is a decision families make together. Visit a branch near you, or call or message us first.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <ContactAction kind="call" className="btn btn-secondary btn-sm">
                  <Icon name="phone" />
                  {t.common.call}
                </ContactAction>
                <ContactAction kind="whatsapp" className="btn btn-outline btn-sm">
                  <Icon name="whatsapp" className="wa-mark" />
                  {t.common.whatsappUs}
                </ContactAction>
              </div>
            </div>
            <div className="col-span-full lg:col-span-6 lg:col-start-7">
              <div className="mb-3 flex items-center justify-between gap-3">
                <SampleTag>Details to be confirmed</SampleTag>
                <Link href={routes.branches} className="link-arrow shrink-0 text-small">
                  All branches
                </Link>
              </div>
              <ul className="grid border-b border-warm-border sm:grid-cols-2 sm:gap-x-8">
                {branches.map((b) => (
                  <li key={b.id} className="border-t border-warm-border">
                    <Link href={branchPath(b.slug)} className="group flex min-h-14 items-center justify-between gap-3 py-3 font-semibold text-navy">
                      <span className="group-hover:underline group-hover:underline-offset-4">{b.name}</span>
                      <Icon name="arrowRight" size={18} className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={`Hajj ${season}`}
        title="Register your interest for Hajj."
        body="Tell us who would travel. An advisor explains the routes open to you, and contacts you when HIJRA confirms its group dates."
        service="hajj"
        cta="Register your interest"
      />
    </>
  );
}
