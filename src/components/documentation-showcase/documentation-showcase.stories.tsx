import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DocumentationShowcase } from './documentation-showcase';
import { ThemeProvider } from '../theme-provider';

const meta: Meta<typeof DocumentationShowcase> = {
  title: 'Documentation/Documentation Showcase',
  component: DocumentationShowcase,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof DocumentationShowcase>;

export const Default: Story = {
  render: (args) => <DocumentationShowcase {...args} />,
};
