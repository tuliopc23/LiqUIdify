/**
 * Glass Foundation Components
 * Core glassmorphism foundation components with proper separation of concerns
 */

import { forwardRef } from "react";
import { cn } from "@/lib/glass-utils";
import { GlassConfig, GlassClassGenerator, glassUtils } from "@/lib/glass-core";

// Base Glass Container - Foundation primitive
export interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement>, GlassConfig {
  asChild?: boolean;
  interactive?: boolean;
  responsive?: boolean;
}

export const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  ({ 
    className, 
    variant = "default",
    blur = "medium",
    shadow = "light",
    border = true,
    interactive = false,
    responsive = true,
    style,
    ...props 
  }, ref) => {
    const glassConfig: GlassConfig = { variant, blur, shadow, border };
    const cssProperties = glassUtils.generateCSSProperties(glassConfig);
    
    const baseClasses = GlassClassGenerator.combineClasses(
      variant,
      interactive,
      responsive,
      ["rounded-xl"]
    );

    return (
      <div
        ref={ref}
        className={cn(baseClasses, className)}
        style={{
          ...cssProperties,
          background: `var(--glass-bg, ${cssProperties["--glass-bg"]})`,
          backdropFilter: `blur(var(--glass-blur, ${cssProperties["--glass-blur"]})) saturate(150%)`,
          WebkitBackdropFilter: `blur(var(--glass-blur, ${cssProperties["--glass-blur"]})) saturate(150%)`,
          boxShadow: `var(--glass-shadow, ${cssProperties["--glass-shadow"]})`,
          border: border ? `1px solid var(--glass-border, ${cssProperties["--glass-border"]})` : "none",
          ...style
        }}
        {...props}
      />
    );
  }
);

GlassContainer.displayName = "GlassContainer";

// Glass Surface - Specialized container for content areas
export interface GlassSurfaceProps extends GlassContainerProps {
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  elevation?: "flat" | "low" | "medium" | "high";
}

export const GlassSurface = forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ 
    padding = "md",
    elevation = "low",
    variant,
    shadow,
    className,
    ...props 
  }, ref) => {
    // Map elevation to shadow and variant
    const elevationMap = {
      flat: { shadow: "whisper" as const, variant: "default" as const },
      low: { shadow: "subtle" as const, variant: "default" as const },
      medium: { shadow: "light" as const, variant: "elevated" as const },
      high: { shadow: "medium" as const, variant: "floating" as const }
    };

    const elevationConfig = elevationMap[elevation];
    
    const paddingClasses = {
      none: "",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-12"
    };

    return (
      <GlassContainer
        ref={ref}
        variant={variant || elevationConfig.variant}
        shadow={shadow || elevationConfig.shadow}
        className={cn(paddingClasses[padding], className)}
        {...props}
      />
    );
  }
);

GlassSurface.displayName = "GlassSurface";

// Glass Panel - Interactive container with hover effects
export interface GlassPanelProps extends GlassContainerProps {
  hoverable?: boolean;
  pressable?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ 
    hoverable = true,
    pressable = false,
    interactive = true,
    className,
    ...props 
  }, ref) => {
    const interactionClasses = cn(
      hoverable && "hover:scale-[1.01] hover:shadow-lg",
      pressable && "active:scale-[0.99] active:shadow-sm",
      "transition-all duration-300 ease-out cursor-pointer"
    );

    return (
      <GlassContainer
        ref={ref}
        interactive={interactive}
        className={cn(interactionClasses, className)}
        {...props}
      />
    );
  }
);

GlassPanel.displayName = "GlassPanel";

// Glass Backdrop - Full-screen overlay component
export interface GlassBackdropProps extends GlassContainerProps {
  visible?: boolean;
  onClose?: () => void;
}

export const GlassBackdrop = forwardRef<HTMLDivElement, GlassBackdropProps>(
  ({ 
    visible = true,
    onClose,
    variant = "overlay",
    blur = "heavy",
    className,
    onClick,
    ...props 
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose?.();
      }
      onClick?.(e);
    };

    if (!visible) return null;

    return (
      <GlassContainer
        ref={ref}
        variant={variant}
        blur={blur}
        border={false}
        className={cn(
          "fixed inset-0 z-50",
          "flex items-center justify-center",
          "animate-in fade-in duration-300",
          className
        )}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

GlassBackdrop.displayName = "GlassBackdrop";

// Glass Separator - Visual divider with glass styling
export interface GlassSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "subtle" | "light" | "medium";
}

export const GlassSeparator = forwardRef<HTMLDivElement, GlassSeparatorProps>(
  ({ 
    orientation = "horizontal",
    variant = "light",
    className,
    ...props 
  }, ref) => {
    const orientationClasses = {
      horizontal: "w-full h-px",
      vertical: "h-full w-px"
    };

    const variantStyles = {
      subtle: "rgba(255, 255, 255, 0.08)",
      light: "rgba(255, 255, 255, 0.15)",
      medium: "rgba(255, 255, 255, 0.25)"
    };

    return (
      <div
        ref={ref}
        className={cn(orientationClasses[orientation], className)}
        style={{
          background: variantStyles[variant],
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)"
        }}
        {...props}
      />
    );
  }
);

GlassSeparator.displayName = "GlassSeparator";

// Export all foundation components
export {
  type GlassConfig,
  GlassClassGenerator,
  glassUtils
};
