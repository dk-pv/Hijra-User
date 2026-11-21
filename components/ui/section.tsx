import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Eyebrow, heading and lead for a section. Use `as` for the right heading level; one h1 per page. */
export function SectionIntro({
  eyebrow,
  title,
  lead,
  rule,
  as: Heading = 'h2',
  size = 'h2',
  className,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  rule?: boolean;
  as?: ElementType;
  size?: 'display' | 'h1' | 'h2' | 'h3';
  className?: string;
  children?: ReactNode;
}) {
  const sizes = { display: 'text-display', h1: 'text-h1', h2: 'text-h2', h3: 'text-h3' };
  return (
    <div className={cn('max-w-[46rem]', className)}>
      {rule ? <span className="rule-double mb-5" aria-hidden="true" /> : null}
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className={cn(sizes[size], eyebrow ? 'mt-3' : undefined)}>{title}</Heading>
      {lead ? <p className="mt-4 max-w-[38rem] text-lead">{lead}</p> : null}
      {children}
    </div>
  );
}
