import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { blogPath, enquiryPath, routes } from '@/data/navigation';
import { blogs, categories } from '@/data/blogs';
import { faqs } from '@/data/faqs';
import { checklist, hajjDays, umrahRites } from '@/data/guides';
import type { ImageKey } from '@/data/images';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { FaqGroups } from '@/components/ui/faq';
import { Icon } from '@/components/ui/icons';
import { Note } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { Checklist } from '@/components/pilgrimage/checklist';
import { GuideIndex } from '@/components/pilgrimage/guide-index';

// Pilgrim Guide (report 8.9 A, P18): one resource page with a sticky chapter index on wide screens and chips on
// phones. Religious guidance is reviewed by HIJRA before launch; visa and health guidance must be verified.

const IMG: Record<'hero', ImageKey> = { hero: 'madinah-mosque-interior-arches' };

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.pilgrimGuide,
    title: 'Pilgrim Guide: preparing for Umrah and Hajj',
    description:
      'Prepare for Umrah and Hajj from Kerala: the rites at a glance, a printable travel checklist, documents, packing lists and answers to the questions families ask.',
    image: IMG.hero,
  });
}

const chapters = [
  { id: 'umrah', label: 'Umrah preparation' },
  { id: 'hajj', label: 'Hajj preparation' },
  { id: 'checklist', label: 'Travel checklist' },
  { id: 'documents', label: 'Documents and planning' },
  { id: 'packing', label: 'What to pack' },
  { id: 'questions', label: 'Questions' },
  { id: 'articles', label: 'From our blog' },
];

const articles = blogs.filter((b) => b.category === 'umrah' || b.category === 'hajj' || b.category === 'preparation' || b.category === 'documents');

const documents: { doc: string; umrah: string; hajj?: string }[] = [
  { doc: 'Passport', umrah: 'Valid for at least six months, with blank pages', hajj: 'Valid well beyond the travel dates, as your route requires' },
  { doc: 'Photographs', umrah: 'Recent, to the size and background the visa asks for', hajj: 'As your registration route specifies' },
  { doc: 'Visa', umrah: 'An Umrah visa, applied for with HIJRA', hajj: 'A Hajj visa, issued through your registration route within the quota' },
  { doc: 'Vaccinations', umrah: 'Meningococcal (ACYW) has long been required; check the current list', hajj: 'The same, plus anything added for the season' },
  { doc: 'Tickets and hotels', umrah: 'Printed, and saved on your phone' },
  { doc: 'Copies', umrah: 'Copies of passport and visa, kept apart from the originals' },
];

const seasons = [
  { when: 'Ramadan', text: 'The most sought-after weeks, above all the last ten nights. Enquire as early as you can.' },
  { when: 'School holidays', text: 'April and May, and late December: good for families, and quick to fill.' },
  { when: 'The cooler months', text: 'Roughly November to February, when the days in Makkah and Madinah are milder.' },
  { when: 'Summer', text: 'Roughly June to September: very hot. Plan rest in the heat of the day.' },
];

const packing = [
  { title: 'For men', items: ['Two sets of ihram cloths', 'An ihram belt with pockets', 'Sandals suitable for ihram, already worn in', 'Light cotton clothes for after ihram'] },
  { title: 'For women', items: ['Loose, breathable everyday clothes', 'Several scarves', 'Comfortable shoes or sandals, already worn in', 'A small bag that stays close'] },
  {
    title: 'For everyone',
    items: ['Unscented soap and toiletries for the days in ihram', 'A refillable water bottle and an umbrella', 'A light prayer mat', 'Medicines, with prescriptions', 'A power bank and a travel adapter'],
  },
  { title: 'For Hajj, add', items: ['A light sheet or mat for the night at Muzdalifah', 'A small pouch for the pebbles', 'A waist bag for documents and your ID card', 'A spare pair of sandals'] },
];

function Chapter({ id, n, title, intro, children }: { id: string; n: number; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} data-chapter={id} aria-labelledby={`${id}-h`} className="border-t border-warm-border pt-12 first:border-t-0 first:pt-0 md:pt-16">
      <p className="eyebrow">Chapter {String(n).padStart(2, '0')}</p>
      <h2 id={`${id}-h`} className="mt-3 text-h2">
        {title}
      </h2>
      {intro ? <p className="mt-4 max-w-[40rem] text-lead">{intro}</p> : null}
      <div className="mt-9">{children}</div>
    </section>
  );
}

