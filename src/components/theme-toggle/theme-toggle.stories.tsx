import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './theme-toggle' was resolved to '/Users/tu... Remove this comment to see the full error message
import { ThemeToggle } from "./theme-toggle";

const meta: Meta<typeof ThemeToggle> = {
	title: "Utilities/ThemeToggle",
	component: ThemeToggle,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<ThemeToggle />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<span className="text-sm text-gray-600 dark:text-gray-300">
				Click to toggle between light and dark themes
			</span>
		</div>
	),
};

export const InNavBar: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="w-full max-w-md">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h1 className="text-lg font-semibold">App Title</h1>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<ThemeToggle />
			</nav>
		</div>
	),
};

export const WithGlassEffect: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-xl">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="glass-effect p-6 rounded-xl border border-white/20 dark:border-white/10">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="flex items-center justify-between">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<h3 className="text-lg font-semibold mb-1">Settings</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p className="text-sm text-gray-600 dark:text-gray-300">
							Customize your theme preference
						</p>
					</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<ThemeToggle />
				</div>
			</div>
		</div>
	),
};
