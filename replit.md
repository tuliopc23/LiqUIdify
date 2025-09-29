# replit.md

## Overview

LiqUIdify is a production-ready React component library that brings Apple's post-WWDC 2025 design language to web applications. The library provides glassmorphism UI components with liquid glass aesthetics, blur effects, and Apple HIG-compliant design patterns. Built with TypeScript, React, Panda CSS, and Bun runtime, it offers 48+ accessible components wrapped around Ark UI primitives for consistent cross-platform experiences.

### Recent Enhancements (September 2025)
- **Physics-Based Spring Animations**: Implemented Apple-like spring physics with precise parameters (stiffness: 350, damping: 22, mass: 0.9)
- **Enhanced Touch Interactions**: Created unified `useInteractiveGlass` hook for consistent touch feedback across components
- **Component Polish**: Enhanced Card, Button, Checkbox, Switch, and Slider with sophisticated spring animations
- **Bundle Optimization**: Configured tree-shaking with individual component entry points
- **Production Ready**: Fixed packaging for npm publishing, moved dependencies to peer deps, added comprehensive documentation

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Component Library**: Monorepo structure with primary package in `libs/components`
- **Build System**: Vite-based build pipeline with dual ESM/CJS output
- **Styling System**: Panda CSS with atomic utilities, design tokens, and recipe-based component variants
- **Type System**: TypeScript-first with comprehensive type definitions and React 18/19 compatibility

### Design System Foundation
- **Apple HIG Compliance**: Implements post-WWDC 2025 "Liquid Glass" design language with 26px premium radii, SF Pro typography, and P3 adaptive colors
- **Token Architecture**: Centralized design tokens in `panda.config.ts` covering typography, spacing, colors, and glassmorphism effects
- **Component Variants**: CVA (Class Variance Authority) pattern for systematic component variations
- **Accessibility**: WCAG 2.1 AA compliant with Ark UI primitives providing ARIA support

### Build and Distribution
- **Multi-format Output**: ESM/CJS bundles with TypeScript declarations
- **Tree-shaking**: Subpath imports for optimal bundle sizes
- **CSS Architecture**: Side-effect CSS imports with PostCSS processing
- **Peer Dependencies**: React, React DOM, Ark UI, Framer Motion, and Lucide React as peers to prevent duplication

### Development Tooling
- **Runtime**: Bun as primary runtime with npm/yarn/pnpm compatibility
- **Code Quality**: Biome for formatting and linting, TypeScript for type checking
- **Testing**: Vitest with React Testing Library and optional Playwright + axe-core for accessibility testing
- **Preview System**: Static HTML previews for component development and testing

### Component Architecture
- **Base Components**: 47 Ark UI wrapper components plus 1 custom component
- **Composition Pattern**: Components colocate styles with re-exports through index files
- **Physics-based Interactions**: Framer Motion integration for smooth animations and micro-interactions
- **SSR Safety**: Server-side rendering compatible with proper hydration patterns

## External Dependencies

### Core UI Framework
- **@ark-ui/react**: Headless UI primitives providing accessibility and behavior
- **framer-motion**: Animation library for physics-based interactions and transitions
- **lucide-react**: Icon system for consistent iconography

### Styling and Design
- **@pandacss/dev**: CSS-in-JS framework with design tokens and utility generation
- **@park-ui/panda-preset**: Pre-configured Panda CSS preset for component recipes
- **class-variance-authority**: Type-safe component variant system

### Build and Development
- **vite**: Modern build tool for development and production builds
- **@vitejs/plugin-react**: React integration for Vite
- **typescript**: Type system for development and build-time checking
- **postcss**: CSS processing with autoprefixer for vendor prefixing

### Testing and Quality
- **vitest**: Unit testing framework with React Testing Library integration
- **@testing-library/react**: Component testing utilities
- **@axe-core/playwright**: Accessibility testing for compliance validation
- **@biomejs/biome**: Code formatting and linting for consistent code style

### Peer Dependencies
- **react**: UI framework (versions 18-19)
- **react-dom**: DOM rendering for React components
- All external UI dependencies are peers to prevent version conflicts and reduce bundle size