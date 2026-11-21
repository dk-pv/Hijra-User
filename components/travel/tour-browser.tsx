'use client';

import { useId, useRef, useState } from 'react';
import { enquiryPath, tourPath } from '@/data/navigation';
import type { IdealFor } from '@/data/tours';
import { Icon } from '@/components/ui/icons';
import { TourTile, idealForLabel, type TourCard } from './tour-tile';

// The tours listing (report 8.2 "Tours listing"): static data filtered in the browser. With no filter chosen, the
// featured tours form a mosaic and the rest follow as a ledger; any filter shows one ledger of matches, so no tour
// (and no photograph) appears twice.

type Region = 'all' | 'domestic' | 'international';
type Length = 'any' | 'short' | 'week' | 'long';
type Who = 'any' | IdealFor;

const regions: [Region, string][] = [
  ['all', 'All'],
  ['domestic', 'Within India'],
  ['international', 'International'],
];
const lengths: Record<Length, { label: string; fits: (days: number) => boolean }> = {
  any: { label: 'Any length', fits: () => true },
  short: { label: 'Up to 4 days', fits: (d) => d <= 4 },
  week: { label: '5 to 7 days', fits: (d) => d >= 5 && d <= 7 },
  long: { label: '8 days or more', fits: (d) => d >= 8 },
};

export function TourBrowser({ tours }: { tours: TourCard[] }) {
  const uid = useId();
  const [region, setRegion] = useState<Region>('all');
  const [length, setLength] = useState<Length>('any');
  const [who, setWho] = useState<Who>('any');
  const firstRadio = useRef<HTMLInputElement>(null);

  const browsing = region === 'all' && length === 'any' && who === 'any';
  const matches = tours.filter(
    (t) => (region === 'all' || t.region === region) && lengths[length].fits(t.days) && (who === 'any' || t.idealFor.includes(who)),
  );
  const featured = browsing ? tours.filter((t) => t.featured) : [];
  const list = browsing ? tours.filter((t) => !t.featured) : matches;
  // The ledger in two chapters named like the region choice; the data keeps Kerala first within India
  const chapters = regions
    .slice(1)
    .map(([key, label]) => ({ key, label, items: list.filter((t) => t.region === key) }))
    .filter((c) => c.items.length);

  const reset = () => {
    setRegion('all');
    setLength('any');
    setWho('any');
    firstRadio.current?.focus();
  };
  const links = (t: TourCard) => ({ href: tourPath(t.slug), enquireHref: enquiryPath('tour', t.slug) });

  return (
    <div>
      <div className="border-y border-warm-border py-5 md:py-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-gutter">
          <fieldset className="field">
            <legend className="field-label mb-1.5">Region</legend>
            <div className="seg">
              {regions.map(([key, label], i) => (
                <label key={key}>
                  <input
                    ref={i === 0 ? firstRadio : undefined}
                    type="radio"
                    name={`${uid}-region`}
                    value={key}
                    checked={region === key}
                    onChange={() => setRegion(key)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-gutter lg:w-120">
            <div className="field">
              <label className="field-label" htmlFor={`${uid}-length`}>
                Length
              </label>
              <select id={`${uid}-length`} className="field-input" value={length} onChange={(e) => setLength(e.target.value as Length)}>
                {Object.entries(lengths).map(([key, l]) => (
                  <option key={key} value={key}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor={`${uid}-who`}>
                Ideal for
              </label>
              <select id={`${uid}-who`} className="field-input" value={who} onChange={(e) => setWho(e.target.value as Who)}>
                <option value="any">Anyone</option>
                {Object.entries(idealForLabel).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mt-5 flex min-h-11 flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p aria-live="polite" className="text-small font-semibold text-navy">
            {browsing
              ? `Showing all ${tours.length} sample tours`
              : matches.length
                ? `Showing ${matches.length} of ${tours.length} sample tours`
                : 'No sample tour matches these choices'}
          </p>
          {!browsing ? (
            <button type="button" onClick={reset} className="link-inline min-h-11 cursor-pointer text-small font-semibold">
              Clear choices
            </button>
          ) : null}
        </div>
      </div>

      {featured.length ? (
        <ul role="list" aria-label="Featured tours" className="mt-10 grid gap-x-(--g) gap-y-12 min-[600px]:grid-cols-2 md:mt-12 lg:grid-cols-12 lg:gap-y-14">
          {featured.map((t, i) => (
            <li key={t.slug} className={i === 0 ? 'min-[600px]:col-span-2 lg:col-span-7 lg:row-span-2' : 'lg:col-span-5 lg:col-start-8'}>
              <TourTile
                tour={t}
                {...links(t)}
                layout={i === 0 ? 'feature' : 'card'}
                sizes={i === 0 ? '(min-width: 1200px) 54vw, 94vw' : '(min-width: 1200px) 38vw, (min-width: 600px) 46vw, 94vw'}
                photoClassName={i === 0 ? 'aspect-[4/3] min-[600px]:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[26rem]' : 'aspect-[3/2]'}
                className={i === 0 ? 'lg:h-full' : undefined}
              />
            </li>
          ))}
        </ul>
      ) : null}

      {chapters.length ? (
        <div className={browsing ? 'mt-16 space-y-14 md:mt-24 md:space-y-20' : 'mt-10 space-y-14 md:space-y-20'}>
          {chapters.map((c) => (
            <div key={c.key}>
              <div className="flex items-baseline justify-between gap-4 pb-4">
                <h3 id={`${uid}-${c.key}`} className="text-h3">
                  {c.label}
                </h3>
                <p className="text-small text-muted">
                  {c.items.length} {browsing ? 'more' : c.items.length === 1 ? 'tour' : 'tours'}
                </p>
              </div>
              <ul role="list" aria-labelledby={`${uid}-${c.key}`} className="border-b border-warm-border">
                {c.items.map((t) => (
                  <li key={t.slug}>
                    <TourTile tour={t} {...links(t)} layout="row" heading="h4" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-md border border-warm-border bg-white px-6 py-12 text-center md:py-16">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-warm-grey text-navy">
            <Icon name="compass" size={28} />
          </span>
          <h3 className="mt-5 text-h3">Nothing fits all three choices.</h3>
          <p className="mx-auto mt-3 max-w-[32rem]">
            Try another length or region, or tell us what you have in mind: an advisor can plan a tour around your dates and the people travelling with you.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={reset} className="btn btn-outline btn-sm">
              Clear choices
            </button>
            <a href="#enquiry" className="btn btn-secondary btn-sm">
              Ask for a custom tour
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
