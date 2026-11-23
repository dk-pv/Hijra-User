import Link from 'next/link';
import logo from '@/public/brand/hijra-logo.png';
import { branchPath, footerNav, routes } from '@/data/navigation';
import { branches } from '@/data/branches';
import { site, type SocialNetwork } from '@/data/site';
import { dictionary as t } from '@/lib/dictionary';
import { fixedImg } from '@/lib/image';
import { ContactAction, SocialAction } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';
import { Img } from '@/components/ui/img';
import { ContactValue } from '@/components/ui/contact-value';

// Footer (15.10): a Pure White logo band (the full-colour logo stays on a light surface), then the Deep Navy band.

export function Footer() {
  const column = (title: string, links: { label: string; href: string }[]) => (
    <div>
      <h2 className="footer-h">{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="footer-link">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer data-wa-zone="" className="mt-auto">
      <div className="border-t border-warm-border bg-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-5 py-8">
          <Link href={routes.home} className="block rounded-md" aria-label={`${site.fullName}, home`}>
            <Img img={fixedImg(logo, '', 210, 64)} className="h-14 w-auto md:h-16" />
          </Link>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-1">
            <ContactAction kind="call" className="footer-contact">
              <Icon name="phone" />
              <ContactValue kind="phone" />
            </ContactAction>
            <ContactAction kind="whatsapp" className="footer-contact">
              <Icon name="whatsapp" className="text-wa" />
              {t.menu.whatsapp}
            </ContactAction>
            <ContactAction kind="email" className="footer-contact">
              <Icon name="mail" />
              <ContactValue kind="email" />
            </ContactAction>
            <Link href={routes.branches} className="btn btn-outline btn-sm">
              <Icon name="pin" />
              {t.footer.findBranch}
            </Link>
          </div>
        </div>
      </div>

      <div className="on-dark bg-deep text-warm-white">
        <div className="wrap">
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 pb-8 pt-12 md:grid-cols-3 md:pt-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-x-8">
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <p className="max-w-[24rem] text-small text-mist">{t.footer.about}</p>
              <p className="footer-h mt-6">{t.footer.follow}</p>
              <div className="mt-1 flex gap-2">
                {(['facebook', 'instagram', 'youtube'] as SocialNetwork[]).map((n) => (
                  <SocialAction key={n} network={n} className="footer-social">
                    <Icon name={n} size={22} />
                  </SocialAction>
                ))}
              </div>
            </div>
            {column(t.footer.pilgrimage, footerNav.pilgrimage)}
            {column(t.footer.travel, footerNav.travel)}
            {column(t.footer.company, footerNav.company)}
            <div>
              <h2 className="footer-h">{t.footer.branches}</h2>
              <ul>
                {branches.map((b) => (
                  <li key={b.id}>
                    <Link href={branchPath(b.slug)} className="footer-link">
                      {b.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={routes.branches} className="footer-link font-semibold text-sand">
                    {t.footer.allBranches}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="border-t border-white/15 py-5 text-caption text-mist">{t.footer.sampleNote}</p>
          <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3 border-t border-white/15 pb-24 pt-6 text-caption text-mist md:pb-8">
            <span>© {site.fullName}</span>
            <span className="flex flex-wrap gap-x-5 gap-y-1">
              <Link href={routes.privacy} className="footer-legal-link">
                {t.footer.privacy}
              </Link>
              <Link href={routes.terms} className="footer-legal-link">
                {t.footer.terms}
              </Link>
              <Link href={routes.imageCredits} className="footer-legal-link">
                {t.footer.credits}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
