import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassTextarea } from './glass-textarea';

const meta: Meta<typeof GlassTextarea> = {
  title: 'Glass/GlassTextarea',
  component: GlassTextarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal'],
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    placeholder: 'Minimal textarea',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'This is some sample text in the textarea.',
    placeholder: 'Enter your message...',
  },
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">No Resize</label>
        <GlassTextarea resize="none" placeholder="Cannot be resized" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Vertical Resize
        </label>
        <GlassTextarea
          resize="vertical"
          placeholder="Can be resized vertically"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Horizontal Resize
        </label>
        <GlassTextarea
          resize="horizontal"
          placeholder="Can be resized horizontally"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Both Directions
        </label>
        <GlassTextarea
          resize="both"
          placeholder="Can be resized in both directions"
        />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">Normal</label>
        <GlassTextarea placeholder="Normal textarea" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Disabled</label>
        <GlassTextarea disabled placeholder="Disabled textarea" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">With Value</label>
        <GlassTextarea defaultValue="This textarea has some initial content that demonstrates how text appears in the component." />
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <GlassTextarea
          id="message"
          placeholder="Write your message here..."
          rows={4}
        />
      </div>
      <div>
        <label htmlFor="feedback" className="block text-sm font-medium mb-2">
          Feedback (Minimal)
        </label>
        <GlassTextarea
          id="feedback"
          variant="minimal"
          placeholder="Your feedback..."
          rows={3}
        />
      </div>
    </div>
  ),
};
