import type { Metadata } from 'next';
import { routes } from '@/data/navigation';
import { branches } from '@/data/branches';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { BranchCard } from '@/components/branches/branch-card';
import { orderBranches, searchText, serviceInfo } from '@/components/branches/branch-data';
import { BranchDirectory } from '@/components/branches/branch-directory';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ContactAction } from '@/components/ui/contact-action';
import { CtaBand } from '@/components/ui/cta-band';
import { Icon } from '@/components/ui/icons';
import { KeralaMap } from '@/components/ui/kerala-map';
import { Note } from '@/components/ui/pending';

// Branches directory (report 8.3 and 9.8, mock-up 3). 'Use my location' (C9) needs verified coordinates to sort by;
// no branch has them yet, so the control is left out rather than shown as a button that cannot work.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.branches,
    title: 'Branches across Kerala',
    description:
      'Find a HIJRA Travels branch near you in Kerala: addresses, opening hours in India time, and one tap to call, WhatsApp or get directions for Hajj and Umrah.',
  });
}

export default function BranchesPage() {
  const t = dictionary;
  const list = orderBranches(branches);

  return (
    <>
      <section className="pt-nav">
        <div className="wrap site-grid items-end gap-y-8 pt-6 md:pt-10">
          <div className="col-span-full lg:col-span-7">
            <Breadcrumbs items={[{ label: t.nav.branches }]} />
            <p className="eyebrow rise mt-8 md:mt-10">Our branches</p>
            <h1 className="rise rise-2 mt-4 text-h1">Visit HIJRA near you.</h1>
            <p className="rise rise-3 mt-5 max-w-[36rem] text-lead">
              Every branch, with its address, today’s hours and a direct line to the team. Families are welcome to come in together.
            </p>
          </div>
          <div className="col-span-full hidden border-l border-warm-border pl-7 lg:col-span-4 lg:col-start-9 lg:block">
            <p className="font-semibold text-navy">Not sure which branch to visit?</p>
            <p className="mt-1.5 text-small text-muted">Message the central team and an advisor will point you to the branch nearest your home.</p>
            <ContactAction kind="whatsapp" className="btn btn-outline btn-sm mt-4">
              <Icon name="whatsapp" className="wa-mark" />
              {t.common.whatsappUs}
            </ContactAction>
          </div>
        </div>
      </section>

      <section aria-label="Branch directory" className="pb-section pt-10 md:pt-14">
        <div className="wrap">
          <BranchDirectory
            items={list.map((b, i) => ({
              slug: b.slug,
              text: searchText(b),
              services: b.services,
              card: <BranchCard branch={b} n={i + 1} />,
            }))}
            services={Object.entries(serviceInfo).map(([key, s]) => ({ key: key as keyof typeof serviceInfo, label: s.label }))}
            note={
              <Note className="mt-5">
                <p>
                  <strong className="font-semibold text-navy">Sample branch records.</strong> Names, addresses and hours are placeholders for
                  this preview, and HIJRA’s verified branches replace them before launch. Map pins and Directions links appear once each
                  branch’s location is verified.
                </p>
              </Note>
            }
            map={
              <div className="rounded-lg border border-warm-border bg-white px-5 pb-5 pt-6 md:px-6 lg:px-8 lg:pt-8 [&_svg]:max-h-[min(540px,calc(100svh-14rem))]">
                <KeralaMap branches={list} />
              </div>
            }
          />
        </div>
      </section>

      <CtaBand
        eyebrow="Plan from home"
        title="Not ready to visit yet?"
        body="Send an enquiry or message us on WhatsApp. An advisor replies, and you can sit down at a branch whenever you are ready."
      />
    </>
  );
}
