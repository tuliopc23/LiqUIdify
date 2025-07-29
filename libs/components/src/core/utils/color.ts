/**
 * Color Utilities Module
 *
 * This module provides utilities for color manipulation, validation, and accessibility
 * with support for various color formats and glass effect color calculations.
 */

// Color format types
type ColorFormat = "hex" | "rgb" | "rgba" | "hsl" | "hsla";

interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

interface HSLColor {
  h: number;
  s: number;
  l: number;
  a?: number;
}

interface ColorInfo {
  hex: string;
  rgb: RGBColor;
  hsl: HSLColor;
  luminance: number;
  isDark: boolean;
  isLight: boolean;
}

/**
 * Parse a color string into RGB values
 */
function parseColor(color: string): RGBColor | null {
  // Handle hex colors
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      return {
        r: Number.parseInt(hex[0]! + hex[0]!, 16),
        g: Number.parseInt(hex[1]! + hex[1]!, 16),
        b: Number.parseInt(hex[2]! + hex[2]!, 16),
      };
    }
    if (hex.length === 6) {
      return {
        r: Number.parseInt(hex.slice(0, 2), 16),
        g: Number.parseInt(hex.slice(2, 4), 16),
        b: Number.parseInt(hex.slice(4, 6), 16),
      };
    }
  }

  // Handle rgb/rgba colors
  const rgbMatch = color.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
  );
  if (rgbMatch) {
    return {
      r: Number.parseInt(rgbMatch[1]!, 10),
      g: Number.parseInt(rgbMatch[2]!, 10),
      b: Number.parseInt(rgbMatch[3]!, 10),
    };
  }

  // Handle hsl/hsla colors
  const hslMatch = color.match(
    /hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/,
  );
  if (hslMatch) {
    const h = Number.parseInt(hslMatch[1]!, 10);
    const s = Number.parseInt(hslMatch[2]!, 10) / 100;
    const l = Number.parseInt(hslMatch[3]!, 10) / 100;
    const a = hslMatch[4] ? Number.parseFloat(hslMatch[4]) : undefined;

    return hslToRgb(h, s, l, a);
  }

  return null;
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number, a?: number): HSLColor {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const sum = max + min;
  const l = sum / 2;

  let h = 0;
  let s = 0;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - sum) : diff / sum;

    switch (max) {
      case r: {
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        break;
      }
      case g: {
        h = ((b - r) / diff + 2) / 6;
        break;
      }
      case b: {
        h = ((r - g) / diff + 4) / 6;
        break;
      }
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a,
  };
}

/**
 * Convert HSL to RGB
 */
function hslToRgb(h: number, s: number, l: number, a?: number): RGBColor {
  h /= 360;

  const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a,
  };
}

/**
 * Calculate luminance of a color (for contrast ratio calculations)
 */
