/**
 * Refactored Glass Button Component - Tailwind Migration
 *
 * This component demonstrates the new Tailwind-based architecture with:
 * - Tailwind CSS classes with glass utilities plugin
 * - HIG-compliant corner radii (radius-lg-s/m/l)
 * - Motion-safe hover and active states
 * - Glass effects using custom Tailwind utilities
 * - Proper component composition with forwardRef
 * - Separated business logic from presentation
 */
// JSDoc documentation for the Glass Button component
/**
 * @fileoverview Glass Button Component - A premium glassmorphism button with Tailwind CSS
 * @version 2.0.0
 * @author Glass UI Team
 * @since 1.0.0
 */

import { Slot } from "@radix-ui/react-slot";
// External dependencies
import React, { forwardRef, useCallback } from "react";

// Internal dependencies
import { cn } from "../../core/utils/classname";
import {
  useGlassStateTransitions,
  useMagneticHover,
  useRippleEffect,
} from "../../hooks/use-glass-animations";

// Simple type definitions
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Variant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "destructive"
  | "apple";
type AnimationTiming = "instant" | "fast" | "normal" | "slow" | "slower";

interface GlassEffect {
  intensity?: "low" | "medium" | "high" | "ultra";
  blur?: boolean;
  backdrop?: boolean;
}

// Button-specific props
interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children?: React.ReactNode;
  /** Button variant */
  variant?: Variant;
  /** Button size */
  size?: Size;
  /** Button type */
  type?: "button" | "submit" | "reset";
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
  /** Enable magnetic hover effect */
  magnetic?: boolean;
  /** Enable ripple effect */
  ripple?: boolean;
  /** Glass effect configuration */
  glassEffect?: GlassEffect;
  /** Animation timing */
  animation?: AnimationTiming;
  /** Disable animations */
  disableAnimations?: boolean;
}

// Size class mappings using HIG-compliant radii
const SIZE_CLASSES = {
  xs: "px-3 py-1.5 text-xs radius-lg-s",
  sm: "px-4 py-2 text-sm radius-lg-s",
  md: "px-6 py-3 text-base radius-lg-m",
  lg: "px-8 py-4 text-lg radius-lg-m",
  xl: "px-10 py-5 text-xl radius-lg-l",
};

// Variant class mappings using Tailwind + glass utilities
const VARIANT_CLASSES = {
  primary: cn(
    "glass glass-button",
    "font-semibold text-glass-text",
    "bg-gradient-to-b from-blue-500/80 to-blue-600/80",
    "motion-safe:hover:from-blue-400/80 motion-safe:hover:to-blue-500/80",
    "motion-safe:active:from-blue-600/80 motion-safe:active:to-blue-600/80",
    "shadow-glass border border-blue-400/30",
    "animate-glass-hover animate-glass-press",
  ),
  secondary: cn(
    "glass glass-button",
    "text-gray-900 dark:text-white",
    "border-gray-200/30 dark:border-gray-700/30",
    "motion-safe:hover:bg-gray-50/20 dark:motion-safe:hover:bg-gray-800/20",
    "motion-safe:active:bg-gray-100/30 dark:motion-safe:active:bg-gray-700/30",
    "animate-glass-hover animate-glass-press",
  ),
  tertiary: cn(
    "glass-button bg-transparent",
    "text-gray-900 dark:text-white",
    "motion-safe:hover:bg-gray-50/20 dark:motion-safe:hover:bg-gray-800/20",
    "motion-safe:active:bg-gray-100/30 dark:motion-safe:active:bg-gray-700/30",
    "animate-glass-hover animate-glass-press",
  ),
  ghost: cn(
    "glass-button bg-transparent",
    "text-gray-600 dark:text-gray-400",
    "motion-safe:hover:bg-gray-50/20 dark:motion-safe:hover:bg-gray-800/20",
    "motion-safe:active:bg-gray-100/30 dark:motion-safe:active:bg-gray-700/30",
    "animate-glass-hover animate-glass-press",
  ),
  destructive: cn(
    "glass glass-button",
    "font-semibold text-glass-text",
    "bg-gradient-to-b from-red-500/80 to-red-600/80",
    "motion-safe:hover:from-red-400/80 motion-safe:hover:to-red-500/80",
    "motion-safe:active:from-red-600/80 motion-safe:active:to-red-600/80",
    "shadow-glass border border-red-400/30",
    "animate-glass-hover animate-glass-press",
  ),
  apple: cn(
    "glass glass-button",
    "font-semibold text-glass-text",
    "bg-gradient-to-b from-gray-800/80 to-gray-900/80",
    "motion-safe:hover:from-gray-700/80 motion-safe:hover:to-gray-800/80",
    "motion-safe:active:from-gray-900/80 motion-safe:active:to-gray-900/80",
    "shadow-glass border border-gray-600/30",
    "animate-glass-hover animate-glass-press",
  ),
};

