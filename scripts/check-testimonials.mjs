// Testimonial data and video-link checks: `npm run check:testimonials` (Node 22 strips the TypeScript types).
// Fails when a record could not be shown properly: duplicate ids, a written review without text, a video without a
// usable source, a sample carrying a name, place, year or photograph, or a reference to a package that does not exist.
import assert from 'node:assert/strict';
import { getPackage } from '../data/packages.ts';
import { publishedTestimonials, testimonialProblem, testimonials, videoSource } from '../data/testimonials.ts';
import { getTour } from '../data/tours.ts';

// 1. The video links the player accepts, and the ones it refuses (the player then says "not available").
const yt = 'https://www.youtube-nocookie.com/embed/M7lc1UVf-VE?autoplay=1&rel=0';
for (const url of [
  'https://www.youtube.com/watch?v=M7lc1UVf-VE',
  'https://youtu.be/M7lc1UVf-VE',
  'https://m.youtube.com/watch?v=M7lc1UVf-VE&t=30s',
  'https://www.youtube.com/shorts/M7lc1UVf-VE',
  'https://www.youtube.com/embed/M7lc1UVf-VE',
])
  assert.equal(videoSource(url)?.embed, yt, url);
assert.equal(videoSource('https://vimeo.com/76979871')?.embed, 'https://player.vimeo.com/video/76979871?autoplay=1&dnt=1');
assert.equal(videoSource('https://vimeo.com/76979871/abc123def')?.embed, 'https://player.vimeo.com/video/76979871?autoplay=1&dnt=1&h=abc123def', 'unlisted Vimeo keeps its hash');
assert.equal(videoSource('https://player.vimeo.com/video/76979871?h=abc123def')?.embed, 'https://player.vimeo.com/video/76979871?autoplay=1&dnt=1&h=abc123def');
assert.deepEqual(videoSource('https://media.example-storage.in/hijra/umrah-2026.mp4'), { kind: 'file', src: 'https://media.example-storage.in/hijra/umrah-2026.mp4' });
for (const bad of [
  null,
  '',
  'not a url',
  'http://www.youtube.com/watch?v=M7lc1UVf-VE', // not https
  'https://www.youtube.com/watch?v=short', // not an 11-character id
  'https://www.youtube.com/channel/UC123',
  'https://vimeo.com/channels/staffpicks',
  'https://example.org/video.mov',
  'https://example.org/page',
  'javascript:alert(1)',
])
  assert.equal(videoSource(bad), null, `refused: ${bad}`);

// 2. The records.
const ids = testimonials.map((t) => t.id);
assert.equal(new Set(ids).size, ids.length, 'testimonial ids are unique');
const problems = testimonials.flatMap((t) => {
  const p = testimonialProblem(t);
  const r = t.packageRef;
  const missing = r && !(r.kind === 'tour' ? getTour(r.slug) : getPackage(r.kind, r.slug)) ? `refers to a missing ${r.kind} "${r.slug}"` : null;
  return [p, missing].filter(Boolean).map((x) => `${t.id}: ${x}`);
});
assert.deepEqual(problems, [], `invalid testimonial records:\n${problems.join('\n')}`);

// The rules themselves, on made-up records.
const base = { id: 'x', category: 'umrah', context: 'c', customerName: null, customerLocation: null, travelYear: null, displayOrder: 1, status: 'published', sample: false };
assert.match(testimonialProblem({ ...base, type: 'written', review: '  ', customerImage: null }), /needs its review/);
assert.match(testimonialProblem({ ...base, type: 'video', title: 't', description: 'd', thumbnail: 'makkah-tawaf-night', videoUrl: null }), /needs its video/);
assert.match(testimonialProblem({ ...base, type: 'video', title: 't', description: 'd', thumbnail: 'makkah-tawaf-night', videoUrl: 'https://example.org/x' }), /unsupported/);
assert.match(testimonialProblem({ ...base, sample: true, customerName: 'Invented', type: 'written', review: 'r', customerImage: null }), /sample carries/);
assert.equal(testimonialProblem({ ...base, customerName: 'Aysha', type: 'written', review: 'r', customerImage: null }), null, 'a real, consented record may show a name');

// 3. What the pages show: published, complete, in order.
assert.ok(publishedTestimonials.every((t) => t.status === 'published' && !testimonialProblem(t)));
assert.ok(publishedTestimonials.every((t, i, all) => i === 0 || all[i - 1].displayOrder <= t.displayOrder), 'display order');
const counts = { written: 0, video: 0 };
for (const t of publishedTestimonials) counts[t.type]++;
console.log(`Testimonial checks passed: ${counts.written} written and ${counts.video} video records published, ${testimonials.length - publishedTestimonials.length} hidden.`);
