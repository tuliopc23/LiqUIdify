import type { Meta, StoryObj } from "@storybook/react-vite";
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
		width: 500,
		height: 300,
	},
};

export const Bar: Story = {
	render: () => <BarChart data={sampleData} width={500} height={300} />,
};

export const Donut: Story = {
	render: () => (
		<DonutChart
			data={donutData}
			width={300}
			height={300}
			centerContent={
				<div className="text-center">
					<div className="text-lg font-bold">100%</div>
					<div className="text-sm text-gray-600">Coverage</div>
				</div>
			}
		/>
	),
};

export const AllCharts: Story = {
	render: () => (
		<div className="flex flex-col gap-8 p-8">
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Line Chart</h3>
				<LineChart data={sampleData} width={400} height={250} />
			</div>

			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Bar Chart</h3>
				<BarChart data={sampleData} width={400} height={250} />
			</div>

			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Donut Chart</h3>
				<DonutChart data={donutData} width={250} height={250} />
			</div>
		</div>
	),
};
