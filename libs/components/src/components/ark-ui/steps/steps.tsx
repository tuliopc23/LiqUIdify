"use client";

import { Steps as ArkSteps } from "@ark-ui/react";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cx } from "styled-system/css";
import { steps as stepsRecipe } from "styled-system/recipes/steps";

type StepsRootProps = ComponentPropsWithoutRef<typeof ArkSteps.Root> & {
	className?: string;
};

// Auto-styled Ark UI Steps components with liquid glass styling
export const StepsRoot = forwardRef<
	ElementRef<typeof ArkSteps.Root>,
	StepsRootProps
>(({ className, ...props }, ref) => (
	<ArkSteps.Root
		ref={ref}
		className={cx(stepsRecipe(), className)}
		{...props}
	/>
));

StepsRoot.displayName = "StepsRoot";
export const StepsList = ArkSteps.List;
export const StepsItem = ArkSteps.Item;
export const StepsTrigger = ArkSteps.Trigger;
export const StepsIndicator = ArkSteps.Indicator;
export const StepsSeparator = ArkSteps.Separator;
export const StepsContent = ArkSteps.Content;
export const StepsCompletedContent = ArkSteps.CompletedContent;
export const StepsNextTrigger = ArkSteps.NextTrigger;
export const StepsPrevTrigger = ArkSteps.PrevTrigger;
export const StepsProgress = ArkSteps.Progress;

// Compound component API
export const Steps = {
	Root: StepsRoot,
	List: StepsList,
	Item: StepsItem,
	Trigger: StepsTrigger,
	Indicator: StepsIndicator,
	Separator: StepsSeparator,
	Content: StepsContent,
	CompletedContent: StepsCompletedContent,
	NextTrigger: StepsNextTrigger,
	PrevTrigger: StepsPrevTrigger,
	Progress: StepsProgress,
};
