import React, { forwardRef, useEffect, useMemo } from "react";
import { cn } from "../../core/utils/classname";
import { useDeviceCapabilities } from "../../hooks/use-device-capabilities";
import { getLiquidGlassClasses } from "../../utils/liquid-glass-classes";
import { LiquidGlassDefs } from "../liquid-glass-defs/liquid-glass-defs";
import type {
  LiquidGlassBaseProps,
  LiquidGlassLayeredProps,
  LiquidGlassSize,
  LiquidGlassVariant,
  LiquidGlassComponentVariant,
  LiquidGlassAnimation,
  LiquidGlassShape,
  LiquidGlassEffect,
  LiquidGlassPerformance,
  LiquidGlassElevation,
} from "../../types/liquid-glass";

export interface LiquidGlassProps
  extends Omit<LiquidGlassLayeredProps, "variant" | "animation"> {
  children?: React.ReactNode;
  as?: React.ElementType;
  variant?: LiquidGlassVariant | LiquidGlassComponentVariant;
  size?: LiquidGlassSize;
  shape?: LiquidGlassShape;
  effect?: LiquidGlassEffect;
  elevation?: LiquidGlassElevation;
  animation?: LiquidGlassAnimation;
  performanceMode?: LiquidGlassPerformance;
  blur?: boolean;
  blurStrength?: "sm" | "md" | "lg" | "xl";
  adaptive?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
  [key: string]: any; // Allow additional props
}

/**
 * LiquidGlass - Main liquid glass component with full device capability integration
 */
export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  (
    {
      children,
      as: Component = "div",
      className,
      variant = "default",
      size = "md",
      shape,
      effect,
      elevation,
      animation = "none",
      interactive = false,
      layered = false,
      showFilter = true,
      showOverlay = true,
      showSpecular = true,
      filterBlur,
      overlayOpacity,
      blur = false,
      blurStrength = "md",
      adaptive = true,
      performanceMode = "auto",
      ariaLabel,
      ariaDescribedBy,
      role,
      ...props
    },
    ref,
  ) => {
    const capabilities = useDeviceCapabilities();

    // Determine performance tier
    const effectivePerformance = useMemo(() => {
      if (performanceMode === "auto") {
        return capabilities.performanceTier;
      }
      return performanceMode;
    }, [performanceMode, capabilities.performanceTier]);

    // Build class names based on capabilities and props
    const classes = useMemo(() => {
      const baseClasses = getLiquidGlassClasses(
        capabilities,
        effectivePerformance === "high"
          ? "premium"
          : effectivePerformance === "low"
            ? "minimal"
            : "default",
        "",
      );

      const variantClasses = {
        // Visual variants
        default: "",
        solid: "liquid-glass-solid",
        translucent: "liquid-glass-translucent",
        transparent: "liquid-glass-transparent",
        holographic: "liquid-glass-holographic",
        aurora: "liquid-glass-aurora",
        frosted: "liquid-glass-frosted",
        iridescent: "liquid-glass-iridescent",
        elevated: "liquid-glass-elevated",
        outlined: "liquid-glass-outlined",
        // Component variants
        card: "liquid-glass-card",
        button: "liquid-glass-button",
        modal: "liquid-glass-modal",
        nav: "liquid-glass-nav",
        hero: "liquid-glass-hero",
        input: "liquid-glass-input",
      };

      const sizeClasses = {
        sm: "liquid-glass-sm",
        md: "liquid-glass-md",
        lg: "liquid-glass-lg",
        xl: "liquid-glass-xl",
        "2xl": "liquid-glass-2xl",
      };

      const shapeClasses = {
        rounded: "liquid-glass-rounded",
        pill: "liquid-glass-pill",
        circle: "liquid-glass-circle",
        square: "liquid-glass-square",
        wide: "liquid-glass-wide",
        card: "liquid-glass-card",
      };

      const animationClasses = {
        none: "",
        float: "liquid-glass-float",
        shimmer: "liquid-glass-shimmer",
        pulse: "liquid-glass-pulse",
      };

      const effectClasses = {
        distortion: capabilities.hasSVGFilters ? "liquid-glass-distortion" : "",
        refraction: capabilities.hasSVGFilters ? "liquid-glass-refraction" : "",
        chromatic:
          capabilities.hasSVGFilters && effectivePerformance === "high"
            ? "liquid-glass-chromatic"
            : "",
        ripple: "liquid-glass-ripple",
        depth: "liquid-glass-depth",
        noise: "liquid-glass-noise",
      };

      const elevationClasses = {
        none: "",
        sm: "liquid-glass-elevation-sm",
        md: "liquid-glass-elevation-md",
        lg: "liquid-glass-elevation-lg",
        xl: "liquid-glass-elevation-xl",
      };

      const blurClasses = {
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
      };

      return cn(
        baseClasses,
        variantClasses[variant as keyof typeof variantClasses] || "",
        size && sizeClasses[size as keyof typeof sizeClasses],
        shape && shapeClasses[shape as keyof typeof shapeClasses],
        animation &&
          animationClasses[animation as keyof typeof animationClasses],
        effect && effectClasses[effect as keyof typeof effectClasses],
        elevation &&
          elevationClasses[elevation as keyof typeof elevationClasses],
        blur && blurClasses[blurStrength as keyof typeof blurClasses],
        interactive && "liquid-glass-interactive",
        layered && "liquid-glass-container",
        adaptive && "data-adaptive",
        className,
      );
    }, [
      capabilities,
      effectivePerformance,
      variant,
      size,
      shape,
      animation,
      effect,
      elevation,
      blur,
      blurStrength,
      interactive,
      layered,
      adaptive,
      className,
    ]);

    // Apply custom CSS properties for fine-tuning
    const style = useMemo(() => {
      const customStyles: React.CSSProperties & Record<string, any> = {};

      if (filterBlur) {
        customStyles["--lg-filter-blur"] = filterBlur;
      }

      if (overlayOpacity !== undefined) {
        customStyles["--lg-overlay-opacity"] = overlayOpacity;
      }

      // Adjust for performance tier
      if (effectivePerformance === "low") {
        customStyles["--lg-filter-blur"] = "4px";
        customStyles["--lg-transition"] = "none";
      } else if (effectivePerformance === "medium") {
        customStyles["--lg-filter-blur"] = "6px";
      }

      return customStyles;
    }, [filterBlur, overlayOpacity, effectivePerformance]);

    // Accessibility attributes
    const accessibilityProps = {
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      role: role || (interactive ? "button" : undefined),
      tabIndex: interactive ? 0 : undefined,
    };

    // Render layered structure if requested
    if (layered) {
      return (
        <>
          <LiquidGlassDefs />
          <Component
            ref={ref}
            className={classes}
            style={style}
            {...accessibilityProps}
            {...props}
          >
            {showFilter && <div className="liquid-glass-filter" />}
            {showOverlay && <div className="liquid-glass-overlay" />}
            {showSpecular && <div className="liquid-glass-specular" />}
            <div className="liquid-glass-content">{children}</div>
          </Component>
        </>
      );
    }

    // Simple structure
    return (
      <>
        <LiquidGlassDefs />
        <Component
          ref={ref}
          className={classes}
          style={style}
          {...accessibilityProps}
          {...props}
        >
          {children}
        </Component>
      </>
    );
  },
);

