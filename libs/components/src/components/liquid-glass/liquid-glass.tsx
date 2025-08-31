"use client";

import * as React from "react";
import { type ReactNode, useCallback, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "button" | "card" | "panel" | "floating";
  intensity?: "subtle" | "medium" | "strong";
  rippleEffect?: boolean;
  flowOnHover?: boolean;
  stretchOnDrag?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  (
    {
      children,
      className,
      style,
      variant = "card",
      intensity = "medium",
      rippleEffect = true,
      flowOnHover = false,
      stretchOnDrag = true,
      onClick,
      onDragStart,
      onDragEnd,
      ...props
    },
    ref
  ) => {
    const [isJiggling, setIsJiggling] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [wobbleOffset, setWobbleOffset] = useState({ x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const elementRef = useRef<HTMLDivElement>(null);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const rippleCounter = useRef(0);

    const getVariantClasses = () => {
      const baseClasses = "liquid-glass relative overflow-hidden";

      switch (variant) {
        case "button":
          return `${baseClasses} px-6 py-3 rounded-2xl cursor-pointer select-none`;
        case "card":
          return `${baseClasses} p-6 rounded-3xl`;
        case "panel":
          return `${baseClasses} p-4 rounded-2xl`;
        case "floating":
          return `${baseClasses} p-4 rounded-2xl shadow-2xl`;
        default:
          return `${baseClasses} p-4 rounded-2xl`;
      }
    };

    const getAnimationClasses = () => {
      let classes = "";
      if (isJiggling) classes += " liquid-jiggle";
      if (flowOnHover && isHovering) classes += " liquid-flow";
      if (rippleEffect) classes += " liquid-ripple";
      return classes;
    };

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (onClick) {
          onClick(e);
        }

        if (rippleEffect) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rippleId = rippleCounter.current++;

          setRipples((prev) => [...prev, { id: rippleId, x, y }]);

          // Clean up ripple after animation
          setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== rippleId));
          }, 600);
        }

        // Trigger jiggle effect
        setIsJiggling(true);
        setTimeout(() => setIsJiggling(false), 600);
      },
      [onClick, rippleEffect]
    );

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovering(true);
      if (flowOnHover) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCursorPos({ x, y });
      }
    }, [flowOnHover]);

    const handleMouseLeave = useCallback(() => {
      setIsHovering(false);
    }, []);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (flowOnHover && isHovering) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setCursorPos({ x, y });
        }
      },
      [flowOnHover, isHovering]
    );

    const handleMouseDown = useCallback(() => {
      setIsPressed(true);
    }, []);

    const handleMouseUp = useCallback(() => {
      setIsPressed(false);
    }, []);

    // Touch event handlers for mobile
    const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
      setIsPressed(true);
      if (stretchOnDrag) {
        const touch = e.touches[0];
        if (touch && elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          dragStartPos.current = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
          };
          setIsDragging(true);
          onDragStart?.();
        }
      }
    }, [stretchOnDrag, onDragStart]);

    const handleTouchMove = useCallback(
      (e: React.TouchEvent<HTMLDivElement>) => {
        if (isDragging && stretchOnDrag) {
          const touch = e.touches[0];
          if (touch && elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const currentX = touch.clientX - rect.left;
            const currentY = touch.clientY - rect.top;
            const offsetX = currentX - dragStartPos.current.x;
            const offsetY = currentY - dragStartPos.current.y;
            setDragOffset({ x: offsetX * 0.1, y: offsetY * 0.1 });
          }
        }
      },
      [isDragging, stretchOnDrag]
    );

    const handleTouchEnd = useCallback(() => {
      setIsPressed(false);
      if (isDragging) {
        setIsDragging(false);
        setDragOffset({ x: 0, y: 0 });
        onDragEnd?.();
      }
    }, [isDragging, onDragEnd]);

    const dynamicStyle: React.CSSProperties = {
      ...style,
      transform: isDragging
        ? `translate(${dragOffset.x}px, ${dragOffset.y}px) ${
            isPressed ? "scale(0.96)" : ""
          }`
        : isPressed
        ? "scale(0.96)"
        : "",
      ...wobbleOffset,
    };

    return (
      <div
        ref={(node) => {
          elementRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(getVariantClasses(), getAnimationClasses(), className)}
        style={dynamicStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        {/* Content with proper z-index */}
        <div className="relative z-10">{children}</div>

        {/* Dynamic ripple effects */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute pointer-events-none z-5"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "var(--liquid-ripple-color)",
              transform: "translate(-50%, -50%)",
              animation: "liquidRipple 0.6s ease-out",
            }}
          />
        ))}
      </div>
    );
  }
);

LiquidGlass.displayName = "LiquidGlass";

export type { LiquidGlassProps };