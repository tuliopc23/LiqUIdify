export default function InputComponentPage() {
    return (
        <div className="prose">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">Input</h1>
                <p className="text-xl text-gray-300">
                    A form input component with glassmorphism effects, floating labels,
                    and comprehensive validation states. Supports various input types and interactions.
                </p>
            </div>

            {/* Import */}
            <h2>Import</h2>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Import</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { GlassInput } from 'glass-ui';`}</code></pre>
            </div>

            {/* Usage */}
            <h2>Usage</h2>
            <div className="component-preview">
                <div className="max-w-sm mx-auto">
                    <div className="liquid-glass rounded-lg p-3 border border-white/20">
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Basic Usage</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassInput placeholder="Enter your email" />`}</code></pre>
            </div>

            {/* Examples */}
            <h2>Examples</h2>

            <h3>Input Types</h3>
            <div className="component-preview">
                <div className="space-y-4 max-w-sm mx-auto">
                    <div className="liquid-glass rounded-lg p-3 border border-white/20">
                        <input
                            type="text"
                            placeholder="Text input"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                        />
                    </div>
                    <div className="liquid-glass rounded-lg p-3 border border-white/20">
                        <input
                            type="email"
                            placeholder="Email input"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                        />
                    </div>
                    <div className="liquid-glass rounded-lg p-3 border border-white/20">
                        <input
                            type="password"
                            placeholder="Password input"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                        />
                    </div>
                    <div className="liquid-glass rounded-lg p-3 border border-white/20">
                        <input
                            type="number"
                            placeholder="Number input"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                        />
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Input Types</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassInput type="text" placeholder="Text input" />
<GlassInput type="email" placeholder="Email input" />
<GlassInput type="password" placeholder="Password input" />
<GlassInput type="number" placeholder="Number input" />`}</code></pre>
            </div>

            <h3>With Icons</h3>
            <div className="component-preview">
                <div className="space-y-4 max-w-sm mx-auto">
                    <div className="liquid-glass rounded-lg p-3 border border-white/20 flex items-center gap-3">
                        <span className="text-gray-400">📧</span>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                        />
                    </div>
                    <div className="liquid-glass rounded-lg p-3 border border-white/20 flex items-center gap-3">
                        <span className="text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                        />
                        <button className="text-gray-400 hover:text-white transition-colors">⌘K</button>
                    </div>
                    <div className="liquid-glass rounded-lg p-3 border border-white/20 flex items-center gap-3">
                        <span className="text-gray-400">🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                        />
                        <button className="text-gray-400 hover:text-white transition-colors">👁️</button>
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">With Icons</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassInput 
  type="email" 
  placeholder="Enter your email"
  leftIcon={<MailIcon />}
/>

<GlassInput 
  type="text" 
  placeholder="Search..."
  leftIcon={<SearchIcon />}
  rightIcon={<kbd>⌘K</kbd>}
/>

<GlassInput 
  type="password" 
  placeholder="Password"
  leftIcon={<LockIcon />}
  rightIcon={<EyeIcon />}
/>`}</code></pre>
            </div>

            <h3>Validation States</h3>
            <div className="component-preview">
                <div className="space-y-4 max-w-sm mx-auto">
                    <div>
                        <div className="liquid-glass rounded-lg p-3 border border-green-400/30 bg-green-500/10">
                            <input
                                type="email"
                                placeholder="Valid email"
                                defaultValue="user@example.com"
                                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                            />
                        </div>
                        <p className="text-xs text-green-400 mt-1 ml-3">✓ Valid email address</p>
                    </div>
                    <div>
                        <div className="liquid-glass rounded-lg p-3 border border-red-400/30 bg-red-500/10">
                            <input
                                type="email"
                                placeholder="Invalid email"
                                defaultValue="invalid-email"
                                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                            />
                        </div>
                        <p className="text-xs text-red-400 mt-1 ml-3">⚠ Please enter a valid email address</p>
                    </div>
                    <div>
                        <div className="liquid-glass rounded-lg p-3 border border-yellow-400/30 bg-yellow-500/10">
                            <input
                                type="text"
                                placeholder="Warning state"
                                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                            />
                        </div>
                        <p className="text-xs text-yellow-400 mt-1 ml-3">⚠ This field is recommended</p>
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Validation States</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassInput 
  type="email" 
  placeholder="Enter email"
  state="success"
  message="Valid email address"
/>

<GlassInput 
  type="email" 
  placeholder="Enter email"
  state="error"
  message="Please enter a valid email address"
/>

<GlassInput 
  type="text" 
  placeholder="Optional field"
  state="warning"
  message="This field is recommended"
