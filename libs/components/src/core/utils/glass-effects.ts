/**
 * Glass Effects Utilities
 *
 * Core utilities for generating glass effect classes and CSS variables
 */

import type { ComponentVariant } from "../base-component";

// Define glass types locally since unified-glass-system was removed
export type GlassIntensity = "subtle" | "medium" | "strong" | "extreme";
export type GlassVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "muted";

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
  // If it's already a GlassVariant we support explicitly
  if (
    ["default", "primary", "secondary", "accent", "muted"].includes(
      variant as string,
    )
  ) {
    return variant as GlassVariant;
  }

  // Map ComponentVariant to GlassVariant
  const variantMap: Record<ComponentVariant, GlassVariant> = {
    primary: "primary",
    secondary: "secondary",
    tertiary: "muted" as GlassVariant,
    ghost: "muted" as GlassVariant,
    destructive: "accent" as GlassVariant,
    apple: "default" as GlassVariant,
  } as any;

  return variantMap[variant as ComponentVariant] || "default";
}

/**
 * Maps intensity levels to numeric values for calculations
 */
function mapIntensity(intensity: GlassIntensity): number {
  switch (intensity) {
    case "subtle": {
      return 0.25;
    }
    case "medium": {
      return 0.5;
    }
    case "strong": {
      return 0.75;
    }
    case "extreme": {
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
function generateGlassClasses(options: GlassEffectOptions): string {
  const {
    intensity = "medium" as GlassIntensity,
    variant = "default" as GlassVariant,
  } = options;

  const mappedVariant = variant
    ? mapComponentVariantToGlassVariant(variant as GlassVariant)
    : ("default" as GlassVariant);

  // Prefer new liquid-glass class; include legacy shim for backward compatibility
  const baseClasses = [
    "liquid-glass",
    "glass-effect",
    `glass-effect--${intensity}`,
    `glass-effect--${mappedVariant}`,
  ];

  return baseClasses.join(" ");
}

/**
 * Generates CSS custom properties for glass effects
 */
function generateGlassVariables(
  intensityOrOptions: GlassIntensity | GlassEffectOptions | undefined,
  additionalOptions?: Record<string, unknown>,
): Record<string, string> {
  let options: GlassEffectOptions;

  if (typeof intensityOrOptions === "string") {
    options = {
      intensity: intensityOrOptions as GlassIntensity,
      ...(additionalOptions || {}),
    };
  } else if (intensityOrOptions && typeof intensityOrOptions === "object") {
    options = intensityOrOptions as GlassEffectOptions;
  } else {
    options = { intensity: "medium" };
  }

  const {
    intensity = "medium",
    opacity = 0.1 + mapIntensity(intensity as GlassIntensity) * 0.3,
    blur: blurValue,
    saturation: saturationValue,
    brightness = 1 + mapIntensity(intensity as GlassIntensity) * 0.2,
    contrast = 1 + mapIntensity(intensity as GlassIntensity) * 0.15,
  } = options;

  const blur =
    typeof blurValue === "number"
      ? blurValue
      : 4 + mapIntensity(intensity as GlassIntensity) * 20;

  const saturation =
    typeof saturationValue === "number"
      ? saturationValue
      : 1 + mapIntensity(intensity as GlassIntensity) * 0.4;

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
