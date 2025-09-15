"use client";

import { AngleSlider as ArkAngleSlider } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
	type AngleSliderVariantProps,
	angleSlider,
} from "../../../../../../styled-system/recipes/angle-slider";

export interface AngleSliderProps
	extends ComponentProps<typeof ArkAngleSlider.Root>,
		AngleSliderVariantProps {
	label?: string;
}

export const AngleSlider = forwardRef<HTMLDivElement, AngleSliderProps>(
	({ label, size, children, className, ...props }, ref) => {
		const [variantProps, restProps] = angleSlider.splitVariantProps({ size });

		return (
			<ArkAngleSlider.Root
				ref={ref}
				className={[angleSlider(variantProps), className]
					.filter(Boolean)
					.join(" ")}
				{...restProps}
				{...props}
			>
				{(label || children) && (
					<ArkAngleSlider.Label>{label || children}</ArkAngleSlider.Label>
				)}
				<ArkAngleSlider.Control>
					<ArkAngleSlider.Thumb />
				</ArkAngleSlider.Control>
				<ArkAngleSlider.ValueText />
				<ArkAngleSlider.HiddenInput />
			</ArkAngleSlider.Root>
		);
	},
);

AngleSlider.displayName = "AngleSlider";
