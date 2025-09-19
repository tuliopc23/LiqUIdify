import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const angleSliderFn = /* @__PURE__ */ createRecipe(
	"angle-slider",
	{
		size: "md",
	},
	[],
);

const angleSliderVariantMap = {
	size: ["sm", "md", "lg"],
};

const angleSliderVariantKeys = Object.keys(angleSliderVariantMap);

export const angleSlider = /* @__PURE__ */ Object.assign(
	memo(angleSliderFn.recipeFn),
	{
		__recipe__: true,
		__name__: "angleSlider",
		__getCompoundVariantCss__: angleSliderFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: angleSliderVariantKeys,
		variantMap: angleSliderVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, angleSliderVariantKeys);
		},
		getVariantProps: angleSliderFn.getVariantProps,
	},
);
