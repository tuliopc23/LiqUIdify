import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const tourFn = /* @__PURE__ */ createRecipe("tour", {}, []);

const tourVariantMap = {};

const tourVariantKeys = Object.keys(tourVariantMap);

export const tour = /* @__PURE__ */ Object.assign(memo(tourFn.recipeFn), {
  __recipe__: true,
  __name__: "tour",
  __getCompoundVariantCss__: tourFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: tourVariantKeys,
  variantMap: tourVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, tourVariantKeys);
  },
  getVariantProps: tourFn.getVariantProps,
});
