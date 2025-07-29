/**
 * Enhanced TypeScript Types
 *
 * Provides advanced type safety features:
 * - Branded types for type safety
 * - Discriminated unions for state management
 * - Utility types for common patterns
 * - Strict typing for component props
 */

import type { ComponentProps, ElementType, ReactNode } from "react";

// ==============================
// Branded Types
// ==============================

/**
 * Creates a branded type for enhanced type safety
 */
export type Brand<K, T> = K & { __brand: T };

// Color types
export type GlassColor = Brand<string, "GlassColor">;
export type AccessibleContrast = Brand<number, "AccessibleContrast">;
export type CSSVariable = Brand<string, "CSSVariable">;
export type HexColor = Brand<string, "HexColor">;
export type RGBColor = Brand<string, "RGBColor">;
export type HSLColor = Brand<string, "HSLColor">;

// Size types
export type Spacing = Brand<number, "Spacing">;
export type Radius = Brand<number, "Radius">;
export type FontSize = Brand<number, "FontSize">;
export type LineHeight = Brand<number, "LineHeight">;

// ID types
export type ComponentId = Brand<string, "ComponentId">;
export type AnimationId = Brand<string, "AnimationId">;
export type ThemeId = Brand<string, "ThemeId">;

// Type guards for branded types
export const isGlassColor = (value: unknown): value is GlassColor => {
  return (
    typeof value === "string" && /^(#|rgb|hsl|var\()/.test(value as string)
  );
};

export const isHexColor = (value: unknown): value is HexColor => {
  return (
    typeof value === "string" && /^#([\da-f]{3}){1,2}$/i.test(value as string)
  );
};

export const isCSSVariable = (value: unknown): value is CSSVariable => {
  return typeof value === "string" && /^var\(--[\w-]+\)$/.test(value as string);
};

// Type constructors for branded types
export const createGlassColor = (value: string): GlassColor => {
  if (!isGlassColor(value)) {
    throw new Error(`Invalid glass color: ${value}`);
  }
  return value as GlassColor;
};

export const createHexColor = (value: string): HexColor => {
  if (!isHexColor(value)) {
    throw new Error(`Invalid hex color: ${value}`);
  }
  return value as HexColor;
};

export const createCSSVariable = (value: string): CSSVariable => {
  if (!isCSSVariable(value)) {
    throw new Error(`Invalid CSS variable: ${value}`);
  }
  return value as CSSVariable;
};

// ==============================
// Discriminated Unions
// ==============================

/**
 * Component state with discriminated union for type-safe state handling
 */
export type ComponentState<T = unknown> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

/**
 * Animation state with discriminated union
 */
export type AnimationState =
  | { status: "initial" }
  | { status: "running"; progress: number }
  | { status: "paused"; progress: number }
  | { status: "finished" }
  | { status: "cancelled" };

/**
 * Form field state with discriminated union
 */
export type FormFieldState<T = string> =
  | { status: "untouched"; value: T }
  | { status: "touched"; value: T }
  | { status: "valid"; value: T }
  | { status: "invalid"; value: T; errors: Array<string> };

/**
 * Network request state with discriminated union
 */
export type RequestState<T = unknown> =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; data: T; timestamp: number }
  | { status: "error"; error: Error; timestamp: number }
  | { status: "cancelled"; timestamp: number };

// ==============================
// Polymorphic Component Types
// ==============================

/**
 * Polymorphic component type that correctly handles the 'as' prop
 */
export type PolymorphicRef<C extends ElementType> = ComponentProps<C>["ref"];

export type PolymorphicComponentProps<C extends ElementType, Props = {}> = {
  as?: C;
  ref?: PolymorphicRef<C>;
} & Props &
  Omit<ComponentProps<C>, "as" | "ref" | keyof Props>;

export interface PolymorphicComponent<
  DefaultElement extends ElementType,
  Props = {},
> {
  <C extends ElementType = DefaultElement>(
    props: PolymorphicComponentProps<C, Props>,
  ): ReactNode;
  displayName?: string;
}

// ==============================
// Utility Types
// ==============================

/**
 * Makes specified properties required
 */
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Makes all nested properties optional
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Makes all nested properties required
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Creates a type with only the specified keys
 */
