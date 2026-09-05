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

## Core mechanics (from planning discussion)

- **Movement:** Keyboard (`keydown`/`keyup`, tracked as a `Set` of pressed keys) + on-screen D-pad buttons for click/touch — both feed the same movement-intent logic, not duplicated per input type.
- **Zones:** Data-driven array (`Zone[]`) with `type: "house" | "grass" | "lake" | "tree"`, each with `x/y/width/height` in %. Collision = simple rectangle-overlap check.
- **Tree:** Solid obstacle. Movement into a tree zone is blocked before the position updates.
- **House / Sleep-Wake:** `gameState: "exploring" | "sleeping"` state machine.
  - Character walks into house zone → "Go to sleep?" prompt.
  - Confirm → dark overlay covers scene, character disappears, only "Wake up" control available. All movement/input disabled while sleeping.
  - Wake → overlay clears, character reappears just outside the house door, state returns to `"exploring"`.
- **Grass encounters:** Rolled probabilistically (e.g. ~10%, tunable) on movement/steps while standing in a grass zone. On hit, pick a random Pokémon ID from a grass-pool list, fetch from PokeAPI, open encounter dialog.
- **Lake encounters ("fishing"):** Not automatic on proximity — triggered by an explicit "Go fishing" button while in/near the lake zone. Same encounter dialog, different (water) Pokémon pool.
- **Encounter dialog:** Text-based. Options: "Try to catch" / "Leave the Pokémon in peace." Catch = random number vs. threshold. Success → add to caught list. Fail → Pokémon flees, dialog closes.
- **Caught Pokémon list:** Running list in state (later: persisted). Info button/panel to view details on caught Pokémon (pulled from API data already fetched).
- **Future/stretch ideas (not in scope yet):** Pokémon storage system, a "playground" area to let caught Pokémon interact/play, other limits/rules TBD.

## Build order

- [ ] 1. Static scene — house, tree, grass patch, lake positioned as % zones, no movement yet
- [ ] 2. Character movement via keyboard only, with tree collision blocking
- [ ] 3. On-screen D-pad buttons wired to the same movement function as keyboard
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
| Character move speed | TBD | Px/% per keypress or continuous while held? |
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
