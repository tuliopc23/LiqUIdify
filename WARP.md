# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository overview
- Monorepo managed by Bun workspaces. Primary library is a React component library in libs/components. Supporting apps include Storybook (apps/storybook) and documentation (apps/docs using Mintlify; a VitePress backup exists at apps/docs-vitepress-backup). TypeScript throughout. Vite/Rolldown build pipeline, Tailwind CSS v4-based design system with custom “liquid glass” utilities.

Environments and prerequisites
- Runtime: Bun >= 1.0.0 (see package.json engines). Install dependencies with bun install.
- Framework peers: react and react-dom are peerDependencies of @liquidify/components; install them in any consuming app you run locally outside Storybook.

Common commands
- Install deps: bun install
- Type-check: bun run type-check
- Lint/quality (qlty): bun run lint
- Format: bun run format
- Build everything (lib + Storybook): bun run build
- Build component library only: bun run build:lib
- Watch library builds (rolldown): bun run build:watch
- Start library dev (Vite): bun run dev
- Storybook dev (port 6006): bun run storybook
- Storybook build (static): bun run build:storybook
- Docs (Mintlify) dev/build/preview: bun run docs:dev | bun run docs:build | bun run docs:preview
- Clean outputs: bun run clean (dist) | bun run clean:node (reinstall)

Testing
- Run unit/integration tests: bun run test (Vitest run)
- Full test matrix (integration + build + e2e + performance + a11y): bun run test:all
- Targeted suites:
  - Integration: bun run test:integration
  - Build validation: bun run test:build
  - E2E workflow checks: bun run test:e2e
  - Performance: bun run test:performance
  - Accessibility: bun run test:a11y
- Run a single test file: bunx vitest run libs/components/src/path/to/test-file.test.tsx
- Run tests matching a name: bunx vitest -t "test name substring"
- Enable coverage: bunx vitest run --coverage
Notes: vitest.config.ts uses jsdom with globalSetup libs/components/src/test/global-setup.ts and setupFiles libs/components/src/test/setup.ts. Reports are written under ./test-results/ when configured.

Build and packaging
- Library builds are driven by libs/components/rolldown.config.ts via bunx vite build; watch mode uses bun run build:watch (rolldown). Minifier is oxc. Output includes ESM, CJS, and .d.ts under dist/libs/components with preserved module structure.
- Exports map in package.json exposes multiple entry points: main package (.), grouped bundles (core, forms, navigation, feedback, layout, data-display, accessibility), individual components (e.g., /button, /card), and CSS entries (/css, /styles).
- Pre-flight checks: bun run validate:config ensures rolldown.config.ts exists; bun run fix:typescript can auto-tune tsconfig. Type declarations: bun run build:types (libs/components/tsconfig.lib.json).

Storybook
- Config: apps/storybook/.storybook (main.ts, preview.tsx). Develop with bun run storybook. Static build outputs to apps/storybook/storybook-static (bun run build:storybook). apps/storybook/package.json references helper scripts under /scripts for validation/fixes.

Docs
- Primary docs are a Mintlify site in apps/docs (see mint.json and MDX content). Use docs:dev, docs:build, docs:preview. A VitePress backup exists at apps/docs-vitepress-backup for historical reference and is not part of the primary workflow.

Architecture overview (big picture)
- Library composition
  - Entry: libs/components/src/index.ts joins public exports across bundles and components.
  - Bundles: libs/components/src/bundles/{core,forms,layout,navigation,feedback,accessibility,data-display}.ts offer curated grouped exports enabling tree-shaking friendly imports.
  - Components: libs/components/src/components/* implement “glass-*” components using a consistent structure: component .tsx, optional *.stories.tsx, and index.ts re-exports. Styling primitives are shared across components.
  - Providers/config: libs/components/src/providers/* (e.g., glass-ui-provider, global-config-provider) centralize design system state. A ThemeProvider is exposed in components/theme-provider.
  - Core primitives/utilities: libs/components/src/core/* (roving tabindex, classname/variant helpers, glass effects, responsive helpers) and libs/components/src/lib/variant-system.ts underpin component behavior and styling.
  - Styles: libs/components/src/styles/* hosts glass-core.css, liquid-glass.css, index.css and Tailwind v4 glue (tailwind-v4-config.css). Root tailwind.config.ts defines the authoritative “liquid glass” layered utilities; tailwind.config.js exists for legacy utilities.
  - Tests: per-component tests under libs/components/src/components/** and shared test utils in libs/components/src/test/.
- Apps
  - Storybook (apps/storybook): runs component examples and internal docs using @storybook/react-vite 9.x.
  - Docs (apps/docs): Mintlify-powered docs with MDX content (api-reference, guides, testing). Used for the public site.
- Build pipeline
  - Rolldown/Vite preserve modules for granular import paths. Externals: react, react-dom, react/jsx-runtime.
  - TypeScript configuration uses root tsconfig.json plus tsconfig.base.json and tsconfig.build.json, and library-specific tsconfigs in libs/components/.

CI and quality
- CI (.github/workflows/ci.yml) runs type-check, lint, tests, build, export validation, and audits. Additional workflows cover build validation, Storybook/docs deploy, security audits, and Qodana code quality.
- Lint/format via qlty: bun run lint, bun run format, bun run format:fix.

Conventions and notes for Warp
- Use Bun for all scripts (bun run ...). Prefer latest stable dependencies when adding packages; do not downgrade dependencies without explicit instruction.
- Treat tailwind.config.ts as the source of truth for styling utilities; tailwind.config.js remains for legacy compatibility and should not be the primary target for changes.
- When tests fail, prioritize fixing them first (Vitest + Testing Library; jsdom environment) before adding new features.
- Shell is fish; the commands above are fish-compatible.

Incorporated guidance from repo docs
- README.md: Bun-powered scripts, monorepo layout (apps, libs), quick start (bun install), feature overview, and links to Storybook/docs.
- CLAUDE.md: Aligns on common commands and high-level architecture (bundles, preserved modules, design tokens/unified glass system, accessibility-first). Prefer the current source tree over historical notes when they conflict.

