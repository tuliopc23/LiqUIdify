import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const toggleGroupFn = /* @__PURE__ */ createRecipe("toggle-group", {}, []);

const toggleGroupVariantMap = {};

const toggleGroupVariantKeys = Object.keys(toggleGroupVariantMap);

export const toggleGroup = /* @__PURE__ */ Object.assign(memo(toggleGroupFn.recipeFn), {
  __recipe__: true,
  __name__: "toggleGroup",
  __getCompoundVariantCss__: toggleGroupFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: toggleGroupVariantKeys,
  variantMap: toggleGroupVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, toggleGroupVariantKeys);
  },
  getVariantProps: toggleGroupFn.getVariantProps,
});
