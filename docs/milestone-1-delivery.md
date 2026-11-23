# HIJRA Travels — Milestone 1 delivery report

> **Superseded in part by Milestone 1.1 and the Trial-ready pass** (the two sections at the end of this report).
> - The site is now **English only**: the Malayalam interface, the `/ml` pages and the Malayalam fonts are gone.
> - Routing, JavaScript, console errors, forms and SEO were hardened, and every check was re-run on the final build.
> - Sections 1–20 below describe the Milestone 1 delivery as it was. Where they mention Malayalam, `/ml` or the locale proxy, the Milestone 1.1 section is current.
> - The Milestone 2 backend handover is `docs/milestone-2-handover.md`.

**Scope:** the complete public website frontend (no backend, admin or notification integrations).
**Status:** complete. Every required route is built, integrated and checked by rendering in a browser.
**Stack:** Next.js 16.4.6 (App Router, Cache Components, Partial Prefetching) · React 19.3 · Tailwind CSS 4.3 · TypeScript (strict). No runtime dependencies were added.
**Design baseline:** the Revision 3 report (https://claude.ai/artifact/WAnFnUKLKUdLU5WkVnLf5L) and its six mock-ups. The reference audit is in `docs/reference-audit.md`.

| | |
| --- | --- |
| Build | `npm run build` passes: 134 pages, all static (prerendered), no warnings |
| Type-check | `npm run typecheck` (tsc --noEmit): 0 errors |
| Lint | `npm run lint` (ESLint 9 flat config, next/core-web-vitals + TypeScript): 0 problems |
| Form rules | `npm run check:forms`: all assertions pass |
| Browser QA | 48 pages × 16 widths (320–2560 px) = 768 renders on the production build: 0 horizontal overflow, 0 broken images, 0 dead links, one h1 everywhere, 0 unnamed controls, 0 text under 14 px, 0 heading-order jumps; all 96 URLs (English and Malayalam) return 200, unknown URLs and slugs return 404 |
| Menu tests | 25/25 pass (production build) |
| Form tests | 11/11 pass (production build) |
| Performance (lab, throttled mobile) | LCP 1.1–1.9 s, CLS 0, interaction latency 32–96 ms on the 12 key pages |

---

## 1. What was implemented

- The whole public site in English, with the approved Malayalam architecture: every page also exists under `/ml`. There, the navigation, footer, forms and interface are in Malayalam (demo translations for review), and a Malayalam notice says the page content is still in English.
- The reference-style navigation: the light pill and the full-screen menu, with every fix and adaptation from report section 3.9.
- Twenty page types:
  - the homepage;
  - About and the branch directory, plus 6 sample branch pages;
  - the Hajj & Umrah hub, Hajj and Umrah;
  - Tours, plus 13 sample tour pages;
  - Flights and Visa;
  - Blogs, plus 10 articles;
  - Gallery and Testimonials;
  - the Pilgrim Guide and Pilgrim Stories;
  - Book A Trip and Contact;
  - Privacy, Terms and Image credits;
  - a designed 404 page and an error boundary.
- One central data layer (`data/`) for every record and every placeholder, and a central route configuration (`data/navigation.ts`).
- An accessible enquiry form system with honest demo submission, and a single integration boundary for Milestone 2 (`lib/enquiry.ts`).
- SEO plumbing:
  - unique metadata, canonical URLs and Open Graph/Twitter cards;
  - a default social image, sitemap and robots file;
  - breadcrumbs with structured data;
  - real 404 status codes.
- The design system as Tailwind 4 tokens in `app/globals.css`: brand palette only, the approved type scale, spacing, radii, motion and the navigation styles.
- A licensed photo library of 38 photographs (Wikimedia Commons, credited on `/image-credits`), self-hosted fonts and the HIJRA favicon set.
- QA tooling in `scripts/qa/` (see its README) and a form-rules self-check in `scripts/check-forms.mjs`.

## 2. Routes

English at the root; every route also works under `/ml` (`noindex` until translated).

| Route | Page | Notes |
| --- | --- | --- |
| `/` | Homepage | Pilgrimage diptych hero, trust ledger, Umrah departures, Hajj night chapter, story and reasons, pilgrim voices, branches with map, tours mosaic, flight and visa desk, guides, FAQ, enquiry |
| `/about` | About Us | Brand, story (Pending milestones), specialisation, care approach, mission and values, branch network, "facts you can check" |
| `/branches` | Branch directory | Search, service filter, live count, empty state, List/Map switch on phones, static Kerala map (no unverified pins) |
| `/branches/[slug]` | Branch page ×6 | `head-office`, `city-centre`, `beach-road`, `market-square`, `hill-view`, `riverside`; contact card, hours in India time, directions, photo slots, services, enquiry; `noindex` (sample) |
| `/hajj-umrah` | Hajj & Umrah hub | Mock-up 5: Umrah and Hajj panels, comparison table, six guidance steps, questions, enquiry |
| `/umrah` | Umrah | Rites, packages (sample, fares on enquiry), flights, stays, transport, visa, preparation, families, stories, FAQ, enquiry |
| `/hajj` | Hajj | Days 8–13 Dhul Hijjah, registration routes, preparation timeline, stays and transport, sample outlines, FAQ, register interest |
| `/tours` | Tours | Filter (region, length, ideal-for), featured mosaic, domestic and international lists, families and groups, customised travel, FAQ, enquiry |
| `/tours/[slug]` | Tour ×13 | `munnar-tea-hills`, `alappuzha-backwaters`, `wayanad-hills`, `kochi-athirappilly`, `malabar-coast-kozhikode-bekal`, `kashmir-srinagar-gulmarg`, `delhi-agra-jaipur`, `istanbul-bursa`, `dubai-abu-dhabi`, `malaysia-singapore`, `egypt-cairo-nile`, `uzbekistan-samarkand-bukhara`, `baku-azerbaijan` |
| `/flights` | Flight assistance | Form in the first screen, what we arrange, how it works, FAQ |
| `/visa` | Visa assistance | Six sample countries, document preparation, disclaimer (no guarantees), FAQ, form |
| `/blogs` | Blogs | Featured cover, search, topic chips, editorial list, "show more", empty state, topic directory |
| `/blogs/[slug]` | Article ×10 | Contents, rich body, share (copy link, WhatsApp, Facebook), related articles; sample dates and byline marked |
| `/gallery` | Gallery | Seven collections, filter, accessible lightbox with credits |
| `/testimonials` | Testimonials | Sample quotes, service filter, publishing rules, video slots; no ratings |
| `/pilgrim-guide` | Pilgrim Guide | Seven chapters with a sticky index, printable checklist, documents, packing, FAQ, related articles |
| `/pilgrim-stories` | Pilgrim Stories | Featured story, video slots, filterable cards, story dialogs (deep-linkable), consent rules |
| `/book-a-trip` | Book A Trip | Mock-up 6: enquiry-only notice, the full form (preselected from links), next steps, FAQ |
| `/contact` | Contact | Central contacts (Pending), office hours, branches, social, general contact form |
| `/privacy-policy`, `/terms` | Legal drafts | Marked "Draft for legal review — not yet in force"; DPDP Act 2023 in mind |
| `/image-credits` | Credits | Every photo's author, licence and source; fonts (SIL OFL) and map data (Natural Earth) |
| any unknown URL or slug | 404 | Designed page with links onwards; real 404 status |

## 3. Shared components

- `components/site/`:
  - `site-nav` (pill and menu);
  - `footer`;
  - `whatsapp-fab` (floating WhatsApp, rule F11);
  - `demo-popover` and `popover-link` (the preview notice behind unconnected contact buttons);
  - `lang-links`;
  - `translation-notice`.
- `components/ui/`:
  - `Photo` and `ClientPhoto` (licensed photo, or a "client photograph required" slot);
  - `SectionIntro` and `LocalLink` (locale-aware links);
  - `Breadcrumbs` (with JSON-LD);
  - `FaqList` and `FaqGroups` (native accordion);
  - `CtaBand`;
  - `ContactAction`, `SocialAction` and `DirectionsAction`;
  - `Pending`, `SampleTag` and `Note`;
  - `KeralaMap`;
  - `Icon` (about 45 line icons).
- `components/forms/`: `EnquiryForm` (variants full, compact and contact) and `validate.ts` (pure rules).
- Page families:
  - `components/home/` (departures, hero panel, tours mosaic, guides);
  - `components/pilgrimage/` (package folio, story dialog and reader, guide index, checklist, journey band, steps);
  - `components/travel/` (tour tile, tour browser, steps, enquiry section);
  - `components/branches/` (directory, card, hours);
  - `components/content/` (article body, library, gallery and lightbox, share actions, filter chips, testimonial wall);
  - `components/booking/` (route list, legal page).
- Global classes in `app/globals.css`:
  - buttons and links;
  - eyebrow, double rule, card, chip, tagline, sample tag and pending token;
  - form fields, segmented control and checkbox;
  - FAQ, long-form prose and reveal motion.

## 4. Navigation behaviour (report 3.9)

- **Closed pill:**
  - fixed, centred, 330 × 64 px (phones min(310 px, 100vw − 24 px));
  - light glass (F1) with the reference's four-layer shadow;
  - the exact logo at 158 × 48;
  - a "മലയാളം" toggle (O11);
  - a 44 px named menu button (F2, F10);
  - the reference's page-load drop-in (R5).
- **Opening:**
  - O1 timing: the sheet rises from the bottom in 0.6 s, content fades in from 0.36 s, fully open in about 0.9 s;
  - Deep Navy 84% with blur, solid on phones (O3);
  - the pill stays above the overlay (O4);
  - the menu is pre-built when the browser is idle, so opening never waits (F8).
- **Layout:**
  - portrait 273 × 320 at radius 24 on the left (B5, a temporary photo), with the social row (R14) and contact line (O5);
  - the nine confirmed links in Hanken Grotesk 600 at 32 px on the right (C6, B3), with height-aware gaps (B2);
  - the X in the top bar (R12).
- **Interaction:**
  - the hover line grows 0 → 25 px with a spring and the label slides (R11, F15);
  - a sand current-page dot and `aria-current` (O10);
  - links navigate at once and the menu closes as the page changes, then focus moves to the new page's h1;
  - the current page's link just closes the menu.
- **Accessibility:**
  - a modal dialog with the X focused first;
  - Tab trapped inside, Escape (and Back) closes, focus returns to the button;
  - the page behind is inert and scroll-locked (F3–F6);
  - reduced motion gives a 150 ms fade (F7).
- **Phones:**
  - no portrait;
  - centred links, each row at least 48 px tall;
  - the language switch at top left;
  - the list scrolls inside the menu on short screens while the X stays put (F4).
- **Floating WhatsApp (F11, F14):**
  - never on a first screen; it appears after about 320 px of scrolling;
  - it steps aside whenever another WhatsApp action, a form or the footer is in view;
  - hidden in the open menu and on Book A Trip;
  - teal #128C7E.
- **Performance:**
  - menu links are not prefetched while hidden, so opening the menu prefetches its nine destinations in idle time;
  - the click itself stays under about 15 ms of script.

## 5. The Hajj & Umrah experience

- **Hub (`/hajj-umrah`):** the approved mock-up 5, with a clear Umrah/Hajj choice and a designed "group dates not announced yet" state.
- **Umrah (`/umrah`):** a dedicated service page rather than a package list, covering:
  - rites on a respectful timeline, and four sample package folios (inclusions and exclusions, fares on enquiry, preselected enquiry links);
  - flights, stays, transport and visa;
  - preparation, and families and older parents;
  - sample stories, FAQ and the enquiry form.
- **Hajj (`/hajj`):**
  - a distinct, ceremonial Deep Navy opening, the days of Hajj in depth, and the two registration routes, with HIJRA's own HGO status shown as Pending;
  - the preparation timeline, stays and transport, and sample outlines "subject to quota and registration".
- **Pilgrim Guide and Pilgrim Stories:** built to the 8.9 evaluation.
- **Religious content** describes practice and leaves rulings to scholars. Pages flag that HIJRA's religious adviser must review them before launch.

## 6. The six sample branches

`data/branches.ts` holds six clearly sample records:
- **Names:** Head Office, City Centre, Beach Road, Market Square, Hill View and Riverside. They use "Sample Building", "Sample Town" and PIN "6XX XXX", and carry `status: 'sample'`.
- **Missing on purpose:** phone, WhatsApp, Google Maps link, Business Profile, coordinates and photos are all `null` or empty, and the UI shows marked placeholders.
- **Hours** are sample hours, labelled as such.
- **Actions without data:** Call, WhatsApp and Directions open the preview notice.
- **Map pins:** superseded in the visual refinement pass (V.4). Preview builds now pin each sample branch at a sample town, labelled "Sample position"; `NEXT_PUBLIC_SAMPLE_PINS` no longer exists.
- **No local SEO:** branch pages are `noindex` and left out of the sitemap until a record is `verified`, and no LocalBusiness markup is emitted.

## 7. Data files

| File | Content |
| --- | --- |
| `data/site.ts` | Brand, positioning, site URL and indexing flag, facts (years: Pending; branch count "6+" from the brief), contact and social (all `null` = Pending) |
| `data/navigation.ts` | All routes, the nine menu items, footer groups, `enquiryPath()` for preselected enquiries |
| `data/branches.ts` | Six sample branches + helpers |
| `data/packages.ts` | Four Umrah and two Hajj sample packages (`fare: null`) |
| `data/tours.ts` | 13 sample tours (5 in Kerala, 2 elsewhere in India, 6 international; 3 featured) |
| `data/visas.ts` | Six sample visa countries |
| `data/blogs.ts` | 10 articles (sample dates and byline) |
| `data/stories.ts` | 8 sample pilgrim stories (3 with video slots) |
| `data/guides.ts` | Pilgrim Guide chapters |
| `data/testimonials.ts` | 6 sample testimonials (fields ready for consented name, town and year) |
| `data/faqs.ts` | FAQs by topic |
| `data/gallery.ts` | Gallery collections derived from the photo library |
| `data/images.ts` | 38 licensed photos with alt text, focal points, placeholder tone and full credits |
| `data/kerala-map.ts` | Kerala outline (Natural Earth) and projection for verified coordinates |
| `lib/dictionary.ts` | All interface strings in English and Malayalam |

## 8. Forms and interactions

- **One form component, three variants:** full (Book A Trip), compact (homepage and service pages) and contact. Service-specific fields:
  - Umrah: month, travellers, airport, package;
  - Hajj: season, Haj Committee question, package;
  - Tour: type, destination;
  - Flight: trip, from and to, dates, passengers, cabin;
  - Visa: country, type, applicants, month;
  - plus reply method, branch, message and consent.
- **Labels and inputs:** labels sit above the fields and placeholders never replace them. The phone field has a country-code list (India and the Gulf).
- **Validation:**
  - a field is checked when it is left, and every field after a submit;
  - an error summary receives focus and links to each field, and field errors are wired with `aria-describedby`;
  - input is kept after errors, and Indian numbers are normalised (a leading 0 or 91 is dropped).
- **Submitting:** a busy state, no double submission, and a success panel that says *"Demo enquiry completed — this preview does not send information to HIJRA"*. Nothing is sent or stored. On Book A Trip the panel also shows next steps and a WhatsApp action.
- **Preselection:** links preselect the service, package or tour, visa country and branch (`/book-a-trip?service=…&interest=…&branch=…#enquiry`), and the tour pages prefill their destination.
- **Other interactions:**
  - tour, branch, blog, gallery, testimonial and story filters (accessible radio chips, live counts, empty states);
  - search on blogs and branches;
  - the gallery lightbox and story dialogs (native `<dialog>`, Escape, arrows, focus return);
  - FAQ accordions, the printable checklist, share actions and the language switch.

## 9. Responsive testing

**How:**
- The sweep ran against the production build (`next start`) in headless Chrome, driven through the DevTools Protocol (`scripts/qa/site-qa.mjs`).
- Each width is emulated exactly. Phone widths get mobile and touch emulation, and full-page captures use reduced motion so reveal animations never hide content.
- Widths: **320, 360, 375, 390, 430, 480, 640, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920 and 2560 px**.
- For 4K screens, the root type size scales up to 125% above 1920 px, so text, spacing and the 80rem content width grow together. 2560 px was rendered; a literal 3840 px was not.

**What each of the 768 page-and-width renders checks:**
- Horizontal overflow, with the offending elements named.
- Broken images and dead (`#` or empty) links.
- One visible h1, and no skipped heading levels.
- Controls without an accessible name, and visible text under 14 px.
- Console errors and exceptions.
- Excluded wording.

**Results:**
- Every check is clean on all 48 pages at all 16 widths. The only entries are the three homepage prefetch requests described in section 16.
- **Status codes:** all 96 crawled URLs (48 pages × English and Malayalam) return 200. Unknown pages and unknown tour, article or branch slugs return 404 in both languages.
- **Interaction suites** (production build): the menu, at 25/25 including phones at 390 × 844, 375 × 667 and 320 × 568, and the forms, at 11/11.

**Visual review:**
- Each page builder reviewed its own renders at 320–2560 px.
- I reviewed:
  - the homepage and navigation at desktop and phone sizes (open, hover, phone menus);
  - the first screens and key sections of every page family at 1440 px;
  - full-page segments of the homepage, About, Branches and Book A Trip.

## 10. SEO

- **Per-page metadata:** a unique title (template "… | HIJRA Travels") and a 140–160-character description. Canonical URLs, Open Graph and Twitter cards (per-page photo, or the default 1200 × 630 card in `public/og/`), and a Malayalam alternate locale.
- **Headings and breadcrumbs:** one h1 per page with ordered headings, and breadcrumbs with `BreadcrumbList` JSON-LD.
- **Article data:** article pages emit Article JSON-LD without the sample date or byline.
- **Sitemap and robots:**
  - `sitemap.xml` lists English pages only; sample branches, tours and articles join it once they are real.
  - `robots.txt` blocks all crawlers and every page is `noindex` until `NEXT_PUBLIC_ALLOW_INDEXING=true` is set, so sample content is never indexed. `/ml` stays `noindex` until translated.
- **Real 404s:** unknown URLs and unknown tour, article or branch slugs return a real **404** status. `proxy.ts` checks slugs before the page streams, because Cache Components would otherwise send 200.
- **No invented SEO data:** no ratings, reviews, addresses, coordinates or local business markup.

## 11. Accessibility (WCAG 2.2 AA target)

- **Structure:** semantic landmarks, one h1, ordered headings, a skip link, and `lang` on every Malayalam fragment (`main` is marked English on `/ml` pages).
- **Keyboard and focus:** visible focus everywhere (navy, or white on dark), the keyboard-complete menu (above), and native dialogs and accordions.
- **Forms:** labelled fields, an error summary, described errors and announced success.
- **Targets and contrast:** targets of at least 44 px (menu rows on phones at least 48 px), and contrast per report 5.3.
- **Text and motion:** text never below 14 px, and reduced motion respected everywhere.
- **Images:** decorative SVG icons are hidden from screen readers, and photos carry factual alt text.

## 12. Performance

Measured on the production build with Chrome under Lighthouse-like mobile throttling (Slow 4G, 4× CPU, median of three runs):

| Page | LCP | CLS | Interaction (INP proxy) |
| --- | --- | --- | --- |
| `/` | 1.53 s | 0 | 64 ms |
| `/umrah` | 1.85 s | 0 | 88 ms |
| `/hajj` | 1.19 s | 0 | 64 ms |
| `/hajj-umrah` | 1.67 s | 0 | 48 ms |
| `/tours` | 1.77 s | 0 | 96 ms |
| `/tours/munnar-tea-hills` | 1.24 s | 0 | 56 ms |
| `/book-a-trip` | 1.25 s | 0 | 40 ms |
| `/branches` | 1.23 s | 0 | 48 ms |
| `/branches/head-office` | 1.15 s | 0 | 32 ms |
| `/blogs/umrah-step-by-step` | 1.48 s | 0 | 40 ms |
| `/gallery` | 1.10 s | 0 | 48 ms |
| `/ml` | 1.57 s | 0 | 48 ms |

Desktop (unthrottled): LCP 0.12–0.27 s, CLS 0.004.

**What makes it fast:**
- Every page is static HTML, with Server Components by default.
- Client JavaScript is limited to the menu, forms, filters, dialogs and the floating button. No animation library or third-party script.
- Images are optimised by `next/image`, with `sizes` on every photo, the hero fetched at high priority, the rest lazy-loaded, and tone placeholders.
- Fonts are self-hosted with size-matched fallbacks (51 KB on English pages). The 87 KB Malayalam font loads only on `/ml`; the "മലയാളം" toggle uses a 3.9 KB subset.
- Motion is CSS-only (transform, opacity and clip-path).
- The menu defers its work out of the click.
- Prefetching is tuned:
  - Partial Prefetching is on.
  - Hidden menu links are not prefetched.
  - Dynamic pages read their slug inside Suspense, so navigations stay instant.

**Budgets (report 12.2):**
- **Within budget:** HTML 16–37 KB (60 KB), CSS 18 KB (30 KB), fonts 51 KB (50 KB, the extra 1 KB is the label subset).
- **Over budget:** first-load JavaScript is about 180 KB against the 130 KB design budget. See section 16.

## 13–15. Build, lint and type-check

- `npm run build`: passes (Next.js 16.4.6, Turbopack; TypeScript checked during the build; 134 static pages; no warnings).
- `npm run lint`: 0 errors, 0 warnings. No rule is disabled or suppressed; the React effect rules were satisfied by restructuring, not by turning them off.
- `npm run typecheck`: 0 errors. No `any`, no `ts-ignore`.
- `npm run check:forms`: passes.

## 16. Remaining issues and decisions taken

**Open issues (honest list)**
- **Homepage prefetch 404s.** From the homepage only, three link prefetches (`/umrah`, `/hajj`, `/book-a-trip?service=umrah`) get a 404 for one page segment, which shows as three failed requests in the browser console.
  - It looks like a Next.js 16.4 partial-prefetching edge case: the root `[lang]` segment is rewritten at `/`, and the same prefetches succeed from every other page.
  - The links work. Client navigation from the homepage to all three renders the right page, with no errors.
  - Re-check after the next Next.js upgrade.
- **JavaScript budget.** About 180 KB on first load against the report's 130 KB design budget; the Next.js 16 + React 19 runtime alone is about 100 KB. Next steps:
  - load the enquiry form only when it nears the viewport on pages where it sits below the fold;
  - run a bundle analysis.

  Lab LCP and interaction times are still well inside the targets.
- **Lab, not field, numbers.** The performance figures come from controlled browser runs. Real-user Core Web Vitals monitoring (report 12.5) belongs to the launch milestone. Lighthouse itself was not run (no packages installed); the same throttling was applied through Chrome DevTools.
- **Story dialogs need JavaScript to open.** The stories are in the HTML, but opening them requires JavaScript.
- **Long phone pages.** `/umrah` (about 18,600 px at 390 px) and `/hajj` (about 17,100 px) are long on phones because of the content the brief asks for. Section navigation helps, and both could be trimmed once real content arrives.
- **Malayalam content.** Only the interface is translated (demo translations for native review). Page content in Malayalam is future work; `/ml` pages say so and stay `noindex`.
- **Business requirements file.** `01-Project-Overview-&-Business-Requirements.txt` was not found on disk and was never supplied in the conversation. Business context comes from the facts restated in the brief.

**Found and fixed during QA**

Each item below was found in a rendered browser test, fixed, and re-verified:
1. **Proxy and images.** The first locale proxy would have sent image-optimiser requests through the rewrite; static files are now excluded by extension.
2. **Locale links after static generation.** Menu, footer and language links pointed at `/en/...` (and `/ml/en/...`, a 404). The locale helper now understands the internal prefix.
3. **Prefetch loop.** The hidden menu caused a loop on the homepage of about 1,100 requests in 4 s. Its links now prefetch when the menu opens.
4. **Slow menu open.** Opening the menu took about 300 ms of script under 4× CPU throttling. The work is now deferred, leaving about 11 ms in the click.
5. **Soft 404s.** Unknown slugs returned status 200. The proxy now checks them first.
6. **Prefetch errors on dynamic pages.** Tour and branch pages now read their slug inside Suspense.
7. **Clock-dependent static HTML.** The form no longer reads the clock during render.
8. **React effect rules.** These four lint errors were fixed by restructuring, not by disabling rules.
9. **Malayalam font on English pages.** The 87 KB Malayalam font downloaded on English pages; it now loads only on `/ml`.
10. **Notice overflow.** The `/ml` notice overflowed at 320 px.
11. **Repeated photo.** The homepage showed the same photograph twice.
12. **Realistic sample number.** A plausible-looking real phone number appeared in an error message; the message now describes the format instead.

**Decisions taken (the brief allowed open decisions to be settled; record for HIJRA)**
- **Navigation options:**
  - O1, O3, O4, O5, O10 and O11: yes. O2 and O6–O9: no (the report's recommendations).
  - F1–F15 and B2–B8 are implemented. B7's bottom-row language links are replaced by the O11 toggle, and the footer keeps English · മലയാളം. B8 (Google reviews) is not shown: there is no Business Profile.
- **Brand spelling:** the official logo reads "TRAVELS | HAJ GROUP", while the brief writes "Hajj Group". The site uses the logo's spelling for the company name and "Hajj" for the pilgrimage (one constant: `data/site.ts`). HIJRA should confirm.
- **Branch search and filter:** built, because the brief asks to test search and filter behaviour, although report 8.3 suggested none below 12 branches. "Use my location" is left out until coordinates are verified (C9).
- **Contact page:** `/contact` has its own purpose (talk to HIJRA, office details, a general form) and is not a copy of Book A Trip.
- **Image credits page:** `/image-credits` was added for licence compliance.
- **Photos removed:** the Indian passport photo (State Emblem of India Act, 2005), and a wing-at-sunset photo whose licence Commons still had under review.

## 17. Client content that must replace demo data

- **Facts:**
  - years of experience (25+ or 30+);
  - the verified branch count;
  - HIJRA's Hajj registration route and HGO status;
  - legal entity name and registered office;
  - grievance officer;
  - "who replies" and reply time.
- **Contacts:** central phone, WhatsApp and email; office hours; social profile links.
- **Branches (report 8.5 sheet):** for each branch:
  - names in English and Malayalam;
  - address and PIN;
  - phone and WhatsApp;
  - hours;
  - Google Maps link, Business Profile and verified coordinates;
  - landmark directions;
  - at least 2 photographs;
  - which branch is the head office.
- **Packages and tours:**
  - real Umrah and Hajj packages (months, airports, inclusions, fares if published);
  - Hajj group dates;
  - the real tour catalogue;
  - the visa countries, types and document lists.
- **People and stories:**
  - the leadership message, portrait and name;
  - company milestones;
  - team photos (with consent);
  - consented testimonials (name, town, year as approved);
  - at least 8 consented stories (3 on video).
- **Photography:** HIJRA's own photographs to replace the 38 temporary ones, including the menu portrait.
- **Reviews and approvals:**
  - religious adviser review of the rites, Hajj days, Pilgrim Guide and four articles;
  - verification of the visa and vaccination wording;
  - legal review of Privacy and Terms;
  - a native review of the Malayalam interface strings;
  - approval of the draft copy (mission, values, care).

## 18. Backend integration points for Milestone 2

- **Enquiries:** `lib/enquiry.ts` → `submitEnquiry(payload)` is the only function to replace.
  - The `EnquiryPayload` type is the contract: service, name, E.164 phone, email, preferred contact, service details, branch, message, consent with time and notice version, source page and locale.
  - Re-run `validateEnquiry()` on the server, store the lead, route it to the branch and notify an advisor.
  - A Route Handler (`app/api/enquiries/route.ts`) or a Server Action both fit.
- **Content:** each `data/*.ts` module is the shape an admin or CMS API should return.
  - When data moves to an API, keep the same exports, or adapt the imports.
  - `proxy.ts` reads the tour, blog and branch slug lists for its 404 check; give it a fast slug lookup (a cached list) at that point.
- **Branches:** set `status: 'verified'` per branch to enable indexing, sitemap entries, pins and Directions. Add TravelAgency / LocalBusiness JSON-LD for verified branches only.
- **Contact actions:** filling `data/site.ts` and branch records turns every preview notice into real `tel:`, `wa.me`, `mailto:` and Google Maps links automatically.
- **Launch settings:** `NEXT_PUBLIC_SITE_URL` (canonical URLs, sitemap, Open Graph) and `NEXT_PUBLIC_ALLOW_INDEXING=true` once the sample content is replaced.

## 19. Files and folders changed

In `frontend/` (git working tree; nothing committed):

- **Added:**
  - 19 route folders under `app/[lang]/`, plus its `layout`, `page`, `not-found` and `error` files;
  - `app/fonts/` (4 woff2), `app/sitemap.ts`, `app/robots.ts`, `app/icon.png`, `app/apple-icon.png`;
  - `components/` (site, ui, forms, home, pilgrimage, travel, branches, content, booking);
  - `data/` (14 modules), `lib/` (7 modules) and `proxy.ts`;
  - `public/images/` (38 photos), `public/brand/hijra-logo.png` (trimmed official logo) and `public/og/hijra-default.jpg`;
  - `scripts/check-forms.mjs` and `scripts/qa/`;
  - `docs/reference-audit.md` and `docs/milestone-1-delivery.md`.
- **Modified:**
  - `app/globals.css` (design system);
  - `app/favicon.ico` (from the HIJRA emblem);
  - `README.md`;
  - `package.json` (scripts only: `typecheck`, `check:forms`; no dependencies added).
- **Removed** (Create Next App boilerplate): `app/layout.tsx` and `app/page.tsx` (replaced by `app/[lang]/`), and `public/{file,globe,next,vercel,window}.svg`.

About 99 source files and 14,500 lines of TypeScript and TSX. Every file outside `frontend/` is untouched.

## 20. Running it locally

```bash
cd frontend
npm install
npm run dev            # http://localhost:3000  (Malayalam: http://localhost:3000/ml)
npm run build && npm run start   # production
npm run lint && npm run typecheck && npm run check:forms
```

Node.js 20.9 or newer is required (the site was tested on Node 22.13). The QA scripts in `scripts/qa/` need Google Chrome. See `README.md` and `scripts/qa/README.md`.

---

# Milestone 1.1 — English-only hardening and production readiness

## 1.1.1 Audit before changes

I checked the code and a production build (`next build` + `next start`, the exact Milestone 1 code), not just this report.

**Confirmed as implemented:**
- Every route listed in section 2, built from the central `data/` layer:
  - 6 sample branches, 13 sample tours and 10 sample articles;
  - 8 sample stories and 6 sample testimonials, all flagged `sample`;
  - contacts are `null` placeholders, and map pins are development-only behind an environment flag.
- The demo enquiry boundary (`lib/enquiry.ts`) and the indexing gate (`NEXT_PUBLIC_ALLOW_INDEXING`).
- The menu, forms and QA scripts work as described.

**Found:**
1. **Malayalam is wired through the whole app:**
   - a root `app/[lang]` segment, with `proxy.ts` rewriting every English URL to `/en/...`;
   - `next/root-params`, `lib/i18n.ts`, `lib/locale.ts` and `lib/use-locale.ts`;
   - a locale-aware `LocalLink` used in about 50 files, and 48 `/ml` pages;
   - the header and menu toggles, the footer language links and the translation notice;
   - two Malayalam font files, of which a 3.9 KB subset downloads on every English page for the toggle;
   - a Malayalam branch-name field, a Malayalam-script word in the homepage ledger, and `ml_IN` in Open Graph.
2. **Homepage console errors: reproduced.**
   - At 1440 px, three prefetches from the homepage return 404: `/umrah`, `/hajj` and `/book-a-trip?service=umrah`.
   - The requests asked for segment `/$d$lang/__PAGE__`. The client router, which cannot see the proxy's rewrite, matched one-segment English URLs such as `/umrah` to the dynamic root segment as `lang=umrah`.
   - The cause is the app's own `[lang]` + rewrite architecture, not a framework fault.
3. **JavaScript, measured on the production build** (`scripts/qa/js-weight.mjs`, gzip, chunks referenced by each page's HTML):
   - `/about` 147.8 KB; `/` 153.6 KB; `/tours` 162.2 KB.
   - The framework's fixed share is 132.3 KB: React DOM, the Next.js router, `next/navigation` and the Turbopack runtime (128.8 KB), plus 3.5 KB of App Router internals. The 130 KB design budget is therefore used up before any HIJRA code loads.
   - App code was 15.5–29.9 KB:
     - a 10.3 KB shared chunk on every page, holding the `next/image` client component and the full icon set;
     - the 26.5 KB photo registry (with credits), copied into the tours, blogs, gallery and stories chunks.
   - The earlier "about 180 KB" also counted JavaScript fetched after the menu was opened, when it prefetches its nine destinations.
4. **Sample articles are not `noindex`.** They are kept out of the sitemap, while sample tours and branches are also `noindex`.
5. **A failed submission is not handled.** If `submitEnquiry` returns `{ ok: false }`, the form does nothing, and if it throws, the form stays busy. Both must be handled before a real API is connected.
6. **Canonical URLs need the site URL at build time.** `site.url` falls back to `http://localhost:3000`, so a production build without `NEXT_PUBLIC_SITE_URL` emits localhost canonical and Open Graph URLs (a deployment requirement).
7. **The BRD file** (`01-Project-Overview-&-Business-Requirements.txt`) is still not on disk.

**Plan:**
- Remove the locale layer completely: flatten `app/[lang]` into `app/`, and reduce `proxy.ts` to the unknown-slug 404 check.
- Remove the Malayalam fonts, strings and controls.
- Render photos without the `next/image` client runtime (server-side `getImageProps()` and a native `<img>`), and stop shipping data registries to the browser.
- Handle failed submissions, mark sample articles `noindex`, then re-test everything on the final production build.

Content that describes HIJRA's service ("advisors explain each step in Malayalam or English") is business copy, not language support, so it stays.

## 1.1.2 Summary

| | |
| --- | --- |
| Language | English only: one canonical URL per page; `/ml/...` and `/en/...` are unknown URLs (404) |
| Build | `npm run build` passes: 58 static outputs (48 pages, plus the 404 page, icons, sitemap, robots and the dynamic route shells); was 134 with the Malayalam copies |
| Lint / type-check / form rules | 0 problems / 0 errors / all assertions pass |
| Browser QA (final build) | 48 pages × 16 widths (320–2560 px) = 768 renders: all checks clean; 48/48 pages return 200 and 7/7 must-be-404 URLs return 404 |
| Menu, forms, SEO | Menu 33/33, forms 13/13, SEO and indexing gate: all checks pass (gate closed, and a separate gate-open build) |
| Console | 0 failed requests and 0 console errors (the three homepage 404s are fixed) |
| JavaScript (gzip, per page) | 141.8–150.3 KB (Milestone 1: 147.8–162.2 KB). Framework floor 132.3 KB; app code 9.5–18.0 KB, was 15.5–29.9 KB |
| Performance (lab, throttled mobile) | LCP 1.08–1.85 s, CLS 0, interaction proxy 40–80 ms on the 11 key pages (targets: 2.5 s, 0.1, 200 ms) |

## 1.1.3 Malayalam removed: English-only routing

**Removed:**
- **Routing:** the `app/[lang]` root segment (every page now lives directly in `app/`), the proxy's locale rewrites and its `/en` redirect, `next/root-params`, and the catch-all `[...missing]` route (the root `not-found.tsx` now answers unknown URLs).
- **Locale code:** `lib/i18n.ts`, `lib/locale.ts`, `lib/use-locale.ts`, the locale-aware `LocalLink` (now Next's `Link`), `LangLinks` and `TranslationNotice`.
- **Interface:** the മലയാളം toggle in the pill and in the phone menu bar, the footer's English · മലയാളം links, and the Malayalam dictionary. `lib/dictionary.ts` now holds the English interface strings only.
- **Metadata:** `ml_IN` in Open Graph and the robots `/ml/` rule. No `hreflang` was emitted before and none is now.
- **Content:**
  - the Malayalam branch-name field (`name` is now a string) and its slot on branch pages;
  - the Malayalam-script word in the homepage ledger (now "Malayalam / and English");
  - the font entry on `/image-credits`;
  - the privacy draft's note about the translation notice's session storage. The site stores nothing in the browser now.
- **Fonts and styles:** both Noto Sans Malayalam files (87 KB, and the 3.9 KB subset English pages downloaded for the toggle), and every `:lang(ml)` style.

**Decisions:**
- **`/ml` URLs return the normal 404 page.** They are not redirected: the preview was never indexed or announced, and a redirect would have kept locale logic alive. The QA sweep checks this on every run.
- **Kept on purpose:**
  - Copy saying HIJRA's advisors explain things "in Malayalam or English". This is a business fact from the brief, not website language support.
  - The privacy draft's DPDP Act note that the notice can be requested in Malayalam. This is a legal right; it stays for the legal review.
- **Testimonial publishing rule reworded:** a review given in Malayalam is published in an English translation that the reviewer has approved, so no Malayalam script appears on the site.

**What remains of the proxy:** it only checks unknown tour, article and branch slugs (matcher `/tours/:slug`, `/blogs/:slug`, `/branches/:slug`) and rewrites them to the 404 page. Its 404 behaviour is retested on every sweep.

## 1.1.4 Navigation

- **The pill** is again the reference composition: the logo at the left, the menu button at the right, nothing else.
- **In the open menu:**
  - The pill keeps the logo exactly where it was, so nothing jumps as the sheet rises.
  - The X stays at the top right; on phones it stands alone in the bar.
- **Re-tested on the final build** (`scripts/qa/nav-test.mjs`, 33/33):
  - Desktop and phones (390 × 844, 375 × 667, 320 × 568): dialog semantics, the X focused first, Tab trapped, Escape, focus return, inert page and scroll lock.
  - The nine links in order (Home, About Us, Branches, Hajj & Umrah, Tours, Flight, Visa, Blogs, Book A Trip), the current-page dot and the 25 px hover line.
  - Navigation with focus moved to the new page's h1, reduced motion, and no language control.
- **Background requests:**
  - 0 requests in 4 s while the homepage is idle.
  - 17 when the menu first opens (one round of prefetches for its nine destinations, with no images: section 1.1.10).
  - 0 when it opens again.
  - The Milestone 1 loop was about 1,100 in 4 s.
- **Floating WhatsApp button:**
  - hidden on the first screen;
  - appears after scrolling;
  - hidden while the menu is open;
  - steps aside at the footer;
  - absent on Book A Trip.
- **Screenshots reviewed:** the open menu and its hover line at 1440 px, and the closed pill and open menu at 390, 375 and 320 px.

## 1.1.5 JavaScript: measured and reduced

**How it was measured:**
- `scripts/qa/js-weight.mjs`: the gzip size of every script each page's HTML references, on the production server, with no interaction. It also lists any scripts fetched later.
- Module attribution comes from Next's built-in analyzer (`next analyze --output`, then `next analyze export --route <route>`).

| Page | Milestone 1 | Milestone 1.1 | Change |
| --- | --- | --- | --- |
| `/` | 153.6 KB | 147.8 KB | −5.8 KB |
| `/about` | 147.8 KB | 142.1 KB | −5.7 KB |
| `/umrah` | 153.6 KB | 147.8 KB | −5.8 KB |
| `/tours` | 162.2 KB | 150.3 KB | −11.9 KB |
| `/tours/munnar-tea-hills` | 153.6 KB | 147.8 KB | −5.8 KB |
| `/book-a-trip` | 153.6 KB | 147.7 KB | −5.9 KB |
| `/contact` | 153.6 KB | 147.7 KB | −5.9 KB |
| `/branches` | 150.9 KB | 145.0 KB | −5.9 KB |
| `/blogs` | 157.1 KB | 145.1 KB | −12.0 KB |
| `/blogs/umrah-step-by-step` | 148.7 KB | 142.7 KB | −6.0 KB |
| `/gallery` | 157.3 KB | 145.0 KB | −12.3 KB |
| `/pilgrim-stories` | 159.0 KB | 143.7 KB | −15.3 KB |

These figures are gzip, as transferred, on the final production build at 390 px. Pages measured only in Milestone 1.1:
- `/privacy-policy`: 141.8 KB;
- `/hajj` and `/hajj-umrah`: 142.1 KB;
- `/branches/head-office`: 143.6 KB;
- `/testimonials` and `/pilgrim-guide`: 143.7 KB;
- `/flights` and `/visa`: 147.8 KB.

Uncompressed JavaScript, which is what the phone has to parse, fell from 494 KB to 478 KB on `/about`, and from 546 KB to 507 KB on `/tours`.

**What changed:**
1. **No `next/image` client code.**
   - Photographs, the logo and the menu portrait are prepared on the server with Next's own `getImageProps()` (`lib/image.ts`) and rendered as a native `<img>` (`components/ui/img.tsx`, `photo-frame.tsx`; the hero through `priority-img.tsx`, see section 1.1.10).
   - The optimiser URLs, widths, quality, lazy loading and the high-priority hero are unchanged.
   - This removed the `next/image` client component from every page. One line-level ESLint exception (`@next/next/no-img-element`), with the reason, sits in that single component; no rule is disabled anywhere else.
2. **No data registries in the browser.**
   - Client components now receive slim props from their server pages (tour cards, story teasers, gallery items, each with its image data).
   - Before, the tours, blogs, gallery and stories chunks each contained the whole 26.5 KB photo registry with credits, and the stories chunk also held every story's full text.
   - `lib/image.ts` is `server-only`, so the build fails if a client component ever imports it.
3. **The language code is gone:** the toggle, the notice, the locale hooks and the root-segment router work.

**Where the remaining JavaScript comes from:**

| Chunk | Loaded on | gzip | Contents |
| --- | --- | --- | --- |
| Framework | Every page | 132.3 KB | React DOM with React and the scheduler (70.1 KB); the Next.js router and Server Components client (45.5 KB); `next/navigation` and router state (7.5 KB); the Turbopack runtime (3.8 KB); App Router layout internals (3.5 KB); bootstrap (1.9 KB) |
| Site layout | Every page | 8.9 KB | Next's `Link` component (about 3.5 KB), the icon set (about 2 KB), the menu (about 2 KB), the WhatsApp button, the route list and site constants, the image primitive |
| Error boundary | Every page | 0.6 KB | `app/error.tsx` |
| Hero image | Pages with a hero photo | 0.2–0.3 KB | `PriorityImg` (section 1.1.10); merged into the page's own chunk where it has one |
| Enquiry form | The 8 pages with a form | 5.9–6.0 KB | Form, validation rules and the enquiry boundary |
| Tours | `/tours` | 8.5 KB | Form plus the tour filter and tiles |
| Blogs, gallery, branch directory | One page each | 3.2–3.3 KB | Search and topics; collections and the lightbox; search, filter and today's hours |
| Others | One page each | 0.9–1.9 KB | Story filter, testimonial filter, guide index and checklist, branch-page hours, share actions |

Module sizes were attributed with `next analyze`; the chunk sizes are the whole-file gzip sizes as transferred.

**The 130 KB budget:**
- The framework's own share is 132.3 KB on every page (the first row of the table above).
- So the 130 KB total is not reachable with Next.js 16 and React 19 without removing the framework.
- HIJRA's own code is now 9.5–18.0 KB per page.
- **Proposed budget:** "app JavaScript ≤ 20 KB gzip on top of the framework", which every page meets.

**Considered and not done:**
- **Loading the enquiry form only near the viewport.** React cannot hydrate part of the page later without a static stand-in that is swapped for the real form. That risks layout shift and a broken form while it swaps: the kind of complicated abstraction the brief rules out, for about 6 KB.
- **An icon sprite** would move about 2 KB from JavaScript into HTML or an extra request.

## 1.1.6 The homepage console errors

**Investigation:**
- **Reproduced** on a clean production session of the Milestone 1 build, at 1440 px only. Three 404 responses appeared on `?_rsc=` prefetches of `/umrah`, `/hajj` and `/book-a-trip?service=umrah`, logged as "Failed to load resource: 404".
- **Initiated by:** Next's link prefetching, for the three hero links in the first desktop screen. Hydration, images and application code were not involved.
- **Evidence:** the failing requests carried `next-router-segment-prefetch: /$d$lang/__PAGE__`.
  - The client router, which does not know about the proxy's rewrite of `/umrah` to `/en/umrah`, matched the one-segment URL to the dynamic root segment as `lang=umrah`.
  - It then asked the server for that segment's page, which does not exist.
- **Verdict:** the cause was the app's own `[lang]` plus rewrite architecture, not a framework defect, so no workaround was needed.

**Fix:** the English-only flatten removes the dynamic root segment and the rewrite.

**Verified on the final build:**
- `js-weight.mjs` at 390 px and 1440 px: 0 failed requests and 0 console messages on every page measured.
- The responsive sweep checks console errors on all 768 renders (section 1.1.9).
- Client navigation from the homepage to `/umrah`, `/hajj` and Book A Trip renders the right page with no errors.

## 1.1.7 Routing and SEO

All of this was checked by `scripts/qa/seo-check.mjs` on the final build:
- **Pages and URLs:** 48 pages, one canonical English URL each. The canonical equals the page path, `og:url` equals the canonical, `og:locale` is `en_IN`, `html lang` is `en`, and there is no `hreflang`.
- **Unique metadata:** titles 48/48; descriptions 48/48, all 143–164 characters.
- **Sitemap:** 16 URLs. No sample tour, article or branch, no legal page, nothing under `/ml`.
- **Sample articles are now `noindex`** too, like sample tours and unverified branches. Before, they were only kept out of the sitemap.
- **404s:** unknown pages and unknown tour, article and branch slugs return a real 404, and so do `/ml`, `/ml/about` and `/en/about`.

**The indexing gate, exactly:**
- **Closed (default; the build delivered):**
  - Every page carries `noindex, nofollow`.
  - `robots.txt` says `Disallow: /`.
- **Open:** a build with `NEXT_PUBLIC_ALLOW_INDEXING=true` (verified with `NEXT_PUBLIC_SITE_URL=https://www.example.com` as a placeholder):
  - `robots.txt` allows crawling and names the sitemap.
  - 16 pages are indexable, the same 16 as the sitemap.
  - 32 stay `noindex`: 13 sample tours, 10 sample articles, 6 unverified branches, and Privacy, Terms and Image credits.
- **Both settings are build-time.** Without `NEXT_PUBLIC_SITE_URL`, a production build's canonical URLs point to `http://localhost:3000`.
- **Before launch:**
  1. Replace or remove every sample record.
  2. Confirm the facts, contacts and branches (`status: 'verified'`).
  3. Have Privacy and Terms approved.
  4. Set `NEXT_PUBLIC_SITE_URL` to the live domain and `NEXT_PUBLIC_ALLOW_INDEXING=true`.
  5. Rebuild, then run `seo-check.mjs --gate-open --site <domain>` against it.
- **Never enable the gate on a staging build.**
- **No structured data was added:** no LocalBusiness and no ratings. Breadcrumbs and Article markup carry site structure only.

## 1.1.8 Forms and the Milestone 2 boundary

- **`submitEnquiry` (`lib/enquiry.ts`) is still the only function Milestone 2 replaces.** Its result is now a typed union.
  - Success: `{ ok: true, mode: 'demo' | 'live', reference }`.
  - Failure: `{ ok: false, error: 'invalid' | 'rate_limited' | 'unavailable' | 'network' }`.
  - It never throws.
- **Failure handling** was missing before: a failed result left the form silent, and a thrown error left it stuck as busy. Now the form:
  - shows "Your enquiry was not sent" with a message for that failure;
  - keeps every value and moves focus to the message;
  - re-enables the button for a retry, and logs anything unexpected.
- **Review preview:** `?demo-enquiry=network` (or `unavailable`, `rate_limited`, `invalid`) previews each failure. It goes when the function is replaced.
- **The payload** dropped its `locale` field. The full contract (payload, responses and the success-panel change Milestone 2 must make) is in `docs/milestone-2-handover.md`.
- **Re-tested** (`form-test.mjs`, 13/13):
  - query preselection, the focused error summary and `aria-describedby` wiring;
  - kept input, the busy state, a single submission and the honest demo success, and reset;
  - the failure path (message focused, input kept, retry available);
  - the flight form and the homepage form.
- **Rules check:** `npm run check:forms` passes.
- **Test data:** the test numbers are now obviously fictional (`90000 00000`).

## 1.1.9 Responsive and accessibility checks

**How:**
- `scripts/qa/site-qa.mjs` ran on the final production build (`next start`) in headless Chrome. It crawled every internal link from `/`.
- Widths: **320, 360, 375, 390, 430, 480, 640, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920 and 2560 px**. Phone widths get mobile and touch emulation.
- Excluded wording was checked with a pattern matching the excluded transport word in any case and any Malayalam script. The pattern was verified to match both before the run.

**Results, over all 768 renders:**

| Check | Result |
| --- | --- |
| Horizontal overflow | 0 |
| Broken images | 0 |
| Images without alt | 0 |
| Dead (`#` or empty) links | 0 |
| Pages without exactly one visible h1 | 0 |
| Skipped heading levels | 0 |
| Controls without an accessible name | 0 |
| Visible text under 14 px | 0 |
| Console errors | 0 |
| Exceptions | 0 |
| Excluded wording or Malayalam script | 0 |

- **Status:** all 48 crawled pages return 200. `/ml`, `/ml/about`, `/en/about`, an unknown page and unknown tour, article and branch slugs all return 404.

**Visual review:**
- I reviewed the 390 px and 1440 px full-page captures of the changed pages:
  - the homepage ledger;
  - a branch page;
  - tours, the gallery, blogs and stories;
  - the menu at desktop and phone sizes;
  - the failure message.
- In full-page captures, a few gallery tiles showed only their tone placeholder. A fresh session confirmed all 37 gallery images load and decode (37/37). Scrolled into view, every tile shows its photograph, with every image on screen decoded (8/8, 9/9 and 7/7). This is an artefact of Chrome's beyond-viewport capture, not a site defect.

**Accessibility, specifically:**
- **Headings and labels:** one visible h1 on every page, no skipped heading levels, and every control and form field has an accessible name.
- **Text size:** no text under 14 px.
- **Keyboard:**
  - the menu is complete from the keyboard (trap, Escape, focus return, focus on the new page);
  - form errors are announced through the focused summary and `aria-describedby`;
  - the failure message receives focus.
- **Reduced motion:** the menu opens with a 150 ms fade.
- **Contrast:** the colours are unchanged from Milestone 1 (report 5.3). The new failure message uses the error summary's red on white.
- **Not tested:** no screen reader was used, and contrast was not re-measured by tool.

## 1.1.10 Performance

**How:** `scripts/qa/perf.mjs` ran on the final production build in Chrome, under Lighthouse-like mobile throttling (Slow 4G, 4× CPU), taking the median of three runs. The INP proxy is the slowest of three real interactions: opening the menu, closing it, and opening an FAQ.

| Page | LCP | CLS | Interaction (INP proxy) |
| --- | --- | --- | --- |
| `/` | 1.72 s | 0 | 56 ms |
| `/umrah` | 1.85 s | 0 | 56 ms |
| `/hajj` | 1.42 s | 0 | 72 ms |
| `/hajj-umrah` | 1.62 s | 0 | 48 ms |
| `/tours` | 1.47 s | 0 | 80 ms |
| `/tours/munnar-tea-hills` | 1.40 s | 0 | 56 ms |
| `/book-a-trip` | 1.08 s | 0 | 56 ms |
| `/branches` | 1.38 s | 0 | 80 ms |
| `/branches/head-office` | 1.31 s | 0 | 40 ms |
| `/blogs/umrah-step-by-step` | 1.35 s | 0 | 48 ms |
| `/gallery` | 1.28 s | 0 | 56 ms |

- **Desktop (unthrottled):** LCP 0.15–0.28 s, CLS 0.004, interactions 48–64 ms.
- **Fonts:** 47 KB (was 51 KB).
- **JavaScript after the test's interactions** (it opens the menu, which prefetches nine pages): 169–172 KB. This is the figure that read "about 180 KB" in Milestone 1.

**Found and fixed during this testing: other pages' photos downloaded on prefetch.**
- **Symptom:** after the `next/image` change, the first performance run showed far more image data than Milestone 1. `/book-a-trip` went from 9 KB to 202 KB, and every page grew by about 190 KB.
- **Cause, with evidence:**
  - Opening the menu prefetches its nine destinations.
  - Each prefetched page's server payload carried a React preload hint (`:HL[…,"image",…]`) for that page's hero photo.
  - React adds such a hint for every high-priority `<img>` a Server Component renders. Inside `next/image`'s client component, Milestone 1 had no such hints.
  - So the browser downloaded five other pages' hero photos (188 KB on a phone) while the visitor was still on the first page. Links scrolled into view did the same.
- **Fix:** the page's hero image (`priority`) now renders through a 0.2 KB Client Component (`components/ui/priority-img.tsx`).
  - The page's own HTML still preloads its hero at high priority.
  - Prefetch responses carry only the stylesheet and font hints.
- **Verified:**
  - Opening the menu now fetches no images, and the first menu open makes 17 requests instead of 22.
  - Image transfer is back to Milestone 1 levels: `/book-a-trip`, `/branches` and branch pages 9 KB, `/hajj` 84 KB, `/tours` 83 KB.

**Same-session comparison with Milestone 1:**
- **Method:** the Milestone 1 snapshot was rebuilt in a temporary folder (deleted afterwards) and measured in three alternating passes (Milestone 1, 1.1, Milestone 1), with five runs each.

| Page | Milestone 1 (pass 1) | Milestone 1.1 | Milestone 1 (pass 2) |
| --- | --- | --- | --- |
| `/` | 1.88 s | 1.47 s | 1.61 s |
| `/tours` | 1.64 s | 1.46 s | 1.59 s |
| `/branches/head-office` | 1.49 s | 1.36 s | 1.24 s |
| `/gallery` | 1.06 s | 1.24 s | 1.17 s |
| `/hajj` | 1.24 s | 1.49 s | 1.17 s |

- **Spread:** under 4× CPU throttling, identical pages vary by ±0.3 s from load to load. Compare figures only within the same session.
- **Results:**
  - The homepage and `/tours` are faster than Milestone 1.
  - The branch page and the gallery sit within the spread.
- **`/hajj` is an open observation:** it is consistently about 0.25–0.35 s slower in Milestone 1.1, in every session and in either test order, though still far inside the 2.5 s target.
  - Ruled out: identical network timing (stylesheet, fonts and hero arrive together in both builds), the same main-thread work (one layout of about 475 ms at 4× CPU), the stylesheets (they differ only by the removed rules), and the markup (it differs only by the removed language links and the image tags).
  - Putting back Milestone 1's hero image tag did not change it.
  - Not isolated further. Real-user monitoring at launch will show whether it exists outside the lab.

## 1.1.11 Previously fixed bugs, re-tested on the final build

| Milestone 1 bug | Re-test | Result |
| --- | --- | --- |
| 1. The proxy sent image-optimiser requests through the locale rewrite | The proxy now matches only `/tours/:slug`, `/blogs/:slug` and `/branches/:slug`; broken images checked on 768 renders | Pass: 0 broken images on 768 renders |
| 2. Menu, footer and language links pointed at `/en/...` after static generation | No locale prefix exists any more; every internal link crawled returns 200 | Pass: 48/48 pages return 200, 0 dead links |
| 3. Hidden-menu prefetch loop (about 1,100 requests in 4 s) | Request counts on load, first open and second open | Pass: 0 / 17 / 0 |
| 4. Slow menu open (about 300 ms of script) | INP proxy under 4× CPU throttling (menu open, close, accordion) | Pass: 40–80 ms on 11 pages (target ≤ 200 ms) |
| 5. Soft 404s on unknown slugs | Unknown page, tour, article and branch slugs, plus `/ml`, `/ml/about` and `/en/about` | Pass: 7/7 return 404 |
| 6. Errors navigating into tour and branch pages | Client navigation from `/tours`, `/branches`, `/blogs` and the homepage into dynamic pages | Pass: 7/7 navigations render the page with no errors |
| 7. Clock-dependent static HTML | Unchanged code (`useSyncExternalStore`); the build prerenders with no warnings | Pass |
| 8. React effect lint errors | `npm run lint` | Pass: 0 problems |
| 9. Malayalam font on English pages | Fonts downloaded on `/`, `/about`, `/umrah` and `/book-a-trip` | Pass: only Hanken Grotesk and Newsreader |
| 10. `/ml` notice overflow at 320 px | The notice no longer exists; overflow checked at 320 px on every page | Pass: 0 overflow at 320 px (and every other width) |
| 11. Repeated homepage photo | All homepage images loaded and compared | Pass: 8 images, all different |
| 12. A realistic phone number in the interface | Not in the interface or the tests (tests use `90000 00000`) | Pass |

## 1.1.12 Build and test results (final build)

| Check | Result |
| --- | --- |
| `npm run lint` | 0 problems |
| `npm run typecheck` | 0 errors (no `any`, no `ts-ignore`) |
| `npm run check:forms` | All assertions pass |
| `npm run build` | Passes, 58 outputs, no warnings |
| `site-qa.mjs` (48 pages × 16 widths) | 48 pages × 16 widths (320–2560 px) = 768 renders: all checks clean; 48/48 pages return 200 and 7/7 must-be-404 URLs return 404 |
| `nav-test.mjs` | 33/33 |
| `form-test.mjs` | 13/13 |
| `seo-check.mjs` | Pass (gate closed); pass on a separate gate-open build |
| `js-weight.mjs` | 141.8–150.3 KB (Milestone 1: 147.8–162.2 KB). Framework floor 132.3 KB; app code 9.5–18.0 KB, was 15.5–29.9 KB |
| `perf.mjs` | LCP 1.08–1.85 s, CLS 0, interaction proxy 40–80 ms on the 11 key pages (targets: 2.5 s, 0.1, 200 ms) |
| Milestone 1 regressions | 9/9 extra checks pass (fonts, homepage photos, 7 client navigations); all 12 Milestone 1 bugs re-tested in section 1.1.11 |

## 1.1.13 Remaining issues

- **The design report's 130 KB JavaScript budget cannot be met:** the framework alone is 132.3 KB. The proposed replacement budget is in section 1.1.5.
- **Your local dev server needs a restart.** A `next dev` started before this change serves stale compiled modules: `/about` errors with a call to the removed `getDictionary`. `npm run dev` from a fresh start works, and the production build is correct.
- **`/hajj` lab LCP is about 0.3 s slower than Milestone 1** in same-session tests (1.4–1.5 s against about 1.2 s), still far inside the 2.5 s target. The cause was not isolated (section 1.1.10).
- **Lab numbers only.** There is no real-user monitoring yet, and Lighthouse itself was not run.
- **Long phone pages** (`/umrah`, `/hajj`) and **story dialogs need JavaScript to open**: unchanged from Milestone 1.
- **Sample content, drafts and reviews:**
  - All records and photographs are sample or temporary.
  - Privacy and Terms are drafts.
  - Religious content awaits HIJRA's adviser.
  - "Haj Group" or "Hajj Group" still needs HIJRA's confirmation.
- **The BRD file** (`01-Project-Overview-&-Business-Requirements.txt`) is still not on disk.
- **No security headers yet** (planned in the Milestone 2 handover, section 18).

## 1.1.14 Files changed in Milestone 1.1

- **Moved:** `app/[lang]/*` to `app/*`. The page files are otherwise edited, not rewritten.
- **Added:**
  - `lib/image.ts`, `components/ui/img.tsx`, `components/ui/photo-frame.tsx`, `components/ui/priority-img.tsx`, `components/travel/tour-card.ts` and `components/pilgrimage/story-id.ts`;
  - `scripts/qa/js-weight.mjs` and `scripts/qa/seo-check.mjs`;
  - `docs/milestone-2-handover.md`.
- **Deleted:**
  - `lib/i18n.ts`, `lib/locale.ts` and `lib/use-locale.ts`;
  - `components/site/lang-links.tsx` and `components/site/translation-notice.tsx`;
  - `app/[lang]/[...missing]/page.tsx`;
  - `app/fonts/noto-sans-malayalam.woff2` and `app/fonts/noto-sans-malayalam-label.woff2`.
- **Edited:**
  - the layout, the proxy, the SEO helper, the sitemap and robots, the dictionary, the enquiry boundary and the form;
  - the navigation, footer and WhatsApp button, the photo components and the gallery, tours, blogs and stories components;
  - branch data and pages, five pages' copy, `app/globals.css`, and the QA scripts and READMEs;
  - this report and `docs/reference-audit.md` (one note).
- **Nothing was committed, and nothing outside `frontend/` changed.**


---

# Trial-ready pass (21 November 2026)

For the client trial: recover the local site, complete every page, and re-test.

## T.1 The error screen on `localhost:3000`: root cause and recovery

**Symptom:** `/hajj-umrah` (also `/about`, `/umrah` and `/tours`) showed "Something went wrong — This page could not be shown". The header rendered, and the dev indicator showed two issues.

**Root cause (evidence):**
- The dev server's own log, `.next/dev/logs/next-development.log`, shows: `TypeError: Cannot read properties of undefined (reading 'en') at getDictionary (lib\locale.ts:13) at CtaBand (components\ui\cta-band.tsx:27)`. The same error comes from `JourneyBand`.
- None of that code exists in the source:
  - `lib/locale.ts` was deleted in Milestone 1.1;
  - `CtaBand` and `JourneyBand` no longer call `getDictionary`;
  - the current source has no `getDictionary` at all.
- The dev server process started on 20 November at 00:31, about 21 hours before the Milestone 1.1 route restructure, and was never restarted.
- **What went wrong:** its module graph was half-updated. Old compiled copies of `CtaBand` and `JourneyBand` still called the deleted `locale.ts`, which read `dictionaries` from the new `dictionary.ts`; the new file no longer exports it.
- **Why the watcher missed changes:** Windows file locks held by that server had blocked the route-folder moves (they were copied instead), so its file watcher did not see every change.
- Its persistent cache (`.next/dev`, 803 MB) held 221 files that still referenced the removed `app/[lang]` routes.
- `/` worked because it does not use those two components. The production build was never affected.

**Recovery:**
1. Stopped the stale dev server.
2. Deleted only `.next/dev`, the stale dev cache. The source, assets and the production build output were untouched.
3. Started a fresh `npm run dev`.

**Verified on the fresh dev server:**
- All 22 pages return 200, with no error screen; unknown URLs and slugs return 404.
- At 1440 px and 390 px, every page has 0 console errors, 0 exceptions and 0 dev-overlay issues.
- The error boundary still appears only for a genuine error.

**To avoid a repeat:** after large moves or renames of route folders, restart `npm run dev`. If errors mention files that no longer exist, delete `.next/dev` first.

## T.2 Routes

- `/privacy` is now the privacy page, as the brief requires.
- `/privacy-policy` redirects to it permanently (308), so older links keep working.
- Every route in the brief exists and renders. English only; no excluded services anywhere.

## T.3 No unfinished placeholders: demonstration content

The brief asks for realistic demonstration content wherever HIJRA's information is missing, centralised and easy to replace.

**One file, `data/demo.ts`, holds every stand-in:**
- **Contacts:** central phone and WhatsApp, email, office hours and reply time.
- **Figures:** years of experience, 25+ (the figure in HIJRA's own brief).
- **Copy for HIJRA to review:**
  - the leadership letter and its opening line, signed "The HIJRA leadership team";
  - the company's journey, told as stages without dates;
  - the story of the name and the branch team roles;
  - Book A Trip's reassurance lines, branch directions, and the legal drafts' defaults.
- The rest of the site reads the file through `data/site.ts`.

**Safeguards:**
- **A real value always wins.** `site.contactLive` holds HIJRA's real details; `site.contact` is what pages show.
- **Contact buttons never dial, message or email a stand-in.** They open the "not connected in this preview" notice, whose text now says the numbers are demonstration values.
- **The stand-ins cannot reach the public.** They are used only while the site is closed to search engines; a launch build with `NEXT_PUBLIC_ALLOW_INDEXING=true` ignores `data/demo.ts` and shows marked placeholders.
- **The demonstration values can reach no one:** the phone uses Malappuram's area code with an unassigned subscriber number, and the email uses the reserved `.example` domain.
- **Nothing invented that matters:** no registration, licence, award, rating, date or named person. Hajj-registration wording now says the advisor confirms which route applies, without claiming HIJRA's status. The same applies on the homepage, the Hajj & Umrah hub, the Pilgrim Guide and one article.
- **Still labelled:** sample records and testimonials keep their "Sample" tags. The About story carries a "Sample text" tag. The footer note now lists demonstration contacts and figures.

**Photo and video slots** (12 "client photograph required" panels):
- **Homepage story:** a photograph of Kozhikode's Mishkal Mosque.
- **About:**
  - the story uses Al-Masjid an-Nabawi;
  - the branches section uses Kochi's fishing nets and Kozhikode airport.
  - Captions say what the places are and never claim to show HIJRA's people or offices.
- **Pilgrim voices (homepage):** two more sample quotes replace the two empty video slots.
- **Video slots on Testimonials, Pilgrim Stories and story dialogs:** each is a photo poster with its "Video with consent" label.
- **Gallery:** "HIJRA's own photographs" slots are photo posters labelled "At launch".
- **Branches:**
  - each branch page and card shows a designed HIJRA signboard panel (logo, branch name, town) instead of a stock "branch" photo;
  - the empty photo strip is hidden in preview builds;
  - branch pages show the central number until each branch has its own.
- Launch builds keep the plain slots until HIJRA's real photographs and videos arrive.

**Result:** on the rendered preview, all 22 page types and all 10 articles show no placeholder token and no empty photo slot (checked in the served HTML).

## T.4 Checks on the final trial build

| Check | Result |
| --- | --- |
| `npm run lint` / `typecheck` / `check:forms` | Pass |
| `npm run build` | Passes, 58 outputs |
| Dev mode (fresh server) | 22 pages × 2 widths: 0 console errors, 0 exceptions, 0 overlay issues |
| `site-qa.mjs` | 48 pages × 16 widths (320–2560 px) = 768 renders, all checks clean; 48/48 pages return 200 and 7/7 must-be-404 URLs return 404. Two later text edits (the homepage Hajj sentence, the testimonial captions) were re-swept: `/` and `/testimonials` × 16 widths on the final build, clean |
| `seo-check.mjs` | Pass: 48/48 unique titles and descriptions, every page `noindex`, `robots.txt` closed |
| `nav-test.mjs` / `form-test.mjs` | 33/33 / 13/13 |
| Milestone 1 regressions | 9/9 |

**Not done in this pass:** the brief as received stops partway through Part 4 (design direction). The existing design already follows that direction, so this pass completed and verified the content rather than redesigning pages.


---

# Visual refinement pass (21 November 2026)

The brief asked for polish, not a redesign: calmer type, a cleaner header that never covers content, the Kerala terrain map with branch pins, and honest labelling of every demonstration value. The design direction, colours, fonts and page structure are unchanged.

**Screenshots:** the brief refers to attached screenshots, but none arrived with it. This pass worked from the written brief and from captures of the site itself.

## V.1 Typography

**Type scale** (`app/globals.css`, `@theme`). The large sizes come down about 11–13% at their maximum; body, small and caption text are unchanged.

| Token | Use | Before | Now | Line height |
| --- | --- | --- | --- | --- |
| `--text-display` | Homepage hero | `clamp(2.75rem, 1.6rem + 4.2vw, 6rem)` | `clamp(2.5rem, 1.45rem + 3.6vw, 5.25rem)` | 1.04 |
| `--text-h1` | Page titles | `clamp(2.5rem, 1.7rem + 3vw, 4.5rem)` | `clamp(2.25rem, 1.55rem + 2.5vw, 4rem)` | 1.08 |
| `--text-h2` | Section titles | `clamp(2rem, 1.5rem + 2vw, 3.25rem)` | `clamp(1.875rem, 1.45rem + 1.5vw, 2.875rem)` | 1.12 |
| `--text-h3` | Card and editorial titles | `clamp(1.5rem, 1.25rem + 1vw, 2rem)` | `clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)` | 1.2 |
| `--text-h4` | Small titles | `clamp(1.125rem, 1rem + 0.4vw, 1.375rem)` | `clamp(1.125rem, 1.03rem + 0.3vw, 1.3125rem)` | 1.3 |
| `--text-lead` | Introductions | `clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)` | `clamp(1.125rem, 1.07rem + 0.25vw, 1.3125rem)` | 1.55 |
| `--text-body` | Body | unchanged | `clamp(1.0625rem, 1.03rem + 0.15vw, 1.125rem)` | 1.6 |
| `--text-small` / `--text-caption` | Supporting text, captions | unchanged | `0.9375rem` / `0.875rem` | 1.5 |

**Display sizes set inside pages now follow the same scale:**
- the "Hajj" title (`clamp(3.75rem, 2.2rem + 7.6vw, 8.5rem)`) and the Hajj day numbers;
- the homepage figures and pilgrim-voices quote;
- the testimonial wall, the About letter, the Umrah figures and five pull quotes.

**Spacing:** the section rhythm `--sec` goes from `clamp(64px, 6vw + 40px, 160px)` to `clamp(56px, 4.5vw + 36px, 128px)`, so smaller headings keep the same proportion of space around them.

## V.2 Header

**The pill** (`.nav-pill`, `.menu-pill`):

| | Before | Now |
| --- | --- | --- |
| Width (desktop) | 330 px | 352 px |
| Width (phones) | — | `min(332px, 100vw − 24px)` |
| Left padding | 20 px | 24 px (18 px under 430 px) |
| Logo to menu button | 4 px | 16 px |
| Logo height | 48 px | 44 px (40 px under 430 px), in proportion |
| Background | 88% opaque | 92% opaque with an 8 px blur, so text behind it never shows through |

The menu button keeps its 44 px target, and the open menu's pill uses the same measurements.

**The header no longer covers content:**
- **On scroll:** after the first 160 px, scrolling down slides the pill out of view (clear of its shadow too). Any scroll up brings it back (`components/site/site-nav.tsx`).
- **When it stays:** it never hides while the menu is open, or while keyboard focus is inside it.
- **Anchor links:** targets land below the pill (`scroll-padding-top: 96px`).
- **Tested:** `nav-test.mjs` checks that the header returns on scroll up, and that the pill fits from 320 to 2560 px.

## V.3 Content accuracy

- **Malayalam-speaking advisors:**
  - **Removed.** Every claim that advisors speak Malayalam, or "your language", came out of the pages and data files: homepage, About, Hajj, Umrah, blogs, articles, Book A Trip, branch pages, Contact, Pilgrim Guide, Pilgrim Stories, testimonials, the footer and packages.
  - **Reworded where it mattered.** Homepage figure 4 now reads "Enquiry first: nothing booked online; an advisor confirms every detail with you". The About "Languages" row is removed.
  - **Two mentions remain on purpose,** neither a claim about advisors: the Privacy draft says a Malayalam notice is available on request (a DPDP Rules default for HIJRA's legal adviser to confirm), and the testimonials rule says a review given in Malayalam is published in an approved English translation.
- **Demonstration contacts are marked.** Every place a central phone, WhatsApp, email or office hours appears shows the stand-in with "(sample)" beside it: footer, Contact, Book A Trip, enquiry sections, homepage, Umrah, branch pages, Privacy and the menu.
  - The new `components/ui/contact-value.tsx` handles this: HIJRA's real value appears as is, and launch builds show the marked placeholder.
  - The buttons still never dial or message a stand-in.
- **Experience figure:** "25+" carries "Sample figure, to be confirmed by HIJRA".
- **Testimonials:** the homepage voices carry a "Sample testimonials" tag, as the testimonials page already did.
- **Other labels:** the homepage "Our story" lead carries "Sample text". Packages and departures keep their "Sample package" and "Sample" tags.

## V.4 Kerala map and branch pins

**Source image:**
- **VRS map: missing.** The first brief asked for "the Kerala map PNG asset used in my VRS project". `D:\SDEC\VRS-Project` holds only `user/public/logo.png`, `VRS-BG.jpg` and `whatsapp.png`, so no Kerala map exists there. Nothing was substituted for it.
- **Map used:** the second brief supplied `public/images/Kerala’s Lush Terrain Map.png` (1086 × 1448 px), and the site uses that image unchanged.
- **To confirm before launch:** its source and licence. It is not on the Image Credits page yet.

**Display** (`components/ui/kerala-map.tsx`):
- The image keeps its own aspect ratio (never stretched or cropped) and is served responsively (`srcset`).
- The card behind it uses the image's background colour (#fdf9f7), so no box edge shows.
- It now also shows on phones on the homepage and About. On Branches, phones keep the List / Map switch.

**Pin placement** (`terrainPosition(lat, lng)` in `data/kerala-map.ts`):
- **Why not a plain projection:** the image is a stylised 3D render. Fitting the true coastline to it directly matches only 64% of the land area, so plain latitude and longitude would put pins off the land.
- **Vertical position:** projected and calibrated to the image.
- **Horizontal position:** the point keeps the same share of the land's width in its row as on the true outline (Natural Earth). The image's land edges are a measured table, one row per 1% of the image's height.
- **Checked:** by plotting eight town centres on the image (Kasaragod, Kannur, Kozhikode, Malappuram, Kalpetta, Thrissur, Kochi, Thiruvananthapuram).

**The six pins are sample positions, not branch locations:**
- **Where they come from:** each sample branch record has a preview-only `sampleGeo`, the centre of a Malabar town: Head Office in Kozhikode, City Centre in Kannur, Beach Road in Kasaragod, Market Square in Malappuram, Hill View in Kalpetta and Riverside in Thrissur.
- **How they are labelled:**
  - every tooltip and accessible name says "Sample position";
  - the caption reads "Pins mark sample positions for this preview, not verified branch locations".
- **Launch builds:** they ignore `sampleGeo` and pin only verified branches with verified coordinates. `NEXT_PUBLIC_SAMPLE_PINS` is removed.

**Pin design** (`app/globals.css`, built in HTML and CSS; the image is untouched):
- **The pin:** a white teardrop with a HIJRA-red rim and the HIJRA emblem (`public/brand/hijra-emblem.png`, the site icon), a soft gold halo and glow at the point.
- **Motion:** a slow gold ripple (3.6 s, staggered 0.5 s per pin, off when reduced motion is set). Hover or keyboard focus lifts the pin and shows a small navy tooltip with the branch name.
- **Size:** pins scale with the map, 32 px on the full 420 px map and down to 22 px. QA found the fixed-size pins crowding the 217 px map on Branches at 810 px; scaling them fixed it.
- **Links:** each pin links to its branch page.

## V.5 Branches, homepage and other pages

- **Branches:**
  - the map card matches the image background;
  - the sticky map is capped by the screen height, so the whole of Kerala stays visible beside the list on short laptop screens;
  - the six sample branches stay in `data/branches.ts`, with sample addresses and hours labelled.
- **Homepage:**
  - the smaller scale applies to the hero, the figures and the voices quote;
  - the map shows on phones;
  - the sample tags are as in V.3.
- **Hajj and Umrah:** keep their own identities: Hajj on navy with the day-by-day timeline, Umrah on light with the rites and departures. Both now use the new scale, and the timelines and departure cards were checked at 390 and 1440 px.

## V.6 Images

- **No soft photographs:** at 1440 and 1920 px, no photograph displays larger than its source file on the homepage, Gallery or Pilgrim Stories (sources are 1920–2000 px wide).
- **Larger screens:** full-bleed photographs on 2560 px high-density screens would need larger originals than the library holds.
- **Repeats removed:**
  - **Gallery:** the "HIJRA's own photographs" slots reused photographs already in the grid. They are now one designed navy panel listing what HIJRA's photographs will show, added at launch with everyone's consent.
  - **Pilgrim Stories:** the video posters match each story's journey (Umrah: Makkah or Madinah; Hajj: Arafat) and never repeat a photograph shown on a story card.
  - **Story dialogs:** the video poster never repeats the story's own photograph.
- **Credits:** unchanged.

## V.7 Checks on the final build

| Check | Result |
| --- | --- |
| `npm run lint` / `typecheck` / `check:forms` | Pass |
| `npm run build` | Passes, 58 outputs |
| `site-qa.mjs` | 48 pages × 16 widths (320–2560 px) = 768 renders, all clean: no overflow, broken images, dead links or console errors, one `h1` per page, no excluded wording. 48/48 pages return 200; 7/7 must-be-404 URLs return 404 |
| `seo-check.mjs` | Pass: unique titles and descriptions, every page `noindex`, `robots.txt` closed |
| `nav-test.mjs` / `form-test.mjs` | 34/34 (new: the header returns on scroll up) / 13/13 |
| Milestone 1 regressions | 9/9. The photo-repeat check now ignores the map-pin emblems, which are a brand mark, not photographs |
| Map pins | Homepage, About and Branches at 320, 390, 810, 1440 and 2560 px: every pin shows its tooltip on hover, inside the screen, with text of at least 14 px, and no pin covers another |
| JavaScript | Homepage 148.1 KB gzip (framework 132.3 KB plus the app) |

**Found and fixed during these checks:**
- **Crowded pins:** on Branches at 810 px the fixed-size pins crowded the narrow map. Pins now scale with the map.
- **Overflow:** "(sample)" after the email overflowed a narrow column on Book A Trip at 820 px. It now wraps.
- **Header shadow:** the hidden header's shadow showed at the top edge. It now clears the screen.

**Visual review** (390 and 1440 px, plus 810 and 1024 px for the map): homepage, Hajj, Umrah, Branches, Pilgrim Stories and Gallery.

**Not done:**
- **Commits:** nothing was committed.
- **Real-device testing:** no real phones or tablets were tested; the checks ran in Chrome at each width.
- **Map image:** the terrain map's source and licence are still to be confirmed.

# Branch towns on the Kerala map (21 November 2026)

HIJRA gave its six branch towns; the map now pins them in place of the sample positions in V.4.

- **Data:** `branchTowns` in `data/kerala-map.ts`: Manjeri (head office), Kozhikode, Malappuram, Wayanad, Palakkad and Kannur, each at its town centre (Wayanad at Kalpetta, the district headquarters). Pins mark towns, not street addresses. No other location is pinned.
- **Placement:** unchanged (`terrainPosition`). Manjeri and Malappuram are about 12 km apart, under one pin width on the map, so `lean` tilts those pins (and Kozhikode) about their tips: the tip stays on the town and the heads fan out.
- **Pin design:** a HIJRA-red teardrop with a white rim, the emblem on a gold-edged white disc, a soft gold glow and the slow gold ripple. The head office pin is larger, with a gold rim and a second ripple, and its tooltip adds "Head Office". Hover, tap or keyboard focus shows the compact navy tooltip, level even on tilted pins, on the side the pin leans to.
- **Behaviour change:** pins are buttons that show the town name; they no longer link to the sample branch pages, whose names do not match the towns. The caption reads "6 branches across Kerala, with the head office in Manjeri." The preview-only `sampleGeo` field is removed from the branch records.
- **Still to confirm:** the exact town of the Wayanad branch (Kalpetta assumed).

# Branch-map integration (23 November 2026)

This supersedes the `branchTowns` array and the "pins are buttons" note in the section above.

**One data source.** `data/branches.ts` now holds HIJRA's six confirmed branches. The map pins, the Branches directory, each branch page, the homepage and Contact lists, the Hajj page, the footer and the enquiry forms all read these records.
- **Records:** Manjeri (head office), Kozhikode, Malappuram, Wayanad, Palakkad and Kannur, at `/branches/<town>`. The six sample slugs (`head-office`, `city-centre` and so on) now return 404.
- **Confirmed fields:** name, head office, district and map `pin` (town centre plus `lean`).
- **Pending fields:** address, phone, WhatsApp, hours, Google links, directions and photos are all `null` and shown as marked placeholders. `status` is `'draft'`, so the pages stay `noindex` and out of the sitemap.
- **Removed:**
  - the invented sample data (addresses, PIN codes, opening hours, the demo branch directions);
  - the central "(sample)" phone and WhatsApp that branch pages used to show under the branch's own contact lines;
  - "Sample branch records" labels.

**Markers.**
- **Linked:** each pin links to its branch page.
- **Touch:** the first tap shows the name and the second tap opens the page (`components/ui/map-pin-link.tsx`, about 0.1 KB).
- **Mouse and keyboard:** hover or focus shows the name, and a click or Enter opens the page. Hover styles apply only on devices that can hover.
- **Fix:** with reduced motion on, the tooltip no longer fades in (its show rule used to override the reduced-motion rule).

**Positions rechecked** against Wikipedia, Mapcarta and latlong.net:
- **Unchanged:** Manjeri, Kozhikode, Malappuram and Kannur already matched.
- **Wayanad:** moved from the district reference point to Kalpetta town (about 1.5 km).
- **Palakkad:** moved to Wikipedia's city centre (about 1.3 km).
- **Manjeri, Malappuram, Kozhikode:** their tips stay on the true town positions, and only the heads are tilted apart.

**Checks** (production build):

| Check | Result |
| --- | --- |
| Map QA: Home, About, Branches × 320, 390, 430, 768, 810, 1024, 1280, 1440, 1920, 2560 px | 30/30 pass: 6 pins in order with correct links. Each pin's anchor is within 0.02 px of its computed position, and each tip lands on its point (probed above and below the point along the tilt). No tooltip is clipped or off screen, and there is no horizontal overflow. Keyboard: Tab, focus ring, name, Enter. Touch: the first tap shows the name, the second opens the page. Mouse: hover, one click (810 px and up). Motion: ripples on and stopped with reduced motion. No console errors |
| Branch content | 6/6 branch pages: correct `h1`, `noindex`, district line, every unverified field marked pending, no sample leftovers. Old slugs 404. Home, About, Branches, Contact, Hajj, Book A Trip and Umrah all link to the six branches. The Book A Trip select lists exactly the six |
| `lint`, `typecheck`, `check:forms`, `build` | Pass |
| `site-qa.mjs` | 48/48 pages clean at 16 widths; 7/7 must-be-404 URLs |
| `seo-check.mjs` / `nav-test.mjs` / `form-test.mjs` | Pass / 34/34 / 13/13 |
| JavaScript | Homepage 148.2 KB gzip (was 148.1 KB) |

**Remaining:**
- **Pin overlap on the smallest map:** where the map is about 210 px wide (810 px tablets), the Kozhikode and Malappuram pin heads overlap slightly, by about a tenth of a pin. Everywhere else the heads touch at most.
- **Visual check:** screenshots were reviewed only at 390 and 1440 px.
