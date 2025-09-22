"use client";

import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { segmentGroup } from "../../../../../../styled-system/recipes/segment-group";

type SegmentGroupRootProps = ComponentPropsWithoutRef<
	typeof ArkSegmentGroup.Root
> & {
	className?: string;
};

// Auto-styled Ark UI SegmentGroup components with liquid glass styling
export const SegmentGroupRoot = forwardRef<
	ElementRef<typeof ArkSegmentGroup.Root>,
	SegmentGroupRootProps
>(({ className, ...props }, ref) => (
	<ArkSegmentGroup.Root
		ref={ref}
		className={cx(segmentGroup(), className)}
		{...props}
	/>
));

SegmentGroupRoot.displayName = "SegmentGroupRoot";
export const SegmentGroupIndicator = ArkSegmentGroup.Indicator;
export const SegmentGroupItem = ArkSegmentGroup.Item;
export const SegmentGroupItemText = ArkSegmentGroup.ItemText;
export const SegmentGroupItemControl = ArkSegmentGroup.ItemControl;

// Compound component API
export const SegmentGroup = {
	Root: SegmentGroupRoot,
	Indicator: SegmentGroupIndicator,
	Item: SegmentGroupItem,
	ItemText: SegmentGroupItemText,
	ItemControl: SegmentGroupItemControl,
};
