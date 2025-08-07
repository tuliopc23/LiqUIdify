/**
 * Variant System
 *
 * Centralized variant management for LiqUIdify components
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type VariantProps<T> = {
  [K in keyof T]?: T[K] extends Record<string, any>
    ? keyof T[K]
    : T[K] extends readonly (infer U)[]
      ? U
      : never;
};

// Alias for backward compatibility
export type InferVariantProps<T> = VariantProps<T>;

export interface ComponentVariants {
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

export interface GlassVariants extends ComponentVariants {
  intensity?: "subtle" | "medium" | "strong" | "extreme";
  blur?: "none" | "sm" | "md" | "lg" | "xl";
  opacity?: number;
}

// More flexible variant config type
type VariantConfig = Record<string, any>;

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
        if (typeof variantValue === 'object' && !Array.isArray(variantValue)) {
          // It's a variant map
          const classValue = variantValue[value as string];
          if (classValue) {
            if (Array.isArray(classValue)) {
              classes.push(...classValue);
            } else if (typeof classValue === 'object') {
              // Handle compound variants
              if (classValue.class) {
                classes.push(classValue.class);
              }
            } else {
              classes.push(classValue);
            }
          }
        } else if (typeof variantValue === 'string') {
          // Direct string value
          if (value === true) {
            classes.push(variantValue);
          }
        }
      }
    }

    return cn(...classes);
  };
};

export const glassVariants = createVariants({
  variant: {
    default: "bg-white/10 border-white/20",
    primary: "bg-blue-500/10 border-blue-500/20",
    secondary: "bg-gray-500/10 border-gray-500/20",
    destructive: "bg-red-500/10 border-red-500/20",
    outline: "border-2 bg-transparent",
    ghost: "bg-transparent border-transparent hover:bg-white/5",
    link: "bg-transparent border-transparent underline-offset-4 hover:underline",
  },
  size: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
    xl: "h-14 px-8 text-xl",
  },
  intensity: {
    subtle: "backdrop-blur-sm",
    medium: "backdrop-blur-md",
    strong: "backdrop-blur-lg",
    extreme: "backdrop-blur-xl",
  },
  blur: {
    none: "backdrop-blur-none",
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  },
});

export type GlassVariantProps = VariantProps<typeof glassVariants>;
