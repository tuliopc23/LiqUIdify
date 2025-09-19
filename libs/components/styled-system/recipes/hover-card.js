import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const hoverCardFn = /* @__PURE__ */ createRecipe("hover-card", {}, []);

const hoverCardVariantMap = {};

const hoverCardVariantKeys = Object.keys(hoverCardVariantMap);

export const hoverCard = /* @__PURE__ */ Object.assign(
	memo(hoverCardFn.recipeFn),
	{
		__recipe__: true,
		__name__: "hoverCard",
		__getCompoundVariantCss__: hoverCardFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: hoverCardVariantKeys,
		variantMap: hoverCardVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, hoverCardVariantKeys);
		},
		getVariantProps: hoverCardFn.getVariantProps,
	},
);
