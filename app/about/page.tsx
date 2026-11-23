import Link from 'next/link';
import type { Metadata } from 'next';
import { enquiryPath, routes } from '@/data/navigation';
import type { ImageKey } from '@/data/images';
import { site } from '@/data/site';
import { branches } from '@/data/branches';
import { demo } from '@/data/demo';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CtaBand } from '@/components/ui/cta-band';
import { KeralaMap } from '@/components/ui/kerala-map';
import { Pending, SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';

// About Us (report 8.2, 2.3 of the reference audit): who HIJRA is, the story and leadership, the specialisation, the
// approach to care, mission and values, the branch network and the facts a family can check. Copy is positioning, not
// history: every date, milestone, name and figure HIJRA has not confirmed is a marked placeholder.

const IMG: Record<'hero' | 'name' | 'pilgrimage', ImageKey> = {
  hero: 'kerala-kozhikode-mishkal-mosque',
  name: 'madinah-quba-mosque',
  pilgrimage: 'madinah-mosque-interior-arches',
};

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.about,
    title: 'About us: Hajj and Umrah specialists, Kerala',
    description:
      'Meet HIJRA Travels | Haj Group, Hajj and Umrah specialists from Kerala’s Malabar coast: our story, our values, how we care for pilgrims, and our branches.',
    image: IMG.hero,
  });
}

// HIJRA's own history when supplied; in preview builds the demonstration journey from data/demo.ts (no invented dates).
const milestones = [
  ...(site.demo
    ? demo.journey.map((j) => ({ year: j.step, title: j.title, text: j.text }))
    : [
        { year: null, title: 'Where it began', text: <Pending>The first office: where it opened, and who started it</Pending> },
        { year: null, title: 'The first pilgrim groups', text: <Pending>The first Umrah and Hajj groups HIJRA guided</Pending> },
        { year: null, title: 'Branches across Kerala', text: <Pending>When and where the branches opened</Pending> },
      ]),
  {
    year: 'Today',
    // The branch total only once HIJRA confirms it; until then the confirmed head office (the step above already says "Branches across Kerala").
    title: site.facts.branchCount ? `${site.facts.branchCount} branches across Kerala` : `Head office in ${branches.find((b) => b.isHeadOffice)?.name}`,
    text: 'Hajj and Umrah for families from across Kerala.',
  },
];

const specialisation = [
  {
    title: 'Preparation before you leave',
    text: 'Guidance on the rites, the documents and what to pack, with preparation classes for Hajj groups, so nothing on the journey comes as a surprise.',
  },
  { title: 'Guidance at every step', text: 'Advisors explain each step before you travel, and stay in touch while you are away.' },
  { title: 'Planned around every age', text: 'Unhurried itineraries for older pilgrims and families with children, with dates, rooms and fares confirmed with you first.' },
  { title: 'Faithful to the rites', text: 'We describe what happens, when and where. For religious rulings, follow the scholars you trust.' },
];

const care = [
  { title: 'Before you decide', text: 'Honest, plain answers, and time to think it over. Nothing is booked or paid online.' },
  { title: 'Before you travel', text: 'Your documents checked, your visa applied for, and a clear picture of every day of the journey.' },
  { title: 'While you are away', text: 'Help that continues while you travel. On Hajj, a group leader stays with the group throughout.' },
  { title: 'When you are home', text: 'We ask how it went, and we listen: the next family’s journey is shaped by yours.' },
];

const values = [
  { title: 'Clarity before commitment', text: 'You understand the plan, the documents and the costs before anything is booked.' },
  { title: 'Respect', text: 'For the rites, for our elders, and for every family’s pace and budget.' },
  { title: 'Care that continues', text: 'Our care does not end at the airport. It continues until you are home.' },
  { title: 'Honesty', text: 'If something cannot be promised, such as a visa decision, we say so plainly.' },
];

