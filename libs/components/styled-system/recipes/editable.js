import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const editableFn = /* @__PURE__ */ createRecipe("editable", {}, []);

const editableVariantMap = {};

const editableVariantKeys = Object.keys(editableVariantMap);

export const editable = /* @__PURE__ */ Object.assign(
	memo(editableFn.recipeFn),
	{
		__recipe__: true,
		__name__: "editable",
		__getCompoundVariantCss__: editableFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: editableVariantKeys,
		variantMap: editableVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, editableVariantKeys);
		},
		getVariantProps: editableFn.getVariantProps,
	},
);
