"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useCallback, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidSliderVariants = cva("relative flex w-full touch-none select-none items-center", {
  variants: {
    variant: {
      default: "",
      success: "",
      warning: "",
      danger: "",
    },
    size: {
      sm: "h-4",
      md: "h-5",
      lg: "h-6",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col h-full w-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    orientation: "horizontal",
  },
});

const sliderTrackVariants = cva("relative grow overflow-hidden rounded-full bg-white/10", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-2.5",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "h-full w-full",
    },
  },
  defaultVariants: {
    size: "md",
    orientation: "horizontal",
  },
});

const sliderRangeVariants = cva("absolute rounded-full transition-all", {
  variants: {
    variant: {
      default: "bg-blue-500",
      success: "bg-green-500",
      warning: "bg-yellow-500",
      danger: "bg-red-500",
    },
    size: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-2.5",
    },
    orientation: {
      horizontal: "h-full",
      vertical: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    orientation: "horizontal",
  },
});

const sliderThumbVariants = cva(
  "block rounded-full border-2 border-white bg-white shadow-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface LiquidSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">,
    VariantProps<typeof liquidSliderVariants> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  inverted?: boolean;
  range?: boolean;
  label?: string;
  showValue?: boolean;
  showTicks?: boolean;
  tickMarks?: number[];
  formatValue?: (value: number) => string;
  marks?: { value: number; label?: string }[];
}

