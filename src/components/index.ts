/**
 * Glass Components Library - Main Export File
 * Clean exports for production-ready components
 */

export type {
	BaseGlassProps,
	InteractiveGlassProps,
	UnifiedGlassProps,
} from "@/core/base-component";
// Core Utilities - Re-export from core
export { cn, microInteraction } from "@/core/utils/classname";
export { focusRing } from "@/core/utils/focus";
export { responsiveSize, touchTarget } from "@/core/utils/responsive";
// Type Exports - Essential types for component usage
export type {
	ButtonVariantProps,
	CardVariantProps,
	GlassVariantProps,
	InputVariantProps,
} from "@/lib/variant-system";
export type { ComponentSize } from "@/types/branded";
// SSR Utilities
export {
	isClient,
	isServer,
	safeDocument,
	safeWindow,
} from "@/utils/ssr-utils";
// Apple Liquid Glass Components - Enhanced with multi-layer structure
export {
	AppleLiquidGlass,
	AppleLiquidGlassButton,
	AppleLiquidGlassCard,
	type AppleLiquidGlassComponentProps,
	AppleLiquidGlassNav,
} from "./apple-liquid-glass";
// Utility Components
export { ClientOnly } from "./client-only";
// Showcase and Demo Components
export { ComponentShowcase } from "./component-showcase";
// Enhanced Apple Liquid Glass Components - Pixel-Perfect Multi-Layer System
export {
	EnhancedAppleLiquidGlass,
	EnhancedAppleLiquidGlassButton,
	EnhancedAppleLiquidGlassCard,
	EnhancedAppleLiquidGlassModal,
	EnhancedAppleLiquidGlassNav,
	type EnhancedAppleLiquidGlassProps,
	EnhancedAppleLiquidGlassShowcase,
} from "./enhanced-apple-liquid-glass";
// Core Glass Components - Working and tested
export { GlassButton, type GlassButtonProps } from "./glass-button-refactored";
export { GlassCard, type GlassCardProps } from "./glass-card-refactored";
export { GlassHero, type GlassHeroProps } from "./glass-hero";
export { GlassInput, type GlassInputProps } from "./glass-input";
export { GlassModal, type GlassModalProps } from "./glass-modal";
export { GlassTabs, type GlassTabsProps } from "./glass-tabs";
export { GlassTooltip, type GlassTooltipProps } from "./glass-tooltip";
export {
	LiquidGlassSvgFilters,
	type LiquidGlassSvgFiltersProps,
} from "./liquid-glass-svg-filters";
export { SSRPortal } from "./ssr-portal";
export { SSRSafeWrapper } from "./ssr-safe-wrapper";
// Theme and Provider Components
export { ThemeProvider } from "./theme-provider";
// Additional working components (when they exist)
// Note: Only export components that actually exist and work
// export { GlassFooter, type GlassFooterProps } from './glass-footer';

// End of exports - Clean and minimal for production readiness
