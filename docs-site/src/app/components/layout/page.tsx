import Link from "next/link";

const layoutComponents = [
    {
        name: "GlassCard",
        description: "Flexible container component with glass morphism effects for content grouping",
        href: "/components/glass-card",
        props: ["variant", "padding", "radius", "blur", "shadow"],
        variants: ["default", "elevated", "flat", "outlined"],
        features: ["Responsive design", "Nested layouts", "Animation support", "Custom borders"]
    },
    {
        name: "GlassModal",
        description: "Overlay component with backdrop blur and focus management",
        href: "/components/glass-modal",
        props: ["open", "onClose", "size", "backdrop", "position"],
        variants: ["default", "fullscreen", "drawer", "centered"],
        features: ["Focus trapping", "Backdrop click", "ESC key handling", "Portal rendering"]
    },
    {
        name: "GlassTable",
        description: "Data table with glass styling, sorting, and virtual scrolling",
        href: "/components/glass-table",
        props: ["data", "columns", "sortable", "virtualScroll", "sticky"],
        variants: ["default", "striped", "bordered", "compact"],
        features: ["Virtual scrolling", "Column sorting", "Sticky headers", "Row selection"]
    },
    {
        name: "GlassPopover",
        description: "Floating content container with positioning and arrow indicators",
        href: "/components/glass-popover",
        props: ["trigger", "placement", "arrow", "offset", "boundary"],
        variants: ["default", "tooltip", "menu", "dialog"],
        features: ["Auto positioning", "Collision detection", "Arrow indicators", "Click outside"]
    },
    {
        name: "GlassTabs",
        description: "Tab navigation component with smooth animations and keyboard support",
        href: "/components/glass-tabs",
        props: ["value", "orientation", "variant", "size"],
        variants: ["default", "pills", "underlined", "contained"],
        features: ["Keyboard navigation", "Smooth animations", "Lazy loading", "Custom indicators"]
    },
    {
        name: "Sidebar",
        description: "Navigation sidebar with collapsible sections and responsive behavior",
        href: "/components/sidebar",
        props: ["collapsed", "variant", "position", "overlay"],
        variants: ["default", "minimal", "overlay", "push"],
        features: ["Collapsible sections", "Mobile overlay", "Nested navigation", "State persistence"]
    }
];

export default function LayoutComponentsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Layout Components</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                    Structural components for organizing content with glass morphism effects.
                    Build complex layouts with responsive containers, modals, tables, and navigation.
                </p>
            </div>

            {/* Quick Links */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {layoutComponents.map((component) => (
                        <Link
                            key={component.name}
                            href={component.href}
                            className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
                        >
                            {component.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Components Grid */}
            <div className="space-y-8">
                {layoutComponents.map((component, index) => (
                    <div
                        key={component.name}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
                    >
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Component Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{component.name}</h3>
                                    <p className="text-gray-300">{component.description}</p>
                                </div>

                                {/* Key Props */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                                        Key Props
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {component.props.map((prop) => (
                                            <span
                                                key={prop}
                                                className="px-3 py-1 bg-gray-800/50 border border-gray-600/30 rounded-lg text-sm font-mono"
                                            >
                                                {prop}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Variants */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                                        Variants
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {component.variants.map((variant) => (
                                            <span
                                                key={variant}
                                                className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-lg text-sm text-purple-300"
                                            >
                                                {variant}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                                        Features
                                    </h4>
                                    <ul className="space-y-2">
                                        {component.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-center text-sm text-gray-300"
                                            >
                                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href={component.href}
                                    className="inline-flex items-center px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors"
                                >
                                    View Documentation →
                                </Link>
                            </div>

                            {/* Preview/Code Example */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                    Example Usage
                                </h4>
                                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-sm text-gray-300">
                                        <code>{getComponentExample(component.name)}</code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Layout Patterns */}
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4 text-blue-300">🏗️ Common Layout Patterns</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="font-semibold">Dashboard Layout</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-3 overflow-x-auto">
                            <pre className="text-xs text-gray-300">
                                <code>{`<div className="flex h-screen">
  <Sidebar />
  <main className="flex-1 p-6">
    <GlassCard>
      <GlassTable data={data} />
    </GlassCard>
  </main>
</div>`}</code>
                            </pre>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-semibold">Modal with Tabs</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-3 overflow-x-auto">
                            <pre className="text-xs text-gray-300">
                                <code>{`<GlassModal open={isOpen}>
  <GlassTabs value={activeTab}>
    <TabsList>
      <TabsTrigger value="info">Info</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="info">
      <GlassCard>Content here</GlassCard>
    </TabsContent>
  </GlassTabs>
</GlassModal>`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getComponentExample(componentName: string): string {
    const examples: Record<string, string> = {
        "GlassCard": `<GlassCard 
  variant="elevated" 
  className="p-6"
>
  <h3>Card Title</h3>
  <p>Card content with glass effects</p>
</GlassCard>`,
        "GlassModal": `<GlassModal 
  open={isOpen} 
  onClose={setIsOpen}
  size="lg"
>
  <h2>Modal Title</h2>
  <p>Modal content here</p>
</GlassModal>`,
        "GlassTable": `<GlassTable
  data={tableData}
  columns={columns}
  sortable
  virtualScroll
/>`,
        "GlassPopover": `<GlassPopover
  trigger={<button>Click me</button>}
  placement="bottom"
  arrow
>
  <div className="p-4">
    Popover content
  </div>
</GlassPopover>`,
        "GlassTabs": `<GlassTabs value={activeTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content 1
  </TabsContent>
</GlassTabs>`,
        "Sidebar": `<Sidebar 
  collapsed={isCollapsed}
  variant="minimal"
>
  <SidebarItem icon={<HomeIcon />}>
    Home
  </SidebarItem>
  <SidebarItem icon={<SettingsIcon />}>
    Settings
  </SidebarItem>
</Sidebar>`
    };

    return examples[componentName] || `<${componentName} />`;
} 