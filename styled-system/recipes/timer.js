import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const timerFn = /* @__PURE__ */ createRecipe("timer", {}, []);

const timerVariantMap = {};

const timerVariantKeys = Object.keys(timerVariantMap);

export const timer = /* @__PURE__ */ Object.assign(memo(timerFn.recipeFn), {
  __recipe__: true,
  __name__: "timer",
  __getCompoundVariantCss__: timerFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: timerVariantKeys,
  variantMap: timerVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, timerVariantKeys);
  },
  getVariantProps: timerFn.getVariantProps,
});
