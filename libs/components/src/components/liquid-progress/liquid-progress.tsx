"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidProgressVariants = cva("relative w-full overflow-hidden", {
  variants: {
    variant: {
      default: "bg-white/10",
      success: "bg-green-500/10",
      warning: "bg-yellow-500/10",
      danger: "bg-red-500/10",
      ghost: "bg-white/5",
    },
    size: {
      xs: "h-1",
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
      xl: "h-6",
    },
    shape: {
      rounded: "rounded-full",
      square: "rounded-none",
      soft: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    shape: "rounded",
  },
});

const progressIndicatorVariants = cva("h-full transition-all duration-500 ease-out", {
  variants: {
    variant: {
      default: "bg-blue-500",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      danger: "bg-red-500",
      ghost: "bg-white/60",
    },
    shape: {
      rounded: "rounded-full",
      square: "rounded-none",
      soft: "rounded-md",
    },
    animated: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      animated: true,
      className: "",
    },
    {
      variant: "success",
      animated: true,
      className: "",
    },
    {
      variant: "warning",
      animated: true,
      className: "from-yellow-400 to-yellow-600",
    },
    {
      variant: "danger",
      animated: true,
      className: "",
    },
    {
      variant: "ghost",
      animated: true,
      className: "from-white/40 to-white/80",
    },
  ],
  defaultVariants: {
    variant: "default",
    shape: "rounded",
    animated: false,
  },
});

const progressLabelVariants = cva("text-sm font-medium text-white", {
  variants: {
    position: {
      top: "mb-2",
      bottom: "mt-2",
      inline: "absolute inset-0 flex items-center justify-center text-xs font-semibold",
      side: "ml-3",
    },
  },
  defaultVariants: {
    position: "top",
  },
});

interface LiquidProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidProgressVariants> {
  value?: number;
  max?: number;
  label?: React.ReactNode;
  labelPosition?: "top" | "bottom" | "inline" | "side";
  showValue?: boolean;
  formatValue?: (value: number, max: number) => string;
  indeterminate?: boolean;
  animated?: boolean;
  striped?: boolean;
  pulsing?: boolean;
  segments?: number;
  segmentGap?: number;
}

