"use client";

import { Slider as ArkSlider } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
	type SliderVariantProps,
	slider,
} from "../../../../../../styled-system/recipes/slider";

export interface SliderProps
	extends ComponentProps<typeof ArkSlider.Root>,
		SliderVariantProps {
	label?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
	({ label, size, children, className, ...props }, ref) => {
		const [variantProps, restProps] = slider.splitVariantProps({ size });

		return (
			<ArkSlider.Root
				ref={ref}
				className={[slider(variantProps), className].filter(Boolean).join(" ")}
				{...restProps}
				{...props}
			>
				{(label || children) && (
					<ArkSlider.Label>{label || children}</ArkSlider.Label>
				)}
				<ArkSlider.Control>
					<ArkSlider.Track>
						<ArkSlider.Range />
					</ArkSlider.Track>
					<ArkSlider.Thumb index={0} />
				</ArkSlider.Control>
			</ArkSlider.Root>
		);
	},
);

Slider.displayName = "Slider";
