"use client";

import * as React from "react";
import { useState, useRef, useCallback, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const liquidGlassVariants = cva(
  "relative overflow-hidden transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        button: "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer select-none",
        card: "flex flex-col",
        panel: "flex flex-col",
        floating: "inline-flex items-center justify-center shadow-2xl",
        navigation: "flex items-center"
      },
      intensity: {
        subtle: "backdrop-blur-sm bg-white/5 border border-white/10",
        medium: "backdrop-blur-xl bg-white/10 border border-white/20", 
        strong: "backdrop-blur-3xl bg-white/20 border border-white/30"
      },
      size: {
        sm: "text-sm",
        md: "text-base", 
        lg: "text-lg",
        xl: "text-xl"
      },
      radius: {
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        xl: "rounded-3xl",
        full: "rounded-full"
      }
    },
    compoundVariants: [
      {
        variant: "button",
        size: "sm",
        class: "px-4 py-2 rounded-xl"
      },
      {
        variant: "button", 
        size: "md",
        class: "px-6 py-3 rounded-2xl"
      },
      {
        variant: "button",
        size: "lg", 
        class: "px-8 py-4 rounded-2xl"
      },
      {
        variant: "button",
        size: "xl",
        class: "px-10 py-5 rounded-3xl"
      },
      {
        variant: "card",
        class: "p-6 rounded-3xl"
      },
      {
        variant: "panel",
        class: "p-8 rounded-2xl"
      },
      {
        variant: "floating",
        class: "p-4 rounded-full"
      },
      {
        variant: "navigation",
        class: "px-4 py-2 rounded-xl"
      }
    ],
    defaultVariants: {
      variant: "card",
      intensity: "medium", 
      size: "md",
      radius: "lg"
    }
  }
);

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidGlassVariants> {
  children: ReactNode;
  rippleEffect?: boolean;
  hoverGlow?: boolean;
  dragPhysics?: boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  asChild?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const LiquidGlass = React.forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ 
    children,
    className,
    variant,
    intensity,
    size,
    radius,
    rippleEffect = true,
    hoverGlow = true,
    dragPhysics = false,
    onDragStart,
    onDragEnd,
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onMouseEnter,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    style,
    ...props
  }, ref) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [isJiggling, setIsJiggling] = useState(false);

    const elementRef = useRef<HTMLDivElement>(null);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const rippleCounter = useRef(0);

    React.useImperativeHandle(ref, () => elementRef.current!);

    const createRipple = useCallback((e: React.MouseEvent | React.TouchEvent) => {
      if (!rippleEffect || !elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const newRipple: Ripple = {
        id: rippleCounter.current++,
        x,
        y,
      };

      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }, [rippleEffect]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      if (dragPhysics) {
        setIsDragging(true);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        onDragStart?.();
      }
      
      setIsPressed(true);
      createRipple(e);
      onMouseDown?.(e);
    }, [dragPhysics, onDragStart, createRipple, onMouseDown]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
      if (hoverGlow && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }

      if (isDragging) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;
        setDragOffset({ x: deltaX * 0.1, y: deltaY * 0.1 });
      }

      onMouseMove?.(e);
    }, [hoverGlow, isDragging, onMouseMove]);

    const handleMouseUp = useCallback((e: React.MouseEvent) => {
      if (isDragging) {
        setIsDragging(false);
        setDragOffset({ x: 0, y: 0 });
        onDragEnd?.();
        
        setIsJiggling(true);
        setTimeout(() => setIsJiggling(false), 800);
      }
      
      setIsPressed(false);
      onMouseUp?.(e);
    }, [isDragging, onDragEnd, onMouseUp]);

    const handleMouseEnter = useCallback((e: React.MouseEvent) => {
      setIsHovering(true);
      onMouseEnter?.(e);
    }, [onMouseEnter]);

    const handleMouseLeave = useCallback((e: React.MouseEvent) => {
      setIsHovering(false);
      setIsPressed(false);
      if (isDragging) {
        handleMouseUp(e);
      }
      onMouseLeave?.(e);
    }, [isDragging, handleMouseUp, onMouseLeave]);

    const handleClick = useCallback((e: React.MouseEvent) => {
      createRipple(e);
      onClick?.(e);
    }, [createRipple, onClick]);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (dragPhysics) {
        setIsDragging(true);
        dragStartPos.current = { x: touch.clientX, y: touch.clientY };
        onDragStart?.();
      }
      
      setIsPressed(true);
      createRipple(e);
      onTouchStart?.(e);
    }, [dragPhysics, onDragStart, createRipple, onTouchStart]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
      const touch = e.touches[0];
      
      if (hoverGlow && elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setCursorPos({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        });
      }

      if (isDragging) {
        e.preventDefault();
        const deltaX = touch.clientX - dragStartPos.current.x;
        const deltaY = touch.clientY - dragStartPos.current.y;
        setDragOffset({ x: deltaX * 0.1, y: deltaY * 0.1 });
      }

      onTouchMove?.(e);
    }, [hoverGlow, isDragging, onTouchMove]);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
      if (isDragging) {
        setIsDragging(false);
        setDragOffset({ x: 0, y: 0 });
        onDragEnd?.();
        
        setIsJiggling(true);
        setTimeout(() => setIsJiggling(false), 800);
      }
      
      setIsPressed(false);
      onTouchEnd?.(e);
    }, [isDragging, onDragEnd, onTouchEnd]);

    const transformStyle = React.useMemo(() => {
      if (isJiggling) {
        return {
          animation: "liquidJiggle 0.8s ease-out",
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`
        };
      }
      
      return isDragging ? {
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) scale(1.02)`,
        transition: "none"
      } : {
        transform: isPressed ? "scale(0.98)" : "scale(1)",
        transition: "transform 0.15s ease-out"
      };
    }, [isJiggling, isDragging, dragOffset, isPressed]);

    return (
      <>
        <style jsx>{`
          @keyframes liquidJiggle {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-2px, -1px) rotate(-0.5deg); }
            50% { transform: translate(2px, 1px) rotate(0.5deg); }
            75% { transform: translate(-1px, 2px) rotate(-0.3deg); }
          }
          
          @keyframes liquidRipple {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) scale(20);
              opacity: 0;
            }
          }
        `}</style>
        
        <div
          ref={elementRef}
          className={cn(
            liquidGlassVariants({ variant, intensity, size, radius }),
            "hover:bg-white/15 hover:border-white/25",
            isPressed && "bg-white/20 border-white/30",
            className
          )}
          style={{ ...transformStyle, ...style }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          {...props}
        >
          {/* Hover Glow Effect */}
          {hoverGlow && isHovering && (
            <div
              className="absolute pointer-events-none transition-opacity duration-200 z-10"
              style={{
                left: cursorPos.x,
                top: cursorPos.y,
                width: "80px",
                height: "80px",
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                filter: "blur(10px)",
              }}
            />
          )}

          {/* Ripple Effects */}
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute pointer-events-none z-20"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.4)",
                transform: "translate(-50%, -50%)",
                animation: "liquidRipple 0.6s ease-out forwards",
              }}
            />
          ))}

          {/* Content */}
          <div className="relative z-30">
            {children}
          </div>

          {/* Glass Highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-5" />
        </div>
      </>
    );
  }
);

LiquidGlass.displayName = "LiquidGlass";

export { liquidGlassVariants, type LiquidGlassProps };