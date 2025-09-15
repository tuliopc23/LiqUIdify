"use client";

import { Progress as ArkProgress } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
	type ProgressLinearVariantProps,
	progressLinear,
} from "../../../../../../styled-system/recipes/progress-linear";

export interface ProgressLinearProps
	extends ComponentProps<typeof ArkProgress.Root>,
		ProgressLinearVariantProps {
	label?: string;
	value?: number;
	max?: number;
}

export const ProgressLinear = forwardRef<HTMLDivElement, ProgressLinearProps>(
	(
		{ label, value = 0, max = 100, size, children, className, ...props },
		ref,
	) => {
		const [variantProps, restProps] = progressLinear.splitVariantProps({
			size,
		});

		return (
			<ArkProgress.Root
				ref={ref}
				className={[progressLinear(variantProps), className]
					.filter(Boolean)
					.join(" ")}
				value={value}
				max={max}
				{...restProps}
				{...props}
			>
				{(label || children) && (
					<ArkProgress.Label>{label || children}</ArkProgress.Label>
				)}
				<ArkProgress.Track>
					<ArkProgress.Range />
				</ArkProgress.Track>
				<ArkProgress.ValueText />
			</ArkProgress.Root>
		);
	},
);

ProgressLinear.displayName = "ProgressLinear";
