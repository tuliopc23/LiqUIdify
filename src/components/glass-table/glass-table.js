import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/glass-utils";
export function GlassTable({ data, columns, className, }) {
    return (_jsx("div", { className: cn("overflow-x-auto", className), children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsx("tr", { className: "glass-effect", children: columns.map((column) => (_jsx("th", { className: "px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-secondary", children: column.header }, String(column.key)))) }) }), _jsx("tbody", { className: "divide-y", style: { borderColor: "var(--glass-border)" }, children: data.map((item, index) => (_jsx("tr", { className: "glass-hover", children: columns.map((column) => (_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: column.render
                                ? column.render(item[column.key], item)
                                : String(item[column.key]) }, String(column.key)))) }, index))) })] }) }));
}
