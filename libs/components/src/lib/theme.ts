export type Theme = "light" | "dark";

interface ThemeOptions {
	storageKey?: string;
	root?: HTMLElement;
}

// Accent Preset System - Apple-inspired system colors with WCAG AA compliance
export const ACCENT_PRESETS = {
	blue: "#007AFF", // Apple System Blue
	red: "#FF3B30", // Apple System Red
	green: "#34C759", // Apple System Green
	orange: "#FF9500", // Apple System Orange
	yellow: "#FFCC00", // Apple System Yellow
	pink: "#FF2D92", // Apple System Pink
	purple: "#AF52DE", // Apple System Purple
	teal: "#5AC8FA", // Apple System Teal
	indigo: "#5856D6", // Apple System Indigo
	brown: "#A2845E", // Apple System Brown
	gray: "#8E8E93", // Apple System Gray
} as const;

export type AccentPresetName = keyof typeof ACCENT_PRESETS;
export type AccentPresets = Record<string, string>;

const DEFAULT_STORAGE_KEY = "ui-theme" as const;
const DEFAULT_ACCENT_STORAGE_KEY = "ui-accent" as const;
const DEFAULT_ACCENT_PRESET_STORAGE_KEY = "ui-accent-preset" as const;

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

interface AccentOptions {
	storageKey?: string;
	root?: HTMLElement;
	persist?: boolean;
}

// Accent Preset API
export function listAccentPresets(customPresets?: AccentPresets): string[] {
	const allPresets = { ...ACCENT_PRESETS, ...customPresets };
	return Object.keys(allPresets);
}

export function getAccentPreset(
	name: string,
	customPresets?: AccentPresets,
): string | undefined {
	const allPresets: Record<string, string> = {
		...ACCENT_PRESETS,
		...customPresets,
	};
	return allPresets[name];
}

export function setAccentPreset(
	name: string,
	options: AccentOptions & { customPresets?: AccentPresets } = {},
): Accent | null {
	const {
		customPresets,
		persist = true,
		storageKey = DEFAULT_ACCENT_STORAGE_KEY,
		...accentOptions
	} = options;
	const color = getAccentPreset(name, customPresets);
	if (!color) return null;

	// Store the preset name if persistence is enabled
	if (persist) {
		try {
			if (typeof window !== "undefined" && window.localStorage) {
				window.localStorage.setItem(DEFAULT_ACCENT_PRESET_STORAGE_KEY, name);
			}
		} catch {
			// ignore storage errors
		}
	}

	return setAccent(color, { ...accentOptions, storageKey, persist });
}

export function getAccent(options: AccentOptions = {}): Accent {
	const {
		storageKey = DEFAULT_ACCENT_STORAGE_KEY,
		root,
		persist = true,
	} = options;

	// Only read from storage if persistence is enabled
	if (persist) {
		try {
			if (typeof window !== "undefined" && window.localStorage) {
				const stored = window.localStorage.getItem(storageKey);
				if (typeof stored === "string" && stored.trim().length > 0)
					return stored;
			}
		} catch {
			// ignore storage errors
		}
	}

	const el = getRoot(root);
	// Prefer computed CSS var (captures inline and stylesheet values with fallbacks)
	try {
		if (el && typeof window !== "undefined" && window.getComputedStyle) {
			const computed = window
				.getComputedStyle(el)
				.getPropertyValue("--ui-accent")
				.trim();
			if (computed) return computed;
		}
	} catch {
		// ignore style errors
	}
	// Check inline CSS var next
	const cssVar = el?.style.getPropertyValue("--ui-accent").trim();
	if (cssVar) return cssVar;
	// Fallback to data attribute
	const fromAttr = el?.dataset.accent;
	if (fromAttr && fromAttr.trim().length > 0) return fromAttr;
	// Default to Apple System Blue
	return "#007AFF";
}

export function setAccent(accent: Accent, options: AccentOptions = {}): Accent {
	const {
		storageKey = DEFAULT_ACCENT_STORAGE_KEY,
		root,
		persist = true,
	} = options;
	const el = getRoot(root);
	if (el) {
		el.dataset.accent = accent;
		try {
			el.style.setProperty("--ui-accent", accent);
		} catch {
			// ignore style errors
		}
	}

	// Only write to storage if persistence is enabled
	if (persist) {
		try {
			if (typeof window !== "undefined" && window.localStorage) {
				window.localStorage.setItem(storageKey, accent);
			}
		} catch {
			// ignore storage errors
		}
	}
	return accent;
}

export function initAccent(options: AccentOptions = {}): Accent {
	const current = getAccent(options);
	return setAccent(current, options);
}

// Get the currently stored accent preset name
export function getAccentPresetName(
	options: Pick<AccentOptions, "persist"> = {},
): string | null {
	const { persist = true } = options;

	if (!persist) return null;

	try {
		if (typeof window !== "undefined" && window.localStorage) {
			return window.localStorage.getItem(DEFAULT_ACCENT_PRESET_STORAGE_KEY);
		}
	} catch {
		// ignore storage errors
	}
	return null;
}
