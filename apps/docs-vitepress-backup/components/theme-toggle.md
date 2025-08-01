# ThemeToggle

The ThemeToggle component provides an interactive UI element for switching between different theme variants in your LiqUIdify application.

## Installation

```bash
npm install @liquidify/ui
```

Or import just this component:

```tsx
import { ThemeToggle } from "@liquidify/ui";
```

## Basic Usage

```tsx
import { ThemeProvider, ThemeToggle, GlassCard } from "@liquidify/ui";
import "@liquidify/ui/styles";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <ThemeProvider theme="glass">
        <div className="p-6">
          <ThemeToggle />
          <GlassCard className="p-6 mt-4">
            <h1 className="text-xl font-bold">Theme-aware content</h1>
            <p>This card adapts to the selected theme.</p>
          </GlassCard>
        </div>
      </ThemeProvider>
    </div>
  );
}
```

## Props

| Prop       | Type                                                           | Default           | Description                          |
| ---------- | -------------------------------------------------------------- | ----------------- | ------------------------------------ |
| variant    | `'button' \| 'dropdown' \| 'tabs' \| 'switch'`                 | `'button'`        | The visual style of the theme toggle |
| themes     | `ThemeOption[]`                                                | `defaultThemes`   | Array of available theme options     |
| size       | `'sm' \| 'md' \| 'lg'`                                         | `'md'`            | Size of the toggle component         |
| position   | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | -                 | Fixed position on screen             |
| showLabels | `boolean`                                                      | `true`            | Whether to show theme labels         |
| icon       | `ReactNode`                                                    | `<PaletteIcon />` | Custom icon for the toggle           |
| onChange   | `(theme: string) => void`                                      | -                 | Callback when theme changes          |
| className  | `string`                                                       | -                 | Additional CSS classes               |

## Variants

### Button Variant (Default)

```tsx
<ThemeToggle variant="button" />
```

### Dropdown Variant

```tsx
<ThemeToggle variant="dropdown" showLabels={true} />
```

### Tabs Variant

```tsx
<ThemeToggle variant="tabs" size="lg" />
```

### Switch Variant

```tsx
<ThemeToggle
  variant="switch"
  themes={[
    { value: "glass", label: "Light" },
    { value: "glass-dark", label: "Dark" },
  ]}
/>
```

## Custom Theme Options

Define your own theme options:

```tsx
import { ThemeToggle, ThemeOption } from "@liquidify/ui";

const customThemes: ThemeOption[] = [
  {
    value: "glass",
    label: "Default Glass",
    icon: "✨",
    description: "Standard glassmorphism effects",
  },
  {
    value: "glass-dark",
    label: "Dark Glass",
    icon: "🌙",
    description: "Dark theme with enhanced contrast",
  },
  {
    value: "glass-light",
    label: "Light Glass",
    icon: "☀️",
    description: "Light theme with subtle effects",
  },
  {
    value: "minimal",
    label: "Minimal",
    icon: "⚪",
    description: "Clean minimal design",
  },
];

function CustomThemeToggle() {
  return (
    <ThemeToggle
      themes={customThemes}
      variant="dropdown"
      onChange={(theme) => console.log("Theme changed to:", theme)}
    />
  );
}
```

## Fixed Position Toggle

Position the toggle at screen corners:

```tsx
// Top-right corner
<ThemeToggle
  position="top-right"
  variant="button"
  size="sm"
/>

// Bottom-left corner
<ThemeToggle
  position="bottom-left"
  variant="dropdown"
/>
```

## Controlled Usage

Control the theme toggle with external state:

```tsx
import { useState } from "react";
import { ThemeProvider, ThemeToggle } from "@liquidify/ui";

function ControlledThemeApp() {
  const [currentTheme, setCurrentTheme] = useState("glass");

  const handleThemeChange = (newTheme: string) => {
    setCurrentTheme(newTheme);
    // Save to localStorage
    localStorage.setItem("preferred-theme", newTheme);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <ThemeToggle onChange={handleThemeChange} variant="tabs" />
    </ThemeProvider>
  );
}
```

## Persistent Theme Selection

Save user's theme preference:

```tsx
import { useEffect, useState } from "react";
import { ThemeProvider, ThemeToggle } from "@liquidify/ui";

function PersistentThemeApp() {
  const [theme, setTheme] = useState("glass");

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("liquidify-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme when it changes
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("liquidify-theme", newTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-600">
        <ThemeToggle onChange={handleThemeChange} position="top-right" />
        <div className="p-6">
          <h1>Your theme preference is saved!</h1>
        </div>
      </div>
    </ThemeProvider>
  );
}
```

## System Theme Detection

