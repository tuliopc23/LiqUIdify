/**
 * Glass Core - Foundation layer for glassmorphism effects
 * Provides core primitives and utilities for glass components
 */

import { liquidGlassTokens } from "./liquid-glass-tokens";

// Core glass effect types
export type GlassVariant = "default" | "elevated" | "floating" | "overlay" | "pressed";
export type GlassBlur = "whisper" | "ghost" | "subtle" | "light" | "medium" | "heavy" | "intense";
export type GlassShadow = "whisper" | "subtle" | "light" | "medium" | "heavy" | "intense" | "extreme";

// Core glass configuration interface
export interface GlassConfig {
  variant?: GlassVariant;
  blur?: GlassBlur;
  shadow?: GlassShadow;
  border?: boolean;
  theme?: "light" | "dark" | "auto";
}

// Glass style generator
export class GlassStyleGenerator {
  private theme: "light" | "dark";

  constructor(theme: "light" | "dark" = "light") {
    this.theme = theme;
  }

  setTheme(theme: "light" | "dark") {
    this.theme = theme;
  }

  generateGlassStyle(config: GlassConfig = {}): string {
    const {
      variant = "default",
      blur = "medium",
      shadow = "light",
      border = true
    } = config;

    const colors = liquidGlassTokens.colors.glass[this.theme];
    const borders = liquidGlassTokens.colors.border[this.theme];
    const shadows = liquidGlassTokens.shadows.glass;
    const blurValue = liquidGlassTokens.blur[blur];

    let styles = [
      `background: ${colors[variant as keyof typeof colors] || colors.primary}`,
      `backdrop-filter: blur(${blurValue}) saturate(${liquidGlassTokens.saturation.enhanced})`,
      `-webkit-backdrop-filter: blur(${blurValue}) saturate(${liquidGlassTokens.saturation.enhanced})`,
      `box-shadow: ${shadows[shadow]}`,
    ];

    if (border) {
      styles.push(`border: 1px solid ${borders.light}`);
    }

    return styles.join("; ");
  }

  generateHoverStyle(_config: GlassConfig = {}): string {
    const colors = liquidGlassTokens.colors.glass[this.theme];
    const borders = liquidGlassTokens.colors.border[this.theme];

    return [
      `background: ${colors.hover}`,
      `border-color: ${borders.hover}`,
      `transform: translateY(-1px)`,
      `transition: all ${liquidGlassTokens.timing.normal} ${liquidGlassTokens.easing.glass}`
    ].join("; ");
  }

  generateFocusStyle(): string {
    const focusShadow = liquidGlassTokens.shadows.focus.medium;
    return [
      `outline: none`,
      `box-shadow: ${focusShadow}`,
      `transition: box-shadow ${liquidGlassTokens.timing.fast} ${liquidGlassTokens.easing.glass}`
    ].join("; ");
  }

  generateActiveStyle(): string {
    const colors = liquidGlassTokens.colors.glass[this.theme];
    return [
      `background: ${colors.active}`,
      `transform: translateY(0px) scale(0.98)`,
      `transition: all ${liquidGlassTokens.timing.fast} ${liquidGlassTokens.easing.glass}`
    ].join("; ");
  }
}

// CSS class name generator for glass effects
export class GlassClassGenerator {
  static getBaseClasses(): string[] {
    return [
      "relative",
      "overflow-hidden",
      "will-change-transform"
    ];
  }

  static getVariantClasses(variant: GlassVariant): string[] {
    const variantMap: Record<GlassVariant, string[]> = {
      default: ["glass-default"],
      elevated: ["glass-elevated"],
      floating: ["glass-floating"],
      overlay: ["glass-overlay"],
      pressed: ["glass-pressed"]
    };

    return variantMap[variant] || variantMap.default;
  }

  static getInteractionClasses(): string[] {
    return [
      "transition-all",
      "duration-300",
      "ease-out",
      "hover:glass-hover",
      "focus:glass-focus",
      "active:glass-active"
    ];
  }

