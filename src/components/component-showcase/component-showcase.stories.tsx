import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentShowcase } from './component-showcase';

const meta: Meta<typeof ComponentShowcase> = {
  title: 'Showcase/ComponentShowcase',
  component: ComponentShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive showcase of all Glass UI components with interactive examples and code snippets.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeSection: {
      control: 'select',
      options: [
        'buttons',
        'forms',
        'navigation',
        'feedback',
        'data-display',
        'layout',
        'overlay',
      ],
      description: 'The active section to display in the showcase',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
  args: {
    activeSection: 'buttons',
  },
};

export const Forms: Story = {
  args: {
    activeSection: 'forms',
  },
};

export const Navigation: Story = {
  args: {
    activeSection: 'navigation',
  },
};

export const Feedback: Story = {
  args: {
    activeSection: 'feedback',
  },
};

export const DataDisplay: Story = {
  args: {
    activeSection: 'data-display',
  },
};

export const Layout: Story = {
  args: {
    activeSection: 'layout',
  },
};

export const Overlay: Story = {
  args: {
    activeSection: 'overlay',
  },
};

export const AllComponents: Story = {
  render: () => (
    <div className="space-y-8">
      <ComponentShowcase activeSection="buttons" />
      <ComponentShowcase activeSection="forms" />
      <ComponentShowcase activeSection="navigation" />
      <ComponentShowcase activeSection="feedback" />
      <ComponentShowcase activeSection="data-display" />
      <ComponentShowcase activeSection="layout" />
      <ComponentShowcase activeSection="overlay" />
    </div>
  ),
};
