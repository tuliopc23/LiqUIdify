/**
 * Core Bundle - Essential Components (<15KB)
 * Contains the most commonly used components with basic glass effects
 */

// External dependencies (none)

// Internal imports sorted alphabetically by type
// Component imports
export * from "../components/glass-button-refactored";
export * from "../components/glass-card-refactored";
export * from "../components/glass-error-boundary";
export * from "../components/glass-focus-trap";
export * from "../components/glass-input";
export * from "../components/glass-visually-hidden";

// Provider imports

export * from "../providers/config-provider";

export * from "../providers/glass-ui-provider";

// Utility imports
import { cn } from "../core/utils/classname";
import {
	useHydrationSafe,
	useIsClient,
	useNetworkStatus,
	useSSRSafeAnimation,
	useSSRSafeDocument,
	useSSRSafeLocalStorage,
	useSSRSafeMediaQuery,
	useSSRSafeNavigator,
	useSSRSafeSessionStorage,
	useSSRSafeWindow,
} from "../hooks/use-ssr-safe";
import { glassVariants } from "../lib/variant-system";

// Type imports
import type {
	GlassButtonProps,
	GlassCardProps,
	GlassInputProps,
} from "../types";

// Utility exports
export {
	cn,
	glassVariants,
	// SSR-safe utilities
	useIsClient,
	useSSRSafeWindow,
	useSSRSafeDocument,
	useSSRSafeNavigator,
	useSSRSafeLocalStorage,
	useSSRSafeSessionStorage,
	useHydrationSafe,
	useSSRSafeMediaQuery,
	useNetworkStatus,
	useSSRSafeAnimation,
};

// Type exports
export type { GlassButtonProps, GlassCardProps, GlassInputProps };
