import Link from 'next/link';
import { blogs, categories } from '@/data/blogs';
import { blogPath, routes } from '@/data/navigation';
import { Photo } from '@/components/ui/photo';

/** Homepage section 11: one lead guide with a photograph beside a hairline list of four more. */
export function Guides() {
  const lead = blogs.find((b) => b.featured) ?? blogs[0];
  const rest = blogs.filter((b) => b.slug !== lead.slug).slice(0, 4);
  return (
    <div className="site-grid gap-y-10">
      <article className="col-span-full lg:col-span-6">
        <Link href={blogPath(lead.slug)} className="group block">
          <Photo image={lead.image} sizes="(min-width: 1200px) 46vw, 100vw" className="aspect-[3/2] rounded-md" />
          <p className="eyebrow mt-5">{categories[lead.category]}</p>
          <h3 className="mt-2 text-h3 group-hover:text-red">{lead.title}</h3>
          <p className="mt-2 max-w-[36rem] text-muted">{lead.excerpt}</p>
          <p className="mt-3 text-caption text-muted">
            {lead.readingMinutes} min read · Sample article
          </p>
        </Link>
      </article>
      <div className="col-span-full lg:col-span-5 lg:col-start-8">
        <ul>
          {rest.map((b) => (
            <li key={b.slug} className="border-t border-warm-border last:border-b">
              <Link href={blogPath(b.slug)} className="group block py-5">
                <p className="eyebrow">{categories[b.category]}</p>
                <h3 className="mt-2 text-[clamp(1.25rem,1.1rem+0.4vw,1.375rem)] leading-snug group-hover:text-red">{b.title}</h3>
                <p className="mt-1.5 text-caption text-muted">{b.readingMinutes} min read</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-7">
          <Link href={routes.pilgrimGuide} className="link-arrow">
            The Pilgrim Guide
          </Link>
          <Link href={routes.blogs} className="link-arrow">
            All articles
          </Link>
        </div>
      </div>
    </div>
  );
}
