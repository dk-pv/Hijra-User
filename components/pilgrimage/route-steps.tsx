import { site } from '@/data/site';
import type { Step } from '@/data/guides';
import { cn } from '@/lib/cn';
import { Pending } from '@/components/ui/pending';

/**
 * Numbered steps on a red double rule (mock-up 5): a horizontal route with navy markers from 1200 px, a vertical
 * line on phones, and a ruled three-column grid in between. Step titles are h3, so place it under a section h2.
 */
export function RouteSteps({ steps, label, className }: { steps: Step[]; label: string; className?: string }) {
  return (
    <ol
      aria-label={label}
      className={cn('relative grid gap-9 pl-10 md:grid-cols-3 md:gap-x-(--g) md:gap-y-12 md:pl-0 lg:grid-cols-6 lg:gap-gutter lg:pt-[34px]', className)}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-1 left-[6px] top-1 w-[5px] border-x border-red md:hidden lg:block lg:inset-x-0 lg:bottom-auto lg:top-[6px] lg:h-[5px] lg:w-auto lg:border-x-0 lg:border-y"
      />
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="relative before:absolute before:-left-10 before:top-1.5 before:size-[17px] before:rounded-full before:border-2 before:border-navy before:bg-warm-white md:border-t md:border-warm-border md:pt-5 md:before:hidden lg:border-t-0 lg:pt-0 lg:before:block lg:before:-top-[34px] lg:before:left-0"
        >
          <span className="block font-serif text-[1.75rem] font-semibold leading-none text-navy">{i + 1}</span>
          <h3 className="mt-3 font-sans text-ui font-semibold leading-snug text-navy">{s.title}</h3>
          <p className="mt-1.5 max-w-[30rem] text-small text-muted">{s.text}</p>
          {s.confirm && !site.demo ? <Pending className="mt-2 inline-block text-caption">To be confirmed</Pending> : null}
        </li>
      ))}
    </ol>
  );
}
