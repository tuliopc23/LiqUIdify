---
description: Repository Information Overview
alwaysApply: true
---

# LiqUIdify Information

## Summary

LiqUIdify is a production-ready React component library with glassmorphism design and physics-based interactions. It
offers 40+ components, is TypeScript-first, and accessibility-ready. The library features glass effects, animations, and
responsive design for modern web applications.

## Structure

- **src/**: Core source code with components, hooks, utilities, and styles
- **scripts/**: Build, test, and utility scripts for development and CI
- **docs/**: Documentation and guides
- **tests/**: Test files including visual regression tests
- **static-export/**: Static HTML exports of components
- **production-readiness-plan/**: Documentation for production deployment

## Language & Runtime

**Language**: TypeScript
**Version**: ES2020 target
**Build System**: Vite with Rolldown
**Package Manager**: Bun (with npm compatibility)

## Dependencies

**Main Dependencies**:

- React (>=18.0.0)
- Framer Motion (^12.23.6)
- GSAP (^3.13.0)
- Radix UI components
- Tailwind CSS (^4.1.11)
- Class Variance Authority (^0.7.1)

**Development Dependencies**:

- Vitest (^3.2.4)
- Playwright (^1.54.1)
- Storybook (^9.0.17)
- OXC/Oxlint (^1.7.0)
- TypeScript (^5.8.3)

## Build & Installation

```bash
# Install dependencies
bun install

# Development
bun run dev
bun run storybook

# Build
bun run build

# Test
bun run test
bun run test:e2e
bun run test:visual
```

## Testing

**Framework**: Vitest, Playwright
**Test Location**: src/**/*.test.tsx, tests/visual/**/*.visual.spec.ts
**Namincog Convention**: Component files with .test.tsx extension
**Configuration**: vitest.config.ts, playwright.config.ts
**Run Command**:

```bash
bun run test        # Unit tests
bun run test:e2e    # End-to-end tests
bun run test:visual # Visual regression tests
bun run test:a11y   # Accessibility tests
```

## Component System

**Component Structure**: src/components/[component-name]/
**Design System**: Tailwind CSS with custom glassmorphism utilities
**Accessibility**: WCAG 2.1 AA compliance with Radix UI primitives
**Variants**: Multiple glass effects and styles via class-variance-authority

## Build Output

**Module Formats**: ESM (.mjs), CommonJS (.cjs)
**CSS Output**: dist/liquidui.css
**Type Definitions**: dist/types/
**Bundle Analysis**: Available via bun run bundle:budget:check