import Link from 'next/link';
import { dictionary as t } from '@/lib/dictionary';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

type Crumb = { label: string; href?: string };

/** Breadcrumb trail with BreadcrumbList structured data (site structure only, nothing unverified). Home is added first. */
export function Breadcrumbs({ items, className, onDark }: { items: Crumb[]; className?: string; onDark?: boolean }) {
  const trail: Crumb[] = [{ label: t.common.home, href: '/' }, ...items];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label={t.common.breadcrumb} className={cn('text-small', onDark ? 'text-mist' : 'text-muted', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {c.href && i < trail.length - 1 ? (
              <Link href={c.href} className={cn('underline-offset-4 hover:underline', onDark ? 'text-warm-white' : 'text-navy')}>
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === trail.length - 1 ? 'page' : undefined}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </nav>
  );
}
