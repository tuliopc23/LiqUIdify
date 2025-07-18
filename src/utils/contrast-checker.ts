/**
 * WCAG 2.1 Contrast Checker Utility
 * Ensures text and background color combinations meet accessibility standards
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ContrastResult {
  ratio: number;
  passes: {
    aa: {
      normal: boolean;
      large: boolean;
    };
    aaa: {
      normal: boolean;
      large: boolean;
    };
  };
  recommendation: string;
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1] || '0', 16),
        g: parseInt(result[2] || '0', 16),
        b: parseInt(result[3] || '0', 16),
      }
    : null;
}

/**
 * Convert RGB color to hex
 */
export function rgbToHex(rgb: RGB): string {
  return `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b)
    .toString(16)
    .slice(1)}`;
}

/**
 * Parse CSS color string to RGB
 */
export function parseColor(color: string): RGB | null {
  // Handle hex colors
  if (color.startsWith('#')) {
    return hexToRgb(color);
  }

  // Handle rgb/rgba colors
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1] || '0', 10),
      g: parseInt(rgbMatch[2] || '0', 10),
      b: parseInt(rgbMatch[3] || '0', 10),
    };
  }

  // Handle named colors (simplified - in production, use a full color map)
  const namedColors: Record<string, string> = {
    white: '#ffffff',
    black: '#000000',
    red: '#ff0000',
    green: '#008000',
    blue: '#0000ff',
    // Add more as needed
  };

  const lowerColor = color.toLowerCase();
  if (namedColors[lowerColor]) {
    return hexToRgb(namedColors[lowerColor] || '');
  }

  return null;
}

/**
 * Calculate relative luminance
 * Based on WCAG 2.1 formula
 */
export function getLuminance(rgb: RGB): number {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r =
    rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g =
    gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b =
    bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: RGB, color2: RGB): number {
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
  foreground: string | RGB,
  background: string | RGB
): ContrastResult {
  const fg =
    typeof foreground === 'string' ? parseColor(foreground) : foreground;
  const bg =
    typeof background === 'string' ? parseColor(background) : background;

  if (!fg || !bg) {
    throw new Error('Invalid color format');
  }

  const ratio = getContrastRatio(fg, bg);

  const result: ContrastResult = {
    ratio: Math.round(ratio * 100) / 100,
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
    recommendation: '',
  };

  // Generate recommendation
  if (result.passes.aaa.normal) {
    result.recommendation = 'Excellent contrast for all text sizes';
  } else if (result.passes.aa.normal) {
    result.recommendation = 'Good contrast for normal text';
  } else if (result.passes.aa.large) {
    result.recommendation =
      'Acceptable only for large text (18pt+ or 14pt+ bold)';
  } else {
    result.recommendation = 'Poor contrast - does not meet WCAG standards';
  }

  return result;
}

/**
 * Suggest a better color for improved contrast
 */
export function suggestBetterColor(
  foreground: string | RGB,
  background: string | RGB,
  targetRatio: number = 4.5
): RGB {
  const fg =
    typeof foreground === 'string' ? parseColor(foreground) : foreground;
  const bg =
    typeof background === 'string' ? parseColor(background) : background;

  if (!fg || !bg) {
    throw new Error('Invalid color format');
  }

  const currentRatio = getContrastRatio(fg, bg);

  if (currentRatio >= targetRatio) {
    return fg; // Already meets target
  }

  // Determine if we should lighten or darken the foreground
  const bgLuminance = getLuminance(bg);
  const shouldLighten = bgLuminance < 0.5;

  let adjustedColor = { ...fg };
  let step = shouldLighten ? 1 : -1;
  let iterations = 0;
  const maxIterations = 255;

  while (
    getContrastRatio(adjustedColor, bg) < targetRatio &&
    iterations < maxIterations
  ) {
    adjustedColor.r = Math.max(0, Math.min(255, adjustedColor.r + step));
    adjustedColor.g = Math.max(0, Math.min(255, adjustedColor.g + step));
    adjustedColor.b = Math.max(0, Math.min(255, adjustedColor.b + step));
    iterations++;

    // If we've maxed out, try the opposite direction
    if (
      (shouldLighten &&
        adjustedColor.r === 255 &&
        adjustedColor.g === 255 &&
        adjustedColor.b === 255) ||
      (!shouldLighten &&
        adjustedColor.r === 0 &&
        adjustedColor.g === 0 &&
        adjustedColor.b === 0)
    ) {
      step = -step;
      adjustedColor = { ...fg };
    }
  }

  return adjustedColor;
}

/**
 * Check contrast for glass morphism effects
 */
export function checkGlassContrast(
  foreground: string | RGB,
  glassBackground: string | RGB,
  backdropBackground: string | RGB,
  glassOpacity: number = 0.25
): ContrastResult {
  const fg =
    typeof foreground === 'string' ? parseColor(foreground) : foreground;
  const glassBg =
    typeof glassBackground === 'string'
      ? parseColor(glassBackground)
      : glassBackground;
  const backdropBg =
    typeof backdropBackground === 'string'
      ? parseColor(backdropBackground)
      : backdropBackground;

  if (!fg || !glassBg || !backdropBg) {
    throw new Error('Invalid color format');
  }

  // Calculate effective background color after glass effect
  const effectiveBg: RGB = {
    r: Math.round(glassBg.r * glassOpacity + backdropBg.r * (1 - glassOpacity)),
    g: Math.round(glassBg.g * glassOpacity + backdropBg.g * (1 - glassOpacity)),
    b: Math.round(glassBg.b * glassOpacity + backdropBg.b * (1 - glassOpacity)),
  };

  return checkContrast(fg, effectiveBg);
}

/**
 * React hook for checking contrast
 */
export function useContrastChecker(
  foreground: string,
  background: string
): ContrastResult | null {
  try {
    return checkContrast(foreground, background);
  } catch (error) {
    console.error('Contrast check error:', error);
    return null;
  }
}

/**
 * Get contrast ratio as a formatted string
 */
export function formatContrastRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/**
 * Check if a color combination is safe for glass morphism
 */
export function isGlassSafe(
  foreground: string,
  glassOpacity: number = 0.25
): boolean {
  // Check against common backdrop colors
  const commonBackdrops = [
    '#ffffff', // White
    '#000000', // Black
    '#f3f4f6', // Light gray
    '#1f2937', // Dark gray
  ];

  return commonBackdrops.every(backdrop => {
    try {
      const result = checkGlassContrast(
        foreground,
        '#ffffff',
        backdrop,
        glassOpacity
      );
      return result.passes.aa.normal;
    } catch {
      return false;
    }
  });
}
