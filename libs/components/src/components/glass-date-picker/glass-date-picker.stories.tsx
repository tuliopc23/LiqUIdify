import { GlassDatePicker } from './glass-date-picker';
import '@/styles/apple-liquid-authentic.css';

export default {
  title: 'Components/GlassDatePicker',
  component: GlassDatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A date picker component with Liquid Glass styling for consistent Apple-inspired UI.',
      },
    },
  },
};

export const Playground = () => (
  <div className="apple-glass mx-auto max-w-md p-8">
    <GlassDatePicker placeholder="Select a date..." />
  </div>
);

export const EdgeCases = () => (
  <div className="apple-glass mx-auto max-w-md space-y-6 p-8">
    <div>
      <h3 className="mb-2 text-white">With Time Selection</h3>
      <GlassDatePicker placeholder="Select date and time..." showTime />
    </div>
    <div>
      <h3 className="mb-2 text-white">Disabled State</h3>
      <GlassDatePicker placeholder="Disabled date picker" disabled />
    </div>
    <div>
      <h3 className="mb-2 text-white">Date Range (Min/Max)</h3>
      <GlassDatePicker
        placeholder="Select date within range..."
        minDate={new Date('2024-01-01')}
        maxDate={new Date('2024-12-31')}
      />
    </div>
  </div>
);

export const Sizes = () => (
  <div className="apple-glass mx-auto max-w-md space-y-4 p-8">
    <GlassDatePicker placeholder="Small size..." size="sm" />
    <GlassDatePicker placeholder="Medium size (default)..." size="md" />
    <GlassDatePicker placeholder="Large size..." size="lg" />
  </div>
);

export const CustomFormat = () => (
  <div className="apple-glass mx-auto max-w-md space-y-4 p-8">
    <GlassDatePicker placeholder="MM/DD/YYYY format..." format="MM/dd/yyyy" />
    <GlassDatePicker
      placeholder="Full date format..."
      format="EEEE, MMMM do, yyyy"
    />
    <GlassDatePicker placeholder="ISO format..." format="yyyy-MM-dd" />
  </div>
);
