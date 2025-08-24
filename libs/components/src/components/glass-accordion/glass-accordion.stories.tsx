import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Accordion,
  GlassAccordion,
  GlassAccordionContent,
  GlassAccordionItem,
  GlassAccordionTrigger,
} from "./glass-accordion";

const meta = {
  title: "Components/Layout/GlassAccordion",
  component: GlassAccordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible accordion component with glassmorphism design, smooth animations, and support for single or multiple expanded items.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description:
        "Type of accordion - single allows only one item open at a time, multiple allows multiple items open",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant affecting padding and text size",
    },
    variant: {
      control: "select",
      options: ["default", "enhanced", "ghost"],
      description: "Visual style variant of the accordion",
    },
    collapsible: {
      control: "boolean",
      description: "For single type - allows collapsing all items",
      if: { arg: "type", eq: "single" },
    },
    defaultValue: {
      control: "text",
      description: "Default expanded item(s)",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof GlassAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic single accordion
export const Single: Story = {
  args: {
    type: "single",
    defaultValue: "item-1",
    collapsible: true,
  },
  render: (args) => (
    <div className="w-[600px]">
      <GlassAccordion {...args}>
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>What is glassmorphism?</GlassAccordionTrigger>
          <GlassAccordionContent>
            Glassmorphism is a design trend that uses transparency, blur
            effects, and subtle borders to create a glass-like appearance. It
            provides depth and hierarchy while maintaining visual lightness.
          </GlassAccordionContent>
        </GlassAccordionItem>
        <GlassAccordionItem value="item-2">
          <GlassAccordionTrigger>
            How do I use this component?
          </GlassAccordionTrigger>
          <GlassAccordionContent>
            Import the component and use it like any other React component. You
            can control which items are expanded, customize the appearance with
            variants, and add your own content.
          </GlassAccordionContent>
        </GlassAccordionItem>
        <GlassAccordionItem value="item-3">
          <GlassAccordionTrigger>Is it accessible?</GlassAccordionTrigger>
          <GlassAccordionContent>
            Yes! This component is built on Radix UI primitives, providing full
            keyboard navigation, ARIA attributes, and screen reader support out
            of the box.
          </GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>
    </div>
  ),
};

// Multiple accordion
export const Multiple: Story = {
  args: {
    type: "multiple",
    defaultValue: ["item-1", "item-2"],
  },
  render: (args) => (
    <div className="w-[600px]">
      <GlassAccordion {...args}>
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>Features</GlassAccordionTrigger>
          <GlassAccordionContent>
            <ul className="list-inside list-disc space-y-1">
              <li>Smooth animations with Framer Motion</li>
              <li>Glassmorphism styling</li>
              <li>Single or multiple selection modes</li>
              <li>Keyboard navigation</li>
              <li>Customizable appearance</li>
            </ul>
          </GlassAccordionContent>
        </GlassAccordionItem>
        <GlassAccordionItem value="item-2">
          <GlassAccordionTrigger>Technical Details</GlassAccordionTrigger>
          <GlassAccordionContent>
            Built with Radix UI for robust accessibility and behavior. Uses
            Framer Motion for smooth animations and Tailwind CSS for styling.
          </GlassAccordionContent>
        </GlassAccordionItem>
        <GlassAccordionItem value="item-3">
          <GlassAccordionTrigger>Browser Support</GlassAccordionTrigger>
          <GlassAccordionContent>
            Works in all modern browsers that support CSS backdrop-filter.
            Gracefully degrades in older browsers.
          </GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>
    </div>
  ),
};

// Size variants
export const Sizes: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => (
    <div className="w-[600px] space-y-8">
      <div>
        <h3 className="mb-2 font-semibold text-sm text-liquid-primary">
          Small
        </h3>
        <GlassAccordion type="single" size="sm" collapsible>
          <GlassAccordionItem value="item-1" size="sm">
            <GlassAccordionTrigger size="sm">
              Small Accordion
            </GlassAccordionTrigger>
            <GlassAccordionContent size="sm">
              This accordion uses the small size variant with reduced padding
              and smaller text.
            </GlassAccordionContent>
          </GlassAccordionItem>
        </GlassAccordion>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-sm text-liquid-primary">
          Medium (Default)
        </h3>
        <GlassAccordion type="single" size="md" collapsible>
          <GlassAccordionItem value="item-1" size="md">
            <GlassAccordionTrigger size="md">
              Medium Accordion
            </GlassAccordionTrigger>
            <GlassAccordionContent size="md">
              This is the default size with standard padding and text size.
            </GlassAccordionContent>
          </GlassAccordionItem>
        </GlassAccordion>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-sm text-liquid-primary">
          Large
        </h3>
        <GlassAccordion type="single" size="lg" collapsible>
          <GlassAccordionItem value="item-1" size="lg">
            <GlassAccordionTrigger size="lg">
              Large Accordion
            </GlassAccordionTrigger>
            <GlassAccordionContent size="lg">
              The large variant has increased padding and larger text for better
              visibility.
            </GlassAccordionContent>
          </GlassAccordionItem>
        </GlassAccordion>
      </div>
    </div>
  ),
};

