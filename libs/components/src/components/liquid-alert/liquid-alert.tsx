"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";
import { LiquidButton } from "../liquid-button";

const liquidAlertVariants = cva(
  "relative w-full rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "border-white/20 text-white",
        destructive: "border-red-500/50 text-red-100 [&>svg]:text-red-400",
        warning: "border-yellow-500/50 text-yellow-100 [&>svg]:text-yellow-400",
        success: "border-green-500/50 text-green-100 [&>svg]:text-green-400",
        info: "border-blue-500/50 text-blue-100 [&>svg]:text-blue-400"
      },
      size: {
        sm: "p-3 text-sm",
        md: "p-4",
        lg: "p-6 text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

const alertIconVariants = cva(
  "h-4 w-4 flex-shrink-0",
  {
    variants: {
      variant: {
        default: "text-white/70",
        destructive: "text-red-400",
        warning: "text-yellow-400", 
        success: "text-green-400",
        info: "text-blue-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface LiquidAlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidAlertVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const LiquidAlert = React.forwardRef<HTMLDivElement, LiquidAlertProps>(
  ({
    className,
    variant,
    size,
    title,
    description,
    icon,
    dismissible = false,
    onDismiss,
    actions,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = React.useCallback(() => {
      setIsVisible(false);
      onDismiss?.();
    }, [onDismiss]);

    // Default icons for each variant
    const getDefaultIcon = () => {
      switch (variant) {
        case "destructive":
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          );
        case "warning":
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          );
        case "success":
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
          );
        case "info":
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          );
        default:
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          );
      }
    };

    const CloseIcon = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    );

    if (!isVisible) return null;

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="subtle"
        className={cn(
          liquidAlertVariants({ variant, size }),
          "animate-in fade-in-0 slide-in-from-left-1 duration-300",
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex">
          {/* Icon */}
          {(icon !== null) && (
            <div className={cn(alertIconVariants({ variant }), "mt-0.5 mr-3")}>
              {icon || getDefaultIcon()}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 space-y-2">
            {/* Title */}
            {title && (
              <div className="font-medium leading-none tracking-tight">
                {title}
              </div>
            )}

            {/* Description or children */}
            {description && (
              <div className="text-sm opacity-90 leading-relaxed">
                {description}
              </div>
            )}

            {children && (
              <div className="space-y-2">
                {children}
              </div>
            )}

            {/* Actions */}
            {actions && (
              <div className="flex flex-wrap gap-2 mt-3">
                {actions}
              </div>
            )}
          </div>

          {/* Dismiss button */}
          {dismissible && (
            <div className="ml-3">
              <LiquidButton
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 text-current opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Dismiss alert"
              >
                <CloseIcon />
              </LiquidButton>
            </div>
          )}
        </div>
      </LiquidGlass>
    );
  }
);

LiquidAlert.displayName = "LiquidAlert";

// Sub-components for advanced usage
interface LiquidAlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const LiquidAlertTitle = React.forwardRef<HTMLHeadingElement, LiquidAlertTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h5>
  )
);

LiquidAlertTitle.displayName = "LiquidAlertTitle";

interface LiquidAlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const LiquidAlertDescription = React.forwardRef<HTMLParagraphElement, LiquidAlertDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm leading-relaxed opacity-90", className)}
      {...props}
    >
      {children}
    </div>
  )
);

LiquidAlertDescription.displayName = "LiquidAlertDescription";

// Alert action button component
interface LiquidAlertActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  children: React.ReactNode;
}

export const LiquidAlertAction = React.forwardRef<HTMLButtonElement, LiquidAlertActionProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const actionVariants = cva(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      {
        variants: {
          variant: {
            primary: "bg-white/20 text-white hover:bg-white/30 h-8 px-3 py-2",
            secondary: "border border-white/30 bg-transparent text-white hover:bg-white/10 h-8 px-3 py-2",
            destructive: "bg-red-500 text-white hover:bg-red-600 h-8 px-3 py-2"
          }
        },
        defaultVariants: {
          variant: "primary"
        }
      }
    );

    return (
      <button
        ref={ref}
        className={cn(actionVariants({ variant }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LiquidAlertAction.displayName = "LiquidAlertAction";

export { 
  liquidAlertVariants, 
  alertIconVariants,
  type LiquidAlertProps 
};