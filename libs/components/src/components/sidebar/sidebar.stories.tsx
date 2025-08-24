import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
};
export default meta;

export const Basic: StoryObj<typeof Sidebar> = {
  args: { children: <div>Sidebar content</div>, defaultOpen: true },
};
