import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn, getGlassClass } from "@/core/utils/classname";

export interface ChartDataPoint {
	label: string;
	value: number;
	color?: string;
	metadata?: Record<string, any>;
}

interface BaseChartProps {
	data: ChartDataPoint[];
	width?: number;
	height?: number;
	className?: string;
	animated?: boolean;
	showTooltip?: boolean;
}

export interface LineChartProps extends BaseChartProps {
	strokeWidth?: number;
	showDots?: boolean;
	gradient?: boolean;
}

export interface BarChartProps extends BaseChartProps {
	orientation?: "vertical" | "horizontal";
	showValues?: boolean;
}

export interface DonutChartProps extends BaseChartProps {
	innerRadius?: number;
	showLabels?: boolean;
	centerContent?: React.ReactNode;
}

export const LineChart: React.FC<LineChartProps> = ({
	data,
	width = 400,
	height = 200,
	className,
	animated = true,
	showTooltip = true,
	strokeWidth = 3,
	showDots = true,
	gradient = true,
}) => {
	const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!data.length) {
		return;
	}

	const maxValue = Math.max(...data.map((d) => d.value));
	const minValue = Math.min(...data.map((d) => d.value));
	const range = maxValue - minValue || 1;

	const padding = 40;
	const chartWidth = width - padding * 2;
	const chartHeight = height - padding * 2;

	const points = data.map((d, i) => ({
		x: padding + (i / (data.length - 1)) * chartWidth,
		y: padding + ((maxValue - d.value) / range) * chartHeight,
		data: d,
	}));

	const pathData = points.reduce((path, point, i) => {
		const command = 0 === i ? "M" : "L";
		return `${path} ${command} ${point.x} ${point.y}`;
	}, "");

	const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<div className={cn("relative", className)}>
			<svg
				ref={svgRef}
				width={width}
				height={height}
				className="overflow-visible"
			>
				{gradient && (
					<defs>
						<linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
							<stop
								offset="0%"
								stopColor="var(--glass-primary)"
								stopOpacity="0.2"
							/>
							<stop
								offset="100%"
								stopColor="var(--glass-primary)"
								stopOpacity="0"
							/>
						</linearGradient>
					</defs>
				)}

				{/* Grid lines */}
				<g className="opacity-20">
					{[...Array(5)].map((_, i) => {
						const y = padding + (i / 4) * chartHeight;
						return (
							<line
								key={i}
								x1={padding}
								y1={y}
								x2={width - padding}
								y2={y}
								stroke="var(--text-secondary)"
								strokeWidth="1"
								strokeDasharray="2,2"
							/>
						);
					})}
				</g>

				{/* Gradient area */}
				{gradient && 0 < points.length && (
					<path
						d={`${pathData} L ${points[points.length - 1]?.x} ${height - padding} L ${padding} ${height - padding} Z`}
						fill={`url(#${gradientId})`}
						className={cn(animated && "transition-all duration-1000 ease-out")}
						style={{
							opacity: mounted ? 1 : 0,
						}}
					/>
				)}

				{/* Line */}
				<path
					d={pathData}
					fill="none"
					stroke="var(--glass-primary)"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					strokeLinejoin="round"
					className={cn(animated && "transition-all duration-1000 ease-out")}
					style={{
						strokeDasharray: animated ? (mounted ? "none" : "1000") : "none",
						strokeDashoffset: animated ? (mounted ? "0" : "1000") : "0",
					}}
				/>

				{/* Data points */}
				{showDots &&
					points.map((point, i) => (
						<circle
							key={i}
							cx={point.x}
							cy={point.y}
							r={hoveredPoint === i ? 6 : 4}
							fill="var(--glass-primary)"
							stroke="white"
							strokeWidth="2"
							className={cn(
								"cursor-pointer transition-all duration-200",
								animated && "animate-in zoom-in-0 duration-500",
								hoveredPoint === i && "shadow-lg",
							)}
							style={{
								animationDelay: animated ? `${i * 100}ms` : "0ms",
							}}
							onMouseEnter={() => setHoveredPoint(i)}
       onMouseLeave={() => setHoveredPoint(undefined)}
						/>
					))}
			</svg>

			{/* Tooltip */}
			{showTooltip && null !== hoveredPoint && points[hoveredPoint] && (
				<div
					className={cn(
						"absolute z-10 px-3 py-2 rounded-lg text-sm pointer-events-none",
						getGlassClass("elevated"),
						"border border-[var(--glass-border)]",
					)}
					style={{
						left: points[hoveredPoint]?.x - 40,
						top: points[hoveredPoint]?.y - 60,
						transform: "translateX(-50%)",
					}}
				>
					<div className="font-medium text-[var(--text-primary)]">
						{points[hoveredPoint]?.data.label}
					</div>
					<div className="text-[var(--text-secondary)]">
						{points[hoveredPoint]?.data.value.toLocaleString()}
					</div>
				</div>
			)}
		</div>
	);
};

