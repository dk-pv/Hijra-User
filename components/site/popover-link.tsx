'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';

/** A link inside a popover that closes the popover as it navigates. */
export function PopoverLink({ closes, ...props }: ComponentProps<typeof Link> & { closes: string }) {
  return <Link {...props} onClick={() => document.getElementById(closes)?.hidePopover()} />;
}
