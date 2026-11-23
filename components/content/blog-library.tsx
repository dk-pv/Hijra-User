'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import type { BlogCategory } from '@/data/blogs';
import { Icon } from '@/components/ui/icons';
import { SampleTag } from '@/components/ui/pending';
import { FilterChips } from './filter-chips';
import { StoryLead, StoryRow, StoryTile, type StoryCard } from './story';

// The /blogs library: topic chips and a search box over a list with editorial rhythm (a lead story, a two-up, then
// hairline rows), a live result count, "show more", a designed empty state, and the topic directory below.

export type LibraryPost = StoryCard & { topic: BlogCategory; featured: boolean; haystack: string };
export type LibraryTopic = { id: BlogCategory; label: string; intro: string; link: { label: string; href: string } };

const PAGE = 6;
const SUGGESTIONS = ['ihram', 'visa', 'Madinah', 'Hajj'];
const norm = (s: string) => s.toLowerCase().replace(/[‘’]/g, "'");

export function BlogLibrary({ posts, topics, askHref }: { posts: LibraryPost[]; topics: LibraryTopic[]; askHref: string }) {
  const [topic, setTopic] = useState<BlogCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(PAGE);

  const words = norm(query).split(/\s+/).filter(Boolean);
  const filtering = topic !== 'all' || words.length > 0;
  // Unfiltered, the featured story is already on the page above, so the list starts with the next one.
  const results = posts.filter(
    (p) => (filtering || !p.featured) && (topic === 'all' || p.topic === topic) && words.every((w) => p.haystack.includes(w)),
  );
  const shown = results.slice(0, limit);
  const pair = shown.length >= 3 ? shown.slice(1, 3) : [];
  const rows = shown.slice(1 + pair.length);
  const remaining = results.length - shown.length;

  const n = results.length;
  const label = topics.find((t) => t.id === topic)?.label;
  const q = query.trim();
  const status = !filtering
    ? `${n} more articles, newest first`
    : `${n === 0 ? 'No' : n} ${n === 1 ? 'article' : 'articles'}${label ? ` in ${label}` : ''}${q ? ` ${n === 1 ? 'matches' : 'match'} “${q}”` : ''}`;

  const choose = (next: BlogCategory | 'all') => {
    setTopic(next);
    setLimit(PAGE);
  };
  const search = (next: string) => {
    setQuery(next);
    setLimit(PAGE);
  };
  const reset = () => {
    choose('all');
    setQuery('');
  };
  const showMore = () => {
    const first = results[limit];
    flushSync(() => setLimit((l) => l + PAGE));
    document.getElementById(`story-${first.slug}`)?.focus();
  };

  const options = [
    { value: 'all' as const, label: 'All', count: posts.length },
    ...topics.map((t) => ({ value: t.id, label: t.label, count: posts.filter((p) => p.topic === t.id).length })),
  ];

  return (
    <>
      <section id="articles" aria-labelledby="articles-h" className="py-section">
        <div className="wrap">
          <div className="site-grid items-end gap-y-8">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow">All articles</p>
              <h2 id="articles-h" className="mt-3 text-h2">
                Find the article you need.
              </h2>
            </div>
            <div className="col-span-full md:col-span-5 lg:col-span-4 lg:col-start-9">
              <label htmlFor="blog-search" className="field-label">
                Search articles
              </label>
              <div className="relative mt-1.5">
                <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => search(e.target.value)}
                  placeholder="For example: ihram, visa"
                  autoComplete="off"
                  aria-describedby="blog-status"
                  className="field-input pl-12"
                />
              </div>
            </div>
          </div>

          <FilterChips name="blog-topic" legend="Filter articles by topic" options={options} value={topic} onChange={choose} className="mt-8" />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-warm-border pb-4">
            <p id="blog-status" role="status" className="text-small font-semibold text-navy">
              {status}
            </p>
            <SampleTag>Sample dates</SampleTag>
          </div>

          {n === 0 ? (
            <div className="mx-auto mt-12 max-w-[40rem] rounded-lg border border-dashed border-field/50 bg-white px-6 py-12 text-center md:px-12">
              <Icon name="search" size={28} className="mx-auto text-navy" />
              <h3 className="mt-4 text-h4">
                Nothing matches {q ? `“${q}”` : 'this search'}
                {label ? ` in ${label}` : ''}.
              </h3>
              <p className="mt-3 text-muted">
                Try a shorter word or another topic. Or ask us directly: an advisor will answer.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Try searching for">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => {
                      choose('all');
                      search(s);
                    }} className="chip min-h-11 cursor-pointer border border-warm-border bg-warm-white px-4 hover:border-navy">
                    {s}
                  </button>
                ))}
              </div>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={reset} className="btn btn-outline btn-sm">
                  Show all articles
                </button>
                <Link href={askHref} className="btn btn-secondary btn-sm">
                  Ask an advisor
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-10 md:mt-14">
              <StoryLead card={shown[0]} linkId={`story-${shown[0].slug}`} />
              {pair.length ? (
                <div className="mt-14 grid gap-x-[var(--g)] gap-y-12 border-t border-warm-border pt-10 md:mt-20 md:grid-cols-2 md:pt-14">
                  {pair.map((c) => (
                    <StoryTile key={c.slug} card={c} linkId={`story-${c.slug}`} />
                  ))}
                </div>
              ) : null}
              {rows.length ? (
                <div className="mt-14 border-b border-warm-border md:mt-20">
                  {rows.map((c) => (
                    <StoryRow key={c.slug} card={c} linkId={`story-${c.slug}`} />
                  ))}
                </div>
              ) : null}
              {remaining > 0 ? (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <button type="button" onClick={showMore} className="btn btn-outline">
                    Show {Math.min(PAGE, remaining)} more {Math.min(PAGE, remaining) === 1 ? 'article' : 'articles'}
                  </button>
                  <p className="text-caption text-muted">
                    Showing {shown.length} of {n}
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="topics-h" className="bg-warm-grey py-section">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">Topics</p>
            <h2 id="topics-h" className="mt-3 text-h2">
              From reading to planning.
            </h2>
            <p className="mt-4 max-w-[34rem] text-lead">Each topic leads on to the part of HIJRA that can help next.</p>
          </div>
          <ul className="col-span-full grid border-t border-warm-border sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {topics.map((t, i) => {
              const count = options.find((o) => o.value === t.id)?.count ?? 0;
              return (
                <li
                  key={t.id}
                  className={`border-b border-warm-border py-6 sm:py-7 ${i % 2 ? 'sm:border-l sm:pl-7' : 'sm:pr-7'}`}
                >
                  <h3 className="text-h4">{t.label}</h3>
                  <p className="mt-1.5 text-small text-muted">{t.intro}</p>
                  <div className="mt-3 flex flex-wrap gap-x-6">
                    <a href="#articles" onClick={() => {
                        choose(t.id);
                        setQuery('');
                      }} className="link-arrow text-small">
                      {count === 1 ? 'Read the article' : `Read ${count} articles`}
                    </a>
                    <Link href={t.link.href} className="link-arrow text-small">
                      {t.link.label}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
