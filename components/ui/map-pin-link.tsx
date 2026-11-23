'use client';

import Link from 'next/link';
import { useRef, type ComponentProps } from 'react';

/**
 * A map pin's link to its branch page. Mouse and keyboard open the page at once (hover or focus shows the name first).
 * On touch, the first tap shows the name (the pin takes focus, which reveals its tooltip) and a second tap opens the
 * page. Without JavaScript it is a plain link.
 */
export function MapPinLink(props: ComponentProps<typeof Link>) {
  // Set on pointerdown, before the browser moves focus: a touch on a pin that is not yet showing its name.
  const firstTap = useRef(false);
  return (
    <Link
      {...props}
      onPointerDown={(e) => {
        firstTap.current = e.pointerType !== 'mouse' && document.activeElement !== e.currentTarget;
      }}
      onClick={(e) => {
        if (!firstTap.current) return;
        firstTap.current = false;
        e.preventDefault();
        e.currentTarget.focus();
      }}
    />
  );
}
