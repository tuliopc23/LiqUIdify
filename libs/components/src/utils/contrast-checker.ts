/**
 * Contrast Checker Utility
 * WCAG-compliant color contrast checking for accessibility
 */

export interface ContrastResult {
  ratio: number;
  level: 'AAA' | 'AA' | 'A' | 'FAIL';
  passes: {
    normalText: boolean;
    largeText: boolean;
    uiComponents: boolean;
  };
}

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): ColorRGB | null {
  const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : undefined;
}

/**
 * Calculate relative luminance of a color
 */
export function getLuminance(rgb: ColorRGB): number {
  const { r, g, b } = rgb;

  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.039_28 ? sRGB / 12.92 : ((sRGB + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * (rs ?? 0) + 0.7152 * (gs ?? 0) + 0.0722 * (bs ?? 0);
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: ColorRGB, color2: ColorRGB): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 */
export function checkContrast(
  foreground: string,
  background: string
): ContrastResult {
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  if (!fgRgb || !bgRgb) {
    throw new Error('Invalid color format. Please use hex colors.');
  }

  const ratio = getContrastRatio(fgRgb, bgRgb);

  // WCAG 2.1 standards
  const passes = {
    normalText: ratio >= 4.5, // AA standard for normal text
    largeText: ratio >= 3, // AA standard for large text (18pt+ or 14pt+ bold)
    uiComponents: ratio >= 3, // AA standard for UI components
  };

  let level: ContrastResult['level'];
  if (ratio >= 7) {
    level = 'AAA';
  } else if (ratio >= 4.5) {
    level = 'AA';
  } else if (ratio >= 3) {
    level = 'A';
  } else {
    level = 'FAIL';
  }

  return {
    ratio: Math.round(ratio * 100) / 100,
    level,
    passes,
  };
}

/**
 * Get accessible color suggestions
 */
export function getAccessibleColors(
  baseColor: string,
  targetRatio = 4.5
): Array<string> {
  const baseRgb = hexToRgb(baseColor);
  if (!baseRgb) {
    return [];
  }

  const suggestions: Array<string> = [];

  // Generate lighter and darker variations
  for (let index = 0; index <= 255; index += 15) {
    const lightColor = { r: index, g: index, b: index };
    const darkColor = { r: 255 - index, g: 255 - index, b: 255 - index };

    if (getContrastRatio(baseRgb, lightColor) >= targetRatio) {
      suggestions.push(`#${index.toString(16).padStart(2, '0').repeat(3)}`);
    }

    if (getContrastRatio(baseRgb, darkColor) >= targetRatio) {
      const hex = (255 - index).toString(16).padStart(2, '0');
      suggestions.push(`#${hex.repeat(3)}`);
    }
  }

  return [...new Set(suggestions)].slice(0, 10);
}

/**
 * Check if a color is considered "light" or "dark"
 */
export function isLightColor(color: string): boolean {
  const rgb = hexToRgb(color);
  if (!rgb) {
    return false;
  }

  const luminance = getLuminance(rgb);
  return luminance > 0.5;
}

/**
 * Get the best contrasting color (black or white) for a given background
 */
export function getBestContrastColor(backgroundColor: string): string {
  const whiteContrast = checkContrast('#ffffff', backgroundColor);
  const blackContrast = checkContrast('#000000', backgroundColor);

  return whiteContrast.ratio > blackContrast.ratio ? '#ffffff' : '#000000';
}

/**
 * Validate if a color palette meets accessibility standards
 */
export function validateColorPalette(
  palette: Record<string, string>
): Record<string, Array<ContrastResult>> {
  const results: Record<string, Array<ContrastResult>> = {};

  const colors = Object.entries(palette);

  for (const [name1, color1] of colors) {
    results[name1] = [];

    for (const [name2, color2] of colors) {
      if (name1 !== name2) {
        results[name1].push({
          ...checkContrast(color1, color2),
          // Add color names for reference
          ...(name2 && { comparedWith: name2 }),
        } as ContrastResult);
      }
    }
  }

  return results;
}

// Export default checker function
export default checkContrast;
