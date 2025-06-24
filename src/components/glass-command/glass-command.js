import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Search, Command, ArrowRight, Hash, User, Settings, FileText, Zap } from "lucide-react";
import { cn, getGlassClass, microInteraction } from "@/lib/glass-utils";
export const CommandPalette = ({ items, placeholder = "Type a command or search...", shortcut = ["cmd", "k"], className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    // Filter and categorize items
    const filteredItems = items.filter(item => {
        const searchTerms = query.toLowerCase().split(" ");
        const itemText = `${item.label} ${item.description || ""} ${item.keywords?.join(" ") || ""}`.toLowerCase();
        return searchTerms.every(term => itemText.includes(term));
    });
    const categorizedItems = filteredItems.reduce((acc, item) => {
        const category = item.category || "General";
        if (!acc[category])
            acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});
    const allFilteredItems = Object.values(categorizedItems).flat();
    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Open command palette
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
                return;
            }
            if (!isOpen)
                return;
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setSelectedIndex(prev => Math.min(prev + 1, allFilteredItems.length - 1));
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setSelectedIndex(prev => Math.max(prev - 1, 0));
                    break;
                case "Enter":
                    e.preventDefault();
                    if (allFilteredItems[selectedIndex]) {
                        allFilteredItems[selectedIndex].action();
                        handleClose();
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    handleClose();
                    break;
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, selectedIndex, allFilteredItems]);
    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);
    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);
    const handleClose = useCallback(() => {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
    }, []);
    const formatShortcut = (keys) => {
        return keys.map(key => {
            switch (key.toLowerCase()) {
                case "cmd":
                case "command": return "⌘";
                case "ctrl": return "^";
                case "shift": return "⇧";
                case "alt":
                case "option": return "⌥";
                case "enter": return "↵";
                case "escape": return "⎋";
                case "backspace": return "⌫";
                case "delete": return "⌦";
                case "tab": return "⇥";
                case "space": return "␣";
                default: return key.toUpperCase();
            }
        }).join("");
    };
    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case "navigation": return _jsx(ArrowRight, { className: "w-4 h-4" });
            case "user": return _jsx(User, { className: "w-4 h-4" });
            case "settings": return _jsx(Settings, { className: "w-4 h-4" });
            case "content": return _jsx(FileText, { className: "w-4 h-4" });
            case "actions": return _jsx(Zap, { className: "w-4 h-4" });
            default: return _jsx(Hash, { className: "w-4 h-4" });
        }
    };
    if (!isOpen) {
        return (_jsxs("button", { onClick: () => setIsOpen(true), className: cn("flex items-center gap-2 px-3 py-2 rounded-lg", getGlassClass("default"), "hover:bg-[var(--glass-bg-elevated)]", "text-[var(--text-secondary)] text-sm", microInteraction.gentle, className), children: [_jsx(Search, { className: "w-4 h-4" }), _jsx("span", { children: "Search..." }), _jsx("div", { className: "ml-auto flex items-center gap-1", children: shortcut.map((key, index) => (_jsx("kbd", { className: "px-1.5 py-0.5 text-xs rounded bg-[var(--glass-bg)] border border-[var(--glass-border)]", children: formatShortcut([key]) }, index))) })] }));
    }
    return createPortal(_jsxs("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-[20vh]", children: [_jsx("div", { className: "absolute inset-0 bg-black/20 backdrop-blur-sm", onClick: handleClose }), _jsxs("div", { ref: containerRef, className: cn("relative w-full max-w-2xl mx-4 rounded-2xl border overflow-hidden", getGlassClass("elevated"), "border-[var(--glass-border)]", "animate-in fade-in-0 zoom-in-95 duration-200"), children: [_jsxs("div", { className: "flex items-center gap-3 p-4 border-b border-[var(--glass-border)]", children: [_jsx(Search, { className: "w-5 h-5 text-[var(--text-secondary)] flex-shrink-0" }), _jsx("input", { ref: inputRef, type: "text", value: query, onChange: (e) => setQuery(e.target.value), placeholder: placeholder, className: cn("flex-1 bg-transparent border-none outline-none", "text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]", "text-lg") }), _jsx("kbd", { className: "px-2 py-1 text-xs rounded bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-tertiary)]", children: "ESC" })] }), _jsx("div", { className: "max-h-96 overflow-y-auto", children: Object.entries(categorizedItems).length === 0 ? (_jsxs("div", { className: "p-8 text-center", children: [_jsx(Search, { className: "w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-2" }), _jsx("p", { className: "text-[var(--text-secondary)]", children: "No results found" }), _jsx("p", { className: "text-[var(--text-tertiary)] text-sm mt-1", children: "Try a different search term" })] })) : (Object.entries(categorizedItems).map(([category, categoryItems]) => (_jsxs("div", { className: "py-2", children: [_jsxs("div", { className: "flex items-center gap-2 px-4 py-2 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider", children: [getCategoryIcon(category), category] }), categoryItems.map((item) => {
                                    const globalIndex = allFilteredItems.indexOf(item);
                                    const isSelected = globalIndex === selectedIndex;
                                    return (_jsxs("button", { onClick: () => {
                                            item.action();
                                            handleClose();
                                        }, className: cn("w-full flex items-center gap-3 px-4 py-3 text-left", "hover:bg-[var(--glass-bg)]", isSelected && "bg-[var(--glass-bg)]", microInteraction.gentle), children: [item.icon && (_jsx("div", { className: "w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--glass-bg)] text-[var(--text-secondary)]", children: item.icon })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium text-[var(--text-primary)] truncate", children: item.label }), item.description && (_jsx("div", { className: "text-sm text-[var(--text-secondary)] truncate", children: item.description }))] }), item.shortcut && (_jsx("div", { className: "flex items-center gap-1", children: item.shortcut.map((key, index) => (_jsx("kbd", { className: "px-1.5 py-0.5 text-xs rounded bg-[var(--glass-bg)] border border-[var(--glass-border)]", children: formatShortcut([key]) }, index))) })), _jsx(ArrowRight, { className: "w-4 h-4 text-[var(--text-tertiary)]" })] }, item.id));
                                })] }, category)))) }), _jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-[var(--glass-border)] text-xs text-[var(--text-tertiary)]", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { children: "Navigate with \u2191\u2193" }), _jsx("span", { children: "Select with \u21B5" })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Command, { className: "w-3 h-3" }), _jsx("span", { children: "Command Palette" })] })] })] })] }), document.body);
};
