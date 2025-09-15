"use client";

import { forwardRef } from "react";
import { cx } from "../../../../../styled-system/css";
import { badge } from "../../../../../styled-system/recipes/badge";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	tone?: "neutral" | "blue";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	({ tone = "neutral", className, ...props }, ref) => {
		return (
			<span ref={ref} className={cx(badge({ tone }), className)} {...props} />
		);
	},
);

Badge.displayName = "Badge";
