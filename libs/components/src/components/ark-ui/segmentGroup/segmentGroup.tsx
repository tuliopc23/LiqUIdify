"use client";

import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/react";

// Auto-styled Ark UI SegmentGroup components with liquid glass styling
export const SegmentGroupRoot = ArkSegmentGroup.Root;
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
