import Link from 'next/link';
import type { Metadata } from 'next';
import { branchPath, routes } from '@/data/navigation';
import { branches } from '@/data/branches';
import { site, type SocialNetwork } from '@/data/site';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { SocialAction } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';
import { Note, Pending, SampleTag } from '@/components/ui/pending';
import { EnquiryForm } from '@/components/forms/enquiry-form';
import { ledgerLabel, RouteList } from '@/components/booking/route-list';

// Contact: "talk to HIJRA". The central phone, WhatsApp and email, office hours and social profiles first, then the
// branches, then a general message form. Trip enquiries are pointed to Book A Trip, which asks the right questions.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.contact,
    title: 'Contact HIJRA: phone, WhatsApp, email and branches',
    description:
      'Call, WhatsApp or email HIJRA Travels, visit a branch in Kerala or send a general question. For Umrah, Hajj and travel plans, Book A Trip reaches an advisor.',
  });
}

const networks: { key: SocialNetwork; name: string }[] = [
  { key: 'facebook', name: 'Facebook' },
  { key: 'instagram', name: 'Instagram' },
  { key: 'youtube', name: 'YouTube' },
];

export default function ContactPage() {
  const t = dictionary;
  const c = site.contact;

  return (
    <>
      {/* 01 Talk to HIJRA: the central routes */}
      <section className="pt-nav pb-section">
        <div className="wrap pt-4 md:pt-6">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <div className="site-grid mt-7 items-start gap-y-10 md:mt-10">
            <div className="col-span-full md:col-span-4 lg:col-span-5">
              <p className="eyebrow rise">Contact</p>
              <h1 className="rise rise-2 mt-3 text-h1">Talk to HIJRA.</h1>
              <p className="rise rise-3 mt-4 max-w-[32rem] text-lead">
                Call, message or visit a branch. Our advisors speak Malayalam and English.
              </p>
              <Link
                href={routes.bookATrip}
                className="rise rise-4 group mt-8 flex max-w-[32rem] items-center gap-4 rounded-md border border-warm-border bg-white px-5 py-5 transition-colors hover:border-navy md:px-6"
              >
                <Icon name="compass" size={28} className="shrink-0 text-red" />
                <span className="flex-1">
                  <span className="block font-serif text-h4 font-semibold text-navy">Planning a trip?</span>
                  <span className="mt-1 block text-small text-muted">
                    For Umrah, Hajj, tours, flights or visas, Book A Trip asks what an advisor needs to reply with dates and prices.
                  </span>
                </span>
                <Icon name="arrowRight" className="shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="col-span-full md:col-span-4 md:col-start-5 lg:col-span-6 lg:col-start-7">
              <RouteList
                large
                routes={[
                  { kind: 'call', icon: 'phone', label: 'Phone', action: 'Call', text: c.phone ?? <Pending>{t.pending.phone}</Pending> },
                  { kind: 'whatsapp', icon: 'whatsapp', label: 'WhatsApp', action: 'Message', text: c.whatsapp ?? <Pending>{t.pending.whatsapp}</Pending> },
                  { kind: 'email', icon: 'mail', label: 'Email', action: 'Write', text: c.email ?? <Pending>{t.pending.email}</Pending> },
                ]}
              />
              <div className="border-b border-warm-border py-5">
                <p className={ledgerLabel}>Office hours</p>
                <p className="flex items-center gap-3.5 font-serif text-h4 font-semibold text-navy">
                  <Icon name="clock" size={22} className="shrink-0" />
                  <span>{c.hours ?? <Pending>{t.pending.hours}</Pending>}</span>
                </p>
                <p className="mt-1.5 pl-9 text-small text-muted">Branch hours can differ: each branch page lists its own.</p>
              </div>
              <div className="border-b border-warm-border py-5">
                <p className={ledgerLabel}>Follow HIJRA</p>
                <div className="mt-2 flex items-start gap-3.5">
                  <Icon name="share" size={22} className="mt-[11px] shrink-0 text-navy" />
                  <ul className="flex flex-wrap gap-2">
                    {networks.map((n) => (
                      <li key={n.key}>
                        <SocialAction network={n.key} className="btn btn-outline btn-sm">
                          <Icon name={n.key} />
                          {n.name}
                        </SocialAction>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 The branches, compact: each links to its page */}
      <section className="bg-warm-grey py-section" aria-labelledby="branches-h">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
            <div className="max-w-[40rem]">
              <p className="eyebrow">Branches</p>
              <h2 id="branches-h" className="mt-3 text-h2">
                Visit a branch near you.
              </h2>
              <p className="mt-4 text-lead">Many families prefer to plan face to face. Each branch page has its address, hours and directions.</p>
            </div>
            <Link href={routes.branches} className="btn btn-outline">
              <Icon name="pin" />
              All branches
            </Link>
          </div>
          <SampleTag className="mt-10">Sample branch records</SampleTag>
          <ul className="mt-4 grid md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-14">
            {branches.map((b) => (
              <li key={b.id} className="group relative flex items-start gap-4 border-t border-warm-border py-5 md:py-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-h4">
                    <Link href={branchPath(b.slug)} className="after:absolute after:inset-0 group-hover:text-red">
                      {b.name}
                    </Link>
                    {b.isHeadOffice ? <span className="tagline ml-3 align-middle">Head office</span> : null}
                  </h3>
                  <p className="mt-1 text-small text-muted">
                    {b.address.locality}, {b.address.district}
                  </p>
                </div>
                <Icon name="arrowRight" size={18} className="mt-1.5 shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-1" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 A general message */}
      <section id="message" className="py-section" aria-labelledby="message-h">
        <div className="wrap site-grid items-start gap-y-10">
          <div className="col-span-full lg:col-span-5">
            <p className="eyebrow">Write to us</p>
            <h2 id="message-h" className="mt-3 text-h2">
              Send us a message.
            </h2>
            <p className="mt-4 max-w-[34rem] text-lead">
              A question, feedback or a branch visit to arrange: write it here and an advisor replies by your chosen method.
            </p>
            <Note className="mt-8 max-w-[34rem]">
              Planning a journey? <Link href={routes.bookATrip} className="link-inline font-semibold">Book A Trip</Link> asks for
              your dates and travellers, so the reply can include options and prices.
            </Note>
          </div>
          <EnquiryForm
            t={t.form}
            variant="contact"
            source="contact"
            branches={branches.map((b) => ({ slug: b.slug, name: b.name }))}
            className="col-span-full lg:col-span-6 lg:col-start-7"
          />
        </div>
      </section>
    </>
  );
}
