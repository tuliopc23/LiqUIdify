# Frequently Asked Questions

Common questions about LiqUIdify.

## General

### What is LiqUIdify?

LiqUIdify is a production-ready React component library with 100% Apple Human Interface Guidelines (HIG) compliance. It provides 48 accessible components calibrated to iOS 17 and macOS 14 design standards, including Apple's WWDC 2025 Liquid Glass design language.

### Why use LiqUIdify over Material UI, Chakra UI, or Radix UI?

LiqUIdify is the **only** React component library specifically calibrated to Apple's exact design standards. While Material UI follows Material Design and Chakra UI has its own system, LiqUIdify matches Apple's precise specifications:
- iOS 17/macOS 14 exact measurements
- Apple HIG spring physics animations
- 44px touch targets (Apple requirement)
- 6-level elevation system
- WWDC 2025 Liquid Glass effects

Choose LiqUIdify if you're building Apple-quality web applications.

### Is LiqUIdify free?

Yes! LiqUIdify is **100% free and open-source** under the MIT license. Use it in personal and commercial projects without restrictions.

### What frameworks does LiqUIdify support?

LiqUIdify works with any React framework:
- ✅ Next.js (App Router + Pages Router)
- ✅ Remix
- ✅ Vite + React
- ✅ TanStack Start
- ✅ Astro (with React islands)
- ✅ Create React App
- ✅ Any React 18/19 application

---

## Installation & Setup

### Do I need to install peer dependencies?

Yes. LiqUIdify requires these peer dependencies:
```bash
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

**Why?** This prevents version conflicts and duplicate React instances in your bundle.

### Can I use npm/yarn/pnpm instead of Bun?

Absolutely! LiqUIdify works with any package manager:
```bash
# npm
npm install liquidify-react @ark-ui/react framer-motion lucide-react

# yarn
yarn add liquidify-react @ark-ui/react framer-motion lucide-react

# pnpm
pnpm add liquidify-react @ark-ui/react framer-motion lucide-react
```

### Do I have to import the CSS?

Yes. Import the stylesheet once at your app's entry point:
```tsx
import 'liquidify-react/styles';
```

This includes all design tokens, component styles, and Panda CSS utilities.

### Can I use LiqUIdify with TypeScript?

Yes! LiqUIdify is **TypeScript-first** with complete type definitions for all components, props, and tokens.

---

## Components

### How many components are included?

**48 components** across 5 categories:
- 5 Basic components
- 14 Form components
- 7 Navigation components
- 8 Feedback components
- 14 Advanced components

[See complete list →](./components/overview.md)

### Are all components accessible?

Yes! All components are **WCAG 2.1 AA compliant** with:
- Keyboard navigation
- Screen reader support (ARIA labels)
- 4.5:1 text contrast
- 3:1 UI component contrast
- Focus indicators
- Reduced motion support

### Can I use individual components?

Yes! Use **subpath imports** for optimal tree-shaking:
```tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
```

This reduces bundle size by only including what you use.

### What's the difference between basic and Ark UI components?

- **Basic components** (Button, Card, Badge): Simple, single-element components
- **Ark UI components** (Dialog, Select, Tabs): Complex, multi-part components built on [Ark UI](https://ark-ui.com/) headless primitives

Use Ark UI components for advanced functionality like modals, dropdowns, and date pickers.

---

## Theming

### Can I customize the theme?

Yes! Three levels of customization:

1. **Theme Provider** (easiest):
   ```tsx
   <ThemeProvider defaultMode="dark" accentPreset="purple" />
   ```

2. **CSS Custom Properties** (medium):
   ```css
   :root {
     --ui-accent: #FF6B35;
   }
   ```

3. **Panda Config** (advanced):
   ```ts
   // panda.config.ts
   theme: {
     extend: {
       tokens: { /* custom tokens */ }
     }
   }
   ```

[Learn more →](./theming/overview.md)

### Does LiqUIdify support dark mode?

Yes! Dark mode is built-in with three options:
- `defaultMode="light"` - Always light
- `defaultMode="dark"` - Always dark
- `defaultMode="system"` - Follows OS preference

[Dark mode guide →](./theming/dark-mode.md)

### Can I change the accent color?

Yes! 11 built-in presets or custom colors:
```tsx
// Built-in preset
<ThemeProvider accentPreset="purple" />

// Custom color
<ThemeProvider defaultAccent="#FF6B35" />
```

[Accent colors guide →](./theming/accent-colors.md)

### Can I change fonts?

Yes! LiqUIdify uses SF Pro Display fallback stack by default, but you can override:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

<html className={inter.className}>
  {/* Your app */}
</html>
```

---

## WWDC 2025 Features

### What is Liquid Glass?

Liquid Glass is Apple's design language featuring:
- Translucent backgrounds with blur
- Multi-layer depth effects
- Light refraction (lensing)
- Frosted glass materials
- Motion-responsive highlights
- P3 wide gamut colors

[Liquid Glass guide →](./features/liquid-glass.md)

### Do I need a special display for P3 colors?

No! P3 colors **automatically fallback** to sRGB on standard displays. On capable displays (Pro Display XDR, iPad Pro, iPhone 12+), you get 20-30% enhanced vibrancy.

