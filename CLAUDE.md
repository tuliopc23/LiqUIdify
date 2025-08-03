# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Build Commands

- `bun run build` - Build everything (library + Storybook + docs)
- `bun run build:lib` - Build component library only
- `bun run build:storybook` - Build Storybook static site
- `bun run docs:build` - Build VitePress documentation
- `bun run build:watch` - Watch mode for library development

### Development Servers

- `bun run dev` - Start Vite dev server for library development
- `bun run storybook` - Start Storybook dev server (port 6006)
- `bun run docs:dev` - Start VitePress documentation dev server
- `bun run docs:preview` - Preview built documentation

### Code Quality

- `bun run lint` - Run quality checks using qlty
- `bun run format` - Format code using qlty
- `bun run format:fix` - Format and fix code issues
- `bun run type-check` - TypeScript type checking
- `bun run test` - Run tests with Bun

### Maintenance

- `bun run clean` - Clean dist directory
- `bun run clean:node` - Clean and reinstall dependencies

## High-Level Architecture

### Project Structure

This is a monorepo with three main parts:

1. **Component Library** (`libs/components/`) - React component library with glassmorphism design

   - Built with Vite, outputs ESM/CJS bundles and TypeScript declarations
   - Entry point: `libs/components/src/index.ts`
   - Exports 52+ components organized in bundles (core, forms, navigation, feedback, etc.)

2. **Storybook** (`apps/storybook/`) - Interactive component documentation

   - Configuration in `apps/storybook/.storybook/`
   - Stories located alongside components and in `libs/components/src/stories/`

3. **VitePress Documentation** (`apps/docs/`) - User-facing documentation site
   - Markdown-based documentation with guides and API reference

### Component Organization

Components follow a consistent structure:

```
components/glass-[name]/
├── glass-[name].tsx      # Component implementation
├── glass-[name].stories.tsx  # Storybook stories
├── glass-[name].test.tsx    # Tests (when present)
└── index.ts              # Public exports
```

### Bundle Strategy

The library provides multiple entry points for optimal tree-shaking:

- Main export: Full library bundle
- Individual components: `/button`, `/card`, `/input`, etc.
- Feature bundles: `/core`, `/forms`, `/navigation`, `/feedback`, etc.
- Styles: `/css` or `/styles`

### Design System Foundation

- **Unified Glass System** (`core/glass/unified-glass-system.tsx`) - Central glass effect implementation
- **Design Tokens** (`tokens/design-tokens.ts`) - Centralized design constants
- **CSS Architecture** - Liquid glass centered system with core liquid-glass.css and utilities in index.css
- **Accessibility First** - Components include ARIA attributes, keyboard navigation, and screen reader support

### Key Technologies

- **Runtime**: Bun (required version >=1.0.0)
- **Framework**: React 18/19 with TypeScript
- **Build Tool**: Vite with custom configuration
- **Styling**: CSS with glassmorphism effects, Tailwind utilities
- **Animation**: CSS animations with performance optimization
- **Quality**: qlty for linting and formatting

### Performance Considerations

- Bundle size targets: < 30KB core, < 60KB full
- CSS custom properties for runtime theming
- Modular imports to reduce bundle size
- SSR-compatible components with hydration detection

### Component Implementation Status

Note: Many component implementations are currently missing from the repository. The build system is configured correctly, but most components only have Storybook stories without actual implementations.
