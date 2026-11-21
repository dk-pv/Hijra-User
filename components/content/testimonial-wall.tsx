'use client';

import { useState } from 'react';
import type { ServiceKey } from '@/data/navigation';
import { testimonials, type Testimonial } from '@/data/testimonials';
import { SampleTag } from '@/components/ui/pending';
import { FilterChips } from './filter-chips';

// Testimonials filtered by service. The first quote of the current filter is set large; the rest flow in two
// balanced columns. Built for real, consented reviews: name, town and year appear only when a record has them.

const serviceLabels: Record<ServiceKey, string> = { umrah: 'Umrah', hajj: 'Hajj', tour: 'Tours', flight: 'Flights', visa: 'Visa' };

/** A consented review adds what the reviewer approved: e.g. { name: 'Aysha', town: 'Tirur', year: 2025 }. */
type Voice = Testimonial & { name?: string; town?: string; year?: number };

function Attribution({ v, className }: { v: Voice; className?: string }) {
  const who = [v.name, v.town, v.year].filter(Boolean).join(', ');
  return (
    <figcaption className={`mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-small ${className ?? ''}`}>
      {who ? <span className="font-semibold text-navy">{who}</span> : null}
      <span className="text-muted">
        {v.context} · {serviceLabels[v.service]}
      </span>
      {v.sample ? <SampleTag>Sample</SampleTag> : null}
    </figcaption>
  );
}

const mark = (c: string) => (
  <span className="text-red" aria-hidden="true">
    {c}
  </span>
);

export function TestimonialWall() {
  const [service, setService] = useState<ServiceKey | 'all'>('all');
  const voices: Voice[] = testimonials.filter((t) => service === 'all' || t.service === service);
  const [lead, ...rest] = voices;
  const n = voices.length;

  const options = [
    { value: 'all' as const, label: 'All', count: testimonials.length },
    ...(Object.keys(serviceLabels) as ServiceKey[])
      .map((s) => ({ value: s, label: serviceLabels[s], count: testimonials.filter((t) => t.service === s).length }))
      .filter((o) => o.count),
  ];

  return (
    <div className="wrap">
      <div className="flex flex-col gap-4 md:items-center">
        <FilterChips name="testimonial-service" legend="Show testimonials for" options={options} value={service} onChange={setService} />
        <p role="status" className="text-small font-semibold text-navy">
          {service === 'all' ? `${n} testimonials` : `${n} ${n === 1 ? 'testimonial' : 'testimonials'} about ${serviceLabels[service]}`}
        </p>
      </div>

      <figure className="mx-auto mt-10 max-w-[56rem] border-t border-warm-border pt-10 md:mt-14 md:pt-14 md:text-center">
        <blockquote>
          <p className="font-serif text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] font-semibold leading-[1.2] text-navy">
            {mark('“')}
            {lead.quote}
            {mark('”')}
          </p>
        </blockquote>
        <Attribution v={lead} className="md:justify-center" />
      </figure>

      {rest.length ? (
        <div className="mt-14 gap-x-[var(--g)] md:mt-20 md:columns-2 lg:gap-x-16">
          {rest.map((v) => (
            <figure key={v.id} className="break-inside-avoid border-t border-warm-border pb-10 pt-7">
              <blockquote>
                <p className="font-serif text-h4 font-semibold leading-[1.4] text-navy">
                  {mark('“')}
                  {v.quote}
                  {mark('”')}
                </p>
              </blockquote>
              <Attribution v={v} />
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  );
}
