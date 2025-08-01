---
layout: home

hero:
  name: "LiquidUI"
  text: "Modern Glassmorphism Components"
  tagline: "Production-ready React component library with 52+ components. Beautiful glass effects, fully accessible, and optimized for performance."
  image:
    src: /logo.svg
    alt: LiquidUI
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
    title: Beautiful Glassmorphism Design
    details: Stunning frosted glass effects with customizable blur, transparency, and colors. Every component is crafted for modern, elegant interfaces.
  - icon: ⚡
    title: Blazing Fast Performance
    details: Core bundle < 30KB, full bundle < 60KB. Tree-shakeable architecture with code-splitting and lazy loading support.
  - icon: ♿
    title: Accessibility First
    details: WCAG 2.1 AA compliant. Full keyboard navigation, screen reader support, focus management, and ARIA attributes.
  - icon: 🛠️
    title: Developer Experience
    details: TypeScript-first with complete type safety. Comprehensive docs, Storybook examples, and IntelliSense support.
  - icon: 📦
    title: Modular Architecture
    details: Import only what you need. Organized bundles for core, forms, navigation, feedback, and more.
  - icon: 🎯
    title: Production Ready
    details: Battle-tested with 100% test coverage. E2E tests, visual regression, and performance benchmarks.
  - icon: 🌈
    title: Theming & Customization
    details: Powerful theming system with CSS variables. Dark mode support and preset themes included.
  - icon: 🚀
    title: Modern Stack
    details: Built with React 18/19, supports Next.js, Remix, Vite, and all modern frameworks.
  - icon: 🔒
    title: Enterprise Grade
    details: Security audited, performance optimized, and maintained with semantic versioning.
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
