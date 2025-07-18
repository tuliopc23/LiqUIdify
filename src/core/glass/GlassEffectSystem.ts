/**
 * GlassEffectSystem.ts
 *
 * A unified system for creating and managing glass effects throughout the LiqUIdify library.
 * This consolidates multiple implementations into a single, configurable system.
 */

import type { CSSProperties } from 'react';

// Types
export type GlassIntensity = 'subtle' | 'medium' | 'strong' | number;
export type GlassVariant = 'light' | 'dark' | 'colored';
export type GlassShape = 'rounded' | 'pill' | 'circle' | 'square';

export interface GlassLayerConfig {
  opacity: number;
  blur: number;
  saturation: number;
  hueRotate?: number;
  brightness?: number;
}

export interface GlassEffectConfig {
  intensity: GlassIntensity;
  variant: GlassVariant;
  backgroundColor?: string;
  borderColor?: string;
  backdropFilter?: boolean;
  layers?: {
    backdrop?: Partial<GlassLayerConfig>;
    overlay?: Partial<GlassLayerConfig>;
    specular?: Partial<GlassLayerConfig>;
  };
}

// Default configurations
const DEFAULT_LAYER_CONFIG: Record<
  GlassVariant,
  Record<string, GlassLayerConfig>
> = {
  light: {
    backdrop: { opacity: 0.7, blur: 10, saturation: 1.2, brightness: 1.1 },
    overlay: { opacity: 0.5, blur: 0, saturation: 1, brightness: 1.05 },
    specular: { opacity: 0.2, blur: 0, saturation: 1, brightness: 1.5 },
  },
  dark: {
    backdrop: { opacity: 0.7, blur: 10, saturation: 0.8, brightness: 0.9 },
    overlay: { opacity: 0.5, blur: 0, saturation: 0.9, brightness: 0.95 },
    specular: { opacity: 0.1, blur: 0, saturation: 1, brightness: 1.2 },
  },
  colored: {
    backdrop: { opacity: 0.7, blur: 10, saturation: 1.4, brightness: 1 },
    overlay: { opacity: 0.6, blur: 0, saturation: 1.2, brightness: 1 },
    specular: { opacity: 0.15, blur: 0, saturation: 1, brightness: 1.3 },
  },
};

const INTENSITY_MULTIPLIERS: Record<string, number> = {
  subtle: 0.7,
  medium: 1,
  strong: 1.3,
};

/**
 * Core glass effect generator
 * Creates CSS styles for glass effects based on configuration
 */
export function createGlassEffect(config: GlassEffectConfig): CSSProperties {
  const {
    intensity,
    variant,
    backgroundColor,
    borderColor,
    backdropFilter = true,
  } = config;

  // Determine intensity multiplier
  const intensityMultiplier =
    typeof intensity === 'number'
      ? intensity
      : INTENSITY_MULTIPLIERS[intensity] || 1;

  // Get base layer configs for the variant
  const baseLayerConfig = DEFAULT_LAYER_CONFIG[variant];

  // Merge with custom layer configs if provided
  const layerConfig = {
    backdrop: { ...baseLayerConfig.backdrop, ...config.layers?.backdrop },
    overlay: { ...baseLayerConfig.overlay, ...config.layers?.overlay },
    specular: { ...baseLayerConfig.specular, ...config.layers?.specular },
  };

  // Apply intensity multiplier to blur and opacity
  Object.keys(layerConfig).forEach(layer => {
    const typedLayer = layer as keyof typeof layerConfig;
    if (layerConfig[typedLayer]) {
      if (layerConfig[typedLayer]) {
        const layer = layerConfig[typedLayer]!;
        if (layer.blur !== undefined) {
          layer.blur *= intensityMultiplier;
        }
        if (layer.opacity !== undefined) {
          layer.opacity *= intensityMultiplier;
        }
      }
    }
  });

  // Generate backdrop filter if enabled
  const backdropFilterValue = backdropFilter
    ? `blur(${layerConfig.backdrop.blur}px) saturate(${layerConfig.backdrop.saturation})` +
      (layerConfig.backdrop.brightness
        ? ` brightness(${layerConfig.backdrop.brightness})`
        : '') +
      (layerConfig.backdrop.hueRotate
        ? ` hue-rotate(${layerConfig.backdrop.hueRotate}deg)`
        : '')
    : undefined;

  // Generate background color with opacity
  const bgColor =
    backgroundColor ||
    (variant === 'light'
      ? 'rgba(255, 255, 255, ' + layerConfig.overlay.opacity + ')'
      : variant === 'dark'
        ? 'rgba(30, 30, 30, ' + layerConfig.overlay.opacity + ')'
        : 'rgba(120, 120, 255, ' + layerConfig.overlay.opacity + ')');

  // Generate border color
  const border =
    borderColor ||
    (variant === 'light'
      ? `1px solid rgba(255, 255, 255, ${0.2 * intensityMultiplier})`
      : variant === 'dark'
        ? `1px solid rgba(0, 0, 0, ${0.2 * intensityMultiplier})`
        : `1px solid rgba(120, 120, 255, ${0.3 * intensityMultiplier})`);

  // Return complete glass effect styles
  return {
    backgroundColor: bgColor,
    backdropFilter: backdropFilterValue,
    WebkitBackdropFilter: backdropFilterValue, // For Safari
    border,
    boxShadow: `0 8px 32px rgba(0, 0, 0, ${0.1 * intensityMultiplier})`,
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden',
  };
}

