# ThemeProvider

The ThemeProvider component provides theming context and configuration for all LiqUIdify components, enabling consistent glassmorphism effects throughout your application.

## Installation

```bash
npm install @liquidify/ui
```

Or import just this component:

```tsx
import { ThemeProvider } from "@liquidify/ui";
```

## Basic Usage

Wrap your application with ThemeProvider to enable glassmorphism effects:

```tsx
import { ThemeProvider, GlassButton, GlassCard } from "@liquidify/ui";
import "@liquidify/ui/styles";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <ThemeProvider theme="glass">
        <GlassCard className="p-6 max-w-sm mx-auto">
          <h1 className="text-xl font-bold mb-4">Hello LiqUIdify!</h1>
          <GlassButton variant="primary">Click me</GlassButton>
        </GlassCard>
      </ThemeProvider>
    </div>
  );
}
```

## Props

| Prop        | Type                                                    | Default   | Description                                         |
| ----------- | ------------------------------------------------------- | --------- | --------------------------------------------------- |
| theme       | `'glass' \| 'glass-dark' \| 'glass-light' \| 'minimal'` | `'glass'` | The theme variant to apply                          |
| children    | `ReactNode`                                             | -         | Child components that will receive theme context    |
| customTheme | `ThemeConfig`                                           | -         | Custom theme configuration object                   |
| debug       | `boolean`                                               | `false`   | Enable debug mode to visualize component boundaries |

## Theme Variants

### Glass Theme (Default)

```tsx
<ThemeProvider theme="glass">
  <GlassCard>Standard glassmorphism with balanced opacity</GlassCard>
</ThemeProvider>
```

### Glass Dark Theme

```tsx
<ThemeProvider theme="glass-dark">
  <GlassCard>Darker glass effects, ideal for dark backgrounds</GlassCard>
</ThemeProvider>
```

### Glass Light Theme

```tsx
<ThemeProvider theme="glass-light">
  <GlassCard>Lighter glass effects, perfect for bright backgrounds</GlassCard>
</ThemeProvider>
```

### Minimal Theme

```tsx
<ThemeProvider theme="minimal">
  <GlassCard>Subtle glass effects with minimal blur</GlassCard>
</ThemeProvider>
```

## Custom Theme Configuration

Create custom themes by passing a theme configuration object:

```tsx
import { ThemeProvider } from "@liquidify/ui";

const customTheme = {
  glass: {
    background: "rgba(255, 255, 255, 0.15)",
    border: "rgba(255, 255, 255, 0.25)",
    blur: "12px",
    shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  colors: {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
};

function App() {
  return (
    <ThemeProvider customTheme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Theme Context Hook

Access theme values in your components using the `useTheme` hook:

```tsx
import { useTheme } from "@liquidify/ui";

function CustomComponent() {
  const { theme, colors, updateTheme } = useTheme();

  return (
    <div
      style={{
        background: theme.glass.background,
        border: `1px solid ${theme.glass.border}`,
        backdropFilter: `blur(${theme.glass.blur})`,
      }}
    >
      <button
        style={{ color: colors.primary }}
        onClick={() => updateTheme("glass-dark")}
      >
        Switch to Dark Theme
      </button>
    </div>
  );
}
```

## Dynamic Theme Switching

Implement theme switching functionality:

```tsx
import { useState } from "react";
import { ThemeProvider, GlassButton } from "@liquidify/ui";

function AppWithThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<
    "glass" | "glass-dark" | "glass-light"
  >("glass");

  const themes = [
    { value: "glass", label: "Glass" },
    { value: "glass-dark", label: "Dark Glass" },
    { value: "glass-light", label: "Light Glass" },
  ];

  return (
    <ThemeProvider theme={currentTheme}>
      <div className="p-6">
        <div className="mb-4 space-x-2">
          {themes.map((theme) => (
            <GlassButton
              key={theme.value}
              variant={currentTheme === theme.value ? "primary" : "secondary"}
              onClick={() => setCurrentTheme(theme.value as any)}
            >
              {theme.label}
            </GlassButton>
          ))}
        </div>

        <GlassCard className="p-6">
          <h2 className="text-xl font-bold">Current Theme: {currentTheme}</h2>
          <p>This card adapts to the selected theme automatically.</p>
        </GlassCard>
      </div>
    </ThemeProvider>
  );
}
```

## CSS Variables Integration

ThemeProvider automatically sets CSS custom properties that you can use in your styles:

```css
/* These variables are automatically available when using ThemeProvider */
:root {
  --glass-background: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-blur: 10px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}

