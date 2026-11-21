import { cn } from '@/lib/cn';
import { Img, type PhotoAsset } from './img';
import { PriorityImg } from './priority-img';

export type { PhotoAsset } from './img';

export type PhotoFrameProps = {
  asset: PhotoAsset;
  /** Required: the rendered width at each breakpoint, e.g. '(min-width: 1200px) 40vw, 100vw'. */
  sizes: string;
  /** Size the frame with classes (aspect-[4/5], h-full, rounded-lg...). */
  className?: string;
  /** The page's main (LCP) image: loads eagerly at high priority. Use once per page. */
  priority?: boolean;
  /** Override the photo's focal point (CSS object-position). */
  focus?: string;
  /** Override the alt text; pass '' for a purely decorative image. */
  alt?: string;
};

/** A photograph in a frame that holds its space while loading. Server pages use <Photo image="key">; Client Components
 * receive the PhotoAsset from the server and use this directly. */
export function PhotoFrame({ asset, sizes, className, priority, focus, alt }: PhotoFrameProps) {
  const ImgTag = priority ? PriorityImg : Img;
  return (
    <div className={cn('photo', className)} style={{ backgroundColor: asset.tone }}>
      <ImgTag
        img={asset}
        alt={alt}
        sizes={sizes}
        className="absolute inset-0 size-full object-cover text-transparent"
        style={{ objectPosition: focus ?? asset.focus }}
      />
    </div>
  );
}
