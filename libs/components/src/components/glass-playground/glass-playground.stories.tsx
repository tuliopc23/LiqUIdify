import type { Meta, StoryObj } from '@storybook/react';
import {
  Code,
  Eye,
  FileCode,
  Layers,
  Palette,
  Play,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import { GlassCard } from '../glass-card-refactored/glass-card';
import { GlassInput } from '../glass-input/glass-input';
import { GlassSelect } from '../glass-select/glass-select';
import { GlassSwitch } from '../glass-switch/glass-switch';
import { GlassTabs } from '../glass-tabs/glass-tabs';
import { GlassPlayground, PlaygroundTemplates } from './glass-playground';

const meta = {
  title: 'Components/Development/GlassPlayground',
  component: GlassPlayground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
An advanced interactive component playground with live editing capabilities, real-time preview, and comprehensive templating system.

## Features

- **Live Code Editor**: Real-time code editing with syntax highlighting
- **Instant Preview**: Live preview of component changes
- **Template System**: Pre-built templates for common component patterns
- **Interactive Controls**: Dynamic playground controls for experimentation
- **Export Functionality**: Copy code or download as files
- **Theme Support**: Light and dark theme preview modes
- **Fullscreen Mode**: Immersive development experience
- **Error Handling**: Real-time error display and debugging
- **Accessibility**: Full keyboard navigation and screen reader support

## Usage

\`\`\`tsx
import { GlassPlayground, PlaygroundTemplates } from '@/components/glass-playground';

// Basic usage with template
<GlassPlayground
  code={PlaygroundTemplates.button}
  title="Button Playground"
  description="Experiment with button variants and properties" />

// Advanced usage with custom scope
<GlassPlayground
  code={customCode}
  scope={{
    MyCustomComponent,
    customFunction,
    additionalData,
  }}
  showEditor={true}
  showPreview={true}
  editable={true}
  height={600} />

// Read-only example
<GlassPlayground
  code={exampleCode}
  title="Read-only Example"
  editable={false}
  showEditor={false} />
\`\`\`

## Templates

Built-in templates for quick experimentation:
- **Button**: Interactive button component examples
- **Card**: Card layouts and content structures
- **Form**: Complete form examples with validation
- **Custom**: Create your own templates

## Development Features

- **Hot Reload**: Changes appear instantly in preview
- **Error Boundaries**: Graceful error handling and display
- **Code Export**: Copy to clipboard or download files
- **Component Scope**: Access to all LiqUIdify components
- **TypeScript Support**: Full TypeScript intellisense and checking

## Accessibility

The playground component includes:
- Keyboard navigation between editor and preview
- Screen reader announcements for state changes
- Focus management and proper ARIA attributes
- High contrast mode support
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Content
    code: {
      control: 'text',
      description: 'Initial code content for the playground',
    },
    title: {
      control: 'text',
      description: 'Title displayed in the playground header',
    },
    description: {
      control: 'text',
      description: 'Description text shown below the title',
    },

    // Layout
    showEditor: {
      control: 'boolean',
      description: 'Whether to show the code editor',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showPreview: {
      control: 'boolean',
      description: 'Whether to show the live preview',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    height: {
      control: 'number',
      description: 'Height of the playground container in pixels',
      table: {
        defaultValue: { summary: '400' },
      },
    },

    // Behavior
    editable: {
      control: 'boolean',
      description: 'Whether the code can be edited',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    autoRun: {
      control: 'boolean',
      description: 'Whether to automatically run code changes',
      table: {
        defaultValue: { summary: 'true' },
      },
    },

    // Appearance
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Editor theme',
      table: {
        defaultValue: { summary: 'light' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },

    // Advanced
    scope: {
      control: 'object',
      description:
        'Additional components and variables available in the playground',
    },
  },
} satisfies Meta<typeof GlassPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic playground story
export const Playground: Story = {
  args: {
    code: PlaygroundTemplates.button,
    title: 'Interactive Playground',
    description: 'Edit the code below to see changes in real-time',
    showEditor: true,
    showPreview: true,
    editable: true,
    height: 400,
    theme: 'light',
    autoRun: true,
  },
};

// Template showcase
export const Templates: Story = {
  args: {},
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Button Template
        </h3>
        <GlassPlayground
          code={PlaygroundTemplates.button}
          title="Button Components"
          description="Experiment with different button variants and sizes"
          height={300}
        />
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Card Template
        </h3>
        <GlassPlayground
          code={PlaygroundTemplates.card}
          title="Glass Card"
          description="Interactive card component with glassmorphism effects"
          height={400}
        />
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Form Template
        </h3>
        <GlassPlayground
          code={PlaygroundTemplates.form}
          title="Interactive Form"
          description="Complete form example with state management"
          height={500}
        />
      </div>
    </div>
  ),
};

// Layout variations
export const LayoutVariations: Story = {
  args: {},
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Editor Only
        </h3>
        <GlassPlayground
          code={PlaygroundTemplates.button}
          title="Code Editor"
          description="View and edit code without preview"
          showPreview={false}
          height={300}
        />
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Preview Only
        </h3>
        <GlassPlayground
          code={PlaygroundTemplates.card}
          title="Live Preview"
          description="Component preview without code editor"
          showEditor={false}
          height={300}
        />
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">Read-only</h3>
        <GlassPlayground
          code={PlaygroundTemplates.button}
          title="Read-only Example"
          description="View-only playground for documentation"
          editable={false}
          height={300}
        />
      </div>
    </div>
  ),
};

// Interactive demo with custom controls
export const InteractiveDemo: Story = {
  args: {},
  render: () => {
    const [selectedTemplate, setSelectedTemplate] = useState('button');
    const [showEditor, setShowEditor] = useState(true);
    const [showPreview, setShowPreview] = useState(true);
    const [isEditable, setIsEditable] = useState(true);
    const [playgroundHeight, setPlaygroundHeight] = useState(400);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const templates = {
      button: {
        code: PlaygroundTemplates.button,
        title: 'Button Components',
        description: 'Interactive button showcase with variants',
      },
      card: {
        code: PlaygroundTemplates.card,
        title: 'Glass Card',
        description: 'Card component with glassmorphism effects',
      },
      form: {
        code: PlaygroundTemplates.form,
        title: 'Interactive Form',
        description: 'Form with validation and state management',
      },
    };

    const currentTemplate =
      templates[selectedTemplate as keyof typeof templates];

    return (
      <div className="space-y-6 p-6">
        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Playground Controls
          </h3>
          <GlassCard className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="template-select"
                  className="mb-2 block font-medium text-sm text-white/90"
                >
                  Template
                </label>
                <GlassSelect
                  id="template-select"
                  value={selectedTemplate}
                  onChange={setSelectedTemplate}
                  options={[
                    { value: 'button', label: 'Button Components' },
                    { value: 'card', label: 'Glass Card' },
                    { value: 'form', label: 'Interactive Form' },
                  ]}
                />
              </div>

              <div>
                <label
                  htmlFor="height-input"
                  className="mb-2 block font-medium text-sm text-white/90"
                >
                  Height
                </label>
                <GlassInput
                  id="height-input"
                  type="number"
                  value={playgroundHeight.toString()}
                  onChange={(e) => setPlaygroundHeight(Number(e.target.value))}
                  min={200}
                  max={800}
                />
              </div>

              <div>
                <label
                  htmlFor="theme-select"
                  className="mb-2 block font-medium text-sm text-white/90"
                >
                  Theme
                </label>
                <GlassSelect
                  id="theme-select"
                  value={theme}
                  onChange={(value) => setTheme(value as 'light' | 'dark')}
                  options={[
                    { value: 'light', label: 'Light Theme' },
                    { value: 'dark', label: 'Dark Theme' },
                  ]}
                />
              </div>

              <div className="flex items-center gap-2">
                <GlassSwitch
                  checked={showEditor}
                  onChange={setShowEditor}
                  id="show-editor"
                />
                <label htmlFor="show-editor" className="text-sm text-white/90">
                  Show Editor
                </label>
              </div>

              <div className="flex items-center gap-2">
                <GlassSwitch
                  checked={showPreview}
                  onChange={setShowPreview}
                  id="show-preview"
                />
                <label htmlFor="show-preview" className="text-sm text-white/90">
                  Show Preview
                </label>
              </div>

              <div className="flex items-center gap-2">
                <GlassSwitch
                  checked={isEditable}
                  onChange={setIsEditable}
                  id="is-editable"
                />
                <label htmlFor="is-editable" className="text-sm text-white/90">
                  Editable
                </label>
              </div>
            </div>
          </GlassCard>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-lg text-white/90">
            Live Playground
          </h3>
          <GlassPlayground
            code={currentTemplate.code}
            title={currentTemplate.title}
            description={currentTemplate.description}
            showEditor={showEditor}
            showPreview={showPreview}
            editable={isEditable}
            height={playgroundHeight}
            theme={theme}
          />
        </div>
      </div>
    );
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  args: {},
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Component Documentation
        </h3>
        <GlassPlayground
          code={`
// Component Documentation Example
function DocumentationExample() {
  const [count, setCount] = useState(0);

  return (
    <GlassCard className="max-w-md p-6">
      <h3 className="mb-4 text-lg font-semibold text-white/90">
        Interactive Counter
      </h3>

      <div className="space-y-4">
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-400">{count}</span>
        </div>

        <div className="flex gap-2">
          <GlassButton type="button"
            variant="secondary" onClick={() => setCount(count - 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => setCount(count - 1))(e); } }}
            className="flex-1"
          >
            Decrease
          </GlassButton>

          <GlassButton type="button"
            variant="primary" onClick={() => setCount(count + 1)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => setCount(count + 1))(e); } }}
            className="flex-1"
          >
            Increase
          </GlassButton>
        </div>

        <GlassButton type="button"
          variant="ghost" onClick={() => setCount(0)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => setCount(0))(e); } }}
          className="w-full"
        >
          Reset
        </GlassButton>
      </div>
    </GlassCard>
  );
}

