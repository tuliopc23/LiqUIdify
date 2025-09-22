"use client";

import { HoverCard as ArkHoverCard } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { hoverCard } from "../../../../../../styled-system/recipes/hover-card";

type HoverCardContentProps = ComponentPropsWithoutRef<
	typeof ArkHoverCard.Content
>;

// Auto-styled Ark UI HoverCard components with liquid glass styling
export const HoverCardRoot = ArkHoverCard.Root;
export const HoverCardTrigger = ArkHoverCard.Trigger;
export const HoverCardPositioner = ArkHoverCard.Positioner;
export const HoverCardContent = forwardRef<
	ElementRef<typeof ArkHoverCard.Content>,
	HoverCardContentProps
>(({ className, ...props }, ref) => (
	<ArkHoverCard.Content
		ref={ref}
		className={cx(hoverCard(), className)}
		{...props}
	/>
));

HoverCardContent.displayName = "HoverCardContent";
export const HoverCardArrow = ArkHoverCard.Arrow;
export const HoverCardArrowTip = ArkHoverCard.ArrowTip;

// Compound component API
export const HoverCard = {
	Root: HoverCardRoot,
	Trigger: HoverCardTrigger,
	Positioner: HoverCardPositioner,
	Content: HoverCardContent,
	Arrow: HoverCardArrow,
	ArrowTip: HoverCardArrowTip,
};
