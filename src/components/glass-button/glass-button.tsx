import { forwardRef, useState, useRef, useCallback } from "react";
import { cn, getGlassClass, microInteraction } from "@/lib/glass-utils";
import { useMagneticHover, createGlassRipple } from "@/lib/glass-physics";
import { useLiquidGlass } from "@/hooks/use-liquid-glass";
import { useGlassEffectPerformance } from "@/hooks/use-performance-monitor";
import { useMicroInteraction, useGlassMorph } from "@/lib/animation-system";
import { useResponsiveComponentSize, useResponsiveDensity, useResponsiveVisibility, ResponsiveProps } from "@/lib/responsive-system";
import { Slot } from "@radix-ui/react-slot";
import {
  ProfessionalButtonProps,
  validateComponentProps,
  getIconSizeClasses,
  getPaddingClasses,
  getMinHeightClasses,
  getFocusRingClasses,
  getLoadingStateClasses,
  AccessibilityProps,
} from "@/lib/component-standards";

/**
 * Enhanced Glass Button Props following professional standards
 */
export interface GlassButtonProps
  extends ProfessionalButtonProps, ResponsiveProps {
  /** Button variant style with extended options */
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "destructive" | "success" | "warning";
  /** Text to show during loading state */
  loadingText?: string;
  /** Full width button */
  fullWidth?: boolean;
  /** Button shape variant */
  shape?: "default" | "round" | "circle";
  /** Enable haptic feedback on supported devices */
  hapticFeedback?: boolean;
}

/**
 * A premium glass-effect button component with advanced visual effects.
 * 
 * Features:
 * - Multiple variants (primary, secondary, tertiary, ghost, destructive)
 * - 5 size options (xs, sm, md, lg, xl)
 * - Loading states with spinner
 * - Left and right icons
 * - Glass morphism effects with backdrop blur
 * - Magnetic hover interactions
 * - Haptic feedback support
 * - Accessibility compliant
 * 
 * @example
 * ```tsx
 * <GlassButton variant="primary" size="md" leftIcon={<PlayIcon />}>
 *   Play Video
 * </GlassButton>
 * ```
 */
