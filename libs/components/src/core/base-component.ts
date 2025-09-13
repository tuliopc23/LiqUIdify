/**
 * Base Component System - Unified interfaces and types for all Glass UI components
 *
 * This module provides the foundational interfaces and types that all Glass UI components
 * share to ensure consistency and proper composition.
 */

import type { HTMLAttributes } from "react";

// Core component size variants
type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

// Core component variants
type ComponentVariant = "primary" | "secondary" | "tertiary" | "ghost" | "destructive" | "apple";

// Glass effect intensity levels
type GlassIntensity = "subtle" | "medium" | "strong";

// Animation timing presets
type AnimationTiming = "instant" | "fast" | "normal" | "slow" | "slower";

// Glass visual effects configuration
interface GlassEffectConfig {
  /** Glass effect intensity level */
  intensity?: GlassIntensity;
  /** Enable blur effect */
  blur?: boolean;
  /** Enable saturation effect */
  saturation?: boolean;
  /** Enable backdrop filter */
  backdrop?: boolean;
  /** Enable borders */
  borders?: boolean;
  /** Enable shadows */
  shadows?: boolean;
}

// Base props that all Glass components inherit
interface BaseGlassProps {
  /** Component size */
  size?: ComponentSize;
  /** Component variant */
  variant?: ComponentVariant;
  /** Glass effect configuration */
  glassEffect?: GlassEffectConfig;
  /** Enable hover effects */
  hover?: boolean;
  /** Enable focus effects */
  focus?: boolean;
  /** Enable active/pressed effects */
  active?: boolean;
  /** Animation timing */
  animation?: AnimationTiming;
  /** Disable all animations */
  disableAnimations?: boolean;
  /** Custom CSS class name */
  className?: string;
  /** Custom data attributes */
  "data-testid"?: string;
}

// Interactive component props
interface InteractiveGlassProps extends BaseGlassProps {
  /** Disable the component */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Enable magnetic hover effect */
  magnetic?: boolean;
  /** Enable haptic feedback */
  haptic?: boolean;
  /** Ripple effect on interaction */
  ripple?: boolean;
}

// Compound component props
interface CompoundComponentProps {
  /** Render as child element */
  asChild?: boolean;
  /** Component children */
  children?: React.ReactNode;
}

// Form component props
export interface FormGlassProps extends InteractiveGlassProps {
  /** Form field name */
  name?: string;
  /** Form field value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Required field */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Helper text */
  helperText?: string;
  /** Field label */
  label?: string;
  /** Read-only state */
  readonly?: boolean;
}

// Event handler types

// Accessibility props
interface AccessibilityProps {
  /** ARIA label */
  "aria-label"?: string;
  /** ARIA labelled by */
  "aria-labelledby"?: string;
  /** ARIA described by */
  "aria-describedby"?: string;
  /** ARIA expanded */
  "aria-expanded"?: boolean;
  /** ARIA controls */
  "aria-controls"?: string;
  /** ARIA hidden */
  "aria-hidden"?: boolean;
  /** ARIA live region */
  "aria-live"?: "polite" | "assertive" | "off";
  /** ARIA role */
  role?: string;
  /** Tab index */
  tabIndex?: number;
}

// Style configuration
interface StyleConfig {
  /** CSS custom properties */
  style?: React.CSSProperties;
  /** CSS variables */
  cssVariables?: Record<string, string | number>;
  /** Theme variant */
  theme?: "light" | "dark" | "auto";
}

// Performance optimization props
interface PerformanceProps {
  /** Lazy load component */
  lazy?: boolean;
  /** Virtualization enabled */
  virtualized?: boolean;
  /** Debounce interactions */
  debounce?: number;
  /** Throttle animations */
  throttle?: number;
}

// Combined base props for all components
interface UnifiedGlassProps
  extends BaseGlassProps,
    CompoundComponentProps,
    AccessibilityProps,
    StyleConfig,
    PerformanceProps {
  /** Unique component identifier */
  id?: string;
  /** Component key for React */
  key?: React.Key;
}

// Type utilities

// Generic component props builder
export type ComponentPropsBuilder<
  T extends HTMLElement,
  P extends Record<string, unknown> = Record<string, never>,
> = UnifiedGlassProps & HTMLAttributes<T> & P;
