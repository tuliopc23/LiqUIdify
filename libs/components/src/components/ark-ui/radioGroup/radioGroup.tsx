"use client";

import { RadioGroup as ArkRadioGroup } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { radioGroup } from "../../../../../../styled-system/recipes/radioGroup";

const { withRootProvider, withContext } = createStyleContext(radioGroup);

// Auto-styled Ark UI RadioGroup components with liquid glass
export const RadioGroupRoot = withRootProvider(ArkRadioGroup.Root);
export const RadioGroupItem = withContext(ArkRadioGroup.Item, "item");
export const RadioGroupItemControl = withContext(
	ArkRadioGroup.ItemControl,
	"itemControl",
);
export const RadioGroupItemText = withContext(
	ArkRadioGroup.ItemText,
	"itemText",
);

// Compound component API
export const RadioGroup = {
	Root: RadioGroupRoot,
	Item: RadioGroupItem,
	ItemControl: RadioGroupItemControl,
	ItemText: RadioGroupItemText,
};
