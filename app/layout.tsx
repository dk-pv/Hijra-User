import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import logo from '@/public/brand/hijra-logo.png';
import { site } from '@/data/site';
import { dictionary as t } from '@/lib/dictionary';
import { fixedImg, photoAsset } from '@/lib/image';
import { SiteNav } from '@/components/site/site-nav';
import { Footer } from '@/components/site/footer';
import { WhatsAppFab } from '@/components/site/whatsapp-fab';
import { DemoContactPopover } from '@/components/site/demo-popover';

// Fonts (report 6.2): self-hosted, swap with size-matched fallbacks. English only: Newsreader for headings,
// Hanken Grotesk for body and interface text.
const newsreader = localFont({
  src: './fonts/newsreader-600-opsz36.woff2',
  weight: '600',
  style: 'normal',
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});
const hanken = localFont({
  src: './fonts/hanken-grotesk-400-600.woff2',
  weight: '400 600',
  style: 'normal',
  variable: '--font-hanken',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Hajj & Umrah specialists from Kerala`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: { index: site.indexable, follow: site.indexable },
  openGraph: {
    siteName: site.fullName,
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og/hijra-default.jpg', width: 1200, height: 630, alt: 'HIJRA Travels: Hajj and Umrah specialists from Kerala' }],
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#FAF9F6',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${hanken.variable}`} data-scroll-behavior="smooth">
      <body>
        <div id="page" className="flex min-h-svh flex-col">
          <a href="#main" className="skip-link">
            {t.skip}
          </a>
          <SiteNav
            t={{ nav: t.nav, menu: t.menu, pending: t.pending }}
            logo={fixedImg(logo, site.fullName, 145, 44)}
            // The menu portrait (B5): a temporary licensed photograph until HIJRA supplies its own.
            portrait={photoAsset('madinah-minaret-arcade')}
            social={site.social}
            contact={{ phone: site.contact.phone, whatsapp: site.contact.whatsapp, email: site.contact.email }}
          />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </div>
        <div id="scroll-sentinel" aria-hidden="true" className="pointer-events-none absolute left-0 top-[320px] h-px w-px" />
        <WhatsAppFab number={site.contact.whatsapp} label={t.common.whatsappUs} />
        <DemoContactPopover />
      </body>
    </html>
  );
}
