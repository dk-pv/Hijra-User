import Link from 'next/link';
import type { Package, PackageStatus } from '@/data/packages';
import { enquiryPath, packagePath } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { ContactAction } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';
import { SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { StatusBadge } from '@/components/ui/status-badge';
import { stretched } from '@/components/travel/tour-tile';
import { airportsText, nights } from './trip';

/** Makkah navy, Madinah a navy tint, the holy sites of the days of Hajj red. */
const stayTone = (city: Package['stays'][number]['city']) =>
  city === 'Madinah' ? 'bg-navy/35' : city === 'Mina, Arafat and Muzdalifah' ? 'bg-red' : 'bg-navy';

/** Where the nights go: a proportional bar with a legend (the bar is decorative, the legend carries the facts). */
export function StaysBar({ stays, className }: { stays: Package['stays']; className?: string }) {
  return (
    <div className={className}>
      <div aria-hidden="true" className="flex h-2 gap-[3px] overflow-hidden rounded-full">
        {stays.map((s) => (
          <span key={s.city} className={stayTone(s.city)} style={{ flexGrow: s.nights }} />
        ))}
      </div>
      <ul className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-small text-slate">
        {stays.map((s) => (
          <li key={s.city} className="flex items-center gap-2">
            <span aria-hidden="true" className={cn('size-2.5 shrink-0 rounded-full', stayTone(s.city))} />
            {s.city} · {s.nights} nights
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * One package in a listing, the same component for Umrah and Hajj: photograph, when, status, where the nights go, and
 * the way on to its own page. Fares are never shown (packages.ts has none); the advisor confirms them on enquiry.
 * The whole card opens the package page; Enquire and WhatsApp sit above that link.
 */
export function PackageFolio({ p, status, note, className }: { p: Package; status: PackageStatus | null; note?: string; className?: string }) {
  const href = packagePath(p.service, p.slug);
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-h`} className={cn('card photo-zoom relative overflow-hidden', className)}>
      <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_14rem] xl:grid-cols-[minmax(0,21rem)_minmax(0,1fr)_15rem]">
        <Photo
          image={p.image}
          alt=""
          sizes="(min-width: 1360px) 21rem, (min-width: 1200px) 18rem, (min-width: 810px) 38vw, 100vw"
          className="aspect-[16/9] md:aspect-auto md:h-full md:min-h-[17rem]"
        />

        <div className="min-w-0 px-5 pt-5 sm:px-7 sm:pt-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-serif text-h4 font-semibold leading-none text-navy">{p.departure}</p>
            <p className="text-small font-semibold text-slate">
              {p.days} days · {nights(p)} nights
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge status={status} />
            <SampleTag>Sample package</SampleTag>
          </div>
          <h3 id={`${p.slug}-h`} className="mt-4 text-h3">
            <Link href={href} className={stretched}>
              {p.name}
            </Link>
          </h3>
          <p className="mt-2 max-w-[40rem]">{p.summary}</p>
          <StaysBar stays={p.stays} className="mt-5 max-w-[34rem]" />
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-small md:gap-x-8">
            <div>
              <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">Flying from</dt>
              <dd className="mt-1 text-navy">{airportsText(p)}</dd>
            </div>
            <div>
              <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">Pace</dt>
              <dd className="mt-1 text-navy">{p.pace}</dd>
            </div>
          </dl>
        </div>

        {/* How to ask */}
        <div className="mx-5 mb-5 mt-6 flex flex-col gap-4 border-t border-warm-border pt-5 sm:mx-7 sm:mb-7 md:col-span-2 lg:col-span-1 lg:m-0 lg:border-l lg:border-t-0 lg:py-8 lg:pl-7 lg:pr-8">
          <p className="flex items-baseline justify-between gap-3 lg:block">
            <span className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">Fare</span>
            <span className="font-serif text-h4 font-semibold text-navy lg:mt-1 lg:block">On enquiry</span>
          </p>
          <p className="hidden text-small text-muted lg:block">{note ?? 'An advisor confirms the fare, rooms and seats with you before anything is booked.'}</p>
          <div className="relative z-[2] grid gap-2.5 sm:grid-cols-3 lg:mt-auto lg:grid-cols-1">
            <Link href={href} className="btn btn-secondary btn-sm">
              View details<span className="sr-only"> of {p.name}</span>
            </Link>
            <Link href={enquiryPath(p.service, p.slug)} className="btn btn-outline btn-sm">
              Enquire<span className="sr-only"> about {p.name}</span>
            </Link>
            <ContactAction
              kind="whatsapp"
              label={`Ask about ${p.name} on WhatsApp`}
              message={`Assalamu alaikum. I would like to know more about “${p.name}” (${p.departure}).`}
              className="btn btn-outline btn-sm"
            >
              <Icon name="whatsapp" className="wa-mark" />
              WhatsApp
            </ContactAction>
          </div>
        </div>
      </div>
    </article>
  );
}

/** A compact package card (related packages): photograph, when, name and length; the whole card is the link. */
export function PackageCard({ p, status, sizes }: { p: Package; status: PackageStatus | null; sizes: string }) {
  return (
    <Link href={packagePath(p.service, p.slug)} className="group block">
      <div className="relative">
        <Photo image={p.image} alt="" sizes={sizes} className="aspect-[3/2] rounded-md" />
        <StatusBadge status={status} className="absolute left-3 top-3" />
      </div>
      <p className="eyebrow mt-4">{p.departure}</p>
      <h3 className="mt-1.5 text-[clamp(1.25rem,1.1rem+0.4vw,1.5rem)] leading-tight group-hover:text-red">{p.name}</h3>
      <p className="mt-1.5 text-small text-muted">
        {p.days} days · {nights(p)} nights · Fare on enquiry
      </p>
      <span className="link-arrow mt-1">View details</span>
    </Link>
  );
}
