"use client";

import { Menu as ArkMenu } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { menu } from "../../../../../../styled-system/recipes/menu";

const { withRootProvider, withContext } = createStyleContext(menu);

// Auto-styled Ark UI Menu components with liquid glass
export const MenuRoot = withRootProvider(ArkMenu.Root);
export const MenuTrigger = withContext(ArkMenu.Trigger, "trigger");
export const MenuPositioner = withContext(ArkMenu.Positioner, "positioner");
export const MenuContent = withContext(ArkMenu.Content, "content");
export const MenuItem = withContext(ArkMenu.Item, "item");
export const MenuItemText = withContext(ArkMenu.ItemText, "itemText");
export const MenuSeparator = withContext(ArkMenu.Separator, "separator");

// Compound component API
export const Menu = {
	Root: MenuRoot,
	Trigger: MenuTrigger,
	Positioner: MenuPositioner,
	Content: MenuContent,
	Item: MenuItem,
	ItemText: MenuItemText,
	Separator: MenuSeparator,
};
