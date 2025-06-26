/**
 * Advanced Theming System for LiquidiUI
 * 
 * This file provides a professional-grade theming system with design tokens,
 * CSS variables, dynamic theme switching, and responsive theme adaptation.
 */

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export interface DesignTokens {
  colors: {
    // Primary palette
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    
    // Semantic colors
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    
    // Glass colors
    glass: {
      light: {
        primary: string;
        secondary: string;
        tertiary: string;
        elevated: string;
        floating: string;
        overlay: string;
      };
      dark: {
        primary: string;
        secondary: string;
        tertiary: string;
        elevated: string;
        floating: string;
        overlay: string;
      };
      states: {
        hover: string;
        active: string;
        focus: string;
        pressed: string;
      };
    };
    
    // Text colors
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      disabled: string;
    };
    
    // Border colors  
    border: {
      subtle: string;
      light: string;
      medium: string;
      strong: string;
      focus: string;
      error: string;
    };
    
    // Background colors
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      elevated: string;
      overlay: string;
    };
  };
  
  spacing: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
    32: string;
    40: string;
    48: string;
    56: string;
    64: string;
  };
  
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: {
      xs: [string, { lineHeight: string; letterSpacing: string }];
      sm: [string, { lineHeight: string; letterSpacing: string }];
      base: [string, { lineHeight: string; letterSpacing: string }];
      lg: [string, { lineHeight: string; letterSpacing: string }];
      xl: [string, { lineHeight: string; letterSpacing: string }];
      '2xl': [string, { lineHeight: string; letterSpacing: string }];
      '3xl': [string, { lineHeight: string; letterSpacing: string }];
      '4xl': [string, { lineHeight: string; letterSpacing: string }];
      '5xl': [string, { lineHeight: string; letterSpacing: string }];
    };
    fontWeight: {
      thin: string;
      extralight: string;
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
      black: string;
    };
  };
  
  borderRadius: {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  
  shadows: {
    glass: {
      whisper: string;
      subtle: string;
      light: string;
      medium: string;
      heavy: string;
      intense: string;
    };
    focus: {
      subtle: string;
      light: string;
      medium: string;
      strong: string;
    };
  };
  
  backdropBlur: {
    whisper: string;
    ghost: string;
    subtle: string;
    light: string;
    medium: string;
    heavy: string;
    intense: string;
    extreme: string;
    ultra: string;
  };
  
  animation: {
    duration: {
      instant: string;
      fast: string;
      normal: string;
      smooth: string;
      slow: string;
    };
    easing: {
      glass: string;
      liquid: string;
      spring: string;
      magnetic: string;
      hover: string;
    };
  };
  
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  
  zIndex: {
    hide: number;
    auto: string;
    base: number;
    docked: number;
    dropdown: number;
    sticky: number;
    banner: number;
    overlay: number;
    modal: number;
    popover: number;
    skipLink: number;
    toast: number;
    tooltip: number;
  };
}

// ============================================================================
// DEFAULT DESIGN TOKENS
// ============================================================================

