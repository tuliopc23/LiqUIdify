// Shared utilities for Storybook stories in Liquidify
// Use these helpers to DRY up meta, argTypes, demo data, and render logic across stories

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// Standard meta generator
export function createMeta<T>(options: {
  title: string;
  component?: T;
  parameters?: Record<string, any>;
  tags?: string[];
  argTypes?: Record<string, any>;
}): Meta<T> {
  return {
    title: options.title,
    component: options.component,
    parameters: options.parameters || {},
    tags: options.tags || ["autodocs"],
    argTypes: options.argTypes || {},
  } as Meta<T>;
}

// Common argTypes
const variantArgType = {
  control: "select",
  options: [
    "primary",
    "secondary",
    "tertiary",
    "ghost",
    "destructive",
    "apple",
  ],
  description: "Visual style variant",
};

const sizeArgType = {
  control: "select",
  options: ["xs", "sm", "md", "lg", "xl"],
  description: "Component size",
};

const booleanArgType = (desc: string) => ({
  control: "boolean",
  description: desc,
});

// Demo data
const demoVariants = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "destructive",
  "apple",
];
const demoSizes = ["xs", "sm", "md", "lg", "xl"];

// Reusable render helpers
export function renderVariants(
  Component: React.ComponentType<any>,
  extraProps: any = {},
) {
  return (
    <div className="flex flex-wrap gap-4">
      {demoVariants.map((variant) => (
        <Component key={variant} variant={variant} {...extraProps}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Component>
      ))}
    </div>
  );
}

function renderSizes(
  Component: React.ComponentType<any>,
  extraProps: any = {},
) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      {demoSizes.map((size) => (
        <Component key={size} size={size} {...extraProps}>
          {size.toUpperCase()}
        </Component>
      ))}
    </div>
  );
}

// Example: renderInteractiveStates, renderWithIcons, etc. can be added as needed

// Export all helpers
