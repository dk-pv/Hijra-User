import Link from 'next/link';
import type { ReactNode } from 'react';
import { ContactAction } from '@/components/ui/contact-action';
import { Icon, type IconName } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

export type Route = {
  icon: IconName;
  text: ReactNode;
  /** Small label above the text (large lists), e.g. 'Phone'. */
  label?: string;
  /** Read before the text by screen readers when there is no label, e.g. 'Call '. */
  srPrefix?: string;
  /** Verb shown before the arrow on large lists, e.g. 'Call'. */
  action?: string;
} & ({ kind: 'call' | 'whatsapp' | 'email'; href?: never } | { href: string; kind?: never });

/** Small caps label above a ledger value, indented past the 22 px icon and its gap so icon and value share a line. */
export const ledgerLabel = 'mb-1 block pl-9 text-caption font-semibold uppercase tracking-[0.12em] text-muted';

/** Hairline-ruled contact routes: each row is one target (call, WhatsApp, email or a page) ending in an arrow. */
export function RouteList({ routes, large, className }: { routes: Route[]; large?: boolean; className?: string }) {
  const row = cn(
    'group flex w-full cursor-pointer items-center justify-between gap-4 text-left text-navy',
    large ? 'min-h-[88px] py-4' : 'min-h-[60px] py-2 font-semibold',
  );
  return (
    <ul className={cn('border-t border-warm-border', className)}>
      {routes.map((r, i) => {
        const body = (
          <>
            <span className="min-w-0">
              {r.label ? <span className={ledgerLabel}>{r.label}</span> : null}
              <span className="flex items-center gap-3.5">
                <Icon name={r.icon} size={large ? 22 : 20} className={cn('shrink-0', r.icon === 'whatsapp' && 'text-wa')} />
                <span className={cn('min-w-0', large && 'font-serif text-h4 font-semibold')}>
                  {r.srPrefix && !r.label ? <span className="sr-only">{r.srPrefix}</span> : null}
                  {r.text}
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-2 text-small font-semibold transition-colors group-hover:text-red">
              {large && r.action ? <span className="hidden sm:inline">{r.action}</span> : null}
              <Icon name="arrowRight" size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </>
        );
        return (
          <li key={i} className="border-b border-warm-border">
            {r.kind ? (
              <ContactAction kind={r.kind} className={row}>
                {body}
              </ContactAction>
            ) : (
              <Link href={r.href} className={row}>
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
