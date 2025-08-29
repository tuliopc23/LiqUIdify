# LiqUIdify — Project-specific Development Guidelines

This document captures project-specific knowledge useful for advanced contributors. It focuses on how this repository is configured and how to build, test, and extend it efficiently.

## Build and Configuration

- Runtime/tooling
  - Primary package runner: Bun (scripts use `bun run` and workspace filters). Install Bun: https://bun.sh
  - Node/PNPM/NPM are present for consumers, but local dev/CI scripts assume Bun.
- Workspace layout
  - Workspaces: `apps/*`, `examples/*`, `libs/*`. The library lives in `libs/components`.
  - TypeScript base config: `tsconfig.base.json` defines `@/*` path → `libs/components/src/*`.
- Library build
  - Build library only: `bun run build:lib` (delegates to `@liquidify/components` package build).
  - Build everything (lib + storybook): `bun run build` or `bun run build:all`.
  - Types only: `bun run build:types`.
  - Watch mode for local iteration: `bun run build:watch`.
- Storybook
  - Dev: `bun run storybook` (or `bun run dev:storybook`).
  - Build: `bun run build:storybook` or `bun run --cwd apps/storybook build`.
- Sanity/health
  - Type-check: `bun run type-check` (root + components package).
  - Workspace verification: `bun run workspace:verify` and `bun run workspace:info`.
  - Exports verification: `bun run exports:verify`.
- CSS/Styling toolchain
  - Tailwind CSS v4 (`tailwindcss` and `@tailwindcss/postcss`) + `lightningcss` (see `lightningcss.config.js`).
  - CSS entry for consumers is exported as `liquidify/css` or `liquidify/styles`.

Notes

- The npm package export map lives in `package.json` under `exports`. Multiple entry points (`core`, `forms`, `navigation`, etc.) all resolve to the same built bundle with different `.d.ts` surfaces.
- Build artifacts are emitted under `dist/libs/components`.

## Testing

Configuration

- Primary config: `vitest.config.mts` (jsdom environment, global setup and test setup, path aliases matching tsconfig, HTML/JUnit/JSON reporters writing to `test-results/*`).
  - environment: `jsdom`
  - globalSetup: `./libs/components/src/test/global-setup.ts`
  - setupFiles: `./libs/components/src/test/setup.ts` (mocks ResizeObserver, IntersectionObserver, Canvas, raf; cleans up RTL, etc.).
  - include: tests under `libs/components/src/**/*.{test,spec}.{js,ts,jsx,tsx}` and `libs/components/src/test/**/*.{test,spec}.{js,ts,jsx,tsx}`
  - reporters: `default + html` locally, `default + junit` on CI
  - output files: junit.xml, results.json, and HTML at `test-results/html/index.html`
  - coverage: provider `v8`, disabled by default; enable with `--coverage`
- There is also a minimalist `vitest.config.ts` with `happy-dom`; it is not used by default (scripts point to the `.mts` config). Prefer `vitest.config.mts` unless you have a strong reason.

Running tests

- All tests via the root script (uses the `.mts` config):
  - With Bun: `bun run test`
  - With npx (Node): `npx vitest -c vitest.config.mts run`
- Single file:
  - `npx vitest -c vitest.config.mts run libs/components/src/components/glass-button-refactored/glass-button.test.tsx`
- Integration suites (curated scripts):
  - `bun run test:integration`
  - `bun run test:e2e`
  - `bun run test:performance`
  - `bun run test:a11y`
  - `bun run test:build` (builds lib first, then runs build validation test)
- Coverage:
  - `npx vitest -c vitest.config.mts run --coverage`
  - Coverage output: `coverage/` with `text`, `json`, `html`, `lcov` as configured.
- HTML report:
  - Generated automatically; preview with `npx vite preview --outDir test-results/html`.

Adding tests

- Place component/unit tests alongside source or under `libs/components/src/test/`.
- Prefer React Testing Library APIs re-exported by our light wrapper (`libs/components/src/test/test-utils.tsx`). Import as:
  - `import { render, screen } from "@/test/test-utils"` or direct `@testing-library/react` if you don't need wrappers.
- The test environment already mocks Canvas, ResizeObserver, IntersectionObserver, and requestAnimationFrame; avoid redefining those unless a test requires different behavior.
- Use path aliases from `vitest.config.mts` and `tsconfig.base.json` (`@`, `@/components`, `@/hooks`, etc.).

Minimal example (verified)

- We validated the test runner with a simple spec and executed it via `npx vitest -c vitest.config.mts run` on a temporary file. The command completed successfully and produced the default HTML report.
- To reproduce locally, create a file like `libs/components/src/test/sanity.test.ts`:

  ```ts
  import { describe, it, expect } from "vitest";

  describe("sanity", () => {
    it("adds numbers correctly", () => {
      expect(1 + 2).toBe(3);
    });
  });
  ```

  Run just this test:

  ```bash
  npx vitest -c vitest.config.mts run libs/components/src/test/sanity.test.ts
  ```

  Then remove the file when done to keep the repo clean.

Troubleshooting

- If tests are slow or flaky locally, ensure you are using the `.mts` config (it tunes pool/threading and deps optimization) and that Bun/Node versions meet the engines required by dependencies.
- Some tests rely on Storybook story imports or Tailwind styles. For pure unit tests these are mocked; for integration-like tests, prefer the scripts under `test:*` in `package.json`.
- The repository also includes `fix-tests.sh` with targeted runs for high-signal suites using `bunx vitest`.

## Additional Development Notes

- TypeScript and React versions
  - TS 5.9.x, React 19.x in devDependencies; peer deps allow React 18 or 19 for consumers.
- Path aliases
  - Keep `tsconfig.base.json` and `vitest.config.mts` aliases in sync. Use `@` for `libs/components/src` and explicit `@/components`, `@/hooks`, etc.
- Export map
  - If you add new bundles or components that should be public, update `package.json` `exports` and ensure build emits `d.ts` accordingly.
- Code style and QA
  - Formatting and lint scripts are wired to `qlty` (`bun run format`, `bun run lint`). If `qlty` isn’t available locally, use your editor’s formatter and run `type-check` as a minimum. CI may enforce checks.
- Common pitfalls
  - Tests must run under `jsdom` with our setup; avoid direct DOM APIs not supported by jsdom without mocks.
  - Do not import from built artifacts (`dist/...`) inside source/tests; always import from `libs/components/src` or via the `liquidify` alias provided in the test config when appropriate.
  - When changing Tailwind configuration or CSS pipeline, verify storybook builds and run `stories:coverage` script if relevant.

## Quick Commands Reference

- Build lib: `bun run build:lib`
- Dev (components): `bun run dev`
- Storybook dev: `bun run storybook`
- Run all tests: `bun run test` or `npx vitest -c vitest.config.mts run`
- Single test file: `npx vitest -c vitest.config.mts run <path-to-spec>`
- Coverage: `npx vitest -c vitest.config.mts run --coverage`
- Type-check: `bun run type-check`
- Verify workspaces: `bun run workspace:verify`
