"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";

const liquidSheetVariants = cva(
  "fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
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
      side: "right",
      variant: "default",
      size: "md",
    },
  }
);

const sheetOverlayVariants = cva(
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

interface LiquidSheetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof liquidSheetVariants> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  overlayVariant?: "default" | "light" | "dark" | "blur";
  closeOnOverlayClick?: boolean;
  closeOnEscapeKey?: boolean;
  preventScrolling?: boolean;
}

export const LiquidSheet = React.forwardRef<HTMLDivElement, LiquidSheetProps>(
  (
    {
      className,
      side = "right",
      variant,
      size,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      modal = true,
      overlayVariant = "default",
      closeOnOverlayClick = true,
      closeOnEscapeKey = true,
      preventScrolling = true,
      children,
      ...props
    },
    _ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const sheetRef = React.useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = React.useCallback(
      (open: boolean) => {
        if (!isControlled) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [isControlled, onOpenChange]
    );

    // Handle escape key
    React.useEffect(() => {
      if (!closeOnEscapeKey) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          setOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
    }, [isOpen, closeOnEscapeKey, setOpen]);

    // Handle body scroll prevention
    React.useEffect(() => {
      if (!preventScrolling) return;

      if (isOpen) {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = "hidden";

        return () => {
          document.body.style.overflow = originalStyle;
        };
      }
    }, [isOpen, preventScrolling]);

    // Handle focus management
    React.useEffect(() => {
      if (isOpen && sheetRef.current) {
        const focusableElements = sheetRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }, [isOpen]);

    const handleOverlayClick = React.useCallback(
      (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          setOpen(false);
        }
      },
      [closeOnOverlayClick, setOpen]
    );

    if (!isOpen) {
      return null;
    }

    const sheetContent = (
      <LiquidGlass
        ref={sheetRef}
        variant="card"
        intensity="medium"
        className={cn(liquidSheetVariants({ side, variant, size }), className)}
        data-state={isOpen ? "open" : "closed"}
        role="dialog"
        aria-modal={modal}
        {...props}
      >
        {children}
      </LiquidGlass>
    );

    if (modal) {
      return (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div
            className={cn(sheetOverlayVariants({ variant: overlayVariant }))}
            data-state={isOpen ? "open" : "closed"}
            onClick={handleOverlayClick}
          />
          {/* Sheet */}
          {sheetContent}
        </div>
      );
    }

    return sheetContent;
  }
);

LiquidSheet.displayName = "LiquidSheet";

interface LiquidSheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidSheetHeader = React.forwardRef<HTMLDivElement, LiquidSheetHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
        {...props}
      />
    );
  }
);

LiquidSheetHeader.displayName = "LiquidSheetHeader";

interface LiquidSheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const LiquidSheetTitle = React.forwardRef<HTMLHeadingElement, LiquidSheetTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2 ref={ref} className={cn("text-lg font-semibold text-white", className)} {...props} />
    );
  }
);

LiquidSheetTitle.displayName = "LiquidSheetTitle";

interface LiquidSheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const LiquidSheetDescription = React.forwardRef<
  HTMLParagraphElement,
  LiquidSheetDescriptionProps
>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-sm text-white/70", className)} {...props} />;
});

LiquidSheetDescription.displayName = "LiquidSheetDescription";

interface LiquidSheetContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidSheetContent = React.forwardRef<HTMLDivElement, LiquidSheetContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex-1 overflow-auto", className)} {...props} />;
  }
);

LiquidSheetContent.displayName = "LiquidSheetContent";

interface LiquidSheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LiquidSheetFooter = React.forwardRef<HTMLDivElement, LiquidSheetFooterProps>(
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

LiquidSheetFooter.displayName = "LiquidSheetFooter";

interface LiquidSheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose?: () => void;
}

export const LiquidSheetClose = React.forwardRef<HTMLButtonElement, LiquidSheetCloseProps>(
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

LiquidSheetClose.displayName = "LiquidSheetClose";

// Trigger component for controlling sheet
interface LiquidSheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const LiquidSheetTrigger = React.forwardRef<HTMLButtonElement, LiquidSheetTriggerProps>(
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

LiquidSheetTrigger.displayName = "LiquidSheetTrigger";

// Controlled Sheet Component
interface LiquidControlledSheetProps extends LiquidSheetProps {
  trigger: React.ReactNode;
}

export const LiquidControlledSheet: React.FC<LiquidControlledSheetProps> = ({
  trigger,
  children,
  ...sheetProps
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <LiquidSheet {...sheetProps} open={open} onOpenChange={setOpen}>
        <LiquidSheetClose onClose={() => setOpen(false)} />
        {children}
      </LiquidSheet>
    </>
  );
};

LiquidControlledSheet.displayName = "LiquidControlledSheet";

export { liquidSheetVariants, sheetOverlayVariants, type LiquidSheetProps };
