'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { isCurrent, mainNav } from '@/data/navigation';
import type { Dictionary } from '@/lib/dictionary';
import { Icon } from '@/components/ui/icons';
import { DEMO_CONTACT_ID, waHref } from '@/components/ui/contact-action';
import { Img, type ImgData, type PhotoAsset } from '@/components/ui/img';
import type { SocialNetwork } from '@/data/site';

// The reference navigation (report 3.9): fixed light pill; full-screen menu that rises from the bottom (O1 timing),
// Deep Navy film with blur (O3), pill kept above it (O4), contact line (O5), current-page dot (O10).
// Accessibility fixes F2–F15: real button, modal dialog with focus trap and return, inert and scroll-locked page,
// Escape to close, 44 px targets, reduced motion.

type State = 'closed' | 'opening' | 'open' | 'closing';
const OPEN_MS = 900;
const CLOSE_MS = 900;
const REDUCED_MS = 150;

export type NavProps = {
  t: Pick<Dictionary, 'nav' | 'menu' | 'pending'>;
  /** Image data from lib/image.ts (server): no image JavaScript in the browser. */
  logo: ImgData;
  portrait: PhotoAsset;
  social: Record<SocialNetwork, string | null>;
  /** HIJRA's real values only; null until supplied. */
  contact: { phone: string | null; whatsapp: string | null; email: string | null };
};

