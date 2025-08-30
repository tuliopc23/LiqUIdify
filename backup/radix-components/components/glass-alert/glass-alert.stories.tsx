import type { Meta, StoryObj } from "@storybook/react";
import { GlassAlert } from "./glass-alert";

const meta: Meta<typeof GlassAlert> = {
  title: "Components/GlassAlert",
  component: GlassAlert,
  tags: ["autodocs"],
};
export default meta;

export const Basic: StoryObj<typeof GlassAlert> = {
  args: { children: "This is an alert" },
};
