export default function ThemingPage() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold">Theming & Customization</h1>
                <p className="text-xl text-gray-300 max-w-3xl">
                    Customize Glass UI components with design tokens, CSS variables, and theme switching.
                    Create consistent visual experiences across your application.
                </p>
            </div>

            {/* Theme Provider */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Theme Provider Setup</h2>
                <p className="text-gray-300">
                    Wrap your application with the GlassProvider to enable theme switching and design token support.
                </p>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                    <div className="text-xs text-gray-400 mb-2">App.tsx</div>
                    <pre className="text-sm text-gray-300">
                        <code>{`import { GlassProvider } from 'glass-ui';
import 'glass-ui/dist/glass.css';

function App() {
  return (
    <GlassProvider
      defaultTheme="system"
      enableTransitions
      storageKey="glass-ui-theme"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        {/* Your app content */}
      </div>
    </GlassProvider>
  );
}`}</code>
                    </pre>
                </div>

                <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6">
                    <h3 className="font-semibold mb-3 text-blue-300">Provider Props</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>• <code className="text-blue-300">defaultTheme</code>: "light" | "dark" | "system" - Initial theme setting</li>
                        <li>• <code className="text-blue-300">enableTransitions</code>: boolean - Enable smooth theme transitions</li>
                        <li>• <code className="text-blue-300">storageKey</code>: string - LocalStorage key for theme persistence</li>
                        <li>• <code className="text-blue-300">disableStorage</code>: boolean - Disable theme persistence</li>
                    </ul>
                </div>
            </section>

            {/* Design Tokens */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Design Tokens</h2>
                <p className="text-gray-300">
                    Glass UI uses CSS custom properties (design tokens) for consistent theming across components.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Glass Tokens */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Glass Effect Tokens</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm text-gray-300">
                                <code>{`:root {
  /* Glass Opacity */
  --glass-primary: rgba(255, 255, 255, 0.25);
  --glass-secondary: rgba(255, 255, 255, 0.18);
  --glass-tertiary: rgba(255, 255, 255, 0.12);
  
  /* Glass Blur */
  --glass-blur: 12px;
  --glass-blur-heavy: 16px;
  --glass-blur-ultra: 24px;
  
  /* Glass Borders */
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-border-strong: rgba(255, 255, 255, 0.2);
}`}</code>
                            </pre>
                        </div>
                    </div>

                    {/* Color Tokens */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Color Tokens</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm text-gray-300">
                                <code>{`:root {
  /* Primary Colors */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-900: #1e3a8a;
  
  /* Glass Colors */
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-hover: rgba(255, 255, 255, 0.1);
  --glass-active: rgba(255, 255, 255, 0.15);
  
  /* Semantic Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dark Mode */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Dark Mode Configuration</h2>
                <p className="text-gray-300">
                    Configure dark mode variants using CSS custom properties or Tailwind CSS dark mode.
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">CSS Variables Approach</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm text-gray-300">
                                <code>{`:root {
  --glass-primary: rgba(255, 255, 255, 0.25);
  --glass-secondary: rgba(255, 255, 255, 0.18);
  --text-primary: #000000;
  --bg-primary: #ffffff;
}

.dark {
  --glass-primary: rgba(0, 0, 0, 0.25);
  --glass-secondary: rgba(0, 0, 0, 0.18);
  --text-primary: #ffffff;
  --bg-primary: #000000;
}

/* Components automatically use these variables */
.glass-card {
  background: var(--glass-primary);
  backdrop-filter: blur(var(--glass-blur));
  color: var(--text-primary);
}`}</code>
                            </pre>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Tailwind CSS Integration</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <div className="text-xs text-gray-400 mb-2">tailwind.config.js</div>
                            <pre className="text-sm text-gray-300">
                                <code>{`module.exports = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        glass: {
          light: {
            primary: 'rgba(255, 255, 255, 0.25)',
            secondary: 'rgba(255, 255, 255, 0.18)',
            border: 'rgba(255, 255, 255, 0.1)',
          },
          dark: {
            primary: 'rgba(0, 0, 0, 0.25)',
            secondary: 'rgba(0, 0, 0, 0.18)',
            border: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
}`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Themes */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Creating Custom Themes</h2>
                <p className="text-gray-300">
                    Extend the default theme system to create custom brand themes and specialized variants.
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Brand Theme Example</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm text-gray-300">
                                <code>{`/* Brand-specific theme */
.theme-ocean {
  --glass-primary: rgba(59, 130, 246, 0.25);
  --glass-secondary: rgba(29, 78, 216, 0.18);
  --glass-border: rgba(59, 130, 246, 0.2);
  --primary-color: #0ea5e9;
  --accent-color: #06b6d4;
}

.theme-sunset {
  --glass-primary: rgba(251, 146, 60, 0.25);
  --glass-secondary: rgba(249, 115, 22, 0.18);
  --glass-border: rgba(251, 146, 60, 0.2);
  --primary-color: #f97316;
  --accent-color: #ea580c;
}

.theme-forest {
  --glass-primary: rgba(34, 197, 94, 0.25);
  --glass-secondary: rgba(22, 163, 74, 0.18);
  --glass-border: rgba(34, 197, 94, 0.2);
  --primary-color: #16a34a;
  --accent-color: #15803d;
}`}</code>
                            </pre>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Theme Switching Component</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm text-gray-300">
                                <code>{`import { useTheme } from 'glass-ui';

const themes = [
  { name: 'Default', value: 'default', class: '' },
  { name: 'Ocean', value: 'ocean', class: 'theme-ocean' },
  { name: 'Sunset', value: 'sunset', class: 'theme-sunset' },
  { name: 'Forest', value: 'forest', class: 'theme-forest' },
];

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [customTheme, setCustomTheme] = useState('default');
  
  const applyCustomTheme = (themeName: string) => {
    const body = document.body;
    
    // Remove existing theme classes
    themes.forEach(t => body.classList.remove(t.class));
    
    // Apply new theme class
    const selectedTheme = themes.find(t => t.value === themeName);
    if (selectedTheme?.class) {
      body.classList.add(selectedTheme.class);
    }
    
    setCustomTheme(themeName);
  };
  
  return (
    <div className="space-y-4">
      <h3>System Theme</h3>
      <div className="flex gap-2">
        <GlassButton 
          variant={theme === 'light' ? 'primary' : 'secondary'}
          onClick={() => setTheme('light')}
        >
          Light
        </GlassButton>
        <GlassButton 
          variant={theme === 'dark' ? 'primary' : 'secondary'}
          onClick={() => setTheme('dark')}
        >
          Dark
        </GlassButton>
      </div>
      
      <h3>Custom Themes</h3>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((t) => (
          <GlassButton
            key={t.value}
            variant={customTheme === t.value ? 'primary' : 'secondary'}
            onClick={() => applyCustomTheme(t.value)}
          >
            {t.name}
          </GlassButton>
        ))}
      </div>
    </div>
  );
}`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Component Customization */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Component Customization</h2>
                <p className="text-gray-300">
                    Override component styles using CSS custom properties or Tailwind utilities.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">CSS Variable Override</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm text-gray-300">
                                <code>{`/* Custom button styling */
.my-custom-button {
  --glass-primary: rgba(168, 85, 247, 0.25);
  --glass-border: rgba(168, 85, 247, 0.3);
  --glass-hover: rgba(168, 85, 247, 0.35);
  --border-radius: 16px;
}

/* Apply to specific component */
<GlassButton className="my-custom-button">
  Custom Styled Button
</GlassButton>`}</code>
                            </pre>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Tailwind Customization</h3>
                        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-sm text-gray-300">
                                <code>{`<!-- Using Tailwind utilities -->
<GlassCard className="
  bg-purple-500/20 
  border-purple-400/30 
  backdrop-blur-xl
  shadow-purple-500/25 
  shadow-2xl
  hover:bg-purple-400/25
  transition-all
  duration-300
">
  <h3>Custom Card</h3>
</GlassCard>`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* Animation Customization */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Animation & Effects</h2>
                <p className="text-gray-300">
                    Customize glass animations, transitions, and physics effects for your theme.
                </p>

                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-gray-300">
                        <code>{`:root {
  /* Animation Durations */
  --glass-transition-fast: 150ms;
  --glass-transition-normal: 250ms;
  --glass-transition-slow: 350ms;
  
  /* Animation Easings */
  --glass-easing-default: cubic-bezier(0.4, 0, 0.2, 1);
  --glass-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --glass-easing-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  
  /* Physics Effects */
  --glass-magnetic-distance: 100px;
  --glass-magnetic-strength: 0.8;
  --glass-ripple-scale: 1.5;
  --glass-ripple-opacity: 0.3;
}

/* Custom animation classes */
.glass-magnetic-strong {
  --glass-magnetic-strength: 1.2;
}

.glass-slow-transitions {
  --glass-transition-normal: 500ms;
}`}</code>
                    </pre>
                </div>
            </section>

            {/* Best Practices */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Theming Best Practices</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6">
                        <h3 className="font-semibold mb-3 text-green-300">✅ Do</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>• Use CSS custom properties for consistent theming</li>
                            <li>• Test themes in both light and dark modes</li>
                            <li>• Maintain sufficient contrast ratios</li>
                            <li>• Use semantic color names (primary, secondary)</li>
                            <li>• Provide theme persistence across sessions</li>
                            <li>• Test with reduced motion preferences</li>
                        </ul>
                    </div>

                    <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-6">
                        <h3 className="font-semibold mb-3 text-red-300">❌ Don't</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>• Hardcode color values in components</li>
                            <li>• Use too many theme variants</li>
                            <li>• Ignore accessibility guidelines</li>
                            <li>• Override core Glass UI tokens carelessly</li>
                            <li>• Forget to test theme switching animations</li>
                            <li>• Use themes that reduce glass effect visibility</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold">Next Steps</h2>

                <div className="grid md:grid-cols-3 gap-6">
                    <a
                        href="/guides/design-tokens"
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors block"
                    >
                        <h3 className="font-semibold mb-2">Design Tokens</h3>
                        <p className="text-sm text-gray-400">Explore the complete design token system</p>
                    </a>

                    <a
                        href="/guides/animations"
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors block"
                    >
                        <h3 className="font-semibold mb-2">Animations</h3>
                        <p className="text-sm text-gray-400">Learn about physics-based animations</p>
                    </a>

                    <a
                        href="/api/tokens"
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors block"
                    >
                        <h3 className="font-semibold mb-2">Token Reference</h3>
                        <p className="text-sm text-gray-400">Complete API reference for design tokens</p>
                    </a>
                </div>
            </section>
        </div>
    );
} 