Respect user's system theme preference:

```tsx
import { useEffect, useState } from "react";
import { ThemeToggle } from "@liquidify/ui";

function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return systemTheme;
}

function SystemThemeApp() {
  const systemTheme = useSystemTheme();
  const [userTheme, setUserTheme] = useState<string>("auto");

  const effectiveTheme =
    userTheme === "auto"
      ? systemTheme === "dark"
        ? "glass-dark"
        : "glass"
      : userTheme;

  const themeOptions = [
    { value: "auto", label: "Auto", icon: "🔄" },
    { value: "glass", label: "Light", icon: "☀️" },
    { value: "glass-dark", label: "Dark", icon: "🌙" },
  ];

  return (
    <ThemeProvider theme={effectiveTheme}>
      <ThemeToggle
        themes={themeOptions}
        onChange={setUserTheme}
        variant="dropdown"
      />
    </ThemeProvider>
  );
}
```

## Custom Styling

Customize the appearance with CSS:

```tsx
<ThemeToggle className="custom-theme-toggle" variant="button" />
```

```css
.custom-theme-toggle {
  /* Custom button styling */
  --toggle-background: rgba(255, 255, 255, 0.1);
  --toggle-border: rgba(255, 255, 255, 0.2);
  --toggle-hover: rgba(255, 255, 255, 0.15);
}

.custom-theme-toggle .theme-option {
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.custom-theme-toggle .theme-option:hover {
  background: var(--toggle-hover);
  transform: scale(1.05);
}
```

## Keyboard Navigation

ThemeToggle supports full keyboard accessibility:

- **Space/Enter**: Activate theme toggle
- **Arrow Keys**: Navigate between theme options (in dropdown/tabs variants)
- **Escape**: Close dropdown (in dropdown variant)
- **Tab**: Navigate to next focusable element

```tsx
<ThemeToggle variant="dropdown" aria-label="Switch application theme" />
```

## Animation Options

Control animations and transitions:

```tsx
<ThemeToggle variant="tabs" animationDuration={300} animationType="slide" />
```

## Integration with Theme Provider

ThemeToggle automatically integrates with ThemeProvider:

```tsx
import { ThemeProvider, ThemeToggle, useTheme } from "@liquidify/ui";

function ThemeStatus() {
  const { theme } = useTheme();

  return (
    <div className="p-4">
      <p>Current theme: {theme}</p>
      <ThemeToggle variant="button" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme="glass">
      <ThemeStatus />
    </ThemeProvider>
  );
}
```

## Examples

### Navigation Bar with Theme Toggle

```tsx
function NavigationWithTheme() {
  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">MyApp</h1>
        <a href="/home">Home</a>
        <a href="/about">About</a>
      </div>

      <ThemeToggle variant="button" size="sm" showLabels={false} />
    </nav>
  );
}
```

### Settings Panel with Theme Options

```tsx
function SettingsPanel() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Appearance</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Theme Preference
        </label>
        <ThemeToggle variant="tabs" size="lg" showLabels={true} />
      </div>

      <p className="text-sm text-gray-600">
        Choose your preferred theme. Your selection will be saved automatically.
      </p>
    </div>
  );
}
```

## Accessibility

ThemeToggle follows WCAG 2.1 guidelines:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Maintains contrast ratios across all themes
- **Screen Reader**: Announces theme changes

## Best Practices

1. **Placement**: Position the toggle where users expect to find theme controls (typically top-right corner or settings area)
2. **Persistence**: Save user's theme preference to localStorage or user profile
3. **System Respect**: Consider respecting system theme preferences by default
4. **Feedback**: Provide visual feedback when themes change
5. **Performance**: Theme changes should be instant without page reloads

## Related Components

- [ThemeProvider](/components/theme-provider) - Provides theme context to components
- [GlassCard](/components/card) - Cards that adapt to theme changes
- [GlassButton](/components/button) - Buttons with theme-aware styling

## TypeScript Support

Full TypeScript support with proper interfaces:

```tsx
import { ThemeToggle, ThemeOption, ThemeToggleProps } from "@liquidify/ui";

const themes: ThemeOption[] = [
  { value: "glass", label: "Glass", icon: "✨" },
  { value: "glass-dark", label: "Dark", icon: "🌙" },
];

const toggleProps: ThemeToggleProps = {
  themes,
  variant: "dropdown",
  size: "md",
  onChange: (theme: string) => console.log(theme),
};

function TypedThemeToggle() {
  return <ThemeToggle {...toggleProps} />;
}
```

## Examples

Check out our [Storybook](https://liquidify-storybook.vercel.app) for interactive examples and theme switching demonstrations.