LiquidGlass.displayName = "LiquidGlass";

// Export variant components for convenience
export const LiquidGlassCard = forwardRef<
  HTMLDivElement,
  Omit<LiquidGlassProps, "variant">
>((props, ref) => <LiquidGlass ref={ref} variant="card" {...props} />);
LiquidGlassCard.displayName = "LiquidGlassCard";

export const LiquidGlassButton = forwardRef<
  HTMLButtonElement,
  Omit<LiquidGlassProps, "variant">
>((props, ref) => (
  <LiquidGlass
    ref={ref as any}
    as="button"
    variant="button"
    interactive
    {...props}
  />
));
LiquidGlassButton.displayName = "LiquidGlassButton";

export const LiquidGlassNav = forwardRef<
  HTMLElement,
  Omit<LiquidGlassProps, "variant">
>((props, ref) => (
  <LiquidGlass ref={ref as any} as="nav" variant="nav" {...props} />
));
LiquidGlassNav.displayName = "LiquidGlassNav";

export const LiquidGlassHero = forwardRef<
  HTMLDivElement,
  Omit<LiquidGlassProps, "variant">
>((props, ref) => (
  <LiquidGlass ref={ref} variant="hero" size="2xl" {...props} />
));
LiquidGlassHero.displayName = "LiquidGlassHero";

export const LiquidGlassInput = forwardRef<
  HTMLInputElement,
  Omit<LiquidGlassProps, "variant" | "children"> &
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <div className={cn("liquid-glass liquid-glass-input", className)}>
    <input ref={ref} className="liquid-glass-input-field" {...props} />
  </div>
));
LiquidGlassInput.displayName = "LiquidGlassInput";

export default LiquidGlass;
