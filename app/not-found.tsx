import Link from 'next/link';
import { routes } from '@/data/navigation';
import { dictionary } from '@/lib/dictionary';

export default function NotFound() {
  const t = dictionary;
  const links = [
    { href: routes.home, label: t.nav.home },
    { href: routes.hajjUmrah, label: t.nav.hajjUmrah },
    { href: routes.branches, label: t.nav.branches },
    { href: routes.bookATrip, label: t.nav.bookATrip },
  ];
  return (
    <section data-no-fab="" className="pt-nav pb-section">
      <div className="wrap site-grid pt-12 md:pt-20">
        <div className="col-span-full lg:col-span-8">
          <span className="rule-double mb-5" aria-hidden="true" />
          <p className="eyebrow">{t.notFound.eyebrow}</p>
          <h1 className="mt-3 text-h1">{t.notFound.title}</h1>
          <p className="mt-5 max-w-[36rem] text-lead">{t.notFound.body}</p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {links.map((l, i) => (
              <li key={l.href}>
                <Link href={l.href} className={i === links.length - 1 ? 'btn btn-primary' : 'btn btn-outline'}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
