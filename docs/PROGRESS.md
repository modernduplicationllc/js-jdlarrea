# Project Progress & Orientation

Read this file first in any new session on this repo. It exists so a fresh chat can pick up
where the last one left off without re-deriving context. Update it as work happens — don't
let it go stale.

## What this project is

JD Larrea's personal portfolio site, built to showcase for job applications (target: Next.js
developer roles). Background: senior WordPress developer (Underscores + Tailwind + ACF Pro
custom themes) transitioning into Next.js. This portfolio is the first showcase piece.

Mostly a static marketing site. One page, `/apps`, will later break out into real interactive
demo apps (`/apps/food-tracker`, `/apps/film-blog`, etc.) — those are out of scope for now and
will be built later while the user waits to hear back from employers.

**Active constraint:** targeting a job application in the ~1 week from 2026-08-26. Work is
prioritized accordingly (see Page Status below). User wants to move deliberately — ask before
assuming, don't guess on ambiguous decisions.

**Per-app progress docs:** each demo app under `/apps` gets its own `progress-<app-name>.md`
file colocated in its route folder (e.g. `app/apps/pokemon-playground/progress-pokemon.md`),
tracking that app's own architecture/mechanics/build order — this file stays focused on the
portfolio site as a whole. Each one is auto-loaded via its own `@` import line in root
`CLAUDE.md`, alongside this file — when a new demo app gets its own progress doc, add its
import line there too.

## Workflow / conversion process

Static HTML mockups live in `.reference/*.html` (already designed/approved). The task is
converting each into React components under `components/sections/` and wiring them into
`app/` routes — not redesigning. `.reference/wp-theme/` is the user's old WP theme, for
reference on their prior coding style only — not a conversion source.

Pattern to follow (see `app/page.tsx` + `components/sections/*` as the reference example):
- Each distinct visual section of a reference HTML file becomes its own component in
  `components/sections/`, kebab-case filename, PascalCase default export.
- Reuse a section component across pages if the markup pattern repeats (check existing
  `components/sections/` before creating a new one).
- Page files (`app/**/page.tsx`) stay thin: import sections, pass content as props.
- Follow the color / spacing / breakpoint naming conventions already established in
  `app/globals.css` (custom `--color-*`, `--breakpoint-brXX`, `--spacing-wrapper-gutter-*`
  tokens under `@theme inline`) — don't introduce new ad hoc tokens without checking there
  first.

## Page status

| Route | Reference file(s) | Status | Notes |
|---|---|---|---|
| `/` (home) | `homepage2.html` | ✅ Done (fully styled) | hero-home, stats-ribbon, word-list, content-5050-grid, cta-banner all restyled to match `/work`'s approach. `featured-cards` pulls a **curated** set from `getAllProjects()` — 3 specific hardcoded slugs in a specific order (Journyx, Traditional Medicinals, Enerfab), not just "top 3" — and reuses `ProjectCard`, single source of truth with `/work`. Header/footer also styled. |
| `/work` | `work2.html` | ✅ Done (fully styled + working filter, real data) | `page-hero`, `project-filter-grid` (client component, industry single-select only), `project-card` (3-col grid, no detail page). Data-driven from `content/projects/*.mdx` (42 real projects) via `lib/projects.ts`. See "Real project content — 42 projects live" below. |
| `/work/[slug]` | `case-study2.html` | ❌ Removed (2026-08-29) | Deprecated per user's call — see "Card-only /work" below. Route, its components, and the `ResultStrip`/`Gallery` MDX components were deleted, not just unlinked. |
| `/about` | `about2.html` | ✅ Done (fully styled) | `about-intro` (full-width bio, no photo — deliberate, see Decisions), `timeline` (career history, scroll-driven active dot — see "Timeline redesign" below, no more static `current` flag), `toolbox` (4-column tool lists), `values-grid` (3 principle cards), reuses `cta-banner` with custom copy/links. |
| `/apps` | `demo-apps2.html` | ✅ Started (landing only) | `page-hero` (now accepts a `children` slot for the status line) + `demo-app-grid`. All 4 apps are placeholder/`planned` status — honestly labeled "not started yet" rather than the reference mockup's fictional "2 live, 2 in progress" copy. Real routes (`/apps/food-tracker`, `/apps/film-blog`, etc.) are separate future work once those apps actually get built. |
| `/resume` | — | ✅ Resolved: PDF, not a page | No `/resume` route. Header, footer, homepage hero all link to `RESUME_HREF` (`lib/nav.ts`), currently `/resume-jonathan-larrea-public.pdf` in `/public` — file exists, links are live (no longer 404). Opens in a new tab, no forced `download`. |
| 404 | `404.html` | ❓ Unscoped | Not yet prioritized |
| `components/globals/header-main.tsx` | — | ✅ Done (fully styled) | Desktop nav + mobile hamburger trigger. See "Mobile navigation" below. |
| `components/globals/footer-main.tsx` | — | ✅ Done (fully styled) | |

## Polish pass (post priority-order pages)

