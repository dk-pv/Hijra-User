import Link from 'next/link';
import type { ReactNode } from 'react';
import { enquiryPath, type ServiceKey } from '@/data/navigation';
import { dictionary } from '@/lib/dictionary';
import { cn } from '@/lib/cn';
import { ContactAction } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';

/** The inset enquiry band of mock-up 5: a rounded Deep Navy panel inside the page margins (CtaBand is the full-bleed version). */
export function JourneyBand({
  title,
  body,
  service,
  interest,
  cta = 'Send an enquiry',
  className,
}: {
  title: ReactNode;
  body?: ReactNode;
  service?: ServiceKey;
  interest?: string;
  cta?: string;
  className?: string;
}) {
  const t = dictionary;
  return (
    <section className={cn('pb-section', className)}>
      <div className="wrap">
        <div className="on-dark flex flex-col items-start gap-7 rounded-lg bg-deep px-6 py-8 sm:px-8 md:px-12 md:py-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[40rem]">
            <h2 className="text-h3">{title}</h2>
            {body ? <p className="mt-2.5">{body}</p> : null}
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap lg:shrink-0">
            <Link href={enquiryPath(service, interest)} className="btn btn-light">
              {cta}
            </Link>
            <ContactAction kind="whatsapp" className="btn btn-outline-light">
              <Icon name="whatsapp" />
              {t.common.whatsappUs}
            </ContactAction>
          </div>
        </div>
      </div>
    </section>
  );
}
