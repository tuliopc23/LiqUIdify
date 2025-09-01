"use client";

import { Progress as ArkProgress } from "@ark-ui/react";

// Auto-styled Ark UI Progress components with liquid glass styling (Linear)
export const ProgressLinearRoot = ArkProgress.Root;
export const ProgressLinearLabel = ArkProgress.Label;
export const ProgressLinearValueText = ArkProgress.ValueText;
export const ProgressLinearView = ArkProgress.View;
export const ProgressLinearTrack = ArkProgress.Track;
export const ProgressLinearRange = ArkProgress.Range;

// Compound component API
export const ProgressLinear = {
  Root: ProgressLinearRoot,
  Label: ProgressLinearLabel,
  ValueText: ProgressLinearValueText,
  View: ProgressLinearView,
  Track: ProgressLinearTrack,
  Range: ProgressLinearRange,
};
