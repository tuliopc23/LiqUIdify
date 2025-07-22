/**
 * Optimized Core Bundle - Essential Components Only (<15KB)
 *
 * This bundle contains only the most fundamental components and utilities
 * required for basic Glass UI functionality, with physics/animations
 * moved to separate bundles.
 */

// Core utilities (minimal)
export { cn } from "@/core/utils/classname";
// Essential form components (minimal footprint)
export { GlassButton } from "../components/glass-button-refactored";
export { GlassCard } from "../components/glass-card-refactored";
export { GlassErrorBoundary } from "../components/glass-error-boundary";
export { GlassInput } from "../components/glass-input";
// Core providers (essential only)
export { ThemeProvider } from "../components/theme-provider";
export { useIsClient, useSSRSafeWindow } from "../hooks/use-ssr-safe";
// Essential hooks (tree-shakeable)
export { useTheme } from "../hooks/use-theme";

// Base types
export type {
	GlassButtonProps,
	GlassCardProps,
	GlassInputProps,
} from "../types";
