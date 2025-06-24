import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from "react";
import { cn, getGlassClass } from "@/lib/glass-utils";
export const GlassDropdown = React.forwardRef(({ trigger, items, onSelect, className, contentClassName, align = "start", sideOffset = 4, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState({});
    const triggerRef = useRef(null);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen &&
                dropdownRef.current &&
                triggerRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !triggerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const handleEscape = (event) => {
            if (isOpen && event.key === "Escape") {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("keydown", handleEscape);
            };
        }
    }, [isOpen]);
    useEffect(() => {
        if (isOpen && triggerRef.current && dropdownRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const dropdownRect = dropdownRef.current.getBoundingClientRect();
            let top = triggerRect.bottom + sideOffset;
            let left = triggerRect.left;
            // Align dropdown
            switch (align) {
                case "center":
                    left = triggerRect.left + (triggerRect.width - dropdownRect.width) / 2;
                    break;
                case "end":
                    left = triggerRect.right - dropdownRect.width;
                    break;
            }
            // Keep dropdown within viewport
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            if (left < 8)
                left = 8;
            if (left + dropdownRect.width > viewport.width - 8) {
                left = viewport.width - dropdownRect.width - 8;
            }
            if (top + dropdownRect.height > viewport.height - 8) {
                top = triggerRect.top - dropdownRect.height - sideOffset;
            }
            setDropdownStyle({
                position: "fixed",
                top: `${top}px`,
                left: `${left}px`,
                zIndex: 9999
            });
        }
    }, [isOpen, align, sideOffset]);
    const handleSelect = (item) => {
        if (item.disabled || item.separator)
            return;
        onSelect?.(item.value);
        setIsOpen(false);
    };
    return (_jsxs("div", { ref: ref, className: cn("relative inline-block", className), ...props, children: [_jsx("div", { ref: triggerRef, onClick: () => setIsOpen(!isOpen), className: "cursor-pointer", children: trigger }), isOpen && (_jsx("div", { ref: dropdownRef, style: dropdownStyle, className: cn(getGlassClass("elevated"), "py-1 rounded-xl border border-white/20 dark:border-white/10", "min-w-[160px] max-w-[300px]", "animate-in fade-in-0 zoom-in-95 duration-200", contentClassName), children: items.map((item, index) => {
                    if (item.separator) {
                        return (_jsx("div", { className: "my-1 border-t border-white/10 dark:border-white/5" }, `separator-${index}`));
                    }
                    return (_jsxs("button", { onClick: () => handleSelect(item), disabled: item.disabled, className: cn("w-full px-3 py-2 text-left transition-colors duration-200", "hover:bg-white/10 dark:hover:bg-white/5", "focus:outline-none focus:bg-white/10 dark:focus:bg-white/5", "flex items-center space-x-2", "text-gray-900 dark:text-white text-sm", item.disabled && "opacity-50 cursor-not-allowed"), children: [item.icon && (_jsx("span", { className: "flex-shrink-0 w-4 h-4", children: item.icon })), _jsx("span", { className: "truncate", children: item.label })] }, item.value));
                }) }))] }));
});
GlassDropdown.displayName = "GlassDropdown";
