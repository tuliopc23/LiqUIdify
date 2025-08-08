# Docs STATUS

- Single site: `apps/docs` (Mintlify)
- Commands:
  - `bun run docs:dev`
  - `bun run docs:build`
  - `bun run docs:preview`
- IA:
  - `/` Home
  - `/getting-started/*` Installation, Quickstart, Project Setup
  - `/guides/*` Theming, Accessibility, Recipes
  - `/components/*` Component reference
  - `/integrations/storybook`
  - `/migrate/from-previous`
  - `/troubleshooting`, `/faq`, `/changelog`, `/contributing`, `/licenses`
- Decisions:
  - VitePress removed.
  - Root-level Mintlify variants removed; config unified in `apps/docs/mint.json`.
  - Custom CSS uses layered Liquid Glass at `apps/docs/styles/liquid-glass.css`.