- **Header-flush bug fixed**: `body` had `mt-header-height-mobile`/`brm10:mt-header-height-desktop`
  margin — leftover from a fixed-header assumption. The header is `position: sticky`, which
  already reserves its own space in normal flow, so that margin was pushing the sticky header
  down from the top of the viewport. Removed.
- **Removed `scroll-smooth` from `html`**: combined with the margin bug above and Next.js's
  focus-management on route change, this was likely causing the "lands scrolled to the eyebrow
  text" symptom reported. No hash anchors exist anywhere in the app currently, so this class
  had no upside — if in-page anchor nav is ever added later, revisit on a case-by-case basis
  with explicit `scroll-mt-*` on the target elements, not a blanket `scroll-smooth`.
- **`PageHero`** (`components/sections/page-hero.tsx`) was using `wrapper thin` (max-w-250)
  while the sections below it on `/work` and `/apps` use plain `wrapper` (max-w-300) — two
  different centered max-widths meant their left edges didn't line up, reading as "off-center."
  Fixed to plain `wrapper` so hero and body content share one left edge on every page that uses it.
- **`/work` filter bar is no longer sticky** — removed `sticky` positioning per request; revisit
  once real project content is in and the page has been used for a while.
- **External links** (GitHub, LinkedIn, résumé) now open in a new tab
  (`target="_blank" rel="noopener noreferrer"`) across header, footer, homepage hero, and
  `cta-banner`. Résumé links no longer force a `download` — they open the PDF directly so the
  visitor can use the browser's native save/print UI instead.
- **Résumé filename**: user renamed the file to `resume-jonathan-larrea.pdf` in `/public` — all
  4 reference points (header, footer, homepage hero, in `RESUME_HREF`) updated to match.
- **Header GitHub/LinkedIn buttons** are now equal height (`h-9`, explicit rather than
  padding-derived) and paired tightly together (`gap-1.5` wrapper) per user's design call.
- **`/work` filter-bar grid-bleed bug**: it was a plain `<div>`, not a `<section>`, so it fell
  below `.grid-bg`/`.grid-glow` in the stacking order once `sticky` (which incidentally also
  created a stacking context) was removed. Fixed by making it a `<section>`. Found the same
  latent bug in `footer-main.tsx` (a `<footer>`, never covered by the `section` rule) — fixed
  with explicit `relative z-[1]`.

## Accessibility audit (2026-08-27)

User asked for a pass on color contrast + keyboard nav (targeting WCAG AA). Findings and fixes:

1. **Root cause of the filter-pill hover bug**: this app is dark-themed entirely through its
   own custom color tokens, but never activated Tailwind/shadcn's `.dark` class — so the
   *generic* shadcn tokens used internally by the `Toggle`/`Badge` primitives (`--muted`,
   `--foreground`, etc., not this project's own `body-*`/`accent-*` tokens) were still
   resolving to their **light-mode** values (`--muted` ≈ near-white). That's what flashed
   filter pills and project-card tags white on hover. **Fix**: added `dark` class to `<html>`
   in `app/layout.tsx`. Verified via `grep` first that generic shadcn tokens (`bg-muted`,
   `text-foreground`, etc.) are used *only* inside `components/ui/{button,toggle,badge}.tsx` —
   nothing else in the app references them, so this was a fully contained fix.
2. **Site-wide focus ring failed AA contrast**: the global `outline-ring/50` (in `globals.css`,
   applied to every element via `*`) measured ~2.6–2.7:1 against the dark backgrounds — under
   the 3:1 minimum WCAG AA requires for UI component states (SC 1.4.11). Root cause: shadcn's
   default `--ring` is a mid-gray, additionally halved by the `/50` opacity modifier at each
   call site. **Fix**: overrode `--ring` to the site's own `accent-alt-300` (`#8fb6ff`,
   measured 9.67:1 / 7.78:1 against the two backgrounds it appears against) in both `:root` and
   `.dark`, and removed the `/50` opacity modifier everywhere it was used (`globals.css`'s base
   rule, plus `focus-visible:ring-ring/50` in the three `components/ui/*.tsx` primitives).
3. **Non-semantic headings**: `featured-cards.tsx` and `word-list.tsx` rendered their section
   titles as `<div className="h2">` — styled like a heading, not actually one, so screen-reader
   users navigating by heading outline would skip them entirely. Fixed to real `<h2>`.
4. **Missing `aria-pressed`**: the hand-built "All" filter pill (a plain `<button>`, not the
   `Toggle` primitive) only had a styling-only `data-pressed` attribute, no ARIA state — so
   assistive tech couldn't tell whether it was selected. Added `aria-pressed`.

Contrast pass on the base color system (everything already in use — body text, links, active
pill/button text, header CTA text) came back clean, 5.1:1 to 17.2:1 across the board — no
issues found there.

**Open item, flagged not fixed**: `header-main.tsx`'s entire nav is `hidden` below the
`brm10` (1024px) breakpoint with no mobile menu — below that width there's no way to reach
`/work`, `/apps`, `/about`, résumé, or either social link except the homepage. Real scoped
work (a mobile nav component), not a quick fix — discuss approach with user before building.

