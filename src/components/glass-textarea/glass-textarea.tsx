import React from "react";

import { cn, getGlassClass } from "@/core/utils/classname";

export interface GlassTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	variant?: "default" | "minimal";
	resize?: "none" | "vertical" | "horizontal" | "both";
}

export const GlassTextarea = React.memo(
	React.forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
		(
			{ className, variant = "default", resize = "vertical", ...props },
			ref,
		) => {
			return (

				<textarea
					ref={ref}
					className={cn(
						getGlassClass("default"),
						"w-full px-4 py-3 rounded-xl",
						"transition-all duration-200 ease-out",
						"border border-white/20 dark:border-white/10",
						"text-gray-900 dark:text-white",
						"placeholder:text-gray-500 dark:placeholder:text-gray-400",
						"focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent",
						"hover:bg-white/10 dark:hover:bg-white/5",
						"disabled:opacity-50 disabled:cursor-not-allowed",
						"min-h-[100px]",
						"none" === resize && "resize-none",
						"vertical" === resize && "resize-y",
						"horizontal" === resize && "resize-x",
						"both" === resize && "resize",
						"minimal" === variant &&
							"border-0 border-b border-white/30 dark:border-white/20 rounded-none bg-transparent focus:border-blue-500/50",
						className,
					)}
					{...props}
				/>
			);
		},
	),
);

GlassTextarea.displayName = "GlassTextarea";
