/**
 * @file Glass UI Type Utilities
 * @module glass-ui/types
 *
 * Advanced TypeScript utilities and types for Glass UI components
 * providing type safety, developer experience, and runtime validation.
 */

import type { CSSProperties } from 'react';
import type {
  AnimationDuration,
  GlassBlur,
  GlassColor,
  GlassOpacity,
  ThemeName,
} from './branded';
import { createGlassBlur, createGlassOpacity } from './branded';

/**
 * Deep partial utility type
 * @example
 * ```ts
 * type Config = { a: { b: { c: string } } };
 * type PartialConfig = DeepPartial<Config>;
 * // { a?: { b?: { c?: string } } }
 * ```
 */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/**
 * Deep readonly utility type
 * @example
 * ```ts
 * type MutableConfig = { a: { b: string[] } };
 * type ImmutableConfig = DeepReadonly<MutableConfig>;
 * // { readonly a: { readonly b: readonly string[] } }
 * ```
 */
export type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

/**
 * Extract string literal types
 * @example
 * ```ts
 * type Theme = 'light' | 'dark' | 'auto';
 * type OnlyStrings = StringLiterals<Theme | number | boolean>;
 * // 'light' | 'dark' | 'auto'
 * ```
 */
export type StringLiterals<T> = T extends string ? T : never;

/**
 * Require at least one property from a type
 * @example
 * ```ts
 * type Options = RequireAtLeastOne<{
 *   id?: string;
 *   name?: string;
 *   email?: string;
 * }>;
 * // Must provide at least one of id, name, or email
 * ```
 */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

/**
 * Require exactly one property from a type
 * @example
 * ```ts
 * type Auth = RequireExactlyOne<{
 *   token?: string;
 *   apiKey?: string;
 *   password?: string;
 * }>;
 * // Must provide exactly one auth method
 * ```
 */
export type RequireExactlyOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];

/**
 * Glass UI Component Base Props
 * Common props shared by all Glass UI components
 */
export interface GlassUIBaseProps {
  /** Additional CSS class names */
  className?: string;

  /** Inline styles */
  style?: CSSProperties;

  /** Glass effect intensity */
  glassIntensity?: 'weak' | 'medium' | 'strong';

  /** Disable glass effects */
  disableGlass?: boolean;

  /** Theme override */
  theme?: ThemeName;

  /** Test ID for testing */
  testId?: string;

  /** Accessibility label */
  'aria-label'?: string;

  /** Accessibility description */
  'aria-describedby'?: string;
}

/**
 * Interactive component props
 * Props for components that handle user interaction
 */
export interface GlassUIInteractiveProps extends GlassUIBaseProps {
  /** Disabled state */
  disabled?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Loading text */
  loadingText?: string;

  /** Focus visible state */
  focusVisible?: boolean;

  /** Keyboard navigation */
  tabIndex?: number;
}

/**
 * Form component props
 * Props for form-related components
 */
export interface GlassUIFormProps<T = string> extends GlassUIInteractiveProps {
  /** Field name */
  name?: string;

  /** Field value */
  value?: T;

  /** Default value */
  defaultValue?: T;

  /** Change handler */
  onChange?: (value: T) => void;

  /** Blur handler */
  onBlur?: () => void;

  /** Focus handler */
  onFocus?: () => void;

  /** Validation error */
  error?: string | boolean;

  /** Required field */
  required?: boolean;

  /** Read-only field */
  readOnly?: boolean;
}

/**
 * Glass effect configuration
 * Detailed configuration for glass morphism effects
 */
export interface GlassEffectConfig {
  /** Background opacity */
  opacity: GlassOpacity;

  /** Blur amount */
  blur: GlassBlur;

  /** Saturation level */
  saturation?: number;

  /** Border configuration */
  border?: {
    color: GlassColor;
    width?: number;
    glow?: boolean;
  };

  /** Shadow configuration */
  shadow?: {
    color: GlassColor;
    blur?: number;
    spread?: number;
    x?: number;
    y?: number;
  };

  /** Animation configuration */
  animation?: {
    duration: AnimationDuration;
    easing?: string;
    delay?: number;
  };
}

/**
 * Component style variants
 * Consistent style variant definitions
 */
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'outline'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info';

/**
 * Component sizes
 * Consistent size definitions
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Animation states
 * Common animation state types
 */
export type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

/**
 * Layout direction
 */
export type Direction = 'horizontal' | 'vertical';

/**
 * Alignment options
 */
export type Alignment = 'start' | 'center' | 'end' | 'stretch';

/**
 * Justification options
 */
export type Justification =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

/**
 * Responsive prop utility
 * @example
 * ```ts
 * type ResponsiveSize = Responsive<ComponentSize>;
 * // ComponentSize | { sm?: ComponentSize; md?: ComponentSize; lg?: ComponentSize; xl?: ComponentSize }
 * ```
 */
