import { cacheLife } from 'next/cache';

/** Today (YYYY-MM-DD), cached for a day: pages stay static, and a package that has departed leaves the listings
 * within a day, without a rebuild. */
export async function today() {
  'use cache';
  cacheLife('days');
  return new Date().toISOString().slice(0, 10);
}
