# Agent Instructions for LiqUIdify

## Build/Lint/Test Commands
- **Build library**: `bun run build:lib`
- **Type check**: `bun run type-check`
- **Lint**: `biome lint .`
- **Lint fix**: `biome lint --write .`
- **Format**: `biome format --write .`
- **Full check**: `biome check .`
- **Run all tests**: `vitest -c vitest.config.mts run`
- **Run single test**: `vitest run <path-to-test-file>`
- **Test coverage**: `bun test --coverage`

## Code Style Guidelines

### Formatting & Linting
- **Formatter**: Biome (2 spaces, 100 line width, LF endings)
- **JSX**: Double quotes, semicolons always, bracket spacing
- **Imports**: Auto-organized with Biome assist

### TypeScript
- **Strict mode**: Enabled with noImplicitAny, strictNullChecks
- **JSX**: react-jsx transform
- **Target**: ESNext with ESNext modules
- **Paths**: @/ aliases for libs/components/src/*

### Naming Conventions
- **Components**: PascalCase (Button, Dialog)
- **Functions**: camelCase or PascalCase
- **Variables**: camelCase, PascalCase, or CONSTANT_CASE
- **Types**: PascalCase
- **Files**: kebab-case for directories, PascalCase for components

### Component Patterns
- **Refs**: forwardRef with displayName
- **Props**: Extend HTML attributes + custom props
- **Styling**: Panda CSS recipes with cx() utility
- **Exports**: Named exports from index.ts files

### Error Handling
- **Accessibility**: Strict WCAG compliance required
- **Types**: No explicit any (warn level in tests)
- **Imports**: No default exports preferred

### Testing
- **Framework**: Vitest with jsdom
- **Library**: @testing-library/react
- **Setup**: test-setup.ts with DOM environment