export const defaultDesignTokens: DesignTokens = {
  colors: {
    primary: {
      50: 'hsl(214, 100%, 97%)',
      100: 'hsl(214, 95%, 93%)',
      200: 'hsl(213, 97%, 87%)',
      300: 'hsl(212, 96%, 78%)',
      400: 'hsl(213, 94%, 68%)',
      500: 'hsl(217, 91%, 60%)',
      600: 'hsl(221, 83%, 53%)',
      700: 'hsl(224, 76%, 48%)',
      800: 'hsl(226, 71%, 40%)',
      900: 'hsl(224, 64%, 33%)',
      950: 'hsl(226, 55%, 21%)',
    },
    
    semantic: {
      success: 'hsl(142, 76%, 36%)',
      warning: 'hsl(38, 92%, 50%)',
      error: 'hsl(0, 84%, 60%)',
      info: 'hsl(217, 91%, 60%)',
    },
    
    glass: {
      light: {
        primary: 'rgba(255, 255, 255, 0.12)',
        secondary: 'rgba(248, 250, 252, 0.15)',
        tertiary: 'rgba(241, 245, 249, 0.18)',
        elevated: 'rgba(255, 255, 255, 0.25)',
        floating: 'rgba(255, 255, 255, 0.20)',
        overlay: 'rgba(255, 255, 255, 0.30)',
      },
      dark: {
        primary: 'rgba(28, 28, 30, 0.15)',
        secondary: 'rgba(44, 44, 46, 0.18)',
        tertiary: 'rgba(58, 58, 60, 0.22)',
        elevated: 'rgba(72, 72, 74, 0.28)',
        floating: 'rgba(99, 99, 102, 0.25)',
        overlay: 'rgba(142, 142, 147, 0.35)',
      },
      states: {
        hover: 'rgba(255, 255, 255, 0.18)',
        active: 'rgba(255, 255, 255, 0.08)',
        focus: 'rgba(255, 255, 255, 0.22)',
        pressed: 'rgba(255, 255, 255, 0.06)',
      },
    },
    
    text: {
      primary: 'rgba(0, 0, 0, 0.9)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      tertiary: 'rgba(0, 0, 0, 0.4)',
      inverse: 'rgba(255, 255, 255, 0.9)',
      disabled: 'rgba(0, 0, 0, 0.3)',
    },
    
    border: {
      subtle: 'rgba(255, 255, 255, 0.08)',
      light: 'rgba(255, 255, 255, 0.15)',
      medium: 'rgba(255, 255, 255, 0.25)',
      strong: 'rgba(255, 255, 255, 0.35)',
      focus: 'hsl(217, 91%, 60%)',
      error: 'hsl(0, 84%, 60%)',
    },
    
    background: {
      primary: 'hsl(0, 0%, 100%)',
      secondary: 'hsl(210, 40%, 98%)',
      tertiary: 'hsl(210, 40%, 96%)',
      elevated: 'hsl(0, 0%, 100%)',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
  },
  
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
  
  typography: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
    },
    fontSize: {
      xs: ['12px', { lineHeight: '16px', letterSpacing: '0.025em' }],
      sm: ['14px', { lineHeight: '20px', letterSpacing: '0.025em' }],
      base: ['16px', { lineHeight: '24px', letterSpacing: '0em' }],
      lg: ['18px', { lineHeight: '28px', letterSpacing: '-0.025em' }],
      xl: ['20px', { lineHeight: '28px', letterSpacing: '-0.025em' }],
      '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.025em' }],
      '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.025em' }],
      '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.025em' }],
      '5xl': ['48px', { lineHeight: '1', letterSpacing: '-0.025em' }],
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
  
  shadows: {
    glass: {
      whisper: '0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.01)',
      subtle: '0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03)',
      light: '0 2px 8px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.06)',
      medium: '0 4px 16px rgba(0, 0, 0, 0.12), 0 16px 40px rgba(0, 0, 0, 0.08)',
      heavy: '0 8px 32px rgba(0, 0, 0, 0.16), 0 24px 64px rgba(0, 0, 0, 0.12)',
      intense: '0 16px 48px rgba(0, 0, 0, 0.20), 0 32px 80px rgba(0, 0, 0, 0.15)',
    },
    focus: {
      subtle: '0 0 0 2px rgba(59, 130, 246, 0.08)',
      light: '0 0 0 3px rgba(59, 130, 246, 0.12)',
      medium: '0 0 0 4px rgba(59, 130, 246, 0.18)',
      strong: '0 0 0 5px rgba(59, 130, 246, 0.25)',
    },
  },
  
  backdropBlur: {
    whisper: 'blur(2px)',
    ghost: 'blur(4px)',
    subtle: 'blur(8px)',
    light: 'blur(16px)',
    medium: 'blur(24px)',
    heavy: 'blur(32px)',
    intense: 'blur(40px)',
    extreme: 'blur(56px)',
    ultra: 'blur(72px)',
  },
  
  animation: {
    duration: {
      instant: '0.05s',
      fast: '0.15s',
      normal: '0.25s',
      smooth: '0.35s',
      slow: '0.5s',
    },
    easing: {
      glass: 'cubic-bezier(0.4, 0, 0.2, 1)',
      liquid: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      magnetic: 'cubic-bezier(0.2, 0, 0, 1.2)',
      hover: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
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
};

// ============================================================================
// THEME INTERFACE
// ============================================================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Theme {
  name: string;
  mode: ThemeMode;
  tokens: DesignTokens;
  cssVariables: Record<string, string>;
}

