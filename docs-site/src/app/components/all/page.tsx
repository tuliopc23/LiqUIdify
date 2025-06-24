export default function AllComponentsPage() {
    const componentCategories = [
        {
            title: "Form Components",
            description: "Interactive form elements with glass styling",
            components: [
                { name: "GlassButton", description: "Versatile button with physics effects", href: "/components/button" },
                { name: "GlassInput", description: "Text input with glass styling", href: "/components/input" },
                { name: "GlassTextarea", description: "Multi-line text input", href: "/components/textarea" },
                { name: "GlassSelect", description: "Dropdown selection component", href: "/components/select" },
                { name: "GlassCheckbox", description: "Checkbox with glass effects", href: "/components/checkbox" },
                { name: "GlassSwitch", description: "Toggle switch component", href: "/components/switch" },
                { name: "GlassSlider", description: "Range slider with glass track", href: "/components/slider" },
                { name: "GlassSearch", description: "Search input with suggestions", href: "/components/search" },
            ]
        },
        {
            title: "Layout Components",
            description: "Structural components for organizing content",
            components: [
                { name: "GlassCard", description: "Flexible container with glass morphism", href: "/components/card" },
                { name: "GlassModal", description: "Modal dialog with glass backdrop", href: "/components/modal" },
                { name: "GlassTabs", description: "Tab navigation component", href: "/components/tabs" },
                { name: "GlassTable", description: "Data table with glass styling", href: "/components/table" },
                { name: "GlassHeader", description: "Page header component", href: "/components/header" },
                { name: "GlassFooter", description: "Page footer component", href: "/components/footer" },
                { name: "GlassResponsiveCard", description: "Responsive card with breakpoint adaptations", href: "/components/responsive-card" },
            ]
        },
        {
            title: "Feedback Components",
            description: "Components for user feedback and status indication",
            components: [
                { name: "GlassBadge", description: "Status badge with glass effects", href: "/components/badge" },
                { name: "GlassProgress", description: "Progress indicator", href: "/components/progress" },
                { name: "GlassLoading", description: "Loading spinner component", href: "/components/loading" },
                { name: "GlassTooltip", description: "Tooltip with glass styling", href: "/components/tooltip" },
                { name: "GlassPopover", description: "Popover component", href: "/components/popover" },
                { name: "GlassToast", description: "Toast notification system", href: "/components/toast" },
                { name: "GlassNotification", description: "Notification center component", href: "/components/notification" },
            ]
        },
        {
            title: "Navigation Components",
            description: "Components for navigation and wayfinding",
            components: [
                { name: "GlassDropdown", description: "Dropdown menu component", href: "/components/dropdown" },
                { name: "GlassAvatar", description: "User avatar component", href: "/components/avatar" },
                { name: "GlassMobileNav", description: "Mobile navigation component", href: "/components/mobile-nav" },
                { name: "GlassNavbar", description: "Navigation bar component", href: "/components/navbar" },
                { name: "Sidebar", description: "Collapsible sidebar navigation", href: "/components/sidebar" },
                { name: "GlassCommand", description: "Command palette component", href: "/components/command" },
            ]
        },
        {
            title: "Data Display",
            description: "Components for displaying and visualizing data",
            components: [
                { name: "GlassChart", description: "Chart components with glass styling", href: "/components/chart" },
                { name: "LineChart", description: "Line chart component", href: "/components/line-chart" },
                { name: "BarChart", description: "Bar chart component", href: "/components/bar-chart" },
                { name: "DonutChart", description: "Donut chart component", href: "/components/donut-chart" },
            ]
        },
        {
            title: "Utility Components",
            description: "Utility and enhancement components",
            components: [
                { name: "ThemeProvider", description: "Theme context provider", href: "/components/theme-provider" },
                { name: "ThemeToggle", description: "Theme toggle button", href: "/components/theme-toggle" },
                { name: "ComponentShowcase", description: "Component demonstration wrapper", href: "/components/component-showcase" },
                { name: "GlassResponsiveButton", description: "Responsive button with breakpoint styling", href: "/components/responsive-button" },
            ]
        },
        {
            title: "Marketing Components",
            description: "Components for marketing and landing pages",
            components: [
                { name: "GlassHero", description: "Hero section component", href: "/components/hero" },
                { name: "GlassFeatureShowcase", description: "Feature showcase section", href: "/components/feature-showcase" },
                { name: "GlassFloatingAction", description: "Floating action button", href: "/components/floating-action" },
            ]
        }
    ];

    return (
        <div className="prose">
            <h1>All Components</h1>
            <p>
                Glass UI provides 30+ carefully crafted components with consistent glassmorphism
                styling, interactive animations, and comprehensive accessibility support.
                Each component is fully typed and follows React best practices.
            </p>

            <div className="component-preview mb-8">
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30">
                        30+ Components
                    </span>
                    <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30">
                        TypeScript Ready
                    </span>
                    <span className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded-full border border-green-400/30">
                        Accessible
                    </span>
                    <span className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-400/30">
                        Responsive
                    </span>
                </div>
            </div>

            {componentCategories.map((category, categoryIndex) => (
                <section key={category.title} className="mb-12">
                    <h2>{category.title}</h2>
                    <p className="text-gray-400">{category.description}</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 not-prose">
                        {category.components.map((component) => (
                            <a
                                key={component.name}
                                href={component.href}
                                className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-blue-400/30 transition-colors no-underline group"
                            >
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {component.name}
                                </h3>
                                <p className="text-gray-400 text-sm">{component.description}</p>
                            </a>
                        ))}
                    </div>
                </section>
            ))}

            <section className="mt-16">
                <h2>🎨 Component Features</h2>
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                    <div className="liquid-glass rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-3">🌟 Glassmorphism Effects</h3>
                        <ul className="text-gray-400 text-sm space-y-1">
                            <li>• Multiple glass variants (light, heavy, ultra)</li>
                            <li>• Dynamic blur and transparency</li>
                            <li>• Specular highlights and reflections</li>
                            <li>• Iridescent and holographic effects</li>
                        </ul>
                    </div>

                    <div className="liquid-glass rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-3">⚡ Interactive Physics</h3>
                        <ul className="text-gray-400 text-sm space-y-1">
                            <li>• Magnetic hover effects</li>
                            <li>• Spring-based animations</li>
                            <li>• Ripple interactions</li>
                            <li>• Haptic feedback support</li>
                        </ul>
                    </div>

                    <div className="liquid-glass rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-3">♿ Accessibility</h3>
                        <ul className="text-gray-400 text-sm space-y-1">
                            <li>• WCAG 2.1 AA compliant</li>
                            <li>• Full keyboard navigation</li>
                            <li>• Screen reader support</li>
                            <li>• Reduced motion respect</li>
                        </ul>
                    </div>

                    <div className="liquid-glass rounded-lg p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-3">📱 Responsive Design</h3>
                        <ul className="text-gray-400 text-sm space-y-1">
                            <li>• Mobile-first approach</li>
                            <li>• Touch-optimized interactions</li>
                            <li>• Breakpoint-aware styling</li>
                            <li>• Performance adaptations</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mt-16">
                <h2>🚀 Getting Started</h2>
                <p>Ready to start building with Glass UI components?</p>

                <div className="grid md:grid-cols-2 gap-4 not-prose mt-6">
                    <a href="/installation" className="liquid-glass rounded-lg p-6 border border-white/10 hover:border-blue-400/30 transition-colors no-underline">
                        <h3 className="text-lg font-semibold text-white mb-2">📦 Installation</h3>
                        <p className="text-gray-400 text-sm">Get Glass UI installed and configured in your project</p>
                    </a>

                    <a href="/quick-start" className="liquid-glass rounded-lg p-6 border border-white/10 hover:border-purple-400/30 transition-colors no-underline">
                        <h3 className="text-lg font-semibold text-white mb-2">⚡ Quick Start</h3>
                        <p className="text-gray-400 text-sm">Build your first component in minutes</p>
                    </a>

                    <a href="/examples" className="liquid-glass rounded-lg p-6 border border-white/10 hover:border-green-400/30 transition-colors no-underline">
                        <h3 className="text-lg font-semibold text-white mb-2">🎯 Examples</h3>
                        <p className="text-gray-400 text-sm">Real-world examples and code snippets</p>
                    </a>

                    <a href="/storybook" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-lg p-6 border border-white/10 hover:border-yellow-400/30 transition-colors no-underline">
                        <h3 className="text-lg font-semibold text-white mb-2">📚 Storybook</h3>
                        <p className="text-gray-400 text-sm">Interactive component playground and documentation</p>
                    </a>
                </div>
            </section>
        </div>
    );
} 