const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      disabled,
      fullWidth = false,
      shape = "default",
      hapticFeedback = true,
      magneticHover,
      ripple = true,
      specularHighlights,
      responsive = true,
      adaptiveSize = true,
      fluidSpacing = false,
      hideOn,
      showOn,
      children,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    validateComponentProps({ variant, size, disabled, loading }, 'GlassButton');
    const [isPressed, setIsPressed] = useState(false);
    const internalButtonRef = useRef<HTMLButtonElement | null>(null);
    const { magneticHover: globalMagneticHover, specularHighlights: globalSpecularHighlights } = useLiquidGlass();
    
    // Responsive capabilities
    const responsiveSize = useResponsiveComponentSize(size, adaptiveSize && responsive);
    const { isTouchOptimized, spacing } = useResponsiveDensity();
    const { isVisible, className: visibilityClassName } = useResponsiveVisibility({ hideOn, showOn });
    
    // Professional micro-interactions
    const microAnimation = useMicroInteraction('glassButton');
    const glassMorphStyle = useGlassMorph(microAnimation.state === 'hover' || microAnimation.state === 'active');
    
    // Early return if not visible on current breakpoint
    if (!isVisible) {
      return null;
    }
    
    // Use prop overrides if provided, otherwise use global settings
    const finalMagneticHover = magneticHover ?? globalMagneticHover;
    const finalSpecularHighlights = specularHighlights ?? globalSpecularHighlights;
    
    const { elementRef: magneticRef, transform } = useMagneticHover(0.3, 120);
    const { measureGlassInteraction } = useGlassEffectPerformance('Button');

    // Callback ref to handle both internal and external refs, including magnetic ref
    const setRefs = useCallback((node: HTMLButtonElement | null) => {
      // Set internal ref
      if (internalButtonRef.current !== node) {
        (internalButtonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
      // Assign to magnetic ref if enabled
      if (finalMagneticHover && magneticRef && 'current' in magneticRef) {
        (magneticRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
      // Assign to forwarded ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    }, [finalMagneticHover, magneticRef, ref]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const endMeasure = measureGlassInteraction('click');
      
      // Create ripple effect if enabled
      if (ripple && internalButtonRef.current && !disabled && !loading) {
        const rect = internalButtonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createGlassRipple(internalButtonRef.current, x, y, 'var(--glass-ripple, rgba(255, 255, 255, 0.3))');
      }
      
      // Haptic feedback for supported devices
      if (hapticFeedback && 'vibrate' in navigator && !disabled && !loading) {
        navigator.vibrate(1);
      }
      
      props.onClick?.(e);
      endMeasure();
    };

    const baseClasses = cn(
      // Base styles
      "liquid-glass liquid-glass-interactive font-medium relative overflow-hidden",
      "inline-flex items-center justify-center gap-2 transition-all duration-200",
      
      // Shape variants
      shape === "circle" ? "rounded-full aspect-square" : 
      shape === "round" ? "rounded-full" : "rounded-xl",
      
      // Full width
      fullWidth && "w-full",
      
      // Responsive and touch optimization
      isTouchOptimized && "touch-optimized",
      responsive && fluidSpacing && "spacing-fluid-sm",
      visibilityClassName,
      
      // Focus and interaction states
      getFocusRingClasses(),
      microInteraction.smooth,
      
      // Disabled states
      "disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none",
      getLoadingStateClasses(loading),
      
      // Glass effects
      finalSpecularHighlights && "liquid-glass-specular liquid-glass-shimmer",
      finalMagneticHover && "liquid-glass-magnetic",
      
      // Press state
      isPressed && "scale-[0.98] brightness-95"
    );

    const variantClasses = {
      primary: cn(
        "text-white font-semibold",
        "bg-gradient-to-b from-[var(--glass-primary)] to-[var(--glass-primary-active)]",
        "hover:from-[var(--glass-primary-hover)] hover:to-[var(--glass-primary)]",
        "active:from-[var(--glass-primary-active)] active:to-[var(--glass-primary-active)]",
        "shadow-lg shadow-blue-500/25",
        "border border-blue-400/30"
      ),
      secondary: cn(
        getGlassClass("default"),
        "text-[var(--text-primary)] border-[var(--glass-border)]",
        "hover:bg-[var(--glass-bg-elevated)] hover:border-[var(--glass-border-focus)]",
        "active:bg-[var(--glass-bg-pressed)]"
      ),
      tertiary: cn(
        "text-[var(--text-primary)] bg-transparent",
        "hover:bg-[var(--glass-bg)] hover:backdrop-blur-sm",
        "active:bg-[var(--glass-bg-pressed)]"
      ),
      ghost: cn(
        "text-[var(--text-secondary)] bg-transparent",
        "hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]",
        "active:bg-[var(--glass-bg-pressed)]"
      ),
      destructive: cn(
        "text-white font-semibold",
        "bg-gradient-to-b from-red-500 to-red-600",
        "hover:from-red-400 hover:to-red-500",
        "active:from-red-600 active:to-red-600",
        "shadow-lg shadow-red-500/25",
        "border border-red-400/30"
      ),
      success: cn(
        "text-white font-semibold",
        "bg-gradient-to-b from-green-500 to-green-600",
        "hover:from-green-400 hover:to-green-500",
        "active:from-green-600 active:to-green-600",
        "shadow-lg shadow-green-500/25",
        "border border-green-400/30"
      ),
      warning: cn(
        "text-white font-semibold",
        "bg-gradient-to-b from-yellow-500 to-yellow-600",
        "hover:from-yellow-400 hover:to-yellow-500",
        "active:from-yellow-600 active:to-yellow-600",
        "shadow-lg shadow-yellow-500/25",
        "border border-yellow-400/30"
      ),
    };

    // Use responsive size classes with adaptive sizing
    const actualSize = responsive ? responsiveSize : size;
    const sizeClasses = {
      xs: cn(getPaddingClasses('xs'), getMinHeightClasses('xs'), "text-xs"),
      sm: cn(getPaddingClasses('sm'), getMinHeightClasses('sm'), "text-sm"),
      md: cn(getPaddingClasses('md'), getMinHeightClasses('md'), "text-sm"),
      lg: cn(getPaddingClasses('lg'), getMinHeightClasses('lg'), "text-base"),
      xl: cn(getPaddingClasses('xl'), getMinHeightClasses('xl'), "text-lg"),
    };

    // Use standardized icon size classes based on actual size
    const iconClasses = getIconSizeClasses(actualSize);

    if (asChild) {
      return (
        <Slot
          ref={setRefs}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[actualSize],
            className
          )}
          style={{
            ...microAnimation.style,
            ...glassMorphStyle,
            transform: finalMagneticHover ? transform : microAnimation.style.transform,
            ...props.style
          }}
          data-disabled={disabled || loading}
          aria-busy={loading ? true : undefined}
          
          {...microAnimation.bind}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[actualSize],
          className
        )}
        ref={setRefs}
        style={{
          ...microAnimation.style,
          ...glassMorphStyle,
          transform: finalMagneticHover ? transform : microAnimation.style.transform,
          ...props.style
        }}
        disabled={disabled || loading}
        aria-busy={loading ? true : undefined}
        aria-label={loading && loadingText ? loadingText : children?.toString()}
        aria-label={loading && loadingText ? loadingText : children?.toString()}
        {...microAnimation.bind}
        onClick={handleClick}
        {...props}
      >
        {/* Loading state overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-current/10 rounded-xl" aria-hidden="true">
            <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", iconClasses)} />
          </div>
        )}
        
        <div className={cn("flex items-center justify-center", loading && "opacity-0")}>
          {leftIcon && (
            <span className={cn("flex-shrink-0", iconClasses)} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          
          {/* Content with proper spacing */}
          <span className="truncate">
            {loading && loadingText ? loadingText : children}
          </span>
          
          {rightIcon && (
            <span className={cn("flex-shrink-0", iconClasses)} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton };
