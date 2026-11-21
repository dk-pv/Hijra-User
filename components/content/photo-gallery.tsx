'use client';

import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import type { ImageCredit } from '@/data/images';
import type { GalleryCollection } from '@/data/gallery';
import { Icon } from '@/components/ui/icons';
import { PhotoFrame, type PhotoAsset } from '@/components/ui/photo-frame';
import { FilterChips } from './filter-chips';
import { rowEnds } from './justify';

// The gallery: collection chips; each collection a chapter (its title column sticks beside the photographs on desktop)
// of balanced justified rows: every photograph keeps its own shape, each row shares one height, and the row breaks
// are chosen per breakpoint (rowEnds) so nothing is crammed or left alone. The first collection on screen opens
// with one landscape across the full width: the gallery's cover, loaded first. Lightbox on the native <dialog>.
// The photographs arrive from the server page (image data resolved there), so no registry is bundled for the browser.

export type GalleryItem = { key: string; collection: GalleryCollection; file: string; asset: PhotoAsset; credit: ImageCredit };
export type GalleryGroup = { id: GalleryCollection; label: string; note: string };

const ratio = (p: GalleryItem) => p.asset.width / p.asset.height;
/** Summed aspect ratio wanted per row. Below 600 px: a full-width lead photo (350 by 220), then pairs (350 by 135).
    From 600 px (small tablets) to the desktop column: rows about 700–950 wide by 200–280 tall. */
const PHONE_LEAD = 1.6;
const PHONE = 2.6;
const WIDE = 3.4;

/** Breakers after these items: shown below 600 px, from 600 px, or both. A cover is a row of its own everywhere
    (and stands in for the phone lead, so the photos after it go straight to pairs). */
function breaks(photos: GalleryItem[], cover: boolean): (string | null)[] {
  const rest = cover ? photos.slice(1) : photos;
  const r = rest.map(ratio);
  const phone = new Set(rowEnds(r, PHONE, cover ? PHONE : PHONE_LEAD).slice(0, -1));
  const wide = new Set(rowEnds(r, WIDE).slice(0, -1));
  const after = rest.map((_, i) => {
    const p = phone.has(i + 1);
    const w = wide.has(i + 1);
    return p && w ? 'block' : p ? 'block min-[600px]:hidden' : w ? 'hidden min-[600px]:block' : null;
  });
  return cover ? ['block', ...after] : after;
}
/** The cover is shown no taller than 16:9, cropped around the photo's focal point. */
const COVER = 16 / 9;
/** Moves the first landscape to the front, to open the page as its cover. */
function withCover(photos: GalleryItem[]) {
  const i = photos.findIndex((p) => ratio(p) >= 1.2);
  return i < 0 ? { photos, cover: false } : { photos: [photos[i], ...photos.slice(0, i), ...photos.slice(i + 1)], cover: true };
}
/** The page behind the lightbox stays still while it is open. */
const lockPage = (on: boolean) => {
  document.documentElement.style.overflow = on ? 'hidden' : '';
};

