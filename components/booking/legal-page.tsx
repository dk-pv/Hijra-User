import { demo } from '@/data/demo';
import { site } from '@/data/site';
import { Fragment, type ReactNode } from 'react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Icon } from '@/components/ui/icons';
import { Pending } from '@/components/ui/pending';

export type LegalSection = { id: string; title: string; body: ReactNode };

/** A draft legal document: the draft banner, a numbered index (sticky on desktop) and numbered sections in long-form type. */
export function LegalPage({
  crumb,
  title,
  lead,
  note,
  sections,
}: {
  crumb: string;
  title: string;
  lead: ReactNode;
  /** A second boxed note under the draft banner. */
  note?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="pt-nav">
        <div className="wrap pt-4 md:pt-6">
          <Breadcrumbs items={[{ label: crumb }]} />
          <div className="mt-7 max-w-[48rem] md:mt-10">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-3 text-h1">{title}</h1>
            <p className="mt-5 max-w-[38rem] text-lead">{lead}</p>
          </div>

          <div role="note" className="mt-9 flex max-w-[48rem] gap-4 rounded-md border-[1.5px] border-red bg-white p-5 md:p-6">
            <Icon name="alert" size={24} className="mt-0.5 shrink-0 text-red" />
            <div>
              <p className="text-h4 font-serif font-semibold text-navy">Draft for legal review — not yet in force</p>
              <p className="mt-2 text-small">
                Prepared for HIJRA and its legal adviser to review before launch. It does not yet govern this website or any enquiry.
                Words in [brackets] are details HIJRA must supply.
              </p>
              {note ? <div className="mt-3 border-t border-warm-border pt-3 text-small">{note}</div> : null}
            </div>
          </div>

          <dl className="mt-6 flex max-w-[48rem] flex-wrap gap-x-8 gap-y-2 text-small">
            <div className="flex gap-2">
              <dt className="text-muted">Status</dt>
              <dd className="font-semibold text-navy">Draft for review</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted">In force from</dt>
              <dd>
                {site.demo ? demo.legal.adopted : <Pending>Date of adoption</Pending>}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="pb-section pt-12 md:pt-16">
        <div className="wrap site-grid items-start gap-y-12">
          <nav aria-labelledby="toc-h" className="col-span-full md:col-span-6 lg:sticky lg:top-28 lg:col-span-3">
            <h2 id="toc-h" className="eyebrow font-sans">
              On this page
            </h2>
            <ol className="mt-4 sm:columns-2 sm:gap-x-6 lg:columns-1">
              {sections.map((s, i) => (
                <li key={s.id} className="break-inside-avoid border-l border-warm-border">
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex gap-2 border-l-2 border-transparent py-1.5 pl-4 text-small text-navy transition-colors hover:border-red hover:text-red"
                  >
                    <span className="w-5 shrink-0 tabular-nums text-muted">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="prose-hijra col-span-full max-w-[40rem] lg:col-span-8 lg:col-start-5 [&>h2:first-child]:mt-0">
            {sections.map((s, i) => (
              <Fragment key={s.id}>
                <h2 id={s.id} className="scroll-mt-4">
                  <span className="mr-2.5 text-red">{i + 1}.</span>
                  {s.title}
                </h2>
                {s.body}
              </Fragment>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
