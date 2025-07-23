# 🌊 LiqUIdify

[![npm version](https://badge.fury.io/js/liquidify.svg)](https://badge.fury.io/js/liquidify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/liquidify)](https://bundlephobia.com/package/liquidify)
[![Performance](https://img.shields.io/badge/Performance-S--Tier-brightgreen)](https://github.com/tuliopc23/LiqUIdify)

> 🚀 **Production-ready React component library** with glassmorphism design and physics-based interactions. 40+ components, TypeScript-first, accessibility-ready.

## ✨ Features

- 🎨 **40+ Glassmorphism Components** - Beautiful, modern UI components with glass effects
- ⚡ **S-Tier Performance** - Bundle size < 30KB, 60fps animations
- 🔧 **TypeScript First** - Full type safety and excellent DX
- ♿ **Accessibility Ready** - WCAG 2.1 AA compliant with screen reader support
- 🎭 **Physics-Based Animations** - Smooth, natural interactions with Framer Motion
- 🌙 **Dark Mode Support** - Built-in theme switching
- 📱 **Responsive Design** - Mobile-first approach
- 🔄 **SSR Compatible** - Works with Next.js, Remix, and other SSR frameworks
- 🎯 **Tree Shakeable** - Import only what you need
- 📦 **Modular Architecture** - Use individual components or complete bundles

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

- 📖 **[Storybook](https://liquidify-storybook.vercel.app)** - Interactive component playground
- 📋 **[API Reference](./docs/API_REFERENCE.md)** - Complete component documentation
- 🎯 **[Usage Examples](./docs/USAGE_EXAMPLES.md)** - Real-world implementation patterns
- 🚀 **[Framework Guides](./docs/FRAMEWORK_GUIDES.md)** - Integration with Next.js, Vite, etc.

## 🎨 Component Categories

### Core Components
- `GlassButton` - Interactive buttons with glass effects
- `GlassCard` - Container components with backdrop blur
- `GlassInput` - Form inputs with glassmorphism styling
- `GlassModal` - Overlay dialogs and modals

### Form Components
- `GlassCheckbox` - Styled checkboxes
- `GlassRadio` - Radio button groups
- `GlassSelect` - Dropdown selectors
- `GlassTextarea` - Multi-line text inputs
- `GlassSlider` - Range sliders
- `GlassSwitch` - Toggle switches

### Navigation
- `GlassNavbar` - Navigation headers
- `GlassSidebar` - Side navigation panels
- `GlassTabs` - Tabbed interfaces
- `GlassBreadcrumb` - Navigation breadcrumbs

### Feedback
- `GlassToast` - Notification toasts
- `GlassAlert` - Alert messages
- `GlassProgress` - Progress indicators
- `GlassSpinner` - Loading spinners

### Advanced
- `GlassChart` - Data visualization
- `GlassTable` - Data tables
- `GlassCalendar` - Date pickers
- `GlassDropzone` - File upload areas

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

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/tuliopc23/LiqUIdify?style=social)
![GitHub forks](https://img.shields.io/github/forks/tuliopc23/LiqUIdify?style=social)
![GitHub issues](https://img.shields.io/github/issues/tuliopc23/LiqUIdify)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tuliopc23/LiqUIdify)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://tuliocunha.dev">Tulio Pinheiro Cunha</a></p>
  <p>
    <a href="https://liquidify-storybook.vercel.app">📖 Storybook</a> •
    <a href="https://github.com/tuliopc23/LiqUIdify">🔗 GitHub</a> •
    <a href="https://www.npmjs.com/package/liquidify">📦 NPM</a>
  </p>
</div>
