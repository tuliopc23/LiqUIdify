# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- TBD

### Changed
- TBD

### Fixed
- TBD

## [1.0.1] - 2024-12-19

### Added
- Enhanced Storybook documentation with comprehensive API references
- Advanced component showcase with interactive examples
- Extended accessibility testing utilities with vitest-axe integration

### Changed
- **BREAKING**: Migrated from Jest to Vitest for better ESM compatibility
- Improved TypeScript definitions for better developer experience
- Enhanced Storybook main config renamed to .cjs for ES module compatibility
- Optimized Vercel deployment configuration for docs site
- Enhanced CSS custom properties for easier theming
- Optimized bundle size through better tree-shaking

### Fixed
- Resolved 38 TypeScript errors across component library
- Fixed Storybook main config ES module compatibility issues
- Improved Vercel deployment settings for docs site with embedded Storybook
- Fixed shell syntax compatibility in build commands
- Moved liquid-glass styles into @layer utilities to silence Tailwind v4 warnings
- Refactored motion variants for better type safety and consistency
- Minor accessibility improvements in focus management
- Enhanced keyboard navigation consistency
- Improved screen reader announcements

### Development
- Complete migration from Jest to Vitest testing framework
- Updated all test configurations and dependencies
- Improved build pipeline with better ES module support
- Enhanced Storybook deployment integration

## [1.0.0] - 2024-12-19

### Added
- **Core Components**
  - GlassButton with 5 variants (primary, secondary, tertiary, ghost, destructive)
  - GlassCard with elevation and blur effects
  - GlassInput with search variant and glass styling
  - GlassTextarea with auto-resize capabilities
  - GlassSelect with custom dropdown styling
  - GlassModal with backdrop blur and animations
  - GlassTable with sorting and pagination support
  - GlassTabs with smooth transitions
  - GlassToast notification system
  - GlassTooltip with smart positioning
  - GlassAvatar with fallback and status indicators
  - GlassBadge with multiple variants
  - GlassProgress with animated progress bars
  - GlassLoading spinners and skeletons
  - GlassCheckbox with custom styling
  - GlassSwitch with smooth animations
  - GlassSlider with custom thumb and track
  - GlassChart components (Line, Bar, Donut)
  - GlassDropdown with glass effects
  - GlassPopover with smart positioning
  - GlassNotification system
  - GlassSearch with live suggestions

- **Layout Components**
  - GlassNavbar with responsive design
  - GlassSidebar with collapsible sections
  - GlassFooter with glass effects
  - GlassHeader with backdrop blur

- **Theme System**
  - ThemeProvider for light/dark mode
  - useTheme hook for theme management
  - Comprehensive CSS custom properties
  - Liquid glass design tokens

- **Physics & Interactions**
  - Magnetic hover effects with spring physics
  - Glass ripple effects on interactions
  - Fluid morphing transitions
  - Performance-optimized transforms
  - useMagneticHover hook
  - useRepulsionEffect hook

- **Accessibility**
  - WCAG 2.1 AA compliance
  - Comprehensive keyboard navigation
  - Screen reader support
  - Focus management
  - Color contrast optimization
  - Accessibility testing utilities

- **Developer Experience**
  - Full TypeScript support
  - Comprehensive Storybook documentation
  - Tree-shakeable exports
  - ESM bundle format
  - Automated testing suite
  - Visual regression testing

- **Testing & Quality**
  - Unit tests with Vitest
  - Accessibility tests with jest-axe
  - Visual regression tests
  - Performance monitoring hooks
  - Code coverage reporting

### Dependencies
- React 18+ support
- Radix UI primitives for accessibility
- Framer Motion for animations
- Tailwind CSS for styling
- Lucide React for icons

### Breaking Changes
- This is the initial release, no breaking changes

### Migration
- No migration needed for initial release

---

## Release Notes

### Version 1.0.0 - "Liquid Glass Foundation"

This is the inaugural release of LiquidiUI, bringing Apple-inspired liquid glass aesthetics to React applications. The library provides a comprehensive set of components built with accessibility, performance, and developer experience as core principles.

**Key Highlights:**
- 🎨 **70+ Components** - Complete UI component library
- ⚡ **Modern Stack** - React 18, TypeScript, Tailwind CSS
- ♿ **Accessibility First** - WCAG 2.1 AA compliant
- 🌓 **Theme System** - Light/dark mode with smooth transitions
- 🎭 **Micro-interactions** - SwiftUI-inspired physics and animations
- 📦 **Tree Shakeable** - Optimized bundle size
- 🧪 **Battle Tested** - Comprehensive test suite

**Performance:**
- Bundle size: ~185KB (ESM)
- Tree-shakeable components
- Optimized animations with RAF
- Lazy loading support

**Browser Support:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Getting Started:**
```bash
npm install @tuliopc23/liquidui
```

For detailed documentation, examples, and migration guides, visit our [documentation site](https://liquidui.dev).

### Acknowledgments
Special thanks to all contributors and beta testers who helped shape this release.
