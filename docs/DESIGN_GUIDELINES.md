# LiqUIdify Design Guidelines

This document captures the foundation of the Liquid/Glass design system in this repository. It explains available design tokens, usage guidance, layout/grid principles, accessibility notes, and examples to help you build consistent UI.

## Contents
- Overview
- Design Tokens
  - Colors (Glass & Accents)
  - Typography (NEW)
  - Spacing & Sizes
  - Motion & Easing
- Layout & Grid
- Components
  - GlassHeader usage
- Accessibility
- How to use tokens in code

---

## Overview
LiqUIdify uses Panda CSS (styled-system) and Tailwind v4 for styling. The source of truth for tokens and recipes lives in `panda.config.ts`. Generated utilities are available from `styled-system/*` and used throughout apps and libs.

Key goals:
- Provide a cohesive, glass-morphism visual language.
- Encourage consistency through tokens and recipes.
- Keep the API ergonomic for React developers.


## Design Tokens
Tokens are defined in `panda.config.ts` under `theme.extend.tokens`. Access them via the `css` prop/function or recipes. Avoid hardcoded values; prefer tokens so changes propagate consistently.

### Colors (Glass & Accents)
Defined under `colors.glass` and `colors.accent`:
- `colors.glass.bg`, `colors.glass.border`, `colors.glass.ripple`
- Intensities: `colors.glass.subtle.*`, `colors.glass.medium.*`, `colors.glass.strong.*`
- Gradients for pseudo-elements: `colors.glass.gradients.before|after`
- Text colors for glass contexts: `colors.text.glass.primary|secondary|muted|disabled`
- Accents: `colors.accent.primary|secondary|success|warning|danger`

Use cases:
- Backgrounds and borders for glass components.
- Emphasis and status colors for buttons, links, and alerts.

### Typography (NEW)
Typography tokens added for consistency across apps and components.

- fonts:
  - `fonts.sans`: system sans stack
  - `fonts.display`: Inter-forward sans for headings/brand
  - `fonts.mono`: system monospace stack
- fontSizes:
  - `xs` 12px, `sm` 14px, `md` 16px, `lg` 18px, `xl` 20px,
  - `2xl` 24px, `3xl` 30px, `4xl` 36px, `5xl` 48px, `6xl` 60px
- lineHeights:
  - `none` 1, `tight` 1.1, `snug` 1.3, `normal` 1.5, `relaxed` 1.7, `loose` 1.9
- fontWeights:
  - `thin` 100 → `black` 900
- letterSpacings:
  - `tighter` −0.02em → `widest` 0.04em

Recommendation:
- Headings/Brand: `fonts.display`, weight `semibold|bold`, tracking `tight`.
- Body: `fonts.sans`, size `md`, line-height `normal` or `relaxed`.

Future: You can add semantic text styles (e.g., `text.heading.lg`) if desired; for now, use the above primitives.

### Spacing & Sizes
- Spacing scale for glass UI under `spacing.glass`: `xs → 3xl` (4px → 32px)
- Sizes for components under `sizes.glass`: `xs → xl` (8px → 24px)

Use for paddings, gaps, and control sizes. Example: `padding: token(spacing.glass.lg)`.

### Motion & Easing
- Durations under `durations.glass`: `flow`, `bounce`, `quick`, `instant`
- Easings under `easings.glass`: `flow`, `bounce`, `spring`
- Keyframes include `liquidRipple`, `liquidJiggle`, `liquidFlow`, `liquidBounce`


## Layout & Grid
A responsive grid is implemented. Follow these principles:
- Use CSS Grid/Flex patterns already present in `styled-system/patterns` (grid, hstack, vstack, wrap, cq/responsive helpers).
- Prefer gap and padding values from `spacing.glass`.
- Respect breakpoints used in the app; ensure components are fluid and wrap as needed.


## Components
### GlassHeader
An example reusable header using glass aesthetics. Key guidelines:
- Background: `colors.glass.subtle.bg`; borders use `colors.glass.medium.border`.
- Backdrop effects: blur/saturate with reduced-transparency fallback.
- Typography: uses new tokens for brand text:
  - `fontFamily: token(fonts.display)`
  - `fontSize: token(fontSizes.xl)`
  - `fontWeight: token(fontWeights.semibold)`
  - `letterSpacing: token(letterSpacings.tight)`

When adding links or buttons, align sizes/spacing to `spacing.glass` and use `colors.accent.*` for active/hover states.


## Accessibility
- Provide a “reduced transparency” mode (implemented via a data attribute at the document root).
- Ensure sufficient contrast for text on glass backgrounds (`text.glass.*` colors can help).
- Respect `prefers-reduced-motion` for animations in interactive components.
- Keyboard focus states should be visible; ensure focus rings aren’t obscured by blur.


## How to use tokens in code
Use Panda’s `css` and `token()` helpers via the generated styled-system.

Example (React):
```tsx
import { css } from "@/../../styled-system/css";

const brand = css({
  fontFamily: "token(fonts.display)",
  fontWeight: "token(fontWeights.semibold)",
  fontSize: "token(fontSizes.xl)",
  letterSpacing: "token(letterSpacings.tight)",
});
```

For spacing/colors:
```tsx
const card = css({
  p: "token(spacing.glass.lg)",
  bg: "token(colors.glass.bg)",
  border: "1px solid token(colors.glass.border)",
});
```

Testing/build:
- Type-check: `bun run type-check`
- Tests: `bun run test` or `npx vitest -c vitest.config.mts run`
- Build library: `bun run build:lib`

If you add public components or tokens that should be exported, ensure the build and export map (`package.json#exports`) reflect those changes.

---

Questions or improvements? See `apps/docs` for onboarding notes and open a PR with proposed changes to tokens or guidelines.
