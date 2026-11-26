# HIJRA Travels — public website (trial build)

This is the English-only public frontend for **HIJRA Travels | Haj Group**, Hajj and Umrah specialists from Kerala.
- The site is **enquiry-only**: visitors explore, send an enquiry, and an advisor follows up.
- There is no booking engine, payment, live pricing or flight search.
- Enquiries run in demo mode until Milestone 2 connects the backend.

**Stack:** Next.js 16.4 (App Router, Cache Components, Partial Prefetching) · React 19.3 · Tailwind CSS 4.3 · TypeScript (strict). There are no other runtime dependencies.

## Run it

Requirements: Node.js 20.9 or newer (built and tested on Node 22).

```bash
npm install
npm run dev          # development server, http://localhost:3000
npm run build        # production build (trial mode unless the launch variables below are set)
npm run start        # serve the production build, http://localhost:3000 (add -- -p 3100 for another port)
```

Checks:

```bash
npm run lint            # ESLint (flat config, next/core-web-vitals + TypeScript)
npm run typecheck       # tsc --noEmit (the build also type-checks)
npm run check:forms     # self-check of the enquiry validation rules
npm run check:packages  # self-check of package status and expiry (departed packages leave the listings)
npm run check:testimonials  # testimonial records (written and video) and the accepted video links
npm run check:contacts  # the contact and launch guard on its own (every production build runs it too)
```

The browser checks (navigation, forms, responsive sweep, SEO, JavaScript weight, performance) are in `scripts/qa/`; see its README. Run them against `npm run start`, not the development server.

## Trial mode and launch mode

One build-time switch, `NEXT_PUBLIC_ALLOW_INDEXING`, chooses the mode. Every production build prints which one it is.

| | **Trial** (default: variable unset) | **Launch** (`NEXT_PUBLIC_ALLOW_INDEXING=true`) |
| --- | --- | --- |
| Search engines | Blocked: `noindex` on every page, `robots.txt` disallows all | Allowed (draft and sample records stay `noindex`) |
| Sample content | Shown, each item marked "Sample"; a trial notice in the footer | Not allowed: the build stops |
| Unconfirmed facts | Shown as marked placeholders ("[… to be confirmed]") | Not allowed: the build stops |
| Contact buttons | Open the "not connected yet" notice until real values exist | Must be real: the build stops without the central phone, WhatsApp and email |
| Enquiry form | Demo: nothing is sent; the success message says so | Must be the real backend: the build stops while it is the demo |
| Domain | `NEXT_PUBLIC_SITE_URL` optional | `NEXT_PUBLIC_SITE_URL` must be the live `https://` domain |

**How the guard works** (it cannot be skipped by running `next build` directly):
1. `next.config.ts` runs `scripts/check-contacts.mjs` at the start of every production build. In both modes it rejects demonstration or placeholder contact details anywhere in the source and any contact value that is not a real one. In launch mode it also checks the central contacts, the domain, the enquiry backend and `sample: true` records.
2. In launch mode, every pending placeholder, sample label and empty client-photo slot throws while the page is prerendered (`assertTrial` in `components/ui/pending.tsx`). So a launch build only succeeds once every page shows verified content: branch details, legal details, figures and photographs included.

**Trial build** (the client presentation): `npm run build && npm run start`. Optionally set `NEXT_PUBLIC_SITE_URL` to the trial address so canonical and Open Graph links point there.

**Launch build:** set both variables in the hosting environment (or `.env.production`), then `npm run build`. It succeeds only when the launch checklist in `docs/milestone-2-handover.md` (section 18) is complete.

## Environment variables

They are read at **build time**, so changing one needs a rebuild. No secrets are needed for the frontend today.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical URLs, sitemap and Open Graph links. Set it for every deployed build; a launch build requires the live `https://` domain. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | unset (trial) | `true` is launch mode: indexing on and the strict launch guard. Keep it unset for the trial. |

## Where things live