  static getResponsiveClasses(): string[] {
    return [
      "glass-responsive"
    ];
  }

  static combineClasses(
    variant: GlassVariant = "default",
    interactive: boolean = true,
    responsive: boolean = true,
    customClasses: string[] = []
  ): string {
    const classes = [
      ...this.getBaseClasses(),
      ...this.getVariantClasses(variant),
      ...(interactive ? this.getInteractionClasses() : []),
      ...(responsive ? this.getResponsiveClasses() : []),
      ...customClasses
    ];

    return classes.join(" ");
  }
}

// Glass effect utilities
export const glassUtils = {
  // Generate CSS custom properties for glass effects
  generateCSSProperties(config: GlassConfig = {}): Record<string, string> {
    const {
      variant = "default",
      blur = "medium",
      shadow = "light"
    } = config;

    const lightColors = liquidGlassTokens.colors.glass.light;
    const darkColors = liquidGlassTokens.colors.glass.dark;

    return {
      "--glass-bg": lightColors[variant as keyof typeof lightColors] || lightColors.primary,
      "--glass-bg-dark": darkColors[variant as keyof typeof darkColors] || darkColors.primary,
      "--glass-blur": liquidGlassTokens.blur[blur],
      "--glass-shadow": liquidGlassTokens.shadows.glass[shadow],
      "--glass-border": liquidGlassTokens.colors.border.light.light,
      "--glass-border-dark": liquidGlassTokens.colors.border.dark.light,
    };
  },

  // Apply glass effect to DOM element
  applyGlassEffect(element: HTMLElement, config: GlassConfig = {}): void {
    const generator = new GlassStyleGenerator();
    const style = generator.generateGlassStyle(config);
    
    // Parse and apply styles
    style.split("; ").forEach(rule => {
      const [property, value] = rule.split(": ");
      if (property && value) {
        element.style.setProperty(property, value);
      }
    });
  },

  // Remove glass effect from DOM element
  removeGlassEffect(element: HTMLElement): void {
    const glassProperties = [
      "background",
      "backdrop-filter",
      "-webkit-backdrop-filter",
      "box-shadow",
      "border"
    ];

    glassProperties.forEach(prop => {
      element.style.removeProperty(prop);
    });
  },

  // Check if browser supports backdrop-filter
  supportsBackdropFilter(): boolean {
    return CSS.supports("backdrop-filter", "blur(1px)") || 
           CSS.supports("-webkit-backdrop-filter", "blur(1px)");
  },

  // Get fallback styles for unsupported browsers
  getFallbackStyles(config: GlassConfig = {}): string {
    const { variant = "default" } = config;
    
    // Provide solid background fallback
    const fallbackColors = {
      default: "rgba(255, 255, 255, 0.9)",
      elevated: "rgba(255, 255, 255, 0.95)",
      floating: "rgba(255, 255, 255, 0.85)",
      overlay: "rgba(255, 255, 255, 0.98)",
      pressed: "rgba(255, 255, 255, 0.8)"
    };

    return `background: ${fallbackColors[variant]}`;
  }
};

// Performance optimization utilities
export const glassPerformance = {
  // Optimize glass effects for performance
  optimizeForPerformance(element: HTMLElement): void {
    element.style.willChange = "transform, opacity";
    element.style.transform = "translateZ(0)"; // Force hardware acceleration
  },

  // Clean up performance optimizations
  cleanupOptimizations(element: HTMLElement): void {
    element.style.willChange = "auto";
    element.style.removeProperty("transform");
  },

  // Check if reduced motion is preferred
  prefersReducedMotion(): boolean {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  // Apply reduced motion styles
  applyReducedMotionStyles(element: HTMLElement): void {
    if (this.prefersReducedMotion()) {
      element.style.transition = "none";
      element.style.animation = "none";
    }
  }
};

// Export default glass style generator instance
export const defaultGlassGenerator = new GlassStyleGenerator();
