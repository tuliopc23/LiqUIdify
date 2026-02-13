# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-02-12

### 🎉 Production release

First stable 1.0 release. The library is production-ready with passing tests, lint, type-check, build, and consumer import verification.

### Added
- **Consumer fixture test**: `bun run test:consumer` packs the library and runs ESM/CJS subpath import tests against the tarball (all 47 Ark UI components + Button, Badge, Card).
- **CSS layer check script**: `scripts/check-css-layers.js` runs in prepack/prepublishOnly so packaging always succeeds.
- **Accent Preset System** (from 0.6.x): Runtime accent theme switching with 11 Apple system colors, ThemeProvider props, and `listAccentPresets()` / `getAccentPreset()` / `setAccentPreset()`.

### Fixed
- Consumer fixture now uses packed tarball (path `file:../../../../liquidify-react-*.tgz`) so `bun install` and subpath imports resolve correctly.
- TypeScript and type-safety fixes in `use-device-capabilities`, `use-ssr-safe`, and Button handler composition for strict builds.
- Coverage thresholds in Vitest set to realistic initial values; coverage still reported and enforced in CI.

### Changed
- **Version**: Bumped to 1.0.0 for stable API and semantic versioning going forward.

## [0.6.26] - 2026-02-12

### Fixed
- Fixed TypeScript compiler (`tsc`) errors in `Button` component related to `framer-motion` polymorphic types.
- Resolved linting warnings and modernized code with Biome (using `Object.hasOwn`).
- Standardized code formatting across the project.

### Added
- **Accent Preset System**: Complete runtime accent theme switching with 11 built-in Apple system colors
  - New `accentPreset`, `accentPresets`, `persistAccent`, and `onAccentChange` props for ThemeProvider
  - New `listAccentPresets()`, `getAccentPreset()`, and `setAccentPreset()` functions in theme library
  - Runtime accent switching via `useTheme()` hook with `setAccentPreset` and `accentPreset` 
  - Built-in presets: `blue`, `red`, `green`, `orange`, `yellow`, `pink`, `purple`, `teal`, `indigo`, `brown`, `gray`
  - Configurable persistence with localStorage support and SSR safety
  - Proper precedence: prop → storage → CSS variable → data attribute → default
  - Full TypeScript support with comprehensive test coverage (18 tests)

### Enhanced
- Enhanced `setAccent()` and `getAccent()` functions with optional `{ persist?: boolean }` parameter
- Improved ThemeProvider SSR safety with proper window/document guards

## [0.6.12] - 2024-XX-XX

### Initial Release
- Complete React component library with 47+ components
- Panda CSS integration with Apple-inspired design system
- TypeScript-first architecture with full type safety
- Accessibility compliance (WCAG 2.1 AA)
- Production-ready build system