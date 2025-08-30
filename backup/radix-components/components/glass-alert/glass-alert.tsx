import React from "react";
import { cn } from "../../core/utils/classname";

interface GlassAlertProps extends React.HTMLAttributes<HTMLDivElement> {
 variant?: "info" | "success" | "warning" | "error";
 title?: string;
 children: React.ReactNode;
}

const variantStyles = {
 info: "border-blue-500 text-blue-900",
 success: "border-blue-500 text-blue-900",
 warning: "border-blue-500 text-blue-900",
 error: "border-blue-500 text-blue-900",
};

const GlassAlert = React.forwardRef<HTMLDivElement, GlassAlertProps>(
 ({ variant = "info", title, children, className, ...props }, ref) => {
 return (
 <div
 ref={ref}
 role="alert"
 className={cn(
 " rounded-lg border p-4",
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

// Provide both named and default exports to match story imports
export { GlassAlert };
export default GlassAlert;
