import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const splitterFn = /* @__PURE__ */ createRecipe("splitter", {}, []);

const splitterVariantMap = {};

const splitterVariantKeys = Object.keys(splitterVariantMap);

export const splitter = /* @__PURE__ */ Object.assign(memo(splitterFn.recipeFn), {
  __recipe__: true,
  __name__: "splitter",
  __getCompoundVariantCss__: splitterFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: splitterVariantKeys,
  variantMap: splitterVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, splitterVariantKeys);
  },
  getVariantProps: splitterFn.getVariantProps,
});
