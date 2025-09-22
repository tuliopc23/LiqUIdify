"use client";

import { SignaturePad as ArkSignaturePad } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { signaturePad } from "../../../../../../styled-system/recipes/signature-pad";

type SignaturePadRootProps = ComponentPropsWithoutRef<
	typeof ArkSignaturePad.Root
> & {
	className?: string;
};

// Auto-styled Ark UI SignaturePad components with liquid glass styling
export const SignaturePadRoot = forwardRef<
	ElementRef<typeof ArkSignaturePad.Root>,
	SignaturePadRootProps
>(({ className, ...props }, ref) => (
	<ArkSignaturePad.Root
		ref={ref}
		className={cx(signaturePad(), className)}
		{...props}
	/>
));

SignaturePadRoot.displayName = "SignaturePadRoot";
export const SignaturePadLabel = ArkSignaturePad.Label;
export const SignaturePadControl = ArkSignaturePad.Control;
export const SignaturePadSegment = ArkSignaturePad.Segment;
export const SignaturePadClearTrigger = ArkSignaturePad.ClearTrigger;
export const SignaturePadGuide = ArkSignaturePad.Guide;

// Compound component API
export const SignaturePad = {
	Root: SignaturePadRoot,
	Label: SignaturePadLabel,
	Control: SignaturePadControl,
	Segment: SignaturePadSegment,
	ClearTrigger: SignaturePadClearTrigger,
	Guide: SignaturePadGuide,
};
