import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { routes } from '@/data/navigation';
import { imageList } from '@/data/images';
import { dictionary } from '@/lib/dictionary';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Note } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';

// Credits for everything this preview uses under licence: the photographs (from data/images.ts, so the list stays in
// step with the library), the three typefaces and the map data.

export function generateMetadata(): Metadata {
  return pageMetadata({
    path: routes.imageCredits,
    title: 'Image credits',
    description:
      'Credits for the licensed photographs, fonts and map data in this preview of the HIJRA Travels website. HIJRA’s own photographs will replace the temporary ones.',
    noindex: true,
  });
}

const OFL = { name: 'SIL Open Font License 1.1', url: 'https://openfontlicense.org/open-font-license-official-text/' };

const fonts = [
  {
    name: 'Newsreader',
    sample: <span className="font-serif">Newsreader</span>,
    use: 'Headings',
    holder: 'The Newsreader Project Authors',
    source: 'https://fonts.google.com/specimen/Newsreader',
  },
  {
    name: 'Hanken Grotesk',
    sample: <span className="font-sans">Hanken Grotesk</span>,
    use: 'Text, buttons and forms',
    holder: 'The Hanken Grotesk Project Authors',
    source: 'https://fonts.google.com/specimen/Hanken+Grotesk',
  },
];

/** 'https://commons.wikimedia.org/wiki/File:x.jpg' -> 'Wikimedia Commons'; other sites by their host name. */
function sourceName(url: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return host === 'commons.wikimedia.org' ? 'Wikimedia Commons' : host;
  } catch {
    return url;
  }
}

/** A link when the URL is known, plain text otherwise (no empty or dead links). */
function MaybeLink({ href, children }: { href: string; children: ReactNode }) {
  return href ? (
    <a href={href} className="link-inline break-words">
      {children}
    </a>
  ) : (
    <span>{children}</span>
  );
}

function Credit({ rows }: { rows: [label: string, value: ReactNode][] }) {
  return (
    <dl className="mt-2 grid grid-cols-[4.25rem_minmax(0,1fr)] gap-x-3 gap-y-1 text-small">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted">{label}</dt>
          <dd className="min-w-0">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ImageCreditsPage() {
  const t = dictionary;

  return (
    <>
      <section className="pt-nav">
        <div className="wrap pt-4 md:pt-6">
          <Breadcrumbs items={[{ label: t.footer.credits }]} />
          <div className="site-grid mt-7 items-end gap-y-8 md:mt-10">
            <div className="col-span-full lg:col-span-7">
              <p className="eyebrow">Credits</p>
              <h1 className="mt-3 text-h1">Image credits</h1>
              <p className="mt-5 max-w-[38rem] text-lead">
                The photographs, typefaces and map data this website uses, with their authors, sources and licences.
              </p>
            </div>
            <Note className="col-span-full max-w-[36rem] lg:col-span-5 lg:col-start-8 lg:justify-self-end">
              <strong className="text-navy">Temporary photographs.</strong> These licensed photographs stand in for the preview. HIJRA’s
              own photographs will replace them before launch, and none of them shows HIJRA’s customers.
            </Note>
          </div>
        </div>
      </section>

      <section className="pb-section pt-14 md:pt-20" aria-labelledby="photos-h">
        <div className="wrap">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-warm-border pb-4">
            <h2 id="photos-h" className="text-h2">
              Photographs
            </h2>
            <p className="text-small text-muted">
              {imageList.length} {imageList.length === 1 ? 'photograph' : 'photographs'}, resized and cropped to fit the layout
            </p>
          </div>
          <ul className="grid gap-x-gutter md:grid-cols-2">
            {imageList.map((img) => (
              <li key={img.key} className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-start gap-x-4 border-b border-warm-border py-5 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-x-5">
                <Photo image={img.key} sizes="96px" alt="" className="aspect-square rounded-sm" />
                <div>
                  <p className="break-words font-semibold text-navy">{img.credit.title}</p>
                  <Credit
                    rows={[
                      ['Author', img.credit.author],
                      ['Licence', <MaybeLink key="l" href={img.credit.licenceUrl}>{img.credit.licence}</MaybeLink>],
                      [
                        'Source',
                        <MaybeLink key="s" href={img.credit.sourceUrl}>
                          {sourceName(img.credit.sourceUrl)}
                          <span className="sr-only">: {img.credit.title}</span>
                        </MaybeLink>,
                      ],
                    ]}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-warm-grey py-section">
        <div className="wrap site-grid gap-y-14">
          <section className="col-span-full lg:col-span-7" aria-labelledby="fonts-h">
            <h2 id="fonts-h" className="text-h2">
              Typefaces
            </h2>
            <p className="mt-4 max-w-[36rem]">All three are free fonts, used and served from this website under the {OFL.name}.</p>
            <ul className="mt-8 border-t border-warm-border">
              {fonts.map((f) => (
                <li key={f.name} className="grid gap-x-8 gap-y-2 border-b border-warm-border py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                  <div>
                    <p className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">{f.use}</p>
                    <h3 className="mt-1.5 text-[clamp(1.5rem,1.25rem+0.8vw,2rem)] leading-tight">{f.sample}</h3>
                  </div>
                  <Credit
                    rows={[
                      ['Font', f.name],
                      ['Authors', f.holder],
                      ['Licence', <MaybeLink key="l" href={OFL.url}>{OFL.name}</MaybeLink>],
                      ['Source', <MaybeLink key="s" href={f.source}>Google Fonts</MaybeLink>],
                    ]}
                  />
                </li>
              ))}
            </ul>
          </section>

          <section className="col-span-full lg:col-span-4 lg:col-start-9" aria-labelledby="map-h">
            <h2 id="map-h" className="text-h2">
              Map data
            </h2>
            <p className="mt-4">
              The outline of Kerala on the branch maps is drawn from Natural Earth administrative boundaries, simplified for this website.
            </p>
            <div className="mt-8 border-y border-warm-border py-6">
              <h3 className="font-sans text-ui font-semibold text-navy">Natural Earth</h3>
              <Credit
                rows={[
                  ['Data', 'Admin 1: states and provinces'],
                  ['Licence', <MaybeLink key="l" href="https://www.naturalearthdata.com/about/terms-of-use/">Public domain</MaybeLink>],
                  ['Source', <MaybeLink key="s" href="https://www.naturalearthdata.com/">naturalearthdata.com</MaybeLink>],
                ]}
              />
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
