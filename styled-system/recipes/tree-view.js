import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const treeViewFn = /* @__PURE__ */ createRecipe("tree-view", {}, []);

const treeViewVariantMap = {};

const treeViewVariantKeys = Object.keys(treeViewVariantMap);

export const treeView = /* @__PURE__ */ Object.assign(memo(treeViewFn.recipeFn), {
  __recipe__: true,
  __name__: "treeView",
  __getCompoundVariantCss__: treeViewFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: treeViewVariantKeys,
  variantMap: treeViewVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, treeViewVariantKeys);
  },
  getVariantProps: treeViewFn.getVariantProps,
});
