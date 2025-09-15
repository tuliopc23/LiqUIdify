import { memo, splitProps } from "../helpers.js";
import { createRecipe, mergeRecipes } from "./create-recipe.js";

const qrCodeFn = /* @__PURE__ */ createRecipe("qr-code", {}, []);

const qrCodeVariantMap = {};

const qrCodeVariantKeys = Object.keys(qrCodeVariantMap);

export const qrCode = /* @__PURE__ */ Object.assign(memo(qrCodeFn.recipeFn), {
  __recipe__: true,
  __name__: "qrCode",
  __getCompoundVariantCss__: qrCodeFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: qrCodeVariantKeys,
  variantMap: qrCodeVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe);
  },
  splitVariantProps(props) {
    return splitProps(props, qrCodeVariantKeys);
  },
  getVariantProps: qrCodeFn.getVariantProps,
});
