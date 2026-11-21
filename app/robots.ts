import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

/** Crawlers stay out until launch (NEXT_PUBLIC_ALLOW_INDEXING=true): the preview carries sample content. */
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.url}/sitemap.xml` };
}
