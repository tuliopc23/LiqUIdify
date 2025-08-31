"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useCallback, useState } from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidInputVariants = cva(
  "w-full transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500/50",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 border-white/20 focus-within:bg-white/15 focus-within:border-white/30",
        filled: "bg-white/15 border-white/25 focus-within:bg-white/20 focus-within:border-white/35",
        ghost:
          "bg-transparent border-white/10 focus-within:bg-white/5 focus-within:border-white/20",
        error:
          "bg-red-500/10 border-red-400/30 focus-within:bg-red-500/15 focus-within:border-red-400/40",
      },
      size: {
        sm: "px-3 py-2 text-sm rounded-lg min-h-9",
        md: "px-4 py-3 text-base rounded-xl min-h-11",
        lg: "px-5 py-4 text-lg rounded-2xl min-h-12",
      },
      labelStyle: {
        default: "",
        floating: "relative",
        outside: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      labelStyle: "default",
    },
  }
);

interface LiquidInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof liquidInputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

export const LiquidInput = React.forwardRef<HTMLInputElement, LiquidInputProps>(
  (
    {
      className,
      variant,
      size,
      labelStyle,
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      value,
      placeholder,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value));

    const isFloating = labelStyle === "floating";
    const isError = Boolean(errorMessage);
    const effectiveVariant = isError ? "error" : variant;

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        props.onFocus?.(e);
      },
      [props]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        props.onBlur?.(e);
      },
      [props]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(Boolean(e.target.value));
        props.onChange?.(e);
      },
      [props]
    );

    const handleClear = useCallback(() => {
      setHasValue(false);
      onClear?.();
    }, [onClear]);

    const shouldFloatLabel = isFloating && (isFocused || hasValue);

    const inputElement = (
      <input
        ref={ref}
        value={value}
        placeholder={isFloating ? (shouldFloatLabel ? placeholder : "") : placeholder}
        disabled={disabled}
        className={cn(
          "w-full bg-transparent border-none outline-none text-white placeholder-white/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          leftIcon && "pl-2",
          (rightIcon || clearable) && "pr-2"
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
    );

    const renderFloatingLabel = () => {
      if (!isFloating || !label) return null;

      return (
        <label
          className={cn(
            "absolute left-4 text-white/70 transition-all duration-200 pointer-events-none",
            shouldFloatLabel
              ? "top-2 text-xs font-medium text-white/90 transform -translate-y-1"
              : "top-1/2 -translate-y-1/2 text-base"
          )}
        >
          {label}
        </label>
      );
    };

    const renderOutsideLabel = () => {
      if (labelStyle !== "outside" || !label) return null;

      return <label className="block text-sm font-medium text-white/90 mb-2">{label}</label>;
    };

    const renderDefaultLabel = () => {
      if (labelStyle !== "default" || !label) return null;

      return <label className="block text-sm font-medium text-white/90 mb-2">{label}</label>;
    };

    return (
      <div className="w-full">
        {renderOutsideLabel()}
        {renderDefaultLabel()}

        <LiquidGlass
          variant="card"
          intensity="medium"
          hoverGlow={!disabled}
          className={cn(
            liquidInputVariants({ variant: effectiveVariant, size, labelStyle }),
            "flex items-center gap-3",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {renderFloatingLabel()}

          {leftIcon && (
            <div className="flex-shrink-0 w-5 h-5 text-white/60 flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <div className="flex-1 relative">{inputElement}</div>

          {clearable && hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 w-5 h-5 text-white/60 hover:text-white/80 transition-colors flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16ZM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646Z" />
              </svg>
            </button>
          )}

          {rightIcon && !clearable && (
            <div className="flex-shrink-0 w-5 h-5 text-white/60 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </LiquidGlass>

        {(helperText || errorMessage) && (
          <div className={cn("mt-2 text-xs", isError ? "text-red-300" : "text-white/60")}>
            {errorMessage || helperText}
          </div>
        )}
      </div>
    );
  }
);

LiquidInput.displayName = "LiquidInput";

export { liquidInputVariants, type LiquidInputProps };
