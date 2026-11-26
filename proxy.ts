import { NextResponse, type NextRequest } from 'next/server';
import { tours } from './data/tours';
import { blogs } from './data/blogs';
import { branches } from './data/branches';
import { galleryCollections } from './data/gallery';
import { packages } from './data/packages';

// Unknown tour, package, gallery, article and branch slugs get the designed 404 page with a real 404 status. With
// Cache Components a dynamic page streams its shell (status 200) before notFound() can run, so the check happens here.
// The proxy runs on Node.js; the slug sets are built once when it starts (Milestone 2: a cached slug list from the API).
const knownSlugs: Record<string, Set<string>> = {
  tours: new Set(tours.map((t) => t.slug)),
  blogs: new Set(blogs.map((b) => b.slug)),
  branches: new Set(branches.map((b) => b.slug)),
  gallery: new Set(galleryCollections.map((c) => c.slug)),
  'umrah/packages': new Set(packages.filter((p) => p.service === 'umrah').map((p) => p.slug)),
  'hajj/packages': new Set(packages.filter((p) => p.service === 'hajj').map((p) => p.slug)),
};

export function proxy(request: NextRequest) {
  const m = /^\/(tours|blogs|branches|gallery|umrah\/packages|hajj\/packages)\/([^/]+)\/?$/.exec(request.nextUrl.pathname);
  if (!m) return NextResponse.next();
  let slug = m[2];
  try {
    slug = decodeURIComponent(slug);
  } catch {
    // A malformed escape cannot match a known slug: fall through with the raw value, which is answered with a 404.
  }
  if (knownSlugs[m[1]].has(slug)) return NextResponse.next();
  // No route matches this path, so app/not-found.tsx renders with status 404.
  const url = request.nextUrl.clone();
  url.pathname = '/_page-not-found';
  return NextResponse.rewrite(url);
}

export const config = {
  // Only the dynamic route families need the check.
  matcher: ['/tours/:slug', '/blogs/:slug', '/branches/:slug', '/gallery/:slug', '/umrah/packages/:slug', '/hajj/packages/:slug'],
};
