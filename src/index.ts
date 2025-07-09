// Components - Glass UI Library

// Apple HIG-compliant Components
export {
  AppleLiquidGlass,
  AppleLiquidGlassCard,
  AppleLiquidGlassButton,
  AppleLiquidGlassNav,
  type AppleLiquidGlassComponentProps,
} from './components/apple-liquid-glass';

// Form Components
export * from './components/glass-button';
export * from './components/glass-input';
export * from './components/glass-textarea';
export * from './components/glass-checkbox';
export * from './components/glass-switch';
export * from './components/glass-slider';
export * from './components/glass-select';
export * from './components/glass-search';
export * from './components/glass-file-upload';
export * from './components/glass-form-field';
export * from './components/glass-radio-group';
export * from './components/glass-checkbox-group';
export * from './components/glass-number-input';
export * from './components/glass-date-picker';
export * from './components/glass-combobox';

// Layout Components
export * from './components/glass-card';
export * from './components/glass-modal';
export * from './components/glass-tabs';
export * from './components/glass-table';
export * from './components/glass-accordion';
export * from './components/glass-drawer';
export * from './components/glass-popover';
export * from './components/glass-portal';
export * from './components/glass-visually-hidden';
export * from './components/glass-responsive-button';
export * from './components/glass-responsive-card';

// Navigation Components
export * from './components/glass-dropdown';
export * from './components/glass-breadcrumbs';
export * from './components/glass-pagination';
export * from './components/glass-mobile-nav';
export * from './components/navbar';
export * from './components/sidebar';

// Feedback Components
export * from './components/glass-avatar';
export * from './components/glass-badge';
export * from './components/glass-progress';
export * from './components/glass-loading';
export * from './components/glass-tooltip';
export * from './components/glass-toast';
export * from './components/glass-notification';
export * from './components/glass-skeleton';
export * from './components/glass-spinner';

// Advanced Components
export * from './components/glass-command';
export * from './components/glass-chart';

// Theme System
export { ThemeProvider } from './components/theme-provider';
export * from './components/theme-toggle';

// Showcase Components
export * from './components/component-showcase';

// Website Building Components
export { GlassHero, type GlassHeroProps } from './components/glass-hero';
export { GlassHeader, type GlassHeaderProps } from './components/glass-header';
export { GlassFooter, type GlassFooterProps } from './components/glass-footer';
export {
  GlassFeatureShowcase,
  type GlassFeatureShowcaseProps,
  type FeatureItem,
} from './components/glass-feature-showcase';
export {
  GlassFloatingAction,
  type GlassFloatingActionProps,
  type FloatingAction,
} from './components/glass-floating-action';

// SVG Filters
export {
  LiquidGlassSvgFilters,
  type LiquidGlassSvgFiltersProps,
} from './components/liquid-glass-svg-filters';

// Hooks
export * from './hooks/use-liquid-glass';
export * from './hooks/use-mobile';
export * from './hooks/use-performance-monitor';
export * from './hooks/use-haptic-feedback';
export { useTheme } from './hooks/use-theme';
export { useToast, toast } from './hooks/use-toast';

// Utilities
export * from './lib/glass-physics';
export * from './lib/glass-utils';
export * from './lib/liquid-glass-tokens';

// Apple HIG utilities
export {
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

// Testing utilities
export * from './utils/accessibility-testing';

// Types
export type {
  GlassButtonProps,
  GlassCardProps,
  GlassInputProps,
  GlassTabsProps,
  AccessibilityCheckResult,
  AccessibilityIssue,
} from './types';
