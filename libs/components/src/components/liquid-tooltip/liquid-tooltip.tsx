"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidTooltipVariants = cva(
  "absolute z-50 px-3 py-2 text-sm text-white pointer-events-none select-none max-w-xs break-words",
  {
    variants: {
      variant: {
        default: "",
        dark: "bg-black/90 text-white",
        light: "bg-white/90 text-gray-900",
        info: "bg-blue-500/90 text-white",
        success: "bg-green-500/90 text-white",
        warning: "bg-yellow-500/90 text-gray-900",
        error: "bg-red-500/90 text-white",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const arrowVariants = cva("absolute w-2 h-2 rotate-45 border", {
  variants: {
    variant: {
      default: "bg-white/10 border-white/20",
      dark: "bg-black/90 border-black/90",
      light: "bg-white/90 border-white/90",
      info: "bg-blue-500/90 border-blue-500/90",
      success: "bg-green-500/90 border-green-500/90",
      warning: "bg-yellow-500/90 border-yellow-500/90",
      error: "bg-red-500/90 border-red-500/90",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TooltipSide = "top" | "right" | "bottom" | "left";
type TooltipAlign = "start" | "center" | "end";

interface Position {
  x: number;
  y: number;
  side: TooltipSide;
  align: TooltipAlign;
}

interface LiquidTooltipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidTooltipVariants> {
  content: React.ReactNode;
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  alignOffset?: number;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
  arrow?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const LiquidTooltip = React.forwardRef<HTMLDivElement, LiquidTooltipProps>(
  (
    {
      className,
      variant,
      size,
      content,
      side = "top",
      align = "center",
      sideOffset = 4,
      alignOffset = 0,
      delayDuration = 700,
      skipDelayDuration = 300,
      disableHoverableContent = false,
      arrow = true,
      open: controlledOpen,
      onOpenChange,
      children,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0, side, align });
    const [mounted, setMounted] = useState(false);

    const triggerRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const skipTimeoutRef = useRef<NodeJS.Timeout>();
    const lastOpenTime = useRef<number>(0);

    const open = controlledOpen ?? isOpen;

    const setOpen = useCallback(
      (newOpen: boolean) => {
        if (controlledOpen === undefined) {
          setIsOpen(newOpen);
        }
        onOpenChange?.(newOpen);
      },
      [controlledOpen, onOpenChange]
    );

    // Calculate tooltip position
    const calculatePosition = useCallback(
      (preferredSide: TooltipSide = side, preferredAlign: TooltipAlign = align): Position => {
        const trigger = triggerRef.current;
        const tooltip = tooltipRef.current;

        if (!trigger || !tooltip) {
          return { x: 0, y: 0, side: preferredSide, align: preferredAlign };
        }

        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight,
        };

        let x = 0;
        let y = 0;
        let finalSide = preferredSide;
        const finalAlign = preferredAlign;

        // Calculate base position based on side
        switch (preferredSide) {
          case "top":
            x = triggerRect.left + triggerRect.width / 2;
            y = triggerRect.top - sideOffset;
            break;
          case "bottom":
            x = triggerRect.left + triggerRect.width / 2;
            y = triggerRect.bottom + sideOffset;
            break;
          case "left":
            x = triggerRect.left - sideOffset;
            y = triggerRect.top + triggerRect.height / 2;
            break;
          case "right":
            x = triggerRect.right + sideOffset;
            y = triggerRect.top + triggerRect.height / 2;
            break;
        }

        // Adjust for alignment
        if (preferredSide === "top" || preferredSide === "bottom") {
          switch (preferredAlign) {
            case "start":
              x = triggerRect.left + alignOffset;
              break;
            case "end":
              x = triggerRect.right - alignOffset;
              break;
            case "center":
              x = triggerRect.left + triggerRect.width / 2 + alignOffset;
              break;
          }
        } else {
          switch (preferredAlign) {
            case "start":
              y = triggerRect.top + alignOffset;
              break;
            case "end":
              y = triggerRect.bottom - alignOffset;
              break;
            case "center":
              y = triggerRect.top + triggerRect.height / 2 + alignOffset;
              break;
          }
        }

        // Check viewport boundaries and flip if necessary
        const tooltipHalfWidth = tooltipRect.width / 2;
        const tooltipHalfHeight = tooltipRect.height / 2;

        // Flip side if tooltip would go outside viewport
        if (preferredSide === "top" && y - tooltipRect.height < 0) {
          finalSide = "bottom";
          y = triggerRect.bottom + sideOffset;
        } else if (preferredSide === "bottom" && y + tooltipRect.height > viewport.height) {
          finalSide = "top";
          y = triggerRect.top - sideOffset;
        } else if (preferredSide === "left" && x - tooltipRect.width < 0) {
          finalSide = "right";
          x = triggerRect.right + sideOffset;
        } else if (preferredSide === "right" && x + tooltipRect.width > viewport.width) {
          finalSide = "left";
          x = triggerRect.left - sideOffset;
        }

        // Adjust position based on final side
        if (finalSide === "top" || finalSide === "bottom") {
          if (preferredAlign === "center") {
            x = Math.max(tooltipHalfWidth, Math.min(x, viewport.width - tooltipHalfWidth));
          }
          if (finalSide === "top") {
            y -= tooltipRect.height;
          }
        } else {
          if (preferredAlign === "center") {
            y = Math.max(tooltipHalfHeight, Math.min(y, viewport.height - tooltipHalfHeight));
          }
          if (finalSide === "left") {
            x -= tooltipRect.width;
          }
        }

        return { x, y, side: finalSide, align: finalAlign };
      },
      [side, align, sideOffset, alignOffset]
    );

    // Update position when tooltip is open
    useEffect(() => {
      if (open && mounted) {
        const pos = calculatePosition();
        setPosition(pos);
      }
    }, [open, mounted, calculatePosition]);

    // Handle window resize
    useEffect(() => {
      if (!open) return;

      const handleResize = () => {
        const pos = calculatePosition();
        setPosition(pos);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [open, calculatePosition]);

    // Handle mouse events
    const handleMouseEnter = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const now = Date.now();
      const timeSinceLastOpen = now - lastOpenTime.current;
      const delay = timeSinceLastOpen < skipDelayDuration ? 0 : delayDuration;

      timeoutRef.current = setTimeout(() => {
        setOpen(true);
        setMounted(true);
      }, delay);
    }, [delayDuration, skipDelayDuration, setOpen]);

    const handleMouseLeave = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (!disableHoverableContent) {
        timeoutRef.current = setTimeout(() => {
          setOpen(false);
          lastOpenTime.current = Date.now();
        }, 100);
      } else {
        setOpen(false);
        lastOpenTime.current = Date.now();
      }
    }, [disableHoverableContent, setOpen]);

    const handleTooltipMouseEnter = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }, []);

    const handleTooltipMouseLeave = useCallback(() => {
      setOpen(false);
      lastOpenTime.current = Date.now();
    }, [setOpen]);

    // Handle focus events
    const handleFocus = useCallback(() => {
      setOpen(true);
      setMounted(true);
    }, [setOpen]);

    const handleBlur = useCallback(() => {
      setOpen(false);
      lastOpenTime.current = Date.now();
    }, [setOpen]);

    // Cleanup timeouts
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (skipTimeoutRef.current) {
          clearTimeout(skipTimeoutRef.current);
        }
      };
    }, []);

    // Get arrow position styles
    const getArrowStyles = (): React.CSSProperties => {
      const _arrowSize = 8;

      switch (position.side) {
        case "top":
          return {
            top: "100%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%)",
            borderTop: "none",
            borderLeft: "none",
          };
        case "bottom":
          return {
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%) translateY(50%)",
            borderBottom: "none",
            borderRight: "none",
          };
        case "left":
          return {
            left: "100%",
            top: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            borderLeft: "none",
            borderBottom: "none",
          };
        case "right":
          return {
            right: "100%",
            top: "50%",
            transform: "translateY(-50%) translateX(50%)",
            borderRight: "none",
            borderTop: "none",
          };
        default:
          return {};
      }
    };

    // Clone children with event handlers
    const trigger = React.Children.only(children) as React.ReactElement;
    const clonedTrigger = React.cloneElement(trigger, {
      ref: triggerRef,
      onMouseEnter: (e: React.MouseEvent) => {
        trigger.props.onMouseEnter?.(e);
        handleMouseEnter();
      },
      onMouseLeave: (e: React.MouseEvent) => {
        trigger.props.onMouseLeave?.(e);
        handleMouseLeave();
      },
      onFocus: (e: React.FocusEvent) => {
        trigger.props.onFocus?.(e);
        handleFocus();
      },
      onBlur: (e: React.FocusEvent) => {
        trigger.props.onBlur?.(e);
        handleBlur();
      },
    });

    return (
      <>
        {clonedTrigger}

        {open && mounted && (
          <div
            ref={tooltipRef}
            style={{
              position: "fixed",
              left: position.x,
              top: position.y,
              zIndex: 50,
            }}
            onMouseEnter={!disableHoverableContent ? handleTooltipMouseEnter : undefined}
            onMouseLeave={!disableHoverableContent ? handleTooltipMouseLeave : undefined}
          >
            <LiquidGlass
              ref={ref}
              variant="card"
              intensity="subtle"
              className={cn(
                liquidTooltipVariants({ variant, size }),
                "animate-in fade-in-0 zoom-in-95 duration-150",
                className
              )}
              role="tooltip"
              {...props}
            >
              {content}

              {arrow && <div className={cn(arrowVariants({ variant }))} style={getArrowStyles()} />}
            </LiquidGlass>
          </div>
        )}
      </>
    );
  }
);

LiquidTooltip.displayName = "LiquidTooltip";

// Sub-components for advanced usage
interface LiquidTooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const LiquidTooltipTrigger = React.forwardRef<HTMLElement, LiquidTooltipTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        ...props,
      });
    }

    return (
      <span ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

LiquidTooltipTrigger.displayName = "LiquidTooltipTrigger";

interface LiquidTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidTooltipContent = React.forwardRef<HTMLDivElement, LiquidTooltipContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props}>
      {children}
    </div>
  )
);

LiquidTooltipContent.displayName = "LiquidTooltipContent";

export {
  liquidTooltipVariants,
  arrowVariants,
  type LiquidTooltipProps,
  type TooltipSide,
  type TooltipAlign,
};
