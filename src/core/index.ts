/**
 * Glass UI Core System
 * 
 * This module exports the core components and utilities for the Glass UI library's
 * refactored architecture. It provides a unified base component system, centralized
 * glass effects, reusable animation hooks, and compound component patterns.
 */

// Base component system
export * from './base-component';

// Glass effects system
export * from './glass-effects';
export * from './glass/GlassEffectSystem';

// Compound component utilities
export * from './compound-component';

// Business logic separation
export * from './business-logic';

// Accessibility management
export { AccessibilityManager, accessibilityManager } from './accessibility-manager';
export type {
  AccessibilityReport,
  ContrastResult,
  FocusOptions,
  ARIAValidation,
  Violation,
  Warning,
  Suggestion
} from './accessibility-manager';

// Focus management
export {
  useRovingTabindex,
  RovingTabindexGroup,
  useGridRovingTabindex
} from './roving-tabindex';
export type {
  RovingTabindexOptions,
  RovingTabindexReturn,
  RovingTabindexGroupProps,
  GridRovingTabindexOptions
} from './roving-tabindex';

// Performance monitoring
export { performanceMonitor } from './performance-monitor';
export type {
  MetricName,
  PerformanceRating,
  PerformanceMetric,
  ComponentMetric,
  PerformanceReport
} from './performance-monitor';

// CSS Optimization
export { cssOptimization } from './css-optimization';
export type {
  CriticalCSSOptions,
  CSSUsageStats
} from './css-optimization';

// Error Recovery System
export { errorRecovery } from './error-recovery';
export type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  ErrorContext,
  CircuitBreakerOptions,
  HydrationMismatchOptions,
  RetryStrategy
} from './error-recovery';

// SSR Safety
export {
  ssrSafety,
  SSRSafe,
  ClientOnly,
  ProgressiveEnhancement,
  useHydrationSafe,
  useSSRSafeLocalStorage,
  useNetworkStatus
} from './ssr-safety';
export type {
  SSRSafetyOptions,
  HydrationMismatch,
  ProgressiveEnhancementOptions
} from './ssr-safety';

// Graceful Degradation
export { gracefulDegradation } from './graceful-degradation';
export type {
  DegradationStrategy,
  AnimationFallbackOptions,
  NetworkFallbackOptions
} from './graceful-degradation';

// Animation Choreography
export { animations, animationChoreographer } from './animation-choreographer';
export type {
  AnimationSequenceOptions,
  AnimationStep,
  SpringOptions,
  MagneticOptions
} from './animation-choreographer';

// Animation hooks
export * from '../hooks/use-glass-animations';

// Essential components only
export { GlassButton } from '../components/glass-button';
export { GlassCard } from '../components/glass-card';
export { GlassInput } from '../components/glass-input';
export { GlassModal } from '../components/glass-modal';
export { GlassTooltip } from '../components/glass-tooltip';

// Core providers
export { ThemeProvider } from '../components/theme-provider';
export { GlassErrorBoundary } from '../components/glass-error-boundary';

// Essential hooks
export { useTheme } from '../hooks/use-theme';
export { useIsClient, useSSRSafeWindow } from '../hooks/use-ssr-safe';

// Core utilities
export { cn } from '../lib/glass-utils';

// Core component creation utilities
export {
  createCompoundComponent,
  createCompoundComponentWithContext,
  createPolymorphicCompoundComponent,
  createAccessibleCompoundComponent,
  createResponsiveCompoundComponent,
  createCompoundComponentCollection,
  withGlassEffects,
} from './compound-component';

// Glass effects utilities
export {
  generateGlassClasses,
  generateGlassVariables,
  createGlassConfig,
  useGlassEffects,
  glassEffectsManager,
} from './glass-effects';

// Animation utilities
export {
  useGlassAnimation,
  useGlassStateTransitions,
  useMagneticHover,
  useRippleEffect,
  useSpringAnimation,
  useLiquidFlow,
  TIMING_PRESETS,
  GLASS_ANIMATION_PRESETS,
} from '../hooks/use-glass-animations';

export {
  usePerformanceMonitoring,
  withPerformanceMonitoring,
  useWebVitals,
  useRealtimePerformance
} from '../hooks/use-performance-monitoring';

// Business logic utilities
export {
  createBusinessLogicHook,
  createReducerBusinessLogic,
  createFormBusinessLogic,
  createTableBusinessLogic,
  createModalBusinessLogic,
  createAsyncDataBusinessLogic,
  createEventHandlers,
} from './business-logic';

// Enhanced TypeScript types
export * from '../types/enhanced-types';

// Visual Regression Testing
export { visualTesting } from '../testing/visual-regression';
export type {
  VisualTestOptions,
  VisualTestResult,
  AnimationFrameTestOptions,
  AnimationFrameTestResult
} from '../testing/visual-regression';