// Style variants
export const Variants: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => (
    <div className="w-[600px] space-y-8">
      <div>
        <h3 className="mb-2 font-semibold text-sm text-liquid-primary">
          Default
        </h3>
        <GlassAccordion type="single" variant="default" collapsible>
          <GlassAccordionItem value="item-1">
            <GlassAccordionTrigger>Default Style</GlassAccordionTrigger>
            <GlassAccordionContent>
              The default variant with subtle glass background and border.
            </GlassAccordionContent>
          </GlassAccordionItem>
        </GlassAccordion>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-sm text-liquid-primary">
          Enhanced
        </h3>
        <GlassAccordion type="single" variant="enhanced" collapsible>
          <GlassAccordionItem value="item-1">
            <GlassAccordionTrigger>Enhanced Style</GlassAccordionTrigger>
            <GlassAccordionContent>
              A more prominent variant with increased background opacity.
            </GlassAccordionContent>
          </GlassAccordionItem>
        </GlassAccordion>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-sm text-liquid-primary">
          Ghost
        </h3>
        <GlassAccordion type="single" variant="ghost" collapsible>
          <GlassAccordionItem value="item-1">
            <GlassAccordionTrigger>Ghost Style</GlassAccordionTrigger>
            <GlassAccordionContent>
              Minimal variant with no background or border on the container.
            </GlassAccordionContent>
          </GlassAccordionItem>
        </GlassAccordion>
      </div>
    </div>
  ),
};

// Without chevron icon
export const NoIcon: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => (
    <div className="w-[600px]">
      <GlassAccordion type="single" collapsible>
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger showIcon={false}>
            No Chevron Icon
          </GlassAccordionTrigger>
          <GlassAccordionContent>
            This accordion trigger doesn't show the chevron icon.
          </GlassAccordionContent>
        </GlassAccordionItem>
        <GlassAccordionItem value="item-2">
          <GlassAccordionTrigger showIcon={false}>
            Clean Look
          </GlassAccordionTrigger>
          <GlassAccordionContent>
            Useful when you want a cleaner appearance or custom indicators.
          </GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>
    </div>
  ),
};

