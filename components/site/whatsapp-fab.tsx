'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/icons';
import { DEMO_CONTACT_ID, waHref } from '@/components/ui/contact-action';

// Floating WhatsApp button (R15, F11, F14): never on a first screen; appears after ~320 px of scrolling, and only
// while no other WhatsApp action, form or the footer is on screen ([data-wa-zone]). Hidden in the open menu (CSS)
// and on Book A Trip. IntersectionObserver only: no scroll listeners.

export function WhatsAppFab({ number, label }: { number: string | null; label: string }) {
  const path = usePathname() ?? '/';
  const [scrolled, setScrolled] = useState(false);
  const [zones, setZones] = useState(0);
  const hiddenHere = path === '/book-a-trip';

  useEffect(() => {
    if (hiddenHere) return;
    const sentinel = document.getElementById('scroll-sentinel');
    const seen = new Set<Element>();
    const zoneObserver = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target);
        else seen.delete(e.target);
      }
      setZones(seen.size);
    });
    const scrollObserver = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting && e.boundingClientRect.top < 0));
    if (sentinel) scrollObserver.observe(sentinel);
    // Pages stream and change (forms become success panels): re-scan once per frame, and forget removed zones.
    let raf = 0;
    const watch = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        document.querySelectorAll('[data-wa-zone]').forEach((el) => zoneObserver.observe(el));
        for (const el of seen) if (!el.isConnected) seen.delete(el);
        setZones(seen.size);
      });
    };
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      zoneObserver.disconnect();
      scrollObserver.disconnect();
      mo.disconnect();
    };
  }, [path, hiddenHere]);

  if (hiddenHere) return null;
  const show = scrolled && zones === 0;
  const common = { className: 'wa-fab', 'data-show': show ? 'true' : 'false', 'aria-hidden': show ? undefined : true, tabIndex: show ? undefined : -1 } as const;

  return number ? (
    <a href={waHref(number)} target="_blank" rel="noopener noreferrer" aria-label={label} {...common}>
      <Icon name="whatsapp" />
    </a>
  ) : (
    <button type="button" popoverTarget={DEMO_CONTACT_ID} aria-label={`${label} (not connected in this preview)`} {...common}>
      <Icon name="whatsapp" />
    </button>
  );
}
