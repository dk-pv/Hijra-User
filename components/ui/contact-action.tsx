import type { ReactNode } from 'react';
import { site, type SocialNetwork } from '@/data/site';

// Contact links that work the moment HIJRA's details are added to data/site.ts or data/branches.ts.
// Until then they open the preview notice (#demo-contact), so no button is dead and nothing dials an invented or
// demonstration number (site.contactLive holds real values only).

export const DEMO_CONTACT_ID = 'demo-contact';

type Common = { className?: string; children: ReactNode; label?: string };

function DemoButton({ className, children, label, wa }: Common & { wa?: boolean }) {
  return (
    <button type="button" popoverTarget={DEMO_CONTACT_ID} className={className} aria-label={label} data-wa-zone={wa ? '' : undefined}>
      {children}
    </button>
  );
}

export function waHref(number: string, message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number.replace(/\D/g, '')}${text}`;
}

/** Call, WhatsApp or email. `value` defaults to HIJRA's central contact; pass a branch's own number to override. */
export function ContactAction({
  kind,
  value,
  message,
  className,
  children,
  label,
}: Common & { kind: 'call' | 'whatsapp' | 'email'; value?: string | null; message?: string }) {
  const v =
    value !== undefined ? value : kind === 'call' ? site.contactLive.phone : kind === 'whatsapp' ? site.contactLive.whatsapp : site.contactLive.email;
  if (!v) return <DemoButton className={className} label={label} wa={kind === 'whatsapp'}>{children}</DemoButton>;
  if (kind === 'whatsapp')
    return (
      <a href={waHref(v, message)} target="_blank" rel="noopener noreferrer" className={className} aria-label={label} data-wa-zone="">
        {children}
      </a>
    );
  return (
    <a href={kind === 'call' ? `tel:${v}` : `mailto:${v}`} className={className} aria-label={label}>
      {children}
    </a>
  );
}

const networkNames: Record<SocialNetwork, string> = { facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube' };

export function SocialAction({ network, className, children }: { network: SocialNetwork; className?: string; children: ReactNode }) {
  const url = site.social[network];
  const label = `HIJRA on ${networkNames[network]}`;
  if (!url) return <DemoButton className={className} label={`${label} (not connected in this preview)`}>{children}</DemoButton>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  );
}

/** Google Maps directions for a verified branch; the preview notice otherwise. */
export function DirectionsAction({ url, className, children, label }: Common & { url: string | null }) {
  if (!url) return <DemoButton className={className} label={label}>{children}</DemoButton>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
      {children}
    </a>
  );
}
