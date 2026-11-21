import Link from 'next/link';
import { getBlog } from '@/data/blogs';
import { blogPath } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icons';

export type IndexLink = { href: string; label: string; text?: string };

/** Links to blog articles by slug; an article that no longer exists is simply left out. */
export const articleLinks = (slugs: string[]): IndexLink[] =>
  slugs.flatMap((slug) => {
    const b = getBlog(slug);
    return b ? [{ href: blogPath(b.slug), label: b.title, text: `Article · ${b.readingMinutes} min read` }] : [];
  });

/** A hairline-ruled list of onward links (related guides, chapters), each row one link. */
export function LinkIndex({ links, label, onDark, className }: { links: IndexLink[]; label: string; onDark?: boolean; className?: string }) {
  return (
    <ul aria-label={label} className={cn('border-b', onDark ? 'border-white/15' : 'border-warm-border', className)}>
      {links.map((l) => (
        <li key={l.href + l.label}>
          <Link
            href={l.href}
            className={cn(
              'group flex min-h-16 items-center justify-between gap-4 border-t py-3.5',
              onDark ? 'border-white/15 text-warm-white' : 'border-warm-border text-navy',
            )}
          >
            <span>
              <span className="block font-semibold group-hover:underline group-hover:underline-offset-4">{l.label}</span>
              {l.text ? <span className={cn('mt-0.5 block text-small', onDark ? 'text-mist' : 'text-muted')}>{l.text}</span> : null}
            </span>
            <Icon name="arrowRight" className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