/>`}</code></pre>
            </div>

            <h3>Sizes</h3>
            <div className="component-preview">
                <div className="space-y-4 max-w-sm mx-auto">
                    <div className="liquid-glass rounded-md p-2 border border-white/20">
                        <input
                            type="text"
                            placeholder="Small input"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-sm"
                        />
                    </div>
                    <div className="liquid-glass rounded-lg p-3 border border-white/20">
                        <input
                            type="text"
                            placeholder="Medium input (default)"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                        />
                    </div>
                    <div className="liquid-glass rounded-xl p-4 border border-white/20">
                        <input
                            type="text"
                            placeholder="Large input"
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Sizes</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassInput size="sm" placeholder="Small input" />
<GlassInput size="md" placeholder="Medium input (default)" />
<GlassInput size="lg" placeholder="Large input" />`}</code></pre>
            </div>

            <h3>Disabled State</h3>
            <div className="component-preview">
                <div className="max-w-sm mx-auto">
                    <div className="liquid-glass rounded-lg p-3 border border-white/10 opacity-50 cursor-not-allowed">
                        <input
                            type="text"
                            placeholder="Disabled input"
                            disabled
                            className="w-full bg-transparent outline-none text-white placeholder-gray-400 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Disabled State</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`<GlassInput placeholder="Disabled input" disabled />`}</code></pre>
            </div>

            {/* API Reference */}
            <h2>API Reference</h2>
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
                            <td><code className="prop-name">type</code></td>
                            <td><code className="prop-type">"text" | "email" | "password" | "number" | "tel" | "url" | "search"</code></td>
                            <td><code>"text"</code></td>
                            <td>The input type</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">size</code></td>
                            <td><code className="prop-type">"sm" | "md" | "lg"</code></td>
                            <td><code>"md"</code></td>
                            <td>The size of the input</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">state</code></td>
                            <td><code className="prop-type">"default" | "success" | "error" | "warning"</code></td>
                            <td><code>"default"</code></td>
                            <td>The validation state</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">leftIcon</code></td>
                            <td><code className="prop-type">ReactNode</code></td>
                            <td><code>undefined</code></td>
                            <td>Icon to display on the left</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">rightIcon</code></td>
                            <td><code className="prop-type">ReactNode</code></td>
                            <td><code>undefined</code></td>
                            <td>Icon to display on the right</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">message</code></td>
                            <td><code className="prop-type">string</code></td>
                            <td><code>undefined</code></td>
                            <td>Helper or error message</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">label</code></td>
                            <td><code className="prop-type">string</code></td>
                            <td><code>undefined</code></td>
                            <td>Label for the input</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">placeholder</code></td>
                            <td><code className="prop-type">string</code></td>
                            <td><code>undefined</code></td>
                            <td>Placeholder text</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">disabled</code></td>
                            <td><code className="prop-type">boolean</code></td>
                            <td><code>false</code></td>
                            <td>Whether the input is disabled</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">required</code></td>
                            <td><code className="prop-type">boolean</code></td>
                            <td><code>false</code></td>
                            <td>Whether the input is required</td>
                        </tr>
                        <tr>
                            <td><code className="prop-name">className</code></td>
                            <td><code className="prop-type">string</code></td>
                            <td><code>undefined</code></td>
                            <td>Additional CSS classes</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Advanced Usage */}
            <h2>Advanced Usage</h2>

            <h3>Form Integration</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">With React Hook Form</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`import { useForm } from 'react-hook-form';
import { GlassInput, GlassButton } from 'glass-ui';

function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <GlassInput
        label="Email"
        type="email"
        {...register("email", { 
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })}
        state={errors.email ? "error" : "default"}
        message={errors.email?.message}
        leftIcon={<MailIcon />}
      />
      
      <GlassInput
        label="Password"
        type="password"
        {...register("password", { 
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
          }
        })}
        state={errors.password ? "error" : "default"}
        message={errors.password?.message}
        leftIcon={<LockIcon />}
      />
      
      <GlassButton type="submit" className="w-full">
        Sign In
      </GlassButton>
    </form>
  );}`}</code></pre>
            </div>

            <h3>Custom Styling</h3>
            <div className="code-block">
                <div className="code-block-header">
                    <span className="code-block-title">Custom Themes</span>
                    <button className="copy-button">Copy</button>
                </div>
                <pre className="p-4 m-0"><code>{`/* Custom input styles */
.input-primary {
  --glass-primary: rgba(59, 130, 246, 0.25);
  --glass-border: rgba(59, 130, 246, 0.3);
  --glass-focus: rgba(59, 130, 246, 0.4);
}

.input-success {
  --glass-primary: rgba(34, 197, 94, 0.25);
  --glass-border: rgba(34, 197, 94, 0.3);
  --glass-focus: rgba(34, 197, 94, 0.4);
}

<GlassInput 
  className="input-primary"
  placeholder="Custom themed input"
/>`}</code></pre>
            </div>

            {/* Accessibility */}
            <h2>Accessibility</h2>
            <div className="api-section">
                <h3>Keyboard Support</h3>
                <ul>
                    <li><kbd>Tab</kbd> - Moves focus to the input</li>
                    <li><kbd>Shift + Tab</kbd> - Moves focus away from the input</li>
                    <li><kbd>Enter</kbd> - Submits the form (if in a form)</li>
                    <li><kbd>Escape</kbd> - Clears the input (if clearable)</li>
                </ul>

                <h3>ARIA Attributes</h3>
                <ul>
                    <li><code>aria-invalid</code> - Set to true when validation fails</li>
                    <li><code>aria-describedby</code> - References helper text or error message</li>
                    <li><code>aria-required</code> - Set to true when input is required</li>
                    <li><code>aria-label</code> - Provides accessible name when no visible label</li>
                </ul>

                <h3>Screen Reader Support</h3>
                <p>
                    The input component provides proper semantic markup and announces
                    validation states to assistive technologies. Error messages are
                    automatically associated with the input.
                </p>
            </div>

            {/* Related */}
            <h2>Related Components</h2>
            <div className="grid md:grid-cols-2 gap-4 not-prose mt-6">
                <a href="/components/textarea" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-blue-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Textarea</h4>
                    <p className="text-gray-400 text-sm">Multi-line text input component</p>
                </a>
                <a href="/components/select" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-purple-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Select</h4>
                    <p className="text-gray-400 text-sm">Dropdown selection component</p>
                </a>
                <a href="/components/checkbox" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-green-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Checkbox</h4>
                    <p className="text-gray-400 text-sm">Checkbox input with animations</p>
                </a>
                <a href="/components/button" className="liquid-glass rounded-lg p-4 border border-white/10 hover:border-yellow-400/30 transition-colors no-underline">
                    <h4 className="font-semibold text-white mb-2">Button</h4>
                    <p className="text-gray-400 text-sm">Interactive button component</p>
                </a>
            </div>
        </div>
    );
} 