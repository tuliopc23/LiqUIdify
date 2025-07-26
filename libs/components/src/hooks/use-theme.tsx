/* eslint-disable react-refresh/only-export-components */
// External dependencies
import { createContext, useContext, useEffect, useState } from 'react';

// Type definitions
type Theme = 'light' | 'dark';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Initial state
const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => undefined,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'glass-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      if ('undefined' !== typeof window && window.localStorage) {
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
      }
    } catch {
      // Logging disabled
    }
    return defaultTheme;
  });

  useEffect(() => {
    if ('undefined' === typeof window) {
      return;
    }

    const root = window.document.documentElement;

    // Remove old theme classes
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Set data attribute for theme
    root.dataset.theme = theme;

    // Set CSS custom properties based on theme
    const themeProperties = {
      // Glass properties
      '--glass-bg-primary':
        'dark' === theme
          ? 'rgba(18, 18, 18, 0.25)'
          : 'rgba(255, 255, 255, 0.12)',
      '--glass-bg-secondary':
        'dark' === theme
          ? 'rgba(44, 44, 46, 0.18)'
          : 'rgba(248, 250, 252, 0.15)',
      '--glass-bg-tertiary':
        'dark' === theme
          ? 'rgba(58, 58, 60, 0.22)'
          : 'rgba(241, 245, 249, 0.18)',
      '--glass-bg-elevated':
        'dark' === theme
          ? 'rgba(88, 88, 90, 0.28)'
          : 'rgba(255, 255, 255, 0.25)',
      '--glass-bg-floating':
        'dark' === theme
          ? 'rgba(68, 68, 70, 0.25)'
          : 'rgba(255, 255, 255, 0.20)',
      '--glass-bg-overlay':
        'dark' === theme
          ? 'rgba(48, 48, 50, 0.35)'
          : 'rgba(255, 255, 255, 0.30)',

      // Interactive states
      '--glass-bg-hover':
        'dark' === theme
          ? 'rgba(78, 78, 80, 0.22)'
          : 'rgba(255, 255, 255, 0.18)',
      '--glass-bg-active':
        'dark' === theme
          ? 'rgba(38, 38, 40, 0.18)'
          : 'rgba(255, 255, 255, 0.08)',
      '--glass-bg-focus':
        'dark' === theme
          ? 'rgba(88, 88, 90, 0.25)'
          : 'rgba(255, 255, 255, 0.22)',
      '--glass-bg-pressed':
        'dark' === theme
          ? 'rgba(28, 28, 30, 0.15)'
          : 'rgba(255, 255, 255, 0.06)',

      // Border colors
      '--glass-border-subtle':
        'dark' === theme
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(255, 255, 255, 0.08)',
      '--glass-border-light':
        'dark' === theme
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(255, 255, 255, 0.15)',
      '--glass-border-medium':
        'dark' === theme
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(255, 255, 255, 0.25)',
      '--glass-border-strong':
        'dark' === theme
          ? 'rgba(255, 255, 255, 0.25)'
          : 'rgba(255, 255, 255, 0.35)',
      '--glass-border-focus':
        'dark' === theme
          ? 'rgba(64, 156, 255, 0.4)'
          : 'rgba(59, 130, 246, 0.4)',
      '--glass-border-hover':
        'dark' === theme
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(255, 255, 255, 0.3)',

      // Primary colors
      '--glass-primary':
        'dark' === theme
          ? 'rgba(64, 156, 255, 0.8)'
          : 'rgba(59, 130, 246, 0.8)',
      '--glass-primary-hover':
        'dark' === theme
          ? 'rgba(64, 156, 255, 0.9)'
          : 'rgba(59, 130, 246, 0.9)',
      '--glass-primary-active':
        'dark' === theme
          ? 'rgba(64, 156, 255, 0.7)'
          : 'rgba(59, 130, 246, 0.7)',

      // Text colors
      '--text-primary':
        'dark' === theme ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
      '--text-secondary':
        'dark' === theme ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
      '--text-tertiary':
        'dark' === theme ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',

      // Semantic colors (shadcn/ui compatibility)
      '--background': 'dark' === theme ? '222.2 84% 4.9%' : '0 0% 100%',
      '--foreground': 'dark' === theme ? '210 40% 98%' : '222.2 84% 4.9%',
      '--card': 'dark' === theme ? '222.2 84% 4.9%' : '0 0% 100%',
      '--card-foreground': 'dark' === theme ? '210 40% 98%' : '222.2 84% 4.9%',
      '--popover': 'dark' === theme ? '222.2 84% 4.9%' : '0 0% 100%',
      '--popover-foreground':
        'dark' === theme ? '210 40% 98%' : '222.2 84% 4.9%',
      '--primary': 'dark' === theme ? '217.2 91.2% 59.8%' : '221.2 83.2% 53.3%',
      '--primary-foreground':
        'dark' === theme ? '222.2 84% 4.9%' : '210 40% 98%',
      '--secondary': 'dark' === theme ? '217.2 32.6% 17.5%' : '210 40% 96%',
      '--secondary-foreground':
        'dark' === theme ? '210 40% 98%' : '222.2 84% 4.9%',
      '--muted': 'dark' === theme ? '217.2 32.6% 17.5%' : '210 40% 96%',
      '--muted-foreground':
        'dark' === theme ? '215 20.2% 65.1%' : '215.4 16.3% 46.9%',
      '--accent': 'dark' === theme ? '217.2 32.6% 17.5%' : '210 40% 96%',
      '--accent-foreground':
        'dark' === theme ? '210 40% 98%' : '222.2 84% 4.9%',
      '--destructive': 'dark' === theme ? '0 62.8% 30.6%' : '0 84.2% 60.2%',
      '--destructive-foreground':
        'dark' === theme ? '210 40% 98%' : '210 40% 98%',
      '--border': 'dark' === theme ? '217.2 32.6% 17.5%' : '214.3 31.8% 91.4%',
      '--input': 'dark' === theme ? '217.2 32.6% 17.5%' : '214.3 31.8% 91.4%',
      '--ring': 'dark' === theme ? '224.3 76.3% 94.1%' : '221.2 83.2% 53.3%',
      '--radius': '0.5rem',

      // Canvas background for docs
      '--glass-bg-canvas': 'dark' === theme ? '#0a0a0a' : '#fafafa',
    };

    // Apply all theme properties
    for (const [property, value] of Object.entries(themeProperties)) {
      root.style.setProperty(property, String(value));
    }

    // Update body class for additional styling
    if (document.body) {
      document.body.className = `${document.body.className.replaceAll(/\b(light|dark)\b/g, '')} ${theme}`;
    }

    console.log(`🎨 Theme applied: ${theme}`, {
      properties: Object.keys(themeProperties).length,
      dataTheme: root.dataset.theme,
    });
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      try {
        if ('undefined' !== typeof window && window.localStorage) {
          localStorage.setItem(storageKey, theme);
        }
      } catch {
        // Logging disabled
      }
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
