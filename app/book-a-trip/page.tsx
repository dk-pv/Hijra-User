import Link from 'next/link';
import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { branches } from '@/data/branches';
import { packages } from '@/data/packages';
import { tours } from '@/data/tours';
import { faqs } from '@/data/faqs';
import { site } from '@/data/site';
import { demo } from '@/data/demo';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { FaqList } from '@/components/ui/faq';
import { Icon } from '@/components/ui/icons';
import { Pending, SampleTag } from '@/components/ui/pending';
import { EnquiryForm } from '@/components/forms/enquiry-form';
import { RouteList } from '@/components/booking/route-list';
import { ContactValue } from '@/components/ui/contact-value';

// Book A Trip (report 8.7, mock-up 6): a calm, form-first enquiry page. Phones get the head, then the form, then
// reassurance, other routes and what happens next; desktop puts the form in the right column beside them.
// Links elsewhere arrive as /book-a-trip?service=umrah&interest=<slug>#enquiry and the form preselects them.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.bookATrip,
    title: 'Book A Trip: enquire about Umrah, Hajj and travel',
    description:
      'Tell HIJRA about your Umrah, Hajj, tour, flight or visa plans and an advisor replies with dates and prices. Enquiry only: nothing is booked or paid online.',
  });
}

export default function BookATripPage() {
  const t = dictionary;
  const c = site.contact;

  return (
    <>
      <section className="pt-nav pb-section">
        <div className="wrap pt-4 md:pt-6">
          <Breadcrumbs items={[{ label: t.nav.bookATrip }]} />

          <div className="site-grid mt-7 items-start gap-y-10 md:mt-10 md:gap-y-12 lg:grid-rows-[auto_1fr] lg:gap-y-10">
            {/* Head: on phones the form follows it directly */}
            <div className="col-span-full md:col-span-7 lg:col-span-5 lg:row-start-1">
              <p className="eyebrow rise">Enquiry</p>
              <h1 className="rise rise-2 mt-3 text-h1">Book A Trip</h1>
              <p className="rise rise-3 mt-4 max-w-[34rem] text-lead">
                Tell us your plans and a HIJRA advisor will reply with dates and prices.
              </p>
              <p className="rise rise-4 mt-6 flex max-w-[34rem] items-start gap-3 rounded-md bg-warm-grey px-4 py-3.5 text-ui font-semibold text-navy">
                <Icon name="check" className="mt-px shrink-0" />
                This is an enquiry. Nothing is booked or paid online.
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 text-ui font-semibold text-navy md:hidden">
                Prefer to talk?
                <ContactAction kind="call" className="link-inline inline-flex min-h-11 cursor-pointer items-center">
                  Call us
                </ContactAction>
                <span aria-hidden="true">·</span>
                <ContactAction kind="whatsapp" className="link-inline inline-flex min-h-11 cursor-pointer items-center">
                  WhatsApp
                </ContactAction>
              </p>
            </div>

            {/* The form: the page's purpose and its #enquiry target */}
            <section
              id="enquiry"
              aria-labelledby="enquiry-h"
              className="col-span-full md:col-span-5 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h2 id="enquiry-h" className="text-h3">
                  Your enquiry
                </h2>
                <SampleTag>Sample packages and tours</SampleTag>
              </div>
              <EnquiryForm
                t={t.form}
                variant="full"
                readQuery
                source="book-a-trip"
                packages={packages.map((p) => ({ slug: p.slug, name: p.name, service: p.service }))}
                tours={tours.map((x) => ({ slug: x.slug, name: x.title }))}
                branches={branches.map((b) => ({ slug: b.slug, name: b.name }))}
                after={
                  <>
                    <p className="font-semibold text-navy">Once the website is live, this is what happens next:</p>
                    <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-small marker:font-semibold marker:text-red">
                      <li>An advisor reads your enquiry.</li>
                      <li>They reply by the method you chose.</li>
                      <li>Dates and prices are confirmed with you before anything is booked.</li>
                    </ol>
                    <ContactAction kind="whatsapp" className="btn btn-outline btn-sm mt-5">
                      <Icon name="whatsapp" className="wa-mark" />
                      Continue on WhatsApp
                    </ContactAction>
                  </>
                }
              />
            </section>

            {/* Reassurance, the other routes and the next steps */}
            <div className="col-span-full md:col-span-3 lg:col-span-5 lg:col-start-1 lg:row-start-2">
              <ul className="flex flex-col gap-3.5">
                {[
                  site.demo ? demo.bookATrip.whoReplies : <Pending key="who">Who replies: to be confirmed</Pending>,
                  'Replies by WhatsApp, phone or email, as you prefer',
                  site.demo ? demo.bookATrip.free : <Pending key="free">An enquiry costs nothing: to be confirmed</Pending>,
                  <>
                    Your details are used only to answer your enquiry.{' '}
                    <Link href={routes.privacy} className="link-inline whitespace-nowrap">
                      Privacy policy
                    </Link>
                  </>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon name="check" className="mt-[3px] shrink-0 text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="eyebrow mt-10 font-sans">Other ways to reach us</h2>
              <RouteList
                className="mt-3"
                routes={[
                  { kind: 'call', icon: 'phone', srPrefix: 'Call ', text: <ContactValue kind="phone" /> },
                  { kind: 'whatsapp', icon: 'whatsapp', text: t.common.whatsappUs },
                  { kind: 'email', icon: 'mail', srPrefix: 'Email ', text: <ContactValue kind="email" /> },
                  { href: routes.branches, icon: 'pin', text: 'Find your nearest branch' },
                ]}
              />

              <div className="mt-10 rounded-md bg-warm-grey p-6 md:p-5 lg:p-7">
                <h2 className="text-h4">What happens next</h2>
                <ol className="mt-5">
                  {[
                    'An advisor reads your enquiry.',
                    <>
                      We reply by your chosen method, {c.replyTime ?? <Pending>within the confirmed reply time</Pending>}.
                    </>,
                    'We confirm dates and prices with you before anything is booked.',
                  ].map((step, i, all) => (
                    <li key={i} className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-6 last:pb-0">
                      {i < all.length - 1 ? (
                        <span aria-hidden="true" className="absolute bottom-0 left-[15.5px] top-10 w-[5px] border-x border-red" />
                      ) : null}
                      <span className="grid size-9 place-items-center rounded-full border border-navy/25 bg-white font-serif text-[1.0625rem] font-semibold text-navy">
                        {i + 1}
                      </span>
                      <p className="pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the enquiry works: the questions families ask before they send */}
      <section className="bg-warm-grey py-section" aria-labelledby="faq-h">
        <div className="wrap site-grid gap-y-10">
          <div className="col-span-full lg:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-h" className="mt-3 text-h2">
              How an enquiry works.
            </h2>
            <ContactAction kind="whatsapp" className="btn btn-outline mt-7">
              <Icon name="whatsapp" className="wa-mark" />
              Ask on WhatsApp
            </ContactAction>
          </div>
          <FaqList className="col-span-full lg:col-span-7 lg:col-start-6" items={[...faqs.booking, ...faqs.branches]} openFirst />
        </div>
      </section>
    </>
  );
}
