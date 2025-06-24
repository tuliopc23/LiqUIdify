export default function ButtonComponentPage() {
    return (
        <div className="prose">
            <h1>GlassButton</h1>
            <p>
                A versatile button component with glassmorphism effects, interactive animations,
                and comprehensive accessibility support. The GlassButton includes magnetic hover
                effects, ripple animations, and haptic feedback capabilities.
            </p>

            <h2>📋 Import</h2>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Import Statement</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { GlassButton } from 'glass-ui';`}</code></pre>
            </div>

            <h2>🎨 Basic Examples</h2>

            <h3>Button Variants</h3>
            <div className="component-preview">
                <div className="flex flex-wrap gap-4">
                    <button className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium bg-blue-500/20 border border-blue-400/30 text-blue-300">
                        Primary
                    </button>
                    <button className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium border border-white/20 text-gray-300">
                        Secondary
                    </button>
                    <button className="px-6 py-3 rounded-xl font-medium text-gray-300 hover:bg-white/5 transition-colors">
                        Ghost
                    </button>
                    <button className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium bg-red-500/20 border border-red-400/30 text-red-300">
                        Destructive
                    </button>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Button Variants</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="secondary">Secondary</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>
<GlassButton variant="destructive">Destructive</GlassButton>`}</code></pre>
            </div>

            <h3>Button Sizes</h3>
            <div className="component-preview">
                <div className="flex flex-wrap gap-4 items-center">
                    <button className="liquid-glass liquid-glass-interactive px-2.5 py-1.5 rounded-lg text-xs font-medium border border-white/20 text-gray-300">
                        Extra Small
                    </button>
                    <button className="liquid-glass liquid-glass-interactive px-3 py-2 rounded-lg text-sm font-medium border border-white/20 text-gray-300">
                        Small
                    </button>
                    <button className="liquid-glass liquid-glass-interactive px-4 py-2.5 rounded-xl text-sm font-medium border border-white/20 text-gray-300">
                        Medium
                    </button>
                    <button className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl text-base font-medium border border-white/20 text-gray-300">
                        Large
                    </button>
                    <button className="liquid-glass liquid-glass-interactive px-8 py-4 rounded-xl text-lg font-medium border border-white/20 text-gray-300">
                        Extra Large
                    </button>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Button Sizes</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassButton size="xs">Extra Small</GlassButton>
<GlassButton size="sm">Small</GlassButton>
<GlassButton size="md">Medium</GlassButton>
<GlassButton size="lg">Large</GlassButton>
<GlassButton size="xl">Extra Large</GlassButton>`}</code></pre>
            </div>

            <h3>Buttons with Icons</h3>
            <div className="component-preview">
                <div className="flex flex-wrap gap-4">
                    <button className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center gap-2">
                        <span>📧</span>
                        Send Email
                    </button>
                    <button className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium border border-white/20 text-gray-300 flex items-center gap-2">
                        Download
                        <span>📥</span>
                    </button>
                    <button className="liquid-glass liquid-glass-interactive px-3 py-3 rounded-xl font-medium border border-white/20 text-gray-300">
                        ⚙️
                    </button>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Buttons with Icons</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassButton 
  variant="primary" 
  leftIcon={<MailIcon />}
>
  Send Email
</GlassButton>

<GlassButton 
  variant="secondary" 
  rightIcon={<DownloadIcon />}
>
  Download
</GlassButton>

<GlassButton 
  variant="ghost" 
  className="px-3"
>
  <SettingsIcon />
</GlassButton>`}</code></pre>
            </div>

            <h2>📊 Props</h2>
            <div className="api-section">
                <table className="prop-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code className="prop-name">variant</code></td>
                            <td><code className="prop-type">"primary" | "secondary" | "tertiary" | "ghost" | "destructive"</code></td>
                            <td><code>"primary"</code></td>
                            <td>Visual style variant of the button</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">size</code></td>
                            <td><code className="prop-type">"xs" | "sm" | "md" | "lg" | "xl"</code></td>
                            <td><code>"md"</code></td>
                            <td>Size of the button</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">leftIcon</code></td>
                            <td><code className="prop-type">ReactNode</code></td>
                            <td><code>undefined</code></td>
                            <td>Icon to display on the left side</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">rightIcon</code></td>
                            <td><code className="prop-type">ReactNode</code></td>
                            <td><code>undefined</code></td>
                            <td>Icon to display on the right side</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">loading</code></td>
                            <td><code className="prop-type">boolean</code></td>
                            <td><code>false</code></td>
                            <td>Shows loading spinner and disables button</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">disabled</code></td>
                            <td><code className="prop-type">boolean</code></td>
                            <td><code>false</code></td>
                            <td>Disables the button</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">asChild</code></td>
                            <td><code className="prop-type">boolean</code></td>
                            <td><code>false</code></td>
                            <td>Render as a child component (useful for Next.js Link)</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">className</code></td>
                            <td><code className="prop-type">string</code></td>
                            <td><code>undefined</code></td>
                            <td>Additional CSS classes</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">children</code></td>
                            <td><code className="prop-type">ReactNode</code></td>
                            <td><code>undefined</code></td>
                            <td>Button content</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>🎯 Advanced Examples</h2>

            <h3>Loading State</h3>
            <div className="component-preview">
                <div className="flex gap-4">
                    <button className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium bg-blue-500/20 border border-blue-400/30 text-blue-300 relative">
                        <div className="absolute inset-0 flex items-center justify-center bg-current/10 rounded-xl">
                            <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        </div>
                        <span className="opacity-0">Loading...</span>
                    </button>
                    <button className="liquid-glass liquid-glass-interactive px-6 py-3 rounded-xl font-medium border border-white/20 text-gray-300">
                        Normal Button
                    </button>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Loading State</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await submitForm();
  } finally {
    setIsLoading(false);
  }
};

