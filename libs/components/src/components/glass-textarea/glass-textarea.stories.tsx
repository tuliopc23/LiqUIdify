import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { GlassTextarea } from "./glass-textarea";

const meta: Meta<typeof GlassTextarea> = {
  title: "Components/Forms/GlassTextarea",
  component: GlassTextarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A textarea component with auto-resize functionality, character counting, and glassmorphism styling.

## Features
- Auto-resize based on content
- Character counting and limits
- Validation states
- Accessibility compliant
- Glassmorphism design

## Usage

\`\`\`tsx
import { GlassTextarea } from '@/components/glass-textarea';

// Basic usage
<GlassTextarea
  label="Message"
  placeholder="Enter your message..."
  value={message}
  onChange={setMessage}
/>

// With character limit
<GlassTextarea
  label="Bio"
  maxLength={500}
  showCharacterCount
  value={bio}
  onChange={setBio}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    autoResize: {
      control: { type: "boolean" },
    },
    showCharacterCount: {
      control: { type: "boolean" },
    },
    maxLength: {
      control: { type: "number" },
    },
    minRows: {
      control: { type: "number" },
    },
    maxRows: {
      control: { type: "number" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message...",
    defaultValue: "This is a sample message in the textarea.",
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    maxLength: 200,
    showCharacterCount: true,
    defaultValue:
      "I'm a developer who loves creating beautiful user interfaces.",
  },
};

export const WithError: Story = {
  args: {
    label: "Feedback",
    placeholder: "Your feedback...",
    error: true,
    helperText: "Please provide more detailed feedback",
    defaultValue: "Bad",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Textarea",
    placeholder: "Small size...",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Textarea",
    placeholder: "Large size...",
  },
};

export const NoAutoResize: Story = {
  args: {
    label: "Fixed Height",
    placeholder: "This textarea doesn't auto-resize...",
    autoResize: false,
    minRows: 5,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Textarea",
    defaultValue: "This textarea is disabled",
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    label: "Required Field",
    placeholder: "This field is required...",
    required: true,
    helperText: "Please fill out this field",
  },
};

// Interactive Examples
export const CharacterLimitExample: Story = {
  render: () => {
    const [text, setText] = useState(
      "Start typing to see the character count...",
    );
    const maxLength = 100;

    return (
      <div className="w-96">
        <GlassTextarea
          label="Tweet"
          value={text}
          onChange={setText}
          maxLength={maxLength}
          showCharacterCount
          characterCountPosition="bottom-right"
          placeholder="What's happening?"
          helperText={`${maxLength - text.length} characters remaining`}
        />
      </div>
    );
  },
};

export const AutoResizeDemo: Story = {
  render: () => {
    const [text, setText] = useState(
      "Type more content to see the textarea grow automatically...\n\nAdd multiple lines to see the auto-resize in action.",
    );

    return (
      <div className="w-96">
        <GlassTextarea
          label="Auto-Resize Demo"
          value={text}
          onChange={setText}
          autoResize
          minRows={3}
          maxRows={8}
          placeholder="Start typing..."
          helperText="This textarea will grow as you type"
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [feedback, setFeedback] = useState("");

    return (
      <div className="w-96 space-y-4">
        <h3 className="text-lg font-semibold text-white">Contact Form</h3>

        <div>
          <input
            type="text"
            placeholder="Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60"
          />
        </div>

        <GlassTextarea
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Describe your issue..."
          minRows={3}
          maxRows={6}
          required
        />

        <GlassTextarea
          label="Additional Feedback"
          value={feedback}
          onChange={setFeedback}
          placeholder="Any additional comments..."
          maxLength={500}
          showCharacterCount
          characterCountPosition="bottom-left"
        />

        <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Submit
        </button>
      </div>
    );
  },
};
