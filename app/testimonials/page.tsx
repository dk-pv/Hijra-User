import Link from 'next/link';
import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { categoryLabel } from '@/data/testimonials';
import { pageMetadata } from '@/lib/seo';
import { TestimonialBrowser } from '@/components/content/testimonial-browser';
import { videoItems, writtenItems } from '@/components/content/testimonial-items';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon } from '@/components/ui/icons';
import { Note } from '@/components/ui/pending';

// Testimonials: written reviews and videos in one place, filtered together by service. Sample records are labelled;
// there are no star ratings, review counts or review markup (report 11.5). Then how reviews are published, and the
// closing enquiry.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.testimonials,
    title: 'Testimonials from pilgrims and travellers',
    description:
      'Written reviews and videos from pilgrims and travellers about Hajj, Umrah and tours with HIJRA Travels, published only with their written consent.',
  });
}

const principles = [
  {
    title: 'Written consent first',
    text: 'A review or video appears only after the person agrees in writing, including how their name, town, year and face are shown.',
  },
  {
    title: 'Published as written',
    text: 'Reviews are never edited, rewritten or combined. A review given in Malayalam is published in an English translation that the reviewer has approved.',
  },
  { title: 'Never paid for', text: 'No payment, discount or gift is offered in return for a review.' },
  { title: 'No ratings or totals', text: 'There are no star ratings or review counts here: only people’s own words about their journeys.' },
  { title: 'Removed on request', text: 'Anyone can ask for their review or video to be taken down, at any time, and it is removed.' },
];

const allSample = [...videoItems, ...writtenItems].every((t) => t.sample);

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
              What pilgrims and travellers say after a journey with HIJRA, in writing and on video, published only with their written consent.
            </p>
            {allSample ? (
              <Note className="rise rise-4 mx-auto mt-8 max-w-[40rem] text-left">
                Every review and video on this page is a sample that shows the layout: none is a real customer’s. HIJRA’s consented reviews and videos replace
                them, with the name, town and year each person approves.
              </Note>
            ) : null}
          </div>
        </div>
        <TestimonialBrowser videos={videoItems} written={writtenItems} labels={categoryLabel} />
      </section>

      <section aria-labelledby="publish-h" className="py-section">
        <div className="wrap site-grid gap-y-12">
          <div className="col-span-full lg:col-span-5">
            <span className="rule-double mb-5" aria-hidden="true" />
            <p className="eyebrow">How we publish reviews</p>
            <h2 id="publish-h" className="mt-3 text-h2">
              Every word with permission.
            </h2>
            <p className="mt-4 max-w-[34rem] text-lead">
              A review is someone’s own account of a journey that mattered to them. These are the rules a review passes before it appears here.
            </p>
            <div className="mt-10 border-t border-warm-border pt-8">
              <p className="font-semibold text-navy">Travelled with HIJRA?</p>
              <p className="mt-1 text-small text-muted">We would be glad to hear how your journey went, in your own words.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ContactAction
                  kind="whatsapp"
                  message="Assalamu alaikum. I travelled with HIJRA and would like to share my experience."
                  className="btn btn-secondary btn-sm"
                >
                  <Icon name="whatsapp" />
                  Share your experience
                </ContactAction>
                <Link href={routes.contact} className="btn btn-outline btn-sm">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
          <ol className="col-span-full border-t border-warm-border lg:col-span-6 lg:col-start-7">
            {principles.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-b border-warm-border py-6 md:grid-cols-[4rem_minmax(0,1fr)] md:py-7">
                <span className="font-serif text-h4 font-semibold tabular-nums text-red">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-h4">{p.title}</h3>
                  <p className="mt-1.5 text-small text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
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
