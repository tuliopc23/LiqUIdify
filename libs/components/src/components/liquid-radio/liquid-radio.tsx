"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useCallback, useState } from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidRadioVariants = cva(
  "relative flex items-center gap-3 cursor-pointer group transition-all duration-200",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      variant: {
        default: "",
        card: "p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const radioCircleVariants = cva(
  "relative flex items-center justify-center transition-all duration-200 border-2 rounded-full",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
      checked: {
        true: "bg-blue-500 border-blue-500",
        false: "bg-white/10 border-white/30 hover:border-white/50",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      checked: false,
      disabled: false,
    },
  }
);

interface LiquidRadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof liquidRadioVariants> {
  label?: string;
  description?: string;
  error?: boolean;
  helperText?: string;
}

export const LiquidRadio = React.forwardRef<HTMLInputElement, LiquidRadioProps>(
  (
    {
      className,
      size,
      variant,
      label,
      description,
      checked,
      disabled = false,
      error = false,
      helperText,
      onChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!disabled) {
          onChange?.(e);
        }
      },
      [disabled, onChange]
    );

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    const handleMouseDown = useCallback(() => {
      if (!disabled) setIsPressed(true);
    }, [disabled]);

    const handleMouseUp = useCallback(() => setIsPressed(false), []);
    const handleMouseLeave = useCallback(() => setIsPressed(false), []);

    const RadioDot = () => (
      <div
        className={cn(
          "rounded-full bg-white transition-all duration-200",
          size === "sm" && "w-1.5 h-1.5",
          size === "md" && "w-2 h-2",
          size === "lg" && "w-2.5 h-2.5"
        )}
      />
    );

    const WrapperComponent = variant === "card" ? LiquidGlass : "label";
    const wrapperProps =
      variant === "card"
        ? {
            variant: "card" as const,
            intensity: "subtle" as const,
            hoverGlow: !disabled,
            rippleEffect: !disabled,
          }
        : {};

    return (
      <div className="w-full">
        <WrapperComponent
          className={cn(
            liquidRadioVariants({ size, variant }),
            disabled && "cursor-not-allowed opacity-50",
            error && "text-red-300",
            className
          )}
          {...wrapperProps}
        >
          <div className="relative flex items-center">
            <input
              ref={ref}
              type="radio"
              checked={checked}
              disabled={disabled}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="sr-only"
              {...props}
            />

            <div
              className={cn(
                radioCircleVariants({
                  size,
                  checked: Boolean(checked),
                  disabled,
                }),
                isFocused && "ring-2 ring-blue-500/50 ring-offset-2 ring-offset-transparent",
                isPressed && !disabled && "scale-95",
                error && "border-red-400 bg-red-500/20"
              )}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {checked && <RadioDot />}
            </div>
          </div>

          {(label || description) && (
            <div className="flex-1 select-none">
              {label && (
                <div className={cn("font-medium text-white", error && "text-red-300")}>{label}</div>
              )}
              {description && (
                <div
                  className={cn(
                    "text-white/70 mt-1",
                    size === "sm" && "text-xs",
                    size === "md" && "text-sm",
                    size === "lg" && "text-base"
                  )}
                >
                  {description}
                </div>
              )}
            </div>
          )}
        </WrapperComponent>

        {helperText && (
          <div className={cn("mt-2 text-xs", error ? "text-red-300" : "text-white/60")}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

LiquidRadio.displayName = "LiquidRadio";

// Radio Group Component
interface LiquidRadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const LiquidRadioGroup = React.forwardRef<HTMLDivElement, LiquidRadioGroupProps>(
  (
    {
      value,
      onChange,
      name,
      children,
      disabled = false,
      className,
      orientation = "vertical",
      ...props
    },
    ref
  ) => {
    const handleChange = useCallback(
      (radioValue: string) => {
        if (!disabled) {
          onChange?.(radioValue);
        }
      },
      [disabled, onChange]
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className
        )}
        role="radiogroup"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === LiquidRadio) {
            return React.cloneElement(child, {
              ...child.props,
              name,
              checked: child.props.value === value,
              disabled: disabled || child.props.disabled,
              onChange: () => handleChange(child.props.value),
            });
          }
          return child;
        })}
      </div>
    );
  }
);

LiquidRadioGroup.displayName = "LiquidRadioGroup";

export { liquidRadioVariants, type LiquidRadioProps, type LiquidRadioGroupProps };
