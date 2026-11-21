import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { branchPath, routes } from '@/data/navigation';
import { branches, getBranch, isPublishable } from '@/data/branches';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { BranchSign } from '@/components/branches/branch-sign';
import { demo } from '@/data/demo';
import { site } from '@/data/site';
import { BranchAddress } from '@/components/branches/branch-card';
import { listPhrase, orderBranches, serviceInfo } from '@/components/branches/branch-data';
import { HoursTable, TodayHours } from '@/components/branches/hours';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction, DirectionsAction } from '@/components/ui/contact-action';
import { Icon, type IconName } from '@/components/ui/icons';
import { Note, Pending, SampleTag } from '@/components/ui/pending';
import { ClientPhoto } from '@/components/ui/photo';

// Branch page (report 8.4, mock-up 4). Built only from the branch record, so it cannot become a thin copy of its
// neighbours (P17). Sample and draft records render for review but are never indexed.

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

type Props = { params: Promise<{ lang: string; slug: string }> };

async function branchFrom(params: Props['params']) {
  const branch = getBranch((await params).slug);
  if (!branch) notFound();
  return branch;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = await branchFrom(params);
  const what = b.services.includes('hajj') ? 'Hajj, Umrah and travel' : 'Umrah and travel';
  return pageMetadata({
    path: branchPath(b.slug),
    title: `${b.name} branch: ${what}`,
    description: `Visit HIJRA Travels at the ${b.name} branch in ${b.address.locality}, ${b.address.state}: the address, opening hours in India time, phone, WhatsApp and directions.`,
    noindex: !isPublishable(b),
  });
}

/** One contact-card line: icon, label and value as a dt/dd pair (the icon sits in the dt, so the dl stays valid). */
function Line({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <div className="relative min-w-0 pl-[2.125rem]">
      <dt className="text-small font-semibold text-navy">
        <Icon name={icon} className="absolute left-0 top-[3px]" />
        {label}
      </dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}

const photoSlots = ['Office interior: verified photograph', 'The team at the counter, with consent', 'The entrance from the street'];

/** The slug is URL data: it is read inside Suspense so the route's shared App Shell stays valid (Partial Prefetching).
 * Unknown slugs never reach this page: proxy.ts answers them with the 404 page and a real 404 status. */
export default function BranchPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-svh pt-nav" aria-busy="true" />}>
      <BranchDetail params={params} />
    </Suspense>
  );
}

