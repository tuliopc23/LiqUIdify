/**
 * Liquid Glass Button Component
 *
 * Fully integrated with the LiquidGlass system for adaptive rendering,
 * device capability detection, and enhanced visual effects.
 */

import { Slot } from "@radix-ui/react-slot";
import React, { forwardRef, useState } from "react";
import { cn } from "../../core/utils/classname";
import { LiquidGlass } from "../liquid-glass/liquid-glass";
import { useLiquidGlass } from "../../utils/liquid-glass-utils";
import type { LiquidGlassVariant } from "../../types/liquid-glass";

// Types
type Size = "sm" | "md" | "lg" | "xl";
type Variant = "primary" | "secondary" | "ghost" | "destructive";

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children?: React.ReactNode;
  /** Button variant */
  variant?: Variant;
  /** Button size */
  size?: Size;
  /** Icon to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right side */
  rightIcon?: React.ReactNode;
  /** Show loading state */
  loading?: boolean;
  /** Loading text */
  loadingText?: string;
  /** Render as child component */
  asChild?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon only button */
  iconOnly?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// Size configurations using liquid liquid-glass system
const sizeConfig = {
  sm: {
    base: "liquid-glass-sm text-sm px-4 py-2",
    iconSize: "w-4 h-4",
  },
  md: {
    base: "liquid-glass-md text-base px-6 py-3",
    iconSize: "w-5 h-5",
  },
  lg: {
    base: "liquid-glass-lg text-lg px-8 py-4",
    iconSize: "w-6 h-6",
  },
  xl: {
    base: "liquid-glass-xl text-xl px-10 py-5",
    iconSize: "w-7 h-7",
  },
};

// Variant configurations mapped to liquid glass variants
const variantConfig: Record<
  Variant,
  {
    glassVariant: LiquidGlassVariant;
    text: string;
    customClass?: string;
  }
> = {
  primary: {
    glassVariant: "solid" as LiquidGlassVariant,
    text: "text-liquid-primary font-semibold",
  },
  secondary: {
    glassVariant: "frosted" as LiquidGlassVariant,
    text: "text-liquid-primary font-medium",
  },
  ghost: {
    glassVariant: "transparent" as LiquidGlassVariant,
    text: "text-liquid-primary font-medium",
  },
  destructive: {
    glassVariant: "solid" as LiquidGlassVariant,
    text: "text-liquid-text-inverse font-semibold",
    customClass: "bg-gradient-to-b from-indigo-600 to-blue-700",
  },
};

// Loading spinner component
const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin", className)}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      asChild = false,
      fullWidth = false,
      iconOnly = false,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const sizeStyles = sizeConfig[size];
    const variantStyles = variantConfig[variant];

    // Use liquid glass hook for dynamic effects
    const { getVariant, liquidGlassProps } = useLiquidGlass({
      baseVariant: variantStyles.glassVariant,
      hoverVariant: variant === "ghost" ? "translucent" : undefined,
      activeVariant: variant === "primary" ? "iridescent" : undefined,
      disabledVariant: "outlined",
    });

    const currentVariant = getVariant({
      isHovered,
      isActive,
      isFocused,
      isDisabled: disabled || loading,
    });

    const buttonClasses = cn(
      // Size and text styles
      sizeStyles.base,
      variantStyles.text,
      variantStyles.customClass,

      // Layout styles
      "inline-flex items-center justify-center gap-2",
      "font-system select-none outline-none border-none",
      "transition-all duration-200",

      // State styles
      {
        "w-full": fullWidth,
        "aspect-square p-0": iconOnly,
        "opacity-50 cursor-not-allowed pointer-events-none":
          disabled || loading,
      },

      className,
    );

    const content = (
      <>
        {loading && (
          <LoadingSpinner className={cn(sizeStyles.iconSize, "mr-1")} />
        )}
        {!loading && leftIcon && (
          <span className={cn("flex-shrink-0", sizeStyles.iconSize)}>
            {leftIcon}
          </span>
        )}
        {(children || loadingText) && (
          <span className={loading ? "opacity-75" : ""}>
            {loading && loadingText ? loadingText : children}
          </span>
        )}
        {!loading && rightIcon && (
          <span className={cn("flex-shrink-0", sizeStyles.iconSize)}>
            {rightIcon}
          </span>
        )}
      </>
    );

    if (asChild) {
      // When rendering asChild, wrap with LiquidGlass and forward to child
      return (
        <LiquidGlass
          variant={currentVariant}
          size={size}
          elevation={variant === "primary" ? "md" : "sm"}
          blur={variant !== "ghost"}
          blurStrength="sm"
          {...liquidGlassProps}
        >
          <Slot
            className={buttonClasses}
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          >
            {children}
          </Slot>
        </LiquidGlass>
      );
    }

    return (
      <LiquidGlass
        variant={currentVariant}
        size={size}
        elevation={variant === "primary" ? "md" : "sm"}
        blur={variant !== "ghost"}
        blurStrength="sm"
        {...liquidGlassProps}
      >
        <button
          ref={ref}
          className={buttonClasses}
          disabled={disabled || loading}
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        >
          {content}
        </button>
      </LiquidGlass>
    );
  },
);

GlassButton.displayName = "GlassButton";

// Export types for external use
export type { GlassButtonProps, Size as ButtonSize, Variant as ButtonVariant };
export default GlassButton;
