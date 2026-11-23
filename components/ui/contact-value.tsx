import { site } from '@/data/site';
import { dictionary as t } from '@/lib/dictionary';
import { Pending } from './pending';

type Kind = 'phone' | 'whatsapp' | 'email' | 'hours';
const missing: Record<Kind, string> = { phone: t.pending.phone, whatsapp: t.pending.whatsapp, email: t.pending.email, hours: t.pending.hours };

/** A central contact detail as pages show it: HIJRA's own value; a preview stand-in, marked "(sample)" so it is never
 * read as HIJRA's real contact; or, in launch builds, a marked placeholder. */
export function ContactValue({ kind }: { kind: Kind }) {
  const shown = site.contact[kind];
  if (!shown) return <Pending>{missing[kind]}</Pending>;
  if (site.contactLive[kind]) return <>{shown}</>;
  return (
    <>
      {shown} {/* a real space, so "(sample)" can wrap to its own line in narrow columns */}
      <span className="font-normal opacity-75">(sample)</span>
    </>
  );
}
