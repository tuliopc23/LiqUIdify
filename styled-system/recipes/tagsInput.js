import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const tagsInputFn = /* @__PURE__ */ createRecipe("tags-input", {}, []);

const tagsInputVariantMap = {};

const tagsInputVariantKeys = Object.keys(tagsInputVariantMap);

export const tagsInput = /* @__PURE__ */ Object.assign(
	memo(tagsInputFn.recipeFn),
	{
		__recipe__: true,
		__name__: "tagsInput",
		__getCompoundVariantCss__: tagsInputFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: tagsInputVariantKeys,
		variantMap: tagsInputVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, tagsInputVariantKeys);
		},
		getVariantProps: tagsInputFn.getVariantProps,
	},
);
