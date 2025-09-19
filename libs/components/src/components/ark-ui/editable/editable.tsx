"use client";

import { Editable as ArkEditable } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { editable } from "../../../../../../styled-system/recipes/editable";

type EditableRootProps = ComponentPropsWithoutRef<typeof ArkEditable.Root> & {
	className?: string;
};

// Auto-styled Ark UI Editable components with liquid glass styling
export const EditableRoot = forwardRef<
	ElementRef<typeof ArkEditable.Root>,
	EditableRootProps
>(({ className, ...props }, ref) => (
	<ArkEditable.Root
		ref={ref}
		className={cx(editable(), className)}
		{...props}
	/>
));

EditableRoot.displayName = "EditableRoot";
export const EditableArea = ArkEditable.Area;
export const EditableInput = ArkEditable.Input;
export const EditablePreview = ArkEditable.Preview;
export const EditableControl = ArkEditable.Control;
export const EditableEditTrigger = ArkEditable.EditTrigger;
export const EditableSubmitTrigger = ArkEditable.SubmitTrigger;
export const EditableCancelTrigger = ArkEditable.CancelTrigger;

// Compound component API
export const Editable = {
	Root: EditableRoot,
	Area: EditableArea,
	Input: EditableInput,
	Preview: EditablePreview,
	Control: EditableControl,
	EditTrigger: EditableEditTrigger,
	SubmitTrigger: EditableSubmitTrigger,
	CancelTrigger: EditableCancelTrigger,
};
