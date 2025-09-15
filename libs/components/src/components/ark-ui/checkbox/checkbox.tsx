"use client";

import { Checkbox as ArkCheckbox } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
	type CheckboxVariantProps,
	checkbox,
} from "../../../../../../styled-system/recipes/checkbox";

export interface CheckboxProps
	extends ComponentProps<typeof ArkCheckbox.Root>,
		CheckboxVariantProps {
	label?: string;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
	({ label, size, children, className, ...props }, ref) => {
		const [variantProps, restProps] = checkbox.splitVariantProps({ size });

		return (
			<ArkCheckbox.Root
				ref={ref}
				className={[checkbox(variantProps), className]
					.filter(Boolean)
					.join(" ")}
				{...restProps}
				{...props}
			>
				<ArkCheckbox.Control>
					<ArkCheckbox.Indicator>✓</ArkCheckbox.Indicator>
				</ArkCheckbox.Control>
				{(label || children) && (
					<ArkCheckbox.Label>{label || children}</ArkCheckbox.Label>
				)}
			</ArkCheckbox.Root>
		);
	},
);

Checkbox.displayName = "Checkbox";