<GlassButton 
  variant="primary" 
  loading={isLoading}
  onClick={handleSubmit}
>
  Submit Form
</GlassButton>`}</code></pre>
            </div>

            <h3>As Link Component</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Next.js Link</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import Link from 'next/link';

<GlassButton asChild>
  <Link href="/dashboard">
    Go to Dashboard
  </Link>
</GlassButton>`}</code></pre>
            </div>

            <h3>Form Integration</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Form Submit</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<form onSubmit={handleSubmit}>
  <GlassInput 
    placeholder="Enter your email" 
    type="email" 
    required 
  />
  
  <div className="flex gap-4 mt-4">
    <GlassButton 
      type="submit" 
      variant="primary"
      loading={isSubmitting}
    >
      Submit
    </GlassButton>
    
    <GlassButton 
      type="button" 
      variant="ghost"
      onClick={handleReset}
    >
      Reset
    </GlassButton>
  </div>
</form>`}</code></pre>
            </div>

            <h2>♿ Accessibility</h2>
            <div className="api-section">
                <h3>Keyboard Support</h3>
                <ul>
                    <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Activates the button</li>
                    <li><kbd>Tab</kbd> - Moves focus to the button</li>
                    <li><kbd>Shift + Tab</kbd> - Moves focus away from the button</li>
                </ul>

                <h3>ARIA Attributes</h3>
                <ul>
                    <li><code>aria-busy</code> - Set to true when loading</li>
                    <li><code>aria-disabled</code> - Set to true when disabled</li>
                    <li><code>aria-pressed</code> - Used for toggle buttons</li>
                    <li><code>aria-expanded</code> - Used for dropdown buttons</li>
                </ul>

                <h3>Screen Reader Support</h3>
                <p>
                    The button component is fully compatible with screen readers and provides
                    appropriate semantic markup. Loading states are announced to assistive technologies.
                </p>
            </div>

            <h2>🎨 Customization</h2>

            <h3>CSS Variables</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Custom Styling</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`.my-custom-button {
  --glass-primary: rgba(34, 197, 94, 0.25);
  --glass-primary-hover: rgba(34, 197, 94, 0.35);
  --glass-border: rgba(34, 197, 94, 0.3);
}

<GlassButton className="my-custom-button">
  Custom Green Button
</GlassButton>`}</code></pre>
            </div>

            <h3>Tailwind Classes</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Tailwind Customization</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassButton 
  variant="secondary"
  className="bg-gradient-to-r from-pink-500/20 to-violet-500/20 border-pink-400/30 text-pink-300 hover:from-pink-500/30 hover:to-violet-500/30"
>
  Gradient Button
</GlassButton>`}</code></pre>
            </div>

            <h2>🔗 Related Components</h2>
            <div className="grid md:grid-cols-2 gap-4 not-prose mt-6">
                <a href="/components/input" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-blue-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">GlassInput</h4>
                    <p className="text-gray-400 text-sm">Form input component with glass styling</p>
                </a>
                <a href="/components/card" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-purple-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">GlassCard</h4>
                    <p className="text-gray-400 text-sm">Container component for grouping content</p>
                </a>
            </div>
        </div>
    );
} 