/**
 * Core Types Module
 *
 * This module exports all the core types used throughout the LiquidUI component library.
 * These types ensure type safety and consistency across all components.
 */

// Base component types
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'outline';
export type GlassIntensity = 'subtle' | 'medium' | 'strong';
export type GlassVariant = 'light' | 'dark' | 'neutral' | 'colored';

// Animation types
export type AnimationPreset =
  | 'none'
  | 'subtle'
  | 'smooth'
  | 'bouncy'
  | 'springy';
export type TransitionDuration = 'fast' | 'medium' | 'slow' | 'slower';

// Accessibility types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-disabled'?: boolean;
  'aria-hidden'?: boolean;
  role?: string;
}

// Glass effect configuration
export interface GlassConfig {
  variant?: GlassVariant;
  intensity?: GlassIntensity;
  blur?: boolean;
  borderGlow?: boolean;
  interactive?: boolean;
}

// Glass effect configuration (extended)
export interface GlassEffectConfig {
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
export interface ComponentState {
  isLoading?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
  isFocused?: boolean;
  isHovered?: boolean;
}

// Theme types
export interface ThemeConfig {
  colorScheme?: 'light' | 'dark' | 'auto';
  primaryColor?: string;
  accentColor?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Event handler types
export type ClickHandler = (event: React.MouseEvent) => void;
export type ChangeHandler<T = any> = (value: T) => void;
export type FocusHandler = (event: React.FocusEvent) => void;

// Utility types
export type OmitProps<T, K extends keyof T> = Omit<T, K>;
export type PropsWithChildren<T = {}> = T & { children?: React.ReactNode };
export type ElementProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T];

// Error types
export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
}

// Performance types
export interface PerformanceMetrics {
  renderTime: number;
  bundleSize?: number;
  memoryUsage?: number;
}

// Re-export commonly used React types
export type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  ForwardedRef,
  ReactElement,
  ReactNode,
} from 'react';
