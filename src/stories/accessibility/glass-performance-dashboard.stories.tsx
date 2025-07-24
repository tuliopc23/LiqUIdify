import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { GlassButton } from "../../components/glass-button-refactored";
import { GlassCard } from "../../components/glass-card-refactored";
import { GlassPerformanceDashboard } from "../../components/glass-performance-dashboard";
import { performanceMonitor } from "../../core/performance-monitor";
// @ts-expect-error TS(6142): Module '../../hooks/use-performance-monitoring' wa... Remove this comment to see the full error message
import { withPerformanceMonitoring } from "../../hooks/use-performance-monitoring";

const meta = {
	title: "Accessibility/GlassPerformanceDashboard",
	component: GlassPerformanceDashboard,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
// @ts-expect-error TS(7006): Parameter 'Story' implicitly has an 'any' type.
		(Story) => {
			useEffect(() => {
				// Initialize performance monitoring
				performanceMonitor.init();
			}, []);

			return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<Story />
				</div>
			);
		},
	],
// @ts-expect-error TS(7005): Variable 'satisfies' implicitly has an 'any' type.
} satisfies Meta<typeof GlassPerformanceDashboard>;

export default meta;
// @ts-expect-error TS(2339): Property 'typeof' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
type Story = StoryObj<typeof meta>;

// Demo component with performance monitoring
const DemoComponent = withPerformanceMonitoring(
// @ts-expect-error TS(2304): Cannot find name 'delay'.
	({ delay = 100 }: { delay?: number }) => {
		const [count, setCount] = useState(0);

		// Simulate expensive render
		const expensiveCalculation = () => {
			const start = performance.now();
// @ts-expect-error TS(2339): Property 'delay' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
			while (performance.now() - start < delay) {
				// Busy wait
			}
		};

		expensiveCalculation();

		return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassCard className="p-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<h3 className="text-lg font-semibold mb-4">
					Performance Test Component
				</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<p className="mb-4">Render count: {count}</p>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassButton onClick={() => setCount((c) => c + 1)}>
					Trigger Re-render
				</GlassButton>
			</GlassCard>
		);
	},
	"DemoComponent",
);

export const Default: Story = {
// @ts-expect-error TS(2304): Cannot find name 'args'.
	args: {
// @ts-expect-error TS(2304): Cannot find name 'position'.
		position: "bottom-right",
	},
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<DemoComponent />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassPerformanceDashboard {...arguments_} />
		</>
	),
};

export const TopLeft: Story = {
// @ts-expect-error TS(2304): Cannot find name 'args'.
	args: {
// @ts-expect-error TS(2304): Cannot find name 'position'.
		position: "top-left",
	},
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<DemoComponent />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassPerformanceDashboard {...arguments_} />
		</>
	),
};

export const TopRight: Story = {
// @ts-expect-error TS(2304): Cannot find name 'args'.
	args: {
// @ts-expect-error TS(2304): Cannot find name 'position'.
		position: "top-right",
	},
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<DemoComponent />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassPerformanceDashboard {...arguments_} />
		</>
	),
};

export const BottomLeft: Story = {
// @ts-expect-error TS(2304): Cannot find name 'args'.
	args: {
// @ts-expect-error TS(2304): Cannot find name 'position'.
		position: "bottom-left",
	},
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<DemoComponent />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassPerformanceDashboard {...arguments_} />
		</>
	),
};

export const CollapsedByDefault: Story = {
// @ts-expect-error TS(2304): Cannot find name 'args'.
	args: {
// @ts-expect-error TS(2304): Cannot find name 'collapsed'.
		collapsed: true,
	},
	render: (arguments_) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<DemoComponent />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassPerformanceDashboard {...arguments_} />
		</>
	),
};

export const WithMultipleComponents: Story = {
// @ts-expect-error TS(2304): Cannot find name 'render'.
	render: () => {
		const SlowComponent = withPerformanceMonitoring(() => {
			// Simulate slow render
			const start = performance.now();
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			while (performance.now() - start < 50) {}

			return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassCard className="p-4 mb-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h4 className="font-medium">Slow Component (50ms render)</h4>
				</GlassCard>
			);
		}, "SlowComponent");

		const FastComponent = withPerformanceMonitoring(() => {
			return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassCard className="p-4 mb-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h4 className="font-medium">Fast Component (&lt;1ms render)</h4>
				</GlassCard>
			);
		}, "FastComponent");

		return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="grid grid-cols-2 gap-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<SlowComponent />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<FastComponent />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<DemoComponent delay={20} />
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<DemoComponent delay={150} />
				</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassPerformanceDashboard />
			</>
		);
	},
};

