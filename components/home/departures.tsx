import Link from 'next/link';
import { airportNames, isListed, shownStatus, umrahPackages } from '@/data/packages';
import { packagePath, routes } from '@/data/navigation';
import { today } from '@/lib/today';
import { Icon } from '@/components/ui/icons';
import { SampleTag } from '@/components/ui/pending';
import { StatusBadge } from '@/components/ui/status-badge';
import { byDeparture } from '@/components/pilgrimage/trip';

/** The departures ledger (8.1 section 03): one hairline row per departure still to come, the whole row its package page. */
export async function Departures() {
  const day = await today();
  const list = byDeparture(umrahPackages.filter((p) => isListed(p, day)));
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <SampleTag>Sample departures</SampleTag>
        <span className="text-caption text-muted">Fares on enquiry</span>
      </div>
      <div className="text-small">
        <div aria-hidden="true" className="hidden grid-cols-[6.5rem_1fr_4.5rem_9.5rem_6rem] gap-4 pb-3 text-caption font-semibold uppercase tracking-[0.12em] text-muted lg:grid">
          <span>Month</span>
          <span>Package</span>
          <span>Days</span>
          <span>From</span>
          <span />
        </div>
        <ul aria-label="Upcoming Umrah departures (sample)" className="border-b border-warm-border">
        {list.map((p) => (
          <li key={p.slug}>
          <Link
            href={packagePath('umrah', p.slug)}
            className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-t border-warm-border py-4 transition-colors duration-150 hover:bg-warm-grey/70 focus-visible:bg-warm-grey/70 lg:min-h-[76px] lg:grid-cols-[6.5rem_1fr_4.5rem_9.5rem_6rem] lg:py-2"
          >
            <span className="font-semibold text-navy">
              {p.departure}
            </span>
            <span className="col-span-2 font-serif text-h4 text-navy lg:col-span-1 lg:row-start-auto">
              {p.name}
              <StatusBadge status={shownStatus(p, day)} className="ml-3 align-middle font-sans" />
            </span>
            <span className="text-muted lg:text-slate">
              {p.days} days
            </span>
            <span className="text-right text-muted lg:text-left lg:text-slate">
              {p.airports.map((a) => airportNames[a]).join(', ')}
            </span>
            <span className="col-span-2 flex items-center gap-2 font-semibold text-navy lg:col-span-1 lg:justify-end">
              Details
              <Icon name="arrowRight" size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
          </li>
        ))}
        </ul>
      </div>
      <div className="mt-7 flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-6">
        <Link href={routes.umrah} className="link-arrow">
          All Umrah journeys
        </Link>
        <p className="text-caption text-muted">Dates, airports and fares come from HIJRA’s package data before launch.</p>
      </div>
    </div>
  );
}
