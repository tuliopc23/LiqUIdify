import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const scrollAreaFn = /* @__PURE__ */ createRecipe("scroll-area", {}, []);

const scrollAreaVariantMap = {};

const scrollAreaVariantKeys = Object.keys(scrollAreaVariantMap);

export const scrollArea = /* @__PURE__ */ Object.assign(
	memo(scrollAreaFn.recipeFn),
	{
		__recipe__: true,
		__name__: "scrollArea",
		__getCompoundVariantCss__: scrollAreaFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: scrollAreaVariantKeys,
		variantMap: scrollAreaVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, scrollAreaVariantKeys);
		},
		getVariantProps: scrollAreaFn.getVariantProps,
	},
);
