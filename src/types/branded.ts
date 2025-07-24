/**
 * Branded Types for Glass UI
 * Provides compile-time type safety for specific value types
 */

// Brand utility type
declare const brand: unique symbol;
type Brand<T, TBrand> = T & { [brand]: TBrand };

/**
 * Glass Color - Ensures valid color values for glass effects
 * @example
 * const color: GlassColor = createGlassColor('#3b82f6');
 * const invalid: GlassColor = '#xyz'; // Type error
 */
export type GlassColor = Brand<string, 'GlassColor'>;

export const createGlassColor = (color: string): GlassColor => {
  if (!isValidGlassColor(color)) {
    throw new Error(`Invalid glass color: ${color}`);
  }
  return color as GlassColor;
};

export function isValidGlassColor(color: string): boolean {
  // Valid formats: hex, rgb, rgba, hsl, hsla
  const patterns = [
    /^#[0-9A-Fa-f]{3}$/, // #RGB
    /^#[0-9A-Fa-f]{6}$/, // #RRGGBB
    /^#[0-9A-Fa-f]{8}$/, // #RRGGBBAA
    /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
    /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/,
    /^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/,
    /^hsla\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*,\s*[\d.]+\s*\)$/,
  ];

  return patterns.some((pattern) => pattern.test(color));
}

/**
 * Accessible Contrast - Ensures WCAG-compliant contrast ratios
 * @example
 * const ratio: AccessibleContrast = createAccessibleContrast(4.5);
 * const invalid: AccessibleContrast = createAccessibleContrast(1.5); // Throws error
 */
export type AccessibleContrast = Brand<number, 'AccessibleContrast'>;

export const createAccessibleContrast = (ratio: number): AccessibleContrast => {
  if (!isValidContrastRatio(ratio)) {
    throw new Error(
      `Contrast ratio ${ratio} does not meet WCAG standards. Minimum is 3:1`
    );
  }
  return ratio as AccessibleContrast;
};

export function isValidContrastRatio(ratio: number): boolean {
  // WCAG AA standards: 4.5:1 for normal text, 3:1 for large text
  return 3 <= ratio;
}

/**
 * Glass Opacity - Ensures valid opacity values for glass effects
 * @example
 * const opacity: GlassOpacity = createGlassOpacity(0.25);
 * const invalid: GlassOpacity = createGlassOpacity(1.5); // Throws error
 */
export type GlassOpacity = Brand<number, 'GlassOpacity'>;

export const createGlassOpacity = (opacity: number): GlassOpacity => {
  if (0 > opacity || 1 < opacity) {
    throw new Error(`Opacity must be between 0 and 1, got ${opacity}`);
  }
  return opacity as GlassOpacity;
};

/**
 * Glass Blur - Ensures valid blur values for backdrop filters
 * @example
 * const blur: GlassBlur = createGlassBlur(16);
 * const invalid: GlassBlur = createGlassBlur(-5); // Throws error
 */
export type GlassBlur = Brand<number, 'GlassBlur'>;

export const createGlassBlur = (pixels: number): GlassBlur => {
  if (0 > pixels || 100 < pixels) {
    throw new Error(`Blur must be between 0 and 100 pixels, got ${pixels}`);
  }
  return pixels as GlassBlur;
};

/**
 * CSS Unit - Type-safe CSS unit values
 * @example
 * const width: CSSUnit = createCSSUnit('100px');
 * const height: CSSUnit = createCSSUnit('50%');
 * const invalid: CSSUnit = createCSSUnit('invalid'); // Throws error
 */
export type CSSUnit = Brand<string, 'CSSUnit'>;

export const createCSSUnit = (value: string): CSSUnit => {
  if (!isValidCSSUnit(value)) {
    throw new Error(`Invalid CSS unit: ${value}`);
  }
  return value as CSSUnit;
};

