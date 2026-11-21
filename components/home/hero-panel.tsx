import Link from 'next/link';
import type { ImageKey } from '@/data/images';
import { cn } from '@/lib/cn';
import { Photo } from '@/components/ui/photo';

/** One half of the pilgrimage diptych: a tall photograph with a caption plate over its lower-left corner. */
export function HeroPanel({
  image,
  title,
  text,
  href,
  priority,
  focus,
  className,
}: {
  image: ImageKey;
  title: string;
  text: string;
  href: string;
  priority?: boolean;
  focus?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn('group relative block lg:mb-6', className)}>
      <Photo
        image={image}
        sizes="(min-width: 1200px) 29vw, 50vw"
        priority={priority}
        focus={focus}
        className="aspect-[3/4] rounded-[18px] md:rounded-lg lg:aspect-auto lg:h-[min(70vh,38.75rem)]"
      />
      <span className="mt-3 block lg:absolute lg:-bottom-6 lg:left-6 lg:mt-0 lg:min-w-60 lg:rounded-md lg:bg-white lg:px-[22px] lg:py-[18px]">
        <span className="block font-serif text-[clamp(1.375rem,1.1rem+0.6vw,1.75rem)] font-semibold leading-tight text-navy">{title}</span>
        <span className="mt-1 block text-small text-muted">{text}</span>
        <span className="link-arrow mt-1 min-h-0 text-small lg:mt-2.5">Explore</span>
      </span>
    </Link>
  );
}
