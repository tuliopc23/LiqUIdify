"use client";

import { Combobox as ArkCombobox } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { combobox } from "../../../../../../styled-system/recipes/combobox";

const { withRootProvider, withContext } = createStyleContext(combobox);

// Auto-styled Ark UI Combobox components with liquid glass
export const ComboboxRoot = withRootProvider(ArkCombobox.Root);
export const ComboboxTrigger = withContext(ArkCombobox.Trigger, "trigger");
export const ComboboxInput = withContext(ArkCombobox.Input, "input");
export const ComboboxPositioner = withContext(
	ArkCombobox.Positioner,
	"positioner",
);
export const ComboboxContent = withContext(ArkCombobox.Content, "content");
export const ComboboxItem = withContext(ArkCombobox.Item, "item");
export const ComboboxItemText = withContext(ArkCombobox.ItemText, "itemText");
export const ComboboxClearTrigger = withContext(
	ArkCombobox.ClearTrigger,
	"trigger",
);

// Compound component API
export const Combobox = {
	Root: ComboboxRoot,
	Trigger: ComboboxTrigger,
	Input: ComboboxInput,
	Positioner: ComboboxPositioner,
	Content: ComboboxContent,
	Item: ComboboxItem,
	ItemText: ComboboxItemText,
	ClearTrigger: ComboboxClearTrigger,
};
