import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const badgeFn = /* @__PURE__ */ createRecipe(
	"badge",
	{
		tone: "neutral",
	},
	[],
);

const badgeVariantMap = {
	tone: ["neutral", "blue"],
};

const badgeVariantKeys = Object.keys(badgeVariantMap);

export const badge = /* @__PURE__ */ Object.assign(memo(badgeFn.recipeFn), {
	__recipe__: true,
	__name__: "badge",
	__getCompoundVariantCss__: badgeFn.__getCompoundVariantCss__,
	raw: (props) => props,
	variantKeys: badgeVariantKeys,
	variantMap: badgeVariantMap,
	merge(recipe) {
		return mergeRecipes(this, recipe);
	},
	splitVariantProps(props) {
		return splitProps(props, badgeVariantKeys);
	},
	getVariantProps: badgeFn.getVariantProps,
});
