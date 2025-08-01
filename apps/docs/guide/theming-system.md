# Theming & Customization

LiquidUI provides a powerful theming system that allows you to customize the look and feel of all components while maintaining the glassmorphism aesthetic.

## Quick Start

### Using CSS Variables

The simplest way to customize LiquidUI is through CSS variables:

```css
:root {
  /* Primary color customization */
  --glass-primary: rgba(139, 92, 246, 0.2);
  --glass-primary-hover: rgba(139, 92, 246, 0.3);
  --glass-primary-active: rgba(139, 92, 246, 0.4);
  
  /* Adjust glass effect intensity */
  --glass-blur: 16px;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.15);
}
```

### Using ThemeProvider

For React applications, use the `ThemeProvider` component:

```tsx
import { ThemeProvider } from '@liquidify/components';

const customTheme = {
  colors: {
    primary: 'rgba(139, 92, 246, 0.2)',
    secondary: 'rgba(236, 72, 153, 0.2)',
    success: 'rgba(34, 197, 94, 0.2)',
    warning: 'rgba(251, 146, 60, 0.2)',
    error: 'rgba(239, 68, 68, 0.2)',
  },
  glass: {
    blur: '16px',
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.15)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

## Theme Structure

### Complete Theme Object

```tsx
interface Theme {
  // Color palette
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Text colors
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      inverse: string;
    };
    
    // Background colors
    background: {
      primary: string;
      secondary: string;
      paper: string;
      overlay: string;
    };
  };
  
  // Glass effects
  glass: {
    blur: string;
    bg: string;
    bgHover: string;
    bgActive: string;
    border: string;
    borderHover: string;
    shadow: string;
    shadowHover: string;
  };
  
  // Typography
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  
  // Spacing
  spacing: {
    unit: number;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  
  // Border radius
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  
  // Transitions
  transitions: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
      bounce: string;
    };
  };
  
  // Breakpoints
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}
```

## Dark Mode

### Automatic Dark Mode

LiquidUI automatically adapts to system dark mode preferences:

```css
/* Light mode (default) */
:root {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --text-primary: rgba(0, 0, 0, 0.87);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --glass-bg: rgba(0, 0, 0, 0.2);
    --glass-border: rgba(255, 255, 255, 0.1);
    --text-primary: rgba(255, 255, 255, 0.87);
  }
}
```

### Manual Dark Mode Toggle

```tsx
import { ThemeToggle, useTheme } from '@liquidify/components';

function App() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div data-theme={theme}>
      <ThemeToggle onToggle={toggleTheme} />
      {/* Your app */}
    </div>
  );
}
```

## Preset Themes

### Ocean Theme

```css
[data-theme="ocean"] {
  --glass-primary: rgba(59, 130, 246, 0.2);
  --glass-secondary: rgba(14, 165, 233, 0.2);
  --glass-bg: rgba(219, 234, 254, 0.1);
  --glass-border: rgba(147, 197, 253, 0.2);
  --glass-blur: 14px;
}
```

### Forest Theme

```css
[data-theme="forest"] {
  --glass-primary: rgba(34, 197, 94, 0.2);
  --glass-secondary: rgba(16, 185, 129, 0.2);
  --glass-bg: rgba(220, 252, 231, 0.1);
  --glass-border: rgba(134, 239, 172, 0.2);
  --glass-blur: 12px;
}
```

### Sunset Theme

```css
[data-theme="sunset"] {
  --glass-primary: rgba(251, 146, 60, 0.2);
  --glass-secondary: rgba(239, 68, 68, 0.2);
  --glass-bg: rgba(254, 243, 199, 0.1);
  --glass-border: rgba(252, 211, 77, 0.2);
  --glass-blur: 10px;
}
```

### Midnight Theme

```css
[data-theme="midnight"] {
  --glass-primary: rgba(99, 102, 241, 0.15);
  --glass-secondary: rgba(168, 85, 247, 0.15);
  --glass-bg: rgba(17, 24, 39, 0.3);
  --glass-border: rgba(75, 85, 99, 0.3);
  --glass-blur: 20px;
}
```

## Component-Specific Theming

### Button Variants

```tsx
// Custom button theme
const buttonTheme = {
  variants: {
    primary: {
      bg: 'rgba(99, 102, 241, 0.2)',
      hover: 'rgba(99, 102, 241, 0.3)',
      active: 'rgba(99, 102, 241, 0.4)',
      text: 'rgb(99, 102, 241)',
    },
    gradient: {
      bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
      hover: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))',
      text: 'white',
    },
  },
};