**Update: fixed.** See "Mobile navigation" below.

## Mobile navigation

Hamburger (logo left, hamburger right, morphs to X) → left-slideout panel, matching the
pattern in `.reference/wp-theme/.../functions-menus.php` (the old WP nav walker) and
`nav-toggle.css` — same left-0/`translateX(-100%)`→`translateX(0)` slide, hamburger stays
in place and morphs rather than being covered.

- **`lib/nav.ts`** — single `NAV_ITEMS` data source (typed `NavItem[]`, `children?: NavItem[]`)
  shared by the desktop nav (`header-main.tsx`) and the mobile panel (`mobile-nav.tsx`). One
  menu, two renderings — same idea as the old PHP walker driving one WP menu for both.
- **`components/globals/mobile-nav.tsx`** — hand-built 3-bar hamburger (CSS transform morph to
  X, no icon-swap), built on shadcn's `Sheet` (`npx shadcn@latest add sheet`, itself built on
  `@base-ui/react/dialog`) for the panel mechanics: focus trap, Escape-to-close,
  backdrop-click-to-close, body scroll lock, slide transition — all handled by the primitive
  rather than hand-rolled.
- **Drill-down**: per user's spec, capped at 2 slideout levels. A single
  `activeItem: NavItem | null` state (not a general nav stack) — `null` shows the top-level
  list, setting it shows that item's `children` with a back button. A 3rd tier (if a
  `children`'s `children` is ever populated) renders indented in place under its level-2
  parent, not as a further drill-in panel.
- **Resume/GitHub/LinkedIn are pinned** at the bottom of the panel (`mt-auto`), separate from
  the drillable nav list — matches both the desktop header's existing split and the old WP
  theme's `.header-cta` being a distinct block from `.menu-header-primary`.
- Nothing in `NAV_ITEMS` has `children` yet (site is single-level today) — the type/render
  logic is just ready for whenever a page needs one.

**Two real bugs found and fixed while building this** (both in `components/ui/sheet.tsx`
itself, so any future use of `Sheet` elsewhere in the app is protected too, not just this one
usage):
1. My own width override (`w-4/5`) silently didn't apply — the shadcn default is scoped
   (`data-[side=left]:w-3/4`), which beats an unscoped override in CSS specificity regardless
   of source order. Fix: scope the override the same way (`data-[side=left]:w-4/5`).
2. **More serious**: neither `SheetContent` nor `SheetOverlay` set `pointer-events-none` in
   their closed (`[data-closed]`) state — confirmed via `elementFromPoint` that after closing,
   the fully invisible (`opacity:0`) panel and its full-viewport backdrop were still
   intercepting every click/tap underneath them. A user closing the mobile menu would find the
   left ~80% of their screen (and, via the backdrop, the *entire* screen) dead until something
   else caused the DOM node to unmount. Fixed by adding `data-closed:pointer-events-none` to
   both in `sheet.tsx` directly.

## Timeline redesign (2026-08-29)

`components/sections/timeline.tsx` — two changes:

1. **Layout fix**: dot position is now identical at every breakpoint (always the first
   element of a `flex` row, so its center sits at a constant `left: 5px` matching the
   connecting line — no more mobile/desktop mismatch). Only the *relationship* between the
   (dot+year) cluster and the content changes: `flex-col` on mobile (content below), `brm57:
   flex-row brm57:items-start` at 576px+ (content beside, top-aligned with the dot). Verified
   both breakpoints via actual DOM geometry (top offsets match exactly at brm57+; visually
   confirmed on mobile).
2. **Scroll-driven active dot**: dots start outline-only; whichever item's box currently
   overlaps the exact vertical center of the viewport gets its dot filled, via
   `IntersectionObserver` with `rootMargin: "-50% 0px -50% 0px"` (a zero-height trigger line at
   center) — the observer only acts on `isIntersecting: true`, so the active item naturally
   stays filled through the gap until the next one crosses center, in either scroll direction,
   and the last item just stays active once reached. Fill is a separate inset `<span>`
   crossfading opacity (`transition-opacity duration-500`) over a constant border, not an
   instant background swap, so it's a real fade in both directions. The old hardcoded
   `current: true` flag/glow on the last item was removed — superseded by this.

**Verification note**: the in-session browser tool's `IntersectionObserver` only flushes
callbacks on certain paint ticks (confirmed via isolated test — a bare observer with zero
config didn't fire on `setTimeout`/`requestAnimationFrame` alone, but did fire once a
`computer{action:"screenshot"}` forced a paint). Got one clean confirming data point where the
DOM-geometry ground truth and the rendered dot state matched exactly, which validates the
logic, but couldn't get fully reliable continuous confirmation through this tool due to that
flushing quirk — it's a tooling artifact, not expected to affect real browsers (which composite
continuously during real scroll). **Ask the user to confirm this looks right in their own
browser** if it hasn't been double-checked yet.

## Real project content — 42 projects live (2026-09-02)

