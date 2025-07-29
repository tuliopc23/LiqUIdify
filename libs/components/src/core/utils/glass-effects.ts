/**
 * Glass Effects Utilities
 *
 * Core utilities for generating glass effect classes and CSS variables
 */

import type { ComponentVariant } from "../base-component";
import type {
  GlassIntensity,
  GlassVariant,
} from "../glass/unified-glass-system";

interface GlassEffectOptions {
  intensity?: GlassIntensity;
  variant?: GlassVariant | ComponentVariant;
  opacity?: number;
  blur?: number | boolean;
  saturation?: number | boolean;
  brightness?: number;
  contrast?: number;
  backdrop?: boolean;
  borders?: boolean;
  shadows?: boolean;
  state?: string;
  glassEffect?: Record<string, unknown>;
  animation?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

/**
 * Maps ComponentVariant to GlassVariant
 */
function mapComponentVariantToGlassVariant(
  variant: ComponentVariant | GlassVariant,
): GlassVariant {
  // If it's already a GlassVariant, return as is
  if (
    ["default", "elevated", "floating", "card", "modal"].includes(
      variant as string,
    )
  ) {
    return variant as GlassVariant;
  }

  // Map ComponentVariant to GlassVariant
  const variantMap: Record<ComponentVariant, GlassVariant> = {
    primary: "elevated",
    secondary: "default",
    tertiary: "floating",
    ghost: "default",
    destructive: "elevated",
    apple: "card",
  };

  return variantMap[variant as ComponentVariant] || "default";
}

/**
 * Maps intensity levels to numeric values for calculations
 */
export function mapIntensity(intensity: GlassIntensity): number {
  switch (intensity) {
    case "none": {
      return 0;
    }
    case "subtle": {
      return 0.25;
    }
    case "medium": {
      return 0.5;
    }
    case "strong": {
      return 0.75;
    }
    case "intense": {
      return 1;
    }
    default: {
      return 0.5;
    }
  }
}

/**
 * Generates CSS classes for glass effects
 */
export function generateGlassClasses(options: GlassEffectOptions): string {
  const { intensity = "medium", variant = "default" } = options;

  // Map the variant to GlassVariant if needed
  const mappedVariant = variant
    ? mapComponentVariantToGlassVariant(variant)
    : "default";

  const baseClasses = [
    "glass-effect",
    `glass-effect--${intensity}`,
    `glass-effect--${mappedVariant}`,
  ];

  return baseClasses.join(" ");
}

/**
 * Generates CSS custom properties for glass effects
 */
export function generateGlassVariables(
  intensityOrOptions: GlassIntensity | GlassEffectOptions | undefined,
  additionalOptions?: Record<string, unknown>,
): Record<string, string> {
  // Handle both old signature (intensity, options) and new signature (options)
  let options: GlassEffectOptions;

  if (typeof intensityOrOptions === "string") {
    // Old signature: generateGlassVariables(intensity, options)
    options = { intensity: intensityOrOptions, ...additionalOptions };
  } else if (intensityOrOptions && typeof intensityOrOptions === "object") {
    // New signature: generateGlassVariables(options)
    options = intensityOrOptions;
  } else {
    // Default options
    options = { intensity: "medium" };
  }

  const {
    intensity = "medium",
    opacity = 0.1 + mapIntensity(intensity) * 0.3,
    blur: blurValue = 4 + mapIntensity(intensity) * 20,
    saturation: saturationValue = 1 + mapIntensity(intensity) * 0.4,
    brightness = 1 + mapIntensity(intensity) * 0.2,
    contrast = 1 + mapIntensity(intensity) * 0.15,
  } = options;

  // Convert boolean values to numbers
  const blur =
    typeof blurValue === "boolean"
      ? blurValue
        ? 4 + mapIntensity(intensity) * 20
        : 0
      : blurValue;

  const saturation =
    typeof saturationValue === "boolean"
      ? saturationValue
        ? 1 + mapIntensity(intensity) * 0.4
        : 1
      : saturationValue;

  return {
    "--glass-opacity": opacity.toString(),
    "--glass-blur": `${blur}px`,
    "--glass-saturation": saturation.toString(),
    "--glass-brightness": brightness.toString(),
    "--glass-contrast": contrast.toString(),
    "--glass-backdrop-filter": `blur(${blur}px) saturate(${saturation}) brightness(${brightness}) contrast(${contrast})`,
    "--glass-background": `rgba(255, 255, 255, ${opacity})`,
  };
}

/**
 * Combines glass classes and variables into a single style object
 */
function createGlassStyle(options: GlassEffectOptions) {
  return {
    className: generateGlassClasses(options),
    style: generateGlassVariables(options),
  };
}

/**
 * Preset configurations for common glass effects
 */
const GLASS_PRESETS = {
  card: {
    intensity: "medium" as GlassIntensity,
    variant: "card" as GlassVariant,
  },
  modal: {
    intensity: "strong" as GlassIntensity,
    variant: "modal" as GlassVariant,
  },
  navigation: {
    intensity: "subtle" as GlassIntensity,
    variant: "elevated" as GlassVariant,
  },
  floating: {
    intensity: "medium" as GlassIntensity,
    variant: "floating" as GlassVariant,
  },
} as const;

type GlassPreset = keyof typeof GLASS_PRESETS;

/**
 * Apply a preset glass effect configuration
 */
function applyGlassPreset(preset: GlassPreset) {
  return createGlassStyle(GLASS_PRESETS[preset]);
}
