import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "./";

const meta = {
  title: "Navigation/Theme Toggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemeToggle />
    </div>
  ),
};