// Quality Assurance
export { sTierValidator } from '../quality-assurance/s-tier-validation';
export type {
  ValidationChecklist,
  ValidationResult
} from '../quality-assurance/s-tier-validation';

// Component constants
export const COMPONENT_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export const COMPONENT_VARIANTS = ['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'apple'] as const;
export const GLASS_INTENSITIES = ['subtle', 'medium', 'strong'] as const;
export const ANIMATION_TIMINGS = ['instant', 'fast', 'normal', 'slow', 'slower'] as const;

// Default configurations
export const DEFAULT_GLASS_CONFIG = {
  intensity: 'medium' as const,
  blur: true,
  saturation: true,
  backdrop: true,
  borders: true,
  shadows: true,
};

export const DEFAULT_ANIMATION_CONFIG = {
  timing: 'normal' as const,
  disableAnimations: false,
};

export const DEFAULT_COMPONENT_CONFIG = {
  size: 'md' as const,
  variant: 'primary' as const,
  hover: true,
  focus: true,
  active: true,
  ...DEFAULT_GLASS_CONFIG,
  ...DEFAULT_ANIMATION_CONFIG,
};

// Component factories with defaults
export const createGlassComponent = <T extends HTMLElement, P = {}>(
  options: Parameters<typeof createCompoundComponent<T, P>>[0]
) => {
  return createCompoundComponent<T, P>({
    ...options,
    defaultProps: {
      ...DEFAULT_COMPONENT_CONFIG,
      ...options.defaultProps,
    },
  });
};

export const createGlassComponentWithContext = <
  T extends HTMLElement,
  P = {},
  C extends Record<string, any> = {}
>(
  options: Parameters<typeof createCompoundComponentWithContext<T, P, C>>[0]
) => {
  return createCompoundComponentWithContext<T, P, C>({
    ...options,
    defaultProps: {
      ...DEFAULT_COMPONENT_CONFIG,
      ...options.defaultProps,
    },
  });
};

// Types
export type {
  GlassButtonProps,
  GlassCardProps,
  GlassInputProps,
  GlassModalProps,
  GlassTooltipProps,
} from '../types';

// Type utilities for external use
export type {
  // Base component types
  ComponentSize,
  ComponentVariant,
  GlassIntensity,
  AnimationTiming,
  GlassEffectConfig,
  BaseGlassProps,
  InteractiveGlassProps,
  LayoutGlassProps,
  FormGlassProps,
  UnifiedGlassProps,
  ComponentRef,
  GlassComponent,
  CompoundGlassComponent,
  ClickHandler,
  KeyHandler,
  FocusHandler,
  ChangeHandler,

  // Glass effects types
  GlassEffectType,
  GlassEffectState,
  GlassEffectAnimation,
  GlassEffectOptions,

  // Animation types
  AnimationState,
  AnimationConfig,

  // Business logic types
  BusinessLogicHook,
  StateManager,
  Action,
  Reducer,
  EventHandlerFactory,
  FormState,
  FormActions,
  TableState,
  TableActions,
  ModalState,
  ModalActions,
  AsyncDataState,
  AsyncDataActions,

  // Compound component types
  CompoundComponentContext,
  CompoundComponentOptions,
  ComponentPropsBuilder,
} from './base-component';

// Validation utilities
export const validateSize = (size: string): size is ComponentSize => {
  return COMPONENT_SIZES.includes(size as ComponentSize);
};

export const validateVariant = (variant: string): variant is ComponentVariant => {
  return COMPONENT_VARIANTS.includes(variant as ComponentVariant);
};

export const validateIntensity = (intensity: string): intensity is GlassIntensity => {
  return GLASS_INTENSITIES.includes(intensity as GlassIntensity);
};

export const validateAnimationTiming = (timing: string): timing is AnimationTiming => {
  return ANIMATION_TIMINGS.includes(timing as AnimationTiming);
};

// Error classes for better error handling
export class GlassUIError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'GlassUIError';
  }
}

export class ComponentError extends GlassUIError {
  constructor(componentName: string, message: string) {
    super(`${componentName}: ${message}`);
    this.name = 'ComponentError';
  }
}

export class AnimationError extends GlassUIError {
  constructor(message: string) {
    super(`Animation: ${message}`);
    this.name = 'AnimationError';
  }
}

// Development utilities
export const isDevelopment = process.env.NODE_ENV === 'development';

export const debugLog = (message: string, ...args: any[]) => {
  if (isDevelopment) {
    console.log(`[Glass UI] ${message}`, ...args);
  }
};

export const warningLog = (message: string, ...args: any[]) => {
  if (isDevelopment) {
    console.warn(`[Glass UI Warning] ${message}`, ...args);
  }
};

export const errorLog = (message: string, ...args: any[]) => {
  if (isDevelopment) {
    console.error(`[Glass UI Error] ${message}`, ...args);
  }
};
