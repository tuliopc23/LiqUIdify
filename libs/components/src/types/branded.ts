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
type GlassColor = Brand<string, "GlassColor">;

const createGlassColor = (color: string): GlassColor => {
 if (!isValidGlassColor(color)) {
 throw new Error(`Invalid glass color: ${color}`);
 }
 return color as GlassColor;
};

function isValidGlassColor(color: string): boolean {
 // Valid formats: hex, rgb, rgba, hsl, hsla
 const patterns = [
 /^#[\dA-Fa-f]{3}$/, // #RGB
 /^#[\dA-Fa-f]{6}$/, // #RRGGBB
 /^#[\dA-Fa-f]{8}$/, // #RRGGBBAA
 /^rgb\((?:\s*\d+\s*,){2}\s*\d+\s*\)$/,
 /^rgba\((?:\s*\d+\s*,){3}\s*[\d.]+\s*\)$/,
 /^hsl\(\s*\d+(?:\s*,\s*\d+%?){2}\s*\)$/,
 /^hsla\(\s*\d+(?:\s*,\s*\d+%?){2}\s*,\s*[\d.]+\s*\)$/,
 ];

 return patterns.some((pattern) => pattern.test(color));
}

/**
 * Accessible Contrast - Ensures WCAG-compliant contrast ratios
 * @example
 * const ratio: AccessibleContrast = createAccessibleContrast(4.5);
 * const invalid: AccessibleContrast = createAccessibleContrast(1.5); // Throws error
 */
type AccessibleContrast = Brand<number, "AccessibleContrast">;

const createAccessibleContrast = (ratio: number): AccessibleContrast => {
 if (!isValidContrastRatio(ratio)) {
 throw new Error(
 `Contrast ratio ${ratio} does not meet WCAG standards. Minimum is 3:1`,
 );
 }
 return ratio as AccessibleContrast;
};

function isValidContrastRatio(ratio: number): boolean {
 // WCAG AA standards: 4.5:1 for normal text, 3:1 for large text
 return ratio >= 3;
}

/**
 * Glass Opacity - Ensures valid opacity values for glass effects
 * @example
 * const opacity: GlassOpacity = createGlassOpacity(0.25);
 * const invalid: GlassOpacity = createGlassOpacity(1.5); // Throws error
 */
type GlassOpacity = Brand<number, "GlassOpacity">;

const createGlassOpacity = (opacity: number): GlassOpacity => {
 if (opacity < 0 || opacity > 1) {
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
type GlassBlur = Brand<number, "GlassBlur">;

const createGlassBlur = (pixels: number): GlassBlur => {
 if (pixels < 0 || pixels > 100) {
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
type CSSUnit = Brand<string, "CSSUnit">;

const _createCSSUnit = (value: string): CSSUnit => {
 if (!isValidCSSUnit(value)) {
 throw new Error(`Invalid CSS unit: ${value}`);
 }
 return value as CSSUnit;
};

function isValidCSSUnit(value: string): boolean {
 const pattern =
 /^-?\d*\.?\d+(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/;
 return pattern.test(value) || value === "0" || value === "auto";
}

/**
 * Animation Duration - Type-safe animation duration
 * @example
 * const duration: AnimationDuration = createAnimationDuration(300);
 * const invalid: AnimationDuration = createAnimationDuration(-100); // Throws error
 */
type AnimationDuration = Brand<number, "AnimationDuration">;

const _createAnimationDuration = (ms: number): AnimationDuration => {
 if (ms < 0 || ms > 10_000) {
 throw new Error(
 `Animation duration must be between 0 and 10000ms, got ${ms}`,
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
type ZIndex = Brand<number, "ZIndex">;

const _createZIndex = (value: number): ZIndex => {
 if (value < -999 || value > 9999) {
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
type ThemeName = Brand<string, "ThemeName">;

const VALID_THEMES = [
 "light",
 "dark",
 "auto",
 "ocean",
 "forest",
 "sunset",
] as const;

const _createThemeName = (name: string): ThemeName => {
 if (!VALID_THEMES.includes(name as any)) {
 throw new Error(
 `Invalid theme name: ${name}. Valid themes: ${VALID_THEMES.join(", ")}`,
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
export type ComponentSize = Brand<string, "ComponentSize">;

const VALID_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

export const createComponentSize = (size: string): ComponentSize => {
 if (!VALID_SIZES.includes(size as any)) {
 throw new Error(
 `Invalid component size: ${size}. Valid sizes: ${VALID_SIZES.join(", ")}`,
 );
 }
 return size as ComponentSize;
};

/**
 * Type guards for branded types
 */
const _isBrandedType = {
 isGlassColor: (value: unknown): value is GlassColor =>
 typeof value === "string" && isValidGlassColor(value),

 isAccessibleContrast: (value: unknown): value is AccessibleContrast =>
 typeof value === "number" && isValidContrastRatio(value),

 isGlassOpacity: (value: unknown): value is GlassOpacity =>
 typeof value === "number" && value >= 0 && value <= 1,

 isGlassBlur: (value: unknown): value is GlassBlur =>
 typeof value === "number" && value >= 0 && value <= 100,

 isCSSUnit: (value: unknown): value is CSSUnit =>
 typeof value === "string" && isValidCSSUnit(value),

 isAnimationDuration: (value: unknown): value is AnimationDuration =>
 typeof value === "number" && value >= 0 && value <= 10_000,

 isZIndex: (value: unknown): value is ZIndex =>
 typeof value === "number" && value >= -999 && value <= 9999,

 isThemeName: (value: unknown): value is ThemeName =>
 typeof value === "string" && VALID_THEMES.includes(value as any),

 isComponentSize: (value: unknown): value is ComponentSize =>
 typeof value === "string" && VALID_SIZES.includes(value as any),
};

/**
 * Utility functions for working with branded types
 */
const _brandedUtils = {
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
 _bg: GlassColor,
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
