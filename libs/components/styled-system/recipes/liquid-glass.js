import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const liquidGlassFn = /* @__PURE__ */ createRecipe(
	"glass-surface",
	{
		intensity: "medium",
		size: "md",
	},
	[],
);

const liquidGlassVariantMap = {
	intensity: ["subtle", "medium", "strong"],
	size: ["sm", "md", "lg"],
};

const liquidGlassVariantKeys = Object.keys(liquidGlassVariantMap);

export const liquidGlass = /* @__PURE__ */ Object.assign(
	memo(liquidGlassFn.recipeFn),
	{
		__recipe__: true,
		__name__: "liquidGlass",
		__getCompoundVariantCss__: liquidGlassFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: liquidGlassVariantKeys,
		variantMap: liquidGlassVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, liquidGlassVariantKeys);
		},
		getVariantProps: liquidGlassFn.getVariantProps,
	},
);
