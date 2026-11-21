'use client';

import { Fragment, useSyncExternalStore } from 'react';
import { dayNames, type Day, type WeekHours } from '@/data/branches';
import { cn } from '@/lib/cn';
import { dayRanges, week, weekSummary } from './branch-data';

// Today's row follows the date in India (Asia/Kolkata), so a visitor abroad sees the branch's day, not their own.
// The page is static, so the day is only known in the browser: the server renders the week without a highlight.

const indiaWeekday = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short' });
const today = () => indiaWeekday.format(new Date()).toLowerCase() as Day;
const subscribe = () => () => {};

export function useIndiaDay(): Day | null {
  return useSyncExternalStore(subscribe, today, () => null);
}

/** A day's opening times; each range stays on one line, so a narrow column wraps between ranges, never inside one. */
function Times({ hours, day }: { hours: WeekHours; day: Day }) {
  const ranges = dayRanges(hours, day);
  if (!ranges.length) return 'Closed';
  return ranges.map((r, i) => (
    <Fragment key={r}>
      {i ? ' ' : null}
      <span className="whitespace-nowrap">
        {r}
        {i < ranges.length - 1 ? ',' : null}
      </span>
    </Fragment>
  ));
}

/** Two lines for a branch card: today's hours once the day is known, the week's pattern before that. */
export function TodayHours({ hours, className }: { hours: WeekHours; className?: string }) {
  const day = useIndiaDay();
  const s = weekSummary(hours);
  return (
    <p className={className}>
      <span className="block font-semibold text-navy">{day ? `Today, ${dayNames[day]}` : s.open}</span>
      <span className="block">{day ? <Times hours={hours} day={day} /> : s.closed}</span>
    </p>
  );
}

/** The week as a table (th scope="row" per day) with today highlighted. `compact` (branch cards) shows 'Mon', 'Tue'… */
export function HoursTable({ hours, caption, compact, className }: { hours: WeekHours; caption: string; compact?: boolean; className?: string }) {
  const day = useIndiaDay();
  return (
    <table className={cn('w-full border-collapse', className)}>
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {week.map((d) => {
          const isToday = d === day;
          return (
            <tr key={d} className={cn('border-t border-warm-border last:border-b', isToday && 'bg-warm-grey text-navy')}>
              <th scope="row" className={cn('py-[0.7em] pl-3 pr-4 text-left align-top', isToday ? 'font-semibold' : 'font-normal')}>
                {compact ? (
                  <>
                    <span aria-hidden="true">{dayNames[d].slice(0, 3)}</span>
                    <span className="sr-only">{dayNames[d]}</span>
                  </>
                ) : (
                  dayNames[d]
                )}
                {isToday ? ' (today)' : null}
              </th>
              <td className={cn('py-[0.7em] pr-3 text-right', isToday && 'font-semibold')}>
                <Times hours={hours} day={d} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
