"use client";

import { Fieldset as ArkFieldset } from "@ark-ui/react";

// Auto-styled Ark UI Fieldset components with liquid glass styling
export const FieldsetRoot = ArkFieldset.Root;
export const FieldsetLegend = ArkFieldset.Legend;
export const FieldsetHelperText = ArkFieldset.HelperText;
export const FieldsetErrorText = ArkFieldset.ErrorText;

// Compound component API
export const Fieldset = {
	Root: FieldsetRoot,
	Legend: FieldsetLegend,
	HelperText: FieldsetHelperText,
	ErrorText: FieldsetErrorText,
};
