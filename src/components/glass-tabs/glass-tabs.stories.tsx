import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-tabs' was resolved to '/Users/tuli... Remove this comment to see the full error message
import { type GlassTabItem, GlassTabs } from "./glass-tabs";

const meta: Meta<typeof GlassTabs> = {
	title: "Glass/GlassTabs",
	component: GlassTabs,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A glass-morphism tabs component with accessibility features and smooth transitions.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		defaultTab: {
			control: "text",
			description: "ID of the default active tab",
		},
		orientation: {
			control: "radio",
			options: ["horizontal", "vertical"],
			description: "Tab orientation (currently only horizontal is implemented)",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs: GlassTabItem[] = [
	{
		id: "overview",
		label: "Overview",
		content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold text-text-primary">
					Project Overview
				</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-text-secondary">
					This is the overview tab content. It provides a high-level summary of
					the project with key metrics and important information.
				</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="grid grid-cols-2 gap-4 mt-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="glass-effect rounded-lg p-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="text-2xl font-bold text-primary">124</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="text-sm text-text-secondary">Total Items</div>
					</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="glass-effect rounded-lg p-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="text-2xl font-bold text-green-600">98%</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="text-sm text-text-secondary">Success Rate</div>
					</div>
				</div>
			</div>
		),
	},
	{
		id: "analytics",
		label: "Analytics",
		content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold text-text-primary">
					Analytics Dashboard
				</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-text-secondary">
					View detailed analytics and performance metrics for your project.
				</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="space-y-3">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="flex justify-between items-center">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<span className="text-text-secondary">Page Views</span>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<span className="font-semibold text-text-primary">12,345</span>
					</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="flex justify-between items-center">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<span className="text-text-secondary">Unique Visitors</span>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<span className="font-semibold text-text-primary">8,901</span>
					</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="flex justify-between items-center">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<span className="text-text-secondary">Bounce Rate</span>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<span className="font-semibold text-text-primary">23.4%</span>
					</div>
				</div>
			</div>
		),
	},
	{
		id: "settings",
		label: "Settings",
		content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold text-text-primary">
					Configuration Settings
				</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="text-text-secondary">
					Customize your project settings and preferences.
				</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="flex items-center justify-between">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<div className="font-medium text-text-primary">Notifications</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<div className="text-sm text-text-secondary">
								Receive email notifications
							</div>
						</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<button className="glass-effect px-3 py-1 rounded-md text-sm">
							Enabled
						</button>
					</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="flex items-center justify-between">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<div className="font-medium text-text-primary">Auto Sync</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<div className="text-sm text-text-secondary">
								Automatically sync data
							</div>
						</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<button className="glass-effect px-3 py-1 rounded-md text-sm">
							Disabled
						</button>
					</div>
				</div>
			</div>
		),
	},
	{
		id: "disabled",
		label: "Disabled Tab",
		disabled: true,
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		content: <div>This content should not be visible</div>,
	},
];

export const Default: Story = {
	args: {
		tabs: sampleTabs,
		defaultTab: "overview",
	},
};

export const CustomStyling: Story = {
	args: {
		tabs: sampleTabs,
		defaultTab: "analytics",
		className: "max-w-4xl",
		tabListClassName: "bg-glass-bg-elevated border border-glass-border-medium",
		activeTabButtonClassName: "bg-primary text-white shadow-lg",
		inactiveTabButtonClassName:
			"text-text-secondary hover:text-text-primary hover:bg-glass-bg-hover",
		tabPanelClassName: "min-h-[300px]",
	},
};

export const MinimalTabs: Story = {
	args: {
		tabs: [
			{
				id: "tab1",
				label: "Tab 1",
				content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 text-text-primary">Simple content for tab 1</div>
				),
			},
			{
				id: "tab2",
				label: "Tab 2",
				content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 text-text-primary">Simple content for tab 2</div>
				),
			},
			{
				id: "tab3",
				label: "Tab 3",
				content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 text-text-primary">Simple content for tab 3</div>
				),
			},
		],
	},
};

export const WithDisabledTabs: Story = {
	args: {
		tabs: [
			{
				id: "active1",
				label: "Active Tab 1",
				content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 text-text-primary">
						This tab is active and clickable
					</div>
				),
			},
			{
				id: "disabled1",
				label: "Disabled Tab",
				disabled: true,
				content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 text-text-primary">
						This should not be visible
					</div>
				),
			},
			{
				id: "active2",
				label: "Active Tab 2",
				content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 text-text-primary">Another active tab</div>
				),
			},
			{
				id: "disabled2",
				label: "Also Disabled",
				disabled: true,
				content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 text-text-primary">
						This should not be visible either
					</div>
				),
			},
		],
		defaultTab: "active1",
	},
};

export const LongContent: Story = {
	args: {
		tabs: [
			{
				id: "short",
				label: "Short",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				content: <div className="p-4 text-text-primary">Short content</div>,
			},
			{
				id: "long",
				label: "Long Content",
				content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="p-4 space-y-4 text-text-primary">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<h3 className="text-lg font-semibold">Long Content Tab</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat.
						</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p>
							Duis aute irure dolor in reprehenderit in voluptate velit esse
							cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia deserunt mollit
							anim id est laborum.
						</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<p>
							Sed ut perspiciatis unde omnis iste natus error sit voluptatem
							accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
							quae ab illo inventore veritatis et quasi architecto beatae vitae
							dicta sunt explicabo.
						</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="glass-effect rounded-lg p-4 mt-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<h4 className="font-semibold mb-2">Important Note</h4>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<p className="text-text-secondary">
								This demonstrates how the tabs component handles content of
								varying lengths while maintaining proper layout and
								accessibility.
							</p>
						</div>
					</div>
				),
			},
		],
	},
};

export const ManyTabs: Story = {
	args: {
		tabs: Array.from({ length: 8 }, (_, index) => ({
			id: `tab-${index + 1}`,
			label: `Tab ${index + 1}`,
			content: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="p-4 text-text-primary">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h3 className="font-semibold mb-2">Content for Tab {index + 1}</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<p>This is the content for tab number {index + 1}.</p>
				</div>
			),
		})),
		defaultTab: "tab-1",
	},
};
