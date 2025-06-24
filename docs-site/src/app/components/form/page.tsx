import Link from "next/link";

const formComponents = [
    {
        name: "GlassButton",
        description: "A versatile button component with glass morphism effects and multiple variants",
        href: "/components/glass-button",
        props: ["variant", "size", "loading", "leftIcon", "rightIcon", "asChild"],
        variants: ["primary", "secondary", "tertiary", "ghost", "destructive"],
        features: ["Magnetic hover", "Ripple effect", "Loading states", "Haptic feedback"]
    },
    {
        name: "GlassInput",
        description: "A form input component with glass styling and validation support",
        href: "/components/glass-input",
        props: ["type", "placeholder", "error", "success", "disabled"],
        variants: ["default", "filled", "outlined"],
        features: ["Focus states", "Validation styling", "Error messages", "Auto-resize"]
    },
    {
        name: "GlassTextarea",
        description: "Multi-line text input with glass effects and auto-resize functionality",
        href: "/components/glass-textarea",
        props: ["rows", "maxRows", "resize", "autoResize"],
        variants: ["default", "filled"],
        features: ["Auto-resize", "Character count", "Focus states", "Validation"]
    },
    {
        name: "GlassSelect",
        description: "Dropdown select component with glass styling and search functionality",
        href: "/components/glass-select",
        props: ["options", "placeholder", "searchable", "multiple"],
        variants: ["default", "searchable", "multiple"],
        features: ["Keyboard navigation", "Search filtering", "Multi-select", "Custom options"]
    },
    {
        name: "GlassCheckbox",
        description: "Checkbox input with glass morphism styling and smooth animations",
        href: "/components/glass-checkbox",
        props: ["checked", "indeterminate", "disabled", "size"],
        variants: ["default", "indeterminate"],
        features: ["Smooth animations", "Indeterminate state", "Focus indicators", "Glass styling"]
    },
    {
        name: "GlassSwitch",
        description: "Toggle switch component with glass effects and magnetic interactions",
        href: "/components/glass-switch",
        props: ["checked", "disabled", "size", "variant"],
        variants: ["default", "magnetic"],
        features: ["Magnetic effect", "Smooth transitions", "Touch-friendly", "Accessibility"]
    },
    {
        name: "GlassSlider",
        description: "Range slider with glass morphism styling and smooth value transitions",
        href: "/components/glass-slider",
        props: ["value", "min", "max", "step", "disabled"],
        variants: ["default", "range"],
        features: ["Range selection", "Step indicators", "Touch support", "Value labels"]
    }
];

export default function FormComponentsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Form Components</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                    Interactive form controls with glass morphism styling, accessibility features,
                    and advanced interaction patterns including haptic feedback and magnetic effects.
                </p>
            </div>

            {/* Quick Links */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {formComponents.map((component) => (
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
                {formComponents.map((component, index) => (
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
                                                className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-sm text-blue-300"
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
                                    className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors"
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

            {/* Best Practices */}
            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4 text-yellow-300">💡 Best Practices</h2>
                <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Always provide proper labels and ARIA attributes for accessibility</li>
                    <li>• Use consistent sizing across related form elements</li>
                    <li>• Implement proper focus management and keyboard navigation</li>
                    <li>• Provide clear validation feedback with appropriate colors and messages</li>
                    <li>• Consider touch targets on mobile devices (minimum 44px)</li>
                    <li>• Use loading states for async operations</li>
                </ul>
            </div>
        </div>
    );
}

function getComponentExample(componentName: string): string {
    const examples: Record<string, string> = {
        "GlassButton": `<GlassButton 
  variant="primary" 
  size="md"
  leftIcon={<StarIcon />}
  onClick={handleClick}
>
  Get Started
</GlassButton>`,
        "GlassInput": `<GlassInput
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  onChange={handleChange}
/>`,
        "GlassTextarea": `<GlassTextarea
  placeholder="Enter description"
  autoResize
  maxRows={5}
  onChange={handleChange}
/>`,
        "GlassSelect": `<GlassSelect
  options={countries}
  placeholder="Select country"
  searchable
  onChange={handleSelect}
/>`,
        "GlassCheckbox": `<GlassCheckbox
  checked={isChecked}
  onChange={setIsChecked}
>
  I agree to terms
</GlassCheckbox>`,
        "GlassSwitch": `<GlassSwitch
  checked={enabled}
  onChange={setEnabled}
  variant="magnetic"
/>`,
        "GlassSlider": `<GlassSlider
  value={[20, 80]}
  min={0}
  max={100}
  step={5}
  onChange={handleChange}
/>`
    };

    return examples[componentName] || `<${componentName} />`;
} 