// Loading spinner component with Tailwind classes
const LoadingSpinner = ({ size = "md" }: { size?: string }) => {
  const sizeClass =
    {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7",
    }[size] || "w-5 h-5";

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClass,
      )}
    />
  );
};

/**
 * Glass Button Component
 *
 * A premium glass-effect button component with Tailwind CSS and advanced visual effects.
 * Built using the new Tailwind-based architecture for consistency and performance.
 */
export const GlassButton = React.memo(
  forwardRef<HTMLButtonElement, GlassButtonProps>(
    (
      {
        // Base props
        size = "md",
        variant = "primary",
        className,
        children,

        // Interactive props
        disabled = false,
        loading = false,
        magnetic = false,
        ripple = true,

        // Button-specific props
        type = "button",
        leftIcon,
        rightIcon,
        loadingText,
        asChild = false,
        fullWidth = false,
        iconOnly = false,

        // Glass effect props
        glassEffect = { intensity: "medium", blur: true, backdrop: true },

        // Animation props
        animation = "normal",
        disableAnimations = false,

        // Event handlers
        onClick,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,

        ...props
      },
      ref,
    ) => {
      // Animation hooks
      const { transitionToState } = useGlassStateTransitions();
      const { magneticProps } = useMagneticHover();
      const { triggerRipple } = useRippleEffect();

      // Combined ref handling
      const combinedRef = useCallback(
        (node: HTMLButtonElement | null) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
              node;
          }
        },
        [ref],
      );

      // Event handlers
      const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled || loading) {
            return;
          }

          // Create ripple effect
          if (ripple) {
            triggerRipple(event);
          }

          // Trigger state transition
          transitionToState("active");
          setTimeout(() => transitionToState("idle"), 150);

          onClick?.(event);
        },
        [disabled, loading, ripple, triggerRipple, transitionToState, onClick],
      );

      const handleMouseEnter = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled) {
            return;
          }

          transitionToState("hover");
          onMouseEnter?.(event);
        },
        [disabled, transitionToState, onMouseEnter],
      );

      const handleMouseLeave = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
          if (disabled) {
            return;
          }

          transitionToState("default");
          onMouseLeave?.(event);
        },
        [disabled, transitionToState, onMouseLeave],
      );

      const handleFocus = useCallback(
        (event: React.FocusEvent<HTMLButtonElement>) => {
          if (disabled) {
            return;
          }

          transitionToState("focus");
          onFocus?.(event);
        },
        [disabled, transitionToState, onFocus],
      );

      const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLButtonElement>) => {
          if (disabled) {
            return;
          }

          transitionToState("idle");
          onBlur?.(event);
        },
        [disabled, transitionToState, onBlur],
      );

      // Build component classes using Tailwind + glass utilities
      const componentClasses = cn(
        // Base classes with glass utilities
        "relative inline-flex items-center justify-center font-medium",
        "overflow-hidden transition-all duration-300 ease-out will-change-transform",

        // Glass focus styles
        "glass-focus",

        // Size classes (HIG-compliant)
        SIZE_CLASSES[size],

        // Variant classes
        VARIANT_CLASSES[variant],

        // State classes
        {
          "cursor-not-allowed opacity-50": disabled,
          "cursor-wait": loading,
          "w-full": fullWidth,
          "aspect-square": iconOnly,
        },

        // Animation disable
        {
          "!transition-none !duration-0": disableAnimations,
        },

        // Custom classes
        className,
      );

      // Component content
      const buttonContent = (
        <>
          {/* Glass effect layers */}
          <div className="glass-filter" />
          <div className="glass-overlay" />
          <div className="glass-specular" />

          {/* Button content */}
          <div className="glass-content">
            {loading && (
              <div className="mr-2 flex items-center">
                <LoadingSpinner size={size} />
              </div>
            )}

            {leftIcon && !loading && (
              <span className="mr-2 flex items-center">{leftIcon}</span>
            )}

            {children && (
              <span className={cn("flex items-center", iconOnly && "sr-only")}>
                {loading && loadingText ? loadingText : children}
              </span>
            )}

            {rightIcon && !loading && (
              <span className="ml-2 flex items-center">{rightIcon}</span>
            )}
          </div>
        </>
      );

      // Render component
      const Component = asChild ? Slot : "button";

      const componentProps = {
        ref: combinedRef as any,
        type: asChild ? undefined : type,
        disabled: disabled || loading,
        className: componentClasses,
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ...props,
        ...(magnetic ? magneticProps : {}),
      };

      return <Component {...componentProps}>{buttonContent}</Component>;
    },
  ),
);

GlassButton.displayName = "GlassButton";

// Export the component and types