const socialIcons: Record<SocialNetwork, 'facebook' | 'instagram' | 'youtube'> = {
  facebook: 'facebook',
  instagram: 'instagram',
  youtube: 'youtube',
};
const socialNames: Record<SocialNetwork, string> = { facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube' };

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function SiteNav({ t, logo, portrait, social, contact }: NavProps) {
  const path = usePathname() ?? '/';
  const router = useRouter();
  const [state, setState] = useState<State>('closed');
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  // Navigating from the menu: the menu closes while the next page loads, and focus moves to that page's h1 once both
  // the close animation has finished and the new route has rendered.
  const navTarget = useRef<string | null>(null);
  const arrived = useRef(false);
  const closedForNav = useRef(false);

  // F8: build the menu (and fetch its portrait) once the browser is idle, so opening never waits.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setMounted(true), { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setMounted(true), 1500);
    return () => window.clearTimeout(id);
  }, []);

  // The pill steps out of the way while the visitor reads down the page (it would cover headings and images) and
  // returns on any scroll up, near the top of the page, or when it receives keyboard focus (CSS :focus-within).
  // A data attribute, not state: scrolling never re-renders the navigation.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const header = headerRef.current;
        if (!header || document.documentElement.dataset.menu) return;
        if (y <= 160 || y < last - 4) header.removeAttribute('data-hidden');
        else if (y > last + 4) header.setAttribute('data-hidden', '');
        last = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const setPage = (openMenu: boolean) => {
    const root = document.documentElement;
    const page = document.getElementById('page');
    if (openMenu) {
      root.style.overflow = 'hidden';
      page?.setAttribute('inert', '');
    } else {
      root.style.overflow = '';
      page?.removeAttribute('inert');
    }
  };

  const open = () => {
    window.clearTimeout(timer.current);
    setMounted(true);
    document.documentElement.dataset.menu = 'animating';
    setState('opening');
    // Keep the click itself light (INP): the sheet paints first; the page becomes inert and scroll-locked on the next
    // frame, and the nine destinations (not prefetched while the menu is hidden) are prefetched when the browser is idle.
    requestAnimationFrame(() => {
      setPage(true);
      requestAnimationFrame(() => setState('open'));
    });
    const prefetchAll = () => mainNav.forEach((item) => router.prefetch(item.href));
    if ('requestIdleCallback' in window) window.requestIdleCallback(prefetchAll);
    else setTimeout(prefetchAll, 300);
    timer.current = window.setTimeout(() => {
      document.documentElement.dataset.menu = 'open';
    }, reducedMotion() ? REDUCED_MS : OPEN_MS);
  };

  const focusNewPage = useCallback(() => {
    if (!arrived.current || !closedForNav.current) return;
    navTarget.current = null;
    arrived.current = false;
    closedForNav.current = false;
    const h1 = [...document.querySelectorAll<HTMLElement>('main h1')].find((h) => h.getClientRects().length > 0);
    if (h1) {
      h1.tabIndex = -1;
      h1.focus({ preventScroll: true });
    }
  }, []);

  const close = useCallback(
    (returnFocus: boolean) => {
      window.clearTimeout(timer.current);
      document.documentElement.dataset.menu = 'animating';
      setState('closing');
      timer.current = window.setTimeout(() => {
        setState('closed');
        setPage(false);
        delete document.documentElement.dataset.menu;
        if (navTarget.current) {
          closedForNav.current = true;
          focusNewPage();
        } else if (returnFocus) {
          triggerRef.current?.focus({ preventScroll: true });
        }
      }, reducedMotion() ? REDUCED_MS : CLOSE_MS);
    },
    [focusNewPage],
  );

  const isOpen = state === 'opening' || state === 'open';

  // The X takes focus first (3.9 keyboard rule).
  useEffect(() => {
    if (state === 'opening') closeRef.current?.focus({ preventScroll: true });
  }, [state]);

  // The new route has rendered: note it, and move focus if the menu has already finished closing.
  useEffect(() => {
    if (navTarget.current && path === navTarget.current) {
      arrived.current = true;
      focusNewPage();
    }
  }, [path, focusNewPage]);

  // Escape closes (unless the preview notice popover is open: Escape closes that first); so does Back/Forward.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape' || document.querySelector(':popover-open')) return;
      e.preventDefault();
      close(true);
    };
    const onPop = () => close(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', onPop);
    };
  }, [isOpen, close]);

  useEffect(() => () => {
    window.clearTimeout(timer.current);
    setPage(false);
    delete document.documentElement.dataset.menu;
  }, []);

  // F3: keep Tab inside the dialog.
  const trap = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const items = [...dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(
      (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden',
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // A link navigates at once and the menu closes as the page changes; the current page's link simply closes the menu.
  const onLink = (e: MouseEvent<HTMLAnchorElement>, target: string) => {
    if (target === path) {
      e.preventDefault();
      close(true);
      return;
    }
    navTarget.current = target;
    arrived.current = false;
    closedForNav.current = false;
    close(false);
  };

  const dialog = (
    <div
      ref={dialogRef}
      id="site-menu"
      className="menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.menu.label}
      data-state={state}
      inert={state === 'closed' || state === 'closing' ? true : undefined}
      onKeyDown={trap}
    >
      <div className="menu-sheet">
        <div className="menu-bar menu-fade">
          <button ref={closeRef} type="button" className="menu-close" aria-label={t.menu.close} onClick={() => close(true)}>
            <Icon name="close" />
          </button>
        </div>
        <div className="menu-scroll">
          <div className="menu-content menu-fade">
            <div className="menu-aside">
              <div className="menu-portrait" style={{ backgroundColor: portrait.tone }}>
                <Img img={portrait} sizes="273px" className="absolute inset-0 size-full object-cover" style={{ objectPosition: portrait.focus }} />
              </div>
              <div className="menu-social" aria-label={t.menu.social} role="group">
                {(Object.keys(socialIcons) as SocialNetwork[]).map((n) =>
                  social[n] ? (
                    <a key={n} href={social[n]!} target="_blank" rel="noopener noreferrer" aria-label={`HIJRA on ${socialNames[n]}`}>
                      <Icon name={socialIcons[n]} />
                    </a>
                  ) : (
                    <button key={n} type="button" popoverTarget={DEMO_CONTACT_ID} aria-label={`HIJRA on ${socialNames[n]} (not connected in this preview)`}>
                      <Icon name={socialIcons[n]} />
                    </button>
                  ),
                )}
              </div>
              <p className="menu-contact">
                {contact.phone ? (
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                ) : (
                  <button type="button" popoverTarget={DEMO_CONTACT_ID}>
                    {t.menu.call}: [{t.pending.phone}]
                  </button>
                )}
                {contact.whatsapp ? (
                  <a href={waHref(contact.whatsapp)} target="_blank" rel="noopener noreferrer">
                    {t.menu.whatsapp}
                  </a>
                ) : (
                  <button type="button" popoverTarget={DEMO_CONTACT_ID}>
                    {t.menu.whatsapp}
                  </button>
                )}
              </p>
            </div>
            <nav aria-label={t.menu.main}>
              <ul className="menu-links">
                {mainNav.map((item) => {
                  const current = isCurrent(item, path);
                  return (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        prefetch={false}
                        className="menu-link"
                        aria-current={current ? 'page' : undefined}
                        onClick={(e) => onLink(e, item.href)}
                      >
                        <i className="menu-line" aria-hidden="true" />
                        <span>{t.nav[item.key]}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="menu-pill">
        <Img img={logo} loading="eager" />
      </div>
    </div>
  );

  return (
    <>
      <header ref={headerRef} className="nav-pill">
        <Link href="/" className="nav-logo" aria-label={`${logo.alt}, home`}>
          <Img img={logo} alt="" loading="eager" />
        </Link>
        <button
          ref={triggerRef}
          type="button"
          className="nav-burger"
          aria-label={isOpen ? t.menu.close : t.menu.open}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          onClick={() => (isOpen ? close(true) : open())}
        >
          <span />
        </button>
      </header>
      {mounted ? createPortal(dialog, document.body) : null}
    </>
  );
}
