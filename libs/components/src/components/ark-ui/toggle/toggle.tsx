"use client";

import { Toggle as ArkToggle } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { toggle } from "../../../../../../styled-system/recipes/toggle";

type ToggleRootProps = ComponentPropsWithoutRef<typeof ArkToggle.Root> & {
	className?: string;
};

// Auto-styled Ark UI Toggle component with liquid glass styling
export const ToggleRoot = forwardRef<
	ElementRef<typeof ArkToggle.Root>,
	ToggleRootProps
>(({ className, ...props }, ref) => (
	<ArkToggle.Root ref={ref} className={cx(toggle(), className)} {...props} />
));

ToggleRoot.displayName = "ToggleRoot";

// Compound component API
export const Toggle = {
	Root: ToggleRoot,
};
