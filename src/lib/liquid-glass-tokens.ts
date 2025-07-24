/**
 * Liquid Glass Design Tokens
 * Comprehensive design system tokens for Glass UI components
 * Based on Apple's Human Interface Guidelines and modern design principles
 */

// Core Design Tokens
export const liquidGlassTokens = {
  // Spacing Scale (8pt grid system)
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
    40: '160px',
    48: '192px',
    56: '224px',
    64: '256px',
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
      mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
    },
    fontSize: {
      xs: ['12px', { lineHeight: '16px', letterSpacing: '0.025em' }],
      sm: ['14px', { lineHeight: '20px', letterSpacing: '0.016em' }],
      base: ['16px', { lineHeight: '24px', letterSpacing: '0.011em' }],
      lg: ['18px', { lineHeight: '28px', letterSpacing: '0.007em' }],
      xl: ['20px', { lineHeight: '32px', letterSpacing: '0.005em' }],
      '2xl': ['24px', { lineHeight: '36px', letterSpacing: '0.003em' }],
      '3xl': ['30px', { lineHeight: '40px', letterSpacing: '0.001em' }],
      '4xl': ['36px', { lineHeight: '48px', letterSpacing: '-0.002em' }],
      '5xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.004em' }],
      '6xl': ['60px', { lineHeight: '72px', letterSpacing: '-0.006em' }],
      '7xl': ['72px', { lineHeight: '80px', letterSpacing: '-0.008em' }],
      '8xl': ['96px', { lineHeight: '104px', letterSpacing: '-0.01em' }],
      '9xl': ['128px', { lineHeight: '136px', letterSpacing: '-0.012em' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  // Color System
  colors: {
    // Semantic Colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },

    // Glass-specific colors
    glass: {
      white: {
        subtle: 'rgba(255, 255, 255, 0.05)',
        light: 'rgba(255, 255, 255, 0.1)',
        medium: 'rgba(255, 255, 255, 0.15)',
        strong: 'rgba(255, 255, 255, 0.25)',
        intense: 'rgba(255, 255, 255, 0.4)',
      },
      black: {
        subtle: 'rgba(0, 0, 0, 0.05)',
        light: 'rgba(0, 0, 0, 0.1)',
        medium: 'rgba(0, 0, 0, 0.15)',
        strong: 'rgba(0, 0, 0, 0.25)',
        intense: 'rgba(0, 0, 0, 0.4)',
      },
    },
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    glass: {
      subtle: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)',
      light: '0 2px 8px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)',
      medium: '0 4px 16px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08)',
      heavy: '0 8px 32px rgba(0, 0, 0, 0.16), 0 24px 64px rgba(0, 0, 0, 0.12)',
      intense:
        '0 16px 48px rgba(0, 0, 0, 0.20), 0 32px 80px rgba(0, 0, 0, 0.15)',
    },
    focus: {
      subtle: '0 0 0 2px rgba(59, 130, 246, 0.08)',
      medium: '0 0 0 3px rgba(59, 130, 246, 0.15)',
      strong: '0 0 0 4px rgba(59, 130, 246, 0.25)',
    },
  },

  // Animation
  animation: {
    duration: {
      instant: '50ms',
      fast: '150ms',
      normal: '250ms',
      smooth: '350ms',
      slow: '500ms',
    },
    easing: {
      glass: 'cubic-bezier(0.4, 0, 0.2, 1)',
      liquid: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      magnetic: 'cubic-bezier(0.2, 0, 0, 1.2)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Blur Effects
  blur: {
    whisper: '2px',
    ghost: '4px',
    subtle: '8px',
    light: '16px',
    medium: '24px',
    heavy: '32px',
    intense: '40px',
    extreme: '56px',
    ultra: '72px',
  },

  // Z-Index Scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Theme Configuration
export const glassThemes = {
  light: {
    background: {
      primary: 'rgba(255, 255, 255, 0.12)',
      secondary: 'rgba(248, 250, 252, 0.15)',
      elevated: 'rgba(255, 255, 255, 0.25)',
      overlay: 'rgba(255, 255, 255, 0.30)',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      light: 'rgba(255, 255, 255, 0.15)',
      medium: 'rgba(255, 255, 255, 0.25)',
      strong: 'rgba(255, 255, 255, 0.35)',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.9)',
      secondary: 'rgba(0, 0, 0, 0.7)',
      tertiary: 'rgba(0, 0, 0, 0.5)',
      quaternary: 'rgba(0, 0, 0, 0.3)',
    },
  },
  dark: {
    background: {
      primary: 'rgba(28, 28, 30, 0.15)',
      secondary: 'rgba(44, 44, 46, 0.18)',
      elevated: 'rgba(58, 58, 60, 0.25)',
      overlay: 'rgba(72, 72, 74, 0.30)',
    },
    border: {
      subtle: 'rgba(255, 255, 255, 0.06)',
      light: 'rgba(255, 255, 255, 0.12)',
      medium: 'rgba(255, 255, 255, 0.18)',
      strong: 'rgba(255, 255, 255, 0.25)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.8)',
      tertiary: 'rgba(255, 255, 255, 0.6)',
      quaternary: 'rgba(255, 255, 255, 0.4)',
    },
  },
} as const;

// Component-specific tokens
export const componentTokens = {
  button: {
    height: {
      xs: '28px',
      sm: '32px',
      md: '40px',
      lg: '44px',
      xl: '52px',
    },
    padding: {
      xs: '8px 10px',
      sm: '10px 12px',
      md: '12px 16px',
      lg: '14px 20px',
      xl: '16px 24px',
    },
  },
  input: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '44px',
    },
    padding: {
      sm: '8px 12px',
      md: '10px 14px',
      lg: '12px 16px',
    },
  },
  card: {
    padding: {
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px',
    },
  },
} as const;

// Utility functions for token access
export const getToken = (path: string) => {
  const keys = path.split('.');
  let current: any = liquidGlassTokens;

  for (const key of keys) {
    if (current && 'object' === typeof current && key in current) {
      current = current[key];
    } else {
      return;
    }
  }

  return current;
};

export const getThemeToken = (theme: 'light' | 'dark', path: string) => {
  const keys = path.split('.');
  let current: any = glassThemes[theme];

  for (const key of keys) {
    if (current && 'object' === typeof current && key in current) {
      current = current[key];
    } else {
      return;
    }
  }

  return current;
};

// CSS Custom Properties Generator
export const generateCSSCustomProperties = (
  theme: 'light' | 'dark' = 'light'
) => {
  const themeTokens = glassThemes[theme];
  const cssVars: Record<string, string> = {};

  // Generate CSS custom properties from theme tokens
  Object.entries(themeTokens).forEach(([category, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      cssVars[`--glass-${category}-${key}`] = value as string;
    });
  });

  // Add spacing tokens
  Object.entries(liquidGlassTokens.spacing).forEach(([key, value]) => {
    cssVars[`--glass-spacing-${key}`] = value;
  });

  // Add blur tokens
  Object.entries(liquidGlassTokens.blur).forEach(([key, value]) => {
    cssVars[`--glass-blur-${key}`] = `blur(${value})`;
  });

  return cssVars;
};

// Export types for TypeScript support
export type LiquidGlassTokens = typeof liquidGlassTokens;
export type GlassThemes = typeof glassThemes;
export type ComponentTokens = typeof componentTokens;
export type ThemeMode = keyof typeof glassThemes;
