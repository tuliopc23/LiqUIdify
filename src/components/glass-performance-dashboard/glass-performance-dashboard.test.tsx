import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { performanceMonitor } from "../../core/performance-monitor";
// @ts-expect-error TS(6142): Module './glass-performance-dashboard' was resolve... Remove this comment to see the full error message
import { GlassPerformanceDashboard } from "./glass-performance-dashboard";

// Mock performance monitor
vi.mock("../../core/performance-monitor", () => ({
	performanceMonitor: {
		subscribe: vi.fn(() => () => {}),
		getAllMetrics: vi.fn(() => new Map()),
		getReport: vi.fn(() => ({
			webVitals: [],
			componentMetrics: [],
			customMetrics: {},
		})),
	},
}));

// Mock hooks
vi.mock("../../hooks/use-performance-monitoring", () => ({
	useWebVitals: vi.fn(() => ({})),
	useRealtimePerformance: vi.fn(() => ({
		fps: 60,
		memory: { used: 50, limit: 100 },
	})),
}));

describe("GlassPerformanceDashboard", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders performance dashboard", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		render(<GlassPerformanceDashboard />);
		expect(screen.getByText("Performance Monitor")).toBeInTheDocument();
	});

	it("displays FPS counter", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		render(<GlassPerformanceDashboard />);
		expect(screen.getByText("FPS")).toBeInTheDocument();
		expect(screen.getByText("60")).toBeInTheDocument();
	});

	it("displays memory usage", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		render(<GlassPerformanceDashboard />);
		expect(screen.getByText("Memory")).toBeInTheDocument();
		expect(screen.getByText("50MB")).toBeInTheDocument();
	});

	it("can be collapsed", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		render(<GlassPerformanceDashboard />);

		const collapseButton = screen.getByLabelText("Collapse dashboard");
		fireEvent.click(collapseButton);

		expect(screen.queryByText("Performance Monitor")).not.toBeInTheDocument();
		expect(
			screen.getByLabelText("Expand performance dashboard"),
		).toBeInTheDocument();
	});

	it("can be expanded from collapsed state", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		render(<GlassPerformanceDashboard collapsed />);

		const expandButton = screen.getByLabelText("Expand performance dashboard");
		fireEvent.click(expandButton);

		expect(screen.getByText("Performance Monitor")).toBeInTheDocument();
	});

	it("calls onClose when close button is clicked", () => {
		const onClose = vi.fn();
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		render(<GlassPerformanceDashboard onClose={onClose} />);

		const closeButton = screen.getByLabelText("Close dashboard");
		fireEvent.click(closeButton);

		expect(onClose).toHaveBeenCalled();
	});

	it("applies position classes correctly", () => {
		const { container } = render(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
			<GlassPerformanceDashboard position="top-left" />,
		);
		const dashboard = container.firstChild;

		expect(dashboard).toHaveClass("top-4", "left-4");
	});

	it("subscribes to performance metrics on mount", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		render(<GlassPerformanceDashboard />);

		expect(performanceMonitor.subscribe).toHaveBeenCalledTimes(7); // One for each metric
	});

	it("displays Core Web Vitals section", () => {
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		render(<GlassPerformanceDashboard />);
		expect(screen.getByText("Core Web Vitals")).toBeInTheDocument();
	});

	it("updates component metrics periodically", () => {
		vi.useFakeTimers();

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		render(<GlassPerformanceDashboard />);

		expect(performanceMonitor.getReport).toHaveBeenCalledTimes(1);

		vi.advanceTimersByTime(1000);

		expect(performanceMonitor.getReport).toHaveBeenCalledTimes(2);

		vi.useRealTimers();
	});

	it("cleans up subscriptions on unmount", () => {
		const unsubscribe = vi.fn();
		vi.mocked(performanceMonitor.subscribe).mockReturnValue(unsubscribe);

// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		const { unmount } = render(<GlassPerformanceDashboard />);

		unmount();

		expect(unsubscribe).toHaveBeenCalledTimes(7); // One for each metric
	});
});
