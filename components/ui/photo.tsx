import type { ImageKey } from '@/data/images';
import { site } from '@/data/site';
import { photoAsset } from '@/lib/image';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './icons';
import { PhotoFrame, type PhotoFrameProps } from './photo-frame';

/** A photograph from the licensed library (data/images.ts) in a frame that holds its space while loading.
 * Server Components only (it reads the photo registry): Client Components receive a PhotoAsset and use <PhotoFrame>. */
export function Photo({ image, ...rest }: Omit<PhotoFrameProps, 'asset'> & { image: ImageKey }) {
  return <PhotoFrame asset={photoAsset(image)} {...rest} />;
}

/**
 * Where only an authentic HIJRA photograph or video will do (staff, real pilgrims): never a stock image of people
 * presented as HIJRA's. In preview builds an `image` (a place, from the licensed library) makes it a finished-looking
 * poster that still says what will appear there; launch builds show the plain slot until HIJRA supplies the real one.
 */
export function ClientPhoto({
  subject,
  className,
  title = 'Client photograph required',
  icon = 'camera',
  image,
  sizes = '(min-width: 810px) 33vw, 100vw',
}: {
  subject: string;
  className?: string;
  title?: string;
  icon?: IconName;
  image?: ImageKey;
  sizes?: string;
}) {
  if (image && site.demo)
    return (
      <div className={cn('photo', className)} role="img" aria-label={`${title}: ${subject}`}>
        <PhotoFrame asset={photoAsset(image)} sizes={sizes} alt="" className="absolute inset-0" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(4_28_76/0.88),rgb(4_28_76/0.2)_55%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4 text-white md:p-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-caption font-semibold">
            <Icon name={icon} size={16} />
            {title}
          </span>
          <span className="text-small font-semibold leading-snug">{subject}</span>
        </div>
      </div>
    );
  return (
    <div className={cn('photo', className)} role="img" aria-label={`${title}: ${subject}`}>
      <div className="client-photo">
        <Icon name={icon} />
        <b>{title}</b>
        <span>{subject}</span>
      </div>
    </div>
  );
}