The 3 placeholder `.mdx` files are gone. `content/projects/` now holds **42 real projects**,
user-supplied (title, live URL, industry, a short internal note per project). This is the
actual, final project set for `/work` and the homepage's featured section — not a placeholder
pass.

- **Cover images**: user pre-supplied compressed JPGs in `public/projects/covers/`
  (`cvr-<name>.jpg`), one per project, already exactly matching all 42 by name — no orphans, no
  gaps. `thumbnail` in each `.mdx` points at its local file (`/projects/covers/cvr-*.jpg`), not
  a remote URL — see "Sort key" note below re: `next.config.ts`'s `picsum.photos` allowlist,
  which is now **only** needed for `/apps`'s demo-app placeholders, not `/work`.
- **Sort key changed from `order: number` to `dateAdded: number`** (`lib/definitions.ts`,
  `lib/projects.ts`). Format `YYYYMMDD`, sort key only, **never rendered client-side** —
  `getAllProjects()` sorts descending (`b.dateAdded - a.dateAdded`), most recent first. Chosen
  over a plain index specifically so a new project can be inserted anywhere later without
  renumbering the other 41. User gave an exact display order (42 companies) plus the two
  endpoint dates (`20251231` for the newest, `20190101` for the oldest); the 40 in between were
  spread evenly across that range by a one-off script, preserving the exact requested order.
- **Summaries**: every project's `summary` field is filled in with real, user-authored copy
  (2–3 sentences, ~20–30 words, no line-clamp — length is manually kept consistent rather than
  CSS-truncated). Two things caught and fixed during this pass, worth remembering as a pattern
  for any future copy batches:
  1. User's first draft had each summary starting with `"ProjectName: ..."` — redundant, since
     `project.title` already renders as its own heading directly above `project.summary` on the
     card. Stripped the leading name from every summary.
  2. One summary (West Shore Home) named a real client as difficult to work with, and another
     (Arry's Roofing) made a factually wrong claim ("before GSAP existed" — GSAP has existed
     since 2008). Both fixed per user's explicit "keep everything professional, no negativity
     toward any client" instruction — worth applying that filter to any future project copy too.
- **Two pre-existing title typos fixed** while cross-referencing the new data:
  `huitt-zollars.mdx` was `"Huitt Zolars"` → `"Huitt-Zollars"`; `aztech-international.mdx` was
  `"Aztech International"` → `"AzTech International"`.
- **Legal/NDA disclaimer added** above the `/work` grid (`project-filter-grid.tsx`): *"Live
  links reflect each site as it exists today — clients update and redesign independently, so a
  site may look different from when I worked on it."* Exists because these are live links to
  real client sites the user doesn't control.
- **`rel="nofollow"` added** to the "Visit Site" link (`project-card.tsx`, on top of the
  existing `noopener noreferrer`) — user wants no SEO/association linkage between the portfolio
  and these old client sites; `nofollow` is the correct link-level signal for that (`noindex`
  would be the page-level equivalent but doesn't apply here, since these aren't pages the user
  hosts).
- **Grid is 3-column** (`project-filter-grid.tsx`: `grid-cols-1 brm76:grid-cols-2
  brd12:grid-cols-3`, `gap-5`), changed from the original 2-column expanded-card layout now
  that real (shorter, consistent-length) summaries are in — card `aspect-[16/8]` image ratio
  unchanged.
- **Homepage featured section is curated, not auto-top-3**: `featured-cards.tsx`'s
  `FEATURED_SLUGS` is a hardcoded, ordered array (`["journyx", "traditional-medicinals",
  "enerfab"]`) that `.find()`s each slug out of `getAllProjects()`'s full result, then
  `.filter()`s out any `undefined` (defensive — protects against a future typo'd/renamed slug
  crashing the render, at the cost of that one card silently disappearing instead). The "View
  all N projects" link text also dropped its `+` — the count is exact now (42 real projects,
  not "42 or more").

## `codeSnippet` / `Dialog` feature removed (2026-09-02)

The "Featured Code" button + modal (described in "Card-only /work" above as the NDA-safe
alternative to linking real client repos) is now **fully removed**, not just unused:
`codeSnippet` deleted from `ProjectMetadata`, the `Dialog` import/markup deleted from
`project-card.tsx`, and `components/ui/dialog.tsx` itself deleted (nothing else referenced it —
regenerate via `npx shadcn@latest add dialog` if a future feature needs it).

**Why the reversal**: none of the 42 real projects ever had `codeSnippet` populated, so it was
dead code. User's actual plan going forward: keep pointing at their real GitHub profile
(already linked site-wide via `GITHUB_URL`), and put **generalized, non-client-specific**
code showcases there directly (e.g. "megamenu," "on-scroll text" as standalone examples) —
sidesteps the NDA issue entirely rather than solving it per-project. The original NDA reasoning
for *why* client code shouldn't be linked directly still stands and applies to this new
approach too (still no per-project client repo links) — only the *mechanism* changed. The
`/apps` demo-app "View Code in Repo" button (planned, not yet built) is unaffected — that's
100% the user's own IP, always was fine to link directly.

