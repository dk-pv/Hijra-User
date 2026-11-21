# Green Oasis reference audit (for the HIJRA Travels build)

> A benchmark, not a template. HIJRA takes nothing from Green Oasis except the navigation's composition and interaction, which the client asked to match closely (section 3).
> Sizes are CSS px (screenshot px ÷ 1.25). Times come from the screen recording at 30 fps.
> Audited 2026-11-20 from the supplied files only. The live site was not visited.
> Milestone 1.1 made the site English-only. The മലയാളം toggle (O11) and the `/ml` pages were removed, so the closed pill is again the reference's "logo at the left, two bars at the right".

## 1. Scope

| Asset | Count | What it shows |
|---|---|---|
| Landing-page | 30 screenshots (the brief said 29) | Home from hero to footer, in scroll order. 001540 is full screen, with browser and taskbar. |
| Navbar&Hamburger | 5 screenshots + 1 recording | 003838 and 003845: open menu over the hero. 003929: open menu over a white section after the menu's own scroll (X gone, social row in view). 003905 and 003945: desktop crops of the hover line on "Flight" and "Blogs". None is a phone capture. |
| aboutUs | 14 | About page, hero to footer |
| tours | 4 | Tours listing and footer |
| flights | 3 | /flight-tickets: hero, form, footer |
| visa | 6 | /visa: hero, country cards, form, footer |
| blog | 3 | /blogs listing |
| book A Trip | 6 | /contact-us, the menu's "Book A Trip" |
| HIJRA files | 2 | Official logo and favicon emblem, rendered on white, Warm White and navy |

I viewed all 71 screenshots in full, as labelled pairs at 60%, plus full-resolution crops of the type, widgets, cards and menu.

**Recording** (`Screen Recording 2026-11-19 004054.mp4`): 27.93 s, 1920 × 966, 30 fps, 838 frames. The audio track is silent (−91 dB). It is desktop only; the browser viewport is about 1,534 × 694 CSS px.
- **Viewed:** about 250 frames as timestamped sheets. That covers a 2 fps pass over the whole clip, every frame from 2.00 to 3.97 s, and zoomed sequences of the click, hover, menu scroll, drag and page scroll.
- **Measured:** all 838 frames for motion and brightness, 71 frames for the sheet edge and content fade, and 331 frames for the position of the hover line and label.

**Not inspectable**, because nothing supplied shows it: phone or tablet layouts; the menu closing (the recording ends with the menu open); the pill's page-load entrance; an open FAQ item; form errors or success states; tour, article and visa-country detail pages; the results of "Load More"; testimonial video content (stills only).

## 2. Findings by page

In the tables, Retain is the idea worth keeping, Improve is the weakness to fix, and Redesign is HIJRA's version. Routes follow `data/navigation.ts`.

### 2.1 Landing page (30)

