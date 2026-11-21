# QA scripts

These are dependency-free browser and HTTP checks. They need Node 22+ and Google Chrome; set `CHROME` if Chrome is not at the default Windows path (`seo-check.mjs` needs no browser).
- Run them against a production server: `npm run build && npx next start -p 3100`.
- Most also work against `npm run dev`, but measure performance and JavaScript weight on production builds only.
- In Git Bash on Windows, prefix commands with `MSYS_NO_PATHCONV=1` so URL paths are not rewritten.

| Script | What it checks |
| --- | --- |
| `site-qa.mjs --base <url> --out <dir> [--shots 390,1440]` | **Status:** crawls every internal page from `/` and checks each page's HTTP status, plus URLs that must be 404 (`/ml`, `/en/...`, unknown pages and slugs).<br>**At 16 widths (320–2560 px):** horizontal overflow, broken images, dead links, one h1, heading order, unnamed controls, text under 14 px and console errors.<br>**Excluded wording:** checked when `QA_FORBID` holds a regular expression of words that must never appear. |
| `nav-test.mjs --base <url> --out <dir>` | **The menu:** open and close, focus trap and return, inert page, scroll lock, Escape, the nine links in order, current page, hover line, navigation and focus on the new h1, reduced motion, phones at 390, 375 and 320 px, and no language control.<br>**Background requests:** none while idle, one round of prefetches on the first open, none on the second.<br>**Floating WhatsApp button:** its visibility rules. |
| `form-test.mjs --base <url>` | **Enquiry forms:** query preselection, error summary and focus, aria wiring, preserved input, busy state, single submission, honest demo success and reset.<br>**A failed submission** (`?demo-enquiry=network`): the message gets focus, the input is kept and a retry is possible. |
| `seo-check.mjs --base <url> [--site <origin>] [--gate-open]` | **From the server HTML:**<br>- `lang="en"`, unique titles and descriptions (50–170 characters);<br>- canonical and `og:url` agree, `og:locale`, `og:image`, no `hreflang`;<br>- the robots meta per page, `robots.txt` and the sitemap.<br>**Indexing gate:** the default expects it closed; `--gate-open` checks a build made with `NEXT_PUBLIC_ALLOW_INDEXING=true`. |
| `js-weight.mjs --base <url> --paths /,/tours [--width 390] [--files]` | **JavaScript per page:** the gzip and raw JavaScript each page's HTML loads (and what is fetched later), file by file.<br>**Problems:** every failed or 4xx/5xx request, and console errors. |
| `perf.mjs --base <url> --paths /,/umrah [--runs 3] [--desktop]` | **Lab metrics:** LCP, CLS and an INP proxy under Slow-4G and 4× CPU throttling (median of runs).<br>**Transfer sizes:** HTML, JS, CSS, image and font (the JS figure includes what loads after the test opens the menu). |
| `shoot.mjs --paths / --widths 390,1440 --out <dir>` | Full-page screenshots, plus the same health probe, for chosen pages |

To see which modules make up a chunk, run `npx next analyze --output`, then `npx next analyze export --route /about`. Both are built into Next.js.