export const LiquidSlider = React.forwardRef<HTMLDivElement, LiquidSliderProps>(
  (
    {
      className,
      variant,
      size,
      orientation = "horizontal",
      value: controlledValue,
      defaultValue = [0],
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      inverted = false,
      range = false,
      label,
      showValue = false,
      showTicks = false,
      tickMarks,
      formatValue = (value: number) => value.toString(),
      marks,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const [activeThumb, setActiveThumb] = useState<number | null>(null);

    const trackRef = useRef<HTMLDivElement>(null);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    // Ensure we have the right number of values
    const normalizedValue = React.useMemo(() => {
      if (range && value.length === 1) {
        return [min, value[0]];
      }
      if (!range && value.length > 1) {
        return [value[0]];
      }
      return value;
    }, [value, range, min]);

    const updateValue = useCallback(
      (newValue: number[]) => {
        const clampedValue = newValue.map((v) => Math.min(max, Math.max(min, v)));

        if (!isControlled) {
          setInternalValue(clampedValue);
        }
        onValueChange?.(clampedValue);
      },
      [min, max, isControlled, onValueChange]
    );

    const getValueFromPosition = useCallback(
      (clientX: number, clientY: number) => {
        if (!trackRef.current) return 0;

        const rect = trackRef.current.getBoundingClientRect();
        let percentage: number;

        if (orientation === "horizontal") {
          percentage = (clientX - rect.left) / rect.width;
        } else {
          percentage = 1 - (clientY - rect.top) / rect.height;
        }

        if (inverted) {
          percentage = 1 - percentage;
        }

        percentage = Math.max(0, Math.min(1, percentage));

        const rawValue = min + percentage * (max - min);
        return Math.round(rawValue / step) * step;
      },
      [orientation, inverted, min, max, step]
    );

    const getPercentage = useCallback(
      (val: number) => {
        return ((val - min) / (max - min)) * 100;
      },
      [min, max]
    );

    const handlePointerDown = useCallback(
      (_e: React.PointerEvent, thumbIndex: number) => {
        if (disabled) return;

        setIsDragging(true);
        setActiveThumb(thumbIndex);

        const handlePointerMove = (e: PointerEvent) => {
          const newValue = getValueFromPosition(e.clientX, e.clientY);
          const newValues = [...normalizedValue];
          newValues[thumbIndex] = newValue;

          // Ensure proper ordering for range sliders
          if (range && newValues.length === 2) {
            newValues.sort((a, b) => a - b);
          }

          updateValue(newValues);
        };

        const handlePointerUp = () => {
          setIsDragging(false);
          setActiveThumb(null);
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerUp);
        };

        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp);
      },
      [disabled, normalizedValue, range, getValueFromPosition, updateValue]
    );

    const handleTrackClick = useCallback(
      (e: React.MouseEvent) => {
        if (disabled || isDragging) return;

        const newValue = getValueFromPosition(e.clientX, e.clientY);

        if (range && normalizedValue.length === 2) {
          // Find closest thumb
          const [min, max] = normalizedValue;
          const distToMin = Math.abs(newValue - min);
          const distToMax = Math.abs(newValue - max);
          const thumbIndex = distToMin <= distToMax ? 0 : 1;

          const newValues = [...normalizedValue];
          newValues[thumbIndex] = newValue;
          newValues.sort((a, b) => a - b);
          updateValue(newValues);
        } else {
          updateValue([newValue]);
        }
      },
      [disabled, isDragging, getValueFromPosition, range, normalizedValue, updateValue]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, thumbIndex: number) => {
        if (disabled) return;

        let delta = 0;

        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            delta = step;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            delta = -step;
            break;
          case "PageUp":
            delta = step * 10;
            break;
          case "PageDown":
            delta = -step * 10;
            break;
          case "Home":
            delta = min - normalizedValue[thumbIndex];
            break;
          case "End":
            delta = max - normalizedValue[thumbIndex];
            break;
          default:
            return;
        }

        e.preventDefault();

        const newValues = [...normalizedValue];
        newValues[thumbIndex] = Math.min(max, Math.max(min, normalizedValue[thumbIndex] + delta));

        if (range && newValues.length === 2) {
          newValues.sort((a, b) => a - b);
        }

        updateValue(newValues);
      },
      [disabled, step, min, max, normalizedValue, range, updateValue]
    );

    // Generate tick marks
    const generateTicks = useCallback(() => {
      if (tickMarks) return tickMarks;
      if (!showTicks) return [];

      const ticks = [];
      for (let i = min; i <= max; i += step * 10) {
        ticks.push(i);
      }
      return ticks;
    }, [tickMarks, showTicks, min, max, step]);

    const ticks = generateTicks();

    return (
      <div className="w-full space-y-2">
        {/* Label */}
        {label && (
          <label className="text-sm font-medium text-white">
            {label}
            {showValue && (
              <span className="ml-2 text-white/70">
                {range && normalizedValue.length === 2
                  ? `${formatValue(normalizedValue[0])} - ${formatValue(normalizedValue[1])}`
                  : formatValue(normalizedValue[0])}
              </span>
            )}
          </label>
        )}

        {/* Slider */}
        <div
          ref={ref}
          className={cn(liquidSliderVariants({ variant, size, orientation }), className)}
          {...props}
        >
          {/* Track */}
          <div
            ref={trackRef}
            className={cn(sliderTrackVariants({ size, orientation }))}
            onClick={handleTrackClick}
          >
            {/* Range fill */}
            {range && normalizedValue.length === 2 ? (
              <LiquidGlass
                variant="card"
                intensity="subtle"
                className={cn(
                  sliderRangeVariants({ variant, size, orientation }),
                  orientation === "horizontal"
                    ? {
                        left: `${getPercentage(normalizedValue[0])}%`,
                        width: `${getPercentage(normalizedValue[1]) - getPercentage(normalizedValue[0])}%`,
                      }
                    : {
                        bottom: `${getPercentage(normalizedValue[0])}%`,
                        height: `${getPercentage(normalizedValue[1]) - getPercentage(normalizedValue[0])}%`,
                      }
                )}
                style={
                  orientation === "horizontal"
                    ? {
                        left: `${getPercentage(normalizedValue[0])}%`,
                        width: `${getPercentage(normalizedValue[1]) - getPercentage(normalizedValue[0])}%`,
                      }
                    : {
                        bottom: `${getPercentage(normalizedValue[0])}%`,
                        height: `${getPercentage(normalizedValue[1]) - getPercentage(normalizedValue[0])}%`,
                      }
                }
              />
            ) : (
              <LiquidGlass
                variant="card"
                intensity="subtle"
                className={cn(sliderRangeVariants({ variant, size, orientation }))}
                style={
                  orientation === "horizontal"
                    ? { width: `${getPercentage(normalizedValue[0])}%` }
                    : { height: `${getPercentage(normalizedValue[0])}%` }
                }
              />
            )}

            {/* Tick marks */}
            {ticks.map((tick) => (
              <div
                key={tick}
                className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
                style={
                  orientation === "horizontal"
                    ? { left: `${getPercentage(tick)}%`, top: "50%", transform: "translateY(-50%)" }
                    : {
                        bottom: `${getPercentage(tick)}%`,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }
                }
              />
            ))}
          </div>

          {/* Thumbs */}
          {normalizedValue.map((val, index) => (
            <LiquidGlass
              key={index}
              variant="card"
              intensity="medium"
              className={cn(
                sliderThumbVariants({ size }),
                "absolute cursor-pointer",
                disabled && "cursor-not-allowed opacity-50",
                activeThumb === index && "ring-2 ring-blue-500/50"
              )}
              style={
                orientation === "horizontal"
                  ? { left: `${getPercentage(val)}%`, transform: "translateX(-50%)" }
                  : { bottom: `${getPercentage(val)}%`, transform: "translateY(50%)" }
              }
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={val}
              aria-valuetext={formatValue(val)}
              aria-orientation={orientation}
              aria-disabled={disabled}
              onPointerDown={(e) => handlePointerDown(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {/* Marks */}
        {marks && (
          <div className="relative">
            {marks.map((mark) => (
              <div
                key={mark.value}
                className="absolute text-xs text-white/60"
                style={
                  orientation === "horizontal"
                    ? { left: `${getPercentage(mark.value)}%`, transform: "translateX(-50%)" }
                    : { bottom: `${getPercentage(mark.value)}%`, transform: "translateY(50%)" }
                }
              >
                {mark.label || formatValue(mark.value)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

LiquidSlider.displayName = "LiquidSlider";

export {
  liquidSliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
  type LiquidSliderProps,
};