function Reviewed({ children = 'Reviewed by HIJRA’s religious adviser before launch' }: { children?: ReactNode }) {
  return (
    <p className="mt-8 flex items-center gap-2 text-small text-muted">
      <Icon name="shield" size={18} className="shrink-0 text-navy" />
      {children}
    </p>
  );
}

export default function PilgrimGuidePage() {
  return (
    <>
      {/* Page head */}
      <section className="pt-nav">
        <div className="wrap pb-12 pt-6 md:pb-16 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Hajj & Umrah', href: routes.hajjUmrah }, { label: 'Pilgrim Guide' }]} className="rise" />
          <div className="site-grid mt-8 items-center gap-y-10 md:mt-10">
          <div className="col-span-full md:col-span-5 lg:col-span-7">
            <p className="eyebrow rise">Pilgrim Guide</p>
            <h1 className="rise rise-2 mt-4 text-display">Prepare for Umrah and Hajj.</h1>
            <p className="rise rise-3 mt-6 max-w-[36rem] text-lead">
              The rites at a glance, a checklist you can print, documents, packing and the questions families ask, in one place.
            </p>
            <ul className="rise rise-4 mt-7 flex flex-col gap-2 text-small text-slate sm:flex-row sm:flex-wrap sm:gap-x-6">
              <li className="flex items-center gap-2">
                <Icon name="shield" size={18} className="shrink-0 text-navy" />
                Religious guidance reviewed by HIJRA before launch
              </li>
              <li className="flex items-center gap-2">
                <Icon name="info" size={18} className="shrink-0 text-navy" />
                Visa and health rules change: verify them when you apply
              </li>
            </ul>
          </div>
          <Photo
            image={IMG.hero}
            priority
            sizes="(min-width: 1200px) 30rem, (min-width: 810px) 36vw, 100vw"
            className="col-span-full aspect-[16/10] rounded-[18px] md:col-span-3 md:col-start-6 md:aspect-[4/5] md:rounded-lg lg:col-span-5 lg:col-start-8"
          />
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section className="pb-section" aria-label="The guide">
        <div className="wrap site-grid gap-y-10">
          <aside data-guide-aside="" className="hidden lg:col-span-3 lg:block">
            <GuideIndex items={chapters} className="sticky top-28" />
          </aside>

          <div data-guide-main="" className="col-span-full lg:col-span-8 lg:col-start-5">
            <nav aria-label="In this guide" data-print-hide="" className="mb-14 lg:hidden">
              <p className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">In this guide</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-field bg-white px-4 text-small font-semibold text-navy transition-colors hover:border-navy"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="grid grid-cols-1 gap-20 md:gap-24">
              <Chapter
                id="umrah"
                n={1}
                title="Umrah preparation"
                intro="Umrah can be made through most of the year, outside the Hajj season. Most of the preparation is practical; the rest is learning the rites well enough that nothing on the day is new."
              >
                <h3 className="font-sans text-caption font-semibold uppercase tracking-[0.12em] text-muted">The rites at a glance</h3>
                <ol className="mt-3 grid border-b border-warm-border sm:grid-cols-2 sm:gap-x-8">
                  {umrahRites.map((r, i) => (
                    <li key={r.id} className="flex items-baseline gap-4 border-t border-warm-border py-3.5">
                      <span className="w-6 shrink-0 font-serif text-h4 font-semibold text-red">{i + 1}</span>
                      <span>
                        <span className="block font-semibold text-navy">{r.name}</span>
                        <span className="block text-small text-muted">{r.where}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <Link href={`${routes.umrah}#rites`} className="link-arrow mt-3 text-small">
                  Each rite explained, on the Umrah page
                </Link>
                <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
                  {[
                    {
                      title: 'Before you go',
                      text: 'Choose the month with your family: Ramadan and the school holidays fill first. Check every passport, gather photographs, and ask your advisor for the current visa and vaccination requirements.',
                    },
                    {
                      title: 'Entering ihram',
                      text: 'Flying from Kerala, the miqat is crossed in the air, so pilgrims usually change before boarding and make the intention when it is announced on board. If your journey begins in Madinah, you enter ihram on the way to Makkah.',
                    },
                    {
                      title: 'In Makkah and Madinah',
                      text: 'Agree on a meeting point at the Haram on the first day, keep your hotel card with you, and plan Tawaf for calmer hours if anyone in your group needs a slower pace.',
                    },
                    {
                      title: 'Older parents and children',
                      text: 'Ask for an unhurried itinerary, rooms near the lift and assistance where it is available. For children, travel in the school holidays and bring their questions to the briefing.',
                    },
                  ].map((s) => (
                    <div key={s.title}>
                      <h3 className="text-h4">{s.title}</h3>
                      <p className="mt-2 text-small">{s.text}</p>
                    </div>
                  ))}
                </div>
                <Reviewed />
                <div className="mt-6 flex flex-wrap gap-x-7">
                  <Link href={enquiryPath('umrah')} className="link-arrow">
                    Plan my Umrah
                  </Link>
                  <Link href={`${routes.umrah}#packages`} className="link-arrow">
                    Umrah packages
                  </Link>
                </div>
              </Chapter>

              <Chapter
                id="hajj"
                n={2}
                title="Hajj preparation"
                intro="Hajj asks for months of preparation: registration, health, stamina, and an understanding of six demanding days."
              >
                <div className="rounded-md border border-warm-border bg-white p-5 md:p-7">
                  <h3 className="text-h4">How Indian pilgrims register</h3>
                  <p className="mt-2 text-small">
                    Indian pilgrims travel either through the Haj Committee of India or through a registered Haj Group Organiser (HGO), within the quota of seats
                    allotted to India each year. Applications open months before the season. Your advisor explains which route applies to you.
                  </p>
                  <Link href={`${routes.hajj}#registration`} className="link-arrow mt-2 text-small">
                    The two routes explained
                  </Link>
                </div>
                <h3 className="mt-10 font-sans text-caption font-semibold uppercase tracking-[0.12em] text-muted">The days at a glance</h3>
                <ol className="mt-3 border-b border-warm-border">
                  {hajjDays.map((d) => (
                    <li key={d.id} className="grid gap-x-6 gap-y-0.5 border-t border-warm-border py-3.5 sm:grid-cols-[11rem_1fr]">
                      <span className="text-small font-semibold text-red">{d.day}</span>
                      <span>
                        <span className="font-semibold text-navy">{d.name}</span>
                        <span className="text-small text-muted"> · {d.place}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <Link href={`${routes.hajj}#days`} className="link-arrow mt-3 text-small">
                  The days of Hajj, in depth
                </Link>
                <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
                  {[
                    { title: 'Build your stamina', text: 'Hajj means long walks in the heat. Walk every day in the months before, in the sandals you will wear.' },
                    { title: 'Look after your health', text: 'See your doctor early, plan medicines for the whole journey, and keep vaccination certificates with your passport.' },
                    { title: 'Learn the days', text: 'Attend the classes before departure, ideally with your travel companion, and keep notes you can carry.' },
                  ].map((s) => (
                    <div key={s.title}>
                      <h3 className="text-h4">{s.title}</h3>
                      <p className="mt-2 text-small">{s.text}</p>
                    </div>
                  ))}
                </div>
                <Reviewed />
                <div className="mt-6 flex flex-wrap gap-x-7">
                  <Link href={enquiryPath('hajj')} className="link-arrow">
                    Register your interest
                  </Link>
                  <Link href={`${routes.hajj}#prepare`} className="link-arrow">
                    The month-by-month timeline
                  </Link>
                </div>
              </Chapter>

              <Chapter id="checklist" n={3} title="Travel checklist" intro="Tick items off as you pack, or print the list and keep it with your passport.">
                <Checklist groups={checklist} />
              </Chapter>

              <Chapter id="documents" n={4} title="Documents and planning" intro="What to prepare for each journey, and when to travel.">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-small">
                    <caption className="pb-3 text-left text-caption font-semibold uppercase tracking-[0.12em] text-muted">Documents for Umrah and Hajj</caption>
                    <thead>
                      <tr className="border-b border-navy">
                        <th scope="col" className="w-[24%] py-3 pr-5 font-semibold text-navy">
                          Document
                        </th>
                        <th scope="col" className="py-3 pr-5 font-semibold text-navy">
                          Umrah
                        </th>
                        <th scope="col" className="py-3 font-semibold text-navy">
                          Hajj
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((d) => (
                        <tr key={d.doc} className="border-b border-warm-border align-top">
                          <th scope="row" className="py-4 pr-5 font-semibold text-navy">
                            {d.doc}
                          </th>
                          {d.hajj ? (
                            <>
                              <td className="py-4 pr-5">{d.umrah}</td>
                              <td className="py-4">{d.hajj}</td>
                            </>
                          ) : (
                            <td colSpan={2} className="py-4">
                              {d.umrah} <span className="text-muted">(both journeys)</span>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Note className="mt-6">
                  Requirements change. Verify the current list with HIJRA and the official sources when you apply. No agency can guarantee a visa: the decision rests
                  with the issuing authorities.
                </Note>

                <h3 className="mt-14 text-h3">When to go</h3>
                <dl className="mt-5 grid gap-x-10 border-b border-warm-border md:grid-cols-2">
                  {seasons.map((s) => (
                    <div key={s.when} className="border-t border-warm-border py-4">
                      <dt className="font-semibold text-navy">{s.when}</dt>
                      <dd className="mt-1 text-small">{s.text}</dd>
                    </div>
                  ))}
                </dl>

                <h3 className="mt-14 text-h3">Money and phone</h3>
                <p className="mt-3 max-w-[40rem]">
                  The Saudi riyal is the currency. Carry some cash for small purchases and a card that works abroad, and tell your bank before you travel. For your
                  phone, choose a roaming pack or a local SIM plan; your advisor can explain the options.
                </p>
              </Chapter>

              <Chapter id="packing" n={5} title="What to pack" intro="Pack light: you will carry your own bag between hotels, and walk a great deal.">
                <div className="grid gap-x-10 gap-y-10 border-t border-navy pt-8 md:grid-cols-2">
                  {packing.map((g) => (
                    <div key={g.title}>
                      <h3 className="text-h4">{g.title}</h3>
                      <ul className="mt-4 grid gap-2.5 text-small">
                        {g.items.map((x) => (
                          <li key={x} className="flex gap-2.5">
                            <Icon name="luggage" size={18} className="mt-0.5 shrink-0 text-navy" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <a href="#checklist" className="link-arrow mt-8">
                  Tick it off in the checklist
                </a>
              </Chapter>

              <Chapter id="questions" n={6} title="Questions">
                <FaqGroups
                  groups={[
                    { label: 'Umrah', items: faqs.umrah },
                    { label: 'Hajj', items: faqs.hajj },
                    { label: 'Documents and health', items: faqs.documents },
                  ]}
                />
              </Chapter>

              <Chapter id="articles" n={7} title="From our blog" intro="Longer articles on the rites, documents and planning, written for pilgrims from Kerala.">
                {articles.length ? (
                  <ul className="grid border-b border-warm-border md:grid-cols-2 md:gap-x-10">
                    {articles.map((a) => (
                      <li key={a.slug} className="border-t border-warm-border">
                        <Link href={blogPath(a.slug)} className="group flex h-full items-start justify-between gap-4 py-5">
                          <span>
                            <span className="block text-caption font-semibold uppercase tracking-[0.12em] text-red">
                              {categories[a.category]} <span className="text-muted">· {a.readingMinutes} min read</span>
                            </span>
                            <span className="mt-1.5 block font-serif text-h4 font-semibold text-navy group-hover:text-red">{a.title}</span>
                          </span>
                          <Icon name="arrowRight" className="mt-7 shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link href={routes.blogs} className="link-arrow mt-6">
                  All articles on the blog
                </Link>
              </Chapter>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="on-dark bg-deep py-section" aria-labelledby="plan-h">
        <div className="wrap site-grid items-end gap-y-8">
          <div className="col-span-full lg:col-span-7">
            <span className="rule-double mb-5" aria-hidden="true" />
            <p className="eyebrow">When you are ready</p>
            <h2 id="plan-h" className="mt-3 text-h2">
              Plan your journey with an advisor.
            </h2>
            <p className="mt-4 max-w-[36rem] text-lead">Every question answered. Nothing is booked or paid online.</p>
          </div>
          <div className="col-span-full flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-5 lg:justify-end">
            <Link href={enquiryPath('umrah')} className="btn btn-light">
              Plan my Umrah
            </Link>
            <Link href={enquiryPath('hajj')} className="btn btn-outline-light">
              Register interest for Hajj
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
