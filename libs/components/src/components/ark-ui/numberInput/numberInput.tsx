"use client";

import { NumberInput as ArkNumberInput } from "@ark-ui/react";
import { createStyleContext } from "../../../../../../styled-system/jsx";
import { numberInput } from "../../../../../../styled-system/recipes/numberInput";

const { withRootProvider, withContext } = createStyleContext(numberInput);

// Auto-styled Ark UI NumberInput components with liquid glass
export const NumberInputRoot = withRootProvider(ArkNumberInput.Root);
export const NumberInputField = withContext(ArkNumberInput.Input, "field");
export const NumberInputIncrementTrigger = withContext(
  ArkNumberInput.IncrementTrigger,
  "incrementTrigger"
);
export const NumberInputDecrementTrigger = withContext(
  ArkNumberInput.DecrementTrigger,
  "decrementTrigger"
);
export const NumberInputScrubber = withContext(ArkNumberInput.Scrubber, "field");

// Compound component API
export const NumberInput = {
  Root: NumberInputRoot,
  Field: NumberInputField,
  IncrementTrigger: NumberInputIncrementTrigger,
  DecrementTrigger: NumberInputDecrementTrigger,
  Scrubber: NumberInputScrubber,
};
