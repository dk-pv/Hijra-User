import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from './icons';

/** A fact HIJRA has not supplied yet, e.g. <Pending>Central phone number</Pending>. Never replace with an invented value. */
export function Pending({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('pending', className)} title="To be supplied by HIJRA">
      [{children}]
    </span>
  );
}

/** Marks a record as sample content (branches, packages, testimonials, stories, dates). */
export function SampleTag({ children = 'Sample', className }: { children?: ReactNode; className?: string }) {
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
