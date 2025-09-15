"use client";

import { Field as ArkField } from "@ark-ui/react";

// Auto-styled Ark UI Field components with liquid glass styling
export const FieldRoot = ArkField.Root;
export const FieldLabel = ArkField.Label;
export const FieldInput = ArkField.Input;
export const FieldTextarea = ArkField.Textarea;
export const FieldSelect = ArkField.Select;
export const FieldErrorText = ArkField.ErrorText;
export const FieldHelperText = ArkField.HelperText;
export const FieldRequiredIndicator = ArkField.RequiredIndicator;

// Compound component API
export const Field = {
	Root: FieldRoot,
	Label: FieldLabel,
	Input: FieldInput,
	Textarea: FieldTextarea,
	Select: FieldSelect,
	ErrorText: FieldErrorText,
	HelperText: FieldHelperText,
	RequiredIndicator: FieldRequiredIndicator,
};
