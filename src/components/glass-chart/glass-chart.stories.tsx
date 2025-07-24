import type { Meta, StoryObj } from "@storybook/react-vite";
// @ts-expect-error TS(6142): Module './glass-chart' was resolved to '/Users/tul... Remove this comment to see the full error message
import { BarChart, DonutChart, LineChart } from "./glass-chart";

const sampleData = [
	{ label: "Jan", value: 120 },
	{ label: "Feb", value: 200 },
	{ label: "Mar", value: 150 },
	{ label: "Apr", value: 280 },
	{ label: "May", value: 240 },
	{ label: "Jun", value: 320 },
];

const donutData = [
	{ label: "Desktop", value: 45, color: "#3b82f6" },
	{ label: "Mobile", value: 35, color: "#10b981" },
	{ label: "Tablet", value: 20, color: "#f59e0b" },
];

const meta: Meta<typeof LineChart> = {
	title: "Glass/Charts",
	component: LineChart,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {
	args: {
		data: sampleData,
		width: "500",
		height: "300",
	},
};

export const Bar: Story = {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
	render: () => <BarChart data={sampleData} width={500} height={300} />,
};

export const Donut: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<DonutChart
			data={donutData}
			width={300}
			height={300}
			centerContent={
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="text-center">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="text-lg font-bold">100%</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="text-sm text-gray-600">Coverage</div>
				</div>
			}
		/>
	),
};

export const AllCharts: Story = {
	render: () => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<div className="flex flex-col gap-8 p-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold">Line Chart</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<LineChart data={sampleData} width={400} height={250} />
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold">Bar Chart</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<BarChart data={sampleData} width={400} height={250} />
			</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold">Donut Chart</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<DonutChart data={donutData} width={250} height={250} />
			</div>
		</div>
	),
};
