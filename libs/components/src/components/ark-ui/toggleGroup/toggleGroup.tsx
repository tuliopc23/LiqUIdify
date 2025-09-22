"use client";

import { ToggleGroup as ArkToggleGroup } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { toggleGroup } from "../../../../../../styled-system/recipes/toggle-group";

type ToggleGroupRootProps = ComponentPropsWithoutRef<
	typeof ArkToggleGroup.Root
> & {
	className?: string;
};

// Auto-styled Ark UI ToggleGroup components with liquid glass styling
export const ToggleGroupRoot = forwardRef<
	ElementRef<typeof ArkToggleGroup.Root>,
	ToggleGroupRootProps
>(({ className, ...props }, ref) => (
	<ArkToggleGroup.Root
		ref={ref}
		className={cx(toggleGroup(), className)}
		{...props}
	/>
));

ToggleGroupRoot.displayName = "ToggleGroupRoot";
export const ToggleGroupItem = ArkToggleGroup.Item;

// Compound component API
export const ToggleGroup = {
	Root: ToggleGroupRoot,
	Item: ToggleGroupItem,
};
