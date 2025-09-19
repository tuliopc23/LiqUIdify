"use client";

import { Fieldset as ArkFieldset } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { fieldset } from "../../../../../../styled-system/recipes/fieldset";

type FieldsetRootProps = ComponentPropsWithoutRef<typeof ArkFieldset.Root> & {
	className?: string;
};

// Auto-styled Ark UI Fieldset components with liquid glass styling
export const FieldsetRoot = forwardRef<
	ElementRef<typeof ArkFieldset.Root>,
	FieldsetRootProps
>(({ className, ...props }, ref) => (
	<ArkFieldset.Root
		ref={ref}
		className={cx(fieldset(), className)}
		{...props}
	/>
));

FieldsetRoot.displayName = "FieldsetRoot";
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