function getLuminance(color: string | RGBColor): number {
  const rgb = typeof color === "string" ? parseColor(color) : color;
  if (!rgb) {
    return 0;
  }

  const { r, g, b } = rgb;

  const normalize = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.039_28
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(
  color1: string | RGBColor,
  color2: string | RGBColor,
): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color meets WCAG contrast requirements
 */
function meetsContrastRequirement(
  foreground: string | RGBColor,
  background: string | RGBColor,
  level: "AA" | "AAA" = "AA",
  size: "normal" | "large" = "normal",
): boolean {
  const ratio = getContrastRatio(foreground, background);

  if (level === "AAA") {
    return size === "large" ? ratio >= 4.5 : ratio >= 7;
  }

  return size === "large" ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Determine if a color is light or dark
 */
function isLightColor(color: string | RGBColor): boolean {
  return getLuminance(color) > 0.5;
}

/**
 * Get complementary color
 */
function getComplementaryColor(color: string): string {
  const rgb = parseColor(color);
  if (!rgb) {
    return color;
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const complementaryHue = (hsl.h + 180) % 360;

  const complementaryRgb = hslToRgb(complementaryHue, hsl.s / 100, hsl.l / 100);
  return rgbToHex(complementaryRgb.r, complementaryRgb.g, complementaryRgb.b);
}

/**
 * Lighten a color by a percentage
 */
function lighten(color: string, amount: number): string {
  const rgb = parseColor(color);
  if (!rgb) {
    return color;
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const newLightness = Math.min(100, hsl.l + amount);

  const newRgb = hslToRgb(hsl.h, hsl.s / 100, newLightness / 100);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Darken a color by a percentage
 */
function darken(color: string, amount: number): string {
  const rgb = parseColor(color);
  if (!rgb) {
    return color;
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const newLightness = Math.max(0, hsl.l - amount);

  const newRgb = hslToRgb(hsl.h, hsl.s / 100, newLightness / 100);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Adjust color opacity
 */
function setOpacity(color: string, opacity: number): string {
  const rgb = parseColor(color);
  if (!rgb) {
    return color;
  }

  const clampedOpacity = Math.max(0, Math.min(1, opacity));
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clampedOpacity})`;
}

/**
 * Generate a color palette from a base color
 */
function generatePalette(baseColor: string, steps = 9): Array<string> {
  const palette: Array<string> = [];
  const stepSize = 100 / (steps - 1);

  for (let index = 0; index < steps; index++) {
    const lightness = index * stepSize;
    const rgb = parseColor(baseColor);
    if (!rgb) {
      continue;
    }

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const newRgb = hslToRgb(hsl.h, hsl.s / 100, lightness / 100);
    palette.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }

  return palette;
}

/**
 * Glass effect color utilities
 */
const glassColors = {
  /**
   * Generate backdrop color for glass effect
   */
  backdrop(baseColor: string, opacity = 0.7): string {
    return setOpacity(baseColor, opacity);
  },

  /**
   * Generate overlay color for glass effect
   */
  overlay(
    variant: "light" | "dark" | "neutral" = "neutral",
    opacity = 0.1,
  ): string {
    const baseColors = {
      light: "#ffffff",
      dark: "#000000",
      neutral: "#808080",
    };

    return setOpacity(baseColors[variant], opacity);
  },

  /**
   * Generate border color for glass effect
   */
  border(
    variant: "light" | "dark" | "neutral" = "neutral",
    opacity = 0.2,
  ): string {
    const baseColors = {
      light: "#ffffff",
      dark: "#ffffff",
      neutral: "#ffffff",
    };

    return setOpacity(baseColors[variant], opacity);
  },

  /**
   * Generate shadow color for glass effect
   */
  shadow(
    variant: "light" | "dark" | "neutral" = "neutral",
    opacity = 0.1,
  ): string {
    const baseColors = {
      light: "#000000",
      dark: "#000000",
      neutral: "#000000",
    };

    return setOpacity(baseColors[variant], opacity);
  },

  /**
   * Generate specular highlight color
   */
  specular(
    variant: "light" | "dark" | "neutral" = "neutral",
    opacity = 0.3,
  ): string {
    const baseColors = {
      light: "#ffffff",
      dark: "#ffffff",
      neutral: "#ffffff",
    };

    return setOpacity(baseColors[variant], opacity);
  },
};

/**
 * Get comprehensive color information
 */
function getColorInfo(color: string): ColorInfo | null {
  const rgb = parseColor(color);
  if (!rgb) {
    return null;
  }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const luminance = getLuminance(rgb);
  const isDark = luminance < 0.5;
  const isLight = !isDark;

  return {
    hex: rgbToHex(rgb.r, rgb.g, rgb.b),
    rgb,
    hsl,
    luminance,
    isDark,
    isLight,
  };
}

/**
 * Validate color format
 */
function isValidColor(color: string): boolean {
  const rgb = parseColor(color);
  return rgb !== null;
}

/**
 * Format color to specific format
 */
function formatColor(color: string, format: ColorFormat): string {
  const rgb = parseColor(color);
  if (!rgb) {
    return color;
  }

  switch (format) {
    case "hex": {
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    }
    case "rgb": {
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    case "rgba": {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a || 1})`;
    }
    case "hsl": {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
    case "hsla": {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${rgb.a || 1})`;
    }
    default: {
      return color;
    }
  }
}

/**
 * Mix two colors
 */
function mixColors(color1: string, color2: string, ratio = 0.5): string {
  const rgb1 = parseColor(color1);
  const rgb2 = parseColor(color2);

  if (!rgb1 || !rgb2) {
    throw new Error("Invalid color format");
  }

  const mixed = {
    r: Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio),
    g: Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio),
    b: Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio),
  };

  return rgbToHex(mixed.r, mixed.g, mixed.b);
}

/**
 * Check contrast for glass morphism effects
 * @param foreground - Text/foreground color
 * @param glassBackground - Glass panel background color
 * @param backdropBackground - Background behind the glass
 * @param glassOpacity - Opacity of the glass panel (0-1)
 */
export function checkGlassContrast(
  foreground: string | RGBColor,
  glassBackground: string | RGBColor,
  backdropBackground: string | RGBColor,
  glassOpacity = 0.25,
): {
  ratio: number;
  passes: {
    aa: { normal: boolean; large: boolean };
    aaa: { normal: boolean; large: boolean };
  };
  recommendation: string;
} {
  const fg =
    typeof foreground === "string" ? parseColor(foreground) : foreground;
  const glassBg =
    typeof glassBackground === "string"
      ? parseColor(glassBackground)
      : glassBackground;
  const backdropBg =
    typeof backdropBackground === "string"
      ? parseColor(backdropBackground)
      : backdropBackground;

  if (!fg || !glassBg || !backdropBg) {
    throw new Error("Invalid color format");
  }

  // Calculate effective background color (glass + backdrop)
  const effectiveBg: RGBColor = {
    r: Math.round(glassBg.r * glassOpacity + backdropBg.r * (1 - glassOpacity)),
    g: Math.round(glassBg.g * glassOpacity + backdropBg.g * (1 - glassOpacity)),
    b: Math.round(glassBg.b * glassOpacity + backdropBg.b * (1 - glassOpacity)),
  };

  const ratio = getContrastRatio(
    rgbToHex(fg.r, fg.g, fg.b),
    rgbToHex(effectiveBg.r, effectiveBg.g, effectiveBg.b),
  );

  const result = {
    ratio,
    passes: {
      aa: {
        normal: ratio >= 4.5,
        large: ratio >= 3,
      },
      aaa: {
        normal: ratio >= 7,
        large: ratio >= 4.5,
      },
    },
    recommendation: "",
  };

  if (ratio < 3) {
    result.recommendation =
      "Very poor contrast. Consider using a different color combination.";
  } else if (ratio < 4.5) {
    result.recommendation =
      "Acceptable for large text only (18pt+ or 14pt+ bold).";
  } else if (ratio < 7) {
    result.recommendation = "Good contrast. Meets WCAG AA standards.";
  } else {
    result.recommendation = "Excellent contrast. Meets WCAG AAA standards.";
  }

  return result;
}

/**
 * Check if a color combination is safe for glass effects
 * @param foreground - Text/foreground color
 * @param glassOpacity - Opacity of the glass effect
 * @returns Whether the color is safe for glass effects
 */
function isGlassSafe(foreground: string, glassOpacity = 0.25): boolean {
  // Test against common backgrounds
  const testBackgrounds = ["#ffffff", "#000000", "#f0f0f0", "#1a1a1a"];

  for (const bg of testBackgrounds) {
    const result = checkGlassContrast(foreground, "#ffffff", bg, glassOpacity);
    if (!result.passes.aa.normal) {
      return false;
    }
  }

  return true;
}
