---
layout: home

hero:
  name: "LiqUIdify"
  text: "Glassmorphism React Components"
  tagline: "Production-ready UI library with 52+ components, WCAG 2.1 AA compliant, and tree-shakeable architecture"
  image:
    src: /logo.svg
    alt: LiqUIdify
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View Components
      link: /components/
    - theme: alt
      text: View on GitHub
      link: https://github.com/tuliopc23/LiqUIdify

features:
  - icon: 🎨
    title: 52+ Glassmorphism Components
    details: Beautiful frosted glass effects with customizable blur, opacity, and saturation
  - icon: ⚡
    title: Optimized Performance
    details: Core bundle < 30KB, full bundle < 60KB with tree-shaking support
  - icon: ♿
    title: WCAG 2.1 AA Compliant
    details: Full keyboard navigation, screen reader support, and focus management
  - icon: 📦
    title: Modular Architecture
    details: Multiple entry points - core, forms, navigation, feedback bundles
  - icon: 🔧
    title: TypeScript First
    details: Complete type safety with IntelliSense and comprehensive API docs
  - icon: 🎯
    title: Framework Agnostic
    details: Works with Next.js, Remix, Vite, Create React App, and more
---

## Quick Installation

```bash
# Using npm
npm install @liquidify/components

# Using yarn
yarn add @liquidify/components

# Using pnpm
pnpm add @liquidify/components

# Using bun
bun add @liquidify/components
```

## Basic Usage

```tsx
import { GlassButton, GlassCard, UnifiedGlassProvider } from '@liquidify/components';
import '@liquidify/components/css';

function App() {
  return (
    <UnifiedGlassProvider>
      <GlassCard variant="elevated">
        <h1>Welcome to LiqUIdify</h1>
        <GlassButton variant="primary" size="large">
          Get Started
        </GlassButton>
      </GlassCard>
    </UnifiedGlassProvider>
  );
}
```

## Why LiqUIdify

LiqUIdify combines the elegance of glassmorphism design with the power of modern React development. Built with performance and accessibility in mind, it provides a comprehensive set of components that work seamlessly together.

### Key Features

- **52+ Components**: Complete UI toolkit with glassmorphism design
- **Bundle Sizes**: Core < 30KB, Full < 60KB with tree-shaking
- **Accessibility**: WCAG 2.1 AA compliant with aria-live regions
- **TypeScript**: Full type safety and IntelliSense support
- **Performance**: 60fps animations with GPU acceleration
- **Testing**: 100% coverage with unit, integration, and E2E tests

Ready to build something amazing? [Get started →](/guide/)
