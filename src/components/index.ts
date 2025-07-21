/**
 * Glass Components Library - Main Export File
 * Clean exports for production-ready components
 */

// Core Glass Components - Working and tested
export { GlassButton, type GlassButtonProps } from './glass-button-refactored';
export { GlassCard, type GlassCardProps } from './glass-card-refactored';
export { GlassInput, type GlassInputProps } from './glass-input';
export { GlassModal, type GlassModalProps } from './glass-modal';
export { GlassTabs, type GlassTabsProps } from './glass-tabs';
export { GlassTooltip, type GlassTooltipProps } from './glass-tooltip';

// Apple Liquid Glass Components - Enhanced with multi-layer structure
export {
  AppleLiquidGlass,
  AppleLiquidGlassCard,
  AppleLiquidGlassButton,
  AppleLiquidGlassNav,
  type AppleLiquidGlassComponentProps,
} from './apple-liquid-glass';

export {
  LiquidGlassSvgFilters,
  type LiquidGlassSvgFiltersProps,
} from './liquid-glass-svg-filters';

// Enhanced Apple Liquid Glass Components - Pixel-Perfect Multi-Layer System
export {
  EnhancedAppleLiquidGlass,
  EnhancedAppleLiquidGlassCard,
  EnhancedAppleLiquidGlassButton,
  EnhancedAppleLiquidGlassNav,
  EnhancedAppleLiquidGlassModal,
  EnhancedAppleLiquidGlassShowcase,
  type EnhancedAppleLiquidGlassProps,
} from './enhanced-apple-liquid-glass';

// Showcase and Demo Components
export { ComponentShowcase } from './component-showcase';
export { GlassHero, type GlassHeroProps } from './glass-hero';

// Utility Components
export { ClientOnly } from './client-only';
export { SSRPortal } from './ssr-portal';
export { SSRSafeWrapper } from './ssr-safe-wrapper';

// Theme and Provider Components
export { ThemeProvider } from './theme-provider';
// Core Utilities - Re-export from core
export { cn } from '@/core/utils/classname';
export { focusRing } from '@/core/utils/focus';
export { microInteraction } from '@/core/utils/classname';
export { responsiveSize, touchTarget } from '@/core/utils/responsive';

// SSR Utilities
export {
  isClient,
  isServer,
  safeWindow,
  safeDocument,
} from '@/utils/ssr-utils';

// Type Exports - Essential types for component usage
export type {
  GlassVariantProps,
  ButtonVariantProps,
  CardVariantProps,
  InputVariantProps,
} from '@/lib/variant-system';

export type { ComponentSize } from '@/types/branded';

export type {
  BaseGlassProps,
  InteractiveGlassProps,
  UnifiedGlassProps,
} from '@/core/base-component';
// Additional working components (when they exist)
// Note: Only export components that actually exist and work
// export { GlassFooter, type GlassFooterProps } from './glass-footer';

// End of exports - Clean and minimal for production readiness
