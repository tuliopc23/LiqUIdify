export default function TokensAPIPage() {
    return (
        <div className="prose">
            <h1>Design Tokens</h1>
            <p>
                Glass UI uses a comprehensive design token system for consistent theming,
                spacing, colors, and effects. These tokens ensure visual harmony across
                all components and enable easy customization.
            </p>

            <h2>🎨 Glass Colors</h2>
            <div className="api-section">
                <h3>Glass Backgrounds</h3>
                <div className="grid grid-cols-2 gap-4 not-prose mb-6">
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-300">Light Theme</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-white/25 border border-white/20"></div>
                                <div>
                                    <div className="font-mono text-sm text-blue-300">glass.light.primary</div>
                                    <div className="text-xs text-gray-400">rgba(255, 255, 255, 0.25)</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-white/18 border border-white/20"></div>
                                <div>
                                    <div className="font-mono text-sm text-blue-300">glass.light.secondary</div>
                                    <div className="text-xs text-gray-400">rgba(255, 255, 255, 0.18)</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-white/35 border border-white/20"></div>
                                <div>
                                    <div className="font-mono text-sm text-blue-300">glass.light.elevated</div>
                                    <div className="text-xs text-gray-400">rgba(255, 255, 255, 0.35)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-300">Dark Theme</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-black/25 border border-white/20"></div>
                                <div>
                                    <div className="font-mono text-sm text-blue-300">glass.dark.primary</div>
                                    <div className="text-xs text-gray-400">rgba(0, 0, 0, 0.25)</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-black/18 border border-white/20"></div>
                                <div>
                                    <div className="font-mono text-sm text-blue-300">glass.dark.secondary</div>
                                    <div className="text-xs text-gray-400">rgba(0, 0, 0, 0.18)</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-black/35 border border-white/20"></div>
                                <div>
                                    <div className="font-mono text-sm text-blue-300">glass.dark.elevated</div>
                                    <div className="text-xs text-gray-400">rgba(0, 0, 0, 0.35)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2>🌊 Backdrop Blur</h2>
            <div className="api-section">
                <table className="prop-table">
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Value</th>
                            <th>Usage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code className="prop-name">glass</code></td>
                            <td><code>blur(12px)</code></td>
                            <td>Standard glass effect</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">glass-light</code></td>
                            <td><code>blur(8px)</code></td>
                            <td>Subtle glass effect</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">glass-heavy</code></td>
                            <td><code>blur(16px)</code></td>
                            <td>Strong glass effect</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">glass-ultra</code></td>
                            <td><code>blur(24px)</code></td>
                            <td>Maximum glass effect</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>📏 Spacing Scale</h2>
            <div className="api-section">
                <p>Based on a 4px grid system for consistent spacing:</p>
                <div className="grid grid-cols-4 gap-4 not-prose mb-6">
                    {[
                        { token: '1', value: '4px' },
                        { token: '2', value: '8px' },
                        { token: '3', value: '12px' },
                        { token: '4', value: '16px' },
                        { token: '6', value: '24px' },
                        { token: '8', value: '32px' },
                        { token: '12', value: '48px' },
                        { token: '16', value: '64px' },
                    ].map(({ token, value }) => (
                        <div key={token} className="flex items-center gap-2">
                            <div
                                className="bg-blue-400 rounded"
                                style={{ width: value, height: '12px' }}
                            ></div>
                            <div>
                                <div className="font-mono text-xs text-blue-300">{token}</div>
                                <div className="text-xs text-gray-400">{value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h2>🎯 Usage Examples</h2>

            <h3>CSS Custom Properties</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">CSS Variables</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`.my-glass-component {
  background: var(--glass-primary);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
}`}</code></pre>
            </div>

            <h3>Tailwind Configuration</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">tailwind.config.js</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`module.exports = {
  theme: {
    extend: {
      colors: {
        glass: {
          light: {
            primary: 'rgba(255, 255, 255, 0.25)',
            secondary: 'rgba(255, 255, 255, 0.18)',
            elevated: 'rgba(255, 255, 255, 0.35)',
          },
        },
      },
      backdropBlur: {
        'glass': '12px',
        'glass-heavy': '16px',
      },
    },
  },
}`}</code></pre>
            </div>

            <h3>JavaScript/TypeScript</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Token Usage</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { designTokens } from 'glass-ui/tokens';

const glassStyles = {
  background: designTokens.colors.glass.light.primary,
  backdropFilter: designTokens.backdropBlur.glass,
  borderRadius: designTokens.borderRadius.lg,
  padding: designTokens.spacing[6],
};`}</code></pre>
            </div>

            <h2>🎨 Customization</h2>
            <div className="api-section">
                <p>Override tokens to create custom themes:</p>

                <div className="code-block">
                    <pre className="p-4 m-0"><code>{`:root {
  /* Custom glass colors */
  --glass-primary: rgba(59, 130, 246, 0.25);
  --glass-border: rgba(59, 130, 246, 0.3);
  
  /* Custom blur values */
  --glass-blur: blur(16px);
  
  /* Custom spacing */
  --spacing-custom: 20px;
}

.custom-theme {
  --glass-primary: rgba(34, 197, 94, 0.25);
  --glass-border: rgba(34, 197, 94, 0.3);
}`}</code></pre>
                </div>
            </div>

            <h2>🔗 Related</h2>
            <div className="grid md:grid-cols-2 gap-4 not-prose mt-6">
                <a href="/guides/theming" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-blue-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Theming Guide</h4>
                    <p className="text-gray-400 text-sm">Learn how to customize Glass UI themes</p>
                </a>
                <a href="/api/utils" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-purple-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Utility Functions</h4>
                    <p className="text-gray-400 text-sm">Helper functions for working with tokens</p>
                </a>
            </div>
        </div>
    );
} 