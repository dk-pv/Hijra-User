'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/icons';
import { DEMO_CONTACT_ID, waHref } from '@/components/ui/contact-action';
import { routes } from '@/data/navigation';

// The floating action group: Upcoming Tours above WhatsApp, fixed at the bottom right of every public page and
// visible at all times (hidden only in the open menu, in print, and on the 404 and error screens via [data-no-fab]).
// Upcoming Tours is a plain link to the Tours page: it claims no departures. The WhatsApp number is HIJRA's verified
// number from data/site.ts; until it is supplied the button opens the "not connected yet" notice and links nowhere.

/** The prefilled WhatsApp message, by section of the site. */
function messageFor(path: string) {
  const topic = path.startsWith('/umrah') ? 'Umrah' : path.startsWith('/hajj') ? 'Hajj' : path.startsWith('/tours') ? 'a holiday tour' : null;
  return `Assalamu alaikum, HIJRA. I would like to know more about ${topic ?? 'your Hajj, Umrah and tour packages'}.`;
}

export function FloatingActions({ number, label, tours }: { number: string | null; label: string; tours: string }) {
  const path = usePathname() ?? '/';
  return (
    <div className="fab-group print:hidden">
      <Link href={routes.tours} className="fab-tours" aria-current={path === routes.tours ? 'page' : undefined}>
        <Icon name="calendar" size={18} />
        {tours}
      </Link>
      {number ? (
        <a href={waHref(number, messageFor(path))} target="_blank" rel="noopener noreferrer" aria-label={label} className="wa-fab">
          <Icon name="whatsapp" />
        </a>
      ) : (
        <button type="button" popoverTarget={DEMO_CONTACT_ID} aria-label={`${label} (not connected in this preview)`} className="wa-fab">
          <Icon name="whatsapp" />
        </button>
      )}
    </div>
  );
}
