import {
	compact,
	getSlotCompoundVariant,
	memo,
	splitProps,
} from "../helpers.js";
import { createRecipe } from "./create-recipe.js";

const selectDefaultVariants = {};
const selectCompoundVariants = [];

const selectSlotNames = [
	["trigger", "select__trigger"],
	["content", "select__content"],
	["item", "select__item"],
	["itemText", "select__itemText"],
	["positioner", "select__positioner"],
	["indicator", "select__indicator"],
	["clearTrigger", "select__clearTrigger"],
];
const selectSlotFns = /* @__PURE__ */ selectSlotNames.map(
	([slotName, slotKey]) => [
		slotName,
		createRecipe(
			slotKey,
			selectDefaultVariants,
			getSlotCompoundVariant(selectCompoundVariants, slotName),
		),
	],
);

const selectFn = memo((props = {}) => {
	return Object.fromEntries(
		selectSlotFns.map(([slotName, slotFn]) => [
			slotName,
			slotFn.recipeFn(props),
		]),
	);
});

const selectVariantKeys = [];
const getVariantProps = (variants) => ({
	...selectDefaultVariants,
	...compact(variants),
});

export const select = /* @__PURE__ */ Object.assign(selectFn, {
	__recipe__: false,
	__name__: "select",
	raw: (props) => props,
	classNameMap: {},
	variantKeys: selectVariantKeys,
	variantMap: {},
	splitVariantProps(props) {
		return splitProps(props, selectVariantKeys);
	},
	getVariantProps,
});
