import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState } from "react";
import { cn } from "@/lib/glass-utils";
const GlassSwitch = forwardRef(({ className, label, id, checked, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked || false);
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
    const handleChange = (e) => {
        const newChecked = e.target.checked;
        setIsChecked(newChecked);
        onChange?.(newChecked);
    };
    return (_jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", htmlFor: switchId, children: [_jsxs("div", { className: "relative", children: [_jsx("input", { type: "checkbox", id: switchId, className: "sr-only", checked: isChecked, onChange: handleChange, ref: ref, ...props }), _jsx("div", { className: cn("w-11 h-6 rounded-full shadow-inner transition-colors duration-200", isChecked ? "bg-primary" : "glass-effect", className) }), _jsx("div", { className: cn("absolute inset-y-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 translate-y-0.5", isChecked ? "translate-x-6" : "translate-x-0.5") })] }), label && _jsx("span", { className: "text-primary", children: label })] }));
});
GlassSwitch.displayName = "GlassSwitch";
export { GlassSwitch };
