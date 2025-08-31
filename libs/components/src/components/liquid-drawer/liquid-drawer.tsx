"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidDrawerVariants = cva(
  "fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
      variant: {
        default: "bg-white/10 backdrop-blur-md border-white/20",
        glass: "bg-white/5 backdrop-blur-lg border-white/10",
        solid: "bg-white/20 backdrop-blur-sm border-white/30",
        ghost: "bg-white/5 backdrop-blur-xl border-white/5",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: "",
      },
    },
    compoundVariants: [
      {
        side: ["top", "bottom"],
        size: "sm",
        className: "h-1/3",
      },
      {
        side: ["top", "bottom"],
        size: "md",
        className: "h-1/2",
      },
      {
        side: ["top", "bottom"],
        size: "lg",
        className: "h-2/3",
      },
      {
        side: ["top", "bottom"],
        size: "xl",
        className: "h-3/4",
      },
      {
        side: ["top", "bottom"],
        size: "full",
        className: "h-full",
      },
      {
        side: ["left", "right"],
        size: "sm",
        className: "w-1/3 sm:max-w-xs",
      },
      {
        side: ["left", "right"],
        size: "md",
        className: "w-1/2 sm:max-w-md",
      },
      {
        side: ["left", "right"],
        size: "lg",
        className: "w-2/3 sm:max-w-lg",
      },
      {
        side: ["left", "right"],
        size: "xl",
        className: "w-3/4 sm:max-w-xl",
      },
      {
        side: ["left", "right"],
        size: "full",
        className: "w-full sm:max-w-none",
      },
    ],
    defaultVariants: {
      side: "bottom",
      variant: "default",
      size: "md",
    },
  }
);

const drawerOverlayVariants = cva(
  "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default: "bg-black/50",
        light: "bg-black/30",
        dark: "bg-black/70",
        blur: "bg-black/20 backdrop-blur-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface LiquidDrawerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidDrawerVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  dismissible?: boolean;
  snapPoints?: number[];
  activeSnapPoint?: number;
  setActiveSnapPoint?: (snapPoint: number) => void;
  overlayVariant?: "default" | "light" | "dark" | "blur";
  closeThreshold?: number;
  scrollLockTimeout?: number;
  preventScrolling?: boolean;
  onDrag?: (event: { percentageDragged: number }) => void;
  onRelease?: (event: { open: boolean }) => void;
}

export const LiquidDrawer = React.forwardRef<HTMLDivElement, LiquidDrawerProps>(
  (
    {
      className,
      side = "bottom",
      variant,
      size,
      open,
      onOpenChange,
      modal = true,
      dismissible = true,
      snapPoints,
      activeSnapPoint,
      setActiveSnapPoint,
      overlayVariant = "default",
      closeThreshold = 0.25,
      scrollLockTimeout = 500,
      preventScrolling = true,
      onDrag,
      onRelease,
      children,
      ...props
    },
    _ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragOffset, setDragOffset] = React.useState(0);
    const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });

    const drawerRef = React.useRef<HTMLDivElement>(null);
    const overlayRef = React.useRef<HTMLDivElement>(null);

    // Handle drag start
    const handleDragStart = React.useCallback(
      (clientX: number, clientY: number) => {
        if (!dismissible) return;

        setIsDragging(true);
        setStartPos({ x: clientX, y: clientY });
        setDragOffset(0);
      },
      [dismissible]
    );

    // Handle drag move
    const handleDragMove = React.useCallback(
      (clientX: number, clientY: number) => {
        if (!isDragging || !dismissible) return;

        let offset = 0;
        switch (side) {
          case "bottom":
            offset = Math.max(0, clientY - startPos.y);
            break;
          case "top":
            offset = Math.max(0, startPos.y - clientY);
            break;
          case "left":
            offset = Math.max(0, startPos.x - clientX);
            break;
          case "right":
            offset = Math.max(0, clientX - startPos.x);
            break;
        }

        setDragOffset(offset);

        // Calculate percentage dragged
        const drawerRect = drawerRef.current?.getBoundingClientRect();
        if (drawerRect) {
          const total = side === "top" || side === "bottom" ? drawerRect.height : drawerRect.width;
          const percentageDragged = Math.min(100, (offset / total) * 100);
          onDrag?.({ percentageDragged });
        }
      },
      [isDragging, dismissible, side, startPos, onDrag]
    );

    // Handle drag end
    const handleDragEnd = React.useCallback(() => {
      if (!isDragging || !dismissible) return;

      const drawerRect = drawerRef.current?.getBoundingClientRect();
      if (drawerRect) {
        const total = side === "top" || side === "bottom" ? drawerRect.height : drawerRect.width;
        const percentageDragged = (dragOffset / total) * 100;

        const shouldClose = percentageDragged > closeThreshold * 100;

        if (shouldClose) {
          onOpenChange?.(false);
          onRelease?.({ open: false });
        } else {
          onRelease?.({ open: true });
        }
      }

      setIsDragging(false);
      setDragOffset(0);
    }, [isDragging, dismissible, side, dragOffset, closeThreshold, onOpenChange, onRelease]);

    // Mouse events
    const handleMouseDown = React.useCallback(
      (e: React.MouseEvent) => {
        handleDragStart(e.clientX, e.clientY);
      },
      [handleDragStart]
    );

    // Touch events
    const handleTouchStart = React.useCallback(
      (e: React.TouchEvent) => {
        const touch = e.touches[0];
        handleDragStart(touch.clientX, touch.clientY);
      },
      [handleDragStart]
    );

    // Global mouse/touch move events
    React.useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        handleDragMove(e.clientX, e.clientY);
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        handleDragMove(touch.clientX, touch.clientY);
      };

      const handleMouseUp = () => {
        handleDragEnd();
      };

      const handleTouchEnd = () => {
        handleDragEnd();
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }, [isDragging, handleDragMove, handleDragEnd]);

    // Handle scroll locking
    React.useEffect(() => {
      if (!preventScrolling || !open) return;

      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        setTimeout(() => {
          document.body.style.overflow = originalStyle;
        }, scrollLockTimeout);
      };
    }, [open, preventScrolling, scrollLockTimeout]);

    // Handle keyboard events
    React.useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && dismissible) {
          onOpenChange?.(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, dismissible, onOpenChange]);

    // Handle overlay click
    const handleOverlayClick = React.useCallback(
      (e: React.MouseEvent) => {
        if (e.target === overlayRef.current && dismissible) {
          onOpenChange?.(false);
        }
      },
      [dismissible, onOpenChange]
    );

    if (!open) {
      return null;
    }

    // Calculate transform based on drag offset
    const getTransform = () => {
      if (!isDragging || dragOffset === 0) return undefined;

      switch (side) {
        case "bottom":
          return `translateY(${dragOffset}px)`;
        case "top":
          return `translateY(-${dragOffset}px)`;
        case "left":
          return `translateX(-${dragOffset}px)`;
        case "right":
          return `translateX(${dragOffset}px)`;
        default:
          return undefined;
      }
    };

    const drawerContent = (
      <LiquidGlass
        ref={drawerRef}
        variant="card"
        intensity="medium"
        className={cn(liquidDrawerVariants({ side, variant, size }), className)}
        data-state={open ? "open" : "closed"}
        role="dialog"
        aria-modal={modal}
        style={{
          transform: getTransform(),
        }}
        {...props}
      >
        {/* Drag handle for mobile */}
        {dismissible && (side === "bottom" || side === "top") && (
          <div
            className="mx-auto w-12 h-1.5 bg-white/30 rounded-full mb-4 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        )}

        {children}
      </LiquidGlass>
    );

    if (modal) {
      return (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            ref={overlayRef}
            className={cn(drawerOverlayVariants({ variant: overlayVariant }))}
            data-state={open ? "open" : "closed"}
            onClick={handleOverlayClick}
          />
          {/* Drawer */}
          {drawerContent}
        </div>
      );
    }

    return drawerContent;
  }
);

