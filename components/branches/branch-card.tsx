import Link from 'next/link';
import { branchArea, type Branch } from '@/data/branches';
import { branchPath } from '@/data/navigation';
import { dictionary } from '@/lib/dictionary';
import { ContactAction, DirectionsAction } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';
import { Pending } from '@/components/ui/pending';
import { BranchSign } from './branch-sign';
import { serviceInfo } from './branch-data';
import { HoursTable, TodayHours } from './hours';

const label = 'text-caption font-semibold uppercase tracking-[0.1em] text-muted';

/** The branch's postal address, one line per part (report 8.5); its district and a pending mark until it is verified. */
export function BranchAddress({ branch: b }: { branch: Branch }) {
  const a = b.address;
  if (!a)
    return (
      <address className="not-italic">
        <span className="block">
          <Pending>Street address — to be confirmed</Pending>
        </span>
        <span className="block">{branchArea(b)}</span>
      </address>
    );
  return (
    <address className="not-italic">
      {a.lines.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
      <span className="block">
        {a.locality}, {b.district} district
      </span>
      <span className="block">Kerala {a.postalCode}</span>
    </address>
  );
}

/**
 * One branch in the directory (report 8.3, mock-up 3): number badge matching the map, name as an h2 in the h3 style,
 * address, hours and the three contact actions at 44 px. Phones lift Call and WhatsApp directly under the name;
 * the reading order stays name, address, hours, actions.
 */
export function BranchCard({ branch: b, n }: { branch: Branch; n: number }) {
  const t = dictionary;
  const name = b.name;
  const headingId = `branch-${b.slug}`;

  return (
    <article aria-labelledby={headingId} className="card flex flex-col p-5 md:p-6">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 md:gap-x-4">
        <span aria-hidden="true" className="grid size-[30px] place-items-center rounded-full bg-navy text-caption font-semibold text-white">
          {n}
        </span>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 id={headingId} className="text-[1.375rem] leading-[1.2] md:text-h3">
            {name}
          </h2>
          {b.isHeadOffice ? <span className="tagline">Head office</span> : null}
        </div>
        <BranchSign name={name} town={branchArea(b)} compact className="aspect-[4/3] w-[84px] rounded-[10px] md:w-[132px]" />
      </div>

      <dl className="order-2 mt-5 grid gap-x-8 gap-y-5 text-small md:order-none md:mt-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)]">
        <div>
          <dt className={label}>Address</dt>
          <dd className="mt-1.5">
            <BranchAddress branch={b} />
          </dd>
        </div>
        <div>
          <dt className={label}>Hours (India time)</dt>
          <dd className="mt-1.5">
            {b.hours ? (
              <>
                <TodayHours hours={b.hours} />
                <details className="group mt-1">
                  <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 font-semibold text-navy underline decoration-1 underline-offset-4 [&::-webkit-details-marker]:hidden">
                    All hours
                    <Icon name="chevronDown" size={18} className="transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <HoursTable hours={b.hours} caption={`Opening hours at the ${name} branch, India time`} compact className="mb-1 mt-2" />
                </details>
              </>
            ) : (
              <Pending>Hours — to be confirmed</Pending>
            )}
          </dd>
        </div>
        <div className="lg:col-span-2">
          <dt className={label}>Services</dt>
          <dd className="mt-1.5">{b.services.map((s) => serviceInfo[s].label).join(' · ')}</dd>
        </div>
      </dl>

      <div className="order-1 mt-5 grid grid-cols-1 gap-2.5 xs:grid-cols-2 sm:flex sm:flex-wrap md:order-none md:mt-7">
        <ContactAction kind="call" value={b.phone} label={`${t.common.call} the ${name} branch`} className="btn btn-secondary btn-sm">
          <Icon name="phone" />
          {t.common.call}
        </ContactAction>
        <ContactAction
          kind="whatsapp"
          value={b.whatsapp}
          message={`Hello HIJRA, I have a question for the ${name} branch.`}
          label={`WhatsApp the ${name} branch`}
          className="btn btn-outline btn-sm"
        >
          <Icon name="whatsapp" className="wa-mark" />
          WhatsApp
        </ContactAction>
        <DirectionsAction
          url={b.mapsUrl}
          label={`${t.common.directions} to the ${name} branch`}
          className="btn btn-outline btn-sm max-sm:justify-start max-sm:border-0 max-sm:px-0 xs:col-span-2"
        >
          <Icon name="directions" />
          {t.common.directions}
        </DirectionsAction>
      </div>

      <Link href={branchPath(b.slug)} className="link-arrow order-3 mt-3 self-start md:order-none md:mt-4">
        Branch details<span className="sr-only">: {name}</span>
      </Link>
    </article>
  );
}
