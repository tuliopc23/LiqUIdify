"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "text-white bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-400/30 hover:from-blue-400/30 hover:to-purple-500/30 focus-visible:ring-blue-500",
        secondary: "text-gray-100 bg-white/10 border-white/20 hover:bg-white/15 focus-visible:ring-white/50",
        ghost: "text-white bg-transparent border-white/10 hover:bg-white/5 focus-visible:ring-white/30",
        danger: "text-white bg-gradient-to-r from-red-500/20 to-pink-600/20 border-red-400/30 hover:from-red-400/30 hover:to-pink-500/30 focus-visible:ring-red-500",
        success: "text-white bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-400/30 hover:from-green-400/30 hover:to-emerald-500/30 focus-visible:ring-green-500"
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-xl min-h-9",
        md: "px-6 py-3 text-base rounded-2xl min-h-11", 
        lg: "px-8 py-4 text-lg rounded-2xl min-h-12",
        xl: "px-10 py-5 text-xl rounded-3xl min-h-14"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof liquidButtonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rippleEffect?: boolean;
  hoverGlow?: boolean;
  dragPhysics?: boolean;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ 
    children,
    className,
    variant,
    size,
    loading = false,
    disabled = false,
    icon,
    iconPosition = "left",
    rippleEffect = true,
    hoverGlow = true,
    dragPhysics = false,
    onClick,
    ...props
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      onClick?.(e);
    }, [disabled, loading, onClick]);

    const handleMouseDown = useCallback(() => {
      if (!disabled && !loading) {
        setIsPressed(true);
      }
    }, [disabled, loading]);

    const handleMouseUp = useCallback(() => {
      setIsPressed(false);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsPressed(false);
    }, []);

    const buttonContent = (
      <>
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0" />
        )}
        {icon && iconPosition === "left" && !loading && (
          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>
        )}
        <span className={cn("flex-1 text-center", loading && "opacity-70")}>
          {children}
        </span>
        {icon && iconPosition === "right" && !loading && (
          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>
        )}
      </>
    );

    return (
      <LiquidGlass
        variant="button"
        intensity="medium"
        size={size}
        rippleEffect={rippleEffect}
        hoverGlow={hoverGlow && !disabled}
        dragPhysics={dragPhysics && !disabled}
        className={cn(
          liquidButtonVariants({ variant, size }),
          disabled && "opacity-50 cursor-not-allowed",
          isPressed && !disabled && "scale-95",
          className
        )}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
        asChild
      >
        <button
          ref={ref}
          disabled={disabled || loading}
          type="button"
          {...props}
        >
          {buttonContent}
        </button>
      </LiquidGlass>
    );
  }
);

LiquidButton.displayName = "LiquidButton";

export { liquidButtonVariants, type LiquidButtonProps };