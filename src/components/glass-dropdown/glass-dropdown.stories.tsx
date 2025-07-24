import type { Meta, StoryObj } from "@storybook/react-vite";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";
// @ts-expect-error TS(6142): Module '../glass-button-refactored/glass-button' w... Remove this comment to see the full error message
import { GlassButton } from "../glass-button-refactored/glass-button";
// @ts-expect-error TS(6142): Module './glass-dropdown' was resolved to '/Users/... Remove this comment to see the full error message
import { GlassDropdown } from "./glass-dropdown";

const meta: Meta<typeof GlassDropdown> = {
	title: "Glass/GlassDropdown",
	component: GlassDropdown,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		align: {
			control: { type: "select" },
			options: ["start", "center", "end"],
		},
		sideOffset: {
			control: { type: "number" },
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	{ label: "Profile", value: "profile", icon: <User className="w-4 h-4" /> },
	{
		label: "Settings",
		value: "settings",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		icon: <Settings className="w-4 h-4" />,
	},
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	{ label: "Help", value: "help", icon: <HelpCircle className="w-4 h-4" /> },
	{ label: "Separator", value: "sep", separator: true },
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	{ label: "Sign out", value: "signout", icon: <LogOut className="w-4 h-4" /> },
];

export const Default: Story = {
	args: {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		trigger: <GlassButton variant="secondary">Open Menu</GlassButton>,
		items: sampleItems,
		onSelect: (value) => console.log("Selected:", value),
	},
};

export const WithDisabledItems: Story = {
	args: {
		trigger: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassButton variant="secondary">Menu with Disabled Items</GlassButton>
		),
		items: [
			{
				label: "Profile",
				value: "profile",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				icon: <User className="w-4 h-4" />,
			},
			{
				label: "Settings",
				value: "settings",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				icon: <Settings className="w-4 h-4" />,
				disabled: true,
			},
			{
				label: "Help",
				value: "help",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				icon: <HelpCircle className="w-4 h-4" />,
			},
			{
				label: "Sign out",
				value: "signout",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				icon: <LogOut className="w-4 h-4" />,
			},
		],
		onSelect: (value) => console.log("Selected:", value),
	},
};

export const Alignment: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex items-center gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDropdown
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				trigger={<GlassButton variant="secondary">Start Align</GlassButton>}
				items={sampleItems}
				align="start"
				onSelect={(value) => console.log("Selected:", value)}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDropdown
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				trigger={<GlassButton variant="secondary">Center Align</GlassButton>}
				items={sampleItems}
				align="center"
				onSelect={(value) => console.log("Selected:", value)}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassDropdown
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				trigger={<GlassButton variant="secondary">End Align</GlassButton>}
				items={sampleItems}
				align="end"
				onSelect={(value) => console.log("Selected:", value)}
			/>
		</div>
	),
};

export const CustomTrigger: Story = {
	args: {
		trigger: (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center cursor-pointer">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<User className="w-5 h-5 text-white" />
			</div>
		),
		items: sampleItems,
		onSelect: (value) => console.log("Selected:", value),
	},
};
