"use client";

import { Clipboard as ArkClipboard } from "@ark-ui/react";

// Auto-styled Ark UI Clipboard components with liquid glass styling
export const ClipboardRoot = ArkClipboard.Root;
export const ClipboardControl = ArkClipboard.Control;
export const ClipboardInput = ArkClipboard.Input;
export const ClipboardLabel = ArkClipboard.Label;
export const ClipboardTrigger = ArkClipboard.Trigger;
export const ClipboardIndicator = ArkClipboard.Indicator;
export const ClipboardValueText = ArkClipboard.ValueText;

// Compound component API
export const Clipboard = {
	Root: ClipboardRoot,
	Control: ClipboardControl,
	Input: ClipboardInput,
	Label: ClipboardLabel,
	Trigger: ClipboardTrigger,
	Indicator: ClipboardIndicator,
	ValueText: ClipboardValueText,
};
