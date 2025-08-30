"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidPopoverVariants = cva(
  "absolute z-50 min-w-32 overflow-hidden rounded-lg border border-white/20 shadow-lg",
  {
    variants: {
      variant: {
        default: "",
        card: "border-white/10",
        menu: "py-1",
        dialog: "p-0"
      },
      size: {
        sm: "max-w-xs",
        md: "max-w-sm", 
        lg: "max-w-md",
        xl: "max-w-lg",
        auto: "w-auto"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const arrowVariants = cva(
  "absolute w-2 h-2 rotate-45 border border-white/20",
  {
    variants: {
      variant: {
        default: "bg-white/10",
        card: "bg-white/10",
        menu: "bg-white/10",
        dialog: "bg-white/10"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type PopoverSide = "top" | "right" | "bottom" | "left";
type PopoverAlign = "start" | "center" | "end";

interface Position {
  x: number;
  y: number;
  side: PopoverSide;
  align: PopoverAlign;
}

interface LiquidPopoverProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidPopoverVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: PopoverSide;
  align?: PopoverAlign;
  sideOffset?: number;
  alignOffset?: number;
  arrow?: boolean;
  modal?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  trigger?: React.ReactNode;
  children: React.ReactNode;
}

export const LiquidPopover = React.forwardRef<HTMLDivElement, LiquidPopoverProps>(
  ({
    className,
    variant,
    size,
    open = false,
    onOpenChange,
    side = "bottom",
    align = "center",
    sideOffset = 4,
    alignOffset = 0,
    arrow = true,
    modal = false,
    closeOnClickOutside = true,
    closeOnEscape = true,
    trigger,
    children,
    ...props
  }, ref) => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0, side, align });
    const [mounted, setMounted] = useState(false);
    
    const triggerRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Handle mount state
    useEffect(() => {
      if (open) {
        setMounted(true);
      } else {
        const timer = setTimeout(() => setMounted(false), 150);
        return () => clearTimeout(timer);
      }
    }, [open]);

    // Calculate popover position
    const calculatePosition = useCallback((preferredSide: PopoverSide = side, preferredAlign: PopoverAlign = align): Position => {
      const triggerElement = triggerRef.current;
      const popoverElement = popoverRef.current;
      
      if (!triggerElement || !popoverElement) {
        return { x: 0, y: 0, side: preferredSide, align: preferredAlign };
      }

      const triggerRect = triggerElement.getBoundingClientRect();
      const popoverRect = popoverElement.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      };

      let x = 0;
      let y = 0;
      let finalSide = preferredSide;
      let finalAlign = preferredAlign;

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

      // Flip side if popover would go outside viewport
      if (preferredSide === "top" && y - popoverRect.height < 0) {
        finalSide = "bottom";
        y = triggerRect.bottom + sideOffset;
      } else if (preferredSide === "bottom" && y + popoverRect.height > viewport.height) {
        finalSide = "top";
        y = triggerRect.top - sideOffset;
      } else if (preferredSide === "left" && x - popoverRect.width < 0) {
        finalSide = "right";
        x = triggerRect.right + sideOffset;
      } else if (preferredSide === "right" && x + popoverRect.width > viewport.width) {
        finalSide = "left";
        x = triggerRect.left - sideOffset;
      }

      // Adjust position based on final side
      if (finalSide === "top" || finalSide === "bottom") {
        if (preferredAlign === "center") {
          x = Math.max(popoverRect.width / 2, Math.min(x, viewport.width - popoverRect.width / 2));
        }
        if (finalSide === "top") {
          y -= popoverRect.height;
        }
      } else {
        if (preferredAlign === "center") {
          y = Math.max(popoverRect.height / 2, Math.min(y, viewport.height - popoverRect.height / 2));
        }
        if (finalSide === "left") {
          x -= popoverRect.width;
        }
      }

      // Ensure popover stays within viewport bounds
      x = Math.max(8, Math.min(x, viewport.width - popoverRect.width - 8));
      y = Math.max(8, Math.min(y, viewport.height - popoverRect.height - 8));

      return { x, y, side: finalSide, align: finalAlign };
    }, [side, align, sideOffset, alignOffset]);

    // Update position when popover is open
    useEffect(() => {
      if (open && mounted) {
        const timer = setTimeout(() => {
          const pos = calculatePosition();
          setPosition(pos);
        }, 0);
        return () => clearTimeout(timer);
      }
    }, [open, mounted, calculatePosition]);

    // Handle window resize and scroll
    useEffect(() => {
      if (!open) return;

      const handleUpdate = () => {
        const pos = calculatePosition();
        setPosition(pos);
      };

      window.addEventListener('resize', handleUpdate);
      window.addEventListener('scroll', handleUpdate, true);
      
      return () => {
        window.removeEventListener('resize', handleUpdate);
        window.removeEventListener('scroll', handleUpdate, true);
      };
    }, [open, calculatePosition]);

    // Handle click outside
    useEffect(() => {
      if (!open || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const trigger = triggerRef.current;
        const popover = popoverRef.current;
        
        if (
          trigger && !trigger.contains(target) &&
          popover && !popover.contains(target)
        ) {
          onOpenChange?.(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, closeOnClickOutside, onOpenChange]);

    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onOpenChange?.(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onOpenChange]);

    // Get arrow position styles
    const getArrowStyles = (): React.CSSProperties => {
      switch (position.side) {
        case "top":
          return {
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            borderTop: 'none',
            borderLeft: 'none',
          };
        case "bottom":
          return {
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%) translateY(50%)',
            borderBottom: 'none',
            borderRight: 'none',
          };
        case "left":
          return {
            left: '100%',
            top: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
            borderLeft: 'none',
            borderBottom: 'none',
          };
        case "right":
          return {
            right: '100%',
            top: '50%',
            transform: 'translateY(-50%) translateX(50%)',
            borderRight: 'none',
            borderTop: 'none',
          };
        default:
          return {};
      }
    };

    return (
      <>
        {/* Trigger */}
        {trigger &&
          React.cloneElement(trigger as React.ReactElement, {
            ref: triggerRef,
          })
        }

        {/* Modal overlay */}
        {modal && open && mounted && (
          <div
            ref={overlayRef}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => closeOnClickOutside && onOpenChange?.(false)}
          />
        )}

        {/* Popover content */}
        {open && mounted && (
          <div
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              zIndex: modal ? 50 : 30,
            }}
          >
            <LiquidGlass
              ref={popoverRef}
              variant="card"
              intensity="medium"
              className={cn(
                liquidPopoverVariants({ variant, size }),
                "animate-in fade-in-0 zoom-in-95 duration-150 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                className
              )}
              role="dialog"
              {...props}
            >
              {variant === "menu" ? (
                <div className="py-1">
                  {children}
                </div>
              ) : variant === "dialog" ? (
                children
              ) : (
                <div className="p-4">
                  {children}
                </div>
              )}
              
              {arrow && (
                <div
                  className={cn(arrowVariants({ variant }))}
                  style={getArrowStyles()}
                />
              )}
            </LiquidGlass>
          </div>
        )}
      </>
    );
  }
);