## Header nav bug fixed + `cn()` established as the conditional-class pattern (2026-09-02)

User was manually auditing files (see "Component philosophy" origin — same kind of pass) and
hand-edited `header-main.tsx`'s active-nav-link class logic to
`NAV_CLASSES + \`${isActive ? "..." : "..."}\`` — plain string concatenation with **no space**
between the two pieces. Real bug, confirmed via live DOM inspection: every nav link's class
attribute became one broken glued token
(`hover:text-accent-alt-300text-body-300`), so **no nav link ever got its
active/inactive color** — silently broken until caught. Fixed using `cn()` (`lib/utils.ts`,
clsx + tailwind-merge, already present from shadcn's init but under-used elsewhere in the app)
instead of manual concatenation: `cn(NAV_CLASSES, isActive ? "..." : "...")`. **This is now the
established pattern for any future conditional className logic in this codebase** — reach for
`cn()`, not `+`/template-literal concatenation, specifically because `cn()` can't produce this
class of bug (it always space-joins, plus resolves real Tailwind conflicts via tailwind-merge).

## Housekeeping (2026-09-02)

- Removed 3 unused `create-next-app` scaffold defaults from `/public`: `file.svg`, `globe.svg`,
  `window.svg` — confirmed zero references anywhere in the codebase before deleting.
- Removed 3 redundant `!mt-0` overrides (`featured-cards.tsx`, `cta-banner.tsx`,
  `values-grid.tsx`) and one redundant `mt-0` (`about-intro.tsx`'s h1) — all already handled by
  existing base rules in `globals.css` (`.super-header + h2` adjacency rule, and the heading
  base rule's `first:mt-0`), so removing them changed nothing visually. If a heading ever again
  seems to need a manual `mt-0`/`!mt-0` override, check whether it's actually already covered
  by one of those two rules before assuming it needs a fix.
- Consolidated `about-intro.tsx`'s 4 repeated `<p className="mb-8 max-w-200 text-base
  leading-relaxed text-body-300">` into a local `PARAGRAPH_CLASS` constant — matches the
  existing `ACTION_CLASS`/`PILL_CLASS` pattern already used elsewhere in the codebase. Decided
  against a global base `p { }` CSS rule (the user's own suggested approach) because most other
  `<p>` tags site-wide intentionally have zero margin by design (project cards, timeline items,
  values-grid) — a global rule would've required `mb-0` overrides scattered everywhere to
  counteract it, net negative.
- Favicon: user added `app/favicon.png` expecting it to work alongside `app/favicon.ico`, but
  Next.js's file-convention only recognizes PNG favicons under the name **`icon.png`**, not
  `favicon.png` — `favicon.png` wasn't being picked up at all. Told the user to rename it
  (not done via this session's tools — user handles renames themselves per their "don't edit
  code" ask on that thread); flagging here in case it's still pending.
- User asked about `prettier-plugin-tailwindcss` for auto-sorting Tailwind classes (wants the
  *sort order* only, explicitly not full-file Prettier reformatting). Recommended: install
  Prettier + the plugin, but run it manually/scoped (`npm run format` script or per-file, not
  format-on-save), with `.prettierrc.json`'s `tailwindStylesheet` pointed at `app/globals.css`
  (required for v4 to understand custom `--breakpoint-*` tokens like `brm76`/`brd12` when
  sorting). **Not yet installed** — this was guidance only, nothing added to the repo.

## Visual effects

- **Grid backdrop**: `.grid-bg` (in `app/globals.css`, rendered once in `app/layout.tsx`) is a
  fixed, faint blueprint-style grid line pattern behind all content, faded via a radial mask.
  Purely decorative, `aria-hidden`.
- **Scroll glow**: `components/effects/grid-glow.tsx` + `.grid-glow` in `globals.css`. A soft
  accent-colored band travels down the grid lines as the user scrolls, looping every
  viewport-height. It's driven entirely by a scroll listener setting a `--glow-y` CSS custom
  property (rAF-throttled) — never animates on its own. Two things make this accessible: (1)
  because it's 100% scroll-driven rather than auto-playing, it falls outside WCAG 2.2.2
  (Pause/Stop/Hide), which only applies to auto-starting motion lasting >5s; (2) the component
  no-ops entirely under `prefers-reduced-motion: reduce` (checked in JS, plus a CSS
  `display: none` fallback) — no motion happens at all for users with that OS preference set.
  Both `.grid-bg` and `.grid-glow` sit at `z-index: 0`; a global `section { position: relative;
  z-index: 1; }` rule (in `globals.css`) is what makes actual page content paint above them —
  any future section-level component should stay a `<section>` tag to inherit this for free.
  **Known gotcha (hit once already)**: anything that's a top-level page block but NOT a
  `<section>` tag — a plain `<div>`, or `<header>`/`<footer>` — does not get this treatment
  automatically and will show grid lines bleeding through it. `project-filter-grid.tsx`'s
  filter bar hit this when its `sticky` positioning (which incidentally also created a
  stacking context) was removed; fixed by making it a `<section>`. `footer-main.tsx` had the
  same latent bug (never a `<section>`) — fixed with explicit `relative z-[1]`. If a new
  top-level block ever shows a grid line through it, this is the first thing to check.
  **Fade at the scroll-cycle boundary (2026-08-29)**: the modulo loop (`scrollY % viewportHeight`)
  meant `--glow-y` snapped from ~viewport-height back to 0 the instant a cycle wrapped —
  visible as a sharp jump whenever that happened while the glow was on-screen. Fixed by having
  the same scroll handler also compute `--glow-fade` (0 near either edge of the cycle, ramping
  to 1 within a ~200px zone), and `.grid-glow`'s `opacity` is now `calc(0.55 * var(--glow-fade, 1))`
  instead of a flat `0.55`. The wrap now happens while fully invisible instead of mid-glow.

## No headshot on /about (deliberate)

User considered adding a photo (`public/profile-jd.jpg`, added but never wired up — still
sitting unused in `/public`, left alone rather than deleted in case it gets repurposed for
LinkedIn etc.) and asked for research on whether it's worth it for a US tech-hiring audience.
Findings: a controlled resume audit study (Ben-Gurion University, ~5,300 identical CVs) found
photos help attractive men (19.9% vs 9.2% callback) but *hurt* women (no-photo got 22% more
callbacks) — bias effect is real and unpredictable in direction. US EEOC explicitly warns
photos increase discrimination risk once an evaluator can infer gender/race/ethnicity. US/UK/
Canada/Australia hiring norms are photo-free (unlike Germany/Austria/Japan). Decision: removed
the photo column from `about-intro.tsx`, widened the bio text to fill the space. If this
project's audience ever shifts to a country where headshots are the norm, revisit.

## Card-only /work (2026-08-29) — deep case studies dropped

User doesn't have bandwidth to write real Overview/Challenge/Approach/Result content for
20-30+ projects, and asked for research on portfolio best practices before deciding what to
cut. Findings: multiple sources converge on **3-6 featured projects, 1-2 with a deep case
study** — beyond that, reviewers can't tell what matters, and "one well-documented full-stack
project beats ten todo apps." Bare picture+title cards are called out as under-informative,
but full prose per card is the other failure mode — the sweet spot is a short description +
context that signals what's behind a click, without requiring a click. This is what drove the
decision below, not just user preference.

Also surfaced a real legal consideration during this research: **publicly linking a client
project's GitHub repo without permission can violate an NDA**, not just etiquette — this is
why the code feature became an inline snippet (author's own excerpt, shown in a dialog) rather
than a repo link. Doesn't apply to the user's own demo apps (100% their own IP).

Resulting shape:
- **`/work/[slug]` deleted entirely**, not just unlinked — route, `case-study-hero`,
  `case-study-meta-sidebar`, `case-study-prevnext`, and the `ResultStrip`/`Gallery` MDX
  components. `CodePanel` also removed as a standalone component; its display logic now lives
  inline in `project-card.tsx` instead (single call site, no reason to keep it separate).
- **`ProjectCard`** (`components/sections/project-card.tsx`) is no longer a link to anything —
  it's a self-contained card: industry badge, title, description, then "Visit Site" (external-
  arrow icon, shows whenever `liveUrl` is set). **Update (2026-09-02): the "Featured Code"
  dialog described below was fully removed** — see "codeSnippet/Dialog removed" further down.
  This bullet's original code-snippet rationale is kept for history but no longer reflects the
  current build.
- **Tech-stack tags and the stack filter both removed** — most projects share a stack
  (WordPress/ACF), so tags weren't a useful differentiator and a filter on hidden data would
  feel disconnected from what's on the card. `stack: string[]` is kept in `ProjectMetadata` as
  data (not deleted) in case that changes later, just not rendered or filterable right now.
  `/work` filters by Industry only now.
- **`ProjectMetadata`** (`lib/definitions.ts`) dropped `role`/`client`/`timeframe`/`githubUrl`
  (only ever used by the now-deleted case-study sidebar) and gained `codeSnippet?: { filename,
  code }`. `lib/projects.ts` lost `getProjectBySlug`/`getAdjacentProjects` — `getAllProjects`
  is the only thing left, and is now a sequential loop instead of `Promise.all` (see bug note
  below — not related to the fix, just cleaned up while debugging it).
- All 3 placeholder `.mdx` files trimmed to metadata-only (no rendered body anymore). Harlow's
  real `gravity-forms-routing.php` snippet, previously embedded in its case-study body, is now
  its `codeSnippet` example.
- **`Dialog`** added (`npx shadcn@latest add dialog`, same Base UI foundation as `Sheet`) for
  the code-snippet popup. Proactively applied the same `data-closed:pointer-events-none` fix
  to it that `Sheet` needed (see "Mobile navigation" above) — added it *before* it ever shipped
  broken, since it's the identical bug class on the identical primitive family.

**Debugging note — not a real bug, but ate significant time**: after this change, `/work`
briefly rendered only 1 of 3 projects' `liveUrl`/`codeSnippet` correctly, even after edits,
`touch`, and hard browser reloads. Confirmed via raw `curl` (bypassing the browser entirely)
that the *server* was returning stale metadata for 2 of 3 `.mdx` files — a Turbopack dev-server
module-cache staleness issue with the dynamic `import(`@/content/projects/${slug}.mdx`)`
pattern in `lib/projects.ts`, after a very long-running dev session (same process since early
in this session). A full dev server restart (not a file edit, not a browser hard-reload) fixed
it immediately. **If `/work` or similar dynamic-MDX-import data ever looks stale/wrong again
despite the source file being correct, restart the dev server before assuming it's a code
bug.**

## Component philosophy: static content, not prop-driven, unless actually reused

Per user's explicit call: most sections on this site are used exactly once. Earlier passes
(esp. the original homepage scaffold) had gotten into a habit of passing content down as props
"in case" a component got reused later — `StatsRibbon`, `WordList`, and `DemoAppGrid` all took
`items`/`words`/`sectionHeader`/`apps` props despite each having exactly one call site. That's
now cleaned up: content lives as a local const *inside* the component file (matching the
pattern `HeroHome`, `Timeline`, `Toolbox`, `ValuesGrid`, `Content5050Grid` already followed).

**Kept as props, deliberately** — these are genuinely reused or genuinely per-instance data,
not just "might be reused someday":
- `CtaBanner` — 2 real call sites (`/` and `/about`) with different copy/links.
- `PageHero` — 2 real call sites (`/work` and `/apps`).
- `ProjectCard` — parameterized by *which* project (real data), used on both `/work` and the
  homepage's featured section.
- `ProjectFilterGrid` — receives real content-collection data from `lib/projects.ts`.

`DEMO_APPS` moved into `demo-app-grid.tsx` itself but stays a named export, since
`app/apps/page.tsx` needs its `.length` for the "N apps planned" status line — single source
of truth without re-introducing a content prop for the grid itself.

Also removed `SectionHeader` (in `lib/definitions.ts`) — it was only ever used by the old
prop-driven `WordList`, now fully dead. And fixed `word-list.tsx`'s dead `#fixlink` placeholder
href to point to `/about`, since that's where the tech-stack story actually continues.

**Resume/GitHub/LinkedIn URLs now come from `lib/nav.ts`'s `RESUME_HREF`/`GITHUB_URL`/
`LINKEDIN_URL` everywhere** (header, footer, homepage hero, `cta-banner`, `/about`), not
hardcoded per-file. This was a real drift bug already happening in practice — the résumé
filename changed twice during this project, and files not yet wired to the shared constant
were quietly serving a stale link until caught.

## Decisions made so far

- Progress/orientation file lives at `docs/PROGRESS.md` (this file), auto-loaded every
  session via `@docs/PROGRESS.md` in root `CLAUDE.md`.
- `case-study.html` was intentionally deleted by the user; `case-study2.html` is the only
  case study template to build from.
- Priority order for the 1-week push: **Work → Case study → About → Demo Apps landing.**
  Header/footer polish and `/resume` are not yet scheduled.
- **`/work` broke from the homepage's "structure-only" pattern** — it's fully styled with
  Tailwind + real shadcn primitives, since the deadline is close. Later pages should probably
  follow this same approach (ask if unsure) rather than the unstyled placeholder pattern used
  on the homepage — that earlier pattern may get revisited/styled to match.
- **Content architecture: MDX, not JSON/a headless CMS.** One file per project at
  `content/projects/<slug>.mdx`. Structured fields (title, industry, stack, dateAdded,
  thumbnail, etc.) live in `export const metadata = {...}` inside the file — this is Next.js's
  own documented pattern (`@next/mdx` doesn't parse YAML frontmatter by default), not a
  third-party convention. Adding a project = duplicate a file, edit the fields. Ordering is
  controlled by `dateAdded: number` (`YYYYMMDD`, descending — see "Real project content" above,
  this superseded the original `order: number` field). The MDX *body* is no longer rendered
  anywhere (see "Card-only /work" above) — files are metadata-only now. **42 real projects are
  live now, not placeholders** — see "Real project content — 42 projects live" above.
- Full `ProjectMetadata` schema lives in `lib/definitions.ts`. `INDUSTRIES` there is the fixed,
  confirmed-accurate filter list.
- **shadcn is the primitive layer, going forward.** It's already configured in this repo
  (`components.json`, `@base-ui/react`). Added `Badge` and `Toggle`/`ToggleGroup` via
  `npx shadcn@latest add` for `/work`'s tags and filter pills. Rule of thumb: use shadcn for
  interactive primitives (buttons, toggles, dialogs, etc.), hand-build the page-specific
  composed sections (hero, grids, cards) styled with the custom color tokens in `globals.css`.
- `/work`'s filter logic (in `components/sections/project-filter-grid.tsx`): industry only,
  single-select (`[]` = "All"). The stack multi-select filter was removed along with the
  tech-stack tags on cards (see "Card-only /work" above).
- `next.config.ts` wraps the config with `@next/mdx`'s `createMDX()`. The `picsum.photos`
  allowlist under `images.remotePatterns` is **still needed** — not for `/work` anymore (all 42
  real projects use local `/projects/covers/*.jpg` thumbnails now), but `/apps`'s demo-app
  placeholder thumbnails (`demo-app-grid.tsx`, `content-5050-grid.tsx`) still use
  `picsum.photos`. Remove the allowlist once those get real screenshots too.
- `.claude/launch.json` was created so the dev server can be previewed in-session
  (`pnpm dev`, port 3000).

## TODO (not urgent, revisit later)

- **Add `zod` validation for project content.** `lib/projects.ts` currently trusts each
  `.mdx` file's `metadata` export as-is — a typo'd field name (e.g. `indsutry`) fails silently
  instead of erroring at build time. Now more relevant than before since there are 42 real
  files to typo across, not 3. Add a `zod` schema (mirroring `ProjectMetadata` in
  `lib/definitions.ts`) and `.parse()` each project's metadata in `getAllProjects()`, so bad
  content fails loudly with a clear message.
- **Swap `/apps`'s remaining `picsum.photos` placeholder images for real ones** (`/work`'s 42
  projects already use real local thumbnails — this TODO now only applies to the demo-app
  placeholders in `demo-app-grid.tsx` and `content-5050-grid.tsx`), using static `import`
  (local file in `/public`) instead of remote URLs + manual `fill`/`sizes` — gets automatic
  width/height + blur placeholder from Next for free. Blocked on the demo apps actually being
  built first.
- **Favicon**: user has both `app/favicon.ico` and `app/favicon.png` — the `.png` one needs to
  be renamed to `app/icon.png` to actually be picked up by Next's file-convention (`favicon.png`
  isn't a recognized name). Unconfirmed whether user has done this yet.
- **Optional**: install `prettier` + `prettier-plugin-tailwindcss` for class-order auto-sorting
  if the user decides they want it — guidance already given (see "Housekeeping" above), not
  installed yet, entirely the user's call on timing.

## Open questions (ask the user before deciding)

- 404 page: in scope for this pass or later?
- Header/footer: styled now, or after the priority pages are done? (Given `/work` is now
  fully styled, probably worth doing header/footer sooner rather than later.)
## Next step

Homepage, `/work`, `/about`, header, and footer are all done, fully styled, and — as of
2026-09-02 — `/work` is running on its **real, final 42-project data set** (not placeholders):
real summaries, real cover images, real `liveUrl`s, user-curated homepage-featured order. See
"Real project content — 42 projects live" above for full detail. `/work/[slug]` (deep case
studies) remains deliberately removed — see "Card-only /work" above. The `codeSnippet`/`Dialog`
"Featured Code" feature that section originally described has since been fully removed too —
see "`codeSnippet` / `Dialog` feature removed" above.

Also as of this session: the user has been doing their own manual audit pass through the
codebase (their own WordPress-to-Next.js learning exercise, largely Q&A-driven — hooks,
`next/image`'s `sizes` prop, `cn()`/clsx/tailwind-merge, Base UI's `render` prop, Tailwind class
formatting/sort order, favicon file conventions, etc.) alongside small real fixes that came out
of it (the header nav `cn()` bug, scaffold SVG cleanup, redundant `!mt-0` removal). Expect more
of this pattern in future sessions — the user is deliberately reading through files section by
section to build understanding before making further changes, not just requesting features.

What's left, roughly in order of what a job-application deadline would care about:
- `/apps` (Demo Apps landing) — priority, not yet started beyond the landing page. Reference:
  `demo-apps2.html`. Still uses `picsum.photos` placeholders for all 4 apps.
- Favicon: confirm `app/favicon.png` → `app/icon.png` rename happened (see TODO above).
- `/resume`, 404 page — still unscoped (see Open questions below — these predate this session
  and remain unanswered).

Known simplifications to revisit later:
- ~~`components/mdx/code-panel.tsx` renders code as plain monospace text, no syntax
  highlighting~~ — **no longer applicable, file doesn't exist** (confirmed via grep,
  2026-09-02). It was already removed along with the rest of the case-study machinery (see
  "Card-only /work" above); this stale note is left struck through rather than silently
  deleted, in case it resurfaces as a real file again later.
- `lucide-react` (installed, v1.32) dropped brand/logo icons in this major version — GitHub
  and LinkedIn icons are hand-kept as inline SVGs in `components/icons.tsx` instead.
- shadcn's `Button` component (`components/ui/button.tsx`) is currently only used internally by
  `Sheet`'s close button — not used anywhere for the app's own link-styled buttons
  (`cta-banner.tsx`, `header-main.tsx`, `project-card.tsx`, `footer-main.tsx` all hand-roll
  their own `<a>`/`<Link>` className strings instead). It could replace those via Base UI's
  `render` prop (`<Button render={<a href="..." />}>`) for a single source of truth on button
  styling — user said "disregard for now, will use this later," so this is a known deferred
  idea, not a bug.
- See the TODO section above for the `zod` validation, remaining real-image, and Prettier tasks.
