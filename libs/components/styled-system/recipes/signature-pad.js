import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const signaturePadFn = /* @__PURE__ */ createRecipe("signature-pad", {}, []);

const signaturePadVariantMap = {};

const signaturePadVariantKeys = Object.keys(signaturePadVariantMap);

export const signaturePad = /* @__PURE__ */ Object.assign(
	memo(signaturePadFn.recipeFn),
	{
		__recipe__: true,
		__name__: "signaturePad",
		__getCompoundVariantCss__: signaturePadFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: signaturePadVariantKeys,
		variantMap: signaturePadVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, signaturePadVariantKeys);
		},
		getVariantProps: signaturePadFn.getVariantProps,
	},
);
