"use client";

import { Popover as ArkPopover } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { popover } from "../../../../../../styled-system/recipes/popover";

const { withRootProvider, withContext } = createStyleContext(popover);

// Auto-styled Ark UI Popover components with liquid glass
export const PopoverRoot = withRootProvider(ArkPopover.Root);
export const PopoverTrigger = withContext(ArkPopover.Trigger, "trigger");
export const PopoverPositioner = withContext(ArkPopover.Positioner, "positioner");
export const PopoverContent = withContext(ArkPopover.Content, "content");
export const PopoverTitle = withContext(ArkPopover.Title, "title");
export const PopoverDescription = withContext(ArkPopover.Description, "description");
export const PopoverCloseTrigger = withContext(ArkPopover.CloseTrigger, "closeTrigger");

// Compound component API
export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Positioner: PopoverPositioner,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  CloseTrigger: PopoverCloseTrigger,
};
