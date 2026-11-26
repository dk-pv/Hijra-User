'use client';

import { useEffect, useRef, useState } from 'react';
import type { VideoSource } from '@/data/testimonials';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/icons';
import { PhotoFrame, type PhotoAsset } from '@/components/ui/photo-frame';

// A testimonial video. Until the visitor presses play it is only a poster and a native button: nothing loads from
// YouTube or Vimeo, and nothing plays by itself. Pressing play swaps in the player (YouTube without cookies, Vimeo
// with do-not-track), which starts with its own accessible controls and full screen, and moves focus into it.
// Without a usable source, or if a video file fails, the poster says so instead of showing a broken frame.

export function VideoPlayer({
  title,
  thumb,
  source,
  sample,
  sizes,
  className,
}: {
  title: string;
  thumb: PhotoAsset;
  source: VideoSource | null;
  sample: boolean;
  sizes: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const player = useRef<HTMLIFrameElement & HTMLVideoElement>(null);
  const notice = useRef<HTMLParagraphElement>(null);

  // Focus follows the press: into the player, or to the notice if the video then fails.
  useEffect(() => {
    if (playing) (failed ? notice.current : player.current)?.focus();
  }, [playing, failed]);

  const live = playing && source && !failed;
  return (
    <div className={cn('relative aspect-video overflow-hidden rounded-md bg-deep', className)}>
      {live ? (
        source.kind === 'file' ? (
          <video
            ref={player}
            src={source.src}
            poster={thumb.src}
            controls
            autoPlay
            playsInline
            onError={() => setFailed(true)}
            aria-label={`Video: ${title}`}
            className="absolute inset-0 size-full bg-black object-contain"
          />
        ) : (
          <iframe
            ref={player}
            src={source.embed}
            title={`Video: ${title}`}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 size-full border-0"
          />
        )
      ) : (
        <>
          <PhotoFrame asset={thumb} sizes={sizes} alt="" className="absolute inset-0" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(4_28_76/0.7),rgb(4_28_76/0.05)_55%)]" />
          {source && !failed ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="group absolute inset-0 grid cursor-pointer place-items-center outline-none"
            >
              {/* Focus: a white and navy double ring on the circle, visible over any photograph */}
              <span className="grid size-16 place-items-center rounded-full bg-warm-white/95 text-navy shadow-lg transition-transform duration-200 group-hover:scale-105 group-focus-visible:shadow-[0_0_0_3px_#fff,0_0_0_6px_#012052] md:size-[4.5rem]">
                <Icon name="play" size={28} className="translate-x-0.5" />
              </span>
            </button>
          ) : (
            <p
              ref={notice}
              tabIndex={-1}
              className="absolute inset-x-3 bottom-3 flex w-fit max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full bg-deep/85 px-3.5 py-2 text-small font-semibold text-warm-white md:inset-x-4 md:bottom-4"
            >
              <Icon name="video" size={18} className="shrink-0 text-sand" />
              {sample && !source ? 'Sample: video to be added' : 'Video not available right now'}
            </p>
          )}
        </>
      )}
    </div>
  );
}
