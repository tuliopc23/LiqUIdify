# Project Context

## Purpose
Production-ready React component library (Liquidify) delivering accessible, premium UI with physics-based interactions, SSR safety, and a modern design system.

## Tech Stack
- TypeScript, React 18–19 (peer)
- Build/tooling: Bun, Vite, Panda CSS (Park UI preset), PostCSS/Autoprefixer
- Styling: Panda tokens/utilities, global CSS, variant system
- UI/A11y: @ark-ui/react primitives, framer-motion, lucide-react
- Testing: Vitest, @testing-library/react, jsdom/happy-dom, Playwright + axe-core (optional)
- Lint/Format: Biome
- Packaging: ESM/CJS + types, CSS sideEffects, workspaces under libs/*

## Project Conventions

### Code Style
- Biome for formatting and linting; run biome check/lint/format scripts
- TypeScript-first code; module ESM by default
- No inline styles in TSX (guarded by CI); no Storybook or Tailwind references (guarded)
- Component folders with index.ts re-exports; filenames lowercase (e.g., button.tsx)
- Prefer className composition via core/utils and the variant system; avoid leaking secrets in logs

### Architecture Patterns
- Monorepo workspace with primary package in libs/components
- Components colocate styles and re-exports; Ark UI wrappers for complex widgets
- Design tokens via Panda (panda.config.ts); global styles under src/styles
- Shared utilities in src/core and src/lib; reusable hooks in src/hooks
- Dual output (CJS/ESM) under dist/libs/components; CSS emitted as side-effect

### Apple HIG Premium Guidelines (iOS 18/macOS Sequoia + Post-2025 "Tahoe" Trends)
Follow these for all components to achieve liquid glassmorphic design. All via Panda tokens/recipes—no hard-coding.

- **Radii (26px Premium)**: Use `radii.global.premium: 26px` for capsule/pill controls (e.g., buttons, badges, toggles). Standard HIG: 8-14px; premium: 20-28px for fluid, VisionOS-inspired shapes. Scenario: Apply to borders/overflow for organic feel.
  
- **Multi-Layered Liquid Glass**: Token: `glass.liquid: {base: "rgba(255,255,255,0.08)", blur: "backdrop-filter: blur(10-20px)", layers: {before: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%)", after: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)", glow: "box-shadow: inset 0 1px 0 rgba(255,255,255,0.2)"}}` (opacity 0.08 to 0.25 via vars). Stack for depth: Base + ::before (shimmer gradient) + ::after (ripple/glow). Aligns with iOS 18 vibrancy (thin/regular materials); "liquid" via subtle wave on interact. Perf: GPU (will-change: transform); fallback opacity on no-blur.

- **SF Pro Typography**: Token: `fonts.sfPro: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto"`. Weights: Semibold (600) for buttons/labels; sizes: Compact (15px), Regular (17px), Large (19px); line-height 1.2-1.4, letter-spacing -0.01em. HIG: Precise kerning for readability; adapt to dynamic type (prefers-reduced-motion + text-zoom).

- **Apple Colors (P3 Adaptive)**: Tokens: `colors.accent.apple.dynamic: "hsl(210 100% 50% / 20-40%)"` (system blue/purple mix), `destructive: "rgba(255,59,48,0.3)"` (systemRed), neutral glass (rgba(255,255,255,0.1)). Use `color-mix(in oklch, color 28-42%, transparent)` for states. Post-2025: P3 gamut for wider vibrancy; test in light/dark/high-contrast.

- **Microinteractions (Liquid Flow)**: Tokens: `motion.liquid: {duration: "120-200ms", easing: "cubic-bezier(0.25,0.46,0.45,0.94)" (spring), ripple: "radial-gradient(white, transparent, 0.3s ease-out)"}`. Hover: Scale 1.02 + lift (1px shadow); Press: Scale 0.96 + ripple; Focus: Glow ring (2px accent). HIG iOS 18: Subtle utility motion; disable on reduced-motion. Use framer-motion/Ark UI for physics; add haptic feedback if native.

- **macOS Sequoia/Tahoe Alignment**: Sequoia (2024): Unified glass windows (translucent + blur stacking); controls with 12-20px radii, adaptive vibrancy. Rumored Tahoe (2025): "Liquid" fluidity (magnetic hovers, wave ripples in glass), deeper layers (3D blur/glow), 26px+ for premium tabs/buttons. Reference: developer.apple.com/design/human-interface-guidelines/components (buttons/controls), wwdc2024/10017 (vibrancy materials). For LiqUIdify: Extend to SSR-safe React (no blur on server).

- **Validation Checklist for Agents**:
  - Tokens only: No inline CSS/px values.
  - Scenarios: Every req has ≥1 **WHEN**/**THEN** for HIG premiums.
  - Tests: Assert glass layers (rgba/blur classes), micro (transform changes), a11y (44pt, contrast).
  - Perf: <16ms animations; axe-core for contrast in glass.
  - Cross-Platform: Test iOS/macOS simulators; fallback fonts/colors.
- Other agents: Always reference this section before impl; run `openspec validate --strict` after changes.

### Testing Strategy
- Unit and SSR smoke tests with Vitest
- Behavior tests with Testing Library on jsdom/happy-dom
- Optional accessibility checks with Playwright + axe
- Tests live under libs/components/src/test and component-specific test files
- CI runs type-check, lint/check, and build before publish

### Git Workflow
- Feature branches with PRs via GitHub; CI enforces lint/type/build
- Follow OpenSpec 3-stage workflow (proposal → implementation → archive) for all non-trivial changes
- Keep commits scoped and descriptive; avoid committing generated artifacts

## Domain Context
- Premium, physics-enhanced interactions (e.g., magnetic hover, spring effects)
- Strong accessibility posture (WCAG-minded) via Ark UI primitives
- Design system aims for consistency; platform-inspired variants (e.g., Apple HIG)
- SSR compatibility and tree-shakeable builds for app performance

## Important Constraints
- React 18/19 compatibility; SSR-safe APIs (use-ssr-safe)
- No inline styles; no Storybook/Tailwind usage
- Keep components a11y-first; prefer Ark UI primitives for semantics and focus management
- Preserve tree-shaking; only CSS marked as sideEffects

## External Dependencies
- @ark-ui/react, framer-motion, lucide-react
- @pandacss/dev and Park UI preset
- Vite, Vitest, @testing-library/react, Playwright + axe-core
- Biome for lint/format