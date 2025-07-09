/**
 * Type-safe CSS variable utilities for Tailwind v4
 * Provides runtime-safe access to CSS custom properties with TypeScript support
 */

import type {
  GlassVariant,
  GlassState,
  GlassBorder,
  GlassBlur,
  GlassTiming,
  GlassEasing,
} from '@/types/tailwind';

// Core CSS variable utilities
export const cssVar = {
  /**
   * Get a CSS custom property value
   * @param property - The property name (without -- prefix)
   * @returns CSS var() function string
   */
  get: (property: string): string => `var(--${property})`,

  /**
   * Get a CSS custom property with fallback
   * @param property - The property name (without -- prefix)
   * @param fallback - Fallback value if property is not defined
   * @returns CSS var() function string with fallback
   */
  getWithFallback: (property: string, fallback: string): string =>
    `var(--${property}, ${fallback})`,

  /**
   * Set a CSS custom property on an element
   * @param element - The DOM element
   * @param property - The property name (without -- prefix)
   * @param value - The value to set
   */
  set: (element: HTMLElement, property: string, value: string): void => {
    element.style.setProperty(`--${property}`, value);
  },

  /**
   * Remove a CSS custom property from an element
   * @param element - The DOM element
   * @param property - The property name (without -- prefix)
   */
  remove: (element: HTMLElement, property: string): void => {
    element.style.removeProperty(`--${property}`);
  },

  /**
   * Get the computed value of a CSS custom property
   * @param element - The DOM element
   * @param property - The property name (without -- prefix)
   * @returns The computed value as a string
   */
  getValue: (element: HTMLElement, property: string): string => {
    return getComputedStyle(element).getPropertyValue(`--${property}`).trim();
  },
};

// Glass design system specific utilities
export const glassVar = {
  /**
   * Get glass background CSS variable
   * @param variant - The glass background variant
   * @returns CSS var() function string
   */
  bg: (variant: GlassVariant): string => cssVar.get(`glass-bg-${variant}`),

  /**
   * Get glass background state CSS variable
   * @param state - The glass background state
   * @returns CSS var() function string
   */
  bgState: (state: GlassState): string => cssVar.get(`glass-bg-${state}`),

  /**
   * Get glass border CSS variable
   * @param variant - The glass border variant
   * @returns CSS var() function string
   */
  border: (variant: GlassBorder): string =>
    cssVar.get(`glass-border-${variant}`),

  /**
   * Get glass blur CSS variable
   * @param level - The blur level
   * @returns CSS var() function string
   */
  blur: (level: GlassBlur): string => cssVar.get(`glass-blur-${level}`),

  /**
   * Get glass timing CSS variable
   * @param speed - The timing speed
   * @returns CSS var() function string
   */
  timing: (speed: GlassTiming): string => cssVar.get(`glass-timing-${speed}`),

  /**
   * Get glass easing CSS variable
   * @param type - The easing type
   * @returns CSS var() function string
   */
  easing: (type: GlassEasing): string => cssVar.get(`glass-ease-${type}`),
};

// Semantic color utilities
export const semanticVar = {
  /**
   * Get primary color CSS variable
   * @param variant - Optional variant ('foreground' for foreground color)
   * @returns CSS var() function string
   */
  primary: (variant?: 'foreground'): string =>
    cssVar.get(variant ? `primary-${variant}` : 'primary'),

  /**
   * Get secondary color CSS variable
   * @param variant - Optional variant ('foreground' for foreground color)
   * @returns CSS var() function string
   */
  secondary: (variant?: 'foreground'): string =>
    cssVar.get(variant ? `secondary-${variant}` : 'secondary'),

  /**
   * Get background color CSS variable
   * @returns CSS var() function string
   */
  background: (): string => cssVar.get('background'),

  /**
   * Get foreground color CSS variable
   * @returns CSS var() function string
   */
  foreground: (): string => cssVar.get('foreground'),

  /**
   * Get border color CSS variable
   * @returns CSS var() function string
   */
  border: (): string => cssVar.get('border'),

  /**
   * Get text color CSS variable
   * @param variant - The text variant ('primary' | 'secondary')
   * @returns CSS var() function string
   */
  text: (variant: 'primary' | 'secondary'): string =>
    cssVar.get(`text-${variant}`),

  /**
   * Get radius CSS variable
   * @returns CSS var() function string
   */
  radius: (): string => cssVar.get('radius'),
};

// Apple Liquid Glass system utilities
export const liquidVar = {
  /**
   * Get liquid glass material CSS variable
   * @param variant - The liquid glass variant
   * @returns CSS var() function string
   */
  glass: (variant: GlassVariant): string =>
    cssVar.get(`liquid-glass-${variant}`),

  /**
   * Get liquid material state CSS variable
   * @param state - The material state
   * @returns CSS var() function string
   */
  state: (
    state: 'hover' | 'pressed' | 'focused' | 'selected' | 'disabled'
  ): string => cssVar.get(`liquid-${state}`),

  /**
   * Get liquid border CSS variable
   * @param variant - The border variant
   * @returns CSS var() function string
   */
  border: (variant: 'thin' | 'medium' | 'thick' | 'focus'): string =>
    cssVar.get(`liquid-border-${variant}`),

  /**
   * Get liquid blur CSS variable
   * @param level - The blur level
   * @returns CSS var() function string
   */
  blur: (
    level: 'ultra-thin' | 'thin' | 'regular' | 'thick' | 'ultra-thick'
  ): string => cssVar.get(`liquid-blur-${level}`),
};

// Utility to check if CSS custom properties are supported
export const isCSSCustomPropertiesSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    window.CSS &&
    window.CSS.supports &&
    window.CSS.supports('color', 'var(--fake-var, red)')
  );
};

// Helper to apply multiple CSS variables at once
export const applyCSSVars = (
  element: HTMLElement,
  variables: Record<string, string>
): void => {
  Object.entries(variables).forEach(([property, value]) => {
    cssVar.set(element, property, value);
  });
};

// Helper to get multiple CSS variable values
export const getCSSVars = (
  element: HTMLElement,
  properties: string[]
): Record<string, string> => {
  return properties.reduce(
    (acc, property) => {
      acc[property] = cssVar.getValue(element, property);
      return acc;
    },
    {} as Record<string, string>
  );
};

// Type-safe CSS-in-JS style object generator
export const createGlassStyle = (config: {
  background?: GlassVariant;
  backgroundState?: GlassState;
  border?: GlassBorder;
  blur?: GlassBlur;
  timing?: GlassTiming;
  easing?: GlassEasing;
}): React.CSSProperties => {
  const style: React.CSSProperties = {};

  if (config.background) {
    style.background = glassVar.bg(config.background);
  }

  if (config.backgroundState) {
    // Apply state-specific background on hover/focus/active
    style.transition = config.timing
      ? `background-color ${glassVar.timing(config.timing)} ${config.easing ? glassVar.easing(config.easing) : ''}`
      : 'background-color 0.2s ease';
  }

  if (config.border) {
    style.border = `1px solid ${glassVar.border(config.border)}`;
  }

  if (config.blur) {
    style.backdropFilter = glassVar.blur(config.blur);
    style.WebkitBackdropFilter = glassVar.blur(config.blur);
  }

  return style;
};

export default {
  cssVar,
  glassVar,
  semanticVar,
  liquidVar,
  isCSSCustomPropertiesSupported,
  applyCSSVars,
  getCSSVars,
  createGlassStyle,
};
