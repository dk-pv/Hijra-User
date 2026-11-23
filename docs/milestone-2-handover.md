# HIJRA Travels — Milestone 2 handover (frontend → backend integration)

**State at handover:** Milestone 1.1. This is the English-only public frontend release candidate (Next.js 16.4.6, React 19.3, Tailwind CSS 4.3, TypeScript strict, no runtime dependencies beyond Next and React).
- All content is **sample** data from typed modules in `data/`.
- Enquiries run in **demo mode**: nothing is sent or stored.
- Search indexing is **off**.

This document describes what exists and what Milestone 2 must connect. Where a backend decision is still open it says so; it does not invent a backend design that the frontend does not require.

---

## 1. Route map

Every route is prerendered at build time (static HTML), except unknown slugs, which get a real 404 (see `proxy.ts`).

| Route | File | Data source | Notes |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | packages, tours, blogs, branches, testimonials, faqs | Enquiry form (`source: "home"`) |
| `/about` | `app/about/page.tsx` | site, branches | |
| `/branches` | `app/branches/page.tsx` | branches | Client search and filter (`BranchDirectory`) |
| `/branches/[slug]` | `app/branches/[slug]/page.tsx` | branches | 6 sample slugs; `noindex` until the record is `verified` |
| `/hajj-umrah` | `app/hajj-umrah/page.tsx` | packages, faqs | Links to Book A Trip (no inline form) |
| `/hajj` | `app/hajj/page.tsx` | packages, guides, faqs, branches | Links to Book A Trip |
| `/umrah` | `app/umrah/page.tsx` | packages, stories, faqs, branches | Enquiry form (`source: "umrah"`) |
| `/tours` | `app/tours/page.tsx` | tours | Client filter (`TourBrowser`); enquiry form (`"tours"`) |
| `/tours/[slug]` | `app/tours/[slug]/page.tsx` | tours | 13 sample slugs, `noindex` while `sample`; enquiry form (`"tour:<slug>"`) |
| `/flights` | `app/flights/page.tsx` | faqs | Flight enquiry form (`"flights"`) |
| `/visa` | `app/visa/page.tsx` | visas, faqs | Visa enquiry form (`"visa"`) |
| `/blogs` | `app/blogs/page.tsx` | blogs | Client search and topics (`BlogLibrary`) |
| `/blogs/[slug]` | `app/blogs/[slug]/page.tsx` | blogs | 10 sample slugs, `noindex` while `sample`; Article JSON-LD |
| `/gallery` | `app/gallery/page.tsx` | images, gallery | Client collections and lightbox (`PhotoGallery`) |
| `/testimonials` | `app/testimonials/page.tsx` | testimonials | Client filter (`TestimonialWall`) |
| `/pilgrim-guide` | `app/pilgrim-guide/page.tsx` | guides, faqs | Printable checklist (client) |
| `/pilgrim-stories` | `app/pilgrim-stories/page.tsx` | stories | Story dialogs, deep links `#<slug>` |
| `/book-a-trip` | `app/book-a-trip/page.tsx` | packages, tours, visas, branches | Full form; reads `?service=&interest=&branch=` (`"book-a-trip"`) |
| `/contact` | `app/contact/page.tsx` | site, branches | General form (`"contact"`) |
| `/privacy`, `/terms` | `app/privacy`, `app/terms` | — | Drafts for legal review; `noindex`. `/privacy-policy` redirects to `/privacy` (308, `next.config.ts`) |
| `/image-credits` | `app/image-credits/page.tsx` | images | Licence compliance; `noindex` |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.ts`, `app/robots.ts` | routes, tours, blogs | See section 17 |
| unknown URL or slug | `app/not-found.tsx` | — | Real 404 status |

- **Route constants:**
  - `data/navigation.ts` is the only place paths are written (`routes`, `tourPath`, `blogPath`, `branchPath`).
  - `enquiryPath(service, interest, branch)` builds preselected Book A Trip links.
  - It also holds the nine menu items (`mainNav`) and the footer groups.
- **404s:**
  - `proxy.ts` checks `/tours/:slug`, `/blogs/:slug` and `/branches/:slug` against the known slug sets before the page renders. With Cache Components, a dynamic page would otherwise stream a 200 before `notFound()` runs.
  - Any other unmatched URL goes to `app/not-found.tsx` with status 404.
- **No language routes.** English only: `/ml/...` and `/en/...` are ordinary unknown URLs (404).

## 2. Component architecture

- **Server Components by default.** Pages and most components render on the server with no JavaScript.
- **Client Components** (`'use client'`), where interaction needs them:

  | Component | File | Job |
  | --- | --- | --- |
  | `SiteNav` | `components/site/site-nav.tsx` | Pill and full-screen menu (dialog, focus trap, inert page, prefetch on open) |
  | `WhatsAppFab` | `components/site/whatsapp-fab.tsx` | Floating WhatsApp button (IntersectionObserver rules) |
  | `PopoverLink` | `components/site/popover-link.tsx` | A link that also closes the preview popover |
  | `EnquiryForm` | `components/forms/enquiry-form.tsx` | All enquiry forms (full, compact and contact variants) |
  | `TourBrowser` | `components/travel/tour-browser.tsx` | Tour filters |
  | `BlogLibrary` | `components/content/blog-library.tsx` | Article search, topics and "show more" |
  | `PhotoGallery` | `components/content/photo-gallery.tsx` | Collections and the lightbox |
  | `TestimonialWall` | `components/content/testimonial-wall.tsx` | Testimonial filter |
  | `BranchDirectory`, `TodayHours` | `components/branches/branch-directory.tsx`, `components/branches/hours.tsx` | Branch search and filter; today's hours in India time |
  | `StoryBrowser`, `OpenStory`, `StoryHash` | `components/pilgrimage/story-reader.tsx` | Story filter and dialog opening |
  | `Checklist`, `GuideIndex` | `components/pilgrimage/checklist.tsx`, `components/pilgrimage/guide-index.tsx` | Printable checklist; sticky chapter index |
  | `ShareActions` | `components/content/share-actions.tsx` | Copy link and share |
  | `PageError` | `app/error.tsx` | Error boundary |

- **Data never travels in client bundles.**
  - Client Components receive plain props from their server page: cards, teasers, gallery items and image data.
  - Do not import `data/*` values, `lib/image.ts` or `components/ui/photo.tsx` into a Client Component. `lib/image.ts` is `server-only`, so the build fails if you do.
- **Images:**
  - `lib/image.ts` (server) turns a library photo into image data with Next's `getImageProps()` (`photoAsset(key)`, `fixedImg(...)`).
  - `components/ui/img.tsx` renders it as a native `<img>` (`Img`), and `components/ui/photo-frame.tsx` puts it in a frame (`PhotoFrame`). Both are usable anywhere.
  - The page's hero photo (`priority`) renders through `components/ui/priority-img.tsx`, a small Client Component. A high-priority `<img>` rendered by a Server Component makes React put a preload hint in the page's server payload, so every prefetch of the page would download its hero photo. Keep high-priority images on this path.
  - Server pages use `<Photo image="key">` (`components/ui/photo.tsx`).
  - This keeps the `next/image` client component (about 10 KB of JavaScript) out of every page while still using the `/_next/image` optimiser.
- **Shared UI:** `components/ui/` holds:
  - `Breadcrumbs` (with BreadcrumbList JSON-LD), `SectionIntro`, `CtaBand`, `FaqList` and `FaqGroups`;
  - `ContactAction`, `SocialAction` and `DirectionsAction` (real links once data exists, otherwise the preview notice);
  - `Pending`, `SampleTag`, `Note`, `KeralaMap` and `Icon`;
  - `ContactValue`, which shows a central contact detail: HIJRA's real value, a preview stand-in marked "(sample)", or a `Pending` placeholder in launch builds.
- **Interface strings:** `lib/dictionary.ts`, English. Page copy lives in the pages and in `data/`.
- **Styles:** Tailwind 4 tokens and component classes in `app/globals.css`. Use brand colours only; there is no default palette.

## 3. Central data structure

Every business fact and record lives in a typed module under `data/`. The interface reads only from these modules, so replacing sample data never means editing components.

| Module | Exports | Records |
| --- | --- | --- |
| `data/site.ts` | `site` | Brand names, positioning, `url`, `indexable`, `facts` (years, branch count), `contactLive` (HIJRA's real contacts: the only values links use), `contact` (what pages show: real value, or the preview stand-in), `social` |
| `data/demo.ts` | `demo` | Demonstration stand-ins for the client preview (contacts, years, leadership letter, history, legal-draft defaults). Used only while the site is closed to search engines |
| `data/branches.ts` | `branches`, `getBranch`, `isPublishable`, `branchArea`, `formatAddress`, `formatTime` | HIJRA's 6 confirmed branches as drafts: names, head office, district and map pin confirmed; every business detail pending (section 4). The one source for the map, listings, branch pages, footer and forms |
| `data/tours.ts` | `tours`, `getTour` | 13 sample tours (section 5) |
| `data/blogs.ts` | `blogs`, `getBlog`, `categories`, `formatDate` | 10 sample articles (section 6) |
| `data/packages.ts` | `packages` | 4 Umrah and 2 Hajj sample packages (`fare: null`) |
| `data/visas.ts` | `visas` | 6 sample visa countries |
| `data/stories.ts` | `stories`, `featuredStory` | 8 sample pilgrim stories |
| `data/testimonials.ts` | `testimonials` | 6 sample testimonials (no names; optional consented `name`, `town`, `year`) |
| `data/faqs.ts` | `faqs` | FAQs by topic |
| `data/guides.ts` | `umrahRites`, `hajjDays`, `hajjPreparation`, `checklist`, `guidanceSteps`, `hubFaqs` | Pilgrim Guide and hub content |
| `data/images.ts` | `images`, `imageList` | 38 licensed temporary photos: `src`, `width`, `height`, `alt`, `tone`, `focus`, `credit` |
| `data/gallery.ts` | `collections`, `galleryPhotos` | Gallery collections derived from image tags |
| `data/kerala-map.ts` | `terrainPosition`, `terrain`, `keralaMap`, `projectToMap` | `terrainPosition` places each branch's `pin` a latitude and longitude on the Kerala terrain map image (`public/images/Kerala’s Lush Terrain Map.png`), using the Natural Earth outline and a measured land-extent table of the image. Returns `null` for points off the mainland |
| `data/navigation.ts` | `routes`, `mainNav`, `footerNav`, path helpers | Routes (section 1) |

**Conventions:**
- `null` means "not supplied by HIJRA yet". The interface then shows a marked placeholder (`Pending`), and contact actions open the preview notice instead of dialling or messaging.
- `sample: true` (tours, blogs, packages, stories) and `status: 'sample'` (branches) keep a record out of search: `noindex` and no sitemap entry.

## 4. Branch data structure (`data/branches.ts`)

```ts
type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
type WeekHours = Record<Day, 'closed' | [open: string, close: string][]>; // 'HH:MM', India time

type Branch = {
  id: string;
  slug: string;                       // URL: /branches/<slug>, e.g. 'manjeri'
  name: string;                       // the town, e.g. 'Manjeri' ('Wayanad' is the district)
  isHeadOffice: boolean;              // true for Manjeri only
  district: string;                   // e.g. 'Malappuram'
  pin: { lat: number; lng: number; lean?: number }; // map pin at the town centre; lean (degrees) fans out close pins
  address: { lines: string[]; locality: string; postalCode: string } | null; // null until verified
  phone: string | null;               // E.164, e.g. '+9198XXXXXXXX'
  whatsapp: string | null;            // E.164
  hours: WeekHours | null;
  mapsUrl: string | null;             // the branch's own Google Maps link (drives Directions)
  gbpUrl: string | null;              // Google Business Profile
  geo: { lat: number; lng: number } | null; // the premises, from the verified Business Profile (local SEO); never guessed
  directions: string | null;          // HIJRA's own landmark directions (60–150 words)
  photos: { src: string; width: number; height: number; alt: string }[]; // at least 2 before publishing
  services: ServiceKey[];             // 'umrah' | 'hajj' | 'tour' | 'flight' | 'visa'
  status: 'draft' | 'verified';      // all six are 'draft' until HIJRA verifies their details
};
```

- **Pending fields:** pages show `null` fields as marked placeholders ("to be confirmed"). A branch's Call, WhatsApp and Directions buttons open the preview notice until its own value is set; they never fall back to the central number.
- **Map:** `components/ui/kerala-map.tsx` draws one pin per record from `pin`, linked to the branch page (`components/ui/map-pin-link.tsx`: on touch, the first tap shows the name and the second opens the page).
- **Publishing:** only `status: 'verified'` branches are indexable (`isPublishable`). Then add them to the sitemap (`app/sitemap.ts`) and, if wanted, LocalBusiness or TravelAgency JSON-LD built from verified fields only.
- **Order:** the directory lists the head office first, then A–Z by name (`orderBranches` in `components/branches/branch-data.ts`).
- **Forms:** the branch `slug` is the value the enquiry forms send as `branch`.

## 5. Tour data structure (`data/tours.ts`)

```ts
type Tour = {
  slug: string; title: string;
  region: 'domestic' | 'international'; destination: string; country: string; state?: string;
  days: number; nights: number;
  summary: string; overview?: string[]; description?: string; // description: meta, 140–160 characters
  highlights: string[];
  itinerary: { day: string; title: string; detail: string }[];
  inclusions: string[]; exclusions: string[];
  notes: string[];                    // "Topic: text"
  image: ImageKey; gallery: ImageKey[];
  bestTime: string;
  idealFor: ('families' | 'groups' | 'couples' | 'seniors')[];
  fare: null;                         // fares are given on enquiry; never invented
  sample: true;                       // widen to boolean for real tours
  featured?: boolean;                 // homepage mosaic (first three featured)
};
```

`toCard()` (`components/travel/tour-card.ts`, server) reduces a tour to the tile fields and resolves its photo.

## 6. Blog data structure (`data/blogs.ts`)

```ts
type BlogCategory = 'umrah' | 'hajj' | 'preparation' | 'documents' | 'travel' | 'kerala';
type BlogBlock =
  | { type: 'p'; text: string } | { type: 'h2'; id: string; text: string } | { type: 'h3'; text: string }
  | { type: 'ul' | 'ol'; items: string[] } | { type: 'quote'; text: string; cite?: string }
  | { type: 'note'; text: string } | { type: 'image'; image: ImageKey; caption: string };

type BlogPost = {
  slug: string; title: string;
  excerpt: string;                    // 140–160 characters, also the meta description
  category: BlogCategory;
  date: string;                       // ISO; SAMPLE dates today
  readingMinutes: number; author: string;
  image: ImageKey; body: BlogBlock[];
  related: string[];                  // slugs
  featured?: boolean;
  religious?: boolean;                // shows the "follow your scholars" note; needs adviser review
  sample: true;
};
```

The body is structured blocks, not HTML, so a CMS can map rich text into these blocks. `h2` blocks build the article contents.

## 7. Enquiry form structure

- **One component, three variants** (`components/forms/enquiry-form.tsx`):
  - `full` (Book A Trip, Flights);
  - `compact` (homepage, Umrah, Tours, tour pages, Visa);
  - `contact` (Contact page; the service is fixed to `general`).
- **Values** (`EnquiryValues`, `components/forms/validate.ts`):

  | Field | Type | Used for |
  | --- | --- | --- |
  | `service` | `'umrah' \| 'hajj' \| 'tour' \| 'flight' \| 'visa' \| 'general'` | All |
  | `name` | string (at least 2 letters) | All |
  | `code`, `phone` | country code (`+91`, Gulf codes) and number | All. India: 10 digits starting 6–9 (a typed leading 0 or 91 is dropped); other codes: 7–12 digits |
  | `email` | optional; required when `method` is `email` | All |
  | `method` | `'whatsapp' \| 'call' \| 'email'` | All |
  | `month` | `'YYYY-MM'` or empty ("not decided") | Umrah, tour, visa |
  | `adults` (at least 1), `children`, `infants` | numbers | Umrah, Hajj (adults), tour (adults, children), flight |
  | `airport` | `'COK' \| 'CCJ' \| 'CNN' \| 'TRV' \| 'other'` | Umrah |
  | `interest` | package, tour or visa slug from links | Umrah, Hajj, tour |
  | `hajjYear`, `hajjApplied` | season year; `'yes' \| 'no' \| 'unsure'` | Hajj |
  | `tourType`, `destination` (required) | `'domestic' \| 'international'`; text | Tour |
  | `tripType`, `from`, `to`, `depart`, `returnDate`, `cabin` | return or one way; required text; dates not in the past; return after departure | Flight |
  | `visaCountry` (required), `visaType`, `applicants` | `VisaKey \| 'other'`; `'visit' \| 'umrah' \| 'business' \| 'transit'` | Visa |
  | `topic` | `'question' \| 'feedback' \| 'branch' \| 'other'` | General (the message is required) |
  | `branch` | branch slug or empty | All |
  | `message` | optional text | All |
  | `consent` | must be `true` | All |

- **Validation** is `validateEnquiry(values, today)`, a pure function with no runtime imports; `npm run check:forms` tests it. A field is checked when it is left, and every field after a submit. An error summary receives focus and links to each field.
- **Preselection:** Book A Trip reads `?service=`, `?interest=` and `?branch=`.
- **Busy and duplicate guard:** a ref blocks double submission while a request is in flight, and the button shows "Sending…" with `aria-busy`.

## 8. The `submitEnquiry` integration point (`lib/enquiry.ts`)

This is the **only function Milestone 2 replaces**:

```ts
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult>
```

- `toPayload(values, source)` builds the payload from validated values.
- The form calls `submitEnquiry` once per submission and handles every result:
  - **`{ ok: true, reference }`:** shows the success panel with the reference.
  - **`{ ok: false, error }`:** shows "Your enquiry was not sent" with a message for that error, keeps every value, moves focus to the message and re-enables the button for a retry.
  - **If it throws** (it should not), the form logs the error and shows the `network` message.
- **Today (demo):** the function waits 650 ms and returns `{ ok: true, mode: 'demo', reference: 'DEMO-xxxxx' }`.
- **Preview of the failure states:** `?demo-enquiry=network`, `unavailable`, `rate_limited` or `invalid` in the page address. The QA form test uses this (`scripts/qa/form-test.mjs`). It disappears when the function is replaced.

**The form must change with the live API (Milestone 2):**
- The success panel always renders the **demo** copy (`t.form.demoTitle`, `demoBody` and `demoRef` in `lib/dictionary.ts`: "Demo enquiry completed — this preview does not send information to HIJRA").
- Store `result.mode` in the `done` state and render the live confirmation when `mode === 'live'`. The live copy needs HIJRA's approved wording, including who replies and how fast (`site.contact.replyTime`).
- Never show the demo copy for a live submission, and never say an enquiry reached HIJRA unless the API confirmed it.

## 9. Expected API integration (proposal from the frontend's needs)

The backend design (hosting, database, notification providers) is **not decided**. This is the smallest contract the frontend needs.

- **Endpoint:** `POST /api/enquiries`, a same-origin Route Handler (`app/api/enquiries/route.ts`). A Server Action works too.
- **Request:** `Content-Type: application/json`, with the body `EnquiryPayload` (section 10).
- **Server steps:**
  1. Parse and validate the payload strictly (section 10 rules), never trusting the client.
  2. Apply abuse protection (open decision: rate limiting per IP, plus a honeypot field or a CAPTCHA).
  3. Store the enquiry with the consent record and a server timestamp.
  4. Route it to the chosen branch, or the head office when `branch` is `null`.
  5. Notify an advisor (email or WhatsApp Business: open decision).
  6. Return a human-readable reference.

The client implementation that matches it:

```ts
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  try {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    const body: { reference?: string } | null = await res.json().catch(() => null);
    if (res.ok && body?.reference) return { ok: true, mode: 'live', reference: body.reference };
    if (res.status === 429) return { ok: false, error: 'rate_limited' };
    if (res.status === 400 || res.status === 422) return { ok: false, error: 'invalid' };
    return { ok: false, error: 'unavailable' };
  } catch {
    return { ok: false, error: 'network' };
  }
}
```

## 10. Form payload requirements (`EnquiryPayload`)

```json
{
  "service": "umrah",
  "name": "Test Visitor",
  "phone": "+919000000000",
  "email": null,
  "preferredContact": "whatsapp",
  "details": { "month": "2027-02", "adults": 2, "children": 0, "infants": 0, "airport": "CCJ", "interest": "<package-slug>" },
  "branch": "head-office",
  "message": null,
  "consent": { "given": true, "at": "2026-11-20T10:15:00.000Z", "notice": "draft-2026-11" },
  "source": "book-a-trip"
}
```

| Field | Rule |
| --- | --- |
| `service` | One of `umrah`, `hajj`, `tour`, `flight`, `visa`, `general` |
| `name` | Trimmed, single spaces, at least 2 characters (suggested server maximum: 100) |
| `phone` | E.164. `+91` numbers: `^\+91[6-9]\d{9}$`. Others: country code plus 7–12 digits |
| `email` | `null` or a valid address; required when `preferredContact` is `email` |
| `preferredContact` | `whatsapp`, `call` or `email` |
| `details` | Depends on the service; empty values are omitted (below) |
| `branch` | A known branch slug, or `null` |
| `message` | `null` or text (suggested maximum: 2,000); required for `general` |
| `consent` | `given: true`. `at` is the client time; the server must record its own time too. `notice` is the privacy-notice version (`PRIVACY_NOTICE_VERSION`) |
| `source` | Where it came from: `home`, `umrah`, `tours`, `tour:<slug>`, `flights`, `visa`, `book-a-trip`, `contact` |

`details` by service (built by `pick()` in `lib/enquiry.ts`):
- `umrah`: `month`, `adults`, `children`, `infants`, `airport`, `interest`.
- `hajj`: `season`, `appliedViaHajCommittee`, `adults`, `interest`.
- `tour`: `tourType`, `destination`, `month`, `adults`, `children`, `interest`.
- `flight`: `tripType`, `from`, `to`, `depart`, `return` (return trips only), `adults`, `children`, `infants`, `cabin`.
- `visa`: `country`, `visaType`, `applicants`, `month`.
- `general`: `topic`.

**Server-side validation:** `validateEnquiry` works on the form's values, not the payload. Write the server validator against the payload with the same rules (the table above), and keep both in step when a rule changes.

## 11. Success and error response requirements

| Situation | HTTP | Body | Form shows |
| --- | --- | --- | --- |
| Stored and routed | `201` | `{ "ok": true, "reference": "HJ-…" }` | Success panel with the reference (live copy: section 8) |
| Payload rejected by validation | `400` or `422` | `{ "ok": false, "error": "invalid" }` | "Some of the details could not be accepted…" |
| Too many requests | `429` (with `Retry-After`) | `{ "ok": false, "error": "rate_limited" }` | "Several enquiries were sent from this connection…" |
| Server or dependency failure | `5xx` | `{ "ok": false, "error": "unavailable" }` | "The enquiry service is not available at the moment…" |
| No response (offline, timeout) | — | — | "The connection failed before your enquiry could be sent…" |

- **References:** short and readable over the phone, unique, and not guessable (no sequential database IDs exposed).
- **No personal data in errors or logs:** do not echo submitted personal data in error bodies, and log enquiry IDs, not names or numbers.

## 12. Contact and branch configuration

- **Demonstration content** (`data/demo.ts`): in preview builds it fills every gap so the site reads as finished. A real value always wins, and a build with `NEXT_PUBLIC_ALLOW_INDEXING=true` ignores the file entirely (marked placeholders show instead), so demonstration values can never reach a public launch. Contact buttons never link to a demonstration value.
- **Central contacts** (`data/site.ts`, `site.contactLive`):
  - `phone`, `whatsapp` and `email` (E.164 or address);
  - `hours` (display text) and `replyTime`.
  - Filling them turns every Call, WhatsApp and Email action and the floating WhatsApp button into real `tel:`, `wa.me` and `mailto:` links (`components/ui/contact-action.tsx`).
- **Social:** `site.social` holds the Facebook, Instagram and YouTube URLs.
- **Facts:** `site.facts.yearsOfExperience` (25+ or 30+, still unconfirmed, shown as Pending) and `branchCount`.
- **Branches:** fill each record (section 4) and set `status: 'verified'`. A verified `mapsUrl` enables Directions. Map pins come from each record's `pin`.
- **Brand spelling:** `site.fullName` is "HIJRA Travels | Haj Group", as written on the logo. HIJRA should confirm whether the name is "Haj" or "Hajj".

## 13. Authentication needs

- **Public website and enquiry API:** no visitor accounts or login. The API is anonymous, so protect it with:
  - an `Origin` or same-site check;
  - rate limiting;
  - bot protection (open decision);
  - payload size limits.
- **Admin dashboard (future):** staff authentication with roles (for example admin, advisor and branch manager) and MFA. The provider is an open decision (managed identity provider, or Auth.js with a database).
  - Keep it off the public site's static pages: a separate app, or an authenticated route group.
- **Secrets** (database URL, mail, WhatsApp Business API) are server-only environment variables. Never use the `NEXT_PUBLIC_` prefix for them.

## 14. Future admin dashboard integration

- **What it manages:** branches, tours, packages, visas, articles, stories, testimonials (with consent records), FAQs, site facts and contacts, and photos. It also handles enquiries: list, status, assignment and export.
- **Shapes:** the `data/` types are the contract. An API or CMS should return these shapes, or a small adapter per module should map to them, so pages and components stay unchanged.
- **Rendering:** pages are prerendered from data at build time. When content comes from an API, there are two options (an open decision):
  - read it in cached server functions (`'use cache'` with `cacheTag`, Cache Components are enabled) and call `revalidateTag` from the dashboard on publish;
  - or trigger a rebuild on publish.
- **The 404 check must use the same data.** `proxy.ts` keeps in-memory slug sets for tours, blogs and branches; give it the same cached source as the pages.
- **Photos:**
  - `photoAsset()` needs each image's `src`, `width`, `height`, `alt`, `tone` (average colour) and `focus` (object position).
  - Remote image hosts must be added to `images.remotePatterns` in `next.config.ts`.
  - Record a licence or credit, or consent for people, per photo.
- **Workflow flags:** a record moves `sample` → `draft` → `verified` (branches) or drops `sample` (tours, articles), and only then becomes indexable.

## 15. File locations

| What | Where |
| --- | --- |
| Routes and pages | `app/**/page.tsx`, `app/layout.tsx` (fonts, navigation, footer), `app/not-found.tsx`, `app/error.tsx` |
| 404 slug check | `proxy.ts` |
| SEO helper (metadata, canonical, robots, Open Graph) | `lib/seo.ts`; `app/sitemap.ts`, `app/robots.ts` |
| Enquiry boundary | `lib/enquiry.ts` (payload, result, `submitEnquiry`) |
| Form | `components/forms/enquiry-form.tsx`, `components/forms/validate.ts` |
| Interface strings | `lib/dictionary.ts` |
| Image pipeline | `lib/image.ts` (server), `components/ui/img.tsx`, `components/ui/photo-frame.tsx`, `components/ui/priority-img.tsx`, `components/ui/photo.tsx` |
| Data | `data/*.ts` |
| Design tokens and global styles | `app/globals.css` |
| Fonts | `app/fonts/` (Newsreader 600, Hanken Grotesk 400–600) |
| Static files | `public/images/` (38 photos), `public/brand/hijra-logo.png`, `public/og/hijra-default.jpg` |
| QA | `scripts/check-forms.mjs`, `scripts/qa/*` (see its README) |

## 16. Known technical limitations

- **JavaScript size.** Next.js 16 and React 19 need 132.3 KB gzipped on every page before any app code. App code adds 9.5 KB on every page (menu, floating button, icons, `Link`, error boundary) plus up to 8.5 KB on pages with interactive parts. The design report's 130 KB total budget cannot be met on this stack (see the delivery report, Milestone 1.1).
- **Build-time settings.** `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ALLOW_INDEXING` are fixed at build time, so changing either needs a rebuild.
- **Static content.** Content changes need a rebuild until the data comes from an API (section 14).
- **Story dialogs need JavaScript to open.** The story text is in the HTML.
- **Lab measurements only.** Performance figures are lab measurements; there is no real-user monitoring yet.
- **The demo failure preview** (`?demo-enquiry=`) exists until `submitEnquiry` is replaced.
- **Drafts and sample content:**
  - Privacy and Terms are drafts for legal review.
  - Religious content needs HIJRA's adviser review.
  - All records and photographs are samples or temporary.
- **No security headers yet.** There is no Content-Security-Policy or other security header configuration (section 18).

## 17. Production environment variables

| Variable | Default | When |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | **Required for every deployed build.** It sets the canonical URLs, Open Graph URLs, sitemap and robots `Sitemap:` line. Without it, the production HTML points to localhost. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | unset (off) | Set to `true` only for the launch build, after the sample content is replaced and approved |
| Milestone 2 server secrets | — | Database, mail and WhatsApp provider keys: server-only, no `NEXT_PUBLIC_` prefix |

**How the indexing gate works:**
- **Closed (default):** every page has `noindex, nofollow`, and `robots.txt` is `Disallow: /`.
- **Open (`NEXT_PUBLIC_ALLOW_INDEXING=true` at build time):**
  - `robots.txt` allows crawling and names the sitemap.
  - Pages are indexable except sample tours, sample articles, unverified branches and the legal or credit pages.
  - The sitemap lists only the indexable pages.
- **Check it before launch:**
  ```
  node scripts/qa/seo-check.mjs --base <url> --gate-open --site <NEXT_PUBLIC_SITE_URL>
  ```
  This was verified on a gate-open build: 16 indexable pages, matching the 16 sitemap URLs.
- **Before switching it on:**
  - Replace or remove all sample records.
  - Confirm the facts, contacts and branch details.
  - Have Privacy and Terms approved.
  - Set `NEXT_PUBLIC_SITE_URL` to the live domain.
  - Then rebuild.

## 18. Deployment considerations

- **Runtime:**
  - Node.js 20.9 or newer, with `next build` then `next start` (or a host with full Next.js 16 support).
  - `proxy.ts` (the 404 slug check) runs on the Node.js runtime.
  - The `/_next/image` optimiser runs in the Next.js server and uses `sharp`, which Next installs as an optional dependency.
  - A static export (`output: 'export'`) is **not** compatible: no proxy, no image optimiser, no 404 status codes.
- **Separate builds for staging and production:** the `NEXT_PUBLIC_*` values are compiled in. Staging must keep indexing off.
- **Security headers (Milestone 2):** add HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and a Content-Security-Policy. The site loads no third-party scripts, fonts or images today, so a strict `'self'` policy fits, but Next's inline scripts need nonces or hashes.
- **Caching:** `/_next/static/*` files are content-hashed (immutable). HTML is static, so cache it at the CDN and purge it on deploy.
- **Monitoring:** real-user Core Web Vitals (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1). Add error logging for the enquiry API, without personal data.
- **Checks before each release:**
  ```
  npm run lint && npm run typecheck && npm run check:forms && npm run build
  ```
  Then run the browser suites in `scripts/qa/` against `next start`.
