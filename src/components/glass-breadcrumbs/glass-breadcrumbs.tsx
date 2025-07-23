import { type InferVariantProps as VariantProps, createVariants as cva } from '../../lib/variant-system';
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import React, { useCallback } from "react";
import { cn } from "@/core/utils/classname";

const breadcrumbsVariants = cva(
	[
		"flex items-center space-x-1 text-sm",
		"p-2 rounded-lg backdrop-blur-md",
		"bg-white/5 border border-white/10",
	],
	{
		variants: {
			size: {
				sm: "text-xs p-1.5",
				md: "text-sm p-2",
				lg: "text-base p-3",
			},
			variant: {
				default: "bg-white/5",
				solid: "bg-white/10",
				ghost: "bg-transparent border-transparent",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "default",
		},
	},
);

const breadcrumbItemVariants = cva(
	[
		"flex items-center transition-all duration-200",
		"hover:text-blue-400 focus:text-blue-400 focus:outline-none",
		"rounded px-2 py-1",
	],
	{
		variants: {
			isActive: {
				true: "text-white font-medium",
				false: "text-white/70 hover:text-white",
			},
			isClickable: {
				true: "cursor-pointer hover:bg-white/5",
				false: "cursor-default",
			},
		},
		defaultVariants: {
			isActive: false,
			isClickable: true,
		},
	},
);

export interface BreadcrumbItem {
	label: string;
	href?: string;
	onClick?: () => void;
	icon?: React.ReactNode;
}

export interface GlassBreadcrumbsProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof breadcrumbsVariants> {
	items: BreadcrumbItem[];
	separator?: React.ReactNode;
	showHome?: boolean;
	onHomeClick?: () => void;
	maxItems?: number;
}

const GlassBreadcrumbs = React.memo(
	React.forwardRef<HTMLElement, GlassBreadcrumbsProps>(
		(
			{
				className,
				items,
				separator = <ChevronRight className="w-4 h-4 text-white/40" />,
				showHome = true,
				onHomeClick,
				maxItems,
				size,
				variant,
				...props
			},
			ref,
		) => {
			// Truncate items if maxItems is specified
			const displayItems =
				maxItems && items.length > maxItems
					? [
							...items.slice(0, 1),
							{
								label: "...",
								href: undefined,
								onClick: undefined,
								icon: undefined,
							},
							...items.slice(-(maxItems - 2)),
						]
					: items;

			const handleItemClick = useCallback(
				(item: BreadcrumbItem, _index: number) => {
					if (item.onClick) {
						item.onClick();
					} else if (item.href) {
						// In a real app, you'd handle navigation here
            // Navigation handled by onClick prop
					}
				},
				[],
			);

			return (
				<nav
					ref={ref}
					className={cn(breadcrumbsVariants({ size, variant }), className)}
					aria-label="Breadcrumb"
					{...props}
				>
					<ol className="flex items-center space-x-1">
						{showHome && (
							<>
								<li>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={onHomeClick}
										className={cn(
											breadcrumbItemVariants({
												isActive: false,
												isClickable: true,
											}),
										)}
										aria-label="Home"
									>
										<Home className="w-4 h-4" />
									</motion.button>
								</li>
								{0 < displayItems.length && (
									<li className="flex items-center">{separator}</li>
								)}
							</>
						)}

						{displayItems.map((item, index) => {
							const isLast = index === displayItems.length - 1;
							const isClickable =
								!isLast && (item.href || item.onClick) && "..." !== item.label;

							const handleClick = useCallback(
								() => handleItemClick(item, index),
								[item, index],
							);

							return (
								<React.Fragment key={index}>
									<li>
										{isClickable ? (
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={handleClick}
												className={cn(
													breadcrumbItemVariants({
														isActive: isLast,
														isClickable: true,
													}),
												)}
												aria-current={isLast ? "page" : undefined}
											>
												{item.icon && (
													<span className="mr-1.5">{item.icon}</span>
												)}
												{item.label}
											</motion.button>
										) : (
											<span
												className={cn(
													breadcrumbItemVariants({
														isActive: isLast,
														isClickable: false,
													}),
												)}
												aria-current={isLast ? "page" : undefined}
											>
												{item.icon && (
													<span className="mr-1.5">{item.icon}</span>
												)}
												{item.label}
											</span>
										)}
									</li>

									{!isLast && (
										<li className="flex items-center">{separator}</li>
									)}
								</React.Fragment>
							);
						})}
					</ol>
				</nav>
			);
		},
	),
);

GlassBreadcrumbs.displayName = "GlassBreadcrumbs";

export { GlassBreadcrumbs };
