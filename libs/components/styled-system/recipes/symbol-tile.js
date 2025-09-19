import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const symbolTileFn = /* @__PURE__ */ createRecipe(
	"symbol",
	{
		tint: "gray",
	},
	[],
);

const symbolTileVariantMap = {
	tint: ["gray", "blue", "indigo", "teal"],
};

const symbolTileVariantKeys = Object.keys(symbolTileVariantMap);

export const symbolTile = /* @__PURE__ */ Object.assign(
	memo(symbolTileFn.recipeFn),
	{
		__recipe__: true,
		__name__: "symbolTile",
		__getCompoundVariantCss__: symbolTileFn.__getCompoundVariantCss__,
		raw: (props) => props,
		variantKeys: symbolTileVariantKeys,
		variantMap: symbolTileVariantMap,
		merge(recipe) {
			return mergeRecipes(this, recipe);
		},
		splitVariantProps(props) {
			return splitProps(props, symbolTileVariantKeys);
		},
		getVariantProps: symbolTileFn.getVariantProps,
	},
);
