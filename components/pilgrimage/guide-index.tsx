'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * The Pilgrim Guide's section index for wide screens: sticky beside the chapters, marking the chapter being read.
 * Phones get the same links as chips in the page itself.
 */
export function GuideIndex({ items, className }: { items: { id: string; label: string }[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="In this guide" className={className}>
      <p className="text-caption font-semibold uppercase tracking-[0.12em] text-muted">In this guide</p>
      <ol className="mt-4 border-l border-warm-border">
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? 'location' : undefined}
              className={cn(
                '-ml-px flex min-h-11 items-baseline gap-3 border-l-2 py-2 pl-4 text-small transition-colors',
                active === it.id ? 'border-red font-semibold text-navy' : 'border-transparent text-muted hover:text-navy',
              )}
            >
              <span className="w-5 shrink-0 font-serif text-ui font-semibold">{String(i + 1).padStart(2, '0')}</span>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
