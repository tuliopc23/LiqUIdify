# Design Token Customization Examples

This guide provides practical examples for customizing and extending Liquidify's design token system.

## Table of Contents

1. [Basic Token Usage](#basic-token-usage)
2. [Custom Token Creation](#custom-token-creation)
3. [Theme Customization](#theme-customization)
4. [CSS Custom Properties](#css-custom-properties)
5. [Component Token Overrides](#component-token-overrides)
6. [Dynamic Token Updates](#dynamic-token-updates)
7. [Advanced Use Cases](#advanced-use-cases)

## Basic Token Usage

### Using liquidGlassTokens

```tsx
import { liquidGlassTokens } from 'liquidify';

// Access spacing tokens
const Component = () => {
  return (
    <div
      style={{
        padding: liquidGlassTokens.spacing[4], // 16px
        margin: liquidGlassTokens.spacing[6], // 24px
        borderRadius: liquidGlassTokens.borderRadius.md, // 8px
      }}
    >
      Content with token-based spacing
    </div>
  );
};

// Access typography tokens
const Typography = () => {
  return (
    <div>
      <h1 style={liquidGlassTokens.typography.textStyles.largeTitle}>
        Large Title
      </h1>
      <p style={liquidGlassTokens.typography.textStyles.body}>
        Body text with proper spacing and font size
      </p>
    </div>
  );
};

// Access color tokens
const ColoredComponent = () => {
  return (
    <button
      style={{
        backgroundColor: liquidGlassTokens.colors.systemBlue,
        color: liquidGlassTokens.colors.label.primary,
        padding: `${liquidGlassTokens.spacing[2]} ${liquidGlassTokens.spacing[4]}`,
        borderRadius: liquidGlassTokens.borderRadius.md,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Primary Button
    </button>
  );
};
```

### Using componentTokens

```tsx
import { componentTokens } from 'liquidify';

// Button with component tokens
const CustomButton = ({ size = 'md', variant = 'primary', children }) => {
  const sizeTokens = componentTokens.button.sizes[size];
  const variantTokens = componentTokens.button.variants[variant];

  return (
    <button
      style={{
        ...sizeTokens,
        ...variantTokens,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </button>
  );
};

// Card with component tokens
const CustomCard = ({ size = 'md', variant = 'default', children }) => {
  const sizeTokens = componentTokens.card.sizes[size];
  const variantTokens = componentTokens.card.variants[variant];

  return (
    <div
      style={{
        ...sizeTokens,
        ...variantTokens,
      }}
    >
      {children}
    </div>
  );
};
```

## Custom Token Creation

### Extending Existing Tokens

```tsx
import { liquidGlassTokens } from 'liquidify';

// Create custom spacing tokens
const customSpacing = {
  ...liquidGlassTokens.spacing,
  // Add custom values
  huge: '80px',
  massive: '120px',
  giant: '160px',
  // Override existing values
  [4]: '20px', // Change default spacing from 16px to 20px
};

// Create custom color palette
const customColors = {
  ...liquidGlassTokens.colors,
  // Add brand colors
  brand: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#06B6D4',
    neutral: '#6B7280',
  },
  // Add custom semantic colors
  status: {
    active: '#10B981',
    inactive: '#9CA3AF',
    pending: '#F59E0B',
    archived: '#6B7280',
  },
};

// Create custom typography scale
const customTypography = {
  ...liquidGlassTokens.typography,
  // Add custom font sizes
  fontSize: {
    ...liquidGlassTokens.typography.fontSize,
    '10xl': '144px',
    '11xl': '180px',
    micro: '10px',
  },
  // Add custom text styles
  textStyles: {
    ...liquidGlassTokens.typography.textStyles,
    hero: {
      fontSize: '72px',
      lineHeight: '80px',
      fontWeight: '800',
      letterSpacing: '-0.02em',
    },
    micro: {
      fontSize: '10px',
      lineHeight: '12px',
      fontWeight: '400',
      letterSpacing: '0.01em',
    },
  },
};

// Combine into custom token set
const customTokens = {
  spacing: customSpacing,
  colors: customColors,
  typography: customTypography,
  animation: liquidGlassTokens.animation,
  glass: liquidGlassTokens.glass,
  borderRadius: liquidGlassTokens.borderRadius,
  shadows: liquidGlassTokens.shadows,
};
```

### Creating Brand-Specific Tokens

```tsx
// Define brand-specific token system
const brandTokens = {
  spacing: {
    // Brand-specific spacing scale
    0: '0px',
    1: '2px', // Tighter spacing
    2: '6px',
    3: '10px',
    4: '14px',
    5: '18px',
    6: '22px',
    8: '28px',
    10: '36px',
    12: '44px',
    16: '58px',
    20: '72px',
    24: '88px',
    32: '116px',
  },

  colors: {
    // Brand color palette
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    tertiary: '#45B7D1',
    accent: '#FFA07A',

    // Brand grays
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },

    // Brand semantic colors
    success: '#2ECC71',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3498DB',
  },

  typography: {
    fontFamily: {
      primary: 'Montserrat, sans-serif',
      secondary: 'Open Sans, sans-serif',
      mono: 'Fira Code, monospace',
    },

    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '40px',
      '5xl': '48px',
      '6xl': '64px',
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
  },

  borderRadius: {
    none: '0px',
    sm: '2px',
    md: '6px',
    lg: '10px',
    xl: '14px',
    full: '9999px',
  },

  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.18)',
  },
};
```

## Theme Customization

### Custom Light Theme

```tsx
import { glassThemes } from 'liquidify';

const customLightTheme = {
  ...glassThemes.light,
  colors: {
    ...glassThemes.light.colors,
    // Override primary colors
    primary: '#6366F1',
    secondary: '#8B5CF6',

    // Custom glass colors
    glass: {
      background: 'rgba(99, 102, 241, 0.1)',
      border: 'rgba(99, 102, 241, 0.2)',
      shadow: '0 8px 32px rgba(99, 102, 241, 0.15)',
    },

    // Custom text colors
    text: {
      primary: '#1F2937',
      secondary: 'rgba(31, 41, 55, 0.7)',
      tertiary: 'rgba(31, 41, 55, 0.5)',
      quaternary: 'rgba(31, 41, 55, 0.3)',
    },

    // Custom background colors
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
    },
  },

  // Custom blur values
  blur: {
    sm: '2px',
    md: '6px',
    lg: '12px',
    xl: '20px',
  },

  // Custom shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
    xl: '0 16px 40px rgba(0, 0, 0, 0.15)',
  },
};
```

### Custom Dark Theme

```tsx
const customDarkTheme = {
  ...glassThemes.dark,
  colors: {
    ...glassThemes.dark.colors,
    // Override primary colors
    primary: '#6366F1',
    secondary: '#8B5CF6',

    // Custom glass colors for dark mode
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },

    // Custom text colors for dark mode
    text: {
      primary: '#F9FAFB',
      secondary: 'rgba(249, 250, 251, 0.8)',
      tertiary: 'rgba(249, 250, 251, 0.6)',
      quaternary: 'rgba(249, 250, 251, 0.4)',
    },

    // Custom background colors for dark mode
    background: {
      primary: '#0F172A',
      secondary: '#1E293B',
      tertiary: '#334155',
    },
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    xl: '0 16px 40px rgba(0, 0, 0, 0.6)',
  },
};
```

### Theme Switching

```tsx
import { useState, useEffect } from 'react';
import { generateCSSCustomProperties } from 'liquidify';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const applyTheme = selectedTheme => {
    const themeTokens =
      selectedTheme === 'light' ? customLightTheme : customDarkTheme;

    const cssVars = generateCSSCustomProperties(themeTokens);
    const root = document.documentElement;

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      {children}
    </div>
  );
};
```

## CSS Custom Properties

### Basic CSS Generation

```tsx
import { generateCSSCustomProperties, liquidGlassTokens } from 'liquidify';

// Generate CSS variables
const cssVariables = generateCSSCustomProperties(liquidGlassTokens);

// Apply to document
const applyCSSVariables = () => {
  const root = document.documentElement;
  Object.entries(cssVariables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

// Call on app initialization
applyCSSVariables();
```

### Custom CSS Variable Generation

```tsx
// Generate with custom prefix
const customCSSVars = generateCSSCustomProperties(liquidGlassTokens, {
  prefix: 'app',
});

// Results in:
// --app-spacing-4: 16px
// --app-color-primary: #007AFF
// --app-font-size-base: 16px

// Generate for specific categories
const spacingVars = generateCSSCustomProperties(liquidGlassTokens.spacing, {
  prefix: 'space',
});

const colorVars = generateCSSCustomProperties(liquidGlassTokens.colors, {
  prefix: 'color',
});
```

### Using CSS Variables in Stylesheets

```css
/* Define CSS variables */
:root {
  --spacing-4: 16px;
  --color-primary: #007aff;
  --font-size-base: 16px;
  --border-radius-md: 8px;
  --glass-background: rgba(255, 255, 255, 0.15);
  --glass-blur: 10px;
  --duration-normal: 250ms;
  --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Use in components */
.glass-card {
  background: var(--glass-background);
  backdrop-filter: blur(var(--glass-blur));
  border-radius: var(--border-radius-md);
  padding: var(--spacing-4);
  transition: all var(--duration-normal) var(--easing-standard);
}

.primary-button {
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-base);
  border: none;
  cursor: pointer;
  transition: all var(--duration-normal) var(--easing-standard);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}
```

## Component Token Overrides

### Button Customization

```tsx
import { componentTokens } from 'liquidify';

// Create custom button tokens
const customButtonTokens = {
  ...componentTokens.button,
  sizes: {
    ...componentTokens.button.sizes,
    // Add new size
    hero: {
      height: '64px',
      padding: '16px 32px',
      fontSize: '20px',
      borderRadius: '16px',
    },
    // Override existing size
    lg: {
      ...componentTokens.button.sizes.lg,
      height: '48px', // Increase from 44px
      padding: '14px 28px',
    },
  },
  variants: {
    ...componentTokens.button.variants,
    // Add new variant
    gradient: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
    },
    // Add outline variant
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-primary)',
      border: '2px solid var(--color-primary)',
    },
  },
};

// Use custom button tokens
const CustomButton = ({
  size = 'md',
  variant = 'primary',
  children,
  ...props
}) => {
  const sizeTokens = customButtonTokens.sizes[size];
  const variantTokens = customButtonTokens.variants[variant];

  return (
    <button
      style={{
        ...sizeTokens,
        ...variantTokens,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: variantTokens.border || 'none',
      }}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Card Customization

```tsx
// Create custom card tokens
const customCardTokens = {
  ...componentTokens.card,
  sizes: {
    ...componentTokens.card.sizes,
    // Add new sizes
    xs: {
      padding: '8px',
      borderRadius: '6px',
    },
    hero: {
      padding: '32px',
      borderRadius: '24px',
    },
  },
  variants: {
    ...componentTokens.card.variants,
    // Add new variants
    elevated: {
      backgroundColor: 'var(--background-primary)',
      border: 'none',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    },
    bordered: {
      backgroundColor: 'transparent',
      border: '2px solid var(--border-color)',
      boxShadow: 'none',
    },
  },
};
```

## Dynamic Token Updates

### Runtime Token Changes

```tsx
import { useState } from 'react';
import { generateCSSCustomProperties, liquidGlassTokens } from 'liquidify';

const DynamicTokenProvider = ({ children }) => {
  const [tokens, setTokens] = useState(liquidGlassTokens);

  const updateTokens = newTokens => {
    setTokens(newTokens);
    const cssVars = generateCSSCustomProperties(newTokens);
    const root = document.documentElement;

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  const updateSpacing = scale => {
    const newTokens = {
      ...tokens,
      spacing: Object.fromEntries(
        Object.entries(tokens.spacing).map(([key, value]) => [
          key,
          typeof value === 'string' ? `${parseInt(value) * scale}px` : value,
        ])
      ),
    };
    updateTokens(newTokens);
  };

  const updatePrimaryColor = color => {
    const newTokens = {
      ...tokens,
      colors: {
        ...tokens.colors,
        primary: color,
        systemBlue: color,
      },
    };
    updateTokens(newTokens);
  };

  return (
    <div>
      <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
        <h3>Dynamic Token Controls</h3>
        <button onClick={() => updateSpacing(1.2)}>Increase Spacing</button>
        <button onClick={() => updateSpacing(0.8)}>Decrease Spacing</button>
        <button onClick={() => updatePrimaryColor('#FF6B6B')}>
          Red Primary
        </button>
        <button onClick={() => updatePrimaryColor('#4ECDC4')}>
          Teal Primary
        </button>
        <button onClick={() => updatePrimaryColor('#007AFF')}>
          Reset Primary
        </button>
      </div>
      {children}
    </div>
  );
};
```

### Responsive Token Updates

```tsx
import { useEffect, useState } from 'react';

const ResponsiveTokenProvider = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState('md');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setBreakpoint('sm');
      else if (width < 1024) setBreakpoint('md');
      else setBreakpoint('lg');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  useEffect(() => {
    // Update tokens based on breakpoint
    const responsiveTokens = {
      ...liquidGlassTokens,
      spacing: {
        ...liquidGlassTokens.spacing,
        // Smaller spacing on mobile
        ...(breakpoint === 'sm' && {
          [4]: '12px',
          [6]: '18px',
          [8]: '24px',
        }),
        // Larger spacing on desktop
        ...(breakpoint === 'lg' && {
          [4]: '20px',
          [6]: '28px',
          [8]: '36px',
        }),
      },
    };

    const cssVars = generateCSSCustomProperties(responsiveTokens);
    const root = document.documentElement;

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [breakpoint]);

  return children;
};
```

## Advanced Use Cases

### Token Validation

```tsx
const validateTokens = tokens => {
  const errors = [];

  // Validate spacing tokens
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      if (typeof value === 'string' && !value.endsWith('px')) {
        errors.push(`Spacing token ${key} must end with 'px'`);
      }
    });
  }

  // Validate color tokens
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      if (typeof value === 'string' && !value.match(/^#[0-9A-F]{6}$/i)) {
        errors.push(`Color token ${key} must be a valid hex color`);
      }
    });
  }

  return errors;
};

// Usage
const customTokens = {
  /* ... */
};
const errors = validateTokens(customTokens);
if (errors.length > 0) {
  console.error('Token validation errors:', errors);
}
```

### Token Documentation Generator

```tsx
const generateTokenDocumentation = tokens => {
  const documentation = [];

  Object.entries(tokens).forEach(([category, categoryTokens]) => {
    documentation.push(`## ${category}`);
    documentation.push('');

    Object.entries(categoryTokens).forEach(([key, value]) => {
      documentation.push(`- **${key}**: ${value}`);
    });

    documentation.push('');
  });

  return documentation.join('\n');
};

// Usage
const docs = generateTokenDocumentation(liquidGlassTokens);
console.log(docs);
```

### Token Performance Monitoring

```tsx
const TokenPerformanceMonitor = ({ children }) => {
  useEffect(() => {
    const observer = new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (entry.name.includes('token') || entry.name.includes('css-var')) {
          console.log(
            `Token operation: ${entry.name} took ${entry.duration}ms`
          );
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, []);

  return children;
};
```

---

These examples demonstrate the flexibility and power of Liquidify's design token system. Use them as starting points for your own customizations and extensions.
