# Repository Guidelines

## Project Structure & Module Organization
- `libs/components/src`: Source for the component library (components, hooks, styles, recipes, types). Tests live in `libs/components/src/test`.
- `apps/showcase`: Vite app to develop and preview components locally.
- `apps/docs`: Documentation content and tooling.
- `dist/`: Build artifacts published to npm. `scripts/`: local utilities. `types/` and `styled-system/`: shared typing and style config.

## Build, Test, and Development Commands
- `bun run dev`: Start component library in dev mode.
- `bun run showcase:dev`: Launch the showcase app (Vite) for local testing.
- `bun run build:lib`: Build the component library.
- `bun run type-check`: Strict TypeScript checks (no emit).
- `bun run lint` / `bun run format`: Lint and format with Biome.
- `bun test`: Run all unit/integration tests. `bun run test:coverage`: With coverage.
- `vitest run path/to/file.test.tsx`: Run a single test file.

## Coding Style & Naming Conventions
- TypeScript strict: explicit types, no implicit `any`.
- Components: use `forwardRef<Element, Props>` and set `displayName`; prefer `React.memo` for pure components.
- Imports: external packages → internal modules → type-only imports.
- Naming: PascalCase components, camelCase functions/variables, kebab-case file names.
- Formatting: Biome enforced (2 spaces, 100 columns, double quotes). Run `bun run lint` and `bun run format` before commits.

## Testing Guidelines
- Frameworks: Vitest + Testing Library (`happy-dom/jsdom`).
- Location & pattern: `libs/components/src/test/**/*.test.tsx`.
- What to test: accessibility (WCAG 2.1 AA), keyboard/mouse interactions, edge cases, and build output via `bun run test:build`.
- Examples: run a specific suite with `vitest run libs/components/src/test/integration.test.tsx`.

## Commit & Pull Request Guidelines
- Commits: concise, imperative mood (e.g., "Add button sizes"). Conventional Commits not required; keep changes atomic.
- PRs must include: clear description, rationale, linked issues, and screenshots/GIFs for visual changes. Note accessibility impacts and any breaking changes.
- Before opening a PR: `bun run type-check`, `bun run lint`, `bun test`, `bun run build:lib` should pass.

## Security & Configuration
- Do not commit secrets. Use `.env.example` as a template for local `.env` files.
- Helpful checks: `bun run workspace:verify` (workspace sanity) and `bun run exports:verify` (package exports).

