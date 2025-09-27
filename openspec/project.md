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