export function PhotoGallery({ photos, collections, creditsHref }: { photos: GalleryItem[]; collections: GalleryGroup[]; creditsHref: string }) {
  const [active, setActive] = useState<GalleryCollection | 'all'>('all');
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const touchX = useRef(0);

  const groups = collections
    .map((c, n) => ({ ...c, n, photos: photos.filter((p) => p.collection === c.id), cover: false }))
    .filter((g) => g.photos.length && (active === 'all' || g.id === active))
    .map((g, gi) => (gi === 0 ? { ...g, ...withCover(g.photos) } : g));
  const visible = groups.flatMap((g) => g.photos);
  const position = new Map(visible.map((p, n) => [p.key, n]));
  const current = visible[Math.min(index, visible.length - 1)];

  const group = groups.find((g) => g.id === active);
  const status =
    active === 'all' ? `${visible.length} photographs in ${groups.length} collections` : `${group?.label}: ${visible.length} photographs`;

  function open(i: number) {
    setIndex(i);
    setIsOpen(true);
    dialog.current?.showModal();
    lockPage(true);
  }
  const step = (by: number) => setIndex((i) => (i + by + visible.length) % visible.length);
  function onClose() {
    setIsOpen(false);
    lockPage(false);
    // Back to the tile of the photograph on screen (the opener, unless the visitor moved on with the arrows).
    document.getElementById(`photo-${current.key}`)?.focus();
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      step(e.key === 'ArrowRight' ? 1 : -1);
    }
  }

  const options = [
    { value: 'all' as const, label: 'All', count: photos.length },
    ...collections
      .map((c) => ({ value: c.id, label: c.label, count: photos.filter((p) => p.collection === c.id).length }))
      .filter((o) => o.count),
  ];
  const arrow = 'grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border border-white/40 text-warm-white transition-colors hover:bg-white/10';
  const closeOnBackdrop = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) dialog.current?.close();
  };

  return (
    <>
      <div className="wrap">
        <FilterChips name="gallery-collection" legend="Show a collection" options={options} value={active} onChange={setActive} />
        <p role="status" className="mt-4 text-small font-semibold text-navy">
          {status}
        </p>
      </div>

      <div className="wrap mt-8 space-y-14 md:mt-12 md:space-y-20 lg:space-y-24">
        {groups.map((g, gi) => {
          const rowBreaks = breaks(g.photos, g.cover);
          return (
            <section key={g.id} aria-labelledby={`collection-${g.id}`} className="site-grid gap-y-6 border-t border-warm-border pt-5 md:pt-7">
              <div className="col-span-full lg:col-span-3">
                <div className="lg:sticky lg:top-28 lg:pr-4">
                  <h2 id={`collection-${g.id}`} className="flex items-baseline gap-3 text-h3">
                    <span className="font-sans text-small font-semibold tabular-nums text-red">{String(g.n + 1).padStart(2, '0')}</span>
                    {g.label}
                  </h2>
                  <p className="mt-2 max-w-[30rem] text-small text-muted lg:mt-3">{g.note}</p>
                  <p className="mt-1 text-caption text-muted lg:mt-3">
                    {g.photos.length} {g.photos.length === 1 ? 'photograph' : 'photographs'}
                  </p>
                </div>
              </div>
              {/* Rows: each photo grows in proportion to its aspect ratio (flex-basis 0), so a row shares one height; only the
                  breakers (a full-width, zero-height item) start a new row. Row spacing is the tiles' margin, not a gap. */}
              <ul className="col-span-full flex flex-wrap gap-x-2 md:gap-x-3 lg:col-span-9">
                {g.photos.map((p, pi) => {
                  const r = ratio(p);
                  return [
                    <li key={p.key} className="mb-2 min-w-0 md:mb-3" style={{ flex: `${r.toFixed(4)} 1 0px` }}>
                      <a
                        id={`photo-${p.key}`}
                        href={p.file}
                        aria-haspopup="dialog"
                        onClick={(e) => {
                          e.preventDefault();
                          open(position.get(p.key) ?? 0);
                        }}
                        className="block cursor-zoom-in rounded-md"
                        style={{ aspectRatio: g.cover && pi === 0 ? Math.max(r, COVER) : `${p.asset.width} / ${p.asset.height}` }}
                      >
                        <PhotoFrame
                          asset={p.asset}
                          priority={gi === 0 && pi === 0}
                          sizes={g.cover && pi === 0 ? '(min-width: 1200px) 70vw, 100vw' : '(min-width: 1200px) 40vw, (min-width: 810px) 60vw, 100vw'}
                          className="size-full rounded-md"
                        />
                      </a>
                    </li>,
                    rowBreaks[pi] ? <li key={`${p.key}-break`} aria-hidden="true" className={`h-0 basis-full ${rowBreaks[pi]}`} /> : null,
                  ];
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        onClose={onClose}
        onKeyDown={onKeyDown}
        onClick={closeOnBackdrop}
        aria-label="Photo viewer"
        aria-describedby="lightbox-caption"
        className="on-dark fixed inset-0 m-0 size-full max-h-none max-w-none border-0 bg-deep p-0 text-mist backdrop:bg-deep open:grid open:grid-rows-[auto_minmax(0,1fr)_auto]"
      >
        <div className="flex items-center justify-between gap-4 px-4 pt-3 md:px-8 md:pt-5">
          <p className="text-small tabular-nums">
            {index + 1} of {visible.length}
          </p>
          <button
            type="button"
            autoFocus
            onClick={() => dialog.current?.close()}
            aria-label="Close the photo viewer"
            className="-mr-2 grid size-12 cursor-pointer place-items-center rounded-full text-warm-white hover:bg-white/10"
          >
            <Icon name="close" size={24} />
          </button>
        </div>

        <div
          className="flex min-h-0 items-center justify-center gap-6 px-4 py-3 md:px-8"
          onClick={closeOnBackdrop}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
          }}
        >
          <button type="button" onClick={() => step(-1)} aria-label="Previous photograph" className={`${arrow} hidden md:grid`}>
            <Icon name="chevronLeft" size={24} />
          </button>
          <div
            className="min-w-0"
            style={{ aspectRatio: `${current.asset.width} / ${current.asset.height}`, width: `min(100%, calc((100dvh - 15rem) * ${ratio(current).toFixed(4)}))` }}
          >
            {isOpen ? <PhotoFrame key={current.key} asset={current.asset} sizes="(min-width: 810px) 80vw, 100vw" className="size-full rounded-md" /> : null}
          </div>
          <button type="button" onClick={() => step(1)} aria-label="Next photograph" className={`${arrow} hidden md:grid`}>
            <Icon name="chevronRight" size={24} />
          </button>
        </div>

        <div className="px-4 pb-5 pt-2 md:px-8 md:pb-7">
          <div className="mx-auto max-w-[46rem] md:text-center">
            <p id="lightbox-caption" aria-live="polite" className="text-small text-warm-white">
              {current.asset.alt}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-caption md:justify-center">
              <span className="sample-tag">Temporary image</span>
              <span>
                Photo:{' '}
                <a href={current.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-inline">
                  {current.credit.author}
                </a>
                ,{' '}
                <a href={current.credit.licenceUrl} target="_blank" rel="noopener noreferrer" className="link-inline">
                  {current.credit.licence}
                </a>
              </span>
              <a href={creditsHref} className="link-inline">
                All image credits
              </a>
            </p>
          </div>
          <div className="mt-4 flex justify-center gap-3 md:hidden">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photograph" className={arrow}>
              <Icon name="chevronLeft" size={24} />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photograph" className={arrow}>
              <Icon name="chevronRight" size={24} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
