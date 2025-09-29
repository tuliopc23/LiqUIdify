"use client";

import { forwardRef } from "react";
import { cx } from "../../../../../styled-system/css";
import { card } from "../../../../../styled-system/recipes/card";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "solid" | "glass" | "elevated";
	padded?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
	({ variant = "solid", padded = true, className, style, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cx(card({ variant, padded }), className)}
				style={style}
				{...props}
			/>
		);
	},
);

Card.displayName = "Card";