export type PickProps<T, K extends keyof T> = Pick<T, K>;

/**
 * Creates a type with all keys except the specified ones
 */
export type OmitProps<T, K extends keyof T> = Omit<T, K>;

/**
 * Creates a type with all properties nullable
 */
export type Nullable<T> = { [P in keyof T]: T[P] | null };

/**
 * Creates a type with all properties non-nullable
 */
export type NonNullable<T> = { [P in keyof T]: NonNullable<T[P]> };

/**
 * Creates a type with readonly properties
 */
export type ReadonlyProps<T> = { readonly [P in keyof T]: T[P] };

/**
 * Creates a type with mutable properties
 */
export type MutableProps<T> = { -readonly [P in keyof T]: T[P] };

// ==============================
// Component-specific Types
// ==============================

/**
 * Glass component base props
 */
export interface GlassComponentBaseProps {
  variant?: "light" | "dark" | "colored";
  intensity?: "subtle" | "medium" | "strong" | number;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  "data-testid"?: string;
}

/**
 * Glass button props
 */
export interface GlassButtonProps extends GlassComponentBaseProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  ariaLabel?: string;
}

/**
 * Glass input props
 */
export interface GlassInputProps extends GlassComponentBaseProps {
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean | string;
  success?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  label?: string;
  labelPosition?: "top" | "left" | "inside";
}

/**
 * Glass card props
 */
export interface GlassCardProps extends GlassComponentBaseProps {
  padding?: "none" | "small" | "medium" | "large";
  elevation?: "flat" | "low" | "medium" | "high";
  interactive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  header?: ReactNode;
  footer?: ReactNode;
  bordered?: boolean;
  borderColor?: GlassColor;
  radius?: "none" | "small" | "medium" | "large" | "full";
  aspectRatio?: number | string;
  maxWidth?: string | number;
  maxHeight?: string | number;
}

/**
 * Glass modal props
 */
export interface GlassModalProps extends GlassComponentBaseProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  centered?: boolean;
  size?: "small" | "medium" | "large" | "full";
  overlayBlur?: boolean | number;
  animation?: "fade" | "scale" | "slide" | "none";
  preventScroll?: boolean;
  initialFocus?: string | React.RefObject<HTMLElement>;
  returnFocus?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Glass tabs props
 */
export interface GlassTabsProps extends GlassComponentBaseProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
  loop?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

// ==============================
// Theme Types
// ==============================

/**
 * Theme colors with branded types
 */
export interface ThemeColors {
  primary: GlassColor;
  secondary: GlassColor;
  accent: GlassColor;
  success: GlassColor;
  warning: GlassColor;
  error: GlassColor;
  info: GlassColor;
  background: {
    default: GlassColor;
    paper: GlassColor;
    glass: GlassColor;
  };
  text: {
    primary: GlassColor;
    secondary: GlassColor;
    disabled: GlassColor;
  };
  border: GlassColor;
  divider: GlassColor;
}

/**
 * Theme typography with branded types
 */
export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    xs: FontSize;
    sm: FontSize;
    md: FontSize;
    lg: FontSize;
    xl: FontSize;
    "2xl": FontSize;
    "3xl": FontSize;
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    none: LineHeight;
    tight: LineHeight;
    normal: LineHeight;
    relaxed: LineHeight;
    loose: LineHeight;
  };
}

/**
 * Theme spacing with branded types
 */
export interface ThemeSpacing {
  xs: Spacing;
  sm: Spacing;
  md: Spacing;
  lg: Spacing;
  xl: Spacing;
  "2xl": Spacing;
  "3xl": Spacing;
}

/**
 * Theme radii with branded types
 */
export interface ThemeRadii {
  none: Radius;
  sm: Radius;
  md: Radius;
  lg: Radius;
  xl: Radius;
  full: Radius;
}

/**
 * Complete theme type
 */
export interface Theme {
  id: ThemeId;
  name: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  zIndices: {
    base: number;
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
  transitions: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
      spring: string;
    };
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Export all types
export const enhancedTypes = {
  createGlassColor,
  createHexColor,
  createCSSVariable,
  isGlassColor,
  isHexColor,
  isCSSVariable,
};
