# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
LiqUIdify is a React component library featuring glassmorphism design and physics-based interactions. The library provides 40+ components with an Apple-inspired "Liquid Glass" aesthetic, built with TypeScript, Tailwind CSS v4, and accessibility in mind.

### S-Tier Implementation Goals
The project is undergoing transformation to achieve "S-tier" production-ready status with these targets:
- **95%+ Lighthouse Accessibility Score** - Full WCAG 2.1 AA compliance
- **<30KB Core Bundle Size** - Aggressive optimization with tree-shaking
- **Zero Runtime Errors** - Production-grade error handling and recovery
- **Apple HIG Visual Excellence** - Pixel-perfect glassmorphism implementation
- **World-Class Developer Experience** - Comprehensive tooling and documentation

## Development Commands

### Essential Commands
```bash
npm run dev           # Start development server
npm run build         # Build the library
npm run test          # Run all tests
npm run lint          # Run ESLint
npm run type-check    # Run TypeScript type checking
npm run storybook     # Start Storybook for component development
```

### Testing Commands
```bash
npm run test:unit     # Run unit tests with Vitest
npm run test:e2e      # Run E2E tests with Playwright
npm run test:a11y     # Run accessibility tests
npm test -- --watch  # Run tests in watch mode
npm test -- path/to/test  # Run a specific test file
```

### Build Variants
```bash
npm run build:standard   # Standard build with all features
npm run build:optimized  # Optimized build with code splitting
npm run build:modular    # Individual component exports
npm run build:lite       # Minimal build without animations
```

## Architecture Overview

### Core Systems
The codebase implements several unified systems under `src/core/`:
- **Glass System** (`src/core/glass/`): Unified glassmorphism effects and backdrop filters
  - Multi-layer rendering: backdrop, overlay, specular, content layers
  - Use `unified-glass-system.ts` for all glass effects
- **Accessibility** (`src/core/accessibility/`): WCAG compliance and screen reader support
  - Keyboard navigation manager
  - Screen reader announcements
  - Focus trap utilities
- **Performance** (`src/core/performance/`): Optimization and monitoring
  - Bundle size tracking
  - Runtime performance metrics
  - Lazy loading strategies
- **Animation** (`src/lib/physics/`): Physics-based interactions with Framer Motion and GSAP
  - Choreographed animations
  - Spring physics system
  - Gesture recognition

### Component Structure
- Components are in `src/components/` with each having its own directory
- Each component typically includes:
  - Main component file (`.tsx`)
  - Types file (`types.ts`)
  - Styles (if component-specific)
  - Tests (`*.test.tsx`)
  - Stories (`*.stories.tsx`)

### Styling Approach
- Tailwind CSS v4 with custom glass-morphism utilities
- Design tokens in `src/tokens/`
- Global styles in `src/styles/`
- CSS layers for optimization: `@layer base, components, utilities`

### Bundle Strategy
The library supports multiple export strategies:
- Default export: Full library
- Named exports: Individual components for tree-shaking
- Bundle groups in `src/bundles/` (core, forms, data-display, etc.)

## Key Development Considerations

### SSR Safety
- Always use the `useSSRSafe` hook for browser-only operations
- Components must gracefully degrade without JavaScript
- Check `typeof window !== 'undefined'` before using browser APIs

### Performance Guidelines
- Core bundle target: <30KB (currently tracking via `.kiro/specs/`)
- Bundle split: Core (<15KB) + Animations (<10KB) + Advanced (<8KB)
- Use dynamic imports for heavy dependencies (GSAP, complex components)
- Implement graceful degradation for animations
- Monitor bundle size with `npm run analyze`
- Lazy load non-critical features

### Accessibility Requirements
- All components must support keyboard navigation
- ARIA attributes are mandatory
- Test with screen readers
- Maintain WCAG 2.1 AA compliance

### Animation System
- Primary: Framer Motion for declarative animations
- Secondary: GSAP for complex physics
- Always provide `prefers-reduced-motion` support
- Use the graceful degradation system in `src/components/graceful-degradation/`

## Testing Approach
- Unit tests: Cover component logic and hooks
- Integration tests: Test component interactions
- E2E tests: Critical user flows
- Visual regression: Storybook snapshots
- Accessibility: Automated axe-core checks

## Current Implementation Status
Based on `.kiro/specs/accessibility-performance-optimization/tasks.md`:

### Completed ✓
- Accessibility infrastructure foundation
- Performance optimization architecture
- Error recovery and SSR safety
- Apple Liquid Glass visual system
- Advanced animation physics engine

### In Progress
- Developer experience enhancements
- Testing infrastructure completion
- Legacy code consolidation
- Production deployment preparation

## Technical Debt Consolidation
The codebase has identified technical debt that needs addressing:

### High Priority Issues
- **15 Duplicate Glass Implementations** - Consolidate into unified glass system at `src/core/glass/`
- **8 Legacy Class Components** - Migrate to functional components with hooks
- **Mixed CSS Approaches** - Standardize on Tailwind v4 with CSS layers

### Implementation Patterns (REQUIRED)
When working on this codebase, you MUST follow these patterns:
- **Components**: Functional components only, no class components
- **Glass Effects**: Use the unified system at `src/core/glass/unified-glass-system.ts`
- **Animations**: Use centralized choreographer, no scattered animation logic
- **TypeScript**: Strict mode with no `any` types
- **SSR**: Always check `useSSRSafe` hook for browser operations
- **Error Handling**: Implement error boundaries with graceful fallbacks

### Anti-Patterns to AVOID
- Creating new glass effect implementations outside the unified system
- Using class components or legacy lifecycle methods
- Direct DOM manipulation without SSR checks
- Inline styles or CSS-in-JS (use Tailwind classes)
- Animation logic outside the choreographer system
- Importing from individual component files instead of bundles

## Package Publishing
- Automatic publishing via GitHub Actions on main branch
- Version bumping based on commit messages (feat: minor, fix: patch)
- Published as `liquidify` on NPM
- Exports ESM and CJS builds with TypeScript definitions