import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassInput } from './glass-input';
import { Search as SearchIcon, Mail, Lock } from 'lucide-react';

const meta: Meta<typeof GlassInput> = {
  title: 'Glass/GlassInput',
  component: GlassInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Glass Input

A beautiful input component with glass morphism effects and comprehensive functionality.

## Features

- ✨ **Glass Morphism**: Beautiful backdrop blur and transparency effects
- 🎯 **Multiple Variants**: Default, search, password, and email types
- 🎨 **Icon Support**: Left and right icon placement
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🧹 **Clearable**: Optional clear functionality
- 🎭 **States**: Normal, disabled, error, and focused states
- 🌙 **Dark Mode**: Automatic theme adaptation

## Usage

\`\`\`tsx
import { GlassInput } from '@liquidui/react'
import { Search } from 'lucide-react'

function App() {
  return (
    <GlassInput 
      variant="search"
      placeholder="Search..."
      leftIcon={<Search className="h-4 w-4" />}
      clearable
    />
  )
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'search', 'password', 'email'],
    },
    clearable: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Search: Story = {
  args: {
    variant: 'search',
    placeholder: 'Search...',
  },
};

export const Password: Story = {
  args: {
    variant: 'password',
    placeholder: 'Enter password...',
  },
};

export const Email: Story = {
  args: {
    variant: 'email',
    placeholder: 'Enter email...',
    leftIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassInput placeholder="With left icon" leftIcon={<SearchIcon className="h-4 w-4" />} />
      <GlassInput placeholder="With right icon" rightIcon={<Lock className="h-4 w-4" />} />
      <GlassInput 
        placeholder="With both icons" 
        leftIcon={<Mail className="h-4 w-4" />} 
        rightIcon={<Lock className="h-4 w-4" />} 
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <GlassInput placeholder="Normal state" />
      <GlassInput placeholder="Disabled state" disabled />
      <GlassInput placeholder="Error state" error />
      <GlassInput placeholder="With value" defaultValue="Some text" />
      <GlassInput placeholder="Clearable" clearable defaultValue="Clear me" />
    </div>
  ),
};
