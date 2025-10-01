# Project Context

## Purpose
Provide a production‑ready, Apple‑inspired React component library (LiqUIdify) with accessible, SSR‑safe UI primitives and a consistent Liquid Glass design system for React 18/19 apps.

## Tech Stack
- Language/runtime: TypeScript (strict), Bun (npm compatible)
- Framework: React 18/19
- Styling/design: Panda CSS (+ Park UI preset), global CSS export, design tokens/recipes
- UI primitives: Ark UI (headless); icons: lucide-react; motion: framer-motion
- Build: Vite (library mode, ESM/CJS), vite-tsconfig-paths
- Lint/format: Biome (tabs, double quotes, organize imports)
- Testing: Vitest + React Testing Library + jsdom; optional Playwright/axe
- CI/CD: GitHub Actions (build, tests, coverage, security/contrast audits, release)

## Monorepo Layout
- Root package: liquidify-react (build artifacts in dist/libs/components)
- Library: libs/components (source, tests, build config, subpath exports)
- Demo playground: /demo (Vite)
- OpenSpec: /openspec (project conventions, specs, proposals, archive)

## Scripts (Bun)
- Dev: bun run dev (library playground)
- Build (root): bun run build; Build lib only: bun run --filter @liquidify/components build
- Typecheck: bun run type-check | Watch: bun run type-check:watch
- Lint/format: bun run lint · bun run lint:fix · bun run format:check · bun run format
- Test: bun run test | UI: bunx vitest -c vitest.config.mts --ui | Coverage: bunx vitest -c vitest.config.mts run --coverage
- Clean: bun run clean

## Project Conventions

### Code Style
- Biome for formatting/linting; tabs, double quotes; run format/lint before PRs
- TS strict; no implicit any; explicit return types for public APIs; export Props interfaces
- Components/files: PascalCase for components; hooks camelCase starting with use*
- Imports: prefer path aliases (@, @/components, etc.); maintain index.ts barrels
- CSS: use Panda tokens/recipes; import library CSS once; avoid inline styles (style={{}})
- A11y: follow Ark UI patterns, ARIA/roles + keyboard nav; respect prefers‑reduced‑motion
- Logging/errors: avoid console logs in library; throw Errors for invalid usage

### Architecture Patterns
- Library‑first: subpath exports per component; CSS emitted as liquidify.css (side‑effect)
- SSR safety: no window access at import time; guard browser‑only APIs in effects/hooks
- Keep peers external (react, react-dom, @ark-ui/react, framer-motion, lucide-react)
- Path aliases map to libs/components/src; barrels re‑export from src/index.ts

### Testing Strategy
- Vitest + RTL (jsdom, globals); call setupDOM() in React tests
- Include pattern: libs/components/src/**/*.{test,spec}.{js,ts,jsx,tsx}
- Coverage via v8; prefer container queries where relevant

### Git & Release Workflow
- Conventional Commits; feature branches (feat/*, fix/*, chore/*)
- PRs required; CI runs typecheck/lint/tests/build; releases via GitHub Actions
- Spec‑driven: OpenSpec proposals → validation → implementation → archive

## Domain Context
- Apple HIG‑inspired “Liquid Glass”: blur, depth, dynamic accent colors, role‑based radii
- 48+ accessible components built on Ark UI; theming via CSS tokens; tree‑shakeable imports

## Important Constraints
- Banned/guards: no Storybook/Tailwind refs; no inline styles; avoid legacy “liquid‑glass” artifacts
- Accessibility: target WCAG 2.1 AA
- Performance: keep bundles treeshakeable; do not bundle peers; CSS marked sideEffect

## Exports & Peers
- Root export and subpaths for all components; styles export at liquidify.css
- Peers: react, react‑dom, @ark‑ui/react, framer‑motion, lucide‑react

## CI Workflows
- build‑validation, codecoverage, security‑audit, contrast‑audit, release, release‑dry‑run

## References
- See CRUSH.md for command quick‑ref and code style; README.md for usage and theming notes