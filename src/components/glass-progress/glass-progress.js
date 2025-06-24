import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { cn, getGlassClass } from "@/lib/glass-utils";
export const GlassProgress = React.forwardRef(({ value, max = 100, size = "md", variant = "default", showValue = false, className, color = "blue", ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const sizeClasses = {
        sm: "h-1",
        md: "h-2",
        lg: "h-3"
    };
    const colorClasses = {
        blue: "from-blue-500 to-blue-600",
        green: "from-green-500 to-green-600",
        purple: "from-purple-500 to-purple-600",
        red: "from-red-500 to-red-600",
        yellow: "from-yellow-500 to-yellow-600"
    };
    return (_jsxs("div", { ref: ref, className: cn("w-full", className), ...props, children: [showValue && (_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Progress" }), _jsxs("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: [Math.round(percentage), "%"] })] })), _jsxs("div", { className: cn("relative w-full rounded-full overflow-hidden", sizeClasses[size], variant === "default" && getGlassClass("default"), variant === "minimal" && "bg-gray-200 dark:bg-gray-700", variant === "gradient" && "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"), children: [_jsx("div", { className: cn("h-full transition-all duration-500 ease-out rounded-full", variant === "default" && `bg-gradient-to-r ${colorClasses[color]}`, variant === "gradient" && `bg-gradient-to-r ${colorClasses[color]}`, variant === "minimal" && `bg-${color}-500`), style: { width: `${percentage}%` } }), _jsx("div", { className: cn("absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent", "animate-pulse opacity-50"), style: {
                            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)`,
                            transform: `translateX(-100%)`
                        } })] })] }));
});
GlassProgress.displayName = "GlassProgress";
