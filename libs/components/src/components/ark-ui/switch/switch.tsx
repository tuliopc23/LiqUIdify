"use client";

import { Switch as ArkSwitch } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
	type SwitchToggleVariantProps,
	switchToggle,
} from "../../../../../../styled-system/recipes/switch-toggle";

export interface SwitchProps
	extends ComponentProps<typeof ArkSwitch.Root>,
		SwitchToggleVariantProps {
	label?: string;
	springPhysics?: boolean;
}

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
	({ label, size, children, className, ...props }, ref) => {
		const [variantProps, restProps] = switchToggle.splitVariantProps({ size });
		const classes = [switchToggle(variantProps), className]
			.filter(Boolean)
			.join(" ");

		return (
			<ArkSwitch.Root ref={ref} className={classes} {...restProps} {...props}>
				<ArkSwitch.Control>
					<ArkSwitch.Thumb />
				</ArkSwitch.Control>
				{(label || children) && (
					<ArkSwitch.Label>{label || children}</ArkSwitch.Label>
				)}
			</ArkSwitch.Root>
		);
	},
);

Switch.displayName = "Switch";
