'use client';

import { useRef, useState } from 'react';
import { Icon } from '@/components/ui/icons';

/** Share an article: copy the link (Clipboard API, with visible and announced feedback), WhatsApp or Facebook. */
export function ShareActions({ title, url }: { title: string; url: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(location.origin + location.pathname);
      setState('copied');
      timer.current = setTimeout(() => setState('idle'), 4000);
    } catch {
      setState('failed');
    }
  }

  const newTab = <span className="sr-only"> (opens in a new tab)</span>;
  return (
    <div>
      <p id="share-h" className="eyebrow">
        Share this article
      </p>
      <div role="group" aria-labelledby="share-h" className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={copy} className="btn btn-outline btn-sm">
          <Icon name={state === 'copied' ? 'check' : 'link'} className={state === 'copied' ? 'text-success' : undefined} />
          {state === 'copied' ? 'Link copied' : 'Copy link'}
        </button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
        >
          <Icon name="whatsapp" className="wa-mark" />
          <span className="sr-only">Share on </span>WhatsApp{newTab}
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
        >
          <Icon name="facebook" />
          <span className="sr-only">Share on </span>Facebook{newTab}
        </a>
      </div>
      <p role="status" className="mt-3 min-h-[1.45em] break-words text-caption text-muted">
        {state === 'copied' ? 'The link is on your clipboard, ready to paste.' : null}
        {state === 'failed' ? `Your browser did not allow copying. The link is: ${url}` : null}
      </p>
    </div>
  );
}
