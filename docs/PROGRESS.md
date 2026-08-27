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
| `/about` | `about2.html` | ✅ Done (fully styled) | `about-intro` (photo + bio split), `timeline` (career history, `current` item highlighted), `toolbox` (4-column tool lists), `values-grid` (3 principle cards), reuses `cta-banner` with custom copy/links. Portrait photo is a `picsum.photos` placeholder — swap for a real headshot later. |
| `/apps` | `demo-apps2.html` | ✅ Started (landing only) | `page-hero` (now accepts a `children` slot for the status line) + `demo-app-grid`. All 4 apps are placeholder/`planned` status — honestly labeled "not started yet" rather than the reference mockup's fictional "2 live, 2 in progress" copy. Real routes (`/apps/food-tracker`, `/apps/film-blog`, etc.) are separate future work once those apps actually get built. |
| `/resume` | — | ✅ Resolved: PDF, not a page | No `/resume` route exists or is needed. Header, footer, and homepage hero all link directly to `/resume.pdf` (with a `download` attribute) instead of a Next.js route. **The actual PDF file still needs to be added to `/public/resume.pdf`** — until then these links 404. |
| 404 | `404.html` | ❓ Unscoped | Not yet prioritized |
| `components/globals/header-main.tsx` | — | 🔲 Stub | Placeholder logo/nav, not styled |
| `components/globals/footer-main.tsx` | — | 🔲 Stub | Placeholder only |

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
