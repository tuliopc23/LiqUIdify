import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassSwitch } from './glass-switch';

const meta: Meta<typeof GlassSwitch> = {
  title: 'Glass/GlassSwitch',
  component: GlassSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Auto-save enabled',
    checked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <GlassSwitch label="Normal switch" />
      <GlassSwitch label="Checked switch" checked={true} />
      <GlassSwitch label="Disabled switch" disabled />
      <GlassSwitch label="Disabled checked switch" disabled checked={true} />
    </div>
  ),
};

export const Examples: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-medium">Settings</h3>
      <GlassSwitch label="Dark mode" />
      <GlassSwitch label="Email notifications" checked={true} />
      <GlassSwitch label="Push notifications" />
      <GlassSwitch label="Auto-save" checked={true} />
      <GlassSwitch label="Analytics tracking" disabled />
    </div>
  ),
};