export type Responsive<T> =
  | T
  | {
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
    };

/**
 * CSS variable generator for Glass UI
 * Type-safe CSS custom properties
 */
export interface GlassCSSVariables {
  '--glass-bg': GlassColor;
  '--glass-border': GlassColor;
  '--glass-blur': string;
  '--glass-opacity': number;
  '--glass-saturation': string;
  '--glass-shadow': string;
  '--glass-transition': string;
}

/**
 * Type guard utilities
 */
export const typeGuards = {
  /**
   * Check if value is a valid component variant
   */
  isComponentVariant: (value: unknown): value is ComponentVariant => {
    const variants: ComponentVariant[] = [
      'primary',
      'secondary',
      'tertiary',
      'ghost',
      'outline',
      'destructive',
      'success',
      'warning',
      'info',
    ];
    return (
      'string' === typeof value && variants.includes(value as ComponentVariant)
    );
  },

  /**
   * Check if value is a valid component size
   */
  isComponentSize: (value: unknown): value is ComponentSize => {
    const sizes: ComponentSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    return 'string' === typeof value && sizes.includes(value as ComponentSize);
  },

  /**
   * Check if value is a responsive prop
   */
  isResponsiveProp: <T>(value: unknown): value is Responsive<T> => {
    if ('object' === typeof value && null !== value) {
      const keys = Object.keys(value);
      const validKeys = ['sm', 'md', 'lg', 'xl'];
      return keys.every(key => validKeys.includes(key));
    }
    return true; // Non-object values are valid (non-responsive)
  },

  /**
   * Check if value has glass effect config
   */
  hasGlassEffect: (
    value: unknown
  ): value is { glassEffect: GlassEffectConfig } => {
    return (
      'object' === typeof value &&
      null !== value &&
      'glassEffect' in value &&
      'object' === typeof (value as any).glassEffect
    );
  },
};

/**
 * Prop validation utilities
 */
export const propValidators = {
  /**
   * Validate glass effect configuration
   */
  validateGlassEffect: (config: Partial<GlassEffectConfig>): string[] => {
    const errors: string[] = [];

    if (config.opacity !== undefined) {
      try {
        createGlassOpacity(config.opacity as number);
      } catch {
        errors.push(`Invalid opacity: ${config.opacity}`);
      }
    }

    if (config.blur !== undefined) {
      try {
        createGlassBlur(config.blur as number);
      } catch {
        errors.push(`Invalid blur: ${config.blur}`);
      }
    }

    return errors;
  },

  /**
   * Validate responsive prop
   */
  validateResponsiveProp: <T>(
    prop: Responsive<T>,
    validator: (value: T) => boolean
  ): boolean => {
    if ('object' === typeof prop && null !== prop) {
      return Object.values(prop).every(
        value => value === undefined || validator(value as T)
      );
    }
    return validator(prop as T);
  },
};

/**
 * Style generation utilities
 */
export const styleGenerators = {
  /**
   * Generate CSS variables for glass effect
   */
  generateGlassVariables: (
    config: Partial<GlassEffectConfig>
  ): Partial<GlassCSSVariables> => {
    const vars: Partial<GlassCSSVariables> = {};

    if (config.opacity) {
      vars['--glass-opacity'] = config.opacity as number;
    }

    if (config.blur) {
      vars['--glass-blur'] = `blur(${config.blur}px)`;
    }

    if (config.saturation) {
      vars['--glass-saturation'] = `saturate(${config.saturation}%)`;
    }

    return vars;
  },

  /**
   * Generate responsive styles
   */
  generateResponsiveStyles: <T>(
    prop: Responsive<T>,
    generator: (value: T) => CSSProperties
  ): CSSProperties => {
    if ('object' === typeof prop && null !== prop) {
      // This would typically integrate with a CSS-in-JS solution
      // For now, return base styles
      const baseValue = (prop as any).sm || (prop as any).md;
      return baseValue ? generator(baseValue) : {};
    }
    return generator(prop as T);
  },
};

/**
 * Type for props that can be made responsive
 */
export type ResponsiveProps<T> = {
  [K in keyof T]: T[K] | Responsive<T[K]>;
};

/**
 * Utility to create responsive prop types
 * @example
 * ```ts
 * interface ButtonProps {
 *   size: ComponentSize;
 *   variant: ComponentVariant;
 * }
 *
 * type ResponsiveButtonProps = MakeResponsive<ButtonProps, 'size'>;
 * // { size: ComponentSize | Responsive<ComponentSize>; variant: ComponentVariant; }
 * ```
 */
export type MakeResponsive<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Responsive<T[P]>;
};
