/**
 * TypeScript declarations for Tailwind v4 CSS variables and design tokens
 * Ensures type safety when using CSS custom properties and design tokens
 */

declare module "tailwindcss" {
	// Re-export the main Config type for Tailwind v4
	export interface Config {
		content?: string[] | { files: string[]; extract?: any };
		darkMode?: "media" | "class" | ["class", string];
		theme?: {
			extend?: Record<string, any>;
			[key: string]: any;
		};
		plugins?: any[];
		[key: string]: any;
	}
}

// CSS Custom Properties type definitions for better IntelliSense
declare module "csstype" {
	interface Properties {
		// Glass Design System Variables
		"--glass-bg-primary"?: string;
		"--glass-bg-secondary"?: string;
		"--glass-bg-tertiary"?: string;
		"--glass-bg-elevated"?: string;
		"--glass-bg-floating"?: string;
		"--glass-bg-overlay"?: string;
		"--glass-bg-hover"?: string;
		"--glass-bg-active"?: string;
		"--glass-bg-focus"?: string;
		"--glass-bg-pressed"?: string;

		// Glass Border Variables
		"--glass-border-subtle"?: string;
		"--glass-border-light"?: string;
		"--glass-border-medium"?: string;
		"--glass-border-strong"?: string;
		"--glass-border-focus"?: string;
		"--glass-border-hover"?: string;

		// Text Color Variables
		"--text-primary"?: string;
		"--text-secondary"?: string;

		// Semantic Color Variables
		"--primary"?: string;
		"--primary-foreground"?: string;
		"--secondary"?: string;
		"--secondary-foreground"?: string;
		"--background"?: string;
		"--foreground"?: string;
		"--border"?: string;
		"--input"?: string;
		"--ring"?: string;
		"--radius"?: string;

		// Apple System Variables
		"--liquid-glass-primary"?: string;
		"--liquid-glass-secondary"?: string;
		"--liquid-glass-tertiary"?: string;
		"--liquid-glass-elevated"?: string;
		"--liquid-glass-floating"?: string;
		"--liquid-glass-overlay"?: string;

		// Animation Variables
		"--glass-timing-instant"?: string;
		"--glass-timing-fast"?: string;
		"--glass-timing-normal"?: string;
		"--glass-timing-smooth"?: string;
		"--glass-timing-slow"?: string;

		// Easing Variables
		"--glass-ease-glass"?: string;
		"--glass-ease-liquid"?: string;
		"--glass-ease-spring"?: string;
		"--glass-ease-magnetic"?: string;
		"--glass-ease-hover"?: string;
	}
}

// Extend the global CSS namespace for better type support
declare global {
	namespace CSS {
		interface Properties {
			// Glass backdrop filters
			"--glass-blur-whisper"?: string;
			"--glass-blur-ghost"?: string;
			"--glass-blur-subtle"?: string;
			"--glass-blur-light"?: string;
			"--glass-blur-medium"?: string;
			"--glass-blur-heavy"?: string;
			"--glass-blur-intense"?: string;
			"--glass-blur-extreme"?: string;
			"--glass-blur-ultra"?: string;

			// Vibrancy effects
			"--glass-saturation-muted"?: string;
			"--glass-saturation-normal"?: string;
			"--glass-saturation-enhanced"?: string;
			"--glass-saturation-vivid"?: string;
			"--glass-saturation-intense"?: string;

			"--glass-brightness-dim"?: string;
			"--glass-brightness-normal"?: string;
			"--glass-brightness-bright"?: string;
			"--glass-brightness-brilliant"?: string;

			"--glass-contrast-soft"?: string;
			"--glass-contrast-normal"?: string;
			"--glass-contrast-sharp"?: string;
			"--glass-contrast-crisp"?: string;
		}
	}
}

// Type-safe design token access
export type GlassVariant =
	| "primary"
	| "secondary"
	| "tertiary"
	| "elevated"
	| "floating"
	| "overlay";

export type GlassState = "hover" | "active" | "focus" | "pressed";

export type GlassBorder =
	| "subtle"
	| "light"
	| "medium"
	| "strong"
	| "focus"
	| "hover";

export type GlassBlur =
	| "whisper"
	| "ghost"
	| "subtle"
	| "light"
	| "medium"
	| "heavy"
	| "intense"
	| "extreme"
	| "ultra";

export type GlassTiming = "instant" | "fast" | "normal" | "smooth" | "slow";

export type GlassEasing = "glass" | "liquid" | "spring" | "magnetic" | "hover";

// Helper functions for type-safe CSS variable usage
export const getCSSVar = (_variable: string): string => `var(--${variable})`;

export const getGlassBg = (_variant: GlassVariant): string =>
	`var(--glass-bg-${variant})`;

export const getGlassBgState = (_state: GlassState): string =>
	`var(--glass-bg-${state})`;

export const getGlassBorder = (_variant: GlassBorder): string =>
	`var(--glass-border-${variant})`;

export const getGlassBlur = (_level: GlassBlur): string =>
	`var(--glass-blur-${level})`;

export const getGlassTiming = (_speed: GlassTiming): string =>
	`var(--glass-timing-${speed})`;

export const getGlassEasing = (_type: GlassEasing): string =>
	`var(--glass-ease-${type})`;
