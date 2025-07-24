import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './component-showcase' was resolved to '/Us... Remove this comment to see the full error message
import { ComponentShowcase } from "./component-showcase";

const meta: Meta<typeof ComponentShowcase> = {
	title: "Showcase/ComponentShowcase",
	component: ComponentShowcase,
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"A comprehensive showcase of all Glass UI components with interactive examples and code snippets.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		activeSection: {
			control: "select",
			options: [
				"buttons",
				"forms",
				"navigation",
				"feedback",
				"data-display",
				"layout",
				"overlay",
			],
			description: "The active section to display in the showcase",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
	args: {
		activeSection: "buttons",
	},
};

export const Forms: Story = {
	args: {
		activeSection: "forms",
	},
};

export const Navigation: Story = {
	args: {
		activeSection: "navigation",
	},
};

export const Feedback: Story = {
	args: {
		activeSection: "feedback",
	},
};

export const DataDisplay: Story = {
	args: {
		activeSection: "data-display",
	},
};

export const Layout: Story = {
	args: {
		activeSection: "layout",
	},
};

export const Overlay: Story = {
	args: {
		activeSection: "overlay",
	},
};

export const AllComponents: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="space-y-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ComponentShowcase activeSection="buttons" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ComponentShowcase activeSection="forms" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ComponentShowcase activeSection="navigation" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ComponentShowcase activeSection="feedback" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ComponentShowcase activeSection="data-display" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ComponentShowcase activeSection="layout" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ComponentShowcase activeSection="overlay" />
		</div>
	),
};
