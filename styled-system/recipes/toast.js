import { compact, getSlotCompoundVariant, memo, splitProps } from "../helpers.js";
import { createRecipe } from "./create-recipe.js";

const toastDefaultVariants = {
  status: "info",
};
const toastCompoundVariants = [];

const toastSlotNames = [
  ["root", "toast__root"],
  ["title", "toast__title"],
  ["description", "toast__description"],
  ["closeTrigger", "toast__closeTrigger"],
  ["actionTrigger", "toast__actionTrigger"],
];
const toastSlotFns = /* @__PURE__ */ toastSlotNames.map(([slotName, slotKey]) => [
  slotName,
  createRecipe(
    slotKey,
    toastDefaultVariants,
    getSlotCompoundVariant(toastCompoundVariants, slotName)
  ),
]);

const toastFn = memo((props = {}) => {
  return Object.fromEntries(
    toastSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)])
  );
});

const toastVariantKeys = ["status"];
const getVariantProps = (variants) => ({ ...toastDefaultVariants, ...compact(variants) });

export const toast = /* @__PURE__ */ Object.assign(toastFn, {
  __recipe__: false,
  __name__: "toast",
  raw: (props) => props,
  classNameMap: {},
  variantKeys: toastVariantKeys,
  variantMap: {
    status: ["info", "success", "warning", "error"],
  },
  splitVariantProps(props) {
    return splitProps(props, toastVariantKeys);
  },
  getVariantProps,
});
