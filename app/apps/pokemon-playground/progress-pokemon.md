# Pokémon Playground — Progress & Planning

Read this file first when resuming work on this app. Companion to the root
`docs/PROGRESS.md` (tracks the whole portfolio site) — this one tracks just
this app's build.

Demo app for jdlarrea.com portfolio. Small square canvas/DOM area where a character walks around a scene, can enter a house to sleep, walk through grass or fish at a lake for random Pokémon encounters using PokeAPI data.

## Stack decisions

- **Framework: Next.js, not Vite.** This app was originally scoped as a standalone Vite + React project in an earlier planning chat, before this portfolio's `/apps` routing was designed. That's since been superseded — **corrected 2026-09-04**: it lives at `app/apps/pokemon-playground/page.tsx` (`"use client"`) inside the main portfolio's Next.js app, deployed together on Vercel, not as a separate project. Colocated components/helpers go in `app/apps/pokemon-playground/_components/` and `_lib/` (underscore prefix opts a folder out of Next's App Router route-scanning — see root `docs/PROGRESS.md`'s app-components discussion for why).
- **Shell:** `app/apps/layout.tsx` already provides the logo + floating "back to main site" button for every app under `/apps/*` — this page doesn't need to build any of that itself.
- **Theme: light, not this site's dark theme.** The main portfolio is always-dark via a `dark` class scoped to `(main-site)`; `/apps` deliberately omits it, so shadcn's default *light* tokens apply. Build this app's UI with the generic shadcn semantic classes (`bg-background`, `text-foreground`, `border-border`, `bg-card`, etc.) or plain Tailwind — **not** this site's dark-hardcoded custom tokens (`bg-dark-*`, `body-*`, `accent-*`, `bdr-*`), which aren't theme-reactive and will look wrong on a light background.
- **Rendering:** DOM + CSS transforms, not `<canvas>`. Zones/character are positioned `<div>`s using `transform: translate()`, positions stored as **percentages** of container size (not px) so the layout scales cleanly.
- **Container:** `aspect-square`, `max-width` constrained, resizes responsively, stays square at all viewport widths.
- **Data source:** PokeAPI (no auth/key needed for basic sprite + species data).
- **State management:** Plain React state/refs for now — no external state library needed at this scale.
- **Persistence:** None yet. `localStorage` is the likely eventual choice for the caught-Pokémon list — no artifact-prototype caveat needed anymore, since this is being built directly in the real codebase rather than prototyped in Claude-chat artifacts.
- **Scaling system (added 2026-09-08):** the whole scene is designed against a fixed **640px reference canvas** (`SIZE_CANVAS` in `_lib/utils.ts`) — chosen as a clean multiple of 16px (40 tiles), matching the pixel-art assets' native tile size. `.canvas-main` is `max-w-160` (640px). Every sprite/zone's `%` size is derived from its **native pixel size ÷ 640** via the `spriteSize(px)` helper (`_lib/utils.ts`), not hand-picked round percentages — this is what keeps a sprite's visual footprint and its (future) collision hitbox scaling together consistently at any screen width, instead of drifting apart. Decorative-only sprites (no hitbox) are free to ignore this and use whatever px size looks good. See `docs/PROGRESS.md` for the fuller reasoning trail (percentage-vs-fixed-grid discussion) if this needs re-deriving later.

## Core mechanics (from planning discussion)

