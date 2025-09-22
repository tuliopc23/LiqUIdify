"use client";

import { Field as ArkField } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { field } from "../../../../../../styled-system/recipes/field";

type FieldRootProps = ComponentPropsWithoutRef<typeof ArkField.Root> & {
	className?: string;
};

// Auto-styled Ark UI Field components with liquid glass styling
export const FieldRoot = forwardRef<
	ElementRef<typeof ArkField.Root>,
	FieldRootProps
>(({ className, ...props }, ref) => (
	<ArkField.Root ref={ref} className={cx(field(), className)} {...props} />
));

FieldRoot.displayName = "FieldRoot";
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
