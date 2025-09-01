"use client";

import * as React from "react";
import { useCallback, useState, useRef } from "react";
import { css, cx } from "../../../../../styled-system/css";
import { button } from "../../../../../styled-system/recipes";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rippleEffect?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      icon,
      iconPosition = "left",
      rippleEffect = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const rippleCounter = useRef(0);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        // Ripple effect
        if (rippleEffect) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rippleId = rippleCounter.current++;

          setRipples((prev) => [...prev, { id: rippleId, x, y }]);

          setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== rippleId));
          }, 600);
        }

        onClick?.(e);
      },
      [disabled, loading, rippleEffect, onClick]
    );

    const buttonClasses = button({ variant, size });

    const iconClasses = css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "16px",
      height: "16px",
      position: "relative",
      zIndex: 2,
    });

    const contentClasses = css({
      position: "relative",
      zIndex: 2,
      opacity: loading ? 0.7 : 1,
    });

    const spinnerClasses = css({
      width: "16px",
      height: "16px",
      border: "2px solid token(colors.text.glass.muted)",
      borderTop: "2px solid token(colors.text.glass.primary)",
      borderRadius: "token(radii.full)",
      animation: "spin 1s linear infinite",
    });

    const rippleClasses = css({
      position: "absolute",
      borderRadius: "token(radii.full)",
      background: "token(colors.glass.ripple)",
      transform: "translate(-50%, -50%)",
      animation: "liquidRipple token(durations.glass.bounce) ease-out",
      pointerEvents: "none",
      zIndex: 10,
    });

    return (
      <button
        ref={ref}
        className={cx(buttonClasses, className)}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {/* Loading spinner */}
        {loading && <div className={spinnerClasses} />}

        {/* Left icon */}
        {icon && iconPosition === "left" && !loading && <span className={iconClasses}>{icon}</span>}

        {/* Button content */}
        <span className={contentClasses}>{children}</span>

        {/* Right icon */}
        {icon && iconPosition === "right" && !loading && (
          <span className={iconClasses}>{icon}</span>
        )}

        {/* Dynamic ripples */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className={rippleClasses}
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: "8px",
              height: "8px",
            }}
          />
        ))}
      </button>
    );
  }
);

Button.displayName = "Button";
