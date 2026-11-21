import logo from '@/public/brand/hijra-logo.png';
import { fixedImg } from '@/lib/image';
import { cn } from '@/lib/cn';
import { Img } from '@/components/ui/img';

/**
 * Stands where a branch photograph will go until HIJRA supplies verified ones: the HIJRA sign as the branch would show
 * it (the full-colour logo stays on white). A designed panel, not a stock photograph presented as the branch.
 */
export function BranchSign({ name, town, compact, className }: { name: string; town: string; compact?: boolean; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`HIJRA Travels sign, ${name} branch, ${town}`}
      className={cn('flex flex-col items-center justify-center border border-warm-border bg-white text-center', compact ? 'p-2' : 'gap-4 p-8', className)}
    >
      <Img img={fixedImg(logo, '', 210, 64)} alt="" className={cn('h-auto', compact ? 'w-[86%]' : 'w-[min(60%,260px)]')} />
      {compact ? null : (
        <>
          <span aria-hidden="true" className="h-px w-16 bg-sand" />
          <span className="font-serif text-h3 text-navy">{name}</span>
          <span className="text-caption font-semibold uppercase tracking-[0.14em] text-muted">{town}</span>
        </>
      )}
    </div>
  );
}
