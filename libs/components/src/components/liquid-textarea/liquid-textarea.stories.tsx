import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LiquidTextarea } from "./liquid-textarea";

const meta = {
  title: "Forms/LiquidTextarea",
  component: LiquidTextarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A liquid glass textarea component with auto-resize, character counting, and comprehensive form states.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "filled", "ghost", "error"],
      description: "The visual style variant of the textarea"
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the textarea"
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "The resize behavior"
    },
    autoResize: {
      control: "boolean",
      description: "Enable automatic height adjustment"
    },
    showCharCount: {
      control: "boolean",
      description: "Show character count"
    },
    disabled: {
      control: "boolean",
      description: "Disable the textarea"
    }
  },
  args: {
    placeholder: "Enter text...",
    variant: "default",
    size: "md",
    resize: "vertical",
    autoResize: false,
    showCharCount: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof LiquidTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <LiquidTextarea 
      {...args}
      label="Description"
      rows={4}
    />
  ),
};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Textarea Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LiquidTextarea 
            variant="default" 
            label="Default Textarea"
            placeholder="Enter your message..."
            rows={4}
          />
          <LiquidTextarea 
            variant="filled" 
            label="Filled Textarea"
            placeholder="Enter your message..."
            rows={4}
          />
          <LiquidTextarea 
            variant="ghost" 
            label="Ghost Textarea"
            placeholder="Enter your message..."
            rows={4}
          />
          <LiquidTextarea 
            variant="error" 
            label="Error Textarea"
            placeholder="Enter your message..."
            rows={4}
            errorMessage="This field contains errors"
          />
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Textarea Sizes</h2>
        <div className="space-y-6">
          <LiquidTextarea 
            size="sm" 
            label="Small Textarea"
            placeholder="Small size..."
            rows={3}
          />
          <LiquidTextarea 
            size="md" 
            label="Medium Textarea"
            placeholder="Medium size..."
            rows={4}
          />
          <LiquidTextarea 
            size="lg" 
            label="Large Textarea"
            placeholder="Large size..."
            rows={5}
          />
        </div>
      </div>
    </div>
  ),
};

export const ResizeBehavior: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Resize Behavior</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LiquidTextarea 
            label="No Resize"
            placeholder="Cannot be resized..."
            resize="none"
            rows={4}
            helperText="Resize is disabled"
          />
          <LiquidTextarea 
            label="Vertical Resize"
            placeholder="Can be resized vertically..."
            resize="vertical"
            rows={4}
            helperText="Drag the bottom corner"
          />
          <LiquidTextarea 
            label="Horizontal Resize"
            placeholder="Can be resized horizontally..."
            resize="horizontal"
            rows={4}
            helperText="Drag the right corner"
          />
          <LiquidTextarea 
            label="Both Directions"
            placeholder="Can be resized in both directions..."
            resize="both"
            rows={4}
            helperText="Drag any corner"
          />
        </div>
      </div>
    </div>
  ),
};

export const AutoResize: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Auto Resize</h2>
          <div className="space-y-6">
            <LiquidTextarea 
              label="Auto Resize Textarea"
              placeholder="Start typing and watch me grow..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoResize
              minHeight={80}
              maxHeight={200}
              helperText="This textarea automatically adjusts its height"
            />
            
            <LiquidTextarea 
              label="Fixed Height (No Auto Resize)"
              placeholder="I stay the same height..."
              rows={4}
              helperText="This textarea has a fixed height"
            />
          </div>
        </div>
      </div>
    );
  },
};

export const CharacterCount: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [message, setMessage] = useState("");
    const [bio, setBio] = useState("This is my bio...");

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Character Count</h2>
          <div className="space-y-6">
            <LiquidTextarea 
              label="Message (with limit)"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={280}
              showCharCount
              helperText="Twitter-style character limit"
              rows={4}
            />
            
            <LiquidTextarea 
              label="Bio (no limit)"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              showCharCount
              helperText="Character count without limit"
              rows={6}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const Interactive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [autoResizeValue, setAutoResizeValue] = useState("Try typing multiple lines here...\nThe textarea will grow automatically!\n\nKeep typing to see it expand...");

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Interactive Features</h2>
          <div className="space-y-6">
            <LiquidTextarea 
              label="Auto Resize + Character Count"
              placeholder="Start typing..."
              value={autoResizeValue}
              onChange={(e) => setAutoResizeValue(e.target.value)}
              autoResize
              maxLength={500}
              showCharCount
              minHeight={60}
              maxHeight={200}
              helperText="Auto-resize with character limit"
            />
            
            <LiquidTextarea 
              label="Disabled State"
              placeholder="I'm disabled..."
              disabled
              value="This textarea is disabled and cannot be edited."
              rows={3}
            />
            
            <LiquidTextarea 
              label="Error State"
              placeholder="Enter valid content..."
              errorMessage="Content is required and must be at least 10 characters"
              variant="error"
              rows={4}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      notes: "",
      feedback: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.title) newErrors.title = "Title is required";
      if (!formData.description) newErrors.description = "Description is required";
      if (formData.description.length < 50) {
        newErrors.description = "Description must be at least 50 characters";
      }

      setErrors(newErrors);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Submit Feedback</h2>
            <p className="text-white/70">Help us improve our liquid glass components</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief title for your feedback..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 backdrop-blur-xl focus:bg-white/15 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              {errors.title && (
                <div className="mt-2 text-xs text-red-300">{errors.title}</div>
              )}
            </div>
            
            <LiquidTextarea 
              label="Description"
              placeholder="Describe your feedback in detail..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              autoResize
              minHeight={100}
              maxHeight={200}
              showCharCount
              maxLength={1000}
              errorMessage={errors.description}
              helperText="Please provide at least 50 characters"
            />
            
            <LiquidTextarea 
              label="Additional Notes (Optional)"
              placeholder="Any additional information..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              variant="ghost"
              rows={3}
              showCharCount
            />
            
            <LiquidTextarea 
              label="Overall Experience"
              placeholder="How was your overall experience?"
              value={formData.feedback}
              onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
              variant="filled"
              rows={4}
              maxLength={500}
              showCharCount
            />
            
            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl backdrop-blur-xl border border-white/30 transition-all duration-200"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    );
  },
};