/**
 * Unified Glass System - Main Export
 *
 * This module provides the unified glass effect system that consolidates
 * all legacy glass implementations into a single, modern API.
 */

export type {
  GlassAnimation,
  GlassEffectConfig,
  GlassIntensity,
  GlassVariant,
  UnifiedGlassProps,
} from "./unified-glass-system";
// Default export
export {
  AppleLiquidGlass,
  createGlassEffect,
  default,
  EnhancedAppleLiquidGlass,
  useUnifiedGlass,
} from "./unified-glass-system";
