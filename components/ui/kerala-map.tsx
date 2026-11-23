import type { CSSProperties } from 'react';
import terrainImage from '@/public/images/Kerala’s Lush Terrain Map.png';
import emblem from '@/public/brand/hijra-emblem.png';
import { branches } from '@/data/branches';
import { terrain, terrainPosition } from '@/data/kerala-map';
import { branchPath } from '@/data/navigation';
import { fixedImg, responsiveImg } from '@/lib/image';
import { cn } from '@/lib/cn';
import { Img } from './img';
import { MapPinLink } from './map-pin-link';

// The branch map: HIJRA's Kerala terrain drawing, shown unchanged, with pins built in HTML and CSS (C9: no embedded
// map service). One pin per branch record (data/branches.ts), at its town; each pin links to its branch page.

const pins = branches.flatMap((b) => {
  const at = terrainPosition(b.pin.lat, b.pin.lng);
  return at ? [{ b, lean: b.pin.lean ?? 0, ...at }] : [];
});
const headOffice = pins.find((p) => p.b.isHeadOffice);

export function KeralaMap({ className }: { className?: string }) {
  const mark = fixedImg(emblem, '', 26, 26);

  return (
    <figure className={cn('m-0', className)}>
      <div className="kerala-map" style={{ aspectRatio: `${terrain.width} / ${terrain.height}` }}>
        <Img
          img={responsiveImg(terrainImage, `Map of Kerala with ${pins.length} HIJRA branches`)}
          sizes="(min-width: 1200px) 420px, (min-width: 810px) 40vw, 88vw"
          className="absolute inset-0 size-full object-contain"
        />
        {pins.map(({ b, lean, x, y }, i) => (
          <div
            key={b.id}
            className={cn('map-pin', b.isHeadOffice && 'is-hq', lean < 0 && 'tip-left')}
            style={{ left: `${x}%`, top: `${y}%`, '--lean': `${lean}deg`, '--pin-delay': `${i * 0.6}s` } as CSSProperties}
          >
            <span className="map-pin-ring" aria-hidden="true" />
            <span className="map-pin-body">
              <MapPinLink href={branchPath(b.slug)} className="map-pin-marker" aria-label={`${b.name} branch${b.isHeadOffice ? ', head office' : ''}`}>
                <Img img={mark} alt="" className="map-pin-emblem" />
              </MapPinLink>
              <span className="map-pin-tip" aria-hidden="true">
                {b.name}
                {b.isHeadOffice ? <small>Head Office</small> : null}
              </span>
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-caption text-muted">
        {pins.length} branches across Kerala{headOffice ? `, with the head office in ${headOffice.b.name}` : ''}.
      </figcaption>
    </figure>
  );
}
