"use client";

import { Tooltip as ArkTooltip } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { tooltip } from "../../../../../../styled-system/recipes/tooltip";

const { withRootProvider, withContext } = createStyleContext(tooltip);

// Auto-styled Ark UI Tooltip components with liquid glass
export const TooltipRoot = withRootProvider(ArkTooltip.Root);
export const TooltipContent = withContext(ArkTooltip.Content, "content");
export const TooltipPositioner = withContext(
	ArkTooltip.Positioner,
	"positioner",
);
export const TooltipTrigger = withContext(ArkTooltip.Trigger, "trigger");

// Compound component API
export const Tooltip = {
	Root: TooltipRoot,
	Content: TooltipContent,
	Positioner: TooltipPositioner,
	Trigger: TooltipTrigger,
};
