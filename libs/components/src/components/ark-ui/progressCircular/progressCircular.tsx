"use client";

import { Progress as ArkProgress } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
	type ProgressCircularVariantProps,
	progressCircular,
} from "../../../../../../styled-system/recipes/progress-circular";

export interface ProgressCircularProps
	extends ComponentProps<typeof ArkProgress.Root>,
		ProgressCircularVariantProps {
	label?: string;
	value?: number;
	max?: number;
}

export const ProgressCircular = forwardRef<
	HTMLDivElement,
	ProgressCircularProps
>(
	(
		{ label, value = 0, max = 100, size, children, className, ...props },
		ref,
	) => {
		const [variantProps, restProps] = progressCircular.splitVariantProps({
			size,
		});

		return (
			<ArkProgress.Root
				ref={ref}
				className={[progressCircular(variantProps), className]
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
				<ArkProgress.Circle>
					<ArkProgress.CircleTrack />
					<ArkProgress.CircleRange />
				</ArkProgress.Circle>
				<ArkProgress.ValueText />
			</ArkProgress.Root>
		);
	},
);

ProgressCircular.displayName = "ProgressCircular";
