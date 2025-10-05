# 🌊 LiqUIdify

**Production-ready React component library with 100% Apple Human Interface Guidelines compliance.**
iOS 17 / macOS 14 calibrated design tokens • 48 accessible components • WCAG 2.1 AA certified

[![npm version](https://img.shields.io/npm/v/liquidify-react)](https://www.npmjs.com/package/liquidify-react)
[![npm downloads](https://img.shields.io/npm/dm/liquidify-react)](https://www.npmjs.com/package/liquidify-react)
[![Build Status](https://github.com/tuliopc23/LiqUIdify/actions/workflows/ci.yml/badge.svg)](https://github.com/tuliopc23/LiqUIdify/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Apple HIG](https://img.shields.io/badge/Apple%20HIG-100%25%20Compliant-blue)](https://developer.apple.com/design/human-interface-guidelines)

**[Website](https://useliquidify.dev)** • **[Documentation](https://docs.useliquidify.dev)** • **[npm Package](https://www.npmjs.com/package/liquidify-react)** • **[GitHub](https://github.com/tuliopc23/LiqUIdify)**

---

## Why LiqUIdify?

LiqUIdify is the **only** React component library calibrated to Apple's exact iOS 17 and macOS 14 design standards. While Material UI, Chakra UI, and Radix UI offer excellent components, **none are built specifically for Apple-quality web applications**.

| Feature | LiqUIdify | Material UI | Chakra UI | Radix UI |
|---------|-----------|-------------|-----------|----------|
| **Apple HIG Compliance** | ✅ 100% | ❌ Material Design | ❌ Custom System | ❌ Unstyled |
| **iOS 17/macOS 14 Calibrated** | ✅ Exact values | ❌ | ❌ | ❌ |
| **44px Touch Targets** | ✅ HIG Standard | ⚠️ Varies | ⚠️ Varies | ⚠️ Unstyled |
| **Spring Animations** | ✅ Apple physics | ⚠️ Custom | ⚠️ Custom | ❌ None |
| **Elevation System** | ✅ 6-level (iOS) | ⚠️ Material | ⚠️ Custom | ❌ None |
| **Reduced Motion** | ✅ Full support | ⚠️ Partial | ⚠️ Partial | ❌ None |
| **Liquid Glass Effects** | ✅ Native-like blur | ❌ | ❌ | ❌ |
| **WCAG 2.1 AA** | ✅ Certified | ✅ | ✅ | ⚠️ Varies |

**Choose LiqUIdify if:**
- You're building for Apple platforms (iOS, macOS, iPadOS, visionOS web experiences)
- You need pixel-perfect alignment with Apple's design language
- You want users to feel native quality in web apps
- You require production-ready accessibility out of the box

---

## ✨ Features

### 🍎 100% Apple HIG Compliance
Every component, animation, and interaction follows Apple's Human Interface Guidelines exactly. **Not "inspired by"—compliant with.**

- **iOS 17 Animation System**: Spring physics (mass: 1, stiffness: 180, damping: 20) with Apple-standard timing (0.15s instant, 0.3s quick, 0.5s flow, 0.6s bounce)
- **macOS 14 Elevation**: 6-level shadow system (0dp → 24dp) matching iOS depth standards
- **Touch Targets**: All interactive elements meet 44×44pt minimum (Apple HIG requirement)
- **Border Radii**: iOS 17 calibrated (16px cards, 10px controls, 12px fields)
- **SF Pro Typography**: Complete dynamic type scale (caption2 → largeTitle) with HIG-exact line heights

### ♿ WCAG 2.1 AA Accessibility
Production-ready accessibility with zero configuration required.

- **4.5:1 contrast** for body text, **3:1** for large text and UI components
- **Keyboard navigation** with visible focus states on all interactive elements
- **Screen reader optimized** with proper ARIA labels and live regions
- **Reduced motion support** via `prefers-reduced-motion` (all animations disabled or instant)
- **High contrast mode** via `prefers-contrast` (enhanced borders and text)
- **Reduced transparency** support for users with vestibular disorders

### 🚀 Production-Ready
Battle-tested with enterprise-grade quality.

- **48 Components**: Forms, navigation, feedback, advanced interactions
- **TypeScript-first**: Complete type safety with auto-completion
- **Tree-shakeable**: Subpath imports minimize bundle size (base: 28KB gzipped)
- **Zero runtime errors**: Comprehensive test coverage with Vitest
- **SSR/RSC safe**: Works with Next.js, Remix, and all React frameworks
- **Peer dependencies**: React, Ark UI, Framer Motion kept as peers to prevent duplicates

### 🎨 Liquid Glass Design System
Apple's signature visual language adapted for web.

- **Glassmorphism effects**: Native-like blur with `backdrop-filter`
- **Dynamic accent colors**: Runtime theming with CSS custom properties
- **Vibrancy modes**: Light and dark themes with automatic color adaptation
- **Responsive tokens**: Design scales beautifully from mobile to desktop
- **Panda CSS integration**: Atomic styles with recipes for customization

### ⚡ Performance Optimized
Fast by default with modern build tooling.

- **433KB CSS** (base stylesheet, includes all tokens and resets)
- **28KB JS** (tree-shaken main bundle, gzipped)
- **Subpath imports**: `import { Button } from "liquidify-react/button"` for granular control
- **No global CSS conflicts**: Panda CSS generates scoped atomic classes
- **Lazy-loadable**: Import components on-demand for code-splitting

---

## 🚀 Quick Start

### Installation

Install LiqUIdify and peer dependencies in one command:

```bash
# Bun (recommended)
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react

# npm
npm install liquidify-react react react-dom @ark-ui/react framer-motion lucide-react

# yarn
yarn add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react

# pnpm
pnpm add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

### Zero-Config Usage

Import the CSS once at your app entry point, then use components immediately:

```tsx
// main.tsx or App.tsx (import CSS once)
import "liquidify-react/styles";
import { Button, Card, Switch } from "liquidify-react";

function App() {
  return (
    <Card css={{ padding: "24px", maxWidth: "400px" }}>
      <h1>Welcome to LiqUIdify</h1>
      <p>100% Apple HIG compliant components, zero configuration.</p>
      <Button variant="filled" tone="accent">
        Get Started
      </Button>
    </Card>
  );
}

export default App;
```

> 💡 **CSS Import Required**: The `"liquidify-react/styles"` import loads design tokens, resets, and base styles. Import it once at your app root.

### Tree-Shaking (Optimize Bundle Size)

Use subpath imports for granular control:

```tsx
import { Button } from "liquidify-react/button";
import { Card } from "liquidify-react/card";
// Only Button and Card code is bundled
```

### Dynamic Theming

Add runtime theme and accent color control with `ThemeProvider`:

```tsx
import "liquidify-react/styles";
import { ThemeProvider, useTheme, Button } from "liquidify-react";

function ThemeToggle() {
  const { theme, setTheme, accent, setAccent } = useTheme();

  return (
    <div>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </Button>
      <Button onClick={() => setAccent("#34C759")}>
        Switch to Mint Accent
      </Button>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" defaultAccent="#007AFF">
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

**Accent color formats**:
- Hex: `#007AFF`, `#34C759`
- RGB: `rgb(0, 122, 255)`
- HSL: `hsl(211, 100%, 50%)`
- OKLCH: `oklch(62% 0.2 236)` (recommended for perceptual uniformity)
- CSS variables: `var(--brand-accent)`

---

## 🏗️ Architecture

### Design Tokens (iOS 17 / macOS 14 Calibrated)

LiqUIdify's design system is calibrated to Apple's exact iOS 17 and macOS 14 specifications:

```tsx
// Animation durations (Apple HIG standard)
durations: {
  instant: "0.15s",  // Tooltips, switches, immediate feedback
  quick: "0.3s",     // Standard transitions, buttons, tabs
  flow: "0.5s",      // Sheets, modals, page transitions
  bounce: "0.6s"     // Playful spring physics elements
}

// Spring animation physics (Apple standard)
spring: {
  mass: 1,
  stiffness: 180,
  damping: 20
}

// Elevation system (iOS 17 shadows)
elevation: {
  0: "none",                                    // Flat surfaces
  1: "0 1px 2px rgba(0,0,0,0.06), ...",        // Base elevation
  4: "0 4px 12px rgba(0,0,0,0.08), ...",       // Raised elements
  8: "0 8px 24px rgba(0,0,0,0.12), ...",       // Floating panels
  16: "0 16px 32px rgba(0,0,0,0.16), ...",     // Modals
  24: "0 24px 48px rgba(0,0,0,0.20), ..."      // Priority overlays
}

// Border radii (iOS 17 roles)
radii: {
  button: "9999px",     // Full capsule
  buttonCompact: "10px",
  control: "10px",      // Switches, checkboxes
  field: "12px",        // Input fields
  card: "16px",         // Cards and surfaces
  sheet: "16px",        // Modals and sheets
  pill: "9999px"        // Badges and tags
}

// Touch targets (Apple HIG requirement)
minTouchTarget: "44px"  // All interactive elements
```

### Animation System

All animations respect user preferences and follow Apple's motion guidelines:

```tsx
// Reduced motion compliance
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

// Standard button interaction
button: {
  transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  _hover: { transform: "scale(1.02)" },    // Subtle growth
  _active: { transform: "scale(0.97)" }    // Press feedback
}

// Modal entrance
modal: {
  animation: "slideUp 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0)"
}
```

### Component Architecture

- **Headless primitives**: Powered by Ark UI for robust, accessible behavior
- **Style recipes**: Panda CSS recipes attach atomic styles at runtime
- **Composition**: All components expose slots for deep customization
- **Type safety**: Full TypeScript support with generics where needed

---

## 📚 Components (48 Total)

### Forms & Inputs (15)
[Button](https://docs.useliquidify.dev/components/button) • [IconButton](https://docs.useliquidify.dev/components/icon-button) • [Checkbox](https://docs.useliquidify.dev/components/checkbox) • [RadioGroup](https://docs.useliquidify.dev/components/radio-group) • [Switch](https://docs.useliquidify.dev/components/switch) • [Slider](https://docs.useliquidify.dev/components/slider) • [AngleSlider](https://docs.useliquidify.dev/components/angle-slider) • [NumberInput](https://docs.useliquidify.dev/components/number-input) • [PasswordInput](https://docs.useliquidify.dev/components/password-input) • [PinInput](https://docs.useliquidify.dev/components/pin-input) • [TagsInput](https://docs.useliquidify.dev/components/tags-input) • [Select](https://docs.useliquidify.dev/components/select) • [Combobox](https://docs.useliquidify.dev/components/combobox) • [DatePicker](https://docs.useliquidify.dev/components/date-picker) • [FileUpload](https://docs.useliquidify.dev/components/file-upload)

### Navigation & Layout (7)
[Tabs](https://docs.useliquidify.dev/components/tabs) • [Accordion](https://docs.useliquidify.dev/components/accordion) • [Collapsible](https://docs.useliquidify.dev/components/collapsible) • [Menu](https://docs.useliquidify.dev/components/menu) • [Pagination](https://docs.useliquidify.dev/components/pagination) • [Steps](https://docs.useliquidify.dev/components/steps) • [Splitter](https://docs.useliquidify.dev/components/splitter)

### Feedback & Display (13)
[Toast](https://docs.useliquidify.dev/components/toast) • [Dialog](https://docs.useliquidify.dev/components/dialog) • [Modal](https://docs.useliquidify.dev/components/modal) • [Popover](https://docs.useliquidify.dev/components/popover) • [Tooltip](https://docs.useliquidify.dev/components/tooltip) • [HoverCard](https://docs.useliquidify.dev/components/hover-card) • [Progress](https://docs.useliquidify.dev/components/progress) (Linear/Circular) • [Avatar](https://docs.useliquidify.dev/components/avatar) • [Badge](https://docs.useliquidify.dev/components/badge) • [Card](https://docs.useliquidify.dev/components/card) • [ScrollArea](https://docs.useliquidify.dev/components/scroll-area) • [FloatingPanel](https://docs.useliquidify.dev/components/floating-panel) • [SymbolTile](https://docs.useliquidify.dev/components/symbol-tile)

### Advanced (13)
[TreeView](https://docs.useliquidify.dev/components/tree-view) • [ColorPicker](https://docs.useliquidify.dev/components/color-picker) • [SignaturePad](https://docs.useliquidify.dev/components/signature-pad) • [Carousel](https://docs.useliquidify.dev/components/carousel) • [RatingGroup](https://docs.useliquidify.dev/components/rating-group) • [SegmentGroup](https://docs.useliquidify.dev/components/segment-group) • [Toggle](https://docs.useliquidify.dev/components/toggle) • [ToggleGroup](https://docs.useliquidify.dev/components/toggle-group) • [QRCode](https://docs.useliquidify.dev/components/qr-code) • [Timer](https://docs.useliquidify.dev/components/timer) • [Tour](https://docs.useliquidify.dev/components/tour) • [Editable](https://docs.useliquidify.dev/components/editable) • [Clipboard](https://docs.useliquidify.dev/components/clipboard)

**[→ View all components with live examples](https://docs.useliquidify.dev/components)**

---

## 🎨 Theming & Customization

### CSS Custom Properties

Override design tokens globally:

```css
:root {
  /* Accent color */
  --ui-accent: #34C759;  /* Mint green */

  /* Border radii */
  --radii-card: 20px;

  /* Animation durations */
  --durations-quick: 0.2s;

  /* Elevation */
  --shadows-elevation-4: 0 4px 16px rgba(0,0,0,0.1);
}
```

### Panda CSS Integration

Extend styles with Panda CSS recipes:

```tsx
import { css } from "liquidify-react/css";
import { Button } from "liquidify-react";

const customButton = css({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  _hover: { boxShadow: "0 8px 24px rgba(102,126,234,0.4)" }
});

<Button className={customButton}>Custom Styled</Button>
```

### Component Slots

Customize specific parts of components:

```tsx
<Select.Root>
  <Select.Trigger css={{ borderRadius: "20px", padding: "12px 20px" }}>
    <Select.Value />
  </Select.Trigger>
  <Select.Content css={{ background: "rgba(255,255,255,0.95)" }}>
    {/* options */}
  </Select.Content>
</Select.Root>
```

---

## ⚡ Performance

### Bundle Sizes (Measured)

- **Base CSS**: 433KB (includes all tokens, resets, and component styles)
- **Main JS**: 28KB (gzipped, tree-shaken)
- **Individual component**: ~2-5KB (when using subpath imports)

### Tree-Shaking Effectiveness

```tsx
// Full import: ~28KB (all 48 components)
import { Button, Card, Switch } from "liquidify-react";

// Subpath import: ~6KB (only what you use)
import { Button } from "liquidify-react/button";
import { Card } from "liquidify-react/card";
import { Switch } from "liquidify-react/switch";
```

### Performance Best Practices

1. **Use subpath imports** for production builds
2. **Import CSS once** at app root (not per-component)
3. **Leverage code-splitting** with dynamic imports for large component sets
4. **Enable Brotli compression** on your server (reduces CSS to ~40KB)

---

## 🧪 Framework Compatibility

### Vite

```tsx
// main.tsx
import "liquidify-react/styles";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(<App />);
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import "liquidify-react/styles";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Remix

```tsx
// app/root.tsx
import liquidifyStyles from "liquidify-react/styles?url";

export const links = () => [
  { rel: "stylesheet", href: liquidifyStyles }
];
```

**SSR/RSC Safety**: LiqUIdify has no window access at import time. All components render safely on the server.

---

## 🛠️ Development

### Local Setup

```bash
# Clone repository
git clone https://github.com/tuliopc23/LiqUIdify.git
cd LiqUIdify

# Install dependencies
bun install

# Build library
bun run build:lib

# Run type checking
bun run type-check

# Run tests
bun test --run

# Run linting
bun run lint
```

### Scripts

- `bun run dev` - Start development server
- `bun run build:lib` - Build library to `libs/components/dist`
- `bun run type-check` - TypeScript compilation check
- `bun run lint` - Biome linting and formatting
- `bun run test` - Run Vitest test suite
- `bun run prepublishOnly` - Pre-publish validation (type-check + build)

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting PRs.

### Development Process

1. **Fork the repository** and create a feature branch
2. **Make your changes** following our code style (Biome)
3. **Add tests** for new functionality
4. **Update documentation** if needed
5. **Submit a PR** with a clear description

### Community

- **GitHub Discussions**: Ask questions, share ideas
- **Issues**: Report bugs or request features
- **Discord**: Join our community (coming soon)

---

## 📖 Resources

- 🌐 [Website](https://useliquidify.dev) - Landing page and showcase
- 📚 [Documentation](https://docs.useliquidify.dev) - Complete API reference and guides
- 📦 [npm Package](https://www.npmjs.com/package/liquidify-react) - Install instructions
- 🛠️ [GitHub Repository](https://github.com/tuliopc23/LiqUIdify) - Source code
- 🐛 [Issues & Feedback](https://github.com/tuliopc23/LiqUIdify/issues) - Bug reports and feature requests
- 📝 [Changelog](CHANGELOG.md) - Release history
- 🍎 [Apple HIG](https://developer.apple.com/design/human-interface-guidelines) - Design guidelines reference

---

## 📄 License

MIT © [Tulio Pinheiro Cunha](https://tuliocunha.dev)

---

## 💚 Sponsorship

LiqUIdify is open source and free to use. If you're using it in production, consider [sponsoring development](https://github.com/sponsors/tuliopc23) to support continued maintenance and new features.

---

**Built with ♥︎ for the Apple ecosystem**
