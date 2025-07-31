import React from "react";
import { cn } from "../../core/utils/classname";

export interface GlassAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
}

const variantStyles = {
  info: "border-blue-200 bg-blue-50/10 text-blue-700",
  success: "border-green-200 bg-green-50/10 text-green-700",
  warning: "border-yellow-200 bg-yellow-50/10 text-yellow-700",
  error: "border-red-200 bg-red-50/10 text-red-700",
};

const GlassAlert = React.forwardRef<HTMLDivElement, GlassAlertProps>(
  ({ variant = "info", title, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "glass-effect rounded-lg border p-4",
          "backdrop-blur-md backdrop-saturate-150",
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
