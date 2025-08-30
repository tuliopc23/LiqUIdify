"use client";

import * as React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidTextareaVariants = cva(
  "w-full transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500/50",
  {
    variants: {
      variant: {
        default: "bg-white/10 border-white/20 focus-within:bg-white/15 focus-within:border-white/30",
        filled: "bg-white/15 border-white/25 focus-within:bg-white/20 focus-within:border-white/35",
        ghost: "bg-transparent border-white/10 focus-within:bg-white/5 focus-within:border-white/20",
        error: "bg-red-500/10 border-red-400/30 focus-within:bg-red-500/15 focus-within:border-red-400/40"
      },
      size: {
        sm: "px-3 py-2 text-sm rounded-lg",
        md: "px-4 py-3 text-base rounded-xl",
        lg: "px-5 py-4 text-lg rounded-2xl"
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      resize: "vertical"
    }
  }
);

interface LiquidTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, VariantProps<typeof liquidTextareaVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  autoResize?: boolean;
  maxHeight?: number;
  minHeight?: number;
  showCharCount?: boolean;
  maxLength?: number;
}

export const LiquidTextarea = React.forwardRef<HTMLTextAreaElement, LiquidTextareaProps>(
  ({
    className,
    variant,
    size,
    resize,
    label,
    helperText,
    errorMessage,
    autoResize = false,
    maxHeight = 300,
    minHeight = 80,
    showCharCount = false,
    maxLength,
    disabled,
    value,
    onChange,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [textareaHeight, setTextareaHeight] = useState(minHeight);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const isError = Boolean(errorMessage);
    const effectiveVariant = isError ? "error" : variant;
    const charCount = String(value || "").length;
    const isOverLimit = maxLength ? charCount > maxLength : false;

    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      // Reset height to recalculate
      textarea.style.height = 'auto';
      
      // Calculate new height
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      
      textarea.style.height = `${newHeight}px`;
      setTextareaHeight(newHeight);
    }, [autoResize, minHeight, maxHeight]);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    }, [props]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    }, [props]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      if (autoResize) {
        // Use setTimeout to ensure the value is updated before adjusting height
        setTimeout(adjustHeight, 0);
      }
    }, [onChange, autoResize, adjustHeight]);

    // Adjust height when value changes externally
    useEffect(() => {
      if (autoResize) {
        adjustHeight();
      }
    }, [value, adjustHeight, autoResize]);

    // Set initial height
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = `${minHeight}px`;
        adjustHeight();
      }
    }, [autoResize, minHeight, adjustHeight]);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/90 mb-2">
            {label}
          </label>
        )}
        
        <LiquidGlass
          variant="card"
          intensity="medium"
          hoverGlow={!disabled}
          className={cn(
            liquidTextareaVariants({ variant: effectiveVariant, size, resize }),
            "flex flex-col",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <textarea
            ref={textareaRef}
            value={value}
            disabled={disabled}
            maxLength={maxLength}
            className={cn(
              "w-full bg-transparent border-none outline-none text-white placeholder-white/50 flex-1",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              !autoResize && "min-h-20"
            )}
            style={autoResize ? { 
              height: textareaHeight,
              minHeight: minHeight,
              maxHeight: maxHeight,
              overflow: textareaHeight >= maxHeight ? 'auto' : 'hidden'
            } : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
          
          {showCharCount && (
            <div className="flex justify-end mt-2 pt-2 border-t border-white/10">
              <span className={cn(
                "text-xs",
                isOverLimit ? "text-red-300" : "text-white/60"
              )}>
                {charCount}{maxLength && `/${maxLength}`}
              </span>
            </div>
          )}
        </LiquidGlass>
        
        {(helperText || errorMessage) && (
          <div className={cn(
            "mt-2 text-xs",
            isError ? "text-red-300" : "text-white/60"
          )}>
            {errorMessage || helperText}
          </div>
        )}
      </div>
    );
  }
);

LiquidTextarea.displayName = "LiquidTextarea";

export { liquidTextareaVariants, type LiquidTextareaProps };