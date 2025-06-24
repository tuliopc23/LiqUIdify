import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/glass-utils";
export function GlassHeader({ title, subtitle, actions, className }) {
    return (_jsx("header", { className: cn("glass-effect-elevated border-b border-[var(--glass-border)] py-6 backdrop-blur-lg", className), children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-semibold text-primary", children: title }), subtitle && _jsx("p", { className: "text-secondary mt-1", children: subtitle })] }), actions && _jsx("div", { className: "mt-4 md:mt-0 flex items-center gap-2", children: actions })] }) }));
}
