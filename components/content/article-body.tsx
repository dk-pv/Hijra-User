import type { ReactNode } from 'react';
import type { BlogBlock } from '@/data/blogs';
import { images } from '@/data/images';
import { Note, Pending } from '@/components/ui/pending';
import { Photo } from '@/components/ui/photo';
import { cn } from '@/lib/cn';

/** Text where a [bracketed phrase] is a fact HIJRA must still supply. */
export function withPending(text: string): ReactNode[] {
  return text.split(/\[([^\]]+)\]/).map((part, i) => (i % 2 ? <Pending key={i}>{part}</Pending> : part));
}

/** The typed article body in the long-form style (.prose-hijra). h2 blocks carry the ids the contents list links to. */
export function ArticleBody({ blocks, className }: { blocks: BlogBlock[]; className?: string }) {
  return (
    <div className={cn('prose-hijra', className)}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i}>{withPending(b.text)}</p>;
          case 'h2':
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            );
          case 'h3':
            return <h3 key={i}>{b.text}</h3>;
          case 'ul':
          case 'ol': {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((item) => (
                  <li key={item}>{withPending(item)}</li>
                ))}
              </List>
            );
          }
          case 'quote':
            return (
              <figure key={i} className="py-2">
                <blockquote className={b.text.length < 60 ? 'text-h3' : undefined}>
                  <p>{b.text}</p>
                </blockquote>
                {b.cite ? <figcaption className="mt-3 pl-[1.3em] text-small text-muted">{b.cite}</figcaption> : null}
              </figure>
            );
          case 'note':
            return <Note key={i}>{withPending(b.text)}</Note>;
          case 'image': {
            const img = images[b.image];
            return (
              <figure key={i} className="mt-10 mb-10">
                <Photo
                  image={b.image}
                  sizes="(min-width: 1200px) 640px, 100vw"
                  className={cn('rounded-md', img.width >= img.height ? 'aspect-[3/2]' : 'aspect-[4/5]')}
                />
                <figcaption className="mt-3 text-caption text-muted">
                  {b.caption} <span className="whitespace-nowrap">Temporary image{img.credit.author ? `: ${img.credit.author}` : ''}.</span>
                </figcaption>
              </figure>
            );
          }
        }
      })}
    </div>
  );
}
