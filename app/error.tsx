'use client';

import Link from 'next/link';
import { useEffect } from 'react';

/** Unexpected runtime errors inside a page: a calm explanation, a retry, and a way home. */
export default function PageError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="pt-nav pb-section">
      <div className="wrap pt-12 md:pt-20">
        <span className="rule-double mb-5" aria-hidden="true" />
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-3 max-w-[40rem] text-h1">This page could not be shown.</h1>
        <p className="mt-5 max-w-[36rem] text-lead">Please try again. If it keeps happening, the rest of the site still works and an advisor can help.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary" onClick={() => retry()}>
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
