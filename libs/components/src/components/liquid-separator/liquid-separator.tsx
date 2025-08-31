"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidSeparatorVariants = cva("shrink-0", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    },
    variant: {
      default: "bg-white/10",
      subtle: "bg-white/5",
      bold: "bg-white/20",
      gradient: "",
      "gradient-vertical": "",
      dashed: "border-t border-dashed border-white/20",
      "dashed-vertical": "border-l border-dashed border-white/20",
      dotted: "border-t border-dotted border-white/20",
      "dotted-vertical": "border-l border-dotted border-white/20",
      glass: "",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  compoundVariants: [
    // Horizontal sizing
    {
      orientation: "horizontal",
      size: "xs",
      className: "h-px",
    },
    {
      orientation: "horizontal",
      size: "sm",
      className: "h-0.5",
    },
    {
      orientation: "horizontal",
      size: "md",
      className: "h-px",
    },
    {
      orientation: "horizontal",
      size: "lg",
      className: "h-1",
    },
    {
      orientation: "horizontal",
      size: "xl",
      className: "h-1.5",
    },
    // Vertical sizing
    {
      orientation: "vertical",
      size: "xs",
      className: "w-px",
    },
    {
      orientation: "vertical",
      size: "sm",
      className: "w-0.5",
    },
    {
      orientation: "vertical",
      size: "md",
      className: "w-px",
    },
    {
      orientation: "vertical",
      size: "lg",
      className: "w-1",
    },
    {
      orientation: "vertical",
      size: "xl",
      className: "w-1.5",
    },
    // Gradient variants for vertical
    {
      orientation: "vertical",
      variant: "gradient",
      className: "",
    },
    // Dashed and dotted variants adjustments
    {
      orientation: "horizontal",
      variant: "dashed",
      className: "border-t border-dashed border-white/20 bg-transparent h-0",
    },
    {
      orientation: "vertical",
      variant: "dashed-vertical",
      className: "border-l border-dashed border-white/20 bg-transparent w-0",
    },
    {
      orientation: "horizontal",
      variant: "dotted",
      className: "border-t border-dotted border-white/20 bg-transparent h-0",
    },
    {
      orientation: "vertical",
      variant: "dotted-vertical",
      className: "border-l border-dotted border-white/20 bg-transparent w-0",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
    size: "md",
  },
});

const separatorLabelVariants = cva("flex items-center text-sm font-medium text-white/70", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col writing-mode-vertical-rl text-orientation-mixed",
    },
    position: {
      center: "",
      start: "",
      end: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      position: "center",
      className: "justify-center",
    },
    {
      orientation: "horizontal",
      position: "start",
      className: "justify-start",
    },
    {
      orientation: "horizontal",
      position: "end",
      className: "justify-end",
    },
    {
      orientation: "vertical",
      position: "center",
      className: "justify-center",
    },
    {
      orientation: "vertical",
      position: "start",
      className: "justify-start",
    },
    {
      orientation: "vertical",
      position: "end",
      className: "justify-end",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    position: "center",
  },
});

interface LiquidSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidSeparatorVariants> {
  label?: React.ReactNode;
  labelPosition?: "center" | "start" | "end";
  decorativeIcon?: React.ReactNode;
  animated?: boolean;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

export const LiquidSeparator = React.forwardRef<HTMLDivElement, LiquidSeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "default",
      size = "md",
      label,
      labelPosition = "center",
      decorativeIcon,
      animated = false,
      spacing = "md",
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical";
    const hasLabel = label || decorativeIcon;

    // Determine appropriate variant for vertical orientation
    const computedVariant = React.useMemo(() => {
      if (variant === "gradient" && isVertical) return "gradient-vertical";
      if (variant === "dashed" && isVertical) return "dashed-vertical";
      if (variant === "dotted" && isVertical) return "dotted-vertical";
      return variant;
    }, [variant, isVertical]);

    // Spacing classes
    const spacingClasses = {
      none: "",
      sm: isVertical ? "mx-2" : "my-2",
      md: isVertical ? "mx-4" : "my-4",
      lg: isVertical ? "mx-6" : "my-6",
      xl: isVertical ? "mx-8" : "my-8",
    };

