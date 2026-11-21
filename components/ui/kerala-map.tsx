import { keralaMap, projectToMap } from '@/data/kerala-map';
import type { Branch } from '@/data/branches';
import { cn } from '@/lib/cn';

// Static map of Kerala (C9: no embedded Google Maps scripts). City names are geography for orientation only.
// Pins: drawn from verified coordinates only (the approved design shows none until branches are verified).
// To test the marker layout with the sample records, run the dev server with NEXT_PUBLIC_SAMPLE_PINS=1:
// dashed 'sample position' markers then appear. Production builds never show them.

const SHOW_SAMPLE_PINS = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_SAMPLE_PINS === '1';

export function KeralaMap({
  branches,
  className,
  title = 'Map of Kerala',
  activeSlug,
}: {
  branches: Branch[];
  className?: string;
  title?: string;
  activeSlug?: string;
}) {
  const pins = branches
    .map((b, i) => {
      if (b.status === 'verified' && b.geo) return { ...projectToMap(b.geo.lat, b.geo.lng), n: i + 1, b, sample: false };
      if (SHOW_SAMPLE_PINS && b.samplePin) return { ...b.samplePin, n: i + 1, b, sample: true };
      return null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
  const hasSample = pins.some((p) => p.sample);
  const verified = pins.filter((p) => !p.sample).length;

  return (
    <figure className={cn('m-0', className)}>
      <svg viewBox={keralaMap.viewBox} className="mx-auto block h-auto w-full max-h-[540px]" role="img" aria-label={`${title}${verified ? `, with ${verified} branch locations` : ''}`}>
        <path d={keralaMap.d} fill="#F3F1EC" stroke="#012052" strokeWidth={2.4} strokeLinejoin="round" />
        {keralaMap.cities.map((c) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r={5} fill="#7D8492" />
            <text
              x={c.anchor === 'end' ? c.x - 12 : c.x + 12}
              y={c.y + 9}
              textAnchor={c.anchor}
              fontFamily="var(--font-hanken), Arial, sans-serif"
              fontSize={27}
              fontWeight={600}
              fill="#5A6577"
              paintOrder="stroke"
              stroke="#fff"
              strokeWidth={7}
              strokeLinejoin="round"
            >
              {c.name}
            </text>
          </g>
        ))}
        {pins.map((p) => (
          <g key={p.b.id} aria-hidden="true">
            {p.sample ? (
              <circle cx={p.x} cy={p.y} r={19} fill="#FAF9F6" stroke="#C10304" strokeWidth={3} strokeDasharray="6 5" />
            ) : (
              <circle cx={p.x} cy={p.y} r={19} fill={p.b.slug === activeSlug ? '#C10304' : '#012052'} stroke="#fff" strokeWidth={4} />
            )}
            <text x={p.x} y={p.y + 8} textAnchor="middle" fontFamily="var(--font-hanken), Arial, sans-serif" fontSize={22} fontWeight={600} fill={p.sample ? '#C10304' : '#fff'}>
              {p.n}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center text-caption text-muted">
        {hasSample
          ? 'Development preview: dashed markers are sample positions, not real locations. Production shows verified branches only.'
          : 'Pins appear only for verified branches.'}
      </figcaption>
    </figure>
  );
}
