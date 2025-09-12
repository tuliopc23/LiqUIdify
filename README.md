# 🌊 LiqUIdify

[![npm version](https://img.shields.io/npm/v/liquidify)](https://www.npmjs.com/package/liquidify)
[![npm downloads](https://img.shields.io/npm/dm/liquidify)](https://www.npmjs.com/package/liquidify)
[![Build Status](https://github.com/tuliopc23/LiqUIdify/actions/workflows/ci.yml/badge.svg)](https://github.com/tuliopc23/LiqUIdify/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/liquidify)](https://bundlephobia.com/package/liquidify)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-green)](https://www.w3.org/WAI/WCAG21/quickref/)

> 🚀 **Production-ready React component library** with Apple's Liquid Glass design language. Built on Ark UI primitives with Panda CSS styling system. TypeScript-first, WCAG 2.1 AA compliant, and optimized for modern React applications.

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
# npm
npm install liquidify

# yarn
yarn add liquidify

# pnpm
pnpm add liquidify

# bun
bun add liquidify
```

### Basic Usage

```tsx
import { Button, Card, Input } from "liquidify";
import "liquidify/styles";

function App() {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <Card className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900">
          Welcome to LiqUIdify
        </h1>
        <Input placeholder="Enter your name" className="mb-4" />
        <Button variant="primary" className="w-full">
          Get Started
        </Button>
      </Card>
    </div>
  );
}
```

All components automatically inherit the Apple Liquid Glass styling through Panda CSS recipes.

### Architecture

LiqUIdify is built on three core technologies:

- **[Ark UI](https://ark-ui.com/)** - Accessible, headless component primitives
- **[Panda CSS](https://panda-css.com/)** - Build-time CSS-in-JS with type safety
- **Apple Design Language** - Authentic liquid glass effects and interactions

Components are automatically styled through Panda CSS slot recipes, providing consistent Apple-inspired design without manual class application.

## 📚 Documentation

- 📘 **[Documentation Site](https://liquidify.mintlify.app)** - Comprehensive guides and API reference built with Mintlify
- 🚀 **[Getting Started](https://liquidify.mintlify.app/getting-started/quickstart)** - Quick setup and basic usage
- 🎨 **[Component Showcase](https://liquidify-showcase.vercel.app)** - Live component examples and demos
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

The library includes all standard UI components built on Ark UI primitives:

**Form & Input Components:**
- Button, Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider
- Date Picker, File Upload, Number Input, Password Input, Pin Input

**Layout & Navigation:**
- Card, Dialog, Drawer, Popover, Tooltip, Tabs, Accordion
- Menu, Breadcrumbs, Pagination, Steps

**Feedback & Display:**
- Toast, Progress, Loading, Avatar, Badge, Skeleton
- Alert, Banner, Timeline

**Advanced Components:**
- Table, Tree View, Chart, Command Palette, Color Picker
- Carousel, Splitter, Floating Panel, Tour

All components automatically inherit Apple Liquid Glass styling through Panda CSS slot recipes.

## 🎯 Framework Integration

### Next.js

```tsx
// app/layout.tsx (App Router)
import "liquidify/styles";

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

### Vite

```tsx
// main.tsx
import { ThemeProvider } from "liquidify";
import "liquidify/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
```

### Remix

```tsx
// app/root.tsx
import { ThemeProvider } from "liquidify";
import liquidifyStyles from "liquidify/styles";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: liquidifyStyles },
];

export default function App() {
  return (
    <html>
      <head>
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

## 🎨 Theming

LiqUIdify supports comprehensive theming:

```tsx
import { ThemeProvider, createTheme } from "liquidify";

const customTheme = createTheme({
  colors: {
    primary: "#667eea",
    secondary: "#764ba2",
    glass: {
      background: "rgba(255, 255, 255, 0.1)",
      border: "rgba(255, 255, 255, 0.2)",
      blur: "10px",
    },
  },
  animations: {
    duration: "0.3s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
});

function App() {
  return <ThemeProvider theme={customTheme}>{/* Your app */}</ThemeProvider>;
}
```

### Readable vs Decorative Surfaces

LiqUIdify distinguishes between decorative translucent glass and readable surfaces:

- `--lg-bg-color` / `.bg-liquid`: lighter, more translucent (use for purely visual chrome)
- `--lg-bg-readable` / `.bg-liquid-readable`: higher opacity for WCAG AA text contrast
- `--lg-text` / `--lg-text-inverse`: automatic pairing for light/dark / accent contexts

When placing body text, prefer wrapping content in a container that uses `.bg-liquid-readable` (or components that already apply it internally) to guarantee contrast (≥4.5:1). Decorative backgrounds are fine for icons or large display text.

### Utility Classes

Included CSS exports provide helpful utilities:

```css
.bg-liquid           /* decorative glass */
.bg-liquid-readable  /* readable surface */
.text-liquid-primary
.text-liquid-inverse
.text-liquid-accent
```

These are optional; components already ship with sensible defaults.

## ⚡ Performance

LiqUIdify is built for performance:

- **Bundle Size**: < 30KB total (gzipped)
- **Tree Shaking**: Import only what you use
- **Lazy Loading**: Components load on demand
- **60fps Animations**: Smooth, hardware-accelerated
- **Memory Efficient**: Optimized for long-running apps

### Bundle Analysis

```bash
# Analyze your bundle
npm run analyze:bundles

# Check bundle size budget
npm run bundle:budget:check
```

## 🧪 Testing

LiqUIdify components are thoroughly tested:

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y

# Run visual regression tests
npm run test:visual
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## Monorepo Structure

- `apps/` — Applications (Storybook, docs, etc.)
- `libs/` — Libraries (component library, shared code)

## Getting Started

Install dependencies:

```sh
bun install
```

## Scripts (Bun-powered)

- **Build everything:**
  ```sh
  bun run build
  ```
- **Build component library:**
  ```sh
  bun run build:lib
  ```
- **Run VitePress docs (dev):**
  ```sh
  bun run docs:dev
  ```
- **Build VitePress docs:**
  ```sh
  bun run docs:build
  ```
- **Preview VitePress docs:**
  ```sh
  bun run docs:preview
  ```
- **Lint all code:**
  ```sh
  bun run lint
  ```
- **Format all code:**
  ```sh
  bun run format
  ```
- **Format and fix:**
  ```sh
  bun run format:fix
  ```
- **Run tests:**
  ```sh
  bun run test
  ```
- **Type-check:**
  ```sh
  bun run type-check
  ```

## Adding New Packages/Apps

- Add new apps to `apps/` and new libraries to `libs/`.
- Use Vite, Bun, and Biome for all new projects.
- Update `vite.config.ts` and `package.json` workspaces if needed.

## Modern Toolchain

This monorepo is powered by:
- **Bun** - Fast package manager and runtime
- **Vite** - Lightning-fast build tool
- **Panda CSS** - Build-time CSS-in-JS
- **Biome** - Fast linter and formatter
- **Vitest** - Blazing fast unit testing

## 📄 License

MIT © [Tulio Pinheiro Cunha](https://tuliocunha.dev)

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Ark UI](https://ark-ui.com/) - Accessible component primitives
- [Panda CSS](https://panda-css.com/) - Build-time CSS-in-JS with excellent DX
- [React](https://reactjs.org/) - UI library

## 📊 Project Status

| Metric            | Status                            |
| ----------------- | --------------------------------- |
| Components        | 40+ with comprehensive coverage    |
| Bundle Size       | < 30KB (core), < 60KB (full)      |
| TypeScript        | 100% coverage                     |
| Accessibility     | WCAG 2.1 AA compliant             |
| Framework Support | Next.js, Vite, Remix, Gatsby, CRA |
| Test Coverage     | 95%+                              |

![GitHub stars](https://img.shields.io/github/stars/tuliopc23/LiqUIdify?style=social)
![GitHub forks](https://img.shields.io/github/forks/tuliopc23/LiqUIdify?style=social)
![GitHub issues](https://img.shields.io/github/issues/tuliopc23/LiqUIdify)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tuliopc23/LiqUIdify)

<!-- Auto-deployment test -->

---

## 🔗 Links

- **[📖 Documentation](https://liquidify.mintlify.app)** - Comprehensive documentation site
- **[🔗 GitHub](https://github.com/tuliopc23/LiqUIdify)** - Source code and issues
  **[📦 NPM](https://www.npmjs.com/package/liquidify)**
- **[💬 Discussions](https://github.com/tuliopc23/LiqUIdify/discussions)** - Community discussions
- **[🐛 Issues](https://github.com/tuliopc23/LiqUIdify/issues)** - Bug reports and feature requests

## 🤝 Community

- **Discord** - [Join our community](https://discord.gg/liquidify)
- **Twitter** - [@liquidify_ui](https://twitter.com/liquidify_ui) for updates
- **Contributing** - See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines

---

<div align="center">
  <p>Made with ❤️ by <a href="https://tuliocunha.dev">Tulio Pinheiro Cunha</a></p>
  <p>
    <a href="https://github.com/tuliopc23/LiqUIdify">🔗 GitHub</a> •
<a href="https://www.npmjs.com/package/liquidify">📦 NPM</a>
    <a href="https://liquidify-docs.vercel.app/api/">📋 API Docs</a>
  </p>
  <p>
    <strong>52 components • 100% TypeScript • WCAG 2.1 AA • MIT License</strong>
  </p>
</div>