    // Render separator line
    const renderSeparator = () => {
      if (variant === "glass") {
        return (
          <LiquidGlass
            variant="card"
            intensity="subtle"
            className={cn(
              liquidSeparatorVariants({ orientation, variant: "default", size }),
              animated && "transition-all duration-300",
              "bg-white/5"
            )}
          />
        );
      }

      return (
        <div
          className={cn(
            liquidSeparatorVariants({ orientation, variant: computedVariant, size }),
            animated && "transition-all duration-300"
          )}
        />
      );
    };

    // Simple separator without label
    if (!hasLabel) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation}
          className={cn(spacingClasses[spacing], className)}
          {...props}
        >
          {renderSeparator()}
        </div>
      );
    }

    // Separator with label
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          "relative flex items-center",
          isVertical ? "flex-col h-full" : "flex-row w-full",
          spacingClasses[spacing],
          className
        )}
        {...props}
      >
        {/* First separator segment */}
        {labelPosition !== "start" && (
          <div className={cn("flex-1", isVertical ? "h-full w-px" : "w-full h-px")}>
            {renderSeparator()}
          </div>
        )}

        {/* Label container */}
        <div
          className={cn(
            separatorLabelVariants({ orientation, position: labelPosition }),
            isVertical ? "py-3" : "px-3",
            "bg-transparent relative z-10"
          )}
        >
          {decorativeIcon && (
            <span
              className={cn(
                "flex items-center justify-center",
                label && (isVertical ? "mb-1" : "mr-2")
              )}
            >
              {decorativeIcon}
            </span>
          )}
          {label && <span>{label}</span>}
        </div>

        {/* Second separator segment */}
        {labelPosition !== "end" && (
          <div className={cn("flex-1", isVertical ? "h-full w-px" : "w-full h-px")}>
            {renderSeparator()}
          </div>
        )}
      </div>
    );
  }
);

LiquidSeparator.displayName = "LiquidSeparator";

// Section Separator Component - for major content divisions
interface LiquidSectionSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "default" | "prominent" | "subtle";
  spacing?: "sm" | "md" | "lg" | "xl";
}

const sectionSeparatorVariants = cva("relative w-full text-center", {
  variants: {
    variant: {
      default: "py-8",
      prominent: "py-12",
      subtle: "py-4",
    },
    spacing: {
      sm: "my-4",
      md: "my-8",
      lg: "my-12",
      xl: "my-16",
    },
  },
  defaultVariants: {
    variant: "default",
    spacing: "md",
  },
});

export const LiquidSectionSeparator = React.forwardRef<HTMLDivElement, LiquidSectionSeparatorProps>(
  ({ className, title, subtitle, icon, variant = "default", spacing = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sectionSeparatorVariants({ variant, spacing }), className)}
        {...props}
      >
        {/* Background separator */}
        <div className="absolute inset-0 flex items-center">
          <LiquidSeparator variant="gradient" />
        </div>

        {/* Content */}
        <div className="relative">
          <LiquidGlass
            variant="card"
            intensity="subtle"
            className="inline-flex flex-col items-center justify-center px-6 py-4 bg-white/5"
          >
            {icon && <div className="text-white/60 mb-2">{icon}</div>}

            {title && (
              <h3
                className={cn(
                  "font-semibold text-white",
                  variant === "prominent" ? "text-xl" : "text-lg",
                  variant === "subtle" ? "text-base" : ""
                )}
              >
                {title}
              </h3>
            )}

            {subtitle && (
              <p
                className={cn(
                  "text-white/70 mt-1",
                  variant === "prominent" ? "text-base" : "text-sm"
                )}
              >
                {subtitle}
              </p>
            )}
          </LiquidGlass>
        </div>
      </div>
    );
  }
);

LiquidSectionSeparator.displayName = "LiquidSectionSeparator";

export {
  liquidSeparatorVariants,
  separatorLabelVariants,
  sectionSeparatorVariants,
  type LiquidSeparatorProps,
};
