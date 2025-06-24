import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/glass-utils";
export function GlassFooter({ links, className, ...props }) {
    return (_jsx("footer", { className: cn("glass-effect border-t border-[var(--glass-border)] mt-12", className), ...props, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 text-sm text-secondary flex flex-col md:flex-row items-center justify-between gap-4", children: [_jsxs("span", { children: ["\u00A9 ", new Date().getFullYear(), " Liquid Glass UI"] }), links && (_jsx("nav", { className: "flex flex-wrap gap-4", children: links.map((link) => (_jsx("a", { href: link.href, className: "hover:text-primary transition-colors", children: link.label }, link.href))) }))] }) }));
}
