/**
 * Core Constants Module
 *
 * This module exports all the core constants used throughout the LiquidUI component library.
 * These constants ensure consistency and provide centralized configuration values.
 */

// Glass effect constants
export const GLASS_INTENSITY_VALUES = {
  weak: 0.3,
  medium: 0.6,
  strong: 0.8,
  extreme: 1,
} as const;

export const GLASS_BLUR_VALUES = {
  weak: 4,
  medium: 8,
  strong: 12,
  extreme: 16,
} as const;

// Animation constants
export const ANIMATION_DURATIONS = {
  fast: 150,
  medium: 300,
  slow: 500,
  slower: 750,
} as const;

export const SPRING_CONFIGS = {
  subtle: { tension: 300, friction: 30 },
  smooth: { tension: 280, friction: 25 },
  bouncy: { tension: 400, friction: 20 },
  springy: { tension: 500, friction: 15 },
} as const;

// Component size constants
export const SIZE_VALUES = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem",
} as const;

export const PADDING_VALUES = {
  xs: "0.25rem 0.5rem",
  sm: "0.5rem 0.75rem",
  md: "0.75rem 1rem",
  lg: "1rem 1.25rem",
  xl: "1.25rem 1.5rem",
} as const;

// Border radius constants
export const BORDER_RADIUS_VALUES = {
  none: "0",
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.5rem",
  xl: "0.75rem",
  full: "9999px",
} as const;

// Z-index constants
export const Z_INDEX = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Breakpoint constants
export const BREAKPOINTS = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Color constants
export const GLASS_COLORS = {
  light: {
    backdrop: "rgba(255, 255, 255, 0.7)",
    overlay: "rgba(255, 255, 255, 0.1)",
    border: "rgba(255, 255, 255, 0.2)",
    shadow: "rgba(0, 0, 0, 0.1)",
  },
  dark: {
    backdrop: "rgba(0, 0, 0, 0.7)",
    overlay: "rgba(255, 255, 255, 0.05)",
    border: "rgba(255, 255, 255, 0.1)",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
  neutral: {
    backdrop: "rgba(128, 128, 128, 0.7)",
    overlay: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.15)",
    shadow: "rgba(0, 0, 0, 0.2)",
  },
} as const;

// Performance constants
export const PERFORMANCE_BUDGETS = {
  maxBundleSize: 30 * 1024, // 30KB
  maxComponentSize: 5 * 1024, // 5KB
  maxRenderTime: 16, // 16ms (60fps)
  maxMemoryUsage: 50 * 1024 * 1024, // 50MB
} as const;

// Accessibility constants
export const A11Y_CONSTANTS = {
  minContrastRatio: 4.5,
  minTouchTarget: 44, // pixels
  maxLineHeight: 1.5,
  focusOutlineWidth: "2px",
  focusOutlineOffset: "2px",
} as const;

// Error tracking constants
export const ERROR_TYPES = {
  RENDER_ERROR: "render_error",
  ASYNC_ERROR: "async_error",
  NETWORK_ERROR: "network_error",
  VALIDATION_ERROR: "validation_error",
  PERMISSION_ERROR: "permission_error",
} as const;

// Development constants
export const DEV_CONSTANTS = {
  debugMode: process.env.NODE_ENV === "development",
  verbose: process.env.VERBOSE === "true",
  enablePerformanceMonitoring: process.env.PERF_MONITORING === "true",
  enableA11yChecks: process.env.A11Y_CHECKS !== "false",
} as const;

// CSS class prefixes
export const CLASS_PREFIXES = {
  glass: "glass-",
  component: "liquid-",
  utility: "util-",
  animation: "anim-",
  state: "state-",
} as const;

// Animation easing functions
export const EASING_FUNCTIONS = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
} as const;

// Export type-only versions for better TypeScript support
export type GlassIntensityKey = keyof typeof GLASS_INTENSITY_VALUES;
export type AnimationDurationKey = keyof typeof ANIMATION_DURATIONS;
export type ComponentSizeKey = keyof typeof SIZE_VALUES;
export type BorderRadiusKey = keyof typeof BORDER_RADIUS_VALUES;
export type BreakpointKey = keyof typeof BREAKPOINTS;
export type GlassColorKey = keyof typeof GLASS_COLORS;
export type ErrorTypeKey = keyof typeof ERROR_TYPES;
export type ClassPrefixKey = keyof typeof CLASS_PREFIXES;
export type EasingFunctionKey = keyof typeof EASING_FUNCTIONS;
