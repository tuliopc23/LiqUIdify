import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { GlassTextarea } from "./glass-textarea";
import { MessageSquare, FileText, Code, Mail } from "lucide-react";

const meta = {
  title: "Glass UI/GlassTextarea",
  component: GlassTextarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## GlassTextarea Component

A sophisticated textarea component with glassmorphic styling, customizable resize behavior, and comprehensive form support. Perfect for multi-line text input with elegant visual design.

### Key Features
- **Glassmorphic Design**: Translucent appearance with backdrop blur
- **Resize Control**: Configurable resize behavior (none, vertical, horizontal, both)
- **Smooth Transitions**: Elegant hover and focus states
- **Two Variants**: Default glassmorphic and minimal styles
- **Full Accessibility**: Keyboard navigation and screen reader support
- **Form Integration**: Works seamlessly with form libraries

### Usage

\`\`\`tsx
import { GlassTextarea } from '@/components/glass-textarea';

function MyComponent() {
  const [text, setText] = useState('');
  
  return (
    <GlassTextarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter your message..."
      resize="vertical"
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    value: {
      control: "text",
      description: "Textarea value",
    },
    onChange: {
      action: "changed",
      description: "Change event handler",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    variant: {
      control: "select",
      options: ["default", "minimal"],
      description: "Visual variant",
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Resize behavior",
    },
    rows: {
      control: "number",
      description: "Number of visible text rows",
    },
    cols: {
      control: "number",
      description: "Number of visible text columns",
    },
    maxLength: {
      control: "number",
      description: "Maximum character length",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof GlassTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Story
export const Default: Story = {
  args: {
    placeholder: "Enter your text here...",
    rows: 4,
  },
};

// Controlled Example
export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    
    return (
      <div className="w-96 space-y-4">
        <GlassTextarea
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Character count: {value.length}
        </div>
      </div>
    );
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    return (
      <div className="space-y-6 w-96">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default Variant
          </h3>
          <GlassTextarea
            placeholder="Default glassmorphic style..."
            variant="default"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimal Variant
          </h3>
          <GlassTextarea
            placeholder="Minimal style with bottom border..."
            variant="minimal"
          />
        </div>
      </div>
    );
  },
};

// Resize Options
export const ResizeOptions: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resize: None
          </h3>
          <GlassTextarea
            placeholder="Cannot be resized"
            resize="none"
            rows={3}
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resize: Vertical
          </h3>
          <GlassTextarea
            placeholder="Resize vertically only"
            resize="vertical"
            rows={3}
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resize: Horizontal
          </h3>
          <GlassTextarea
            placeholder="Resize horizontally only"
            resize="horizontal"
            rows={3}
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resize: Both
          </h3>
          <GlassTextarea
            placeholder="Resize in both directions"
            resize="both"
            rows={3}
          />
        </div>
      </div>
    );
  },
};

// Different Sizes
export const DifferentSizes: Story = {
  render: () => {
    return (
      <div className="space-y-6 w-96">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Small (2 rows)
          </h3>
          <GlassTextarea
            placeholder="Small textarea..."
            rows={2}
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Medium (5 rows)
          </h3>
          <GlassTextarea
            placeholder="Medium textarea..."
            rows={5}
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Large (8 rows)
          </h3>
          <GlassTextarea
            placeholder="Large textarea..."
            rows={8}
          />
        </div>
      </div>
    );
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
    value: "You cannot edit this text",
  },
};

// With Character Limit
export const WithCharacterLimit: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const maxLength = 200;
    
    return (
      <div className="w-96 space-y-2">
        <GlassTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your bio (max 200 characters)..."
          maxLength={maxLength}
          rows={4}
        />
        <div className="text-right text-sm">
          <span className={value.length > maxLength * 0.9 ? "text-orange-500" : "text-gray-500"}>
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
    );
  },
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [comment, setComment] = useState("");
    const [feedback, setFeedback] = useState("");
    const [notes, setNotes] = useState("");
    
    return (
      <div className="w-[500px] space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Interactive Textarea Demo
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MessageSquare className="inline w-4 h-4 mr-1" />
              Comment
            </label>
            <GlassTextarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="inline w-4 h-4 mr-1" />
              Feedback
            </label>
            <GlassTextarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="How can we improve?"
              rows={4}
              variant="minimal"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Code className="inline w-4 h-4 mr-1" />
              Code Snippet
            </label>
            <GlassTextarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Paste your code here..."
              rows={5}
              className="font-mono text-sm"
            />
          </div>
        </div>
        
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
            Current Input:
          </h4>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>Comment: {comment.length} chars</p>
            <p>Feedback: {feedback.length} chars</p>
            <p>Code: {notes.length} chars</p>
          </div>
        </div>
      </div>
    );
  },
};

// Form Integration
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      message: "",
      description: "",
      notes: "",
    });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };
    
    const updateField = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };
    
    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Contact Form
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message *
            </label>
            <GlassTextarea
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
              placeholder="Your message..."
              rows={4}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Description
            </label>
            <GlassTextarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Tell us about your project..."
              rows={5}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Notes
            </label>
            <GlassTextarea
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Any other information..."
              rows={3}
              variant="minimal"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          disabled={!formData.message}
        >
          Send Message
        </button>
      </form>
    );
  },
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => {
    const [reviewText, setReviewText] = useState("");
    const [codeSnippet, setCodeSnippet] = useState(`function calculateSum(a, b) {
  return a + b;
}`);
    
    return (
      <div className="space-y-8">
        <div className="w-96">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Product Review
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="text-2xl">
                  ⭐
                </button>
              ))}
            </div>
            <GlassTextarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
            />
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Submit Review
            </button>
          </div>
        </div>
        
        <div className="w-96">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Code Editor
          </h3>
          <div className="space-y-4">
            <GlassTextarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="font-mono text-sm bg-gray-900 text-green-400"
              rows={8}
              resize="both"
            />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Run Code
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => {
    const [value, setValue] = useState("");
    
    return (
      <div className="w-96 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Accessibility Features
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="accessible-textarea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accessible Textarea
              </label>
              <GlassTextarea
                id="accessible-textarea"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Fully accessible textarea..."
                aria-describedby="textarea-help"
                rows={4}
              />
              <p id="textarea-help" className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                This textarea includes proper labels and ARIA attributes.
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
              Keyboard Support:
            </h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• <kbd>Tab</kbd> - Focus textarea</li>
              <li>• <kbd>Shift + Tab</kbd> - Move focus backwards</li>
              <li>• <kbd>Esc</kbd> - Clear focus (browser dependent)</li>
              <li>• Standard text editing shortcuts work</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-blue-900 dark:text-blue-100">
              Screen Reader Support
            </h4>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>• Announces label and placeholder</li>
              <li>• Communicates character count (when implemented)</li>
              <li>• Indicates disabled state</li>
              <li>• Provides context via aria-describedby</li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
};

// Email Composer Example
export const EmailComposer: Story = {
  render: () => {
    const [email, setEmail] = useState({
      to: "john@example.com",
      subject: "Project Update",
      body: "",
    });
    
    return (
      <div className="w-[500px] space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Compose Email
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                To
              </label>
              <input
                type="email"
                value={email.to}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={email.subject}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg"
                readOnly
              />
            </div>
          </div>
          
          <GlassTextarea
            value={email.body}
            onChange={(e) => setEmail({ ...email, body: e.target.value })}
            placeholder="Write your email message..."
            rows={8}
          />
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                📎 Attach
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900">
                😊 Emoji
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};