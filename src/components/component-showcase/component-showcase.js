import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { GlassButton } from "../glass-button";
import { GlassInput } from "../glass-input";
import { GlassTextarea } from "../glass-textarea";
import { GlassSelect } from "../glass-select";
import { GlassSlider } from "../glass-slider";
import { GlassProgress } from "../glass-progress";
import { GlassLoading } from "../glass-loading";
import { GlassTooltip } from "../glass-tooltip";
import { GlassPopover } from "../glass-popover";
import { GlassDropdown } from "../glass-dropdown";
import { GlassAvatar } from "../glass-avatar";
import { useToast } from "../glass-toast";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter } from "../glass-card";
import { GlassCheckbox } from "../glass-checkbox";
import { GlassSwitch } from "../glass-switch";
import { GlassTabs } from "../glass-tabs";
import { GlassBadge } from "../glass-badge";
import { GlassModal } from "../glass-modal";
import { GlassTable } from "../glass-table";
import { Download, Github, Heart, MousePointer, Keyboard, Layers, Users, TrendingUp, Settings, ChevronDown, Mail, Phone, MapPin, User, Edit, Trash, Share } from "lucide-react";
export function ComponentShowcase({ activeSection }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tableData = [
        {
            component: "Button",
            category: "Atom",
            status: "Ready",
            usage: "847 times",
            icon: _jsx(MousePointer, { className: "h-4 w-4 text-primary" }),
        },
        {
            component: "Input",
            category: "Atom",
            status: "Ready",
            usage: "623 times",
            icon: _jsx(Keyboard, { className: "h-4 w-4 text-primary" }),
        },
        {
            component: "Modal",
            category: "Organism",
            status: "In Progress",
            usage: "234 times",
            icon: _jsx(Layers, { className: "h-4 w-4 text-primary" }),
        },
    ];
    const tableColumns = [
        {
            key: "component",
            header: "Component",
            render: (value, item) => (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-8 h-8 glass-effect rounded-lg flex items-center justify-center mr-3", children: item.icon }), _jsx("span", { className: "font-medium text-primary", children: value })] })),
        },
        {
            key: "category",
            header: "Category",
            render: (value) => _jsx("span", { className: "text-secondary", children: value }),
        },
        {
            key: "status",
            header: "Status",
            render: (value) => (_jsx(GlassBadge, { variant: value === "Ready" ? "success" : "warning", children: value })),
        },
        {
            key: "usage",
            header: "Usage",
            render: (value) => _jsx("span", { className: "text-secondary", children: value }),
        },
    ];
    const tabsData = [
        {
            id: "components",
            label: "Components",
            content: (_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-3 text-primary", children: "Component Library" }), _jsx("p", { className: "text-secondary mb-4", children: "Explore our comprehensive collection of liquid glass components with Apple-inspired design. Each component is built with accessibility and performance in mind." }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(GlassBadge, { children: "Buttons" }), _jsx(GlassBadge, { children: "Inputs" }), _jsx(GlassBadge, { children: "Cards" }), _jsx(GlassBadge, { children: "Modals" })] })] })),
        },
        {
            id: "documentation",
            label: "Documentation",
            content: (_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-3 text-primary", children: "Documentation" }), _jsx("p", { className: "text-secondary", children: "Comprehensive guides and API references for all components in the library." })] })),
        },
        {
            id: "examples",
            label: "Examples",
            content: (_jsxs("div", { children: [_jsx("h4", { className: "font-semibold mb-3 text-primary", children: "Examples" }), _jsx("p", { className: "text-secondary", children: "Real-world examples and use cases for implementing the components." })] })),
        },
    ];
    const renderSection = () => {
        switch (activeSection) {
            case "introduction":
            default:
                return (_jsx("div", { children: _jsx("div", { className: "mb-12", children: _jsxs("div", { className: "glass-effect rounded-2xl p-8 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-4 text-primary", children: "Liquid Glass Component Library" }), _jsx("p", { className: "text-xl mb-6 text-secondary", children: "A complete React component library with Apple-inspired design and liquid glass aesthetic. Features comprehensive light/dark mode support, smooth animations, and SwiftUI-like micro-interactions." }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(GlassButton, { variant: "primary", leftIcon: _jsx(Download, {}), children: "Get Started" }), _jsx(GlassButton, { variant: "secondary", leftIcon: _jsx(Github, {}), children: "View on GitHub" })] })] }) }) }));
            case "button":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Button Components" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Button Variants" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [_jsx(GlassButton, { variant: "primary", children: "Primary" }), _jsx(GlassButton, { variant: "secondary", children: "Secondary" }), _jsx(GlassButton, { variant: "tertiary", children: "Tertiary" }), _jsx(GlassButton, { variant: "ghost", children: "Ghost" }), _jsx(GlassButton, { variant: "primary", rightIcon: _jsx(Heart, {}), children: "With Icon" })] }) }), _jsx("div", { className: "code-block rounded-lg p-4 font-mono text-sm overflow-x-auto", children: _jsx("code", { className: "text-primary", children: `<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="secondary">Secondary</GlassButton>
<GlassButton variant="tertiary">Tertiary</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>` }) })] }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Button Sizes" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [_jsx(GlassButton, { variant: "primary", size: "sm", children: "Small" }), _jsx(GlassButton, { variant: "primary", size: "md", children: "Medium" }), _jsx(GlassButton, { variant: "primary", size: "lg", children: "Large" })] }) })] })] }));
            case "input":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Input Components" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Text Inputs" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Default Input" }), _jsx(GlassInput, { placeholder: "Enter text..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Search Input" }), _jsx(GlassInput, { variant: "search", placeholder: "Search..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Password Input" }), _jsx(GlassInput, { variant: "password", placeholder: "Enter password..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Textarea" }), _jsx("textarea", { placeholder: "Enter message...", rows: 3, className: "w-full px-4 py-3 glass-effect rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary resize-none text-primary bg-glass placeholder:text-secondary" })] })] }) })] })] }));
            case "checkbox":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Form Controls" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Checkboxes & Switches" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-primary", children: "Checkboxes" }), _jsx(GlassCheckbox, { label: "Default checkbox" }), _jsx(GlassCheckbox, { label: "Checked checkbox", defaultChecked: true }), _jsx(GlassCheckbox, { label: "Disabled checkbox", disabled: true })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-primary", children: "Switches" }), _jsx(GlassSwitch, { label: "Toggle switch" }), _jsx(GlassSwitch, { label: "Active switch", checked: true })] })] }) })] })] }));
            case "card":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Card Components" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Card Variants" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs(GlassCard, { children: [_jsxs(GlassCardHeader, { children: [_jsx(GlassCardTitle, { children: "Basic Card" }), _jsx(GlassCardDescription, { children: "A simple card with glass morphism effect and subtle hover animations." })] }), _jsx(GlassCardFooter, { children: _jsx(GlassButton, { size: "sm", children: "Learn More" }) })] }), _jsx(GlassCard, { children: _jsxs(GlassCardHeader, { children: [_jsx("img", { src: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=200&fit=crop", alt: "Card image", className: "w-full h-32 object-cover rounded-lg mb-4 -mt-6 -mx-6" }), _jsx(GlassCardTitle, { children: "Image Card" }), _jsx(GlassCardDescription, { children: "Card with image header and glass effect content area." })] }) }), _jsx(GlassCard, { children: _jsxs(GlassCardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx(GlassCardTitle, { children: "Total Users" }), _jsx(Users, { className: "h-8 w-8 text-primary" })] }), _jsx("div", { className: "text-3xl font-bold mb-2 text-primary", children: "12,847" }), _jsxs("div", { className: "text-sm text-secondary", children: [_jsx(TrendingUp, { className: "inline h-4 w-4 text-green-500 mr-1" }), _jsx("span", { className: "text-green-500", children: "+12%" }), " from last month"] })] }) })] }) })] })] }));
            case "tabs":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Tab Components" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Interactive Tabs" }), _jsx("div", { className: "component-preview rounded-lg p-6", children: _jsx(GlassTabs, { tabs: tabsData, defaultTab: "components" }) })] })] }));
            case "modal":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Modal Components" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Modal Example" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsx(GlassButton, { onClick: () => setIsModalOpen(true), children: "Open Modal" }) })] }), _jsxs(GlassModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), title: "Modal Example", children: [_jsx("p", { className: "mb-6 text-secondary", children: "This is an example of a modal component with glass morphism effect and backdrop blur. The modal includes smooth animations and proper accessibility features." }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(GlassButton, { variant: "primary", className: "flex-1", onClick: () => setIsModalOpen(false), children: "Confirm" }), _jsx(GlassButton, { variant: "secondary", className: "flex-1", onClick: () => setIsModalOpen(false), children: "Cancel" })] })] })] }));
            case "data-table":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Data Table" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Interactive Data Table" }), _jsx("div", { className: "component-preview rounded-lg p-6", children: _jsx(GlassTable, { data: tableData, columns: tableColumns }) })] })] }));
            case "textarea":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Textarea Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Textarea Variants" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Default Textarea" }), _jsx(GlassTextarea, { placeholder: "Enter your message..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Minimal Variant" }), _jsx(GlassTextarea, { variant: "minimal", placeholder: "Minimal style..." })] })] }) })] })] }));
            case "select":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Select Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Dropdown Selection" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Choose Framework" }), _jsx(GlassSelect, { options: [
                                                            { value: "react", label: "React" },
                                                            { value: "vue", label: "Vue.js" },
                                                            { value: "angular", label: "Angular" },
                                                            { value: "svelte", label: "Svelte" }
                                                        ], placeholder: "Select framework..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Project Type" }), _jsx(GlassSelect, { options: [
                                                            { value: "spa", label: "Single Page App" },
                                                            { value: "ssr", label: "Server Side Rendered" },
                                                            { value: "static", label: "Static Site" },
                                                            { value: "mobile", label: "Mobile App", disabled: true }
                                                        ], placeholder: "Select type..." })] })] }) })] })] }));
            case "slider":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Slider Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Range Controls" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "space-y-8", children: [_jsx("div", { children: _jsx(GlassSlider, { min: 0, max: 100, value: 50, showValue: true }) }), _jsx("div", { children: _jsx(GlassSlider, { min: 0, max: 10, step: 0.5, value: 2.5, variant: "minimal" }) })] }) })] })] }));
            case "progress":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Progress Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Progress Indicators" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "space-y-6", children: [_jsx(GlassProgress, { value: 75, showValue: true, color: "blue" }), _jsx(GlassProgress, { value: 60, variant: "gradient", color: "green" }), _jsx(GlassProgress, { value: 40, size: "lg", color: "purple", showValue: true })] }) })] })] }));
            case "loading":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Loading Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Loading States" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8 items-center", children: [_jsx(GlassLoading, { variant: "spinner", size: "md", text: "Loading..." }), _jsx(GlassLoading, { variant: "dots", size: "lg" }), _jsx(GlassLoading, { variant: "pulse", size: "md" }), _jsx(GlassLoading, { variant: "bars", size: "sm" })] }) })] })] }));
            case "avatar":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Avatar Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "User Avatars" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "flex flex-wrap gap-6 items-center", children: [_jsx(GlassAvatar, { size: "sm", fallback: "JD" }), _jsx(GlassAvatar, { size: "md", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }), _jsx(GlassAvatar, { size: "lg", fallback: "AS", status: "online", showBorder: true }), _jsx(GlassAvatar, { size: "xl", variant: "rounded", fallback: "MR", status: "away" })] }) })] })] }));
            case "dropdown":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Dropdown Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Action Menus" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "flex gap-4", children: [_jsx(GlassDropdown, { trigger: _jsx(GlassButton, { variant: "secondary", rightIcon: _jsx(ChevronDown, { className: "h-4 w-4" }), children: "Options" }), items: [
                                                    { label: "Edit", value: "edit", icon: _jsx(Edit, { className: "h-4 w-4" }) },
                                                    { label: "Share", value: "share", icon: _jsx(Share, { className: "h-4 w-4" }) },
                                                    { label: "", value: "separator", separator: true },
                                                    { label: "Delete", value: "delete", icon: _jsx(Trash, { className: "h-4 w-4" }) }
                                                ] }), _jsx(GlassDropdown, { trigger: _jsx(GlassAvatar, { size: "md", fallback: "JD" }), items: [
                                                    { label: "Profile", value: "profile", icon: _jsx(User, { className: "h-4 w-4" }) },
                                                    { label: "Settings", value: "settings", icon: _jsx(Settings, { className: "h-4 w-4" }) },
                                                    { label: "", value: "separator", separator: true },
                                                    { label: "Logout", value: "logout" }
                                                ] })] }) })] })] }));
            case "tooltip":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Tooltip Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Hover Information" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "flex gap-6", children: [_jsx(GlassTooltip, { content: "This is a helpful tooltip", position: "top", children: _jsx(GlassButton, { variant: "secondary", children: "Hover me (Top)" }) }), _jsx(GlassTooltip, { content: "More detailed information can go here with multiple lines of text", position: "bottom", children: _jsx(GlassButton, { variant: "secondary", children: "Hover me (Bottom)" }) }), _jsx(GlassTooltip, { content: "Left tooltip", position: "left", children: _jsx(GlassButton, { variant: "secondary", children: "Left" }) })] }) })] })] }));
            case "popover":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Popover Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Interactive Overlays" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "flex gap-4", children: [_jsx(GlassPopover, { trigger: _jsx(GlassButton, { variant: "secondary", children: "User Info" }), content: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(GlassAvatar, { size: "md", fallback: "JD" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-primary", children: "John Doe" }), _jsx("p", { className: "text-sm text-secondary", children: "Software Engineer" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(GlassButton, { size: "sm", variant: "primary", children: "Follow" }), _jsx(GlassButton, { size: "sm", variant: "secondary", children: "Message" })] })] }) }), _jsx(GlassPopover, { trigger: _jsx(GlassButton, { variant: "secondary", children: "Contact" }), content: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mail, { className: "h-4 w-4 text-primary" }), _jsx("span", { className: "text-sm", children: "john@example.com" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "h-4 w-4 text-primary" }), _jsx("span", { className: "text-sm", children: "+1 (555) 123-4567" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-primary" }), _jsx("span", { className: "text-sm", children: "San Francisco, CA" })] })] }), position: "bottom" })] }) })] })] }));
            case "toast":
                const ToastDemo = () => {
                    const { addToast } = useToast();
                    return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Toast Component" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Notifications" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(GlassButton, { variant: "primary", onClick: () => addToast({
                                                        type: "success",
                                                        title: "Success!",
                                                        description: "Your action completed successfully."
                                                    }), children: "Show Success" }), _jsx(GlassButton, { variant: "secondary", onClick: () => addToast({
                                                        type: "error",
                                                        title: "Error",
                                                        description: "Something went wrong. Please try again."
                                                    }), children: "Show Error" }), _jsx(GlassButton, { variant: "tertiary", onClick: () => addToast({
                                                        type: "warning",
                                                        description: "This is a warning message with action.",
                                                        action: { label: "Undo", onClick: () => console.log("Undo clicked") }
                                                    }), children: "Show Warning" }), _jsx(GlassButton, { variant: "ghost", onClick: () => addToast({
                                                        type: "info",
                                                        description: "Here's some helpful information for you."
                                                    }), children: "Show Info" })] }) })] })] }));
                };
                return _jsx(ToastDemo, {});
            case "form-examples":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Complete Form Examples" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "User Registration Form" }), _jsx("div", { className: "component-preview rounded-lg p-6 mb-4", children: _jsxs("form", { className: "space-y-6 max-w-2xl", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "First Name" }), _jsx(GlassInput, { placeholder: "Enter first name..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Last Name" }), _jsx(GlassInput, { placeholder: "Enter last name..." })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Email" }), _jsx(GlassInput, { type: "email", placeholder: "your@email.com" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Role" }), _jsx(GlassSelect, { options: [
                                                            { value: "developer", label: "Developer" },
                                                            { value: "designer", label: "Designer" },
                                                            { value: "manager", label: "Project Manager" },
                                                            { value: "other", label: "Other" }
                                                        ], placeholder: "Select your role..." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Experience Level" }), _jsx(GlassSlider, { min: 0, max: 10, value: 5, showValue: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-primary", children: "Bio" }), _jsx(GlassTextarea, { placeholder: "Tell us about yourself..." })] }), _jsxs("div", { className: "flex items-center space-x-6", children: [_jsx(GlassCheckbox, { label: "Subscribe to newsletter" }), _jsx(GlassSwitch, { label: "Make profile public" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx(GlassButton, { variant: "primary", size: "lg", children: "Create Account" }), _jsx(GlassButton, { variant: "secondary", size: "lg", children: "Cancel" })] })] }) })] })] }));
            case "dashboard":
                return (_jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-primary", children: "Dashboard Example" }), _jsxs("div", { className: "glass-effect rounded-xl p-6 mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-primary", children: "Analytics Dashboard" }), _jsxs("div", { className: "component-preview rounded-lg p-6 mb-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx(GlassCard, { children: _jsxs(GlassCardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-secondary", children: "Total Users" }), _jsx("p", { className: "text-2xl font-bold text-primary", children: "12,847" })] }), _jsx(Users, { className: "h-8 w-8 text-blue-500" })] }), _jsx(GlassProgress, { value: 85, color: "blue", className: "mt-4" })] }) }), _jsx(GlassCard, { children: _jsxs(GlassCardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-secondary", children: "Revenue" }), _jsx("p", { className: "text-2xl font-bold text-primary", children: "$54,321" })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-green-500" })] }), _jsx(GlassProgress, { value: 72, color: "green", className: "mt-4" })] }) }), _jsx(GlassCard, { children: _jsxs(GlassCardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-secondary", children: "Projects" }), _jsx("p", { className: "text-2xl font-bold text-primary", children: "23" })] }), _jsx(Layers, { className: "h-8 w-8 text-purple-500" })] }), _jsx(GlassProgress, { value: 60, color: "purple", className: "mt-4" })] }) })] }), _jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h4", { className: "text-lg font-semibold text-primary", children: "Recent Activity" }), _jsx(GlassDropdown, { trigger: _jsx(GlassButton, { variant: "secondary", rightIcon: _jsx(ChevronDown, { className: "h-4 w-4" }), children: "Filter" }), items: [
                                                        { label: "All Time", value: "all" },
                                                        { label: "Last Week", value: "week" },
                                                        { label: "Last Month", value: "month" }
                                                    ] })] }), _jsx(GlassTable, { data: [
                                                { user: "John Doe", action: "Created project", time: "2 hours ago" },
                                                { user: "Jane Smith", action: "Updated profile", time: "4 hours ago" },
                                                { user: "Mike Johnson", action: "Completed task", time: "1 day ago" }
                                            ], columns: [
                                                { key: "user", header: "User" },
                                                { key: "action", header: "Action" },
                                                { key: "time", header: "Time" }
                                            ] })] })] })] }));
        }
    };
    return _jsx("div", { children: renderSection() });
}
