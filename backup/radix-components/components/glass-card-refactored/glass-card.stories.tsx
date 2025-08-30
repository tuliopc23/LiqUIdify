import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Card } from "./glass-card";

const meta = {
  title: "Components/Layout/GlassCard",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined", "interactive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    interactive: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "md",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Glass Card</Card.Title>
          <Card.Description>
            A simple card using the compound components API.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Use the controls to try different variants and sizes.</p>
        </Card.Content>
        <Card.Footer>
          <p className="text-sm text-blue-900">Footer content</p>
        </Card.Footer>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card variant="default">
        <Card.Header>
          <Card.Title>Default</Card.Title>
          <Card.Description>Base style</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Standard glass look.</p>
        </Card.Content>
      </Card>
      <Card variant="elevated">
        <Card.Header>
          <Card.Title>Elevated</Card.Title>
          <Card.Description>More depth</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Enhanced background and shadow.</p>
        </Card.Content>
      </Card>
      <Card variant="outlined">
        <Card.Header>
          <Card.Title>Outlined</Card.Title>
          <Card.Description>Border emphasis</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Visible border with glass effect.</p>
        </Card.Content>
      </Card>
      <Card variant="interactive">
        <Card.Header>
          <Card.Title>Interactive</Card.Title>
          <Card.Description>For clickable cards</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Optimized hover/active styles.</p>
        </Card.Content>
      </Card>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card size="sm">
        <Card.Header>
          <Card.Title>Small</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">Compact card</p>
        </Card.Content>
      </Card>
      <Card size="md">
        <Card.Header>
          <Card.Title>Medium</Card.Title>
        </Card.Header>
        <Card.Content>
          <p>Default size</p>
        </Card.Content>
      </Card>
      <Card size="lg">
        <Card.Header>
          <Card.Title>Large</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-lg">Spacious layout</p>
        </Card.Content>
      </Card>
      <Card size="xl">
        <Card.Header>
          <Card.Title>XL</Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-xl">Maximum space</p>
        </Card.Content>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [clicked, setClicked] = React.useState(false);
    return (
      <Card
        variant="interactive"
        interactive
        onClick={() => setClicked(!clicked)}
      >
        <Card.Header>
          <Card.Title>Interactive Card</Card.Title>
          <Card.Description>Click to toggle</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-sm">{clicked ? "Clicked!" : "Not clicked"}</p>
        </Card.Content>
      </Card>
    );
  },
};

export const Composition: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Composed Card</Card.Title>
        <Card.Description>Header, Content, Footer</Card.Description>
      </Card.Header>
      <Card.Content>
        <p className="text-sm">Compound components in action.</p>
      </Card.Content>
      <Card.Footer>
        <p className="text-xs text-blue-900">Footer content</p>
      </Card.Footer>
    </Card>
  ),
};
