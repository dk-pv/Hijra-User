'use client';

import { useState } from 'react';
import type { ChecklistGroup } from '@/data/guides';
import { Icon } from '@/components/ui/icons';

// Printing from the checklist's own button prints only the checklist chapter (data-chapter="checklist").
// Everything else on the page, the navigation and the floating buttons are left out of that printout.
const PRINT_CSS = `@media print {
  html[data-print="checklist"] body > :not(#page),
  html[data-print="checklist"] #page > :not(main),
  html[data-print="checklist"] main > :not(:has([data-chapter="checklist"])),
  html[data-print="checklist"] [data-guide-aside],
  html[data-print="checklist"] [data-chapter]:not([data-chapter="checklist"]),
  html[data-print="checklist"] [data-print-hide] { display: none !important; }
  html[data-print="checklist"] main section { padding: 0 !important; }
  html[data-print="checklist"] [data-guide-main] { grid-column: 1 / -1 !important; }
  html[data-print="checklist"] .check input { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}`;

/** The travel checklist: ticks live on this screen only. Nothing is saved, stored or sent. */
export function Checklist({ groups }: { groups: ChecklistGroup[] }) {
  const [done, setDone] = useState<ReadonlySet<string>>(() => new Set());
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const toggle = (id: string) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const print = () => {
    const root = document.documentElement;
    root.dataset.print = 'checklist';
    const reset = () => {
      delete root.dataset.print;
      window.removeEventListener('afterprint', reset);
    };
    window.addEventListener('afterprint', reset);
    window.print();
  };

  return (
    <div>
      <style>{PRINT_CSS}</style>
      <p className="mb-6 hidden border-b border-navy pb-3 text-small text-navy print:block">
        HIJRA Travels | Pilgrim Guide. Confirm the current documents and vaccinations with your advisor before you travel.
      </p>
      <div data-print-hide="" className="flex flex-col gap-4 rounded-md border border-warm-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="flex items-center gap-3 font-semibold text-navy" aria-live="polite">
          <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-warm-border text-caption">
            {done.size}
            <span className="sr-only"> of {total} items ticked</span>
          </span>
          <span aria-hidden="true">of {total} ticked</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={print} className="btn btn-secondary btn-sm">
            <Icon name="document" />
            Print the checklist
          </button>
          <button type="button" onClick={() => setDone(new Set())} disabled={!done.size} className="btn btn-outline btn-sm disabled:cursor-not-allowed disabled:opacity-50">
            Clear ticks
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-x-10 gap-y-9 md:grid-cols-2">
        {groups.map((g) => (
          <fieldset key={g.id} className="min-w-0">
            <legend className="w-full border-b border-warm-border pb-2.5 font-serif text-h4 font-semibold text-navy">{g.title}</legend>
            <ul className="mt-4 grid gap-3.5">
              {g.items.map((it) => {
                const id = `check-${g.id}-${it.id}`;
                return (
                  <li key={it.id}>
                    <label className="check" htmlFor={id}>
                      <input id={id} type="checkbox" checked={done.has(it.id)} onChange={() => toggle(it.id)} />
                      <span className={done.has(it.id) ? 'text-muted' : undefined}>
                        {it.text}
                        {it.note ? <span className="mt-0.5 block text-muted">{it.note}</span> : null}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
      <p data-print-hide="" className="mt-8 text-small text-muted">
        Your ticks stay on this screen only: nothing is saved or sent. Requirements change, so confirm the current documents and vaccinations with your advisor.
      </p>
    </div>
  );
}
