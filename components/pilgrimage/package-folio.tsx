import Link from 'next/link';
import type { Package } from '@/data/packages';
import { enquiryPath } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { ContactAction } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';
import { SampleTag } from '@/components/ui/pending';
import { airportsText, nights, splitDeparture } from './trip';

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
 * One package, the same component for Umrah and Hajj: when, what, where the nights go, what is included and how
 * to ask. Fares are never shown (packages.ts has none); the advisor confirms them on enquiry.
 */
export function PackageFolio({ p, note, className }: { p: Package; note?: string; className?: string }) {
  const [when, year] = splitDeparture(p.departure);
  const n = nights(p);
  return (
    <article id={p.slug} aria-labelledby={`${p.slug}-h`} className={cn('card p-5 sm:p-7 lg:p-9', className)}>
      <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[11rem_minmax(0,1fr)_15rem]">
        {/* When */}
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-warm-border pb-5 lg:block lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
          <p className="font-serif text-navy">
            <span className="block text-[clamp(1.625rem,1.3rem+0.9vw,2.25rem)] font-semibold leading-none">{when}</span>
            <span className="mt-1.5 block text-h4 font-semibold leading-none text-muted">{year}</span>
          </p>
          <div className="lg:mt-6">
            <p className="text-small font-semibold text-navy">
              {p.days} days · {n} nights
            </p>
            <SampleTag className="mt-2">Sample package</SampleTag>
          </div>
        </div>

        {/* What */}
        <div className="min-w-0">
          <h3 id={`${p.slug}-h`} className="text-h3">
            {p.name}
          </h3>
          <p className="mt-2 max-w-[40rem]">{p.summary}</p>
          <StaysBar stays={p.stays} className="mt-6 max-w-[34rem]" />
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-small md:gap-x-8">
            <div>
              <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">Flying from</dt>
              <dd className="mt-1 text-navy">{airportsText(p)}</dd>
            </div>
            <div>
              <dt className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">Pace</dt>
              <dd className="mt-1 text-navy">{p.pace}</dd>
            </div>
          </dl>
          <ul className="mt-6 grid gap-2 text-small">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-red" />
                {h}
              </li>
            ))}
          </ul>
          <details className="group mt-7 border-t border-warm-border">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy [&::-webkit-details-marker]:hidden">
              What is included, and what is not
              <Icon name="chevronDown" className="shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="grid gap-6 pb-2 pt-1 text-small sm:grid-cols-2">
              <div>
                <h4 className="font-sans text-caption font-semibold uppercase tracking-[0.12em] text-muted">Included</h4>
                <ul className="mt-3 grid gap-2">
                  {p.inclusions.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <Icon name="check" size={18} className="mt-0.5 shrink-0 text-success" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-sans text-caption font-semibold uppercase tracking-[0.12em] text-muted">Not included</h4>
                <ul className="mt-3 grid gap-2">
                  {p.exclusions.map((x) => (
                    <li key={x} className="flex gap-2.5">
                      <Icon name="minus" size={18} className="mt-0.5 shrink-0 text-muted" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </details>
        </div>

        {/* How to ask */}
        <div className="flex flex-col gap-4 border-t border-warm-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="flex items-baseline justify-between gap-3 lg:block">
            <span className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">Fare</span>
            <span className="font-serif text-h4 font-semibold text-navy lg:mt-1 lg:block">On enquiry</span>
          </p>
          {note ? (
            <p className="text-small text-muted">{note}</p>
          ) : (
            <p className="hidden text-small text-muted lg:block">An advisor confirms the fare, rooms and seats with you before anything is booked.</p>
          )}
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap lg:mt-1 lg:grid lg:grid-cols-1">
            <Link href={enquiryPath(p.service, p.slug)} className="btn btn-secondary btn-sm">
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
