"use client";

import { Timer as ArkTimer } from "@ark-ui/react";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import { timer } from "../../../../../../styled-system/recipes/timer";

export interface TimerProps extends ComponentProps<typeof ArkTimer.Root> {
	startMs?: number;
	targetMs?: number;
	countdown?: boolean;
}

export const Timer = forwardRef<HTMLDivElement, TimerProps>(
	({ startMs, targetMs, countdown, className, children, ...props }, ref) => {
		return (
			<ArkTimer.Root
				ref={ref}
				className={[timer(), className].filter(Boolean).join(" ")}
				startMs={startMs}
				targetMs={targetMs}
				countdown={countdown}
				{...props}
			>
				<ArkTimer.Area>
					<ArkTimer.Item type="days" />
					<ArkTimer.Separator>:</ArkTimer.Separator>
					<ArkTimer.Item type="hours" />
					<ArkTimer.Separator>:</ArkTimer.Separator>
					<ArkTimer.Item type="minutes" />
					<ArkTimer.Separator>:</ArkTimer.Separator>
					<ArkTimer.Item type="seconds" />
				</ArkTimer.Area>
				<ArkTimer.Control>
					<ArkTimer.ActionTrigger action="start">Start</ArkTimer.ActionTrigger>
					<ArkTimer.ActionTrigger action="pause">Pause</ArkTimer.ActionTrigger>
					<ArkTimer.ActionTrigger action="resume">
						Resume
					</ArkTimer.ActionTrigger>
					<ArkTimer.ActionTrigger action="reset">Reset</ArkTimer.ActionTrigger>
				</ArkTimer.Control>
				{children}
			</ArkTimer.Root>
		);
	},
);

Timer.displayName = "Timer";
