import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './sidebar';
import { useState } from 'react';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    activeSection: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
const SidebarWrapper = ({ 
  activeSection: initialActiveSection = 'introduction' 
}: { 
  activeSection?: string;
}) => {
  const [activeSection, setActiveSection] = useState(initialActiveSection);
  
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-6">
        <h1 className="text-xl font-semibold">Glass UI Documentation</h1>
      </div>
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      <main className="ml-64 p-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 capitalize">
            {activeSection.replace('-', ' ')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Content for the {activeSection} section would go here. 
            Click on different sidebar items to see the navigation in action.
          </p>
        </div>
      </main>
    </div>
  );
};

export const Default: Story = {
  render: () => <SidebarWrapper />,
};

export const ButtonSelected: Story = {
  render: () => <SidebarWrapper activeSection="button" />,
};

export const FormExamplesSelected: Story = {
  render: () => <SidebarWrapper activeSection="form-examples" />,
};

export const StaticExample: Story = {
  args: {
    activeSection: 'introduction',
    onSectionChange: (section: string) => console.log('Selected:', section),
  },
  render: (args) => (
    <div className="h-96 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <Sidebar {...args} />
    </div>
  ),
};