export const BarChart: React.FC<BarChartProps> = ({
	data,
	width = 400,
	height = 200,
	className,
	animated = true,
	orientation = "vertical",
	showValues = true,
}) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!data.length) {
		return;
	}

	const maxValue = Math.max(...data.map((d) => d.value));
	const padding = 40;
	const chartWidth = width - padding * 2;
	const chartHeight = height - padding * 2;

	const barThickness = Math.min(
		(("vertical" === orientation ? chartWidth : chartHeight) / data.length) *
			0.6,
		40,
	);

	return (
		<div className={cn("relative", className)}>
			<svg width={width} height={height} className="overflow-visible">
				{data.map((item, i) => {
					const barLength =
						(item.value / maxValue) *
						("vertical" === orientation ? chartHeight : chartWidth);
					const x =
						"vertical" === orientation
							? padding +
								(i / data.length) * chartWidth +
								(chartWidth / data.length - barThickness) / 2
							: padding;
					const y =
						"vertical" === orientation
							? height - padding - barLength
							: padding +
								(i / data.length) * chartHeight +
								(chartHeight / data.length - barThickness) / 2;
					const barWidth =
						"vertical" === orientation ? barThickness : barLength;
					const barHeight =
						"vertical" === orientation ? barLength : barThickness;

					return (
						<g key={i}>
							<rect
								x={x}
								y={y}
								width={barWidth}
								height={barHeight}
								fill={item.color || "var(--glass-primary)"}
								rx="4"
								className={cn(
									"transition-all duration-500 ease-out",
									animated && "animate-in fade-in-0 slide-in-from-bottom-4",
								)}
								style={{
									animationDelay: animated ? `${i * 100}ms` : "0ms",
									transform: mounted ? "scaleY(1)" : "scaleY(0)",
									transformOrigin: "bottom",
								}}
							/>
							{showValues && (
								<text
									x={x + barWidth / 2}
									y={y - 8}
									textAnchor="middle"
									className="text-xs fill-[var(--text-secondary)]"
								>
									{item.value.toLocaleString()}
								</text>
							)}
						</g>
					);
				})}
			</svg>
		</div>
	);
};

export const DonutChart: React.FC<DonutChartProps> = ({
	data,
	width = 200,
	height = 200,
	className,
	animated = true,
	innerRadius = 60,
	showLabels = true,
	centerContent,
}) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!data.length) {
		return;
	}

	const total = data.reduce((sum, item) => sum + item.value, 0);
	const radius = Math.min(width, height) / 2 - 20;
	const centerX = width / 2;
	const centerY = height / 2;

	let cumulativePercentage = 0;

	const segments = data.map((item, i) => {
		const percentage = item.value / total;
		const startAngle = cumulativePercentage * 2 * Math.PI - Math.PI / 2;
		const endAngle =
			(cumulativePercentage + percentage) * 2 * Math.PI - Math.PI / 2;

		const largeArcFlag = 0.5 < percentage ? 1 : 0;

		const x1 = centerX + radius * Math.cos(startAngle);
		const y1 = centerY + radius * Math.sin(startAngle);
		const x2 = centerX + radius * Math.cos(endAngle);
		const y2 = centerY + radius * Math.sin(endAngle);

		const innerX1 = centerX + innerRadius * Math.cos(startAngle);
		const innerY1 = centerY + innerRadius * Math.sin(startAngle);
		const innerX2 = centerX + innerRadius * Math.cos(endAngle);
		const innerY2 = centerY + innerRadius * Math.sin(endAngle);

		const pathData = [
			`M ${x1} ${y1}`,
			`A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
			`L ${innerX2} ${innerY2}`,
			`A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1}`,
			"Z",
		].join(" ");

		cumulativePercentage += percentage;

		return {
			path: pathData,
			color: item.color || `hsl(${(i * 360) / data.length}, 70%, 60%)`,
			percentage,
			...item,
		};
	});

	return (
		<div className={cn("relative", className)}>
			<svg width={width} height={height}>
				{segments.map((segment, i) => (
					<path
						key={i}
						d={segment.path}
						fill={segment.color}
						className={cn(
							"transition-all duration-500 ease-out hover:opacity-80",
							animated && "animate-in fade-in-0",
						)}
						style={{
							animationDelay: animated ? `${i * 150}ms` : "0ms",
							transform: mounted ? "scale(1)" : "scale(0)",
							transformOrigin: `${centerX}px ${centerY}px`,
						}}
					/>
				))}
			</svg>

			{/* Center content */}
			{centerContent && (
				<div
					className="absolute inset-0 flex items-center justify-center"
					style={{
						width: innerRadius * 2,
						height: innerRadius * 2,
						left: centerX - innerRadius,
						top: centerY - innerRadius,
					}}
				>
					{centerContent}
				</div>
			)}

			{/* Labels */}
			{showLabels && (
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-center">
						<div className="text-2xl font-bold text-[var(--text-primary)]">
							{total.toLocaleString()}
						</div>
						<div className="text-sm text-[var(--text-secondary)]">Total</div>
					</div>
				</div>
			)}
		</div>
	);
};
