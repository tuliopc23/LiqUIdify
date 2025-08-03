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

export const createVariants = <
  T extends Record<string, Record<string, string>>,
>(
  variants: T,
) => {
  return (props: VariantProps<T>) => {
    const classes: string[] = [];

    for (const [key, value] of Object.entries(props)) {
      if (value && variants[key] && variants[key][value as string]) {
        classes.push(variants[key][value as string]);
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
