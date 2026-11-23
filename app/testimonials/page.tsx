import { site } from '@/data/site';
import Link from 'next/link';
import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { pageMetadata } from '@/lib/seo';
import { TestimonialWall } from '@/components/content/testimonial-wall';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon } from '@/components/ui/icons';
import { Note } from '@/components/ui/pending';
import { ClientPhoto } from '@/components/ui/photo';

// Testimonials: a quiet, centred page built to receive real reviews. Sample quotes are labelled; there are no star
// ratings, review counts or review markup (report 11.5). Video slots wait for HIJRA's consented films.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.testimonials,
    title: 'Testimonials from pilgrims and travellers',
    description:
      'What pilgrims and travellers say about their journeys with HIJRA Travels. Reviews appear only with written consent; this preview shows sample quotes.',
  });
}

const principles = [
  {
    title: 'Written consent first',
    text: 'A review or video appears only after the person agrees in writing, including how their name, town and year are shown.',
  },
  {
    title: 'Published as written',
    text: 'Reviews are never edited, rewritten or combined. A review given in Malayalam is published in an English translation that the reviewer has approved.',
  },
  { title: 'Never paid for', text: 'No payment, discount or gift is offered in return for a review.' },
  { title: 'No ratings or totals', text: 'There are no star ratings or review counts here: only people’s own words about their journeys.' },
  { title: 'Removed on request', text: 'Anyone can ask for their review or video to be taken down, at any time, and it is removed.' },
];

const films = [
  { subject: 'A first Umrah, in the pilgrim’s own words', service: 'Umrah', image: 'makkah-tawaf-night' as const },
  { subject: 'A family’s Hajj, a few weeks after returning home', service: 'Hajj', image: 'hajj-arafat-plain' as const },
  { subject: 'Taking elderly parents for Umrah', service: 'Umrah', image: 'madinah-piazza-umbrellas' as const },
  { subject: 'A family tour within India', service: 'Tours', image: 'india-agra-taj-mahal' as const },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="pt-nav">
        <div className="wrap pt-6 md:pt-10">
          <Breadcrumbs items={[{ label: 'Testimonials' }]} />
          <div className="mx-auto mt-10 max-w-[48rem] md:mt-14 md:text-center">
            <p className="eyebrow rise">Testimonials</p>
            <h1 className="rise rise-2 mt-4 text-display">Voices from the journey.</h1>
            <p className="rise rise-3 mx-auto mt-6 max-w-[36rem] text-lead">
              What pilgrims and travellers say after a journey with HIJRA, published only with their written consent.
            </p>
            <Note className="rise rise-4 mx-auto mt-8 max-w-[40rem] text-left">
              The quotes below are samples that show how this page will look. Real reviews replace them, with the name, town and year
              each reviewer approves.
            </Note>
          </div>
        </div>
      </section>

      <section aria-labelledby="voices-h" className="py-section">
        <h2 id="voices-h" className="sr-only">
          Testimonials
        </h2>
        <TestimonialWall />
        <div className="wrap mt-12 flex flex-wrap gap-x-8 md:mt-16 md:justify-center">
          <Link href={routes.pilgrimStories} className="link-arrow">
            Pilgrim stories
          </Link>
          <Link href={routes.about} className="link-arrow">
            About HIJRA
          </Link>
        </div>
      </section>

      <section aria-labelledby="publish-h" className="on-dark bg-deep py-section">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-5">
            <span className="rule-double mb-5" aria-hidden="true" />
            <p className="eyebrow">How we publish reviews</p>
            <h2 id="publish-h" className="mt-3 text-h2">
              Every word with permission.
            </h2>
            <p className="mt-4 max-w-[34rem] text-lead">
              A review is someone’s own account of a journey that mattered to them. These are the rules a review passes before it appears
              here.
            </p>
            <div className="mt-10 border-t border-white/15 pt-8">
              <p className="font-semibold text-warm-white">Travelled with HIJRA?</p>
              <p className="mt-1 text-small">We would be glad to hear how your journey went, in your own words.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ContactAction
                  kind="whatsapp"
                  message="Assalamu alaikum. I travelled with HIJRA and would like to share my experience."
                  className="btn btn-light btn-sm"
                >
                  <Icon name="whatsapp" />
                  Share your experience
                </ContactAction>
                <Link href={routes.contact} className="btn btn-outline-light btn-sm">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
          <ol className="col-span-full border-t border-white/15 lg:col-span-6 lg:col-start-7">
            {principles.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-b border-white/15 py-6 md:grid-cols-[4rem_minmax(0,1fr)] md:py-7">
                <span className="font-serif text-h4 font-semibold tabular-nums text-sand">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-h4">{p.title}</h3>
                  <p className="mt-1.5 text-small">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="films-h" className="bg-warm-grey py-section">
        <div className="wrap">
          <div className="site-grid items-end gap-y-5">
            <div className="col-span-full lg:col-span-6">
              <p className="eyebrow">Pilgrim videos</p>
              <h2 id="films-h" className="mt-3 text-h2">
                In their own voices.
              </h2>
            </div>
            <p className="col-span-full max-w-[34rem] md:col-span-6 lg:col-span-5 lg:col-start-8">
              Short films recorded with pilgrims’ consent will appear here, with captions. None plays until you tap it.
            </p>
          </div>
          <ul className="-mx-[var(--m)] mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--m)] pb-2 [scrollbar-width:none] md:mx-0 md:mt-14 md:grid md:grid-cols-4 md:gap-gutter md:overflow-visible md:px-0 md:pb-0">
            {films.map((f) => (
              <li key={f.subject} className="w-[64%] max-w-[17rem] shrink-0 snap-start md:w-auto md:max-w-none">
                <figure>
                  <ClientPhoto subject={f.subject} title="Video with consent" icon="video" image={f.image} sizes="(min-width: 810px) 22vw, 64vw" className="aspect-[9/16] rounded-md" />
                  <figcaption className="mt-3 text-caption text-muted">{f.service} · {site.demo ? 'sample poster' : 'supplied by HIJRA'}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Your journey"
        title="Ready to plan a journey of your own?"
        body="Tell us what you have in mind. An advisor replies with dates and fares; nothing is booked or paid online."
      />
    </>
  );
}
