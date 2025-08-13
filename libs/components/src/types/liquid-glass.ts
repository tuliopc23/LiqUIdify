/**
 * LiqUIdify Liquid Glass System Types
 * Enhanced type definitions for the liquid glass component system
 */

export type LiquidGlassSize = "sm" | "md" | "lg" | "xl" | "2xl";

export type LiquidGlassVariant =
  | "default"
  | "solid"
  | "translucent"
  | "transparent"
  | "holographic"
  | "aurora"
  | "frosted"
  | "iridescent"
  | "elevated"
  | "outlined";

export type LiquidGlassComponentVariant = 
  | "card"
  | "button"
  | "modal"
  | "nav"
  | "hero"
  | "input";

export type LiquidGlassAnimation = "none" | "float" | "shimmer" | "pulse";

export type LiquidGlassShape = "rounded" | "pill" | "circle" | "square" | "wide" | "card";

export type LiquidGlassEffect = "distortion" | "refraction" | "chromatic" | "ripple" | "depth" | "noise";

export type LiquidGlassPerformance = "auto" | "high" | "medium" | "low";

export type LiquidGlassElevation = "none" | "sm" | "md" | "lg" | "xl";

export interface LiquidGlassBaseProps {
  /** Size variant for the glass effect */
  size?: LiquidGlassSize;
  /** Visual variant of the glass effect */
  variant?: LiquidGlassVariant;
  /** Animation type for the glass effect */
  animation?: LiquidGlassAnimation;
  /** Whether the component is interactive */
  interactive?: boolean;
  /** Whether to use the layered approach */
  layered?: boolean;
  /** Custom CSS classes */
  className?: string;
}

export interface LiquidGlassLayeredProps extends LiquidGlassBaseProps {
  /** Whether to show the filter layer */
  showFilter?: boolean;
  /** Whether to show the overlay layer */
  showOverlay?: boolean;
  /** Whether to show the specular layer */
  showSpecular?: boolean;
  /** Custom filter blur amount */
  filterBlur?: string;
  /** Custom overlay opacity */
  overlayOpacity?: number;
}

export interface LiquidGlassTheme {
  colors: {
    background: string;
    highlight: string;
    text: string;
    accent: string;
    grey: string;
  };
  effects: {
    blur: string;
    opacity: number;
    transition: string;
  };
  shadows: {
    main: string;
    enhanced: string;
    specular: string;
  };
}

// Utility type for component props with liquid glass
export type WithLiquidGlass<T = {}> = T & LiquidGlassBaseProps;
export type WithLiquidGlassLayered<T = {}> = T & LiquidGlassLayeredProps;
