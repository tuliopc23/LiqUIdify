import React from "react";
import { cn } from "../../core/utils/classname";

interface GlassAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
}

const variantStyles = {
  info: "border-liquid-accent liquid-glass text-liquid-primary",
  success: "border-liquid-accent liquid-glass-core-success text-liquid-primary",
  warning: "border-liquid-accent liquid-glass-core-warning text-liquid-primary",
  error: "border-liquid-accent liquid-glass-core-error text-liquid-primary",
};

const GlassAlert = React.forwardRef<HTMLDivElement, GlassAlertProps>(
  ({ variant = "info", title, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "liquid-glass rounded-lg border p-4",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {title && <h4 className="mb-1 font-semibold">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>
    );
  },
);

GlassAlert.displayName = "GlassAlert";

export default GlassAlert;
