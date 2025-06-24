import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const sidebarItems = [
    { id: "introduction", label: "Introduction", category: "Getting Started" },
    { id: "installation", label: "Installation", category: "Getting Started" },
    { id: "theming", label: "Theming", category: "Getting Started" },
    // Form Components
    { id: "button", label: "Button", category: "Form Controls" },
    { id: "input", label: "Input", category: "Form Controls" },
    { id: "textarea", label: "Textarea", category: "Form Controls" },
    { id: "select", label: "Select", category: "Form Controls" },
    { id: "checkbox", label: "Checkbox", category: "Form Controls" },
    { id: "switch", label: "Switch", category: "Form Controls" },
    { id: "slider", label: "Slider", category: "Form Controls" },
    // Display Components
    { id: "badge", label: "Badge", category: "Display" },
    { id: "avatar", label: "Avatar", category: "Display" },
    { id: "progress", label: "Progress", category: "Display" },
    { id: "loading", label: "Loading", category: "Display" },
    // Layout Components
    { id: "card", label: "Card", category: "Layout" },
    { id: "modal", label: "Modal", category: "Layout" },
    { id: "tabs", label: "Tabs", category: "Layout" },
    { id: "data-table", label: "Data Table", category: "Layout" },
    // Interactive Components
    { id: "dropdown", label: "Dropdown", category: "Interactive" },
    { id: "tooltip", label: "Tooltip", category: "Interactive" },
    { id: "popover", label: "Popover", category: "Interactive" },
    { id: "toast", label: "Toast", category: "Interactive" },
    // Examples
    { id: "form-examples", label: "Complete Forms", category: "Examples" },
    { id: "dashboard", label: "Dashboard", category: "Examples" },
    { id: "portfolio", label: "Portfolio Layout", category: "Examples" },
];
export function Sidebar({ activeSection, onSectionChange }) {
    const categories = Array.from(new Set(sidebarItems.map((item) => item.category)));
    return (_jsx("aside", { className: "fixed left-0 top-16 h-full w-64 glass-effect border-r border-glass overflow-y-auto", children: _jsx("div", { className: "p-6", children: _jsx("nav", { className: "space-y-2", children: categories.map((category) => (_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider mb-3 text-secondary", children: category }), _jsx("ul", { className: "space-y-1", children: sidebarItems
                                .filter((item) => item.category === category)
                                .map((item) => (_jsx("li", { children: _jsx("button", { onClick: () => onSectionChange(item.id), className: `sidebar-item block py-2 px-3 rounded-md text-sm w-full text-left transition-colors ${activeSection === item.id ? "active" : ""}`, children: item.label }) }, item.id))) })] }, category))) }) }) }));
}
