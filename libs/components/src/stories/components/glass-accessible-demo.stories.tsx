import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GlassAccessibleDemo } from '@/components/glass-accessible-demo/glass-accessible-demo';
import { GlassCard } from '@/components/glass-card-refactored/glass-card';

const meta = {
  title: 'Components/Glass Accessible Demo',
  component: GlassAccessibleDemo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive accessibility demonstration component showcasing WCAG compliance, ARIA validation, contrast checking, and real-time accessibility monitoring.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof GlassAccessibleDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Accessibility Manager Demo</h1>
        <p className="text-[var(--text-secondary)]">
          This component demonstrates various accessibility features and tools
          available in the LiqUIdify component library.
        </p>
      </div>
      <GlassAccessibleDemo />
    </div>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    className: 'shadow-xl',
  },
  render: (args) => (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <GlassAccessibleDemo {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility demo with custom styling and gradient background',
      },
    },
  },
};

export const FeatureShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <GlassCard className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Accessibility Features Overview
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 text-lg">Component Validation</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• Real-time WCAG compliance checking</li>
              <li>• Accessibility score calculation</li>
              <li>• Detailed violation reporting</li>
              <li>• Warning identification</li>
              <li>• Best practice recommendations</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-lg">Contrast Checking</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• Real-time contrast ratio calculation</li>
              <li>• WCAG AA/AAA compliance checking</li>
              <li>• Auto-fix suggestions for failing colors</li>
              <li>• Support for normal and large text</li>
              <li>• Visual preview of color combinations</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-lg">ARIA Validation</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• Automatic ARIA attribute validation</li>
              <li>• Invalid attribute detection</li>
              <li>• Auto-correction of common mistakes</li>
              <li>• Live examples of good vs bad ARIA</li>
              <li>• Screen reader compatibility testing</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-lg">Real-time Monitoring</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>• Live accessibility issue detection</li>
              <li>• DOM mutation observation</li>
              <li>• Focus management tracking</li>
              <li>• Keyboard navigation monitoring</li>
              <li>• Screen reader announcements</li>
            </ul>
          </div>
        </div>
      </GlassCard>

      <GlassAccessibleDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Complete showcase of all accessibility features with detailed explanations',
      },
    },
  },
};

export const InteractiveGuide: Story = {
  render: () => {
    const [activeFeature, setActiveFeature] =
      React.useState<string>('validation');

    return (
      <div className="max-w-5xl mx-auto p-8">
        <GlassCard className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Interactive Accessibility Guide
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Click on the tabs below to learn about different accessibility
            features:
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'validation', label: 'Validation' },
              { id: 'contrast', label: 'Contrast' },
              { id: 'aria', label: 'ARIA' },
              { id: 'monitoring', label: 'Monitoring' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFeature(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeFeature === tab.id
                    ? 'bg-blue-500/20 text-blue-500 font-medium'
                    : 'hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="glass-effect rounded-lg p-4">
            {activeFeature === 'validation' && (
              <div>
                <h3 className="font-semibold mb-2">Component Validation</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  The validation feature scans your components for accessibility
                  issues in real-time. It checks for missing ARIA labels,
                  incorrect heading hierarchy, color contrast issues, keyboard
                  navigation problems, and more. The tool provides a
                  comprehensive score and detailed reports to help you fix any
                  issues.
                </p>
              </div>
            )}

            {activeFeature === 'contrast' && (
              <div>
                <h3 className="font-semibold mb-2">Color Contrast Checker</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  The contrast checker ensures your color combinations meet WCAG
                  standards. It calculates the contrast ratio between foreground
                  and background colors, showing whether they pass AA or AAA
                  standards for both normal and large text. If colors fail, it
                  suggests adjusted colors that maintain your design intent
                  while meeting accessibility requirements.
                </p>
              </div>
            )}

            {activeFeature === 'aria' && (
              <div>
                <h3 className="font-semibold mb-2">ARIA Validation</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  ARIA (Accessible Rich Internet Applications) attributes help
                  screen readers understand your content. This feature validates
                  ARIA usage, detecting common mistakes like invalid attribute
                  values or conflicting roles. It can even auto-correct some
                  issues, ensuring your components work well with assistive
                  technologies.
                </p>
              </div>
            )}

            {activeFeature === 'monitoring' && (
              <div>
                <h3 className="font-semibold mb-2">Real-time Monitoring</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Real-time monitoring continuously watches your application for
                  accessibility issues as users interact with it. It detects
                  dynamic content changes, focus management problems, and
                  keyboard navigation issues. This helps catch problems that
                  only appear during user interaction, not just static analysis.
                </p>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassAccessibleDemo />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive guide explaining each accessibility feature in detail',
      },
    },
  },
};

export const DarkModeDemo: Story = {
  render: () => (
    <div className="dark min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Dark Mode Accessibility</h1>
          <p className="text-gray-300">
            Testing accessibility features in dark mode to ensure proper
            contrast and visibility.
          </p>
        </div>
        <GlassAccessibleDemo />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Accessibility demo in dark mode showing proper contrast maintenance',
      },
    },
  },
};

export const CompactView: Story = {
  render: () => (
    <div className="max-w-sm mx-auto p-4">
      <GlassCard className="p-4">
        <h2 className="text-lg font-bold mb-3">Compact Accessibility Tools</h2>
        <p className="text-xs text-[var(--text-secondary)] mb-4">
          All features work perfectly even in limited space.
        </p>
      </GlassCard>
      <div className="mt-4">
        <GlassAccessibleDemo className="text-sm" />
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Responsive design demonstration on mobile devices',
      },
    },
  },
};
