# Agent Instructions for LiqUIdify

## Build/Lint/Test Commands
- **Build library**: `bun run build:lib`
- **Type check**: `bun run type-check`
- **Lint**: `biome lint .` | **Fix**: `biome lint --write .`
- **Format**: `biome format --write .`
- **Full check**: `biome check .`
- **Run all tests**: `vitest -c vitest.config.mts run`
- **Run single test**: `vitest run <path-to-test-file>`
- **Test coverage**: `bun run test:coverage`

## Code Style Guidelines
- **Formatter**: Biome (tabs, 120 line width, LF endings)
- **JSX**: Double quotes, semicolons always, bracket spacing
- **TypeScript**: Strict mode, react-jsx transform, ESNext target
- **Paths**: @/ aliases for libs/components/src/*
- **Naming**: PascalCase (components/types), camelCase (functions/vars), kebab-case (dirs)
- **Components**: forwardRef with displayName, extend HTML attributes
- **Styling**: Panda CSS recipes with cx() utility
- **Exports**: Named exports from index.ts files
- **Accessibility**: Strict WCAG compliance required
- **Testing**: Vitest with jsdom, @testing-library/react, React 19