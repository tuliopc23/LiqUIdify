"use client";

import { Collapsible as ArkCollapsible } from "@ark-ui/react";

// Auto-styled Ark UI Collapsible components with liquid glass styling
export const CollapsibleRoot = ArkCollapsible.Root;
export const CollapsibleTrigger = ArkCollapsible.Trigger;
export const CollapsibleContent = ArkCollapsible.Content;
export const CollapsibleIndicator = ArkCollapsible.Indicator;

// Compound component API
export const Collapsible = {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
  Indicator: CollapsibleIndicator,
};