// Controlled example
export const Controlled: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => {
    const [value, setValue] = React.useState<string>("item-2");

    return (
      <div className="w-[600px] space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue("item-1")}
            className="liquid-glass liquid-glass-interactive rounded-lg px-3 py-1 text-sm text-liquid-primary border-liquid-accent/30 hover:border-liquid-accent/50 bg-liquid-accent/15"
          >
            Open First
          </button>
          <button
            type="button"
            onClick={() => setValue("item-2")}
            className="liquid-glass liquid-glass-interactive rounded-lg px-3 py-1 text-sm text-liquid-primary border-liquid-accent/30 hover:border-liquid-accent/50 bg-liquid-accent/15"
          >
            Open Second
          </button>
          <button
            type="button"
            onClick={() => setValue("item-3")}
            className="liquid-glass liquid-glass-interactive rounded-lg px-3 py-1 text-sm text-liquid-primary border-liquid-accent/30 hover:border-liquid-accent/50 bg-liquid-accent/15"
          >
            Open Third
          </button>
        </div>

        <GlassAccordion
          type="single"
          value={value}
          onValueChange={setValue}
          collapsible
        >
          <GlassAccordionItem value="item-1">
            <GlassAccordionTrigger>First Item</GlassAccordionTrigger>
            <GlassAccordionContent>
              This accordion is controlled - use the buttons above to change the
              active item.
            </GlassAccordionContent>
          </GlassAccordionItem>
          <GlassAccordionItem value="item-2">
            <GlassAccordionTrigger>Second Item</GlassAccordionTrigger>
            <GlassAccordionContent>
              The value state is managed externally, giving you full control.
            </GlassAccordionContent>
          </GlassAccordionItem>
          <GlassAccordionItem value="item-3">
            <GlassAccordionTrigger>Third Item</GlassAccordionTrigger>
            <GlassAccordionContent>
              You can integrate this with your app's state management.
            </GlassAccordionContent>
          </GlassAccordionItem>
        </GlassAccordion>
      </div>
    );
  },
};

// Complex content example
export const ComplexContent: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => (
    <div className="w-[600px]">
      <GlassAccordion type="single" collapsible defaultValue="item-1">
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>API Documentation</GlassAccordionTrigger>
          <GlassAccordionContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold text-liquid-primary">
                  Props
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1">
                    <code className="text-liquid-accent">type</code>
                    <span className="text-liquid-text opacity-70">
                      "single" | "multiple"
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <code className="text-liquid-accent">size</code>
                    <span className="text-liquid-text opacity-70">
                      "sm" | "md" | "lg"
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <code className="text-liquid-accent">variant</code>
                    <span className="text-liquid-text opacity-70">
                      "default" | "solid" | "ghost"
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassAccordionContent>
        </GlassAccordionItem>
        <GlassAccordionItem value="item-2">
          <GlassAccordionTrigger>Code Example</GlassAccordionTrigger>
          <GlassAccordionContent>
            <pre className="overflow-x-auto rounded-lg liquid-glass p-3 text-sm">
              <code className="text-liquid-accent">{`<GlassAccordion type="single" collapsible>
  <GlassAccordionItem value="item-1">
    <GlassAccordionTrigger>
      Click me
    </GlassAccordionTrigger>
    <GlassAccordionContent>
      Content goes here
    </GlassAccordionContent>
  </GlassAccordionItem>
</GlassAccordion>`}</code>
            </pre>
          </GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>
    </div>
  ),
};

// Using compound component pattern
export const CompoundPattern: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => (
    <div className="w-[600px]">
      <Accordion type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Using Compound Components</Accordion.Trigger>
          <Accordion.Content>
            You can also use the compound component pattern with dot notation
            for a cleaner API.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Benefits</Accordion.Trigger>
          <Accordion.Content>
            This pattern groups related components together and makes the
            relationship between them clearer.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

// Theme showcase
export const ThemeShowcase: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => (
    <div className="w-[600px] space-y-8">
      <div className="rounded-lg bg-liquid-bg/10 p-6">
        <h3 className="mb-4 font-semibold text-lg text-liquid-primary">
          Light Background
        </h3>
        <GlassAccordion type="single" collapsible>
          <GlassAccordionItem value="item-1">
            <GlassAccordionTrigger>
              Glassmorphism on Light
            </GlassAccordionTrigger>
            <GlassAccordionContent>
              The glass effect adapts beautifully to different backgrounds.
            </GlassAccordionContent>
          </GlassAccordionItem>
        </GlassAccordion>
      </div>

      <div className="rounded-lg bg-liquid-bg/30 p-6">
        <h3 className="mb-4 font-semibold text-lg text-liquid-primary">
          Dark Background
        </h3>
        <GlassAccordion type="single" collapsible>
          <GlassAccordionItem value="item-1">
            <GlassAccordionTrigger>Glassmorphism on Dark</GlassAccordionTrigger>
            <GlassAccordionContent>
              The component maintains readability on various backgrounds.
            </GlassAccordionContent>
          </GlassAccordionItem>
        </GlassAccordion>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: "liquid-gradient",
    },
  },
};