/**
 * Creates a specular (highlight) layer for glass effects
 */
export function createSpecularLayer(config: GlassEffectConfig): CSSProperties {
  const { variant, intensity } = config;

  // Determine intensity multiplier
  const intensityMultiplier =
    typeof intensity === 'number'
      ? intensity
      : INTENSITY_MULTIPLIERS[intensity] || 1;

  // Get specular layer config
  const baseSpecularConfig = DEFAULT_LAYER_CONFIG[variant].specular;
  const specularConfig = { ...baseSpecularConfig, ...config.layers?.specular };

  // Apply intensity multiplier
  if (specularConfig.opacity !== undefined) {
    specularConfig.opacity *= intensityMultiplier;
  }

  // Generate gradient based on variant
  const gradientColor =
    variant === 'light'
      ? 'rgba(255, 255, 255, ' + (specularConfig.opacity || 0) * 0.7 + ')'
      : variant === 'dark'
        ? 'rgba(255, 255, 255, ' + (specularConfig.opacity || 0) * 0.7 + ')'
        : 'rgba(255, 255, 255, ' + (specularConfig.opacity || 0) + ')';

  return {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: `linear-gradient(to bottom, ${gradientColor}, transparent)`,
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
    pointerEvents: 'none',
  };
}

/**
 * Creates a complete glass component style including base and specular effects
 */
export function createCompleteGlassEffect(config: GlassEffectConfig): {
  container: CSSProperties;
  specular: CSSProperties;
} {
  return {
    container: createGlassEffect(config),
    specular: createSpecularLayer(config),
  };
}

/**
 * Utility to create glass effect CSS custom properties for theming
 */
export function createGlassEffectCSSVariables(
  config: GlassEffectConfig
): Record<string, string> {
  const { variant, intensity } = config;

  // Determine intensity multiplier
  const intensityMultiplier =
    typeof intensity === 'number'
      ? intensity
      : INTENSITY_MULTIPLIERS[intensity] || 1;

  // Get base layer configs
  const baseLayerConfig = DEFAULT_LAYER_CONFIG[variant];

  // Create CSS variables
  return {
    '--glass-backdrop-opacity': String(
      (baseLayerConfig.backdrop?.opacity || 0) * intensityMultiplier
    ),
    '--glass-backdrop-blur': `${(baseLayerConfig.backdrop?.blur || 0) * intensityMultiplier}px`,
    '--glass-backdrop-saturation': String(
      baseLayerConfig.backdrop?.saturation || 1
    ),
    '--glass-overlay-opacity': String(
      (baseLayerConfig.overlay?.opacity || 0) * intensityMultiplier
    ),
    '--glass-specular-opacity': String(
      (baseLayerConfig.specular?.opacity || 0) * intensityMultiplier
    ),
    '--glass-border-opacity': String(0.2 * intensityMultiplier),
    '--glass-shadow-opacity': String(0.1 * intensityMultiplier),
  };
}

// Export a unified API
export const GlassEffectSystem = {
  createGlassEffect,
  createSpecularLayer,
  createCompleteGlassEffect,
  createGlassEffectCSSVariables,
};
