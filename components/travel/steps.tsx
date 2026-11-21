import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

// Numbered steps on the double rule, the same device as the homepage's days of Hajj: vertical by default, across the
// page from 1200 px with `across`. Red rule on light surfaces, sand on Deep Navy.

const across3to5 = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' } as Record<number, string>;

export function Steps({
  items,
  across,
  dark,
  dots,
  label,
  className,
}: {
  items: { title: string; text: ReactNode; label?: string }[];
  across?: boolean;
  dark?: boolean;
  /** Plain markers instead of numbers, when each item carries its own label (e.g. 'Day 2'). */
  dots?: boolean;
  /** Accessible name for the list, e.g. 'How a flight enquiry works'. */
  label?: string;
  className?: string;
}) {
  return (
    <ol
      aria-label={label}
      className={cn('relative grid gap-9 pl-14', across && cn('lg:gap-gutter lg:pl-0 lg:pt-16', across3to5[items.length]), className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-2 left-[13px] top-2 w-[5px] border-x',
          dark ? 'border-sand' : 'border-red',
          across && 'lg:inset-x-0 lg:bottom-auto lg:top-[14px] lg:h-[5px] lg:w-auto lg:border-x-0 lg:border-y',
        )}
      />
      {items.map((s, i) => (
        <li key={s.title} className="relative">
          <span
            aria-hidden="true"
            className={cn(
              'absolute grid place-items-center rounded-full font-serif text-[1.0625rem] font-semibold leading-none',
              dots ? '-left-[47px] top-[3px] size-[14px] border-2' : '-left-14 top-0 size-8 border-[1.5px]',
              dark ? 'border-sand bg-deep text-sand' : 'border-red bg-white text-red',
              across && (dots ? 'lg:-top-[55px] lg:left-0' : 'lg:-top-16 lg:left-0'),
            )}
          >
            {dots ? null : i + 1}
          </span>
          {s.label ? (
            <p className={cn('pt-1.5 text-caption font-semibold uppercase leading-none tracking-[0.12em]', dark ? 'text-sand' : 'text-red')}>{s.label}</p>
          ) : null}
          <h3 className={cn('text-h4', s.label ? 'mt-2.5' : 'pt-1')}>{s.title}</h3>
          <div className={cn('mt-2 max-w-[36rem]', !dark && 'text-slate')}>{s.text}</div>
        </li>
      ))}
    </ol>
  );
}
