import React from "react";
import { cn, getGlassClass } from "@/core/utils/classname";

export interface GlassProgressProps {
	value: number;
	max?: number;
	size?: "sm" | "md" | "lg";
	variant?: "default" | "gradient" | "minimal";
	showValue?: boolean;
	className?: string;
	color?: "blue" | "green" | "purple" | "red" | "yellow";
}

export const GlassProgress = React.memo(
	React.forwardRef<HTMLDivElement, GlassProgressProps>(
		(
			{
				value,
				max = 100,
				size = "md",
				variant = "default",
				showValue = false,
				className,
				color = "blue",
				...props
			},
			ref,
		) => {
			const percentage = Math.min(100, Math.max(0, (value / max) * 100));

			const sizeClasses = {
				sm: "h-1",
				md: "h-2",
				lg: "h-3",
			};

			const colorClasses = {
				blue: "from-blue-500 to-blue-600",
				green: "from-green-500 to-green-600",
				purple: "from-purple-500 to-purple-600",
				red: "from-red-500 to-red-600",
				yellow: "from-yellow-500 to-yellow-600",
			};

			return (
				<div ref={ref} className={cn("w-full", className)} {...props}>
					{showValue && (
						<div className="flex justify-between items-center mb-2">
							<span className="text-sm text-gray-600 dark:text-gray-400">
								Progress
							</span>
							<span className="text-sm font-medium text-gray-900 dark:text-white">
								{Math.round(percentage)}%
							</span>
						</div>
					)}

					<div
						className={cn(
							"relative w-full rounded-full overflow-hidden",
							sizeClasses[size],
							"default" === variant && getGlassClass("default"),
							"minimal" === variant && "bg-gray-200 dark:bg-gray-700",
							"gradient" === variant &&
								"bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600",
						)}
					>
						<div
							className={cn(
								"h-full transition-all duration-500 ease-out rounded-full",
								"default" === variant &&
									`bg-gradient-to-r ${colorClasses[color]}`,
								"gradient" === variant &&
									`bg-gradient-to-r ${colorClasses[color]}`,
								"minimal" === variant && `bg-${color}-500`,
							)}
							style={{ width: `${percentage}%` }}
						/>

						{/* Shimmer effect */}
						<div
							className={cn(
								"absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent",
								"animate-pulse opacity-50",
							)}
							style={{
								background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)`,
								transform: `translateX(-100%)`,
							}}
						/>
					</div>
				</div>
			);
		},
	),
);

GlassProgress.displayName = "GlassProgress";
