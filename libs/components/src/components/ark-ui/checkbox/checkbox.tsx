"use client";

import { Checkbox as ArkCheckbox } from "@ark-ui/react";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
	type CheckboxVariantProps,
	checkbox,
} from "../../../../../../styled-system/recipes/checkbox";
import { useInteractiveGlass } from "../../../hooks/useInteractiveGlass";

export interface CheckboxProps
	extends ComponentProps<typeof ArkCheckbox.Root>,
		CheckboxVariantProps {
	label?: string;
	/**
	 * Enable spring physics for touch interactions
	 * @default true
	 */
	springPhysics?: boolean;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
	(
		{ label, size, children, className, springPhysics = true, ...props },
		ref,
	) => {
		const [variantProps, restProps] = checkbox.splitVariantProps({ size });
		const spring = useInteractiveGlass({ intensity: "subtle" });
		const classes = [checkbox(variantProps), className]
			.filter(Boolean)
			.join(" ");

		if (springPhysics && !spring.reducedMotion) {
			return (
				<ArkCheckbox.Root asChild ref={ref} {...restProps} {...props}>
					<motion.div
						className={classes}
						style={{ scale: spring.scale, y: spring.y }}
						{...spring.interactions}
					>
						<ArkCheckbox.Control>
							<ArkCheckbox.Indicator>✓</ArkCheckbox.Indicator>
						</ArkCheckbox.Control>
						{(label || children) && (
							<ArkCheckbox.Label>{label || children}</ArkCheckbox.Label>
						)}
					</motion.div>
				</ArkCheckbox.Root>
			);
		}

		return (
			<ArkCheckbox.Root ref={ref} className={classes} {...restProps} {...props}>
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
