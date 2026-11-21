import type { ComponentProps } from 'react';

/** Image data computed on the server by lib/image.ts: optimiser URLs from next/image's getImageProps(). */
export type ImgData = { src: string; srcSet?: string; width: number; height: number; alt: string };
/** A library photograph: image data plus its average colour (shown while loading) and focal point. */
export type PhotoAsset = ImgData & { tone: string; focus: string };

/**
 * A native <img> for server-computed image data, usable from Server and Client Components. Rendering next/image's
 * <Image> would add its client component (about 10 KB of JavaScript) to every page; the URLs, sizes and quality are
 * the same because getImageProps() builds them. Lazy unless the caller passes loading="eager".
 */
export function Img({ img, alt, ...rest }: { img: ImgData; alt?: string } & Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'width' | 'height' | 'alt'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- optimised by next/image's getImageProps() on the server (lib/image.ts); see above
    <img src={img.src} srcSet={img.srcSet} width={img.width} height={img.height} alt={alt ?? img.alt} loading="lazy" decoding="async" draggable={false} {...rest} />
  );
}
