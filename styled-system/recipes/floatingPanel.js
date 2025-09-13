import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const floatingPanelFn = /* @__PURE__ */ createRecipe("floating-panel", {}, []);

const floatingPanelVariantMap = {};

const floatingPanelVariantKeys = Object.keys(floatingPanelVariantMap);

export const floatingPanel = /* @__PURE__ */ Object.assign(memo(floatingPanelFn.recipeFn), {
  __recipe__: true,
  __name__: "floatingPanel",
  __getCompoundVariantCss__: floatingPanelFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: floatingPanelVariantKeys,
  variantMap: floatingPanelVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, floatingPanelVariantKeys);
  },
  getVariantProps: floatingPanelFn.getVariantProps,
});
