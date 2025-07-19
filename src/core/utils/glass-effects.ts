/**
 * Glass Effects Utility Module
 *
 * Provides utilities for generating glass effect classes and CSS variables
 * for consistent glassmorphism effects across components.
 */

import type { GlassEffectConfig } from '@/core/types';

/**
 * Maps component-level intensity names to utility-level intensity names
 */
export type ComponentIntensity = 'subtle' | 'medium' | 'strong';
export type UtilityIntensity = 'none' | 'low' | 'medium' | 'high';

/**
 * Converts component intensity to utility intensity
 */
export function mapIntensity(
  intensity?: ComponentIntensity | UtilityIntensity
): UtilityIntensity {
  if (!intensity) {return 'medium';}

  const intensityMap: Record<string, UtilityIntensity> = {
    subtle: 'low',
    medium: 'medium',
    strong: 'high',
    // Pass through utility intensities
    none: 'none',
    low: 'low',
    high: 'high',
  };

  return intensityMap[intensity] || 'medium';
}

/**
 * Generates glass effect CSS classes based on configuration
 *
 * @param variant - Component variant (primary, secondary, etc.)
 * @param intensity - Glass effect intensity (none, low, medium, high)
 * @param state - Current interaction state
 * @param config - Glass effect configuration
 * @returns Combined glass effect classes
 */
export function generateGlassClasses(
  _variant: string,
  intensity?: ComponentIntensity | UtilityIntensity,
  state: string = 'idle',
  _config?: GlassEffectConfig
): string {
  const mappedIntensity = mapIntensity(intensity);
  const baseClasses = [
    'backdrop-blur-sm',
    'bg-white/10',
    'dark:bg-gray-900/10',
    'border-white/20',
    'dark:border-gray-700/20',
  ];

  const intensityClasses = {
    none: ['bg-transparent', 'border-transparent'],
    low: ['backdrop-blur-xs', 'bg-white/5', 'dark:bg-gray-900/5'],
    medium: ['backdrop-blur-sm', 'bg-white/10', 'dark:bg-gray-900/10'],
    high: ['backdrop-blur-md', 'bg-white/20', 'dark:bg-gray-900/20'],
  };

  const stateClasses = {
    idle: [],
    hover: ['hover:bg-white/15', 'hover:dark:bg-gray-900/15'],
    active: ['active:bg-white/25', 'active:dark:bg-gray-900/25'],
    focus: ['focus:bg-white/20', 'focus:dark:bg-gray-900/20'],
  };

  return [
    ...baseClasses,
    ...intensityClasses[mappedIntensity],
    ...stateClasses[state as keyof typeof stateClasses],
  ].join(' ');
}

/**
 * Generates CSS variables for glass effects
 *
 * @param intensity - Glass effect intensity
 * @param config - Glass effect configuration
 * @returns CSS variables object
 */
export function generateGlassVariables(
  intensity?: ComponentIntensity | UtilityIntensity,
  config?: GlassEffectConfig
): Record<string, string> {
  const mappedIntensity = mapIntensity(intensity);
  const intensityValues = {
    none: { blur: '0px', opacity: '0' },
    low: { blur: '4px', opacity: '0.05' },
    medium: { blur: '8px', opacity: '0.1' },
    high: { blur: '16px', opacity: '0.2' },
  };

  const current = intensityValues[mappedIntensity];

  return {
    '--glass-blur': current.blur,
    '--glass-opacity': current.opacity,
    '--glass-border-opacity': config?.borderOpacity || '0.2',
    '--glass-backdrop-blur': config?.backdrop ? current.blur : '0px',
    '--glass-transition-duration': (config?.animation?.duration || 300) + 'ms',
    '--glass-transition-easing':
      config?.animation?.easing || 'cubic-bezier(0.4, 0, 0.2, 1)',
  };
}

/**
 * Creates a glass effect configuration preset
 *
 * @param preset - Preset name
 * @returns Glass effect configuration
 */
export function createGlassPreset(
  preset: 'subtle' | 'medium' | 'strong' | 'intense'
): GlassEffectConfig {
  const presets = {
    subtle: {
      intensity: 'subtle' as const,
      blur: true,
      backdrop: true,
      borderOpacity: '0.1',
      animation: { duration: 200, easing: 'ease-out' },
    },
    medium: {
      intensity: 'medium' as const,
      blur: true,
      backdrop: true,
      borderOpacity: '0.2',
      animation: { duration: 300, easing: 'ease-in-out' },
    },
    strong: {
      intensity: 'strong' as const,
      blur: true,
      backdrop: true,
      borderOpacity: '0.3',
      animation: { duration: 400, easing: 'ease-in-out' },
    },
    intense: {
      intensity: 'strong' as const,
      blur: true,
      backdrop: true,
      borderOpacity: '0.4',
      animation: { duration: 500, easing: 'ease-in-out' },
    },
  };

  return presets[preset];
}
