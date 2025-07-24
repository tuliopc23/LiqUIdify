import { useEffect, useState } from "react";
import { cn } from "@/core/utils/classname";
import { performanceMonitor } from "../../core/performance-monitor";
import { useRealtimePerformance } from "../../hooks/use-performance-monitoring";
import { GlassCard } from "../glass-card-refactored";

export interface GlassPerformanceDashboardProps {
	className?: string;
	position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
	collapsed?: boolean;
	onClose?: () => void;
}

const METRIC_LABELS = {
	LCP: "Largest Contentful Paint",
	FID: "First Input Delay",
	CLS: "Cumulative Layout Shift",
	FCP: "First Contentful Paint",
	TTFB: "Time to First Byte",
	INP: "Interaction to Next Paint",
	TTI: "Time to Interactive",
};

const getMetricColor = (rating: string) => {
	switch (rating) {
		case "good":
			return "text-green-500";
		case "needs-improvement":
			return "text-yellow-500";
		case "poor":
			return "text-red-500";
		default:
			return "text-gray-500";
	}
};

export function GlassPerformanceDashboard({
	className,
	position = "bottom-right",
	collapsed: initialCollapsed = false,
	onClose,
}: GlassPerformanceDashboardProps) {
	const [collapsed, setCollapsed] = useState(initialCollapsed);
	const [metrics, setMetrics] = useState<Map<string, any>>(new Map());
	const [componentMetrics, setComponentMetrics] = useState<any[]>([]);
	const { fps, memory } = useRealtimePerformance();

	useEffect(() => {
		// Subscribe to metric updates
		const unsubscribers = Object.keys(METRIC_LABELS).map((metricName) =>
			performanceMonitor.subscribe(metricName as any, (metric) => {
				setMetrics((prev) => new Map(prev).set(metricName, metric));
			}),
		);

		// Get initial metrics
		const allMetrics = performanceMonitor.getAllMetrics();
		setMetrics(allMetrics);

		// Update component metrics periodically
		const interval = setInterval(() => {
			const report = performanceMonitor.getReport();
			setComponentMetrics(report.componentMetrics.slice(-10)); // Last 10 components
		}, 1000);

		return () => {
			unsubscribers.forEach((unsub) => unsub());
			clearInterval(interval);
		};
	}, []);

	const positionClasses = {
		"top-left": "top-4 left-4",
		"top-right": "top-4 right-4",
		"bottom-left": "bottom-4 left-4",
		"bottom-right": "bottom-4 right-4",
	};

	if (collapsed) {
		return (
			<div className={cn("fixed z-50", positionClasses[position], className)}>
				<button
					onClick={() => setCollapsed(false)}
					className="p-2 bg-black/10 backdrop-blur-lg rounded-lg border border-white/10 hover:bg-black/20 transition-colors"
					aria-label="Expand performance dashboard"
				>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path
							d="M5 7.5L10 12.5L15 7.5"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"fixed z-50 w-96 max-h-[600px] overflow-hidden",
				positionClasses[position],
				className,
			)}
		>
			<GlassCard className="p-4">
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-semibold">Performance Monitor</h3>
					<div className="flex gap-2">
						<button
							onClick={() => setCollapsed(true)}
							className="p-1 hover:bg-white/10 rounded transition-colors"
							aria-label="Collapse dashboard"
						>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
								<path
									d="M11 6.5L8 3.5L5 6.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						{onClose && (
							<button
								onClick={onClose}
								className="p-1 hover:bg-white/10 rounded transition-colors"
								aria-label="Close dashboard"
							>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<path
										d="M12 4L4 12M4 4L12 12"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						)}
					</div>
				</div>

				{/* Real-time metrics */}
				<div className="grid grid-cols-2 gap-2 mb-4">
					<div className="p-2 bg-white/5 rounded">
						<div className="text-xs text-gray-400">FPS</div>
						<div
							className={cn(
								"text-xl font-mono",
								55 <= fps
									? "text-green-500"
									: (30 <= fps
										? "text-yellow-500"
										: "text-red-500"),
							)}
						>
							{fps}
						</div>
					</div>
					{memory && (
						<div className="p-2 bg-white/5 rounded">
							<div className="text-xs text-gray-400">Memory</div>
							<div className="text-xl font-mono">{memory.used}MB</div>
						</div>
					)}
				</div>

				{/* Core Web Vitals */}
				<div className="space-y-2 mb-4">
					<h4 className="text-sm font-medium text-gray-400">Core Web Vitals</h4>
					<div className="space-y-1 max-h-48 overflow-y-auto">
						{[...metrics.entries()].map(([name, metric]) => (
							<div
								key={name}
								className="flex items-center justify-between p-2 bg-white/5 rounded"
							>
								<div className="flex-1">
									<div className="text-xs text-gray-400">
										{METRIC_LABELS[name as keyof typeof METRIC_LABELS] || name}
									</div>
									<div
										className={cn(
											"text-sm font-mono",
											getMetricColor(metric.rating),
										)}
									>
										{metric.value.toFixed("CLS" === name ? 3 : 0)}
										{"CLS" === name ? "" : "ms"}
									</div>
								</div>
								<div className={cn("text-xs", getMetricColor(metric.rating))}>
									{metric.rating}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Component Performance */}
				{0 < componentMetrics.length && (
					<div className="space-y-2">
						<h4 className="text-sm font-medium text-gray-400">
							Component Performance
						</h4>
						<div className="space-y-1 max-h-32 overflow-y-auto">
							{componentMetrics.map((metric, index) => (
								<div
									key={`${metric.componentName}-${index}`}
									className="flex items-center justify-between p-1 text-xs"
								>
									<span className="truncate flex-1">
										{metric.componentName}
									</span>
									<span className="font-mono text-gray-400">
										{metric.renderTime?.toFixed(1)}ms
									</span>
								</div>
							))}
						</div>
					</div>
				)}
			</GlassCard>
		</div>
	);
}
