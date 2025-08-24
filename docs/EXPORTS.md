# Export Conventions

Consistent exports prevent Storybook/Vite import errors and make the API easy to use and tree‑shake.

## Components

- Primary component: provide both named and default exports.
  - In `glass-thing.tsx`:
    - `export const GlassThing = ...`
    - `export default GlassThing`
- Types and utilities: export as named only (no default exports for types).

## Component folders (`index.ts`)

- Re-export the component and its types in a predictable way:
  - `export { GlassThing } from './glass-thing'`
  - `export { default as GlassThing } from './glass-thing'`
  - `export * from './glass-thing'` (for types and secondary exports)

This ensures both `import { GlassThing } from 'liquidify'` and `import GlassThing from 'liquidify'` continue to work when consumed via the package barrel.

## Library barrel (`libs/components/src/index.ts`)

- Re-export component folders via `export * from './components/glass-thing'` so all named exports remain available.
- Provide convenience aliases (e.g., `export { GlassButton as Button } ...`) only as named exports.

## Stories

- Import types from `@storybook/react`:
  - `import type { Meta, StoryObj } from '@storybook/react'`
- Import the component via named import from its file (preferred):
  - `import { GlassThing } from './glass-thing'`

## Verification

- Run: `bun run exports:verify` to check story named imports resolve to component exports.

