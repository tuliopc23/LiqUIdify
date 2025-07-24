import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
// @ts-expect-error TS(6142): Module './sidebar' was resolved to '/Users/tuliopi... Remove this comment to see the full error message
import { Sidebar } from "./sidebar";

const meta: Meta<typeof Sidebar> = {
	title: "Layout/Sidebar",
	component: Sidebar,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		activeSection: {
			control: "text",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
const SidebarWrapper = ({
	activeSection: initialActiveSection = "introduction",
}: {
	activeSection?: string;
}) => {
	const [activeSection, setActiveSection] = useState(initialActiveSection);

	return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="h-screen bg-gray-50 dark:bg-gray-900">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h1 className="text-xl font-semibold">Glass UI Documentation</h1>
			</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<Sidebar
				activeSection={activeSection}
				onSectionChange={setActiveSection}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<main className="ml-64 p-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="max-w-4xl">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h2 className="text-2xl font-bold mb-4 capitalize">
						{activeSection.replace("-", " ")}
					</h2>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<p className="text-gray-600 dark:text-gray-300">
						Content for the {activeSection} section would go here. Click on
						different sidebar items to see the navigation in action.
					</p>
				</div>
			</main>
		</div>
	);
};

export const Default: Story = {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	render: () => <SidebarWrapper />,
};

export const ButtonSelected: Story = {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	render: () => <SidebarWrapper activeSection="button" />,
};

export const FormExamplesSelected: Story = {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	render: () => <SidebarWrapper activeSection="form-examples" />,
};

export const StaticExample: Story = {
	args: {
		activeSection: "introduction",
		onSectionChange: (section: string) => console.log("Selected:", section),
	},
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="h-96 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<Sidebar {...arguments_} />
		</div>
	),
};
