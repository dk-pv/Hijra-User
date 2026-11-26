import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { packagePath, routes } from '@/data/navigation';
import { getPackage, isListed, packages, shownStatus, type Package } from '@/data/packages';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { today } from '@/lib/today';
import { cn } from '@/lib/cn';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';
import { Note, SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { SectionIntro } from '@/components/ui/section';
import { StatusBadge } from '@/components/ui/status-badge';
import { EnquirySection } from '@/components/travel/enquiry-section';
import { PackageCard, StaysBar } from './package-folio';
import { airportsText, byDeparture, nights } from './trip';

// One Umrah or Hajj package (/umrah/packages/<slug>, /hajj/packages/<slug>). Pilgrimage pages, not holiday pages:
// Hajj opens in the night chapter like the Hajj page, Umrah in daylight like the Umrah page. Only what the package
// data holds is shown: no fares, and dates only once confirmed.

type Service = Package['service'];

const copy: Record<Service, { label: string; hub: string; guide: { href: string; label: string }; notes: string[]; noteNote: string }> = {
  umrah: {
    label: 'Umrah',
    hub: routes.umrah,
    guide: { href: `${routes.umrah}#rites`, label: 'The rites of Umrah, in order' },
    notes: [
      'Visa: HIJRA applies for the Umrah visa with you after checking your documents. Requirements change, so the current list is confirmed when you apply; the decision rests with the Saudi authorities.',
      'Health: Vaccinations required for travel are confirmed with you before departure, with their certificates.',
      'Assistance: Wheelchair help at airports and in the holy mosques is requested on your behalf and depends on availability.',
      'Booking: Dates, rooms and the fare are confirmed with you in writing before anything is booked. Nothing is paid online.',
    ],
    noteNote: 'Visa, health and travel rules change: your advisor confirms the current ones when you apply.',
  },
  hajj: {
    label: 'Hajj',
    hub: routes.hajj,
    guide: { href: `${routes.hajj}#days`, label: 'The days of Hajj, explained' },
    notes: [
      'Registration: Subject to the Hajj quota, registration and approval. Indian pilgrims travel through the Haj Committee of India or a registered Haj Group Organiser (HGO); your advisor confirms which route applies to you.',
      'Dates: The days of Hajj follow the Islamic calendar, so group dates are confirmed once they are announced.',
      'Preparation: Classes before departure walk through each day of Hajj, what to carry and how the group moves.',
      'Booking: The fare and the details are confirmed with you in writing before anything is booked. Nothing is paid online.',
    ],
    noteNote: 'Hajj rules are set each year: your advisor confirms the current ones when you register.',
  },
};

const dateFmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const fmt = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00Z`));

/** "Visa: HIJRA applies..." → ['Visa', 'HIJRA applies...'] */
const splitNote = (note: string) => {
  const i = note.indexOf(': ');
  return [note.slice(0, i), note.slice(i + 2)];
};

export function packageParams(service: Service) {
  return packages.filter((p) => p.service === service).map((p) => ({ slug: p.slug }));
}

export function packageMetadata(service: Service, slug: string): Metadata {
  const p = getPackage(service, slug);
  if (!p) notFound();
  return pageMetadata({
    path: packagePath(service, p.slug),
    title: `${p.name}: a sample ${copy[service].label} package`,
    description: `${p.summary} ${p.days} days from Kerala; fare on enquiry.`,
    image: p.image,
    noindex: p.sample,
  });
}

export async function PackageDetail({ service, params }: { service: Service; params: Promise<{ slug: string }> }) {
  const p = getPackage(service, (await params).slug);
  if (!p) notFound();
  const day = await today();
  const status = shownStatus(p, day);
  const related = byDeparture(packages.filter((x) => x.service === service && x.slug !== p.slug && isListed(x, day))).slice(0, 3);
  const c = copy[service];
  const dark = service === 'hajj';
  const line = dark ? 'border-white/15' : 'border-warm-border';
  const whatsapp = `Assalamu alaikum. I would like to know more about “${p.name}” (${p.departure}).`;

  const facts = [
    p.dates ? { label: 'Dates', value: `${fmt(p.dates.depart)} to ${fmt(p.dates.return)}` } : { label: 'Departure', value: p.departure },
    { label: 'Duration', value: `${p.days} days · ${nights(p)} nights` },
    { label: 'Flying from', value: airportsText(p) },
    { label: 'Fare', value: 'On enquiry' },
  ];
  const route = [
    { place: 'Kerala', text: `Return flights from ${airportsText(p)}` },
    ...p.stays.map((s) => ({ place: s.city, text: `${s.nights} nights` })),
    { place: 'Home', text: 'The flight back to Kerala' },
  ];

  return (
    <>
      {/* 01 Hero: title, status and facts beside the photograph */}
      <section className={cn('pt-nav', dark && 'on-dark bg-deep pb-section')}>
        <div className="wrap pt-6 lg:pt-10">
          <Breadcrumbs
            onDark={dark}
            items={[
              { label: 'Hajj & Umrah', href: routes.hajjUmrah },
              { label: c.label, href: c.hub },
              { label: 'Packages', href: `${c.hub}#packages` },
              { label: p.name },
            ]}
          />
          <div className="site-grid mt-8 gap-y-8 lg:mt-12 lg:grid-rows-[auto_1fr]">
            <div className="col-span-full lg:col-span-5">
              {dark ? <span className="rule-double rise mb-5" aria-hidden="true" /> : null}
              <p className="eyebrow rise">{c.label} package</p>
              <h1 className="rise rise-2 mt-5 text-h1">{p.name}</h1>
              <div className="rise rise-3 mt-5 flex flex-wrap items-center gap-2">
                <StatusBadge status={status} />
                <SampleTag>Sample package</SampleTag>
              </div>
              <p className="rise rise-3 mt-6 text-lead">{p.summary}</p>
            </div>
            <div className="col-span-full lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <Photo
                image={p.image}
                priority
                sizes="(min-width: 1200px) 56vw, 94vw"
                className="aspect-[4/3] rounded-[18px] md:aspect-[16/10] md:rounded-lg lg:aspect-auto lg:h-full lg:min-h-[34rem]"
              />
            </div>
            <div className="col-span-full lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-end">
              <dl className={cn('grid grid-cols-2 border-t', line)}>
                {facts.map((f, i) => (
                  <div key={f.label} className={cn('border-b py-4', line, i % 2 ? 'border-l pl-5' : 'pr-5')}>
                    <dt className={cn('text-caption font-semibold uppercase tracking-[0.12em]', dark ? 'text-sand' : 'text-muted')}>{f.label}</dt>
                    <dd className={cn('mt-1 font-semibold', dark ? 'text-warm-white' : 'text-navy')}>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#enquiry" className={cn('btn', dark ? 'btn-light' : 'btn-primary')}>
                  Enquire about this package
                </a>
                <ContactAction kind="whatsapp" message={whatsapp} className={cn('btn', dark ? 'btn-outline-light' : 'btn-outline')}>
                  <Icon name="whatsapp" className={dark ? undefined : 'wa-mark'} />
                  {dictionary.common.whatsappUs}
                </ContactAction>
              </div>
              <p className="mt-5 text-small">Dates, rooms and the fare are confirmed with you by an advisor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 The journey: highlights, and where the nights go in travel order */}
      <section className="py-section" aria-labelledby="journey-h">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">The journey</p>
            <h2 id="journey-h" className="mt-3 text-h2">
              Where the nights go.
            </h2>
            <p className="mt-5 max-w-[34rem]">
              {p.days} days and {nights(p)} nights, at this pace: {p.pace.charAt(0).toLowerCase() + p.pace.slice(1)}.
            </p>
            <h3 className="mt-9 text-h4">Highlights</h3>
            <ul className="mt-4 border-b border-warm-border">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-3 border-t border-warm-border py-3.5">
                  <Icon name="check" className="mt-0.5 shrink-0 text-red" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <Link href={c.guide.href} className="link-arrow mt-6">
              {c.guide.label}
            </Link>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <StaysBar stays={p.stays} />
            <ol aria-label="The route, in order" className="relative mt-10 pl-12 md:pl-16">
              <span aria-hidden="true" className="absolute bottom-3 left-[6px] top-3 w-[5px] border-x border-sand md:left-[10px]" />
              {route.map((r, i) => (
                <li
                  key={`${r.place}-${i}`}
                  className="relative pb-9 last:pb-0 before:absolute before:-left-12 before:top-1.5 before:size-[17px] before:rounded-full before:border-2 before:border-sand before:bg-warm-white md:before:-left-[60px]"
                >
                  <p className="font-serif text-h4 font-semibold text-navy">{r.place}</p>
                  <p className="mt-1 text-small text-muted">{r.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 03 Included and not included */}
      <section className="bg-warm-grey py-section" aria-labelledby="included-h">
        <div className="wrap">
          <SectionIntro
            eyebrow="The package"
            title={<span id="included-h">What is included</span>}
            lead="Sample inclusions. Your advisor’s written quote lists exactly what is included before you confirm anything."
          />
          <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-2 md:gap-gutter lg:gap-x-24">
            {[
              { title: 'Included', items: p.inclusions, icon: 'check' as const, tone: 'text-success' },
              { title: 'Not included', items: p.exclusions, icon: 'minus' as const, tone: 'text-muted' },
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

      {/* 04 Important notes: the night chapter */}
      <section className="on-dark bg-deep py-section" aria-labelledby="notes-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <span className="rule-double mb-5" aria-hidden="true" />
            <p className="eyebrow">Good to know</p>
            <h2 id="notes-h" className="mt-3 text-h2">
              Before you travel
            </h2>
            <p className="mt-4 max-w-[30rem]">{c.noteNote}</p>
          </div>
          <dl className="col-span-full grid gap-x-(--g) md:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {c.notes.map((n) => {
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

      {/* 05 Enquiry, with this package preselected */}
      <EnquirySection
        eyebrow="Enquire"
        title="Ask about this package."
        lead="Tell us who is travelling. An advisor replies with the dates, rooms and fare, and answers your questions."
        service={service}
        variant="full"
        packages={packages.filter((x) => x.service === service).map((x) => ({ slug: x.slug, name: x.name, service: x.service }))}
        initial={{ interest: p.slug }}
        source={`${service}:${p.slug}`}
        message={whatsapp}
      >
        <Note className="mt-8 max-w-[30rem]">This package is a sample. Nothing is booked or paid online: your advisor confirms everything with you first.</Note>
      </EnquirySection>

      {/* 06 Other packages of the same kind */}
      {related.length ? (
        <section className="bg-warm-grey py-section" aria-labelledby="related-h">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <SectionIntro eyebrow={`More ${c.label} packages`} title={<span id="related-h">Other departures</span>} />
              <Link href={`${c.hub}#packages`} className="link-arrow">
                All {c.label} packages
              </Link>
            </div>
            <ul role="list" className="mt-8 grid gap-x-(--g) gap-y-10 min-[600px]:grid-cols-2 md:mt-10 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <PackageCard p={r} status={shownStatus(r, day)} sizes="(min-width: 1200px) 30vw, (min-width: 600px) 46vw, 94vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
