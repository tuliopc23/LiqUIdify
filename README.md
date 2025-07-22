# 🌊 LiqUIdify

[![npm version](https://badge.fury.io/js/liquidify.svg)](https://badge.fury.io/js/liquidify)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/liquidify)](https://bundlephobia.com/package/liquidify)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Accessibility](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)

> 🚀 **Production-ready React component library with glassmorphism design and physics-based interactions**

A modern, lightweight, and highly optimized React component library featuring 40+ components with stunning glassmorphism
effects, physics-based animations, and enterprise-grade accessibility support.

## ✨ Features

- 🎨 **40+ Glass Components** - Beautiful glassmorphism design system
- ⚡ **Ultra-Lightweight** - Total bundle size < 30KB (tree-shakeable)
- 🔧 **TypeScript First**
- Full type safety and IntelliSense support
- ♿ **Accessibility Ready** - WCAG 2.1 AA compliant
- 🎭 **Physics-Based Animations** - Smooth, natural interactions
- 🌙 **Dark/Light Mode** - Built-in theme switching
- 📱 **Responsive Design** - Mobile-first approach
- 🔄 **SSR Safe** - Server-side rendering compatible
- 📦 **Modular Imports** - Import only what you need
- 🎯 **Apple HIG Compliant** - Follows Apple Human Interface Guidelines

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
import React from 'react';
import { GlassButton, GlassCard, ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';

function App() {
  return (
    <ThemeProvider>
      <GlassCard className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to LiqUIdify</h1>
        <GlassButton onClick={() => alert('Hello World!')}>
          Get Started
        </GlassButton>
      </GlassCard>
    </ThemeProvider>
  );
}

export default App;
```

## 📦 Modular Imports (Recommended)

Optimize your bundle size by importing only the components you need:

```tsx
// Core components (smallest bundle)
import { GlassButton, GlassCard } from 'liquidify/core';

// Specific component bundles
import { GlassModal, GlassDrawer } from 'liquidify/advanced';
import { GlassForm, GlassInput } from 'liquidify/forms';
import { GlassGrid, GlassContainer } from 'liquidify/layout';
import { GlassTooltip, GlassAlert } from 'liquidify/feedback';
import { GlassLoading, GlassFadeIn } from 'liquidify/animations';
```

## 🎨 Component Categories

### Core Components

- `GlassButton` - Interactive buttons with glass effects
- `GlassCard` - Container with glassmorphism styling
- `GlassInput` - Form inputs with glass design
- `GlassSelect` - Dropdown selects
- `GlassTextarea` - Multi-line text inputs

### Layout Components

- `GlassContainer` - Responsive containers
- `GlassGrid` - Flexible grid system
- `GlassStack` - Vertical/horizontal stacking
- `GlassDivider` - Visual separators
- `GlassSpacing` - Consistent spacing utilities

### Navigation

- `GlassNavigation` - Navigation bars
- `GlassBreadcrumbs` - Breadcrumb navigation
- `GlassTabs` - Tab interfaces
- `GlassSidebar` - Collapsible sidebars

### Feedback

- `GlassAlert` - Alert messages
- `GlassTooltip` - Contextual tooltips
- `GlassToast` - Toast notifications
- `GlassProgress` - Progress indicators
- `GlassLoading` - Loading spinners

### Advanced

- `GlassModal` - Modal dialogs
- `GlassDrawer` - Slide-out panels
- `GlassDropdown` - Dropdown menus
- `GlassAccordion` - Collapsible content
- `GlassChart` - Data visualization

## 🎭 Theme System

LiqUIdify includes a powerful theme system with built-in dark/light mode support:

```tsx
import { ThemeProvider, useTheme } from 'liquidify';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <GlassButton
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </GlassButton>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

## ♿ Accessibility

All components are built with accessibility in mind:

- **WCAG 2.1 AA Compliant** - Meets international accessibility standards
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - Proper ARIA labels and roles
- **Focus Management** - Logical focus flow
- **High Contrast** - Sufficient color contrast ratios

```tsx
import { GlassButton } from 'liquidify';

// Accessibility features built-in
<GlassButton
  aria-label="Save document"
  disabled={isLoading}
  onClick={handleSave}
>
  {isLoading ? 'Saving...' : 'Save'}
</GlassButton>
```

## 🔧 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { GlassButtonProps, GlassCardProps } from 'liquidify';

interface CustomButtonProps extends GlassButtonProps {
  customProp?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ customProp, ...props }) => {
  return <GlassButton {...props} />;
};
```

## 📱 Responsive Design

All components are mobile-first and responsive:

```tsx
import { GlassGrid, GlassCard } from 'liquidify/layout';

<GlassGrid
  cols={{ base: 1, md: 2, lg: 3 }}
  gap={{ base: 4, md: 6 }}
>
  <GlassCard>Card 1</GlassCard>
  <GlassCard>Card 2</GlassCard>
  <GlassCard>Card 3</GlassCard>
</GlassGrid>
```

## 🎯 Framework Integration

### Next.js

```tsx
// pages/_app.tsx
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';

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
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### Gatsby

```tsx
// gatsby-browser.js
import { ThemeProvider } from 'liquidify';
import 'liquidify/dist/liquidui.css';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
```

## 📊 Bundle Size Optimization

LiqUIdify is designed for optimal bundle sizes:

| Import Method        | Bundle Size | Use Case           |
|----------------------|-------------|--------------------|
| `liquidify/core`     | ~8KB        | Basic components   |
| `liquidify/forms`    | ~12KB       | Form components    |
| `liquidify/advanced` | ~18KB       | Complex components |
| Full import          | ~28KB       | All components     |

### Tree Shaking

The library is fully tree-shakeable. Only import what you use:

```tsx
// ✅ Good - Only imports specific components
import { GlassButton, GlassCard } from 'liquidify/core';

// ❌ Avoid - Imports entire library
import { GlassButton, GlassCard } from 'liquidify';
```

## 🧪 Testing

LiqUIdify components are thoroughly tested and provide testing utilities:

```tsx
import { render, screen } from '@testing-library/react';
import { GlassButton } from 'liquidify';

test('renders glass button', () => {
  render(<GlassButton>Click me</GlassButton>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

## 🔄 Server-Side Rendering

All components are SSR-safe and work with:

- **Next.js** - Full support including App Router
- **Gatsby** - Static site generation
- **Remix** - Server-side rendering
- **Vite SSR** - Vite's SSR capabilities

```tsx
// SSR-safe hooks included
import { useSSRSafeLocalStorage, useIsClient } from 'liquidify';

function ClientOnlyComponent() {
  const isClient = useIsClient();
  const [value, setValue] = useSSRSafeLocalStorage('key', 'default');

  if (!isClient) return <div>Loading...</div>;

  return <GlassCard>{value}</GlassCard>;
}
```

## 🎨 Customization

### CSS Custom Properties

Customize the glass effects using CSS variables:

```css
:root {
    --glass-opacity: 0.1;
    --glass-blur: 10px;
    --glass-border-opacity: 0.2;
    --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
}
```

### Tailwind CSS Integration

LiqUIdify works seamlessly with Tailwind CSS:

```tsx
<GlassCard className="p-6 m-4 bg-gradient-to-r from-purple-400 to-pink-400">
  <GlassButton className="mt-4 hover:scale-105 transition-transform">
    Custom Styled Button
  </GlassButton>
</GlassCard>
```

## 📚 Documentation

- 📖 **[Full Documentation](https://liquidify-docs.vercel.app)** - Comprehensive guides and API reference
- 🎨 **[Storybook](https://liquidify-storybook.vercel.app)** - Interactive component playground
- 🔧 **[API Reference](https://liquidify-docs.vercel.app/api)** - Complete API documentation
- 💡 **[Examples](https://github.com/tuliopc/liquidify/tree/main/examples)** - Real-world usage examples

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/tuliopc/liquidify.git
cd liquidify

# Install dependencies
bun install

# Start development server
bun dev

# Run tests
bun test

# Build library
bun build
```

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Apple's Human Interface Guidelines
- Built with modern React patterns and best practices
- Accessibility guidelines from WCAG 2.1
- Community feedback and contributions

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/tuliopc/liquidify/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/tuliopc/liquidify/discussions)
- 📧 **Email**: support@liquidify.dev
- 🐦 **Twitter**: [@liquidify_ui](https://twitter.com/liquidify_ui)

---

<div align="center"

**Made with ❤️ by the LiqUIdify Team**

[Website](https://liquidify.dev) • [Documentation](https://liquidify-docs.vercel.app) • [Storybook](https://liquidify-storybook.vercel.app) • [GitHub](https://github.com/tuliopc/liquidify)

</div>
