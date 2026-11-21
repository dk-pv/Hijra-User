'use client';

import { useId, useState, type ReactNode } from 'react';
import type { ServiceKey } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { ContactAction } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';

export type DirectoryItem = { slug: string; text: string; services: ServiceKey[]; card: ReactNode };

/**
 * The branch finder (report 8.3, 9.8): search by branch or town, a service filter with a live result count and an
 * empty state, the cards beside a sticky map from 810 px, and a List · Map switch on phones. The cards and the map
 * are rendered on the server and passed in, so without JavaScript every card, address, hour and link still works.
 */
export function BranchDirectory({
  items,
  services,
  map,
  note,
}: {
  items: DirectoryItem[];
  services: { key: ServiceKey; label: string }[];
  map: ReactNode;
  note: ReactNode;
}) {
  const id = useId();
  const [query, setQuery] = useState('');
  const [service, setService] = useState<ServiceKey | ''>('');
  const [view, setView] = useState<'list' | 'map'>('list');

  const q = query.trim().toLowerCase().replace(/\s+/g, ' ');
  const shown = new Set(items.filter((i) => (!q || i.text.includes(q)) && (!service || i.services.includes(service))).map((i) => i.slug));
  const total = items.length;
  const noun = (n: number) => (n === 1 ? 'branch' : 'branches');
  const status =
    shown.size === total ? `Showing all ${total} ${noun(total)}` : `Showing ${shown.size} of ${total} ${noun(total)}`;
  const serviceLabel = services.find((s) => s.key === service)?.label;
  const clear = () => {
    setQuery('');
    setService('');
  };

  return (
    <div className="site-grid items-start gap-y-8">
      <div role="group" aria-label="Show branches as" className="col-span-full flex w-full max-w-[26rem] rounded-full border border-navy p-[3px] md:hidden">
        {(['list', 'map'] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={cn(
              'flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200',
              view === v ? 'bg-navy text-white' : 'text-navy hover:bg-navy/5',
            )}
          >
            <Icon name={v} size={18} />
            {v === 'list' ? 'List' : 'Map'}
          </button>
        ))}
      </div>

      <div className={cn('col-span-full md:col-span-5 lg:col-span-7', view === 'map' && 'max-md:hidden')}>
        {/* One rule for every width: the fields share a row while it fits, the search taking three parts in four; otherwise they stack. */}
        <div className="flex flex-wrap items-end gap-4">
          <div className="field flex-[3_1_16rem]">
            <label className="field-label" htmlFor={`${id}-q`}>
              Branch or town
            </label>
            <div className="relative">
              <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id={`${id}-q`}
                type="search"
                className="field-input pl-12"
                placeholder="Search by name or town"
                autoComplete="off"
                enterKeyHint="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="field flex-[1_1_12rem]">
            <label className="field-label" htmlFor={`${id}-s`}>
              Service
            </label>
            <select id={`${id}-s`} className="field-input" value={service} onChange={(e) => setService(e.target.value as ServiceKey | '')}>
              <option value="">All services</option>
              {services.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-warm-border pb-4">
          <p role="status" className="text-small font-semibold text-navy">
            {status}
          </p>
          {shown.size !== total ? (
            <button type="button" onClick={clear} className="min-h-11 cursor-pointer text-small font-semibold text-navy underline decoration-1 underline-offset-4 hover:text-red">
              Clear search
            </button>
          ) : null}
        </div>
        {note}

        <ul className="mt-6 flex flex-col gap-6">
          {items.map((i) => (
            <li key={i.slug} hidden={!shown.has(i.slug)}>
              {i.card}
            </li>
          ))}
        </ul>

        {shown.size === 0 ? (
          <div className="mt-6 rounded-md border border-dashed border-field px-6 py-10 text-center md:px-10">
            <Icon name="search" size={28} className="mx-auto text-navy" />
            <h2 className="mt-4 text-h4">
              No branch matches {q ? `“${query.trim()}”` : 'this filter'}
              {serviceLabel ? ` for ${serviceLabel}` : ''}.
            </h2>
            <p className="mx-auto mt-2 max-w-[30rem] text-small text-muted">
              Try another town or service, or see every branch again. Our central team can also point you to the branch nearest your home.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={clear} className="btn btn-secondary btn-sm">
                Show all branches
              </button>
              <ContactAction kind="whatsapp" className="btn btn-outline btn-sm">
                <Icon name="whatsapp" className="wa-mark" />
                Ask the central team
              </ContactAction>
            </div>
          </div>
        ) : null}
      </div>

      <aside
        aria-label="Branch map"
        className={cn(
          // Sticky beside the cards from 810 px, clear of the pill; it scrolls with the page on screens under 641 px tall.
          'col-span-full md:col-span-3 lg:col-span-5 [@media(min-width:810px)_and_(min-height:641px)]:sticky [@media(min-width:810px)_and_(min-height:641px)]:top-24',
          view === 'list' && 'max-md:hidden',
        )}
      >
        {map}
      </aside>
    </div>
  );
}
