/**
 * Variant System for LiqUIdify Components
 *
 * Centralized variant management using Panda CSS patterns and tokens
 */

import { cx } from "../../../../styled-system/css";

type VariantProps<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown>
    ? keyof T[K]
    : T[K] extends readonly (infer U)[]
      ? U
      : never;
};

// Alias for backward compatibility
export type InferVariantProps<T> = VariantProps<T>;

interface _ComponentVariants {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  size?: "sm" | "md" | "lg" | "xl";
  intent?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
}

// More flexible variant config type
type VariantConfig = Record<string, unknown>;

export const createVariants = <T extends VariantConfig>(
  config: T & { base?: string | string[]; defaults?: Partial<VariantProps<T>> },
) => {
  return (props?: VariantProps<T>) => {
    const classes: string[] = [];

    // Add base classes if defined
    if (config.base) {
      if (Array.isArray(config.base)) {
        classes.push(...config.base);
      } else {
        classes.push(config.base);
      }
    }

    // Merge with defaults
    const finalProps = { ...config.defaults, ...props };

    // Process each variant
    for (const [key, value] of Object.entries(finalProps)) {
      if (value !== undefined && value !== null && config[key]) {
        const variantValue = config[key];

        // Handle different variant structures
        if (typeof variantValue === "object" && !Array.isArray(variantValue)) {
          // It's a variant map
          const classValue = variantValue[value as string];
          if (classValue) {
            if (Array.isArray(classValue)) {
              classes.push(...(classValue as string[]));
            } else if (typeof classValue === "object") {
              // Handle compound variants
              if (classValue.class) {
                classes.push(classValue.class as string);
              }
            } else {
              classes.push(classValue as string);
            }
          }
        } else if (typeof variantValue === "string") {
          // Direct string value
          if (value === true) {
            classes.push(variantValue);
          }
        }
      }
    }

    return cx(...classes);
  };
};

const _glassVariants = createVariants({
  variant: {
    default: "glass-surface",
    primary: "glass-surface",
    secondary: "glass-surface",
    destructive: "glass-surface",
    outline: "glass-surface",
    ghost: "glass-surface",
    link: "glass-surface",
  },
  size: {
    sm: "",
    md: "",
    lg: "",
    xl: "",
  },
  intensity: {
    subtle: "",
    medium: "",
    strong: "",
    extreme: "",
  },
  blur: {
    none: "",
    sm: "",
    md: "",
    lg: "",
    xl: "",
  },
});
