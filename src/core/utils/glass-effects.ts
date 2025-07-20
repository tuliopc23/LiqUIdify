/**
 * Glass Effects Utilities
 * 
 * Core utilities for generating glass effect classes and CSS variables
 */

import type { GlassIntensity, GlassVariant } from '../glass/unified-glass-system';

export interface GlassEffectOptions {
  intensity: GlassIntensity;
  variant?: GlassVariant;
  opacity?: number;
  blur?: number;
  saturation?: number;
  brightness?: number;
  contrast?: number;
}

/**
 * Maps intensity levels to numeric values for calculations
 */
export function mapIntensity(intensity: GlassIntensity): number {
  switch (intensity) {
    case 'none':
      return 0;
    case 'subtle':
      return 0.25;
    case 'medium':
      return 0.5;
    case 'strong':
      return 0.75;
    case 'intense':
      return 1;
    default:
      return 0.5;
  }
}

/**
 * Generates CSS classes for glass effects
 */
export function generateGlassClasses(options: GlassEffectOptions): string {
  const { intensity, variant = 'default' } = options;
  
  const baseClasses = [
    'glass-effect',
    `glass-effect--${intensity}`,
    `glass-effect--${variant}`,
  ];
  
  return baseClasses.join(' ');
}

/**
 * Generates CSS custom properties for glass effects
 */
export function generateGlassVariables(options: GlassEffectOptions): Record<string, string> {
  const {
    intensity,
    opacity = 0.1 + mapIntensity(intensity) * 0.3,
    blur = 4 + mapIntensity(intensity) * 20,
    saturation = 1 + mapIntensity(intensity) * 0.4,
    brightness = 1 + mapIntensity(intensity) * 0.2,
    contrast = 1 + mapIntensity(intensity) * 0.15,
  } = options;

  return {
    '--glass-opacity': opacity.toString(),
    '--glass-blur': `${blur}px`,
    '--glass-saturation': saturation.toString(),
    '--glass-brightness': brightness.toString(),
    '--glass-contrast': contrast.toString(),
    '--glass-backdrop-filter': `blur(${blur}px) saturate(${saturation}) brightness(${brightness}) contrast(${contrast})`,
    '--glass-background': `rgba(255, 255, 255, ${opacity})`,
  };
}

/**
 * Combines glass classes and variables into a single style object
 */
export function createGlassStyle(options: GlassEffectOptions) {
  return {
    className: generateGlassClasses(options),
    style: generateGlassVariables(options),
  };
}

/**
 * Preset configurations for common glass effects
 */
export const GLASS_PRESETS = {
  card: { intensity: 'medium' as GlassIntensity, variant: 'card' as GlassVariant },
  modal: { intensity: 'strong' as GlassIntensity, variant: 'modal' as GlassVariant },
  navigation: { intensity: 'subtle' as GlassIntensity, variant: 'elevated' as GlassVariant },
  floating: { intensity: 'medium' as GlassIntensity, variant: 'floating' as GlassVariant },
} as const;

export type GlassPreset = keyof typeof GLASS_PRESETS;

/**
 * Apply a preset glass effect configuration
 */
export function applyGlassPreset(preset: GlassPreset) {
  return createGlassStyle(GLASS_PRESETS[preset]);
}