// ============================================================================
// PREDEFINED THEMES
// ============================================================================

export const lightTheme: Theme = {
  name: 'light',
  mode: 'light',
  tokens: defaultDesignTokens,
  cssVariables: {
    '--glass-primary': defaultDesignTokens.colors.primary[500],
    '--glass-primary-hover': defaultDesignTokens.colors.primary[400],
    '--glass-primary-active': defaultDesignTokens.colors.primary[600],
    
    '--glass-bg-primary': defaultDesignTokens.colors.glass.light.primary,
    '--glass-bg-secondary': defaultDesignTokens.colors.glass.light.secondary,
    '--glass-bg-elevated': defaultDesignTokens.colors.glass.light.elevated,
    '--glass-bg-hover': defaultDesignTokens.colors.glass.states.hover,
    '--glass-bg-pressed': defaultDesignTokens.colors.glass.states.pressed,
    
    '--text-primary': defaultDesignTokens.colors.text.primary,
    '--text-secondary': defaultDesignTokens.colors.text.secondary,
    '--text-tertiary': defaultDesignTokens.colors.text.tertiary,
    '--text-inverse': defaultDesignTokens.colors.text.inverse,
    '--text-disabled': defaultDesignTokens.colors.text.disabled,
    
    '--glass-border': defaultDesignTokens.colors.border.light,
    '--glass-border-focus': defaultDesignTokens.colors.border.focus,
    '--glass-border-error': defaultDesignTokens.colors.border.error,
    
    '--glass-success': defaultDesignTokens.colors.semantic.success,
    '--glass-warning': defaultDesignTokens.colors.semantic.warning,
    '--glass-error': defaultDesignTokens.colors.semantic.error,
    '--glass-info': defaultDesignTokens.colors.semantic.info,
    
    '--glass-blur-medium': defaultDesignTokens.backdropBlur.medium,
    '--glass-shadow-light': defaultDesignTokens.shadows.glass.light,
    '--glass-shadow-medium': defaultDesignTokens.shadows.glass.medium,
    
    '--animation-duration-normal': defaultDesignTokens.animation.duration.normal,
    '--animation-easing-glass': defaultDesignTokens.animation.easing.glass,
  },
};

export const darkTheme: Theme = {
  name: 'dark',
  mode: 'dark',
  tokens: {
    ...defaultDesignTokens,
    colors: {
      ...defaultDesignTokens.colors,
      text: {
        primary: 'rgba(255, 255, 255, 0.9)',
        secondary: 'rgba(255, 255, 255, 0.6)',
        tertiary: 'rgba(255, 255, 255, 0.4)',
        inverse: 'rgba(0, 0, 0, 0.9)',
        disabled: 'rgba(255, 255, 255, 0.3)',
      },
      background: {
        primary: 'hsl(224, 71%, 4%)',
        secondary: 'hsl(220, 13%, 9%)',
        tertiary: 'hsl(220, 13%, 13%)',
        elevated: 'hsl(222, 84%, 5%)',
        overlay: 'rgba(0, 0, 0, 0.8)',
      },
    },
  },
  cssVariables: {
    '--glass-primary': defaultDesignTokens.colors.primary[400],
    '--glass-primary-hover': defaultDesignTokens.colors.primary[300],
    '--glass-primary-active': defaultDesignTokens.colors.primary[500],
    
    '--glass-bg-primary': defaultDesignTokens.colors.glass.dark.primary,
    '--glass-bg-secondary': defaultDesignTokens.colors.glass.dark.secondary,
    '--glass-bg-elevated': defaultDesignTokens.colors.glass.dark.elevated,
    '--glass-bg-hover': 'rgba(255, 255, 255, 0.08)',
    '--glass-bg-pressed': 'rgba(255, 255, 255, 0.04)',
    
    '--text-primary': 'rgba(255, 255, 255, 0.9)',
    '--text-secondary': 'rgba(255, 255, 255, 0.6)',
    '--text-tertiary': 'rgba(255, 255, 255, 0.4)',
    '--text-inverse': 'rgba(0, 0, 0, 0.9)',
    '--text-disabled': 'rgba(255, 255, 255, 0.3)',
    
    '--glass-border': 'rgba(255, 255, 255, 0.10)',
    '--glass-border-focus': defaultDesignTokens.colors.border.focus,
    '--glass-border-error': defaultDesignTokens.colors.border.error,
    
    '--glass-success': defaultDesignTokens.colors.semantic.success,
    '--glass-warning': defaultDesignTokens.colors.semantic.warning,
    '--glass-error': defaultDesignTokens.colors.semantic.error,
    '--glass-info': defaultDesignTokens.colors.semantic.info,
    
    '--glass-blur-medium': defaultDesignTokens.backdropBlur.medium,
    '--glass-shadow-light': defaultDesignTokens.shadows.glass.light,
    '--glass-shadow-medium': defaultDesignTokens.shadows.glass.medium,
    
    '--animation-duration-normal': defaultDesignTokens.animation.duration.normal,
    '--animation-easing-glass': defaultDesignTokens.animation.easing.glass,
  },
};

