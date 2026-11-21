import Link from 'next/link';
import type { Metadata } from 'next';
import { blogs, categories, formatDate, type BlogCategory } from '@/data/blogs';
import { blogPath, enquiryPath, routes } from '@/data/navigation';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { photoAsset } from '@/lib/image';
import { BlogLibrary, type LibraryPost, type LibraryTopic } from '@/components/content/blog-library';
import { StoryMeta } from '@/components/content/story';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CtaBand } from '@/components/ui/cta-band';
import { SampleTag } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';

// Blogs (report 8.2, audit 2.7): a journal masthead, the featured story as a cover with a page-coloured plate cut
// into its corner, the searchable library, the topic directory and the closing enquiry. Static: filtering is client-side.

const featured = blogs.find((b) => b.featured) ?? blogs[0];

const topicNotes: Record<BlogCategory, { intro: string; link: { label: string; href: string } }> = {
  umrah: { intro: 'The rites, the visit to Madinah and planning for every age.', link: { label: 'Umrah journeys', href: routes.umrah } },
  hajj: { intro: 'Registration routes from India and the days of Hajj.', link: { label: 'The Hajj journey', href: routes.hajj } },
  preparation: { intro: 'Ihram, packing lists and getting ready to leave.', link: { label: 'Pilgrim guide', href: routes.pilgrimGuide } },
  documents: { intro: 'Passports, photographs and the papers to gather early.', link: { label: 'Visa assistance', href: routes.visa } },
  travel: { intro: 'Destinations abroad, seen through a Muslim traveller’s eyes.', link: { label: 'International tours', href: routes.tours } },
  kerala: { intro: 'Family breaks close to home, at an easy pace.', link: { label: 'Tours in India', href: routes.tours } },
};

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.blogs,
    title: 'Blogs: Umrah, Hajj and travel guides',
    description:
      'Plain-language articles for families in Kerala: Umrah step by step, ihram, visa documents, Hajj registration, packing lists and travel guides from HIJRA.',
    image: featured.image,
  });
}

export default function BlogsPage() {
  const t = dictionary;

  const posts: LibraryPost[] = blogs.map((b) => ({
    slug: b.slug,
    href: blogPath(b.slug),
    title: b.title,
    excerpt: b.excerpt,
    category: categories[b.category],
    date: formatDate(b.date, true),
    dateTime: b.date,
    minutes: b.readingMinutes,
    image: photoAsset(b.image),
    topic: b.category,
    featured: !!b.featured,
    // Searched: title, summary, topic and section headings (not the whole body, to keep the page light).
    haystack: [b.title, b.excerpt, categories[b.category], ...b.body.flatMap((x) => (x.type === 'h2' || x.type === 'h3' ? [x.text] : []))]
      .join(' ')
      .toLowerCase()
      .replace(/[‘’]/g, "'"),
  }));
  const topics: LibraryTopic[] = (Object.keys(categories) as BlogCategory[])
    .filter((c) => blogs.some((b) => b.category === c))
    .map((c) => ({ id: c, label: categories[c], intro: topicNotes[c].intro, link: { ...topicNotes[c].link, href: topicNotes[c].link.href } }));
  const cover = posts.find((p) => p.slug === featured.slug) ?? posts[0];

  return (
    <>
      <section className="pt-nav">
        <div className="wrap pt-6 md:pt-10">
          <Breadcrumbs items={[{ label: t.nav.blogs }]} />
          <div className="site-grid mt-8 items-end gap-y-6 md:mt-12">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow rise">Blogs · Guides and travel notes</p>
              <h1 className="rise rise-2 mt-4 text-display">Guidance, written down.</h1>
            </div>
            <div className="col-span-full md:col-span-6 lg:col-span-4 lg:col-start-9 lg:pb-2">
              <p className="rise rise-3 text-lead">
                Plain-language articles on Umrah, Hajj, documents and travel, for families preparing at home in Kerala.
              </p>
              <p className="rise rise-4 mt-4 text-small text-muted">
                {blogs.length} articles in {topics.length} topics, newest first
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-h" className="pt-10 md:pt-16">
        <div className="wrap">
          <article className="photo-zoom relative">
            {/* From 1200 px the plate rises 6rem into the photo's foreground (never over its subject: report 8.10). The plate
                is positioned, so the title's stretched link covers only the plate: the photo carries the same link, hidden
                from assistive technology and the tab order (the title link names it). */}
            <Link href={blogPath(cover.slug)} tabIndex={-1} aria-hidden="true" className="block">
              <Photo
                image={featured.image}
                priority
                sizes="(min-width: 1920px) 1440px, (min-width: 1360px) 1280px, 100vw"
                className="aspect-[16/9] rounded-[18px] md:rounded-lg lg:aspect-[2/1]"
              />
            </Link>
            <div className="mt-6 md:mt-8 lg:relative lg:-mt-24 lg:w-[min(38rem,52%)] lg:rounded-tr-lg lg:bg-warm-white lg:pr-12 lg:pt-10">
              <p className="eyebrow">Featured · {cover.category}</p>
              <h2 id="featured-h" className="mt-3 text-h2">
                <Link href={blogPath(cover.slug)} className="after:absolute after:inset-0 hover:text-red">
                  {cover.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-[34rem] text-slate">{cover.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <StoryMeta card={cover} />
                <SampleTag>Sample date</SampleTag>
              </div>
              <span className="link-arrow mt-3" aria-hidden="true">
                Read the article
              </span>
            </div>
          </article>
        </div>
      </section>

      <BlogLibrary posts={posts} topics={topics} askHref={enquiryPath()} />

      <CtaBand
        eyebrow="Ask an advisor"
        title="A question these articles don’t answer?"
        body="Ask an advisor in Malayalam or English, by phone, on WhatsApp or at a branch near you."
        cta="Ask a question"
      />
    </>
  );
}
