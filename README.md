# 🌊 LiqUIdify

[![npm version](https://img.shields.io/npm/v/liquidify-react)](https://www.npmjs.com/package/liquidify-react)
[![npm downloads](https://img.shields.io/npm/dm/liquidify-react)](https://www.npmjs.com/package/liquidify-react)
[![Build Status](https://github.com/tuliopc23/LiqUIdify/actions/workflows/ci.yml/badge.svg)](https://github.com/tuliopc23/LiqUIdify/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/liquidify-react)](https://bundlephobia.com/package/liquidify-react)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-green)](https://www.w3.org/WAI/WCAG21/quickref/)

> 🚀 **Production-ready React component library** with Apple's Liquid Glass design language. 40+ components built on Ark UI primitives with Panda CSS styling. TypeScript-first, WCAG 2.1 AA compliant, and optimized for modern React applications.

## ✨ Features

- 🍎 **Apple Liquid Glass Design** - Authentic Apple-inspired glassmorphism with backdrop blur effects
- 🏗️ **Ark UI Foundation** - Built on accessible, headless component primitives
- 🎨 **Panda CSS Styling** - Build-time CSS-in-JS with excellent developer experience
- ⚡ **Optimized Performance** - Tree-shakeable bundles with automatic CSS generation
- 🔧 **TypeScript First** - Full type safety with comprehensive type definitions
- ♿ **WCAG 2.1 AA Compliant** - Keyboard navigation, screen reader support, focus management
- 📱 **Responsive Design** - Mobile-first with Apple Human Interface Guidelines
- 🌙 **Theme System** - Light/dark modes with CSS custom properties
- 🔄 **Framework Agnostic** - Works with Next.js, Remix, Vite, and any React setup
- 🎭 **Smooth Animations** - 60fps animations with Framer Motion integration
- 🛡️ **Production Ready** - Fully tested with comprehensive accessibility coverage
- 📚 **Comprehensive Docs** - Mintlify documentation with live examples

## 🚀 Quick Start

### Installation

```bash
# Core library
bun add liquidify-react

# Required peer dependencies
bun add react react-dom @ark-ui/react framer-motion lucide-react
```

Other package managers:
```bash
npm install liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
yarn add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
pnpm add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

### Basic Usage

```tsx
import { Button } from "liquidify-react";

function App() {
  return (
    <Button variant="primary">
      Get Started
    </Button>
  );
}
```

Components automatically include Apple Liquid Glass styling through Panda CSS recipes.

### Architecture

LiqUIdify is built on three core technologies:

- **[Ark UI](https://ark-ui.com/)** - Accessible, headless component primitives
- **[Panda CSS](https://panda-css.com/)** - Build-time CSS-in-JS with type safety
- **Apple Design Language** - Authentic liquid glass effects and interactions

Components are automatically styled through Panda CSS slot recipes, providing consistent Apple-inspired design without manual class application.

## 📚 Documentation

- 📖 **[Full Documentation](https://docs.useliquidify.dev)** - Comprehensive guides and API reference
- ♿ **[Accessibility Guide](./docs/ACCESSIBILITY_GUIDE.md)** - WCAG compliance and best practices
- 📊 **[Performance Guide](./docs/PERFORMANCE_GUIDE.md)** - Optimization tips and benchmarks
- 🔄 **[Migration Guide](./docs/MIGRATION_GUIDE.md)** - Migrate from other UI libraries
- 🛡️ **[Security](./SECURITY.md)** - Security policies and reporting

## 🎨 Component Library

### Built on Ark UI Primitives

All components are built on [Ark UI](https://ark-ui.com/) primitives, providing:

- **Accessibility First** - WCAG 2.1 AA compliance out of the box
- **Headless Architecture** - Behavior separated from styling
- **Keyboard Navigation** - Full keyboard support for all interactions
- **Screen Reader Support** - Proper ARIA attributes and announcements
- **Focus Management** - Intelligent focus handling and trapping

### Apple Liquid Glass Styling

Components automatically receive Apple-inspired styling through Panda CSS:

- **Backdrop Blur Effects** - Authentic glassmorphism with CSS backdrop-filter
- **Smooth Animations** - 60fps animations with proper easing curves
- **Consistent Spacing** - 16px border radius standard across all components
- **iOS Color Palette** - Authentic Apple color system with proper contrast ratios
- **Responsive Design** - Mobile-first approach following Apple HIG guidelines
### Available Components

40+ components built on Ark UI primitives with Apple Liquid Glass styling:

**Form & Input Components:**
- Button, IconButton, Checkbox, Radio Group, Switch, Slider
- Input, Textarea, Select, Combobox, Date Picker, File Upload
- Number Input, Password Input, Pin Input, Tags Input

**Layout & Navigation:**
- Dialog, Popover, Tooltip, Tabs, Accordion, Collapsible
- Menu, Pagination, Steps, Splitter

**Feedback & Display:**
- Toast, Progress, Avatar, Scroll Area, Hover Card
- Floating Panel, Tour, Timer, QR Code

**Advanced Components:**
- Tree View, Color Picker, Angle Slider, Signature Pad
- Carousel, Rating Group, Segment Group, Toggle Group

All components include pre-built Apple Liquid Glass styling.

## 🎯 Framework Integration

LiqUIdify works with any React framework. Components include all necessary styles automatically.

### Next.js

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Vite + React

```tsx
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 🎨 Theming

LiqUIdify uses Panda CSS for theming with CSS custom properties. Components automatically adapt to your design system.

### Design Tokens

The library includes comprehensive design tokens for Apple-inspired theming:

- **Colors**: Primary, secondary, glass effects, and semantic colors
- **Typography**: SF Pro font family with proper scaling
- **Spacing**: Consistent spacing scale following Apple HIG
- **Animations**: Smooth transitions with proper easing curves

### Customization

Extend the theme using Panda CSS configuration or CSS custom properties:

```css
:root {
  --colors-primary: #007aff;
  --colors-glass-bg: rgba(255, 255, 255, 0.1);
  --radius-lg: 16px;
}
```

## ⚡ Performance

LiqUIdify is optimized for production:

- **Tree Shaking**: Import only what you use
- **Build-time CSS**: Panda CSS generates minimal stylesheets
- **60fps Animations**: Hardware-accelerated with Framer Motion
- **Memory Efficient**: Optimized for long-running applications
- **TypeScript**: Full type safety with zero runtime overhead

## 🧪 Testing

```bash
# Run all tests
bun run test

# Run single test file
vitest run <path-to-test-file>

# Run with coverage
bun test --coverage
```

Other package managers:
```bash
npm test
yarn test
pnpm test
```

Built with Vitest and @testing-library/react for reliable testing.

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development

```sh
# Install dependencies
bun install

# Build library
bun run build:lib

# Type check
bun run type-check

# Lint and format
bun run lint
bun run format

# Run tests
bun run test
```

Other package managers:
```sh
npm run build:lib  # npm run type-check, etc.
yarn build:lib     # yarn type-check, etc.
pnpm build:lib     # pnpm type-check, etc.
```

### Tech Stack

- **Bun** - Primary package manager and runtime
- **Vite** - Lightning-fast build tool
- **Panda CSS** - Build-time CSS-in-JS
- **Biome** - Fast linter and formatter
- **Vitest** - Blazing fast unit testing
- **TypeScript** - Full type safety

## 📄 License

MIT © [Tulio Pinheiro Cunha](https://tuliocunha.dev)

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Ark UI](https://ark-ui.com/) - Accessible component primitives
- [Panda CSS](https://panda-css.com/) - Build-time CSS-in-JS with excellent DX
- [React](https://reactjs.org/) - UI library

## 📊 Project Status

| Metric            | Status                        |
| ----------------- | ----------------------------- |
| Components        | 40+ with Apple Liquid Glass   |
| TypeScript        | 100% coverage                 |
| Accessibility     | WCAG 2.1 AA compliant         |
| Framework Support | React 18+, all major frameworks |
| Build System      | Vite + Panda CSS              |
| Package Manager   | Bun                           |

![GitHub stars](https://img.shields.io/github/stars/tuliopc23/LiqUIdify?style=social)
![GitHub forks](https://img.shields.io/github/forks/tuliopc23/LiqUIdify?style=social)
![GitHub issues](https://img.shields.io/github/issues/tuliopc23/LiqUIdify)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tuliopc23/LiqUIdify)

<!-- Auto-deployment test -->

---

## 🔗 Links

- **[📖 Documentation](https://docs.useliquidify.dev)** - Comprehensive guides and API reference
- **[🔗 GitHub](https://github.com/tuliopc23/LiqUIdify)** - Source code and issues
- **[📦 NPM](https://www.npmjs.com/package/liquidify-react)** - Package installation
- **[🐛 Issues](https://github.com/tuliopc23/LiqUIdify/issues)** - Bug reports and feature requests

## 🤝 Community

- **Contributing** - See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines

---

<div align="center">
  <p>Made with ❤️ by <a href="https://tuliocunha.dev">Tulio Pinheiro Cunha</a></p>
  <p>
    <a href="https://github.com/tuliopc23/LiqUIdify">🔗 GitHub</a> •
    <a href="https://www.npmjs.com/package/liquidify-react">📦 NPM</a> •
    <a href="https://docs.useliquidify.dev">📖 Docs</a>
  </p>
  <p>
    <strong>40+ components • 100% TypeScript • WCAG 2.1 AA • MIT License</strong>
  </p>
</div>