// ============================================================================
// THEME CONTEXT
// ============================================================================

export interface ThemeContextValue {
  currentTheme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: Theme) => void;
  toggleMode: () => void;
  customTokens: Partial<DesignTokens>;
  updateTokens: (tokens: Partial<DesignTokens>) => void;
  applyCSSVariables: (variables: Record<string, string>) => void;
  isSystemDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ============================================================================
// THEME PROVIDER
// ============================================================================

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  defaultMode?: ThemeMode;
  storageKey?: string;
  customThemes?: Theme[];
  enableSystemTheme?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = lightTheme,
  defaultMode = 'system',
  storageKey = 'liquidui-theme',
  customThemes = [],
  enableSystemTheme = true,
}: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [customTokens, setCustomTokens] = useState<Partial<DesignTokens>>({});
  const [isSystemDark, setIsSystemDark] = useState(false);
  
  // All available themes
  const availableThemes = [lightTheme, darkTheme, ...customThemes];
  
  // Detect system theme preference
  useEffect(() => {
    if (!enableSystemTheme) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsSystemDark(mediaQuery.matches);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setIsSystemDark(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystemTheme]);
  
  // Load theme from storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const { mode: storedMode, tokens } = JSON.parse(stored);
        setModeState(storedMode || defaultMode);
        if (tokens) {
          setCustomTokens(tokens);
        }
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
    }
  }, [storageKey, defaultMode]);
  
  // Determine current theme
  const currentTheme = (() => {
    const effectiveMode = mode === 'system' ? (isSystemDark ? 'dark' : 'light') : mode;
    const baseTheme = availableThemes.find(t => t.mode === effectiveMode) || defaultTheme;
    
    // Apply custom tokens if any
    if (Object.keys(customTokens).length > 0) {
      return {
        ...baseTheme,
        tokens: { ...baseTheme.tokens, ...customTokens },
      };
    }
    
    return baseTheme;
  })();
  
  // Apply CSS variables
  const applyCSSVariables = useCallback((variables: Record<string, string>) => {
    const root = document.documentElement;
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, []);
  
  // Update CSS variables when theme changes
  useEffect(() => {
    applyCSSVariables(currentTheme.cssVariables);
    
    // Set data attribute for theme-aware styling
    document.documentElement.setAttribute('data-theme', currentTheme.mode);
    
    // Set color scheme for form controls
    document.documentElement.style.colorScheme = currentTheme.mode;
  }, [currentTheme, applyCSSVariables]);
  
  // Theme management functions
  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ 
        mode: newMode, 
        tokens: customTokens 
      }));
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  }, [storageKey, customTokens]);
  
  const setTheme = useCallback((theme: Theme) => {
    setModeState(theme.mode);
    // Apply theme's CSS variables immediately
    applyCSSVariables(theme.cssVariables);
  }, [applyCSSVariables]);
  
  const toggleMode = useCallback(() => {
    const currentEffectiveMode = mode === 'system' ? (isSystemDark ? 'dark' : 'light') : mode;
    const newMode = currentEffectiveMode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  }, [mode, isSystemDark, setMode]);
  
  const updateTokens = useCallback((tokens: Partial<DesignTokens>) => {
    setCustomTokens(prev => ({ ...prev, ...tokens }));
    try {
      localStorage.setItem(storageKey, JSON.stringify({ 
        mode, 
        tokens: { ...customTokens, ...tokens }
      }));
    } catch (error) {
      console.warn('Failed to save custom tokens:', error);
    }
  }, [storageKey, mode, customTokens]);
  
  const contextValue: ThemeContextValue = {
    currentTheme,
    mode,
    setMode,
    setTheme,
    toggleMode,
    customTokens,
    updateTokens,
    applyCSSVariables,
    isSystemDark,
  };
  
  return React.createElement(
    ThemeContext.Provider,
    { value: contextValue },
    children
  );
}

