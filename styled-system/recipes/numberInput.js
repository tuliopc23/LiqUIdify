import {
	compact,
	getSlotCompoundVariant,
	memo,
	splitProps,
} from "../helpers.js";
import { createRecipe } from "./create-recipe.js";

const numberInputDefaultVariants = {};
const numberInputCompoundVariants = [];

const numberInputSlotNames = [
	["root", "number-input__root"],
	["field", "number-input__field"],
	["incrementTrigger", "number-input__incrementTrigger"],
	["decrementTrigger", "number-input__decrementTrigger"],
];
const numberInputSlotFns = /* @__PURE__ */ numberInputSlotNames.map(
	([slotName, slotKey]) => [
		slotName,
		createRecipe(
			slotKey,
			numberInputDefaultVariants,
			getSlotCompoundVariant(numberInputCompoundVariants, slotName),
		),
	],
);

const numberInputFn = memo((props = {}) => {
	return Object.fromEntries(
		numberInputSlotFns.map(([slotName, slotFn]) => [
			slotName,
			slotFn.recipeFn(props),
		]),
	);
});

const numberInputVariantKeys = [];
const getVariantProps = (variants) => ({
	...numberInputDefaultVariants,
	...compact(variants),
});

export const numberInput = /* @__PURE__ */ Object.assign(numberInputFn, {
	__recipe__: false,
	__name__: "numberInput",
	raw: (props) => props,
	classNameMap: {},
	variantKeys: numberInputVariantKeys,
	variantMap: {},
	splitVariantProps(props) {
		return splitProps(props, numberInputVariantKeys);
	},
	getVariantProps,
});
