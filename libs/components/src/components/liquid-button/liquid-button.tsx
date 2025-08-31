"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useCallback, useState } from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "focus-visible:ring-blue-500/50",
        secondary: "focus-visible:ring-white/50", 
        ghost: "focus-visible:ring-white/30",
        danger: "focus-visible:ring-red-500/50",
        success: "focus-visible:ring-green-500/50",
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-xl min-h-9",
        md: "px-6 py-3 text-base rounded-2xl min-h-11",
        lg: "px-8 py-4 text-lg rounded-2xl min-h-12",
        xl: "px-10 py-5 text-xl rounded-3xl min-h-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidButtonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rippleEffect?: boolean;
  hoverGlow?: boolean;
  dragPhysics?: boolean;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
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
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;
        onClick?.(e);
      },
      [disabled, loading, onClick]
    );

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
        <span className={cn("flex-1 text-center", loading && "opacity-70")}>{children}</span>
        {icon && iconPosition === "right" && !loading && (
          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>
        )}
      </>
    );

    return (
      <LiquidGlass
        variant="button"
        intensity="medium"
        rippleEffect={rippleEffect}
        flowOnHover={hoverGlow && !disabled}
        stretchOnDrag={dragPhysics && !disabled}
        className={cn(
          liquidButtonVariants({ variant, size }),
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
        asChild
      >
        <button ref={ref} disabled={disabled || loading} type="button" {...props}>
          {buttonContent}
        </button>
      </LiquidGlass>
    );
  }
);

LiquidButton.displayName = "LiquidButton";

export { liquidButtonVariants, type LiquidButtonProps };