async function BranchDetail({ params }: Props) {
  const b = await branchFrom(params);
  const t = dictionary;
  const name = b.name;
  const others = orderBranches(branches).filter((o) => o.slug !== b.slug);
  const sample = b.status !== 'verified';

  return (
    <>
      <section className="pt-nav">
        <div className="wrap pt-6 md:pt-10">
          <Breadcrumbs items={[{ label: t.nav.branches, href: routes.branches }, { label: name }]} />
          <div className="rise mt-8 flex flex-wrap items-center gap-3 md:mt-10">
            <p className="eyebrow">HIJRA branch</p>
            {b.isHeadOffice ? <span className="tagline">Head office</span> : null}
            {sample ? <SampleTag>Sample record</SampleTag> : null}
          </div>
          <h1 className="rise rise-2 mt-4 text-h1">{name}</h1>
          <span className="rule-double rise rise-2 mt-5" aria-hidden="true" />
          <p className="rise rise-3 mt-5 max-w-[38rem] text-lead">
            Plan {listPhrase(b.services.map((s) => serviceInfo[s].phrase))} face to face with an advisor, in Malayalam or English.
          </p>
          {sample ? (
            <Note className="mt-8 max-w-[46rem] md:mt-10">
              <p>
                <strong className="font-semibold text-navy">This is a sample branch record.</strong> It shows how each HIJRA branch will
                appear. The name, address, contacts, hours and photographs are placeholders until HIJRA verifies them, and the page is kept
                out of search results until then.
              </p>
            </Note>
          ) : null}
        </div>
      </section>

      {/* Contact card first in the reading order and on screens under 1200 px; the photograph leads on the left from 1200 px. */}
      <section aria-labelledby="contact-h" className="pt-10 md:pt-14">
        <div className="wrap site-grid gap-y-6">
          <div className="card col-span-full flex flex-col gap-6 p-6 md:p-8 lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <h2 id="contact-h" className="sr-only">
              Contact the {name} branch
            </h2>
            <dl className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
              <Line icon="pin" label="Address">
                <BranchAddress branch={b} />
              </Line>
              <Line icon="phone" label="Phone">
                {b.phone ?? site.contact.phone ? (
                  <ContactAction kind="call" value={b.phone} className="link-inline">
                    {b.phone ?? site.contact.phone}
                  </ContactAction>
                ) : (
                  <Pending>Phone — to be confirmed</Pending>
                )}
              </Line>
              <Line icon="whatsapp" label="WhatsApp">
                {b.whatsapp ?? site.contact.whatsapp ?? <Pending>WhatsApp — to be confirmed</Pending>}
              </Line>
              <Line icon="clock" label="Hours (India time)">
                {b.hours ? <TodayHours hours={b.hours} className="[&>span:first-child]:font-normal [&>span:first-child]:text-slate" /> : <Pending>Hours — to be confirmed</Pending>}
              </Line>
            </dl>
            <div className="mt-auto grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
              <ContactAction kind="call" value={b.phone} label={`Call the ${name} branch`} className="btn btn-secondary">
                <Icon name="phone" />
                Call this branch
              </ContactAction>
              <ContactAction
                kind="whatsapp"
                value={b.whatsapp}
                message={`Hello HIJRA, I have a question for the ${name} branch.`}
                label={`WhatsApp the ${name} branch`}
                className="btn btn-outline"
              >
                <Icon name="whatsapp" className="wa-mark" />
                WhatsApp
              </ContactAction>
              <DirectionsAction url={b.mapsUrl} label={`${t.common.directions} to the ${name} branch`} className="btn btn-outline">
                <Icon name="directions" />
                {t.common.directions}
              </DirectionsAction>
            </div>
            <DirectionsAction url={b.gbpUrl} label={`Read reviews of the ${name} branch on Google`} className="link-arrow self-start text-small">
              Read reviews on Google
            </DirectionsAction>
          </div>
          <BranchSign
            name={name}
            town={b.address.locality}
            className="col-span-full aspect-[4/3] rounded-lg md:aspect-[3/2] lg:col-span-7 lg:row-start-1 lg:aspect-auto lg:min-h-[30rem]"
          />
        </div>
      </section>

      <section className="pt-section">
        <div className="wrap site-grid gap-y-16">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">Hours</p>
            <h2 className="mt-3 text-h3">Opening hours (India time)</h2>
            {b.hours ? (
              <HoursTable hours={b.hours} caption={`Opening hours at the ${name} branch, India time`} className="mt-6" />
            ) : (
              <p className="mt-6">
                <Pending>Hours — to be confirmed</Pending>
              </p>
            )}
            <p className="mt-4 text-small text-muted">Today’s row follows the date in India, wherever you are reading from. On public holidays, please call before you visit.</p>
          </div>
          <div className="col-span-full lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">How to find us</p>
            <h2 className="mt-3 text-h3">Directions from nearby landmarks</h2>
            <p className="mt-6 max-w-[38rem]">
              {b.directions ??
                (site.demo ? (
                  demo.directions(b.address.lines[1] ?? b.address.lines[0], b.address.locality)
                ) : (
                <Pending>
                  HIJRA’s own directions, 60–150 words: the landmarks people know, where to park and which entrance to
                  use. This is the page’s main unique text.
                </Pending>
                ))}
            </p>
            <DirectionsAction url={b.mapsUrl} label={`${t.common.directions} to the ${name} branch`} className="btn btn-outline btn-sm mt-7">
              <Icon name="directions" />
              {t.common.directions}
            </DirectionsAction>
          </div>
        </div>
      </section>

      {/* Verified photographs only; preview builds skip the empty strip rather than show placeholders. */}
      {b.photos.length || !site.demo ? (
      <section aria-label={`Photographs of the ${name} branch`} className="pt-section">
        <div className="wrap">
          <ul
            tabIndex={0}
            aria-label="Branch photographs, scroll sideways for more"
            className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-gutter md:overflow-visible md:p-0"
          >
            {photoSlots.map((s) => (
              <li key={s} className="w-[84%] shrink-0 snap-start md:w-auto">
                <ClientPhoto subject={s} className="aspect-[3/2] rounded-md" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      ) : null}

      <section aria-labelledby="services-h" className="pt-section">
        <div className="wrap site-grid gap-y-8">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">At this branch</p>
            <h2 id="services-h" className="mt-3 text-h3">
              What you can plan here
            </h2>
            <p className="mt-3 max-w-[30rem] text-small text-muted">Each service starts with a conversation. Nothing is booked or paid online.</p>
          </div>
          <ul className="col-span-full border-t border-warm-border md:grid md:grid-cols-2 md:gap-x-12 lg:col-span-7 lg:col-start-6">
            {b.services.map((s) => {
              const sv = serviceInfo[s];
              return (
                <li key={s} className="border-b border-warm-border">
                  <Link href={sv.href} className="group flex items-start gap-4 py-5 md:py-6">
                    <Icon name={sv.icon} size={24} className="mt-0.5 shrink-0 text-red" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-h4 font-semibold text-navy">{sv.label}</span>
                      <span className="mt-1 block text-small text-muted">{sv.text}</span>
                    </span>
                    <Icon name="arrowRight" className="mt-1 shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="branch-enquiry-h" className="pt-section">
        <div className="wrap">
          <div className="on-dark flex flex-col gap-7 rounded-lg bg-deep px-6 py-9 md:px-12 md:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div>
              <h2 id="branch-enquiry-h" className="text-h3">
                Plan your journey with our {name} team.
              </h2>
              <p className="mt-2 max-w-[36rem]">Tell us what you have in mind. An advisor replies by phone, WhatsApp or email.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link href={`${routes.bookATrip}?branch=${b.slug}#enquiry`} className="btn btn-light">
                Enquire with this branch
              </Link>
              <ContactAction
                kind="whatsapp"
                value={b.whatsapp}
                message={`Hello HIJRA, I would like to plan a journey with the ${name} branch.`}
                label={`WhatsApp the ${name} branch`}
                className="btn btn-outline-light"
              >
                <Icon name="whatsapp" />
                WhatsApp
              </ContactAction>
            </div>
          </div>
        </div>
      </section>

      <nav aria-labelledby="others-h" className="pb-section pt-14 md:pt-16">
        <div className="wrap flex flex-col gap-x-8 gap-y-2 border-t border-warm-border pt-7 md:flex-row md:flex-wrap md:items-center">
          <h2 id="others-h" className="eyebrow font-sans text-muted">
            Other branches
          </h2>
          <ul className="flex flex-col gap-x-7 md:flex-row md:flex-wrap">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={branchPath(o.slug)} className="link-arrow font-normal">
                  {o.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={routes.branches} className="link-arrow">
                All branches
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
