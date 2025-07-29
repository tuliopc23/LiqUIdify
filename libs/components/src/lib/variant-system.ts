/**
 * Advanced Variant System for Glass UI
 * Type-safe component variants with better composition
 */

import { cn } from "@/core/utils/classname";

// Class variance authority (cva) alias
export { createVariants as cva };

// Re-export cn from central location
export { cn };

// Base variant configuration
export interface VariantConfig<
  T extends Record<string, Record<string, string>>,
> {
  base?: string;
  variants: T;
  compoundVariants?: Array<
    {
      [K in keyof T]?: keyof T[K];
    } & { class: string }
  >;
  defaultVariants?: {
    [K in keyof T]?: keyof T[K];
  };
}

// Create variant function type
export type VariantProps<T extends VariantConfig<unknown>> = {
  [K in keyof T["variants"]]?: keyof T["variants"][K];
} & {
  class?: string;
  className?: string;
};

// Extract config type from variant function
export type InferVariantProps<T> = T extends (props?: infer P) => unknown
  ? P
  : never;

// Enhanced variant creator with better TypeScript support
export function createVariants<
  T extends Record<string, Record<string, string>>,
>(config: VariantConfig<T>) {
  return function variants(props?: VariantProps<VariantConfig<T>>) {
    const {
      class: className,
      className: classNameProperty,
      ...variantProps
    } = props || {};

    // Start with base classes
    const classes = [config.base];

    // Add variant classes
    for (const [variantKey, variantValues] of Object.entries(config.variants)) {
      const variantValue =
        variantProps[variantKey as keyof typeof variantProps] ||
        config.defaultVariants?.[
          variantKey as keyof typeof config.defaultVariants
        ];

      if (variantValue && variantValues[variantValue as string]) {
        classes.push(variantValues[variantValue as string]);
      }
    }

    // Add compound variant classes
    if (config.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const { class: compoundClass, ...compoundVariants } = compound;

        const matches = Object.entries(compoundVariants).every(
          ([key, value]) => {
            const propertyValue =
              variantProps[key as keyof typeof variantProps] ||
              config.defaultVariants?.[
                key as keyof typeof config.defaultVariants
              ];
            return propertyValue === value;
          },
        );

        if (matches) {
          classes.push(compoundClass);
        }
      }
    }

    return cn(classes, className, classNameProperty);
  };
}

// Simple variant system for basic functionality
export const glassVariants = createVariants({
  base: "relative overflow-hidden transition-all duration-300 ease-out",
  variants: {
    variant: {
      default: "glass-effect",
      elevated: "glass-effect-elevated",
      floating: "backdrop-blur-heavy saturate-[180%]",
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Export type for TypeScript support
export type GlassVariantProps = InferVariantProps<typeof glassVariants>;
