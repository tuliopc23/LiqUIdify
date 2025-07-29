/**
 * Core Types Module
 *
 * This module exports all the core types used throughout the LiquidUI component library.
 * These types ensure type safety and consistency across all components.
 */

// Base component types
type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";
type ComponentVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "outline";
type GlassIntensity = "subtle" | "medium" | "strong";
type GlassVariant = "light" | "dark" | "neutral" | "colored";

// Animation types
type AnimationPreset = "none" | "subtle" | "smooth" | "bouncy" | "springy";
type TransitionDuration = "fast" | "medium" | "slow" | "slower";

// Accessibility types
interface A11yProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-disabled"?: boolean;
  "aria-hidden"?: boolean;
  role?: string;
}

// Glass effect configuration
interface GlassConfig {
  variant?: GlassVariant;
  intensity?: GlassIntensity;
  blur?: boolean;
  borderGlow?: boolean;
  interactive?: boolean;
}

// Glass effect configuration (extended)
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
  /** Border opacity */
  borderOpacity?: string;
  /** Animation configuration */
  animation?: {
    duration?: number | string;
    easing?: string;
  };
}

// Component state types
interface ComponentState {
  isLoading?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
  isFocused?: boolean;
  isHovered?: boolean;
}

// Theme types
interface ThemeConfig {
  colorScheme?: "light" | "dark" | "auto";
  primaryColor?: string;
  accentColor?: string;
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}

// Event handler types
type ClickHandler = (event: React.MouseEvent) => void;
type ChangeHandler<T = unknown> = (value: T) => void;
type FocusHandler = (event: React.FocusEvent) => void;

// Utility types
type OmitProps<T, K extends keyof T> = Omit<T, K>;
type PropsWithChildren<T = {}> = T & { children?: React.ReactNode };
type ElementProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T];

// Error types
interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
}

// Performance types
interface PerformanceMetrics {
  renderTime: number;
  bundleSize?: number;
  memoryUsage?: number;
}

// Re-export commonly used React types;
