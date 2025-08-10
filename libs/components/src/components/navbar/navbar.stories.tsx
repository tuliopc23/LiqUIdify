import type { Meta, StoryObj } from "@storybook/react";
import { Navbar, NavbarItem } from "./";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
};
export default meta;

export const Basic: StoryObj<typeof Navbar> = {
  render: () => (
    <Navbar brand={<span>Brand</span>}>
      <NavbarItem href="#">Home</NavbarItem>
      <NavbarItem href="#">About</NavbarItem>
    </Navbar>
  ),
};
