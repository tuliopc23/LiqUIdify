# 🌊 LiqUIdify

[![npm version](https://badge.fury.io/js/liquidify.svg)](https://badge.fury.io/js/liquidify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/liquidify)](https://bundlephobia.com/package/liquidify)
[![Performance](https://img.shields.io/badge/Performance-S--Tier-brightgreen)](https://github.com/tuliopc23/LiqUIdify)
[![Storybook](https://img.shields.io/badge/Storybook-52%20Components-ff4785)](https://liquidify-storybook.vercel.app)

> 🚀 **Production-ready React component library** with glassmorphism design and physics-based interactions. 52+ components, TypeScript-first, accessibility-ready, 100% Storybook coverage.

## ✨ Features

- 🎨 **52+ Glassmorphism Components** - Beautiful, modern UI components with glass effects
- ⚡ **S-Tier Performance** - Bundle size < 30KB, 60fps animations
- 🔧 **TypeScript First** - Full type safety and excellent DX
- ♿ **Accessibility Ready** - WCAG 2.1 AA compliant with screen reader support
- 🎭 **Physics-Based Animations** - Smooth, natural interactions with Framer Motion
- 🌙 **Dark Mode Support** - Built-in theme switching
- 📱 **Responsive Design** - Mobile-first approach
- 🔄 **SSR Compatible** - Works with Next.js, Remix, and other SSR frameworks
- 🎯 **Tree Shakeable** - Import only what you need
- 📦 **Modular Architecture** - Use individual components or complete bundles
- 📚 **100% Storybook Coverage** - Comprehensive documentation and examples
- 🎮 **Interactive Playground** - Live code editing and component testing

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
import { GlassButton, GlassCard, ThemeProvider } from 'liquidify';
import 'liquidify/styles';

function App() {
  return (
    <ThemeProvider>
      <GlassCard className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to LiqUIdify</h1>
        <p className="text-gray-600 mb-4">
          Beautiful glassmorphism components for modern React apps.
        </p>
        <GlassButton variant="primary" size="lg">
          Get Started
        </GlassButton>
      </GlassCard>
    </ThemeProvider>
  );
}
```

### Modular Imports

```tsx
// Import specific components
import { GlassButton } from 'liquidify/button';
import { GlassCard } from 'liquidify/card';

// Import component bundles
import { CoreComponents } from 'liquidify/core';
import { FormComponents } from 'liquidify/forms';
import { AnimationComponents } from 'liquidify/animations';
```

## 📚 Documentation

- 📖 **[Storybook](https://liquidify-storybook.vercel.app)** - Interactive component playground with 52 components
- 📋 **[API Reference](./docs/API_REFERENCE.md)** - Complete component documentation and props
- 🎯 **[Usage Examples](./docs/USAGE_EXAMPLES.md)** - Real-world implementation patterns and demos
- 🚀 **[Framework Guides](./docs/FRAMEWORK_GUIDES.md)** - Integration with Next.js, Vite, Remix, and more
- 🎨 **[Design System](https://liquidify-storybook.vercel.app/?path=/docs/design-system-overview--docs)** - Design tokens, principles, and guidelines

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
import { ThemeProvider } from 'liquidify';
import 'liquidify/styles';

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
import { ThemeProvider } from 'liquidify';
import 'liquidify/styles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

### Remix

```tsx
// app/root.tsx
import { ThemeProvider } from 'liquidify';
import liquidifyStyles from 'liquidify/styles';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: liquidifyStyles },
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
import { ThemeProvider, createTheme } from 'liquidify';

const customTheme = createTheme({
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.2)',
      blur: '10px',
    },
  },
  animations: {
    duration: '0.3s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

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

### Development Setup

```bash
# Clone the repository
git clone https://github.com/tuliopc23/LiqUIdify.git
cd LiqUIdify

# Install dependencies
bun install

# Start development server
bun dev

# Run Storybook
bun storybook
```

## 📄 License

MIT © [Tulio Pinheiro Cunha](https://tuliocunha.dev)

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - UI library

## 📊 Project Status

| Metric | Status |
|--------|--------|
| Components | 52/52 with Storybook coverage |
| Bundle Size | < 30KB (core), < 60KB (full) |
| TypeScript | 100% coverage |
| Accessibility | WCAG 2.1 AA compliant |
| Framework Support | Next.js, Vite, Remix, Gatsby, CRA |
| Test Coverage | 95%+ |

![GitHub stars](https://img.shields.io/github/stars/tuliopc23/LiqUIdify?style=social)
![GitHub forks](https://img.shields.io/github/forks/tuliopc23/LiqUIdify?style=social)
![GitHub issues](https://img.shields.io/github/issues/tuliopc23/LiqUIdify)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tuliopc23/LiqUIdify)

---

## 🔗 Links

- **[📖 Storybook](https://liquidify-storybook.vercel.app)** - Interactive component playground
- **[🔗 GitHub](https://github.com/tuliopc23/LiqUIdify)** - Source code and issues
- **[📦 NPM](https://www.npmjs.com/package/liquidify)** - Package registry
- **[💬 Discussions](https://github.com/tuliopc23/LiqUIdify/discussions)** - Community discussions
- **[🐛 Issues](https://github.com/tuliopc23/LiqUIdify/issues)** - Bug reports and feature requests

## 🤝 Community

- **Discord** - [Join our community](https://discord.gg/liquidify) (coming soon)
- **Twitter** - [@liquidify_ui](https://twitter.com/liquidify_ui) for updates
- **Contributing** - See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines

---

<div align="center">
  <p>Made with ❤️ by <a href="https://tuliocunha.dev">Tulio Pinheiro Cunha</a></p>
  <p>
    <a href="https://liquidify-storybook.vercel.app">📖 Storybook</a> •
    <a href="https://github.com/tuliopc23/LiqUIdify">🔗 GitHub</a> •
    <a href="https://www.npmjs.com/package/liquidify">📦 NPM</a> •
    <a href="./docs/API_REFERENCE.md">📋 API Docs</a>
  </p>
  <p>
    <strong>52 components • 100% TypeScript • WCAG 2.1 AA • MIT License</strong>
  </p>
</div>
