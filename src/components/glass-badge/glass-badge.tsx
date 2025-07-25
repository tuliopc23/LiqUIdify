import { forwardRef } from "react";

import { cn } from "@/core/utils/classname";

export interface GlassBadgeProps
	extends Omit<
		React.HTMLAttributes<HTMLSpanElement>,
		keyof React.AriaAttributes
	> {
	variant?: "default" | "success" | "warning" | "error";
}

const GlassBadge = forwardRef<HTMLSpanElement, GlassBadgeProps>(
	({ className, variant = "default", ...props }, ref) => {
		const variantClasses = {
			default: "glass-effect text-primary",
			success: "bg-green-100 text-green-800",
			warning: "bg-yellow-100 text-yellow-800",
			error: "bg-red-100 text-red-800",
		};

		return (
			<span
				ref={ref}
				className={cn(
					"px-3 py-1 text-xs font-medium rounded-full",
					variantClasses[variant],
					className,
				)}
				{...props}
			/>
		);
	},
);

GlassBadge.displayName = "GlassBadge";

export { GlassBadge };
