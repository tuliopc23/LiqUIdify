---
layout: home

hero:
  name: "LiqUIdify"
  text: "Glassmorphism React Components"
  tagline: "Production-ready UI library with physics-based interactions and stunning glass effects"
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
    title: Glassmorphism Design
    details: Beautiful frosted glass effects with customizable blur, opacity, and color overlays
  - icon: ⚛️
    title: Physics-Based Interactions
    details: Realistic spring animations and magnetic hover effects powered by Framer Motion
  - icon: 🚀
    title: Production Ready
    details: TypeScript-first, tree-shakeable, with comprehensive testing and documentation
  - icon: ♿
    title: Accessibility First
    details: WCAG 2.1 AA compliant components with full keyboard navigation and screen reader support
  - icon: 📦
    title: Modular Architecture
    details: Import only what you need with optimized bundle splitting and lazy loading
  - icon: 🎯
    title: Developer Experience
    details: Intuitive API, comprehensive TypeScript support, and extensive documentation
---

## Quick Installation

```bash
# Using bun (recommended)
bun add liquidify

# Using npm
npm install liquidify

# Using yarn
yarn add liquidify
```

## Basic Usage

```tsx
import { GlassButton, GlassCard } from "liquidify";
import "liquidify/styles";

function App() {
  return (
    <GlassCard>
      <h1>Welcome to LiqUIdify</h1>
      <GlassButton variant="primary">Get Started</GlassButton>
    </GlassCard>
  );
}
```

## Why LiqUIdify

LiqUIdify combines the elegance of glassmorphism design with the power of modern React development. Built with performance and accessibility in mind, it provides a comprehensive set of components that work seamlessly together.

### Key Features

- **40+ Components**: From basic buttons to complex data tables
- **Physics Engine**: Realistic animations and interactions
- **Theme System**: Full customization with CSS variables
- **TypeScript**: Complete type safety and IntelliSense
- **Tree Shaking**: Optimal bundle size with modular imports
- **Dark Mode**: Built-in support for light and dark themes

Ready to build something amazing? [Get started →](/guide/)
