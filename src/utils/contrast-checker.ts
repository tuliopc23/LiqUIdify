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
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : undefined;
}

/**
 * Calculate relative luminance of a color
 */
export function getLuminance(rgb: ColorRGB): number {
  const { r, g, b } = rgb;

  const [rs, gs, bs] = [r, g, b].map(c => {
    const sRGB = c / 255;
    return 0.039_28 >= sRGB
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
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
    normalText: 4.5 <= ratio, // AA standard for normal text
    largeText: 3 <= ratio, // AA standard for large text (18pt+ or 14pt+ bold)
    uiComponents: 3 <= ratio, // AA standard for UI components
  };

  let level: ContrastResult['level'];
  if (7 <= ratio) {
    level = 'AAA';
  } else if (4.5 <= ratio) {
    level = 'AA';
  } else if (3 <= ratio) {
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
  targetRatio: number = 4.5
): string[] {
  const baseRgb = hexToRgb(baseColor);
  if (!baseRgb) {
    return [];
  }

  const suggestions: string[] = [];

  // Generate lighter and darker variations
  for (let i = 0; 255 >= i; i += 15) {
    const lightColor = { r: i, g: i, b: i };
    const darkColor = { r: 255 - i, g: 255 - i, b: 255 - i };

    if (getContrastRatio(baseRgb, lightColor) >= targetRatio) {
      suggestions.push(`#${i.toString(16).padStart(2, '0').repeat(3)}`);
    }

    if (getContrastRatio(baseRgb, darkColor) >= targetRatio) {
      const hex = (255 - i).toString(16).padStart(2, '0');
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
  return 0.5 < luminance;
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
): Record<string, ContrastResult[]> {
  const results: Record<string, ContrastResult[]> = {};

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
