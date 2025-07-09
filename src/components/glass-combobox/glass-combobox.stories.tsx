import type { Meta, StoryObj } from '@storybook/react';
import { GlassCombobox } from './glass-combobox';

const meta: Meta<typeof GlassCombobox> = {
  title: 'Components/Form/GlassCombobox',
  component: GlassCombobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sophisticated combobox component with search, keyboard navigation, and liquid glass styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Current selected value',
      control: 'text',
    },
    placeholder: {
      description: 'Placeholder text when no value is selected',
      control: 'text',
    },
    searchPlaceholder: {
      description: 'Placeholder text for search input',
      control: 'text',
    },
    disabled: {
      description: 'Whether the combobox is disabled',
      control: 'boolean',
    },
    clearable: {
      description: 'Whether the combobox can be cleared',
      control: 'boolean',
    },
    loading: {
      description: 'Whether the combobox is in loading state',
      control: 'boolean',
    },
    error: {
      description: 'Whether the combobox has an error state',
      control: 'boolean',
    },
    success: {
      description: 'Whether the combobox has a success state',
      control: 'boolean',
    },
    size: {
      description: 'Size variant of the combobox',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: 'Visual variant of the combobox',
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Choose a fruit...',
    searchPlaceholder: 'Search fruits...',
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 'apple',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    success: true,
  },
};

export const NotClearable: Story = {
  args: {
    ...Default.args,
    clearable: false,
    value: 'apple',
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const SecondaryVariant: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
};

export const OutlineVariant: Story = {
  args: {
    ...Default.args,
    variant: 'outline',
  },
};

export const CustomFilter: Story = {
  args: {
    ...Default.args,
    filterFn: (option, searchValue) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.value.toLowerCase().includes(searchValue.toLowerCase()),
  },
};

export const EmptyState: Story = {
  args: {
    ...Default.args,
    options: [],
    emptyText: 'No fruits found',
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
    onValueChange: value => {
      console.log('Selected:', value);
    },
    onSearchChange: search => {
      console.log('Search:', search);
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Small</div>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Small combobox"
        size="sm"
      />
      <div className="text-sm text-gray-600">Medium (default)</div>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Medium combobox"
        size="md"
      />
      <div className="text-sm text-gray-600">Large</div>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Large combobox"
        size="lg"
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Default</div>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Default variant"
        variant="default"
      />
      <div className="text-sm text-gray-600">Secondary</div>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Secondary variant"
        variant="secondary"
      />
      <div className="text-sm text-gray-600">Outline</div>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Outline variant"
        variant="outline"
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Normal</div>
      <GlassCombobox options={sampleOptions} placeholder="Normal state" />
      <div className="text-sm text-gray-600">Loading</div>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Loading state"
        loading
      />
      <div className="text-sm text-gray-600">Error</div>
      <GlassCombobox options={sampleOptions} placeholder="Error state" error />
      <div className="text-sm text-gray-600">Success</div>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Success state"
        success
      />
      <div className="text-sm text-gray-600">Disabled</div>
      <GlassCombobox
        options={sampleOptions}
        placeholder="Disabled state"
        disabled
      />
    </div>
  ),
};
