/**
 * Core Components Module
 *
 * This module exports all the core components used throughout the LiquidUI component library.
 * These components provide the foundational building blocks for the library.
 */

// Re-export components from other core modules
export { SSRErrorBoundary as ErrorBoundary } from "../error-recovery";
export { gracefulDegradation as GracefulDegradation } from "../graceful-degradation";
// export { CompoundComponent } from '../compound-component';

// Placeholder exports for components that may be implemented later
export const GlassContainer = () => undefined;
export const GlassCard = () => undefined;
export const GlassButton = () => undefined;
export const GlassInput = () => undefined;
export const GlassModal = () => undefined;

// Base component utilities
export {
	createGlassPolymorphicComponent,
	createPolymorphicComponent,
} from "../create-polymorphic-component";

// Types for component development
export type {
	ComponentSize,
	ComponentState,
	ComponentVariant,
	GlassConfig,
	GlassIntensity,
	GlassVariant,
} from "../types";
