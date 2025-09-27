/**
 * ClassName utility for combining CSS classes with Panda CSS
 *
 * Provides a robust utility for combining CSS classes using Panda's cx utility
 * with proper handling of conditional classes, arrays, and objects.
 */

import { cx, css } from "../../../../../styled-system/css";

/**
 * Combines multiple class values into a single string using Panda CSS
 *
 * @param inputs - Array of class values (strings, objects, arrays)
 * @returns Combined class string
 *
 * @example
 * cn('base-class', 'additional-class')
 */
export function cn(...inputs: Parameters<typeof cx>): string {
	return cx(...inputs);
}

/**
 * Surface effect class utilities using pre-generated Panda CSS classes
 * Provides liquid glass surface classes for consistent styling
 */
export const SURFACE_CLASSES = {
	default: "glass-surface",
	elevated: "glass-surface liquid-flow",
	floating: "glass-surface liquid-wobble-active",
	overlay: "glass-surface",
	hover: "liquid-flow",
	active: "liquid-pressed",
	pressed: "liquid-pressed",
	interactive: "liquid-flow",
	disabled: "",
} as const;

/**
 * Get surface effect classes using liquid glass styling
 *
 * @param variant - The surface variant to apply
 * @returns The corresponding surface classes
 */
export function getSurfaceClass(
	variant: keyof typeof SURFACE_CLASSES = "default",
): string {
	return SURFACE_CLASSES[variant] || SURFACE_CLASSES.default;
}

/**
 * @deprecated Use getSurfaceClass instead
 */
export function getGlassClass(
	variant: keyof typeof SURFACE_CLASSES = "default",
): string {
	return getSurfaceClass(variant);
}

/**
 * Focus ring utility for accessibility using Panda CSS tokens
 * Provides consistent focus ring styling across components
 */
export function focusRing(visible = true): string {
	if (!visible) {
		return "";
	}

	// Use Panda CSS tokens and dynamic accent color
	// Applies a subtle outside ring that respects `--ui-accent` fallback
	return css({
		_focusVisible: {
			outline: "none",
			boxShadow: "0 0 0 3px color-mix(in oklch, var(--colors-accent-dynamic) 35%, transparent)",
			borderColor: "token(colors.accent.dynamic)",
		},
	});
}

/**
 * Micro-interaction utility using liquid glass animations
 * Provides subtle interaction feedback
 */
function createMicroInteraction(
	type: "hover" | "active" | "focus" = "hover",
): string {
	const interactions = {
		hover: "liquid-flow",
		active: "liquid-pressed",
		focus: "liquid-flow",
	};

	return interactions[type];
}

// Create microInteraction object with both function and properties
export const microInteraction = Object.assign(createMicroInteraction, {
	gentle: createMicroInteraction("hover"),
	interactive: "liquid-flow",
	smooth: "liquid-flow",
});
