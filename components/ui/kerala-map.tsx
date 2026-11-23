import type { CSSProperties } from 'react';
import terrainImage from '@/public/images/Kerala’s Lush Terrain Map.png';
import emblem from '@/public/brand/hijra-emblem.png';
import { branches } from '@/data/branches';
import { terrain, terrainPosition } from '@/data/kerala-map';
import { branchPath } from '@/data/navigation';
import { site } from '@/data/site';
import { fixedImg, responsiveImg } from '@/lib/image';
import { cn } from '@/lib/cn';
import { Img } from './img';
import { MapPinLink } from './map-pin-link';

// The branch map: HIJRA's Kerala terrain drawing, shown unchanged, with pins built in HTML and CSS (C9: no embedded
// map service). One pin per branch record (data/branches.ts), linked to its branch page. A pin marks the branch's
// verified premises (`geo`) once HIJRA supplies them; until then it marks the town (`pin`) and says so.

const pins = branches.flatMap((b) => {
  const exact = b.geo !== null;
  const at = terrainPosition((b.geo ?? b.pin).lat, (b.geo ?? b.pin).lng);
  return at ? [{ b, exact, lean: b.pin.lean ?? 0, ...at }] : [];
});
const headOffice = pins.find((p) => p.b.isHeadOffice);
const townOnly = pins.some((p) => !p.exact);

export function KeralaMap({ className }: { className?: string }) {
  const mark = fixedImg(emblem, '', 26, 26);
  const count = site.facts.branchCount;

  return (
    <figure className={cn('m-0', className)}>
      <div className="kerala-map" style={{ aspectRatio: `${terrain.width} / ${terrain.height}` }}>
        <Img
          img={responsiveImg(terrainImage, `Map of Kerala with HIJRA branch ${townOnly ? 'towns' : 'locations'}`)}
          sizes="(min-width: 1200px) 420px, (min-width: 810px) 40vw, 88vw"
          className="absolute inset-0 size-full object-contain"
        />
        {pins.map(({ b, exact, lean, x, y }, i) => (
          <div
            key={b.id}
            className={cn('map-pin', b.isHeadOffice && 'is-hq', b.pin.tip === 'left' && 'tip-left')}
            style={{ left: `${x}%`, top: `${y}%`, '--lean': `${lean}deg`, '--pin-delay': `${i * 0.6}s` } as CSSProperties}
          >
            <span className="map-pin-ring" aria-hidden="true" />
            <span className="map-pin-body">
              <MapPinLink
                href={branchPath(b.slug)}
                className="map-pin-marker"
                aria-label={`${b.name} branch${b.isHeadOffice ? ', head office' : ''}${exact ? '' : ' (town location)'}`}
              >
                <Img img={mark} alt="" className="map-pin-emblem" />
              </MapPinLink>
            </span>
            <span className="map-pin-tip" aria-hidden="true">
              {b.name}
              {b.isHeadOffice ? <small>Head Office</small> : null}
              {exact ? null : <small className="map-pin-town">Town location</small>}
            </span>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-caption text-muted">
        {count ? `${count} branches` : 'Branches'} across Kerala{headOffice ? `, with the head office in ${headOffice.b.name}` : ''}.
        {townOnly ? ' Pins marked “town location” show the town, not the exact office.' : ''}
      </figcaption>
    </figure>
  );
}
