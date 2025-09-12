import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const collapsibleFn = /* @__PURE__ */ createRecipe("collapsible", {}, []);

const collapsibleVariantMap = {};

const collapsibleVariantKeys = Object.keys(collapsibleVariantMap);

export const collapsible = /* @__PURE__ */ Object.assign(memo(collapsibleFn.recipeFn), {
  __recipe__: true,
  __name__: "collapsible",
  __getCompoundVariantCss__: collapsibleFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: collapsibleVariantKeys,
  variantMap: collapsibleVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, collapsibleVariantKeys);
  },
  getVariantProps: collapsibleFn.getVariantProps,
});
