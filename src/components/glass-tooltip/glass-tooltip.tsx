import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn, getGlassClass } from "@/core/utils/classname";

export interface GlassTooltipProps {
	content: React.ReactNode;
	children: React.ReactNode;
	position?: "top" | "bottom" | "left" | "right";
	delay?: number;
	className?: string;
	disabled?: boolean;
}

export const GlassTooltip: React.FC<GlassTooltipProps> = ({
	content,
	children,
	position = "top",
	delay = 500,
	className,
	disabled = false,
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
	const triggerRef = useRef<HTMLDivElement>(null);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const showTooltip = () => {
		if (disabled) {
			return;
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setIsVisible(true);
		}, delay);
	};

	const hideTooltip = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsVisible(false);
	};

	useEffect(() => {
		if ("undefined" === typeof window) {
			return;
		}
		if (isVisible && triggerRef.current && tooltipRef.current) {
			const triggerRect = triggerRef.current.getBoundingClientRect();
			const tooltipRect = tooltipRef.current.getBoundingClientRect();

			let top = 0;
			let left = 0;

			switch (position) {
				case "top":
					top = triggerRect.top - tooltipRect.height - 8;
					left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
					break;
				case "bottom":
					top = triggerRect.bottom + 8;
					left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
					break;
				case "left":
					top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
					left = triggerRect.left - tooltipRect.width - 8;
					break;
				case "right":
					top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
					left = triggerRect.right + 8;
					break;
			}

			// Keep tooltip within viewport
			const viewport = {
				width: typeof window !== "undefined" ? window.innerWidth : 1024,
				height: typeof window !== "undefined" ? window.innerHeight : 768,
			};

			if (8 > left) {
				left = 8;
			}
			if (left + tooltipRect.width > viewport.width - 8) {
				left = viewport.width - tooltipRect.width - 8;
			}
			if (8 > top) {
				top = 8;
			}
			if (top + tooltipRect.height > viewport.height - 8) {
				top = viewport.height - tooltipRect.height - 8;
			}

			setTooltipStyle({
				position: "fixed",
				top: `${top}px`,
				left: `${left}px`,
				zIndex: 9999,
			});
		}
	}, [isVisible, position]);

	const tooltip = isVisible ? (
		<div
			ref={tooltipRef}
			style={tooltipStyle}
			className={cn(
				getGlassClass("elevated"),
				"px-3 py-2 text-sm rounded-lg",
				"border border-white/20 dark:border-white/10",
				"text-gray-900 dark:text-white",
				"max-w-xs break-words",
				"animate-in fade-in-0 zoom-in-95 duration-200",
				"shadow-lg shadow-black/10 dark:shadow-black/30",
				className,
			)}
		>
			{content}

			{/* Arrow */}
			<div
				className={cn(
					"absolute w-2 h-2 rotate-45",
					getGlassClass("elevated"),
					"border border-white/20 dark:border-white/10",
					"top" === position &&
						"bottom-[-5px] left-1/2 transform -translate-x-1/2 border-t-0 border-l-0",
					"bottom" === position &&
						"top-[-5px] left-1/2 transform -translate-x-1/2 border-b-0 border-r-0",
					"left" === position &&
						"right-[-5px] top-1/2 transform -translate-y-1/2 border-l-0 border-b-0",
					"right" === position &&
						"left-[-5px] top-1/2 transform -translate-y-1/2 border-r-0 border-t-0",
				)}
			/>
		</div>
	) : undefined;

	return (
		<>
			<div
				ref={triggerRef}
				onMouseEnter={showTooltip}
				onMouseLeave={hideTooltip}
				className="inline-block"
			>
				{children}
			</div>

			{tooltip &&
				"undefined" !== typeof window &&
				createPortal(tooltip, document.body)}
		</>
	);
};

GlassTooltip.displayName = "GlassTooltip";
