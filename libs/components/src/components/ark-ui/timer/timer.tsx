"use client";

import { Timer as ArkTimer } from "@ark-ui/react";

// Auto-styled Ark UI Timer components with liquid glass styling
export const TimerRoot = ArkTimer.Root;
export const TimerArea = ArkTimer.Area;
export const TimerItem = ArkTimer.Item;
export const TimerSeparator = ArkTimer.Separator;
export const TimerControl = ArkTimer.Control;
export const TimerActionTrigger = ArkTimer.ActionTrigger;

// Compound component API
export const Timer = {
	Root: TimerRoot,
	Area: TimerArea,
	Item: TimerItem,
	Separator: TimerSeparator,
	Control: TimerControl,
	ActionTrigger: TimerActionTrigger,
};
