/**
 * Core Components Module
 *
 * This module exports all the core components used throughout the LiquidUI component library.
 * These components provide the foundational building blocks for the library.
 */

// Re-export components from other core modules
export { SSRErrorBoundary as ErrorBoundary } from '../error-recovery';
export { gracefulDegradation as GracefulDegradation } from '../graceful-degradation';
// export { CompoundComponent } from '../compound-component';

// Placeholder exports for components that may be implemented later
export const GlassContainer = () => null;
export const GlassCard = () => null;
export const GlassButton = () => null;
export const GlassInput = () => null;
export const GlassModal = () => null;

// Base component utilities
export { createPolymorphicComponent, createGlassPolymorphicComponent } from '../create-polymorphic-component';

// Types for component development
export type {
  ComponentSize,
  ComponentVariant,
  GlassIntensity,
  GlassVariant,
  GlassConfig,
  ComponentState,
} from '../types';
