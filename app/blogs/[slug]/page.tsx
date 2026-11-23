import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { blogs, categories, formatDate, getBlog, type BlogCategory, type BlogPost } from '@/data/blogs';
import { images } from '@/data/images';
import { blogPath, routes, type ServiceKey } from '@/data/navigation';
import { site } from '@/data/site';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { photoAsset } from '@/lib/image';
import { ArticleBody, withPending } from '@/components/content/article-body';
import { ShareActions } from '@/components/content/share-actions';
import { StoryRow, StoryTile, type StoryCard } from '@/components/content/story';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon } from '@/components/ui/icons';
import { Note, SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';

// Blog article (report 8.2): a 68-character reading column, a contents list (sticky from 1200 px), share actions,
// related articles and a closing enquiry matched to the article's subject.

const closing: Record<BlogCategory, { service: ServiceKey; title: string; body: string; cta: string }> = {
  umrah: {
    service: 'umrah',
    title: 'Planning your Umrah?',
    body: 'An advisor can answer the questions this article leaves open.',
    cta: 'Ask about Umrah',
  },
  hajj: {
    service: 'hajj',
    title: 'Thinking about Hajj?',
    body: 'Register your interest, and an advisor will explain the routes, the timings and what to prepare.',
    cta: 'Register your interest',
  },
  preparation: {
    service: 'umrah',
    title: 'Questions before you travel?',
    body: 'Ask an advisor about ihram, packing or anything else on your list.',
    cta: 'Ask an advisor',
  },
  documents: {
    service: 'visa',
    title: 'Want your documents checked?',
    body: 'An advisor will go through your papers with you before anything is submitted.',
    cta: 'Ask about a visa',
  },
  travel: {
    service: 'tour',
    title: 'Planning a holiday abroad?',
    body: 'Tell us where you would like to go, and an advisor will shape the itinerary around your family.',
    cta: 'Ask about a tour',
  },
  kerala: {
    service: 'tour',
    title: 'Planning a family break in Kerala?',
    body: 'Tell us your dates and who is travelling, and an advisor will suggest a route at a gentle pace.',
    cta: 'Ask about a tour',
  },
};

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();
  // Sample articles stay noindex (like sample tours and branches) even after the site-wide gate opens.
  return pageMetadata({ path: blogPath(slug), title: post.title, description: post.excerpt, image: post.image, type: 'article', noindex: post.sample });
}

/** The slug is URL data: it is read inside Suspense so the route's shared App Shell stays valid (Partial Prefetching).
    Every slug is prerendered, so visitors get the full article in the HTML; the holder only shows during navigation. */
export default function BlogArticlePage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-svh pt-nav" aria-busy="true" />}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: Props) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();
  const t = dictionary;

  const url = `${site.url}${blogPath(post.slug)}`;
  const contents = post.body.flatMap((b) => (b.type === 'h2' ? [b] : []));
  const related = post.related.flatMap((s) => getBlog(s) ?? []).map(
    (b: BlogPost): StoryCard => ({
      slug: b.slug,
      href: blogPath(b.slug),
      title: b.title,
      excerpt: b.excerpt,
      category: categories[b.category],
      date: formatDate(b.date, true),
      dateTime: b.date,
      minutes: b.readingMinutes,
      image: photoAsset(b.image),
    }),
  );
  const end = closing[post.category];
  const img = images[post.image];
  // Article structured data without the sample date or byline: only what is true of the page.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [`${site.url}${img.src}`],
    inLanguage: 'en',
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.fullName, url: site.url },
  };

  return (
    <>
      <article>
        <header className="pt-nav">
          <div className="wrap pt-6 md:pt-10">
            <Breadcrumbs items={[{ label: t.nav.blogs, href: routes.blogs }, { label: post.title }]} />
            <div className="site-grid mt-8 gap-y-5 md:mt-12">
              <div className="col-span-full lg:col-span-10">
                <p className="eyebrow rise">{categories[post.category]}</p>
                <h1 className="rise rise-2 mt-4 max-w-[24ch] text-h2 md:text-h1">{post.title}</h1>
              </div>
              <p className="rise rise-3 col-span-full max-w-[38rem] text-lead md:col-span-7">{post.excerpt}</p>
              <div className="rise rise-4 col-span-full mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-small text-muted">
                <span className="flex items-center gap-2">
                  <Icon name="users" size={18} className="text-navy" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="calendar" size={18} className="text-navy" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="clock" size={18} className="text-navy" />
                  {post.readingMinutes} min read
                </span>
                <SampleTag>Sample byline and date</SampleTag>
              </div>
            </div>
            <figure className="mt-10 md:mt-14">
              <Photo
                image={post.image}
                priority
                sizes="(min-width: 1920px) 1440px, (min-width: 1360px) 1280px, 100vw"
                className="aspect-[16/9] rounded-[18px] md:aspect-[2/1] md:rounded-lg lg:aspect-[21/9]"
              />
              <figcaption className="mt-3 text-caption text-muted">
                {img.alt}. <span className="whitespace-nowrap">Temporary image{img.credit.author ? `: ${img.credit.author}` : ''}.</span>
              </figcaption>
            </figure>
          </div>
        </header>

        <div className="wrap site-grid gap-y-10 pb-section pt-12 md:pt-16">
          <nav aria-labelledby="contents-h" className="col-span-full md:col-span-6 lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
            <p id="contents-h" className="eyebrow">
              In this article
            </p>
            <ol className="mt-4 border-t border-warm-border">
              {contents.map((h, i) => (
                <li key={h.id} className="border-b border-warm-border">
                  <a href={`#${h.id}`} className="flex min-h-11 gap-3 py-3 text-small font-semibold text-navy hover:text-red">
                    <span className="w-6 shrink-0 font-normal tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="col-span-full lg:col-span-7 lg:col-start-5 xl:col-span-6 xl:col-start-5">
            {post.religious ? (
              <Note className="mb-10">
                {(site.demo ? (x: string) => x.replace(/[[\]]/g, '') : withPending)('Before publication, this article is reviewed by [HIJRA’s religious adviser]. For the rulings that apply to you, follow the scholars you trust.')}
              </Note>
            ) : null}
            <ArticleBody blocks={post.body} className="max-w-[40rem]" />
            <footer className="mt-14 max-w-[40rem] border-t border-warm-border pt-8">
              <ShareActions title={post.title} url={url} />
            </footer>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      </article>

      {related.length ? (
        <section aria-labelledby="related-h" className="bg-warm-grey py-section">
          <div className="wrap site-grid gap-y-10">
            <div className="col-span-full flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <div>
                <p className="eyebrow">Keep reading</p>
                <h2 id="related-h" className="mt-3 text-h2">
                  Related articles
                </h2>
              </div>
              <SampleTag>Sample dates</SampleTag>
            </div>
            <div className="col-span-full md:col-span-4 lg:col-span-6">
              <StoryTile card={related[0]} />
            </div>
            <div className="col-span-full md:col-span-4 lg:col-span-5 lg:col-start-8">
              <div className="border-b border-warm-border">
                {related.slice(1).map((c) => (
                  <StoryRow key={c.slug} card={c} compact />
                ))}
              </div>
              <Link href={routes.blogs} className="link-arrow mt-6">
                All articles
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand eyebrow="Ask an advisor" title={end.title} body={end.body} service={end.service} cta={end.cta} />
    </>
  );
}