LiquidDrawer.displayName = "LiquidDrawer";

interface LiquidDrawerTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const LiquidDrawerTrigger = React.forwardRef<HTMLButtonElement, LiquidDrawerTriggerProps>(
  ({ asChild = false, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(props.children as React.ReactElement, {
        ...props,
        ref,
      });
    }

    return <button ref={ref} {...props} />;
  }
);

LiquidDrawerTrigger.displayName = "LiquidDrawerTrigger";

interface LiquidDrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidDrawerContent = React.forwardRef<HTMLDivElement, LiquidDrawerContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />;
  }
);

LiquidDrawerContent.displayName = "LiquidDrawerContent";

interface LiquidDrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidDrawerHeader = React.forwardRef<HTMLDivElement, LiquidDrawerHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
        {...props}
      />
    );
  }
);

LiquidDrawerHeader.displayName = "LiquidDrawerHeader";

interface LiquidDrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const LiquidDrawerTitle = React.forwardRef<HTMLHeadingElement, LiquidDrawerTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)}
        {...props}
      />
    );
  }
);

LiquidDrawerTitle.displayName = "LiquidDrawerTitle";

interface LiquidDrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const LiquidDrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  LiquidDrawerDescriptionProps
>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-sm text-white/70", className)} {...props} />;
});

LiquidDrawerDescription.displayName = "LiquidDrawerDescription";

interface LiquidDrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidDrawerFooter = React.forwardRef<HTMLDivElement, LiquidDrawerFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t border-white/10 pt-4",
          className
        )}
        {...props}
      />
    );
  }
);

LiquidDrawerFooter.displayName = "LiquidDrawerFooter";

interface LiquidDrawerCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
}

export const LiquidDrawerClose = React.forwardRef<HTMLButtonElement, LiquidDrawerCloseProps>(
  ({ className, onClick, onClose, children, ...props }, ref) => {
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        onClose?.();
      },
      [onClick, onClose]
    );

    return (
      <button
        ref={ref}
        className={cn(
          "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:pointer-events-none",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children || (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        <span className="sr-only">Close</span>
      </button>
    );
  }
);

LiquidDrawerClose.displayName = "LiquidDrawerClose";

// Controlled Drawer Component
interface LiquidControlledDrawerProps extends LiquidDrawerProps {
  trigger: React.ReactNode;
}

export const LiquidControlledDrawer: React.FC<LiquidControlledDrawerProps> = ({
  trigger,
  children,
  ...drawerProps
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <LiquidDrawer {...drawerProps} open={open} onOpenChange={setOpen}>
        <LiquidDrawerClose onClose={() => setOpen(false)} />
        {children}
      </LiquidDrawer>
    </>
  );
};

LiquidControlledDrawer.displayName = "LiquidControlledDrawer";

export { liquidDrawerVariants, drawerOverlayVariants, type LiquidDrawerProps };
