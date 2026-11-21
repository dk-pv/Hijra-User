import { cn } from '@/lib/cn';

export type ChipOption<T extends string> = { value: T; label: string; count?: number };

/**
 * Filter as native radio chips (the existing .seg style): one Tab stop, arrow keys move the choice, works with any
 * screen reader. On phones the row scrolls sideways, edge to edge, instead of wrapping onto three lines.
 */
export function FilterChips<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  className,
}: {
  name: string;
  legend: string;
  options: ChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <fieldset className={cn('min-w-0', className)}>
      <legend className="sr-only">{legend}</legend>
      <div className="-mx-[var(--m)] overflow-x-auto px-[var(--m)] py-1 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0">
        <div className="seg flex-nowrap md:flex-wrap">
          {options.map((o) => (
            <label key={o.value} className="shrink-0">
              <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
              <span>
                {o.label}
                {o.count !== undefined ? <small className="ml-2 text-caption font-normal opacity-70">{o.count}</small> : null}
              </span>
            </label>
          ))}
        </div>
      </div>
    </fieldset>
  );
}
