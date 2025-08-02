/**
 * ClassName utility for combining CSS classes
 *
 * Provides a robust utility for combining CSS classes with proper handling of
 * conditional classes, arrays, and objects.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  return twMerge(clsx(inputs));
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
 * Glass effect class utilities
 * Provides predefined glass effect classes for consistent styling
 */
export const GLASS_CLASSES = {
  default:
    "glass-effect backdrop-blur-glass saturate-[180%] bg-glass-light-primary border border-border-glass-light",
  elevated:
    "glass-effect backdrop-blur-glass-heavy saturate-[200%] bg-glass-light-elevated border border-border-glass-light-medium shadow-glass-sm",
  floating:
    "glass-effect backdrop-blur-glass-heavy saturate-[180%] bg-glass-light-floating border border-border-glass-light-medium shadow-glass-md",
  overlay:
    "glass-effect backdrop-blur-glass-ultra saturate-[200%] bg-glass-light-overlay border border-border-glass-light-strong shadow-glass-lg",
  hover:
    "hover:backdrop-blur-glass-heavy hover:saturate-[190%] hover:bg-glass-light-hover hover:border-border-glass-light-hover transition-all duration-glass",
  active:
    "active:backdrop-blur-glass active:saturate-[170%] active:bg-glass-light-active active:scale-[0.98] transition-all duration-glass-fast",
  pressed:
    "glass-effect backdrop-blur-glass saturate-[160%] bg-glass-light-pressed scale-[0.98]",
  interactive:
    "glass-effect cursor-pointer transition-all duration-glass hover:scale-[1.02] active:scale-[0.98]",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
} as const;

/**
 * Get glass effect classes
 *
 * @param variant - The glass variant to apply
 * @returns The corresponding glass classes
 */
export function getGlassClass(
  variant: keyof typeof GLASS_CLASSES = "default",
): string {
  return GLASS_CLASSES[variant] || GLASS_CLASSES.default;
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
  glass: "duration-300",
  "glass-fast": "duration-150",
} as const;

function _animationDuration(
  speed: keyof typeof ANIMATION_DURATIONS = "normal",
): string {
  return ANIMATION_DURATIONS[speed];
}
