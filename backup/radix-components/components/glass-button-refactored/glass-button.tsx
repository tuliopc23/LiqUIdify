/**
 * Glass Button Component
 *
 * A simple button component with basic styling.
 */

import { Slot } from "@radix-ui/react-slot";
import type React from "react";
import { forwardRef, useState } from "react";
import { cn } from "../../core/utils/classname";

// Types
type Size = "sm" | "md" | "lg" | "xl";
type Variant = "primary" | "secondary" | "ghost" | "destructive";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

// Size configurations
const sizeConfig = {
  sm: {
    base: "text-sm px-4 py-2 rounded-md",
    iconSize: "w-4 h-4",
  },
  md: {
    base: "text-base px-6 py-3 rounded-md",
    iconSize: "w-5 h-5",
  },
  lg: {
    base: "text-lg px-8 py-4 rounded-md",
    iconSize: "w-6 h-6",
  },
  xl: {
    base: "text-xl px-10 py-5 rounded-lg",
    iconSize: "w-7 h-7",
  },
};

// Variant configurations
const variantConfig: Record<
  Variant,
  {
    text: string;
    customClass?: string;
  }
> = {
  primary: {
    text: "text-white font-semibold",
    customClass: "bg-blue-600 hover:bg-blue-700",
  },
  secondary: {
    text: "text-blue-900 font-medium",
    customClass: "bg-blue-200 hover:bg-blue-300",
  },
  ghost: {
    text: "text-blue-700 font-medium",
    customClass: "hover:bg-blue-100",
  },
  destructive: {
    text: "text-white font-semibold",
    customClass: "bg-red-600 hover:bg-red-700",
  },
};

// Loading spinner component
const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg className={cn("animate-spin", className)} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
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
    ref
  ) => {
    const [_isHovered, setIsHovered] = useState(false);
    const [_isActive, setIsActive] = useState(false);
    const [_isFocused, setIsFocused] = useState(false);

    const sizeStyles = sizeConfig[size];
    const variantStyles = variantConfig[variant];

    // Use variant styles

    const buttonClasses = cn(
      // Size and text styles
      sizeStyles.base,
      variantStyles.text,
      variantStyles.customClass,

      // Layout styles
      "inline-flex items-center justify-center gap-2",
      "font-medium select-none outline-none border",
      "transition-all duration-200",

      // State styles
      {
        "w-full": fullWidth,
        "aspect-square p-0": iconOnly,
        "opacity-50 cursor-not-allowed pointer-events-none": disabled || loading,
      },

      className
    );

    const content = (
      <>
        {loading && <LoadingSpinner className={cn(sizeStyles.iconSize, "mr-1")} />}
        {!loading && leftIcon && (
          <span className={cn("flex-shrink-0", sizeStyles.iconSize)}>{leftIcon}</span>
        )}
        {(children || loadingText) && (
          <span className={loading ? "opacity-75" : ""}>
            {loading && loadingText ? loadingText : children}
          </span>
        )}
        {!loading && rightIcon && (
          <span className={cn("flex-shrink-0", sizeStyles.iconSize)}>{rightIcon}</span>
        )}
      </>
    );

    if (asChild) {
      // When rendering asChild, forward to child
      return (
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
      );
    }

    return (
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
    );
  }
);

GlassButton.displayName = "GlassButton";

// Export types for external use
export type { GlassButtonProps, Size as ButtonSize, Variant as ButtonVariant };
export default GlassButton;
