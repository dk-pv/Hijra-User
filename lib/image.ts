import 'server-only';
import { getImageProps, type StaticImageData } from 'next/image';
import { images, type ImageKey } from '@/data/images';
import type { ImgData, PhotoAsset } from '@/components/ui/img';

// The server side of every image. next/image's getImageProps() builds the optimiser URLs (/_next/image with the sizes
// and quality from next.config) and components/ui/img.tsx renders them as a native <img>, so no image JavaScript
// reaches the browser. Server-only: it reads the full photo registry, which must not be bundled for the client.

/** A fixed-size image such as the logo: 1x and 2x candidates. */
export function fixedImg(src: StaticImageData, alt: string, width: number, height: number): ImgData {
  const { props } = getImageProps({ src, alt, width, height });
  return { src: props.src, srcSet: props.srcSet, width, height, alt };
}

/** A library photograph with every optimiser width; the sizes attribute where it renders picks the candidate. */
export function photoAsset(key: ImageKey): PhotoAsset {
  const img = images[key];
  // sizes '1vw' keeps every configured width (getImageProps drops widths below the smallest viewport share).
  const { props } = getImageProps({ src: img.src, alt: img.alt, width: img.width, height: img.height, sizes: '1vw' });
  return { src: props.src, srcSet: props.srcSet, width: img.width, height: img.height, alt: img.alt, tone: img.tone, focus: img.focus };
}

/** A static import shown at varying widths (the Kerala map): every optimiser width, chosen by `sizes` where it renders. */
export function responsiveImg(src: StaticImageData, alt: string): ImgData {
  const { props } = getImageProps({ src, alt, sizes: '1vw' });
  return { src: props.src, srcSet: props.srcSet, width: src.width, height: src.height, alt };
}
