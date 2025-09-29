# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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