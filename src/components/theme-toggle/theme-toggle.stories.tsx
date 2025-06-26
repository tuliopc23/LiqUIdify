import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './theme-toggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Utilities/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <span className="text-sm text-gray-600 dark:text-gray-300">
        Click to toggle between light and dark themes
      </span>
    </div>
  ),
};

export const InNavBar: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-lg font-semibold">App Title</h1>
        <ThemeToggle />
      </nav>
    </div>
  ),
};

export const WithGlassEffect: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-xl">
      <div className="glass-effect p-6 rounded-xl border border-white/20 dark:border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Settings</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Customize your theme preference
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  ),
};
