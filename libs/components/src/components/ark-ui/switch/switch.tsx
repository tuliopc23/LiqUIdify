"use client";

import { Switch as ArkSwitch } from "@ark-ui/react";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
	type SwitchToggleVariantProps,
	switchToggle,
} from "../../../../../../styled-system/recipes/switch-toggle";
import { useInteractiveGlass } from "../../../hooks/useInteractiveGlass";

export interface SwitchProps
	extends ComponentProps<typeof ArkSwitch.Root>,
		SwitchToggleVariantProps {
	label?: string;
	/**
	 * Enable spring physics for touch interactions
	 * @default true
	 */
	springPhysics?: boolean;
}

export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
	(
		{ label, size, children, className, springPhysics = true, ...props },
		ref,
	) => {
		const [variantProps, restProps] = switchToggle.splitVariantProps({ size });
		const spring = useInteractiveGlass({ intensity: "medium" });
		const classes = [switchToggle(variantProps), className]
			.filter(Boolean)
			.join(" ");

		if (springPhysics && !spring.reducedMotion) {
			return (
				<ArkSwitch.Root asChild ref={ref} {...restProps} {...props}>
					<motion.div
						className={classes}
						style={{ scale: spring.scale, y: spring.y }}
						{...spring.interactions}
					>
						<ArkSwitch.Control>
							<ArkSwitch.Thumb />
						</ArkSwitch.Control>
						{(label || children) && (
							<ArkSwitch.Label>{label || children}</ArkSwitch.Label>
						)}
					</motion.div>
				</ArkSwitch.Root>
			);
		}

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
