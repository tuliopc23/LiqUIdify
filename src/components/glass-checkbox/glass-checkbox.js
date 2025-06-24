import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cn } from "@/lib/glass-utils";
const GlassCheckbox = forwardRef(({ className, label, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    return (_jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", htmlFor: checkboxId, children: [_jsx("input", { type: "checkbox", id: checkboxId, className: cn("w-5 h-5 rounded glass-effect border-2 border-glass focus:ring-2 focus:ring-primary transition-colors", "checked:bg-primary checked:border-primary", className), ref: ref, ...props }), label && _jsx("span", { className: "text-primary", children: label })] }));
});
GlassCheckbox.displayName = "GlassCheckbox";
export { GlassCheckbox };
