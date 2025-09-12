import { compact, getSlotCompoundVariant, memo, splitProps } from "../helpers.js";
import { createRecipe } from "./create-recipe.js";

const accordionDefaultVariants = {};
const accordionCompoundVariants = [];

const accordionSlotNames = [
  ["root", "accordion__root"],
  ["item", "accordion__item"],
  ["trigger", "accordion__trigger"],
  ["content", "accordion__content"],
];
const accordionSlotFns = /* @__PURE__ */ accordionSlotNames.map(([slotName, slotKey]) => [
  slotName,
  createRecipe(
    slotKey,
    accordionDefaultVariants,
    getSlotCompoundVariant(accordionCompoundVariants, slotName)
  ),
]);

const accordionFn = memo((props = {}) => {
  return Object.fromEntries(
    accordionSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)])
  );
});

const accordionVariantKeys = [];
const getVariantProps = (variants) => ({ ...accordionDefaultVariants, ...compact(variants) });

export const accordion = /* @__PURE__ */ Object.assign(accordionFn, {
  __recipe__: false,
  __name__: "accordion",
  raw: (props) => props,
  classNameMap: {},
  variantKeys: accordionVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, accordionVariantKeys);
  },
  getVariantProps,
});