export const LiquidProgress = React.forwardRef<HTMLDivElement, LiquidProgressProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      value = 0,
      max = 100,
      label,
      labelPosition = "top",
      showValue = false,
      formatValue = (val, maximum) => `${Math.round((val / maximum) * 100)}%`,
      indeterminate = false,
      animated = false,
      striped = false,
      pulsing = false,
      segments = 0,
      segmentGap = 2,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState(0);

    // Normalize value
    const normalizedValue = Math.min(Math.max(0, value), max);
    const percentage = (normalizedValue / max) * 100;

    // Animate value changes
    React.useEffect(() => {
      if (indeterminate) return;

      const startValue = displayValue;
      const endValue = normalizedValue;
      const duration = 500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - (1 - progress) ** 3;

        const currentValue = startValue + (endValue - startValue) * easeOut;
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [normalizedValue, indeterminate, displayValue]);

    // Generate segments if specified
    const renderSegments = () => {
      if (segments <= 1) return null;

      const segmentWidth = 100 / segments;
      const segmentElements = [];

      for (let i = 0; i < segments; i++) {
        const segmentStart = i * segmentWidth;
        const _segmentEnd = (i + 1) * segmentWidth;
        const isActive = percentage > segmentStart;
        const segmentProgress = Math.min(Math.max(0, percentage - segmentStart), segmentWidth);

        segmentElements.push(
          <div
            key={i}
            className="relative overflow-hidden"
            style={{
              width: `calc(${segmentWidth}% - ${segmentGap}px)`,
              marginRight: i < segments - 1 ? `${segmentGap}px` : 0,
            }}
          >
            <LiquidGlass
              variant="card"
              intensity="subtle"
              className={cn(
                progressIndicatorVariants({ variant, shape, animated }),
                !isActive && "opacity-30",
                striped && "bg-stripes",
                pulsing && "animate-pulse"
              )}
              style={{
                width: `${(segmentProgress / segmentWidth) * 100}%`,
              }}
            />
          </div>
        );
      }

      return segmentElements;
    };

    // Label content
    const labelContent = (
      <>
        {label && <span>{label}</span>}
        {showValue && (
          <span className={label ? "ml-2 opacity-80" : ""}>{formatValue(displayValue, max)}</span>
        )}
      </>
    );

    return (
      <div className="w-full">
        {/* Top label */}
        {(label || showValue) && labelPosition === "top" && (
          <div className={cn(progressLabelVariants({ position: "top" }))}>{labelContent}</div>
        )}

        {/* Progress container */}
        <div className={labelPosition === "side" ? "flex items-center" : ""}>
          <LiquidGlass
            ref={ref}
            variant="card"
            intensity="subtle"
            className={cn(liquidProgressVariants({ variant, size, shape }), className)}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={indeterminate ? undefined : normalizedValue}
            aria-valuetext={indeterminate ? "Loading..." : formatValue(displayValue, max)}
            {...props}
          >
            {/* Indeterminate animation */}
            {indeterminate ? (
              <div
                className={cn(
                  progressIndicatorVariants({ variant, shape, animated }),
                  "w-1/3 animate-pulse"
                )}
                style={{
                  animation: "indeterminate 2s infinite linear",
                }}
              />
            ) : segments > 1 ? (
              /* Segmented progress */
              <div className="flex h-full">{renderSegments()}</div>
            ) : (
              /* Regular progress */
              <LiquidGlass
                variant="card"
                intensity="medium"
                className={cn(
                  progressIndicatorVariants({ variant, shape, animated }),
                  striped && "bg-stripes bg-stripes-animate",
                  pulsing && "animate-pulse"
                )}
                style={{
                  width: `${(displayValue / max) * 100}%`,
                }}
              />
            )}

            {/* Inline label */}
            {(label || showValue) && labelPosition === "inline" && (
              <div className={cn(progressLabelVariants({ position: "inline" }))}>
                {labelContent}
              </div>
            )}
          </LiquidGlass>

          {/* Side label */}
          {(label || showValue) && labelPosition === "side" && (
            <div className={cn(progressLabelVariants({ position: "side" }))}>{labelContent}</div>
          )}
        </div>

        {/* Bottom label */}
        {(label || showValue) && labelPosition === "bottom" && (
          <div className={cn(progressLabelVariants({ position: "bottom" }))}>{labelContent}</div>
        )}

        <style jsx>{`
          @keyframes indeterminate {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(300%);
            }
          }

          .bg-stripes {
            background-image: linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.15) 25%,
              transparent 25%,
              transparent 50%,
              rgba(255, 255, 255, 0.15) 50%,
              rgba(255, 255, 255, 0.15) 75%,
              transparent 75%,
              transparent
            );
            background-size: 1rem 1rem;
          }

          .bg-stripes-animate {
            animation: stripes 1s linear infinite;
          }

          @keyframes stripes {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 1rem 0;
            }
          }
        `}</style>
      </div>
    );
  }
);

LiquidProgress.displayName = "LiquidProgress";

// Circular Progress Component
interface LiquidCircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidProgressVariants> {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: React.ReactNode;
  showValue?: boolean;
  formatValue?: (value: number, max: number) => string;
  indeterminate?: boolean;
}

export const LiquidCircularProgress = React.forwardRef<HTMLDivElement, LiquidCircularProgressProps>(
  (
    {
      className,
      variant = "default",
      value = 0,
      max = 100,
      size = 120,
      strokeWidth = 8,
      label,
      showValue = false,
      formatValue = (val, maximum) => `${Math.round((val / maximum) * 100)}%`,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const normalizedValue = Math.min(Math.max(0, value), max);
    const percentage = (normalizedValue / max) * 100;

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const variantColors = {
      default: "#3b82f6",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      ghost: "#ffffff",
    };

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="subtle"
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={variantColors[variant]}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={indeterminate ? 0 : strokeDashoffset}
            strokeLinecap="round"
            className={cn("transition-all duration-500 ease-out", indeterminate && "animate-spin")}
            style={{
              strokeDasharray: indeterminate
                ? `${circumference * 0.25} ${circumference}`
                : strokeDasharray,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {showValue && !indeterminate && (
            <span className="text-lg font-semibold text-white">
              {formatValue(normalizedValue, max)}
            </span>
          )}
          {label && <span className="text-sm text-white/70 mt-1">{label}</span>}
          {indeterminate && <span className="text-sm text-white/70">Loading...</span>}
        </div>
      </LiquidGlass>
    );
  }
);

LiquidCircularProgress.displayName = "LiquidCircularProgress";

export {
  liquidProgressVariants,
  progressIndicatorVariants,
  progressLabelVariants,
  type LiquidProgressProps,
};
