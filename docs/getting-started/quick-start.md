# Quick Start

Build your first LiqUIdify app in 5 minutes.

## 1. Install LiqUIdify

```bash
bun add liquidify-react react react-dom @ark-ui/react framer-motion lucide-react
```

## 2. Import Styles

Add this to your app's entry point (only once):

```tsx
import 'liquidify-react/styles';
```

## 3. Import Components

Use **subpath imports** for optimal tree-shaking:

```tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
```

Or import from the main entry:

```tsx
import { Button, Card } from 'liquidify-react';
```

**💡 Tip:** Subpath imports reduce bundle size by only including what you use.

## 4. Use Components

```tsx
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';

export default function Welcome() {
  return (
    <Card>
      <h1>Welcome to LiqUIdify!</h1>
      <p>100% Apple HIG compliant React components.</p>
      <Button onClick={() => alert('Hello!')}>
        Get Started
      </Button>
    </Card>
  );
}
```

## 5. Add Theming (Optional)

Enable dark mode and dynamic accent colors:

```tsx
import 'liquidify-react/styles';
import { ThemeProvider } from 'liquidify-react/theme';
import { Button } from 'liquidify-react/button';

export default function App() {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      <div style={{ padding: '2rem' }}>
        <h1>My App</h1>
        <Button>Click Me</Button>
      </div>
    </ThemeProvider>
  );
}
```

### Theme Provider Props

```tsx
interface ThemeProviderProps {
  // Theme mode: "light" | "dark" | "system"
  defaultMode?: "light" | "dark" | "system";
  
  // Accent color preset
  accentPreset?: "blue" | "green" | "red" | "purple" | "orange" | "pink" | "teal" | "indigo" | "cyan" | "mint" | "yellow";
  
  // Persist theme preference in localStorage
  persistTheme?: boolean; // default: true
  
  // Custom accent color (overrides preset)
  defaultAccent?: string; // e.g., "#FF6B35"
  
  // Called when theme changes
  onThemeChange?: (theme: { mode: string; accent: string }) => void;
  
  children: React.ReactNode;
}
```

## Complete Example

Here's a full working example with theming and multiple components:

```tsx
// app/page.tsx (Next.js App Router)
import 'liquidify-react/styles';
import { ThemeProvider } from 'liquidify-react/theme';
import { Button } from 'liquidify-react/button';
import { Card } from 'liquidify-react/card';
import { Badge } from 'liquidify-react/badge';
import { Switch } from 'liquidify-react/ark-ui/switch';

export default function Home() {
  return (
    <ThemeProvider defaultMode="system" accentPreset="blue">
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ margin: 0 }}>LiqUIdify</h1>
            <Badge>v0.6.22</Badge>
          </div>
          
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1.5rem' }}>
            Production-ready React components with 100% Apple HIG compliance.
          </p>
          
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Switch defaultChecked />
            <span>Enable notifications</span>
          </div>
        </Card>
      </main>
    </ThemeProvider>
  );
}
```

## Next Steps

### Learn More
- **[Component Documentation](../components/overview.md)** - Explore all 48 components
- **[Theming Guide](../theming/overview.md)** - Customize your design system
- **[WWDC 2025 Features](../features/liquid-glass.md)** - Learn about Liquid Glass effects

### Framework-Specific Guides
- **[Next.js](../guides/nextjs.md)** - App Router and Pages Router
- **[Remix](../guides/remix.md)** - Remix integration
- **[Vite](../guides/vite.md)** - Vite + React setup
- **[Astro](../guides/astro.md)** - Astro with MDX

### Advanced Topics
- **[Tree-Shaking](../advanced/tree-shaking.md)** - Optimize bundle size
- **[SSR/RSC](../advanced/ssr-and-rsc.md)** - Server-side rendering
- **[Accessibility](../advanced/accessibility.md)** - WCAG 2.1 AA compliance

## Common Patterns

### Using Panda CSS

LiqUIdify is built with Panda CSS. Access design tokens directly:

```tsx
import { css } from 'styled-system/css';
import { Button } from 'liquidify-react/button';

export default function CustomButton() {
  return (
    <div className={css({
      background: 'token(colors.glass.bg)',
      backdropFilter: 'blur(token(blurs.glass.md))',
      borderRadius: 'token(radii.lg)',
      padding: 'token(spacing.glass.lg)'
    })}>
      <Button>Styled with Panda CSS</Button>
    </div>
  );
}
```

### Subpath Imports (Recommended)

For better tree-shaking, use subpath imports:

```tsx
// ✅ Good: Only bundles Button
import { Button } from 'liquidify-react/button';

// ⚠️ OK: Bundles entire library
import { Button } from 'liquidify-react';

// ✅ Best: Import multiple related components
import { Dialog } from 'liquidify-react/ark-ui/dialog';
import { Tooltip } from 'liquidify-react/ark-ui/tooltip';
```

### Dark Mode Toggle

```tsx
'use client';

import { Button } from 'liquidify-react/button';
import { useTheme } from 'liquidify-react/theme';

export function ThemeToggle() {
  const { mode, setMode } = useTheme();
  
  return (
    <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      {mode === 'light' ? '🌙' : '☀️'} Toggle Theme
    </Button>
  );
}
```

## Troubleshooting

### "React is not defined"

Make sure you've installed React:
```bash
bun add react react-dom
```

### Styles not applied

Import the CSS stylesheet:
```tsx
import 'liquidify-react/styles';
```

### TypeScript errors

Install type definitions:
```bash
bun add -D @types/react @types/react-dom
```

---

**Ready to dive deeper?** Check out the [Component Documentation](../components/overview.md) to explore all 48 components!
