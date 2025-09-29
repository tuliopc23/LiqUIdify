# Project Context

## Purpose
Provide a production‑ready, Apple‑inspired React component library (LiqUIdify) with accessible, SSR‑safe UI primitives and a consistent design system (Liquid Glass aesthetics) for React 18/19 apps.

## Tech Stack
- Language/runtime: TypeScript (strict), Bun (npm compatible)
- Framework: React 18/19
- Styling/design: Panda CSS (+ Park UI preset), design tokens, global CSS export
- UI primitives: Ark UI (headless), icons: lucide‑react, motion: framer‑motion
- Build: Vite (library mode, dual ESM/CJS), vite‑tsconfig‑paths
- Lint/format: Biome (tabs, double quotes, organize imports)
- Testing: Vitest + React Testing Library + jsdom; optional Playwright/axe
- CI/CD: GitHub Actions (build, release, audits); npm publish

## Project Conventions

### Code Style
- Use Biome for formatting/linting; tabs indent, double quotes; run format/lint before PRs
- TS strict; no implicit any; prefer explicit types for public APIs; export Props interfaces
- Components/files: PascalCase for components, hooks use camelCase starting with use*
- Imports: prefer path aliases (@, @/components, etc.); maintain index.ts barrels
- CSS: use Panda tokens/recipes; import library CSS once; avoid inline styles (style={{}})
- A11y: follow Ark UI patterns, proper ARIA/roles, keyboard nav, respects prefers‑reduced‑motion
- Logging/errors: avoid console noise in library; throw typed Errors for invalid usage

### Architecture Patterns
- Library‑first: subpath exports per component; CSS emitted as liquidify.css (side‑effect)
- SSR safety: no window access at import time; guard browser‑only APIs in effects/hooks
- Keep peers external (react, react‑dom, @ark‑ui/react, framer‑motion, lucide‑react)
- Path aliases map to libs/components/src; barrels re‑export from src/index.ts

### Testing Strategy
- Unit/component tests via Vitest (jsdom, globals, single‑thread); setupFiles: libs/components/src/test/test‑setup.ts (call setupDOM in React tests)
- Include pattern: libs/components/src/**/*.{test,spec}.{js,ts,jsx,tsx}
- Coverage optional via v8; RTL for DOM assertions

### Git Workflow
- Conventional Commits; feature branches (feat/*, fix/*, chore/*)
- PRs required; CI runs typecheck/lint/tests/build; releases via GH Actions
- Spec‑driven changes use OpenSpec (proposal → validate → implement → archive)

## Domain Context
- Apple HIG‑inspired “Liquid Glass” design: blur, depth, dynamic accent colors, role‑based radii
- 48+ accessible components built on Ark UI; theming via CSS tokens; tree‑shakeable imports

## Important Constraints
- Banned/guards: no Storybook/Tailwind refs; no inline styles; avoid legacy “liquid‑glass” artifacts
- Accessibility: target WCAG 2.1 AA
- Performance: keep bundle treeshakeable; do not bundle peers; CSS marked sideEffect

## External Dependencies
- Peers: react, react‑dom, @ark‑ui/react, framer‑motion, lucide‑react
- Tooling: Biome, Vitest/RTL, Panda CSS, Vite, GitHub Actions