import type { Meta, StoryObj } from "@storybook/react-vite";
import { Lock, Mail, Search as SearchIcon } from "lucide-react";
// @ts-expect-error TS(6142): Module './glass-input' was resolved to '/Users/tul... Remove this comment to see the full error message
import { GlassInput } from "./glass-input";

const meta: Meta<typeof GlassInput> = {
	title: "Glass/GlassInput",
	component: GlassInput,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component: `
# Glass Input

A beautiful input component with glass morphism effects and comprehensive functionality.

## Features

- ✨ **Glass Morphism**: Beautiful backdrop blur and transparency effects
- 🎯 **Multiple Variants**: Default, search, password, and email types
- 🎨 **Icon Support**: Left and right icon placement
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🧹 **Clearable**: Optional clear functionality
- 🎭 **States**: Normal, disabled, error, and focused states
- 🌙 **Dark Mode**: Automatic theme adaptation

## Usage

\`\`\`tsx
import { GlassInput } from '@liquidui/react'
import { Search } from 'lucide-react'

function App() {
  return (
    <GlassInput 
      variant="search"
      placeholder="Search..."
      leftIcon={<Search className="h-4 w-4" />}
      clearable
    />
  )
}
\`\`\`
        `,
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["default", "search", "password", "email"],
		},
		clearable: {
			control: "boolean",
		},
		error: {
			control: "boolean",
		},
		disabled: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		placeholder: "Enter text...",
	},
};

export const Search: Story = {
	args: {
		variant: "search",
		placeholder: "Search...",
	},
};

export const Password: Story = {
	args: {
		variant: "password",
		placeholder: "Enter password...",
	},
};

export const Email: Story = {
	args: {
		variant: "email",
		placeholder: "Enter email...",
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		leftIcon: <Mail className="h-4 w-4" />,
	},
};

export const WithIcons: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex flex-col gap-4 w-80">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				placeholder="With left icon"
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				leftIcon={<SearchIcon className="h-4 w-4" />}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				placeholder="With right icon"
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				rightIcon={<Lock className="h-4 w-4" />}
			/>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput
				placeholder="With both icons"
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				leftIcon={<Mail className="h-4 w-4" />}
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				rightIcon={<Lock className="h-4 w-4" />}
			/>
		</div>
	),
};

export const States: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex flex-col gap-4 w-80">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput placeholder="Normal state" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput placeholder="Disabled state" disabled />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput placeholder="Error state" error />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput placeholder="With value" defaultValue="Some text" />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassInput placeholder="Clearable" clearable defaultValue="Clear me" />
		</div>
	),
};
