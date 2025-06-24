import Link from "next/link";

const componentCategories = [
    {
        title: "Form",
        description: "Interactive form elements with glass styling",
        components: [
            {
                name: "Button",
                description: "Displays a button or a component that looks like a button.",
                href: "/components/button",
                new: false,
                preview: "A versatile button with physics effects and haptic feedback"
            },
            {
                name: "Input",
                description: "A form input field with glass morphism effects.",
                href: "/components/input",
                new: false,
                preview: "Text input with floating labels and validation states"
            },
            {
                name: "Textarea",
                description: "Multi-line text input with auto-resize capabilities.",
                href: "/components/textarea",
                new: false,
                preview: "Expandable text area with character counting"
            },
            {
                name: "Select",
                description: "Custom select component with search and multi-select.",
                href: "/components/select",
                new: false,
                preview: "Dropdown with keyboard navigation and filtering"
            },
            {
                name: "Checkbox",
                description: "Checkbox with indeterminate state and animations.",
                href: "/components/checkbox",
                new: false,
                preview: "Animated checkbox with smooth transitions"
            },
            {
                name: "Switch",
                description: "Toggle switch with spring animations.",
                href: "/components/switch",
                new: false,
                preview: "Physics-based toggle with magnetic interactions"
            },
            {
                name: "Slider",
                description: "Range slider with glass track and thumb.",
                href: "/components/slider",
                new: false,
                preview: "Multi-thumb slider with step indicators"
            },
        ]
    },
    {
        title: "Data Display",
        description: "Components for displaying and organizing information",
        components: [
            {
                name: "Table",
                description: "A responsive table component with sorting and filtering.",
                href: "/components/table",
                new: false,
                preview: "Data table with virtual scrolling and actions"
            },
            {
                name: "Card",
                description: "Flexible container component with glass morphism.",
                href: "/components/card",
                new: false,
                preview: "Versatile card with hover animations"
            },
            {
                name: "Badge",
                description: "Small status indicator with variants.",
                href: "/components/badge",
                new: false,
                preview: "Colorful badges with dot indicators"
            },
            {
                name: "Avatar",
                description: "User avatar with fallback and status indicators.",
                href: "/components/avatar",
                new: false,
                preview: "Profile images with presence indicators"
            },
            {
                name: "Progress",
                description: "Progress indicator with animations.",
                href: "/components/progress",
                new: false,
                preview: "Linear and circular progress bars"
            },
        ]
    },
    {
        title: "Feedback",
        description: "Components for user feedback and notifications",
        components: [
            {
                name: "Toast",
                description: "Toast notifications with actions and variants.",
                href: "/components/toast",
                new: false,
                preview: "Stackable notifications with auto-dismiss"
            },
            {
                name: "Modal",
                description: "Modal dialog with backdrop blur effects.",
                href: "/components/modal",
                new: false,
                preview: "Layered modals with focus management"
            },
            {
                name: "Tooltip",
                description: "Contextual tooltip with smart positioning.",
                href: "/components/tooltip",
                new: false,
                preview: "Intelligent tooltips with delay and arrows"
            },
            {
                name: "Popover",
                description: "Floating popover with rich content.",
                href: "/components/popover",
                new: false,
                preview: "Contextual popovers with interactions"
            },
            {
                name: "Loading",
                description: "Loading indicators and skeleton screens.",
                href: "/components/loading",
                new: false,
                preview: "Shimmer effects and spinners"
            },
        ]
    },
    {
        title: "Navigation",
        description: "Components for navigation and user flow",
        components: [
            {
                name: "Tabs",
                description: "Tab navigation with keyboard support.",
                href: "/components/tabs",
                new: false,
                preview: "Horizontal and vertical tab layouts"
            },
            {
                name: "Dropdown",
                description: "Dropdown menu with submenus and actions.",
                href: "/components/dropdown",
                new: false,
                preview: "Multi-level dropdown menus"
            },
            {
                name: "Command",
                description: "Command palette for quick actions.",
                href: "/components/command",
                new: true,
                preview: "⌘K command menu with search and shortcuts"
            },
            {
                name: "Navigation",
                description: "Responsive navigation components.",
                href: "/components/navigation",
                new: false,
                preview: "Mobile-first navigation patterns"
            },
        ]
    },
    {
        title: "Layout",
        description: "Structural components for page layout",
        components: [
            {
                name: "Container",
                description: "Responsive container with max-width constraints.",
                href: "/components/container",
                new: false,
                preview: "Fluid and fixed width containers"
            },
            {
                name: "Grid",
                description: "Flexible grid system with glass styling.",
                href: "/components/grid",
                new: false,
                preview: "12-column responsive grid"
            },
            {
                name: "Stack",
                description: "Vertical and horizontal stack layouts.",
                href: "/components/stack",
                new: false,
                preview: "Flexible spacing and alignment"
            },
            {
                name: "Separator",
                description: "Visual separator with glass effects.",
                href: "/components/separator",
                new: false,
                preview: "Horizontal and vertical dividers"
            },
        ]
    },
];

export default function ComponentsPage() {
    return (
        <div className="prose">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Components</h1>
                <p className="text-xl text-gray-300 mb-6">
                    Beautifully designed components built with glassmorphism effects, physics-based animations,
                    and comprehensive accessibility. Copy and paste into your apps.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 not-prose">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-400">30+ components</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-400">TypeScript ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm text-gray-400">Fully accessible</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-400">Physics animations</span>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="mb-8 not-prose">
                <div className="liquid-glass rounded-xl p-4 border border-white/10 max-w-md">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search components..."
                            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                        />
                        <div className="flex gap-1">
                            <kbd className="px-2 py-1 text-xs bg-white/10 rounded border border-white/20">⌘</kbd>
                            <kbd className="px-2 py-1 text-xs bg-white/10 rounded border border-white/20">K</kbd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Component Categories */}
            {componentCategories.map((category, categoryIndex) => (
                <section key={category.title} className="mb-12">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                        <p className="text-gray-400">{category.description}</p>
                    </div>

                    <div className="grid gap-4 not-prose">
                        {category.components.map((component) => (
                            <Link
                                key={component.name}
                                href={component.href}
                                className="group liquid-glass rounded-xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 no-underline block"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                {component.name}
                                            </h3>
                                            {component.new && (
                                                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full border border-green-400/30">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3">{component.description}</p>
                                        <p className="text-xs text-gray-500">{component.preview}</p>
                                    </div>

                                    {/* Preview */}
                                    <div className="ml-6 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <div className="w-24 h-16 liquid-glass rounded-lg border border-white/10 flex items-center justify-center">
                                            <div className="w-12 h-8 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            ))}

            {/* Footer CTA */}
            <section className="mt-16 not-prose">
                <div className="liquid-glass rounded-xl p-8 border border-white/10 text-center">
                    <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
                    <p className="text-gray-400 mb-6">
                        Install Glass UI and start building beautiful interfaces with glassmorphism effects.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/installation"
                            className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium bg-blue-500/20 border border-blue-400/30 text-blue-300 no-underline"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/examples"
                            className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium border border-white/20 text-gray-300 no-underline"
                        >
                            View Examples
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
} 