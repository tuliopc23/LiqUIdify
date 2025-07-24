import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(2691): An import path cannot end with a '.tsx' extension.... Remove this comment to see the full error message
import { Navbar } from "./navbar.tsx";

const meta: Meta<typeof Navbar> = {
	title: "Glass/Navbar",
	component: Navbar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	render: () => <Navbar />,
};
