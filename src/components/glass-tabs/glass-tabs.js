import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useId } from "react";
import { cn } from "@/lib/glass-utils";
export function GlassTabs({ tabs, defaultTab, className, tabListClassName, tabButtonClassName, activeTabButtonClassName = "bg-primary text-white", // Default active class
inactiveTabButtonClassName = "text-secondary hover:text-primary", // Default inactive class
tabPanelClassName,
// orientation = 'horizontal', // For future enhancement
 }) {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs.find(tab => !tab.disabled)?.id || tabs[0]?.id);
    const baseId = useId();
    // TODO: Implement keyboard navigation for tabs (ArrowLeft/Right or ArrowUp/Down based on orientation)
    // This would typically involve managing focus manually within the tablist.
    return (_jsxs("div", { className: cn("w-full", className), children: [_jsx("div", { role: "tablist", "aria-orientation": "horizontal" // Change to 'vertical' if orientation prop is implemented
                , className: cn("mb-6 flex space-x-1 glass-effect rounded-lg p-1", tabListClassName), children: tabs.map((tab) => (_jsx("button", { type: "button", role: "tab", id: `${baseId}-tab-${tab.id}`, "aria-controls": `${baseId}-panel-${tab.id}`, "aria-selected": activeTab === tab.id, tabIndex: activeTab === tab.id ? 0 : -1, onClick: () => !tab.disabled && setActiveTab(tab.id), disabled: tab.disabled, className: cn("flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all btn-scale focus:outline-none focus:ring-2 focus:ring-blue-500", tabButtonClassName, activeTab === tab.id
                        ? activeTabButtonClassName
                        : inactiveTabButtonClassName, tab.disabled && "opacity-50 cursor-not-allowed"), children: tab.label }, tab.id))) }), tabs.map((tab) => (_jsx("div", { id: `${baseId}-panel-${tab.id}`, role: "tabpanel", "aria-labelledby": `${baseId}-tab-${tab.id}`, hidden: activeTab !== tab.id, className: cn("tab-content focus:outline-none", tabPanelClassName), tabIndex: 0, children: activeTab === tab.id && (_jsx("div", { className: "glass-effect rounded-lg p-6", children: tab.content })) }, tab.id)))] }));
}
