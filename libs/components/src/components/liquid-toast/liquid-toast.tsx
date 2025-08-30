"use client";

import * as React from "react";
import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { LiquidGlass } from "../liquid-glass";
import { LiquidButton } from "../liquid-button";

const liquidToastVariants = cva(
  "relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg pointer-events-auto",
  {
    variants: {
      variant: {
        default: "border-white/20 text-white",
        destructive: "border-red-500/50 text-red-100 [&>svg]:text-red-400",
        warning: "border-yellow-500/50 text-yellow-100 [&>svg]:text-yellow-400",
        success: "border-green-500/50 text-green-100 [&>svg]:text-green-400",
        info: "border-blue-500/50 text-blue-100 [&>svg]:text-blue-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface Toast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive" | "warning" | "success" | "info";
  duration?: number;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => string;
  dismiss: (toastId: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  maxToasts = 5,
  position = "bottom-right"
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((toastData: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000,
      dismissible: true,
      ...toastData,
    };

    setToasts(prev => {
      const updated = [newToast, ...prev];
      return updated.slice(0, maxToasts);
    });

    // Auto dismiss
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, newToast.duration);
    }

    return id;
  }, [maxToasts]);

  const dismiss = useCallback((toastId: string) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const getPositionStyles = () => {
    const base = "fixed z-50 flex flex-col gap-2 max-h-screen w-full max-w-sm pointer-events-none";
    
    switch (position) {
      case "top-left":
        return `${base} top-4 left-4`;
      case "top-center":
        return `${base} top-4 left-1/2 -translate-x-1/2`;
      case "top-right":
        return `${base} top-4 right-4`;
      case "bottom-left":
        return `${base} bottom-4 left-4`;
      case "bottom-center":
        return `${base} bottom-4 left-1/2 -translate-x-1/2`;
      case "bottom-right":
        return `${base} bottom-4 right-4`;
      default:
        return `${base} bottom-4 right-4`;
    }
  };

  const contextValue: ToastContextType = {
    toasts,
    toast,
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className={getPositionStyles()}>
        {toasts.map((toast) => (
          <LiquidToastComponent key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface LiquidToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof liquidToastVariants> {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const LiquidToastComponent = React.forwardRef<HTMLDivElement, LiquidToastProps>(
  ({ className, variant, toast, onDismiss, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    // Mount animation
    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }, []);

    const handleDismiss = useCallback(() => {
      setIsLeaving(true);
      setTimeout(() => {
        onDismiss(toast.id);
      }, 150);
    }, [toast.id, onDismiss]);

    // Default icons for each variant
    const getDefaultIcon = () => {
      switch (toast.variant) {
        case "destructive":
          return (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          );
        case "warning":
          return (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          );
        case "success":
          return (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
          );
        case "info":
          return (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          );
        default:
          return (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

    return (
      <LiquidGlass
        ref={ref}
        variant="card"
        intensity="medium"
        className={cn(
          liquidToastVariants({ variant: toast.variant }),
          isVisible && !isLeaving && "animate-in slide-in-from-right-full duration-300",
          isLeaving && "animate-out slide-out-to-right-full duration-150",
          className
        )}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        {...props}
      >
        <div className="flex items-start space-x-3 flex-1">
          {/* Icon */}
          {(toast.icon !== null) && (
            <div className="flex-shrink-0 mt-0.5">
              {toast.icon || getDefaultIcon()}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {toast.title && (
              <div className="font-medium leading-none mb-1">
                {toast.title}
              </div>
            )}
            {toast.description && (
              <div className="text-sm opacity-90">
                {toast.description}
              </div>
            )}
          </div>

          {/* Action */}
          {toast.action && (
            <div className="flex-shrink-0">
              {toast.action}
            </div>
          )}
        </div>

        {/* Dismiss button */}
        {toast.dismissible && (
          <LiquidButton
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="absolute top-2 right-2 h-6 w-6 p-0 text-current opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <CloseIcon />
          </LiquidButton>
        )}

        {/* Progress bar for timed toasts */}
        {toast.duration && toast.duration > 0 && (
          <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 animate-pulse">
            <div 
              className="h-full bg-current opacity-60"
              style={{
                animation: `toast-progress ${toast.duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </LiquidGlass>
    );
  }
);

LiquidToastComponent.displayName = "LiquidToast";

// Export the actual component for direct use
export const LiquidToast = LiquidToastComponent;

// Utility functions for common toast types
export const toast = {
  success: (message: string, options?: Partial<Toast>) => {
    const context = React.useContext(ToastContext);
    if (!context) {
      console.warn("toast.success called outside of ToastProvider");
      return "";
    }
    return context.toast({
      variant: "success",
      title: message,
      ...options,
    });
  },
  
  error: (message: string, options?: Partial<Toast>) => {
    const context = React.useContext(ToastContext);
    if (!context) {
      console.warn("toast.error called outside of ToastProvider");
      return "";
    }
    return context.toast({
      variant: "destructive",
      title: message,
      ...options,
    });
  },
  
  warning: (message: string, options?: Partial<Toast>) => {
    const context = React.useContext(ToastContext);
    if (!context) {
      console.warn("toast.warning called outside of ToastProvider");
      return "";
    }
    return context.toast({
      variant: "warning",
      title: message,
      ...options,
    });
  },
  
  info: (message: string, options?: Partial<Toast>) => {
    const context = React.useContext(ToastContext);
    if (!context) {
      console.warn("toast.info called outside of ToastProvider");
      return "";
    }
    return context.toast({
      variant: "info",
      title: message,
      ...options,
    });
  },
  
  default: (message: string, options?: Partial<Toast>) => {
    const context = React.useContext(ToastContext);
    if (!context) {
      console.warn("toast.default called outside of ToastProvider");
      return "";
    }
    return context.toast({
      variant: "default",
      title: message,
      ...options,
    });
  },
};

// CSS for toast progress animation (should be added to global styles)
const toastProgressStyles = `
@keyframes toast-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.getElementById("liquid-toast-styles");
  if (!styleElement) {
    const style = document.createElement("style");
    style.id = "liquid-toast-styles";
    style.innerHTML = toastProgressStyles;
    document.head.appendChild(style);
  }
}

export { 
  liquidToastVariants,
  type Toast,
  type ToastContextType,
  type LiquidToastProps 
};