<GlassButton theme={buttonTheme} variant="gradient">
  Gradient Button
</GlassButton>
```

### Input Styling

```css
/* Custom input theme */
.custom-input {
  --input-bg: rgba(255, 255, 255, 0.05);
  --input-border: rgba(255, 255, 255, 0.1);
  --input-focus-border: rgba(99, 102, 241, 0.5);
  --input-focus-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
```

## Advanced Customization

### Glass Effect Intensity

Control the glass effect intensity across your application:

```tsx
// Minimal glass effect
const minimalGlass = {
  glass: {
    blur: '4px',
    bg: 'rgba(255, 255, 255, 0.02)',
    border: 'rgba(255, 255, 255, 0.05)',
  },
};

// Intense glass effect
const intenseGlass = {
  glass: {
    blur: '24px',
    bg: 'rgba(255, 255, 255, 0.15)',
    border: 'rgba(255, 255, 255, 0.3)',
  },
};
```

### Dynamic Theming

```tsx
function DynamicThemeExample() {
  const [hue, setHue] = useState(240);
  
  const dynamicTheme = {
    colors: {
      primary: `hsla(${hue}, 70%, 60%, 0.2)`,
      secondary: `hsla(${hue + 30}, 70%, 60%, 0.2)`,
    },
  };
  
  return (
    <ThemeProvider theme={dynamicTheme}>
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(e.target.value)}
      />
      {/* Components will update with new colors */}
    </ThemeProvider>
  );
}
```

### Gradient Themes

```css
/* Gradient glass effect */
.gradient-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border: 1px solid transparent;
  border-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  ) 1;
}
```

## Performance Considerations

### Reduced Motion

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Reduce blur for performance */
  :root {
    --glass-blur: 4px;
  }
}
```

### Theme Caching

```tsx
// Cache theme in localStorage
const ThemeManager = {
  save: (theme: Theme) => {
    localStorage.setItem('liquidui-theme', JSON.stringify(theme));
  },
  
  load: (): Theme | null => {
    const saved = localStorage.getItem('liquidui-theme');
    return saved ? JSON.parse(saved) : null;
  },
  
  clear: () => {
    localStorage.removeItem('liquidui-theme');
  },
};
```

## Migration Guide

### From Other UI Libraries

```tsx
// Chakra UI → LiquidUI
// Before
<Box bg="blue.500" p={4} borderRadius="md">
  <Text color="white">Content</Text>
</Box>

// After
<GlassCard className="p-4">
  <p className="text-white">Content</p>
</GlassCard>
```

```tsx
// Material-UI → LiquidUI
// Before
<Paper elevation={3} sx={{ p: 2 }}>
  <Typography>Content</Typography>
</Paper>

// After
<GlassCard variant="elevated" className="p-4">
  <p>Content</p>
</GlassCard>
```

## Best Practices

1. **Consistency**: Use theme tokens instead of hardcoded values
2. **Accessibility**: Ensure sufficient contrast ratios
3. **Performance**: Limit blur effects on mobile devices
4. **Flexibility**: Design themes that work in both light and dark modes
5. **Documentation**: Document your custom theme values

## Theme Utilities

### Theme Hook

```tsx
import { useTheme } from '@liquidify/components';

function Component() {
  const { theme, isDark, toggleTheme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {isDark ? 'dark' : 'light'}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme('ocean')}>Ocean Theme</button>
    </div>
  );
}
```

### Theme Context

```tsx
import { ThemeContext } from '@liquidify/components';

class Component extends React.Component {
  static contextType = ThemeContext;
  
  render() {
    const theme = this.context;
    return <div style={{ color: theme.colors.primary }}>Themed</div>;
  }
}
```