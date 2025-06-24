import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cn } from "@/lib/glass-utils";
const GlassBadge = forwardRef(({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
        default: "glass-effect text-primary",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
    };
    return (_jsx("span", { ref: ref, className: cn("px-3 py-1 text-xs font-medium rounded-full", variantClasses[variant], className), ...props }));
});
GlassBadge.displayName = "GlassBadge";
export { GlassBadge };
