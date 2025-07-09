import type { Meta, StoryObj } from '@storybook/react';
import { GlassDatePicker } from './glass-date-picker';

const meta: Meta<typeof GlassDatePicker> = {
  title: 'Components/Form/GlassDatePicker',
  component: GlassDatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive date picker component with optional time selection, navigation, and liquid glass styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Selected date value',
      control: 'date',
    },
    placeholder: {
      description: 'Placeholder text when no date is selected',
      control: 'text',
    },
    disabled: {
      description: 'Whether the date picker is disabled',
      control: 'boolean',
    },
    error: {
      description: 'Whether the date picker has an error state',
      control: 'boolean',
    },
    success: {
      description: 'Whether the date picker has a success state',
      control: 'boolean',
    },
    size: {
      description: 'Size variant of the date picker',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: 'Visual variant of the date picker',
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
    showTime: {
      description: 'Whether to show time selection',
      control: 'boolean',
    },
    timeFormat: {
      description: 'Time format (12 or 24 hour)',
      control: 'select',
      options: ['12', '24'],
    },
    dateFormat: {
      description: 'Date format string',
      control: 'text',
    },
    locale: {
      description: 'Locale for date formatting',
      control: 'text',
    },
    minDate: {
      description: 'Minimum selectable date',
      control: 'date',
    },
    maxDate: {
      description: 'Maximum selectable date',
      control: 'date',
    },
    clearable: {
      description: 'Whether the date picker can be cleared',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select a date',
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: new Date('2024-03-15'),
  },
};

export const WithTime: Story = {
  args: {
    ...Default.args,
    showTime: true,
    placeholder: 'Select date and time',
  },
};

export const Time24Hour: Story = {
  args: {
    ...Default.args,
    showTime: true,
    timeFormat: '24',
    placeholder: 'Select date and time (24h)',
  },
};

export const WithMinMax: Story = {
  args: {
    ...Default.args,
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    placeholder: 'Select date (next 30 days)',
  },
};

export const CustomFormat: Story = {
  args: {
    ...Default.args,
    dateFormat: 'dd/MM/yyyy',
    placeholder: 'DD/MM/YYYY',
  },
};

export const DifferentLocale: Story = {
  args: {
    ...Default.args,
    locale: 'es-ES',
    placeholder: 'Seleccionar fecha',
  },
};

export const NotClearable: Story = {
  args: {
    ...Default.args,
    clearable: false,
    value: new Date(),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    value: new Date(),
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
    value: new Date(),
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    success: true,
    value: new Date(),
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

export const Interactive: Story = {
  args: {
    ...Default.args,
    onDateChange: (date) => {
      console.log('Date changed:', date);
    },
    onTimeChange: (time) => {
      console.log('Time changed:', time);
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Small</div>
      <GlassDatePicker
        placeholder="Small date picker"
        size="sm"
      />
      <div className="text-sm text-gray-600">Medium (default)</div>
      <GlassDatePicker
        placeholder="Medium date picker"
        size="md"
      />
      <div className="text-sm text-gray-600">Large</div>
      <GlassDatePicker
        placeholder="Large date picker"
        size="lg"
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Default</div>
      <GlassDatePicker
        placeholder="Default variant"
        variant="default"
      />
      <div className="text-sm text-gray-600">Secondary</div>
      <GlassDatePicker
        placeholder="Secondary variant"
        variant="secondary"
      />
      <div className="text-sm text-gray-600">Outline</div>
      <GlassDatePicker
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
      <GlassDatePicker
        placeholder="Normal state"
      />
      <div className="text-sm text-gray-600">With Value</div>
      <GlassDatePicker
        placeholder="With value"
        value={new Date()}
      />
      <div className="text-sm text-gray-600">Error</div>
      <GlassDatePicker
        placeholder="Error state"
        error
      />
      <div className="text-sm text-gray-600">Success</div>
      <GlassDatePicker
        placeholder="Success state"
        success
      />
      <div className="text-sm text-gray-600">Disabled</div>
      <GlassDatePicker
        placeholder="Disabled state"
        disabled
      />
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-gray-600 mb-2">Birthday Picker</div>
        <GlassDatePicker
          placeholder="Select your birthday"
          maxDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
      </div>
      
      <div>
        <div className="text-sm text-gray-600 mb-2">Appointment Scheduler</div>
        <GlassDatePicker
          placeholder="Select appointment date & time"
          showTime
          minDate={new Date()}
          maxDate={new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)} // 60 days from now
        />
      </div>
      
      <div>
        <div className="text-sm text-gray-600 mb-2">Event Date</div>
        <GlassDatePicker
          placeholder="Event date"
          minDate={new Date()}
          dateFormat="EEE, MMM d, yyyy"
        />
      </div>
      
      <div>
        <div className="text-sm text-gray-600 mb-2">Deadline Picker</div>
        <GlassDatePicker
          placeholder="Set deadline"
          minDate={new Date()}
          showTime
          timeFormat="24"
          variant="outline"
        />
      </div>
    </div>
  ),
};

export const WithDisabledDates: Story = {
  args: {
    ...Default.args,
    placeholder: 'Select date (weekends disabled)',
    disabledDates: (date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // Disable weekends
    },
  },
};

export const WithHighlightedDates: Story = {
  args: {
    ...Default.args,
    placeholder: 'Select date (holidays highlighted)',
    highlightedDates: [
      new Date('2024-01-01'), // New Year
      new Date('2024-07-04'), // Independence Day
      new Date('2024-12-25'), // Christmas
    ],
  },
};

export const DateRange: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">Date Range Selection</div>
      <div className="flex gap-4">
        <GlassDatePicker
          placeholder="Start date"
          variant="outline"
        />
        <GlassDatePicker
          placeholder="End date"
          variant="outline"
        />
      </div>
    </div>
  ),
};

export const MultipleFormats: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">US Format (MM/dd/yyyy)</div>
      <GlassDatePicker
        placeholder="MM/dd/yyyy"
        dateFormat="MM/dd/yyyy"
        locale="en-US"
      />
      
      <div className="text-sm text-gray-600">European Format (dd/MM/yyyy)</div>
      <GlassDatePicker
        placeholder="dd/MM/yyyy"
        dateFormat="dd/MM/yyyy"
        locale="en-GB"
      />
      
      <div className="text-sm text-gray-600">ISO Format (yyyy-MM-dd)</div>
      <GlassDatePicker
        placeholder="yyyy-MM-dd"
        dateFormat="yyyy-MM-dd"
      />
      
      <div className="text-sm text-gray-600">Long Format</div>
      <GlassDatePicker
        placeholder="Long format"
        dateFormat="EEEE, MMMM d, yyyy"
      />
    </div>
  ),
};
