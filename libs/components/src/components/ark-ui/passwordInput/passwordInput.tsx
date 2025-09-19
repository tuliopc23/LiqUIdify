"use client";

import { PasswordInput as ArkPasswordInput } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "../../../../../../styled-system/css";
import { passwordInput } from "../../../../../../styled-system/recipes/password-input";

type PasswordInputRootProps = ComponentPropsWithoutRef<typeof ArkPasswordInput.Root> & {
	className?: string;
};

// Auto-styled Ark UI PasswordInput components with liquid glass styling
export const PasswordInputRoot = forwardRef<
	ElementRef<typeof ArkPasswordInput.Root>,
	PasswordInputRootProps
>(({ className, ...props }, ref) => (
	<ArkPasswordInput.Root
		ref={ref}
		className={cx(passwordInput(), className)}
		{...props}
	/>
));

PasswordInputRoot.displayName = "PasswordInputRoot";
export const PasswordInputInput = ArkPasswordInput.Input;
export const PasswordInputVisibilityTrigger =
	ArkPasswordInput.VisibilityTrigger;

// Compound component API
export const PasswordInput = {
	Root: PasswordInputRoot,
	Input: PasswordInputInput,
	VisibilityTrigger: PasswordInputVisibilityTrigger,
};
