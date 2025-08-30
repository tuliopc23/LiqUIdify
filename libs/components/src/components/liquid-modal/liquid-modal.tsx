"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";
import { LiquidButton } from "../liquid-button";

const liquidModalVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
        full: "p-0"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const modalContentVariants = cva(
  "relative w-full max-h-[90vh] overflow-hidden",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg", 
        xl: "max-w-xl",
        full: "max-w-none h-full max-h-none"
      },
      variant: {
        default: "",
        card: "rounded-2xl",
        dialog: "rounded-xl",
        sheet: "rounded-t-2xl"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);

const overlayVariants = cva(
  "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
  {
    variants: {
      variant: {
        default: "",
        dark: "bg-black/70",
        light: "bg-black/30",
        blur: "backdrop-blur-md"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface LiquidModalProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidModalVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "card" | "dialog" | "sheet";
  overlayVariant?: "default" | "dark" | "light" | "blur";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
  trapFocus?: boolean;
  children?: React.ReactNode;
}

export const LiquidModal = React.forwardRef<HTMLDivElement, LiquidModalProps>(
  ({
    className,
    size,
    variant = "default",
    overlayVariant = "default",
    open = false,
    onOpenChange,
    title,
    description,
    footer,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    preventScroll = true,
    trapFocus = true,
    children,
    ...props
  }, ref) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Handle open/close animations
    useEffect(() => {
      if (open) {
        setMounted(true);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 150);
      } else if (mounted) {
        setIsAnimating(true);
        setTimeout(() => {
          setMounted(false);
          setIsAnimating(false);
        }, 150);
      }
    }, [open, mounted]);

    // Handle body scroll lock
    useEffect(() => {
      if (!preventScroll) return;

      if (open) {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalStyle;
        };
      }
    }, [open, preventScroll]);

    // Handle focus trap
    useEffect(() => {
      if (!trapFocus || !open || !mounted) return;

      previousActiveElement.current = document.activeElement as HTMLElement;
      
      const modal = modalRef.current;
      if (!modal) return;

      // Focus first focusable element
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (firstElement) {
        firstElement.focus();
      }

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);

      return () => {
        document.removeEventListener('keydown', handleTabKey);
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }, [open, mounted, trapFocus]);

    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open) {
          onOpenChange?.(false);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onOpenChange]);

    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === overlayRef.current) {
        onOpenChange?.(false);
      }
    }, [closeOnOverlayClick, onOpenChange]);

    const handleClose = useCallback(() => {
      onOpenChange?.(false);
    }, [onOpenChange]);

    const CloseIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    );

    if (!mounted) return null;

    return (
      <>
        {/* Overlay */}
        <div
          ref={overlayRef}
          className={cn(
            overlayVariants({ variant: overlayVariant }),
            isAnimating && !open && "opacity-0",
            isAnimating && open && "opacity-100"
          )}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          className={cn(
            liquidModalVariants({ size }),
            isAnimating && !open && "animate-out fade-out-0 zoom-out-95 duration-150",
            isAnimating && open && "animate-in fade-in-0 zoom-in-95 duration-150",
            variant === "sheet" && "items-end",
            className
          )}
          {...props}
        >
          <LiquidGlass
            ref={modalRef}
            variant="card"
            intensity="medium"
            className={cn(
              modalContentVariants({ size, variant }),
              variant === "sheet" && [
                "rounded-b-none",
                isAnimating && !open && "animate-out slide-out-to-bottom duration-150",
                isAnimating && open && "animate-in slide-in-from-bottom duration-150"
              ]
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={description ? "modal-description" : undefined}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between p-6 pb-4">
                  <div className="flex-1">
                    {title && (
                      <h2 id="modal-title" className="text-lg font-semibold text-white">
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p id="modal-description" className="mt-1 text-sm text-white/70">
                        {description}
                      </p>
                    )}
                  </div>
                  
                  {showCloseButton && (
                    <LiquidButton
                      variant="ghost"
                      size="sm"
                      onClick={handleClose}
                      className="ml-4 text-white/70 hover:text-white"
                      aria-label="Close modal"
                    >
                      <CloseIcon />
                    </LiquidButton>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="border-t border-white/10 p-6 pt-4">
                  {footer}
                </div>
              )}
            </div>
          </LiquidGlass>
        </div>
      </>
    );
  }
);

LiquidModal.displayName = "LiquidModal";

// Sub-components for advanced usage
interface LiquidModalTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const LiquidModalTrigger = React.forwardRef<HTMLButtonElement, LiquidModalTriggerProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button";

    return (
      <Comp
        ref={asChild ? undefined : ref}
        className={asChild ? undefined : cn("", className)}
        {...(asChild ? {} : props)}
      >
        {children}
      </Comp>
    );
  }
);

LiquidModalTrigger.displayName = "LiquidModalTrigger";

interface LiquidModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidModalContent = React.forwardRef<HTMLDivElement, LiquidModalContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidModalContent.displayName = "LiquidModalContent";

interface LiquidModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidModalHeader = React.forwardRef<HTMLDivElement, LiquidModalHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidModalHeader.displayName = "LiquidModalHeader";

interface LiquidModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const LiquidModalTitle = React.forwardRef<HTMLHeadingElement, LiquidModalTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold text-white", className)}
      {...props}
    >
      {children}
    </h2>
  )
);

LiquidModalTitle.displayName = "LiquidModalTitle";

interface LiquidModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const LiquidModalDescription = React.forwardRef<HTMLParagraphElement, LiquidModalDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-white/70", className)}
      {...props}
    >
      {children}
    </p>
  )
);

LiquidModalDescription.displayName = "LiquidModalDescription";

interface LiquidModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const LiquidModalFooter = React.forwardRef<HTMLDivElement, LiquidModalFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidModalFooter.displayName = "LiquidModalFooter";

export { 
  liquidModalVariants, 
  modalContentVariants,
  overlayVariants,
  type LiquidModalProps 
};