render(<DocumentationExample />);
          `}
          title="Component Documentation"
          description="Live examples for component documentation"
          height={450}
        />
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Design System Showcase
        </h3>
        <GlassPlayground
          code={`
// Design System Color Palette
function ColorPalette() {
  const colors = [
    { name: 'Primary', class: 'bg-blue-500' },
    { name: 'Secondary', class: 'bg-gray-500' },
    { name: 'Success', class: 'bg-green-500' },
    { name: 'Warning', class: 'bg-yellow-500' },
    { name: 'Error', class: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white/90">Color System</h3>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {colors.map((color) => (
          <div key={color.name} className="text-center">
            <div className={\`\${color.class} mx-auto mb-2 h-16 w-16 rounded-lg\`} />
            <span className="text-sm text-white/70">{color.name}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-white/90">Typography Scale</h4>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white/90">Heading 1</div>
          <div className="text-2xl font-semibold text-white/80">Heading 2</div>
          <div className="text-xl font-medium text-white/70">Heading 3</div>
          <div className="text-base text-white/60">Body Text</div>
          <div className="text-sm text-white/50">Small Text</div>
        </div>
      </div>
    </div>
  );
}

render(<ColorPalette />);
          `}
          title="Design System"
          description="Showcase design tokens and typography"
          height={500}
          editable={false}
        />
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Interactive Tutorial
        </h3>
        <GlassPlayground
          code={`
// Interactive Tutorial Step
function TutorialStep() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const steps = {
    1: {
      title: "Create a Button",
      content: "Let's start by creating a simple glass button component.",
      component: <GlassButton type="button" variant="primary">My First Button</GlassButton>
    },
    2: {
      title: "Add an Icon",
      content: "Now let's add an icon to make it more interactive.",
      component: (
        <GlassButton type="button" variant="primary">
          <Settings className="mr-2 h-4 w-4" />
          Button with Icon
        </GlassButton>
      )
    },
    3: {
      title: "Make it Interactive",
      content: "Finally, let's add some interactivity with state.",
      component: (
        <GlassButton type="button"
          variant="primary" onClick={() => alert('Button clicked!')} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => alert('Button clicked!'))(e); } }}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Interactive Button
        </GlassButton>
      )
    }
  };

  const currentStep = steps[step];

  return (
    <GlassCard className="max-w-lg p-6">
      <div className="mb-4 text-center">
        <span className="text-sm text-white/60">Step {step} of {totalSteps}</span>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white/90">
        {currentStep.title}
      </h3>

      <p className="mb-6 text-white/70">
        {currentStep.content}
      </p>

      <div className="mb-6 text-center">
        {currentStep.component}
      </div>

      <div className="flex justify-between">
        <GlassButton type="button"
          variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => setStep(Math.max(1, step - 1)))(e); } }}
          disabled={step === 1}
        >
          Previous
        </GlassButton>

        <GlassButton type="button"
          variant="primary" onClick={() => setStep(Math.min(totalSteps, step + 1))} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => setStep(Math.min(totalSteps, step + 1)))(e); } }}
          disabled={step === totalSteps}
        >
          Next
        </GlassButton>
      </div>
    </GlassCard>
  );
}

render(<TutorialStep />);
          `}
          title="Interactive Tutorial"
          description="Step-by-step learning experience"
          height={550}
        />
      </div>
    </div>
  ),
};

// Advanced features showcase
export const AdvancedFeatures: Story = {
  args: {},
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Tabbed Interface
        </h3>
        <GlassTabs
          tabs={[
            {
              id: 'basic',
              label: (
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Basic Example
                </div>
              ),
              content: (
                <GlassPlayground
                  code={PlaygroundTemplates.button}
                  title="Basic Components"
                  description="Simple component examples"
                  height={350}
                />
              ),
            },
            {
              id: 'advanced',
              label: (
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Advanced
                </div>
              ),
              content: (
                <GlassPlayground
                  code={PlaygroundTemplates.form}
                  title="Advanced Form"
                  description="Complex component with state management"
                  height={350}
                />
              ),
            },
            {
              id: 'custom',
              label: (
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Custom
                </div>
              ),
              content: (
                <GlassPlayground
                  code={`
// Custom Component Example
function CustomGlassComponent() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={\`
      relative p-6 rounded-xl transition-all duration-300
      \${isActive ? 'bg-blue-500/20 border-blue-400/30' : 'bg-white/10 border-white/20'}
      border backdrop-blur-md
    \`}>
      <h3 className="mb-4 text-lg font-semibold text-white/90">
        Custom Glass Component
      </h3>

      <p className="mb-4 text-white/70">
        This is a custom component built with glassmorphism effects.
      </p>

      <GlassButton type="button"
        variant={isActive ? "primary" : "secondary"} onClick={() => setIsActive(!isActive)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => setIsActive(!isActive))(e); } }}
      >
        {isActive ? 'Deactivate' : 'Activate'}
      </GlassButton>
    </div>
  );
}

render(<CustomGlassComponent />);
                  `}
                  title="Custom Component"
                  description="Build your own glass components"
                  height={350}
                />
              ),
            },
          ]}
          className="h-auto"
        />
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Fullscreen Mode
        </h3>
        <GlassPlayground
          code={`
// Fullscreen Playground Example
function FullscreenDemo() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', completed: false },
    { id: 2, name: 'Item 2', completed: true },
    { id: 3, name: 'Item 3', completed: false },
  ]);

  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([
        ...items,
        { id: Date.now(), name: newItem, completed: false }
      ]);
      setNewItem('');
    }
  };

  const toggleItem = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="max-w-md space-y-6">
      <h3 className="text-xl font-bold text-white/90">Todo List</h3>

      <div className="flex gap-2">
        <GlassInput
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          className="flex-1" />
        <GlassButton type="button" variant="primary" onClick={addItem} }}>
          Add
        </GlassButton>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.id}
            className={\`
              flex items-center gap-3 p-3 rounded-lg transition-all
              \${item.completed ? 'bg-green-500/20 border-green-400/30' : 'bg-white/10 border-white/20'}
              border backdrop-blur-sm
            \`}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              className="h-4 w-4" />
            <span className={\`
              flex-1 \${item.completed ? 'line-through text-white/50' : 'text-white/90'}
            \`}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

render(<FullscreenDemo />);
          `}
          title="Complex Application"
          description="Use fullscreen mode for better development experience"
          height={500}
        />
      </div>
    </div>
  ),
};

