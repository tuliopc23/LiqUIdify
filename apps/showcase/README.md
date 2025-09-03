LiqUIdify – Full React Components Showcase (Liquid Glass)

Goal
- Render all real library components inside Apple HIG‑style Liquid Glass cards.
- Built with Vite + React, uses your Panda CSS tokens/recipes via `liquidify/styles`.

Run Locally
- Step 1: build the library CSS/exports (needed for `liquidify/styles`):
  - bun run build:lib
- Step 2: run the showcase app:
  - Dev: bun run showcase:dev
  - Build: bun run showcase:build (outputs to `dist/showcase/`)

Embed in Docs (Mintlify MDX)
- After building, copy or serve `dist/showcase` under your docs public path, e.g. `apps/docs/public/demos/showcase`.
- MDX example:
  <iframe
    src="/demos/showcase/index.html"
    loading="lazy"
    width="100%"
    height="900"
    style={{ border: 0, background: "transparent" }}
    allowtransparency
    title="LiqUIdify – Components Showcase"
  />

Theme
- The header button toggles `data-theme` on `<html>` between light/dark.
- You can also set it in the iframe via query or postMessage if needed.

Notes
- This grid showcases real components from `liquidify` (exports in `libs/components/src/index.ts`).
- Add or tweak demos in `apps/showcase/src/App.tsx` as needed.

