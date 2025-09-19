import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const fieldsetFn = /* @__PURE__ */ createRecipe("fieldset", {}, []);

const fieldsetVariantMap = {};

const fieldsetVariantKeys = Object.keys(fieldsetVariantMap);

export const fieldset = /* @__PURE__ */ Object.assign(
	memo(fieldsetFn.recipeFn),
	{
		__recipe__: true,
		__name__: "fieldset",
		__getCompoundVariantCss__: fieldsetFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: fieldsetVariantKeys,
		variantMap: fieldsetVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, fieldsetVariantKeys);
		},
		getVariantProps: fieldsetFn.getVariantProps,
	},
);
