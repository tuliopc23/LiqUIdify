import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './navbar.tsx';

const meta: Meta<typeof Navbar> = {
  title: 'Glass/Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Navbar />,
};
