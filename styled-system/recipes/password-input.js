import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const passwordInputFn = /* @__PURE__ */ createRecipe("password-input", {}, []);

const passwordInputVariantMap = {};

const passwordInputVariantKeys = Object.keys(passwordInputVariantMap);

export const passwordInput = /* @__PURE__ */ Object.assign(memo(passwordInputFn.recipeFn), {
  __recipe__: true,
  __name__: "passwordInput",
  __getCompoundVariantCss__: passwordInputFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: passwordInputVariantKeys,
  variantMap: passwordInputVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, passwordInputVariantKeys);
  },
  getVariantProps: passwordInputFn.getVariantProps,
});
