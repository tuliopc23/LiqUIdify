# LiquidUI Project Architecture

## Overview

LiquidUI is a monorepo project consisting of three main parts:

1. **Component Library** - A production-ready React component library with glassmorphism design
2. **Storybook Showcase** - Interactive component documentation for developers
3. **VitePress Documentation** - Comprehensive documentation website for users

## Project Structure

```
liquidify/
├── apps/
│   ├── docs/              # VitePress documentation site
│   │   ├── .vitepress/    # VitePress configuration
│   │   ├── guide/         # User guides
│   │   ├── components/    # Component documentation
│   │   └── api/           # API reference
│   ├── docs-e2e/          # E2E tests for documentation
│   └── storybook/         # Storybook showcase
│       └── .storybook/    # Storybook configuration
├── libs/
│   └── components/        # Main component library
│       └── src/
│           ├── components/    # React components
│           ├── core/          # Core utilities
│           ├── hooks/         # Custom React hooks
│           ├── providers/     # Context providers
│           ├── stories/       # Storybook stories
│           ├── styles/        # CSS styles
│           ├── tokens/        # Design tokens
│           ├── types/         # TypeScript types
│           └── utils/         # Utility functions
├── static-export/         # Static HTML examples
├── scripts/               # Build and utility scripts
└── package.json           # Root package configuration
```

## Build Configuration

### Component Library (Vite)

The main library is built using Vite with the following configuration:

- **Entry Point**: `libs/components/src/index.ts`
- **Output**: `dist/libs/components/`
- **Formats**: ESM (`.mjs`) and CommonJS (`.cjs`)
- **Styles**: Bundled CSS files in the dist folder
- **TypeScript**: Declaration files generated via `vite-plugin-dts`

### Storybook

- **Configuration**: `apps/storybook/.storybook/`
- **Stories**: Located in component folders and `libs/components/src/stories/`
- **Build Output**: `dist/storybook/`
- **Framework**: React with Vite builder

### VitePress Documentation

- **Configuration**: `apps/docs/.vitepress/config.ts`
- **Content**: Markdown files in `apps/docs/`
- **Build Output**: VitePress static site
- **Features**: Local search, syntax highlighting, responsive design

## Scripts

### Development

- `bun run dev` - Start Vite dev server for library development
- `bun run storybook` - Start Storybook dev server
- `bun run docs:dev` - Start VitePress dev server

### Building

- `bun run build` - Build all (library + Storybook + docs)
- `bun run build:lib` - Build component library only
- `bun run build:storybook` - Build Storybook static site
- `bun run docs:build` - Build VitePress documentation

### Quality

- `bun run lint` - Run quality checks
- `bun run format` - Format code
- `bun run test` - Run tests
- `bun run type-check` - TypeScript type checking

## Package Exports

The library provides multiple entry points:

- Main export: Full library
- Subpath exports: Individual components and bundles
  - `/button`, `/card`, etc. - Individual components
  - `/core`, `/forms`, `/layout` - Feature bundles
  - `/css` - Styles only

## Technology Stack

- **Runtime**: Bun
- **Framework**: React 18/19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS with glassmorphism effects
- **Documentation**: Storybook + VitePress
- **Package Manager**: Bun

## Current Status

✅ **Build Configuration Verified**: The monorepo is properly configured with:

- Vite for library bundling (ESM and CJS outputs)
- Storybook for component showcase
- VitePress for documentation

⚠️ **Component Implementation Status**:

- Most component implementations are missing from the repository
- Only Storybook stories and test files exist for most components
- Created a sample GlassButton component to verify the build process works
- All 52+ components mentioned in the README need to be implemented

⚠️ **Package.json Export Order**: The `types` field should come before `import` and `require` in the exports configuration for proper TypeScript resolution.

## Next Steps

1. Locate or recreate the missing component implementations
2. Ensure all imports and exports are properly configured
3. Test the build process for all three parts
4. Set up CI/CD pipeline for automated builds
5. Configure deployment for documentation sites