| Reference feature | How it works (observed) | Retain | Improve | Redesign for HIJRA | Used in (HIJRA page or component) |
|---|---|---|---|---|---|
| Header pill (closed) | Fixed and centred, ≈331 × 64, 8 px from the top; 20% black glass with blur; logo at the left, two-bar icon at the right; never changes or hides. Over white sections it turns flat grey (#CCCCCC), and the green logo and white bars nearly vanish (002547, 002709). | Floating centred pill holding only the logo and the icon | Contrast over light sections | Warm White glass, Brand Navy bars, the exact HIJRA logo, a മലയാളം toggle (F1, O11) | Header, every page |
| Hero | Full-viewport aerial sea photo. Left: a ≈80 px white display H1, "Experience the World,", then a Title-Case tagline, "Book your destinations under 2 minutes", and a lime pill CTA with a separate arrow disc. Right: a ≈570 × 430 rounded studio photo of four travellers. A logo watermark at about 15% opacity sits behind the H1. | Split hero: message at the left, real people at the right, one primary CTA | "Under 2 minutes" promises instant booking on an enquiry business; the watermark muddies the H1 | HIJRA's own pilgrim or Kerala-family photo, a plain promise, "Enquire" plus WhatsApp; no instant-booking wording | Home `/` |
| Corner category tiles | Four ≈160 × 104 photo tiles pinned to the hero corners (International, Curated Packages, Hajj & Umrah, Domestic), each with a tilted white label pill. The bottom pair appears only after scrolling, and the Google Reviews pill overlaps "Domestic". | Service shortcuts on the first screen | The tiles sit half off-screen and collide with the widgets | A quiet service row under the hero: Hajj & Umrah first, then Tours, Flights, Visa | Home |
| Brand ambassador | Rounded ≈420 × 560 studio portrait at the left. At the right: an uppercase green eyebrow, a green name, two paragraphs, a green-ruled pull quote, a signature and the brand slogan. | A human voice with one quote | Celebrity endorsement; long text in green | Not copied. Optionally a founder welcome, with consent, in HIJRA type | Home or `/about` |
| Section heading with stamps | Logo emblem above a 3-line H2 that mixes green sans, italic serif and black sans; tilted postage-stamp illustrations on both sides | One italic-serif accent word | Three colours in one heading; clip art | Newsreader italic for at most one word; no stamps | Section headings |
| Tour category icons | Dotted chip "Tour Categories", then six ≈76 px round photo icons with grey labels (All, International, Domestic, Customised Tours, Visa, Flight Tickets). No active state. | One-tap filter row | No selected state; services mixed in with tour filters | Text chips with an active state; Flights and Visa stay separate pages | `/tours` |
| Package cards | 4 per row; ≈283 × 368 (≈3:4) photo cards, ≈20 px radius, 24 px gaps. Each has a duration chip on the image, a bold title, then "From ₹… / Per Person". Eight cards, then a small dark "Load More". | Image-led card with a duration chip and a from-price | Chips vary ("4 Night", "8 Day", "13-night/14-day"); ₹120,000 sits next to ₹1,88,000; one all-caps title; "From Will be announced soon / Per Pe" overflows | One card component: "N days · N nights", Indian digit grouping or "Price on request", an inclusions line, an Enquire link | Home, `/tours`, `/umrah`, `/hajj` |
| Spiritual journeys tabs | Eyebrow, H2 "Travel with faith and purpose.", subtitle, then five round tabs: Hajj (selected, on a beige card), Umrah, Christian Pilgrimage, Hindu Pilgrimage, Holy Land. In both captures the Hajj panel is empty: ≈290 px of blank space, no message. | A dedicated pilgrimage section | Empty panel with no empty state | Hajj & Umrah as HIJRA's lead pillar with its own page; an Umrah/Hajj switch only; always show packages or a "dates announced soon" note | Home, `/hajj-umrah` |
| Promise cards | Chip "Our Promise to You"; H2 with "Journeys" and "Lifetime" in italic; four ≈200 px teal squares tilted like notes, each a white icon disc and a label; leaf-branch art at both edges | Four short reasons to trust | Scattered tilt; little information | Four "Why HIJRA" points on a straight grid (pilgrim guidance, Kerala branches, Malayalam help, visa and flights handled) | Home |
| Leader's message | "My Story", then a huge black-and-teal "Our CMD'S Message". Below: a sub-label and unspaced paragraphs at the left, a large photo at the right, a signature. Repeated word for word on About. | A personal note from the leader | Duplicated; no paragraph spacing; "CMD'S" | Once, on `/about`; on Home at most a two-line excerpt with a link | `/about` |
| Stats band | Pale-yellow band with a dotted world map and floating avatars. "150,000+" in ≈140 px-tall green numerals, with a tilted "Happy Travellers" pill; 60+, 16+ and 98% in italic serif, with coloured pill labels and descriptors. | Big numbers as proof | The figures disagree with About (99% satisfaction, 60+ destinations) and with the promise cards (80+ destinations) | 3–4 numbers HIJRA can verify, from one data file, the same on every page | Home, `/about` |
| Curved gallery | Full-width strip of tall rounded photos in concave perspective; the cards grow toward the right. Generic stock: backpackers, forest hikers, Barcelona, an Istanbul street. | Depth and motion in imagery | Stock unrelated to the brand | If used at all: HIJRA's own trip photos in a flat scroll-snap row | `/gallery` (optional) |
| CTA banner | Lime card ≈990 × 250 with a dashed inner border; a fanned photo stack (outer two blurred); an H2 with "Dream" in italic; a white "Send us a Message" pill with a pink arrow disc; a cartoon plane breaking the edge | A prompt to plan, partway down the page | Cartoon plane; four colours | A calm band: one sentence, Enquire plus WhatsApp | Home, page ends |
| Video testimonials | Chip and H2 "Let's Hear From Our Travellers"; four 9:16 cards (≈284 × 507) with native browser video controls and a small logo watermark | Real customers on video | Unstyled controls; no names, trips or captions | A poster with name, trip and month; HIJRA's own play button; captions; a Malayalam label when spoken | Home, `/testimonials`, `/pilgrim-stories` |
| Accreditations | Dark teal band with a moving strip of white logo tiles (IATA, ISO, KTTC, MKTA, TAFI, "TOA…" cut off, BNI), cut off hard at the container edges | — | Claims a visitor cannot check; abrupt clipping | Only credentials HIJRA documents. No IATA or government-approval claims | Home, only if verified |
| Blog teaser | Chip and italic-serif "Curated Blogs". Two ≈588 × 373 cards with a ≈40 px arrow disc on the image, a date and a bold title. Then a row: "Explor stories that inspire travel" (sic), a rule, a "View All" pill. | Editorial cards with dates | Typo; no excerpt; the reviews pill covers the second title | Three cards with category, excerpt and reading time | Home, `/blogs` |
| FAQ | Chip and navy H2; two columns of four closed accordions (≈580 × 85, 1 px border, "+"). The open state was not captured. | Compact accordion | Generic questions; the last "+" sits under the reviews pill | Pilgrim questions (`data/faqs.ts`); one column on phones; real buttons with `aria-expanded` | Home, `/hajj-umrah`, `/book-a-trip` |
| Get in touch | H2 and subtitle, a full-width rounded stock photo of backpackers, then "Reach out to us." with three grey cards (phone, head office, email) of unequal height | All contact routes in one row | The photo pushes the contact options below the fold | Call, WhatsApp, email and the nearest branch, with no filler photo | `/contact`, Footer |
| Footer | Black band. "Other Branches" is indented out of line with the columns; "Pages" lists 4 of the 7 pages; then three branch addresses, three outline social icons, and a green wordmark at the bottom right that the widgets cover. No copyright or legal row in any capture. | Branch addresses in the footer | Incomplete links; hidden logo; no legal links | All routes, branches, phone and WhatsApp, the language switch, privacy, terms, image credits | Footer |
| Floating widgets | WhatsApp: a 56 px #25D366 circle, ≈20 px from the right and ≈88 px from the bottom. "Google Reviews ★": a ≈190 × 46 dark pill beneath it. Both appear in every capture, first screens included. | One-tap WhatsApp | Covers content: the Domestic tile, a blog title, a FAQ "+", the footer logo | F11 (appears after ≈320 px; hidden near forms, the footer and the menu); F14 teal; reviews pill only with a Google Business Profile (B8) | Global |
| Type and rhythm | Display: a tight geometric sans (Cal Sans-style); body: a neutral sans, ≈15–16 px; italic-serif accents. Three eyebrow styles: a dotted chip with flower icons, an icon-and-label chip, uppercase tracked text. 1,200 px container; 150–250 px between sections. | Big display type, generous whitespace, 1,200 px container | Too many eyebrow and heading styles; some gaps are dead space | One eyebrow style; Newsreader + Hanken Grotesk scale; a steady section rhythm | Global |

### 2.2 Navigation & hamburger (5 + recording; details in section 3)

| Reference feature | How it works (observed) | Retain | Improve | Redesign for HIJRA | Used in (HIJRA page or component) |
|---|---|---|---|---|---|
| Menu trigger | Two 20 × 2 px white bars, 10 px apart; hand cursor; no hover change; opens on click | The same two-bar icon | No accessible name or button role (report F2) | A real button named "Open menu", `aria-expanded`, 44 px target (F2, F10) | Header |
| Overlay | Full-screen sheet rising from the bottom edge; 55% near-black with a heavy blur. Teal over the sea hero, flat rgb(118 118 118) over white. | The rise and the blur | The tint changes with each section; white links fall to ≈4.5:1 over white | Deep Navy at 84% with a 24 px blur; solid on phones (O3) | Menu |
| Open layout | 64 px top bar with the X. 100 px lower: a 273 × 320 portrait (≈24 px radius) at the left of the 1,200 px container, and seven links in a 248 px column at the right. | The same composition | — | Nine links (B1) with B2 spacing; a HIJRA photo (B5) | Menu |
| Links | White, Cal Sans-style 32 px, on a 73 px pitch; no current-page mark | Size, weight and pitch | No "you are here" | Hanken Grotesk 600 (B3); Muted Sand dot and `aria-current` (O10) | Menu |
| Hover | A 1 px white line grows to ≈25 px while the label slides ≈34 px right, on a spring | The exact effect | Pointer only | The same effect on keyboard focus, plus a 2 px outline (F6); the line starts at 0 (F15) | Menu |
| Close | A thin X (two 20 px bars) at the right of the top bar; it scrolls away with the menu | A separate X | It leaves the screen | It stays fixed (F4) | Menu |
| Social row | Three 48 px white-ring circles under the portrait; below the fold at 694 px | The ring icons | Hidden until the menu scrolls | HIJRA's profiles (B6) and a contact line (O5) | Menu |
| Widgets during the menu | WhatsApp and Google Reviews stay sharp above the open menu | — | Clutter over the menu | Hidden while the menu is open (F11, O5) | Global |
| Phones | Not supplied | — | — | As in the report, section 3.7 | Menu |

### 2.3 About Us (14)

| Reference feature | How it works (observed) | Retain | Improve | Redesign for HIJRA | Used in (HIJRA page or component) |
|---|---|---|---|---|---|
| Inner-page hero | A ≈385 px photo banner (desert rock formations at dusk) with a centred white H1, "About our Enthusiasum" (typo), and the Home tagline again. The white content sheet overlaps the banner with ≈24 px rounded top corners. | Short photo hero with a rounded sheet overlap | Typo; the same tagline on every page | One page-hero component: a HIJRA photo, a page-specific line, a breadcrumb | Every inner page |
| Intro | Left-aligned 2-line green H2; a full-width rounded photo (lakeside campfire, stock look); two short paragraph columns | Statement, wide image, two short columns | Generic image | HIJRA's story, with its own photo | `/about` |
| Milestones | Full-bleed dusk coastline photo; "Milestones"; a central ≈400 px-wide photo card. Six translucent stat pills sit on thin connector lines, three per side: 10,000+ Trips, 60+ Destinations, 100+ Partners, 150,000+ Travelers, 99% Satisfaction, 4.8/5 Rating. | Numbers with a visual anchor | Conflicts with Home; small pills over a busy photo | Verified numbers in a plain row, from the same data as Home | `/about` |
| Leader's message | A ≈120 px "CMD'S Message" heading with the "g" descender clipped; the same text and photo as on Home | — | Clipped heading; duplicate | A single founder message | `/about` |
| Team | Chip and green H2. "Board & Directors": two columns of ≈588 px square portraits, with the third card alone on its row. "Management Team": two ≈380 px cards, centred. Bold name, grey role; four different photo backdrops. | Real people, with name and role | Orphan card; mixed backdrops; "Hr Manager" | Uniform crops and backdrop, 3–4 per row, branch heads optional | `/about`, `/branches` |
| Our Journey | Chip and H2; a photo of beach-bonfire silhouettes at the left; "Foundation" and "Future Goals" with paragraphs at the right | The story told in beats | Thin content | A short dated timeline, only from facts HIJRA supplies | `/about` |
| Footer and widgets | As on Home; the WhatsApp/reviews pair covers the footer logo | — | — | Footer; F11 | Footer |

### 2.4 Tours (4)

| Reference feature | How it works (observed) | Retain | Improve | Redesign for HIJRA | Used in (HIJRA page or component) |
|---|---|---|---|---|---|
| Hero | Aerial turquoise-coast photo, ≈385 px; white "Curated Tours" and the Home tagline again; a rounded sheet overlaps it | Short photo hero | Repeated tagline | A page-specific subtitle; a HIJRA photo | `/tours` |
| Category row | The Home icon row; "All" is not marked | Filter row | No active state | Text chips with an active state; categories from HIJRA's data | `/tours` |
| Grid | The same eight cards as Home, then "Load More". When scrolled, the pill hides one card's duration chip. | Grid | No count, sort or search; the pill covers content | Result count; "Load more" that keeps the scroll position; `scroll-margin-top` on anchors so the pill never hides content | `/tours` |
| Detail page | Not captured | — | — | Designed fresh | `/tours/[slug]` |

### 2.5 Flights (3)

| Reference feature | How it works (observed) | Retain | Improve | Redesign for HIJRA | Used in (HIJRA page or component) |
|---|---|---|---|---|---|
| Hero | No photo: a ≈355 px dark-green gradient band with an uppercase eyebrow, a ≈56 px tightly tracked H1 ("Flights, made effortless.") and a one-line subtitle | Photo-free hero for a form-led service page | A different hero template from the photo pages | A HIJRA service hero in Deep Navy, with HIJRA's own wording | `/flights` |
| Layout | Pale mint panel. Left: eyebrow "PLAN YOUR TRIP", H2 "Tell us where you want to fly.", a two-line subtitle, centred in mostly empty space. Right: a white form card. | Why-plus-form split | The left half says almost nothing | Left: what HIJRA handles and how fast it replies (HIJRA to confirm) | `/flights` |
| Fields | Placeholders only, no labels: full name, contact number (≈38 px narrower than the others), email, one free-text "Flying from and flying to", and a textarea for "Travel dates, passenger count, cabin preference" | Short form | Placeholders used as labels; two values in one field; uneven widths | Labelled From, To, dates (native date inputs), passengers, phone/WhatsApp, notes; prefilled with `enquiryPath('flight')` | `/flights`, `/book-a-trip` |
| Submit | Full-width green "Request flight quote" | Action-specific label | No reassurance | The same pattern, plus a reply-time note and a WhatsApp alternative | `/flights` |
| Pill over the page | Dark over the hero, flat grey over the mint panel; when scrolled, it covers the first field | — | Overlap | F1; `scroll-margin-top` on the form anchor | Header |

### 2.6 Visa (6)

| Reference feature | How it works (observed) | Retain | Improve | Redesign for HIJRA | Used in (HIJRA page or component) |
|---|---|---|---|---|---|
| Hero | The same gradient template: eyebrow, H1 "Your visa, made simple.", and a subtitle that promises "transparent starting rates" | — | As on Flights | A HIJRA service hero | `/visa` |
| Rates heading | "POPULAR DESTINATIONS", H2 "Visa rates for where you're going next", and the note "Rates are indicative…" | The honest disclaimer | No card shows a rate | Show "from ₹…" only where HIJRA confirms it; otherwise do not say "rates" | `/visa` |
| Country cards | Nine cards, four per row, with Schengen alone on the last row. Pale fill, 1 px border, ≈16 px radius. Each: country, visa type, a green marketing headline, a 3–6 line description; no link or button. | Country-first scan | No action; the headline repeats the country; orphan row | Country, visa type, processing time, documents, Enquire. Lead with the visas HIJRA's pilgrims need (HIJRA to confirm). | `/visa`, `/visa/[country]` |
| Form | The same placeholder-only card ("NEED A HAND?", "Tell us where you want to go."), a free-text destination, "Request visa assistance →" | — | As on Flights | Country select, travel month, a passport-validity question; `enquiryPath('visa')` | `/visa` |

### 2.7 Blog (3)

| Reference feature | How it works (observed) | Retain | Improve | Redesign for HIJRA | Used in (HIJRA page or component) |
|---|---|---|---|---|---|
| Hero | A lakeside boat at golden hour; "Travel Stories & Guides" with a Title-Case subtitle; a rounded sheet overlaps it | Short hero | Generic photo | A HIJRA photo | `/blogs` |
| Cards | Two per row: a ≈588 × 373 image, a ≈40 px translucent arrow disc on the image corner, a grey date, a bold title. Three posts in all (the third alone). | Big image, date, whole-card link | No excerpt, category, author, reading time, search or pagination | Add an excerpt, a category (Umrah guide, Hajj, travel tips), the reading time and a language tag | `/blogs`, Home |
| Content | The titles are SEO listicles ("… Tour Packages from Kerala") | Kerala-specific search phrasing | Thin and sales-led | Practical pilgrim guides in English and Malayalam | `/blogs/[slug]`, `/pilgrim-guide` |
| Article page | Not captured | — | — | Designed fresh | `/blogs/[slug]` |

### 2.8 Book A Trip (6)

| Reference feature | How it works (observed) | Retain | Improve | Redesign for HIJRA | Used in (HIJRA page or component) |
|---|---|---|---|---|---|
| Route and label | The menu's "Book A Trip" opens `/contact-us` | — | The label and the URL disagree | `/book-a-trip`, with the service prefilled (`enquiryPath`) | `/book-a-trip` |
| Hero | A lagoon photo with a long-tail boat; "Start Your Journey" and "Tell Us Your Destination & We'll Plan The Rest." | Short photo hero | Generic | A HIJRA photo; enquiry wording | `/book-a-trip` |
| Page order | "Get In Touch With Us!", then a full-width stock photo, the contact cards, the FAQ, and finally the form, about four screens down | — | The form is buried | The form first, the contact options beside it, the FAQ after it | `/book-a-trip` |
| Form | Left: a ≈40 px navy "Let's Plan Your Next Journey Together" (a third heading style) and two lines. The block is ≈40 px wider than the 1,200 px grid on each side. Right: a grey panel with visible labels: Full Name and Email side by side, Phone number, Message, then a green "Submit" pill. | Visible labels (the only form on the site that has them) | Generic fields; "Submit"; no consent line or success state seen | Service, preferred month, travellers, nearest branch, phone/WhatsApp preference, notes; a consent line; a clear success state | `/book-a-trip`, `components/forms` |
| Contact cards and FAQ | Copies of the Home blocks | — | Repetition | Branch-aware contact details; a FAQ about how the enquiry works | `/book-a-trip` |
| Widgets | The WhatsApp button sits beside the form | — | It competes with the form | Hidden on Book A Trip (F11) | Global |

## 3. Navigation deep-dive

### 3.1 Observed timeline (recording)

| Time (s) | Observed |
|---|---|
| 0.00–1.00 | The pill is closed over the hero; the cursor travels to the menu icon. |
| 1.03 | The cursor becomes a hand over the bars. The icon and the pill do not change: there is no hover state. |
| ≈1.72 | Click. The cursor flips to an arrow without moving, as the still-invisible full-screen layer mounts on top. |
| 1.72–2.13 | Nothing moves (≈0.4 s). |
| 2.13 | The sheet animation begins (fitted start). Across 20 measured frames, the edge follows cubic-bezier(.96, −.02, .38, 1.01) for 1.00 s, with a residual of 0.0002. |
| 2.43 | First visible change, 0.7 s after the click: a dark band along the bottom edge, 4% of the height. |
| 2.60 → 2.93 | The sheet covers 15%, then 30% (2.70), 55% (2.77), 71% (2.80), 88% (2.87) and 96% of the height. Most of the travel happens in ≈0.25 s, so the reveal reads as a pause and then a snap. |
| ≈2.9 | The rising edge passes the pill, which then sits blurred under the sheet. |
| ≈3.10 | The sheet covers the viewport. |
| 2.97–3.70 | Portrait, seven links and X fade in together, with no stagger and no movement: 0 px offset between 3.30 and 4.33 s, and the first and last links reach full white on the same frame. The fitted fade starts 0.84 s after the sheet and lasts ≈0.75 s. |
| ≈3.70 | Fully open, ≈2.0 s after the click. |
| 7.10–14.9 | The pointer passes down all seven links (hover in 3.2). |
| 15.00 | One wheel step scrolls the menu itself by its whole range (≈128 px at this 694 px-tall viewport). The top bar and X leave the screen, the social row comes into view, and an inner scrollbar appears beside the page's own. |
| 18.4–19.4 | The portrait is dragged, and a translucent drag ghost follows the pointer. |
| 20.0–26.3 | More wheel steps scroll the page underneath the open menu: hero, ambassador, "Discover Adventures", tour cards, promise cards. The menu content stays put. |
| 27.93 | End. The menu never closes, so the closing animation is not observable. |

### 3.2 What each part looks like

- **Overlay.** 55% near-black with a heavy blur, so nothing behind it is readable. Its colour comes from the section underneath:
  - deep teal over the sea hero, and warm grey over the hero photo;
  - flat rgb(118 118 118) over white sections, where white links reach only ≈4.5:1;
  - bright photo blobs behind the links when tour cards pass under (24.0–24.5 s).
- **Header pill.** The overlay covers it; it shows only as a blurred shape, so there is no logo in the open state.
- **Portrait.**
  - 273 × 320 with a ≈24 px radius, top-aligned with the first link, 164 px below the overlay top (64 px bar + 100 px).
  - A stock photo of a hiker on a suspension bridge. It can be dragged.
- **Links.**
  - Home, About Us, Tours, Flight, Visa, Blogs, Book A Trip: white, ≈32 px (22 px cap height), on a 73 px pitch.
  - The left edge sits at ≈1,106 px. That is the 248 px column at the right of a 1,200 px container that two scrollbars have narrowed.
  - No current-page mark, although the page is Home.
- **Hover indicator.** Measured on Home (7.10–7.40 s) and Tours (9.37–9.60 s):
  - The label slides ≈34 px right while a 1 px white line grows to ≈25 px.
  - It reaches ≈98% in 200 ms, overshoots by 1 px at ≈230–270 ms and settles by ≈300 ms: a spring.
  - Out takes ≈230–270 ms, and the line retracts before the label finishes sliding back.
  - Nothing shows at rest: the 1 px resting line sits flush against the first letter.
- **Close control.** A thin X made of two 20 px bars at ±45°, at the right end of the 64 px top bar and aligned with the container. It scrolls away with the menu (15.00 s).
- **Social row.** Three 48 px circles with a 1 px white ring (Facebook, Instagram, LinkedIn) under the portrait. They are below the fold until the menu is scrolled.
- **Scroll.** There is no scroll lock and no overscroll containment, and two scrollbars show at once. The wheel scrolls the menu first, then the page.
- **Floating widgets.** WhatsApp and Google Reviews stay above the overlay, sharp and undimmed, throughout.
- **Phones.** No phone capture exists; 003905 and 003945 are desktop crops.

### 3.3 Checklist for the HIJRA build

**Match the reference** (confirmed in the recording):
- [ ] A fixed, centred pill, ≈330 × 64, 8 px from the top, fully round. Logo at the left, two 20 × 2 px bars at the right. No links in the header; no scrolled or hidden state (R1–R4).
- [ ] A full-screen sheet that grows up from the bottom edge, with a backdrop blur that makes the page behind unreadable (R6).
- [ ] The content arrives as one layer, in a single opacity fade, with no stagger and no movement (R7; O2 declined).
- [ ] A 64 px top bar. Content 100 px lower, in a 1,200 px container: the 273 × 320 portrait (24 px radius) at the left, the link column (max 248 px) at the right. 32 px links on a 73 px pitch at full height (R8–R10; B2 tightens the gap for nine links on short screens).
- [ ] Hover: the line grows from 0 to 25 px while the label slides ≈34 px, on a ≈400 ms spring (≈200 ms in with a slight overshoot, ≈250 ms out). Pointer devices only (R11, F15).
- [ ] A separate X at the top right of the container. The X, any link and Escape close the menu (R12).
- [ ] Closing: the content fades out, then the sheet leaves upward (R13 with F12). This is not visible in the recording, so follow the report.
- [ ] 48 px ringed social icons under the portrait (R14).

**Differ deliberately** (with the reason):
- **Timing (O1).** Sheet 600 ms, cubic-bezier(.76, 0, .24, 1); content from 360 ms; open in ≈0.9 s; no click lag (F8). The reference takes ≈2.0 s and shows nothing for ≈0.7 s after the click.
- **Overlay colour (O3).** Deep Navy at 84% with a 24 px blur; solid Deep Navy on phones. The reference tint drifts from teal to grey with the section underneath, drops white links to ≈4.5:1 over white sections, and lets bright photos show behind the links.
- **Pill above the overlay (O4).** Warm White glass with Brand Navy bars (F1). The reference covers the pill. On dark glass HIJRA's logo fails: its navy tagline vanishes on navy and the red loses contrast (checked on the supplied file).
- **Additions.** A മലയാളം toggle in the pill (O11); a contact line (phone · WhatsApp) in the menu (O5); a Muted Sand current-page dot with `aria-current` (O10).
- **Content.** Nine links in Hanken Grotesk 600 (B1 adds Branches and Hajj & Umrah; B3); HIJRA's own photo (B5) and profiles (B6).
- **Accessibility.** A real, named button with `aria-expanded` and 44 px targets (F2, F10). A modal dialog: focus moves in, stays in and returns (F3). Visible focus shows the hover line plus a 2 px outline (F6). Reduced motion gives 150 ms fades (F7). Every link has a name (F9).
- **Fixes for faults seen in the recording.**
  - The X stays visible (F4); in the reference it scrolls away at 15.00 s.
  - The page scroll is locked, with overscroll containment (F5); the reference passes the wheel to the page at 20–26 s.
  - The portrait cannot be dragged (F13); the reference shows a drag ghost at 18.4–19.4 s.
  - The WhatsApp button hides while the menu is open, because the contact line carries WhatsApp (F11, O5). When shown, it is teal #128C7E (F14).
- **Not adopted.** O2 (stagger), O6 (portrait swaps on hover), O7 (2 px sand line), O8 (Newsreader links), O9 (contact dock).

**Notes on the approved report** (section 3):
- Nothing in the recording contradicts the measurements, and I re-checked them independently. These all match: the sheet curve and its 1.0 s duration, the 0.8 s fade after 0.8 s, the ≈0.4 s click lag, ≈1.97 s to fully open, the 73 px pitch, the 25 px line and 34 px slide, the 55% overlay (rgb 118 over white), the 56 px #25D366 WhatsApp button, and the 330 × 64 pill 8 px from the top.
- Two refinements:
  - The visible dead time after a click is ≈0.7 s (the lag plus the slow-start curve), not 0.4 s.
  - The resting 1 px line (F15's "stray dot") cannot be seen at 125%. Keep F15 anyway.
- The 3.9 "final specification" table still lists the reference defaults: black at 55%, a 1.0 s sheet, an 800 ms fade after 800 ms, a line from 1 px, and the WhatsApp button in #25D366 "above the open menu". These rows conflict with the approved O1, O3 and O5 and with fixes F11, F14 and F15. Follow the approved items, and confirm with the lead before changing anything.

## 4. Cross-cutting lessons

**What makes the reference feel premium:**
- A minimal header: one floating pill, no link bar. The single dramatic gesture is the rising, blurred menu.
- Large, tightly tracked display type, with an occasional italic-serif word.
- Generous whitespace, a steady 1,200 px container, 20–24 px image radii and soft shadows.
- Real faces where trust matters: the leaders, the team and the video testimonials.
- A consistent way into each inner page: a short photo hero, overlapped by a rounded white sheet.

**Where it is weak, so HIJRA can do better:**
- **Imagery.** Generic western stock for a Kerala agency: backpackers, a campfire, forest hikers, destination postcards. Even the menu portrait is stock.
- **Repetition.** The leader's message appears on two pages. The same eight cards appear on Home and Tours, and the same contact block and FAQ on Home and Book A Trip. One tagline sits on every hero.
- **Inconsistent numbers.** 150,000+ travellers against 10,000+ trips; 98% repeat bookings against 99% satisfaction; 60+ destinations against 80+.
- **No single design system.** Three eyebrow styles; headings in green, black, teal and navy; three different forms. Flights and Visa use a different hero template.
- **Contrast.**
  - The green logo on the grey pill over white sections.
  - White menu links at ≈4.5:1 on grey.
  - Small grey descriptors.
  - Forms that use placeholders as labels.
- **Widgets.** They cover content in nearly every capture.
- **Copy errors.**
  - Misspellings: "Enthusiasum", "Explor", "amercian" (in a URL), and both "travelers" and "travellers".
  - Inconsistent styling: "CMD'S", "Hr Manager", three duration formats, an all-caps title with a leading space, mixed ₹ digit grouping.
- **Broken states.**
  - An empty Hajj tab, and a price line that overflows.
  - The clipped "g" in "CMD'S Message".
  - Orphan cards in the team, visa and blog grids.
- **Weak conversion.**
  - Route: the menu's "Book A Trip" goes to `/contact-us`.
  - Form placement: on that page the form sits about four screens down, after a stock photo and the FAQ.
  - Visa: the cards have no action, and the page promises rates it never shows.
- **Slow menu.** It takes ≈2 s to finish opening, and nothing happens for ≈0.7 s after the click.

**HIJRA assets:**
- The supplied favicon emblem PNG needs cleaning before use. It has three flaws:
  - a faint haze box (alpha 2–4);
  - a thin dark sliver of the logo's divider at its right edge (x 907–910);
  - an off-centre mark.

  The project's `app/icon.png` is already trimmed and centred, so build any further icons from it, not from the raw file.
- On dark navy, the logo's navy tagline disappears. This is why the pill stays light.

## 5. Things HIJRA must not copy

- **Identity.** The Green Oasis name, wordmark, leaf-and-suitcase emblem and hero watermark; the "green signal" slogan; logo watermarks on videos.
- **Palette.** Leaf and lime greens, teal, the pale-yellow stats band, the black footer.
- **Wording.** Any headline, tagline, FAQ or card copy, including:
  - "Experience the World,"
  - "Curated Journeys Designed To Be Felt, Not Rushed."
  - "Book your destinations under 2 minutes"
  - "Discover Adventures That Suits You"
  - "We don't just book trips…"
  - "Travel with faith and purpose."
  - "Flights, made effortless."
  - "Your visa, made simple."
  - "Tell us where you want to fly / go."
  - "Let's Hear From Our Travellers"
  - "Everything You Need To Know Before You Travel"
  - "Start Your Journey"
- **People and images.** The brand ambassador, chairman and team portraits; the testimonial videos; the menu's suspension-bridge portrait; every stock and destination photo; the stamp, plane and branch illustrations.
- **Signature layouts.**
  - The corner tiles with tilted labels.
  - The scattered tilted promise cards with branch art.
  - The stats band: a giant number, a tilted pill and floating avatars.
  - Milestones: stat pills around a central image.
  - The curved gallery.
  - The lime CTA with its photo fan and plane.
  - The dotted chips with flower icons.
- **Claims.** The accreditations (IATA, ISO, TAFI and others) and the figures (150,000+, 98%, 16+ years, 4.8/5). HIJRA uses only its own verified facts, and makes no IATA or government-approval claims.
- **Contact data.** Their addresses, phone number, email, branch list and social profiles.
- **The one exception: the navigation's composition and interaction** (section 3). It is rebuilt in HIJRA's colours and type, with the fixes listed in 3.3.
