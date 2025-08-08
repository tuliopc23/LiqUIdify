import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { GlassCard } from "@/components/glass-card-refactored/glass-card";
import { GlassButton } from "@/components/glass-button-refactored/glass-button";
import { GlassInput } from "@/components/glass-input/glass-input";
import { GlassBadge } from "@/components/glass-badge/glass-badge";
import { GlassCheckbox } from "@/components/glass-checkbox/glass-checkbox";
import { GlassSelect } from "@/components/glass-select/glass-select";
import {
  BookOpen,
  Code2,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  XCircle,
  Copy,
  ArrowRight,
} from "lucide-react";

const meta = {
  title: "Design System/Component Guidelines",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "gradient",
      values: [
        {
          name: "gradient",
          value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
      ],
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const CodeBlock = ({
  children,
  title,
}: {
  children: string;
  title?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {title && (
        <div className="text-sm font-semibold mb-2 opacity-75">{title}</div>
      )}
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 font-mono text-sm relative">
        <pre className="text-white/90 overflow-x-auto">{children}</pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded hover:bg-white/10 transition-colors"
        >
          {copied ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 text-white/60" />
          )}
        </button>
      </div>
    </div>
  );
};

const GuidelineSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
      <BookOpen className="w-5 h-5" />
      {title}
    </h3>
    {children}
  </div>
);

export const UsageGuidelines: Story = {
  render: () => (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <GlassCard className="p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Code2 className="w-8 h-8" />
          Component Usage Guidelines
        </h1>

        <GuidelineSection title="Import Patterns">
          <div className="space-y-4">
            <p className="text-sm opacity-75 mb-4">
              Import components directly from the main package for tree-shaking
              benefits:
            </p>

            <CodeBlock title="✅ Recommended">
              {`import { GlassButton, GlassCard } from '@liquidify/components';`}
            </CodeBlock>

            <CodeBlock title="✅ Also Good (specific imports)">
              {`import { GlassButton } from '@liquidify/components/button';
import { GlassCard } from '@liquidify/components/card';`}
            </CodeBlock>

            <CodeBlock title="❌ Avoid (imports everything)">
              {`import * as Liquid from '@liquidify/components';`}
            </CodeBlock>
          </div>
        </GuidelineSection>

        <GuidelineSection title="Component Composition">
          <div className="space-y-4">
            <p className="text-sm opacity-75 mb-4">
              Build complex interfaces by composing simple components:
            </p>

            <CodeBlock>
              {`// Compose components for complex UI
<GlassCard>
  <GlassCard.Header>
    <h2>Settings</h2>
    <GlassBadge>Pro</GlassBadge>
  </GlassCard.Header>
  
  <GlassCard.Body>
    <GlassInput 
      label="Username"
      placeholder="Enter username"
    />
    <GlassCheckbox label="Enable notifications" />
  </GlassCard.Body>
  
  <GlassCard.Footer>
    <GlassButton variant="primary">Save</GlassButton>
    <GlassButton variant="ghost">Cancel</GlassButton>
  </GlassCard.Footer>
</GlassCard>`}
            </CodeBlock>
          </div>
        </GuidelineSection>

        <GuidelineSection title="Styling & Customization">
          <div className="space-y-4">
            <p className="text-sm opacity-75 mb-4">
              Components support multiple styling approaches:
            </p>

            <CodeBlock title="Using className (Tailwind)">
              {`<GlassButton 
  className="mt-4 px-8"
  variant="primary"
>
  Custom Styled Button
</GlassButton>`}
            </CodeBlock>

            <CodeBlock title="Using style prop">
              {`<GlassCard 
  style={{ 
    '--glass-blur': '20px',
    '--glass-opacity': '0.3' 
  }}
>
  Custom glass effect
</GlassCard>`}
            </CodeBlock>

            <CodeBlock title="Using CSS variables globally">
              {`:root {
  --glass-primary: rgba(59, 130, 246, 0.5);
  --glass-blur-amount: 12px;
  --glass-border-width: 1px;
}`}
            </CodeBlock>
          </div>
        </GuidelineSection>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Lightbulb className="w-6 h-6" />
          Best Practices
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              Do's
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Use semantic HTML elements through component props
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Provide accessible labels and ARIA attributes
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Use consistent spacing with design tokens
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Handle loading and error states properly
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Test keyboard navigation thoroughly
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-red-400">
              <XCircle className="w-5 h-5" />
              Don'ts
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Don't nest glass effects too deeply (max 2-3 levels)
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Avoid using opacity below 0.1 for glass backgrounds
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Don't override component structure with !important
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Avoid mixing different component libraries
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Don't ignore console warnings about accessibility
              </li>
            </ul>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <AlertCircle className="w-6 h-6" />
          Common Patterns
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Form Handling</h3>
            <CodeBlock>
              {`const [formData, setFormData] = useState({
  email: '',
  password: ''
});

<form onSubmit={handleSubmit}>
  <GlassInput
    type="email"
    label="Email"
    value={formData.email}
    onChange={(e) => setFormData({
      ...formData,
      email: e.target.value
    })}
    required
  />
  
  <GlassButton type="submit" variant="primary">
    Sign In
  </GlassButton>
</form>`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Conditional Rendering</h3>
            <CodeBlock>
              {`{isLoading ? (
  <GlassCard className="animate-pulse">
    <div className="h-32 bg-white/10 rounded" />
  </GlassCard>
) : (
  <GlassCard>
    <GlassCard.Body>{content}</GlassCard.Body>
  </GlassCard>
)}`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Event Handling</h3>
            <CodeBlock>
              {`<GlassButton
  onClick={async () => {
    setLoading(true);
    try {
      await saveData();
      showToast('Success!');
    } catch (error) {
      showToast('Error occurred', 'error');
    } finally {
      setLoading(false);
    }
  }}
  disabled={loading}
>
  {loading ? 'Saving...' : 'Save Changes'}
</GlassButton>`}
            </CodeBlock>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-2xl font-bold mb-6">Performance Tips</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Lightbulb className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Lazy Load Heavy Components</h3>
              <p className="text-sm opacity-75">
                Use React.lazy() for components that aren't immediately visible
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Lightbulb className="w-5 h-5 text-green-300" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">
                Memoize Expensive Operations
              </h3>
              <p className="text-sm opacity-75">
                Use useMemo() for complex calculations and React.memo for pure
                components
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Lightbulb className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Optimize Glass Effects</h3>
              <p className="text-sm opacity-75">
                Reduce blur radius on mobile devices for better performance
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Lightbulb className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Use Virtual Scrolling</h3>
              <p className="text-sm opacity-75">
                For lists with many glass components, implement virtual
                scrolling
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  ),
};
