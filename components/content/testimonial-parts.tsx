import Link from 'next/link';
import { cn } from '@/lib/cn';
import { SampleTag } from '@/components/ui/pending';
import { PhotoFrame } from '@/components/ui/photo-frame';
import type { TestimonialItem } from './testimonial-items';

// Small presentational pieces shared by the homepage (server) and the testimonials browser (client): no hooks.

/** Who, what journey, which service, and "Sample" when it is one. */
export function Attribution({ t, className }: { t: TestimonialItem; className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-2 text-small', className)}>
      {t.type === 'written' && t.photo ? <PhotoFrame asset={t.photo} sizes="44px" alt="" className="size-11 shrink-0 rounded-full" /> : null}
      {t.who ? <span className="font-semibold text-navy">{t.who}</span> : null}
      <span className="text-muted">
        {t.context} · {t.categoryLabel}
      </span>
      {t.sample ? <SampleTag>Sample</SampleTag> : null}
    </div>
  );
}

/** The package or tour a testimonial is about. */
export function AboutLink({ t, className }: { t: TestimonialItem; className?: string }) {
  return t.ref ? (
    <Link href={t.ref.href} className={cn('link-arrow text-small', className)}>
      {t.ref.label}
    </Link>
  ) : null;
}

/** A review in the serif voice, with red marks the screen reader skips. */
export function Quote({ text, className }: { text: string; className?: string }) {
  return (
    <blockquote>
      <p className={cn('font-serif font-semibold text-navy', className)}>
        <span className="text-red" aria-hidden="true">
          “
        </span>
        {text}
        <span className="text-red" aria-hidden="true">
          ”
        </span>
      </p>
    </blockquote>
  );
}
