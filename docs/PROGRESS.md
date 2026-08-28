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
| `/` (home) | `homepage2.html` | ✅ Done (fully styled) | hero-home, stats-ribbon, word-list, content-5050-grid, cta-banner all restyled to match `/work`'s approach. `featured-cards` now pulls real data from `getAllProjects()` (top 3) and reuses `ProjectCard` — no more hardcoded placeholder cards, single source of truth with `/work`. Header/footer (`components/globals/`) also styled — was blocking, since an unstyled header above a styled page looked broken. |
| `/work` | `work2.html` | ✅ Done (fully styled + working filters) | `page-hero` (reusable), `project-filter-grid` (client component, industry single-select + tech-stack multi-select), `project-card`. Data-driven from `content/projects/*.mdx` via `lib/projects.ts` |
| `/work/[slug]` | `case-study2.html` | ✅ Done (fully styled + working) | Dynamic route in `app/work/[slug]/page.tsx`. Breadcrumb + hero + meta sidebar are components; the write-up itself is the project's MDX body, with `<ResultStrip>`, `<CodePanel>`, `<Gallery>` (in `components/mdx/`) embedded inline for the stats/code/screenshots blocks. Prev/next nav is computed from project `order`. All 3 placeholder projects have real case-study content (Harlow matches the reference 1:1; Pivot/Summit are lightly stubbed). |
| `/about` | `about2.html` | ✅ Done (fully styled) | `about-intro` (full-width bio, no photo — deliberate, see Decisions), `timeline` (career history, `current` item highlighted), `toolbox` (4-column tool lists), `values-grid` (3 principle cards), reuses `cta-banner` with custom copy/links. |
| `/apps` | `demo-apps2.html` | ✅ Started (landing only) | `page-hero` (now accepts a `children` slot for the status line) + `demo-app-grid`. All 4 apps are placeholder/`planned` status — honestly labeled "not started yet" rather than the reference mockup's fictional "2 live, 2 in progress" copy. Real routes (`/apps/food-tracker`, `/apps/film-blog`, etc.) are separate future work once those apps actually get built. |
| `/resume` | — | ✅ Resolved: PDF, not a page | No `/resume` route exists or is needed. Header, footer, and homepage hero all link directly to `/resume.pdf` (with a `download` attribute) instead of a Next.js route. **The actual PDF file still needs to be added to `/public/resume.pdf`** — until then these links 404. |
| 404 | `404.html` | ❓ Unscoped | Not yet prioritized |
| `components/globals/header-main.tsx` | — | 🔲 Stub | Placeholder logo/nav, not styled |
| `components/globals/footer-main.tsx` | — | 🔲 Stub | Placeholder only |

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
- `ProjectCard`, `CaseStudyHero`/`MetaSidebar`/`PrevNext` — parameterized by *which* project,
  not configuration; the "one call site" is a dynamic route that renders different data each
  time, which is a different thing from a single hardcoded static page.
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
  `content/projects/<slug>.mdx`. Structured fields (title, industry, stack, order, thumbnail,
  etc.) live in `export const metadata = {...}` inside the file — this is Next.js's own
  documented pattern (`@next/mdx` doesn't parse YAML frontmatter by default), not a
  third-party convention. The MDX body is reserved for long-form case-study prose later.
  Adding a project = duplicate a file, edit the fields. Ordering is controlled by an explicit
  `order: number` field, sorted in `lib/projects.ts`.
- Full `ProjectMetadata` schema (incl. fields reserved for the case-study page) lives in
  `lib/definitions.ts`. `INDUSTRIES` there is the fixed, confirmed-accurate filter list.
- **shadcn is the primitive layer, going forward.** It's already configured in this repo
  (`components.json`, `@base-ui/react`). Added `Badge` and `Toggle`/`ToggleGroup` via
  `npx shadcn@latest add` for `/work`'s tags and filter pills. Rule of thumb: use shadcn for
  interactive primitives (buttons, toggles, dialogs, etc.), hand-build the page-specific
  composed sections (hero, grids, cards) styled with the custom color tokens in `globals.css`.
- `/work`'s filter logic (in `components/sections/project-filter-grid.tsx`): industry is
  single-select (`[]` = "All"); tech stack is multi-select, OR logic (project shown if it has
  *any* selected tag) — this OR-logic choice was an implementation default, not explicitly
  confirmed with the user; revisit if it feels wrong once real projects are in.
- `next.config.ts` now wraps the config with `@next/mdx`'s `createMDX()` and allowlists
  `picsum.photos` under `images.remotePatterns` — that allowlist should be removed once real
  project thumbnails move to local files in `/public`.
- `.claude/launch.json` was created so the dev server can be previewed in-session
  (`pnpm dev`, port 3000).

## TODO (not urgent, revisit later)

- **Add `zod` validation for project content.** `lib/projects.ts` currently trusts each
  `.mdx` file's `metadata` export as-is — a typo'd field name (e.g. `indsutry`) fails silently
  instead of erroring at build time. Add a `zod` schema (mirroring `ProjectMetadata` in
  `lib/definitions.ts`) and `.parse()` each project's metadata when reading it in
  `getAllProjects()` / `getProjectBySlug()`, so bad content fails loudly with a clear message.
- **Swap placeholder `picsum.photos` images for real ones**, using static `import` (local file
  in `/public` or colocated with the project's `.mdx`) instead of remote URLs + manual
  `fill`/`sizes` — gets automatic width/height + blur placeholder from Next for free.

## Open questions (ask the user before deciding)

- 404 page: in scope for this pass or later?
- Header/footer: styled now, or after the priority pages are done? (Given `/work` is now
  fully styled, probably worth doing header/footer sooner rather than later.)
- Case study projects: how many real case studies, and what content/screenshots go in them?
- Should the homepage (`app/page.tsx` + its section components) be restyled to match `/work`'s
  fully-styled approach, or left as-is until a dedicated pass?
- Confirm the tech-stack multi-select filter's OR logic (see Decisions above) feels right once
  real projects exist — may want AND logic instead.

## Next step

Homepage, `/work`, `/work/[slug]`, and `/about` are all done and fully styled — that's every
page in the original priority order. Real project content still needs to replace the 3
placeholder `.mdx` files in `content/projects/` (see Content architecture above for the field
shape; each file now also has a full case-study body to use as a template).

What's left, roughly in order of what a job-application deadline would care about:
- Real content pass: swap placeholder projects, portrait photo, and stock thumbnails for the
  real thing.
- `/apps` (Demo Apps landing) — priority 4, not yet started. Reference: `demo-apps2.html`.
- `/resume`, 404 page — still unscoped (see Open questions).

Known simplifications to revisit later:
- `components/mdx/code-panel.tsx` renders code as plain monospace text — no syntax
  highlighting (the reference HTML had it hardcoded manually). Would need a library like
  `rehype-pretty-code` to do properly.
- `lucide-react` (installed, v1.32) dropped brand/logo icons in this major version — GitHub
  and LinkedIn icons are hand-kept as inline SVGs in `components/icons.tsx` instead.
- See the TODO section above for the `zod` validation and real-image tasks.
