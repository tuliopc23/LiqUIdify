"use client";

import { forwardRef } from "react";
import { cx } from "../../../../../styled-system/css";
import { symbolTile } from "../../../../../styled-system/recipes/symbol-tile";

export interface SymbolTileProps extends React.HTMLAttributes<HTMLSpanElement> {
	tint?: "gray" | "blue" | "indigo" | "teal";
	children?: React.ReactNode;
}

export const SymbolTile = forwardRef<HTMLSpanElement, SymbolTileProps>(
	({ tint = "gray", className, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={cx(symbolTile({ tint }), className)}
				{...props}
			>
				{children}
			</span>
		);
	},
);

SymbolTile.displayName = "SymbolTile";
