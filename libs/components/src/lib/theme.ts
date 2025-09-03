export type Theme = "light" | "dark";

interface ThemeOptions {
  storageKey?: string;
  root?: HTMLElement;
}

const DEFAULT_STORAGE_KEY = "ui-theme" as const;

function getRoot(root?: HTMLElement): HTMLElement | null {
  if (root) return root;
  if (typeof document !== "undefined") return document.documentElement;
  return null;
}

export function getSystemTheme(): Theme {
  if (typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function getTheme(options: ThemeOptions = {}): Theme {
  const { storageKey = DEFAULT_STORAGE_KEY, root } = options;
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      if (stored === "light" || stored === "dark") return stored;
    }
  } catch {
    // ignore storage errors
  }

  const el = getRoot(root);
  const fromAttr = el?.dataset.theme as Theme | undefined;
  if (fromAttr === "light" || fromAttr === "dark") return fromAttr;

  return getSystemTheme();
}

export function setTheme(theme: Theme, options: ThemeOptions = {}): Theme {
  const { storageKey = DEFAULT_STORAGE_KEY, root } = options;
  const el = getRoot(root);
  if (el) {
    el.classList.remove("light", "dark", "theme-light", "theme-dark");
    el.classList.add(theme, `theme-${theme}`);
    el.dataset.theme = theme;
  }
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(storageKey, theme);
    }
  } catch {
    // ignore storage errors
  }
  return theme;
}

export function initTheme(options: ThemeOptions = {}): Theme {
  const current = getTheme(options);
  return setTheme(current, options);
}
