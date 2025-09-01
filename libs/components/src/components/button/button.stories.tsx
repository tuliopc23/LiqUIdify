import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A liquid glass button component implementing Apple's design language with interactive physics and smooth animations from the HTML demo.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
      description: "The visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the button",
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon",
    },
    rippleEffect: {
      control: "boolean",
      description: "Enable ripple effect on click",
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    loading: false,
    disabled: false,
    iconPosition: "left",
    rippleEffect: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple icons for stories
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8.22 2.97a.75.75 0 0 1 1.06 0L14.53 8.22a.75.75 0 0 1 0 1.06L9.28 14.53a.75.75 0 0 1-1.06-1.06L12.44 9.25H2.75a.75.75 0 0 1 0-1.5h9.69L8.22 4.03a.75.75 0 0 1 0-1.06Z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
  </svg>
);

export const Default: Story = {};

export const Variants: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Button Variants
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Button Sizes
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Buttons with Icons
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Button icon={<ArrowIcon />} iconPosition="left">
            Continue
          </Button>
          <Button icon={<PlusIcon />} iconPosition="left" variant="secondary">
            Add Item
          </Button>
          <Button icon={<ArrowIcon />} iconPosition="right" variant="ghost">
            Next
          </Button>
          <Button icon={<PlusIcon />} iconPosition="left" variant="danger">
            Create
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Button States
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <Button>Normal</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button loading icon={<PlusIcon />}>
            Loading with Icon
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Interactive Effects
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "semibold",
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Ripple Effects
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Button rippleEffect>Hover & Click Me</Button>
              <Button rippleEffect={false} variant="secondary">
                No Ripple Effect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
