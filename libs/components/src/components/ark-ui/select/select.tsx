"use client";

import { Select as ArkSelect } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { select } from "../../../../../../styled-system/recipes/select";

const { withRootProvider, withContext } = createStyleContext(select);

// Auto-styled Ark UI Select components with liquid glass
export const SelectRoot = withRootProvider(ArkSelect.Root);
export const SelectTrigger = withContext(ArkSelect.Trigger, "trigger");
export const SelectPositioner = withContext(ArkSelect.Positioner, "positioner");
export const SelectContent = withContext(ArkSelect.Content, "content");
export const SelectItem = withContext(ArkSelect.Item, "item");
export const SelectItemText = withContext(ArkSelect.ItemText, "itemText");
export const SelectIndicator = withContext(ArkSelect.Indicator, "indicator");
export const SelectClearTrigger = withContext(
	ArkSelect.ClearTrigger,
	"clearTrigger",
);

// Compound component API
export const Select = {
	Root: SelectRoot,
	Trigger: SelectTrigger,
	Positioner: SelectPositioner,
	Content: SelectContent,
	Item: SelectItem,
	ItemText: SelectItemText,
	Indicator: SelectIndicator,
	ClearTrigger: SelectClearTrigger,
};
