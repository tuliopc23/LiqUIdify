/**
 * Refactored Glass Button Component
 *
 * This component demonstrates the new compound component architecture with:
 * - Consistent component structure using compound components pattern
 * - Unified base component system with shared props and behaviors
 * - Centralized glass effects system
 * - Reusable animation hooks
 * - Proper component composition with forwardRef
 * - Separated business logic from presentation
 */
// JSDoc documentation for the Glass Button component
/**
 * @fileoverview Glass Button Component - A premium glassmorphism button with advanced effects
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

// Variant class mappings
const VARIANT_CLASSES = {
  primary: cn(
    "font-semibold text-white dark:text-white",
    "bg-gradient-to-b from-blue-500 to-blue-600",
    "hover:from-blue-400 hover:to-blue-500",
    "active:from-blue-600 active:to-blue-600",
    "shadow-blue-500/25 shadow-lg",
    "border border-blue-400/30",
  ),
  secondary: cn(
    "text-gray-900 dark:text-white",
    "border-gray-200 dark:border-gray-700",
    "hover:bg-gray-50 dark:hover:bg-gray-800",
    "active:bg-gray-100 dark:active:bg-gray-700",
  ),
  tertiary: cn(
    "bg-transparent text-gray-900 dark:text-white",
    "hover:bg-gray-50 dark:hover:bg-gray-800",
    "active:bg-gray-100 dark:active:bg-gray-700",
  ),
  ghost: cn(
    "bg-transparent text-gray-600 dark:text-gray-400",
    "hover:bg-gray-50 dark:hover:bg-gray-800",
    "active:bg-gray-100 dark:active:bg-gray-700",
  ),
  destructive: cn(
    "font-semibold text-white",
    "bg-gradient-to-b from-red-500 to-red-600",
    "hover:from-red-400 hover:to-red-500",
    "active:from-red-600 active:to-red-600",
    "shadow-lg shadow-red-500/25",
    "border border-red-400/30",
  ),
  apple: cn(
    "font-semibold text-white",
    "bg-gradient-to-b from-gray-800 to-gray-900",
    "hover:from-gray-700 hover:to-gray-800",
    "active:from-gray-900 active:to-gray-900",
    "shadow-gray-800/25 shadow-lg",
    "border border-gray-600/30",
  ),
};

// Loading spinner component
const LoadingSpinner = ({ size = "md" }: { size?: string }) => {
  const sizeClass =
    size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : "w-5 h-5";

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
 * A premium glass-effect button component with advanced visual effects.
 * Built using the new compound component architecture for consistency and reusability.
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

          transitionToState("idle");
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

      // Build component classes
      const componentClasses = cn(
        // Base classes
        "relative inline-flex items-center justify-center font-medium",
        "overflow-hidden rounded-xl",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "transition-all duration-300 ease-out",
        "will-change-transform",

        // Variant classes
        VARIANT_CLASSES[variant],

        // State classes
        {
          "cursor-not-allowed opacity-50": disabled,
          "cursor-wait": loading,
          "w-full": fullWidth,
          "aspect-square": iconOnly,
        },

        // Custom classes
        className,
      );

      // Component content
      const buttonContent = (
        <>
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
        </>
      );

      // Render component
      const Component = asChild ? Slot : "button";

      return (
        <Component
          ref={combinedRef as any}
          type={asChild ? undefined : type}
          disabled={disabled || loading}
          className={componentClasses}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
          {...(magnetic ? magneticProps : {})}
        >
          {buttonContent}
        </Component>
      );
    },
  ),
);

GlassButton.displayName = "GlassButton";

// Export the component and types
