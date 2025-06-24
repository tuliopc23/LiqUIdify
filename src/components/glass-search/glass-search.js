import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Search, Clock, TrendingUp, X, ArrowRight } from "lucide-react";
import { cn, getGlassClass, microInteraction, focusRing } from "@/lib/glass-utils";
export const GlassSearch = ({ placeholder = "Search...", suggestions = [], recentSearches = [], onSearch, onSuggestionClick, className, maxSuggestions = 8 }) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const filteredSuggestions = suggestions
        .filter(s => s.text.toLowerCase().includes(query.toLowerCase()))
        .slice(0, maxSuggestions);
    const recentFiltered = recentSearches
        .filter(r => r.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3);
    const allResults = [
        ...recentFiltered.map(r => ({ id: r, text: r, type: "recent" })),
        ...filteredSuggestions
    ];
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setSelectedIndex(-1);
            }
        };
        const handleKeyDown = (event) => {
            if (!isOpen)
                return;
            switch (event.key) {
                case "ArrowDown":
                    event.preventDefault();
                    setSelectedIndex(prev => Math.min(prev + 1, allResults.length - 1));
                    break;
                case "ArrowUp":
                    event.preventDefault();
                    setSelectedIndex(prev => Math.max(prev - 1, -1));
                    break;
                case "Enter":
                    event.preventDefault();
                    if (selectedIndex >= 0 && allResults[selectedIndex]) {
                        handleSelect(allResults[selectedIndex]);
                    }
                    else if (query.trim()) {
                        handleSearch();
                    }
                    break;
                case "Escape":
                    setIsOpen(false);
                    setSelectedIndex(-1);
                    inputRef.current?.blur();
                    break;
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, selectedIndex, allResults, query]);
    const handleSearch = () => {
        if (query.trim()) {
            onSearch?.(query.trim());
            setIsOpen(false);
            setSelectedIndex(-1);
        }
    };
    const handleSelect = (item) => {
        setQuery(item.text);
        onSuggestionClick?.(item);
        setIsOpen(false);
        setSelectedIndex(-1);
    };
    const getIcon = (type) => {
        switch (type) {
            case "recent": return _jsx(Clock, { className: "w-4 h-4 text-[var(--text-tertiary)]" });
            case "trending": return _jsx(TrendingUp, { className: "w-4 h-4 text-[var(--text-tertiary)]" });
            default: return _jsx(Search, { className: "w-4 h-4 text-[var(--text-tertiary)]" });
        }
    };
    return (_jsxs("div", { ref: containerRef, className: cn("relative w-full max-w-md", className), children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2", children: _jsx(Search, { className: "w-4 h-4 text-[var(--text-secondary)]" }) }), _jsx("input", { ref: inputRef, type: "text", value: query, onChange: (e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                            setSelectedIndex(-1);
                        }, onFocus: () => setIsOpen(true), onKeyDown: (e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSearch();
                            }
                        }, placeholder: placeholder, className: cn("w-full pl-10 pr-10 py-3 rounded-xl border", getGlassClass("default"), focusRing, "text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]", "border-[var(--glass-border)] focus:border-[var(--glass-border-focus)]", microInteraction.gentle) }), query && (_jsx("button", { onClick: () => {
                            setQuery("");
                            setIsOpen(false);
                            inputRef.current?.focus();
                        }, className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-secondary)]", children: _jsx(X, { className: "w-4 h-4" }) }))] }), isOpen && (query || recentSearches.length > 0) && (_jsxs("div", { className: cn("absolute top-full left-0 right-0 mt-2 rounded-xl border z-50", getGlassClass("elevated"), "border-[var(--glass-border)] max-h-80 overflow-y-auto"), children: [!query && recentSearches.length > 0 && (_jsxs("div", { className: "p-2", children: [_jsx("div", { className: "px-3 py-2 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider", children: "Recent" }), recentSearches.slice(0, 5).map((recent) => (_jsxs("button", { onClick: () => handleSelect({ id: recent, text: recent, type: "recent" }), className: cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left", "hover:bg-[var(--glass-bg)] text-[var(--text-primary)]", microInteraction.gentle), children: [_jsx(Clock, { className: "w-4 h-4 text-[var(--text-tertiary)]" }), _jsx("span", { className: "flex-1 truncate", children: recent })] }, recent)))] })), allResults.length > 0 && (_jsxs("div", { className: "p-2", children: [query && (_jsx("div", { className: "px-3 py-2 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider", children: "Suggestions" })), allResults.map((result, index) => (_jsxs("button", { onClick: () => handleSelect(result), className: cn("w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left", "hover:bg-[var(--glass-bg)] text-[var(--text-primary)]", selectedIndex === index && "bg-[var(--glass-bg)]", microInteraction.gentle), children: [getIcon(result.type), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "truncate", children: result.text }), 'count' in result && result.count && (_jsx("span", { className: "text-xs text-[var(--text-tertiary)] ml-2", children: result.count.toLocaleString() }))] }), 'category' in result && typeof result.category === 'string' && (_jsxs("div", { className: "text-xs text-[var(--text-tertiary)] mt-0.5", children: ["in ", result.category] }))] }), _jsx(ArrowRight, { className: "w-3 h-3 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" })] }, result.id)))] })), query && allResults.length === 0 && (_jsxs("div", { className: "p-8 text-center", children: [_jsx(Search, { className: "w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-2" }), _jsx("p", { className: "text-[var(--text-secondary)] text-sm", children: "No results found" }), _jsx("p", { className: "text-[var(--text-tertiary)] text-xs mt-1", children: "Try a different search term" })] }))] }))] }));
};
