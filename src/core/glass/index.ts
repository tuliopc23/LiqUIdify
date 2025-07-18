/**
 * Unified Glass System - Main Export
 * 
 * This module provides the unified glass effect system that consolidates
 * all legacy glass implementations into a single, modern API.
 */

export {
  useUnifiedGlass,
  createGlassEffect,
  AppleLiquidGlass,
  EnhancedAppleLiquidGlass,
} from './unified-glass-system';

export type {
  GlassIntensity,
  GlassVariant,
  GlassAnimation,
  GlassEffectConfig,
  UnifiedGlassProps,
} from './unified-glass-system';

// Default export
export { default } from './unified-glass-system';