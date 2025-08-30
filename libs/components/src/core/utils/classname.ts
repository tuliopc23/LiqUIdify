/**
 * ClassName utility for combining CSS classes
 *
 * Provides a robust utility for combining CSS classes with proper handling of
 * conditional classes, arrays, and objects.
 */

import { type ClassValue, clsx } from "clsx";

/**
 * Combines multiple class values into a single string
 *
 * @param inputs - Array of class values (strings, objects, arrays)
 * @returns Combined class string
 *
 * @example
 * cn('base-class', { 'active': isActive }, ['additional', 'classes'])
 */
export function cn(...inputs: Array<ClassValue>): string {
 return clsx(inputs);
}

/**
 * Creates a conditional className utility with predefined variants
 *
 * @param base - Base class string
 * @param variants - Object of variant classes
 * @returns Function that applies variants based on props
 */
function _createVariantClass<T extends Record<string, string>>(
 base: string,
 variants: T,
) {
 return (props: Partial<Record<keyof T, boolean>>): string => {
 const variantClasses = Object.entries(variants)
 .filter(([key]) => props[key as keyof T])
 .map(([, value]) => value);

 return cn(base, ...variantClasses);
 };
}

/**
 * Creates a size-based className utility
 *
 * @param sizeMap - Object mapping size keys to class strings
 * @returns Function that returns class based on size prop
 */
function _createSizeClass<T extends Record<string, string>>(sizeMap: T) {
 return (size: keyof T): string => sizeMap[size] || "";
}

/**
 * Surface effect class utilities
 * Provides neutral surface classes for consistent styling
 */
export const SURFACE_CLASSES = {
  default: "bg-white border border-blue-200 shadow-sm",
  elevated: "bg-white border border-blue-300 shadow-md",
  floating: "bg-white border border-blue-300 shadow-lg",
  overlay: "bg-white border border-blue-400 shadow-xl",
  hover: "hover:shadow-md transition-shadow duration-200",
  active: "active:scale-[0.98] transition-transform duration-100",
  pressed: "scale-[0.98] bg-blue-50",
  interactive: "cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
} as const;

/**
 * Get surface effect classes
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
 * Focus ring utility for accessibility
 * Provides consistent focus ring styling across components
 */
export function focusRing(visible = true): string {
 if (!visible) {
 return "";
 }

 return cn(
 "focus:outline-none",
 "focus:ring-2",
 "focus:ring-blue-500",
 "focus:ring-opacity-50",
 "focus:ring-offset-2",
 "focus:ring-offset-white",
 );
}

/**
 * Micro-interaction utility
 * Provides subtle interaction feedback
 */
function createMicroInteraction(
 type: "hover" | "active" | "focus" = "hover",
): string {
 const interactions = {
 hover: "hover:scale-[1.02] hover:shadow-lg transition-all duration-200",
 active: "active:scale-[0.98] transition-all duration-100",
 focus: "focus:scale-[1.01] focus:shadow-md transition-all duration-150",
 };

 return interactions[type];
}

// Create microInteraction object with both function and properties
export const microInteraction = Object.assign(createMicroInteraction, {
 gentle: createMicroInteraction("hover"),
 interactive: "hover:scale-[1.02] hover:shadow-lg transition-all duration-200",
 smooth: "hover:scale-[1.01] transition-all duration-150",
});

/**
 * Animation duration utilities
 */
const ANIMATION_DURATIONS = {
 fast: "duration-150",
 normal: "duration-300",
 slow: "duration-500",
} as const;

function _animationDuration(
 speed: keyof typeof ANIMATION_DURATIONS = "normal",
): string {
 return ANIMATION_DURATIONS[speed];
}
