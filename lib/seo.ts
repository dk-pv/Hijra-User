import type { Metadata } from 'next';
import { site } from '@/data/site';
import { images, type ImageKey } from '@/data/images';

const DEFAULT_OG = { url: '/og/hijra-default.jpg', width: 1200, height: 630, alt: 'HIJRA Travels: Hajj and Umrah specialists from Kerala' };

/**
 * Page metadata: unique title and description, canonical URL, Open Graph and Twitter cards.
 * The indexing gate: a page may be indexed only when NEXT_PUBLIC_ALLOW_INDEXING=true (site.indexable) AND it is not a
 * sample record (pass noindex). Until then every page says noindex, nofollow and robots.txt disallows everything.
 */
export function pageMetadata({
  path,
  title,
  description,
  image,
  noindex,
  type = 'website',
}: {
  path: string;
  title: string;
  description: string;
  image?: ImageKey;
  noindex?: boolean;
  type?: 'website' | 'article';
}): Metadata {
  const img = image ? images[image] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: site.indexable && !noindex, follow: site.indexable },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: site.fullName,
      locale: 'en_IN',
      images: [img ? { url: img.src, width: img.width, height: img.height, alt: img.alt } : DEFAULT_OG],
    },
    twitter: { card: 'summary_large_image', title, description, images: [img ? img.src : DEFAULT_OG.url] },
  };
}