### What browsers support Liquid Glass effects?

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| backdrop-filter | ✅ 76+ | ✅ 9+ | ✅ 103+ | ✅ 79+ |
| P3 colors | ✅ 111+ | ✅ 10+ | ✅ 113+ | ✅ 111+ |

Fallbacks are provided for older browsers.

---

## Performance

### What's the bundle size?

| Import Method | Bundle Size (gzipped) |
|---------------|----------------------|
| Subpath import (1 component) | ~30 KB |
| Subpath import (5 components) | ~42 KB |
| Main entry (all components) | ~45 KB |
| CSS (always included) | ~45 KB |

**Total minimum:** ~75 KB gzipped (CSS + 1 component)

### How do I optimize bundle size?

1. **Use subpath imports:**
   ```tsx
   import { Button } from 'liquidify-react/button';
   ```

2. **Lazy load heavy components:**
   ```tsx
   const DatePicker = lazy(() => import('liquidify-react/ark-ui/datePicker'));
   ```

3. **Code split by route** (Next.js/Remix do this automatically)

[Performance guide →](./advanced/performance.md)

### Does LiqUIdify support SSR?

Yes! LiqUIdify is **100% SSR-safe** and works with:
- Next.js (App Router + Pages Router)
- Remix
- TanStack Start
- Astro
- Any SSR React framework

[SSR guide →](./advanced/ssr-and-rsc.md)

### Are animations 60fps?

Yes! All animations use:
- GPU acceleration (transform3d)
- Apple-standard timing curves
- requestAnimationFrame
- Automatic reduced-motion support

---

## Compatibility

### What React versions are supported?

**React 18 or React 19**

```json
{
  "peerDependencies": {
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19"
  }
}
```

### Does LiqUIdify work with Next.js 14/15?

Yes! Works with:
- ✅ Next.js 13 (App Router)
- ✅ Next.js 12 (Pages Router)  
- ✅ Next.js 14
- ✅ Next.js 15

[Next.js guide →](./guides/nextjs.md)

### Can I use LiqUIdify with Tailwind CSS?

While LiqUIdify uses Panda CSS internally, you can use Tailwind for your custom components. Just ensure Tailwind doesn't override LiqUIdify's styles:

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  // Avoid conflicting with Panda CSS classes
  corePlugins: {
    preflight: false,
  },
};
```

### Does LiqUIdify work in React Native?

No. LiqUIdify is designed for **web** only (React DOM). For React Native, use native UI libraries like React Native Paper or NativeBase.

---

## Development

### Can I contribute to LiqUIdify?

Yes! Contributions are welcome. See the [Contributing Guide](https://github.com/tuliopc23/LiqUIdify/blob/main/CONTRIBUTING.md).

### How do I report a bug?

[Open an issue on GitHub](https://github.com/tuliopc23/LiqUIdify/issues/new) with:
- Bug description
- Steps to reproduce
- Expected vs actual behavior
- Environment (React version, framework, browser)

### Is there a component library showcase?

Yes! Visit [useliquidify.dev](https://useliquidify.dev) for live examples and interactive demos.

### How do I request a feature?

[Open a feature request](https://github.com/tuliopc23/LiqUIdify/issues/new?labels=enhancement) on GitHub with:
- Use case description
- Expected API/behavior
- Why it's useful

---

## Comparison

### LiqUIdify vs Material UI

| Feature | LiqUIdify | Material UI |
|---------|-----------|-------------|
| Design System | Apple HIG | Material Design |
| Bundle Size | ~75 KB | ~150 KB+ |
| iOS/macOS Look | ✅ Native-like | ❌ Material |
| Dark Mode | ✅ Apple standard | ✅ Custom |
| Animation | ✅ Apple physics | ⚠️ Custom |

### LiqUIdify vs Chakra UI

| Feature | LiqUIdify | Chakra UI |
|---------|-----------|-----------|
| Design System | Apple HIG | Custom |
| Styling | Panda CSS | Emotion/Styled |
| Accessibility | ✅ WCAG 2.1 AA | ✅ WCAG 2.1 AA |
| Component Count | 48 | 50+ |
| Learning Curve | Low | Medium |

### LiqUIdify vs Radix UI

| Feature | LiqUIdify | Radix UI |
|---------|-----------|-----------|
| Styling | ✅ Built-in | ❌ Unstyled |
| Design System | ✅ Apple HIG | ❌ None |
| Accessibility | ✅ WCAG 2.1 AA | ✅ WCAG 2.1 AA |
| Ready to Use | ✅ Yes | ❌ Requires styling |

---

## Still Have Questions?

- **[Troubleshooting](./troubleshooting.md)** - Common issues
- **[Documentation](./README.md)** - Complete guides
- **[GitHub Discussions](https://github.com/tuliopc23/LiqUIdify/discussions)** - Community Q&A
- **[GitHub Issues](https://github.com/tuliopc23/LiqUIdify/issues)** - Bug reports

---

**Can't find your question?** [Ask on GitHub Discussions](https://github.com/tuliopc23/LiqUIdify/discussions)
