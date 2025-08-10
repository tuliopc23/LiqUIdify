# Stabilization Follow-ups (TUL-115)

This document records decisions and owners for the post-stabilization items.

## 1) Histoire Svelte 5 Compatibility

- Status (as of August 9, 2025): `@histoire/plugin-svelte@1.0.0-alpha.3` declares `peerDependencies: { svelte: "^3 || ^4" }`, so Svelte 5 is not supported yet.
- Action: Track upstream and request Svelte 5 support with error details.
- Upstream tracking: https://github.com/histoire-dev/histoire/issues (awaiting a dedicated Svelte 5 issue; draft below)
- Revisit date: September 2, 2025
- Owner: Tulio

Draft upstream issue text (for copy/paste):

```
Title: Svelte 5 support for @histoire/plugin-svelte (blocked by "Imports of svelte/internal/* are forbidden")

Environment
- Histoire: 1.0.0-alpha.3
- @histoire/plugin-svelte: 1.0.0-alpha.3
- Svelte: 5.x

Problem
Story collection/build fails with errors originating from the distributed Story module in @histoire/plugin-svelte when used with Svelte 5. The stack ultimately includes forbidden imports from `svelte/internal/*`.

Notes
- @histoire/plugin-svelte currently lists peer svelte: ^3 || ^4.
- Requesting official Svelte 5 compatibility or an alpha tag that supports Svelte 5.

Repro
1. Create Svelte 5 app
2. Install histoire + @histoire/plugin-svelte
3. Run `histoire build`

Expected
Successful story discovery/build.

Actual
Build fails with `Imports of svelte/internal/* are forbidden`.
```

Alternative showcase evaluation (if support lags):
- Criteria: (1) zero-config authoring, (2) stable Svelte 5 support, (3) MDX/controls, (4) static export, (5) linkable examples.
- Decision timeline: If no upstream movement by September 16, 2025, pick an alternative and spike.
- Owner: Charlie (evaluation); Tulio (final decision)

## 2) Showcase Build Strategy

- Decision: Gate showcase build behind env flag and disable by default in CI.
- How: `SHOWCASE=1 bun run build:showcase` (no-op until upstream support lands).
- Owner: Charlie
- Target date: August 12, 2025

## 3) Placeholder Feature Props

- SelectAdvanced.createOption / virtualScroll: Not present in this React package; defer feature until designed/implemented. Public docs must not promise these props.
- Owner: Tulio (API); Charlie (docs)
- Target date: August 14, 2025

## 4) Animation & UX Polish

- List component hover/entrance animations: Not part of this package. Motion hooks remain available via `use-liquid-glass`; defer list-specific animations and document deferral.
- Owner: Tulio
- Target date: August 21, 2025

## 5) Accessibility Verification

- Automated sweep: Added `accessibility-integration.test.tsx` using axe-core on a representative render. Run via `bunx vitest run libs/components/src/test/accessibility-integration.test.tsx`.
- Manual checks: Tabs, Select, DatePicker, Drawer verified for keyboard parity; no high-severity issues noted in these examples. Carousel/SelectAdvanced not applicable in this package.
- Owner: Charlie
- Target date: August 12, 2025

## 6) Documentation & Communication

- CHANGELOG updated with stabilization notes (analyzer scaffolding removal, ColorSwatch a11y fix); deferred features documented.
- README adds guidance for using the library without the showcase and links upstream issue when available.
- Owner: Charlie
- Target date: August 12, 2025

## 7) CI / Quality Gates

- Build and type-check jobs added. Lint step present but gated (local `qlty` CLI not available in CI).
- Optional: bundle size snapshot deferred (scripts currently absent; consider adding later).
- Owner: Charlie
- Target date: August 12, 2025
