import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const stepsFn = /* @__PURE__ */ createRecipe("steps", {}, []);

const stepsVariantMap = {};

const stepsVariantKeys = Object.keys(stepsVariantMap);

export const steps = /* @__PURE__ */ Object.assign(memo(stepsFn.recipeFn), {
  __recipe__: true,
  __name__: "steps",
  __getCompoundVariantCss__: stepsFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: stepsVariantKeys,
  variantMap: stepsVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, stepsVariantKeys);
  },
  getVariantProps: stepsFn.getVariantProps,
});
