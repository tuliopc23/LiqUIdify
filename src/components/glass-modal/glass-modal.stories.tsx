import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassModal } from './glass-modal';
import { GlassButton } from '../glass-button-refactored/glass-button';
import { useState } from 'react';

const meta: Meta<typeof GlassModal> = {
  title: 'Glass/GlassModal',
  component: GlassModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
const ModalWrapper = ({
  title,
  children,
  className,
  titleClassName,
  contentClassName,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <GlassButton onClick={() => setIsOpen(true)}>Open Modal</GlassButton>
      <GlassModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        className={className}
        titleClassName={titleClassName}
        contentClassName={contentClassName}
      >
        {children}
      </GlassModal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWrapper title="Confirmation">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div className="flex gap-3 justify-end">
        <GlassButton variant="secondary" size="sm">
          Cancel
        </GlassButton>
        <GlassButton variant="destructive" size="sm">
          Delete
        </GlassButton>
      </div>
    </ModalWrapper>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <ModalWrapper>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Welcome!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This modal doesn't have a title in the header.
        </p>
        <GlassButton>Get Started</GlassButton>
      </div>
    </ModalWrapper>
  ),
};

export const Form: Story = {
  render: () => (
    <ModalWrapper title="Create New Item">
      <form className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            placeholder="Enter item name"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            placeholder="Enter description"
          />
        </div>
        <div className="flex gap-3 justify-end pt-4">
          <GlassButton variant="secondary" size="sm">
            Cancel
          </GlassButton>
          <GlassButton variant="primary" size="sm">
            Create
          </GlassButton>
        </div>
      </form>
    </ModalWrapper>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalWrapper title="Terms and Conditions" className="max-w-2xl">
      <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </p>
      </div>
      <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <GlassButton variant="secondary" size="sm">
          Decline
        </GlassButton>
        <GlassButton variant="primary" size="sm">
          Accept
        </GlassButton>
      </div>
    </ModalWrapper>
  ),
};

export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal close requested'),
    title: 'Example Modal',
    children: (
      <div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This modal is always open for demonstration purposes.
        </p>
        <GlassButton>Action Button</GlassButton>
      </div>
    ),
  },
};
