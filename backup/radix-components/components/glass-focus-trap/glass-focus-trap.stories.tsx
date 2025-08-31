import type { Meta, StoryObj } from "@storybook/react";
import { GlassFocusTrap } from "./";

const meta: Meta<typeof GlassFocusTrap> = {
  title: "Components/GlassFocusTrap",
  component: GlassFocusTrap,
  tags: ["autodocs"],
};
export default meta;

export const Basic: StoryObj<typeof GlassFocusTrap> = {
  render: () => (
    <GlassFocusTrap>
      <div>Focusable A</div>
      <div>Focusable B</div>
    </GlassFocusTrap>
  ),
};
