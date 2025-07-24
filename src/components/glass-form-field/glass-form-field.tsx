import { type InferVariantProps as VariantProps, createVariants as cva } from '../../lib/variant-system';
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import React, { forwardRef, useId } from "react";

import { cn } from "@/core/utils/classname";

const formFieldVariants = cva(["space-y-2", "transition-all duration-200"], {
	variants: {
		variant: {
			default: "",
			card: "p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm",
			inline: "flex items-center space-x-4 space-y-0",
		},
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
});

const labelVariants = cva(
	["block font-medium transition-colors duration-200", "text-white/90"],

	{
		variants: {
			required: {
				true: "after:content-['*'] after:ml-1 after:text-red-400",
				false: "",
			},
			size: {
				sm: "text-xs",
				md: "text-sm",
				lg: "text-base",
			},
		},
		defaultVariants: {
			required: false,
			size: "md",
		},
	},
);

const helperTextVariants = cva(
	["flex items-center gap-1.5 text-xs transition-colors duration-200"],

	{
		variants: {
			state: {
				default: "text-white/60",
				error: "text-red-400",
				success: "text-green-400",
				warning: "text-yellow-400",
			},
		},
		defaultVariants: {
			state: "default",
		},
	},
);

export interface GlassFormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof React.AriaAttributes>,
		VariantProps<typeof formFieldVariants> {
	label?: string;
	helperText?: string;
	error?: string;
	success?: string;
	warning?: string;

	required?: boolean;

	children: React.ReactNode;
	htmlFor?: string;

	disabled?: boolean;
}

const GlassFormField = forwardRef<HTMLDivElement, GlassFormFieldProps>(
	(
		{
			className,
			variant,
			size,
			label,
			helperText,
			error,
			success,
			warning,
			required = false,
			children,
			htmlFor,
			disabled = false,
			...props
		},
		ref,
	) => {
		const fieldId = useId();
		const finalId = htmlFor || fieldId;

		// Determine state and message
		const state = error
			? "error"
			: success
				? "success"
				: warning
					? "warning"
					: "default";
		const message = error || success || warning || helperText;

		// Get appropriate icon
		const getIcon = () => {
			switch (state) {
				case "error": {

					return <AlertCircle className="w-3 h-3 flex-shrink-0" />;
				}
				case "success": {

					return <CheckCircle className="w-3 h-3 flex-shrink-0" />;
				}
				case "warning": {

					return <Info className="w-3 h-3 flex-shrink-0" />;
				}
				default: {
					return;
				}
			}
		};

		// Clone children to add proper IDs and aria attributes
		const enhancedChildren = React.Children.map(children, (child) => {
			if (React.isValidElement(child)) {
				return React.cloneElement(child as any, {
					id: finalId,
					"aria-describedby": message ? `${finalId}-message` : null,
					"aria-invalid": error ? true : null,
					"aria-required": required,
					disabled,
					...("object" === typeof child.props && null !== child.props
						? child.props
						: {}),
				});
			}
			return child;
		});

		return (

			<div ref={ref}
				className={cn(
					formFieldVariants({ variant, size }),
					disabled && "opacity-50 cursor-not-allowed",
					className,
				)}
				{...(props as any)}
			>
				{label && (

					<label
						htmlFor={finalId}
						className={cn(

							labelVariants({ required, size }),
							disabled && "cursor-not-allowed",
						)}
					>
						{label}
					</label>
				)}

				<div
					className={cn("inline" === variant ? "flex-1" : "w-full", "relative")}
				>
					{enhancedChildren}
				</div>

				{message && (

					<div
						id={`${finalId}-message`}
						className={cn(helperTextVariants({ state }))}
						role={error  ? "alert" : undefined}
						aria-live={error ? "polite" : null}
					>
						{getIcon()}

						<span className="flex-1">{message}</span>
					</div>
				)}
			</div>
		);
	},
);

GlassFormField.displayName = "GlassFormField";

export { GlassFormField };
