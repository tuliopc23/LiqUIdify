"use client";

import { Steps as ArkSteps } from "@ark-ui/react";

// Auto-styled Ark UI Steps components with liquid glass styling
export const StepsRoot = ArkSteps.Root;
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
