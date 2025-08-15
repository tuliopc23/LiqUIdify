# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository scope: LiqUIdify monorepo (Bun workspaces) with a React component library, a Storybook app, and a Mintlify documentation site.

Guardrails for future agents

- Do not downgrade dependencies without explicit permission. Prefer latest or latest stable when adding/upgrading.
- Treat package.json scripts as the source of truth. Run tasks via bun run scripts rather than ad‑hoc flags.
- Shell is fish; prefer invoking scripts (fish-safe). Avoid inline POSIX-only syntax in ad-hoc commands.
- Aim for test-first changes: fix failing tests and keep the test suite green.

Monorepo at a glance

- Workspaces: apps/_, libs/_ (configured at root workspaces)
- Component library: libs/components
  - Build: Vite + rolldown (libs/components/rolldown.config.ts) → dist/libs/components
  - Types: tsc project libs/components/tsconfig.lib.json
  - Entry points: package exports map (core/forms/navigation/feedback/layout/data-display/accessibility, plus per-component)
  - CSS output exposed as liquidify.css (also aliased as "./css" and "./styles")
- Storybook: apps/storybook (Storybook 9 + Vite builder)
  - Dev on port 6006; consumes library sources via tsconfig path aliases
  - Build output: apps/storybook/storybook-static
- Documentation: apps/docs (Mintlify)
  - Custom CSS pipeline: apps/docs/scripts/build-css.mjs produces styles into apps/docs/styles
  - Docs are run/built through scripts that ensure library CSS is built first
- TypeScript: strict TS with path aliases configured in root tsconfig.json
- Tests: Vitest (happy-dom/jsdom as needed) with targeted test scripts per area
- CI: GitHub Actions for CI, coverage, contrast/a11y audit, security audit, build validation, and release

Common commands (run from repo root)

- Install
  - bun install
- Lint and format
  - Lint: bun run lint (qlty check -a)
  - Format: bun run format (qlty fmt -a)
  - Format fix: bun run format:fix
- Type-check
  - bun run type-check
- Build
  - Build everything (lib + storybook): bun run build
  - Build library only: bun run build:lib
  - Build types only: bun run build:types
  - Clean: bun run clean (or clean:all to reinstall deps)
- Library development
  - Dev (rolldown/vite): bun run dev
  - Watch build: bun run build:watch
- Storybook
  - Dev: bun run storybook (http://localhost:6006)
  - Build static: bun run build:storybook (outputs to apps/storybook/storybook-static)
  - Preview built bundle locally: bun run storybook:preview
- Documentation (Mintlify)
  - Dev: bun run docs:dev (runs CSS pipeline first, then Mintlify dev)
  - Build: bun run docs:build (runs CSS pipeline, broken-links check)
  - Preview: bun run docs:preview (alias to docs:dev in this repo)
  - Check links only: bun run docs:links
- Tests (Vitest)
  - Full suite: bun run test
  - Coverage: bun run test:coverage (uses Vitest coverage)
  - Targeted suites:
    - Build validation tests: bun run test:build
    - Integration: bun run test:integration
    - E2E-like workflows: bun run test:e2e
    - Performance harness: bun run test:performance
    - Accessibility: bun run test:a11y
  - Run a single test file (examples):
    - bunx vitest run libs/components/src/test/integration.test.tsx
    - bunx vitest run path/to/test.spec.ts
  - Filter by test name pattern:
    - bunx vitest run -t "Button renders"
- Audits and analysis
  - Contrast audit: bun run audit:contrast
  - Storybook build verify: bun run storybook:verify
  - Build analysis (bundle visualizer): bun run build:analyze or :compressed
- Health/validation
  - Quick health: bun run health-check (type-check + library build)
  - Validate config presence: bun run validate:config

High-level architecture and flows

- Build flow
  - Library builds via Vite/rolldown config (libs/components/rolldown.config.ts), then types via tsc.
  - Storybook builds against the library sources with Vite builder, output under apps/storybook/storybook-static.
  - Docs build triggers a CSS pipeline (build-css.mjs) to ensure the library CSS is available to Mintlify, then runs Mintlify commands (dev/build/broken-links) scoped to apps/docs.
- Testing strategy
  - Vitest run in CI and locally; specialized test files live under libs/components/src/test/\* for integration, a11y, performance, and workflow validation.
  - Accessibility checks also run through Vitest and a separate contrast audit script.
- TypeScript and module resolution
  - Root tsconfig.json sets strict options and path aliases (e.g., @/_→ libs/components/src/_; also an alias for "liquidify" to local source for development).
  - Package exports in root package.json map multiple entry points to built outputs under dist/libs/components.
- CI highlights (GitHub Actions)
  - CI (push/PR to main, develop): bun install (frozen), type-check, lint (non-blocking), build:lib, test, build Storybook, then upload artifacts.
  - Build Validation: validate config, run health-check, verify Storybook build.
  - Code Coverage: Vitest with V8 coverage, lcov + text-summary uploaded as artifact and job summary.
  - Contrast Audit: build lib, run contrast audit and a11y tests; artifacts uploaded.
  - Security Audit: weekly job runs dependency and secret scans (npm audit, trufflehog).
  - Release: tag-triggered; runs full test suite, builds, publishes to npm with provenance, creates GitHub release.

Fish shell notes

- Prefer bun run scripts to avoid shell differences. Scripts encapsulate any POSIX syntax.
- For ad-hoc Vitest runs, use bunx vitest … to avoid relying on a global binary.

Troubleshooting

- If Storybook dev fails on port 6006, ensure no process is holding the port or change the port with "-p <port>".
- If docs dev/build shows missing CSS, run bun run build:lib first, or rely on the docs scripts which already invoke the CSS pipeline.
- Clear build artifacts with bun run clean; for a deeper reset, bun run clean:node then bun install.

Pointers to app-specific guidance

- Documentation-specific guidance exists at apps/docs/WARP.md. See that file for deeper Mintlify authoring patterns and the Preview component conventions.

Suggested improvements to apps/docs/WARP.md (do not auto-apply)

- At the top, add: “For monorepo-wide commands (install, lint, tests, Storybook, library builds), see /WARP.md.”
- Under Quickstart Commands, clarify that docs:preview currently aliases docs:dev in this repo.
- In Technical Context → Scripts, match current root scripts:
  - docs:build runs mintlify broken-links (already reflected); confirm and note that it also runs the CSS pipeline via docs:css.
  - docs:dev explicates that CSS is built first; consider noting that dev server auto-reloads on CSS updates.
- Consider a short “Local Ports” note: Storybook 6006; Mintlify dev (default, printed by Mintlify) to help agents quickly find UIs.

References

- Root package.json scripts and exports
- apps/storybook/.storybook configuration files
- apps/docs/scripts/build-css.mjs and apps/docs/styles/\*
- .github/workflows/\* for CI lifecycle
- README.md for public-facing component overview and quick starts
