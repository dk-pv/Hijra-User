import Link from 'next/link';
import type { ReactNode } from 'react';
import { routes } from '@/data/navigation';
import { dictionary } from '@/lib/dictionary';
import { cn } from '@/lib/cn';
import { EnquiryForm, type EnquiryFormProps } from '@/components/forms/enquiry-form';
import { ContactAction } from '@/components/ui/contact-action';
import { Icon, type IconName } from '@/components/ui/icons';
import { ContactValue } from '@/components/ui/contact-value';

function Row({ icon, title, note, iconClass }: { icon: IconName; title: string; note: ReactNode; iconClass?: string }) {
  return (
    <>
      <Icon name={icon} size={22} className={cn('shrink-0', iconClass ?? 'text-navy')} />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-navy">{title}</span>
        <span className="block text-small text-muted">{note}</span>
      </span>
      <Icon name="arrowRight" className="shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-1" />
    </>
  );
}

/** Call, WhatsApp, email and the branch finder as one hairline list. `message` pre-fills WhatsApp once connected. */
export function ContactPanel({ message, className }: { message?: string; className?: string }) {
  const t = dictionary;
  const row = 'group flex w-full min-h-[4.5rem] cursor-pointer items-center gap-4 py-3 text-left';
  return (
    <ul className={cn('border-b border-warm-border', className)}>
      <li className="border-t border-warm-border">
        <ContactAction kind="call" className={row}>
          <Row icon="phone" title="Call an advisor" note={<ContactValue kind="phone" />} />
        </ContactAction>
      </li>
      <li className="border-t border-warm-border">
        <ContactAction kind="whatsapp" message={message} className={row}>
          <Row icon="whatsapp" iconClass="text-wa" title={t.common.whatsappUs} note="Send your plans and questions in writing" />
        </ContactAction>
      </li>
      <li className="border-t border-warm-border">
        <ContactAction kind="email" className={row}>
          <Row icon="mail" title="Email" note={<ContactValue kind="email" />} />
        </ContactAction>
      </li>
      <li className="border-t border-warm-border">
        <Link href={routes.branches} className={row}>
          <Row icon="pin" title="Visit a branch" note="Sit down with an advisor near you" />
        </Link>
      </li>
    </ul>
  );
}

/** A page's enquiry target (#enquiry): the case for asking and the contact options, beside the shared form. */
export function EnquirySection({
  eyebrow = 'Enquiry',
  title,
  lead,
  service,
  tours,
  source,
  message,
  initial,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  service: 'tour' | 'visa';
  tours?: { slug: string; name: string }[];
  source: string;
  message?: string;
  /** Prefilled form values (a tour page passes its destination). */
  initial?: EnquiryFormProps['initial'];
  /** Extra notes under the contact options. */
  children?: ReactNode;
  className?: string;
}) {
  const t = dictionary;
  return (
    <section id="enquiry" aria-labelledby="enquiry-h" className={cn('py-section', className)}>
      <div className="wrap site-grid items-start gap-y-10">
        <div className="col-span-full lg:col-span-5">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="enquiry-h" className="mt-3 text-h2">
            {title}
          </h2>
          <p className="mt-4 text-lead">{lead}</p>
          <ContactPanel message={message} className="mt-8" />
          {children}
        </div>
        <EnquiryForm
          t={t.form}
          variant="compact"
          defaultService={service}
          lockService
          tours={tours}
          initial={initial}
          source={source}
          className="col-span-full lg:col-span-6 lg:col-start-7"
        />
      </div>
    </section>
  );
}
