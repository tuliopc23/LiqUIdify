"use client";

import React, { useCallback, useRef, useState } from "react";
import { css, cx } from "../../../../../styled-system/css";
import { liquidGlass } from "../../../../../styled-system/recipes";

export interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "subtle" | "medium" | "strong";
  size?: "sm" | "md" | "lg";
  rippleEffect?: boolean;
  hoverGlow?: boolean;
}

export const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  (
    {
      children,
      className,
      style,
      intensity = "medium",
      size = "md",
      rippleEffect = true,
      hoverGlow = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [isHovered, setIsHovered] = useState(false);
    const rippleCounter = useRef(0);

    const createRipple = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!rippleEffect) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rippleId = rippleCounter.current++;

        setRipples((prev) => [...prev, { id: rippleId, x, y }]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((ripple) => ripple.id !== rippleId));
        }, 600);
      },
      [rippleEffect]
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        createRipple(e);
        onClick?.(e);
      },
      [createRipple, onClick]
    );

    const baseClasses = liquidGlass({ intensity, size });

    const hoverGlowStyle =
      isHovered && hoverGlow
        ? css({
            boxShadow: "token(shadows.glass.hover)",
            transform: "translateY(-1px)",
          })
        : "";

    const combinedClassName = cx(baseClasses, hoverGlowStyle, className);

    return (
      <div
        ref={ref}
        className={combinedClassName}
        style={style}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {children}

        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className={css({
              position: "absolute",
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "token(colors.glass.ripple)",
              transform: "translate(-50%, -50%)",
              animation: "liquidRipple token(durations.glass.bounce) ease-out",
              pointerEvents: "none",
              zIndex: 10,
            })}
          />
        ))}
      </div>
    );
  }
);

LiquidGlass.displayName = "LiquidGlass";
