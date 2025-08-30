import type { Meta, StoryObj } from "@storybook/react";
import { GlassTreeView } from "./";

const meta: Meta<typeof GlassTreeView> = {
  title: "Components/GlassTreeView",
  component: GlassTreeView,
  tags: ["autodocs"],
};
export default meta;

export const Basic: StoryObj<typeof GlassTreeView> = {
  args: {
    nodes: [
      {
        id: "root",
        label: "Root",
        children: [{ id: "child", label: "Child" }],
      },
    ],
  },
};
