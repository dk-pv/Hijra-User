import type { MetadataRoute } from 'next';
import { routes, tourPath, blogPath } from '@/data/navigation';
import { site } from '@/data/site';
import { tours } from '@/data/tours';
import { blogs } from '@/data/blogs';

// One canonical English URL per page. Sample records (branches, tours, articles) are excluded until they are real,
// and legal or utility pages are left out. Crawlers only read this once NEXT_PUBLIC_ALLOW_INDEXING=true (see robots.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = [
    routes.home,
    routes.about,
    routes.branches,
    routes.hajjUmrah,
    routes.hajj,
    routes.umrah,
    routes.pilgrimGuide,
    routes.pilgrimStories,
    routes.tours,
    routes.flights,
    routes.visa,
    routes.blogs,
    routes.gallery,
    routes.testimonials,
    routes.bookATrip,
    routes.contact,
    // Sample records are never indexed; real tours and articles appear here once their `sample` flag is removed.
    ...tours.filter((t) => !t.sample).map((t) => tourPath(t.slug)),
    ...blogs.filter((b) => !b.sample).map((b) => blogPath(b.slug)),
  ];
  return paths.map((p) => ({ url: `${site.url}${p === '/' ? '' : p}` }));
}