export default function AboutPage() {
  const t = dictionary;
  const years = site.facts.yearsOfExperience;
  const branchCount = site.facts.branchCount;
  const headOffice = branches.find((b) => b.isHeadOffice);

  const facts = [
    { term: 'Company', value: site.fullName, note: 'As written on HIJRA’s logo.' },
    { term: 'Specialisation', value: 'Hajj and Umrah, for pilgrims from Kerala' },
    { term: 'Also arranged', value: 'Tours within India and abroad, flight tickets and visa assistance' },
    {
      term: 'Years serving pilgrims',
      value: years ?? <Pending>25+ or 30+ years</Pending>,
      note: site.facts.yearsIsDemo ? 'Sample figure for this preview.' : years ? undefined : 'The exact figure is being confirmed by HIJRA.',
    },
    {
      // No number until HIJRA confirms the total (site.facts.branchCount).
      term: 'Branches',
      value: `${branchCount ? `${branchCount} branches` : 'Branches'} across Kerala${headOffice ? `, with the head office in ${headOffice.name}` : ''}`,
      note: (
        <Link href={routes.branches} className="link-inline">
          See every branch
        </Link>
      ),
    },
    {
      term: 'Hajj registration',
      value: 'Indian pilgrims travel either through the Haj Committee of India or through a registered Haj Group Organiser (HGO).',
      note: 'Your advisor confirms which route applies to your application.',
    },
    { term: 'How booking works', value: 'Enquiry first. An advisor confirms dates, rooms and fares with you; nothing is booked or paid online.' },
    {
      term: 'Reviews',
      value: (
        <>
          Pilgrims’ own words, published with their consent, on the{' '}
          <Link href={routes.testimonials} className="link-inline">
            Testimonials
          </Link>{' '}
          page.
        </>
      ),
    },
  ];

  return (
    <>
      {/* 01 Introduction: from the Malabar coast to Makkah and Madinah */}
      <section className="pt-nav">
        <div className="wrap site-grid items-center gap-y-12 pt-6 md:pt-10">
          <div className="col-span-full lg:col-span-5">
            <Breadcrumbs items={[{ label: t.nav.about }]} />
            <p className="eyebrow rise mt-8 md:mt-10">About HIJRA</p>
            <h1 className="rise rise-2 mt-4 text-h1">From the Malabar coast to Makkah and Madinah.</h1>
            <p className="rise rise-3 mt-6 max-w-[31rem] text-lead">
              HIJRA Travels guides families from Kerala on Hajj and Umrah, and arranges the tours, flight tickets and visas around them.
            </p>
            <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={enquiryPath()} className="btn btn-primary">
                Start an enquiry
              </Link>
              <Link href={routes.branches} className="btn btn-outline">
                Visit a branch
              </Link>
            </div>
          </div>
          <figure className="relative col-span-full lg:col-span-7 lg:col-start-6 lg:mb-7">
            <Photo
              image={IMG.hero}
              priority
              sizes="(min-width: 1200px) 54vw, 100vw"
              className="aspect-[4/3] rounded-[18px] md:aspect-[3/2] md:rounded-lg"
            />
            <figcaption className="mt-3 text-caption text-muted lg:absolute lg:-bottom-7 lg:left-6 lg:mt-0 lg:max-w-[18rem] lg:rounded-md lg:bg-white lg:px-[22px] lg:py-[18px]">
              <span className="font-semibold text-navy lg:block lg:font-serif lg:text-[1.25rem] lg:leading-tight">Mishkal Mosque, Kozhikode.</span>{' '}
              <span className="lg:mt-1.5 lg:block lg:text-small">A landmark of the Malabar coast’s centuries-old links with Arabia.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 02 Who we are */}
      <section aria-labelledby="who-h" className="py-section">
        <div className="wrap site-grid gap-y-8">
          <h2 id="who-h" className="eyebrow col-span-full font-sans lg:col-span-3">
            Who we are
          </h2>
          <div className="col-span-full lg:col-span-9 lg:col-start-4">
            <p className="font-serif text-[clamp(1.5rem,1.15rem+1vw,2.125rem)] font-semibold leading-[1.22] tracking-[-0.01em] text-navy">
              A pilgrimage is not a holiday. It is the journey a family prepares for over years, and it deserves a team that treats it that way.
            </p>
            <div className="mt-8 grid gap-x-12 gap-y-5 md:mt-10 md:grid-cols-2 xl:gap-x-16">
              <p>
                HIJRA is a Hajj and Umrah specialist from the Malabar coast of Kerala, where the journey to Makkah and Madinah is part of family life. Our
                advisors explain every step, and the same care continues while you are away.
              </p>
              <p>
                Pilgrimage comes first, and the same attention goes into everything else we arrange: holidays in Kerala, across India and abroad, flight
                tickets, and visa assistance with your documents checked first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Our story: the leadership letter, the name, and the milestone line */}
      <section aria-labelledby="story-h" className="bg-warm-grey py-section">
        <div className="wrap">
          <div className="site-grid items-start gap-y-10">
            <figure className="col-span-full md:col-span-4 lg:col-span-5">
              <Photo
                image="madinah-nabawi-golden-hour"
                sizes="(min-width: 1200px) 40vw, (min-width: 810px) 50vw, 100vw"
                className="aspect-[4/3] rounded-lg md:aspect-[4/5]"
              />
              <figcaption className="mt-3 text-caption text-muted">Al-Masjid an-Nabawi, Madinah, in the evening light.</figcaption>
            </figure>
            <div className="col-span-full md:col-span-4 lg:col-span-6 lg:col-start-7">
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow">Our story</p>
                {site.demo ? <SampleTag>Sample text</SampleTag> : null}
              </div>
              <h2 id="story-h" className="mt-3 text-h2">
                A letter from our leadership.
              </h2>
              <blockquote className="mt-6">
                <p className="font-serif text-[clamp(1.3125rem,1.1rem+0.6vw,1.75rem)] font-semibold leading-[1.3] text-navy">
                  <span className="text-red" aria-hidden="true">
                    “
                  </span>
                  {site.demo ? (
                    <>
                      {demo.letter.lead}
                      <span className="text-red" aria-hidden="true">
                        ”
                      </span>
                    </>
                  ) : (
                    <Pending>How HIJRA began, what each pilgrim means to the team, and the promise made to every family, in two or three short paragraphs</Pending>
                  )}
                </p>
                {site.demo
                  ? demo.letter.paragraphs.map((para) => (
                      <p key={para} className="mt-4 max-w-[36rem]">
                        {para}
                      </p>
                    ))
                  : null}
                <footer className="mt-5 text-small text-muted">
                  {site.demo ? (
                    demo.letter.signature
                  ) : (
                    <>
                      <Pending>Name</Pending>, <Pending>Title</Pending>
                    </>
                  )}
                </footer>
              </blockquote>
              <div className="mt-10 grid gap-5 border-t border-warm-border pt-7 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
                <figure>
                  <Photo image={IMG.name} sizes="(min-width: 430px) 152px, 100vw" className="aspect-[3/2] rounded-md sm:aspect-[4/5]" />
                  <figcaption className="mt-2 text-caption text-muted">Quba Mosque, Madinah</figcaption>
                </figure>
                <div>
                  <h3 className="text-h4">The name HIJRA</h3>
                  <p className="mt-2 max-w-[36rem] text-small">
                    In Arabic, ‘hijra’ means migration. The Hijra of the Prophet Muhammad, peace be upon him, from Makkah to Madinah marks the first
                    year of the Islamic calendar.
                  </p>
                  <p className="mt-3 text-small">
                    {site.demo ? demo.nameStory : <Pending>Why the founders chose the name, in their words</Pending>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="eyebrow mt-16 font-sans md:mt-24">Our journey</h3>
          <ol className="relative mt-8 grid gap-9 pl-10 lg:grid-cols-4 lg:gap-gutter lg:pl-0 lg:pt-[34px]">
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-[6px] top-0 w-[5px] border-x border-red lg:inset-x-0 lg:bottom-auto lg:h-[5px] lg:w-auto lg:border-x-0 lg:border-y"
            />
            {milestones.map((m) => (
              <li
                key={m.title}
                className="relative before:absolute before:-left-[38px] before:top-2 before:size-[13px] before:rounded-full before:border-2 before:border-red before:bg-warm-grey lg:before:-top-[38px] lg:before:left-0"
              >
                <span className="block font-serif text-h3 font-semibold text-navy">{m.year ?? <Pending>Year</Pending>}</span>
                <span className="mt-3 block font-semibold text-navy">{m.title}</span>
                <p className="mt-1.5 text-small text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 The specialisation */}
      <section aria-labelledby="special-h" className="py-section">
        <div className="wrap site-grid items-start gap-y-10">
          <div className="col-span-full md:sticky md:top-24 md:col-span-3 lg:col-span-5">
            <Photo
              image={IMG.pilgrimage}
              sizes="(min-width: 1200px) 38vw, (min-width: 810px) 34vw, 100vw"
              className="reveal-img aspect-[3/2] rounded-[18px] md:aspect-[4/5] md:rounded-lg"
            />
          </div>
          <div className="col-span-full md:col-span-5 md:col-start-4 lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">Our specialisation</p>
            <h2 id="special-h" className="mt-3 text-h2">
              Hajj and Umrah come first.
            </h2>
            <p className="mt-4 max-w-[36rem] text-lead">
              Pilgrimage is the heart of HIJRA’s work, not one product among many. Everything we arrange for a pilgrim is planned around the rites, the
              season and the family travelling.
            </p>
            <ol className="mt-10 border-t border-warm-border">
              {specialisation.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 border-b border-warm-border py-6">
                  <span aria-hidden="true" className="font-serif text-h4 font-semibold text-red">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-h4">{s.title}</h3>
                    <p className="mt-1.5 text-small text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-x-7">
              <Link href={routes.umrah} className="link-arrow">
                Umrah journeys
              </Link>
              <Link href={routes.hajj} className="link-arrow">
                Hajj
              </Link>
              <Link href={routes.pilgrimGuide} className="link-arrow">
                Pilgrim guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05 The approach to care: the night chapter */}
      <section aria-labelledby="care-h" className="on-dark bg-deep py-section">
        <div className="wrap">
          <div className="site-grid items-end gap-y-6">
            <div className="col-span-full lg:col-span-7">
              <span className="rule-double mb-5" aria-hidden="true" />
              <p className="eyebrow">Our approach to care</p>
              <h2 id="care-h" className="mt-3 text-h1">
                Care, from the first question to the journey home.
              </h2>
            </div>
            <p className="col-span-full max-w-[36rem] text-lead lg:col-span-4 lg:col-start-9 lg:pb-2">
              Every family is different, so care is not a script. These are the moments we plan for.
            </p>
          </div>
          <ol className="mt-14 grid gap-x-10 gap-y-10 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
            {care.map((c, i) => (
              <li key={c.title} className="border-t border-sand/40 pt-6">
                <span aria-hidden="true" className="text-caption font-semibold uppercase tracking-[0.12em] text-sand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-h4">{c.title}</h3>
                <p className="mt-2 text-small">{c.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex flex-col items-start gap-x-7 border-t border-white/15 pt-8 sm:flex-row sm:flex-wrap md:mt-20">
            <Link href={routes.pilgrimStories} className="link-arrow">
              Pilgrim stories
            </Link>
            <Link href={routes.testimonials} className="link-arrow">
              What pilgrims say
            </Link>
          </div>
        </div>
      </section>

      {/* 06 Mission and values */}
      <section aria-labelledby="mission-h" className="py-section">
        <div className="wrap site-grid items-start gap-y-12">
          <div className="col-span-full lg:col-span-5">
            <span className="rule-double mb-5" aria-hidden="true" />
            <p className="eyebrow">Our mission</p>
            <h2 id="mission-h" className="mt-3 text-h2">
              A clear, calm and well-cared-for journey for every family who trusts us.
            </h2>
            <p className="mt-5 max-w-[32rem]">That is the measure we hold ourselves to, from the first conversation to the welcome home.</p>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <h3 className="eyebrow font-sans">Our values</h3>
            <ul className="mt-5 grid border-t border-warm-border sm:grid-cols-2 sm:gap-x-10">
              {values.map((v) => (
                <li key={v.title} className="border-b border-warm-border py-6">
                  <h4 className="text-h4">{v.title}</h4>
                  <p className="mt-1.5 text-small text-muted">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 07 The branch network and the people you will meet */}
      <section aria-labelledby="network-h" className="bg-warm-grey py-section">
        <div className="wrap site-grid items-start gap-y-10">
          <div className="col-span-full mx-auto w-full max-w-[340px] rounded-lg border border-warm-border bg-[#fdf9f7] px-5 pb-5 pt-6 md:col-span-3 md:max-w-none md:px-6 md:pt-7 lg:col-span-4">
            <KeralaMap />
          </div>
          <div className="col-span-full md:col-span-5 lg:col-span-7 lg:col-start-6">
            <p className="eyebrow">Our branches</p>
            <h2 id="network-h" className="mt-3 text-h2">
              Close to home, across Kerala.
            </h2>
            <p className="mt-4 max-w-[36rem] text-lead">
              Many families prefer to plan face to face, and often come together. HIJRA has {branchCount ? `${branchCount} branches` : 'branches'} across
              Kerala where you can sit down with an advisor.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:gap-gutter">
              <figure>
                <Photo image="kerala-kochi-fishing-nets" sizes="(min-width: 1200px) 28vw, (min-width: 430px) 45vw, 100vw" className="aspect-[3/2] rounded-md" />
                <figcaption className="mt-2 text-caption text-muted">Kochi, on Kerala’s coast</figcaption>
              </figure>
              <figure>
                <Photo image="travel-calicut-airport" sizes="(min-width: 1200px) 28vw, (min-width: 430px) 45vw, 100vw" className="aspect-[3/2] rounded-md" />
                <figcaption className="mt-2 text-caption text-muted">Kozhikode airport, where many groups set out</figcaption>
              </figure>
            </div>
            <p className="mt-6 text-small text-muted">
              {site.demo ? demo.teams : <Pending>Names and roles of HIJRA’s leadership and branch teams, shared with consent</Pending>}
            </p>
            <Link href={routes.branches} className="link-arrow mt-6">
              Visit a branch
            </Link>
          </div>
        </div>
      </section>

      {/* 08 Facts a family can check */}
      <section aria-labelledby="facts-h" className="py-section">
        <div className="wrap site-grid items-start gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">At a glance</p>
            <h2 id="facts-h" className="mt-3 text-h2">
              Facts you can check.
            </h2>
            <p className="mt-4 max-w-[30rem]">
              We publish only what we can stand behind. Anything not yet confirmed is marked, and HIJRA fills it in before launch. No awards, ratings or
              approvals are claimed here.
            </p>
          </div>
          <dl className="col-span-full border-t border-warm-border lg:col-span-7 lg:col-start-6">
            {facts.map((f) => (
              <div key={f.term} className="grid gap-x-8 gap-y-1.5 border-b border-warm-border py-5 md:grid-cols-[13rem_minmax(0,1fr)] md:py-6">
                <dt className="font-semibold text-navy">{f.term}</dt>
                <dd>
                  {f.value}
                  {f.note ? <span className="mt-1.5 block text-small text-muted">{f.note}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        eyebrow="Start here"
        title="Plan your journey with HIJRA."
        body="Tell us what you have in mind. An advisor replies by your preferred method, and nothing is booked or paid online."
      />
    </>
  );
}
