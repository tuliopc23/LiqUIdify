# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LiqUIdify is a production-ready React component library featuring glassmorphism design patterns and physics-based interactions. It provides 40+ TypeScript-first components with full accessibility support and a sophisticated modular bundle system.

## Essential Commands

### Development
```bash
bun run dev          # Start development server
bun run build        # Build the library
bun run test         # Run unit tests
bun run lint         # Run OxLint
bun run type-check   # Check TypeScript types
bun run format       # Format code with Prettier
```

### Testing
```bash
bun run test:ci          # Run tests with coverage
bun run test:e2e         # Run Playwright E2E tests
bun run test:a11y        # Run accessibility tests
bun run test:visual      # Run visual regression tests
bun run test:performance # Run performance tests
```

### Bundle Management
```bash
bun run build:analyze         # Analyze bundle sizes
bun run bundle:budget:check   # Check bundle size budgets
bun run bundle:budget:enforce # Enforce size limits (CI)
```

### Documentation
```bash
bun run storybook       # Start Storybook dev server
bun run build-storybook # Build Storybook
```

### Code Generation
```bash
bun run codegen:component  # Generate component boilerplate
bun run codegen:migration  # Generate migration scripts
bun run codegen:bundle     # Generate bundle configs
```

## Architecture Overview

### Modular Bundle System

The library uses a sophisticated bundle splitting strategy for optimal performance:

- **Core Bundle** (<15KB): `liquidify/core` - Essential components (Button, Card, Input)
- **Animations Bundle** (<10KB): `liquidify/animations` - Animation utilities
- **Advanced Bundle** (<8KB): `liquidify/advanced` - Complex components (Modal, Command Palette)
- **Forms Bundle**: `liquidify/forms` - Form components
- **Layout Bundle**: `liquidify/layout` - Layout components
- **Accessibility Bundle**: `liquidify/accessibility` - A11y components
- **Physics Bundle**: `liquidify/physics` - Physics simulation system

### Import Strategies

```typescript
// Traditional (imports everything - avoid in production)
import { GlassButton } from 'liquidify';

// Modular (recommended)
import { GlassButton } from 'liquidify/core';
import { GlassModal } from 'liquidify/advanced';

// Component-specific (maximum tree-shaking)
import GlassButton from 'liquidify/components/button';

// Dynamic (code splitting)
const { GlassModal } = await import('liquidify/advanced');
```

### Component Structure

Each component follows this pattern:
```
src/components/glass-component/
├── glass-component.tsx         # Implementation
├── glass-component.stories.tsx # Storybook stories
├── glass-component.test.tsx    # Tests
└── index.ts                   # Exports
```

### Key Systems

1. **SSR Safety**: All components are SSR-safe with hydration detection. Use `useIsomorphicLayoutEffect` and `useSSR` hooks for SSR-sensitive code.

2. **Theme System**: Components use CSS variables via ThemeProvider. Design tokens are in `src/tokens/`.

3. **Animation System**: Physics-based animations using Framer Motion. See `src/lib/physics/` for the physics engine.

4. **Accessibility**: All components follow WCAG guidelines using Radix UI primitives.

### Build System

- **Build Tool**: Vite with Rolldown and OXC transformer
- **CSS**: PostCSS with Tailwind CSS v4
- **Output**: Dual ESM/CJS with TypeScript declarations
- **Entry Points**: Multiple bundles + individual component entries

### Testing Requirements

Before committing changes:
1. Run `bun run lint` - Must pass OxLint checks
2. Run `bun run type-check` - Must have no TypeScript errors
3. Run `bun run test` - All tests must pass
4. Run `bun run build` - Build must succeed

### Performance Constraints

Bundle size limits are enforced:
- Core bundle: <15KB
- Animation bundle: <10KB
- Advanced bundle: <8KB
- Individual components: <5KB each

Use `bun run bundle:budget:check` to verify sizes.

### Development Patterns

1. **Component Creation**: Use `bun run codegen:component` to scaffold new components
2. **Styling**: Use Tailwind v4 classes with glass-morphism utilities
3. **State Management**: Prefer React Context for component state
4. **Error Handling**: Components include error boundaries
5. **Performance**: Use React.memo and useMemo appropriately
6. **Accessibility**: Test with screen readers and keyboard navigation

### Important Files

- `vite.config.ts`: Build configuration
- `src/bundles/`: Bundle entry points
- `src/core/`: Core utilities and systems
- `src/providers/`: Context providers
- `scripts/`: Build and optimization scripts
- `tailwind.config.ts`: Tailwind configuration
- `oxc.config.json`: OXC compiler settings

### CI/CD

GitHub Actions workflows handle:
- Code quality checks on PRs
- Bundle size monitoring
- Performance testing
- Automated npm publishing
- Visual regression testing

### Special Considerations

1. **Apple HIG**: Some components follow Apple Human Interface Guidelines
2. **Physics**: Advanced components use WebGL for effects
3. **Monitoring**: Sentry integration for error tracking
4. **Bundle Optimization**: Always prefer modular imports in production