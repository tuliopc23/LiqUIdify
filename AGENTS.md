# Repository Guidelines

## Project Structure & Module Organization
- Main package lives in `libs/components/`.
- Source code: `libs/components/src/`:
  - `components/` for UI components (and `components/ark-ui/` wrappers)
  - `hooks/`, `core/`, `lib/`, `styles/`, `types/`
  - tests in `src/test/`, `src/__tests__/`, and `*.test.tsx` / `*.spec.tsx`
- Generated Panda CSS output exists in `styled-system/` (root) and `libs/components/styled-system/`; do not hand-edit generated files.
- Docs and guides are in `docs/`. Spec-driven change work is in `openspec/`.

## Build, Test, and Development Commands
- `bun install` - install workspace dependencies.
- `bun run dev` - run local Vite dev server for the component library.
- `bun run build` - production library build (delegates to `build:lib`).
- `bun run type-check` - run TypeScript checks for root and package.
- `bun run lint` - run Biome lint rules.
- `bun run format` - apply Biome formatting.
- `bun run test` - run Vitest suite (`vitest.config.mts`).
- `bun run health-check` - CI-style gate (`type-check`, Biome check, build).

## Coding Style & Naming Conventions
- Language: TypeScript + React (`.ts`/`.tsx`), ESM modules.
- Formatting/linting: Biome (`biome.json`), with tabs for indentation and double quotes.
- Component folders are lowercase (`components/button/`), exported component symbols use PascalCase (`Button`), hooks use `useX` naming.
- Keep imports organized (`biome assist` handles organize-imports).

## Testing Guidelines
- Framework: Vitest with `jsdom` and setup at `libs/components/src/test/test-setup.ts`.
- Test file naming: `*.test.tsx` or `*.spec.tsx`.
- Place tests near behavior under `src/test/`, `src/__tests__/`, or component folders.
- Run `bun run test` locally before PR; use `bunx vitest run --coverage` when validating coverage-sensitive changes.

## Commit & Pull Request Guidelines
- Prefer Conventional Commit prefixes: `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`.
- Keep commits focused and descriptive (release/version-only commits are handled separately).
- PRs should follow `.github/PULL_REQUEST_TEMPLATE.md`: summary, change type, updated tests/docs, local `type-check` and `build:lib` pass.
- Include screenshots or recordings for UI changes.

## OpenSpec & Change Proposals
- For new capabilities, breaking changes, architecture shifts, or performance/security behavior changes, create an OpenSpec proposal first in `openspec/changes/<change-id>/` before implementation.
