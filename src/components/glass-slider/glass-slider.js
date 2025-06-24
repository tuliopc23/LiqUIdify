import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from "react";
import { cn, getGlassClass } from "@/lib/glass-utils";
export const GlassSlider = React.forwardRef(({ min = 0, max = 100, step = 1, value = 0, onChange, disabled, className, showValue = true, variant = "default", ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);
    const thumbRef = useRef(null);
    useEffect(() => {
        setCurrentValue(value);
    }, [value]);
    const percentage = ((currentValue - min) / (max - min)) * 100;
    const handleMouseDown = (e) => {
        if (disabled)
            return;
        setIsDragging(true);
        updateValue(e.clientX);
    };
    const handleMouseMove = (e) => {
        if (!isDragging || disabled)
            return;
        updateValue(e.clientX);
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    const updateValue = (clientX) => {
        if (!sliderRef.current)
            return;
        const rect = sliderRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const newValue = min + percentage * (max - min);
        const steppedValue = Math.round(newValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, steppedValue));
        setCurrentValue(clampedValue);
        onChange?.(clampedValue);
    };
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging]);
    return (_jsxs("div", { ref: ref, className: cn("relative w-full", className), ...props, children: [showValue && (_jsxs("div", { className: "flex justify-between items-center mb-3", children: [_jsx("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Value" }), _jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: currentValue })] })), _jsxs("div", { ref: sliderRef, className: cn("relative h-2 rounded-full cursor-pointer", variant === "default" && getGlassClass("default"), variant === "minimal" && "bg-gray-200 dark:bg-gray-700", disabled && "cursor-not-allowed opacity-50"), onMouseDown: handleMouseDown, children: [_jsx("div", { className: "absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-200", style: { width: `${percentage}%` } }), _jsx("div", { ref: thumbRef, className: cn("absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2", "w-5 h-5 rounded-full transition-all duration-200", getGlassClass("elevated"), "border-2 border-white/30 dark:border-white/20", "hover:scale-110 active:scale-95", isDragging && "scale-110 ring-4 ring-blue-500/30", disabled && "cursor-not-allowed"), style: { left: `${percentage}%` } })] }), _jsxs("div", { className: "flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400", children: [_jsx("span", { children: min }), _jsx("span", { children: max })] })] }));
});
GlassSlider.displayName = "GlassSlider";