/* Use them in your custom components */
.my-glass-element {
  background: var(--glass-background);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(var(--glass-blur));
  box-shadow: var(--glass-shadow);
}
```

## Server-Side Rendering (SSR)

ThemeProvider works seamlessly with Next.js and other SSR frameworks:

```tsx
// pages/_app.tsx (Next.js)
import type { AppProps } from "next/app";
import { ThemeProvider } from "@liquidify/ui";
import "@liquidify/ui/styles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme="glass">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

## Performance Considerations

ThemeProvider is optimized for performance:

- **Context Optimization**: Uses React's context optimization patterns to prevent unnecessary re-renders
- **CSS Variables**: Leverages CSS custom properties for efficient theme updates
- **Memoization**: Theme calculations are memoized to reduce computational overhead

```tsx
// Theme changes only trigger re-renders for components that use theme values
function OptimizedApp() {
  return (
    <ThemeProvider theme="glass">
      {/* These components won't re-render on theme changes unless they use theme context */}
      <StaticHeader />
      <StaticSidebar />

      {/* Only components using theme context will re-render */}
      <ThemedContent />
    </ThemeProvider>
  );
}
```

## Debug Mode

Enable debug mode to visualize theme boundaries and component states:

```tsx
<ThemeProvider theme="glass" debug={true}>
  <App />
</ThemeProvider>
```

Debug mode provides:

- Visual boundaries around themed components
- Theme state information in browser console
- Performance metrics for theme operations
- CSS variable inspection tools

## Accessibility

ThemeProvider ensures accessibility across all themes:

- **Color Contrast**: All theme variants maintain WCAG 2.1 AA color contrast ratios
- **Reduced Motion**: Respects `prefers-reduced-motion` for animations
- **High Contrast**: Provides fallbacks for high contrast mode
- **Screen Readers**: Ensures glass effects don't interfere with screen reader navigation

```tsx
// Theme automatically adapts to user preferences
<ThemeProvider
  theme="glass"
  respectsUserPreferences={true} // Default: true
>
  <App />
</ThemeProvider>
```

## TypeScript Support

Full TypeScript support with proper type inference:

```tsx
import { ThemeProvider, ThemeConfig, ThemeVariant } from "@liquidify/ui";

// Custom theme with full type safety
const myTheme: ThemeConfig = {
  glass: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "rgba(255, 255, 255, 0.2)",
    blur: "10px",
    shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  colors: {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
};

// Type-safe theme variant
const themeVariant: ThemeVariant = "glass-dark";

function TypedApp() {
  return (
    <ThemeProvider theme={themeVariant} customTheme={myTheme}>
      <App />
    </ThemeProvider>
  );
}
```

## Best Practices

1. **Single Provider**: Use only one ThemeProvider at the root of your application
2. **Gradient Backgrounds**: Always provide gradient backgrounds for optimal glass effects
3. **Theme Consistency**: Stick to one theme throughout your application for consistency
4. **Performance**: Use CSS variables for dynamic theme changes instead of re-rendering
5. **Accessibility**: Test all themes with screen readers and keyboard navigation

## Related Components

- [ThemeToggle](/components/theme-toggle) - Component for switching between themes
- [GlassCard](/components/card) - Cards that adapt to the current theme
- [GlassButton](/components/button) - Buttons with theme-aware styling

## Examples

Check out our [Storybook](https://liquidify-storybook.vercel.app) for interactive examples and our [Theme Showcase](https://liquidify-storybook.vercel.app/?path=/story/design-system-theme-showcase--all-themes) to see all themes in action.
