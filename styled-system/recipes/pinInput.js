import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const pinInputFn = /* @__PURE__ */ createRecipe(
	"pin-input",
	{
		size: "md",
	},
	[],
);

const pinInputVariantMap = {
	size: ["sm", "md", "lg"],
};

const pinInputVariantKeys = Object.keys(pinInputVariantMap);

export const pinInput = /* @__PURE__ */ Object.assign(
	memo(pinInputFn.recipeFn),
	{
		__recipe__: true,
		__name__: "pinInput",
		__getCompoundVariantCss__: pinInputFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: pinInputVariantKeys,
		variantMap: pinInputVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, pinInputVariantKeys);
		},
		getVariantProps: pinInputFn.getVariantProps,
	},
);
