# HIJRA Travels — public website (Milestone 1.1)

This is the English-only public frontend for **HIJRA Travels | Haj Group**, Hajj and Umrah specialists from Kerala.
- The site is **enquiry-only**: visitors explore, send an enquiry, and an advisor follows up.
- There is no booking engine, payment or live pricing.
- Enquiries run in demo mode until Milestone 2 connects the backend.

**Stack:** Next.js 16.4 (App Router, Cache Components, Partial Prefetching) · React 19.3 · Tailwind CSS 4.3 · TypeScript (strict). There are no other runtime dependencies.

## Run it

Requirements: Node.js 20.9 or newer (built and tested on Node 22).

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
```

Checks:

```bash
npm run lint         # ESLint (flat config, next/core-web-vitals + TypeScript)
npm run typecheck    # tsc --noEmit
npm run check:forms  # self-check of the enquiry validation rules
npm run check:contacts  # no demo or placeholder contact details (also runs before every `npm run build`)
```

The browser checks (navigation, forms, responsive sweep, SEO, JavaScript weight, performance) are in `scripts/qa/`; see its README.

## Environment variables

They are read at **build time**, so changing one needs a rebuild.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical URLs, sitemap and Open Graph links. **Set it for every deployed build**; without it the HTML points to localhost. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | unset (off) | Search engines are blocked (`robots.txt` and `noindex`) until this is `true`. Keep it off while sample content is on the site. Sample records stay `noindex` even when it is on. |

## Where things live

```
app/                   every page (one English URL each), layout, 404, error boundary, sitemap and robots
app/layout.tsx         root layout: fonts, navigation, footer, floating WhatsApp, preview notice
app/globals.css        design tokens (Tailwind @theme) and the navigation, form and component styles
components/site/       navigation (site-nav), footer, floating WhatsApp, the preview notice
components/ui/         shared building blocks (Photo, Img, PhotoFrame and PriorityImg, SectionIntro, Breadcrumbs, FaqList, CtaBand,
                       ContactAction, ContactValue, Pending/SampleTag/Note, KeralaMap, Icon)
components/forms/      the enquiry form and its validation rules
data/                  all content: site facts and contact details, routes and navigation, branches, packages,
                       tours, blogs, stories, testimonials, FAQs, photo library and credits
lib/                   interface strings (dictionary), SEO metadata, the image pipeline (server), the enquiry boundary
proxy.ts               real 404 status for unknown tour, article and branch slugs
docs/                  reference audit, delivery report (Milestones 1 and 1.1) and the Milestone 2 handover
```

## Replacing sample content

Everything HIJRA has not confirmed is either `null` or a record flagged `sample: true` or `status: 'sample'`, shown with a "Sample" tag. Contact details are never filled with demonstration values: a missing phone, WhatsApp, email or hours value shows as a marked placeholder, and contact buttons open a "not connected yet" notice. In preview builds other `null` gaps are filled from **`data/demo.ts`** (figures and copy only). A launch build (`NEXT_PUBLIC_ALLOW_INDEXING=true`) never shows demonstration values, and `npm run build` refuses to build one without the central phone, WhatsApp and email. Replace values; never invent them:

- **`data/site.ts`:** years of experience, branch count (once confirmed), central phone, WhatsApp, email, office hours and reply time (`contact`), and social profiles.
- **`data/demo.ts`:** the leadership letter, the company's history, the story of the name, team roles and the legal-draft defaults, until HIJRA's own text replaces them.
- **`data/branches.ts`:** the six confirmed branches (Manjeri head office, Kozhikode, Malappuram, Wayanad, Palakkad, Kannur). Fill each one's address, phone, WhatsApp, hours, Google links, directions and photos, then set `status: 'verified'`. The map pins come from each record's `pin`.
  - Set `status: 'verified'` only after checking the Business Profile.
  - Take coordinates from the profile pin; never geocode them.
- **`data/packages.ts`, `data/tours.ts`:** package and tour data. Fares stay "on enquiry" unless HIJRA publishes them.
- **`data/testimonials.ts`, `data/stories.ts`:** only reviews and stories with written consent.
- **`data/blogs.ts`:** articles reviewed by HIJRA (religious guidance by its scholars, visa rules against current official sources).
- **`data/images.ts` and `public/images/`:** the temporary licensed photographs become HIJRA's own photography. Keep the credit fields.

## Integration points for Milestone 2

See `docs/milestone-2-handover.md` for the full contract. In short:
- **Enquiries:** `submitEnquiry()` in `lib/enquiry.ts` is the only function to replace. Today it is a demo that sends and stores nothing.
  - `EnquiryPayload` and `EnquiryResult` are the contract.
  - The form already handles failures (`invalid`, `rate_limited`, `unavailable`, `network`).
  - Add `?demo-enquiry=network` to a page address to preview a failure.
- **Content:** each `data/*.ts` module is the shape an admin or CMS API should return; pages read only from these modules.
- **Branches:** `isPublishable()` controls indexing and local SEO. Add `TravelAgency` structured data per verified branch.
- **Contact actions:** `ContactAction`, `SocialAction` and `DirectionsAction` switch from the preview notice to real `tel:`, `wa.me`, `mailto:` and Google Maps links as soon as the values exist.
