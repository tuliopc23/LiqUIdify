


// External dependencies
import type {
  GlassButtonProps,
  GlassCardProps,
  GlassInputProps,
  GlassTabsProps,
} from './types';

// Internal components
import { 
  AppleLiquidGlass,
  AppleLiquidGlassCard,
  AppleLiquidGlassButton,
  AppleLiquidGlassNav,
  type AppleLiquidGlassComponentProps,
} from './components/apple-liquid-glass';
import {
  DocumentationButton,
  DocumentationInput,
  DocumentationCard,
  DocumentationModal,
  DocumentationTooltip,
  DocumentationTabs,
} from './documentation';
import {
  GlassFeatureShowcase,
  type GlassFeatureShowcaseProps,
  type FeatureItem,
} from './components/glass-feature-showcase';
import {
  GlassFloatingAction,
  type GlassFloatingActionProps,
  type FloatingAction,
} from './components/glass-floating-action';
import { GlassFooter, type GlassFooterProps } from './components/glass-footer';
import { GlassHeader, type GlassHeaderProps } from './components/glass-header';
import { GlassHero, type GlassHeroProps } from './components/glass-hero';
import {
  LiquidGlassSvgFilters,
  type LiquidGlassSvgFiltersProps,
} from './components/liquid-glass-svg-filters';
import { ThemeProvider } from './components/theme-provider';
import { useTheme } from './hooks/use-theme';
import { useToast, toast } from './hooks/use-toast';
import {
  useIsClient,
  useSSRSafeWindow,
  useSSRSafeLocalStorage,
  useSSRSafeSessionStorage,
  useSSRSafeMediaQuery,
  useSSRSafeDocument,
  useSSRSafeNavigator,
  useSSRSafeAnimation,
  useSSRSafeDocumentVisibility,
  useSSRSafeFeatureDetection,
  useSSRSafeIntersectionObserver,
  useSSRSafeResizeObserver,
  useHydrationSafe,
  useNetworkStatus
} from './hooks/use-ssr-safe';
import {
  useAppleLiquidGlass,
  getAppleLiquidGlassClass,
  createGlassLayers,
  APPLE_LIQUID_VARIANTS,
  APPLE_LIQUID_SHADOWS,
  APPLE_LIQUID_AFTER_EFFECTS,
  APPLE_LIQUID_ANIMATIONS,
  type AppleLiquidGlassOptions,
  type AppleLiquidGlassProps,
} from './lib/apple-liquid-glass';
import {
  useEnhancedAppleLiquidGlass,
  getEnhancedGlassClass,
  createEnhancedGlassLayers,
  ENHANCED_GLASS_VARIANTS,
  ENHANCED_GLASS_LAYERS,
  PIXEL_PERFECT_CONFIG,
  APPLE_HIG_COMPLIANCE,
  type EnhancedGlassOptions,
  type EnhancedGlassLayer,
  type PixelPerfectConfig,
  type AppleHIGCompliance,
} from './lib/enhanced-apple-liquid-glass';
import {
  isServer,
  isClient,
  safeWindow,
  safeDocument,
  safeRequestAnimationFrame,
  safeCancelAnimationFrame
} from './utils/ssr-utils';

