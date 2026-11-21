import type { Faq } from '@/data/faqs';
import { cn } from '@/lib/cn';
import { Icon } from './icons';

/** Accessible accordion on native details/summary: works without JavaScript, keyboard-ready, animates where supported. */
export function FaqList({ items, className, openFirst }: { items: Faq[]; className?: string; openFirst?: boolean }) {
  return (
    <div className={cn('faq', className)}>
      {items.map((f, i) => (
        <details key={f.q} className="faq-item" open={openFirst && i === 0 ? true : undefined}>
          <summary>
            <span>{f.q}</span>
            <Icon name="plus" />
          </summary>
          <div className="faq-a">
            {f.a.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Several FAQ groups under small red labels, as in the homepage design (section 12). */
export function FaqGroups({ groups, className }: { groups: { label: string; items: Faq[] }[]; className?: string }) {
  return (
    <div className={className}>
      {groups.map((g, i) => (
        <div key={g.label} className={i ? 'mt-10' : undefined}>
          <h3 className="eyebrow mb-2 font-sans">{g.label}</h3>
          <FaqList items={g.items} />
        </div>
      ))}
    </div>
  );
}
