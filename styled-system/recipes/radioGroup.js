import {
	compact,
	getSlotCompoundVariant,
	memo,
	splitProps,
} from "../helpers.js";
import { createRecipe } from "./create-recipe.js";

const radioGroupDefaultVariants = {};
const radioGroupCompoundVariants = [];

const radioGroupSlotNames = [
	["root", "radio-group__root"],
	["item", "radio-group__item"],
	["itemControl", "radio-group__itemControl"],
	["itemText", "radio-group__itemText"],
];
const radioGroupSlotFns = /* @__PURE__ */ radioGroupSlotNames.map(
	([slotName, slotKey]) => [
		slotName,
		createRecipe(
			slotKey,
			radioGroupDefaultVariants,
			getSlotCompoundVariant(radioGroupCompoundVariants, slotName),
		),
	],
);

const radioGroupFn = memo((props = {}) => {
	return Object.fromEntries(
		radioGroupSlotFns.map(([slotName, slotFn]) => [
			slotName,
			slotFn.recipeFn(props),
		]),
	);
});

const radioGroupVariantKeys = [];
const getVariantProps = (variants) => ({
	...radioGroupDefaultVariants,
	...compact(variants),
});

export const radioGroup = /* @__PURE__ */ Object.assign(radioGroupFn, {
	__recipe__: false,
	__name__: "radioGroup",
	raw: (props) => props,
	classNameMap: {},
	variantKeys: radioGroupVariantKeys,
	variantMap: {},
	splitVariantProps(props) {
		return splitProps(props, radioGroupVariantKeys);
	},
	getVariantProps,
});
