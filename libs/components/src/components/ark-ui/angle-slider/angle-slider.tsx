"use client";

import { AngleSlider as ArkAngleSlider } from "@ark-ui/react";

// Auto-styled Ark UI Angle Slider components with liquid glass styling
export const AngleSliderRoot = ArkAngleSlider.Root;
export const AngleSliderControl = ArkAngleSlider.Control;
export const AngleSliderHiddenInput = ArkAngleSlider.HiddenInput;
export const AngleSliderLabel = ArkAngleSlider.Label;
export const AngleSliderMarkerGroup = ArkAngleSlider.MarkerGroup;
export const AngleSliderMarker = ArkAngleSlider.Marker;
export const AngleSliderThumb = ArkAngleSlider.Thumb;
export const AngleSliderValueText = ArkAngleSlider.ValueText;

// Compound component API
export const AngleSlider = {
  Root: AngleSliderRoot,
  Control: AngleSliderControl,
  HiddenInput: AngleSliderHiddenInput,
  Label: AngleSliderLabel,
  MarkerGroup: AngleSliderMarkerGroup,
  Marker: AngleSliderMarker,
  Thumb: AngleSliderThumb,
  ValueText: AngleSliderValueText,
};