// Consolidated exports
export {
  // Components - Glass UI Library
  // Apple HIG-compliant Components
  AppleLiquidGlass,
  AppleLiquidGlassCard,
  AppleLiquidGlassButton,
  AppleLiquidGlassNav,
  type AppleLiquidGlassComponentProps,
  
  // Theme System
  ThemeProvider,
  
  // Website Building Components
  GlassHero, type GlassHeroProps,
  GlassHeader, type GlassHeaderProps,
  GlassFooter, type GlassFooterProps,
  GlassFeatureShowcase,
  type GlassFeatureShowcaseProps,
  type FeatureItem,
  GlassFloatingAction,
  type GlassFloatingActionProps,
  type FloatingAction,
  
  // SVG Filters
  LiquidGlassSvgFilters,
  type LiquidGlassSvgFiltersProps,
  
  // Hooks
  useTheme,
  useToast, toast,
  useIsClient,
  useSSRSafeWindow,
  useSSRSafeLocalStorage as useLocalStorage,
  useSSRSafeSessionStorage as useSessionStorage,
  useSSRSafeMediaQuery as useMediaQuery,
  useSSRSafeDocument,
  useSSRSafeNavigator,
  useSSRSafeAnimation as useAnimationFrame,
  useSSRSafeDocumentVisibility,
  useSSRSafeFeatureDetection,
  useSSRSafeIntersectionObserver,
  useSSRSafeResizeObserver,
  useHydrationSafe,
  useNetworkStatus,
  
  // Apple HIG utilities
  useAppleLiquidGlass,
  getAppleLiquidGlassClass,
  createGlassLayers,
  APPLE_LIQUID_VARIANTS,
  APPLE_LIQUID_SHADOWS,
  APPLE_LIQUID_AFTER_EFFECTS,
  APPLE_LIQUID_ANIMATIONS,
  type AppleLiquidGlassOptions,
  type AppleLiquidGlassProps,
  
  // Enhanced Apple Liquid Glass System
  useEnhancedAppleLiquidGlass,
  getEnhancedGlassClass,
  createEnhancedGlassLayers,
  ENHANCED_GLASS_VARIANTS,
  ENHANCED_GLASS_LAYERS,
  PIXEL_PERFECT_CONFIG,
  APPLE_HIG_COMPLIANCE,
  type EnhancedGlassOptions,
  type EnhancedGlassLayer,
  type PixelPerfectConfig,
  type AppleHIGCompliance,
  
  // SSR Utilities
  isServer,
  isClient,
  safeWindow,
  safeDocument,
  safeRequestAnimationFrame,
  safeCancelAnimationFrame,
  
  // Pre-wrapped components for documentation
  DocumentationButton,
  DocumentationInput,
  DocumentationCard,
  DocumentationModal,
  DocumentationTooltip,
  DocumentationTabs,
  
  // Types
  type GlassButtonProps,
  type GlassCardProps,
  type GlassInputProps,
  type GlassTabsProps,
};

// Re-export all other components, hooks, and utilities
export * from './components/glass-accordion';
export * from './components/glass-avatar';
export * from './components/glass-badge';
export * from './components/glass-breadcrumbs';
export * from './components/glass-button';
export * from './components/glass-card';
export * from './components/glass-chart';
export * from './components/glass-checkbox';
export * from './components/glass-checkbox-group';
export * from './components/glass-command';
export * from './components/glass-combobox';
export * from './components/glass-date-picker';
export * from './components/glass-drawer';
export * from './components/glass-dropdown';
export * from './components/glass-error-boundary';
export * from './components/glass-file-upload';
export * from './components/glass-focus-trap';
export * from './components/glass-form-field';
export * from './components/glass-input';
export * from './components/glass-live-region';
export * from './components/glass-loading';
export * from './components/glass-mobile-nav';
export * from './components/glass-modal';
export * from './components/glass-notification';
export * from './components/glass-number-input';
export * from './components/glass-pagination';
export * from './components/glass-popover';
export * from './components/glass-portal';
export * from './components/glass-progress';
export * from './components/glass-radio-group';
export * from './components/glass-responsive-button';
export * from './components/glass-responsive-card';
export * from './components/glass-search';
export * from './components/glass-select';
export * from './components/glass-skeleton';
export * from './components/glass-slider';
export * from './components/glass-spinner';
export * from './components/glass-switch';
export * from './components/glass-table';
export * from './components/glass-tabs';
export * from './components/glass-textarea';
export * from './components/glass-toast';
export * from './components/glass-tooltip';
export * from './components/glass-visually-hidden';
export * from './components/component-showcase';
export * from './components/navbar';
export * from './components/sidebar';
export * from './components/theme-toggle';
export * from './hooks/use-haptic-feedback';
export * from './hooks/use-liquid-glass';
export * from './hooks/use-mobile';
export * from './hooks/use-performance-monitoring';
export * from './lib/glass-physics';
export * from './lib/glass-utils';
export * from './lib/liquid-glass-tokens';
export * from './providers';
export * from './utils/contrast-checker';
