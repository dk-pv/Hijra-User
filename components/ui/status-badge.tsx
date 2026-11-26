import { statusLabel, type PackageStatus } from '@/data/packages';
import { cn } from '@/lib/cn';

/** A package's availability, only when HIJRA has set one (see shownStatus in data/packages.ts). */
export function StatusBadge({ status, className }: { status: PackageStatus | null; className?: string }) {
  return status ? (
    <span className={cn('status', className)} data-status={status}>
      {statusLabel[status]}
    </span>
  ) : null;
}
