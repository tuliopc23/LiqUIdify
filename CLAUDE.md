# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

LiqUIdify is a production-ready React component library implementing Apple's Liquid Glass design language. It's built on Ark UI primitives with Panda CSS for styling.

### Core Structure
- **Component Library**: `libs/components/` - Main library with 47+ components
- **Monorepo**: Bun workspace-based monorepo using workspaces in `package.json`
- **Style System**: Panda CSS with comprehensive design tokens in `panda.config.ts`
- **Build System**: Vite for library builds with automatic entry discovery

### Technology Stack
- **Runtime**: React 18/19 with Ark UI headless primitives
- **Styling**: Panda CSS with Apple HIG-inspired design tokens
- **Bundling**: Vite with dual ESM/CJS output and automatic entry discovery
- **Testing**: Vitest with jsdom environment and React Testing Library
- **Linting**: Biome for formatting and linting (tab indentation, double quotes)
- **Type Checking**: TypeScript with strict configuration
- **Package Manager**: Bun (recommended for development)

### Design System Philosophy
Components follow Apple's Human Interface Guidelines with:
- Liquid Glass surfaces (translucent backgrounds, backdrop filters)
- SF Pro Display typography
- Apple accent colors (#007aff primary, system colors)
- Physics-based animations using Framer Motion
- 16px default border radius for most components

## Essential Commands

### Development
```bash
# Install dependencies
bun install

# Start development server (Vite playground)
bun run dev

# Watch build (for library development)
bun run build:watch

# Quick development mode (build watch only)
bun run dev:quick
```

### Building
```bash
# Build the component library
bun run build:lib

# Build types only
bun run build:types

# Build all (includes docs placeholder)
bun run build:all

# Clean build artifacts
bun run clean

# Clean everything including node_modules
bun run clean:all
```

### Quality Assurance
```bash
# Type checking
bun run type-check

# Type checking with watch mode
bun run type-check:watch

# Format code
bun run format

# Check formatting without fixing
bun run format:check

# Lint code
bun run lint

# Fix linting issues
bun run lint:fix

# Check and fix all (format + lint)
bun run check:fix

# Run tests
bun run test

# Run tests with coverage
bun run test:coverage

# Full health check (type-check + lint + build)
bun run health-check
```

## Component Architecture

### File Structure
Components are organized in `libs/components/src/components/`:
- **Ark UI Components**: `ark-ui/[component]/[component].tsx` + `index.ts`
- **Custom Components**: `[component]/index.ts`

### Component Patterns
1. **Ark UI Wrappers**: Most components wrap Ark UI primitives with Panda CSS recipes
2. **Slot Recipes**: Multi-part components use Panda's slotRecipes system
3. **Design Tokens**: All styling uses semantic tokens from `panda.config.ts`
4. **SSR Safety**: Components are server-safe with proper hydration handling

### Styling Approach
- **Panda CSS Recipes**: Components use pre-defined recipes with variants
- **Design Tokens**: Comprehensive token system with Apple-inspired values
- **Liquid Glass**: Signature translucent glass effect with backdrop filters
- **Animation**: Smooth transitions using Panda's easing/duration tokens

## Key Configurations

### Path Aliases
- `@/*` → `libs/components/src/*`
- `@/components/*` → `libs/components/src/components/*`
- `@/core/*` → `libs/components/src/core/*`
- `@/hooks/*` → `libs/components/src/hooks/*`

### Build Output
- **Format**: Dual ESM (`*.mjs`) and CJS (`*.cjs`) builds
- **Location**: `dist/libs/components/`
- **CSS**: Single `liquidify.css` file with all styles
- **Exports**: Root exports + subpath imports for tree-shaking

### Peer Dependencies
Components require these peer dependencies:
- `react` & `react-dom` (^18 || ^19)
- `@ark-ui/react` (^5.23.0)
- `framer-motion` (^12)
- `lucide-react` (^0.544.0)

## Development Guidelines

### Component Development
1. Use Ark UI primitives as the foundation
2. Apply Panda CSS recipes for styling
3. Follow Apple HIG design principles
4. Ensure SSR compatibility
5. Add proper TypeScript types

### Testing
- Unit tests use Vitest with jsdom environment and React Testing Library
- Test files: `*.{test,spec}.{js,ts,jsx,tsx}` in `libs/components/src/`
- Setup file: `libs/components/src/test/test-setup.ts`
- Single-threaded test execution for stability
- Global test utilities available via `testUtils` export

### Styling Guidelines
- Use semantic design tokens from `panda.config.ts`
- Prefer Panda recipes over inline styles
- Default border radius is 16px (`radii.md`)
- Follow the liquid glass aesthetic with translucent surfaces

## Common Tasks

### Adding New Components
1. Create component directory in appropriate location
2. Implement using Ark UI primitive + Panda recipe
3. Export from main `index.ts`
4. Add to Panda staticCss generation if needed

### Modifying Design Tokens
1. Update `panda.config.ts` tokens/recipes/slotRecipes
2. Run `bunx panda build` to regenerate CSS (happens automatically on `prepare` script)
3. Test affected components
4. Components use comprehensive slot recipes for multi-part styling

### Publishing
```bash
# Prepare for publishing (runs type-check + build)
bun run prepublishOnly
```

## Library Export Strategy

The library supports both root imports and subpath imports:
- Root: `import { Button } from "liquidify-react"`
- Subpath: `import { Button } from "liquidify-react/button"`
- Styles: `import "liquidify-react/styles"`

### Build Output Details
- **Formats**: Dual ESM (`.mjs`) and CJS (`.cjs`) builds
- **CSS**: Single `liquidify.css` file with all styles and tokens
- **Types**: Full TypeScript definitions with subpath mapping
- **Entry Discovery**: Vite automatically discovers component entries via `discoverEntries()` function

Consumers must import the CSS once to get all design tokens and component styles.