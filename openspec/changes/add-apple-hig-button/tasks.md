## 1. Specification
- [x] 1.1 Align with Apple HIG references and constraints
- [x] 1.2 Finalize spec deltas for `components/button`
- [x] 1.3 Finalize spec deltas for `design-system/button-consistency`
- [x] 1.4 Validate: `openspec validate add-apple-hig-button --strict`

## 2. Design (optional)
- [x] 2.1 Draft design.md if tokens/architecture need explanation

## 3. Implementation (post-approval only)
- [x] 3.1 Tokens & recipes
  - [x] 3.1.1 Define button color tokens: `colors.button.{filled|tinted|plain}.{accent|neutral|destructive}.{default|hover|active|disabled|focus|loading}.{bg|text|border}` (see `panda.config.ts` colors.button.hig + aliases)
  - [x] 3.1.2 Add radius tokens: `radii.roles.button` and `radii.roles.buttonCompact` (tune values per HIG)
  - [x] 3.1.3 Add spacing tokens: `spacing.button.pad.{compact,regular,large}`, `spacing.button.gap.icon.{compact,regular,large}`, `spacing.button.hit.min` (see `panda.config.ts` spacing.button.*)
  - [x] 3.1.4 Add typography tokens: `typography.button.font.{compact,regular,large}.{size,weight,lineHeight,letterSpacing}`, `typography.button.icon.{compact,regular,large}` (see `panda.config.ts` typography.button.*)
  - [x] 3.1.5 Add elevation/shadow tokens: `button.shadow.{default,hover,active}` with light/dark variants (see `panda.config.ts` shadows.button.*)
  - [x] 3.1.6 Add motion tokens: `motion.duration.button.{hover,press,focus}`, `motion.easing.glass.flow`; add reduced-motion condition (see `panda.config.ts` durations.button.* and recipe @media)
  - [x] 3.1.7 Create Panda recipe `button` with variants: `variant(filled|tinted|plain)`, `tone(accent|neutral|destructive)`, `size(compact|regular|large)` (see `panda.config.ts` recipes.button)
  - [x] 3.1.8 Add state selectors: `:hover`, `:active`, `:focus-visible`, `:disabled`, `[aria-disabled="true"]`, `[data-loading="true"]`; ensure AA contrast (see `panda.config.ts` recipes.button base + selectors)
  - [x] 3.1.9 Add compoundVariants for destructive and icon-only adjustments (see `panda.config.ts` recipes.button compoundVariants + `[data-icon-only]`)
  - [x] 3.1.10 Add media conditions: `prefers-reduced-motion` to disable transforms/animations (see `panda.config.ts` recipes.button @media)
  - [x] 3.1.11 Export recipe and regenerate styled-system artifacts (see `styled-system/recipes/button.js`)
- [x] 3.2 Button component & stories
  - [x] 3.2.1 Implement polymorphic `as` prop (button|a|RouterLink) preserving semantics and keyboard support
  - [x] 3.2.2 Map props to recipe: `variant`, `tone`, `size`; forward refs
  - [x] 3.2.3 Support icon-only/leading/trailing; require `aria-label` for icon-only (dev warning)
  - [x] 3.2.4 Implement loading state: `[data-loading]`, `aria-busy`, disable interactions; optional spinner slot
  - [x] 3.2.5 Implement disabled semantics for native and non-native elements (`disabled` vs `aria-disabled`)
  - [x] 3.2.6 Enforce ≥44×44 min target across sizes using tokens
  - [x] 3.2.7 Focus-visible ring using tokens; verify high-contrast visibility
  - [x] 3.2.8 Add stories/previews: variants×tones×sizes, icon combos, states (hover/focus/active/disabled/loading), light/dark/high-contrast, reduced-motion (see `button-preview.html`, `preview-components/button-preview.html`)
  - [x] 3.2.9 Add legacy prop mapping shim (`primary|secondary|ghost|danger|success|warning` → new variant+tone) + deprecation warnings (see `libs/components/src/components/button/button.tsx`)
  - [x] 3.2.10 Update exports and usage examples (see `README.md` usage and migration notes)
- [x] 3.3 Add accessibility tests and interaction tests (see `libs/components/src/test/button-a11y.test.tsx`)
- [x] 3.4 Provide migration helpers and docs (see `README.md` legacy → new mapping)
- [x] 3.5 Update library exports and usage examples (see `package.json` exports, `README.md` examples)
