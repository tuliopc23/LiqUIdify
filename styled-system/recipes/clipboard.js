import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const clipboardFn = /* @__PURE__ */ createRecipe("clipboard", {}, []);

const clipboardVariantMap = {};

const clipboardVariantKeys = Object.keys(clipboardVariantMap);

export const clipboard = /* @__PURE__ */ Object.assign(memo(clipboardFn.recipeFn), {
  __recipe__: true,
  __name__: "clipboard",
  __getCompoundVariantCss__: clipboardFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: clipboardVariantKeys,
  variantMap: clipboardVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, clipboardVariantKeys);
  },
  getVariantProps: clipboardFn.getVariantProps,
});
