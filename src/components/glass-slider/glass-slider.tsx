import React, { useCallback, useEffect, useRef, useState } from "react";

import { cn, getGlassClass } from "@/core/utils/classname";

export interface GlassSliderProps {
	min?: number;
	max?: number;
	step?: number;
	value?: number;
	onChange?: (value: number) => void;
	disabled?: boolean;
	className?: string;
	showValue?: boolean;
	variant?: "default" | "minimal";
}

export const GlassSlider = React.memo(
	React.forwardRef<HTMLDivElement, GlassSliderProps>(
		(
			{
				min = 0,
				max = 100,
				step = 1,
				value = 0,
				onChange,
				disabled,
				className,
				showValue = true,
				variant = "default",
				...props
			},
			ref,
		) => {
			const [currentValue, setCurrentValue] = useState(value);
			const [isDragging, setIsDragging] = useState(false);
			const sliderRef = useRef<HTMLDivElement>(null);
			const thumbRef = useRef<HTMLDivElement>(null);

			useEffect(() => {
				setCurrentValue(value);
			}, [value]);

			const percentage = ((currentValue - min) / (max - min)) * 100;

			const updateValue = useCallback(
				(clientX: number) => {
					if (!sliderRef.current) {
						return;
					}

					const rect = sliderRef.current.getBoundingClientRect();
					const percentage = Math.max(
						0,
						Math.min(1, (clientX - rect.left) / rect.width),
					);
					const newValue = min + percentage * (max - min);
					const steppedValue = Math.round(newValue / step) * step;
					const clampedValue = Math.max(min, Math.min(max, steppedValue));

					setCurrentValue(clampedValue);
					onChange?.(clampedValue);
				},
				[min, max, step, onChange],
			);

			const handleMouseMove = useCallback(
				(e: MouseEvent) => {
					if (!isDragging || disabled) {
						return;
					}
					updateValue(e.clientX);
				},
				[isDragging, disabled, updateValue],
			);

			const handleMouseUp = useCallback(() => {
				setIsDragging(false);
			}, []);

			const handleMouseDown = (e: React.MouseEvent) => {
				if (disabled) {
					return;
				}

				setIsDragging(true);
				updateValue(e.clientX);
			};

			useEffect(() => {
				if (isDragging && "undefined" !== typeof document) {
						document.addEventListener("mousemove", handleMouseMove);
						document.addEventListener("mouseup", handleMouseUp);
					}

				return () => {
					if ("undefined" !== typeof document) {
						document.removeEventListener("mousemove", handleMouseMove);
						document.removeEventListener("mouseup", handleMouseUp);
					}
				};
			}, [isDragging, handleMouseMove, handleMouseUp]);

			return (

				<div ref={ref} className={cn("relative w-full", className)} {...(props as any)}>
					{showValue && (

						<div className="flex justify-between items-center mb-3">

							<span className="text-sm text-gray-600 dark:text-gray-400">
								Value
							</span>

							<span className="text-sm font-medium text-gray-900 dark:text-white">
								{currentValue}
							</span>
						</div>
					)}

					<div
						ref={sliderRef}
						className={cn(
							"relative h-2 rounded-full cursor-pointer",
							"default" === variant && getGlassClass("default"),
							"minimal" === variant && "bg-gray-200 dark:bg-gray-700",
							disabled && "cursor-not-allowed opacity-50",
						)}
						onMouseDown={handleMouseDown}
					>
						{/* Track fill */}

						<div
							className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-200"
							style={{ width: `${percentage}%` }}
						/>

						{/* Thumb */}

						<div
							ref={thumbRef}
							className={cn(
								"absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2",
								"w-5 h-5 rounded-full transition-all duration-200",
								getGlassClass("elevated"),
								"border-2 border-white/30 dark:border-white/20",
								"hover:scale-110 active:scale-95",
								isDragging && "scale-110 ring-4 ring-blue-500/30",
								disabled && "cursor-not-allowed",
							)}
							style={{ left: `${percentage}%` }}
						/>
					</div>

					<div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">

						<span>{min}</span>

						<span>{max}</span>
					</div>
				</div>
			);
		},
	),
);

GlassSlider.displayName = "GlassSlider";
