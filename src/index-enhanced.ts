/**
 * Enhanced LiqUIdify Index
 * Comprehensive export of all enhanced components, utilities, and systems
 */

import React from 'react';

// Selective exports to avoid conflicts
export {
  // SSR Safety
  isServer,
  isClient,
  isBrowser,
  useHydrated,
  useClientOnly,
  useHydrationSafety,
  withSSRSafety,
  useProgressiveEnhancement,
} from './core/ssr-safety';

export {
  // Performance Monitoring
  usePerformanceMonitor,
  useFPSMonitor,
  useMemoryMonitor,
  withPerformanceMonitor,
  PerformanceReport,
  performanceMonitor,
  PERFORMANCE_THRESHOLDS,
} from './core/performance-monitor';

export {
  // CSS Optimization
  useCSSOptimizer,
  CriticalCSS,
  LazyStylesheet,
  CSSMetrics,
  cssOptimizer,
} from './core/css-optimizer';

export {
  // Design System
  unifiedDesignSystem,
  generateCSSVariables,
  getColor,
  typography as getTypography,
  spacing as getSpacing,
  getBorderRadius,
  getShadow,
} from './tokens/unified-design-system';

export {
  // Typography System
  GlassTypography,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Text,
  Label,
  Code,
} from './components/typography';

export {
  // Reduced Motion
  usePrefersReducedMotion,
  useReducedMotion,
  withReducedMotion,
  createAccessibleAnimation,
} from './hooks/use-reduced-motion';

export {
  // Testing Utilities
  customRender as render,
  customRenderHook as renderHook,
  measureComponentPerformance,
  testAccessibility,
  testKeyboardNavigation,
  testScreenReaderContent,
  captureVisualSnapshot,
  mockMatchMedia,
  mockIntersectionObserver,
  mockResizeObserver,
  generateTestUser,
  generateTestProps,
  toBeInViewport,
  toHaveAriaLabel,
} from './testing/test-utils';

// Re-export existing components
export * from './index';

// Enhanced component exports with performance monitoring and accessibility
import { withPerformanceMonitor } from './core/performance-monitor';
import { withReducedMotion } from './hooks/use-reduced-motion';
import { withSSRSafety } from './core/ssr-safety';

// Import existing components
import { GlassButton } from './components/glass-button-refactored';
import { GlassCard } from './components/glass-card-refactored';
import { GlassInput } from './components/glass-input';
import { GlassModal } from './components/glass-modal';

// Enhanced components with all optimizations
export const EnhancedGlassButton = withPerformanceMonitor(
  withReducedMotion(
    withSSRSafety(
      GlassButton,
      React.createElement('div', {}, 'Loading button...')
    ),
    { enableProgressiveEnhancement: true }
  ),
  'GlassButton'
);

export const EnhancedGlassCard = withPerformanceMonitor(
  withReducedMotion(
    withSSRSafety(GlassCard, React.createElement('div', {}, 'Loading card...')),
    { enableProgressiveEnhancement: true }
  ),
  'GlassCard'
);

export const EnhancedGlassInput = withPerformanceMonitor(
  withReducedMotion(
    withSSRSafety(
      GlassInput,
      React.createElement('div', {}, 'Loading input...')
    ),
    { enableProgressiveEnhancement: true }
  ),
  'GlassInput'
);

export const EnhancedGlassModal = withPerformanceMonitor(
  withReducedMotion(
    withSSRSafety(GlassModal, null), // No fallback for modal
    { enableProgressiveEnhancement: true, disableAnimations: false }
  ),
  'GlassModal'
);

// Utility functions for creating enhanced components
export const createEnhancedComponent = <P extends object>(
  Component: React.ComponentType<P>,
  options: {
    name?: string;
    fallback?: React.ReactNode;
    enablePerformanceMonitoring?: boolean;
    enableReducedMotion?: boolean;
    enableSSRSafety?: boolean;
    reducedMotionConfig?: any;
  } = {}
) => {
  const {
    name = Component.displayName || Component.name || 'Unknown',
    fallback = null,
    enablePerformanceMonitoring = true,
    enableReducedMotion = true,
    enableSSRSafety = true,
    reducedMotionConfig = { enableProgressiveEnhancement: true },
  } = options;

  let EnhancedComponent = Component;

  if (enableSSRSafety) {
    EnhancedComponent = withSSRSafety(EnhancedComponent, fallback);
  }

  if (enableReducedMotion) {
    EnhancedComponent = withReducedMotion(
      EnhancedComponent,
      reducedMotionConfig
    );
  }

  if (enablePerformanceMonitoring) {
    EnhancedComponent = withPerformanceMonitor(EnhancedComponent, name);
  }

  return EnhancedComponent;
};

// Bundle exports for different use cases
export const LiqUIdifyEnhanced = {
  // Enhanced Components
  EnhancedGlassButton,
  EnhancedGlassCard,
  EnhancedGlassInput,
  EnhancedGlassModal,
  createEnhancedComponent,
};

// Default export
export default LiqUIdifyEnhanced;
