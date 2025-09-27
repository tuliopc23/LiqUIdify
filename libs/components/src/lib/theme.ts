export type Theme = "light" | "dark";

interface ThemeOptions {
	storageKey?: string;
	root?: HTMLElement;
}

const DEFAULT_STORAGE_KEY = "ui-theme" as const;
const DEFAULT_ACCENT_STORAGE_KEY = "ui-accent" as const;

function getRoot(root?: HTMLElement): HTMLElement | null {
	if (root) return root;
	if (typeof document !== "undefined") return document.documentElement;
	return null;
}

export function getSystemTheme(): Theme {
	if (typeof window !== "undefined") {
		const mm = window.matchMedia?.("(prefers-color-scheme: dark)");
		if (mm?.matches) return "dark";
	} else if (typeof globalThis !== "undefined") {
		const mm = (globalThis as any).matchMedia?.("(prefers-color-scheme: dark)");
		if (mm?.matches) return "dark";
	}
	return "light";
}

export function getTheme(options: ThemeOptions = {}): Theme {
	const { storageKey = DEFAULT_STORAGE_KEY, root } = options;
	try {
		if (typeof window !== "undefined" && window.localStorage) {
			const stored = window.localStorage.getItem(storageKey) as Theme | null;
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
			window.localStorage.setItem(storageKey, theme);
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

// Accent helpers: manage dynamic accent color via CSS var and data attribute
export type Accent = string; // CSS color string (e.g., "#007AFF" or "oklch(62% 0.2 236)")

export function getAccent(
	options: { storageKey?: string; root?: HTMLElement } = {},
): Accent {
	const { storageKey = DEFAULT_ACCENT_STORAGE_KEY, root } = options;
	try {
		if (typeof window !== "undefined" && window.localStorage) {
			const stored = window.localStorage.getItem(storageKey);
			if (typeof stored === "string" && stored.trim().length > 0) return stored;
		}
	} catch {
		// ignore storage errors
	}

	const el = getRoot(root);
	// Prefer inline CSS var if present
	const cssVar = el?.style.getPropertyValue("--ui-accent").trim();
	if (cssVar) return cssVar;
	// Fallback to data attribute
	const fromAttr = el?.dataset.accent;
	if (fromAttr && fromAttr.trim().length > 0) return fromAttr;
	// Default to Apple System Blue
	return "#007AFF";
}

export function setAccent(
	accent: Accent,
	options: { storageKey?: string; root?: HTMLElement } = {},
): Accent {
	const { storageKey = DEFAULT_ACCENT_STORAGE_KEY, root } = options;
	const el = getRoot(root);
	if (el) {
		el.dataset.accent = accent;
		try {
			el.style.setProperty("--ui-accent", accent);
		} catch {
			// ignore style errors
		}
	}
	try {
		if (typeof window !== "undefined" && window.localStorage) {
			window.localStorage.setItem(storageKey, accent);
		}
	} catch {
		// ignore storage errors
	}
	return accent;
}

export function initAccent(
	options: { storageKey?: string; root?: HTMLElement } = {},
): Accent {
	const current = getAccent(options);
	return setAccent(current, options);
}
