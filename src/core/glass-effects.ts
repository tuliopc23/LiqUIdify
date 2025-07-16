/**
 * Centralized Glass Effects System
 * 
 * This module provides a unified API for all glass effects throughout the Glass UI library.
 * It consolidates glass morphism, backdrop effects, and visual enhancements into a single,
 * consistent interface.
 */

import { GlassIntensity, GlassEffectConfig, ComponentVariant } from './base-component';
import { cn } from '@/lib/glass-utils';

// Glass effect types
export type GlassEffectType = 
  | 'blur'
  | 'saturation'
  | 'backdrop'
  | 'border'
  | 'shadow'
  | 'glow'
  | 'shimmer'
  | 'ripple'
  | 'magnetic'
  | 'liquid'
  | 'apple';

// Glass effect state
export type GlassEffectState = 'idle' | 'hover' | 'focus' | 'active' | 'disabled';

// Glass effect animation
export interface GlassEffectAnimation {
  /** Animation duration in milliseconds */
  duration: number;
  /** Animation easing function */
  easing: string;
  /** Animation delay in milliseconds */
  delay?: number;
  /** Animation iteration count */
  iterations?: number;
}

// Glass effect configuration
export interface GlassEffectOptions extends GlassEffectConfig {
  /** Effect state */
  state?: GlassEffectState;
  /** Animation configuration */
  animation?: GlassEffectAnimation;
  /** Enable responsive behavior */
  responsive?: boolean;
  /** Custom CSS variables */
  cssVariables?: Record<string, string | number>;
}

// Intensity mappings
const INTENSITY_VALUES = {
  subtle: {
    blur: 8,
    saturation: 150,
    opacity: 0.6,
    brightness: 1.1,
    contrast: 1.05,
  },
  medium: {
    blur: 16,
    saturation: 180,
    opacity: 0.75,
    brightness: 1.2,
    contrast: 1.1,
  },
  strong: {
    blur: 24,
    saturation: 200,
    opacity: 0.85,
    brightness: 1.3,
    contrast: 1.15,
  },
} as const;

// Variant-specific glass configurations
const VARIANT_CONFIGS = {
  primary: {
    backdrop: true,
    borders: true,
    shadows: true,
    glow: true,
  },
  secondary: {
    backdrop: true,
    borders: true,
    shadows: false,
    glow: false,
  },
  tertiary: {
    backdrop: false,
    borders: true,
    shadows: false,
    glow: false,
  },
  ghost: {
    backdrop: false,
    borders: false,
    shadows: false,
    glow: false,
  },
  destructive: {
    backdrop: true,
    borders: true,
    shadows: true,
    glow: true,
  },
  apple: {
    backdrop: true,
    borders: true,
    shadows: true,
    glow: true,
  },
} as const;

// State-specific class mappings
const STATE_CLASSES = {
  idle: '',
  hover: 'glass-hover',
  focus: 'glass-focus',
  active: 'glass-active',
  disabled: 'glass-disabled',
} as const;

