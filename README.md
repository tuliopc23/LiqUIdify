# 🌊 LiqUIdify

[![npm version](https://img.shields.io/npm/v/liquidify)](https://www.npmjs.com/package/liquidify)
[![npm downloads](https://img.shields.io/npm/dm/liquidify)](https://www.npmjs.com/package/liquidify)
[![Build Status](https://github.com/tuliopc23/LiqUIdify/actions/workflows/ci.yml/badge.svg)](https://github.com/tuliopc23/LiqUIdify/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/liquidify)](https://bundlephobia.com/package/liquidify)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Storybook](https://img.shields.io/badge/Storybook-52%2B%20Components-ff4785)](https://liquidify-storybook.vercel.app)

> 🚀 **Production-ready React component library** with glassmorphism design. 52+ components, TypeScript-first, WCAG 2.1 AA compliant, tree-shakeable, and framework agnostic.

## ✨ Features

- 🎨 **52+ Glassmorphism Components** - Beautiful, modern UI components with glass effects
- ⚡ **Optimized Performance** - Core bundle < 30KB, full bundle < 60KB
- 🔧 **TypeScript First** - Full type safety and IntelliSense support
- ♿ **WCAG 2.1 AA Compliant** - Keyboard navigation, screen reader support, focus management
- 🎯 **Tree Shakeable** - Import only what you need with modular architecture
- 📱 **Responsive & Adaptive** - Mobile-first with touch gesture support
- 🌙 **Theme System** - Dark mode, custom themes, CSS variables
- 🔄 **Framework Agnostic** - Works with Next.js, Remix, Vite, CRA
- 📦 **Multiple Entry Points** - Core, forms, navigation, feedback bundles
- 🎭 **Smooth Animations** - 60fps with GPU acceleration
- 🛡️ **Enterprise Ready** - Security audited, fully tested
- 📚 **Comprehensive Docs** - Storybook, API docs, migration guides

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
import {
  GlassButton,
  GlassCard,
  UnifiedGlassProvider,
  LiquidGlassDefs,
} from "liquidify";
import "liquidify/css";

function App() {
  return (
    <UnifiedGlassProvider>
      {/* Injects SVG filter defs once so CSS filter:url(#...) works */}
      <LiquidGlassDefs />
      <GlassCard variant="elevated" className="liquid-glass">
        <h1>Welcome to LiqUIdify</h1>
        <p>Beautiful glassmorphism components for modern React apps.</p>
        <GlassButton variant="primary" size="large">
          Get Started
        </GlassButton>
      </GlassCard>
    </UnifiedGlassProvider>
  );
}
```

### Modular Imports

```tsx
// Import specific components for smaller bundle size
import { GlassButton } from "liquidify/button";
import { GlassCard } from "liquidify/card";
import { GlassModal } from "liquidify/modal";

// Import component bundles by category
import * as Core from "liquidify/core";
import * as Forms from "liquidify/forms";
import * as Navigation from "liquidify/navigation";
import * as Feedback from "liquidify/feedback";

// Import just the CSS you need
import "liquidify/css"; // All styles
```

## 📚 Documentation

- 📚 **[Storybook](https://liquidify-storybook.vercel.app)** - Live component playground with 52+ interactive examples
- 📘 **[Documentation Site](https://liquidify-docs.vercel.app)** - Comprehensive guides and API reference
- 🚀 **[Getting Started](https://liquidify-docs.vercel.app/guide/)** - Quick setup and basic usage
- ♿ **[Accessibility Guide](./docs/ACCESSIBILITY_GUIDE.md)** - WCAG compliance and best practices
- 📊 **[Performance Guide](./docs/PERFORMANCE_GUIDE.md)** - Optimization tips and benchmarks
- 🔄 **[Migration Guide](./docs/MIGRATION_GUIDE.md)** - Migrate from other UI libraries
- 🛡️ **[Security](./SECURITY.md)** - Security policies and reporting

## 🎨 Component Categories

### 🎯 Core Components (15KB bundle)

- `GlassButton` - Interactive buttons with magnetic hover and ripple effects
- `GlassCard` - Container components with compound component pattern
- `GlassInput` - Form inputs with validation states and icons
- `GlassModal` - Overlay dialogs with focus trap and animations
- `GlassErrorBoundary` - Graceful error handling with glass styling
- `GlassFocusTrap` - Accessibility-focused component wrapper

### 📝 Form Components (8KB bundle)

- `GlassFormField` - Complete form field wrapper with validation
- `GlassCheckbox` & `GlassCheckboxGroup` - Styled checkboxes with groups
- `GlassRadioGroup` - Radio button groups with proper ARIA
- `GlassSelect` - Dropdown selectors with search functionality
- `GlassTextarea` - Multi-line text inputs with auto-grow
- `GlassSlider` - Range sliders with custom styling
- `GlassSwitch` - Toggle switches with smooth animations
- `GlassNumberInput` - Number inputs with increment/decrement
- `GlassDatePicker` - Date selection with calendar popup
- `GlassFileUpload` - Drag & drop file upload with progress

### 🧭 Navigation Components (6KB bundle)

- `GlassTabs` - Tabbed interfaces with keyboard navigation
- `GlassBreadcrumbs` - Navigation breadcrumbs with separators
- `GlassMobileNav` - Mobile-optimized navigation
- `GlassSkipNavigation` - Accessibility skip links

### 💬 Feedback Components (5KB bundle)

- `GlassToast` - Notification toasts with positioning
- `GlassProgress` - Progress indicators (linear, circular, steps)
- `GlassLoading` - Loading spinners (spinner, dots, pulse, bars)
- `GlassNotification` - System notifications with actions
- `GlassSkeleton` - Loading placeholders with shimmer effects

### 📊 Advanced Components (12KB bundle)

- `GlassChart` - Data visualization (Line, Bar, Donut charts)
- `GlassTable` - Data tables with sorting, filtering, pagination
- `GlassPlayground` - Interactive code playground with live editing
- `GlassPerformanceMonitor` - Real-time performance metrics
- `AppleLiquidGlass` - Advanced glassmorphism effects

### ♿ Accessibility Components (4KB bundle)

- `GlassAccessibleDemo` - Accessibility features demonstration
- `GlassFocusDemo` - Focus management examples
- `GlassLiveRegion` - Screen reader announcements
- `GlassVisuallyHidden` - Screen reader only content

## 🎯 Framework Integration

### Next.js

```tsx
// pages/_app.tsx
import { ThemeProvider } from "liquidify";
import "liquidify/styles";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
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
- **Run Storybook:**
  ```sh
  bun run storybook
  ```
- **Build Storybook static site:**
  ```sh
  bun run build:storybook
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
- Use Vite, Bun, and qlty for all new projects.
- Update `vite.config.ts` and `package.json` workspaces if needed.

## No Nx Required

This monorepo is powered by Bun workspaces and Vite. Nx is no longer required or used.

## 📄 License

MIT © [Tulio Pinheiro Cunha](https://tuliocunha.dev)

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - UI library

## 📊 Project Status

| Metric            | Status                            |
| ----------------- | --------------------------------- |
| Components        | 52/52 with Storybook coverage     |
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

- **[📖 Storybook](https://liquidify-storybook.vercel.app)** - Interactive component playground
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
    <a href="https://liquidify-storybook.vercel.app">📖 Storybook</a> •
    <a href="https://github.com/tuliopc23/LiqUIdify">🔗 GitHub</a> •
<a href="https://www.npmjs.com/package/liquidify">📦 NPM</a>
    <a href="https://liquidify-docs.vercel.app/api/">📋 API Docs</a>
  </p>
  <p>
    <strong>52 components • 100% TypeScript • WCAG 2.1 AA • MIT License</strong>
  </p>
</div>