// ============================================================================
// THEME HOOKS
// ============================================================================

/**
 * Hook to access theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook to get current design tokens
 */
export function useDesignTokens(): DesignTokens {
  const { currentTheme } = useTheme();
  return currentTheme.tokens;
}

/**
 * Hook to create a custom theme
 */
export function useCustomTheme() {
  const { updateTokens, applyCSSVariables } = useTheme();
  
  const createTheme = useCallback((
    baseTheme: Theme,
    overrides: Partial<DesignTokens>
  ): Theme => {
    return {
      ...baseTheme,
      tokens: { ...baseTheme.tokens, ...overrides },
      cssVariables: {
        ...baseTheme.cssVariables,
        // Generate CSS variables from overrides
        ...generateCSSVariables(overrides),
      },
    };
  }, []);
  
  const applyTheme = useCallback((theme: Theme) => {
    updateTokens(theme.tokens);
    applyCSSVariables(theme.cssVariables);
  }, [updateTokens, applyCSSVariables]);
  
  return { createTheme, applyTheme };
}

/**
 * Hook for responsive theme values
 */
export function useResponsiveTheme() {
  const tokens = useDesignTokens();
  const [breakpoint, setBreakpoint] = useState<string>('md');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < parseInt(tokens.breakpoints.sm)) {
        setBreakpoint('xs');
      } else if (width < parseInt(tokens.breakpoints.md)) {
        setBreakpoint('sm');
      } else if (width < parseInt(tokens.breakpoints.lg)) {
        setBreakpoint('md');
      } else if (width < parseInt(tokens.breakpoints.xl)) {
        setBreakpoint('lg');
      } else if (width < parseInt(tokens.breakpoints['2xl'])) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [tokens.breakpoints]);
  
  return { breakpoint, tokens };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate CSS variables from design tokens
 */
function generateCSSVariables(tokens: Partial<DesignTokens>): Record<string, string> {
  const variables: Record<string, string> = {};
  
  // Convert design tokens to CSS variables
  if (tokens.colors?.primary) {
    Object.entries(tokens.colors.primary).forEach(([key, value]) => {
      variables[`--color-primary-${key}`] = value;
    });
  }
  
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      variables[`--spacing-${key}`] = value;
    });
  }
  
  // Add more token-to-variable mappings as needed
  
  return variables;
}

/**
 * Get CSS variable value
 */
export function getCSSVariable(variable: string, fallback?: string): string {
  if (typeof window === 'undefined') return fallback || '';
  
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback || '';
}

/**
 * Set CSS variable value
 */
export function setCSSVariable(variable: string, value: string): void {
  if (typeof window === 'undefined') return;
  
  document.documentElement.style.setProperty(variable, value);
}

/**
 * Create theme-aware CSS classes
 */
export function createThemeAwareClasses(
  tokens: DesignTokens,
  classes: Record<string, string>
): Record<string, string> {
  const themeClasses: Record<string, string> = {};
  
  Object.entries(classes).forEach(([key, value]) => {
    // Replace token placeholders with actual values
    themeClasses[key] = value.replace(/\$\{([^}]+)\}/g, (match, tokenPath) => {
      const pathParts = tokenPath.split('.');
      let tokenValue: any = tokens;
      
      for (const part of pathParts) {
        tokenValue = tokenValue?.[part];
      }
      
      return tokenValue || match;
    });
  });
  
  return themeClasses;
}

// Export default theme tokens for backward compatibility
export { defaultDesignTokens as designTokens };