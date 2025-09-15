"use client";

import { Tabs as ArkTabs } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { tabs } from "../../../../../../styled-system/recipes/tabs";

const { withRootProvider, withContext } = createStyleContext(tabs);

// Auto-styled Ark UI Tabs components with liquid glass
export const TabsRoot = withRootProvider(ArkTabs.Root);
export const TabsList = withContext(ArkTabs.List, "list");
export const TabsTrigger = withContext(ArkTabs.Trigger, "trigger");
export const TabsContent = withContext(ArkTabs.Content, "content");
export const TabsIndicator = withContext(ArkTabs.Indicator, "indicator");

// Compound component API
export const Tabs = {
	Root: TabsRoot,
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
	Indicator: TabsIndicator,
};
