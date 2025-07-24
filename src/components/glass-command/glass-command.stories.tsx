import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Bookmark,
	Calendar,
	Home,
	Mail,
	Search,
	Settings,
	User,
} from "lucide-react";
// @ts-expect-error TS(6142): Module './glass-command' was resolved to '/Users/t... Remove this comment to see the full error message
import { CommandPalette } from "./glass-command";

const meta: Meta<typeof CommandPalette> = {
	title: "Glass/CommandPalette",
	component: CommandPalette,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		placeholder: {
			control: "text",
		},
		shortcut: {
			control: "object",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCommands = [
	{
		id: "home",
		label: "Go to Home",
		description: "Navigate to the home page",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		icon: <Home className="w-4 h-4" />,
		category: "Navigation",
		action: () => console.log("Navigate to home"),
		keywords: ["dashboard", "main"],
	},
	{
		id: "settings",
		label: "Open Settings",
		description: "Configure application settings",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		icon: <Settings className="w-4 h-4" />,
		category: "Settings",
		shortcut: ["cmd", "comma"],
		action: () => console.log("Open settings"),
		keywords: ["preferences", "config"],
	},
	{
		id: "profile",
		label: "View Profile",
		description: "View and edit your profile",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		icon: <User className="w-4 h-4" />,
		category: "User",
		action: () => console.log("View profile"),
		keywords: ["account", "user"],
	},
	{
		id: "search",
		label: "Search Documents",
		description: "Search through all documents",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		icon: <Search className="w-4 h-4" />,
		category: "Content",
		shortcut: ["cmd", "f"],
		action: () => console.log("Search documents"),
		keywords: ["find", "lookup"],
	},
	{
		id: "bookmarks",
		label: "Manage Bookmarks",
		description: "View and organize bookmarks",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		icon: <Bookmark className="w-4 h-4" />,
		category: "Content",
		action: () => console.log("Manage bookmarks"),
		keywords: ["favorites", "saved"],
	},
	{
		id: "mail",
		label: "Compose Email",
		description: "Create a new email message",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		icon: <Mail className="w-4 h-4" />,
		category: "Actions",
		shortcut: ["cmd", "n"],
		action: () => console.log("Compose email"),
		keywords: ["write", "message"],
	},
	{
		id: "calendar",
		label: "Open Calendar",
		description: "View your calendar and appointments",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		icon: <Calendar className="w-4 h-4" />,
		category: "Actions",
		action: () => console.log("Open calendar"),
		keywords: ["schedule", "appointments"],
	},
];

export const Default: Story = {
	args: {
		items: sampleCommands,
		placeholder: "Type a command or search...",
		shortcut: ["cmd", "k"],
	},
};

export const CustomPlaceholder: Story = {
	args: {
		items: sampleCommands,
		placeholder: "What would you like to do?",
		shortcut: ["ctrl", "space"],
	},
};

export const MinimalCommands: Story = {
	args: {
		items: [
			{
				id: "home",
				label: "Home",
				action: () => console.log("Go home"),
			},
			{
				id: "about",
				label: "About",
				action: () => console.log("Show about"),
			},
			{
				id: "help",
				label: "Help",
				action: () => console.log("Show help"),
			},
		],
		placeholder: "Quick actions...",
	},
};

export const WithCategories: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="w-full max-w-2xl">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<CommandPalette
				items={sampleCommands}
				placeholder="Search commands by category..."
				shortcut={["cmd", "p"]}
			/>
		</div>
	),
};
