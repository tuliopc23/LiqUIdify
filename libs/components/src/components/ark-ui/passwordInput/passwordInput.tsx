"use client";

import { PasswordInput as ArkPasswordInput } from "@ark-ui/react";

// Auto-styled Ark UI PasswordInput components with liquid glass styling
export const PasswordInputRoot = ArkPasswordInput.Root;
export const PasswordInputInput = ArkPasswordInput.Input;
export const PasswordInputVisibilityTrigger =
	ArkPasswordInput.VisibilityTrigger;

// Compound component API
export const PasswordInput = {
	Root: PasswordInputRoot,
	Input: PasswordInputInput,
	VisibilityTrigger: PasswordInputVisibilityTrigger,
};
