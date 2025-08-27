export type ThemeMode = "auto" | "light" | "dark";
export type ContrastMode = "normal" | "increased";

const THEME_KEY = "liquidify:theme";
const CONTRAST_KEY = "liquidify:contrast";

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function getStoredTheme(): ThemeMode | null {
  if (!isBrowser()) return null;
  const v = localStorage.getItem(THEME_KEY) as ThemeMode | null;
  return v && ["auto", "light", "dark"].includes(v) ? v : null;
}

export function getStoredContrast(): ContrastMode | null {
  if (!isBrowser()) return null;
  const v = localStorage.getItem(CONTRAST_KEY) as ContrastMode | null;
  return v && ["normal", "increased"].includes(v) ? v : null;
}

export function applyTheme(theme: ThemeMode) {
  if (!isBrowser()) return;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

export function applyContrast(contrast: ContrastMode) {
  if (!isBrowser()) return;
  document.documentElement.setAttribute("data-contrast", contrast);
  localStorage.setItem(CONTRAST_KEY, contrast);
}

export function initThemeFromStorage() {
  if (!isBrowser()) return;
  const theme = getStoredTheme() ?? (document.documentElement.getAttribute("data-theme") as ThemeMode) ?? "auto";
  const contrast = getStoredContrast() ?? (document.documentElement.getAttribute("data-contrast") as ContrastMode) ?? "normal";
  applyTheme(theme);
  applyContrast(contrast);
}

export function nextTheme(current: ThemeMode): ThemeMode {
  if (current === "auto") return "light";
  if (current === "light") return "dark";
  return "auto";
}

export function toggleContrast(current: ContrastMode): ContrastMode {
  return current === "normal" ? "increased" : "normal";
}
