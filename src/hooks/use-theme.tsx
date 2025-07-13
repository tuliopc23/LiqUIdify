import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
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
      if (typeof window !== 'undefined' && window.localStorage) {
        return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
      }
    } catch (error) {
      console.warn(
        'LocalStorage not available, using default theme:',
        defaultTheme,
        error
      );
    }
    return defaultTheme;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = window.document.documentElement;

    // Remove old theme classes
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Set data attribute for theme
    root.setAttribute('data-theme', theme);

    // Set CSS custom properties based on theme
    const themeProperties = {
      // Glass properties
      '--glass-bg-primary':
        theme === 'dark'
          ? 'rgba(18, 18, 18, 0.25)'
          : 'rgba(255, 255, 255, 0.12)',
      '--glass-bg-secondary':
        theme === 'dark'
          ? 'rgba(44, 44, 46, 0.18)'
          : 'rgba(248, 250, 252, 0.15)',
      '--glass-bg-tertiary':
        theme === 'dark'
          ? 'rgba(58, 58, 60, 0.22)'
          : 'rgba(241, 245, 249, 0.18)',
      '--glass-bg-elevated':
        theme === 'dark'
          ? 'rgba(88, 88, 90, 0.28)'
          : 'rgba(255, 255, 255, 0.25)',
      '--glass-bg-floating':
        theme === 'dark'
          ? 'rgba(68, 68, 70, 0.25)'
          : 'rgba(255, 255, 255, 0.20)',
      '--glass-bg-overlay':
        theme === 'dark'
          ? 'rgba(48, 48, 50, 0.35)'
          : 'rgba(255, 255, 255, 0.30)',

      // Interactive states
      '--glass-bg-hover':
        theme === 'dark'
          ? 'rgba(78, 78, 80, 0.22)'
          : 'rgba(255, 255, 255, 0.18)',
      '--glass-bg-active':
        theme === 'dark'
          ? 'rgba(38, 38, 40, 0.18)'
          : 'rgba(255, 255, 255, 0.08)',
      '--glass-bg-focus':
        theme === 'dark'
          ? 'rgba(88, 88, 90, 0.25)'
          : 'rgba(255, 255, 255, 0.22)',
      '--glass-bg-pressed':
        theme === 'dark'
          ? 'rgba(28, 28, 30, 0.15)'
          : 'rgba(255, 255, 255, 0.06)',

      // Border colors
      '--glass-border-subtle':
        theme === 'dark'
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(255, 255, 255, 0.08)',
      '--glass-border-light':
        theme === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(255, 255, 255, 0.15)',
      '--glass-border-medium':
        theme === 'dark'
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(255, 255, 255, 0.25)',
      '--glass-border-strong':
        theme === 'dark'
          ? 'rgba(255, 255, 255, 0.25)'
          : 'rgba(255, 255, 255, 0.35)',
      '--glass-border-focus':
        theme === 'dark'
          ? 'rgba(64, 156, 255, 0.4)'
          : 'rgba(59, 130, 246, 0.4)',
      '--glass-border-hover':
        theme === 'dark'
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(255, 255, 255, 0.3)',

      // Primary colors
      '--glass-primary':
        theme === 'dark'
          ? 'rgba(64, 156, 255, 0.8)'
          : 'rgba(59, 130, 246, 0.8)',
      '--glass-primary-hover':
        theme === 'dark'
          ? 'rgba(64, 156, 255, 0.9)'
          : 'rgba(59, 130, 246, 0.9)',
      '--glass-primary-active':
        theme === 'dark'
          ? 'rgba(64, 156, 255, 0.7)'
          : 'rgba(59, 130, 246, 0.7)',

      // Text colors
      '--text-primary':
        theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
      '--text-secondary':
        theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
      '--text-tertiary':
        theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',

      // Semantic colors (shadcn/ui compatibility)
      '--background': theme === 'dark' ? '222.2 84% 4.9%' : '0 0% 100%',
      '--foreground': theme === 'dark' ? '210 40% 98%' : '222.2 84% 4.9%',
      '--card': theme === 'dark' ? '222.2 84% 4.9%' : '0 0% 100%',
      '--card-foreground': theme === 'dark' ? '210 40% 98%' : '222.2 84% 4.9%',
      '--popover': theme === 'dark' ? '222.2 84% 4.9%' : '0 0% 100%',
      '--popover-foreground':
        theme === 'dark' ? '210 40% 98%' : '222.2 84% 4.9%',
      '--primary': theme === 'dark' ? '217.2 91.2% 59.8%' : '221.2 83.2% 53.3%',
      '--primary-foreground':
        theme === 'dark' ? '222.2 84% 4.9%' : '210 40% 98%',
      '--secondary': theme === 'dark' ? '217.2 32.6% 17.5%' : '210 40% 96%',
      '--secondary-foreground':
        theme === 'dark' ? '210 40% 98%' : '222.2 84% 4.9%',
      '--muted': theme === 'dark' ? '217.2 32.6% 17.5%' : '210 40% 96%',
      '--muted-foreground':
        theme === 'dark' ? '215 20.2% 65.1%' : '215.4 16.3% 46.9%',
      '--accent': theme === 'dark' ? '217.2 32.6% 17.5%' : '210 40% 96%',
      '--accent-foreground':
        theme === 'dark' ? '210 40% 98%' : '222.2 84% 4.9%',
      '--destructive': theme === 'dark' ? '0 62.8% 30.6%' : '0 84.2% 60.2%',
      '--destructive-foreground':
        theme === 'dark' ? '210 40% 98%' : '210 40% 98%',
      '--border': theme === 'dark' ? '217.2 32.6% 17.5%' : '214.3 31.8% 91.4%',
      '--input': theme === 'dark' ? '217.2 32.6% 17.5%' : '214.3 31.8% 91.4%',
      '--ring': theme === 'dark' ? '224.3 76.3% 94.1%' : '221.2 83.2% 53.3%',
      '--radius': '0.5rem',

      // Canvas background for docs
      '--glass-bg-canvas': theme === 'dark' ? '#0a0a0a' : '#fafafa',
    };

    // Apply all theme properties
    Object.entries(themeProperties).forEach(([property, value]) => {
      root.style.setProperty(property, String(value));
    });

    // Update body class for additional styling
    if (document.body) {
      document.body.className =
        document.body.className.replace(/\b(light|dark)\b/g, '') + ` ${theme}`;
    }

    console.log(`🎨 Theme applied: ${theme}`, {
      properties: Object.keys(themeProperties).length,
      dataTheme: root.getAttribute('data-theme'),
    });
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(storageKey, theme);
        }
      } catch (error) {
        console.warn('Could not save theme to localStorage:', error);
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

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
