/**
 * Core Architecture Module
 * 
 * This module provides the foundational architecture for the LiquidUI component library.
 * It includes shared utilities, hooks, types, and base components that ensure consistency
 * across all components while maintaining modularity and scalability.
 */

// Export base component types and interfaces
export * from './base-component';

// Export all core utilities
export * from './utils';
export * from './hooks';
export * from './types';
export * from './components';
export * from './constants';
export * from './patterns';

// Re-export commonly used utilities for convenience
export { cn } from './utils/classname';
export { generateGlassClasses, generateGlassVariables, mapIntensity } from './utils/glass-effects';
export { responsiveSize, touchTarget, microInteraction } from './utils/responsive';
export { useGlassStateTransitions, useMagneticHover, useRippleEffect } from './hooks';
export { createBusinessLogicHook, createCompoundComponentWithContext } from './patterns';
