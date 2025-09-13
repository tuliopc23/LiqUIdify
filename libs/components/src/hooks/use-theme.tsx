// External dependencies
import { createContext, useContext, useEffect, useState } from "react";

// Type definitions
type Theme = "light" | "dark";

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
  theme: "light",
  setTheme: () => undefined,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return (window.localStorage.getItem(storageKey) as Theme) || defaultTheme;
      }
    } catch {
      // Logging disabled
    }
    return defaultTheme;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const root = window.document.documentElement;

    // Remove old theme classes
    root.classList.remove("light", "dark", "theme-light", "theme-dark");

    // Add new theme classes ( system uses theme-* classes)
    root.classList.add(theme, `theme-${theme}`);

    // Set data attribute for theme
    root.dataset.theme = theme;

    // Only set minimal compatibility properties for docs
    const compatibilityProperties = {
      // Semantic colors for docs compatibility
      "--background": theme === "dark" ? "222.2 84% 4.9%" : "0 0% 100%",
      "--foreground": theme === "dark" ? "210 40% 98%" : "222.2 84% 4.9%",
      "--card": theme === "dark" ? "222.2 84% 4.9%" : "0 0% 100%",
      "--card-foreground": theme === "dark" ? "210 40% 98%" : "222.2 84% 4.9%",
      "--popover": theme === "dark" ? "222.2 84% 4.9%" : "0 0% 100%",
      "--popover-foreground": theme === "dark" ? "210 40% 98%" : "222.2 84% 4.9%",
      "--primary": theme === "dark" ? "217.2 91.2% 59.8%" : "221.2 83.2% 53.3%",
      "--primary-foreground": theme === "dark" ? "222.2 84% 4.9%" : "210 40% 98%",
      "--secondary": theme === "dark" ? "217.2 32.6% 17.5%" : "210 40% 96%",
      "--secondary-foreground": theme === "dark" ? "210 40% 98%" : "222.2 84% 4.9%",
      "--muted": theme === "dark" ? "217.2 32.6% 17.5%" : "210 40% 96%",
      "--muted-foreground": theme === "dark" ? "215 20.2% 65.1%" : "215.4 16.3% 46.9%",
      "--accent": theme === "dark" ? "217.2 32.6% 17.5%" : "210 40% 96%",
      "--accent-foreground": theme === "dark" ? "210 40% 98%" : "222.2 84% 4.9%",
      "--destructive": theme === "dark" ? "0 62.8% 30.6%" : "0 84.2% 60.2%",
      "--destructive-foreground": theme === "dark" ? "210 40% 98%" : "210 40% 98%",
      "--border": theme === "dark" ? "217.2 32.6% 17.5%" : "214.3 31.8% 91.4%",
      "--input": theme === "dark" ? "217.2 32.6% 17.5%" : "214.3 31.8% 91.4%",
      "--ring": theme === "dark" ? "224.3 76.3% 94.1%" : "221.2 83.2% 53.3%",
      "--radius": "0.5rem",

      // Canvas background for docs only
      "--ui-canvas-bg": theme === "dark" ? "#0a0a0a" : "#fafafa",
    };

    // Apply only compatibility properties
    for (const [property, value] of Object.entries(compatibilityProperties)) {
      root.style.setProperty(property, String(value));
    }

    // Update body class for additional styling
    if (document.body) {
      document.body.className = `${document.body.className.replaceAll(/\b(light|dark|theme-light|theme-dark)\b/g, "")} ${theme} theme-${theme}`;
    }

    if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production") {
      console.log(`🎨 Theme applied: ${theme}`, {
        compatibilityProperties: Object.keys(compatibilityProperties).length,
        dataTheme: root.dataset.theme,
      });
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      try {
        if (window?.localStorage) {
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
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
