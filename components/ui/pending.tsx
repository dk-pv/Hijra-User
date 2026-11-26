import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from './icons';

/**
 * Launch guard. A launch build (NEXT_PUBLIC_ALLOW_INDEXING=true) must not show anything unconfirmed, so rendering a
 * pending mark, a sample label or an empty photo slot there throws, and prerendering stops the build. It lives in
 * the build itself, so neither `npm run build` nor `next build` can ship one. (The variable is read directly, not
 * through data/site.ts, so client components that use these marks do not bundle the site data.)
 */
export function assertTrial(what: string) {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true')
    throw new Error(`Launch build blocked: a page still shows ${what}. Supply the verified content or remove it (see docs/milestone-2-handover.md, launch checklist).`);
}

/** A fact HIJRA has not supplied yet, e.g. <Pending>Central phone number</Pending>. Never replace with an invented value. */
export function Pending({ children, className }: { children: ReactNode; className?: string }) {
  assertTrial(`a pending placeholder (${typeof children === 'string' ? children : 'to be supplied by HIJRA'})`);
  return (
    <span className={cn('pending', className)} title="To be supplied by HIJRA">
      [{children}]
    </span>
  );
}

/** Marks a record as sample content (branches, packages, testimonials, stories, dates). */
export function SampleTag({ children = 'Sample', className }: { children?: ReactNode; className?: string }) {
  assertTrial(`a sample label (${typeof children === 'string' ? children : 'Sample'})`);
  return <span className={cn('sample-tag', className)}>{children}</span>;
}

/** A short boxed note: what is sample, what needs verifying, what the visitor should know. */
export function Note({ children, className, tone = 'light' }: { children: ReactNode; className?: string; tone?: 'light' | 'dark' }) {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-md border px-4 py-3 text-small',
        tone === 'dark' ? 'border-white/20 bg-white/5 text-mist' : 'border-warm-border bg-warm-grey text-slate',
        className,
      )}
    >
      <Icon name="info" className={cn('mt-0.5 shrink-0', tone === 'dark' ? 'text-sand' : 'text-navy')} />
      <div>{children}</div>
    </div>
  );
}