// Animation presets
const ANIMATION_PRESETS = {
  instant: { duration: 0, easing: 'linear' },
  fast: { duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  normal: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  slow: { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  slower: { duration: 750, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
} as const;

/**
 * Glass Effects Manager
 * Central class for managing all glass effects
 */
export class GlassEffectsManager {
  private static instance: GlassEffectsManager;
  private effectsRegistry = new Map<string, GlassEffectOptions>();
  private activeEffects = new Set<string>();

  private constructor() {}

  static getInstance(): GlassEffectsManager {
    if (!GlassEffectsManager.instance) {
      GlassEffectsManager.instance = new GlassEffectsManager();
    }
    return GlassEffectsManager.instance;
  }

  /**
   * Register a glass effect configuration
   */
  registerEffect(id: string, options: GlassEffectOptions): void {
    this.effectsRegistry.set(id, options);
  }

  /**
   * Get a registered glass effect
   */
  getEffect(id: string): GlassEffectOptions | undefined {
    return this.effectsRegistry.get(id);
  }

  /**
   * Apply glass effect to element
   */
  applyEffect(element: HTMLElement, options: GlassEffectOptions): void {
    const effectId = this.generateEffectId(element);
    this.registerEffect(effectId, options);
    this.activeEffects.add(effectId);
    
    // Apply CSS classes and variables
    this.applyEffectToElement(element, options);
  }

  /**
   * Remove glass effect from element
   */
  removeEffect(element: HTMLElement): void {
    const effectId = this.generateEffectId(element);
    this.effectsRegistry.delete(effectId);
    this.activeEffects.delete(effectId);
    
    // Remove CSS classes and variables
    this.removeEffectFromElement(element);
  }

  private generateEffectId(element: HTMLElement): string {
    return `glass-effect-${element.getAttribute('data-glass-id') || Math.random().toString(36).substr(2, 9)}`;
  }

  private applyEffectToElement(element: HTMLElement, options: GlassEffectOptions): void {
    const { intensity = 'medium', state = 'idle', animation } = options;
    const intensityValues = INTENSITY_VALUES[intensity];
    
    // Apply base glass classes
    element.classList.add('glass-effect');
    
    // Apply state classes
    if (state !== 'idle') {
      element.classList.add(STATE_CLASSES[state]);
    }
    
    // Apply CSS variables
    const style = element.style;
    style.setProperty('--glass-blur', `${intensityValues.blur}px`);
    style.setProperty('--glass-saturation', `${intensityValues.saturation}%`);
    style.setProperty('--glass-opacity', intensityValues.opacity.toString());
    style.setProperty('--glass-brightness', intensityValues.brightness.toString());
    style.setProperty('--glass-contrast', intensityValues.contrast.toString());
    
    // Apply animation properties
    if (animation) {
      style.setProperty('--glass-animation-duration', `${animation.duration}ms`);
      style.setProperty('--glass-animation-easing', animation.easing);
      if (animation.delay) {
        style.setProperty('--glass-animation-delay', `${animation.delay}ms`);
      }
    }
    
    // Apply custom CSS variables
    if (options.cssVariables) {
      Object.entries(options.cssVariables).forEach(([key, value]) => {
        style.setProperty(`--glass-${key}`, value.toString());
      });
    }
  }

  private removeEffectFromElement(element: HTMLElement): void {
    // Remove all glass-related classes
    element.classList.remove('glass-effect');
    Object.values(STATE_CLASSES).forEach(className => {
      if (className) element.classList.remove(className);
    });
    
    // Remove CSS variables
    const style = element.style;
    const glassProperties = Array.from(style).filter(prop => prop.startsWith('--glass-'));
    glassProperties.forEach(prop => style.removeProperty(prop));
  }
}

/**
 * Generate glass effect classes based on configuration
 */
export function generateGlassClasses(
  variant: ComponentVariant = 'primary',
  intensity: GlassIntensity = 'medium',
  state: GlassEffectState = 'idle',
  options: GlassEffectOptions = {}
): string {
  const variantConfig = VARIANT_CONFIGS[variant];
  const baseClasses = ['glass-base'];
  
  // Add variant-specific classes
  if (variantConfig.backdrop) baseClasses.push('glass-backdrop');
  if (variantConfig.borders) baseClasses.push('glass-borders');
  if (variantConfig.shadows) baseClasses.push('glass-shadows');
  if (variantConfig.glow) baseClasses.push('glass-glow');
  
  // Add intensity classes
  baseClasses.push(`glass-intensity-${intensity}`);
  
  // Add state classes
  if (state !== 'idle') {
    baseClasses.push(STATE_CLASSES[state]);
  }
  
  // Add specific effect classes
  if (options.blur) baseClasses.push('glass-blur');
  if (options.saturation) baseClasses.push('glass-saturation');
  if (options.responsive) baseClasses.push('glass-responsive');
  
  return cn(...baseClasses);
}

/**
 * Generate CSS variables for glass effects
 */
export function generateGlassVariables(
  intensity: GlassIntensity = 'medium',
  options: GlassEffectOptions = {}
): Record<string, string | number> {
  const intensityValues = INTENSITY_VALUES[intensity];
  const variables: Record<string, string | number> = {
    '--glass-blur': `${intensityValues.blur}px`,
    '--glass-saturation': `${intensityValues.saturation}%`,
    '--glass-opacity': intensityValues.opacity,
    '--glass-brightness': intensityValues.brightness,
    '--glass-contrast': intensityValues.contrast,
  };
  
  // Add animation variables if specified
  if (options.animation) {
    variables['--glass-animation-duration'] = `${options.animation.duration}ms`;
    variables['--glass-animation-easing'] = options.animation.easing;
    if (options.animation.delay) {
      variables['--glass-animation-delay'] = `${options.animation.delay}ms`;
    }
  }
  
  // Add custom variables
  if (options.cssVariables) {
    Object.entries(options.cssVariables).forEach(([key, value]) => {
      variables[`--glass-${key}`] = value;
    });
  }
  
  return variables;
}

/**
 * Apply glass effect inline styles to element
 */
export function applyGlassInlineStyles(
  element: HTMLElement,
  intensity: GlassIntensity = 'medium',
  options: GlassEffectOptions = {}
): void {
  const variables = generateGlassVariables(intensity, options);
  
  Object.entries(variables).forEach(([property, value]) => {
    element.style.setProperty(property, value.toString());
  });
}

/**
 * Create glass effect configuration for specific use cases
 */
export function createGlassConfig(
  variant: ComponentVariant,
  intensity: GlassIntensity = 'medium',
  overrides: Partial<GlassEffectOptions> = {}
): GlassEffectOptions {
  const variantConfig = VARIANT_CONFIGS[variant];
  
  return {
    intensity,
    blur: variantConfig.backdrop,
    saturation: variantConfig.backdrop,
    backdrop: variantConfig.backdrop,
    borders: variantConfig.borders,
    shadows: variantConfig.shadows,
    ...overrides,
  };
}

/**
 * Hook for managing glass effects
 */
export function useGlassEffects(
  intensity: GlassIntensity = 'medium',
  options: GlassEffectOptions = {}
) {
  const manager = GlassEffectsManager.getInstance();
  
  return {
    applyEffect: (element: HTMLElement) => {
      manager.applyEffect(element, { intensity, ...options });
    },
    removeEffect: (element: HTMLElement) => {
      manager.removeEffect(element);
    },
    generateClasses: (variant: ComponentVariant, state: GlassEffectState = 'idle') => {
      return generateGlassClasses(variant, intensity, state, options);
    },
    generateVariables: () => {
      return generateGlassVariables(intensity, options);
    },
  };
}

// Export manager instance
export const glassEffectsManager = GlassEffectsManager.getInstance();

// Export presets
export { INTENSITY_VALUES, VARIANT_CONFIGS, STATE_CLASSES, ANIMATION_PRESETS };
