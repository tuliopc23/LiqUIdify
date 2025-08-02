import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../core/utils/classname";

interface Toast {
  id: string;
  title?: string;
  description: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
}) => {
  const [toasts, setToasts] = useState<Array<Toast>>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    const newToast = { ...toast, id };
    setToasts((previous) => [...previous, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  };

  const removeToast = (id: string) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  };

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {typeof window !== "undefined" &&
        typeof document !== "undefined" &&
        document.body &&
        createPortal(
          <div
            className={cn(
              "fixed z-50 flex flex-col space-y-2",
              positionClasses[position],
            )}
          >
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 200);
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const iconColors = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };

  const Icon = icons[toast.type || "info"];

  return (
    <div
      className={cn(
        "glass relative radius-lg-m border border-glass-hl/30 p-4",
        "min-w-[300px] max-w-[400px]",
        "transition-all duration-200 will-change-transform",
        "motion-safe:animate-in motion-safe:slide-in-from-right-full motion-safe:duration-300",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
      )}
    >
      {/* Glass effect layers */}
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-specular" />

      {/* Toast content */}
      <div className="glass-content">
        <div className="flex items-start space-x-3">
          <Icon
            className={cn(
              "mt-0.5 h-5 w-5 flex-shrink-0",
              iconColors[toast.type || "info"],
            )}
          />

          <div className="min-w-0 flex-1">
            {toast.title && (
              <h4 className="mb-1 font-semibold text-glass-text text-sm">
                {toast.title}
              </h4>
            )}

            <p className="text-glass-text/80 text-sm">
              {toast.description}
            </p>

            {toast.action && (
              <button
                type="button"
                onClick={toast.action.onClick}
                className={cn(
                  "mt-2 font-medium text-glass-accent text-sm",
                  "motion-safe:hover:underline transition-all duration-200",
                  "glass-focus"
                )}
              >
                {toast.action.label}
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className={cn(
              "glass-button flex-shrink-0 radius-lg-s p-1 text-glass-grey",
              "motion-safe:hover:text-glass-text motion-safe:hover:scale-110",
              "motion-safe:active:scale-95 transition-all duration-200",
              "glass-focus"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple GlassToast component for direct use
interface GlassToastProps {
  type?: "success" | "error" | "warning" | "info";
  message: string;
  onClose?: () => void;
}

const _GlassToast: React.FC<GlassToastProps> = ({
  type = "info",
  message,
  onClose,
}) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const iconColors = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "glass relative radius-lg-m border border-glass-hl/30 p-4",
        "min-w-[300px] max-w-[400px]",
        "transition-all duration-200 will-change-transform",
      )}
    >
      {/* Glass effect layers */}
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-specular" />

      {/* Toast content */}
      <div className="glass-content">
        <div className="flex items-start space-x-3">
          <Icon
            className={cn("mt-0.5 h-5 w-5 flex-shrink-0", iconColors[type])}
          />

          <div className="min-w-0 flex-1">
            <p className="text-glass-text/80 text-sm">{message}</p>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "glass-button flex-shrink-0 radius-lg-s p-1 text-glass-grey",
                "motion-safe:hover:text-glass-text motion-safe:hover:scale-110",
                "motion-safe:active:scale-95 transition-all duration-200",
                "glass-focus"
              )}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export { _GlassToast as GlassToast };
