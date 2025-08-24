import React, { useCallback, useEffect, useRef, useState } from "react";

import { cn, getGlassClass } from "../../core/utils/classname";

interface GlassSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  showValue?: boolean;
  variant?: "default" | "minimal";
}

export const GlassSlider = React.memo(
  React.forwardRef<HTMLDivElement, GlassSliderProps>(
    (
      {
        min = 0,
        max = 100,
        step = 1,
        value = 0,
        onChange,
        disabled,
        className,
        showValue = true,
        variant = "default",
        ...props
      },
      ref,
    ) => {
      const [currentValue, setCurrentValue] = useState(value);
      const [isDragging, setIsDragging] = useState(false);
      const sliderRef = useRef<HTMLDivElement>(null);
      const thumbRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        setCurrentValue(value);
      }, [value]);

      const percentage = ((currentValue - min) / (max - min)) * 100;

      const updateValue = useCallback(
        (clientX: number) => {
          if (!sliderRef.current) {
            return;
          }

          const rect = sliderRef.current.getBoundingClientRect();
          const percentage = Math.max(
            0,
            Math.min(1, (clientX - rect.left) / rect.width),
          );
          const newValue = min + percentage * (max - min);
          const steppedValue = Math.round(newValue / step) * step;
          const clampedValue = Math.max(min, Math.min(max, steppedValue));

          setCurrentValue(clampedValue);
          onChange?.(clampedValue);
        },
        [min, max, step, onChange],
      );

      const handleMouseMove = useCallback(
        (e: MouseEvent) => {
          if (!isDragging || disabled) {
            return;
          }
          updateValue(e.clientX);
        },
        [isDragging, disabled, updateValue],
      );

      const handleMouseUp = useCallback(() => {
        setIsDragging(false);
      }, []);

      const handleMouseDown = (e: React.MouseEvent) => {
        if (disabled) {
          return;
        }

        setIsDragging(true);
        updateValue(e.clientX);
      };

      useEffect(() => {
        if (isDragging && typeof document !== "undefined") {
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
          if (typeof document !== "undefined") {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          }
        };
      }, [isDragging, handleMouseMove, handleMouseUp]);

      return (
        <div
          ref={ref}
          className={cn("liquid-glass", "relative w-full", className)}
          {...props}
        >
          {showValue && (
            <div className="mb-3 flex items-center justify-between">
              <span className="text-liquid-text/70 text-sm">Value</span>

              <span className="font-medium text-liquid-primary text-sm">
                {currentValue}
              </span>
            </div>
          )}

          <div
            ref={sliderRef}
            className={cn(
              "relative h-2 cursor-pointer rounded-full",
              variant === "default" && getGlassClass("default"),
              variant === "minimal" && "bg-liquid-bg/20",
              disabled && "cursor-not-allowed opacity-50",
            )}
            onMouseDown={handleMouseDown}
          >
            {/* Track fill */}

            <div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-apple-blue-500 to-apple-blue-400 transition-all duration-200"
              style={{ width: `${percentage}%` }}
            />

            {/* Thumb */}

            <div
              ref={thumbRef}
              className={cn(
                "-translate-y-1/2 -translate-x-1/2 absolute top-1/2 transform",
                "h-5 w-5 rounded-full transition-all duration-200",
                getGlassClass("elevated"),
                "border-2 border-liquid-highlight/30",
                "hover:scale-110 active:scale-95",
                isDragging && "scale-110 ring-4 ring-liquid-accent/30",
                disabled && "cursor-not-allowed",
              )}
              style={{ left: `${percentage}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-liquid-text/70 text-xs">
            <span>{min}</span>

            <span>{max}</span>
          </div>
        </div>
      );
    },
  ),
);

GlassSlider.displayName = "GlassSlider";
