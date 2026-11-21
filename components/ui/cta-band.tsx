import Link from 'next/link';
import type { ReactNode } from 'react';
import { enquiryPath, type ServiceKey } from '@/data/navigation';
import { dictionary } from '@/lib/dictionary';
import { cn } from '@/lib/cn';
import { ContactAction } from './contact-action';
import { Icon } from './icons';

/** Closing call to action on Deep Navy: enquire (Book A Trip, preselected) or WhatsApp. */
export function CtaBand({
  eyebrow = 'Enquire',
  title,
  body,
  service,
  interest,
  cta = 'Start an enquiry',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  service?: ServiceKey;
  interest?: string;
  cta?: string;
  className?: string;
}) {
  const t = dictionary;
  return (
    <section className={cn('on-dark bg-deep py-section', className)}>
      <div className="wrap site-grid items-end gap-y-8">
        <div className="col-span-full lg:col-span-7">
          <span className="rule-double mb-5" aria-hidden="true" />
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 text-h2">{title}</h2>
          {body ? <p className="mt-4 max-w-[36rem] text-lead">{body}</p> : null}
        </div>
        <div className="col-span-full flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <Link href={enquiryPath(service, interest)} className="btn btn-light">
            {cta}
          </Link>
          <ContactAction kind="whatsapp" className="btn btn-outline-light">
            <Icon name="whatsapp" />
            {t.common.whatsappUs}
          </ContactAction>
        </div>
      </div>
    </section>
  );
}
