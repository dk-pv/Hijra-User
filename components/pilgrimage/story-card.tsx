import Link from 'next/link';
import type { Story } from '@/data/stories';
import { routes } from '@/data/navigation';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icons';
import { Photo } from '@/components/ui/photo';

/**
 * An image-led story teaser that opens the story on /pilgrim-stories. The photograph shows a place, never
 * people presented as the pilgrims. `large` adds the pull quote; `small` sits beside its photo on phones.
 */
export function StoryCard({ story, size = 'small', sizes, className }: { story: Story; size?: 'large' | 'small'; sizes: string; className?: string }) {
  const small = size === 'small';
  return (
    <Link
      href={`${routes.pilgrimStories}#${story.slug}`}
      className={cn('group block', small && 'grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-x-4 xs:grid-cols-[8rem_minmax(0,1fr)] md:block', className)}
    >
      <Photo
        image={story.image}
        sizes={sizes}
        alt=""
        className={cn('rounded-md', small ? 'aspect-[4/5] md:aspect-[3/2]' : 'aspect-[4/3] md:aspect-[16/10]')}
      />
      <span className="block">
        <span className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-caption font-semibold uppercase tracking-[0.12em] text-muted', small ? 'md:mt-4' : 'mt-4')}>
          <span className="text-red">{story.journey === 'hajj' ? 'Hajj' : 'Umrah'}</span>
          <span aria-hidden="true" className={cn(small && 'hidden sm:inline')}>
            ·
          </span>
          <span className={cn(small && 'hidden sm:inline')}>{story.season}</span>
          {story.hasVideo ? (
            <span className="flex items-center gap-1.5 normal-case tracking-normal">
              <Icon name="video" size={16} />
              Video
            </span>
          ) : null}
        </span>
        <span className={cn('mt-2 block font-serif font-semibold text-navy group-hover:text-red', small ? 'text-h4' : 'text-h3')}>{story.title}</span>
        {small ? null : <span className="mt-3 block max-w-[34rem] text-lead text-slate">“{story.quote}”</span>}
        <span className="mt-2 block text-small text-muted">{story.who}</span>
        <span className="link-arrow mt-1 min-h-11 text-small">Read the story</span>
      </span>
    </Link>
  );
}
