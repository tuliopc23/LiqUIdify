"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidCheckboxVariants = cva(
  "relative flex items-center gap-3 cursor-pointer group transition-all duration-200",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
      },
      variant: {
        default: "",
        card: "p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);

const checkboxBoxVariants = cva(
  "relative flex items-center justify-center transition-all duration-200 border-2",
  {
    variants: {
      size: {
        sm: "w-4 h-4 rounded",
        md: "w-5 h-5 rounded-md", 
        lg: "w-6 h-6 rounded-md"
      },
      checked: {
        true: "bg-blue-500 border-blue-500 text-white",
        false: "bg-white/10 border-white/30 hover:border-white/50"
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      checked: false,
      disabled: false
    }
  }
);

interface LiquidCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof liquidCheckboxVariants> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  error?: boolean;
  helperText?: string;
}

export const LiquidCheckbox = React.forwardRef<HTMLInputElement, LiquidCheckboxProps>(
  ({
    className,
    size,
    variant,
    label,
    description,
    checked,
    indeterminate = false,
    disabled = false,
    error = false,
    helperText,
    onChange,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange?.(e);
      }
    }, [disabled, onChange]);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);
    
    const handleMouseDown = useCallback(() => {
      if (!disabled) setIsPressed(true);
    }, [disabled]);
    
    const handleMouseUp = useCallback(() => setIsPressed(false), []);
    const handleMouseLeave = useCallback(() => setIsPressed(false), []);

    const CheckIcon = () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M10.28 2.28a.75.75 0 0 0-1.06-1.06L4.5 6.94 2.28 4.72a.75.75 0 0 0-1.06 1.06l2.75 2.75a.75.75 0 0 0 1.06 0l5.25-5.25Z"/>
      </svg>
    );

    const IndeterminateIcon = () => (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
        <path d="M2 6a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 2 6Z"/>
      </svg>
    );

    const WrapperComponent = variant === "card" ? LiquidGlass : "label";
    const wrapperProps = variant === "card" ? {
      variant: "card" as const,
      intensity: "subtle" as const,
      hoverGlow: !disabled,
      rippleEffect: !disabled
    } : {};

    return (
      <div className="w-full">
        <WrapperComponent
          className={cn(
            liquidCheckboxVariants({ size, variant }),
            disabled && "cursor-not-allowed opacity-50",
            error && "text-red-300",
            className
          )}
          {...wrapperProps}
        >
          <div className="relative flex items-center">
            <input
              ref={ref}
              type="checkbox"
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
                checkboxBoxVariants({ 
                  size, 
                  checked: checked || indeterminate, 
                  disabled 
                }),
                isFocused && "ring-2 ring-blue-500/50 ring-offset-2 ring-offset-transparent",
                isPressed && !disabled && "scale-95",
                error && "border-red-400 bg-red-500/20"
              )}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {indeterminate ? (
                <IndeterminateIcon />
              ) : checked ? (
                <CheckIcon />
              ) : null}
            </div>
          </div>
          
          {(label || description) && (
            <div className="flex-1 select-none">
              {label && (
                <div className={cn(
                  "font-medium text-white",
                  error && "text-red-300"
                )}>
                  {label}
                </div>
              )}
              {description && (
                <div className={cn(
                  "text-white/70 mt-1",
                  size === "sm" && "text-xs",
                  size === "md" && "text-sm", 
                  size === "lg" && "text-base"
                )}>
                  {description}
                </div>
              )}
            </div>
          )}
        </WrapperComponent>
        
        {helperText && (
          <div className={cn(
            "mt-2 text-xs",
            error ? "text-red-300" : "text-white/60"
          )}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

LiquidCheckbox.displayName = "LiquidCheckbox";

export { liquidCheckboxVariants, type LiquidCheckboxProps };