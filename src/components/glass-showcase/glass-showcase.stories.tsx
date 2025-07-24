import type { Meta, StoryObj } from "@storybook/react";
// @ts-expect-error TS(6142): Module './glass-showcase' was resolved to '/Users/... Remove this comment to see the full error message
import { GlassShowcase } from "./glass-showcase";

const meta: Meta<typeof GlassShowcase> = {
	title: "Showcase/Apple Liquid Glass",
	component: GlassShowcase,
	parameters: {
		layout: "fullscreen",
		backgrounds: {
			default: "liquid-gradient",
		},
	},
};

export default meta;
type Story = StoryObj<typeof GlassShowcase>;

export const Default: Story = {};
