'use client';

import type { ComponentProps } from 'react';
import { Img } from './img';

/**
 * The page's main (LCP) photograph: eager, at high priority. A Client Component on purpose. For every high-priority
 * <img> a Server Component renders, React adds a preload hint to that page's server payload, so each prefetch of the
 * page (the menu, links scrolled into view) would download its hero photograph. Rendered here, only the page's own
 * HTML preloads it. (Measured in Milestone 1.1: about 190 KB of other pages' photos when the menu opened on a phone.)
 */
export function PriorityImg(props: ComponentProps<typeof Img>) {
  return <Img {...props} loading="eager" fetchPriority="high" />;
}