// Theme showcase
export const ThemeShowcase: Story = {
  args: {},
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Light Theme
        </h3>
        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <GlassPlayground
            code={PlaygroundTemplates.button}
            title="Light Theme Playground"
            description="Playground with light theme styling"
            theme="light"
            height={300}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">Dark Theme</h3>
        <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6">
          <GlassPlayground
            code={PlaygroundTemplates.card}
            title="Dark Theme Playground"
            description="Playground with dark theme styling"
            theme="dark"
            height={300}
          />
        </div>
      </div>
    </div>
  ),
};

// Accessibility showcase
export const AccessibilityShowcase: Story = {
  args: {},
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Accessibility Features
        </h3>
        <GlassCard className="p-6">
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-400" />
              Keyboard navigation between editor and preview
            </li>
            <li className="flex items-center gap-2">
              <Code className="h-4 w-4 text-green-400" />
              Screen reader announcements for code changes
            </li>
            <li className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-green-400" />
              Focus management and ARIA attributes
            </li>
            <li className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-green-400" />
              High contrast mode support
            </li>
            <li className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-green-400" />
              Semantic HTML structure
            </li>
          </ul>
        </GlassCard>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-lg text-white/90">
          Keyboard Navigation Test
        </h3>
        <GlassPlayground
          code={`
// Keyboard Accessible Component
function AccessibleDemo() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const items = ['First', 'Second', 'Third', 'Fourth'];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white/90">
        Keyboard Navigation Demo
      </h3>
      <p className="text-sm text-white/70">
        Use arrow keys to navigate, Enter to select
      </p>

      <div
        className="space-y-2"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="listbox"
        aria-label="Demo list"
      >
        {items.map((item, index) => (
          <div
            key={item}
            className={\`
              p-3 rounded-lg transition-all cursor-pointer
              \${index === focusedIndex
                ? 'bg-blue-500/30 border-blue-400/50 ring-2 ring-blue-400/50'
                : 'bg-white/10 border-white/20 hover:bg-white/20'
              }
              border backdrop-blur-sm
            \`}
            role="option"
            aria-selected={index === focusedIndex} onClick={() => setFocusedIndex(index)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => setFocusedIndex(index))(e); } }}
          >
            {item} Item
          </div>
        ))}
      </div>
    </div>
  );
}

render(<AccessibleDemo />);
          `}
          title="Keyboard Navigation"
          description="Test keyboard accessibility features"
          height={400}
        />
      </div>
    </div>
  ),
};