export function isValidCSSUnit(value: string): boolean {
  const pattern =
    /^-?\d*\.?\d+(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/;
  return pattern.test(value) || '0' === value || 'auto' === value;
}

/**
 * Animation Duration - Type-safe animation duration
 * @example
 * const duration: AnimationDuration = createAnimationDuration(300);
 * const invalid: AnimationDuration = createAnimationDuration(-100); // Throws error
 */
export type AnimationDuration = Brand<number, 'AnimationDuration'>;

export const createAnimationDuration = (ms: number): AnimationDuration => {
  if (0 > ms || 10_000 < ms) {
    throw new Error(
      `Animation duration must be between 0 and 10000ms, got ${ms}`
    );
  }
  return ms as AnimationDuration;
};

/**
 * Z-Index - Type-safe z-index values
 * @example
 * const zIndex: ZIndex = createZIndex(100);
 * const invalid: ZIndex = createZIndex(10000); // Throws error (too high)
 */
export type ZIndex = Brand<number, 'ZIndex'>;

export const createZIndex = (value: number): ZIndex => {
  if (-999 > value || 9999 < value) {
    throw new Error(`Z-index should be between -999 and 9999, got ${value}`);
  }
  return value as ZIndex;
};

/**
 * Theme Name - Type-safe theme names
 * @example
 * const theme: ThemeName = createThemeName('dark');
 * const invalid: ThemeName = createThemeName('random'); // Throws error
 */
export type ThemeName = Brand<string, 'ThemeName'>;

const VALID_THEMES = [
  'light',
  'dark',
  'auto',
  'ocean',
  'forest',
  'sunset',
] as const;

export const createThemeName = (name: string): ThemeName => {
  if (!VALID_THEMES.includes(name as any)) {
    throw new Error(
      `Invalid theme name: ${name}. Valid themes: ${VALID_THEMES.join(', ')}`
    );
  }
  return name as ThemeName;
};

/**
 * Component Size - Type-safe component sizes
 * @example
 * const size: ComponentSize = createComponentSize('md');
 * const invalid: ComponentSize = createComponentSize('huge'); // Throws error
 */
export type ComponentSize = Brand<string, 'ComponentSize'>;

const VALID_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const createComponentSize = (size: string): ComponentSize => {
  if (!VALID_SIZES.includes(size as any)) {
    throw new Error(
      `Invalid component size: ${size}. Valid sizes: ${VALID_SIZES.join(', ')}`
    );
  }
  return size as ComponentSize;
};

/**
 * Type guards for branded types
 */
export const isBrandedType = {
  isGlassColor: (value: unknown): value is GlassColor =>
    'string' === typeof value && isValidGlassColor(value),

  isAccessibleContrast: (value: unknown): value is AccessibleContrast =>
    'number' === typeof value && isValidContrastRatio(value),

  isGlassOpacity: (value: unknown): value is GlassOpacity =>
    'number' === typeof value && 0 <= value && 1 >= value,

  isGlassBlur: (value: unknown): value is GlassBlur =>
    'number' === typeof value && 0 <= value && 100 >= value,

  isCSSUnit: (value: unknown): value is CSSUnit =>
    'string' === typeof value && isValidCSSUnit(value),

  isAnimationDuration: (value: unknown): value is AnimationDuration =>
    'number' === typeof value && 0 <= value && 10_000 >= value,

  isZIndex: (value: unknown): value is ZIndex =>
    'number' === typeof value && -999 <= value && 9999 >= value,

  isThemeName: (value: unknown): value is ThemeName =>
    'string' === typeof value && VALID_THEMES.includes(value as any),

  isComponentSize: (value: unknown): value is ComponentSize =>
    'string' === typeof value && VALID_SIZES.includes(value as any),
};

/**
 * Utility functions for working with branded types
 */
export const brandedUtils = {
  /**
   * Parse color and return branded type if valid
   */
  parseColor: (color: string): GlassColor | null => {
    try {
      return createGlassColor(color);
    } catch {
      return null;
    }
  },

  /**
   * Calculate and validate contrast ratio
   */
  calculateContrast: (
    _fg: GlassColor,
    _bg: GlassColor
  ): AccessibleContrast | null => {
    // This would integrate with the contrast checker utility
    // For now, return a mock implementation
    const mockRatio = 4.5;
    try {
      return createAccessibleContrast(mockRatio);
    } catch {
      return null;
    }
  },

  /**
   * Combine opacity values safely
   */
  combineOpacity: (a: GlassOpacity, b: GlassOpacity): GlassOpacity => {
    const combined = (a as number) * (b as number);
    return createGlassOpacity(combined);
  },

  /**
   * Scale blur value
   */
  scaleBlur: (blur: GlassBlur, scale: number): GlassBlur => {
    const scaled = Math.min(100, Math.max(0, (blur as number) * scale));
    return createGlassBlur(scaled);
  },
};