LiquidPopover.displayName = "LiquidPopover";

// Sub-components for advanced usage
interface LiquidPopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const LiquidPopoverTrigger = React.forwardRef<HTMLButtonElement, LiquidPopoverTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        ref,
        ...props,
      });
    }

    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

LiquidPopoverTrigger.displayName = "LiquidPopoverTrigger";

interface LiquidPopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidPopoverContent = React.forwardRef<HTMLDivElement, LiquidPopoverContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidPopoverContent.displayName = "LiquidPopoverContent";

interface LiquidPopoverHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidPopoverHeader = React.forwardRef<HTMLDivElement, LiquidPopoverHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-4 py-3 border-b border-white/10", className)}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidPopoverHeader.displayName = "LiquidPopoverHeader";

interface LiquidPopoverFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidPopoverFooter = React.forwardRef<HTMLDivElement, LiquidPopoverFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-4 py-3 border-t border-white/10", className)}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidPopoverFooter.displayName = "LiquidPopoverFooter";

// Menu item component for menu variant
interface LiquidPopoverMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  destructive?: boolean;
}

export const LiquidPopoverMenuItem = React.forwardRef<HTMLButtonElement, LiquidPopoverMenuItemProps>(
  ({ className, children, icon, destructive, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm text-white outline-none transition-colors",
        "hover:bg-white/10 focus:bg-white/10 focus:text-white",
        "disabled:pointer-events-none disabled:opacity-50",
        destructive && "text-red-400 hover:bg-red-500/10 focus:bg-red-500/10",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="mr-2 h-4 w-4 flex-shrink-0">
          {icon}
        </span>
      )}
      {children}
    </button>
  )
);

LiquidPopoverMenuItem.displayName = "LiquidPopoverMenuItem";

export { 
  liquidPopoverVariants,
  arrowVariants,
  type LiquidPopoverProps,
  type PopoverSide,
  type PopoverAlign
};