export const WithCustomActions: Story = {
// @ts-expect-error TS(2304): Cannot find name 'render'.
	render: () => {
		const [showDashboard, setShowDashboard] = useState(true);

		return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassCard className="p-6">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<h3 className="text-lg font-semibold mb-4">
						Performance Dashboard Controls
					</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<div className="space-y-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
// @ts-expect-error TS(2304): Cannot find name 'setShowDashboard'.
							onClick={() => setShowDashboard(!showDashboard)}
// @ts-expect-error TS(2304): Cannot find name 'showDashboard'.
							variant={showDashboard ? "default" : "outline"}
						>
// @ts-expect-error TS(2304): Cannot find name 'showDashboard'.
							{showDashboard ? "Hide" : "Show"} Dashboard
						</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() => {
								// Trigger custom metric
								performanceMonitor.startTiming("custom-action");
								setTimeout(() => {
									performanceMonitor.endTiming("custom-action");
								}, Math.random() * 1000);
							}}
						>
							Track Custom Action
						</GlassButton>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<GlassButton
							onClick={() => {
								// Simulate layout shift
								const element = document.createElement("div");
								element.style.height = "100px";
								element.style.background = "rgba(255,255,255,0.1)";
								document.body.append(element);
								setTimeout(() => element.remove(), 1000);
							}}
							variant="destructive"
						>
							Trigger Layout Shift
						</GlassButton>
					</div>
				</GlassCard>

// @ts-expect-error TS(2304): Cannot find name 'showDashboard'.
				{showDashboard && (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassPerformanceDashboard onClose={() => setShowDashboard(false)} />
				)}
			</>
		);
	},
};

export const StressTest: Story = {
// @ts-expect-error TS(2304): Cannot find name 'render'.
	render: () => {
		const [components, setComponents] = useState(10);

		const StressComponent = withPerformanceMonitoring(
// @ts-expect-error TS(2304): Cannot find name 'index'.
			({ index }: { index: number }) => {
				const [localCount, setLocalCount] = useState(0);

				// Random render delay
				const delay = Math.random() * 20;
				const start = performance.now();
// @ts-expect-error TS(2339): Property 'delay' does not exist on type 'JSX.Intri... Remove this comment to see the full error message
				while (performance.now() - start < delay) {}

				return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassCard className="p-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="text-xs">Component {index}</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="text-xs text-gray-400">Count: {localCount}</div>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<button
							className="text-xs underline"
// @ts-expect-error TS(2304): Cannot find name 'setLocalCount'.
							onClick={() => setLocalCount((c) => c + 1)}
						>
							Update
						</button>
					</GlassCard>
				);
			},
			"StressComponent",
		);

		return (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="mb-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
					<GlassCard className="p-4">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<h3 className="font-semibold mb-2">Stress Test Controls</h3>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<div className="flex gap-2">
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<GlassButton
								size="sm"
// @ts-expect-error TS(2304): Cannot find name 'setComponents'.
								onClick={() => setComponents((c) => Math.max(0, c - 10))}
							>
								-10
							</GlassButton>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<span className="flex items-center px-4">
// @ts-expect-error TS(2304): Cannot find name 'components'.
								{components} components
							</span>
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
							<GlassButton
								size="sm"
// @ts-expect-error TS(2304): Cannot find name 'setComponents'.
								onClick={() => setComponents((c) => c + 10)}
							>
								+10
							</GlassButton>
						</div>
					</GlassCard>
				</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<div className="grid grid-cols-5 gap-2">
// @ts-expect-error TS(2304): Cannot find name 'components'.
					{Array.from({ length: components }, (_, index) => (
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
						<StressComponent key={index} index={index} />
					))}
				</div>

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassPerformanceDashboard />
			</>
		);
	},
};
