import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn, getGlassClass, microInteraction } from "@/lib/glass-utils";
export const GlassMobileNav = ({ items, className, onItemClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);
    const handleItemClick = (item) => {
        if (item.children?.length) {
            setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
        }
        else {
            if (item.action) {
                item.action();
            }
            onItemClick?.(item);
            setIsOpen(false);
        }
    };
    const MenuTrigger = () => (_jsx("button", { onClick: () => setIsOpen(!isOpen), className: cn("p-3 rounded-xl", getGlassClass("default"), "hover:bg-[var(--glass-bg-elevated)]", microInteraction.interactive, "focus:outline-none focus:ring-2 focus:ring-blue-500/30", "md:hidden", // Only show on mobile
        className), "aria-label": "Toggle navigation menu", children: isOpen ? (_jsx(X, { className: "w-5 h-5 text-[var(--text-primary)]" })) : (_jsx(Menu, { className: "w-5 h-5 text-[var(--text-primary)]" })) }));
    const renderNavItem = (item, level = 0) => (_jsxs("div", { className: "w-full", children: [_jsxs("button", { onClick: () => handleItemClick(item), className: cn("w-full flex items-center justify-between p-4 text-left", "hover:bg-[var(--glass-bg)] active:bg-[var(--glass-bg-pressed)]", microInteraction.gentle, level > 0 && "pl-8 border-l-2 border-[var(--glass-border)]"), children: [_jsxs("div", { className: "flex items-center gap-3", children: [item.icon && (_jsx("span", { className: "w-5 h-5 text-[var(--text-secondary)]", children: item.icon })), _jsx("span", { className: "text-[var(--text-primary)] font-medium", children: item.label })] }), item.children?.length && (_jsx(ChevronRight, { className: cn("w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200", activeSubmenu === item.id && "rotate-90") }))] }), item.children?.length && activeSubmenu === item.id && (_jsx("div", { className: "border-t border-[var(--glass-border)]", children: item.children.map(child => renderNavItem(child, level + 1)) }))] }, item.id));
    if (!isOpen) {
        return _jsx(MenuTrigger, {});
    }
    return (_jsxs(_Fragment, { children: [_jsx(MenuTrigger, {}), createPortal(_jsxs("div", { className: "fixed inset-0 z-50 md:hidden", children: [_jsx("div", { className: "absolute inset-0 bg-black/20 backdrop-blur-sm", onClick: () => setIsOpen(false) }), _jsxs("div", { className: cn("absolute right-0 top-0 h-full w-80 max-w-[85vw]", getGlassClass("elevated"), "border-l border-[var(--glass-border)]", "animate-in slide-in-from-right duration-300"), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-[var(--glass-border)]", children: [_jsx("h2", { className: "text-lg font-semibold text-[var(--text-primary)]", children: "Navigation" }), _jsx("button", { onClick: () => setIsOpen(false), className: "p-2 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-secondary)]", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsx("div", { className: "flex flex-col overflow-y-auto h-[calc(100%-80px)]", children: items.map(item => renderNavItem(item)) })] })] }), document.body)] }));
};