- **Movement — implemented 2026-09-08:** Keyboard (`keydown`/`keyup`) + on-screen D-pad buttons (`onPointerDown`/`onPointerUp`/`onPointerLeave`/`onPointerCancel`, covering both mouse and touch via the Pointer Events API) both call the same shared `startMoving`/`stopMoving` functions, which add/remove from one `Set<Direction>` (held in a `useRef`, not state — membership changes shouldn't themselves cause a re-render). A `requestAnimationFrame` game loop (`tick()`, self-rescheduling every frame) reads that Set each frame and resolves it down to **exactly one** active direction — the most recently pressed one that's still held, taken via `[...activeDirections.current].at(-1)` (Sets iterate in insertion order) — rather than summing every held direction's delta. **This was a deliberate decision, not an oversight:** summing deltas allowed diagonal movement, which doesn't fit this game's 4-direction sprite/facing model. Resolving to a single direction this way also naturally falls back to a second still-held direction when the primary one is released, with no extra bookkeeping. `MOVE_SPEED` (currently `0.1`, in `character.tsx`) is the per-frame `%` step — tune by feel, not by formula.
- **Zones:** Data-driven array (`Zone[]`) with `type: "house" | "grass" | "lake" | "tree"`, each with `x/y/width/height` in %. Collision = simple rectangle-overlap check.
- **Tree:** Solid obstacle. Movement into a tree zone is blocked before the position updates. **Not built yet** — no `Zone[]`/collision system exists as of 2026-09-08, just the movement system above. **Bump-reaction design, decided 2026-09-08 (not yet implemented):** on collision, show a "!" above the character's head for ~1s, and require the player to fully release + re-press the direction to move again — not a timed "stunned" freeze that clears on its own regardless of input. Chosen deliberately over a timer-based stun: it needs no `setTimeout`/countdown state at all (just call `stopMoving(direction)` immediately on collision), and it mildly discourages repeatedly bumping into obstacles on purpose without fully blocking a player who wants to. Two implementation notes for whoever builds this: (1) for **keyboard**, the browser's own key-repeat will keep firing `keydown` for a still-held key even without a real release — guard with `if (e.repeat) return;` in `handleKeyDown`, otherwise the direction silently re-enters the Set on the very next repeat event. (2) For **buttons**, this isn't an issue — `onPointerDown` only fires once per physical press, with no repeat-firing equivalent. This same "movement forced off" mechanism is also expected to double as how the house dialog and encounter dialog freeze the character later — worth building it generically now rather than as a tree-only special case.
- **House / Sleep-Wake:** `gameState: "exploring" | "sleeping"` state machine.
  - Character walks into house zone → "Go to sleep?" prompt.
  - Confirm → dark overlay covers scene, character disappears, only "Wake up" control available. All movement/input disabled while sleeping.
  - Wake → overlay clears, character reappears just outside the house door, state returns to `"exploring"`.
- **Grass encounters:** Rolled probabilistically (e.g. ~10%, tunable) on movement/steps while standing in a grass zone. On hit, pick a random Pokémon ID from a grass-pool list, fetch from PokeAPI, open encounter dialog.
- **Lake encounters ("fishing"):** Not automatic on proximity — triggered by an explicit "Go fishing" button while in/near the lake zone. Same encounter dialog, different (water) Pokémon pool.
- **Encounter dialog:** Text-based. Options: "Try to catch" / "Leave the Pokémon in peace." Catch = random number vs. threshold. Success → add to caught list. Fail → Pokémon flees, dialog closes.
- **Caught Pokémon list:** Running list in state (later: persisted). Info button/panel to view details on caught Pokémon (pulled from API data already fetched).
- **Future/stretch ideas (not in scope yet):** Pokémon storage system, a "playground" area to let caught Pokémon interact/play, other limits/rules TBD.

## Character sprite & animation (implemented 2026-09-08)

`character.tsx` renders the character via the CSS sprite-sheet technique (fixed-size box, `background-image` + `background-size` + `background-position`), not `next/image` per-frame swapping — needed because these are animated multi-frame sheets, not standalone images.

- **Assets:** `_assets/character/char-still.png` (48×16px = 3 frames of 16×16 — down, up, left) and `char-motion.png` (96×16px = 6 frames of 16×16 — down×2, up×2, left×2, each pair a foot-alternation walk cycle). **There is no "right" art at all** — economy trick, mirrored from "left" via `transform: scaleX(-1)`.
- **`DIRECTION_SPRITES`** (in `character.tsx`) is the direction → frame-index lookup, built by slicing the sheets apart and inspecting each frame. The drawn pose faces **right** (not left, as an earlier pass of this doc incorrectly guessed from the sliced-frame images) — `left` is the one that mirrors it via `flip: true`. Current code (`left: {..., flip: true}`, `right: {...}` unflipped) is correct as-is — no bug here.
- **Display size:** fixed `32px` box (`size-8`) — a deliberate 2× scale-up from the 16px native art (chosen over the `spriteSize()`-derived world-scaling used for zones, since the character doesn't need a collision-matched footprint the way a tree would) — `image-rendering: pixelated` keeps the 2× upscale crisp rather than browser-smoothed.
- **Walk-cycle timing:** `walkFrameCounter` (a `useRef`, pure tick-tally, no re-render needed) climbs every frame while moving; every `WALK_FRAME_INTERVAL` (currently `8`) ticks, it resets and flips `walkFrameIndex` (state, `0`/`1`) between the two frames in the current direction's `walk` pair. Resets to `0` the instant movement stops, so a later walk cycle always restarts clean rather than resuming mid-count.
- **Facing persistence:** `facingDirection` (state, defaults to `"down"`) only updates while a direction is actually active — never reset to "nothing" on release — so an idle character keeps facing whichever way it last walked, matching the genre convention, instead of reverting to some default look.

## Build order

- [x] 1. Static scene — house, tree, grass patch, lake positioned as % zones, no movement yet. (`area-lake.tsx`, `area-grass.tsx`, `area-house.tsx`, `terrain-objects.tsx` — all colocated under `_components/`.)
- [x] 2. Character movement, keyboard — **done, but built together with step 3 as one unified continuous system, not staged separately as originally written.** Tree collision blocking is **not** done — see "Tree" under Core mechanics above for the bump-reaction design decided but not yet built.
- [x] 3. On-screen D-pad buttons wired to the same movement function as keyboard — done (see "Movement" under Core mechanics above).
- [x] (unplanned, inserted here) Character sprite + walk-cycle animation, replacing the flat-color placeholder box — see "Character sprite & animation" above. Wasn't in the original numbered list; came up naturally once movement worked and needed to feel real.
- [ ] 4. House zone → sleep/wake state machine (visual + state only, no API yet)
- [ ] 5. Grass zone → encounter roll → dialog UI with **hardcoded fake Pokémon** (validate UI/state flow before adding API calls)
- [ ] 6. Swap hardcoded Pokémon for real PokeAPI fetch in the encounter flow
- [ ] 7. Lake "Go fishing" button, reusing the encounter dialog component from step 5/6
- [ ] 8. Catch/flee logic with random threshold + running caught-Pokémon list in state
- [ ] 9. Info panel/button to view details on caught Pokémon
- [ ] 10. (Stretch) Persistence of caught list (`localStorage`, real project only)
- [ ] 11. (Stretch) Storage system / "playground" interaction area

## Tunable parameters (adjust as we playtest)

| Parameter | Current value | Notes |
|---|---|---|
| Grass encounter chance | ~10% per step | Tune up/down based on how frequent it feels |
| Catch success threshold | TBD | Needs a formula — flat chance vs. per-Pokémon rarity weighting? |
| Character move speed | `MOVE_SPEED = 0.1` (`%`/frame) | Resolved 2026-09-08 — continuous, driven by the `requestAnimationFrame` loop, not per-keypress. Tune by feel. |
| Walk-cycle foot-swap rate | `WALK_FRAME_INTERVAL = 8` (ticks) | ~7–8 swaps/sec at 60fps. Tune by feel. |
| Encounter check frequency (grass) | Every step | Consider throttling if it fires too often |

## Open questions / decisions to revisit

- ~~Continuous movement (hold key = keep moving) vs. discrete step-based movement?~~ **Decided 2026-09-04: continuous.** Board is small, so speed variation isn't a big concern.
- Should grass encounter checks fire every render step, or only on discrete "tile" boundaries? (Still open — worth revisiting now that movement is continuous, not step-based.)
- Catch-rate formula: flat percentage, or vary by Pokémon (rarer = harder to catch, like real games)?
- ~~Where do grass-pool / water-pool Pokémon ID lists live?~~ **Decided 2026-09-04: hardcoded ID arrays**, curated per zone type. Possible future zone: a "cloud" region stocked with flying types — later phase, not in the current build order.
- ~~Sprite source: static vs. animated?~~ **Decided 2026-09-04: neither yet** — use a plain black square placeholder for all encounter sprites until the rest of the mechanics work, then swap in real sprite images later.

## Session log

_(Use this section with Claude Code to log what changed each session — new features, parameter tweaks, bugs fixed, scope changes.)_

- **2026-09-02 (approx.)** — Initial planning session (separate Claude chat, pre-dates this repo's `/apps` routing work). Architecture, mechanics, and build order defined above, originally scoped as a standalone Vite + React project.
- **2026-09-04** — Corrected stack assumptions to match this session's actual `/apps` architecture: Next.js page (not Vite), light theme (not this site's dark theme), colocated under `app/apps/pokemon-playground/`. Resolved 3 of the 5 open questions: continuous movement, hardcoded encounter pools (with a possible future flying-type "cloud" zone), and black-square placeholder sprites until real images get added. This file is now auto-loaded into every Claude Code session on this repo (see root `CLAUDE.md`). User is building the app themselves (learning exercise) — no application code written yet, planning/doc work only.
- **2026-09-08** — First real application code, mostly hand-typed by the user (learning exercise) with direction/review from Claude Code rather than Claude writing most of it. In one extended session:
  - Built out the static scene fully: `area-lake.tsx`, `area-grass.tsx`, `area-house.tsx`, `terrain-objects.tsx` (shrubs/trees), all under `_components/`. Established the `spriteSize()`/640px-reference scaling convention (`_lib/utils.ts`) — see "Scaling system" under Stack decisions above.
  - Built the full movement system: keyboard + D-pad buttons unified via a shared `Set`-based active-directions model and a `requestAnimationFrame` game loop — see "Movement" under Core mechanics above. Deliberately resolves to a single active direction (no diagonal movement).
  - Replaced the placeholder box with a real animated character sprite — directional facing, 2-frame walk-cycle per direction, sourced from `char-still.png`/`char-motion.png` via the CSS background-position sprite-sheet technique. See "Character sprite & animation" above.
  - Decided (not yet built) the tree-collision bump reaction: "!" + forced release-and-re-press, not a timed stun — see "Tree" under Core mechanics above.
  - Hit and resolved several real bugs along the way, useful to remember as patterns: Tailwind can't process dynamically-interpolated arbitrary-value classes (`top-[${x}%]` silently generates no CSS at all — this bit both a shrub-placement pass and the lake grid; fix is always inline `style`, not a template-literal class); a stale-closure bug avoided by using the `setState` updater-function form inside a `useEffect` with `[]`; and a case where Next's dev server (Fast Refresh) kept running old effect code after an edit, requiring a real reload — same category as the already-documented Turbopack cache-staleness issue, but a different specific cause (Fast Refresh doesn't re-run already-fired effects on a hot-swap).
  - Also mid-session: migrated the whole portfolio (not just this app) from a hand-rolled `cn()` in `lib/utils.ts` to importing the `cn` package directly everywhere, after discovering the shadcn CLI itself had started doing that for newly-added components. `lib/utils.ts`, `clsx`, and `tailwind-merge` were all removed as a result. **This part is logged in root `docs/PROGRESS.md`, not here**, since it affects the whole site, not just this app.
