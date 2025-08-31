import type React from "react";
import { SnippetPreview } from "./SnippetPreview";
import { Tabs } from "./Tabs";

// Import Mintlify components for enhanced styling
interface SnippetsProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

// Enhanced Snippets component with Apple design
export function Snippets({ title, description, children }: SnippetsProps) {
  return (
    <div className="not-prose w-full">
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="space-y-6">{children}</div>
    </div>
  );
}

// Button Snippet with enhanced Apple-style design
export function ButtonSnippet() {
  const basicCode = `import { GlassButton } from '@liquidify/react';

export function Example() {
  return (
    <GlassButton 
      variant="primary"
      onClick={() => console.log('Button clicked!')}
    >
      Get Started
    </GlassButton>
  );
}`;

  const variantsCode = `import { GlassButton } from '@liquidify/react';

export function ButtonVariants() {
  return (
    <div className="flex gap-3 flex-wrap">
      <GlassButton variant="primary">Primary</GlassButton>
      <GlassButton variant="secondary">Secondary</GlassButton>
      <GlassButton variant="ghost">Ghost</GlassButton>
      <GlassButton variant="danger">Danger</GlassButton>
    </div>
  );
}`;

  const sizesCode = `import { GlassButton } from '@liquidify/react';

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-3">
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton size="md">Medium</GlassButton>
      <GlassButton size="lg">Large</GlassButton>
    </div>
  );
}`;

  return (
    <Tabs defaultValue="basic">
      <Tabs.List>
        <Tabs.Trigger value="basic" icon="⚡">
          Basic Usage
        </Tabs.Trigger>
        <Tabs.Trigger value="variants" icon="🎨">
          Variants
        </Tabs.Trigger>
        <Tabs.Trigger value="sizes" icon="📏">
          Sizes
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="basic">
        <SnippetPreview
          title="Basic Button"
          description="A simple glass button with primary styling and click handler"
          code={basicCode}
        >
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Get Started
          </button>
        </SnippetPreview>
      </Tabs.Content>

      <Tabs.Content value="variants">
        <SnippetPreview
          title="Button Variants"
          description="Different visual styles for various use cases"
          code={variantsCode}
        >
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Primary
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              Secondary
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium">
              Ghost
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">
              Danger
            </button>
          </div>
        </SnippetPreview>
      </Tabs.Content>

      <Tabs.Content value="sizes">
        <SnippetPreview
          title="Button Sizes"
          description="Different sizes for various interface contexts"
          code={sizesCode}
        >
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium">
              Small
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Medium
            </button>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium text-lg">
              Large
            </button>
          </div>
        </SnippetPreview>
      </Tabs.Content>
    </Tabs>
  );
}

// Card Snippet
export function CardSnippet() {
  const code = `import { GlassCard } from '@liquidify/react';

export function Example() {
  return (
    <GlassCard variant="elevated" className="p-6 max-w-sm">
      <div className="space-y-4">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
          <span className="text-blue-600 text-xl">🚀</span>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Getting Started
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Build beautiful interfaces with liquid glass components
          </p>
        </div>
        
        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
          Learn More
        </button>
      </div>
    </GlassCard>
  );
}`;

  return (
    <SnippetPreview
      title="Glass Card"
      description="Elevated card with liquid glass effect and content structure"
      code={code}
      variant="elevated"
    >
      <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-xl p-6 max-w-sm border border-gray-200/30 dark:border-gray-700/30 shadow-lg">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <span className="text-blue-600 text-xl">🚀</span>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Getting Started</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Build beautiful interfaces with liquid glass components
            </p>
          </div>

          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
    </SnippetPreview>
  );
}

// Input Snippet
export function InputSnippet() {
  const code = `import { GlassInput, GlassFormField } from '@liquidify/react';

export function Example() {
  const [email, setEmail] = useState('');
  
  return (
    <GlassFormField 
      label="Email Address" 
      description="We'll never share your email"
    >
      <GlassInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
    </GlassFormField>
  );
}`;

  return (
    <SnippetPreview
      title="Glass Input"
      description="Form input with label, validation, and glass styling"
      code={code}
    >
      <div className="w-full max-w-sm space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">We'll never share your email</p>
      </div>
    </SnippetPreview>
  );
}

// Toast Snippet
export function ToastSnippet() {
  const code = `import { GlassToast, useToast } from '@liquidify/react';

export function Example() {
  const { addToast } = useToast();
  
  const showToast = () => {
    addToast({
      title: 'Success!',
      description: 'Your changes have been saved.',
      variant: 'success'
    });
  };
  
  return (
    <button onClick={showToast}>
      Show Success Toast
    </button>
  );
}`;

  return (
    <SnippetPreview
      title="Toast Notification"
      description="Elegant notification system with glass morphism"
      code={code}
    >
      <div className="flex flex-col gap-3">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
          Show Success Toast
        </button>

        <div className="bg-white/90 dark:bg-black/60 backdrop-blur-xl rounded-lg p-4 border border-green-200/50 dark:border-green-700/50 shadow-lg max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-green-600 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">Success!</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your changes have been saved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SnippetPreview>
  );
}

export default Snippets;
