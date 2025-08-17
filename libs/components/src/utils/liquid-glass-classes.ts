import type { DeviceCapabilities } from "../hooks/use-device-capabilities";

/**
 * Get CSS classes based on device capabilities
 */
export function getLiquidGlassClasses(
  capabilities: DeviceCapabilities,
  variant?: "default" | "premium" | "minimal",
  additionalClasses?: string,
): string {
  const classes: string[] = ["liquid-glass"];

  // Add performance tier classes
  if (capabilities.performanceTier === "high" && variant !== "minimal") {
    classes.push("liquid-glass-premium");
    if (capabilities.hasSVGFilters) {
      classes.push("liquid-glass-distortion");
    }
    if ((capabilities as any).hasHDR ?? capabilities.hdr) {
      classes.push("liquid-glass-hdr");
    }
  } else if (
    capabilities.performanceTier === "low" ||
    variant === "minimal"
  ) {
    classes.push("liquid-glass-minimal");
  }

  // Accessibility classes
  if (capabilities.prefersReducedMotion) {
    classes.push("liquid-glass-reduced-motion");
  }

  if (capabilities.prefersReducedTransparency) {
    classes.push("liquid-glass-reduced-transparency");
  }

  if ((capabilities as any).prefersContrast === "more") {
    classes.push("liquid-glass-high-contrast");
  }

  // Touch-specific classes
  if ((capabilities as any).isPointerDevice === false || capabilities.isTouch) {
    classes.push("liquid-glass-touch");
  }

  // Retina/high-dpi
  if (capabilities.devicePixelRatio >= 2) {
    classes.push("liquid-glass-retina");
  }

  // Wide gamut
  if (
    (capabilities as any).colorGamut === "p3" ||
    (capabilities as any).colorGamut === "rec2020"
  ) {
    classes.push("liquid-glass-wide-gamut");
  }

  if (additionalClasses) {
    classes.push(additionalClasses);
  }

  return classes.join(" ");
}
