import { site } from '@/data/site';
import { dictionary as t } from '@/lib/dictionary';
import { Pending } from './pending';

type Kind = 'phone' | 'whatsapp' | 'email' | 'hours';
const missing: Record<Kind, string> = { phone: t.pending.phone, whatsapp: t.pending.whatsapp, email: t.pending.email, hours: t.pending.hours };

/** A central contact detail as pages show it: HIJRA's own value, or a marked placeholder until it is supplied. */
export function ContactValue({ kind }: { kind: Kind }) {
  return site.contact[kind] ?? <Pending>{missing[kind]}</Pending>;
}