```
app/                   every page (one English URL each), layout, 404, error boundary, sitemap and robots
app/layout.tsx         root layout: fonts, navigation, footer, floating WhatsApp, preview notice
app/globals.css        design tokens (Tailwind @theme) and the navigation, form, map and component styles
components/site/       navigation (site-nav), footer, floating WhatsApp, the preview notice
components/ui/         shared building blocks (Photo, Img, PhotoFrame and PriorityImg, SectionIntro, Breadcrumbs, FaqList, CtaBand,
                       ContactAction, ContactValue, Pending/SampleTag/Note and the launch guard, KeralaMap, Icon)
components/forms/      the enquiry form and its validation rules
data/                  all content: site facts and contact details, routes and navigation, branches, packages,
                       tours, blogs, stories, testimonials, FAQs, photo library and credits
lib/                   interface strings (dictionary), SEO metadata, the image pipeline (server), the enquiry boundary
scripts/               check-contacts.mjs (contact and launch guard), check-forms.mjs, qa/ (browser checks)
proxy.ts               real 404 status for unknown tour, article and branch slugs
docs/                  reference audit, delivery report (Milestones 1 and 1.1 and later passes) and the Milestone 2 handover
```

## Demonstration content

Everything HIJRA has not confirmed is either `null` (shown as a marked placeholder) or a record flagged `sample: true` (shown with a "Sample" tag). In trial builds a few gaps in copy are filled from **`data/demo.ts`** (the leadership letter, the company's journey, team roles, legal-draft defaults and the "25+ years" figure), each marked as sample where it appears. Contact details are never filled with demonstration values. Replace values; never invent them:

- **`data/site.ts`:** years of experience, branch count (once confirmed), central phone, WhatsApp, email, office hours and reply time (`contact`), and social profiles.
- **`data/demo.ts`:** the copy above, until HIJRA's own text replaces it.
- **`data/branches.ts`:** the six confirmed branches (Manjeri head office, Kozhikode, Malappuram, Wayanad, Palakkad, Kannur). Fill each one's address, phone, WhatsApp, hours, Google links, office coordinates (`geo`), directions, photos and services, then set `status: 'verified'`. Until `geo` is set, the map pins the town and labels it "Town location".
  - Set `status: 'verified'` only after checking the Business Profile.
  - Take coordinates from the profile pin; never geocode them.
- **`data/packages.ts`, `data/tours.ts`, `data/visas.ts`:** package, tour and visa data. Fares stay "on enquiry" unless HIJRA publishes them.
- **`data/testimonials.ts`:** one list feeds the homepage and `/testimonials`. To add a genuine written review or video:
  1. Get the person's written consent first. Record exactly what may be shown (name, town, year, photograph, face and voice), and keep the signed form.
  2. Add one record with `type: 'written'` (the review as given; an approved English translation for Malayalam) or `type: 'video'` (title, description, a poster in `data/images.ts`, and a YouTube, Vimeo or https `.mp4`/`.webm` link on HIJRA's own channel or storage).
  3. Fill only the consented fields, leave the rest `null`, and set `sample: false` and `status: 'published'`; `featured: true` puts it on the homepage.
  4. Run `npm run check:testimonials`. It refuses empty reviews, missing or unsupported video links, and missing package references, and pages never show an invalid record.
  5. Remove the samples before launch. A launch build stops while any `sample: true` record remains.
- **`data/stories.ts`:** only stories with written consent.
- **`data/blogs.ts`:** articles reviewed by HIJRA (religious guidance by its scholars, visa rules against current official sources). `status: 'draft'` keeps an article on file without publishing it (no page, listing, link or sitemap entry). "Munnar with family" is held this way: HIJRA does not sell Kerala local tours.
- **`data/images.ts` and `public/images/`:** 38 temporary licensed photographs (credits on `/image-credits`) become HIJRA's own photography. Keep the credit fields.

## Not connected yet

- **Enquiries:** `submitEnquiry()` in `lib/enquiry.ts` is a demo (Milestone 2 replaces it). `EnquiryPayload` and `EnquiryResult` are the contract; the form already handles `invalid`, `rate_limited`, `unavailable` and `network` failures. Add `?demo-enquiry=network` to a page address to preview a failure.
- **Phone, WhatsApp, email, social and directions:** `ContactAction`, `SocialAction` and `DirectionsAction` switch from the preview notice to real `tel:`, `wa.me`, `mailto:` and Google Maps links as soon as the values exist.
- **Content management:** each `data/*.ts` module is the shape an admin or CMS API should return; pages read only from these modules.
- **Branches:** `isPublishable()` controls indexing and local SEO. Add `TravelAgency` structured data per verified branch.
- **Malayalam:** the site is English-only by decision (Milestone 1.1); a Malayalam version would be a separate feature.

See `docs/milestone-2-handover.md` for the full contract and the launch checklist.
