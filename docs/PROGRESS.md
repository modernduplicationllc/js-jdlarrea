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
| `/` (home) | `homepage2.html` | ✅ Done (unstyled structure pass) | All sections converted: hero-home, stats-ribbon, featured-cards, word-list, content-5050-grid, cta-banner |
| `/work` | `work2.html` | ✅ Done (fully styled + working filters) | `page-hero` (reusable), `project-filter-grid` (client component, industry single-select + tech-stack multi-select), `project-card`. Data-driven from `content/projects/*.mdx` via `lib/projects.ts` |
| `/work/[slug]` | `case-study2.html` | ⏳ Priority 2 | Single case study template: crumb nav, case-hero, meta block, result-strip stats, code-panel, gallery, prevnext nav. (`case-study.html` was deleted by user — `case-study2.html` is the source of truth.) |
| `/about` | `about2.html` | ⏳ Priority 3 | intro (photo + text), timeline-section (tl-item entries), toolbox (tool-cols) |
| `/apps` | `demo-apps2.html` | ⏳ Priority 4 (landing only) | page-hero + demo-grid of demo-card. This is just the landing/index page — the actual demo apps (`/apps/food-tracker`, `/apps/film-blog`, etc.) are separate future work, not part of this pass |
| `/resume` | none yet | ❓ Unscoped | Linked from header nav (`components/globals/header-main.tsx`) but no reference file or decision yet on whether it's a page, a PDF link, or something else — ask before building |
| 404 | `404.html` | ❓ Unscoped | Not yet prioritized |
| `components/globals/header-main.tsx` | — | 🔲 Stub | Placeholder logo/nav, not styled |
| `components/globals/footer-main.tsx` | — | 🔲 Stub | Placeholder only |

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

## Open questions (ask the user before deciding)

- `/resume`: real page, PDF download link, or external link?
- 404 page: in scope for this pass or later?
- Header/footer: styled now, or after the priority pages are done? (Given `/work` is now
  fully styled, probably worth doing header/footer sooner rather than later.)
- Case study projects: how many real case studies, and what content/screenshots go in them?
- Should the homepage (`app/page.tsx` + its section components) be restyled to match `/work`'s
  fully-styled approach, or left as-is until a dedicated pass?
- Confirm the tech-stack multi-select filter's OR logic (see Decisions above) feels right once
  real projects exist — may want AND logic instead.

## Next step

`/work` is done — real project content still needs to replace the 3 placeholder `.mdx` files
in `content/projects/` (see Content architecture above for the field shape). After that:
convert `.reference/case-study2.html` → `/work/[slug]` dynamic route, reusing
`getProjectBySlug()` from `lib/projects.ts` (already built, untested — reads the MDX body via
the `Content` component it returns).
