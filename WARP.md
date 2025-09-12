# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project orientation
- Library-only repo using Bun + Vite + Vitest + Panda CSS + React.
- The publishable npm package is the repo root (name: "liquidify"). Built artifacts are produced from libs/components into dist/libs/components and exported via the root package.json.

Common commands (fish shell)
- Install deps (root):
  - bun install

- Build the component library (root):
  - bun run build:lib
  - bun run build  # alias for build:lib

- Type-check, lint, format (Biome + TypeScript):
  - bun run type-check
  - bun run lint
  - bun run lint:fix
  - bun run format
  - bun run format:fix

- Tests (Vitest at repo root):
  - bun run test                        # runs Vitest with vitest.config.mts
  - bunx vitest run path/to/test.tsx    # run a single test file
  - bunx vitest run path/to/test.tsx -t "test name"  # run a single test by name
  - Coverage (CI-equivalent flags):
    - bunx vitest run --coverage --coverage.provider=v8 --coverage.reporter=lcov --coverage.reporter=text-summary

- Health checks:
  - bun run health-check   # type-check, biome checks, then build:lib

Big-picture architecture
- Library build and publishing
  - Root package (name: liquidify) publishes artifacts from dist/libs/components using subpath exports:
    - exports["."] → types: ./dist/libs/components/index.d.ts; import: ./dist/libs/components/index.mjs; require: ./dist/libs/components/index.cjs
    - exports["./styles"] → ./dist/libs/components/liquidify.css
    - example subpath: exports["./button"] → ./dist/libs/components/components/button/*
  - Source lives in libs/components. Vite library build outputs to dist/libs/components.
    - libs/components/vite.config.ts defines multiple entries (index and per-component) and outDir ../../dist/libs/components. Peer deps are externalized.

- Styling system (Panda CSS + PostCSS)
  - panda.config.ts uses presets ["@pandacss/preset-base", "@park-ui/panda-preset"], and includes libs/components/src (examples/* optional). It emits tokens/recipes used by the components.
  - postcss.config.js enables @pandacss/postcss and autoprefixer.

- TypeScript config
  - Root tsconfig.json and tsconfig.base.json provide strict settings and path aliases (e.g., @/* → libs/components/src/*).
  - libs/components/tsconfig.lib.json emits declarations into dist/libs/components.

- Testing layout (Vitest)
  - vitest.config.mts: environment jsdom, includes libs/components/src/**/*.{test,spec}.{js,ts,jsx,tsx}, excludes tests/e2e/**, setupFiles libs/components/src/test/test-setup.ts. Single-thread pool for stability.
  - Tests live in libs/components/src/test.

CI and release (what GitHub Actions run)
- .github/workflows/ci.yml
  - Node 20 and Bun latest, bun install --frozen-lockfile
  - bun run type-check, bun run lint (non-blocking), bun run build:lib, bun run test
- .github/workflows/codecoverage.yml
  - Runs Vitest with V8 coverage and uploads LCOV + text-summary
- .github/workflows/release.yml
  - On tag push (v*), runs full test suite, build, and npm publish (requires NPM_TOKEN); also creates a GitHub Release
- Additional workflows: security-audit.yml (dependency + secret checks), contrast-audit.yml (contrast + a11y checks), release-dry-run.yml (publint + npm pack --dry-run)

Gotchas and heads-ups (verified)
- Rolldown config references
  - Some scripts reference rolldown.config.ts (e.g., libs/components dev/build:watch), but no such file was found. Prefer the Vite-based build (bun run build:lib) or add the missing config if you intend to use rolldown.
- Tests policy
  - This repo runs unit tests only (Vitest). E2E and Playwright are out of scope here.

Where things are defined
- Root package and scripts: package.json
- Library source: libs/components/src/**
- Library build config (Vite lib mode): libs/components/vite.config.ts
- Styling: panda.config.ts, postcss.config.js, libs/components/src/styles/**
- Tests: vitest.config.mts, libs/components/src/test/**
- CI: .github/workflows/*.yml

Notes for future Warp sessions
- Use Bun to run scripts and tools in this repo (bun install, bun run ...).
- The canonical build entry is bun run build:lib; avoid rolldown-based scripts unless a rolldown.config.ts is added.
- When unsure, consult the root package.json for the canonical script names.

